import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { generateSlotsForService } from './bookAppointment';

export interface SeedResult {
  departments: number;
  services: number;
  slots: number;
  users: number;
  appointments: number;
}

export async function seedDatabase(): Promise<SeedResult> {
  let departmentCount = 0;
  let serviceCount = 0;
  let slotCount = 0;
  let userCount = 0;
  let appointmentCount = 0;

  try {
    // 1. Create Demo Users
    const demoUsers = [
      {
        id: 'admin-demo',
        email: 'admin@govease.lk',
        name: 'System Administrator',
        phone: '+94771234567',
        nic: '199012345678',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'officer-motor-traffic',
        email: 'officer.mt@govease.lk',
        name: 'Motor Traffic Officer',
        phone: '+94772345678',
        nic: '198512345679',
        role: 'officer',
        departmentId: 'motor-traffic',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'officer-immigration',
        email: 'officer.im@govease.lk',
        name: 'Immigration Officer',
        phone: '+94773456789',
        nic: '199012345680',
        role: 'officer',
        departmentId: 'immigration',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'citizen-demo',
        email: 'citizen@demo.lk',
        name: 'John Citizen',
        phone: '+94774567890',
        nic: '199512345681',
        role: 'citizen',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const user of demoUsers) {
      await setDoc(doc(db, 'users', user.id), {
        ...user,
        createdAt: Timestamp.fromDate(user.createdAt),
        updatedAt: Timestamp.fromDate(user.updatedAt),
      });
      userCount++;
    }

    // 2. Create Departments
    const departments = [
      {
        id: 'motor-traffic',
        name: 'Department of Motor Traffic',
        description: 'Vehicle registration, driving licenses, and traffic-related services',
        location: 'Colombo 05, Sri Lanka',
        contactNumber: '+94112123456',
        email: 'info@motortraffic.gov.lk',
        workingHours: {
          start: '08:00',
          end: '16:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        services: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 'immigration',
        name: 'Department of Immigration and Emigration',
        description: 'Passport services, visa processing, and immigration matters',
        location: 'Battaramulla, Sri Lanka',
        contactNumber: '+94112234567',
        email: 'info@immigration.gov.lk',
        workingHours: {
          start: '08:30',
          end: '15:30',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        services: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 'registrar-general',
        name: 'Registrar General\'s Department',
        description: 'Birth, death, marriage certificates and legal document services',
        location: 'Colombo 07, Sri Lanka',
        contactNumber: '+94112345678',
        email: 'info@rgd.gov.lk',
        workingHours: {
          start: '08:00',
          end: '15:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        services: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: 'inland-revenue',
        name: 'Inland Revenue Department',
        description: 'Tax services, income tax returns, and revenue collection',
        location: 'Colomb 02, Sri Lanka',
        contactNumber: '+94112456789',
        email: 'info@ird.gov.lk',
        workingHours: {
          start: '08:30',
          end: '16:30',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
        services: [],
        isActive: true,
        createdAt: new Date(),
      },
    ];

    for (const dept of departments) {
      await setDoc(doc(db, 'departments', dept.id), {
        ...dept,
        createdAt: Timestamp.fromDate(dept.createdAt),
      });
      departmentCount++;
    }

    // 3. Create Services
    const services = [
      // Motor Traffic Services
      {
        id: 'driving-license-new',
        name: 'New Driving License Application',
        description: 'Apply for a new driving license with road test and medical examination',
        departmentId: 'motor-traffic',
        duration: 60,
        requiredDocuments: ['National Identity Card', 'Medical Certificate', 'Eye Test Report', 'Passport Size Photos'],
        fee: 5000,
        isActive: true,
        availableSlots: 20,
        createdAt: new Date(),
      },
      {
        id: 'driving-license-renewal',
        name: 'Driving License Renewal',
        description: 'Renew your existing driving license',
        departmentId: 'motor-traffic',
        duration: 30,
        requiredDocuments: ['Current Driving License', 'National Identity Card', 'Medical Certificate'],
        fee: 2500,
        isActive: true,
        availableSlots: 30,
        createdAt: new Date(),
      },
      {
        id: 'vehicle-registration',
        name: 'Vehicle Registration',
        description: 'Register a new vehicle or transfer ownership',
        departmentId: 'motor-traffic',
        duration: 45,
        requiredDocuments: ['Vehicle Import Permit', 'Insurance Certificate', 'National Identity Card', 'Vehicle Inspection Report'],
        fee: 7500,
        isActive: true,
        availableSlots: 15,
        createdAt: new Date(),
      },
      // Immigration Services
      {
        id: 'passport-new',
        name: 'New Passport Application',
        description: 'Apply for a new Sri Lankan passport',
        departmentId: 'immigration',
        duration: 30,
        requiredDocuments: ['Birth Certificate', 'National Identity Card', 'Passport Size Photos', 'Application Form'],
        fee: 3500,
        isActive: true,
        availableSlots: 25,
        createdAt: new Date(),
      },
      {
        id: 'passport-renewal',
        name: 'Passport Renewal',
        description: 'Renew your existing Sri Lankan passport',
        departmentId: 'immigration',
        duration: 20,
        requiredDocuments: ['Current Passport', 'National Identity Card', 'Passport Size Photos'],
        fee: 3000,
        isActive: true,
        availableSlots: 30,
        createdAt: new Date(),
      },
      // Registrar General Services
      {
        id: 'birth-certificate',
        name: 'Birth Certificate',
        description: 'Obtain certified copy of birth certificate',
        departmentId: 'registrar-general',
        duration: 15,
        requiredDocuments: ['Application Form', 'National Identity Card of Applicant', 'Birth Registration Details'],
        fee: 100,
        isActive: true,
        availableSlots: 50,
        createdAt: new Date(),
      },
      {
        id: 'marriage-certificate',
        name: 'Marriage Certificate',
        description: 'Obtain certified copy of marriage certificate',
        departmentId: 'registrar-general',
        duration: 15,
        requiredDocuments: ['Application Form', 'National Identity Cards of Both Parties', 'Marriage Registration Details'],
        fee: 100,
        isActive: true,
        availableSlots: 40,
        createdAt: new Date(),
      },
      // Inland Revenue Services
      {
        id: 'tax-return-filing',
        name: 'Income Tax Return Filing',
        description: 'File annual income tax return',
        departmentId: 'inland-revenue',
        duration: 45,
        requiredDocuments: ['National Identity Card', 'Income Statements', 'Bank Statements', 'Previous Year Tax File'],
        fee: 0,
        isActive: true,
        availableSlots: 20,
        createdAt: new Date(),
      },
    ];

    for (const service of services) {
      await setDoc(doc(db, 'services', service.id), {
        ...service,
        createdAt: Timestamp.fromDate(service.createdAt),
      });
      serviceCount++;
    }

    // 4. Generate Slots for all services (next 14 days)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);

    for (const service of services) {
      const department = departments.find(d => d.id === service.departmentId);
      if (department) {
        const slots = await generateSlotsForService(
          service.id,
          service.departmentId,
          startDate,
          endDate,
          department.workingHours,
          10 // Default capacity
        );

        for (const slot of slots) {
          await setDoc(doc(db, 'slots', slot.id), {
            ...slot,
            createdAt: Timestamp.fromDate(slot.createdAt),
          });
          slotCount++;
        }
      }
    }

    // 5. Create sample appointments for demo
    const sampleAppointments = [
      {
        id: 'appointment-demo-1',
        userId: 'citizen-demo',
        serviceId: 'driving-license-new',
        departmentId: 'motor-traffic',
        slotId: 'driving-license-new-' + new Date().toISOString().split('T')[0] + '-1000',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        timeSlot: '10:00-11:00',
        status: 'booked',
        qr: {
          appointmentId: 'appointment-demo-1',
          issuedAt: new Date(),
        },
        referenceNumber: 'GE-DEMO-001',
        notes: 'First time license applicant',
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'appointment-demo-2',
        userId: 'citizen-demo',
        serviceId: 'passport-renewal',
        departmentId: 'immigration',
        slotId: 'passport-renewal-' + new Date().toISOString().split('T')[0] + '-1400',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        timeSlot: '14:00-15:00',
        status: 'booked',
        qr: {
          appointmentId: 'appointment-demo-2',
          issuedAt: new Date(),
        },
        referenceNumber: 'GE-DEMO-002',
        notes: 'Passport expires next month',
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const appointment of sampleAppointments) {
      await setDoc(doc(db, 'appointments', appointment.id), {
        ...appointment,
        date: Timestamp.fromDate(appointment.date),
        qr: {
          ...appointment.qr,
          issuedAt: Timestamp.fromDate(appointment.qr.issuedAt),
        },
        createdAt: Timestamp.fromDate(appointment.createdAt),
        updatedAt: Timestamp.fromDate(appointment.updatedAt),
      });
      appointmentCount++;
    }

    // 6. Create notifications for demo user
    const notifications = [
      {
        id: 'notif-demo-1',
        userId: 'citizen-demo',
        type: 'appointment_confirmation',
        title: 'Driving License Appointment Confirmed',
        message: 'Your driving license appointment has been confirmed for tomorrow at 10:00 AM. Reference: GE-DEMO-001',
        read: false,
        appointmentId: 'appointment-demo-1',
        createdAt: new Date(),
      },
      {
        id: 'notif-demo-2',
        userId: 'citizen-demo',
        type: 'reminder',
        title: 'Appointment Reminder',
        message: 'Don\'t forget your passport renewal appointment in 2 days at 2:00 PM. Reference: GE-DEMO-002',
        read: false,
        appointmentId: 'appointment-demo-2',
        createdAt: new Date(),
      },
    ];

    for (const notification of notifications) {
      await setDoc(doc(db, 'notifications', notification.id), {
        ...notification,
        createdAt: Timestamp.fromDate(notification.createdAt),
      });
    }

    return {
      departments: departmentCount,
      services: serviceCount,
      slots: slotCount,
      users: userCount,
      appointments: appointmentCount,
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@govease.lk',
    password: 'admin123',
    role: 'System Administrator'
  },
  officer_motor_traffic: {
    email: 'officer.mt@govease.lk',
    password: 'officer123',
    role: 'Motor Traffic Officer'
  },
  officer_immigration: {
    email: 'officer.im@govease.lk', 
    password: 'officer123',
    role: 'Immigration Officer'
  },
  citizen: {
    email: 'citizen@demo.lk',
    password: 'citizen123',
    role: 'Demo Citizen'
  }
};