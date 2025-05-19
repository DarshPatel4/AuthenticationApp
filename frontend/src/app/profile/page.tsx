'use client';

import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ME = gql`
  query Me($token: String!) {
    me(token: $token) {
      _id
      username
      email
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      router.push('/login');
    } else {
      setToken(t);
    }
  }, [router]);

  const { data, loading, error } = useQuery(ME, {
    variables: { token },
    skip: !token,
  });

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="card-container flex flex-col items-center">
          <div className="loading-spinner" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="card-container">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-red-800">Error Loading Profile</h3>
            <p className="mt-2 text-sm text-red-600">{error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="card-container relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
            {data?.me?.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {data?.me?.username}
          </h2>
          <p className="text-gray-600 mt-2">Your Profile Information</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm text-gray-500 mb-1">Email</div>
            <div className="text-gray-900 font-medium break-all">{data?.me?.email}</div>
          </div>

          <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-sm text-gray-500 mb-1">User ID</div>
            <div className="text-gray-900 font-medium break-all">{data?.me?._id}</div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push('/')}
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}