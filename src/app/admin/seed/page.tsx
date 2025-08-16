'use client';

import { useState } from 'react';
import { seedDatabase } from '@/utils/seedData';
import { BuildingOfficeIcon, ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: any } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await seedDatabase();
      setResult(response);
    } catch (error) {
      setResult({ success: false, error });
    } finally {
      setLoading(false);
    }
  };

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
                <div className="gov-badge text-xs mt-1">Database Management</div>
              </div>
            </Link>
            <div className="flex space-x-3 animate-fade-in-down stagger-1">
              <Link href="/admin" className="btn-secondary">
                Admin Panel
              </Link>
              <Link href="/" className="btn-primary">
                Home
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                <span className="block">Database</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Seeding Portal
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up stagger-1">
              <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100 leading-relaxed">
                Initialize your GovEase platform with sample departments and services 
                for testing and demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="feature-card p-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-heading mb-2">Database Seeding Portal</h1>
              <p className="text-body text-lg">
                Initialize your GovEase platform with comprehensive sample data for testing and development.
              </p>
            </div>
            <div className="feature-icon">
              <BuildingOfficeIcon className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-featured p-6">
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 mr-3" />
                <h3 className="text-lg font-bold text-heading">What will be created:</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <BuildingOfficeIcon className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <span className="text-body font-semibold">4 Departments</span>
                    <p className="text-caption text-sm">Government offices</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <span className="text-body font-semibold">12 Services</span>
                    <p className="text-caption text-sm">Across all departments</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <ArrowRightIcon className="h-5 w-5 mr-3 text-purple-600" />
                  <div>
                    <span className="text-body font-semibold">Complete Details</span>
                    <p className="text-caption text-sm">Documents & fees included</p>
                  </div>
                </div>
              </div>
            </div>

            {result && (
              <div className={`card-featured p-6 ${
                result.success 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                {result.success ? (
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-emerald-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-emerald-800 mb-2">Database Seeded Successfully!</h3>
                      <p className="text-emerald-700">{result.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-red-800 mb-2">Seeding Failed</h3>
                      <p className="text-red-700">{result.error?.message || 'An unknown error occurred'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSeed}
                disabled={loading}
                className="btn-primary flex-1 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Seeding Database...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                    Initialize Database
                  </div>
                )}
              </button>

              <Link href="/services" className="btn-secondary flex-1 py-4 text-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 inline" />
                View Services
              </Link>

              <Link href="/admin" className="btn-secondary flex-1 py-4 text-center">
                <ArrowRightIcon className="h-5 w-5 mr-2 inline" />
                Admin Panel
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="text-2xl font-bold text-heading mb-6">Sample Data Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-featured p-6">
                <div className="flex items-center mb-4">
                  <BuildingOfficeIcon className="h-5 w-5 text-blue-600 mr-3" />
                  <h4 className="text-lg font-bold text-heading">Government Departments</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="text-body">🚗 Department of Motor Traffic</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="text-body">✈️ Department of Immigration & Emigration</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="text-body">📋 Registrar General's Department</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="text-body">💰 Department of Inland Revenue</span>
                  </div>
                </div>
              </div>

              <div className="card-featured p-6">
                <div className="flex items-center mb-4">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 mr-3" />
                  <h4 className="text-lg font-bold text-heading">Sample Services</h4>
                </div>
                <div className="space-y-2">
                  <div className="text-body">• Driving License Application</div>
                  <div className="text-body">• Passport Application</div>
                  <div className="text-body">• Birth Certificate</div>
                  <div className="text-body">• Tax Registration</div>
                  <div className="text-body">• Vehicle Registration</div>
                  <div className="text-body">• Marriage Certificate</div>
                  <div className="text-caption">• And 6 more comprehensive services...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}