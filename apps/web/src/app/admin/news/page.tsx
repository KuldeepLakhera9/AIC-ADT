'use client';

import React from 'react';

export default function AdminNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">News & Announcements Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Author institutional press releases, funding sanctions, and ecosystem announcements.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Draft News Article
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">No News Drafts or Articles Found</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          The database currently contains no dynamic news articles. Use the &quot;Draft News Article&quot; action to author new announcements.
        </p>
      </div>
    </div>
  );
}
