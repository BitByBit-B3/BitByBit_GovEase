// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addCitizenDemoData() {
  try {
    console.log('🎯 Adding MASSIVE seed data for citizen.demo@govease.lk...');
    
    // Get the citizen's actual UID from Firebase Auth users
    const citizenUID = 'ny4QBNzjJ2UxyTMJnrkpuMG4Ulu2'; // This is the actual UID from our test
    
    // Update the citizen user profile with complete data
    await setDoc(doc(db, 'users', citizenUID), {
      name: 'Amal Perera',
      email: 'citizen.demo@govease.lk',
      phone: '+94771234567',
      nic: '123456789V',
      role: 'citizen',
      createdAt: new Date('2024-06-15T08:00:00Z'),
      updatedAt: new Date()
    });
    console.log('✅ Updated citizen user profile');

    // Create MASSIVE appointments for this citizen
    const citizenAppointments = [
      // COMPLETED APPOINTMENTS (Past)
      {
        id: 'citizen-apt-001',
        userId: citizenUID,
        serviceId: 'demo-service-driving-license',
        departmentId: 'demo-dept-motor-traffic',
        date: new Date('2024-11-15T10:00:00Z'),
        timeSlot: '10:00-11:00',
        status: 'completed',
        qrCode: 'QR-DL-CITIZEN-20241115',
        referenceNumber: 'GE-2024-DL-001',
        documents: [],
        notes: 'First time driving license application - completed successfully',
        createdAt: new Date('2024-11-10T09:00:00Z'),
        updatedAt: new Date('2024-11-15T11:30:00Z')
      },
      {
        id: 'citizen-apt-002',
        userId: citizenUID,
        serviceId: 'demo-service-birth-certificate',
        departmentId: 'demo-dept-registrar-general',
        date: new Date('2024-12-05T14:00:00Z'),
        timeSlot: '14:00-14:20',
        status: 'completed',
        qrCode: 'QR-BC-CITIZEN-20241205',
        referenceNumber: 'GE-2024-BC-002',
        documents: [],
        notes: 'Birth certificate for passport application - completed',
        createdAt: new Date('2024-11-28T16:00:00Z'),
        updatedAt: new Date('2024-12-05T14:45:00Z')
      },
      {
        id: 'citizen-apt-003',
        userId: citizenUID,
        serviceId: 'demo-service-passport-application',
        departmentId: 'demo-dept-immigration',
        date: new Date('2024-12-20T09:30:00Z'),
        timeSlot: '09:30-10:00',
        status: 'completed',
        qrCode: 'QR-PP-CITIZEN-20241220',
        referenceNumber: 'GE-2024-PP-003',
        documents: [],
        notes: 'New passport application - approved and completed',
        createdAt: new Date('2024-12-10T11:00:00Z'),
        updatedAt: new Date('2024-12-20T11:00:00Z')
      },
      
      // CONFIRMED APPOINTMENTS (Upcoming)
      {
        id: 'citizen-apt-004',
        userId: citizenUID,
        serviceId: 'demo-service-vehicle-registration',
        departmentId: 'demo-dept-motor-traffic',
        date: new Date('2025-02-18T11:00:00Z'),
        timeSlot: '11:00-11:45',
        status: 'confirmed',
        qrCode: 'QR-VR-CITIZEN-20250218',
        referenceNumber: 'GE-2025-VR-004',
        documents: [],
        notes: 'New vehicle registration for Honda Civic 2024',
        createdAt: new Date('2025-01-20T10:00:00Z'),
        updatedAt: new Date('2025-01-20T15:30:00Z')
      },
      {
        id: 'citizen-apt-005',
        userId: citizenUID,
        serviceId: 'demo-service-tax-registration',
        departmentId: 'demo-dept-inland-revenue',
        date: new Date('2025-02-25T15:00:00Z'),
        timeSlot: '15:00-15:35',
        status: 'confirmed',
        qrCode: 'QR-TR-CITIZEN-20250225',
        referenceNumber: 'GE-2025-TR-005',
        documents: [],
        notes: 'Business tax registration for new consulting firm',
        createdAt: new Date('2025-01-22T14:00:00Z'),
        updatedAt: new Date('2025-01-22T16:00:00Z')
      },
      
      // PENDING APPOINTMENTS
      {
        id: 'citizen-apt-006',
        userId: citizenUID,
        serviceId: 'demo-service-marriage-certificate',
        departmentId: 'demo-dept-registrar-general',
        date: new Date('2025-03-10T13:30:00Z'),
        timeSlot: '13:30-14:00',
        status: 'pending',
        qrCode: 'QR-MC-CITIZEN-20250310',
        referenceNumber: 'GE-2025-MC-006',
        documents: [],
        notes: 'Marriage certificate application - pending officer approval',
        createdAt: new Date('2025-01-25T09:00:00Z'),
        updatedAt: new Date('2025-01-25T09:00:00Z')
      },
      {
        id: 'citizen-apt-007',
        userId: citizenUID,
        serviceId: 'demo-service-passport-renewal',
        departmentId: 'demo-dept-immigration',
        date: new Date('2025-03-15T10:30:00Z'),
        timeSlot: '10:30-10:55',
        status: 'pending',
        qrCode: 'QR-PR-CITIZEN-20250315',
        referenceNumber: 'GE-2025-PR-007',
        documents: [],
        notes: 'Passport renewal - submitted for processing',
        createdAt: new Date('2025-01-28T11:30:00Z'),
        updatedAt: new Date('2025-01-28T11:30:00Z')
      }
    ];

    console.log('📅 Creating citizen appointments...');
    for (const appointment of citizenAppointments) {
      await setDoc(doc(db, 'appointments', appointment.id), appointment);
      console.log(`✅ Added appointment: ${appointment.referenceNumber} (${appointment.status})`);
    }

    // Create MASSIVE feedback entries for completed appointments
    const citizenFeedbacks = [
      {
        id: 'citizen-feedback-001',
        appointmentId: 'citizen-apt-001',
        userId: citizenUID,
        rating: 5,
        comment: 'Excellent service! The driving license process was smooth and the staff was very helpful. Highly recommend the digital booking system.',
        createdAt: new Date('2024-11-15T12:00:00Z')
      },
      {
        id: 'citizen-feedback-002',
        appointmentId: 'citizen-apt-002',
        userId: citizenUID,
        rating: 4,
        comment: 'Good experience getting my birth certificate. Quick process but had to wait a bit longer than expected.',
        createdAt: new Date('2024-12-05T15:30:00Z')
      },
      {
        id: 'citizen-feedback-003',
        appointmentId: 'citizen-apt-003',
        userId: citizenUID,
        rating: 5,
        comment: 'Outstanding passport service! Very professional staff and the online appointment system made everything so convenient.',
        createdAt: new Date('2024-12-20T16:00:00Z')
      }
    ];

    console.log('💭 Creating citizen feedback...');
    for (const feedback of citizenFeedbacks) {
      await setDoc(doc(db, 'feedback', feedback.id), feedback);
      console.log(`✅ Added feedback: ${feedback.rating} stars for ${feedback.appointmentId}`);
    }

    // Create MASSIVE notifications for this citizen
    const citizenNotifications = [
      // Recent notifications
      {
        id: 'citizen-notif-001',
        userId: citizenUID,
        type: 'appointment_confirmation',
        title: 'Vehicle Registration Confirmed',
        message: 'Your vehicle registration appointment has been confirmed for February 18, 2025 at 11:00 AM. Please bring all required documents.',
        read: false,
        createdAt: new Date('2025-01-20T15:30:00Z')
      },
      {
        id: 'citizen-notif-002',
        userId: citizenUID,
        type: 'appointment_confirmation',
        title: 'Tax Registration Confirmed',
        message: 'Your business tax registration appointment has been confirmed for February 25, 2025 at 3:00 PM.',
        read: false,
        createdAt: new Date('2025-01-22T16:00:00Z')
      },
      {
        id: 'citizen-notif-003',
        userId: citizenUID,
        type: 'reminder',
        title: 'Upcoming Appointment Reminder',
        message: 'Reminder: You have a vehicle registration appointment tomorrow at 11:00 AM. Reference: GE-2025-VR-004',
        read: false,
        createdAt: new Date('2025-02-17T09:00:00Z')
      },
      {
        id: 'citizen-notif-004',
        userId: citizenUID,
        type: 'status_update',
        title: 'Marriage Certificate Under Review',
        message: 'Your marriage certificate application (GE-2025-MC-006) is currently under review. We will notify you once approved.',
        read: true,
        createdAt: new Date('2025-01-26T10:00:00Z')
      },
      {
        id: 'citizen-notif-005',
        userId: citizenUID,
        type: 'status_update',
        title: 'Passport Application Completed',
        message: 'Great news! Your passport application has been completed successfully. You can collect it from the office.',
        read: true,
        createdAt: new Date('2024-12-20T11:30:00Z')
      },
      {
        id: 'citizen-notif-006',
        userId: citizenUID,
        type: 'document_review',
        title: 'Document Verification Required',
        message: 'Please verify your submitted documents for passport renewal application. Log in to check details.',
        read: false,
        createdAt: new Date('2025-01-29T14:00:00Z')
      },
      {
        id: 'citizen-notif-007',
        userId: citizenUID,
        type: 'appointment_confirmation',
        title: 'Birth Certificate Completed',
        message: 'Your birth certificate has been processed and is ready for collection. Thank you for using GovEase!',
        read: true,
        createdAt: new Date('2024-12-05T15:00:00Z')
      },
      {
        id: 'citizen-notif-008',
        userId: citizenUID,
        type: 'reminder',
        title: 'Driving License Collection',
        message: 'Your driving license is ready for collection. Please visit the DMT office with your receipt.',
        read: true,
        createdAt: new Date('2024-11-16T10:00:00Z')
      }
    ];

    console.log('🔔 Creating citizen notifications...');
    for (const notification of citizenNotifications) {
      await setDoc(doc(db, 'notifications', notification.id), notification);
      console.log(`✅ Added notification: ${notification.title}`);
    }

    // Add some activity tracking data
    const citizenActivity = {
      id: `citizen-activity-${citizenUID}`,
      userId: citizenUID,
      totalAppointments: citizenAppointments.length,
      completedAppointments: citizenAppointments.filter(apt => apt.status === 'completed').length,
      pendingAppointments: citizenAppointments.filter(apt => apt.status === 'pending').length,
      confirmedAppointments: citizenAppointments.filter(apt => apt.status === 'confirmed').length,
      averageRating: 4.7,
      joinedDate: new Date('2024-06-15T08:00:00Z'),
      lastActivity: new Date(),
      favoriteServices: ['demo-service-driving-license', 'demo-service-passport-application'],
      preferredDepartments: ['demo-dept-motor-traffic', 'demo-dept-immigration'],
      stats: {
        appointmentsThisMonth: 2,
        appointmentsThisYear: 7,
        totalFeedbackGiven: 3,
        documentsUploaded: 12,
        avgProcessingTime: '2.5 days'
      }
    };

    await setDoc(doc(db, 'user_activity', citizenActivity.id), citizenActivity);
    console.log('✅ Created citizen activity tracking data');

    console.log('\n🎉 CITIZEN DEMO DATA CREATION COMPLETED!');
    console.log('================================================');
    console.log(`✅ Citizen Profile: Updated with complete info`);
    console.log(`✅ Appointments: ${citizenAppointments.length} appointments created`);
    console.log(`   - Completed: ${citizenAppointments.filter(apt => apt.status === 'completed').length}`);
    console.log(`   - Confirmed: ${citizenAppointments.filter(apt => apt.status === 'confirmed').length}`);
    console.log(`   - Pending: ${citizenAppointments.filter(apt => apt.status === 'pending').length}`);
    console.log(`✅ Feedback: ${citizenFeedbacks.length} feedback entries`);
    console.log(`✅ Notifications: ${citizenNotifications.length} notifications`);
    console.log(`✅ Activity Tracking: Complete stats and preferences`);
    console.log('================================================');
    console.log('🚀 CITIZEN DASHBOARD WILL NOW BE RICH WITH DATA!');
    console.log('🎯 citizen.demo@govease.lk will see:');
    console.log('   - Past completed appointments with feedback');
    console.log('   - Upcoming confirmed appointments');
    console.log('   - Pending applications in review');
    console.log('   - Recent notifications and reminders');
    console.log('   - Complete activity history and stats');
    console.log('================================================');
    
  } catch (error) {
    console.error('❌ Error creating citizen demo data:', error);
    process.exit(1);
  }
}

// Run the citizen data creation
addCitizenDemoData();