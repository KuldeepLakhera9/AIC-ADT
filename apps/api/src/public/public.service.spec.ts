import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { PublicService } from './public.service.js';
import { PrismaService } from '../database/prisma.service.js';
import { ContentStatus, MediaVisibility, NewsCategory } from '@prisma/client';

describe('PublicService — Server-Side Visibility & Public Content Engine', () => {
  let service: PublicService;
  let prismaMock: any;

  beforeEach(() => {
    prismaMock = {
      connected: false,
      newsArticle: {
        count: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      event: {
        count: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      mediaAsset: {
        findUnique: vi.fn(),
      },
    };

    service = new PublicService(prismaMock as unknown as PrismaService);
  });

  describe('Published News Articles', () => {
    it('returns published news articles and sanitizes internal administrative metadata', async () => {
      const result = await service.getPublishedNews({ locale: 'en' });

      expect(result.data.length).toBeGreaterThan(0);
      const article = result.data[0];
      expect(article.slug).toBeDefined();
      expect(article.headline).toBeDefined();
      expect(article.summary).toBeDefined();

      // Ensure internal security and workflow fields are not exposed
      expect((article as any).authorId).toBeUndefined();
      expect((article as any).reviewerNotes).toBeUndefined();
      expect((article as any).currentVersion).toBeUndefined();
      expect((article as any).storagePath).toBeUndefined();
    });

    it('returns Marathi content when locale="mr" is specified and published translation exists', async () => {
      const result = await service.getPublishedNews({ locale: 'mr' });
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0].locale).toBe('mr');
      expect(result.data[0].isAvailableInLocale).toBe(true);
    });

    it('throws NotFoundException when querying a non-existent news slug', async () => {
      await expect(
        service.getPublishedNewsBySlug('non-existent-press-release', 'en'),
      ).rejects.toThrow(NotFoundException);
    });

    it('enforces status=PUBLISHED when database is connected', async () => {
      prismaMock.connected = true;
      prismaMock.newsArticle.count.mockResolvedValue(1);
      prismaMock.newsArticle.findMany.mockResolvedValue([
        {
          id: 'article-uuid-1',
          slug: 'published-article',
          category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
          publishDate: new Date('2026-03-01T00:00:00.000Z'),
          sourceAttribution: 'AIC-ADT Cell',
          externalPressLink: null,
          thumbnailAssetId: null,
          translations: [
            {
              locale: 'en',
              headline: 'Published Announcement',
              summary: 'Approved public release',
              content: '<p>Body</p>',
              tags: ['Govt'],
              status: ContentStatus.PUBLISHED,
            },
          ],
        },
      ]);

      const result = await service.getPublishedNews({ locale: 'en' });
      expect(result.data).toHaveLength(1);
      expect(result.data[0].slug).toBe('published-article');

      // Verify the query strictly enforced status: ContentStatus.PUBLISHED
      expect(prismaMock.newsArticle.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            translations: expect.objectContaining({
              some: expect.objectContaining({
                status: ContentStatus.PUBLISHED,
              }),
            }),
          }),
        }),
      );
    });
  });

  describe('Public Events & Workshops', () => {
    it('returns published workshops and sanitizes administrative context', async () => {
      const result = await service.getPublicEvents({ locale: 'en' });

      expect(result.data.length).toBeGreaterThan(0);
      const event = result.data[0];
      expect(event.slug).toBe('drone-agronomy-masterclass-2026');
      expect(event.venueName).toBeDefined();

      // Ensure internal fields stripped
      expect((event as any).authorId).toBeUndefined();
      expect((event as any).reviewerNotes).toBeUndefined();
      expect((event as any).currentVersion).toBeUndefined();
    });

    it('retrieves published event by slug', async () => {
      const event = await service.getPublicEventBySlug('drone-agronomy-masterclass-2026', 'en');
      expect(event.slug).toBe('drone-agronomy-masterclass-2026');
      expect(event.title).toContain('Drone Agronomy');
    });

    it('throws NotFoundException when slug does not exist', async () => {
      await expect(
        service.getPublicEventBySlug('cancelled-unapproved-session', 'en'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Public Media Assets & Delivery Protection', () => {
    it('delivers public media metadata without exposing server storage paths or secrets', async () => {
      prismaMock.connected = true;
      prismaMock.mediaAsset.findUnique.mockResolvedValue({
        id: 'media-uuid-1',
        originalName: 'lab-demonstration.png',
        storageKey: 'assets/2026/04/lab-demonstration-hashed.png',
        storagePath: '/mnt/secure-storage/private/lab-demonstration-hashed.png',
        publicUrl: 'https://cdn.aic-adt.in/assets/lab-demonstration.png',
        mimeType: 'image/png',
        fileSizeBytes: 245000,
        mediaType: 'IMAGE',
        visibility: MediaVisibility.PUBLIC,
        width: 1200,
        height: 800,
        altTextEn: 'Soil testing lab demonstration',
        caption: 'Researchers validating canopy indices',
        attribution: 'AIC-ADT Baramati',
        uploaderId: 'user-internal-uuid',
        createdAt: new Date(),
      });

      const media = await service.getPublicMedia('media-uuid-1');

      expect(media.id).toBe('media-uuid-1');
      expect(media.publicUrl).toBe('https://cdn.aic-adt.in/assets/lab-demonstration.png');
      expect(media.altText).toBe('Soil testing lab demonstration');

      // Crucial security check: internal filesystem storagePath and uploaderId must be stripped
      expect((media as any).storagePath).toBeUndefined();
      expect((media as any).storageKey).toBeUndefined();
      expect((media as any).uploaderId).toBeUndefined();
    });

    it('rejects retrieval of PRIVATE or ARCHIVED media through public endpoint with NotFoundException', async () => {
      prismaMock.connected = true;
      prismaMock.mediaAsset.findUnique.mockResolvedValue({
        id: 'confidential-financial-audit',
        originalName: 'Q3_Confidential_Financials.pdf',
        visibility: MediaVisibility.PRIVATE, // Private internal document!
        mimeType: 'application/pdf',
      });

      await expect(service.getPublicMedia('confidential-financial-audit')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Public Programs & Portfolio Startups', () => {
    it('returns published incubation programs', async () => {
      const programs = await service.getPublicPrograms({ locale: 'en' });
      expect(programs.data.length).toBeGreaterThan(0);
      expect(programs.data[0].slug).toBe('incubation');
    });

    it('returns published portfolio startups and filters private records', async () => {
      const startups = await service.getPublicStartups({});
      expect(startups.data.length).toBeGreaterThan(0);
      expect(startups.data.some((s) => s.slug === 'gramheet')).toBe(true);

      // Verify no internal financial fields exist
      expect((startups.data[0] as any).capTable).toBeUndefined();
      expect((startups.data[0] as any).bankAccountNumber).toBeUndefined();
    });
  });
});
