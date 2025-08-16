# GovEase - Government Service Portal
**Team BitByBit | Tech-Triathlon 2025**

A centralized government service appointment booking portal for Sri Lankan citizens, streamlining access to government services and reducing physical waiting times.

## 🎯 Project Overview

GovEase revolutionizes how Sri Lankan citizens interact with government services by providing:
- **Unified appointment booking** across multiple departments
- **Document pre-submission** to speed up in-person visits
- **Real-time notifications** and appointment management
- **QR code confirmations** for seamless verification
- **Officer dashboard** for efficient service management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Docker
- Firebase account (already configured)
- Git

### Option 1: Docker Deployment (Recommended)
```bash
# Clone the repository
git clone https://github.com/BitByBit-B3/BitByBit_GovEase.git
cd BitByBit_GovEase

# Start with Docker Compose
docker-compose up -d

# Access the application
open http://localhost:3000
```

### Option 2: Local Development
```bash
# Clone and setup
git clone https://github.com/BitByBit-B3/BitByBit_GovEase.git
cd BitByBit_GovEase

# Install dependencies
npm install --legacy-peer-deps

# Copy environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 3. Initial Setup & Demo Data

#### Automatic Data Seeding
1. Navigate to any service booking page
2. Click the "🌱 CREATE ALL DATA" button to instantly populate:
   - 3 Government departments
   - 9 Services with realistic details
   - Sample appointments for testing

#### Manual Admin Setup
1. Register as a new user at `/auth`
2. Go to admin panel `/admin` 
3. Use the seed utilities to create sample data
4. Explore the dashboard and analytics

## 🏗️ Architecture

### Tech Stack
- **Frontend:** Next.js 15.4.2, React 18, TypeScript
- **Backend:** Firebase (Firestore, Auth, Storage, Hosting)
- **UI:** Tailwind CSS, Heroicons, React Hook Form
- **Calendar:** React Calendar for appointment booking
- **QR Codes:** QRCode library for appointment confirmations
- **Charts:** Recharts for analytics dashboard

### Project Structure
```
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Citizen dashboard
│   │   ├── admin/           # Officer/admin interface
│   │   ├── services/        # Service directory
│   │   └── book/           # Appointment booking
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React contexts (Auth)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions and helpers
│   └── lib/                # Firebase configuration
├── docs/                   # Documentation
├── docker-compose.yml      # Docker deployment
├── firebase.json          # Firebase configuration
└── README.md
```

## 🏛️ Government Services

### Included Departments:
1. **Department of Motor Traffic**
   - Driving License Application
   - Vehicle Registration
   - License Renewal

2. **Department of Immigration & Emigration**
   - Passport Application
   - Passport Renewal
   - Visa Extension

3. **Registrar General's Department**
   - Birth Certificate
   - Marriage Certificate
   - Death Certificate

4. **Department of Inland Revenue**
   - Tax Registration
   - Tax Return Filing
   - Tax Clearance Certificate

## 👥 User Roles

### Citizens
- Browse and search government services
- Book appointments with calendar interface
- Upload required documents in advance
- Track appointment status and history
- Receive notifications and reminders
- Provide feedback after service completion

### Government Officers
- View and manage department appointments
- Review and approve submitted documents
- Update appointment statuses
- Communicate with citizens
- Access department analytics

### Administrators
- Manage all departments and services
- Oversee system-wide operations
- Monitor analytics and performance
- Manage user roles and permissions

## 🔐 Authentication & Security

### User Registration
- Email/password authentication via Firebase Auth
- Role-based access control (citizen/officer/admin)
- Secure document upload and storage

### Security Features
- Comprehensive Firestore security rules
- Storage rules for document access control
- Input validation with Zod schemas
- XSS and CSRF protection

## 📱 Key Features

### 1. Unified Appointment Booking
- Interactive calendar with real-time availability
- Department and service filtering
- Time slot selection based on working hours
- Instant booking confirmation

### 2. Document Management
- Secure file upload (PDF, images, documents)
- Pre-submission for faster processing
- Officer review and approval workflow
- Status tracking and notifications

### 3. Smart Notifications
- Appointment confirmations
- 24-hour reminders
- Status updates from officers
- Document review notifications

### 4. QR Code System
- Unique QR codes for each appointment
- Quick verification at government offices
- Reference number tracking
- Digital confirmation system

### 5. Analytics Dashboard
- Appointment trends and patterns
- Department load monitoring
- No-show rates and statistics
- Performance metrics

## 🚢 Deployment

### 🐳 Docker Deployment (Production Ready)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

The Docker setup includes:
- Next.js application container
- Nginx reverse proxy with SSL support
- Automatic container restart
- Production optimizations

### ☁️ Firebase Hosting
```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only firestore
```

### 🔧 Manual Production Deployment
```bash
# Install production dependencies
npm ci --only=production

# Build application
npm run build

# Start production server
npm start

# With PM2 for process management
npm install -g pm2
pm2 start npm --name "govease" -- start
```

### Environment Configuration
Create `.env.local` with your Firebase configuration:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🗄️ Database Schema

### Firestore Collections:
- **users** - User profiles and authentication
- **departments** - Government department information
- **services** - Available services with requirements
- **appointments** - Booking records and status
- **uploaded_documents** - File storage references
- **notifications** - User communication
- **feedback** - Post-appointment ratings
- **analytics** - Performance metrics

See `docs/database-schema.md` for detailed ER diagram and relationships.

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables
Firebase configuration is pre-configured. For custom setup:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📊 Analytics & Monitoring

### Metrics Tracked:
- Total appointments by department
- Peak booking hours and trends
- No-show rates and patterns
- Average processing times
- Citizen satisfaction ratings
- Document approval rates

## 🎯 Competition Requirements ✅

### ✅ Core Features Implemented:
1. **Unified Appointment Booking System**
2. **Citizen Dashboard & Document Pre-submission**
3. **Government Officer Interface**
4. **Automated Notification System**
5. **Analytics for Optimization**
6. **Integrated Feedback System**

### ✅ Technical Deliverables:
1. **Public GitHub Repository** - Complete source code
2. **README with Setup Instructions** - This file
3. **Docker Configuration** - docker-compose.yml included
4. **ER Diagram** - docs/database-schema.md
5. **Security Implementation** - Firebase rules
6. **Responsive Design** - Mobile-first approach

## 🏆 Innovation Highlights

- **Real-world Implementation** - Actual Sri Lankan government departments
- **Modern Tech Stack** - Latest Next.js, Firebase, TypeScript
- **Security-First Design** - Comprehensive security rules
- **Scalable Architecture** - Cloud-native Firebase backend
- **User Experience Focus** - Intuitive design for all user types
- **Production Ready** - Docker deployment, monitoring, analytics

## 🚧 Future Enhancements

- SMS integration for notifications
- Multi-language support (Sinhala, Tamil, English)
- Payment gateway integration
- Advanced analytics and AI insights
- Mobile app development
- Government database integration

## 📞 Support & Documentation

- **Technical Documentation:** See `/docs` directory
- **API Documentation:** Firebase integration guides
- **Security Documentation:** Firestore and Storage rules
- **Deployment Guides:** Docker and Firebase setup

## 🎬 Demo

A comprehensive demo video showcasing all features has been created for the Tech-Triathlon submission.

---

## 🏅 Team BitByBit

**Built for Tech-Triathlon 2025**

*Streamlining government services for Sri Lankan citizens through modern technology.*

**Live Demo:** [bitbybit-govease.web.app](https://bitbybit-govease.web.app)
