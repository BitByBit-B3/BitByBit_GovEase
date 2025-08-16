'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { BuildingOfficeIcon, ArrowRightIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  nic: z.string().min(10, 'NIC must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['citizen', 'officer']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

function AuthPageContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'register') {
      setMode('register');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'citizen') {
        router.push('/dashboard');
      } else if (user.role === 'officer' || user.role === 'admin') {
        router.push('/admin');
      }
    }
  }, [user, loading, router]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'citizen',
    },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      const user = userCredential.user;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        nic: data.nic,
        role: data.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient hero-pattern relative">
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Navigation */}
      <nav className="nav-glass relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center animate-fade-in-down">
              <div className="feature-icon mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">GovEase</span>
                <div className="gov-badge text-xs mt-1">Sri Lanka Official Portal</div>
              </div>
            </Link>
            <Link href="/" className="btn-secondary animate-fade-in-down stagger-1">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="animate-fade-in-up text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {mode === 'login' ? 'Welcome Back' : 'Join GovEase'}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {mode === 'login' 
                ? 'Access your government services dashboard' 
                : 'Start your digital government services journey'
              }
            </p>
            <div className="text-center">
              {mode === 'login' ? (
                <p className="text-blue-200">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="font-semibold text-white hover:text-blue-200 underline underline-offset-4"
                  >
                    Create one here
                  </button>
                </p>
              ) : (
                <p className="text-blue-200">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="font-semibold text-white hover:text-blue-200 underline underline-offset-4"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card-elevated p-8 animate-fade-in-up stagger-1">
          {mode === 'login' ? (
            <form className="space-y-8" onSubmit={loginForm.handleSubmit(onLogin)}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-heading mb-2">
                    📧 Email Address
                  </label>
                  <input
                    {...loginForm.register('email')}
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="input-field"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-heading mb-2">
                    🔒 Password
                  </label>
                  <input
                    {...loginForm.register('password')}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="input-field"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing you in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Sign In to Dashboard</span>
                    <ArrowRightIcon className="ml-3 h-5 w-5" />
                  </div>
                )}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={registerForm.handleSubmit(onRegister)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-heading mb-2">
                    👤 Full Name
                  </label>
                  <input
                    {...registerForm.register('name')}
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-heading mb-2">
                    📱 Phone Number
                  </label>
                  <input
                    {...registerForm.register('phone')}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+94 70 123 4567"
                    className="input-field"
                  />
                  {registerForm.formState.errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-heading mb-2">
                  📧 Email Address
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="input-field"
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nic" className="block text-sm font-semibold text-heading mb-2">
                    🆔 NIC Number
                  </label>
                  <input
                    {...registerForm.register('nic')}
                    type="text"
                    placeholder="123456789V or 200012345678"
                    className="input-field"
                  />
                  {registerForm.formState.errors.nic && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.nic.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-heading mb-2">
                    🏛️ Account Type
                  </label>
                  <select
                    {...registerForm.register('role')}
                    className="input-field"
                  >
                    <option value="citizen">🙋‍♂️ Citizen</option>
                    <option value="officer">👩‍💼 Government Officer</option>
                  </select>
                  {registerForm.formState.errors.role && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-heading mb-2">
                    🔒 Password
                  </label>
                  <input
                    {...registerForm.register('password')}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className="input-field"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-heading mb-2">
                    🔐 Confirm Password
                  </label>
                  <input
                    {...registerForm.register('confirmPassword')}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="input-field"
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="card-featured p-4 text-sm text-blue-800">
                <div className="flex items-start">
                  <span className="text-lg mr-3">🛡️</span>
                  <div>
                    <p className="font-semibold mb-1">Secure & Private</p>
                    <p>Your information is encrypted and stored securely. We follow government-grade security standards.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-success w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating your account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Create My Account</span>
                    <UserGroupIcon className="ml-3 h-5 w-5" />
                  </div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <AuthPageContent />
    </Suspense>
  );
}