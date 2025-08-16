-- GovEase Database Dump
-- Generated for Tech-Triathlon 2025 Submission
-- Firebase Firestore Collections Export

-- DEPARTMENTS Collection
-- Document ID: dept-motor-traffic
{
  "id": "dept-motor-traffic",
  "name": "Department of Motor Traffic",
  "description": "Vehicle registration, driving licenses, and motor traffic services",
  "icon": "🚗",
  "workingHours": "9:00-16:00",
  "location": "Colombo, Sri Lanka",
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Document ID: dept-immigration
{
  "id": "dept-immigration", 
  "name": "Department of Immigration & Emigration",
  "description": "Passport services, visa processing, and immigration matters",
  "icon": "🛂",
  "workingHours": "8:30-16:30",
  "location": "Battaramulla, Sri Lanka",
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Document ID: dept-registrar-general
{
  "id": "dept-registrar-general",
  "name": "Registrar General's Department", 
  "description": "Birth, death, marriage certificates and civil registration",
  "icon": "📋",
  "workingHours": "9:00-15:30",
  "location": "Colombo, Sri Lanka",
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Document ID: dept-inland-revenue
{
  "id": "dept-inland-revenue",
  "name": "Department of Inland Revenue",
  "description": "Tax registration, filing, and revenue collection services", 
  "icon": "💰",
  "workingHours": "8:30-16:15",
  "location": "Colombo, Sri Lanka",
  "createdAt": "2025-01-15T10:00:00Z"
}

-- SERVICES Collection
-- Motor Traffic Services
{
  "id": "service-driving-license",
  "departmentId": "dept-motor-traffic",
  "name": "Driving License Application",
  "description": "Apply for a new driving license with theory and practical tests",
  "duration": 60,
  "fee": 2500.00,
  "requiredDocuments": ["National ID Copy", "Medical Certificate", "Application Form", "Passport Photo"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-vehicle-registration", 
  "departmentId": "dept-motor-traffic",
  "name": "Vehicle Registration",
  "description": "Register new or imported vehicles",
  "duration": 45,
  "fee": 5000.00,
  "requiredDocuments": ["Vehicle Invoice", "Insurance Certificate", "Emission Test", "National ID"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-license-renewal",
  "departmentId": "dept-motor-traffic", 
  "name": "License Renewal",
  "description": "Renew existing driving license",
  "duration": 30,
  "fee": 1500.00,
  "requiredDocuments": ["Current License", "National ID", "Medical Certificate"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Immigration Services
{
  "id": "service-passport-application",
  "departmentId": "dept-immigration",
  "name": "Passport Application", 
  "description": "Apply for new Sri Lankan passport",
  "duration": 45,
  "fee": 3500.00,
  "requiredDocuments": ["Birth Certificate", "National ID", "Application Form", "Photos"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-passport-renewal",
  "departmentId": "dept-immigration",
  "name": "Passport Renewal",
  "description": "Renew existing passport",
  "duration": 30,
  "fee": 3000.00,
  "requiredDocuments": ["Current Passport", "National ID", "Application Form", "Photos"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-visa-extension",
  "departmentId": "dept-immigration",
  "name": "Visa Extension",
  "description": "Extend visitor or residence visa",
  "duration": 60,
  "fee": 5000.00,
  "requiredDocuments": ["Current Visa", "Passport", "Application Form", "Supporting Documents"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Registrar General Services
{
  "id": "service-birth-certificate",
  "departmentId": "dept-registrar-general", 
  "name": "Birth Certificate",
  "description": "Obtain certified birth certificate",
  "duration": 30,
  "fee": 100.00,
  "requiredDocuments": ["Birth Registration Form", "Parent ID Copies", "Hospital Certificate"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-marriage-certificate",
  "departmentId": "dept-registrar-general",
  "name": "Marriage Certificate", 
  "description": "Register marriage and obtain certificate",
  "duration": 45,
  "fee": 500.00,
  "requiredDocuments": ["Marriage Application", "ID Copies", "Witness Details", "Photos"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-death-certificate",
  "departmentId": "dept-registrar-general",
  "name": "Death Certificate",
  "description": "Register death and obtain certificate",
  "duration": 30,
  "fee": 200.00,
  "requiredDocuments": ["Death Registration Form", "Medical Certificate", "ID Copies"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

-- Inland Revenue Services
{
  "id": "service-tax-registration",
  "departmentId": "dept-inland-revenue",
  "name": "Tax Registration",
  "description": "Register for income tax and obtain TIN",
  "duration": 45,
  "fee": 0.00,
  "requiredDocuments": ["National ID", "Business Registration", "Bank Details", "Application Form"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-tax-filing",
  "departmentId": "dept-inland-revenue", 
  "name": "Tax Return Filing",
  "description": "File annual income tax returns",
  "duration": 60,
  "fee": 0.00,
  "requiredDocuments": ["Income Statements", "Bank Statements", "TIN Certificate", "Supporting Documents"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

{
  "id": "service-tax-clearance",
  "departmentId": "dept-inland-revenue",
  "name": "Tax Clearance Certificate",
  "description": "Obtain tax compliance certificate",
  "duration": 30,
  "fee": 1000.00,
  "requiredDocuments": ["Tax Returns", "Payment Receipts", "TIN Certificate", "Application Form"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}

-- SAMPLE USERS Collection
{
  "uid": "sample-citizen-001",
  "email": "citizen@example.com",
  "name": "John Doe",
  "nic": "123456789V",
  "phone": "+94771234567",
  "role": "citizen",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}

{
  "uid": "sample-officer-001", 
  "email": "officer@motortraffic.gov.lk",
  "name": "Jane Smith",
  "nic": "987654321V",
  "phone": "+94777654321", 
  "role": "officer",
  "department": "dept-motor-traffic",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}

{
  "uid": "sample-admin-001",
  "email": "admin@govease.lk", 
  "name": "Admin User",
  "nic": "555666777V",
  "phone": "+94775556677",
  "role": "admin",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}

-- SAMPLE APPOINTMENTS Collection
{
  "id": "appointment-001",
  "userId": "sample-citizen-001",
  "serviceId": "service-driving-license",
  "departmentId": "dept-motor-traffic",
  "appointmentDate": "2025-01-20T10:00:00Z",
  "timeSlot": "10:00-11:00",
  "status": "confirmed",
  "qrCode": "QR-DL-001-20250120",
  "referenceNumber": "GE-2025-001",
  "contactInfo": {
    "name": "John Doe",
    "email": "citizen@example.com", 
    "phone": "+94771234567"
  },
  "createdAt": "2025-01-15T12:00:00Z",
  "updatedAt": "2025-01-15T14:00:00Z"
}

{
  "id": "appointment-002",
  "userId": "sample-citizen-001", 
  "serviceId": "service-passport-application",
  "departmentId": "dept-immigration",
  "appointmentDate": "2025-01-25T14:00:00Z",
  "timeSlot": "14:00-14:45",
  "status": "pending",
  "qrCode": "QR-PP-002-20250125",
  "referenceNumber": "GE-2025-002",
  "contactInfo": {
    "name": "John Doe",
    "email": "citizen@example.com",
    "phone": "+94771234567"
  },
  "createdAt": "2025-01-16T09:00:00Z",
  "updatedAt": "2025-01-16T09:00:00Z"
}

-- SAMPLE UPLOADED_DOCUMENTS Collection
{
  "id": "doc-001",
  "appointmentId": "appointment-001", 
  "userId": "sample-citizen-001",
  "fileName": "nic-copy-001.pdf",
  "originalName": "National ID Copy.pdf",
  "fileType": "application/pdf",
  "fileSize": 1048576,
  "storageUrl": "gs://bitbybit-govease.appspot.com/documents/doc-001.pdf",
  "status": "approved",
  "uploadedAt": "2025-01-15T13:00:00Z"
}

{
  "id": "doc-002",
  "appointmentId": "appointment-001",
  "userId": "sample-citizen-001", 
  "fileName": "medical-cert-001.pdf",
  "originalName": "Medical Certificate.pdf",
  "fileType": "application/pdf",
  "fileSize": 2097152,
  "storageUrl": "gs://bitbybit-govease.appspot.com/documents/doc-002.pdf",
  "status": "pending",
  "uploadedAt": "2025-01-15T13:30:00Z"
}

-- SAMPLE NOTIFICATIONS Collection
{
  "id": "notif-001",
  "userId": "sample-citizen-001",
  "appointmentId": "appointment-001",
  "type": "confirmation", 
  "title": "Appointment Confirmed",
  "message": "Your driving license appointment has been confirmed for Jan 20, 2025 at 10:00 AM.",
  "read": true,
  "sentAt": "2025-01-15T14:00:00Z",
  "readAt": "2025-01-15T15:30:00Z"
}

{
  "id": "notif-002",
  "userId": "sample-citizen-001",
  "appointmentId": "appointment-001",
  "type": "reminder",
  "title": "Appointment Reminder", 
  "message": "Reminder: Your appointment is tomorrow at 10:00 AM. Please bring all required documents.",
  "read": false,
  "sentAt": "2025-01-19T10:00:00Z"
}

-- SAMPLE FEEDBACK Collection
{
  "id": "feedback-001",
  "appointmentId": "appointment-001",
  "userId": "sample-citizen-001",
  "rating": 5,
  "experience": "Excellent service! The process was smooth and efficient.",
  "improvements": "Maybe add more time slots for popular services.",
  "recommend": true,
  "submittedAt": "2025-01-20T12:00:00Z"
}

-- SAMPLE ANALYTICS Collection
{
  "id": "analytics-001",
  "type": "appointments",
  "data": {
    "totalAppointments": 1250,
    "completedAppointments": 1100,
    "cancelledAppointments": 75,
    "noShowRate": 6.0,
    "averageRating": 4.3,
    "peakHours": ["10:00", "11:00", "14:00"],
    "departmentLoad": {
      "dept-motor-traffic": 450,
      "dept-immigration": 380,
      "dept-registrar-general": 220,
      "dept-inland-revenue": 200
    }
  },
  "dateRange": {
    "start": "2025-01-01T00:00:00Z",
    "end": "2025-01-15T23:59:59Z"
  },
  "generatedAt": "2025-01-16T00:00:00Z"
}

-- Firestore Security Rules
-- rules_version = '2';
-- service cloud.firestore {
--   match /databases/{database}/documents {
--     // Users can read/write their own data
--     match /users/{userId} {
--       allow read, write: if request.auth != null && request.auth.uid == userId;
--     }
--     
--     // Departments are readable by all authenticated users
--     match /departments/{departmentId} {
--       allow read: if request.auth != null;
--       allow write: if request.auth != null && 
--         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
--     }
--     
--     // Services are readable by all authenticated users  
--     match /services/{serviceId} {
--       allow read: if request.auth != null;
--       allow write: if request.auth != null && 
--         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
--     }
--     
--     // Appointments are readable/writable by owner and officers
--     match /appointments/{appointmentId} {
--       allow read, write: if request.auth != null && 
--         (resource.data.userId == request.auth.uid || 
--          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer']);
--     }
--     
--     // Documents are accessible by owner and assigned officers
--     match /uploaded_documents/{documentId} {
--       allow read, write: if request.auth != null && 
--         (resource.data.userId == request.auth.uid || 
--          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer']);
--     }
--     
--     // Notifications are readable by recipient
--     match /notifications/{notificationId} {
--       allow read: if request.auth != null && resource.data.userId == request.auth.uid;
--       allow write: if request.auth != null && 
--         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
--     }
--     
--     // Feedback is readable/writable by owner
--     match /feedback/{feedbackId} {
--       allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
--     }
--     
--     // Analytics are readable by officers and admins
--     match /analytics/{analyticsId} {
--       allow read: if request.auth != null && 
--         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
--     }
--   }
-- }

-- Firebase Storage Rules
-- rules_version = '2';
-- service firebase.storage {
--   match /b/{bucket}/o {
--     // Documents can be uploaded by authenticated users to their folder
--     match /documents/{userId}/{allPaths=**} {
--       allow read, write: if request.auth != null && request.auth.uid == userId;
--     }
--     
--     // Officers and admins can read all documents
--     match /documents/{allPaths=**} {
--       allow read: if request.auth != null && 
--         firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
--     }
--   }
-- }

-- END OF DATABASE DUMP
-- Total Collections: 8
-- Total Sample Documents: 25+
-- Generated: 2025-01-16 for Tech-Triathlon Submission