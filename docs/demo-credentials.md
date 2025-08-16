# 🔐 Demo User Credentials - GovEase Platform

**For Tech-Triathlon 2025 Demonstration**

---

## 👤 Demo User Accounts

### 1. 👨‍💼 **Citizen User**
```
📧 Email: citizen.demo@govease.lk
🔒 Password: Citizen123!
👤 Name: Amal Perera
🆔 NIC: 123456789V
📱 Phone: +94771234567
🎭 Role: Citizen
```

**Features to Demo:**
- Browse government services
- Book appointments with calendar
- Upload required documents
- View appointment dashboard
- Track appointment status
- Provide feedback after completion

---

### 2. 🏛️ **Government Officer**
```
📧 Email: officer.demo@motortraffic.gov.lk
🔒 Password: Officer123!
👤 Name: Sunil Fernando
🆔 NIC: 987654321V
📱 Phone: +94777654321
🎭 Role: Officer
🏢 Department: Department of Motor Traffic
```

**Features to Demo:**
- View department appointments
- Review submitted documents
- Approve/reject documents
- Update appointment status
- Communicate with citizens
- Department analytics

---

### 3. 🔧 **System Administrator**
```
📧 Email: admin.demo@govease.lk
🔒 Password: Admin123!
👤 Name: Kumari Silva
🆔 NIC: 555666777V
📱 Phone: +94775556677
🎭 Role: Admin
🏢 Access: All Departments
```

**Features to Demo:**
- System-wide analytics dashboard
- Manage all departments
- View all appointments
- Monitor system performance
- User management
- Comprehensive reporting

---

## 📊 Sample Data Generated

### 🏛️ **Departments Available:**
1. **Department of Motor Traffic** (🚗)
   - Driving License Application
   - Vehicle Registration  
   - License Renewal

2. **Department of Immigration & Emigration** (🛂)
   - Passport Application
   - Passport Renewal
   - Visa Extension

3. **Registrar General's Department** (📋)
   - Birth Certificate
   - Marriage Certificate
   - Death Certificate

4. **Department of Inland Revenue** (💰)
   - Tax Registration
   - Tax Return Filing
   - Tax Clearance Certificate

### 📅 **Sample Appointments:**
- **Confirmed**: Amal Perera → Driving License (Jan 20, 2025)
- **Pending**: Amal Perera → Passport Application (Jan 25, 2025)
- **Completed**: Various historical appointments for analytics

### 📄 **Sample Documents:**
- National ID copies
- Medical certificates
- Application forms
- Supporting documents

### 📈 **Analytics Data:**
- Peak booking hours: 10:00 AM, 11:00 AM, 2:00 PM
- Department loads and distribution
- No-show rates and completion statistics
- Citizen satisfaction ratings

---

## 🚀 Quick Demo Flow

### **1. Citizen Experience**
1. Login as citizen.demo@govease.lk
2. Browse services at `/services`
3. Book appointment at `/book/[serviceId]`
4. Upload documents during booking
5. View dashboard at `/dashboard`
6. Check QR code and appointment details

### **2. Officer Experience**
1. Login as officer.demo@motortraffic.gov.lk
2. Access officer dashboard at `/admin`
3. Review pending appointments
4. Approve/reject submitted documents
5. Update appointment status
6. View department analytics

### **3. Admin Experience**
1. Login as admin.demo@govease.lk
2. Access admin panel at `/admin`
3. View system-wide analytics at `/admin/analytics`
4. Monitor all departments
5. Check comprehensive reports

---

## 🔧 Setup Instructions

### **Automatic Setup** (Recommended)
1. Visit: `http://localhost:3001/admin/seed`
2. Click "Seed Database" button
3. All demo users and data will be created automatically

### **Manual Firebase Setup**
If automatic seeding doesn't work:

1. **Create Users in Firebase Auth:**
   ```bash
   # Use Firebase console to manually create users
   # Or use the auth signup forms in the app
   ```

2. **Add User Profiles to Firestore:**
   ```javascript
   // Users collection documents
   {
     uid: "citizen-demo-001",
     email: "citizen.demo@govease.lk",
     name: "Amal Perera",
     nic: "123456789V",
     phone: "+94771234567",
     role: "citizen"
   }
   ```

---

## 📱 Test Scenarios

### **Scenario 1: Complete Booking Flow**
1. Login as citizen → Browse services → Select driving license
2. Choose date/time → Upload documents → Confirm booking
3. Login as officer → Review documents → Approve appointment
4. Check notifications and status updates

### **Scenario 2: Document Review Process**
1. Citizen uploads incomplete documents
2. Officer reviews and requests revision
3. Citizen receives notification and re-uploads
4. Officer approves and confirms appointment

### **Scenario 3: Analytics Dashboard**
1. Login as admin → View analytics dashboard
2. Check peak hours, department loads
3. Monitor no-show rates and satisfaction
4. Export reports and insights

---

## 🎯 Key Features to Highlight

### **1. User Experience**
- ✨ Beautiful, intuitive interface
- 📱 Mobile-responsive design
- 🔔 Real-time notifications
- 📄 QR code generation

### **2. Security**
- 🔐 Firebase Authentication
- 🛡️ Role-based access control
- 🔒 Secure document storage
- ✅ Input validation

### **3. Functionality**
- 📅 Interactive calendar booking
- 📊 Comprehensive analytics
- 📁 Document pre-submission
- ⭐ Integrated feedback system

### **4. Technical Excellence**
- ⚡ Next.js 15 + TypeScript
- 🔥 Firebase integration
- 🎨 Tailwind CSS styling
- 📈 Recharts visualizations

---

## 🌐 Live Demo URLs

- **Homepage**: http://localhost:3001
- **Services**: http://localhost:3001/services
- **Auth**: http://localhost:3001/auth
- **Dashboard**: http://localhost:3001/dashboard
- **Admin**: http://localhost:3001/admin
- **Analytics**: http://localhost:3001/admin/analytics
- **Seed Data**: http://localhost:3001/admin/seed

---

## 🎬 Demo Script

### **Opening (30 seconds)**
"Welcome to GovEase - transforming Sri Lankan government services through digital innovation."

### **Citizen Journey (2 minutes)**
1. Show service directory
2. Demonstrate appointment booking
3. Document upload process
4. Dashboard and QR code

### **Officer Interface (1.5 minutes)**
1. Login as officer
2. Review submitted documents
3. Approve appointment
4. Update status

### **Analytics Dashboard (1 minute)**
1. System-wide metrics
2. Peak hours analysis
3. Department performance
4. Citizen satisfaction

### **Closing (30 seconds)**
"GovEase - Streamlining government services for 22 million Sri Lankans."

---

**🏆 Ready for Tech-Triathlon Demonstration!**

*All credentials are for demonstration purposes only.*