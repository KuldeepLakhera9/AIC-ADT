'use client';

import React from 'react';

export default function AdminStartupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Startup Portfolio Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain incubatee records, cohort years, sectors, founders, and TRL milestones.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Add Incubatee Startup
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">Startup Portfolio Catalog Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          No dynamic startup entities exist in the database. Dynamic CRUD and cohort import tools will be enabled in Phase 5 Task 5.
        </p>
      </div>
    </div>
  );
}
