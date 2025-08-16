// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, addDoc, Timestamp } = require('firebase/firestore');

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

// Generate random dates for realistic demo data
function getRandomDate(daysBack, daysForward = 0) {
  const today = new Date();
  const start = new Date(today.getTime() - (daysBack * 24 * 60 * 60 * 1000));
  const end = new Date(today.getTime() + (daysForward * 24 * 60 * 60 * 1000));
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate random time slots
function getRandomTimeSlot() {
  const hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  const startTime = hours[Math.floor(Math.random() * hours.length)];
  const startHour = parseInt(startTime.split(':')[0]);
  const startMin = parseInt(startTime.split(':')[1]);
  const endMin = startMin + 30 + Math.floor(Math.random() * 60); // 30-90 minute appointments
  const endHour = startHour + Math.floor(endMin / 60);
  const finalEndMin = endMin % 60;
  const endTime = `${endHour.toString().padStart(2, '0')}:${finalEndMin.toString().padStart(2, '0')}`;
  return `${startTime}-${endTime}`;
}

// Sri Lankan names for realistic demo data
const sriLankanNames = [
  'Asanka Perera', 'Buddhika Silva', 'Chaminda Fernando', 'Dilshan Jayawardena', 'Eranga Wickramasinghe',
  'Fathima Rasheed', 'Gayan Amarasinghe', 'Harsha Gunasekara', 'Ishara Mendis', 'Janaka Rajapaksa',
  'Kamal Dissanayake', 'Lalitha Wijeratne', 'Mahesh Abeysinghe', 'Nimal Bandara', 'Osanda Kumara',
  'Priyanka Seneviratne', 'Quintus De Silva', 'Rasika Liyanage', 'Saman Pathirana', 'Thilini Ranasinghe',
  'Udara Senanayake', 'Vindya Herath', 'Wasantha Munasinghe', 'Xiomara Peris', 'Yasoda Gamage',
  'Zenith Cooray', 'Anushka Rathnayake', 'Bhagya Kodikara', 'Chathura Weerasinghe', 'Danushka Madushanka',
  'Erandi Weerasooriya', 'Fasika Kariyawasam', 'Ganga Wijesekara', 'Hasitha Dharmasena', 'Iresha Samaraweera',
  'Jagath Wimalasiri', 'Kushani Wickremaratne', 'Lasith Embuldeniya', 'Malani Gunawardena', 'Nayana Randunu',
  'Oshada Serasinghe', 'Prasanna Hettiarachchi', 'Qadry Ismail', 'Roshan Mahanama', 'Sachini Nisansala',
  'Tharanga Vithanage', 'Upul Tharanga', 'Vimukthi Weeratunga', 'Waseem Akram', 'Yasas Samarawickrama',
  'Zinzan Weerakoon', 'Amila Rodrigo', 'Binura Kodithuwakku', 'Charith Asalanka', 'Dinesh Jayasinghe'
];

// Generate NIC numbers
function generateNIC() {
  const year = Math.floor(Math.random() * 30) + 70; // 70-99 for old format
  const days = Math.floor(Math.random() * 365) + 1;
  const serial = Math.floor(Math.random() * 9999) + 1;
  return `${year}${days.toString().padStart(3, '0')}${serial.toString().padStart(4, '0')}V`;
}

// Generate phone numbers
function generatePhone() {
  const prefixes = ['070', '071', '072', '075', '076', '077', '078'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `+94${prefix}${number}`;
}

// Status options
const appointmentStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'];
const notificationTypes = ['appointment_confirmation', 'reminder', 'status_update', 'document_review'];

async function createMassiveDemoData() {
  try {
    console.log('🚀 Creating MASSIVE demo data for killer presentation...');
    
    // Get the existing department and service IDs
    const departmentIds = [
      'demo-dept-motor-traffic',
      'demo-dept-immigration', 
      'demo-dept-registrar-general',
      'demo-dept-inland-revenue'
    ];

    const serviceIds = [
      'demo-service-driving-license', 'demo-service-vehicle-registration', 'demo-service-license-renewal',
      'demo-service-passport-application', 'demo-service-passport-renewal', 'demo-service-visa-extension',
      'demo-service-birth-certificate', 'demo-service-marriage-certificate', 'demo-service-death-certificate',
      'demo-service-tax-registration', 'demo-service-tax-filing', 'demo-service-tax-clearance'
    ];

    // Create 50 additional citizen users
    console.log('👥 Creating 50 additional citizen users...');
    const citizenUsers = [];
    for (let i = 1; i <= 50; i++) {
      const name = sriLankanNames[Math.floor(Math.random() * sriLankanNames.length)];
      const user = {
        uid: `demo-citizen-${String(i + 5).padStart(3, '0')}`,
        email: `citizen${i}@demo.govease.lk`,
        name: name,
        nic: generateNIC(),
        phone: generatePhone(),
        role: 'citizen',
        createdAt: getRandomDate(180),
        updatedAt: getRandomDate(30)
      };
      
      await setDoc(doc(db, 'users', user.uid), user);
      citizenUsers.push(user);
      
      if (i % 10 === 0) {
        console.log(`✅ Created ${i}/50 citizen users`);
      }
    }

    // Create 200 massive appointments with varied statuses
    console.log('📅 Creating 200 appointments for rich demo data...');
    const appointments = [];
    for (let i = 1; i <= 200; i++) {
      const userId = i <= 50 ? citizenUsers[i - 1].uid : 'demo-citizen-001';
      const serviceId = serviceIds[Math.floor(Math.random() * serviceIds.length)];
      const departmentId = departmentIds[Math.floor(Math.random() * departmentIds.length)];
      const status = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];
      
      // Create dates with realistic distribution
      let appointmentDate;
      if (status === 'completed') {
        appointmentDate = getRandomDate(60, 0); // Past dates for completed
      } else if (status === 'cancelled' || status === 'no-show') {
        appointmentDate = getRandomDate(30, 0); // Recent past for cancelled/no-show
      } else {
        appointmentDate = getRandomDate(0, 30); // Future dates for pending/confirmed
      }

      const appointment = {
        id: `demo-appointment-${String(i + 10).padStart(3, '0')}`,
        userId: userId,
        serviceId: serviceId,
        departmentId: departmentId,
        date: appointmentDate,
        timeSlot: getRandomTimeSlot(),
        status: status,
        qrCode: `QR-${serviceId.split('-').pop().toUpperCase()}-${i}-${appointmentDate.getFullYear()}${(appointmentDate.getMonth() + 1).toString().padStart(2, '0')}${appointmentDate.getDate().toString().padStart(2, '0')}`,
        referenceNumber: `GE-2025-${String(i + 10).padStart(3, '0')}`,
        documents: [],
        notes: `Appointment for ${serviceId.replace('demo-service-', '').replace('-', ' ')}`,
        createdAt: getRandomDate(90),
        updatedAt: getRandomDate(30)
      };
      
      await setDoc(doc(db, 'appointments', appointment.id), appointment);
      appointments.push(appointment);
      
      if (i % 25 === 0) {
        console.log(`✅ Created ${i}/200 appointments`);
      }
    }

    // Create 100 feedback entries
    console.log('💭 Creating 100 feedback entries...');
    const feedbacks = [];
    for (let i = 1; i <= 100; i++) {
      const completedAppointments = appointments.filter(apt => apt.status === 'completed');
      const randomAppointment = completedAppointments[Math.floor(Math.random() * completedAppointments.length)];
      
      if (randomAppointment) {
        const rating = Math.floor(Math.random() * 5) + 1;
        const comments = [
          'Excellent service! Very professional and efficient.',
          'Good experience overall, staff was helpful.',
          'Process was smooth and well organized.',
          'Could be improved but generally satisfied.',
          'Outstanding service quality and quick processing.',
          'Average service, met expectations.',
          'Impressed with the digital system and ease of use.',
          'Staff was courteous and knowledgeable.',
          'Quick and hassle-free experience.',
          'Professional handling of my requirements.'
        ];
        
        const feedback = {
          id: `demo-feedback-${String(i + 2).padStart(3, '0')}`,
          appointmentId: randomAppointment.id,
          userId: randomAppointment.userId,
          rating: rating,
          comment: comments[Math.floor(Math.random() * comments.length)],
          createdAt: getRandomDate(60)
        };
        
        await setDoc(doc(db, 'feedback', feedback.id), feedback);
        feedbacks.push(feedback);
      }
      
      if (i % 20 === 0) {
        console.log(`✅ Created ${i}/100 feedback entries`);
      }
    }

    // Create 150 notifications
    console.log('🔔 Creating 150 notifications...');
    const notifications = [];
    for (let i = 1; i <= 150; i++) {
      const randomAppointment = appointments[Math.floor(Math.random() * appointments.length)];
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      
      const titles = {
        'appointment_confirmation': 'Appointment Confirmed',
        'reminder': 'Appointment Reminder',
        'status_update': 'Status Update',
        'document_review': 'Document Review'
      };
      
      const messages = {
        'appointment_confirmation': `Your appointment has been confirmed for ${randomAppointment.date.toLocaleDateString()}.`,
        'reminder': `Reminder: Your appointment is scheduled for tomorrow at ${randomAppointment.timeSlot.split('-')[0]}.`,
        'status_update': `Your appointment status has been updated to ${randomAppointment.status}.`,
        'document_review': 'Please review and update your submitted documents.'
      };
      
      const notification = {
        id: `demo-notif-${String(i + 7).padStart(3, '0')}`,
        userId: randomAppointment.userId,
        type: type,
        title: titles[type],
        message: messages[type],
        read: Math.random() > 0.3, // 70% read rate
        createdAt: getRandomDate(90)
      };
      
      await setDoc(doc(db, 'notifications', notification.id), notification);
      notifications.push(notification);
      
      if (i % 30 === 0) {
        console.log(`✅ Created ${i}/150 notifications`);
      }
    }

    // Create comprehensive analytics data
    console.log('📊 Creating comprehensive analytics data...');
    const analyticsData = {
      id: 'demo-analytics-comprehensive',
      type: 'comprehensive_data',
      data: {
        totalAppointments: appointments.length + 12, // Include original appointments
        completedAppointments: appointments.filter(apt => apt.status === 'completed').length + 3,
        confirmedAppointments: appointments.filter(apt => apt.status === 'confirmed').length + 2,
        pendingAppointments: appointments.filter(apt => apt.status === 'pending').length + 2,
        cancelledAppointments: appointments.filter(apt => apt.status === 'cancelled').length,
        noShowAppointments: appointments.filter(apt => apt.status === 'no-show').length,
        averageRating: (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length).toFixed(1),
        totalUsers: citizenUsers.length + 11, // Include original demo users
        totalFeedback: feedbacks.length + 2,
        totalNotifications: notifications.length + 7,
        departmentStats: {
          'demo-dept-motor-traffic': { 
            total: appointments.filter(apt => apt.departmentId === 'demo-dept-motor-traffic').length + 3,
            completed: appointments.filter(apt => apt.departmentId === 'demo-dept-motor-traffic' && apt.status === 'completed').length + 2,
            rating: 4.3 
          },
          'demo-dept-immigration': { 
            total: appointments.filter(apt => apt.departmentId === 'demo-dept-immigration').length + 3,
            completed: appointments.filter(apt => apt.departmentId === 'demo-dept-immigration' && apt.status === 'completed').length + 2,
            rating: 4.4 
          },
          'demo-dept-registrar-general': { 
            total: appointments.filter(apt => apt.departmentId === 'demo-dept-registrar-general').length + 3,
            completed: appointments.filter(apt => apt.departmentId === 'demo-dept-registrar-general' && apt.status === 'completed').length + 1,
            rating: 4.0 
          },
          'demo-dept-inland-revenue': { 
            total: appointments.filter(apt => apt.departmentId === 'demo-dept-inland-revenue').length + 3,
            completed: appointments.filter(apt => apt.departmentId === 'demo-dept-inland-revenue' && apt.status === 'completed').length + 1,
            rating: 3.8 
          }
        },
        monthlyTrends: {
          'January': Math.floor(Math.random() * 50) + 40,
          'February': Math.floor(Math.random() * 60) + 45,
          'March': Math.floor(Math.random() * 55) + 50,
          'April': Math.floor(Math.random() * 65) + 55,
          'May': Math.floor(Math.random() * 70) + 60,
          'June': Math.floor(Math.random() * 75) + 65
        },
        peakHours: ['10:00', '11:00', '14:00', '15:00'],
        servicePopularity: serviceIds.reduce((acc, serviceId) => {
          acc[serviceId] = appointments.filter(apt => apt.serviceId === serviceId).length + Math.floor(Math.random() * 10);
          return acc;
        }, {})
      },
      dateRange: {
        start: new Date('2025-01-01T00:00:00Z'),
        end: new Date('2025-12-31T23:59:59Z')
      },
      generatedAt: new Date()
    };

    await setDoc(doc(db, 'analytics', analyticsData.id), analyticsData);
    console.log('✅ Created comprehensive analytics data');

    console.log('\n🎉 MASSIVE DEMO DATA CREATION COMPLETED!');
    console.log('================================================');
    console.log(`✅ Total Citizens: ${citizenUsers.length + 5} users`);
    console.log(`✅ Total Appointments: ${appointments.length + 12} appointments`);
    console.log(`✅ Total Feedback: ${feedbacks.length + 2} entries`);
    console.log(`✅ Total Notifications: ${notifications.length + 7} notifications`);
    console.log('✅ Comprehensive Analytics: Generated');
    console.log('================================================');
    console.log('🚀 YOUR DEMO IS NOW LOADED WITH MASSIVE DATA!');
    console.log('🔥 Frontend will look INCREDIBLE with all this data!');
    console.log('📊 Analytics dashboard will be RICH and impressive!');
    console.log('👥 User dashboards will show realistic activity!');
    console.log('================================================');
    
  } catch (error) {
    console.error('❌ Error creating massive demo data:', error);
    process.exit(1);
  }
}

// Run the massive data creation
createMassiveDemoData();