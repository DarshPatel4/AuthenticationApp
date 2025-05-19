'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SIGNUP = gql`
  mutation Signup($data: CreateUserInput!) {
    signup(data: $data) {
      _id
      username
      email
    }
  }
`;

interface SignupForm {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({ username: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [signup, { loading }] = useMutation(SIGNUP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (form.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      const { data } = await signup({
        variables: {
          data: {
            username: form.username,
            email: form.email,
            password: form.password
          }
        }
      });
      
      if (data?.signup) {
        router.push('/login');
      }
    } catch (err: any ) {
      console.error('Signup error:', err);
      // Extract the error message from the GraphQL error
      const errorMessage = err.graphQLErrors?.[0]?.message || 
                          err.networkError?.result?.errors?.[0]?.message ||
                          err.message ||
                          'An error occurred during signup';
      setError(errorMessage);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="card-container relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join us today and get started</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="animate-shake bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Choose a username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <p className="mt-1 text-xs text-gray-500">Only letters, numbers, and underscores allowed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="input-field"
                placeholder="Choose a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="btn-secondary text-sm"
            >
              Already have an account?
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}