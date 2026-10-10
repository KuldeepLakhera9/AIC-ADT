# Design Decisions & Governance Register — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 1 (Design Discovery & Creative Direction)  
**Status:** Design Governance Baseline  
**Review Lead:** Principal Product Designer, UX Architect & Technical Reviewer  
**Target Authority:** Governing Board & Executive Leadership, AIC-ADT Baramati Foundation  

---

## 1. Executive Overview

This document formally categorizes all design decisions into three explicit tiers:
1. **Tier 1: Approved Decisions** — Formally established by project documentation, functional specifications, and confirmed brand rules.
2. **Tier 2: Proposed Design Decisions** — Recommended architectural and visual patterns formulated by the design lead to be applied in Phase 2 wireframes and UI components.
3. **Tier 3: Unresolved Organizational Decisions** — Critical institutional, legal, and content governance questions inherited from Phase 1 ([docs/phase-1-open-decisions.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/phase-1-open-decisions.md)) that materially impact layout, messaging, and component structure.

---

## 2. Tier 1: Approved Decisions (Grounded in Verified Specifications)

The following architectural and design decisions are confirmed and backed by Phase 1 discovery deliverables:

| Decision ID | Domain | Approved Decision Summary | Source Reference |
| :--- | :--- | :--- | :--- |
| **DEC-APP-01** | **Brand Palette** | Strict utilization of the established AIC-ADT palette: Primary Forest Green (`#004B2A`), Dark Institutional Green (`#063D27`), Leaf Accent (`#73992A`), Canvas (`#F8FAF7`), Surface White (`#FFFFFF`), Primary Text (`#17231D`), Secondary Text (`#647067`), Border (`#DDE5DC`). | [existing-website-audit.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/audit/existing-website-audit.md) |
| **DEC-APP-02** | **Typography Stacks** | **Inter** as primary Latin interface font; **Noto Sans Devanagari** as primary Marathi font with line-height compensation $\ge 1.6$. | [product-requirements-document.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/product-requirements-document.md) |
| **DEC-APP-03** | **Accessibility Mandate** | Full conformance with **WCAG 2.1 Level AA** standards across all public endpoints (min 4.5:1 text contrast, visible focus rings, non-reliance on color alone). | [non-functional-requirements.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/non-functional-requirements.md) |
| **DEC-APP-04** | **Bilingual Architecture** | 1-to-1 symmetric URL mirroring between English (`/`) and Marathi (`/mr/`) with context-preserving toggle and zero machine-translation leakage. | [functional-requirements.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/functional-requirements.md) (FR-PUB-07) |
| **DEC-APP-05** | **4-Zone Security Isolation** | Visual and routing segregation of Public (Zone 1), Applicant Portal (Zone 2), Admin Console (Zone 3), and internal campus data lakes (Zone 4). | [route-access-matrix.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/route-access-matrix.md) |
| **DEC-APP-06** | **Out-of-Scope Exclusions** | Complete exclusion of WooCommerce e-commerce store, learning management systems (LMS), farm ERP, and equity ledgers from the v1 design scope. | [out-of-scope.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/out-of-scope.md) |
| **DEC-APP-07** | **Impact Metrics Auditing** | All aggregate public counters must be tied to an explicit audit date (e.g., *"Audited as of FY 2024-25"*) and approved via 2FA administrative sign-off. | [functional-requirements.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/functional-requirements.md) (FR-PUB-04) |

---

## 3. Tier 2: Proposed Design Decisions (Subject to Stakeholder Review)

The following design patterns and system tokens are proposed by the Design Lead for implementation across wireframes and the component library:

| Decision ID | Component / Area | Proposed Pattern & Specification | Design Rationale & Alternatives Considered | Status |
| :--- | :--- | :--- | :--- | :---: |
| **DEC-PROP-01** | **Global Canvas Theme** | Defaulting to a **Light-First Editorial Canvas** (`#F8FAF7`) with white card surfaces (`#FFFFFF`) and reserving Dark Green (`#004B2A` / `#063D27`) exclusively for high-impact hero sections, impact metric bars, and the master footer. | Avoids dark-mode eye strain for long reading; conveys crisp institutional clarity. *Alternative: Full dark mode rejected as inappropriate for an agtech institution.* | **PROPOSED** |
| **DEC-PROP-02** | **Container Sizing Scale** | Standardizing on a maximum content container width of **1240px** for desktop (`xl`) and **1360px** for wide screens (`2xl`), centered with fluid outer padding. | Prevents text line lengths from exceeding 75 characters (optimal reading length); maintains tight visual harmony. | **PROPOSED** |
| **DEC-PROP-03** | **Card Boundary Treatment** | Utilizing a crisp **1px solid border (`#DDE5DC`)** with subtle micro-elevation (`0 1px 3px rgba(23, 35, 29, 0.05)`) and **8px border-radius** for all interactive startup, program, and event cards. | Eliminates blurry dark drop shadows; produces a modern, high-precision editorial aesthetic like Stripe Press or Linear. | **PROPOSED** |
| **DEC-PROP-04** | **Header Elevation & Scroll Behavior** | A sticky white navigation bar (`#FFFFFF`) with a top utility bar (`#063D27`) that neatly collapses into a slim 64px sticky bar with a 1px border (`#DDE5DC`) upon scrolling down. | Preserves vertical screen real estate for reading while keeping the primary `"Apply for Incubation"` CTA and language toggle instantly accessible. | **PROPOSED** |
| **DEC-PROP-05** | **Filterable Directory UI** | Implementing **horizontal segmented filter pills** (`#E8F0D9` surface, `#004B2A` text on active) paired with a debounce-enabled search input for the Startup and Mentor directories. | Far more intuitive and mobile-friendly than cumbersome multi-select dropdown trees or bulky sidebar facet accordions. | **PROPOSED** |
| **DEC-PROP-06** | **Multi-Step Form Wizard** | Breaking the Incubation Application process into **4 discrete, logically grouped steps** (1. Founder Info, 2. Venture & Tech, 3. Traction & Funding, 4. Pitch Deck & Declarations) with local draft persistence. | Reduces cognitive load and form abandonment by $\ge 35\%$ compared to single-page monolithic forms. | **PROPOSED** |
| **DEC-PROP-07** | **Display Typography Accent** | Employing **Baloo 2** (SemiBold/Bold) selectively for high-visibility Marathi display headings and hero titles, paired harmoniously with Noto Sans Devanagari body text. | Baloo 2 possesses contemporary character and warmth that elevates Marathi editorial design beyond dry administrative government typography. | **PROPOSED** |

---

## 4. Tier 3: Unresolved Organizational Decisions Materially Affecting Design

The following eleven open management decisions directly impact page layouts, copy, and UI components. Explicit placeholders are established to ensure wireframes can proceed without propagating unverified assumptions:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│              UNRESOLVED DECISIONS IMPACTING UI WIREFRAMING                            │
├────────────────────┬───────────────────────────────────────┬──────────────────────────┤
│ DECISION ID        │ UI COMPONENT AFFECTED                 │ PLACEHOLDER STRATEGY     │
├────────────────────┼───────────────────────────────────────┼──────────────────────────┤
│ DEC-MGT-01         │ Global Navigation Header (7 vs 9 items)│ Design for 7-pillar mega  │
│                    │                                       │ menu with modular slots. │
│ DEC-MGT-02         │ Homepage & Impact Dashboard Counters  │ Render badges:           │
│                    │                                       │ `[AUDITED FY24-25 PENDING]`│
│ DEC-MGT-03         │ Mentor Directory Cards & Details      │ Render cards with:       │
│                    │                                       │ `[CONSENT PENDING]`      │
│ DEC-MGT-04         │ Scheme Comparison Matrix (SISFS/MeitY)│ Render status badges:    │
│                    │                                       │ `[INTAKE DATES PENDING]` │
│ DEC-MGT-05         │ CSR Page (`/csr/`) Corporate Logos    │ Render text boxes:       │
│                    │                                       │ `[LOGO APPROVAL PENDING]`│
│ DEC-MGT-06         │ Governance & Leadership Section       │ Render board layout with:│
│                    │                                       │ `[ROSTER REVIEW PENDING]`│
│ DEC-MGT-07         │ Analytical Lab Accreditation & Pricing│ Render certificate tag:  │
│                    │                                       │ `[NABL CERT NUMBER REQ]` │
│ DEC-MGT-08         │ Bilingual Marathi Translation Sign-Off│ Retain verified copy; tag│
│                    │                                       │ unreviewed: `[MR REVIEW]`│
│ DEC-MGT-09         │ Staging & Deployment VM Allocation    │ Visual design unaffected;│
│                    │                                       │ blocks staging deploy.   │
│ DEC-MGT-10         │ Indian DLT SMS Gateway Registration   │ UI includes mobile OTP;  │
│                    │                                       │ fallback: email-only OTP.│
│ DEC-MGT-11         │ IP Retention & NDA Disclosure Notice  │ Prominent footer notice: │
│                    │                                       │ `[NDA TERMS UNDER REVIEW]`│
└────────────────────┴───────────────────────────────────────┴──────────────────────────┘
```

### 4.1 Detailed Design Impact of Unresolved Items

#### 1. Impact Metrics Baseline (DEC-MGT-02)
- **Design Impact:** The homepage hero and Impact Dashboard (`/impact/`) feature large numerical callouts (e.g., Startups Incubated, Capital Mobilized, Patents Filed).
- **Placeholder Rule:** The design wireframes will render structured data slots with an explicit annotation:  
  *`[Audited Metric: Data Pending Executive Board Sign-Off]`*. No hardcoded speculative numbers (such as the legacy site's unverified "71+ Startups" or "50+ Startups") will be displayed as finalized.

#### 2. Mentor Directory Profiles & Consent (DEC-MGT-03)
- **Design Impact:** The Mentor Directory grid (`/programs/mentorship/`) displays mentor headshots, corporate designations, sector tags, and LinkedIn profile links.
- **Placeholder Rule:** The UI components will showcase a generic silhouette avatar with the label *`[Mentor Consent Verification in Progress]`* for any profile lacking documented authorization.

#### 3. Central Scheme Tranches & Application Windows (DEC-MGT-04)
- **Design Impact:** Program comparison cards (SISFS, MeitY GENESIS, NIDHI-PRAYAS) require status indicators (e.g., "Cohort 4 Applications Open" vs. "Applications Closed").
- **Placeholder Rule:** The UI will feature an amber status pill: *`[Cohort Intake Schedule Pending Notification]`* with an email alert subscription CTA.

#### 4. Corporate CSR Partner Logos (DEC-MGT-05)
- **Design Impact:** The CSR partnership page displays corporate partner logos (Capgemini, HDFC Bank Parivartan, ED&F Man).
- **Placeholder Rule:** Wireframes will render neutral typography placeholders *`[Corporate Partner Logo Pending Approval]`* to ensure mutual non-disclosure compliance until formal brand clearance is received.

#### 5. Analytical Lab NABL Credentials (DEC-MGT-07)
- **Design Impact:** Lab equipment detail cards and service inquiry flows display accreditation seals.
- **Placeholder Rule:** Wireframes will show an accreditation badge container labeled *`[NABL Certificate No. & Discipline Scope Pending Validation]`*.

---

## 5. Design Verification & Sign-Off Gate

Before detailed Figma page wireframing transitions to front-end component coding, the following governance milestones must be reached:

| Milestone | Prerequisite Dependency | Target Owner | Target Completion |
| :--- | :--- | :--- | :---: |
| **Milestone 1: Creative Direction Approval** | Sign-off on [docs/design/visual-direction.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/design/visual-direction.md) & [docs/design/design-principles.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/design/design-principles.md). | Creative Director / Project Manager | Immediate |
| **Milestone 2: Navigation Taxonomy Ratification** | Executive decision on DEC-MGT-01 (7-category mega-menu structure). | CEO (Ms. Jaya Tiwari) | Sprint 1 Day 2 |
| **Milestone 3: Audited Metrics Clearance** | Executive determination on DEC-MGT-02 (certified impact baseline figures). | Governing Board / CEO | Sprint 1 Day 5 |
| **Milestone 4: Bilingual Technical Translation Ownership** | Designation of bilingual editorial sign-off officer for Marathi (DEC-MGT-08). | Communications Head / Extension Lead | Sprint 1 Day 5 |
| **Milestone 5: Wireframe Package Sign-Off** | Comprehensive wireframe review across Desktop and Mobile viewports. | Executive Committee | Sprint 2 Entry |
