'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sessionExpired = searchParams.get('expired') === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(
          json.message || 'Invalid credentials. Please verify your institutional email and password.',
        );
        setLoading(false);
        return;
      }

      // Successful login -> Navigate to admin dashboard
      const redirectTo = searchParams.get('redirect') || '/admin/dashboard';
      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrorMessage('Network error: Unable to connect to authentication server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4">
          <span className="text-emerald-400 font-bold text-2xl tracking-tight">
            AIC-ADT Baramati
          </span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Institutional Administration Console
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Secure, role-based governance and content management portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-800 py-8 px-6 shadow-xl rounded-xl border border-slate-700 sm:px-10">
          {sessionExpired && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-lg bg-amber-900/40 border border-amber-600/50 text-amber-200 text-sm flex items-start gap-3"
            >
              <span className="font-semibold text-amber-300">Notice:</span>
              Your previous administrative session has expired. Please sign in again to continue.
            </div>
          )}

          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 rounded-lg bg-rose-950/50 border border-rose-600/50 text-rose-200 text-sm flex items-start gap-3"
            >
              <span className="font-semibold text-rose-400">Error:</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-slate-200"
              >
                Institutional Email Address
              </label>
              <div className="mt-2">
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@aic-adt.org"
                  className="block w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-lg border border-slate-600 bg-slate-900/80 px-4 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Verifying Credentials...
                  </span>
                ) : (
                  'Sign In to Console'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-slate-700/80 pt-6">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Access is strictly restricted to authorized AIC-ADT Baramati Foundation
              secretariat, review committee members, and incubation managers. All access
              attempts are recorded in append-only audit logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-slate-400 text-sm">Loading Administration Console...</div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
