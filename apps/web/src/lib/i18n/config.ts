/**
 * AIC-ADT Baramati Foundation — Localization Configuration
 * Source of truth: docs/requirements/sitemap.md, docs/design/design-decisions.md (DEC-APP-04),
 * and docs/requirements/functional-requirements.md (FR-PUB-07)
 */

export type Locale = "en" | "mr";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Locale[] = ["en", "mr"];

export interface LocaleMeta {
  code: Locale;
  label: string;
  nativeName: string;
  direction: "ltr";
  htmlLang: string;
  fontFamily: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    label: "English",
    nativeName: "English",
    direction: "ltr",
    htmlLang: "en-IN",
    fontFamily: "var(--font-inter), sans-serif",
  },
  mr: {
    code: "mr",
    label: "Marathi",
    nativeName: "मराठी",
    direction: "ltr",
    htmlLang: "mr-IN",
    fontFamily: "var(--font-devanagari), var(--font-inter), sans-serif",
  },
};
