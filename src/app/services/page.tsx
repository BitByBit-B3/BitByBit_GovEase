'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Department, Service } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  FunnelIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const { user } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<{ [key: string]: Service[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load departments with fallback
      let departmentsData: Department[] = [];
      
      try {
        const departmentsSnapshot = await getDocs(
          query(collection(db, 'departments'), where('isActive', '==', true))
        );
        departmentsSnapshot.forEach((doc) => {
          departmentsData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
          } as Department);
        });
      } catch (deptError) {
        console.log('Department query failed, using fallback data:', deptError);
        // Create fallback departments for demo
        departmentsData = [
          {
            id: 'demo-dept-registrar-general',
            name: 'Registrar General\'s Department',
            description: 'Birth, death, marriage certificates and legal document services',
            location: 'Demo Location',
            contactNumber: '+94112345678',
            email: 'demo@rgd.gov.lk',
            workingHours: {
              start: '08:00',
              end: '15:00',
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            services: [],
            isActive: true,
            createdAt: new Date(),
          },
          {
            id: 'demo-dept-immigration',
            name: 'Department of Immigration',
            description: 'Passport services and immigration matters',
            location: 'Demo Location',
            contactNumber: '+94112234567',
            email: 'demo@immigration.gov.lk',
            workingHours: {
              start: '08:30',
              end: '15:30',
              days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            },
            services: [],
            isActive: true,
            createdAt: new Date(),
          }
        ];
      }
      
      setDepartments(departmentsData);

      // Load services for each department with fallback
      const servicesData: { [key: string]: Service[] } = {};
      
      try {
        for (const dept of departmentsData) {
          try {
            const servicesSnapshot = await getDocs(
              query(
                collection(db, 'services'),
                where('departmentId', '==', dept.id),
                where('isActive', '==', true)
              )
            );
            const deptServices: Service[] = [];
            servicesSnapshot.forEach((doc) => {
              deptServices.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
              } as Service);
            });
            servicesData[dept.id] = deptServices;
          } catch (serviceError) {
            console.log(`Services query failed for ${dept.id}, using fallback:`, serviceError);
            // Create demo services for this department
            servicesData[dept.id] = [
              {
                id: `demo-service-${dept.id}-1`,
                name: 'Demo Service 1',
                description: `Demo service for ${dept.name}`,
                departmentId: dept.id,
                duration: 30,
                requiredDocuments: ['National Identity Card', 'Application Form'],
                fee: 1000,
                isActive: true,
                availableSlots: 20,
                createdAt: new Date(),
              },
              {
                id: `demo-service-${dept.id}-2`,
                name: 'Demo Service 2',
                description: `Another demo service for ${dept.name}`,
                departmentId: dept.id,
                duration: 45,
                requiredDocuments: ['National Identity Card', 'Passport Size Photos'],
                fee: 1500,
                isActive: true,
                availableSlots: 15,
                createdAt: new Date(),
              }
            ];
          }
        }
      } catch (error) {
        console.log('All services queries failed, creating basic fallback');
        // Create minimal fallback services if everything fails
        servicesData['demo-dept-registrar-general'] = [
          {
            id: 'demo-service-death-certificate',
            name: 'Death Certificate',
            description: 'Obtain death certificate',
            departmentId: 'demo-dept-registrar-general',
            duration: 15,
            requiredDocuments: ['Medical Certificate', 'National Identity Card'],
            fee: 100,
            isActive: true,
            availableSlots: 40,
            createdAt: new Date(),
          }
        ];
      }
      
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient hero-pattern flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-white">Loading Services...</div>
          <p className="text-blue-100 mt-2">Preparing your government service catalog</p>
        </div>
      </div>
    );
  }

  const filteredDepartments = selectedDepartment
    ? departments.filter(d => d.id === selectedDepartment)
    : departments;

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
                <div className="gov-badge text-xs mt-1">Sri Lanka Official Portal</div>
              </div>
            </Link>
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

      {/* Hero Section */}
      <section className="hero-gradient hero-pattern relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block">Government</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Service Directory
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Discover all available government services, compare options, and book appointments 
                with complete transparency and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Filter Section */}
        <div className="card-elevated p-8 mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-heading mb-2 flex items-center">
                <FunnelIcon className="h-6 w-6 mr-3 text-blue-600" />
                Filter Services
              </h2>
              <p className="text-body">
                Find the exact government service you need from our comprehensive directory.
              </p>
            </div>
            <div className="md:w-80">
              <label htmlFor="department-filter" className="block text-sm font-semibold text-heading mb-2">
                🏛️ Select Department
              </label>
              <select
                id="department-filter"
                value={selectedDepartment || ''}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
                className="input-field"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {filteredDepartments.map((department, index) => (
            <div key={department.id} className={`department-card animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start mb-4 lg:mb-0">
                    <div className="feature-icon mr-4 mt-1">
                      <BuildingOfficeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-heading mb-2">{department.name}</h2>
                      <p className="text-body mb-4 leading-relaxed">{department.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-caption">
                          <MapPinIcon className="h-4 w-4 mr-2 text-blue-600" />
                          {department.location}
                        </div>
                        <div className="flex items-center text-caption">
                          <PhoneIcon className="h-4 w-4 mr-2 text-blue-600" />
                          {department.contactNumber}
                        </div>
                        <div className="flex items-center text-caption">
                          <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-600" />
                          {department.email}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-emerald-600" />
                        <span className="text-caption">
                          {department.workingHours.start} - {department.workingHours.end} 
                          ({department.workingHours.days.join(', ')})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <div className="status-confirmed mb-2">
                      {services[department.id]?.length || 0} Services Available
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6">
                {services[department.id]?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services[department.id].map((service, serviceIndex) => (
                      <div
                        key={service.id}
                        className={`feature-card group animate-fade-in-up stagger-${Math.min(serviceIndex + 1, 6)}`}
                      >
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-heading mb-3 group-hover:text-blue-600 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-body mb-4 leading-relaxed">{service.description}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 mr-3 text-blue-600" />
                              <span className="font-semibold text-heading">Duration</span>
                            </div>
                            <span className="status-pending">{service.duration} mins</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                            <div className="flex items-center">
                              <CurrencyDollarIcon className="h-5 w-5 mr-3 text-emerald-600" />
                              <span className="font-semibold text-heading">Fee</span>
                            </div>
                            <span className="status-confirmed">LKR {service.fee.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center">
                              <DocumentTextIcon className="h-5 w-5 mr-3 text-purple-600" />
                              <span className="font-semibold text-heading">Documents</span>
                            </div>
                            <span className="status-completed">{service.requiredDocuments.length} required</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Link
                            href={user ? `/book/${service.id}` : `/auth?redirect=/book/${service.id}`}
                            className="btn-primary w-full py-3 group-hover:scale-105 transition-transform"
                          >
                            <CalendarDaysIcon className="h-5 w-5 mr-2" />
                            Book Appointment
                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                          </Link>

                          {service.requiredDocuments.length > 0 && (
                            <button
                              type="button"
                              className="btn-secondary w-full py-2 text-sm"
                              onClick={() => {
                                const modal = document.getElementById(`modal-${service.id}`);
                                if (modal) modal.classList.remove('hidden');
                              }}
                            >
                              <DocumentTextIcon className="h-4 w-4 mr-2" />
                              View Required Documents
                            </button>
                          )}
                        </div>

                        {/* Enhanced Modal for required documents */}
                        <div
                          id={`modal-${service.id}`}
                          className="hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 animate-fade-in-up"
                          onClick={(e) => {
                            if (e.target === e.currentTarget) {
                              e.currentTarget.classList.add('hidden');
                            }
                          }}
                        >
                          <div className="relative top-20 mx-auto p-6 w-full max-w-md">
                            <div className="card-elevated p-8 animate-scale-in">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-heading flex items-center">
                                  <DocumentTextIcon className="h-6 w-6 mr-3 text-blue-600" />
                                  Required Documents
                                </h3>
                                <button
                                  onClick={() => {
                                    const modal = document.getElementById(`modal-${service.id}`);
                                    if (modal) modal.classList.add('hidden');
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                                </button>
                              </div>
                              
                              <div className="mb-6">
                                <p className="text-body mb-4">
                                  For <span className="font-semibold text-heading">{service.name}</span>, please prepare the following documents:
                                </p>
                              </div>
                              
                              <ul className="space-y-3 mb-6">
                                {service.requiredDocuments.map((doc, index) => (
                                  <li key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                                    <div className="feature-icon mr-3 mt-0.5 !p-2">
                                      <DocumentTextIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-heading font-medium flex-1">{doc}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="text-center">
                                <button
                                  onClick={() => {
                                    const modal = document.getElementById(`modal-${service.id}`);
                                    if (modal) modal.classList.add('hidden');
                                  }}
                                  className="btn-primary px-8 py-3"
                                >
                                  Got it, thanks!
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="feature-icon mx-auto mb-6">
                      <UserGroupIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-heading mb-2">No Services Available</h3>
                    <p className="text-body">
                      This department currently has no active services. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {departments.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="feature-icon mx-auto mb-8">
              <BuildingOfficeIcon className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-heading mb-4">No Departments Available</h3>
            <p className="text-xl text-body mb-8 max-w-md mx-auto leading-relaxed">
              Government services will be displayed here once they are set up by administrators.
            </p>
            <Link href="/" className="btn-primary px-8 py-4">
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Return to Homepage
            </Link>
          </div>
        )}
      </main>

      {/* Call to Action Section */}
      <section className="hero-gradient py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join thousands of Sri Lankan citizens who have streamlined their government service experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=register" className="btn-primary text-lg px-8 py-4">
                Create Account & Book
                <CalendarDaysIcon className="ml-3 h-6 w-6" />
              </Link>
              <Link href="/auth" className="btn-secondary text-lg px-8 py-4">
                Sign In to Continue
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}