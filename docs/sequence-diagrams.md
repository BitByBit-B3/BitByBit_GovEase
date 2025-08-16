# GovEase Sequence Diagrams

## 1. Citizen Appointment Booking Flow

```mermaid
sequenceDiagram
    participant C as Citizen
    participant UI as Frontend
    participant Auth as Firebase Auth
    participant DB as Firestore
    participant Storage as Firebase Storage
    participant Notify as Notification System

    C->>UI: Visit GovEase portal
    C->>UI: Click "Book Appointment"
    UI->>C: Redirect to login if not authenticated
    
    C->>Auth: Login/Register
    Auth->>UI: Authentication success
    
    C->>UI: Browse services
    UI->>DB: Query departments & services
    DB->>UI: Return available services
    
    C->>UI: Select service
    UI->>DB: Query available time slots
    DB->>UI: Return calendar availability
    
    C->>UI: Select date & time
    C->>UI: Upload documents
    UI->>Storage: Upload files to Firebase Storage
    Storage->>UI: Return download URLs
    
    C->>UI: Confirm booking
    UI->>DB: Create appointment record
    DB->>UI: Return appointment ID
    
    UI->>Notify: Generate QR code & reference
    UI->>DB: Create notification record
    UI->>C: Show booking confirmation
    
    Notify->>C: Send confirmation email/SMS
```

## 2. Officer Appointment Management Flow

```mermaid
sequenceDiagram
    participant O as Officer
    participant UI as Admin Dashboard
    participant Auth as Firebase Auth
    participant DB as Firestore
    participant Notify as Notification System

    O->>UI: Login to admin dashboard
    Auth->>UI: Verify officer role
    
    UI->>DB: Query department appointments
    DB->>UI: Return appointment list
    
    O->>UI: Review appointment details
    UI->>DB: Query citizen & document info
    DB->>UI: Return complete appointment data
    
    O->>UI: Review uploaded documents
    O->>UI: Approve/Reject documents
    UI->>DB: Update document status
    
    O->>UI: Update appointment status
    UI->>DB: Update appointment record
    DB->>UI: Confirm update
    
    UI->>Notify: Create status update notification
    Notify->>DB: Store notification
    Notify->>O: Send update to citizen
```

## 3. Document Review Process

```mermaid
sequenceDiagram
    participant C as Citizen
    participant UI as Frontend
    participant Storage as Firebase Storage
    participant DB as Firestore
    participant O as Officer
    participant Admin as Admin Dashboard
    participant Notify as Notification System

    C->>UI: Upload documents during booking
    UI->>Storage: Store files securely
    Storage->>UI: Return file URLs
    UI->>DB: Create document records
    
    Note over DB: Documents marked as 'pending'
    
    O->>Admin: View pending appointments
    Admin->>DB: Query appointments with documents
    DB->>Admin: Return appointment list
    
    O->>Admin: Open appointment details
    Admin->>Storage: Retrieve document URLs
    Admin->>O: Display documents for review
    
    O->>Admin: Review documents
    O->>Admin: Approve/Reject with comments
    Admin->>DB: Update document status
    
    DB->>Notify: Trigger document review notification
    Notify->>C: Send review result via email/SMS
    
    alt Documents Approved
        Note over C,Notify: Appointment proceeds as scheduled
    else Documents Rejected
        Notify->>C: Request document resubmission
        C->>UI: Upload corrected documents
    end
```

## 4. Notification System Flow

```mermaid
sequenceDiagram
    participant System as GovEase System
    participant DB as Firestore
    participant Notify as Notification Service
    participant Email as Email Service
    participant SMS as SMS Service
    participant C as Citizen

    Note over System: Various triggers (booking, status change, reminders)
    
    System->>DB: Create notification record
    DB->>Notify: Trigger notification process
    
    Notify->>DB: Query user preferences
    DB->>Notify: Return notification settings
    
    par Email Notification
        Notify->>Email: Send email notification
        Email->>C: Deliver email
    and SMS Notification
        Notify->>SMS: Send SMS notification
        SMS->>C: Deliver SMS
    and In-App Notification
        Notify->>DB: Update in-app notification status
        DB->>System: Notification ready for display
    end
    
    C->>System: Mark notification as read
    System->>DB: Update notification status
```

## 5. QR Code Verification Flow

```mermaid
sequenceDiagram
    participant C as Citizen
    participant QR as QR Code
    participant O as Officer
    participant Scanner as QR Scanner
    participant DB as Firestore
    participant System as Verification System

    Note over C: Citizen arrives at government office
    
    C->>O: Present QR code (printed/mobile)
    O->>Scanner: Scan QR code
    Scanner->>System: Decode QR data
    
    System->>DB: Query appointment by reference
    DB->>System: Return appointment details
    
    alt Valid Appointment
        System->>O: Display appointment details
        System->>O: Show citizen information
        System->>O: List required documents
        O->>System: Confirm citizen identity
        System->>DB: Mark appointment as "checked-in"
    else Invalid/Expired
        System->>O: Show error message
        O->>C: Request alternative verification
    end
    
    Note over O,C: Proceed with government service
    
    O->>System: Mark service as completed
    System->>DB: Update appointment status
    System->>C: Trigger feedback request
```

## 6. Analytics Data Flow

```mermaid
sequenceDiagram
    participant Events as System Events
    participant Collector as Data Collector
    participant DB as Firestore
    participant Analytics as Analytics Engine
    participant Dashboard as Admin Dashboard
    participant Officer as Government Officer

    Note over Events: Various system events occur
    
    Events->>Collector: Appointment created
    Events->>Collector: Status changed
    Events->>Collector: Service completed
    Events->>Collector: No-show recorded
    
    Collector->>DB: Store raw event data
    
    Note over Analytics: Scheduled batch processing
    
    Analytics->>DB: Query raw events
    DB->>Analytics: Return event data
    
    Analytics->>Analytics: Calculate metrics
    Note over Analytics: - Total appointments<br/>- Peak hours<br/>- No-show rates<br/>- Department load
    
    Analytics->>DB: Store aggregated analytics
    
    Officer->>Dashboard: Request analytics view
    Dashboard->>DB: Query analytics data
    DB->>Dashboard: Return processed metrics
    Dashboard->>Officer: Display charts and insights
```

## 7. Complete User Journey

```mermaid
sequenceDiagram
    participant C as Citizen
    participant Web as GovEase Portal
    participant Auth as Authentication
    participant DB as Database
    participant Storage as File Storage
    participant Officer as Government Officer
    participant Admin as Admin Portal
    participant Notify as Notifications

    C->>Web: Visit GovEase
    C->>Web: Register/Login
    Web->>Auth: Authenticate user
    Auth->>Web: Return user session
    
    C->>Web: Browse services
    Web->>DB: Query available services
    DB->>Web: Return service catalog
    
    C->>Web: Select service & book appointment
    C->>Web: Upload required documents
    Web->>Storage: Store documents securely
    Web->>DB: Create appointment record
    
    Web->>Notify: Send booking confirmation
    Notify->>C: Email/SMS confirmation
    
    Officer->>Admin: Review new appointments
    Admin->>DB: Query pending appointments
    Officer->>Admin: Review documents
    Officer->>Admin: Approve appointment
    Admin->>DB: Update appointment status
    
    Admin->>Notify: Send approval notification
    Notify->>C: Appointment confirmed
    
    Note over C: Day of appointment
    
    C->>Officer: Present QR code at office
    Officer->>Admin: Verify appointment
    Officer->>Admin: Complete service
    Admin->>DB: Mark as completed
    
    Admin->>Notify: Request feedback
    Notify->>C: Feedback form
    C->>Web: Submit rating & feedback
    Web->>DB: Store feedback data
```