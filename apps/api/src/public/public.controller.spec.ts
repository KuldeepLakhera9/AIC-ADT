import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PublicController } from './public.controller.js';
import { PublicService } from './public.service.js';

describe('PublicController', () => {
  let controller: PublicController;
  let serviceMock: Partial<PublicService>;

  beforeEach(() => {
    serviceMock = {
      getPublishedNews: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
      getPublishedNewsBySlug: vi.fn().mockResolvedValue({
        id: 'news-1',
        slug: 'cohort-4',
        headline: 'Cohort 4 Announcement',
        summary: 'Details',
        content: '<p>Content</p>',
        category: 'OFFICIAL_ANNOUNCEMENT',
        publishDate: new Date().toISOString(),
        sourceAttribution: 'Desk',
        externalPressLink: null,
        thumbnailAssetId: null,
        tags: [],
        locale: 'en',
        isAvailableInLocale: true,
      }),
      getPublicEvents: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
      getPublicEventBySlug: vi.fn().mockResolvedValue({
        id: 'event-1',
        slug: 'drone-masterclass',
        title: 'Drone Masterclass',
        shortDescription: 'Drone training',
        fullDescription: '<p>Details</p>',
        venueName: 'Baramati',
        venueAddress: 'Pune',
        category: 'WORKSHOP',
        eventStatus: 'OPEN',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        registrationDeadline: null,
        registrationUrl: null,
        bannerAssetId: null,
        capacity: 40,
        targetAudience: [],
        locale: 'en',
        isAvailableInLocale: true,
      }),
      getPublicPrograms: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
      getPublicStartups: vi.fn().mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }),
      getPublicMedia: vi.fn().mockResolvedValue({
        id: 'media-1',
        originalName: 'logo.png',
        publicUrl: 'https://cdn.aic-adt.in/logo.png',
        mimeType: 'image/png',
        fileSizeBytes: 1000,
        mediaType: 'IMAGE',
        altText: 'Logo',
        createdAt: new Date().toISOString(),
      }),
    };

    controller = new PublicController(serviceMock as PublicService);
  });

  it('delegates getPublishedNews to service with query parameters', async () => {
    await controller.getPublishedNews({ locale: 'en', limit: 10 });
    expect(serviceMock.getPublishedNews).toHaveBeenCalledWith({ locale: 'en', limit: 10 });
  });

  it('delegates getPublishedNewsBySlug to service', async () => {
    const res = await controller.getPublishedNewsBySlug('cohort-4', 'en');
    expect(serviceMock.getPublishedNewsBySlug).toHaveBeenCalledWith('cohort-4', 'en');
    expect(res.slug).toBe('cohort-4');
  });

  it('delegates getPublicMedia to service', async () => {
    const res = await controller.getPublicMedia('media-1');
    expect(serviceMock.getPublicMedia).toHaveBeenCalledWith('media-1');
    expect(res.id).toBe('media-1');
  });
});
