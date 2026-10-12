'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export interface ReviewQueueItem {
  id: string;
  entityType: 'NEWS' | 'EVENT' | 'STARTUP' | 'PROGRAM' | 'INSTITUTIONAL_PAGE';
  entityId: string;
  slug: string;
  title: string;
  locale: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
  versionNumber: number;
  authorId: string | null;
  authorName: string;
  authorEmail: string;
  submittedAt: string;
  lastUpdatedAt: string;
  reviewerNotes?: string | null;
  availableActions: string[];
  selfAuthored: boolean;
}

export interface ContentRevision {
  id: string;
  entityType: string;
  entityId: string;
  versionNumber: number;
  locale: string;
  status: string;
  dataSnapshot: Record<string, unknown>;
  authorName?: string;
  reviewerName?: string;
  reviewNotes: string | null;
  changelog: string | null;
  createdAt: string;
}

export default function ReviewQueueManager() {
  const [items, setItems] = useState<ReviewQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'NEWS' | 'EVENT'>('ALL');
  const [search, setSearch] = useState('');

  // Modals & Drawers
  const [previewItem, setPreviewItem] = useState<ReviewQueueItem | null>(null);
  const [changeRequestItem, setChangeRequestItem] = useState<ReviewQueueItem | null>(null);
  const [changeNotes, setChangeNotes] = useState('');
  const [changeNotesError, setChangeNotesError] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  // Revisions & Rollback Modal
  const [historyItem, setHistoryItem] = useState<ReviewQueueItem | null>(null);
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [loadingRevisions, setLoadingRevisions] = useState(false);
  const [rollbackVersion, setRollbackVersion] = useState<number | null>(null);
  const [rollbackReason, setRollbackReason] = useState('');
  const [rollbackError, setRollbackError] = useState('');

  const triggerRefresh = useCallback(() => {
    setLoading(true);
    setRefreshIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadQueue() {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'ALL') params.append('status', statusFilter);
        if (typeFilter !== 'ALL') params.append('entityType', typeFilter);
        if (search) params.append('search', search);

        const res = await fetch(`/api/workflow/review-queue?${params.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to load editorial review queue.');
        }
        const json = await res.json();
        if (active) {
          setItems(json.data || []);
          setError(null);
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Error fetching review queue');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadQueue();

    return () => {
      active = false;
    };
  }, [statusFilter, typeFilter, search, refreshIndex]);

  // Handle Approve Action
  const handleApprove = async (item: ReviewQueueItem) => {
    if (item.selfAuthored) {
      const confirmOverride = window.confirm(
        'INSTITUTIONAL GOVERNANCE ALERT:\nYou authored this content. Self-approval is strictly forbidden under dual-custody policy unless you are executing an emergency Administrative override.\n\nDo you want to proceed?',
      );
      if (!confirmOverride) return;
    }

    try {
      setActionInProgress(true);
      setError(null);
      const res = await fetch(
        `/api/workflow/entities/${item.entityType}/${item.entityId}/approve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: item.locale, approvalNotes: 'Verified and approved' }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Approval failed.');
      }
      setSuccessMessage(`Approved "${item.title}" successfully.`);
      triggerRefresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to approve item.');
    } finally {
      setActionInProgress(false);
    }
  };

  // Handle Request Changes
  const handleSubmitChanges = async () => {
    if (!changeRequestItem) return;
    if (changeNotes.trim().length < 10) {
      setChangeNotesError('Meaningful reviewer notes (minimum 10 characters) are mandatory.');
      return;
    }

    try {
      setActionInProgress(true);
      setChangeNotesError('');
      const res = await fetch(
        `/api/workflow/entities/${changeRequestItem.entityType}/${changeRequestItem.entityId}/request-changes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: changeRequestItem.locale, reviewerNotes: changeNotes.trim() }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to request changes.');
      }
      setSuccessMessage(`Requested revisions for "${changeRequestItem.title}".`);
      setChangeRequestItem(null);
      setChangeNotes('');
      triggerRefresh();
    } catch (err: unknown) {
      setChangeNotesError(err instanceof Error ? err.message : 'Error submitting feedback.');
    } finally {
      setActionInProgress(false);
    }
  };

  // Handle Publish
  const handlePublish = async (item: ReviewQueueItem) => {
    try {
      setActionInProgress(true);
      setError(null);
      const res = await fetch(
        `/api/workflow/entities/${item.entityType}/${item.entityId}/publish`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: item.locale, expectedVersion: item.versionNumber }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Publishing failed.');
      }
      setSuccessMessage(`Published "${item.title}" live to the institutional website!`);
      triggerRefresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to publish item.');
    } finally {
      setActionInProgress(false);
    }
  };

  // Fetch Revisions for History Modal
  const openHistoryModal = async (item: ReviewQueueItem) => {
    setHistoryItem(item);
    setRollbackVersion(null);
    setRollbackReason('');
    setRollbackError('');
    try {
      setLoadingRevisions(true);
      const res = await fetch(
        `/api/workflow/entities/${item.entityType}/${item.entityId}/revisions?locale=${item.locale}`,
      );
      if (res.ok) {
        const revs = await res.json();
        setRevisions(revs || []);
      }
    } catch {
      setRevisions([]);
    } finally {
      setLoadingRevisions(false);
    }
  };

  // Execute Rollback
  const handleExecuteRollback = async () => {
    if (!historyItem || !rollbackVersion) return;
    if (rollbackReason.trim().length < 10) {
      setRollbackError('A clear justification reason (minimum 10 characters) is required.');
      return;
    }

    try {
      setActionInProgress(true);
      setRollbackError('');
      const res = await fetch(
        `/api/workflow/entities/${historyItem.entityType}/${historyItem.entityId}/rollback`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locale: historyItem.locale,
            targetVersion: rollbackVersion,
            reason: rollbackReason.trim(),
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Rollback failed.');
      }
      setSuccessMessage(
        `Rolled back "${historyItem.title}" to version ${rollbackVersion}. Safely staged as draft.`,
      );
      setHistoryItem(null);
      triggerRefresh();
    } catch (err: unknown) {
      setRollbackError(err instanceof Error ? err.message : 'Failed to execute rollback.');
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Editorial Review Queue</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-900/60 text-blue-400 border border-blue-700/50">
              Dual-Custody Governed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate submitted institutional press releases, events, and programs. Dual-custody prohibits self-approval.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/audit"
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            View Audit Trail →
          </Link>
          <button
            onClick={() => triggerRefresh()}
            disabled={loading}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
          >
            {loading ? 'Refreshing...' : '↻ Refresh Queue'}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center justify-between">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['ALL', 'IN_REVIEW', 'CHANGES_REQUESTED', 'APPROVED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  statusFilter === tab
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {tab === 'ALL'
                  ? 'All Pending'
                  : tab === 'IN_REVIEW'
                    ? 'In Review'
                    : tab === 'CHANGES_REQUESTED'
                      ? 'Changes Requested'
                      : 'Approved'}
              </button>
            ))}
          </div>

          {/* Type & Search */}
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'ALL' | 'NEWS' | 'EVENT')}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Content Types</option>
              <option value="NEWS">News Articles</option>
              <option value="EVENT">Events</option>
            </select>

            <input
              type="text"
              placeholder="Search queue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
            />
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading editorial items...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              ✓
            </div>
            <h2 className="text-sm font-bold text-white">Review Queue is Clear</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              There are no pending submissions matching your filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Content Title</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Locale</th>
                  <th className="py-3 px-3">Version</th>
                  <th className="py-3 px-3">Submitted By</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-xs truncate">
                      <div className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.selfAuthored && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/60">
                            Self-Authored
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">/{item.slug}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.entityType}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 uppercase font-mono font-bold text-[11px] text-emerald-400">
                      {item.locale}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-400">
                      v{item.versionNumber}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-white text-xs">{item.authorName}</div>
                      <div className="text-[10px] text-slate-500">{item.authorEmail}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.status === 'IN_REVIEW'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/70'
                            : item.status === 'CHANGES_REQUESTED'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/70'
                              : item.status === 'APPROVED'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/70'
                                : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewItem(item)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => openHistoryModal(item)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[11px] font-medium"
                        >
                          Revisions
                        </button>

                        {item.status === 'IN_REVIEW' && (
                          <>
                            <button
                              onClick={() => {
                                setChangeRequestItem(item);
                                setChangeNotes('');
                                setChangeNotesError('');
                              }}
                              className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-[11px] font-medium"
                            >
                              Request Changes
                            </button>

                            <button
                              onClick={() => handleApprove(item)}
                              disabled={actionInProgress}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                                item.selfAuthored
                                  ? 'bg-amber-900/40 border border-amber-700/50 text-amber-300 hover:bg-amber-900/60'
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              }`}
                              title={
                                item.selfAuthored
                                  ? 'Anti-Self-Approval Policy: You authored this submission.'
                                  : 'Approve this revision for publication'
                              }
                            >
                              Approve {item.selfAuthored && '⚠️'}
                            </button>
                          </>
                        )}

                        {item.status === 'APPROVED' && (
                          <button
                            onClick={() => handlePublish(item)}
                            disabled={actionInProgress}
                            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold"
                          >
                            Publish Live
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 1. Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Revision Snapshot Preview</h3>
                <p className="text-xs text-slate-400">
                  {previewItem.entityType} • Locale: {previewItem.locale.toUpperCase()} • Version v{previewItem.versionNumber}
                </p>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Title / Headline
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">{previewItem.title}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Author & Submission Context
                </span>
                <p className="text-slate-300 mt-0.5">
                  Submitted by {previewItem.authorName} ({previewItem.authorEmail}) on{' '}
                  {new Date(previewItem.submittedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Reviewer Notes / Feedback History
                </span>
                <p className="text-slate-300 mt-0.5 italic bg-slate-950 p-3 rounded border border-slate-800">
                  {previewItem.reviewerNotes || 'No specific reviewer notes attached to this revision.'}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Request Changes Modal */}
      {changeRequestItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Request Revisions</h3>
            <p className="text-xs text-slate-400">
              Provide actionable guidance for {changeRequestItem.authorName}. Policy requires detailed feedback (at least 10 characters).
            </p>

            <div>
              <textarea
                rows={4}
                value={changeNotes}
                onChange={(e) => {
                  setChangeNotes(e.target.value);
                  if (e.target.value.trim().length >= 10) setChangeNotesError('');
                }}
                placeholder="Detail the necessary corrections, factual adjustments, or missing media citations..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <div className="flex justify-between items-center text-[10px] mt-1 text-slate-500">
                <span>{changeNotesError && <span className="text-rose-400">{changeNotesError}</span>}</span>
                <span>{changeNotes.trim().length} / 10 min chars</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setChangeRequestItem(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitChanges}
                disabled={actionInProgress || changeNotes.trim().length < 10}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-xs font-semibold text-white"
              >
                {actionInProgress ? 'Sending...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Revisions & Rollback Modal */}
      {historyItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Revision History & Rollback Control</h3>
                <p className="text-xs text-slate-400">
                  {historyItem.title} • {historyItem.entityType} ({historyItem.locale.toUpperCase()})
                </p>
              </div>
              <button
                onClick={() => setHistoryItem(null)}
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs">
              {loadingRevisions ? (
                <div className="text-center py-8 text-slate-400">Loading historical versions...</div>
              ) : revisions.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No prior revisions recorded.</div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Past Version Snapshots
                  </h4>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {revisions.map((rev) => (
                      <div
                        key={rev.id}
                        onClick={() => setRollbackVersion(rev.versionNumber)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          rollbackVersion === rev.versionNumber
                            ? 'bg-emerald-950/60 border-emerald-500'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-white">
                            Version v{rev.versionNumber} ({rev.status})
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(rev.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-1">{rev.changelog || 'Standard revision record'}</p>
                        {rev.reviewerName && (
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Reviewed by: {rev.reviewerName}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safe Rollback Panel */}
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Controlled Non-Destructive Rollback</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
                    Audit Preserved
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Select a prior version above to restore. Rollback creates a new revision without erasing historical versions or audit logs.
                </p>

                {rollbackVersion ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-emerald-400">
                      Selected Target: Version v{rollbackVersion}
                    </p>
                    <input
                      type="text"
                      placeholder="Mandatory justification reason for rollback (minimum 10 characters)..."
                      value={rollbackReason}
                      onChange={(e) => {
                        setRollbackReason(e.target.value);
                        if (e.target.value.trim().length >= 10) setRollbackError('');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    {rollbackError && <p className="text-[10px] text-rose-400">{rollbackError}</p>}
                    <button
                      onClick={handleExecuteRollback}
                      disabled={actionInProgress || rollbackReason.trim().length < 10}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-semibold text-white"
                    >
                      {actionInProgress ? 'Restoring...' : `Execute Rollback to v${rollbackVersion}`}
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">
                    Click a revision snapshot above to configure rollback.
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setHistoryItem(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
