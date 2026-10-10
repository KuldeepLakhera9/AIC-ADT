# AIC-ADT Baramati Foundation — Digital Platform

Official repository for the next-generation digital platform, enterprise web architecture, and infrastructure readiness specifications for the **AIC-ADT Baramati Foundation** (Atal Incubation Centre, supported by AIM, NITI Aayog; hosted by Agricultural Development Trust, Baramati).

---

## Repository Structure

```
AIC-ADT/
├── README.md
└── docs/
    ├── audit/                                # Phase 1, Task 1: Audit & Content Inventory
    │   ├── existing-website-audit.md          # Comprehensive institutional website audit
    │   ├── page-inventory.md                  # Catalog of 178 database objects & migration matrix
    │   ├── content-verification-register.md   # Baseline register of 20 public claims & approvals
    │   └── ux-and-accessibility-findings.md   # UX heuristic and WCAG 2.1 accessibility findings
    │
    ├── requirements/                         # Phase 1, Tasks 2 & 3: Requirements & Navigation
    │   ├── product-requirements-document.md   # Executive vision, problem statement, architecture
    │   ├── functional-requirements.md         # Detailed functional specs (FR-PUB, FR-APP, etc.)
    │   ├── non-functional-requirements.md     # Performance, security, WCAG, and DC requirements
    │   ├── user-journeys.md                   # Workflows for all 9 platform user groups
    │   ├── roles-and-permissions.md           # Granular RBAC permissions matrix & SoD rules
    │   ├── acceptance-criteria.md             # Verifiable assertions and Given-When-Then criteria
    │   ├── out-of-scope.md                    # Explicit boundary exclusions & change controls
    │   ├── sitemap.md                         # Canonical sitemap & Marathi routes
    │   ├── navigation-specification.md        # Header, mega-menu, drawer, footer & bilingual toggle
    │   ├── user-flow-specification.md         # Step-by-step traversal & Mermaid interaction flows
    │   └── route-access-matrix.md             # Route security zones, allowed roles & rate limits
    │
    ├── architecture/                         # Architecture Specifications & Data-Center Readiness
    │   ├── solution-architecture.md           # Phase 3, Task 1: C4 models, monorepo, storage abstraction
    │   ├── architecture-decisions.md          # Phase 3, Task 1: 12 formal Architecture Decision Records
    │   ├── phase-3-implementation-plan.md     # Phase 3, Task 1: 10-task sequential engineering execution plan
    │   ├── monorepo-structure.md              # Phase 3, Task 2: Master pnpm workspace layout specification
    │   ├── local-development-guide.md         # Phase 3, Task 2: Quickstart, CLI scripts & troubleshooting
    │   ├── dependency-versions.md             # Phase 3, Task 2: Recorded inventory of production dependencies
    │   ├── production-design-system.md        # Phase 3, Task 3: Tokens, palettes, fonts & Tailwind v4 theme
    │   ├── shared-ui-components.md            # Phase 3, Task 3: Reusable UI component inventory & API spec
    │   ├── backend-foundation.md              # Phase 3, Task 4: NestJS modular monolith, security, logging & probes
    │   ├── data-center-readiness-checklist.md # Phase 1, Task 4: 47-point RFI assessment across 12 domains
    │   ├── deployment-requirements.md         # Phase 1, Task 4: Container topology, VM sizing & volumes
    │   ├── network-and-security-requirements.md# Phase 1, Task 4: DMZ VLAN, firewall ingress & SSH isolation
    │   ├── backup-and-recovery-requirements.md# Phase 1, Task 4: Automated pg_dump, AES-256 & DR execution
    │   └── infrastructure-open-questions.md   # Phase 1, Task 4: Prioritized RFI questions & deliverables
    │
    ├── design/                               # Phase 2: Design Discovery, Systems & High-Fidelity Prototype
    │   ├── design-brief.md                   # Task 1: Personas, outcomes, brand personality & scope
    │   ├── visual-direction.md               # Task 1: Palette tokens, type scales, motion & layout
    │   ├── design-principles.md              # Task 1: Usability rules, WCAG 2.1 AA, bilingual parity
    │   ├── design-decisions.md               # Task 1: Approved, proposed & unresolved decisions
    │   ├── high-fidelity-design-specification.md # Task 4: Full visual design spec for all 18 pages
    │   ├── page-design-review.md             # Task 4: Comprehensive design audit, viewports & review
    │   ├── interactive-prototype-specification.md # Task 5: Master interactive architecture, state machines & user journeys
    │   ├── prototype-interaction-checklist.md     # Task 5: 38-point verification test matrix across all 7 user journeys
    │   ├── wireframes/                       # Task 3: Information Architecture & Wireframes
    │   │   ├── wireframe-specification.md    # IA principles, page coverage matrix & approval gates
    │   │   ├── homepage-wireframe.md         # Sections A through L wireframe with schematics
    │   │   ├── public-page-wireframes.md     # Pages 02 through 18 wireframes with schematics
    │   │   ├── navigation-wireframe.md       # Desktop mega-menus, mobile drawer & wayfinding
    │   │   └── mobile-wireframes.md          # Mobile layouts, touch targets & table-card transforms
    │   ├── components/                       # Task 2: Component Library & Design System Tokens
    │   │   ├── design-tokens.md              # Multi-tier semantic tokens & CSS custom properties
    │   │   ├── component-inventory.md        # 27 reusable components with states & behaviors
    │   │   ├── responsive-guidelines.md      # 5 screen tiers, fluid typography & overflow rules
    │   │   └── accessibility-guidelines.md   # WCAG 2.1 AA contrast matrix, keyboard & ARIA rules
    │   └── reviews/                          # Design review records & stakeholder sign-offs
    │
    ├── phase-1-summary.md                    # Phase 1, Task 5: Master Discovery Summary & Architecture Roadmap
    ├── phase-1-open-decisions.md              # Phase 1, Task 5: 11 Open Governance & Policy Decisions Register
    └── phase-1-sign-off-checklist.md          # Phase 1, Task 5: Quality Checklist & Phase Gate Matrix
├── prototype/                                # Interactive Design Prototypes
│   ├── index.html                            # Task 4: Master High-Fidelity Interactive Prototype (10 Views)
│   ├── styles.css                            # Task 4: Master High-Fidelity Design System Stylesheet
│   ├── script.js                             # Task 4: Interactive view switching, language toggle & filters
│   ├── components/                           # Task 2: Standalone Component Showcase
│   │   ├── showcase.html                     # Interactive HTML5 component showcase
│   │   └── styles.css                        # Pure CSS custom properties & component styles
│   └── wireframes/                           # Task 3: Grayscale Wireframe Prototypes
│       ├── index.html                        # Interactive Homepage & Directory wireframe prototype
│       └── wireframes.css                    # Grayscale wireframe styling
```

---

## Discovery, Specifications & Architecture Highlights

### Phase 1, Task 1: Baseline Audit & Content Inventory
- **[Existing Website Audit](docs/audit/existing-website-audit.md)**: Documents severe commercial theme pollution, active dummy WooCommerce retail store, broken routing (CSR to `/careers/`, Events to `/demo/`), and brand errors ("AIC-DBT Baramati").
- **[Page Inventory & Migration Matrix](docs/audit/page-inventory.md)**: Catalogs all 178 database objects and maps candidate migration actions (`Retain`, `Revise`, `Merge`, `Archive`).
- **[Content Verification Register](docs/audit/content-verification-register.md)**: Flags conflicting metrics requiring executive approval (69+ mentors vs. 23 listed, hardcoded `0` counters).
- **[UX and Accessibility Findings](docs/audit/ux-and-accessibility-findings.md)**: Documents missing `<label for="...">` form bindings, absent top-level `<h1>` headings, and insecure mixed-content links (`http://test.aic-sku.com/...`).

### Phase 1, Tasks 2 & 3: Product Requirements, Sitemap & User Journeys
- **[Product Requirements Document (PRD)](docs/requirements/product-requirements-document.md)**: 4-zone data segregation model tailored for on-premise data-center deployment.
- **[Functional Requirements (FRS)](docs/requirements/functional-requirements.md)**: 12 core subsystems across 30+ structured requirements with unique IDs and priority ratings (P0, P1, P2).
- **[Non-Functional Requirements (NFRS)](docs/requirements/non-functional-requirements.md)**: Mobile LCP ≤ 2.0s, TLS 1.3 / HSTS, WCAG 2.1 AA, RTO ≤ 4h / RPO ≤ 24h.
- **[Sitemap Specification](docs/requirements/sitemap.md)**: Canonical public sitemap with 1-to-1 Marathi (`/mr/`) mirroring, removal of 75+ demo templates, and clear segregation of private portal routes.
- **[Navigation Specification](docs/requirements/navigation-specification.md)**: Desktop mega-menus, mobile drawer, context-preserving bilingual switching mechanics, and footer.
- **[User Flow Specification](docs/requirements/user-flow-specification.md)**: 9 comprehensive interaction flows with Mermaid sequence diagrams, validation rules, and error handling.
- **[Route Access Matrix](docs/requirements/route-access-matrix.md)**: Complete endpoint mapping across Public, Applicant Portal, and Admin Console with allowed RBAC roles.

### Phase 1, Task 4: Data-Center Readiness Assessment & RFI
- **[Data-Center Readiness Checklist](docs/architecture/data-center-readiness-checklist.md)**: 47-point RFI checklist evaluating compute, storage, networking, security, databases, power, and facilities.
- **[Deployment Requirements](docs/architecture/deployment-requirements.md)**: Production sizing for Next.js, NestJS, PostgreSQL 16+, Prisma, Nginx, and Redis multi-container architecture.
- **[Network & Security Requirements](docs/architecture/network-and-security-requirements.md)**: DMZ VLAN isolation (VLAN 30), 1:1 NAT mapping for ports 80/443, strict firewall barriers preventing lateral movement to internal agricultural IoT and KVK data lakes.
- **[Backup & Recovery Requirements](docs/architecture/backup-and-recovery-requirements.md)**: Nightly automated `pg_dump` with AES-256 encryption, independent NAS replication, RPO ≤ 24h, RTO ≤ 4h, and quarterly dry-run simulation drills.
- **[Infrastructure Open Questions](docs/architecture/infrastructure-open-questions.md)**: 21 prioritized technical questions and the definitive checklist of mandatory deliverables the organization must supply before deployment approval.

### Phase 1, Task 5: Discovery Review & Governance Sign-Off Package
- **[Phase 1 Discovery Summary](docs/phase-1-summary.md)**: Complete technical and architectural synthesis covering project vision, agreed v1 release scope, 7-pillar sitemap, Next.js/NestJS/PostgreSQL architecture, data center dependencies, risks/mitigations, and entry criteria.
- **[Phase 1 Open Decisions Register](docs/phase-1-open-decisions.md)**: 11 high-priority policy and organizational decisions (branding, impact metrics audit, startup classification, mentor consent, data privacy, RFI sign-offs) cataloged for executive resolution.
- **[Phase 1 Sign-Off Checklist & Gate Matrix](docs/phase-1-sign-off-checklist.md)**: Comprehensive quality verification across all 23 deliverables, evaluating the Phase Gate as **NEEDS APPROVAL** with formal signature blocks for stakeholder sign-off.

### Phase 2, Task 1: Design Discovery & Creative Direction
- **[Design Brief](docs/design/design-brief.md)**: Target user cohorts, experience priorities, brand personality pillars, measurable UX/Core Web Vitals outcomes, and scope boundaries.
- **[Visual Direction](docs/design/visual-direction.md)**: Established AIC-ADT botanical color tokens, Inter + Noto Sans Devanagari typography scale, authentic agricultural photography mandates, card elevation, and motion principles.
- **[Design Principles](docs/design/design-principles.md)**: 5 core tenets, Fitts's Law touch ergonomics, mobile-first responsive transforms, strict WCAG 2.1 AA accessibility rules, bilingual layout compensation, and `prefers-reduced-motion` specs.
- **[Design Decisions Register](docs/design/design-decisions.md)**: Classification of approved, proposed, and unresolved design decisions with explicit placeholders (`[AUDITED METRIC PENDING]`, `[CONSENT PENDING]`, etc.).

### Phase 2, Task 2: Design Tokens & Reusable Component Specification
- **[Design Tokens Specification](docs/design/components/design-tokens.md)**: Multi-tier token architecture (CSS custom properties) covering brand & neutral colors, state feedback, typography scale, 8-point spacing, container widths, radii, shadows, and z-index layers.
- **[Reusable Component Inventory](docs/design/components/component-inventory.md)**: Comprehensive specification of 27 core components covering purpose, variants, visual states, keyboard interaction, responsive behavior, WCAG 2.1 AA rules, and Marathi translation guidelines.
- **[Responsive Layout Guidelines](docs/design/components/responsive-guidelines.md)**: 5-tier responsive screen architecture (320px to 1440px+), fluid typography formulas (`clamp`), navigation collapse mechanics, table card transformations, and Marathi horizontal overflow defenses.
- **[Accessibility Guidelines](docs/design/components/accessibility-guidelines.md)**: WCAG 2.1 Level AA conformance framework with certified color contrast matrix, keyboard focus architecture, screen reader landmarks, persistent form labels, and `prefers-reduced-motion` overrides.
- **[Standalone Component Showcase](prototype/components/showcase.html)**: Interactive HTML5/CSS showcase in `prototype/components/` demonstrating representative buttons, typography, cards, form fields, badges, navigation, and color swatches without external dependencies.

### Phase 2, Task 3: Information Architecture & Responsive Wireframes
- **[Wireframe Master Specification](docs/design/wireframes/wireframe-specification.md)**: 18-page public coverage matrix, IA principles, layout conventions, and stakeholder review checkpoints.
- **[Homepage Wireframe](docs/design/wireframes/homepage-wireframe.md)**: Exhaustive structural wireframe detailing Sections A through L (Utility bar to Master footer) with purpose, ASCII schematics, and mobile behaviors.
- **[Public Page Wireframes](docs/design/wireframes/public-page-wireframes.md)**: Complete wireframes for Pages 02 through 18 (About, Programs, Schemes, Instructions, Startups, Innovation, Impact, Events, Resources, Contact, Search, Error 404/500).
- **[Navigation Wireframe](docs/design/wireframes/navigation-wireframe.md)**: 7 desktop mega-menus, mobile slide-in drawer, search overlay, context-preserving bilingual switching (`EN | मराठी`), and contextual cross-linking matrix.
- **[Mobile Wireframes](docs/design/wireframes/mobile-wireframes.md)**: Dedicated mobile viewport layouts (320px-480px), touch ergonomics ($\ge 44\text{px}$), table-to-card transformations, and Marathi ligature overflow defenses.
- **[Interactive Grayscale Wireframe Prototype](prototype/wireframes/index.html)**: Working grayscale wireframe prototype demonstrating the homepage reading flow, startup directory, and real-time English/Marathi text switching.

### Phase 2, Task 4: High-Fidelity Institutional Website Design & Prototype
- **[High-Fidelity Design Specification](docs/design/high-fidelity-design-specification.md)**: Full visual design specification detailing typography, Section A-L homepage composition, inner pages, verified contrast tokens, and responsive viewports.
- **[Page Design Review & Quality Audit](docs/design/page-design-review.md)**: Comprehensive design audit verifying brand alignment, WCAG 2.1 AA compliance, mobile/tablet/desktop responsiveness, temporary placeholder inventory, and production boundaries.
- **[Master High-Fidelity Prototype](prototype/index.html)**: Standalone, responsive interactive prototype presenting 10 distinct views (Homepage, About, Programs, Scheme Detail, Startups, Innovation, Impact, Events, Reports, Contact) with instant bilingual English/Marathi toggling and client-side directory filtering.

### Phase 2, Task 5: Interactive UI Prototype & User Journey Demonstration
- **[Interactive Prototype Specification](docs/design/interactive-prototype-specification.md)**: Master technical and interaction specification detailing 7 complete user journey state machines (Universal Navigation, Bilingual Parity, Startup Portfolio Discovery, Events RSVP, Incubation Application Wizard, Audited Impact Periods, Publications Distribution), modal dialog engines, form validation logic, and local test procedures.
- **[Prototype Interaction Verification Checklist](docs/design/prototype-interaction-checklist.md)**: Comprehensive 38-point QA verification matrix covering keyboard focus, mobile drawer escape, zero dead links, bilingual view preservation, real-time directory filtering, RSVP form validation, 3-step application wizard, dynamic reporting periods, and reduced motion overrides.
- **[Enhanced Interactive Prototype](prototype/index.html)**: High-fidelity interactive prototype featuring working desktop mega-menus, accessible mobile drawer, interactive breadcrumbs, 6 rich sample startups with detail modals, event RSVP registration with inline validation and loading states, 4-step eligibility self-assessment checker, 3-step incubation application wizard, interactive fiscal period switcher (FY25, FY24, FY23, FY22), bundled sample PDF downloads with toast notifications, and full English/Marathi bilingual parity.

### Phase 2, Task 6: Design Quality Assurance and Phase Sign-Off
- **[Design QA Report](docs/design/reviews/design-qa-report.md)**: Comprehensive design-system audit verifying brand tokens, typography hierarchy, component interaction states, usability heuristics, and defect remediation register.
- **[Responsive Test Results](docs/design/reviews/responsive-test-results.md)**: Strict multi-viewport testing log across 320px, 375px, 768px, 1024px, and 1440px viewports with zero horizontal overflow, touch target validation, and responsive table scrolling.
- **[Accessibility Review](docs/design/reviews/accessibility-review.md)**: WCAG 2.2 Level AA compliance audit with automated contrast verification, keyboard navigation analysis, screen reader labeling, dialog focus trapping, and motion reduction.
- **[Phase 2 Sign-Off & Exit Gate Review](docs/design/reviews/phase-2-sign-off.md)**: Formal review of all 8 exit criteria, RACI matrix for Phase 3 engineering decisions, deliverable inventory, and official baseline inputs for Phase 3 implementation (**GATE: READY FOR PHASE 3**).

### Phase 3, Task 1: Existing Project Inspection & Architecture Decision Record
- **[Phase 3 Current State Assessment](docs/architecture/phase-3-current-state-assessment.md)**: Technical inspection of workspace filesystem, Git state, package manifests, prototype assets, and resolution of architectural discrepancies.
- **[Solution Architecture Specification](docs/architecture/solution-architecture.md)**: Comprehensive C4 models (System Context, Container Topology, Component Architecture), pnpm workspace monorepo layout, PostgreSQL data modeling, dual storage abstraction, and Nginx ingress rules.
- **[Architecture Decision Records (ADRs)](docs/architecture/architecture-decisions.md)**: 12 formal architecture decisions covering monorepo layout, Next.js, Tailwind CSS, NestJS modular monolith, PostgreSQL/Prisma, lean infrastructure (omission of Redis/Kubernetes), storage abstraction, and non-root Docker Compose.
- **[Phase 3 Implementation Plan](docs/architecture/phase-3-implementation-plan.md)**: 10-task sequential engineering execution plan spanning foundational monorepo setup to pre-deployment hardening, quality gates, and risk mitigations.

### Phase 3, Task 2: Initialize the Production Monorepo
- **[Monorepo Structure](docs/architecture/monorepo-structure.md)**: Master specification of the pnpm workspace monorepo layout (`apps/web` and `apps/api`), package boundaries, and script orchestration.
- **[Local Development Guide](docs/architecture/local-development-guide.md)**: Developer quickstart instructions, environment configuration, command reference, and common troubleshooting tips.
- **[Dependency Versions Specification](docs/architecture/dependency-versions.md)**: Exact recorded inventory of all installed production and development dependencies across the workspace.
- **`apps/web` (Next.js 16 App Router)**: Minimal branded frontend with Tailwind CSS v4, Phase 2 design tokens, Outfit/Inter typography, layout primitives, custom error boundary, and branded 404 page.
- **`apps/api` (NestJS 12 Modular Monolith)**: Minimal backend API engine with NodeNext ESM, versioned `/api/v1` prefix, `/api/v1/health` endpoint, global exception filter, validation pipe, and Vitest test suite.

### Phase 3, Task 3: Production Design System and Shared UI Components
- **[Production Design System Architecture](docs/architecture/production-design-system.md)**: Master architecture document detailing Tailwind CSS v4 theme integration, all 39 design tokens, brand and neutral palettes, semantic feedback colors, typography hierarchy, responsive container standards, accessible focus styles, and motion reduction.
- **[Shared UI Components Specification](docs/architecture/shared-ui-components.md)**: Component inventory and technical documentation covering 26 reusable UI primitives in `apps/web/src/components/ui/` (Buttons, Typography, Cards, Badges, Status Indicators, Section Headers, Breadcrumbs, Form Controls, Alerts, Skeletons, Empty States, Grids, Sections, Tabs, Accordions, Media Containers).
- **Internal Design System Showcase (`/design-system`)**: Private Next.js route in `apps/web/src/app/design-system/page.tsx` displaying interactive color swatches, typography scales, buttons, badges, form controls, alerts, cards, skeletons, tabs, accordions, and media containers for design verification.
- **Automated Component Verification**: Node-native unit test suite (`apps/web/src/components/ui/__tests__/design-system.test.ts`) validating brand colors, typography tokens, touch targets, and component specifications with 100% pass rate.

### Phase 3, Task 4: NestJS Backend Foundation
- **[Backend Foundation Architecture](docs/architecture/backend-foundation.md)**: Production architecture document detailing the modular monolith layout, `/api/v1` API conventions, fail-fast configuration schema, uniform response and error envelopes, structured JSON logging with redaction, container health probes, and security baseline.
- **`apps/api` (NestJS Modular Monolith Engine)**: Complete production-ready foundational architecture with Helmet security headers, CORS allowlist, request body limits, Throttler rate limiting, and database abstraction service.
- **Health Probes (`/api/v1/health`)**: Separate liveness (`/health/liveness`) and readiness (`/health/readiness`) checks for container orchestration and load balancing.
- **Observability & Request Correlation**: Automated `x-correlation-id` lifecycle, structured single-line JSON logging, and automatic redaction of sensitive credentials, tokens, and database connection strings.
- **Automated Backend Verification**: Vitest unit test suite (23 passing tests) and Supertest integration e2e test suite (5 passing tests) with 100% pass rate.

