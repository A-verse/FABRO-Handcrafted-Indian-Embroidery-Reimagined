'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAdmin();
  const router = useRouter();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.replace('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-ivory to-ivory/50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-12">
          <h1 className="heading-display-md text-wine-red mb-2">FABRO</h1>
          <p className="body-base text-charcoal/70">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
          <h2 className="heading-md text-charcoal mb-6 text-center">Admin Login</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fabro.com"
                required
                className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all"
              />
            </div>

            <div>
              <label className="label-text block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-wine-red text-white rounded-lg font-medium hover:bg-wine-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-charcoal/60 text-center mt-6">
            Contact your administrator for access credentials.
          </p>
        </div>
      </div>
    </main>
  );
}
