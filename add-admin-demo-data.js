// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addAdminDemoData() {
  try {
    console.log('👑 Adding admin profile and analytics data...');
    
    // Get the admin's actual UID from Firebase Auth users
    const adminUID = '1v1EdpNKmiWRH4MAwx9fKxbsYpO2'; // This is the actual UID from our test
    
    // Update the admin user profile with complete data
    await setDoc(doc(db, 'users', adminUID), {
      name: 'Kumari Silva',
      email: 'admin.demo@govease.lk',
      phone: '+94775556677',
      nic: '555666777V',
      role: 'admin',
      department: 'Administration',
      position: 'System Administrator',
      permissions: ['view_all', 'manage_users', 'manage_departments', 'view_analytics', 'system_settings'],
      createdAt: new Date('2024-01-15T08:00:00Z'),
      updatedAt: new Date()
    });
    console.log('✅ Updated admin user profile');

    // Create comprehensive system analytics
    const systemAnalytics = {
      id: 'system-analytics-2025',
      type: 'system_overview',
      generatedAt: new Date(),
      timeRange: {
        start: new Date('2024-01-01T00:00:00Z'),
        end: new Date('2025-02-28T23:59:59Z')
      },
      data: {
        overview: {
          totalUsers: 61,
          totalCitizens: 55,
          totalOfficers: 4,
          totalAdmins: 2,
          totalAppointments: 217,
          totalDepartments: 4,
          totalServices: 12,
          totalFeedback: 103,
          systemUptime: '99.8%',
          averageRating: 4.2
        },
        appointments: {
          completed: 142,
          confirmed: 38,
          pending: 25,
          cancelled: 8,
          noShow: 4,
          completionRate: '94.2%',
          averageProcessingTime: '2.3 days'
        },
        departments: {
          'demo-dept-motor-traffic': {
            name: 'Department of Motor Traffic',
            totalAppointments: 68,
            completed: 45,
            pending: 12,
            confirmed: 8,
            cancelled: 2,
            noShow: 1,
            averageRating: 4.3,
            popularServices: ['driving-license', 'vehicle-registration', 'license-renewal'],
            monthlyGrowth: '+12%'
          },
          'demo-dept-immigration': {
            name: 'Department of Immigration & Emigration',
            totalAppointments: 58,
            completed: 38,
            pending: 8,
            confirmed: 10,
            cancelled: 1,
            noShow: 1,
            averageRating: 4.4,
            popularServices: ['passport-application', 'passport-renewal', 'visa-extension'],
            monthlyGrowth: '+8%'
          },
          'demo-dept-registrar-general': {
            name: 'Registrar General\'s Department',
            totalAppointments: 52,
            completed: 35,
            pending: 3,
            confirmed: 12,
            cancelled: 2,
            noShow: 0,
            averageRating: 4.0,
            popularServices: ['birth-certificate', 'marriage-certificate', 'death-certificate'],
            monthlyGrowth: '+15%'
          },
          'demo-dept-inland-revenue': {
            name: 'Department of Inland Revenue',
            totalAppointments: 39,
            completed: 24,
            pending: 2,
            confirmed: 8,
            cancelled: 3,
            noShow: 2,
            averageRating: 3.8,
            popularServices: ['tax-registration', 'tax-filing', 'tax-clearance'],
            monthlyGrowth: '+5%'
          }
        },
        trends: {
          daily: {
            'Monday': 28,
            'Tuesday': 35,
            'Wednesday': 42,
            'Thursday': 38,
            'Friday': 32,
            'Saturday': 18,
            'Sunday': 12
          },
          hourly: {
            '08:00': 12,
            '09:00': 18,
            '10:00': 25,
            '11:00': 22,
            '12:00': 8,
            '13:00': 15,
            '14:00': 28,
            '15:00': 24,
            '16:00': 19
          },
          monthly: {
            'January': 45,
            'February': 52,
            'March': 48,
            'April': 61,
            'May': 58,
            'June': 65,
            'July': 72,
            'August': 68,
            'September': 59,
            'October': 63,
            'November': 55,
            'December': 48
          }
        },
        performance: {
          responseTime: '1.2s',
          dataAccuracy: '99.7%',
          userSatisfaction: '4.2/5',
          systemReliability: '99.8%',
          processingEfficiency: '94.2%'
        },
        topServices: [
          { id: 'demo-service-driving-license', name: 'Driving License Application', count: 32, growth: '+15%' },
          { id: 'demo-service-passport-application', name: 'Passport Application', count: 28, growth: '+12%' },
          { id: 'demo-service-birth-certificate', name: 'Birth Certificate', count: 25, growth: '+8%' },
          { id: 'demo-service-vehicle-registration', name: 'Vehicle Registration', count: 22, growth: '+10%' },
          { id: 'demo-service-tax-registration', name: 'Tax Registration', count: 18, growth: '+5%' }
        ],
        recentActivity: [
          { action: 'New appointment booked', user: 'Amal Perera', service: 'Vehicle Registration', time: '2 hours ago' },
          { action: 'Appointment completed', user: 'Sita Fernando', service: 'Birth Certificate', time: '4 hours ago' },
          { action: 'Feedback submitted', user: 'Nimal Silva', rating: 5, time: '6 hours ago' },
          { action: 'New user registered', user: 'Kamal Jayasinghe', role: 'citizen', time: '8 hours ago' },
          { action: 'Document uploaded', user: 'Priya Wickramasinghe', service: 'Passport Renewal', time: '1 day ago' }
        ]
      }
    };

    await setDoc(doc(db, 'analytics', systemAnalytics.id), systemAnalytics);
    console.log('✅ Created comprehensive system analytics');

    // Create admin activity log
    const adminActivity = {
      id: `admin-activity-${adminUID}`,
      userId: adminUID,
      role: 'admin',
      lastLogin: new Date(),
      sessionCount: 156,
      actionsPerformed: {
        usersManaged: 23,
        appointmentsReviewed: 89,
        reportsGenerated: 15,
        systemConfigChanges: 7,
        departmentUpdates: 12
      },
      recentActions: [
        { action: 'Generated monthly report', timestamp: new Date('2025-01-28T14:30:00Z') },
        { action: 'Updated department working hours', timestamp: new Date('2025-01-27T16:45:00Z') },
        { action: 'Reviewed user feedback', timestamp: new Date('2025-01-26T11:20:00Z') },
        { action: 'Approved new service registration', timestamp: new Date('2025-01-25T09:15:00Z') },
        { action: 'Updated system settings', timestamp: new Date('2025-01-24T15:00:00Z') }
      ],
      permissions: {
        canViewAllData: true,
        canManageUsers: true,
        canModifyServices: true,
        canAccessAnalytics: true,
        canManageSystem: true
      }
    };

    await setDoc(doc(db, 'admin_activity', adminActivity.id), adminActivity);
    console.log('✅ Created admin activity tracking');

    // Create system alerts for admin dashboard
    const systemAlerts = [
      {
        id: 'alert-001',
        type: 'info',
        title: 'System Performance Update',
        message: 'All systems running smoothly. 99.8% uptime maintained this month.',
        severity: 'low',
        read: false,
        createdAt: new Date('2025-01-28T08:00:00Z')
      },
      {
        id: 'alert-002',
        type: 'success',
        title: 'Monthly Target Achieved',
        message: 'Congratulations! Department of Motor Traffic exceeded appointment targets by 15%.',
        severity: 'low',
        read: true,
        createdAt: new Date('2025-01-27T17:00:00Z')
      },
      {
        id: 'alert-003',
        type: 'warning',
        title: 'High Demand Alert',
        message: 'Passport services experiencing high demand. Consider extending operating hours.',
        severity: 'medium',
        read: false,
        createdAt: new Date('2025-01-26T14:30:00Z')
      }
    ];

    for (const alert of systemAlerts) {
      await setDoc(doc(db, 'system_alerts', alert.id), alert);
    }
    console.log('✅ Created system alerts for admin dashboard');

    console.log('\n👑 ADMIN DEMO DATA CREATION COMPLETED!');
    console.log('================================================');
    console.log('✅ Admin Profile: Complete with permissions and role details');
    console.log('✅ System Analytics: Comprehensive overview with 61 users and 217 appointments');
    console.log('✅ Department Statistics: Detailed performance metrics for all 4 departments');
    console.log('✅ Trend Analysis: Daily, hourly, and monthly usage patterns');
    console.log('✅ Performance Metrics: Response times, satisfaction rates, and efficiency');
    console.log('✅ Admin Activity: Complete session and action tracking');
    console.log('✅ System Alerts: Important notifications and updates');
    console.log('================================================');
    console.log('🚀 ADMIN DASHBOARD WILL NOW SHOW RICH ANALYTICS!');
    console.log('👑 admin.demo@govease.lk will see:');
    console.log('   - Complete system overview with 61 users');
    console.log('   - Department performance comparisons');
    console.log('   - Real-time analytics and trends');
    console.log('   - User satisfaction metrics');
    console.log('   - System alerts and notifications');
    console.log('   - Recent activity across all departments');
    console.log('================================================');
    
  } catch (error) {
    console.error('❌ Error creating admin demo data:', error);
    process.exit(1);
  }
}

// Run the admin data creation
addAdminDemoData();