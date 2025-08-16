# GovEase Database Schema

## Entity Relationship Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      Users      │    │   Departments   │    │    Services     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ email           │    │ name            │    │ name            │
│ name            │    │ description     │    │ description     │
│ phone           │    │ location        │    │ departmentId(FK)│
│ role            │    │ contactNumber   │    │ duration        │
│ nic             │    │ email           │    │ requiredDocs    │
│ createdAt       │    │ workingHours    │    │ fee             │
│ updatedAt       │    │ services[]      │    │ isActive        │
└─────────────────┘    │ isActive        │    │ availableSlots  │
          │            │ createdAt       │    │ createdAt       │
          │            └─────────────────┘    └─────────────────┘
          │                      │                      │
          │                      │                      │
          │                      └──────────────────────┘
          │
          │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Appointments   │    │UploadedDocuments│    │  Notifications  │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ userId (FK)     │◄───┤ appointmentId   │    │ userId (FK)     │
│ serviceId (FK)  │    │ name            │    │ type            │
│ departmentId(FK)│    │ type            │    │ title           │
│ date            │    │ url             │    │ message         │
│ timeSlot        │    │ size            │    │ read            │
│ status          │    │ uploadedAt      │    │ createdAt       │
│ qrCode          │    │ status          │    └─────────────────┘
│ referenceNumber │    │ rejectionReason │              │
│ documents[]     │    └─────────────────┘              │
│ notes           │              │                      │
│ officerNotes    │              │                      │
│ createdAt       │              │                      │
│ updatedAt       │              │                      │
└─────────────────┘──────────────┘                      │
          │                                             │
          │                                             │
          │                                             │
┌─────────────────┐                                     │
│    Feedback     │                                     │
├─────────────────┤                                     │
│ id (PK)         │                                     │
│ appointmentId   │◄────────────────────────────────────┘
│ userId (FK)     │
│ rating          │
│ comment         │
│ createdAt       │
└─────────────────┘
```

## Firestore Collections Structure

### 1. users
```javascript
{
  id: string,
  email: string,
  name: string,
  phone: string,
  role: 'citizen' | 'officer' | 'admin',
  nic: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 2. departments
```javascript
{
  id: string,
  name: string,
  description: string,
  location: string,
  contactNumber: string,
  email: string,
  workingHours: {
    start: string, // "09:00"
    end: string,   // "17:00"
    days: string[] // ["Monday", "Tuesday", ...]
  },
  services: string[], // Array of service IDs
  isActive: boolean,
  createdAt: Timestamp
}
```

### 3. services
```javascript
{
  id: string,
  name: string,
  description: string,
  departmentId: string,
  duration: number, // in minutes
  requiredDocuments: string[],
  fee: number,
  isActive: boolean,
  availableSlots: number,
  createdAt: Timestamp
}
```

### 4. appointments
```javascript
{
  id: string,
  userId: string,
  serviceId: string,
  departmentId: string,
  date: Timestamp,
  timeSlot: string, // "09:00-10:00"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show',
  qrCode: string,
  referenceNumber: string,
  documents: DocumentReference[], // References to uploaded documents
  notes?: string,
  officerNotes?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 5. uploaded_documents
```javascript
{
  id: string,
  appointmentId: string,
  name: string,
  type: string, // MIME type
  url: string,  // Firebase Storage URL
  size: number,
  uploadedAt: Timestamp,
  status: 'pending' | 'approved' | 'rejected',
  rejectionReason?: string
}
```

### 6. notifications
```javascript
{
  id: string,
  userId: string,
  type: 'appointment_confirmation' | 'reminder' | 'status_update' | 'document_review',
  title: string,
  message: string,
  read: boolean,
  createdAt: Timestamp
}
```

### 7. feedback
```javascript
{
  id: string,
  appointmentId: string,
  userId: string,
  rating: number, // 1-5
  comment: string,
  createdAt: Timestamp
}
```

### 8. analytics (aggregated data)
```javascript
{
  id: string, // date or period identifier
  totalAppointments: number,
  completedAppointments: number,
  pendingAppointments: number,
  noShowRate: number,
  averageRating: number,
  peakHours: [
    { hour: number, count: number }
  ],
  departmentLoad: [
    { departmentId: string, count: number }
  ],
  averageProcessingTime: number,
  generatedAt: Timestamp
}
```

## Relationships

1. **Users → Appointments**: One-to-Many (One user can have multiple appointments)
2. **Departments → Services**: One-to-Many (One department can have multiple services)
3. **Services → Appointments**: One-to-Many (One service can have multiple appointments)
4. **Appointments → UploadedDocuments**: One-to-Many (One appointment can have multiple documents)
5. **Users → Notifications**: One-to-Many (One user can have multiple notifications)
6. **Appointments → Feedback**: One-to-One (One appointment can have one feedback)

## Indexes for Performance

### Firestore Composite Indexes
```
appointments: userId, status
appointments: departmentId, date
appointments: serviceId, date
appointments: date, status
notifications: userId, read
feedback: appointmentId
uploaded_documents: appointmentId
services: departmentId, isActive
```

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access to departments and services
    match /departments/{departmentId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
    }
    
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
    }
    
    // Appointments - users can manage their own, officers can manage their department's
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer']);
    }
    
    // Documents tied to appointments
    match /uploaded_documents/{documentId} {
      allow read, write: if request.auth != null;
    }
    
    // Notifications for specific users
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Feedback - users can create, officers can read
    match /feedback/{feedbackId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Analytics - read only for officers and admins
    match /analytics/{analyticsId} {
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'officer'];
    }
  }
}
```