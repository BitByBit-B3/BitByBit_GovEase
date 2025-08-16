'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Service, Department, Appointment, UploadedDocument } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { format, addDays, isSameDay, isWeekend } from 'date-fns';
import { 
  BuildingOfficeIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CloudArrowUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const bookingSchema = z.object({
  date: z.date(),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookAppointmentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const [service, setService] = useState<Service | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/book/' + serviceId);
    } else if (user && user.role !== 'citizen') {
      router.push('/admin');
    } else if (user && serviceId) {
      loadServiceData();
    }
  }, [user, loading, serviceId, router]);

  const loadServiceData = async () => {
    try {
      setLoadingData(true);
      
      // Load service
      const serviceDoc = await getDoc(doc(db, 'services', serviceId));
      if (!serviceDoc.exists()) {
        toast.error('Service not found');
        router.push('/services');
        return;
      }
      
      const serviceData = {
        id: serviceDoc.id,
        ...serviceDoc.data(),
        createdAt: serviceDoc.data()?.createdAt?.toDate() || new Date(),
      } as Service;
      setService(serviceData);

      // Load department
      const departmentDoc = await getDoc(doc(db, 'departments', serviceData.departmentId));
      if (departmentDoc.exists()) {
        const departmentData = {
          id: departmentDoc.id,
          ...departmentDoc.data(),
          createdAt: departmentDoc.data()?.createdAt?.toDate() || new Date(),
        } as Department;
        setDepartment(departmentData);
      }
    } catch (error) {
      console.error('Error loading service:', error);
      toast.error('Error loading service details');
    } finally {
      setLoadingData(false);
    }
  };

  const generateTimeSlots = () => {
    if (!department || !selectedDate) return [];

    const slots: string[] = [];
    const start = parseInt(department.workingHours.start.split(':')[0]);
    const end = parseInt(department.workingHours.end.split(':')[0]);
    
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`);
    }
    
    return slots;
  };

  const onDateChange = (value: any) => {
    if (!value || Array.isArray(value)) return;
    
    const selectedDate = value as Date;
    setSelectedDate(selectedDate);
    setSelectedSlot('');
    form.setValue('date', selectedDate);
    form.setValue('timeSlot', '');
    
    // Generate available slots for the selected date
    const slots = generateTimeSlots();
    setAvailableSlots(slots);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadDocuments = async (appointmentId: string): Promise<UploadedDocument[]> => {
    const uploadedDocs: UploadedDocument[] = [];
    
    for (const file of uploadedFiles) {
      try {
        const fileRef = ref(storage, `appointments/${appointmentId}/${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        const uploadedDoc: UploadedDocument = {
          id: uuidv4(),
          name: file.name,
          type: file.type,
          url: downloadURL,
          size: file.size,
          uploadedAt: new Date(),
          status: 'pending',
        };
        
        uploadedDocs.push(uploadedDoc);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    return uploadedDocs;
  };

  const generateQRCode = async (appointmentData: any): Promise<string> => {
    try {
      const qrData = JSON.stringify({
        appointmentId: appointmentData.id,
        referenceNumber: appointmentData.referenceNumber,
        date: appointmentData.date,
        timeSlot: appointmentData.timeSlot,
        service: service?.name,
        department: department?.name,
      });
      
      return await QRCode.toDataURL(qrData);
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!user || !service || !department) return;

    setSubmitting(true);
    setUploading(true);

    try {
      const referenceNumber = `GE${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      // Create appointment
      const appointmentData = {
        userId: user.id,
        serviceId: service.id,
        departmentId: department.id,
        date: data.date,
        timeSlot: data.timeSlot,
        status: 'pending',
        referenceNumber,
        notes: data.notes || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const appointmentRef = await addDoc(collection(db, 'appointments'), appointmentData);
      const appointmentId = appointmentRef.id;

      // Upload documents
      const uploadedDocs = await uploadDocuments(appointmentId);
      
      // Generate QR code
      const qrCode = await generateQRCode({ ...appointmentData, id: appointmentId });

      // Update appointment with documents and QR code
      await updateDoc(appointmentRef, {
        documents: uploadedDocs,
        qrCode,
      });

      // Create notification
      await addDoc(collection(db, 'notifications'), {
        userId: user.id,
        type: 'appointment_confirmation',
        title: 'Appointment Booked Successfully',
        message: `Your appointment for ${service.name} has been booked for ${format(data.date, 'PPP')} at ${data.timeSlot}. Reference: ${referenceNumber}`,
        read: false,
        createdAt: new Date(),
      });

      toast.success('Appointment booked successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (!department) return true;
    
    // Disable past dates
    if (date < new Date()) return true;
    
    // Disable weekends if not in working days
    const dayName = format(date, 'EEEE');
    return !department.workingHours.days.includes(dayName);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen hero-gradient hero-pattern flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-white">Loading Booking Interface...</div>
          <p className="text-blue-100 mt-2">Preparing your appointment booking experience</p>
        </div>
      </div>
    );
  }

  if (!user || !service || !department) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Modern Glass Navigation */}
      <nav className="nav-glass fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center animate-fade-in-down">
              <div className="feature-icon mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">GovEase</span>
                <div className="gov-badge text-xs mt-1">Book Appointment</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4 animate-fade-in-down stagger-1">
              <Link href="/dashboard" className="btn-secondary text-sm px-4 py-2">
                <CalendarDaysIcon className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <div className="text-sm text-heading">
                Welcome, <span className="font-semibold">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient hero-pattern relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="block">Book Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Government Appointment
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Schedule your {service?.name} appointment and upload required documents 
                for a seamless government service experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="space-y-6">
            <div className="feature-card p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-heading">Service Overview</h2>
                <div className="feature-icon">
                  <BuildingOfficeIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-heading mb-2">{service.name}</h3>
                  <p className="text-body leading-relaxed">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-body">
                    <div className="feature-icon mr-3 !p-2">
                      <BuildingOfficeIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-heading">{department.name}</p>
                      <p className="text-caption text-sm">Department</p>
                    </div>
                  </div>

                  <div className="flex items-center text-body">
                    <div className="feature-icon mr-3 !p-2">
                      <ClockIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-heading">{service.duration} minutes</p>
                      <p className="text-caption text-sm">Duration</p>
                    </div>
                  </div>

                  <div className="flex items-center text-body md:col-span-2">
                    <div className="feature-icon mr-3 !p-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-heading">LKR {service.fee.toLocaleString()}</p>
                      <p className="text-caption text-sm">Service Fee</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-lg font-bold text-heading mb-4">Required Documents</h4>
                  <div className="space-y-3">
                    {service.requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <DocumentTextIcon className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="text-body font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="feature-card p-6 animate-fade-in-up stagger-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-heading">Upload Documents</h3>
                  <p className="text-body mt-1">
                    Upload required documents to expedite your appointment process
                  </p>
                </div>
                <div className="feature-icon">
                  <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="feature-icon mx-auto mb-4">
                    <CloudArrowUpIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="file-upload"
                      className="btn-primary cursor-pointer"
                    >
                      <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                      Choose Files to Upload
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-caption">
                    Supports: PDF, JPG, PNG, DOC, DOCX • Maximum 10MB per file
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-heading">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-emerald-600 mr-3" />
                            <div>
                              <span className="text-body font-semibold">{file.name}</span>
                              <p className="text-caption text-sm">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="feature-card p-6 animate-fade-in-up stagger-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-heading">Schedule Appointment</h2>
                <p className="text-body mt-1">Choose your preferred date and time slot</p>
              </div>
              <div className="feature-icon">
                <CalendarDaysIcon className="h-6 w-6 text-white" />
              </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Calendar */}
              <div>
                <label className="block text-lg font-bold text-heading mb-4">
                  Choose Your Date
                </label>
                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <Calendar
                    onChange={onDateChange}
                    value={selectedDate}
                    tileDisabled={({ date }) => isDateDisabled(date)}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                    className="w-full"
                  />
                </div>
                {form.formState.errors.date && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="block text-lg font-bold text-heading mb-4">
                    Select Your Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          form.setValue('timeSlot', slot);
                        }}
                        className={`p-4 text-sm font-semibold border-2 rounded-lg transition-all ${
                          selectedSlot === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-body'
                        }`}
                      >
                        <ClockIcon className="h-4 w-4 mx-auto mb-1" />
                        {slot}
                      </button>
                    ))}
                  </div>
                  {form.formState.errors.timeSlot && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {form.formState.errors.timeSlot.message}
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-lg font-bold text-heading mb-4">
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...form.register('notes')}
                  rows={4}
                  className="input-field w-full"
                  placeholder="Share any special requirements, accessibility needs, or additional information that might help us serve you better..."
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-100">
                <Link
                  href="/services"
                  className="btn-secondary flex-1 text-center"
                >
                  Cancel Booking
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedSlot}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {uploading ? 'Uploading Documents...' : 'Booking Appointment...'}
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}