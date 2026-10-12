import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  getPublishedNews,
  getPublishedNewsBySlug,
  getPublicEvents,
  getPublicEventBySlug,
  getPublicStartups,
  getPublicPrograms,
  getPublicPublications,
} from '@/lib/api/public-content';
import { POST } from '@/app/api/revalidate/route';
import EventsPage from '@/app/events/page';
import NewsPage from '@/app/news/page';
import NewsDetailPage from '@/app/news/[slug]/page';
import { NextRequest } from 'next/server';

describe('Phase 5 — Task 8: Public Content API and Website Integration', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('Public Content API Helpers & Resilient Fallback', () => {
    it('fetches published news from API when available', async () => {
      const mockNewsItem = {
        id: 'news-1',
        slug: 'custom-api-announcement',
        headline: 'API Powered Announcement',
        publishDate: '2026-10-15T00:00:00.000Z',
        category: 'FUNDING_MILESTONE',
        summary: 'Summary from CMS API',
        content: ['Paragraph 1 from CMS API'],
        sourceAttribution: 'AIC-ADT Board',
        tags: ['funding', 'agritech'],
        keyFacts: ['Fact 1'],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [mockNewsItem],
          pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
        }),
      });

      const news = await getPublishedNews('en');
      expect(news.length).toBe(1);
      expect(news[0].headline).toBe('API Powered Announcement');
      expect(news[0].category).toBe('Funding Milestone');
      expect(news[0].slug).toBe('custom-api-announcement');
    });

    it('gracefully degrades to static seed news when API is unavailable or returns error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

      const news = await getPublishedNews('en');
      expect(news.length).toBeGreaterThan(0);
      expect(news.some((n) => n.slug === 'sisfs-cohort-4-announcement')).toBe(true);
    });

    it('fetches single published news article by slug with fallback', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      const article = await getPublishedNewsBySlug('sisfs-cohort-4-announcement', 'en');
      expect(article).not.toBeNull();
      expect(article?.slug).toBe('sisfs-cohort-4-announcement');
    });

    it('fetches published events with proper formatting', async () => {
      const mockEventItem = {
        id: 'event-1',
        slug: 'precision-drone-agronomy',
        title: 'Precision Drone Agronomy Workshop',
        eventDate: '2026-11-20T10:00:00.000Z',
        venue: 'Baramati High-Tech Lab',
        category: 'Technical Workshop',
        isRegistrationOpen: true,
        summary: 'Hands-on drone agronomy training.',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [mockEventItem],
          pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
        }),
      });

      const events = await getPublicEvents('en');
      expect(events.length).toBe(1);
      expect(events[0].title).toBe('Precision Drone Agronomy Workshop');
      expect(events[0].status).toBe('Upcoming');
    });

    it('fetches single published event by slug with fallback', async () => {
      const event = await getPublicEventBySlug('sisfs-cohort-4', 'en');
      expect(event).not.toBeNull();
      expect(event?.slug).toBe('sisfs-cohort-4');
    });

    it('fetches startups, programs and publications data', async () => {
      const startups = await getPublicStartups();
      const programs = await getPublicPrograms();
      const publications = await getPublicPublications();

      expect(startups.length).toBeGreaterThan(0);
      expect(programs.length).toBeGreaterThan(0);
      expect(publications.length).toBeGreaterThan(0);
    });
  });

  describe('Secure Cache Invalidation API (/api/revalidate)', () => {
    it('rejects requests with missing or invalid secret header (401)', async () => {
      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tag: 'news' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(401);

      const json = await response.json();
      expect(json.error).toBe('Unauthorized');
    });

    it('rejects requests missing both path and tag parameters (400)', async () => {
      const secret = process.env.REVALIDATION_SECRET || 'development_revalidation_secret_key';
      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-revalidate-secret': secret,
        },
        body: JSON.stringify({}),
      });

      const response = await POST(req);
      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.error).toContain('Missing target');
    });

    it('successfully authorizes and revalidates by tag (200)', async () => {
      const secret = process.env.REVALIDATION_SECRET || 'development_revalidation_secret_key';
      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-revalidate-secret': secret,
        },
        body: JSON.stringify({ tag: 'news' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.revalidated).toBe(true);
      expect(json.tag).toBe('news');
    });

    it('successfully authorizes and revalidates by path (200)', async () => {
      const secret = process.env.REVALIDATION_SECRET || 'development_revalidation_secret_key';
      const req = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ path: '/events' }),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.revalidated).toBe(true);
      expect(json.path).toBe('/events');
    });
  });

  describe('Public Page Rendering with Server-Side Fetching', () => {
    it('renders EventsPage with breadcrumbs and ecosystem calendar', async () => {
      const html = renderToStaticMarkup(await EventsPage());
      expect(html).toContain('Ecosystem Calendar');
      expect(html).toContain('Workshops, Demo Days &amp; Intake Deadlines');
    });

    it('renders NewsPage with official announcements', async () => {
      const html = renderToStaticMarkup(await NewsPage());
      expect(html).toContain('News &amp; Official Announcements');
      expect(html).toContain('Official Communications Cell');
    });

    it('renders NewsDetailPage for verified slug', async () => {
      const html = renderToStaticMarkup(
        await NewsDetailPage({
          params: Promise.resolve({ slug: 'sisfs-cohort-4-announcement' }),
        }),
      );
      expect(html).toContain('Opens National Call for Startup India Seed Fund Scheme');
      expect(html).toContain('Verification &amp; Provenance');
    });
  });
});
