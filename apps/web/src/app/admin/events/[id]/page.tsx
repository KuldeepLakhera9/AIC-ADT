'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface EventDetail {
  id: string;
  slug: string;
  category: string;
  eventStatus: string;
  startDate: string;
  endDate: string;
  timeRange: string;
  venueType: string;
  organizer: string;
  registrationUrl?: string | null;
  registrationDeadline?: string | null;
  isExternal: boolean;
  currentVersion: number;
  authorId?: string;
  author?: {
    fullName: string;
    email: string;
  } | null;
  translations: Array<{
    id?: string;
    locale: string;
    title: string;
    shortDescription: string;
    fullDescription?: unknown;
    venueName: string;
    venueAddress: string;
    targetAudience?: string[];
    agendaHighlights?: string[];
    status: string;
    reviewerNotes?: string | null;
    publishedAt?: string | null;
    archivedAt?: string | null;
  }>;
  computedScheduleStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeLocale, setActiveLocale] = useState('en');

  useEffect(() => {
    let isMounted = true;
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/content/events/${id}`);
        if (!res.ok) {
          throw new Error('Event could not be retrieved.');
        }
        const data = await res.json();
        if (isMounted) {
          setEvent(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error retrieving event.');
          setLoading(false);
        }
      }
    }

    if (id) {
      void fetchEvent();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmitForReview = async () => {
    if (!window.confirm('Submit this event draft for editorial review?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/events/${id}/submit-review?locale=${activeLocale}`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Submission failed.');
      }
      const updated = await res.json();
      setEvent(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!window.confirm('Archive this event from active listings?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/events/${id}/archive?locale=${activeLocale}`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Archive failed.');
      }
      const updated = await res.json();
      setEvent(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!window.confirm('Restore this event back to DRAFT?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/events/${id}/restore?locale=${activeLocale}`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Restore failed.');
      }
      const updated = await res.json();
      setEvent(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 animate-pulse bg-slate-900 border border-slate-800 rounded-xl">
        Loading event details...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="p-8 text-center bg-red-950/40 border border-red-800 rounded-xl text-red-200">
        <h2 className="text-base font-bold">Error Loading Event</h2>
        <p className="text-xs text-red-300 mt-1">{error || 'Event not found.'}</p>
        <Link
          href="/admin/events"
          className="inline-block mt-4 px-4 py-2 rounded-lg bg-red-900 text-white text-xs font-semibold"
        >
          Return to Events List
        </Link>
      </div>
    );
  }

  const translation =
    event.translations.find((t) => t.locale === activeLocale) ||
    event.translations[0];
  const status = translation?.status || 'DRAFT';
  const scheduleStatus = event.computedScheduleStatus || event.eventStatus;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin/events" className="hover:text-white transition-colors">
              Events Management
            </Link>
            <span>/</span>
            <span className="font-mono text-slate-300">/{event.slug}</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {translation?.title || event.slug}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {status === 'DRAFT' && (
            <>
              <Link
                href={`/admin/events/${event.id}/edit`}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors border border-slate-700"
              >
                Edit Event
              </Link>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleSubmitForReview}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors disabled:opacity-50"
              >
                {actionLoading ? 'Submitting...' : 'Submit for Review'}
              </button>
            </>
          )}

          {status === 'PUBLISHED' && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleArchive}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 border border-slate-700 text-xs font-semibold text-red-300 transition-colors disabled:opacity-50"
            >
              Archive
            </button>
          )}

          {status === 'ARCHIVED' && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleRestore}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors disabled:opacity-50"
            >
              Restore to Draft
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Content Details and Metadata Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Locale Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400 mr-2">Language:</span>
            {['en', 'mr'].map((loc) => {
              const hasTr = event.translations.some((t) => t.locale === loc);
              return (
                <button
                  key={loc}
                  onClick={() => setActiveLocale(loc)}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                    activeLocale === loc
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {loc.toUpperCase()} {hasTr ? '✓' : '(Missing)'}
                </button>
              );
            })}
          </div>

          {/* Event Content Preview Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Event Short Teaser
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {translation?.shortDescription}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Venue & Logistics
              </h2>
              <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
                <p className="text-white font-semibold">{translation?.venueName}</p>
                <p className="text-slate-400">{translation?.venueAddress}</p>
                <p className="text-emerald-400 font-mono text-[11px] pt-1">
                  Format: {event.venueType.replace('_', ' ')}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Full Agenda & Curriculum
              </h2>
              <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                {Array.isArray(translation?.fullDescription) ? (
                  translation.fullDescription.map((p: string, idx: number) => (
                    <p key={idx}>{p}</p>
                  ))
                ) : (
                  <p>{String(translation?.fullDescription || '')}</p>
                )}
              </div>
            </div>

            {translation?.targetAudience && translation.targetAudience.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Target Audience
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {translation.targetAudience.map((t: string) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {translation?.agendaHighlights && translation.agendaHighlights.length > 0 && (
              <div>
                <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Key Highlights
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {translation.agendaHighlights.map((h: string) => (
                    <span
                      key={h}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                    >
                      ★ {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Information Card */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">
              Status &amp; Verification
            </h2>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Workflow State:</span>
              <span className="font-mono px-2 py-0.5 rounded text-[10px] uppercase font-bold border bg-amber-950/60 text-amber-300 border-amber-800">
                {status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Schedule Status:</span>
              <span className="font-mono px-2 py-0.5 rounded text-[10px] uppercase font-bold border bg-emerald-950/60 text-emerald-300 border-emerald-800">
                {scheduleStatus}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Category:</span>
              <span className="text-slate-200 font-semibold">{event.category.replace('_', ' ')}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Start Date:</span>
              <span className="font-mono text-slate-200">
                {new Date(event.startDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">End Date:</span>
              <span className="font-mono text-slate-200">
                {new Date(event.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Timing:</span>
              <span className="text-slate-200">{event.timeRange}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Organizer:</span>
              <span className="text-slate-200">{event.organizer}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Version:</span>
              <span className="font-mono text-slate-300">v{event.currentVersion}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Coordinator:</span>
              <span className="text-slate-300">{event.author?.fullName || 'System Author'}</span>
            </div>

            {event.registrationUrl && (
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <span>↗ Official Registration Portal</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
