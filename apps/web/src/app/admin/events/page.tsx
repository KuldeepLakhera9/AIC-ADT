'use client';

import React from 'react';

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Events & Calendar Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create cohort intake calls, bootcamps, investor demo days, and workshops.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Schedule Event
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">No Upcoming or Draft Events Found</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          The institutional calendar contains no dynamic events in the database. When workshops and intake sessions are scheduled, they will appear here.
        </p>
      </div>
    </div>
  );
}
