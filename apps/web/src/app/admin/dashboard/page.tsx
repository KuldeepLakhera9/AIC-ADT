'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserProfile } from '@/components/admin/AdminShell';

interface ContentStatusSummary {
  draft: number;
  inReview: number;
  approved: number;
  published: number;
  archived: number;
  total: number;
}

interface RecentlyUpdatedItem {
  id: string;
  title: string;
  contentType: string;
  status: string;
  updatedAt: string;
  updatedBy?: string;
}

interface RecentlyPublishedItem {
  id: string;
  title: string;
  contentType: string;
  publishedAt: string;
  slug: string;
}

interface AttentionItem {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  link: string;
}

interface RecentAuditActivity {
  id: string;
  action: string;
  resource: string;
  userEmail: string;
  userName: string;
  timestamp: string;
}

interface DashboardOverview {
  contentStatus: ContentStatusSummary;
  pendingReviewCount: number;
  recentlyUpdated: RecentlyUpdatedItem[];
  recentlyPublished: RecentlyPublishedItem[];
  attentionItems: AttentionItem[];
  recentActivity: RecentAuditActivity[];
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        // 1. Fetch current user session
        const meRes = await fetch('/api/auth/me');
        if (!meRes.ok) {
          throw new Error('Authentication session could not be verified.');
        }
        const meData = await meRes.json();
        const currentUser: UserProfile = meData.data || meData;

        // 2. Fetch real aggregate dashboard metrics
        const overviewRes = await fetch('/api/dashboard/overview');
        if (!overviewRes.ok) {
          const errJson = await overviewRes.json().catch(() => ({}));
          throw new Error(errJson.message || 'Unable to retrieve dashboard statistics from API.');
        }
        const overviewData = await overviewRes.json();

        if (isMounted) {
          setUser(currentUser);
          setOverview(overviewData.data || overviewData);
          setError(null);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading dashboard data.');
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-20 bg-slate-900 border border-slate-800 rounded-xl" />

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-900 border border-slate-800 rounded-xl" />
          ))}
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 bg-slate-900 border border-slate-800 rounded-xl" />
          <div className="h-72 bg-slate-900 border border-slate-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/40 border border-red-800/80 rounded-xl text-red-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <h2 className="text-base font-bold text-red-100">Dashboard Metrics Unavailable</h2>
            <p className="text-xs text-red-300 mt-1 leading-relaxed">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-1.5 bg-red-900/80 hover:bg-red-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Retry Dashboard Fetch
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !overview) return null;

  const hasPermission = (perm: string) => user.permissions.includes(perm);

  return (
    <div className="space-y-6">
      {/* Welcome & Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Operational Dashboard
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-600/40 bg-emerald-950/60 text-emerald-300 font-semibold">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Institutional Content Management & Governance Console for AIC-ADT Baramati Foundation.
          </p>
        </div>

        {/* Pending Review Fast-Track */}
        {hasPermission('content.review') && (
          <div className="flex items-center gap-3">
            <Link
              href="/admin/review-queue"
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors border ${
                overview.pendingReviewCount > 0
                  ? 'bg-amber-950/60 border-amber-600/60 text-amber-300 hover:bg-amber-900/60'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Review Queue</span>
              <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700">
                {overview.pendingReviewCount}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Content Status Metric Widgets */}
      <section aria-labelledby="status-metrics-heading">
        <h2 id="status-metrics-heading" className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
          Content Inventory by Publication Status
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">Total Items</div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">
              {overview.contentStatus.total}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Across all schemas</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Draft</span>
              <span className="w-2 h-2 rounded-full bg-slate-500" />
            </div>
            <div className="text-2xl font-bold text-slate-200 mt-1 font-mono">
              {overview.contentStatus.draft}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">In active editing</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-amber-400 flex items-center justify-between">
              <span>In Review</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-1 font-mono">
              {overview.contentStatus.inReview}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Pending approval</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-blue-400 flex items-center justify-between">
              <span>Approved</span>
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mt-1 font-mono">
              {overview.contentStatus.approved}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Ready to publish</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-emerald-400 flex items-center justify-between">
              <span>Published</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-300 mt-1 font-mono">
              {overview.contentStatus.published}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Live on public portal</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
              <span>Archived</span>
              <span className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
            <div className="text-2xl font-bold text-slate-400 mt-1 font-mono">
              {overview.contentStatus.archived}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Retired records</div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Work & Attention Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recently Updated Content */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Recently Updated Content
              </h3>
              <Link href="/admin/pages" className="text-xs text-emerald-400 hover:underline">
                View all content →
              </Link>
            </div>

            {overview.recentlyUpdated.length > 0 ? (
              <div className="divide-y divide-slate-800/80">
                {overview.recentlyUpdated.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.contentType} • Updated {new Date(item.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-slate-800 border border-slate-700 text-slate-300">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-400">
                  No content edits recorded yet.
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  When articles, pages, or programs are updated, they will appear here with revision stamps.
                </p>
              </div>
            )}
          </div>

          {/* Recently Published Content */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Recently Published Content
              </h3>
              <Link href="/admin/news" className="text-xs text-emerald-400 hover:underline">
                View all releases →
              </Link>
            </div>

            {overview.recentlyPublished.length > 0 ? (
              <div className="divide-y divide-slate-800/80">
                {overview.recentlyPublished.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.contentType} • Published {new Date(item.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      /{item.slug}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-400">
                  No published records in current catalog.
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Authorized publishers can release approved news articles, events, and reports to the public site.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Actions & Audit Trail */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">
              Authorized Quick Actions
            </h3>
            <div className="space-y-2">
              {hasPermission('content.create') && (
                <Link
                  href="/admin/news"
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-slate-200">Create News Announcement</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400">→</span>
                </Link>
              )}

              {hasPermission('content.create') && (
                <Link
                  href="/admin/programs"
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-slate-200">Add Incubation Program</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400">→</span>
                </Link>
              )}

              {hasPermission('media.upload') && (
                <Link
                  href="/admin/media"
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs font-medium text-slate-200">Upload Media Assets</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-blue-400">→</span>
                </Link>
              )}

              {hasPermission('users.read') && (
                <Link
                  href="/admin/users"
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-medium text-slate-200">Manage Users & RBAC</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-purple-400">→</span>
                </Link>
              )}

              {hasPermission('audit.read') && (
                <Link
                  href="/admin/audit"
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-medium text-slate-200">Inspect Audit Logs</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-amber-400">→</span>
                </Link>
              )}
            </div>
          </div>

          {/* Audit Activity (Subject to audit.read) */}
          {hasPermission('audit.read') && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Audit Activity
                </h3>
                <Link href="/admin/audit" className="text-xs text-amber-400 hover:underline">
                  Full log →
                </Link>
              </div>

              {overview.recentActivity.length > 0 ? (
                <div className="divide-y divide-slate-800/80">
                  {overview.recentActivity.map((log) => (
                    <div key={log.id} className="py-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-200 font-mono">{log.action}</span>
                        <span className="text-slate-500">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {log.userName} • {log.resource}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-xs text-slate-400">
                    No recent audit events recorded.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Administrative actions are captured in the append-only audit trail.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
