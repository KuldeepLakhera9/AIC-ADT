'use client';

import React from 'react';

export default function AdminProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Incubation Programs Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Pre-Incubation, Incubation, SISFS, and MeitY TIDE 2.0 schemes.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Add Program
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">Programs Catalog Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          No dynamic incubation program overrides are currently stored in the database. Production schemes are rendered from the verified institutional registry.
        </p>
      </div>
    </div>
  );
}
