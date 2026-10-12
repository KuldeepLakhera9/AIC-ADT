'use client';

import React from 'react';

export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Institutional Pages</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage institutional content for About, Mission, Governance, Leadership, and Infrastructure.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + New Page Section
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">No Custom Page Overrides Active</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          Standard institutional pages are currently served from the approved production registry. To create localized or dynamic overrides, use the editor action above.
        </p>
      </div>
    </div>
  );
}
