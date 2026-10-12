'use client';

import React from 'react';

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Media & Asset Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Store and organize high-resolution photography, logos, and verified document attachments.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Upload Media File
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">Media Library Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          No uploaded media assets are currently tracked. Upload approved high-resolution images, founder headshots, or official reports.
        </p>
      </div>
    </div>
  );
}
