import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import EventForm from '../admin/content/EventForm';
import AdminEventsPage from '@/app/admin/events/page';
import EventDetailPage from '@/app/admin/events/[id]/page';
import EditEventPage from '@/app/admin/events/[id]/edit/page';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useParams: () => ({ id: 'event-test-uuid-1' }),
  usePathname: () => '/admin/events',
}));

describe('Event Content Management Frontend', () => {
  const sampleInitialData = {
    id: 'event-test-uuid-1',
    slug: 'agri-hackathon-2026',
    category: 'TECHNICAL_WORKSHOP',
    eventStatus: 'UPCOMING',
    startDate: '2026-11-20T09:00:00.000Z',
    endDate: '2026-11-21T18:00:00.000Z',
    timeRange: '09:00 AM - 06:00 PM IST',
    venueType: 'IN_PERSON',
    organizer: 'AIC-ADT Tech Hub',
    isExternal: false,
    translations: [
      {
        locale: 'en',
        title: 'Precision Agri Hackathon 2026',
        shortDescription: 'National agritech hackathon held at the Baramati campus.',
        fullDescription: ['Day 1 IoT hack.', 'Day 2 prototype demo.'],
        venueName: 'Incubation Centre Auditorium',
        venueAddress: 'Baramati Campus, Sharadanagar',
        targetAudience: ['Developers', 'Startups'],
        agendaHighlights: ['Live Drone Demo', 'Seed Capital Grants'],
        status: 'DRAFT',
      },
    ],
  };

  it('renders EventForm with initial values and action buttons', () => {
    const html = renderToStaticMarkup(
      <EventForm
        initialData={sampleInitialData}
        onSubmit={async () => {}}
        loading={false}
      />,
    );

    expect(html).toContain('Edit Event Schedule');
    expect(html).toContain('agri-hackathon-2026');
    expect(html).toContain('Precision Agri Hackathon 2026');
    expect(html).toContain('National agritech hackathon held at the Baramati campus.');
    expect(html).toContain('Incubation Centre Auditorium');
    expect(html).toContain('Save Draft');
    expect(html).toContain('Submit for Review');
  });

  it('renders EventDetailPage preview with loading state', () => {
    const html = renderToStaticMarkup(<EventDetailPage />);
    expect(html).toContain('Loading event details...');
  });

  it('renders EditEventPage with loading state', () => {
    const html = renderToStaticMarkup(<EditEventPage />);
    expect(html).toContain('Loading event details...');
  });

  it('renders AdminEventsPage with toolbar and empty state fallback', () => {
    const html = renderToStaticMarkup(<AdminEventsPage />);
    expect(html).toContain('Events &amp; Calendar Management');
    expect(html).toContain('Search');
    expect(html).toContain('Apply Filters');
    expect(html).toContain('+ Schedule Event');
    expect(html).toContain('No Upcoming or Draft Events Found');
  });
});
