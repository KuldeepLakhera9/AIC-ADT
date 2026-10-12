import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NewsController } from './news.controller.js';
import { NewsService } from '../services/news.service.js';
import { AuthUserDto } from '../../auth/dto/auth-user.dto.js';
import { Role } from '@prisma/client';
import { Permission } from '../../auth/auth.types.js';
import { NewsCategory, ContentStatus } from '@prisma/client';

describe('NewsController', () => {
  let controller: NewsController;
  let serviceMock: Partial<NewsService>;

  const mockUser: AuthUserDto = {
    id: 'user-1',
    email: 'editor@aic-adt.org',
    fullName: 'Test Editor',
    role: Role.CONTENT_EDITOR,
    status: 'ACTIVE',
    permissions: [
      Permission.CONTENT_READ,
      Permission.CONTENT_CREATE,
      Permission.CONTENT_UPDATE,
      Permission.CONTENT_SUBMIT_REVIEW,
    ],
  };

  const sampleArticle = {
    id: 'news-uuid-1',
    slug: 'sample-news-slug',
    category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
    publishDate: new Date().toISOString(),
    sourceAttribution: 'AIC-ADT Press Office',
    currentVersion: 1,
    translations: [
      {
        id: 'trans-uuid-1',
        locale: 'en',
        headline: 'Sample Headline',
        summary: 'Sample Summary',
        content: 'Body content',
        tags: ['Gov'],
        status: ContentStatus.DRAFT,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    serviceMock = {
      listNews: vi.fn().mockResolvedValue({
        items: [sampleArticle],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      }),
      getNewsById: vi.fn().mockResolvedValue(sampleArticle),
      createNews: vi.fn().mockResolvedValue(sampleArticle),
      updateNews: vi.fn().mockResolvedValue(sampleArticle),
      submitForReview: vi.fn().mockResolvedValue({
        ...sampleArticle,
        translations: [
          {
            ...sampleArticle.translations[0],
            status: ContentStatus.IN_REVIEW,
          },
        ],
      }),
      archiveNews: vi.fn().mockResolvedValue({
        ...sampleArticle,
        translations: [
          {
            ...sampleArticle.translations[0],
            status: ContentStatus.ARCHIVED,
          },
        ],
      }),
      restoreNews: vi.fn().mockResolvedValue(sampleArticle),
    };

    controller = new NewsController(serviceMock as NewsService);
  });

  it('delegates listing to newsService with query parameters', async () => {
    const result = await controller.listNews({ page: 1, limit: 10 });
    expect(serviceMock.listNews).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(result.total).toBe(1);
    expect(result.items[0].slug).toBe('sample-news-slug');
  });

  it('delegates creation to newsService with DTO and current user', async () => {
    const dto = {
      slug: 'sample-news-slug',
      category: NewsCategory.OFFICIAL_ANNOUNCEMENT,
      sourceAttribution: 'AIC-ADT Press Office',
      headline: 'Sample Headline',
      summary: 'Sample Summary',
      content: 'Body content',
    };

    const result = await controller.createNews(dto, mockUser);
    expect(serviceMock.createNews).toHaveBeenCalledWith(dto, mockUser);
    expect(result.id).toBe('news-uuid-1');
  });

  it('delegates review submission to newsService', async () => {
    const result = await controller.submitForReview('news-uuid-1', 'en', mockUser);
    expect(serviceMock.submitForReview).toHaveBeenCalledWith('news-uuid-1', 'en', mockUser);
    expect(result.translations[0].status).toBe(ContentStatus.IN_REVIEW);
  });
});
