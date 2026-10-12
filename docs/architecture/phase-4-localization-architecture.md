# Phase 4 — Localization Architecture & Bilingual Readiness Specification

**Document Version:** 1.0  
**Phase:** Phase 4 — Production Frontend Implementation  
**Task:** Task 7 — English and Marathi Localization Readiness  
**Target Entity:** AIC-ADT Baramati Foundation  
**Canonical Domain:** `https://aicadtbaramatifoundation.org`  
**Supported Locales:** `en` (English, default), `mr` (मराठी — Marathi)  

---

## 1. Architectural Strategy & Decision Records

### A. Evaluated Frameworks vs. Native Next.js Approach (DEC-APP-04)
Prior to implementation, the technical stack was audited to choose the localization approach:
- **Next.js Version**: Next.js 16.1.6 (App Router with React 19).
- **Evaluated Third-Party Libraries**: `next-intl`, `react-i18next`, `lingui`.
- **Architectural Decision**: **Native App Router Typed Dictionaries with Mirrored Subtree (`/mr/*`)**.
  - **Rationale**: Next.js App Router already provides first-class support for route segments and server components. Adding heavyweight client-side runtime translation frameworks would bloat client bundles, introduce client/server dehydration mismatches, and degrade Core Web Vitals (LCP, INP).
  - **Zero Global String Replacement**: We strictly avoid fragile DOM string replacement, client-side automated machine translation scripts (e.g. Google Translate widgets), or regex DOM parsers.

### B. URL Routing & Canonical Mirroring Strategy
The AIC-ADT sitemap (`docs/requirements/sitemap.md`) and design decisions (`DEC-APP-04`) mandate a 1-to-1 symmetric URL mirroring strategy:
1. **Canonical English Routes**: Unprefixed paths serve English content (`/`, `/about`, `/programs`, `/startups`, `/innovation`, `/events`, `/resources`, `/contact`).
2. **Mirrored Marathi Routes**: Prefixed with `/mr` (`/mr`, `/mr/about`, `/mr/programs`, `/mr/startups`, `/mr/innovation`, `/mr/events`, `/mr/resources`, `/mr/contact`).
3. **Route Normalization & Fallbacks**:
   - `getLocaleFromPath(pathname)` detects active language.
   - `stripLocalePrefix(pathname)` strips `/mr` to obtain the canonical English route.
   - `getEquivalentPath(pathname, targetLocale)` calculates the exact mirrored route. If a deeply nested English sub-page does not yet have a dedicated Marathi counterpart, the function gracefully falls back to the nearest parent pillar (e.g., `/contact/directions` -> `/mr/contact`).
4. **SEO & Canonical Integrity**:
   - Each English and Marathi page emits appropriate `lang` attributes (`lang="en"` or `lang="mr"`).
   - `getLocalizedCanonical(pathname, locale)` ensures canonical tags and alternate language tags prevent duplicate content penalties.

---

## 2. Decoupled Translation Dictionary Architecture

UI strings are separated into strongly typed dictionaries located in `apps/web/src/lib/i18n/`:

```
apps/web/src/lib/i18n/
├── config.ts              # Locale types, supported languages, font variables
├── routes.ts              # Path stripping, route equivalence, canonical URL helpers
├── types.ts               # TranslationDictionary TypeScript contract
├── getDictionary.ts       # Type-safe dictionary resolver
└── dictionaries/
    ├── en.ts              # Master English UI dictionary
    └── mr.ts              # Approved Marathi UI dictionary
```

### Typed Contract Structure (`TranslationDictionary`)
The dictionary contract guarantees strict parity across languages for:
- **`nav`**: Primary navigation items (`about`, `programs`, `startups`, `innovation`, `events`, `resources`, `contact`, `applyNow`, etc.).
- **`common`**: Reusable interface labels (`learnMore`, `viewAll`, `backToHome`, `filterAll`, `download`, `verified`, `share`, etc.).
- **`breadcrumbs`**: Breadcrumb path labels (`home`, `about`, `programs`, `startups`, etc.).
- **`a11y`**: Screen-reader and ARIA labels (`skipToContent`, `openMenu`, `closeMenu`, `searchPlaceholder`, `externalLink`, `languageSelect`).
- **`footer`**: Footer titles, copyright strings, and statutory disclaimers.
- **`errors`**: Error titles, 404 descriptions, and recovery buttons.
- **`emptyState`**: Empty search states, filter resets, and no-data messages.
- **`advisory`**: Official editorial review and statutory disclaimers for Marathi content.
- **`home`**: Core homepage hero headings, credentials, impact metric labels, and pillar cards.

---

## 3. Marathi Devanagari Typography & Rendering

Devanagari script imposes distinct vertical metrics and glyph combinations (*matras*, *velantis*, *ukars*, and conjunct *jodakshare*) that risk clipping or layout distortion if constrained by standard Latin font assumptions.

### Approved Font Configuration
- **Font Stack**: `Noto Sans Devanagari` (variable font loaded via `next/font/google` as `--font-devanagari`), with fallbacks: `Mukta`, `Kohinoor Devanagari`, `system-ui`, `sans-serif`.
- **Vertical Line Spacing (`line-height`)**: Set to $\ge 1.6$ for all Marathi text (`lang="mr"`, `.font-devanagari`). This prevents top and bottom clipping of high ascender matras (*anusvara*, *matra*) and low descenders (*ukar*).
- **Devanagari Digits & Numerals**: Both international Arabic numerals and Devanagari numerals are supported; official statutory metrics display standard numbers with Marathi denomination words (e.g. "₹५.२ कोटी+", "३५,०००+ शेतकरी").
- **Header & Button Overflow Protection**: Marathi text typically expands by 15% to 30% relative to English equivalents. All navigation links, buttons, and grid headers utilize flex wrapping, min-height allocations, and auto-hyphenation where appropriate.

---

## 4. Language Selector Implementation (`LanguageSelector.tsx`)

The website includes a dedicated, accessible `LanguageSelector` client component rendered in:
1. **Desktop Utility Topbar**: Placed alongside official helpline numbers and government logos.
2. **Mobile Drawer**: Placed prominently at the top of the mobile navigation panel.

### Selector Capabilities
- **Direct Visual Indicator**: Clearly highlights the active language (`EN` vs `मराठी`) with high-contrast badge styling (`bg-[#004B2A] text-white`).
- **Path Preservation**: When on `/programs`, clicking `मराठी` immediately navigates to `/mr/programs`. When on `/mr/about`, clicking `EN` navigates back to `/about`.
- **Fallback Handling**: If on an unmirrored sub-route (e.g. `/events/agri-robotics-demo-day`), switching to Marathi safely navigates to `/mr/events`.
- **Accessibility & Screen Readers**:
  - Encapsulated in `<div role="group" aria-label="Language options">`.
  - Emits `aria-current="true"` on the active language anchor.
  - Descriptive titles (`title="English"`, `title="मराठी भाषेत पहा (View in Marathi)"`).
  - Full keyboard focusability with visible outline ring.

---

## 5. Truthful Content & Statutory Safeguard Policy

In accordance with institutional guidelines:
1. **Zero Invented Translations**: Technical scheme names (e.g. *Startup India Seed Fund Scheme*, *MeitY GENESIS*, *NABL 17025 Accreditation*) preserve official English acronyms and parenthetical notes alongside Devanagari terminology.
2. **Statutory Review Advisory**: Every page under `/mr/*` renders an institutional advisory banner:
   > **📢 अधिकृत सूचना:** ही अधिकृत संकेतस्थळाची मराठी आवृत्ती आहे. काही तांत्रिक व वैधानिक कागदपत्रे संपादकीय पुनरावलोकन प्रक्रियेत आहेत. [View Authoritative English Site →](/)
3. **Legal Supremacy**: All formal contracts, legal terms of service, RTI Section 4(1)(b) declarations, and NABL testing certificates retain English as the governing legal language until translated by certified legal translators.
