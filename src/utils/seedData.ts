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

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Add departments
    const departmentIds: string[] = [];
    for (const department of sampleDepartments) {
      const docRef = await addDoc(collection(db, 'departments'), department);
      departmentIds.push(docRef.id);
      console.log(`Added department: ${department.name}`);
    }

    // Add services with department references
    const servicesByDepartment = [
      sampleServices.slice(0, 3),  // Motor Traffic services
      sampleServices.slice(3, 6),  // Immigration services
      sampleServices.slice(6, 9),  // Registrar General services
      sampleServices.slice(9, 12)  // Inland Revenue services
    ];

    for (let i = 0; i < departmentIds.length; i++) {
      const departmentId = departmentIds[i];
      const departmentServices = servicesByDepartment[i];
      
      for (const service of departmentServices) {
        const serviceData = {
          ...service,
          departmentId
        };
        
        await addDoc(collection(db, 'services'), serviceData);
        console.log(`Added service: ${service.name} to ${sampleDepartments[i].name}`);
      }
    }

    console.log('Database seeding completed successfully!');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error: error };
  }
};