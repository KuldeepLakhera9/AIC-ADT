import { ContentStatus, NewsCategory } from '@prisma/client';

export class NewsTranslationResponseDto {
  id: string;
  locale: string;
  headline: string;
  summary: string;
  content: unknown;
  tags: string[];
  keyFacts?: Array<{ label: string; value: string }>;
  status: ContentStatus;
  publishedAt?: string | null;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export class NewsArticleResponseDto {
  id: string;
  slug: string;
  category: NewsCategory;
  publishDate: string;
  sourceAttribution: string;
  externalPressLink?: string | null;
  thumbnailAssetId?: string | null;
  currentVersion: number;
  authorId?: string | null;
  author?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  translations: NewsTranslationResponseDto[];
  createdAt: string;
  updatedAt: string;
}

export class PaginatedNewsResponseDto {
  items: NewsArticleResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
