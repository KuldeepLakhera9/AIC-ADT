'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export interface AuditLogItem {
  id: string;
  userId: string | null;
  userEmail?: string;
  userName?: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export default function AuditTrailViewer() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  // Filters
  const [actionFilter, setActionFilter] = useState('');
  const [search, setSearch] = useState('');
  const [inspectLog, setInspectLog] = useState<AuditLogItem | null>(null);

  const triggerRefresh = useCallback(() => {
    setLoading(true);
    setRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadLogs() {
      try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', '25');
        if (actionFilter) params.append('action', actionFilter);
        if (search) params.append('search', search);

        const res = await fetch(`/api/workflow/audit-logs?${params.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to retrieve immutable audit logs.');
        }
        const json = await res.json();
        if (active) {
          setLogs(json.data || []);
          setTotal(json.total || 0);
          setError(null);
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Error fetching audit logs');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadLogs();

    return () => {
      active = false;
    };
  }, [page, actionFilter, search, refreshIndex]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Security & Editorial Audit Trail
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-mono">
              Append-Only • WORM Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of editorial approvals, publication transitions, media mutations, and administrative logins.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/review-queue"
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            ← Review Queue
          </Link>
          <button
            onClick={() => triggerRefresh()}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
          >
            {loading ? 'Refreshing...' : '↻ Refresh Log'}
          </button>
        </div>
      </div>

      {/* Governance & Retention Policy Card */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-semibold text-white">Institutional Retention & Non-Repudiation Policy</span>
          <p className="text-slate-400 text-[11px]">
            In compliance with AIM (NITI Aayog) and host institution regulations, all security, access, and editorial mutation events are permanently recorded with actor identity, timestamp, and metadata. Audit logs are non-editable and non-deletable through CMS interfaces.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 whitespace-nowrap bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Retention: 7 Years</span>
          <span>•</span>
          <span>Access: Read-Only</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Action Types</option>
            <option value="WORKFLOW_SUBMIT_REVIEW">WORKFLOW_SUBMIT_REVIEW</option>
            <option value="WORKFLOW_REQUEST_CHANGES">WORKFLOW_REQUEST_CHANGES</option>
            <option value="WORKFLOW_APPROVE">WORKFLOW_APPROVE</option>
            <option value="WORKFLOW_APPROVE_ADMIN_OVERRIDE">WORKFLOW_APPROVE_ADMIN_OVERRIDE</option>
            <option value="WORKFLOW_PUBLISH">WORKFLOW_PUBLISH</option>
            <option value="WORKFLOW_BRANCH_REVISION">WORKFLOW_BRANCH_REVISION</option>
            <option value="WORKFLOW_ROLLBACK">WORKFLOW_ROLLBACK</option>
            <option value="MEDIA_UPLOAD">MEDIA_UPLOAD</option>
            <option value="MEDIA_DELETE">MEDIA_DELETE</option>
            <option value="AUTH_LOGIN">AUTH_LOGIN</option>
          </select>

          <input
            type="text"
            placeholder="Search action or resource..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-56"
          />
        </div>

        <div className="text-[11px] text-slate-400">
          Showing {logs.length} of {total} recorded events
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading audit records...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No audit records found matching query criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-3">Actor</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Target Resource</th>
                  <th className="py-3 px-3">IP Address</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-white font-medium text-xs">
                        {log.userName || log.userEmail || 'System Process'}
                      </div>
                      {log.userEmail && <div className="text-[10px] text-slate-500">{log.userEmail}</div>}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          log.action.includes('PUBLISH') || log.action.includes('APPROVE')
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : log.action.includes('OVERRIDE') || log.action.includes('ROLLBACK')
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                              : log.action.includes('REQUEST_CHANGES') || log.action.includes('DELETE')
                                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                      {log.resource}
                      {log.resourceId && (
                        <span className="text-slate-600 ml-1 truncate max-w-[80px] inline-block align-bottom">
                          #{log.resourceId.slice(0, 8)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {log.metadata ? (
                        <button
                          onClick={() => setInspectLog(log)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
                        >
                          Inspect Payload
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[11px]">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Metadata Inspector Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{inspectLog.action}</h3>
                <p className="text-[11px] text-slate-400">
                  Target: {inspectLog.resource} • {new Date(inspectLog.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setInspectLog(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Event Context & Non-Sensitive Metadata
              </span>
              <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 text-[11px] font-mono overflow-x-auto max-h-60">
                {JSON.stringify(inspectLog.metadata, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
