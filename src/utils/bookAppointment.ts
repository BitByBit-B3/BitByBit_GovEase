import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  runTransaction, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

export interface BookAppointmentParams {
  uid: string;
  serviceId: string;
  departmentId: string;
  slotId: string;
  date: Date;
  timeSlot: string;
  notes?: string;
}

export interface BookAppointmentResult {
  appointmentId: string;
  referenceNumber: string;
  qrData: {
    appointmentId: string;
    issuedAt: Date;
  };
}

export async function bookAppointment(params: BookAppointmentParams): Promise<BookAppointmentResult> {
  const { uid, serviceId, departmentId, slotId, date, timeSlot, notes } = params;
  
  return await runTransaction(db, async (transaction) => {
    // Check if slot exists and has capacity
    const slotRef = doc(db, 'slots', slotId);
    const slotSnap = await transaction.get(slotRef);
    
    if (!slotSnap.exists()) {
      throw new Error('Selected time slot no longer exists');
    }
    
    const slotData = slotSnap.data();
    const currentBooked = slotData.booked || 0;
    
    if (currentBooked >= slotData.capacity) {
      throw new Error('Selected time slot is fully booked');
    }

    // Generate appointment data
    const appointmentRef = doc(collection(db, 'appointments'));
    const referenceNumber = `GE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Create QR data (minimal for security)
    const qrData = {
      appointmentId: appointmentRef.id,
      issuedAt: new Date(),
    };

    const appointmentData = {
      userId: uid,
      serviceId,
      departmentId,
      slotId,
      date: Timestamp.fromDate(date),
      timeSlot,
      status: 'booked', // Use 'booked' instead of 'pending' for immediate confirmation
      qr: qrData,
      referenceNumber,
      notes: notes || '',
      documents: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Atomically create appointment and update slot
    transaction.set(appointmentRef, appointmentData);
    transaction.update(slotRef, { 
      booked: currentBooked + 1,
      updatedAt: serverTimestamp()
    });

    // Create notification for user
    const notificationRef = doc(collection(db, 'notifications'));
    transaction.set(notificationRef, {
      userId: uid,
      type: 'appointment_confirmation',
      title: 'Appointment Booked Successfully!',
      message: `Your appointment has been confirmed for ${date.toLocaleDateString()} at ${timeSlot}. Reference: ${referenceNumber}`,
      read: false,
      appointmentId: appointmentRef.id,
      createdAt: serverTimestamp(),
    });

    return {
      appointmentId: appointmentRef.id,
      referenceNumber,
      qrData,
    };
  });
}

// Helper function to generate slots for a service
export async function generateSlotsForService(
  serviceId: string, 
  departmentId: string, 
  startDate: Date, 
  endDate: Date,
  workingHours: { start: string; end: string; days: string[] },
  capacity: number = 10
) {
  const slots = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Check if current day is a working day
    if (workingHours.days.includes(dayName)) {
      const startHour = parseInt(workingHours.start.split(':')[0]);
      const endHour = parseInt(workingHours.end.split(':')[0]);
      
      // Generate hourly slots
      for (let hour = startHour; hour < endHour; hour++) {
        const slotId = `${serviceId}-${currentDate.toISOString().split('T')[0]}-${hour.toString().padStart(2, '0')}00`;
        const timeSlot = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;
        
        const slotData = {
          id: slotId,
          serviceId,
          departmentId,
          date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD
          time: `${hour.toString().padStart(2, '0')}:00`,
          timeSlot,
          capacity,
          booked: 0,
          createdAt: new Date(),
        };
        
        slots.push(slotData);
      }
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return slots;
}