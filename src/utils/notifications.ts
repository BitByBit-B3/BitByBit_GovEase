import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NotificationData {
  userId: string;
  type: 'appointment_confirmation' | 'reminder' | 'status_update' | 'document_review';
  title: string;
  message: string;
}

export const createNotification = async (data: NotificationData) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      ...data,
      read: false,
      createdAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { success: false, error };
  }
};

export const sendAppointmentConfirmation = async (userId: string, appointmentDetails: any) => {
  return await createNotification({
    userId,
    type: 'appointment_confirmation',
    title: 'Appointment Confirmed',
    message: `Your appointment for ${appointmentDetails.service} has been confirmed for ${appointmentDetails.date} at ${appointmentDetails.timeSlot}. Reference: ${appointmentDetails.referenceNumber}`,
  });
};

export const sendStatusUpdate = async (userId: string, status: string, appointmentDetails: any) => {
  let title = '';
  let message = '';

  switch (status) {
    case 'confirmed':
      title = 'Appointment Confirmed';
      message = `Your appointment for ${appointmentDetails.service} has been confirmed.`;
      break;
    case 'cancelled':
      title = 'Appointment Cancelled';
      message = `Your appointment for ${appointmentDetails.service} has been cancelled.`;
      break;
    case 'completed':
      title = 'Appointment Completed';
      message = `Your appointment for ${appointmentDetails.service} has been completed. Please provide feedback.`;
      break;
    default:
      title = 'Appointment Update';
      message = `Your appointment status has been updated to ${status}.`;
  }

  return await createNotification({
    userId,
    type: 'status_update',
    title,
    message,
  });
};

export const sendDocumentReview = async (userId: string, documentName: string, status: 'approved' | 'rejected', reason?: string) => {
  const title = `Document ${status === 'approved' ? 'Approved' : 'Rejected'}`;
  const message = status === 'approved' 
    ? `Your document "${documentName}" has been approved.`
    : `Your document "${documentName}" has been rejected. Reason: ${reason}`;

  return await createNotification({
    userId,
    type: 'document_review',
    title,
    message,
  });
};

// Simulate email sending
export const sendEmail = async (to: string, subject: string, message: string) => {
  console.log(`Email sent to ${to}: ${subject} - ${message}`);
  return { success: true };
};

// Simulate SMS sending
export const sendSMS = async (phone: string, message: string) => {
  console.log(`SMS sent to ${phone}: ${message}`);
  return { success: true };
};