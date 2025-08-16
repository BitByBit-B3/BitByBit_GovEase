'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userObj = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || '',
              phone: userData.phone || '',
              role: userData.role || 'citizen',
              nic: userData.nic || '',
              createdAt: userData.createdAt?.toDate() || new Date(),
              updatedAt: userData.updatedAt?.toDate() || new Date(),
            };
            setUser(userObj);
          } else {
            // User exists in Firebase Auth but not in Firestore - create profile
            const defaultUserData = {
              name: firebaseUser.displayName || 'Demo User',
              email: firebaseUser.email || '',
              phone: '+94771234567',
              nic: '123456789V',
              role: firebaseUser.email?.includes('admin') ? 'admin' : 'citizen',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            // Create the user profile in Firestore
            await setDoc(doc(db, 'users', firebaseUser.uid), defaultUserData);
            
            // Set the user object
            const userObj = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: defaultUserData.name,
              phone: defaultUserData.phone,
              role: defaultUserData.role,
              nic: defaultUserData.nic,
              createdAt: defaultUserData.createdAt,
              updatedAt: defaultUserData.updatedAt,
            };
            setUser(userObj);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};