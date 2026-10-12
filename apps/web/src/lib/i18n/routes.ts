/**
 * AIC-ADT Baramati Foundation — Bilingual Route Resolution Helpers
 * Implements 1-to-1 symmetric URL mirroring between English (/) and Marathi (/mr/*).
 */

import { Locale, DEFAULT_LOCALE } from "./config";

/**
 * Extracts active locale from the pathname.
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/mr" || pathname.startsWith("/mr/")) {
    return "mr";
  }
  return DEFAULT_LOCALE;
}

/**
 * Strips the /mr prefix to normalize to the canonical English path.
 */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/mr") return "/";
  if (pathname.startsWith("/mr/")) {
    const stripped = pathname.replace(/^\/mr/, "");
    return stripped.startsWith("/") ? stripped : `/${stripped}`;
  }
  return pathname;
}

/**
 * Computes the symmetric mirrored equivalent path for the target language.
 */
export function getEquivalentPath(
  pathname: string,
  targetLocale: Locale,
): string {
  const normalized = stripLocalePrefix(pathname);

  if (targetLocale === "en") {
    return normalized;
  }

  // targetLocale is "mr"
  if (normalized === "/") {
    return "/mr";
  }

  // Check if direct route is supported
  if (SUPPORTED_MARATHI_ROUTES.includes(normalized)) {
    return `/mr${normalized}`;
  }

  // Gracefully fallback to parent pillar if present (e.g., /about/governance -> /mr/about)
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length > 1) {
    const parent = `/${segments[0]}`;
    if (SUPPORTED_MARATHI_ROUTES.includes(parent)) {
      return `/mr${parent}`;
    }
  }

  return "/mr";
}

/**
 * Returns canonical canonical absolute URL for SEO tags.
 */
export function getLocalizedCanonical(
  pathname: string,
  locale: Locale,
): string {
  const baseUrl = "https://aicadtbaramatifoundation.org";
  const equivalent = getEquivalentPath(pathname, locale);
  return `${baseUrl}${equivalent === "/" ? "" : equivalent}`;
}

/**
 * Supported core routes with dedicated verified Marathi pages.
 */
export const SUPPORTED_MARATHI_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/startups",
  "/innovation",
  "/events",
  "/resources",
  "/contact",
];

/**
 * Checks if the given path has an approved dedicated Marathi translation page.
 */
export function isMarathiRouteSupported(pathname: string): boolean {
  const normalized = stripLocalePrefix(pathname);
  return SUPPORTED_MARATHI_ROUTES.includes(normalized);
}
