// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

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
const auth = getAuth(app);
const db = getFirestore(app);

async function testDemoUsers() {
  console.log('🔐 Testing Demo User Authentication...');
  
  const demoAccounts = [
    {
      email: 'citizen.demo@govease.lk',
      password: 'demo123456',
      name: 'Amal Perera',
      role: 'citizen',
      uid: 'demo-citizen-001'
    },
    {
      email: 'admin.demo@govease.lk', 
      password: 'admin123456',
      name: 'Kumari Silva',
      role: 'admin',
      uid: 'demo-admin-001'
    }
  ];

  for (const account of demoAccounts) {
    console.log(`\n🧪 Testing ${account.role}: ${account.email}`);
    
    try {
      // Try to sign in first
      console.log('  🔑 Attempting to sign in...');
      const userCredential = await signInWithEmailAndPassword(auth, account.email, account.password);
      console.log(`  ✅ Sign in successful! UID: ${userCredential.user.uid}`);
      
      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(`  ✅ User profile found: ${userData.name} (${userData.role})`);
      } else {
        console.log('  ⚠️  User profile not found in Firestore, creating...');
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: account.name,
          email: account.email,
          phone: '+94771234567',
          nic: '123456789V',
          role: account.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log('  ✅ User profile created in Firestore');
      }
      
      await auth.signOut();
      
    } catch (signInError) {
      console.log(`  ❌ Sign in failed: ${signInError.message}`);
      
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        console.log('  🔧 User does not exist, creating account...');
        
        try {
          const newUserCredential = await createUserWithEmailAndPassword(auth, account.email, account.password);
          console.log(`  ✅ Account created! UID: ${newUserCredential.user.uid}`);
          
          // Create user profile in Firestore
          await setDoc(doc(db, 'users', newUserCredential.user.uid), {
            name: account.name,
            email: account.email,
            phone: '+94771234567',
            nic: '123456789V',
            role: account.role,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log('  ✅ User profile created in Firestore');
          
          await auth.signOut();
          
          // Test login again
          console.log('  🔄 Testing login with new account...');
          const testCredential = await signInWithEmailAndPassword(auth, account.email, account.password);
          console.log(`  ✅ Login test successful! UID: ${testCredential.user.uid}`);
          await auth.signOut();
          
        } catch (createError) {
          console.log(`  ❌ Account creation failed: ${createError.message}`);
        }
      }
    }
  }
  
  console.log('\n🎉 Demo user authentication test completed!');
  console.log('================================================');
  console.log('✅ Citizen Demo: citizen.demo@govease.lk / demo123456');
  console.log('✅ Admin Demo: admin.demo@govease.lk / admin123456');
  console.log('================================================');
}

// Run the test
testDemoUsers().catch(console.error);