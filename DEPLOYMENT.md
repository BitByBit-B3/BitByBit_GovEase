# GovEase Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Firebase Hosting (Recommended)

Firebase project is already configured with credentials. To deploy:

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase:**
```bash
firebase login
```

3. **Initialize Firebase (if needed):**
```bash
firebase init hosting
# Select existing project: bitbybit-govease
# Public directory: out
# Single-page app: Yes
# Overwrite index.html: No
```

4. **Build and Deploy:**
```bash
npm run build
firebase deploy
```

**Live URL:** https://bitbybit-govease.web.app

### Option 2: Docker Deployment

1. **Build Docker Image:**
```bash
docker-compose build
```

2. **Run with Docker Compose:**
```bash
docker-compose up -d
```

3. **Access Application:**
- Application: http://localhost:3000
- Nginx Proxy: http://localhost:80

### Option 3: Local Development

1. **Install Dependencies:**
```bash
npm install --legacy-peer-deps
```

2. **Start Development Server:**
```bash
npm run dev
```

3. **Access Application:**
http://localhost:3000

## 🗄️ Database Setup

### Firebase Configuration
The Firebase project is pre-configured with:
- **Project ID:** bitbybit-govease
- **Firestore Database:** Ready for use
- **Authentication:** Email/password enabled
- **Storage:** File upload ready

### Sample Data Setup

1. **Visit Seed Page:**
http://localhost:3000/admin/seed

2. **Click "Seed Database"** to populate with:
   - 4 Government Departments
   - 12 Services across departments
   - Complete service details and requirements

### Security Rules
Security rules are already configured for:
- Firestore database access control
- Storage bucket file permissions
- Role-based user access (citizen/officer/admin)

## 👥 User Accounts & Testing

### Test User Accounts
Create test accounts by registering at: `/auth?mode=register`

**Recommended Test Accounts:**
1. **Citizen Account:**
   - Email: citizen@test.com
   - Password: password123
   - Role: Citizen

2. **Officer Account:**
   - Email: officer@test.com
   - Password: password123
   - Role: Officer

3. **Admin Account:**
   - Email: admin@test.com
   - Password: password123
   - Role: Citizen (can be manually changed to admin in Firestore)

### Testing Flow
1. **Register as Citizen** → Book appointments → Upload documents
2. **Register as Officer** → Review appointments → Manage bookings
3. **Use Admin Features** → Oversee all operations

## 🔧 Environment Configuration

### Required Environment Variables
All Firebase credentials are pre-configured in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDYe5gt9vbyxQsW3d3OvlQLvY2a_fcpwkg",
  authDomain: "bitbybit-govease.firebaseapp.com",
  projectId: "bitbybit-govease",
  storageBucket: "bitbybit-govease.firebasestorage.app",
  messagingSenderId: "781219848241",
  appId: "1:781219848241:web:d9acc3bd99e7a10972f510",
  measurementId: "G-LJ1DRF05GW"
};
```

### Build Configuration
Production build settings in `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
```

## 📱 Feature Testing Checklist

### ✅ Core Features to Test:

1. **Authentication System**
   - [x] User registration (citizen/officer)
   - [x] User login/logout
   - [x] Role-based dashboard routing

2. **Service Directory**
   - [x] Browse departments and services
   - [x] Filter services by department
   - [x] View service details and requirements

3. **Appointment Booking**
   - [x] Calendar interface with date selection
   - [x] Time slot availability
   - [x] Document upload during booking
   - [x] QR code generation
   - [x] Booking confirmation

4. **Citizen Dashboard**
   - [x] View upcoming appointments
   - [x] Track appointment history
   - [x] Document management
   - [x] Notification center

5. **Officer/Admin Interface**
   - [x] View department appointments
   - [x] Update appointment status
   - [x] Review submitted documents
   - [x] Manage bookings and citizens

6. **Responsive Design**
   - [x] Mobile compatibility
   - [x] Tablet layout
   - [x] Desktop optimization

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors:**
   ```bash
   npm run build
   # If TypeScript errors: Already configured to ignore
   # If dependency conflicts: Use --legacy-peer-deps
   ```

2. **Firebase Connection:**
   - Credentials are pre-configured
   - Check browser console for any auth errors
   - Ensure Firestore rules are deployed

3. **Docker Issues:**
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

4. **Calendar/Date Issues:**
   - Ensure system date is correct
   - Check timezone settings
   - Verify department working hours

### Database Debugging:
- Visit Firebase Console: https://console.firebase.google.com
- Check Firestore data structure
- Review authentication users
- Monitor storage uploads

## 📊 Monitoring & Analytics

### Firebase Console Access:
- **Project:** bitbybit-govease
- **Firestore:** Real-time database monitoring
- **Authentication:** User management
- **Storage:** File upload tracking
- **Hosting:** Deployment status

### Application Analytics:
- Built-in analytics dashboard at `/admin`
- Key metrics tracking:
  - Total appointments
  - Department load
  - No-show rates
  - User satisfaction

## 🚀 Production Deployment

### Pre-deployment Checklist:
- [x] All features tested
- [x] Security rules implemented
- [x] Error handling in place
- [x] Responsive design verified
- [x] Performance optimized
- [x] Documentation complete

### Deployment Commands:
```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy

# Or deploy with Docker
docker-compose up -d --build
```

### Post-deployment:
1. Verify live application functionality
2. Test all user flows
3. Monitor Firebase console for errors
4. Seed database with sample data
5. Test mobile responsiveness

## 📞 Support & Maintenance

### Regular Maintenance:
- Monitor Firebase usage and billing
- Update dependencies quarterly
- Review and update security rules
- Backup important data
- Monitor application performance

### Contact Information:
- **GitHub Repository:** BitByBit_GovEase
- **Tech Stack:** Next.js + Firebase + TypeScript
- **Team:** BitByBit for Tech-Triathlon 2025

---

**Live Demo:** https://bitbybit-govease.web.app
**Status:** Production Ready ✅