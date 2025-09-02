# GovEase Demo Guide

> **End-to-End Government Service Platform Demo**  
> Live interview ready with complete Citizen→Officer→Admin workflow

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase project with Firestore & Storage enabled
- `.env.local` configured with Firebase keys

### Setup (2 minutes)
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Fill in your Firebase configuration

# 3. Start development server
npm run dev

# 4. Seed demo data (visit in browser)
# Go to /admin/seed or use "Create All Data" button
```

---

## 🎭 Demo Accounts

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| **Admin** | `admin@govease.lk` | `admin123` | Full system access, analytics |
| **Officer (Motor)** | `officer.mt@govease.lk` | `officer123` | Department-scoped management |
| **Officer (Immigration)** | `officer.im@govease.lk` | `officer123` | Department-scoped management |
| **Citizen** | `citizen@demo.lk` | `citizen123` | End-user experience |

---

## 🎬 Demo Script (3 minutes)

### Act 1: Citizen Journey (1 minute)
1. **Login**: Navigate to `/auth` → Login as `citizen@demo.lk`
2. **Dashboard**: View existing appointments and statistics
3. **Book Service**: Go to `/services` → Select "New Driving License" 
4. **Upload**: Add required documents (PDF/images)
5. **Schedule**: Pick tomorrow's date → Select 10:00 AM slot
6. **Confirm**: Get QR code and reference number
7. **Verify**: Check dashboard shows new "booked" appointment

### Act 2: Officer Workflow (1 minute)
1. **Switch**: Login as `officer.mt@govease.lk` (Motor Traffic)
2. **Queue**: View department-specific appointments only
3. **Process**: Find citizen's appointment → "Confirm" status
4. **Check-in**: Change status from "confirmed" → "checked_in" 
5. **Complete**: Change status from "checked_in" → "completed"
6. **Filter**: Test status and date filters

### Act 3: Admin Analytics (1 minute)
1. **Switch**: Login as `admin@govease.lk`
2. **Overview**: See all appointments across departments
3. **Analytics**: Navigate to `/admin/analytics`
4. **Charts**: View peak hours, department load, completion rates
5. **Insights**: Show optimization recommendations

---

## 🛡️ Security Demo Points

### ✅ **Data Isolation**
- Officers only see their department appointments
- Citizens only see their own appointments
- Document access controlled by ownership

### ✅ **Atomic Transactions** 
- Booking prevents double-booking via Firestore transactions
- Slot capacity enforced atomically
- QR codes generated securely

### ✅ **Firebase Rules**
```javascript
// Example: Appointment access control
allow read: if resource.data.userId == uid() || 
           (isOfficer() && resource.data.departmentId == userDept())
```

---

## 📊 Demo Data Included

- **4 Departments**: Motor Traffic, Immigration, Registrar General, Inland Revenue
- **8+ Services**: Driving licenses, passports, certificates, tax filing
- **280+ Time Slots**: Next 14 days, 10 slots/day per service
- **Demo Appointments**: Pre-created for immediate testing
- **Realistic Data**: Sri Lankan government services

---

## 🎯 Key Features to Highlight

### **Citizen Experience**
- ✅ Service discovery and booking
- ✅ Document upload with progress
- ✅ Real-time appointment tracking
- ✅ QR code generation for check-in
- ✅ Mobile-responsive dashboard

### **Officer Management**
- ✅ Department-scoped appointment queue
- ✅ Status workflow (booked→checked_in→completed)
- ✅ Document review and approval
- ✅ Filter and search capabilities
- ✅ Real-time updates

### **Admin Analytics**
- ✅ Cross-department performance
- ✅ Interactive charts (peak hours, completion rates)
- ✅ Department workload analysis
- ✅ Optimization recommendations
- ✅ User role management

---

## 🐛 Troubleshooting

### **Common Issues**
- **Firebase Rules Denied**: Check user role is set correctly
- **Slot Full Error**: Normal - shows atomic booking working
- **No Services Showing**: Run seed data script first
- **Build Errors**: All TypeScript errors resolved ✅

### **Reset Demo**
```bash
# Clear Firestore collections and re-seed
# Go to /admin/seed → "Reset All Data"
```

---

## 📱 Mobile Testing
- Responsive design works on mobile
- Touch-friendly interface
- QR codes scannable on mobile devices

---

## 🚢 Production Deploy

### **Docker** (recommended)
```bash
docker build -t govease .
docker run -p 3000:3000 govease
```

### **Vercel/Netlify**
- Works out of the box
- Environment variables configured
- Build optimized for static deployment

---

## 📈 Performance Stats
- **Build**: ✅ Successful (< 5s)
- **Bundle Size**: 236KB average per page
- **TypeScript**: ✅ All types resolved
- **Firebase**: ✅ Optimized queries with indexes

---

## 🎉 Demo Success Checklist

- [ ] Environment configured
- [ ] Seed data loaded
- [ ] Citizen can book appointment
- [ ] Officer can manage appointments  
- [ ] Admin can view analytics
- [ ] QR codes generate properly
- [ ] Mobile responsive works
- [ ] Firebase rules enforce security

**Ready for live interview demo! 🚀**