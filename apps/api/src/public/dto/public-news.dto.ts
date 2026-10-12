export interface PublicNewsArticleDto {
  id: string;
  slug: string;
  headline: string;
  summary: string;
  content: unknown;
  category: string;
  publishDate: string;
  sourceAttribution: string;
  externalPressLink: string | null;
  thumbnailAssetId: string | null;
  tags: string[];
  keyFacts?: Array<{ label: string; value: string }>;
  locale: string;
  isAvailableInLocale: boolean;
}

export interface PaginatedPublicNewsDto {
  data: PublicNewsArticleDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
