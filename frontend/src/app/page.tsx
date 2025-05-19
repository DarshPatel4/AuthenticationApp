'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center space-y-8">
        <div className="card-container backdrop-filter backdrop-blur-sm bg-white/70">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 animate-fade-in">
              Welcome to User Auth App
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-700 font-light max-w-2xl mx-auto">
              {isAuthenticated 
                ? "You're logged in! Experience secure and seamless account management."
                : "Secure authentication solution with a modern user interface."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="btn-primary group flex items-center"
                >
                  View Profile
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-primary group flex items-center">
                    Get Started
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link href="/signup" className="btn-secondary group flex items-center">
                    Create Account
                    <svg className="w-5 h-5 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: "✨",
                title: "Easy to Use",
                description: "Simple and intuitive interface for seamless user experience"
              },
              {
                icon: "⚡",
                title: "Fast & Responsive",
                description: "Optimized performance across all devices"
              },
              {
                icon: "🎨",
                title: "Modern Design",
                description: "Clean and intuitive user interface"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <footer className="mt-12 text-gray-500 flex flex-col items-center space-y-2">
          <p className="text-sm">© {new Date().getFullYear()} User Auth App</p>
          <div className="flex space-x-4 text-xs">
            {/* <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a> */}
          </div>
        </footer>
      </div>
    </main>
  );
}
