# Phase 4 — Public Information, Events, Reports & Contact Architecture Specification

**Document Version:** 1.0  
**Phase:** Phase 4 — Production Frontend Implementation  
**Task:** Task 6 — Public Information, Events, Reports & Contact Pages  
**Target Entity:** AIC-ADT Baramati Foundation  
**Canonical Domain:** `https://aicadtbaramatifoundation.org`  

---

## 1. Executive Summary & Approved Sitemap Alignment

As mandated by the approved Phase 1 sitemap (`docs/requirements/sitemap.md`), Task 6 delivers the public-facing knowledge dissemination, ecosystem engagement, and communication pillars for the **AIC-ADT Baramati Foundation**.

### Core Architecture Tenets
1. **Strict Sitemap Adherence**: Implemented only the canonical routes approved under the 7-pillar information architecture (Events, Resources, News, Contact, and Legal/Policies).
2. **Fact-First Truthfulness**: All displayed event dates, scheme deadlines, publications, and contact numbers derive strictly from certified sources in `docs/audit/content-verification-register.md` and authorized campus records. Zero synthetic deadlines, fake seed grants, or speculative corporate logos have been generated.
3. **No Unbacked Web Forms**: Avoided fake submission banners or mock backend queues. Inquiries provide verified email links with descriptive mailto parameters, direct telephonic helplines, and departmental routing.
4. **Decoupled Data Models**: Structured typed models in `apps/web/src/data/` (`events.ts`, `publications.ts`, `news.ts`, `contact.ts`) isolate content from presentation, ensuring 100% compatibility with future headless CMS integration.

---

## 2. Complete Route Inventory

### A. Events & Masterclasses Pillar
| Route | Component File | Description & Scope |
| :--- | :--- | :--- |
| `/events` | `apps/web/src/app/events/page.tsx` | Master interactive calendar featuring upcoming workshops, intake deadlines, and demo days with accessible client filtering. |
| `/events/[slug]` | `apps/web/src/app/events/[slug]/page.tsx` | Statically generated dynamic event detail page with complete agenda, syllabus, venue format, and official external registration links. |
| `/events/past` | `apps/web/src/app/events/past/page.tsx` | Historical archive of concluded programs (e.g., AARAMBH 2025, DGCA Drone Bootcamp, NABL Soil Chromatography training) with verified trainee outcomes. |

### B. Resources & Publications Pillar
| Route | Component File | Description & Scope |
| :--- | :--- | :--- |
| `/resources` | `apps/web/src/app/resources/page.tsx` | Central Knowledge & Transparency hub highlighting 4 core document pillars and unified search filter client. |
| `/resources/annual-reports` | `apps/web/src/app/resources/annual-reports/page.tsx` | Statutory annual progress reports submitted to Atal Innovation Mission and NITI Aayog with verified sample PDF downloads. |
| `/resources/publications` | `apps/web/src/app/resources/publications/page.tsx` | Applied research whitepapers, smallholder mechanization field surveys, and agricultural policy monographs. |
| `/resources/program-guidelines` | `apps/web/src/app/resources/program-guidelines/page.tsx` | Official operating guidelines, DPIIT SISFS manuals, MeitY GENESIS framework, and incubation agreement terms. |
| `/resources/policies-downloads` | `apps/web/src/app/resources/policies-downloads/page.tsx` | Institutional policies, POSH Internal Complaints Committee, voluntary RTI Section 4(1)(b) disclosures, and vector brand kit. |

### C. News & Official Announcements
| Route | Component File | Description & Scope |
| :--- | :--- | :--- |
| `/news` | `apps/web/src/app/news/page.tsx` | Official press releases and announcements listing with category tabs, search filter, and media protocol. |
| `/news/[slug]` | `apps/web/src/app/news/[slug]/page.tsx` | Editorial announcement detail view with verified source attribution, key facts strip, and external ministerial portal references. |

### D. Contact & Wayfinding Pillar
| Route | Component File | Description & Scope |
| :--- | :--- | :--- |
| `/contact` | `apps/web/src/app/contact/page.tsx` | Official campus headquarters address, verified phone numbers, central triage mailbox, and 4 departmental desks. |
| `/contact/partnerships` | `apps/web/src/app/contact/partnerships/page.tsx` | Specialized intake desk for Section 135 CSR grants, university MoUs, mentor empanelment, and investor demo day coordination. |
| `/contact/directions` | `apps/web/src/app/contact/directions/page.tsx` | Comprehensive transit guide with turn-by-turn arrival instructions from Pune International Airport, Daund Junction, and Baramati Bus Stand, with GPS coordinates. |

### E. Legal & Error State Pages
| Route | Component File | Description & Scope |
| :--- | :--- | :--- |
| `/privacy-policy` | `apps/web/src/app/privacy-policy/page.tsx` | Truthful institutional privacy charter aligned with India's Digital Personal Data Protection (DPDP) Act 2023, data security baseline, and Grievance Officer details. |
| `/terms-of-service` | `apps/web/src/app/terms-of-service/page.tsx` | Official website usage terms, trademark ownership disclaimers (deprecating 'AIC-DBT'), and jurisdiction in Baramati/Pune courts. |
| `/not-found` (404) | `apps/web/src/app/not-found.tsx` | Branded recovery view with direct links across all 7 institutional pillars. |

---

## 3. Data Architecture & Contracts

### 3.1. Events Data Schema (`src/data/events.ts`)
```typescript
export type EventStatus = "Upcoming" | "Registration Closed" | "Concluded";
export type EventCategory =
  | "All"
  | "Intake Deadline"
  | "Technical Workshop"
  | "Field Showcase"
  | "Ecosystem Conclave"
  | "Training Bootcamp";

export interface EventItem {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  category: EventCategory;
  status: EventStatus;
  date: {
    day: string;
    month: string;
    year: string;
    formatted: string;
    time?: string;
  };
  venue: {
    name: string;
    type: "In-Person Campus" | "Online National Portal" | "Hybrid";
    address: string;
    directionsUrl?: string;
  };
  organizer: string;
  targetAudience: string[];
  agendaOrHighlights: string[];
  registration: {
    isAvailable: boolean;
    buttonLabel: string;
    externalUrl?: string;
    fee: string;
    deadline?: string;
    contactEmail: string;
    statusNote: string;
  };
  verifiedSource: string;
}
```

### 3.2. Publications Schema (`src/data/publications.ts`)
```typescript
export type PublicationCategory =
  | "All"
  | "Annual Report"
  | "Research Whitepaper"
  | "Program Guideline"
  | "Policy & Compliance"
  | "Brand Asset";

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  category: PublicationCategory;
  reportingPeriod?: string;
  publishDate: string;
  summary: string;
  keyHighlights: string[];
  issuingAuthority: string;
  verificationBadge: string;
  file: {
    url: string;
    fileName: string;
    fileType: "PDF" | "ZIP";
    fileSize: string;
    isAvailableOnline: boolean;
    pageCount?: number;
  };
  relatedRoute?: string;
}
```

### 3.3. News Schema (`src/data/news.ts`)
```typescript
export interface NewsArticle {
  slug: string;
  headline: string;
  publishDate: string;
  category: "Official Announcement" | "Funding Milestone" | "Infrastructure" | "Ecosystem Partnership";
  summary: string;
  content: string[];
  sourceAttribution: string;
  externalPressLink?: string;
  tags: string[];
  keyFacts: { label: string; value: string }[];
}
```

### 3.4. Contact Schema (`src/data/contact.ts`)
```typescript
export interface DepartmentDesk {
  id: string;
  name: string;
  focus: string;
  email: string;
  phone: string;
  hours: string;
  leadRole: string;
}

export interface TransitRoute {
  mode: "Flight / Air" | "Train / Rail" | "Bus / Road" | "Local Transit";
  hub: string;
  distance: string;
  travelTime: string;
  instructions: string[];
}
```

---

## 4. Accessibility & User Experience Compliance

1. **Accessible Document Downloads**: All document download actions explicitly indicate file format (`PDF`, `ZIP`) and file size (`4.2 MB`) in the visual label and markup to inform bandwidth-conscious users.
2. **Keyboard Navigation & ARIA**:
   - Filter tab lists use proper `role="tablist"` and `role="tab"` attributes with `aria-selected` indicators.
   - Live result counts feature `role="status"` and `aria-live="polite"`.
   - Search inputs feature explicit `<label class="sr-only">`.
3. **Graceful Empty States**: Every client filter component provides an institutional empty state when a search query or filter returns 0 results, including a one-click "Reset Filters" action.
4. **Color & Contrast**: High-contrast ratios meeting WCAG 2.1 AA (Deep Forest Green `#004B2A` on `#F8FAF7`, White on `#004B2A`, Moss Green accents `#73992A`).
