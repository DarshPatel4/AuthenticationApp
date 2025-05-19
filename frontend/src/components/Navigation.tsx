'use client'; 

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16"> 
          <div className="flex items-center"> 
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition duration-300">
              UserAuth
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {token ? (
              <>
                <Link href="/profile" className="btn-secondary">Profile</Link>
                <button onClick={handleLogout} className="btn-primary">Logout</button>
              </>
            ) : (
              <> 
                <Link href="/login" className="btn-secondary">Login</Link>
                <Link href="/signup" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {token ? (
            <>
              <Link href="/profile" className="block btn-secondary mb-2 text-center">Profile</Link>
              <button onClick={handleLogout} className="block w-full btn-primary text-center">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block btn-secondary mb-2 text-center">Login</Link>
              <Link href="/signup" className="block btn-primary text-center">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}