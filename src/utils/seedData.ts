import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const sampleDepartments = [
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

export const sampleServices = [
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

// Demo users for each role - MASSIVE SEED DATA
export const demoUsers = [
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
  
  // OFFICERS - Multiple departments
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

// MASSIVE SAMPLE APPOINTMENTS DATA
export const sampleAppointments = [
  // CONFIRMED APPOINTMENTS
  {
    id: 'demo-appointment-001',
    userId: 'demo-citizen-001',
    serviceId: 'demo-service-driving-license',
    departmentId: 'demo-dept-motor-traffic',
    appointmentDate: new Date('2025-01-20T10:00:00Z'),
    timeSlot: '10:00-11:00',
    status: 'confirmed',
    qrCode: 'QR-DL-001-20250120',
    referenceNumber: 'GE-2025-001',
    contactInfo: {
      name: 'Amal Perera',
      email: 'citizen.demo@govease.lk',
      phone: '+94771234567'
    },
    createdAt: new Date('2025-01-15T12:00:00Z'),
    updatedAt: new Date('2025-01-15T14:00:00Z')
  },
  {
    id: 'demo-appointment-002',
    userId: 'demo-citizen-001',
    serviceId: 'demo-service-passport-application',
    departmentId: 'demo-dept-immigration',
    appointmentDate: new Date('2025-01-25T14:00:00Z'),
    timeSlot: '14:00-14:30',
    status: 'pending',
    qrCode: 'QR-PP-002-20250125',
    referenceNumber: 'GE-2025-002',
    contactInfo: {
      name: 'Amal Perera',
      email: 'citizen.demo@govease.lk',
      phone: '+94771234567'
    },
    createdAt: new Date('2025-01-16T09:00:00Z'),
    updatedAt: new Date('2025-01-16T09:00:00Z')
  },
  
  // MORE APPOINTMENTS FOR ANALYTICS
  {
    id: 'demo-appointment-003',
    userId: 'demo-citizen-002',
    serviceId: 'demo-service-vehicle-registration',
    departmentId: 'demo-dept-motor-traffic',
    appointmentDate: new Date('2025-01-18T09:00:00Z'),
    timeSlot: '09:00-09:45',
    status: 'completed',
    qrCode: 'QR-VR-003-20250118',
    referenceNumber: 'GE-2025-003',
    contactInfo: {
      name: 'Nimal Silva',
      email: 'nimal.silva@gmail.com',
      phone: '+94772345678'
    },
    createdAt: new Date('2025-01-12T08:00:00Z'),
    updatedAt: new Date('2025-01-18T10:00:00Z')
  },
  {
    id: 'demo-appointment-004',
    userId: 'demo-citizen-003',
    serviceId: 'demo-service-birth-certificate',
    departmentId: 'demo-dept-registrar-general',
    appointmentDate: new Date('2025-01-22T11:00:00Z'),
    timeSlot: '11:00-11:20',
    status: 'confirmed',
    qrCode: 'QR-BC-004-20250122',
    referenceNumber: 'GE-2025-004',
    contactInfo: {
      name: 'Sita Fernando',
      email: 'sita.fernando@yahoo.com',
      phone: '+94773456789'
    },
    createdAt: new Date('2025-01-17T14:30:00Z'),
    updatedAt: new Date('2025-01-17T16:00:00Z')
  },
  {
    id: 'demo-appointment-005',
    userId: 'demo-citizen-004',
    serviceId: 'demo-service-tax-registration',
    departmentId: 'demo-dept-inland-revenue',
    appointmentDate: new Date('2025-01-24T13:30:00Z'),
    timeSlot: '13:30-14:05',
    status: 'pending',
    qrCode: 'QR-TR-005-20250124',
    referenceNumber: 'GE-2025-005',
    contactInfo: {
      name: 'Kamal Jayasinghe',
      email: 'kamal.jayasinghe@hotmail.com',
      phone: '+94774567890'
    },
    createdAt: new Date('2025-01-19T10:15:00Z'),
    updatedAt: new Date('2025-01-19T10:15:00Z')
  },
  {
    id: 'demo-appointment-006',
    userId: 'demo-citizen-005',
    serviceId: 'demo-service-passport-renewal',
    departmentId: 'demo-dept-immigration',
    appointmentDate: new Date('2025-01-23T15:00:00Z'),
    timeSlot: '15:00-15:25',
    status: 'confirmed',
    qrCode: 'QR-PR-006-20250123',
    referenceNumber: 'GE-2025-006',
    contactInfo: {
      name: 'Priya Wickramasinghe',
      email: 'priya.wickramasinghe@gmail.com',
      phone: '+94775678901'
    },
    createdAt: new Date('2025-01-18T11:20:00Z'),
    updatedAt: new Date('2025-01-18T12:45:00Z')
  },
  
  // PAST APPOINTMENTS FOR ANALYTICS
  {
    id: 'demo-appointment-007',
    userId: 'demo-citizen-002',
    serviceId: 'demo-service-license-renewal',
    departmentId: 'demo-dept-motor-traffic',
    appointmentDate: new Date('2025-01-10T10:30:00Z'),
    timeSlot: '10:30-11:00',
    status: 'completed',
    qrCode: 'QR-LR-007-20250110',
    referenceNumber: 'GE-2025-007',
    contactInfo: {
      name: 'Nimal Silva',
      email: 'nimal.silva@gmail.com',
      phone: '+94772345678'
    },
    createdAt: new Date('2025-01-05T09:00:00Z'),
    updatedAt: new Date('2025-01-10T11:30:00Z')
  },
  {
    id: 'demo-appointment-008',
    userId: 'demo-citizen-003',
    serviceId: 'demo-service-marriage-certificate',
    departmentId: 'demo-dept-registrar-general',
    appointmentDate: new Date('2025-01-12T14:00:00Z'),
    timeSlot: '14:00-14:30',
    status: 'completed',
    qrCode: 'QR-MC-008-20250112',
    referenceNumber: 'GE-2025-008',
    contactInfo: {
      name: 'Sita Fernando',
      email: 'sita.fernando@yahoo.com',
      phone: '+94773456789'
    },
    createdAt: new Date('2025-01-08T16:00:00Z'),
    updatedAt: new Date('2025-01-12T15:00:00Z')
  },
  {
    id: 'demo-appointment-009',
    userId: 'demo-citizen-004',
    serviceId: 'demo-service-tax-filing',
    departmentId: 'demo-dept-inland-revenue',
    appointmentDate: new Date('2025-01-14T09:00:00Z'),
    timeSlot: '09:00-09:45',
    status: 'completed',
    qrCode: 'QR-TF-009-20250114',
    referenceNumber: 'GE-2025-009',
    contactInfo: {
      name: 'Kamal Jayasinghe',
      email: 'kamal.jayasinghe@hotmail.com',
      phone: '+94774567890'
    },
    createdAt: new Date('2025-01-09T13:30:00Z'),
    updatedAt: new Date('2025-01-14T10:30:00Z')
  },
  {
    id: 'demo-appointment-010',
    userId: 'demo-citizen-005',
    serviceId: 'demo-service-visa-extension',
    departmentId: 'demo-dept-immigration',
    appointmentDate: new Date('2025-01-16T11:30:00Z'),
    timeSlot: '11:30-12:10',
    status: 'completed',
    qrCode: 'QR-VE-010-20250116',
    referenceNumber: 'GE-2025-010',
    contactInfo: {
      name: 'Priya Wickramasinghe',
      email: 'priya.wickramasinghe@gmail.com',
      phone: '+94775678901'
    },
    createdAt: new Date('2025-01-11T15:45:00Z'),
    updatedAt: new Date('2025-01-16T13:00:00Z')
  },
  
  // CANCELLED/NO-SHOW APPOINTMENTS FOR ANALYTICS
  {
    id: 'demo-appointment-011',
    userId: 'demo-citizen-002',
    serviceId: 'demo-service-death-certificate',
    departmentId: 'demo-dept-registrar-general',
    appointmentDate: new Date('2025-01-08T13:00:00Z'),
    timeSlot: '13:00-13:25',
    status: 'cancelled',
    qrCode: 'QR-DC-011-20250108',
    referenceNumber: 'GE-2025-011',
    contactInfo: {
      name: 'Nimal Silva',
      email: 'nimal.silva@gmail.com',
      phone: '+94772345678'
    },
    createdAt: new Date('2025-01-03T10:00:00Z'),
    updatedAt: new Date('2025-01-07T18:00:00Z')
  },
  {
    id: 'demo-appointment-012',
    userId: 'demo-citizen-004',
    serviceId: 'demo-service-tax-clearance',
    departmentId: 'demo-dept-inland-revenue',
    appointmentDate: new Date('2025-01-11T15:30:00Z'),
    timeSlot: '15:30-16:00',
    status: 'no-show',
    qrCode: 'QR-TC-012-20250111',
    referenceNumber: 'GE-2025-012',
    contactInfo: {
      name: 'Kamal Jayasinghe',
      email: 'kamal.jayasinghe@hotmail.com',
      phone: '+94774567890'
    },
    createdAt: new Date('2025-01-06T12:00:00Z'),
    updatedAt: new Date('2025-01-11T16:30:00Z')
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Add departments with fixed IDs
    const departmentIds = [
      'demo-dept-motor-traffic',
      'demo-dept-immigration', 
      'demo-dept-registrar-general',
      'demo-dept-inland-revenue'
    ];
    
    for (let i = 0; i < sampleDepartments.length; i++) {
      const department = sampleDepartments[i];
      const departmentId = departmentIds[i];
      
      await setDoc(doc(db, 'departments', departmentId), {
        ...department,
        id: departmentId
      });
      console.log(`Added department: ${department.name}`);
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
        console.log(`Added service: ${service.name} to ${sampleDepartments[i].name}`);
        serviceIndex++;
      }
    }

    // Add demo users to Firestore (Firebase Auth users need to be created separately)
    for (const user of demoUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
      console.log(`Added demo user: ${user.name} (${user.role})`);
    }

    // Add sample appointments
    for (const appointment of sampleAppointments) {
      await setDoc(doc(db, 'appointments', appointment.id), appointment);
      console.log(`Added appointment: ${appointment.referenceNumber}`);
    }

    // Add MASSIVE sample feedback
    const sampleFeedbacks = [
      {
        id: 'demo-feedback-001',
        appointmentId: 'demo-appointment-001',
        userId: 'demo-citizen-001',
        rating: 5,
        experience: 'Excellent service! The process was smooth and efficient.',
        improvements: 'Maybe add more time slots for popular services.',
        recommend: true,
        submittedAt: new Date('2025-01-20T12:00:00Z')
      },
      {
        id: 'demo-feedback-002',
        appointmentId: 'demo-appointment-003',
        userId: 'demo-citizen-002',
        rating: 4,
        experience: 'Good service, but had to wait a bit longer than expected.',
        improvements: 'Better time management and queue organization.',
        recommend: true,
        submittedAt: new Date('2025-01-18T11:00:00Z')
      },
      {
        id: 'demo-feedback-003',
        appointmentId: 'demo-appointment-007',
        userId: 'demo-citizen-002',
        rating: 5,
        experience: 'Very quick and professional. Documents were ready on time.',
        improvements: 'Nothing to improve, perfect service!',
        recommend: true,
        submittedAt: new Date('2025-01-10T12:30:00Z')
      },
      {
        id: 'demo-feedback-004',
        appointmentId: 'demo-appointment-008',
        userId: 'demo-citizen-003',
        rating: 4,
        experience: 'Staff was helpful and the process was clear.',
        improvements: 'Could have better signage in the building.',
        recommend: true,
        submittedAt: new Date('2025-01-12T16:00:00Z')
      },
      {
        id: 'demo-feedback-005',
        appointmentId: 'demo-appointment-009',
        userId: 'demo-citizen-004',
        rating: 3,
        experience: 'Average service. Documentation could be clearer.',
        improvements: 'Better instructions for required documents.',
        recommend: false,
        submittedAt: new Date('2025-01-14T11:15:00Z')
      },
      {
        id: 'demo-feedback-006',
        appointmentId: 'demo-appointment-010',
        userId: 'demo-citizen-005',
        rating: 5,
        experience: 'Outstanding service! Everything was handled professionally.',
        improvements: 'Keep up the excellent work!',
        recommend: true,
        submittedAt: new Date('2025-01-16T14:30:00Z')
      }
    ];

    for (const feedback of sampleFeedbacks) {
      await setDoc(doc(db, 'feedback', feedback.id), feedback);
      console.log(`Added feedback: ${feedback.rating} stars`);
    }

    // Add MASSIVE sample notifications
    const sampleNotifications = [
      {
        id: 'demo-notif-001',
        userId: 'demo-citizen-001',
        appointmentId: 'demo-appointment-001',
        type: 'confirmation',
        title: 'Appointment Confirmed',
        message: 'Your driving license appointment has been confirmed for Jan 20, 2025 at 10:00 AM.',
        read: true,
        sentAt: new Date('2025-01-15T14:00:00Z'),
        readAt: new Date('2025-01-15T15:30:00Z')
      },
      {
        id: 'demo-notif-002',
        userId: 'demo-citizen-001',
        appointmentId: 'demo-appointment-001',
        type: 'reminder',
        title: 'Appointment Reminder',
        message: 'Reminder: Your appointment is tomorrow at 10:00 AM. Please bring all required documents.',
        read: false,
        sentAt: new Date('2025-01-19T10:00:00Z')
      },
      {
        id: 'demo-notif-003',
        userId: 'demo-citizen-001',
        appointmentId: 'demo-appointment-002',
        type: 'status_update',
        title: 'Document Review Pending',
        message: 'Your passport application documents are under review. We will notify you once approved.',
        read: false,
        sentAt: new Date('2025-01-16T10:00:00Z')
      },
      {
        id: 'demo-notif-004',
        userId: 'demo-citizen-002',
        appointmentId: 'demo-appointment-003',
        type: 'confirmation',
        title: 'Vehicle Registration Confirmed',
        message: 'Your vehicle registration appointment has been confirmed for Jan 18, 2025 at 9:00 AM.',
        read: true,
        sentAt: new Date('2025-01-12T10:00:00Z'),
        readAt: new Date('2025-01-12T11:00:00Z')
      },
      {
        id: 'demo-notif-005',
        userId: 'demo-citizen-003',
        appointmentId: 'demo-appointment-004',
        type: 'confirmation',
        title: 'Birth Certificate Appointment Confirmed',
        message: 'Your birth certificate appointment has been confirmed for Jan 22, 2025 at 11:00 AM.',
        read: true,
        sentAt: new Date('2025-01-17T16:00:00Z'),
        readAt: new Date('2025-01-17T17:00:00Z')
      },
      {
        id: 'demo-notif-006',
        userId: 'demo-citizen-004',
        appointmentId: 'demo-appointment-005',
        type: 'document_review',
        title: 'Document Revision Required',
        message: 'Please update your tax registration documents. Additional business proof required.',
        read: false,
        sentAt: new Date('2025-01-19T11:00:00Z')
      },
      {
        id: 'demo-notif-007',
        userId: 'demo-citizen-005',
        appointmentId: 'demo-appointment-006',
        type: 'confirmation',
        title: 'Passport Renewal Confirmed',
        message: 'Your passport renewal appointment has been confirmed for Jan 23, 2025 at 3:00 PM.',
        read: true,
        sentAt: new Date('2025-01-18T12:45:00Z'),
        readAt: new Date('2025-01-18T13:00:00Z')
      }
    ];

    for (const notification of sampleNotifications) {
      await setDoc(doc(db, 'notifications', notification.id), notification);
      console.log(`Added notification: ${notification.title}`);
    }

    // Add analytics data for rich dashboard
    const analyticsData = {
      id: 'demo-analytics-2025-01',
      type: 'monthly_summary',
      data: {
        totalAppointments: 750,
        completedAppointments: 520,
        confirmedAppointments: 180,
        pendingAppointments: 35,
        cancelledAppointments: 10,
        noShowAppointments: 5,
        averageRating: 4.2,
        departmentStats: {
          'demo-dept-motor-traffic': { total: 285, completed: 195, rating: 4.3 },
          'demo-dept-immigration': { total: 220, completed: 165, rating: 4.4 },
          'demo-dept-registrar-general': { total: 145, completed: 105, rating: 4.0 },
          'demo-dept-inland-revenue': { total: 100, completed: 55, rating: 3.8 }
        },
        peakHours: ['10:00', '11:00', '14:00', '15:00'],
        dailyTrends: {
          'monday': 95,
          'tuesday': 120,
          'wednesday': 135,
          'thursday': 140,
          'friday': 110,
          'saturday': 85,
          'sunday': 65
        },
        servicePopularity: {
          'demo-service-driving-license': 95,
          'demo-service-passport-application': 85,
          'demo-service-vehicle-registration': 75,
          'demo-service-birth-certificate': 65,
          'demo-service-tax-registration': 45
        }
      },
      dateRange: {
        start: new Date('2025-01-01T00:00:00Z'),
        end: new Date('2025-01-31T23:59:59Z')
      },
      generatedAt: new Date()
    };

    await setDoc(doc(db, 'analytics', analyticsData.id), analyticsData);
    console.log('Added comprehensive analytics data');

    console.log('Database seeding completed successfully!');
    return { success: true, message: 'Database seeded successfully with demo users and sample data!' };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error: error };
  }
};