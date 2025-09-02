export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'citizen' | 'officer' | 'admin';
  nic: string;
  departmentId?: string; // For officers
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
  slotId: string;
  date: Date;
  timeSlot: string;
  status: 'booked' | 'checked_in' | 'completed' | 'cancelled' | 'no-show' | 'pending' | 'confirmed';
  qr: {
    appointmentId: string;
    issuedAt: Date;
  };
  qrCode?: string;
  referenceNumber: string;
  documents: UploadedDocument[];
  notes?: string;
  officerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadedDocument {
  id: string;
  ownerUid: string;
  serviceId: string;
  name: string;
  type: string;
  storagePath: string;
  size: number;
  status: 'submitted' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
}

export interface Slot {
  id: string;
  serviceId: string;
  departmentId: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format  
  timeSlot?: string; // Optional display format like "10:00-11:00"
  capacity: number;
  booked: number;
  createdAt: Date;
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