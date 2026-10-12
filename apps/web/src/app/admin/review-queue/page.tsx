'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminReviewQueuePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Editorial Review Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate, approve, or request changes on submitted drafts before publication.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/dashboard"
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
        <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-white">Review Queue is Clear</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
          There are currently no items pending editorial review. When editors submit draft articles, programs, or events, they will appear here with diff views and review action controls.
        </p>
      </div>
    </div>
  );
}
