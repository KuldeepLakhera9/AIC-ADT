'use client';

import React from 'react';

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Security & Governance Audit Trail</h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of administrative operations, logins, status changes, and publications.
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400">
          Storage: PostgreSQL Append-Only
        </span>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-base font-bold text-white">Audit Trail Initialized</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          The PostgreSQL audit log tracks administrative mutations, authentication attempts, and publication transitions. As operations occur, records are appended permanently.
        </p>
      </div>
    </div>
  );
}
