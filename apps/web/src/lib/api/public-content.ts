import { NEWS_ARTICLES, NewsArticle } from '@/data/news';
import { EVENTS_DATA, EventItem, EventCategory, EventStatus } from '@/data/events';
import { VERIFIED_STARTUPS_DIRECTORY as STARTUPS_DATA, StartupProfile as StartupItem } from '@/data/startups';
import { PROGRAMS_CONTINUUM as PROGRAMS_DATA } from '@/data/programs';
import { PUBLICATIONS_DATA } from '@/data/publications';

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:4000/api/v1';

const shouldBypassApiAtBuildTime = (): boolean => {
  return (
    (process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.npm_lifecycle_event === 'build') &&
    !process.env.INTERNAL_API_URL
  );
};

interface PublicNewsApiItem {
  id: string;
  slug: string;
  headline: string;
  summary: string;
  content: string | string[];
  category?: string;
  publishDate: string;
  featuredImageUrl?: string | null;
  sourceAttribution?: string;
  externalPressLink?: string | null;
  tags?: string[];
  keyFacts?: Array<{ label: string; value: string }>;
  locale?: string;
}

interface PublicEventApiItem {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  category?: string;
  status?: string;
  eventDate: string;
  venue?: string;
  isRegistrationOpen?: boolean;
  registrationUrl?: string | null;
  locale?: string;
}

/**
 * Server-side fetcher for Published News Articles
 * Integrates with Next.js tag-based revalidation and resilient fallback
 */
export async function getPublishedNews(
  locale: string = 'en',
): Promise<NewsArticle[]> {
  if (shouldBypassApiAtBuildTime()) {
    return NEWS_ARTICLES;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/public/news?locale=${locale}&limit=50`, {
      next: { revalidate: 60, tags: ['news', `news-${locale}`] },
    });

    if (!res.ok) {
      return NEWS_ARTICLES;
    }

    const json = await res.json();
    if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
      return NEWS_ARTICLES;
    }

    return json.data.map((item: PublicNewsApiItem) => ({
      slug: item.slug,
      headline: item.headline,
      publishDate: new Date(item.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      category: item.category === 'FUNDING_MILESTONE'
        ? 'Funding Milestone'
        : item.category === 'INFRASTRUCTURE'
          ? 'Infrastructure'
          : item.category === 'ECOSYSTEM_PARTNERSHIP'
            ? 'Ecosystem Partnership'
            : 'Official Announcement',
      summary: item.summary,
      content: Array.isArray(item.content)
        ? item.content
        : typeof item.content === 'string'
          ? [item.content]
          : [item.summary],
      sourceAttribution: item.sourceAttribution || 'AIC-ADT Baramati Foundation',
      externalPressLink: item.externalPressLink || undefined,
      tags: item.tags || [],
      keyFacts: item.keyFacts || [],
    }));
  } catch {
    return NEWS_ARTICLES;
  }
}

/**
 * Server-side fetcher for a single published news article by slug
 */
export async function getPublishedNewsBySlug(
  slug: string,
  locale: string = 'en',
): Promise<NewsArticle | null> {
  if (shouldBypassApiAtBuildTime()) {
    const seedMatch = NEWS_ARTICLES.find((a) => a.slug === slug);
    return seedMatch || null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/public/news/${slug}?locale=${locale}`, {
      next: { revalidate: 60, tags: ['news', `news-${slug}`] },
    });

    if (res.ok) {
      const item: PublicNewsApiItem = await res.json();
      return {
        slug: item.slug,
        headline: item.headline,
        publishDate: new Date(item.publishDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        category: item.category === 'FUNDING_MILESTONE'
          ? 'Funding Milestone'
          : item.category === 'INFRASTRUCTURE'
            ? 'Infrastructure'
            : 'Official Announcement',
        summary: item.summary,
        content: Array.isArray(item.content)
          ? item.content
          : typeof item.content === 'string'
            ? [item.content]
            : [item.summary],
        sourceAttribution: item.sourceAttribution || 'AIC-ADT Baramati Foundation',
        externalPressLink: item.externalPressLink || undefined,
        tags: item.tags || [],
        keyFacts: item.keyFacts || [],
      };
    }
  } catch {
    // Fall back to seed data
  }

  const seedMatch = NEWS_ARTICLES.find((a) => a.slug === slug);
  return seedMatch || null;
}

/**
 * Server-side fetcher for Published Events & Workshops
 */
export async function getPublicEvents(
  locale: string = 'en',
): Promise<EventItem[]> {
  if (shouldBypassApiAtBuildTime()) {
    return EVENTS_DATA;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/public/events?locale=${locale}&limit=50`, {
      next: { revalidate: 60, tags: ['events', `events-${locale}`] },
    });

    if (!res.ok) {
      return EVENTS_DATA;
    }

    const json = await res.json();
    if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
      return EVENTS_DATA;
    }

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return json.data.map((item: PublicEventApiItem) => {
      const d = new Date(item.eventDate);
      const seedMatch = EVENTS_DATA.find((e) => e.slug === item.slug);
      return {
        slug: item.slug,
        title: item.title,
        shortDescription: item.summary || seedMatch?.shortDescription || '',
        fullDescription: seedMatch?.fullDescription || [item.summary || ''],
        category: (item.category as EventCategory) || seedMatch?.category || 'Technical Workshop',
        status: (item.status as EventStatus) || seedMatch?.status || 'Upcoming',
        date: {
          day: String(d.getUTCDate()).padStart(2, '0'),
          month: months[d.getUTCMonth()] || 'TBD',
          year: String(d.getUTCFullYear()),
          formatted: `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
          time: seedMatch?.date?.time || '10:00 AM - 04:00 PM IST',
        },
        venue: {
          name: item.venue || seedMatch?.venue?.name || 'AIC-ADT Campus, Baramati',
          type: seedMatch?.venue?.type || 'In-Person Campus',
          address: seedMatch?.venue?.address || 'Baramati, Pune District, Maharashtra 413115',
        },
        organizer: seedMatch?.organizer || 'AIC-ADT Baramati Foundation',
        targetAudience: seedMatch?.targetAudience || ['Entrepreneurs', 'Researchers'],
        agendaOrHighlights: seedMatch?.agendaOrHighlights || [],
        registration: {
          isAvailable: item.isRegistrationOpen ?? seedMatch?.registration?.isAvailable ?? true,
          buttonLabel: seedMatch?.registration?.buttonLabel || 'Register Now',
          externalUrl: item.registrationUrl || seedMatch?.registration?.externalUrl,
          fee: seedMatch?.registration?.fee || 'Free / Govt Supported',
          contactEmail: seedMatch?.registration?.contactEmail || 'events@aic-adt.org',
          statusNote: item.isRegistrationOpen ? 'Registration Active' : (seedMatch?.registration?.statusNote || 'Intake Concluded'),
        },
        verifiedSource: seedMatch?.verifiedSource || 'Official CMS Record',
      };
    });
  } catch {
    return EVENTS_DATA;
  }
}

/**
 * Server-side fetcher for single published event by slug
 */
export async function getPublicEventBySlug(
  slug: string,
  locale: string = 'en',
): Promise<EventItem | null> {
  if (shouldBypassApiAtBuildTime()) {
    const seedMatch = EVENTS_DATA.find((e) => e.slug === slug);
    return seedMatch || null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/public/events/${slug}?locale=${locale}`, {
      next: { revalidate: 60, tags: ['events', `event-${slug}`] },
    });

    if (res.ok) {
      const item: PublicEventApiItem = await res.json();
      const d = new Date(item.eventDate);
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const seedMatch = EVENTS_DATA.find((e) => e.slug === slug);
      return {
        slug: item.slug,
        title: item.title,
        shortDescription: item.summary || seedMatch?.shortDescription || '',
        fullDescription: seedMatch?.fullDescription || [item.summary || ''],
        category: (item.category as EventCategory) || seedMatch?.category || 'Technical Workshop',
        status: (item.status as EventStatus) || seedMatch?.status || 'Upcoming',
        date: {
          day: String(d.getUTCDate()).padStart(2, '0'),
          month: months[d.getUTCMonth()] || 'TBD',
          year: String(d.getUTCFullYear()),
          formatted: `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
          time: seedMatch?.date?.time || '10:00 AM - 04:00 PM IST',
        },
        venue: {
          name: item.venue || seedMatch?.venue?.name || 'AIC-ADT Campus, Baramati',
          type: seedMatch?.venue?.type || 'In-Person Campus',
          address: seedMatch?.venue?.address || 'Baramati, Pune District, Maharashtra 413115',
        },
        organizer: seedMatch?.organizer || 'AIC-ADT Baramati Foundation',
        targetAudience: seedMatch?.targetAudience || ['Entrepreneurs', 'Researchers'],
        agendaOrHighlights: seedMatch?.agendaOrHighlights || [],
        registration: {
          isAvailable: item.isRegistrationOpen ?? seedMatch?.registration?.isAvailable ?? true,
          buttonLabel: seedMatch?.registration?.buttonLabel || 'Register Now',
          externalUrl: item.registrationUrl || seedMatch?.registration?.externalUrl,
          fee: seedMatch?.registration?.fee || 'Free / Govt Supported',
          contactEmail: seedMatch?.registration?.contactEmail || 'events@aic-adt.org',
          statusNote: item.isRegistrationOpen ? 'Registration Active' : (seedMatch?.registration?.statusNote || 'Intake Concluded'),
        },
        verifiedSource: seedMatch?.verifiedSource || 'Official CMS Record',
      };
    }
  } catch {
    // Fall back
  }

  const seedMatch = EVENTS_DATA.find((e) => e.slug === slug);
  return seedMatch || null;
}

/**
 * Server-side fetcher for Public Portfolio Startups
 */
export async function getPublicStartups(): Promise<StartupItem[]> {
  if (shouldBypassApiAtBuildTime()) {
    return STARTUPS_DATA;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/public/startups?limit=50`, {
      next: { revalidate: 300, tags: ['startups'] },
    });

    if (!res.ok) {
      return STARTUPS_DATA;
    }

    return STARTUPS_DATA;
  } catch {
    return STARTUPS_DATA;
  }
}

/**
 * Server-side fetcher for Public Programs
 */
export async function getPublicPrograms() {
  return PROGRAMS_DATA;
}

/**
 * Server-side fetcher for Public Publications
 */
export async function getPublicPublications() {
  return PUBLICATIONS_DATA;
}
