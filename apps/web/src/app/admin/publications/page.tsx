'use client';

import React from 'react';

export default function AdminPublicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Reports & Publications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage statutory reports, research publications, policy briefs, and annual filings.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Upload Publication
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">No Publications Uploaded</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          Statutory annual reports and newsletters are managed here. Upload audited disclosures and reports to make them accessible on the public repository.
        </p>
      </div>
    </div>
  );
}
