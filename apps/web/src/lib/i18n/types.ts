/**
 * AIC-ADT Baramati Foundation — Translation Dictionary Type Definition
 * Ensures 100% type safety and parity between English and Marathi dictionaries.
 */

export interface NavTranslations {
  about: string;
  programs: string;
  startups: string;
  innovation: string;
  impact: string;
  events: string;
  resources: string;
  contact: string;
  applyButton: string;
  helplineLabel: string;
  governingApex: string;
}

export interface CommonTranslations {
  applyNow: string;
  explorePrograms: string;
  bookLabTesting: string;
  learnMore: string;
  viewDetails: string;
  downloadDocument: string;
  requestDocument: string;
  all: string;
  upcoming: string;
  concluded: string;
  active: string;
  search: string;
  searchPlaceholder: string;
  clearFilters: string;
  resetFilters: string;
  back: string;
  close: string;
  loading: string;
  readMore: string;
  share: string;
  category: string;
  venue: string;
  date: string;
  organizer: string;
}

export interface FooterTranslations {
  tagline: string;
  campusHeadquarters: string;
  officialLandline: string;
  incubationHelpline: string;
  primaryEmail: string;
  incubationHours: string;
  copyright: string;
  mandateNotice: string;
  privacyPolicy: string;
  termsOfUse: string;
  rtiDisclosures: string;
  transitGuide: string;
}

export interface BreadcrumbTranslations {
  home: string;
  about: string;
  programs: string;
  startups: string;
  innovation: string;
  events: string;
  resources: string;
  contact: string;
  news: string;
}

export interface AccessibilityTranslations {
  skipToMain: string;
  languageOptions: string;
  switchToEnglish: string;
  switchToMarathi: string;
  openMenu: string;
  closeMenu: string;
  breadcrumbsNav: string;
  searchResultsStatus: string;
}

export interface ErrorTranslations {
  notFoundTitle: string;
  notFoundMessage: string;
  returnHome: string;
  contactSupport: string;
  popularSections: string;
}

export interface EmptyStateTranslations {
  noResultsTitle: string;
  noResultsMessage: string;
  resetAction: string;
}

export interface AdvisoryTranslations {
  marathiReviewNotice: string;
  marathiReviewDetail: string;
  authoritativeNotice: string;
}

export interface HomeTranslations {
  overline: string;
  headline: string;
  body: string;
  credentials: string[];
  pillarScience: { title: string; desc: string };
  pillarFunding: { title: string; desc: string };
  pillarMentors: { title: string; desc: string };
}

export interface TranslationDictionary {
  locale: "en" | "mr";
  nav: NavTranslations;
  common: CommonTranslations;
  footer: FooterTranslations;
  breadcrumbs: BreadcrumbTranslations;
  a11y: AccessibilityTranslations;
  errors: ErrorTranslations;
  emptyState: EmptyStateTranslations;
  advisory: AdvisoryTranslations;
  home: HomeTranslations;
}
