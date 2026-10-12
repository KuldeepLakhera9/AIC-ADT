export const SUPPORTED_PUBLIC_LOCALES = ['en', 'mr'] as const;
export type SupportedPublicLocale = (typeof SUPPORTED_PUBLIC_LOCALES)[number];

export const DEFAULT_PUBLIC_PAGE = 1;
export const DEFAULT_PUBLIC_LIMIT = 10;
export const MAX_PUBLIC_LIMIT = 50;

export const PUBLIC_CACHE_CONTROL_HEADER = 'public, max-age=60, s-maxage=300, stale-while-revalidate=600';
