import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../database/prisma.service.js';
import { AppLoggerService } from '../../common/logger/app-logger.service.js';
import { AuthenticatedUser, Role } from '../../auth/auth.types.js';
import { CreateNewsDto } from '../dto/create-news.dto.js';
import { UpdateNewsDto } from '../dto/update-news.dto.js';
import { QueryNewsDto } from '../dto/query-news.dto.js';
import {
  NewsArticleResponseDto,
  PaginatedNewsResponseDto,
} from '../dto/news-response.dto.js';
import { ContentStatus, NewsCategory } from '@prisma/client';
import {
  ALLOWED_NEWS_SORT_FIELDS,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '../content.constants.js';

interface InMemoryArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  publishDate: Date;
  sourceAttribution: string;
  externalPressLink?: string | null;
  thumbnailAssetId?: string | null;
  currentVersion: number;
  authorId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  translations: Map<string, InMemoryTranslation>;
}

interface InMemoryTranslation {
  id: string;
  articleId: string;
  locale: string;
  headline: string;
  summary: string;
  content: unknown;
  tags: string[];
  keyFacts?: Array<{ label: string; value: string }>;
  status: ContentStatus;
  publishedAt?: Date | null;
  archivedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class NewsService {
  private readonly logger = new AppLoggerService('NewsService');
  private readonly memoryArticles = new Map<string, InMemoryArticle>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Paginated listing with search, category/status filters, and allowlisted sorting.
   */
  async listNews(query: QueryNewsDto): Promise<PaginatedNewsResponseDto> {
    const page = query.page || DEFAULT_PAGE;
    const limit = query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;
    const locale = query.locale || 'en';
    const sortBy = ALLOWED_NEWS_SORT_FIELDS.includes(query.sortBy as any)
      ? (query.sortBy as string)
      : 'publishDate';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

    try {
      if (this.prisma.connected) {
        const where: any = {};

        if (query.category) {
          where.category = query.category;
        }

        if (query.status) {
          where.translations = {
            some: {
              locale,
              status: query.status,
            },
          };
        }

        if (query.search) {
          const searchLower = query.search.trim();
          where.OR = [
            { slug: { contains: searchLower, mode: 'insensitive' } },
            { sourceAttribution: { contains: searchLower, mode: 'insensitive' } },
            {
              translations: {
                some: {
                  locale,
                  OR: [
                    { headline: { contains: searchLower, mode: 'insensitive' } },
                    { summary: { contains: searchLower, mode: 'insensitive' } },
                  ],
                },
              },
            },
          ];
        }

        const [articles, total] = await Promise.all([
          this.prisma.newsArticle.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: {
              translations: true,
              author: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
          }),
          this.prisma.newsArticle.count({ where }),
        ]);

        return {
          items: articles.map((a) => this.mapToResponse(a)),
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        };
      }
    } catch (err) {
      this.logger.warn(
        `Database query failed in listNews, falling back to memory store: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    // In-Memory Fallback
    let items = Array.from(this.memoryArticles.values());

    if (query.category) {
      items = items.filter((a) => a.category === query.category);
    }

    if (query.status) {
      items = items.filter((a) => {
        const tr = a.translations.get(locale);
        return tr && tr.status === query.status;
      });
    }

    if (query.search) {
      const q = query.search.toLowerCase();
      items = items.filter((a) => {
        const tr = a.translations.get(locale);
        return (
          a.slug.toLowerCase().includes(q) ||
          a.sourceAttribution.toLowerCase().includes(q) ||
          (tr && (tr.headline.toLowerCase().includes(q) || tr.summary.toLowerCase().includes(q)))
        );
      });
    }

    items.sort((a, b) => {
      const fieldA = (a as any)[sortBy];
      const fieldB = (b as any)[sortBy];
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const total = items.length;
    const paginated = items.slice(skip, skip + limit);

    return {
      items: paginated.map((a) => this.mapInMemoryToResponse(a)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  /**
   * Detail retrieval by unique identifier.
   */
  async getNewsById(id: string): Promise<NewsArticleResponseDto> {
    try {
      if (this.prisma.connected) {
        const article = await this.prisma.newsArticle.findUnique({
          where: { id },
          include: {
            translations: true,
            author: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });

        if (article) {
          return this.mapToResponse(article);
        }
      }
    } catch (err) {
      this.logger.warn(
        `Database query failed in getNewsById, checking memory: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    const mem = this.memoryArticles.get(id);
    if (!mem) {
      throw new NotFoundException(`News article with ID "${id}" was not found.`);
    }

    return this.mapInMemoryToResponse(mem);
  }

  /**
   * Detail retrieval by canonical slug.
   */
  async getNewsBySlug(slug: string): Promise<NewsArticleResponseDto> {
    try {
      if (this.prisma.connected) {
        const article = await this.prisma.newsArticle.findUnique({
          where: { slug },
          include: {
            translations: true,
            author: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });

        if (article) {
          return this.mapToResponse(article);
        }
      }
    } catch (err) {
      this.logger.warn(
        `Database query failed in getNewsBySlug, checking memory: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    const mem = Array.from(this.memoryArticles.values()).find((a) => a.slug === slug);
    if (!mem) {
      throw new NotFoundException(`News article with slug "${slug}" was not found.`);
    }

    return this.mapInMemoryToResponse(mem);
  }

  /**
   * Creates a draft news article and initial translation.
   * Enforces slug uniqueness and records audit event.
   */
  async createNews(
    dto: CreateNewsDto,
    user: AuthenticatedUser,
  ): Promise<NewsArticleResponseDto> {
    const locale = dto.locale || 'en';
    const publishDate = dto.publishDate ? new Date(dto.publishDate) : new Date();

    // 1. Verify slug uniqueness
    await this.ensureUniqueSlug(dto.slug);

    const articleId = randomUUID();
    const translationId = randomUUID();
    const now = new Date();

    try {
      if (this.prisma.connected) {
        const created = await this.prisma.$transaction(async (tx) => {
          const article = await tx.newsArticle.create({
            data: {
              id: articleId,
              slug: dto.slug,
              category: dto.category,
              publishDate,
              sourceAttribution: dto.sourceAttribution,
              externalPressLink: dto.externalPressLink,
              authorId: user.id,
              translations: {
                create: {
                  id: translationId,
                  locale,
                  headline: dto.headline,
                  summary: dto.summary,
                  content: dto.content as any,
                  tags: dto.tags || [],
                  keyFacts: dto.keyFacts as any,
                  status: ContentStatus.DRAFT,
                },
              },
            },
            include: {
              translations: true,
              author: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
          });

          // Record audit log
          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'NEWS_CREATED',
              resource: 'NEWS_ARTICLE',
              resourceId: article.id,
              metadata: {
                slug: dto.slug,
                locale,
                headline: dto.headline,
              },
            },
          });

          return article;
        });

        return this.mapToResponse(created);
      }
    } catch (err: unknown) {
      if (err instanceof ConflictException) throw err;
      this.logger.warn(
        `Failed to persist news to database, falling back to memory store: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    // In-memory fallback
    const memArticle: InMemoryArticle = {
      id: articleId,
      slug: dto.slug,
      category: dto.category,
      publishDate,
      sourceAttribution: dto.sourceAttribution,
      externalPressLink: dto.externalPressLink,
      currentVersion: 1,
      authorId: user.id,
      createdAt: now,
      updatedAt: now,
      translations: new Map<string, InMemoryTranslation>(),
    };

    memArticle.translations.set(locale, {
      id: translationId,
      articleId,
      locale,
      headline: dto.headline,
      summary: dto.summary,
      content: dto.content,
      tags: dto.tags || [],
      keyFacts: dto.keyFacts,
      status: ContentStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    });

    this.memoryArticles.set(articleId, memArticle);
    return this.mapInMemoryToResponse(memArticle);
  }

  /**
   * Updates an existing news article.
   * Enforces record-level authorization and unique slug checks.
   * Direct status modification is strictly barred.
   */
  async updateNews(
    id: string,
    dto: UpdateNewsDto,
    user: AuthenticatedUser,
  ): Promise<NewsArticleResponseDto> {
    const existing = await this.getNewsById(id);
    const locale = dto.locale || 'en';

    // Record-level authorization
    this.enforceRecordAuthorization(existing, user);

    // If slug is changed, verify uniqueness
    if (dto.slug && dto.slug !== existing.slug) {
      await this.ensureUniqueSlug(dto.slug, id);
    }

    const now = new Date();

    try {
      if (this.prisma.connected) {
        const updated = await this.prisma.$transaction(async (tx) => {
          const article = await tx.newsArticle.update({
            where: { id },
            data: {
              slug: dto.slug,
              category: dto.category,
              publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
              sourceAttribution: dto.sourceAttribution,
              externalPressLink: dto.externalPressLink,
              currentVersion: { increment: 1 },
              translations: {
                upsert: {
                  where: {
                    uq_news_translations_locale: {
                      articleId: id,
                      locale,
                    },
                  },
                  create: {
                    locale,
                    headline: dto.headline || 'Untitled Announcement',
                    summary: dto.summary || '',
                    content: (dto.content as any) || [],
                    tags: dto.tags || [],
                    keyFacts: dto.keyFacts as any,
                    status: ContentStatus.DRAFT,
                  },
                  update: {
                    headline: dto.headline,
                    summary: dto.summary,
                    content: dto.content as any,
                    tags: dto.tags,
                    keyFacts: dto.keyFacts as any,
                  },
                },
              },
            },
            include: {
              translations: true,
              author: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'NEWS_UPDATED',
              resource: 'NEWS_ARTICLE',
              resourceId: id,
              metadata: {
                locale,
                headline: dto.headline,
              },
            },
          });

          return article;
        });

        return this.mapToResponse(updated);
      }
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      this.logger.warn(
        `Failed to update news in database, using memory store: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    // In-memory fallback
    const mem = this.memoryArticles.get(id);
    if (!mem) throw new NotFoundException(`News article "${id}" not found.`);

    if (dto.slug) mem.slug = dto.slug;
    if (dto.category) mem.category = dto.category;
    if (dto.publishDate) mem.publishDate = new Date(dto.publishDate);
    if (dto.sourceAttribution) mem.sourceAttribution = dto.sourceAttribution;
    if (dto.externalPressLink !== undefined) mem.externalPressLink = dto.externalPressLink;
    mem.currentVersion += 1;
    mem.updatedAt = now;

    let tr = mem.translations.get(locale);
    if (!tr) {
      tr = {
        id: randomUUID(),
        articleId: id,
        locale,
        headline: dto.headline || 'Untitled Announcement',
        summary: dto.summary || '',
        content: dto.content || [],
        tags: dto.tags || [],
        keyFacts: dto.keyFacts,
        status: ContentStatus.DRAFT,
        createdAt: now,
        updatedAt: now,
      };
      mem.translations.set(locale, tr);
    } else {
      if (dto.headline) tr.headline = dto.headline;
      if (dto.summary) tr.summary = dto.summary;
      if (dto.content !== undefined) tr.content = dto.content;
      if (dto.tags) tr.tags = dto.tags;
      if (dto.keyFacts) tr.keyFacts = dto.keyFacts;
      tr.updatedAt = now;
    }

    return this.mapInMemoryToResponse(mem);
  }

  /**
   * Submits a draft news article for editorial review.
   * State transitions strictly from DRAFT -> IN_REVIEW.
   */
  async submitForReview(
    id: string,
    locale: string = 'en',
    user: AuthenticatedUser,
  ): Promise<NewsArticleResponseDto> {
    const article = await this.getNewsById(id);
    const translation = article.translations.find((t) => t.locale === locale);

    if (!translation) {
      throw new NotFoundException(`Translation for locale "${locale}" not found on article "${id}".`);
    }

    if (translation.status !== ContentStatus.DRAFT) {
      throw new BadRequestException(
        `Cannot submit for review: current status is "${translation.status}". Only DRAFT items may be submitted.`,
      );
    }

    // Verify required fields
    if (!translation.headline || !translation.summary) {
      throw new BadRequestException(
        'Cannot submit for review: headline and summary are required before review submission.',
      );
    }

    try {
      if (this.prisma.connected) {
        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.newsTranslation.update({
            where: {
              uq_news_translations_locale: {
                articleId: id,
                locale,
              },
            },
            data: {
              status: ContentStatus.IN_REVIEW,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'NEWS_SUBMITTED_FOR_REVIEW',
              resource: 'NEWS_ARTICLE',
              resourceId: id,
              metadata: {
                locale,
                headline: translation.headline,
              },
            },
          });

          return tx.newsArticle.findUnique({
            where: { id },
            include: {
              translations: true,
              author: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                },
              },
            },
          });
        });

        if (updated) return this.mapToResponse(updated);
      }
    } catch (err) {
      this.logger.warn(
        `Failed to submit for review in DB: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    // In-memory fallback
    const mem = this.memoryArticles.get(id);
    if (!mem) throw new NotFoundException(`News article "${id}" not found.`);
    const memTr = mem.translations.get(locale);
    if (memTr) {
      memTr.status = ContentStatus.IN_REVIEW;
      memTr.updatedAt = new Date();
    }

    return this.mapInMemoryToResponse(mem);
  }

  /**
   * Archives a news article translation.
   */
  async archiveNews(
    id: string,
    locale: string = 'en',
    user: AuthenticatedUser,
  ): Promise<NewsArticleResponseDto> {
    const article = await this.getNewsById(id);
    const translation = article.translations.find((t) => t.locale === locale);

    if (!translation) {
      throw new NotFoundException(`Translation for locale "${locale}" not found.`);
    }

    const now = new Date();

    try {
      if (this.prisma.connected) {
        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.newsTranslation.update({
            where: {
              uq_news_translations_locale: {
                articleId: id,
                locale,
              },
            },
            data: {
              status: ContentStatus.ARCHIVED,
              archivedAt: now,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'NEWS_ARCHIVED',
              resource: 'NEWS_ARTICLE',
              resourceId: id,
              metadata: { locale },
            },
          });

          return tx.newsArticle.findUnique({
            where: { id },
            include: { translations: true, author: true },
          });
        });

        if (updated) return this.mapToResponse(updated);
      }
    } catch (err) {
      this.logger.warn(
        `Failed to archive in DB: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    const mem = this.memoryArticles.get(id);
    if (!mem) throw new NotFoundException(`News article "${id}" not found.`);
    const memTr = mem.translations.get(locale);
    if (memTr) {
      memTr.status = ContentStatus.ARCHIVED;
      memTr.archivedAt = now;
      memTr.updatedAt = now;
    }

    return this.mapInMemoryToResponse(mem);
  }

  /**
   * Restores an archived news article translation back to DRAFT.
   */
  async restoreNews(
    id: string,
    locale: string = 'en',
    user: AuthenticatedUser,
  ): Promise<NewsArticleResponseDto> {
    const article = await this.getNewsById(id);
    const translation = article.translations.find((t) => t.locale === locale);

    if (!translation) {
      throw new NotFoundException(`Translation for locale "${locale}" not found.`);
    }

    if (translation.status !== ContentStatus.ARCHIVED) {
      throw new BadRequestException('Only ARCHIVED items can be restored to DRAFT.');
    }

    const now = new Date();

    try {
      if (this.prisma.connected) {
        const updated = await this.prisma.$transaction(async (tx) => {
          await tx.newsTranslation.update({
            where: {
              uq_news_translations_locale: {
                articleId: id,
                locale,
              },
            },
            data: {
              status: ContentStatus.DRAFT,
              archivedAt: null,
            },
          });

          await tx.auditLog.create({
            data: {
              userId: user.id,
              action: 'NEWS_RESTORED',
              resource: 'NEWS_ARTICLE',
              resourceId: id,
              metadata: { locale },
            },
          });

          return tx.newsArticle.findUnique({
            where: { id },
            include: { translations: true, author: true },
          });
        });

        if (updated) return this.mapToResponse(updated);
      }
    } catch (err) {
      this.logger.warn(
        `Failed to restore in DB: ${err instanceof Error ? err.message : 'Unknown'}`,
        'NewsService',
      );
    }

    const mem = this.memoryArticles.get(id);
    if (!mem) throw new NotFoundException(`News article "${id}" not found.`);
    const memTr = mem.translations.get(locale);
    if (memTr) {
      memTr.status = ContentStatus.DRAFT;
      memTr.archivedAt = null;
      memTr.updatedAt = now;
    }

    return this.mapInMemoryToResponse(mem);
  }

  // --------------------------------------------------------------------------
  // Private Helper Methods
  // --------------------------------------------------------------------------

  private async ensureUniqueSlug(slug: string, excludeId?: string): Promise<void> {
    try {
      if (this.prisma.connected) {
        const existing = await this.prisma.newsArticle.findUnique({
          where: { slug },
          select: { id: true },
        });

        if (existing && existing.id !== excludeId) {
          throw new ConflictException(`A news article with slug "${slug}" already exists.`);
        }
      }
    } catch (err) {
      if (err instanceof ConflictException) throw err;
    }

    for (const [id, article] of this.memoryArticles.entries()) {
      if (article.slug === slug && id !== excludeId) {
        throw new ConflictException(`A news article with slug "${slug}" already exists.`);
      }
    }
  }

  private enforceRecordAuthorization(
    article: NewsArticleResponseDto,
    user: AuthenticatedUser,
  ): void {
    const isSuperAdmin = user.role === Role.ADMIN;
    const isApprover = user.role === Role.APPROVER;

    if (isSuperAdmin || isApprover) {
      return; // Permitted to edit within administrative scope
    }

    // Normal editor check
    if (article.authorId && article.authorId !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to modify news articles authored by another user.',
      );
    }
  }

  private mapToResponse(article: any): NewsArticleResponseDto {
    return {
      id: article.id,
      slug: article.slug,
      category: article.category,
      publishDate: article.publishDate.toISOString(),
      sourceAttribution: article.sourceAttribution,
      externalPressLink: article.externalPressLink,
      thumbnailAssetId: article.thumbnailAssetId,
      currentVersion: article.currentVersion,
      authorId: article.authorId,
      author: article.author
        ? {
            id: article.author.id,
            fullName: article.author.fullName,
            email: article.author.email,
          }
        : null,
      translations: (article.translations || []).map((t: any) => ({
        id: t.id,
        locale: t.locale,
        headline: t.headline,
        summary: t.summary,
        content: t.content,
        tags: t.tags || [],
        keyFacts: t.keyFacts || undefined,
        status: t.status,
        publishedAt: t.publishedAt?.toISOString() || null,
        archivedAt: t.archivedAt?.toISOString() || null,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
  }

  private mapInMemoryToResponse(article: InMemoryArticle): NewsArticleResponseDto {
    return {
      id: article.id,
      slug: article.slug,
      category: article.category,
      publishDate: article.publishDate.toISOString(),
      sourceAttribution: article.sourceAttribution,
      externalPressLink: article.externalPressLink,
      thumbnailAssetId: article.thumbnailAssetId,
      currentVersion: article.currentVersion,
      authorId: article.authorId,
      author: null,
      translations: Array.from(article.translations.values()).map((t) => ({
        id: t.id,
        locale: t.locale,
        headline: t.headline,
        summary: t.summary,
        content: t.content,
        tags: t.tags,
        keyFacts: t.keyFacts,
        status: t.status,
        publishedAt: t.publishedAt?.toISOString() || null,
        archivedAt: t.archivedAt?.toISOString() || null,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      })),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
  }
}
