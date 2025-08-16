'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '@/types';
import LoadingScreen from '@/components/LoadingScreen';

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
      setLoading(false); // Set loading to false immediately for faster UI
      
      if (firebaseUser) {
        // Set basic user info immediately, then enhance with Firestore data
        const basicUserObj = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Demo User',
          phone: '+94771234567',
          role: firebaseUser.email?.includes('admin') ? 'admin' : 'citizen',
          nic: '123456789V',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(basicUserObj as User);
        
        // Then fetch/create full profile asynchronously
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userObj = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || basicUserObj.name,
              phone: userData.phone || basicUserObj.phone,
              role: userData.role || basicUserObj.role,
              nic: userData.nic || basicUserObj.nic,
              createdAt: userData.createdAt?.toDate() || basicUserObj.createdAt,
              updatedAt: userData.updatedAt?.toDate() || basicUserObj.updatedAt,
            };
            setUser(userObj);
          } else {
            // Create the user profile in Firestore in background
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: basicUserObj.name,
              email: basicUserObj.email,
              phone: basicUserObj.phone,
              nic: basicUserObj.nic,
              role: basicUserObj.role,
              createdAt: basicUserObj.createdAt,
              updatedAt: basicUserObj.updatedAt,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Keep the basic user object if Firestore fails
        }
      } else {
        setUser(null);
      }
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