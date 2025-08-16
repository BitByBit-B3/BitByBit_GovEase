'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Appointment, Department, Service } from '@/types';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowRightIcon,
  QrCodeIcon,
  StarIcon,
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [departments, setDepartments] = useState<{ [key: string]: Department }>({});
  const [services, setServices] = useState<{ [key: string]: Service }>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    } else if (user && user.role !== 'citizen') {
      router.push('/admin');
    } else if (user) {
      loadUserAppointments();
    }
  }, [user, loading, router]);

  const loadUserAppointments = async () => {
    if (!user) return;

    try {
      setLoadingAppointments(true);
      
      // Load appointments
      const appointmentsQuery = query(
        collection(db, 'appointments'),
        where('userId', '==', user.id),
        orderBy('date', 'desc')
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointmentsData: Appointment[] = [];
      
      appointmentsSnapshot.forEach((doc) => {
        appointmentsData.push({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Appointment);
      });

      setAppointments(appointmentsData);

      // Load related departments and services
      const uniqueDepartmentIds = [...new Set(appointmentsData.map(a => a.departmentId))];
      const uniqueServiceIds = [...new Set(appointmentsData.map(a => a.serviceId))];

      // Load departments
      const departmentsData: { [key: string]: Department } = {};
      for (const deptId of uniqueDepartmentIds) {
        const deptQuery = query(collection(db, 'departments'), where('__name__', '==', deptId));
        const deptSnapshot = await getDocs(deptQuery);
        deptSnapshot.forEach((doc) => {
          departmentsData[doc.id] = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Department;
        });
      }
      setDepartments(departmentsData);

      // Load services
      const servicesData: { [key: string]: Service } = {};
      for (const serviceId of uniqueServiceIds) {
        const serviceQuery = query(collection(db, 'services'), where('__name__', '==', serviceId));
        const serviceSnapshot = await getDocs(serviceQuery);
        serviceSnapshot.forEach((doc) => {
          servicesData[doc.id] = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Service;
        });
      }
      setServices(servicesData);

    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-600" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'no-show':
        return <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-purple-600" />;
    }
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'no-show':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  if (loading || loadingAppointments) {
    return (
      <div className="min-h-screen hero-gradient hero-pattern flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-white">Loading Your Dashboard...</div>
          <p className="text-blue-100 mt-2">Preparing your government services overview</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingAppointments = appointments.filter(
    a => a.status === 'confirmed' && new Date(a.date) > new Date()
  );
  const pastAppointments = appointments.filter(
    a => ['completed', 'cancelled', 'no-show'].includes(a.status) || new Date(a.date) <= new Date()
  );

  return (
    <div className="min-h-screen">
      {/* Modern Navigation with User Profile */}
      <nav className="nav-glass fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center animate-fade-in-down">
              <div className="feature-icon mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">GovEase</span>
                <div className="gov-badge text-xs mt-1">Citizen Dashboard</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4 animate-fade-in-down stagger-1">
              <div className="flex items-center space-x-3">
                <div className="feature-icon !p-2">
                  <UserCircleIcon className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-heading">Welcome back,</p>
                  <p className="text-xs text-caption">{user.name}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient hero-pattern relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="block">Your Personal</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Service Dashboard
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Track your appointments, manage documents, and access all government services 
                from your personalized control center.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your government service appointments
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/services"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <PlusIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Book New Appointment</h3>
                <p className="text-sm text-gray-500">Browse available services</p>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CalendarDaysIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{upcomingAppointments.length}</h3>
                <p className="text-sm text-gray-500">Upcoming Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{appointments.length}</h3>
                <p className="text-sm text-gray-500">Total Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {getStatusIcon(appointment.status)}
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          {services[appointment.serviceId]?.name || 'Service'}
                        </h3>
                        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {departments[appointment.departmentId]?.name || 'Department'}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" />
                        {format(new Date(appointment.date), 'PPP')} at {appointment.timeSlot}
                      </div>
                      {appointment.referenceNumber && (
                        <p className="mt-1 text-sm text-gray-500">
                          Reference: {appointment.referenceNumber}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {appointment.qrCode && (
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          View QR Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Book your first appointment to get started.
              </p>
              <div className="mt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        {getStatusIcon(appointment.status)}
                        <h3 className="ml-2 font-medium text-gray-900">
                          {services[appointment.serviceId]?.name || 'Service'}
                        </h3>
                        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {departments[appointment.departmentId]?.name || 'Department'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.date), 'PPP')} at {appointment.timeSlot}
                      </p>
                    </div>
                    {appointment.status === 'completed' && (
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Leave Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {pastAppointments.length > 5 && (
                <div className="text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View all past appointments
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}