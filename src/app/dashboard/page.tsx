'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
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
import FeedbackModal from '@/components/FeedbackModal';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [departments, setDepartments] = useState<{ [key: string]: Department }>({});
  const [services, setServices] = useState<{ [key: string]: Service }>({});
  const [selectedQRAppointment, setSelectedQRAppointment] = useState<Appointment | null>(null);
  const [feedbackAppointment, setFeedbackAppointment] = useState<Appointment | null>(null);

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
        where('userId', '==', user.id)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointmentsData: Appointment[] = [];
      
      appointmentsSnapshot.forEach((doc) => {
        const docData = doc.data();
        const appointment = {
          id: doc.id,
          ...docData,
          date: docData.date?.toDate() || new Date(),
          createdAt: docData.createdAt?.toDate() || new Date(),
          updatedAt: docData.updatedAt?.toDate() || new Date(),
        } as Appointment;
        
        appointmentsData.push(appointment);
      });

      // Sort appointments by date (newest first)
      appointmentsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setAppointments(appointmentsData);

      // Load related departments and services
      const uniqueDepartmentIds = [...new Set(appointmentsData.map(a => a.departmentId))];
      const uniqueServiceIds = [...new Set(appointmentsData.map(a => a.serviceId))];

      // Load departments
      const departmentsData: { [key: string]: Department } = {};
      for (const deptId of uniqueDepartmentIds) {
        try {
          const deptDoc = await getDoc(doc(db, 'departments', deptId));
          if (deptDoc.exists()) {
            departmentsData[deptDoc.id] = {
              id: deptDoc.id,
              ...deptDoc.data(),
              createdAt: deptDoc.data().createdAt?.toDate() || new Date(),
            } as Department;
          }
        } catch (error) {
          console.error(`Error loading department ${deptId}:`, error);
        }
      }
      setDepartments(departmentsData);

      // Load services
      const servicesData: { [key: string]: Service } = {};
      for (const serviceId of uniqueServiceIds) {
        try {
          const serviceDoc = await getDoc(doc(db, 'services', serviceId));
          if (serviceDoc.exists()) {
            servicesData[serviceDoc.id] = {
              id: serviceDoc.id,
              ...serviceDoc.data(),
              createdAt: serviceDoc.data().createdAt?.toDate() || new Date(),
            } as Service;
          }
        } catch (error) {
          console.error(`Error loading service ${serviceId}:`, error);
        }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-purple-100 text-purple-800';
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
              <div className="feature-icon mr-4">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="mr-6">
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
        {/* Statistics Overview */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Total Appointments */}
            <div className="card-featured p-6 text-center animate-fade-in-up">
              <div className="feature-icon mx-auto mb-4">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{appointments.length}</div>
              <div className="text-caption">Total Appointments</div>
            </div>

            {/* Upcoming */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-1">
              <div className="feature-icon mx-auto mb-4">
                <CalendarDaysIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{upcomingAppointments.length}</div>
              <div className="text-caption">Upcoming</div>
            </div>

            {/* Completed */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-2">
              <div className="feature-icon mx-auto mb-4">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">
                {appointments.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-caption">Completed</div>
            </div>

            {/* Services Used */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-3">
              <div className="feature-icon mx-auto mb-4">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">
                {new Set(appointments.map(a => a.serviceId)).size}
              </div>
              <div className="text-caption">Services Used</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-12">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-heading mb-4">
              Quick Actions & Overview
            </h2>
            <p className="text-lg text-body max-w-2xl mx-auto">
              Access your most-used features and track your appointment statistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Book New Appointment Card */}
            <Link href="/services" className="feature-card group animate-fade-in-up stagger-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="feature-icon mr-4">
                    <PlusIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-heading mb-1">Book New Appointment</h3>
                    <p className="text-body text-sm">Browse available government services</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-blue-600 group-hover:text-blue-800 transition-colors" />
              </div>
              <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                <span>Start booking</span>
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </div>
            </Link>

            {/* Upcoming Appointments Card */}
            <div className="feature-card animate-fade-in-up stagger-2">
              <div className="flex items-center justify-between mb-4">
                <div className="feature-icon">
                  <CalendarDaysIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-heading">{upcomingAppointments.length}</div>
                  <div className="text-caption text-sm">upcoming</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-heading mb-1">Upcoming Appointments</h3>
              <p className="text-body text-sm">
                {upcomingAppointments.length > 0 
                  ? `Your next appointment is ${upcomingAppointments[0] ? format(new Date(upcomingAppointments[0].date), 'MMM dd') : 'soon'}`
                  : 'No upcoming appointments scheduled'
                }
              </p>
            </div>

            {/* Total Appointments Card */}
            <div className="feature-card animate-fade-in-up stagger-3">
              <div className="flex items-center justify-between mb-4">
                <div className="feature-icon">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-heading">{appointments.length}</div>
                  <div className="text-caption text-sm">total</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-heading mb-1">Service History</h3>
              <p className="text-body text-sm">
                {appointments.length > 0 
                  ? `${appointments.filter(a => a.status === 'completed').length} completed successfully`
                  : 'Start your government service journey'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-heading">Upcoming Appointments</h2>
              <p className="text-body mt-1">Your scheduled government service appointments</p>
            </div>
            {upcomingAppointments.length > 0 && (
              <Link href="/services" className="btn-secondary">
                <PlusIcon className="h-4 w-4 mr-2" />
                Book Another
              </Link>
            )}
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-6">
              {upcomingAppointments.map((appointment, index) => (
                <div key={appointment.id} className={`feature-card animate-fade-in-up stagger-${index + 1}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="feature-icon mr-4">
                            {getStatusIcon(appointment.status)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-heading mb-1">
                              {services[appointment.serviceId]?.name || 'Service'}
                            </h3>
                            <p className="text-body">
                              {departments[appointment.departmentId]?.name || 'Department'}
                            </p>
                          </div>
                        </div>
                        <div className={`${getStatusComponent(appointment.status)}`}>
                          {appointment.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-body">
                          <CalendarDaysIcon className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-semibold">{format(new Date(appointment.date), 'EEEE, MMMM do')}</p>
                            <p className="text-sm text-caption">at {appointment.timeSlot}</p>
                          </div>
                        </div>
                        
                        {appointment.referenceNumber && (
                          <div className="flex items-center text-body">
                            <BookmarkIcon className="h-5 w-5 text-purple-600 mr-3" />
                            <div>
                              <p className="font-semibold">Reference</p>
                              <p className="text-sm text-caption">{appointment.referenceNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          {appointment.qrCode && (
                            <button 
                              onClick={() => setSelectedQRAppointment(appointment)}
                              className="btn-secondary text-sm px-4 py-2"
                            >
                              <QrCodeIcon className="h-4 w-4 mr-2" />
                              View QR Code
                            </button>
                          )}
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                            View Details
                          </button>
                        </div>
                        <div className="text-caption text-sm">
                          {Math.ceil((new Date(appointment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days away
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 card-featured animate-fade-in-up">
              <div className="feature-icon mx-auto mb-6">
                <CalendarDaysIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-4">No upcoming appointments</h3>
              <p className="text-body text-lg mb-8 max-w-md mx-auto">
                Ready to access government services? Book your first appointment and experience 
                the convenience of digital government services.
              </p>
              <Link href="/services" className="btn-primary">
                <PlusIcon className="h-5 w-5 mr-2" />
                Book Your First Appointment
              </Link>
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-heading">Recent History</h2>
                <p className="text-body mt-1">Your completed and past appointments</p>
              </div>
              <div className="text-caption">
                {pastAppointments.length} total
              </div>
            </div>
            
            <div className="space-y-4">
              {pastAppointments.slice(0, 5).map((appointment, index) => (
                <div key={appointment.id} className={`feature-card p-6 animate-fade-in-up stagger-${index + 1}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="feature-icon mr-4 !p-3">
                        {getStatusIcon(appointment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-heading">
                            {services[appointment.serviceId]?.name || 'Service'}
                          </h3>
                          <div className={`${getStatusComponent(appointment.status)}`}>
                            {appointment.status}
                          </div>
                        </div>
                        <p className="text-body mb-1">
                          {departments[appointment.departmentId]?.name || 'Department'}
                        </p>
                        <div className="flex items-center text-caption text-sm">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          {format(new Date(appointment.date), 'PPP')} at {appointment.timeSlot}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-6">
                      {appointment.status === 'completed' && (
                        <button 
                          onClick={() => setFeedbackAppointment(appointment)}
                          className="btn-secondary text-sm px-4 py-2 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 transition-colors"
                        >
                          <StarIcon className="h-4 w-4 mr-2" />
                          Leave Feedback
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {pastAppointments.length > 5 && (
                <div className="text-center pt-6">
                  <button className="btn-secondary">
                    View All Past Appointments ({pastAppointments.length - 5} more)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* QR Code Modal */}
      {selectedQRAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 animate-fade-in-up">
            <div className="text-center">
              <div className="feature-icon mx-auto mb-6">
                <QrCodeIcon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-heading mb-2">
                Appointment QR Code
              </h3>
              <p className="text-body mb-6">
                Present this QR code at {departments[selectedQRAppointment.departmentId]?.name || 'the office'} 
                for instant verification
              </p>

              {/* QR Code Display */}
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                {selectedQRAppointment.qrCode ? (
                  <div className="flex justify-center">
                    <div dangerouslySetInnerHTML={{ __html: selectedQRAppointment.qrCode }} />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <QrCodeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">QR Code not available</p>
                  </div>
                )}
              </div>

              {/* Appointment Details */}
              <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-heading mb-3">Appointment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-caption">Service:</span>
                    <span className="text-body font-medium">
                      {services[selectedQRAppointment.serviceId]?.name || 'Service'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-caption">Date:</span>
                    <span className="text-body font-medium">
                      {format(new Date(selectedQRAppointment.date), 'PPP')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-caption">Time:</span>
                    <span className="text-body font-medium">{selectedQRAppointment.timeSlot}</span>
                  </div>
                  {selectedQRAppointment.referenceNumber && (
                    <div className="flex justify-between">
                      <span className="text-caption">Reference:</span>
                      <span className="text-body font-medium">{selectedQRAppointment.referenceNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedQRAppointment(null)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-primary flex-1"
                >
                  Print QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackAppointment && (
        <FeedbackModal
          isOpen={!!feedbackAppointment}
          onClose={() => setFeedbackAppointment(null)}
          appointmentId={feedbackAppointment.id}
          serviceName={services[feedbackAppointment.serviceId]?.name || 'Service'}
          departmentName={departments[feedbackAppointment.departmentId]?.name || 'Department'}
        />
      )}
    </div>
  );
}