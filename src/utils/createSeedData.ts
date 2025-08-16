'use client';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const createSeedData = async (userId: string) => {
  try {

    // Create Departments
    const departments = [
      {
        name: 'Department of Motor Traffic',
        code: 'DMT',
        description: 'Vehicle registration, driving licenses, and road transport services',
        contact: {
          phone: '+94-11-2691831',
          email: 'info@dmt.gov.lk',
          address: 'No. 30, Narahenpita Road, Colombo 05'
        },
        workingHours: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          start: '08:30',
          end: '16:30'
        },
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Registrar General\'s Department',
        code: 'RGD',
        description: 'Birth, death, marriage certificates and identity card services',
        contact: {
          phone: '+94-11-2694601',
          email: 'info@rgd.gov.lk',
          address: 'No. 7, Independence Avenue, Colombo 07'
        },
        workingHours: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          start: '08:30',
          end: '16:30'
        },
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Department of Immigration and Emigration',
        code: 'DIE',
        description: 'Passport services, visa processing, and immigration matters',
        contact: {
          phone: '+94-11-2329301',
          email: 'info@immigration.gov.lk',
          address: 'No. 41, Ananda Rajakaruna Mawatha, Colombo 10'
        },
        workingHours: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          start: '08:30',
          end: '16:30'
        },
        createdAt: Timestamp.fromDate(new Date()),
      }
    ];

    const departmentIds: string[] = [];
    for (const dept of departments) {
      const docRef = await addDoc(collection(db, 'departments'), dept);
      departmentIds.push(docRef.id);
    }

    // Create Services
    const services = [
      {
        name: 'Driving License Application',
        description: 'Apply for a new driving license or renew existing license',
        departmentId: departmentIds[0], // DMT
        duration: 60,
        fee: 2500,
        requiredDocuments: [
          'National Identity Card',
          'Medical Certificate',
          'Passport Size Photographs (2)',
          'Eye Test Report'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Vehicle Registration',
        description: 'Register new vehicle or transfer ownership',
        departmentId: departmentIds[0], // DMT
        duration: 45,
        fee: 5000,
        requiredDocuments: [
          'Invoice/Bill of Sale',
          'Insurance Certificate',
          'National Identity Card',
          'Import Permit (if applicable)'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Birth Certificate',
        description: 'Obtain birth certificate for Sri Lankan citizens',
        departmentId: departmentIds[1], // RGD
        duration: 30,
        fee: 250,
        requiredDocuments: [
          'Birth Registration Extract',
          'National Identity Card of Parent',
          'Passport Size Photograph'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Marriage Certificate',
        description: 'Obtain marriage certificate for legal purposes',
        departmentId: departmentIds[1], // RGD
        duration: 30,
        fee: 300,
        requiredDocuments: [
          'Marriage Registration Extract',
          'National Identity Cards of Both Parties',
          'Passport Size Photographs'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Passport Application',
        description: 'Apply for new passport or renew existing passport',
        departmentId: departmentIds[2], // DIE
        duration: 90,
        fee: 3500,
        requiredDocuments: [
          'National Identity Card',
          'Birth Certificate',
          'Passport Size Photographs (4)',
          'Application Form'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      },
      {
        name: 'Visa Extension',
        description: 'Extend tourist or business visa duration',
        departmentId: departmentIds[2], // DIE
        duration: 60,
        fee: 1500,
        requiredDocuments: [
          'Passport',
          'Current Visa',
          'Extension Application Form',
          'Proof of Financial Means'
        ],
        createdAt: Timestamp.fromDate(new Date()),
      }
    ];

    const serviceIds: string[] = [];
    for (const service of services) {
      const docRef = await addDoc(collection(db, 'services'), service);
      serviceIds.push(docRef.id);
    }

    // Create Sample Appointments
    const appointments = [
      {
        userId: userId,
        serviceId: serviceIds[0], // Driving License
        departmentId: departmentIds[0], // DMT
        date: Timestamp.fromDate(new Date(2025, 8, 20, 10, 0)), // Sep 20, 2025 10:00 AM
        timeSlot: '10:00-11:00',
        status: 'pending',
        referenceNumber: `GE${Date.now()}001`,
        notes: 'First time license application',
        documents: [],
        qrCode: '',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      {
        userId: userId,
        serviceId: serviceIds[2], // Birth Certificate
        departmentId: departmentIds[1], // RGD
        date: Timestamp.fromDate(new Date(2025, 8, 22, 14, 0)), // Sep 22, 2025 2:00 PM
        timeSlot: '14:00-14:30',
        status: 'confirmed',
        referenceNumber: `GE${Date.now()}002`,
        notes: 'Need for passport application',
        documents: [],
        qrCode: '',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      {
        userId: userId,
        serviceId: serviceIds[4], // Passport
        departmentId: departmentIds[2], // DIE
        date: Timestamp.fromDate(new Date(2025, 8, 25, 9, 0)), // Sep 25, 2025 9:00 AM
        timeSlot: '09:00-10:30',
        status: 'completed',
        referenceNumber: `GE${Date.now()}003`,
        notes: 'Passport renewal',
        documents: [],
        qrCode: '',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      {
        userId: userId,
        serviceId: serviceIds[1], // Vehicle Registration
        departmentId: departmentIds[0], // DMT
        date: Timestamp.fromDate(new Date(2025, 8, 28, 11, 0)), // Sep 28, 2025 11:00 AM
        timeSlot: '11:00-11:45',
        status: 'pending',
        referenceNumber: `GE${Date.now()}004`,
        notes: 'New car registration',
        documents: [],
        qrCode: '',
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      }
    ];

    for (const appointment of appointments) {
      const docRef = await addDoc(collection(db, 'appointments'), appointment);
    }
    return {
      departments: departmentIds.length,
      services: serviceIds.length,
      appointments: appointments.length
    };

  } catch (error) {
    throw error;
  }
};