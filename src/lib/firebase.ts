import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;