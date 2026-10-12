'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventForm, { EventFormData, EventInitialData } from '@/components/admin/content/EventForm';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<EventInitialData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadEvent() {
      try {
        const res = await fetch(`/api/content/events/${id}`);
        if (!res.ok) {
          throw new Error('Event could not be loaded.');
        }
        const data = await res.json();
        if (isMounted) {
          setInitialData(data);
          setFetching(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load event.');
          setFetching(false);
        }
      }
    }

    if (id) {
      void loadEvent();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (data: EventFormData, submitForReview: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        slug: data.slug.trim(),
        category: data.category,
        eventStatus: data.eventStatus,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        timeRange: data.timeRange.trim(),
        venueType: data.venueType,
        organizer: data.organizer.trim(),
        registrationUrl: data.registrationUrl ? data.registrationUrl.trim() : undefined,
        registrationDeadline: data.registrationDeadline
          ? new Date(data.registrationDeadline).toISOString()
          : undefined,
        isExternal: data.isExternal,
        locale: data.locale,
        title: data.title.trim(),
        shortDescription: data.shortDescription.trim(),
        fullDescription: data.fullDescription
          ? data.fullDescription.split('\n\n').map((p) => p.trim()).filter(Boolean)
          : [],
        venueName: data.venueName.trim(),
        venueAddress: data.venueAddress.trim(),
        targetAudience: data.targetAudience
          ? data.targetAudience.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        agendaHighlights: data.agendaHighlights
          ? data.agendaHighlights.split(',').map((h) => h.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch(`/api/content/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message || 'Failed to update event.',
        );
      }

      if (submitForReview) {
        const reviewRes = await fetch(
          `/api/content/events/${id}/submit-review?locale=${data.locale}`,
          {
            method: 'POST',
          },
        );
        if (!reviewRes.ok) {
          const reviewJson = await reviewRes.json();
          throw new Error(reviewJson.message || 'Updated, but review submission failed.');
        }
      }

      router.push('/admin/events');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during update.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-slate-400 animate-pulse bg-slate-900 border border-slate-800 rounded-xl">
        Loading event details...
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200">
        <h2 className="text-base font-bold">Error Loading Event</h2>
        <p className="text-xs text-red-300 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EventForm
        initialData={initialData || undefined}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
