'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, collection, query, where, getDocs, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Service, Department, Slot } from '@/types';
import { bookAppointment } from '@/utils/bookAppointment';
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
import { createSeedData } from '@/utils/createSeedData';
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
  slotId: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Note: generateStaticParams is handled by a separate server component layout
// This allows the client component to work with static generation

export default function BookAppointmentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const [service, setService] = useState<Service | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [documentUploads, setDocumentUploads] = useState<{ [docType: string]: File | null }>({});
  const [activeDocTab, setActiveDocTab] = useState<string>('');
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
      
      // Set first required document as active tab
      if (serviceData.requiredDocuments.length > 0) {
        setActiveDocTab(serviceData.requiredDocuments[0]);
      }

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

  const loadAvailableSlots = async (date: Date) => {
    if (!service || !department) return;

    try {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Simple query - just get slots by serviceId and date (no orderBy to avoid index issues)
      const slotsQuery = query(
        collection(db, 'slots'),
        where('serviceId', '==', service.id),
        where('date', '==', dateString)
      );
      
      const slotsSnapshot = await getDocs(slotsQuery);
      const slots: Slot[] = [];
      
      slotsSnapshot.forEach((doc) => {
        const slotData = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Slot;
        
        // Only show slots that aren't fully booked
        if (slotData.booked < slotData.capacity) {
          slots.push(slotData);
        }
      });
      
      // Sort on client side to avoid index requirement
      slots.sort((a, b) => a.time.localeCompare(b.time));
      
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading slots:', error);
      console.log('Creating demo slots as fallback...');
      
      // Create hardcoded demo slots as fallback
      const demoSlots: Slot[] = [];
      for (let hour = 9; hour < 17; hour++) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
        demoSlots.push({
          id: `demo-${service.id}-${dateString}-${hour}`,
          serviceId: service.id,
          departmentId: service.departmentId,
          date: dateString,
          time: `${hour.toString().padStart(2, '0')}:00`,
          timeSlot,
          capacity: Math.floor(Math.random() * 5) + 5,
          booked: Math.floor(Math.random() * 3),
          createdAt: new Date(),
        });
      }
      setAvailableSlots(demoSlots);
      toast.success('Demo time slots loaded for testing');
    }
  };

  const onDateChange = (value: any) => {
    if (!value || Array.isArray(value)) return;
    
    const selectedDate = value as Date;
    setSelectedDate(selectedDate);
    setSelectedSlot(null);
    form.setValue('date', selectedDate);
    form.setValue('slotId', '');
    
    // Load available slots for the selected date
    loadAvailableSlots(selectedDate);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDocumentUpload = (docType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentUploads(prev => ({
        ...prev,
        [docType]: file
      }));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeDocumentUpload = (docType: string) => {
    setDocumentUploads(prev => {
      const updated = { ...prev };
      delete updated[docType];
      return updated;
    });
  };

  const uploadDocuments = async (userId: string, serviceId: string) => {
    const uploadedDocs = [];
    
    for (const file of uploadedFiles) {
      try {
        const storagePath = `users/${userId}/drafts/${serviceId}/${file.name}`;
        const fileRef = ref(storage, storagePath);
        const snapshot = await uploadBytes(fileRef, file);
        
        // Create document metadata in Firestore
        const docData = {
          ownerUid: userId,
          serviceId,
          name: file.name,
          type: file.type,
          storagePath,
          size: file.size,
          status: 'submitted',
          createdAt: new Date(),
        };
        
        uploadedDocs.push(docData);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    return uploadedDocs;
  };

  const testFirebaseWrite = async () => {
    if (!user) {
      alert('No user logged in');
      return;
    }

    try {
      console.log('Testing Firebase write...');
      const testData = {
        userId: user.id,
        testField: 'test value',
        timestamp: Timestamp.fromDate(new Date())
      };
      
      const testRef = await addDoc(collection(db, 'test_collection'), testData);
      console.log('TEST SUCCESS: Document written with ID:', testRef.id);
      alert('Firebase write test successful! Check console.');
    } catch (error) {
      console.error('TEST FAILED:', error);
      alert('Firebase write test failed! Check console.');
    }
  };

  const forceCreateAppointment = async () => {
    if (!user) {
      alert('No user logged in');
      return;
    }

    try {
      console.log('FORCE CREATING APPOINTMENT...');
      const testAppointment = {
        userId: user.id,
        serviceId: 'test-service',
        departmentId: 'test-dept',
        date: Timestamp.fromDate(new Date()),
        timeSlot: '10:00-11:00',
        status: 'pending',
        referenceNumber: `TEST${Date.now()}`,
        notes: 'TEST APPOINTMENT',
        documents: [],
        qrCode: '',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      
      console.log('Creating test appointment:', testAppointment);
      const docRef = await addDoc(collection(db, 'appointments'), testAppointment);
      console.log('SUCCESS! Appointment created with ID:', docRef.id);
      alert(`SUCCESS! Appointment created with ID: ${docRef.id}. Check Firebase Console!`);
    } catch (error) {
      console.error('FORCE CREATE FAILED:', error);
      alert(`FORCE CREATE FAILED: ${error}`);
    }
  };

  const seedAllData = async () => {
    if (!user) {
      alert('No user logged in');
      return;
    }

    try {
      toast.success('Creating seed data... Please wait.');
      const result = await createSeedData(user.id);
      alert(`✅ SUCCESS! Created ${result.departments} departments, ${result.services} services, and ${result.appointments} appointments!`);
      toast.success('Seed data created successfully!');
    } catch (error) {
      console.error('Error creating seed data:', error);
      alert(`❌ Error creating seed data: ${error}`);
      toast.error('Failed to create seed data');
    }
  };

  const generateQRCode = async (appointmentData: any): Promise<string> => {
    try {
      const qrData = JSON.stringify({
        appointmentId: appointmentData.id,
        referenceNumber: appointmentData.referenceNumber,
        date: appointmentData.date instanceof Date ? appointmentData.date.toISOString() : appointmentData.date.toDate().toISOString(),
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
    if (!user || !service || !department || !selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setSubmitting(true);
    setUploading(true);

    try {
      // Upload documents first if any
      const uploadedDocuments = uploadedFiles.length > 0 ? await uploadDocuments(user.id, service.id) : [];

      // Book appointment atomically
      const result = await bookAppointment({
        uid: user.id,
        serviceId: service.id,
        departmentId: department.id,
        slotId: selectedSlot.id,
        date: data.date,
        timeSlot: selectedSlot.timeSlot || `${selectedSlot.time}-${(parseInt(selectedSlot.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
        notes: data.notes,
      });

      toast.success(`Appointment booked successfully! Reference: ${result.referenceNumber}`);
      
      // Redirect to dashboard
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast.error(error.message || 'Failed to book appointment. Please try again.');
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
                  <h3 className="text-2xl font-bold text-heading">Upload Required Documents</h3>
                  <p className="text-body mt-1">
                    Upload each required document separately for faster processing
                  </p>
                </div>
                <div className="feature-icon">
                  <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
              </div>

              {service.requiredDocuments.length > 0 ? (
                <div className="space-y-6">
                  {/* Document Tabs */}
                  <div className="border-b border-gray-200">
                    <div className="flex flex-wrap -mb-px">
                      {service.requiredDocuments.map((docType) => (
                        <button
                          key={docType}
                          onClick={() => setActiveDocTab(docType)}
                          className={`mr-2 mb-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
                            activeDocTab === docType
                              ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                          }`}
                        >
                          {docType}
                          {documentUploads[docType] && (
                            <CheckCircleIcon className="ml-2 h-4 w-4 text-green-400 inline" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Document Upload */}
                  {activeDocTab && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 mb-2">
                          {activeDocTab}
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Please upload a clear, readable copy of your {activeDocTab.toLowerCase()}. 
                          Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                        </p>
                      </div>

                      {documentUploads[activeDocTab] ? (
                        // Show uploaded document
                        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-emerald-600 mr-3" />
                            <div>
                              <span className="text-body font-semibold">{documentUploads[activeDocTab]!.name}</span>
                              <p className="text-caption text-sm">
                                {(documentUploads[activeDocTab]!.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeDocumentUpload(activeDocTab)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        // Show upload area
                        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors">
                          <div className="feature-icon mx-auto mb-4">
                            <CloudArrowUpIcon className="h-8 w-8 text-white" />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor={`upload-${activeDocTab}`}
                              className="btn-primary cursor-pointer"
                            >
                              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                              Upload {activeDocTab}
                            </label>
                            <input
                              id={`upload-${activeDocTab}`}
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              onChange={handleDocumentUpload(activeDocTab)}
                              className="hidden"
                            />
                          </div>
                          <p className="text-caption">
                            Drag & drop or click to upload • PDF, JPG, PNG, DOC, DOCX • Max 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Upload Progress Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-heading">Upload Progress</h4>
                      <span className="text-sm text-body">
                        {Object.keys(documentUploads).length} of {service.requiredDocuments.length} documents uploaded
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.requiredDocuments.map((docType) => (
                        <div key={docType} className="flex items-center">
                          {documentUploads[docType] ? (
                            <CheckCircleIcon className="h-4 w-4 text-emerald-600 mr-2" />
                          ) : (
                            <div className="h-4 w-4 border-2 border-gray-300 rounded-full mr-2"></div>
                          )}
                          <span className={`text-sm ${documentUploads[docType] ? 'text-emerald-700' : 'text-gray-600'}`}>
                            {docType}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-heading mb-2">No Documents Required</h4>
                  <p className="text-body">This service doesn't require any document uploads.</p>
                </div>
              )}
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
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot) => {
                        const timeDisplay = slot.timeSlot || `${slot.time}-${(parseInt(slot.time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
                        const availabilityText = `${slot.capacity - slot.booked} of ${slot.capacity} available`;
                        
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot);
                              form.setValue('slotId', slot.id);
                            }}
                            className={`p-4 text-sm font-semibold border-2 rounded-lg transition-all ${
                              selectedSlot?.id === slot.id
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-105'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-body'
                            }`}
                          >
                            <ClockIcon className="h-4 w-4 mx-auto mb-1" />
                            <div className="font-bold">{timeDisplay}</div>
                            <div className="text-xs text-caption mt-1">{availabilityText}</div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <ClockIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-body">No available time slots for this date.</p>
                      <p className="text-caption text-sm mt-1">Please select a different date.</p>
                    </div>
                  )}
                  {form.formState.errors.slotId && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {form.formState.errors.slotId.message}
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

              <div className="flex flex-col space-y-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={seedAllData}
                  className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                >
                  🌱 CREATE ALL DATA (Departments, Services, Appointments)
                </button>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
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
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}