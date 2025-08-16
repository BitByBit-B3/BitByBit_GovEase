'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
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

      // Load appointments
      let appointmentsQuery;
      if (user.role === 'admin') {
        appointmentsQuery = query(
          collection(db, 'appointments'),
          orderBy('date', 'desc')
        );
      } else {
        // Officers see appointments for their department only
        appointmentsQuery = query(
          collection(db, 'appointments'),
          orderBy('date', 'desc')
        );
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
        const userQuery = query(collection(db, 'users'), where('__name__', '==', userId));
        const userSnapshot = await getDocs(userQuery);
        userSnapshot.forEach((doc) => {
          usersData[doc.id] = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          } as User;
        });
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
        const serviceQuery = query(collection(db, 'services'), where('__name__', '==', serviceId));
        const serviceSnapshot = await getDocs(serviceQuery);
        serviceSnapshot.forEach((doc) => {
          servicesData[doc.id] = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Service;
        });
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
        const deptQuery = query(collection(db, 'departments'), where('__name__', '==', departmentId));
        const deptSnapshot = await getDocs(deptQuery);
        deptSnapshot.forEach((doc) => {
          departmentsData[doc.id] = {
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Department;
        });
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
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'no-show':
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

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
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

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GovEase</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/admin/seed" className="text-sm text-gray-700 hover:text-gray-900">
                Seed Data
              </Link>
              <span className="text-sm text-gray-700">
                {user.role === 'admin' ? 'Admin' : 'Officer'}: {user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {user.role === 'admin' ? 'Admin Dashboard' : 'Officer Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage appointments and government services
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{todayAppointments.length}</h3>
                <p className="text-sm text-gray-500">Today's Appointments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{pendingAppointments.length}</h3>
                <p className="text-sm text-gray-500">Pending Approval</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{confirmedAppointments.length}</h3>
                <p className="text-sm text-gray-500">Confirmed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{appointments.length}</h3>
                <p className="text-sm text-gray-500">Total Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedDate('');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Appointments ({filteredAppointments.length})
            </h2>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.referenceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'no-show')}
                                className="text-orange-600 hover:text-orange-900"
                              >
                                No Show
                              </button>
                            </>
                          )}
                          <button className="text-indigo-600 hover:text-indigo-900">
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
            <div className="text-center py-12">
              <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Appointments will appear here once citizens start booking.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}