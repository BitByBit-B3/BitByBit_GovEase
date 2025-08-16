const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDYe5gt9vbyxQsW3d3OvlQLvY2a_fcpwkg",
  authDomain: "bitbybit-govease.firebaseapp.com",
  projectId: "bitbybit-govease",
  storageBucket: "bitbybit-govease.firebasestorage.app",
  messagingSenderId: "781219848241",
  appId: "1:781219848241:web:d9acc3bd99e7a10972f510",
  measurementId: "G-LJ1DRF05GW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTestAppointments() {
  try {
    console.log('Creating test appointments...');
    
    // Get your user ID from the screenshot - looks like EhGMRj9X4DZ8SwYbugOHmhZVwOy1
    const userId = "EhGMRj9X4DZ8SwYbugOHmhZVwOy1";
    
    const testAppointments = [
      {
        userId: userId,
        serviceId: "test-service-1",
        departmentId: "test-dept-1", 
        date: Timestamp.fromDate(new Date(2025, 7, 20)), // August 20, 2025
        timeSlot: "10:00-11:00",
        status: "pending",
        referenceNumber: `GE${Date.now()}TEST1`,
        notes: "Test appointment 1",
        documents: [],
        qrCode: "",
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      {
        userId: userId,
        serviceId: "test-service-2", 
        departmentId: "test-dept-2",
        date: Timestamp.fromDate(new Date(2025, 7, 22)), // August 22, 2025
        timeSlot: "14:00-15:00", 
        status: "confirmed",
        referenceNumber: `GE${Date.now()}TEST2`,
        notes: "Test appointment 2",
        documents: [],
        qrCode: "",
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      {
        userId: userId,
        serviceId: "test-service-3",
        departmentId: "test-dept-3",
        date: Timestamp.fromDate(new Date(2025, 7, 18)), // August 18, 2025  
        timeSlot: "09:00-10:00",
        status: "completed",
        referenceNumber: `GE${Date.now()}TEST3`,
        notes: "Test appointment 3",
        documents: [],
        qrCode: "",
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      }
    ];

    for (let i = 0; i < testAppointments.length; i++) {
      const appointment = testAppointments[i];
      console.log(`Creating appointment ${i + 1}...`);
      
      const docRef = await addDoc(collection(db, 'appointments'), appointment);
      console.log(`✅ Appointment ${i + 1} created with ID:`, docRef.id);
      
      // Small delay between creations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('🎉 All test appointments created successfully!');
    console.log('Check Firebase Console: https://console.firebase.google.com/u/0/project/bitbybit-govease/firestore/data/~2Fappointments');
    
  } catch (error) {
    console.error('❌ Error creating appointments:', error);
  }
}

createTestAppointments();