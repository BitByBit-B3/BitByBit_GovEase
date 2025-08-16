export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'citizen' | 'officer' | 'admin';
  nic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  location: string;
  contactNumber: string;
  email: string;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  services: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  duration: number;
  requiredDocuments: string[];
  fee: number;
  isActive: boolean;
  availableSlots: number;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  departmentId: string;
  date: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  qrCode: string;
  referenceNumber: string;
  documents: UploadedDocument[];
  notes?: string;
  officerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  appointmentId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment_confirmation' | 'reminder' | 'status_update' | 'document_review';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Feedback {
  id: string;
  appointmentId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Analytics {
  totalAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  noShowRate: number;
  averageRating: number;
  peakHours: { hour: number; count: number }[];
  departmentLoad: { departmentId: string; count: number }[];
  averageProcessingTime: number;
}