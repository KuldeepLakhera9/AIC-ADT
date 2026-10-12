'use client';

import React from 'react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Users & Role-Based Access Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage administrative personnel, assign roles, and audit identity status.
          </p>
        </div>
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
        >
          + Invite Administrator
        </button>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">Identity Directory Active</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          The institutional user directory is managed under strict governance. Contact the Super Administrator to issue credential provisions or modify administrative role privileges.
        </p>
      </div>
    </div>
  );
}
