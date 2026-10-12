'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface EventItem {
  id: string;
  slug: string;
  category: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  timeRange: string;
  venueType: string;
  organizer: string;
  currentVersion: number;
  author?: {
    fullName: string;
    email: string;
  } | null;
  translations: Array<{
    locale: string;
    title: string;
    shortDescription: string;
    venueName: string;
    status: string;
  }>;
  computedScheduleStatus?: string;
  createdAt: string;
}

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [status, setStatus] = useState('');
  const [venueType, setVenueType] = useState('');
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: '10',
          locale: 'en',
        });

        if (appliedSearch.trim()) queryParams.set('search', appliedSearch.trim());
        if (category) queryParams.set('category', category);
        if (eventStatus) queryParams.set('eventStatus', eventStatus);
        if (status) queryParams.set('status', status);
        if (venueType) queryParams.set('venueType', venueType);

        const res = await fetch(`/api/content/events?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to retrieve events from API.');
        }

        const data = await res.json();
        if (isMounted) {
          setItems(data.items || []);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 1);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error fetching events.');
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, [page, category, eventStatus, status, venueType, appliedSearch, retryTrigger]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(search);
  };

  const getWorkflowBadge = (st: string) => {
    switch (st) {
      case 'DRAFT':
        return 'bg-amber-950/60 text-amber-300 border-amber-800';
      case 'IN_REVIEW':
        return 'bg-blue-950/60 text-blue-300 border-blue-800';
      case 'APPROVED':
        return 'bg-purple-950/60 text-purple-300 border-purple-800';
      case 'PUBLISHED':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
      case 'ARCHIVED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getScheduleBadge = (sch: string) => {
    switch (sch) {
      case 'UPCOMING':
        return 'bg-emerald-900/60 text-emerald-300 border-emerald-700';
      case 'ONGOING':
        return 'bg-amber-900/60 text-amber-300 border-amber-700 animate-pulse';
      case 'COMPLETED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      case 'CANCELLED':
        return 'bg-red-950/60 text-red-400 border-red-800';
      case 'POSTPONED':
        return 'bg-orange-950/60 text-orange-400 border-orange-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Events &amp; Calendar Management
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {total} Total Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Create cohort intake calls, bootcamps, investor demo days, and workshops.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>+ Schedule Event</span>
        </Link>
      </div>

      {/* Search and Filter Toolbar */}
      <form
        onSubmit={handleFilterSubmit}
        className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        <div>
          <label htmlFor="search" className="block text-[11px] font-semibold text-slate-400 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, venue, slug..."
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="categoryFilter" className="block text-[11px] font-semibold text-slate-400 mb-1">
            Category
          </label>
          <select
            id="categoryFilter"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Categories</option>
            <option value="TECHNICAL_WORKSHOP">Technical Workshop</option>
            <option value="INTAKE_DEADLINE">Intake Deadline</option>
            <option value="FIELD_SHOWCASE">Field Showcase</option>
            <option value="ECOSYSTEM_CONCLAVE">Ecosystem Conclave</option>
            <option value="TRAINING_BOOTCAMP">Training Bootcamp</option>
          </select>
        </div>

        <div>
          <label htmlFor="scheduleFilter" className="block text-[11px] font-semibold text-slate-400 mb-1">
            Schedule State
          </label>
          <select
            id="scheduleFilter"
            value={eventStatus}
            onChange={(e) => {
              setEventStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Schedule States</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="REGISTRATION_CLOSED">Registration Closed</option>
            <option value="CONCLUDED">Concluded</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="POSTPONED">Postponed</option>
          </select>
        </div>

        <div>
          <label htmlFor="statusFilter" className="block text-[11px] font-semibold text-slate-400 mb-1">
            Workflow Status
          </label>
          <select
            id="statusFilter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Workflow Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="APPROVED">Approved</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Apply Filters
          </button>
          {(search || category || eventStatus || status || venueType) && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('');
                setEventStatus('');
                setStatus('');
                setVenueType('');
                setPage(1);
              }}
              className="py-1.5 px-3 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Main Table or State */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 animate-pulse bg-slate-900 border border-slate-800 rounded-xl">
          Loading events calendar repository...
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setRetryTrigger((c) => c + 1)}
            className="px-3 py-1 bg-red-900 text-white rounded text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white">No Upcoming or Draft Events Found</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
            The institutional calendar contains no dynamic events in the database. When workshops and intake sessions are scheduled, they will appear here.
          </p>
          <div className="mt-5">
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm"
            >
              + Schedule First Event
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-850/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Event Title &amp; Slug</th>
                  <th className="px-4 py-3">Dates &amp; Format</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Schedule</th>
                  <th className="px-4 py-3">Workflow</th>
                  <th className="px-4 py-3">Coordinator</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {items.map((item) => {
                  const tr = item.translations[0];
                  const st = tr?.status || 'DRAFT';
                  const sch = item.computedScheduleStatus || item.eventStatus;
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/admin/events/${item.id}`}
                          className="font-semibold text-white hover:text-emerald-400 transition-colors line-clamp-1"
                        >
                          {tr?.title || item.slug}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                          /{item.slug}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-slate-200 block font-mono text-[11px]">
                          {new Date(item.startDate).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.venueType.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-[11px] font-medium text-slate-300">
                          {item.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getScheduleBadge(sch)}`}>
                          {sch}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getWorkflowBadge(st)}`}>
                          {st}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-slate-300">{item.author?.fullName || item.organizer}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-2">
                        <Link
                          href={`/admin/events/${item.id}`}
                          className="text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          View
                        </Link>
                        {st === 'DRAFT' && (
                          <Link
                            href={`/admin/events/${item.id}/edit`}
                            className="text-slate-400 hover:text-white font-medium"
                          >
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                Showing page <span className="font-semibold text-white">{page}</span> of{' '}
                <span className="font-semibold text-white">{totalPages}</span>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
