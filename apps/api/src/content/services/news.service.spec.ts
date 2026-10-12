import { describe, it, expect, beforeEach } from 'vitest';
import { NewsService } from './news.service.js';
import { PrismaService } from '../../database/prisma.service.js';
import { AuthenticatedUser, Permission, Role, UserStatus } from '../../auth/auth.types.js';
import { NewsCategory, ContentStatus } from '@prisma/client';
import { ConflictException, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

describe('NewsService', () => {
  let service: NewsService;
  let prismaMock: Partial<PrismaService>;

  const adminUser: AuthenticatedUser = {
    id: 'admin-uuid-1',
    email: 'admin@aic-adt.org',
    fullName: 'Super Admin',
    role: Role.ADMIN,
    status: UserStatus.ACTIVE,
    permissions: Object.values(Permission),
  };

  const editorUser: AuthenticatedUser = {
    id: 'editor-uuid-2',
    email: 'editor@aic-adt.org',
    fullName: 'Content Editor',
    role: Role.CONTENT_EDITOR,
    status: UserStatus.ACTIVE,
    permissions: [
      Permission.DASHBOARD_READ,
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
    ],
  };

  const otherEditor: AuthenticatedUser = {
    id: 'other-uuid-3',
    email: 'other@aic-adt.org',
    fullName: 'Other Editor',
    role: Role.CONTENT_EDITOR,
    status: UserStatus.ACTIVE,
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_UPDATE,
    ],
  };

  beforeEach(() => {
    // In-memory mode for clean unit testing
    prismaMock = {
      connected: false,
    };

    service = new NewsService(prismaMock as PrismaService);
  });

  it('creates a new draft news article and translation with audit logging', async () => {
    const created = await service.createNews(
      {
        slug: 'sisfs-seed-fund-call',
        category: NewsCategory.FUNDING_MILESTONE,
        sourceAttribution: 'AIC-ADT Official Press Office',
        headline: 'Startup India Seed Fund Scheme Call Announced',
        summary: 'Grants of up to INR 50 Lakhs announced for early-stage agritech innovations.',
        content: ['Full announcement body paragraph 1', 'Paragraph 2 details.'],
        tags: ['SISFS', 'Agritech', 'Funding'],
      },
      editorUser,
    );

    expect(created.id).toBeDefined();
    expect(created.slug).toBe('sisfs-seed-fund-call');
    expect(created.category).toBe(NewsCategory.FUNDING_MILESTONE);
    expect(created.authorId).toBe(editorUser.id);
    expect(created.translations).toHaveLength(1);
    expect(created.translations[0].status).toBe(ContentStatus.DRAFT);
    expect(created.translations[0].headline).toBe('Startup India Seed Fund Scheme Call Announced');
  });

  it('rejects duplicate slugs with ConflictException (HTTP 409)', async () => {
    await service.createNews(
      {
        slug: 'unique-news-slug',
        category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
        sourceAttribution: 'AIC-ADT Press',
        headline: 'First Press Release',
        summary: 'Summary of the first announcement.',
        content: 'Content paragraph.',
      },
      editorUser,
    );

    await expect(
      service.createNews(
        {
          slug: 'unique-news-slug',
          category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
          sourceAttribution: 'AIC-ADT Press',
          headline: 'Duplicate Attempt',
          summary: 'Summary of duplicate announcement.',
          content: 'Content paragraph.',
        },
        editorUser,
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('retrieves news by ID and by slug, throwing NotFoundException when missing', async () => {
    const created = await service.createNews(
      {
        slug: 'baramati-kisan-fair',
        category: NewsCategory.ECOSYSTEM_PARTNERSHIP,
        sourceAttribution: 'AIC-ADT Baramati',
        headline: 'Baramati Kisan Innovation Pavilion',
        summary: 'Over 20 incubated startups to showcase agricultural robotics.',
        content: 'Content details.',
      },
      editorUser,
    );

    const byId = await service.getNewsById(created.id);
    expect(byId.slug).toBe('baramati-kisan-fair');

    const bySlug = await service.getNewsBySlug('baramati-kisan-fair');
    expect(bySlug.id).toBe(created.id);

    await expect(service.getNewsById('non-existent-id')).rejects.toThrow(NotFoundException);
    await expect(service.getNewsBySlug('non-existent-slug')).rejects.toThrow(NotFoundException);
  });

  it('lists news articles with pagination and filtering', async () => {
    await service.createNews(
      {
        slug: 'announcement-one',
        category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
        sourceAttribution: 'AIC-ADT',
        headline: 'Announcement One Headline',
        summary: 'Summary one.',
        content: 'Body one.',
      },
      editorUser,
    );

    await service.createNews(
      {
        slug: 'funding-two',
        category: NewsCategory.FUNDING_MILESTONE,
        sourceAttribution: 'AIC-ADT',
        headline: 'Funding Two Headline',
        summary: 'Summary two.',
        content: 'Body two.',
      },
      editorUser,
    );

    const listAll = await service.listNews({ page: 1, limit: 10 });
    expect(listAll.total).toBe(2);
    expect(listAll.items).toHaveLength(2);

    const listFunding = await service.listNews({
      page: 1,
      limit: 10,
      category: NewsCategory.FUNDING_MILESTONE,
    });
    expect(listFunding.total).toBe(1);
    expect(listFunding.items[0].slug).toBe('funding-two');

    const listSearch = await service.listNews({
      page: 1,
      limit: 10,
      search: 'Announcement',
    });
    expect(listSearch.total).toBe(1);
    expect(listSearch.items[0].slug).toBe('announcement-one');
  });

  it('enforces record-level authorization on updates', async () => {
    const created = await service.createNews(
      {
        slug: 'editor-exclusive-article',
        category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
        sourceAttribution: 'Editor Dept',
        headline: 'Exclusive Article Headline',
        summary: 'Exclusive summary description.',
        content: 'Exclusive content body.',
      },
      editorUser,
    );

    // Other editor cannot update article authored by editorUser
    await expect(
      service.updateNews(
        created.id,
        { headline: 'Hacked Headline' },
        otherEditor,
      ),
    ).rejects.toThrow(ForbiddenException);

    // Super Admin CAN update article authored by any user
    const updatedByAdmin = await service.updateNews(
      created.id,
      { headline: 'Admin Approved Revision' },
      adminUser,
    );
    expect(updatedByAdmin.translations[0].headline).toBe('Admin Approved Revision');
  });

  it('transitions state to IN_REVIEW when submitted for review', async () => {
    const created = await service.createNews(
      {
        slug: 'review-submission-test',
        category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
        sourceAttribution: 'AIC-ADT',
        headline: 'Review Ready Announcement',
        summary: 'Ready for peer review.',
        content: 'Content ready.',
      },
      editorUser,
    );

    const submitted = await service.submitForReview(created.id, 'en', editorUser);
    expect(submitted.translations[0].status).toBe(ContentStatus.IN_REVIEW);

    // Cannot submit again once already in review
    await expect(
      service.submitForReview(created.id, 'en', editorUser),
    ).rejects.toThrow(BadRequestException);
  });

  it('supports archiving and restoring content workflows', async () => {
    const created = await service.createNews(
      {
        slug: 'archive-test',
        category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
        sourceAttribution: 'AIC-ADT',
        headline: 'Article to Archive',
        summary: 'Summary to archive.',
        content: 'Body.',
      },
      editorUser,
    );

    const archived = await service.archiveNews(created.id, 'en', adminUser);
    expect(archived.translations[0].status).toBe(ContentStatus.ARCHIVED);

    const restored = await service.restoreNews(created.id, 'en', adminUser);
    expect(restored.translations[0].status).toBe(ContentStatus.DRAFT);
  });
});
