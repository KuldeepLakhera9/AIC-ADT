# Design Brief — AIC-ADT Baramati Foundation Digital Platform

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 1 (Design Discovery & Creative Direction)  
**Status:** Approved for Design System & Wireframing Execution  
**Target Platform:** Official Institutional Web Platform (`aicadtbaramatifoundation.org`)  
**Design Lead:** Principal Product Designer & UX Architect  
**Creative Direction:** Enterprise Institutional Agri-Tech & Incubation System  

---

## 1. Executive Summary & Design Vision

The **AIC-ADT Baramati Foundation** is an Atal Incubation Centre established under the aegis of the Atal Innovation Mission (AIM), NITI Aayog, Government of India, and hosted by the Agricultural Development Trust (ADT) in Baramati, Maharashtra. It serves as a premier ecosystem hub for agricultural innovation, biotechnology, smart farming, IoT-driven rural empowerment, and deep-tech startup incubation.

The objective of this design initiative is to construct a **world-class, futuristic, yet deeply trustworthy institutional digital experience**. The platform must position AIC-ADT not merely as an administrative office, but as a vanguard of the second green revolution—bridging laboratory science, venture capital, high-technology incubation, and grassroots farming communities.

```
========================================================================================
                                CORE DESIGN THESIS
========================================================================================
"Rooted in the Soil of Baramati, Powered by Deep Science & Modern Venture Incubation."
An interface balancing institutional authority, cutting-edge technology, and 
uncompromised accessibility across English and Marathi languages.
========================================================================================
```

---

## 2. Target User Groups & Experience Priorities

Derived directly from the verified Phase 1 user personas ([docs/requirements/user-journeys.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/user-journeys.md)), the design must cater to nine distinct stakeholder cohorts with calibrated user journeys:

| User Cohort | Primary Objective | Experience Priority | Key UI Touchpoints |
| :--- | :--- | :--- | :--- |
| **1. First-Time Institutional Visitors** | Understand AIC-ADT's mandate, credibility, and ecosystem stature. | Immediate institutional trust, editorial elegance, clear mission clarity. | Institutional Hero, About section, Partners & NITI Aayog accreditation badges. |
| **2. Agri-Tech & Deep-Tech Founders** | Discover incubation programs, check grant eligibility, submit applications. | Low friction, transparent criteria, confident IP protection, dead-simple application flow. | Program comparison matrix, Scheme details (SISFS/MeitY), Multi-step Application Portal. |
| **3. Returning Incubatees / Applicants** | Track application status, review feedback, access cohort schedules. | Predictable authentication, high density dashboard, clear status indicators. | Dedicated Applicant Portal (`/portal/*`), status timeline tracker, document upload area. |
| **4. Empaneled Mentors & Researchers** | Browse current cohorts, offer advisory sessions, review lab capabilities. | Clean directory search, professional academic stature, clear lab instrumentation specs. | Analytical Lab instrumentation specs, Mentors directory, Research collaboration gateway. |
| **5. Progressive Farmers & Rural Innovators** | Discover grassroots agtech, pilot demonstrations, soil testing services. | Intuitive Devanagari (Marathi) copy, large touch targets, visual clarity, low cognitive load. | Marathi mirrored pages (`/mr/*`), Soil testing booking CTA, Demonstration farm showcases. |
| **6. Investors & Corporate CSR Partners** | Evaluate incubation track record, explore co-funding / CSR grant opportunities. | Hard audited data, clear compliance metrics, prominent corporate logo recognition. | Audited Impact Dashboard, CSR portfolio page (`/csr/`), Case study teardowns. |
| **7. Workshop & Event Attendees** | Discover upcoming agtech seminars, register for hackathons, download agendas. | Prominent date/time badges, one-click RSVP, automated calendar sync. | Events calendar, Hackathon registration pages, past media gallery. |
| **8. Journalists, Regulators & Auditors** | Access official circulars, annual reports, audited financial disclosures. | Searchable document tables, downloadable signed PDFs, zero obfuscation. | Reports & Disclosures repository, Press Releases, NITI Aayog compliance disclosures. |
| **9. Authorized Staff & Content Editors** | Publish bilingual notices, review founder pitches, update impact counters. | High efficiency, strict visual form feedback, clear distinction between draft and published. | Protected Admin Console (`/admin/*`), dual-authorization approval banners. |

---

## 3. Product Goals & Measurable Design Outcomes

The design system and page layouts will be evaluated against strict quantitative and qualitative criteria:

### 3.1 Quantitative Benchmarks
- **Core Web Vitals:** Mobile Largest Contentful Paint (LCP) $\le 2.0\text{s}$, Cumulative Layout Shift (CLS) $\le 0.05$, Interaction to Next Paint (INP) $\le 150\text{ms}$.
- **Accessibility:** 100% compliance with **WCAG 2.1 Level AA** standards across all public endpoints (zero automated axe/Lighthouse contrast errors; min 4.5:1 text contrast).
- **Usability Performance:** Task completion rate $> 90\%$ for first-time grant application submissions in usability testing.
- **Bilingual Parity:** 100% navigational and functional mirroring between English (`/`) and Marathi (`/mr/`) routes with zero UI truncation or diacritic clipping.
- **Form Abandonment Reduction:** Multi-step wizard layout with local draft saving to reduce application abandonment by $\ge 35\%$ compared to single-page legacy forms.

### 3.2 Qualitative Benchmarks
- **Avoid "Generic SaaS" Trap:** No purple gradients, floating geometric blobs, or generic illustrations of faceless characters.
- **Avoid "Cluttered Government Portal" Trap:** No flashing marquee text, endless walls of nested unstyled tables, or microscopic links.
- **Avoid "Over-Decorated AI Landing Page" Trap:** No fake cyberpunk neon glows, ungrounded 3D parallax scroll-hijacking, or meaningless animated decorations.
- **Embody "Agricultural Innovation Reality":** Clean editorial white space, authentic high-resolution field and laboratory photography, crisp typography, and purposeful botanical green accents.

---

## 4. Brand Personality & Core Attributes

The visual and verbal identity of AIC-ADT is governed by five brand pillars:

```
[ GROUNDED & ROOTED ]      Deeply connected to Maharashtra's soil, farmers, and agriculture.
         │
[ SCIENTIFIC & PRECISE ]    NABL-accredited analytical rigor, biotechnology, and data-driven farming.
         │
[ ENTREPRENEURIAL & BOLD ]  Seed funding, venture building, intellectual property, and global scale.
         │
[ INSTITUTIONAL & TRUSTED ] Supported by NITI Aayog, ADT Baramati, and central government mandates.
         │
[ INCLUSIVE & ACCESSIBLE ]  Equally empowering to a rural Marathi farmer and a venture capitalist.
```

---

## 5. Scope of the Design System

The design deliverables in Phase 2 cover the complete user interface lifecycle:

1. **Global Foundations:** Color palette tokens, typography scales (Inter & Noto Sans Devanagari), spacing tokens, elevation & shadows, border radii, responsive grid definitions.
2. **Global Components:**
   - Institutional Header (Top institutional utility bar, desktop mega-menu, mobile drawer, context-preserving language toggle).
   - Institutional Footer (7-pillar hierarchy, NITI Aayog/AIM accreditation badges, address, social channels, legal disclosures).
   - Cards & Data Displays (Startup cards, Program cards, Event badges, Impact metric counters, Lab equipment cards).
   - Form Elements (Bilingual input fields, dropdowns, file uploaders with drag-and-drop, step progress indicators).
   - Feedback & System States (Success toasts, error summaries, loading skeletons, empty states, audit verification badges).
3. **Template Wireframes & High-Fidelity Views (English & Marathi):**
   - Homepage (Institutional editorial showcase).
   - About & Governance (Leadership, NITI Aayog relationship, campus facilities).
   - Incubation Programs & Grant Schemes (SISFS, MeitY GENESIS comparison matrix).
   - Startup Directory & Profile Showcase (Filterable industry tags).
   - Analytical Lab & Infrastructure (Instrumentation specs, booking request CTA).
   - Impact & Audit Dashboard (Audited historical reporting periods).
   - Events & Media (Upcoming cohort workshops, past gallery).
   - Multi-Step Application Flow (Private Applicant Portal).

---

## 6. Strategic Constraints & Guardrails

To preserve architectural and governance integrity, the design team must strictly respect the boundaries established in Phase 1:

1. **No Application Code in Phase 2, Task 1:** Deliverables are design specifications, design systems, and wireframe assets.
2. **Explicit Placeholders for Unverified Claims:** Where public statistics, mentor rosters, or grant schemes are pending formal board approval ([docs/phase-1-open-decisions.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/phase-1-open-decisions.md)), the design must render structured badges: `[AUDITED STATISTIC PENDING EXECUTIVE APPROVAL]` or `[MENTOR CONSENT PENDING]`.
3. **No Direct Farm IoT Ingestion in v1:** Visualizations on the public website must display curated research metrics and static case studies, not live websocket-streamed data lakes from campus IoT sensors.
4. **Light-First Institutional Aesthetic:** The platform is primarily light (`#F8FAF7` / `#FFFFFF`), utilizing deep institutional green (`#004B2A` / `#063D27`) exclusively for high-impact anchor sections (Hero, Impact stats, Footer). Dark-mode toggle is reserved for the internal portal.
