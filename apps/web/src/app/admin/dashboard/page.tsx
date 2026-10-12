'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  permissions: string[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.replace('/admin/login?expired=true');
          return;
        }
        const json = await res.json();
        setUser(json.data || json);
        setLoading(false);
      } catch {
        router.replace('/admin/login?expired=true');
      }
    }

    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-300">
          <svg className="animate-spin h-5 w-5 text-emerald-500" viewBox="0 0 24 24">
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
          <span className="text-sm font-medium">Verifying Session Authorization...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Admin Header */}
      <header className="bg-slate-800 border-b border-slate-700/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="font-bold text-lg text-emerald-400">
              AIC-ADT Console
            </Link>
            <span className="text-xs bg-emerald-950 border border-emerald-600/40 text-emerald-300 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-white">{user.fullName}</div>
              <div className="text-xs text-slate-400">{user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 rounded-xl bg-slate-800/80 border border-slate-700/80">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user.fullName}
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            You are authenticated with active <strong>{user.role}</strong> authority.
            Your session grants access to {user.permissions.length} granular system permissions.
          </p>
        </div>

        {/* Content Domains Grid */}
        <h2 className="text-lg font-bold text-white mb-4">Content & Publishing Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">Startups Ecosystem</div>
            <p className="text-xs text-slate-400 mb-4">
              Manage cohort companies, innovation metrics, founder profiles, and TRL milestones.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /startups</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">Events & Workshops</div>
            <p className="text-xs text-slate-400 mb-4">
              Publish intake calls, masterclasses, registration dates, and venue coordinates.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /events</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">News & Press Releases</div>
            <p className="text-xs text-slate-400 mb-4">
              Author institutional announcements, funding sanctions, and ecosystem MoUs.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /news</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">Reports & Publications</div>
            <p className="text-xs text-slate-400 mb-4">
              Upload statutory annual reports, scientific whitepapers, and operating manuals.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /resources</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">Incubation Programs</div>
            <p className="text-xs text-slate-400 mb-4">
              Configure Pre-incubation, Incubation, SISFS, and MeitY scheme parameters.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /programs</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="text-emerald-400 font-semibold mb-1">Testing Facilities</div>
            <p className="text-xs text-slate-400 mb-4">
              Maintain Soil & Water testing lab scopes, equipment inventories, and booking notices.
            </p>
            <div className="text-xs text-slate-500 font-mono">Domain: /about/facilities</div>
          </div>
        </div>

        {/* Governance & Audit Notice */}
        <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
          <span>
            Institutional Security: Session expires automatically after 8 hours of inactivity.
          </span>
          <span className="font-mono text-emerald-400">Append-Only Audit: ACTIVE</span>
        </div>
      </main>
    </div>
  );
}
