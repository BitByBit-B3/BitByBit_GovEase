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

const sampleDepartments = [
  {
    name: "Department of Motor Traffic",
    description: "Vehicle registration, driving licenses, and traffic-related services",
    location: "Werahera, Battaramulla",
    contactNumber: "+94-11-2877877",
    email: "info@motortraffic.gov.lk",
    workingHours: {
      start: "08:30",
      end: "16:30",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    services: [],
    isActive: true,
    createdAt: new Date()
  },
  {
    name: "Department of Immigration & Emigration",
    description: "Passport services, visa processing, and immigration matters",
    location: "Battaramulla",
    contactNumber: "+94-11-5329000",
    email: "info@immigration.gov.lk",
    workingHours: {
      start: "08:00",
      end: "16:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    services: [],
    isActive: true,
    createdAt: new Date()
  },
  {
    name: "Registrar General's Department",
    description: "Birth, death, marriage certificates and civil registration",
    location: "Colombo 07",
    contactNumber: "+94-11-2694671",
    email: "info@rgd.gov.lk",
    workingHours: {
      start: "08:30",
      end: "16:15",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    services: [],
    isActive: true,
    createdAt: new Date()
  },
  {
    name: "Department of Inland Revenue",
    description: "Tax registration, returns filing, and revenue services",
    location: "Sir Chittampalam A. Gardiner Mawatha, Colombo 02",
    contactNumber: "+94-11-2328162",
    email: "info@ird.gov.lk",
    workingHours: {
      start: "08:30",
      end: "16:30",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    services: [],
    isActive: true,
    createdAt: new Date()
  }
];

const sampleServices = [
  // Department of Motor Traffic Services
  {
    name: "Driving License Application",
    description: "Apply for a new driving license for various vehicle categories",
    duration: 60,
    requiredDocuments: [
      "National Identity Card",
      "Medical Certificate",
      "Eye Report",
      "Completed Application Form",
      "Passport-size Photographs (2)"
    ],
    fee: 2500,
    isActive: true,
    availableSlots: 20,
    createdAt: new Date()
  },
  {
    name: "Vehicle Registration",
    description: "Register a new vehicle or transfer ownership",
    duration: 45,
    requiredDocuments: [
      "Vehicle Import Permit",
      "Bill of Sale",
      "National Identity Card",
      "Insurance Certificate",
      "Technical Inspection Report"
    ],
    fee: 5000,
    isActive: true,
    availableSlots: 15,
    createdAt: new Date()
  },
  {
    name: "License Renewal",
    description: "Renew your existing driving license",
    duration: 30,
    requiredDocuments: [
      "Current Driving License",
      "National Identity Card",
      "Medical Certificate (if required)"
    ],
    fee: 1500,
    isActive: true,
    availableSlots: 25,
    createdAt: new Date()
  },
  // Department of Immigration & Emigration Services
  {
    name: "Passport Application",
    description: "Apply for a new Sri Lankan passport",
    duration: 30,
    requiredDocuments: [
      "Birth Certificate",
      "National Identity Card",
      "Passport-size Photographs (2)",
      "Completed Application Form"
    ],
    fee: 3500,
    isActive: true,
    availableSlots: 30,
    createdAt: new Date()
  },
  {
    name: "Passport Renewal",
    description: "Renew your existing Sri Lankan passport",
    duration: 25,
    requiredDocuments: [
      "Current Passport",
      "National Identity Card",
      "Passport-size Photographs (2)",
      "Completed Application Form"
    ],
    fee: 3000,
    isActive: true,
    availableSlots: 35,
    createdAt: new Date()
  },
  {
    name: "Visa Extension",
    description: "Extend your current visa status",
    duration: 40,
    requiredDocuments: [
      "Current Passport",
      "Current Visa",
      "Sponsor Letter",
      "Bank Statements",
      "Application Form"
    ],
    fee: 2000,
    isActive: true,
    availableSlots: 10,
    createdAt: new Date()
  },
  // Registrar General's Department Services
  {
    name: "Birth Certificate",
    description: "Obtain a certified copy of birth certificate",
    duration: 20,
    requiredDocuments: [
      "Birth Registration Form",
      "Parent's National Identity Cards",
      "Hospital Birth Report"
    ],
    fee: 100,
    isActive: true,
    availableSlots: 40,
    createdAt: new Date()
  },
  {
    name: "Marriage Certificate",
    description: "Register marriage and obtain certificate",
    duration: 30,
    requiredDocuments: [
      "Birth Certificates of Both Parties",
      "National Identity Cards",
      "Divorce Decree (if applicable)",
      "Notice of Marriage"
    ],
    fee: 500,
    isActive: true,
    availableSlots: 20,
    createdAt: new Date()
  },
  {
    name: "Death Certificate",
    description: "Register death and obtain certificate",
    duration: 25,
    requiredDocuments: [
      "Medical Certificate of Death",
      "National Identity Card of Deceased",
      "Next of Kin ID"
    ],
    fee: 100,
    isActive: true,
    availableSlots: 15,
    createdAt: new Date()
  },
  // Department of Inland Revenue Services
  {
    name: "Tax Registration",
    description: "Register for tax identification number",
    duration: 35,
    requiredDocuments: [
      "National Identity Card",
      "Business Registration Certificate",
      "Bank Account Details",
      "Address Proof"
    ],
    fee: 0,
    isActive: true,
    availableSlots: 25,
    createdAt: new Date()
  },
  {
    name: "Tax Return Filing",
    description: "File annual income tax return",
    duration: 45,
    requiredDocuments: [
      "Tax Registration Certificate",
      "Income Statements",
      "Bank Statements",
      "Receipts for Deductions"
    ],
    fee: 0,
    isActive: true,
    availableSlots: 20,
    createdAt: new Date()
  },
  {
    name: "Tax Clearance Certificate",
    description: "Obtain tax clearance for various purposes",
    duration: 30,
    requiredDocuments: [
      "Tax Registration Certificate",
      "Last 3 Years Tax Returns",
      "Payment Receipts",
      "Application Form"
    ],
    fee: 1000,
    isActive: true,
    availableSlots: 15,
    createdAt: new Date()
  }
];

// Demo users for each role
const demoUsers = [
  // CITIZENS
  {
    uid: 'demo-citizen-001',
    email: 'citizen.demo@govease.lk',
    name: 'Amal Perera',
    nic: '123456789V',
    phone: '+94771234567',
    role: 'citizen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-citizen-002', 
    email: 'nimal.silva@gmail.com',
    name: 'Nimal Silva',
    nic: '234567890V',
    phone: '+94772345678',
    role: 'citizen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-citizen-003',
    email: 'sita.fernando@yahoo.com',
    name: 'Sita Fernando',
    nic: '345678901V',
    phone: '+94773456789',
    role: 'citizen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-citizen-004',
    email: 'kamal.jayasinghe@hotmail.com',
    name: 'Kamal Jayasinghe',
    nic: '456789012V',
    phone: '+94774567890',
    role: 'citizen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-citizen-005',
    email: 'priya.wickramasinghe@gmail.com',
    name: 'Priya Wickramasinghe',
    nic: '567890123V',
    phone: '+94775678901',
    role: 'citizen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // OFFICERS
  {
    uid: 'demo-officer-001',
    email: 'officer.demo@motortraffic.gov.lk',
    name: 'Sunil Fernando',
    nic: '987654321V',
    phone: '+94777654321',
    role: 'officer',
    department: 'demo-dept-motor-traffic',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-officer-002',
    email: 'immigration.officer@immigration.gov.lk',
    name: 'Malini Rajapaksa',
    nic: '876543210V',
    phone: '+94778765432',
    role: 'officer',
    department: 'demo-dept-immigration',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-officer-003',
    email: 'registrar.officer@rgd.gov.lk',
    name: 'Chandana Wijesinghe',
    nic: '765432109V',
    phone: '+94779876543',
    role: 'officer',
    department: 'demo-dept-registrar-general',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-officer-004',
    email: 'tax.officer@ird.gov.lk',
    name: 'Ranjith Gunasekara',
    nic: '654321098V',
    phone: '+94770987654',
    role: 'officer',
    department: 'demo-dept-inland-revenue',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // ADMINS
  {
    uid: 'demo-admin-001',
    email: 'admin.demo@govease.lk',
    name: 'Kumari Silva',
    nic: '555666777V',
    phone: '+94775556677',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'demo-admin-002',
    email: 'super.admin@govease.lk',
    name: 'Lakshman Abeysinghe',
    nic: '111222333V',
    phone: '+94771112223',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting comprehensive database seeding...');
    
    // Add departments with fixed IDs
    const departmentIds = [
      'demo-dept-motor-traffic',
      'demo-dept-immigration', 
      'demo-dept-registrar-general',
      'demo-dept-inland-revenue'
    ];
    
    console.log('📋 Creating departments...');
    for (let i = 0; i < sampleDepartments.length; i++) {
      const department = sampleDepartments[i];
      const departmentId = departmentIds[i];
      
      await setDoc(doc(db, 'departments', departmentId), {
        ...department,
        id: departmentId
      });
      console.log(`✅ Added department: ${department.name}`);
    }

    // Add services with department references and fixed IDs
    const servicesByDepartment = [
      sampleServices.slice(0, 3),  // Motor Traffic services
      sampleServices.slice(3, 6),  // Immigration services
      sampleServices.slice(6, 9),  // Registrar General services
      sampleServices.slice(9, 12)  // Inland Revenue services
    ];

    const serviceIdPrefixes = [
      'demo-service-driving-license', 'demo-service-vehicle-registration', 'demo-service-license-renewal',
      'demo-service-passport-application', 'demo-service-passport-renewal', 'demo-service-visa-extension',
      'demo-service-birth-certificate', 'demo-service-marriage-certificate', 'demo-service-death-certificate',
      'demo-service-tax-registration', 'demo-service-tax-filing', 'demo-service-tax-clearance'
    ];

    console.log('🛠️ Creating services...');
    let serviceIndex = 0;
    for (let i = 0; i < departmentIds.length; i++) {
      const departmentId = departmentIds[i];
      const departmentServices = servicesByDepartment[i];
      
      for (const service of departmentServices) {
        const serviceId = serviceIdPrefixes[serviceIndex];
        const serviceData = {
          ...service,
          id: serviceId,
          departmentId
        };
        
        await setDoc(doc(db, 'services', serviceId), serviceData);
        console.log(`✅ Added service: ${service.name} to ${sampleDepartments[i].name}`);
        serviceIndex++;
      }
    }

    // Add demo users to Firestore
    console.log('👥 Creating demo users...');
    for (const user of demoUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
      console.log(`✅ Added demo user: ${user.name} (${user.role})`);
    }

    // Add sample appointments
    console.log('📅 Creating sample appointments...');
    const sampleAppointments = [
      {
        id: 'demo-appointment-001',
        userId: 'demo-citizen-001',
        serviceId: 'demo-service-driving-license',
        departmentId: 'demo-dept-motor-traffic',
        date: new Date('2025-01-20T10:00:00Z'),
        timeSlot: '10:00-11:00',
        status: 'confirmed',
        qrCode: 'QR-DL-001-20250120',
        referenceNumber: 'GE-2025-001',
        documents: [],
        notes: 'First time driving license application',
        createdAt: new Date('2025-01-15T12:00:00Z'),
        updatedAt: new Date('2025-01-15T14:00:00Z')
      },
      {
        id: 'demo-appointment-002',
        userId: 'demo-citizen-002',
        serviceId: 'demo-service-vehicle-registration',
        departmentId: 'demo-dept-motor-traffic',
        date: new Date('2025-01-18T09:00:00Z'),
        timeSlot: '09:00-09:45',
        status: 'completed',
        qrCode: 'QR-VR-002-20250118',
        referenceNumber: 'GE-2025-002',
        documents: [],
        notes: 'New car registration',
        createdAt: new Date('2025-01-12T08:00:00Z'),
        updatedAt: new Date('2025-01-18T10:00:00Z')
      },
      {
        id: 'demo-appointment-003',
        userId: 'demo-citizen-003',
        serviceId: 'demo-service-birth-certificate',
        departmentId: 'demo-dept-registrar-general',
        date: new Date('2025-01-22T11:00:00Z'),
        timeSlot: '11:00-11:20',
        status: 'confirmed',
        qrCode: 'QR-BC-003-20250122',
        referenceNumber: 'GE-2025-003',
        documents: [],
        notes: 'Birth certificate for passport application',
        createdAt: new Date('2025-01-17T14:30:00Z'),
        updatedAt: new Date('2025-01-17T16:00:00Z')
      },
      {
        id: 'demo-appointment-004',
        userId: 'demo-citizen-004',
        serviceId: 'demo-service-passport-application',
        departmentId: 'demo-dept-immigration',
        date: new Date('2025-01-25T14:00:00Z'),
        timeSlot: '14:00-14:30',
        status: 'pending',
        qrCode: 'QR-PP-004-20250125',
        referenceNumber: 'GE-2025-004',
        documents: [],
        notes: 'New passport application',
        createdAt: new Date('2025-01-19T10:15:00Z'),
        updatedAt: new Date('2025-01-19T10:15:00Z')
      },
      {
        id: 'demo-appointment-005',
        userId: 'demo-citizen-005',
        serviceId: 'demo-service-tax-registration',
        departmentId: 'demo-dept-inland-revenue',
        date: new Date('2025-01-24T13:30:00Z'),
        timeSlot: '13:30-14:05',
        status: 'pending',
        qrCode: 'QR-TR-005-20250124',
        referenceNumber: 'GE-2025-005',
        documents: [],
        notes: 'Business tax registration',
        createdAt: new Date('2025-01-19T10:15:00Z'),
        updatedAt: new Date('2025-01-19T10:15:00Z')
      }
    ];

    for (const appointment of sampleAppointments) {
      await setDoc(doc(db, 'appointments', appointment.id), appointment);
      console.log(`✅ Added appointment: ${appointment.referenceNumber}`);
    }

    // Add comprehensive feedback data
    console.log('💭 Creating feedback data...');
    const sampleFeedbacks = [
      {
        id: 'demo-feedback-001',
        appointmentId: 'demo-appointment-002',
        userId: 'demo-citizen-002',
        rating: 5,
        comment: 'Excellent service! The process was smooth and efficient.',
        createdAt: new Date('2025-01-18T11:00:00Z')
      },
      {
        id: 'demo-feedback-002',
        appointmentId: 'demo-appointment-001',
        userId: 'demo-citizen-001',
        rating: 4,
        comment: 'Good service, but had to wait a bit longer than expected.',
        createdAt: new Date('2025-01-20T12:00:00Z')
      }
    ];

    for (const feedback of sampleFeedbacks) {
      await setDoc(doc(db, 'feedback', feedback.id), feedback);
      console.log(`✅ Added feedback: ${feedback.rating} stars`);
    }

    // Add notification data
    console.log('🔔 Creating notifications...');
    const sampleNotifications = [
      {
        id: 'demo-notif-001',
        userId: 'demo-citizen-001',
        type: 'appointment_confirmation',
        title: 'Appointment Confirmed',
        message: 'Your driving license appointment has been confirmed for Jan 20, 2025 at 10:00 AM.',
        read: false,
        createdAt: new Date('2025-01-15T14:00:00Z')
      },
      {
        id: 'demo-notif-002',
        userId: 'demo-citizen-002',
        type: 'reminder',
        title: 'Appointment Complete',
        message: 'Your vehicle registration appointment was completed successfully.',
        read: true,
        createdAt: new Date('2025-01-18T10:00:00Z')
      }
    ];

    for (const notification of sampleNotifications) {
      await setDoc(doc(db, 'notifications', notification.id), notification);
      console.log(`✅ Added notification: ${notification.title}`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('================================================');
    console.log('✅ Departments created: 4');
    console.log('✅ Services created: 12'); 
    console.log('✅ Demo users created: 11');
    console.log('✅ Sample appointments created: 5');
    console.log('✅ Feedback entries created: 2');
    console.log('✅ Notifications created: 2');
    console.log('================================================');
    console.log('🚀 Your GovEase database is ready for testing!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();