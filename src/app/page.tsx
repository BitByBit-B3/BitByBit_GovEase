'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  CalendarDaysIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'citizen') {
        router.push('/dashboard');
      } else if (user.role === 'officer') {
        router.push('/admin');
      } else if (user.role === 'admin') {
        router.push('/admin');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Glass Navigation */}
      <nav className="nav-glass fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center animate-fade-in-down">
              <div className="feature-icon mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">GovEase</span>
                <div className="gov-badge text-xs mt-1">Sri Lanka Official Portal</div>
              </div>
            </div>
            <div className="flex space-x-3 animate-fade-in-down stagger-1">
              <Link href="/auth" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/auth?mode=register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Modern Design */}
      <section className="hero-gradient hero-pattern relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block">Streamline Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Government Services
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100 leading-relaxed">
                Book appointments for government services online. Skip the lines, save time, 
                and manage your appointments efficiently with Sri Lanka's most advanced digital platform.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
              <Link href="/auth?mode=register" className="btn-primary text-lg px-8 py-4">
                Book Your First Appointment
                <CalendarDaysIcon className="ml-3 h-6 w-6" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                Explore Services
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Streamline Your</span>
              <span className="block text-blue-600">Government Services</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Book appointments for government services online. Skip the lines, save time, and manage your appointments efficiently.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/auth?mode=register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/services"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mt-32">
            <div className="text-center mb-20">
              <div className="animate-fade-in-up">
                <span className="gov-badge text-sm mb-4 inline-block">Revolutionary Features</span>
                <h2 className="text-4xl md:text-5xl font-bold text-heading mb-6">
                  Experience the Future of
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Government Services
                  </span>
                </h2>
                <p className="text-xl text-body max-w-3xl mx-auto leading-relaxed">
                  Our cutting-edge platform transforms how Sri Lankan citizens interact with government services, 
                  making bureaucracy simple, fast, and accessible.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="feature-card animate-fade-in-up stagger-1">
                <div className="feature-icon mb-6">
                  <CalendarDaysIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  Smart Appointment Booking
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Browse available services and book appointments at your convenience. Our intelligent calendar 
                  shows real-time availability and optimal time slots.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Learn more</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-card animate-fade-in-up stagger-2">
                <div className="feature-icon mb-6">
                  <DocumentTextIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  Document Pre-submission
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Upload required documents before your appointment. Get them reviewed in advance 
                  to speed up your in-person visit dramatically.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Upload now</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-card animate-fade-in-up stagger-3">
                <div className="feature-icon mb-6">
                  <ClockIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  Intelligent Notifications
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Receive timely reminders via email and SMS. Get notified about confirmations, 
                  document status, and important updates automatically.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Set preferences</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="feature-card animate-fade-in-up stagger-4">
                <div className="feature-icon mb-6">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  Multi-Department Support
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Access services from Motor Traffic, Immigration, Registrar General, 
                  and more government departments in one unified platform.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>View departments</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Feature 5 */}
              <div className="feature-card animate-fade-in-up stagger-5">
                <div className="feature-icon mb-6">
                  <ChartBarIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  Real-time Tracking
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Track your appointment status in real-time. Get instant updates on any changes 
                  or requirements from government officers.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Track status</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Feature 6 */}
              <div className="feature-card animate-fade-in-up stagger-6">
                <div className="feature-icon mb-6">
                  <BuildingOfficeIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-4">
                  QR Code Verification
                </h3>
                <p className="text-body mb-6 leading-relaxed">
                  Get unique QR codes for your appointments. Present them at the office 
                  for instant verification and streamlined processing.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Generate QR</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-32 card-featured p-12 animate-fade-in-up">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-heading mb-4">
                Trusted by Thousands of Citizens
              </h3>
              <p className="text-lg text-body">
                Join the digital revolution in government services
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-caption">Appointments Booked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
                <div className="text-caption">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
                <div className="text-caption">Government Departments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">24/7</div>
                <div className="text-caption">Online Access</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="hero-gradient py-24 mt-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of Sri Lankan citizens who are already enjoying faster, 
              more efficient government services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=register" className="btn-primary text-lg px-8 py-4">
                Create Your Account
                <UserGroupIcon className="ml-3 h-6 w-6" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                Browse Services
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="feature-icon mr-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">GovEase</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Sri Lanka's most advanced digital platform for government services. 
                Streamlining bureaucracy with modern technology and user-centric design.
              </p>
              <div className="gov-badge">
                🇱🇰 Official Government Portal
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-slate-300 hover:text-white transition-colors">Browse Services</Link></li>
                <li><Link href="/auth" className="text-slate-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/auth?mode=register" className="text-slate-300 hover:text-white transition-colors">Register</Link></li>
                <li><Link href="/admin/seed" className="text-slate-300 hover:text-white transition-colors">Sample Data</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li className="text-slate-300">📧 support@govease.lk</li>
                <li className="text-slate-300">📞 +94 11 000 0000</li>
                <li className="text-slate-300">🕐 24/7 Online Support</li>
                <li className="text-slate-300">🏢 Colombo, Sri Lanka</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                &copy; 2025 GovEase. All rights reserved. Built for Tech-Triathlon by Team BitByBit.
              </p>
              <div className="mt-4 md:mt-0 text-slate-400 text-sm">
                Made with ❤️ for Sri Lankan Citizens
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
