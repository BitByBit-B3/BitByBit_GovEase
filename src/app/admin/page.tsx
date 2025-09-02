'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Appointment, Department, Service, User } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  BuildingOfficeIcon,
  CalendarDaysIcon,
  UsersIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import RoleManagement from '@/components/RoleManagement';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [departments, setDepartments] = useState<{ [key: string]: Department }>({});
  const [services, setServices] = useState<{ [key: string]: Service }>({});
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [loadingData, setLoadingData] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'appointments' | 'roles'>('appointments');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    } else if (user && !['officer', 'admin'].includes(user.role)) {
      router.push('/dashboard');
    } else if (user) {
      loadAdminData();
    }
  }, [user, loading, router]);

  const loadAdminData = async () => {
    if (!user) return;

    try {
      setLoadingData(true);

      // Load appointments based on user role
      let appointmentsQuery;
      if (user.role === 'admin') {
        // Admins see all appointments
        appointmentsQuery = query(collection(db, 'appointments'));
      } else if (user.role === 'officer' && user.departmentId) {
        // Officers see only their department's appointments
        appointmentsQuery = query(
          collection(db, 'appointments'),
          where('departmentId', '==', user.departmentId)
        );
      } else {
        // No access for other roles
        setAppointments([]);
        setLoadingData(false);
        return;
      }

      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointmentsData: Appointment[] = [];
      const userIds = new Set<string>();
      const serviceIds = new Set<string>();
      const departmentIds = new Set<string>();

      appointmentsSnapshot.forEach((doc) => {
        const appointmentData = {
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Appointment;
        
        appointmentsData.push(appointmentData);
        userIds.add(appointmentData.userId);
        serviceIds.add(appointmentData.serviceId);
        departmentIds.add(appointmentData.departmentId);
      });

      // Sort appointments by date (newest first)
      appointmentsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setAppointments(appointmentsData);

      // Load related data
      await Promise.all([
        loadUsers(Array.from(userIds)),
        loadServices(Array.from(serviceIds)),
        loadDepartments(Array.from(departmentIds))
      ]);

    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Error loading data');
    } finally {
      setLoadingData(false);
    }
  };

  const loadUsers = async (userIds: string[]) => {
    const usersData: { [key: string]: User } = {};
    for (const userId of userIds) {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          usersData[userDoc.id] = {
            id: userDoc.id,
            ...userDoc.data(),
            createdAt: userDoc.data().createdAt?.toDate() || new Date(),
            updatedAt: userDoc.data().updatedAt?.toDate() || new Date(),
          } as User;
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    setUsers(usersData);
  };

  const loadServices = async (serviceIds: string[]) => {
    const servicesData: { [key: string]: Service } = {};
    for (const serviceId of serviceIds) {
      try {
        const serviceDoc = await getDoc(doc(db, 'services', serviceId));
        if (serviceDoc.exists()) {
          servicesData[serviceDoc.id] = {
            id: serviceDoc.id,
            ...serviceDoc.data(),
            createdAt: serviceDoc.data()?.createdAt?.toDate() || new Date(),
          } as Service;
        }
      } catch (error) {
        console.error('Error loading service:', error);
      }
    }
    setServices(servicesData);
  };

  const loadDepartments = async (departmentIds: string[]) => {
    const departmentsData: { [key: string]: Department } = {};
    for (const departmentId of departmentIds) {
      try {
        const deptDoc = await getDoc(doc(db, 'departments', departmentId));
        if (deptDoc.exists()) {
          departmentsData[deptDoc.id] = {
            id: deptDoc.id,
            ...deptDoc.data(),
            createdAt: deptDoc.data()?.createdAt?.toDate() || new Date(),
          } as Department;
        }
      } catch (error) {
        console.error('Error loading department:', error);
      }
    }
    setDepartments(departmentsData);
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status,
        updatedAt: new Date(),
      });

      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: status as any, updatedAt: new Date() }
            : apt
        )
      );

      toast.success(`Appointment ${status}`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Error updating appointment');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked':
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'checked_in':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'no_show':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'booked':
      case 'confirmed':
        return 'status-confirmed';
      case 'checked_in':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'no_show':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen hero-gradient hero-pattern flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-white">Loading Admin Dashboard...</div>
          <p className="text-blue-100 mt-2">Preparing appointment management interface</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedStatus !== 'all' && appointment.status !== selectedStatus) {
      return false;
    }
    if (selectedDate && format(new Date(appointment.date), 'yyyy-MM-dd') !== selectedDate) {
      return false;
    }
    return true;
  });

  const todayAppointments = appointments.filter(
    apt => format(new Date(apt.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const pendingAppointments = appointments.filter(apt => apt.status === 'booked' || apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed' || apt.status === 'checked_in');

  return (
    <div className="min-h-screen">
      {/* Modern Glass Navigation */}
      <nav className="nav-glass fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center animate-fade-in-down">
              <div className="feature-icon mr-3">
                <BuildingOfficeIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">GovEase</span>
                <div className="gov-badge text-xs mt-1">
                  {user.role === 'admin' ? 'Admin Panel' : 'Officer Panel'}
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4 animate-fade-in-down stagger-1">
              <Link href="/admin/analytics" className="btn-secondary text-sm px-4 py-2">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Analytics
              </Link>
              <Link href="/admin/seed" className="btn-secondary text-sm px-4 py-2">
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                Seed Data
              </Link>
              <div className="flex items-center space-x-3">
                <div className="feature-icon !p-2">
                  <UsersIcon className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-heading">{user.role === 'admin' ? 'System Admin' : 'Department Officer'}</p>
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
                <span className="block">{user.role === 'admin' ? 'System Administration' : 'Officer Dashboard'}</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Control Center
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Efficiently manage citizen appointments, track service delivery, and maintain 
                government service quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* Statistics Overview */}
        <div className="mb-12">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-heading mb-4">
              Management Overview
            </h2>
            <p className="text-lg text-body max-w-2xl mx-auto">
              Real-time statistics and key performance indicators for government service delivery
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Today's Appointments */}
            <div className="card-featured p-6 text-center animate-fade-in-up">
              <div className="feature-icon mx-auto mb-4">
                <CalendarDaysIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{todayAppointments.length}</div>
              <div className="text-caption">Today's Appointments</div>
              <div className="mt-3 text-blue-600 text-sm font-semibold">
                {todayAppointments.length > 0 ? 'Active day' : 'Light schedule'}
              </div>
            </div>

            {/* Pending Approval */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-1">
              <div className="feature-icon mx-auto mb-4">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{pendingAppointments.length}</div>
              <div className="text-caption">Pending Approval</div>
              <div className="mt-3 text-amber-600 text-sm font-semibold">
                {pendingAppointments.length > 0 ? 'Needs attention' : 'All clear'}
              </div>
            </div>

            {/* Confirmed */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-2">
              <div className="feature-icon mx-auto mb-4">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{confirmedAppointments.length}</div>
              <div className="text-caption">Confirmed</div>
              <div className="mt-3 text-emerald-600 text-sm font-semibold">
                Ready to serve
              </div>
            </div>

            {/* Total Appointments */}
            <div className="card-featured p-6 text-center animate-fade-in-up stagger-3">
              <div className="feature-icon mx-auto mb-4">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-heading mb-2">{appointments.length}</div>
              <div className="text-caption">Total Appointments</div>
              <div className="mt-3 text-purple-600 text-sm font-semibold">
                System activity
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        {user.role === 'admin' && (
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'appointments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Appointments Management
                </button>
                <button
                  onClick={() => setActiveTab('roles')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'roles'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  User Role Management
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Role Management Tab */}
        {user.role === 'admin' && activeTab === 'roles' && (
          <div className="feature-card p-6">
            <RoleManagement />
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <>
            {/* Filters Section */}
        <div className="feature-card p-6 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-heading">Filter Appointments</h3>
              <p className="text-body mt-1">Refine your view to focus on specific appointments</p>
            </div>
            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-heading mb-2">Status Filter</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-heading mb-2">Date Filter</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field w-full"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedDate('');
                }}
                className="btn-secondary"
              >
                Clear All Filters
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-caption text-sm">
            <span>Showing {filteredAppointments.length} of {appointments.length} appointments</span>
          </div>
        </div>

        {/* Appointments Management */}
        <div className="feature-card overflow-hidden animate-fade-in-up">
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-heading">
                  Appointment Management
                </h2>
                <p className="text-body mt-1">
                  {filteredAppointments.length} appointments found
                </p>
              </div>
              <div className="feature-icon">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Citizen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {users[appointment.userId]?.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {users[appointment.userId]?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {services[appointment.serviceId]?.name || 'Unknown Service'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {departments[appointment.departmentId]?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(appointment.date), 'PPP')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.timeSlot}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`${getStatusComponent(appointment.status)}`}>
                          {appointment.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.referenceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-wrap gap-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                className="btn-success text-xs px-3 py-1"
                              >
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Confirm
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                className="bg-red-100 text-red-700 hover:bg-red-200 text-xs px-3 py-1 rounded-lg font-semibold transition-colors"
                              >
                                <XCircleIcon className="h-3 w-3 mr-1 inline" />
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="btn-primary text-xs px-3 py-1"
                              >
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Complete
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'no-show')}
                                className="bg-amber-100 text-amber-700 hover:bg-amber-200 text-xs px-3 py-1 rounded-lg font-semibold transition-colors"
                              >
                                <ExclamationTriangleIcon className="h-3 w-3 mr-1 inline" />
                                No Show
                              </button>
                            </>
                          )}
                          <button className="btn-secondary text-xs px-3 py-1">
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="feature-icon mx-auto mb-6">
                <CalendarDaysIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-heading mb-4">No appointments found</h3>
              <p className="text-body text-lg mb-6 max-w-md mx-auto">
                {selectedStatus === 'all' && !selectedDate 
                  ? 'Appointments will appear here once citizens start booking services.'
                  : 'No appointments match your current filters. Try adjusting your search criteria.'
                }
              </p>
              {(selectedStatus !== 'all' || selectedDate) && (
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setSelectedDate('');
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
          </>
        )}
      </main>
    </div>
  );
}