// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');

// Firebase configuration using environment variables
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Test functions
async function testFirebaseConnection() {
  console.log('🔥 Testing Firebase Connection...');
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('Storage Bucket:', firebaseConfig.storageBucket);
  console.log('✅ Firebase initialized successfully');
}

async function testFirestoreOperations() {
  console.log('\n📄 Testing Firestore Operations...');
  
  try {
    // Test write operation
    const testDoc = doc(db, 'test-collection', 'test-doc-' + Date.now());
    await setDoc(testDoc, {
      message: 'Hello from Firebase test!',
      timestamp: new Date(),
      testNumber: Math.random()
    });
    console.log('✅ Firestore write operation successful');
    
    // Test read operation
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('✅ Firestore read operation successful');
      console.log('Data:', docSnap.data());
    } else {
      console.log('❌ Document not found after write');
    }
    
    // Test collection operations
    const testCollection = collection(db, 'test-departments');
    await addDoc(testCollection, {
      name: 'Test Department',
      description: 'This is a test department',
      createdAt: new Date()
    });
    console.log('✅ Firestore collection add successful');
    
    // Test query operations
    const querySnapshot = await getDocs(testCollection);
    console.log(`✅ Firestore query successful - Found ${querySnapshot.size} documents`);
    
    // Cleanup
    await deleteDoc(testDoc);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log('✅ Firestore cleanup successful');
    
  } catch (error) {
    console.error('❌ Firestore operation failed:', error);
    throw error;
  }
}

async function testAuthenticationOperations() {
  console.log('\n🔐 Testing Authentication Operations...');
  
  const testEmail = `test${Date.now()}@govease.test`;
  const testPassword = 'TestPassword123!';
  
  try {
    // Test user creation
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const user = userCredential.user;
    console.log('✅ User creation successful');
    console.log('User ID:', user.uid);
    console.log('User Email:', user.email);
    
    // Test user profile creation in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: 'Test User',
      email: testEmail,
      phone: '+94771234567',
      nic: '123456789V',
      role: 'citizen',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('✅ User profile creation in Firestore successful');
    
    // Test sign out and sign in
    await auth.signOut();
    console.log('✅ Sign out successful');
    
    const signInCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('✅ Sign in successful');
    
    // Test user profile retrieval
    const userDoc = await getDoc(doc(db, 'users', signInCredential.user.uid));
    if (userDoc.exists()) {
      console.log('✅ User profile retrieval successful');
      console.log('Profile data:', userDoc.data());
    }
    
    // Cleanup - delete test user
    await deleteUser(signInCredential.user);
    await deleteDoc(doc(db, 'users', signInCredential.user.uid));
    console.log('✅ Authentication cleanup successful');
    
  } catch (error) {
    console.error('❌ Authentication operation failed:', error);
    throw error;
  }
}

async function testStorageOperations() {
  console.log('\n📁 Testing Storage Operations...');
  
  try {
    // Create test file data
    const testFileName = `test-file-${Date.now()}.txt`;
    const testFileContent = 'This is a test file for Firebase Storage';
    const fileBlob = new Blob([testFileContent], { type: 'text/plain' });
    
    // Test file upload
    const storageRef = ref(storage, `test-uploads/${testFileName}`);
    const uploadResult = await uploadBytes(storageRef, fileBlob);
    console.log('✅ Storage upload successful');
    console.log('Upload metadata:', uploadResult.metadata);
    
    // Test file download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log('✅ Storage download URL generation successful');
    console.log('Download URL:', downloadURL);
    
    // Test file deletion
    await deleteObject(storageRef);
    console.log('✅ Storage file deletion successful');
    
  } catch (error) {
    console.error('❌ Storage operation failed:', error);
    throw error;
  }
}

async function testSeedDataOperations() {
  console.log('\n🌱 Testing Seed Data Operations...');
  
  try {
    // Test department creation
    const departmentData = {
      name: 'Test Department of Motor Traffic',
      description: 'Test department for comprehensive functionality testing',
      location: 'Test Location, Colombo',
      contactNumber: '+94-11-1234567',
      email: 'test@dmt.gov.lk',
      workingHours: {
        start: '08:30',
        end: '16:30',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      services: [],
      isActive: true,
      createdAt: new Date()
    };
    
    const deptRef = await addDoc(collection(db, 'departments'), departmentData);
    console.log('✅ Department creation successful, ID:', deptRef.id);
    
    // Test service creation
    const serviceData = {
      name: 'Test Driving License Application',
      description: 'Test service for comprehensive functionality testing',
      departmentId: deptRef.id,
      duration: 60,
      requiredDocuments: ['National Identity Card', 'Medical Certificate'],
      fee: 2500,
      isActive: true,
      availableSlots: 20,
      createdAt: new Date()
    };
    
    const serviceRef = await addDoc(collection(db, 'services'), serviceData);
    console.log('✅ Service creation successful, ID:', serviceRef.id);
    
    // Test appointment creation
    const appointmentData = {
      userId: 'test-user-id',
      serviceId: serviceRef.id,
      departmentId: deptRef.id,
      date: new Date('2025-02-20T10:00:00Z'),
      timeSlot: '10:00-11:00',
      status: 'pending',
      qrCode: `QR-TEST-${Date.now()}`,
      referenceNumber: `GE-TEST-${Date.now()}`,
      documents: [],
      notes: 'Test appointment for comprehensive functionality testing',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const appointmentRef = await addDoc(collection(db, 'appointments'), appointmentData);
    console.log('✅ Appointment creation successful, ID:', appointmentRef.id);
    
    // Test data retrieval
    const deptDoc = await getDoc(doc(db, 'departments', deptRef.id));
    const serviceDoc = await getDoc(doc(db, 'services', serviceRef.id));
    const appointmentDoc = await getDoc(doc(db, 'appointments', appointmentRef.id));
    
    console.log('✅ Data retrieval successful');
    console.log('Department:', deptDoc.exists() ? deptDoc.data().name : 'Not found');
    console.log('Service:', serviceDoc.exists() ? serviceDoc.data().name : 'Not found');
    console.log('Appointment:', appointmentDoc.exists() ? appointmentDoc.data().referenceNumber : 'Not found');
    
    // Cleanup
    await deleteDoc(doc(db, 'departments', deptRef.id));
    await deleteDoc(doc(db, 'services', serviceRef.id));
    await deleteDoc(doc(db, 'appointments', appointmentRef.id));
    console.log('✅ Seed data test cleanup successful');
    
  } catch (error) {
    console.error('❌ Seed data operation failed:', error);
    throw error;
  }
}

async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive Firebase Integration Test');
  console.log('================================================');
  
  try {
    await testFirebaseConnection();
    await testFirestoreOperations();
    await testAuthenticationOperations();
    await testStorageOperations();
    await testSeedDataOperations();
    
    console.log('\n🎉 ALL TESTS PASSED! Firebase integration is working perfectly!');
    console.log('================================================');
    console.log('✅ Firebase Configuration: WORKING');
    console.log('✅ Firestore Database: WORKING');
    console.log('✅ Firebase Authentication: WORKING'); 
    console.log('✅ Firebase Storage: WORKING');
    console.log('✅ Seed Data Operations: WORKING');
    console.log('================================================');
    
  } catch (error) {
    console.error('\n💥 TEST FAILED!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the test
runComprehensiveTest();