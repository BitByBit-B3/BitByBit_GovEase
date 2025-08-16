# Visual System Diagrams

## Entity Relationship Diagram (Visual)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      USERS      │    │   DEPARTMENTS   │    │    SERVICES     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ uid (PK)        │    │ id (PK)         │    │ id (PK)         │
│ email           │    │ name            │    │ departmentId(FK)│
│ name            │    │ description     │    │ name            │
│ nic             │    │ icon            │    │ description     │
│ phone           │    │ workingHours    │    │ duration        │
│ role            │    │ location        │    │ fee             │
│ createdAt       │    │ createdAt       │    │ requiredDocs[]  │
│ updatedAt       │    └─────────────────┘    │ isActive        │
└─────────────────┘              │            │ createdAt       │
         │                       │            └─────────────────┘
         │                       │                      │
         │    ┌─────────────────────────────────────────┘
         │    │
         ▼    ▼
┌─────────────────┐                    ┌─────────────────┐
│  APPOINTMENTS   │                    │UPLOADED_DOCUMENTS│
├─────────────────┤                    ├─────────────────┤
│ id (PK)         │◄──────────────────►│ id (PK)         │
│ userId (FK)     │                    │ appointmentId(FK)│
│ serviceId (FK)  │                    │ userId (FK)     │
│ departmentId(FK)│                    │ fileName        │
│ appointmentDate │                    │ originalName    │
│ timeSlot        │                    │ fileType        │
│ status          │                    │ fileSize        │
│ qrCode          │                    │ storageUrl      │
│ referenceNumber │                    │ status          │
│ contactInfo     │                    │ uploadedAt      │
│ createdAt       │                    └─────────────────┘
│ updatedAt       │
└─────────────────┘
         │
         │
         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ NOTIFICATIONS   │    │    FEEDBACK     │    │   ANALYTICS     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ userId (FK)     │    │ appointmentId(FK)│    │ type            │
│ appointmentId(FK)│    │ userId (FK)     │    │ data            │
│ type            │    │ rating          │    │ dateRange       │
│ title           │    │ experience      │    │ generatedAt     │
│ message         │    │ improvements    │    └─────────────────┘
│ read            │    │ recommend       │
│ sentAt          │    │ submittedAt     │
│ readAt          │    └─────────────────┘
└─────────────────┘

Relationships:
- Users ──── (1:N) ──── Appointments
- Users ──── (1:N) ──── Uploaded Documents  
- Users ──── (1:N) ──── Notifications
- Users ──── (1:N) ──── Feedback
- Departments ──── (1:N) ──── Services
- Departments ──── (1:N) ──── Appointments
- Services ──── (1:N) ──── Appointments
- Appointments ──── (1:N) ──── Uploaded Documents
- Appointments ──── (1:N) ──── Notifications
- Appointments ──── (1:1) ──── Feedback
```

## System Architecture Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Citizen   │  │  Officer    │  │    Admin    │             │
│  │  Interface  │  │  Dashboard  │  │  Analytics  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Next.js 15 + TypeScript                   │   │
│  │     React Components | Tailwind CSS | React Hook Form │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                Firebase Authentication                  │   │
│  │     Email/Password | Role-based Access | JWT Tokens    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Appointment │  │  Document   │  │ Notification│             │
│  │  Booking    │  │ Processing  │  │   System    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    QR Code  │  │  Analytics  │  │  Feedback   │             │
│  │ Generation  │  │ Processing  │  │ Collection  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA ACCESS LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     Firebase Services                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                   │                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Firestore   │  │   Storage    │  │  Analytics   │          │
│  │   Database   │  │   Bucket     │  │   Service    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    Email    │  │     SMS     │  │   Payment   │             │
│  │   Service   │  │   Service   │  │   Gateway   │             │
│  │ (Firebase)  │  │ (Planned)   │  │ (Planned)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## User Journey Flow Diagram

### Citizen Booking Flow
```
    Start
      │
      ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Visit    │───►│    Sign     │───►│   Browse    │
│   Portal    │    │   In/Up     │    │  Services   │
└─────────────┘    └─────────────┘    └─────────────┘
      │                                       │
      │              Already                  ▼
      │             Logged In         ┌─────────────┐
      └──────────────────────────────►│   Select    │
                                      │   Service   │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Choose    │
                                      │ Date & Time │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Upload    │
                                      │ Documents   │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Confirm   │
                                      │ Appointment │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │  Receive    │
                                      │  QR Code    │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Email     │
                                      │Confirmation │
                                      └─────────────┘
                                              │
                                              ▼
                                           End
```

### Officer Management Flow
```
    Start
      │
      ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Officer    │───►│  Dashboard  │───►│    View     │
│  Login      │    │   Access    │    │Appointments │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Select    │
                                      │Appointment  │
                                      └─────────────┘
                                              │
                                              ▼
                                      ┌─────────────┐
                                      │   Review    │
                                      │ Documents   │
                                      └─────────────┘
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                      ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                      │   Approve   │ │   Request   │ │   Reject    │
                      │ Documents   │ │  Revision   │ │ Documents   │
                      └─────────────┘ └─────────────┘ └─────────────┘
                              │               │               │
                              ▼               ▼               ▼
                      ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
                      │   Update    │ │    Send     │ │    Send     │
                      │   Status    │ │ Notification│ │ Notification│
                      │"Confirmed"  │ │"Revision"   │ │"Rejected"   │
                      └─────────────┘ └─────────────┘ └─────────────┘
                              │               │               │
                              └───────────────┼───────────────┘
                                              ▼
                                           End
```

## System Component Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER INTERFACES                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Citizen   │  │  Government │  │    Admin    │              │
│  │    Portal   │  │   Officer   │  │  Dashboard  │              │
│  │             │  │  Dashboard  │  │             │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│         │                 │                 │                   │
└─────────┼─────────────────┼─────────────────┼───────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌──────────────────────────────────────────────────────────────────┐
│                     CORE SERVICES                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Appointment │  │   Document  │  │    User     │              │
│  │   Manager   │  │   Manager   │  │   Manager   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│         │                 │                 │                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │Notification │  │  Analytics  │  │  Feedback   │              │
│  │   Service   │  │   Engine    │  │   System    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │    Firestore     │  │  Firebase Auth   │                     │
│  │    Database      │  │    Service       │                     │
│  │                  │  │                  │                     │
│  │ • Users          │  │ • Authentication │                     │
│  │ • Departments    │  │ • Authorization  │                     │
│  │ • Services       │  │ • Role Management│                     │
│  │ • Appointments   │  │                  │                     │
│  │ • Documents      │  └──────────────────┘                     │
│  │ • Notifications  │                                            │
│  │ • Feedback       │  ┌──────────────────┐                     │
│  │ • Analytics      │  │ Firebase Storage │                     │
│  └──────────────────┘  │                  │                     │
│                        │ • Document Files │                     │
│                        │ • Images         │                     │
│                        │ • QR Codes       │                     │
│                        └──────────────────┘                     │
└──────────────────────────────────────────────────────────────────┘
```

## Feature Implementation Status

```
┌─────────────────────────────────────────────────────────────────┐
│                    REQUIREMENT CHECKLIST                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ✅ 1. Unified Appointment Booking System                       │
│    ├─ ✅ Service Directory (4 Departments, 12 Services)       │
│    ├─ ✅ Interactive Calendar Interface                        │
│    └─ ✅ QR Code & Reference Number Generation                 │
│                                                                 │
│ ✅ 2. Citizen Dashboard & Document Pre-submission              │
│    ├─ ✅ Secure User Registration                             │
│    ├─ ✅ Personal Dashboard                                    │
│    └─ ✅ Document Upload Feature                               │
│                                                                 │
│ ✅ 3. Government Officer Interface                             │
│    ├─ ✅ Officer Dashboard                                     │
│    └─ ✅ Document Review System                                │
│                                                                 │
│ ✅ 4. Automated Notification System                            │
│    ├─ ✅ Email Notifications                                   │
│    ├─ ✅ Real-time Toast Notifications                         │
│    └─ 🔄 SMS Integration (Planned)                            │
│                                                                 │
│ ✅ 5. Analytics for Optimization                               │
│    ├─ ✅ Data Visualization Dashboard                          │
│    ├─ ✅ Peak Hours Analysis                                   │
│    └─ ✅ Department Load Monitoring                            │
│                                                                 │
│ ✅ 6. Integrated Feedback System                               │
│    ├─ ✅ Rating & Review System                                │
│    └─ ✅ Feedback Analytics                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

These visual diagrams provide a comprehensive overview of the GovEase system architecture, data relationships, user flows, and implementation status for the Tech-Triathlon submission.