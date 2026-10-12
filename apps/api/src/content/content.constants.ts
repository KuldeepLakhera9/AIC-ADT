export const ALLOWED_NEWS_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'publishDate',
  'slug',
] as const;

export type AllowedNewsSortField = (typeof ALLOWED_NEWS_SORT_FIELDS)[number];

export const ALLOWED_EVENT_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'startDate',
  'endDate',
  'slug',
] as const;

export type AllowedEventSortField = (typeof ALLOWED_EVENT_SORT_FIELDS)[number];

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;

export const SUPPORTED_LOCALES = ['en', 'mr'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
