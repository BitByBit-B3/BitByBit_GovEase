'use client';

import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export default function LoadingScreen({ 
  message = "Loading your dashboard...", 
  showLogo = true 
}: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-30 animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-200 rounded-full opacity-25 animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>

      {/* Main Loading Container */}
      <div className="text-center z-10 space-y-8 animate-fade-in-up">
        
        {/* Logo and Branding */}
        {showLogo && (
          <div className="flex items-center justify-center space-x-3 animate-fade-in-down">
            <div className="feature-icon animate-pulse">
              <BuildingOfficeIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800 tracking-tight">GovEase</h1>
              <div className="gov-badge text-xs mt-1 animate-pulse">Sri Lanka Official Portal</div>
            </div>
          </div>
        )}

        {/* Animated Loading Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-2 border-2 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-transparent border-t-indigo-400 rounded-full animate-spin" 
                 style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-700 animate-fade-in-up stagger-1">
            {message}
          </h2>
          <div className="flex items-center justify-center space-x-1 animate-fade-in-up stagger-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-64 mx-auto animate-fade-in-up stagger-3">
          <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full animate-pulse"
                 style={{ 
                   width: '100%',
                   animation: 'loading-progress 2s ease-in-out infinite'
                 }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-2 animate-pulse">
            Securing your connection...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}