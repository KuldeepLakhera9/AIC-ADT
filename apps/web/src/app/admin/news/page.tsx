'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  slug: string;
  category: string;
  publishDate: string;
  sourceAttribution: string;
  currentVersion: number;
  author?: {
    fullName: string;
    email: string;
  } | null;
  translations: Array<{
    locale: string;
    headline: string;
    summary: string;
    status: string;
  }>;
  createdAt: string;
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      try {
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: '10',
          locale: 'en',
        });

        if (search.trim()) queryParams.set('search', search.trim());
        if (category) queryParams.set('category', category);
        if (status) queryParams.set('status', status);

        const res = await fetch(`/api/content/news?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to retrieve news items from API.');
        }

        const data = await res.json();
        if (isMounted) {
          setItems(data.items || []);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 1);
          setLoading(false);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error loading news.');
          setLoading(false);
        }
      }
    }

    void loadNews();

    return () => {
      isMounted = false;
    };
  }, [page, search, category, status, reloadTrigger]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setReloadTrigger((c) => c + 1);
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'PUBLISHED':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40';
      case 'IN_REVIEW':
        return 'bg-amber-950/80 text-amber-300 border-amber-600/40';
      case 'APPROVED':
        return 'bg-blue-950/80 text-blue-300 border-blue-600/40';
      case 'ARCHIVED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight">
              News & Announcements Management
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {total} Total Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Author institutional press releases, funding sanctions, and ecosystem announcements.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>+ Draft News Article</span>
        </Link>
      </div>

      {/* Search and Filter Toolbar */}
      <form
        onSubmit={handleFilterSubmit}
        className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
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
            placeholder="Search headline or slug..."
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
            <option value="OFFICIAL_ANNOUNCEMENT">Official Announcement</option>
            <option value="FUNDING_MILESTONE">Funding Milestone</option>
            <option value="INFRASTRUCTURE">Infrastructure</option>
            <option value="ECOSYSTEM_PARTNERSHIP">Ecosystem Partnership</option>
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
            <option value="">All Statuses</option>
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
          {(search || category || status) && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('');
                setStatus('');
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
          Loading content repository...
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setReloadTrigger((c) => c + 1)}
            className="px-3 py-1 bg-red-900 text-white rounded text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white">No News Articles Found</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
            {search || category || status
              ? 'No announcements match the selected filter criteria. Try adjusting your search query or status filter.'
              : 'The news catalog is currently empty. Create your first draft announcement to get started.'}
          </p>
          <div className="mt-5">
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-sm"
            >
              + Draft First News Article
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-850/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Headline & Slug</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {items.map((item) => {
                  const tr = item.translations[0];
                  const st = tr?.status || 'DRAFT';
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/admin/news/${item.id}`}
                          className="font-semibold text-white hover:text-emerald-400 transition-colors line-clamp-1"
                        >
                          {tr?.headline || item.slug}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                          /{item.slug}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-[11px] font-medium text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getStatusBadge(st)}`}>
                          {st}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-slate-300">{item.author?.fullName || 'System Author'}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-slate-400 text-[11px]">
                        {new Date(item.publishDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-2">
                        <Link
                          href={`/admin/news/${item.id}`}
                          className="text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          View
                        </Link>
                        {st === 'DRAFT' && (
                          <Link
                            href={`/admin/news/${item.id}/edit`}
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
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                Page <span className="font-semibold text-white">{page}</span> of{' '}
                <span className="font-semibold text-white">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
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
