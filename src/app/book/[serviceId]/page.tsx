'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Service, Department, Appointment, UploadedDocument } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Calendar from 'react-calendar';
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

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot('');
    form.setValue('date', date);
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
      await appointmentRef.update({
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !service || !department) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GovEase</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
          <p className="mt-1 text-sm text-gray-600">
            Schedule your appointment for government services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Service Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  {department.name}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {service.duration} minutes
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  LKR {service.fee.toLocaleString()}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-600" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Documents</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload the required documents to speed up your appointment process.
              </p>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Select Files
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
                  <p className="mt-2 text-sm text-gray-500">
                    PDF, JPG, PNG, DOC, DOCX up to 10MB each
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-900">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h2>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Calendar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
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
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          form.setValue('timeSlot', slot);
                        }}
                        className={`p-2 text-sm border rounded-md ${
                          selectedSlot === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {form.formState.errors.timeSlot && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.timeSlot.message}
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...form.register('notes')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional information or special requests..."
                />
              </div>

              <div className="flex space-x-4">
                <Link
                  href="/services"
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 text-center hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedSlot}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {submitting ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}