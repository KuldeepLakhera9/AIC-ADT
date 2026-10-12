'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventForm, { EventFormData } from '@/components/admin/content/EventForm';

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch('/api/content/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message || 'Failed to create event schedule draft.',
        );
      }

      const created = await res.json();

      if (submitForReview) {
        const reviewRes = await fetch(
          `/api/content/events/${created.id}/submit-review?locale=${data.locale}`,
          {
            method: 'POST',
          },
        );
        if (!reviewRes.ok) {
          const reviewError = await reviewRes.json();
          throw new Error(
            reviewError.message ||
              'Event draft saved, but submission for review failed.',
          );
        }
      }

      router.push('/admin/events');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <EventForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
