'use client';

import { useState } from 'react';
import { seedDatabase } from '@/utils/seedData';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GovEase</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Seeding</h1>
          <p className="text-gray-600 mb-6">
            This page allows you to populate the database with sample departments and services 
            for testing purposes.
          </p>

          <div className="space-y-4">
            <div className="border border-yellow-200 bg-yellow-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-yellow-800">What will be created:</h3>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>4 Government Departments (Motor Traffic, Immigration, Registrar General, Inland Revenue)</li>
                <li>12 Services across all departments</li>
                <li>Complete service details including required documents and fees</li>
              </ul>
            </div>

            {result && (
              <div className={`border rounded-md p-4 ${
                result.success 
                  ? 'border-green-200 bg-green-50 text-green-800' 
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}>
                {result.success ? (
                  <div>
                    <h3 className="font-medium">Success!</h3>
                    <p className="mt-1 text-sm">{result.message}</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium">Error occurred</h3>
                    <p className="mt-1 text-sm">{result.error?.message || 'Unknown error'}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleSeed}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Seeding Database...' : 'Seed Database'}
              </button>

              <Link
                href="/services"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Services
              </Link>

              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sample Data Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Departments</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Department of Motor Traffic</li>
                  <li>• Department of Immigration & Emigration</li>
                  <li>• Registrar General's Department</li>
                  <li>• Department of Inland Revenue</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sample Services</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Driving License Application</li>
                  <li>• Passport Application</li>
                  <li>• Birth Certificate</li>
                  <li>• Tax Registration</li>
                  <li>• Vehicle Registration</li>
                  <li>• Marriage Certificate</li>
                  <li>• And 6 more services...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}