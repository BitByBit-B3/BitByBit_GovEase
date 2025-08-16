'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Appointment, Department, Service, User } from '@/types';
import Link from 'next/link';
import { format, subDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { 
  BuildingOfficeIcon,
  ChartBarIcon,
  UsersIcon,
  CalendarDaysIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

export default function AnalyticsDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [departments, setDepartments] = useState<{ [key: string]: Department }>({});
  const [services, setServices] = useState<{ [key: string]: Service }>({});
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dateRange, setDateRange] = useState(30); // days

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    } else if (user && !['officer', 'admin'].includes(user.role)) {
      router.push('/dashboard');
    } else if (user) {
      loadAnalyticsData();
    }
  }, [user, loading, router, dateRange]);

  const loadAnalyticsData = async () => {
    if (!user) return;

    try {
      setLoadingData(true);

      // Load appointments
      const appointmentsSnapshot = await getDocs(
        query(collection(db, 'appointments'), orderBy('date', 'desc'))
      );
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

      // Load departments
      const departmentsSnapshot = await getDocs(collection(db, 'departments'));
      const departmentsData: { [key: string]: Department } = {};
      departmentsSnapshot.forEach((doc) => {
        departmentsData[doc.id] = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Department;
      });
      setDepartments(departmentsData);

      // Load services
      const servicesSnapshot = await getDocs(collection(db, 'services'));
      const servicesData: { [key: string]: Service } = {};
      servicesSnapshot.forEach((doc) => {
        servicesData[doc.id] = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Service;
      });
      setServices(servicesData);

      // Load feedback
      const feedbackSnapshot = await getDocs(collection(db, 'feedback'));
      const feedbackData: any[] = [];
      feedbackSnapshot.forEach((doc) => {
        feedbackData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        });
      });
      setFeedback(feedbackData);

    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen hero-gradient hero-pattern flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-white">Loading Analytics...</div>
          <p className="text-blue-100 mt-2">Preparing performance insights</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Filter data by date range
  const cutoffDate = subDays(new Date(), dateRange);
  const filteredAppointments = appointments.filter(apt => 
    apt.date >= cutoffDate
  );

  // Calculate metrics
  const totalAppointments = filteredAppointments.length;
  const completedAppointments = filteredAppointments.filter(a => a.status === 'completed').length;
  const noShowRate = (filteredAppointments.filter(a => a.status === 'no-show').length / totalAppointments * 100) || 0;
  const averageRating = feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length) : 0;

  // Peak hours analysis
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const count = filteredAppointments.filter(apt => {
      const appointmentHour = parseInt(apt.timeSlot.split(':')[0]);
      return appointmentHour === hour;
    }).length;
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      appointments: count
    };
  }).filter(data => data.appointments > 0);

  // Department load analysis
  const departmentData = Object.values(departments).map(dept => ({
    name: dept.name.length > 15 ? dept.name.substring(0, 15) + '...' : dept.name,
    fullName: dept.name,
    appointments: filteredAppointments.filter(apt => apt.departmentId === dept.id).length,
    completed: filteredAppointments.filter(apt => apt.departmentId === dept.id && apt.status === 'completed').length,
  })).filter(data => data.appointments > 0);

  // Status distribution
  const statusData = [
    { name: 'Completed', value: filteredAppointments.filter(a => a.status === 'completed').length, color: '#16a34a' },
    { name: 'Confirmed', value: filteredAppointments.filter(a => a.status === 'confirmed').length, color: '#3b82f6' },
    { name: 'Pending', value: filteredAppointments.filter(a => a.status === 'pending').length, color: '#f59e0b' },
    { name: 'Cancelled', value: filteredAppointments.filter(a => a.status === 'cancelled').length, color: '#ef4444' },
    { name: 'No Show', value: filteredAppointments.filter(a => a.status === 'no-show').length, color: '#f97316' },
  ].filter(data => data.value > 0);

  // Daily appointments trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayAppointments = filteredAppointments.filter(apt => 
      isWithinInterval(apt.date, { start: startOfDay(date), end: endOfDay(date) })
    );
    return {
      date: format(date, 'MMM dd'),
      appointments: dayAppointments.length,
      completed: dayAppointments.filter(a => a.status === 'completed').length,
    };
  }).reverse();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav-glass fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/admin" className="flex items-center animate-fade-in-down">
              <ArrowLeftIcon className="h-5 w-5 text-white mr-3" />
              <div className="feature-icon mr-3">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-heading">Analytics Dashboard</span>
                <div className="gov-badge text-xs mt-1">Performance Insights</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="input-field text-sm"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              <button onClick={logout} className="btn-secondary px-4 py-2 text-sm">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient hero-pattern relative pt-20 pb-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Performance Analytics
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Data-driven insights for optimizing government service delivery
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card-featured p-6 text-center">
            <div className="feature-icon mx-auto mb-4">
              <CalendarDaysIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-heading mb-2">{totalAppointments}</div>
            <div className="text-caption">Total Appointments</div>
            <div className="text-xs text-blue-600 mt-2">Last {dateRange} days</div>
          </div>

          <div className="card-featured p-6 text-center">
            <div className="feature-icon mx-auto mb-4">
              <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-heading mb-2">
              {Math.round((completedAppointments / totalAppointments * 100) || 0)}%
            </div>
            <div className="text-caption">Completion Rate</div>
            <div className="text-xs text-emerald-600 mt-2">{completedAppointments} completed</div>
          </div>

          <div className="card-featured p-6 text-center">
            <div className="feature-icon mx-auto mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-heading mb-2">{Math.round(noShowRate)}%</div>
            <div className="text-caption">No-Show Rate</div>
            <div className="text-xs text-amber-600 mt-2">Needs attention</div>
          </div>

          <div className="card-featured p-6 text-center">
            <div className="feature-icon mx-auto mb-4">
              <StarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-heading mb-2">{averageRating.toFixed(1)}</div>
            <div className="text-caption">Average Rating</div>
            <div className="text-xs text-purple-600 mt-2">{feedback.length} reviews</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Peak Booking Hours */}
          <div className="feature-card p-6">
            <h3 className="text-xl font-bold text-heading mb-6">Peak Booking Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="feature-card p-6">
            <h3 className="text-xl font-bold text-heading mb-6">Appointment Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Load and Daily Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Department Load */}
          <div className="feature-card p-6">
            <h3 className="text-xl font-bold text-heading mb-6">Department Workload</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  labelFormatter={(label) => {
                    const dept = departmentData.find(d => d.name === label);
                    return dept?.fullName || label;
                  }}
                />
                <Bar dataKey="appointments" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Trend */}
          <div className="feature-card p-6">
            <h3 className="text-xl font-bold text-heading mb-6">7-Day Appointment Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Total"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="feature-card p-8">
          <h3 className="text-2xl font-bold text-heading mb-6">Optimization Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noShowRate > 10 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="font-semibold text-amber-800">High No-Show Rate</h4>
                </div>
                <p className="text-amber-700 text-sm">
                  Consider implementing reminder notifications or booking confirmations to reduce no-shows.
                </p>
              </div>
            )}

            {hourlyData.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Peak Hours Identified</h4>
                </div>
                <p className="text-blue-700 text-sm">
                  Most bookings occur at {hourlyData.sort((a, b) => b.appointments - a.appointments)[0]?.hour}. 
                  Consider staffing adjustments during peak times.
                </p>
              </div>
            )}

            {averageRating < 4 && feedback.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-800">Service Quality Alert</h4>
                </div>
                <p className="text-red-700 text-sm">
                  Average rating is below 4.0. Review recent feedback to identify improvement areas.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}