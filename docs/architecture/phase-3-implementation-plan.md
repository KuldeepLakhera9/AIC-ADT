# Phase 3 Implementation Plan
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 — Engineering, Implementation & Pre-Deployment Hardening  
**Author:** Principal Software Architect & Senior Engineering Lead  
**Date:** October 10, 2026  
**Status:** **APPROVED EXECUTION ROADMAP**

---

## 1. Overview & Phased Roadmap

Phase 3 transitions the AIC-ADT Baramati Foundation digital platform from design and visual prototyping into full-stack production engineering. 

To ensure complete type safety, zero architectural debt, and reliable on-premise execution, the implementation is organized into **10 sequential, bite-sized tasks** grouped across 4 primary engineering milestones:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 3 ENGINEERING ROADMAP                               │
├────────────────────┬────────────────────┬─────────────────────┬────────────────────────┤
│    MILESTONE 1     │    MILESTONE 2     │     MILESTONE 3     │      MILESTONE 4       │
│ Foundation & Data  │ Core API & Web App │ Public Pages & Feats│ Hardening & Ingress    │
│  (Tasks 2 & 3)     │  (Tasks 4, 5, 6)   │   (Tasks 7, 8, 9)   │   (Tasks 10 & 11)      │
└────────────────────┴────────────────────┴─────────────────────┴────────────────────────┘
```

---

## 2. Detailed Task Breakdown

### Task 2: Monorepo Foundation & Tooling Setup
* **Objective:** Establish the pnpm monorepo structure, shared configuration presets, linting, and root scripts.
* **Dependencies:** None (Initiates code repository).
* **Inputs:** `docs/architecture/solution-architecture.md`, `docs/architecture/architecture-decisions.md`.
* **Deliverables:**
  * `pnpm-workspace.yaml` defining `apps/*` and `packages/*`.
  * Root `package.json` with workspace orchestration scripts (`pnpm build`, `pnpm dev`, `pnpm test`, `pnpm lint`).
  * `packages/shared/` containing shared TypeScript configuration and core domain types.
  * `packages/config/` containing shared ESLint and TypeScript configurations.
  * Root `.gitignore`, `.editorconfig`, and `.env.example`.
* **Quality Gate:** `pnpm install` executes cleanly with zero warnings; root `pnpm lint` and `pnpm typecheck` pass.

---

### Task 3: Database & Prisma Data Layer Setup
* **Objective:** Model the relational schema in Prisma, execute initial migrations, and seed initial records from Phase 2 prototypes.
* **Dependencies:** Task 2.
* **Inputs:** `docs/requirements/functional-requirements.md`, `prototype/script.js` (sample startup/event records).
* **Deliverables:**
  * `packages/database/prisma/schema.prisma` covering Users, Startups, Programs, Applications, Reviews, Events, ImpactMetrics, Publications, and AuditLogs.
  * Initial migration: `0001_initial_schema`.
  * `packages/database/prisma/seed.ts` seeding the 6 showcase startups, SISFS program details, FY22-FY25 impact metrics, and initial admin/editor roles.
  * Local Docker PostgreSQL container configuration for local database development.
* **Quality Gate:** `pnpm --filter @aic/database prisma migrate dev` applies successfully; `prisma db seed` populates database; Devanagari UTF-8 strings query without distortion.

---

### Task 4: NestJS Backend API Core & Modular Monolith Setup
* **Objective:** Scaffold the NestJS backend application with modular domain structure, Prisma integration, validation pipes, and logging.
* **Dependencies:** Task 2, Task 3.
* **Inputs:** `docs/architecture/solution-architecture.md` (Section 5.2).
* **Deliverables:**
  * `apps/api/` NestJS application setup with TypeScript.
  * Core modules: `PrismaModule`, `ConfigModule`, `LoggerModule`.
  * Domain scaffolding: `StartupsModule`, `ProgramsModule`, `EventsModule`, `ImpactModule`, `PublicationsModule`.
  * Global exception filter formatting API errors consistently (`{ statusCode, message, timestamp, path }`).
  * Global validation pipe using `class-validator` and `class-transformer`.
* **Quality Gate:** `pnpm --filter @aic/api test` passes; `GET /api/health` returns HTTP 200 OK; domain endpoints return seeded JSON payloads.

---

### Task 5: Next.js Frontend Application Initialization
* **Objective:** Initialize the Next.js 14+ App Router frontend with TypeScript, Tailwind CSS, custom design tokens, and bilingual layout shells.
* **Dependencies:** Task 2.
* **Inputs:** `docs/design/components/design-tokens.md`, `prototype/styles.css`.
* **Deliverables:**
  * `apps/web/` Next.js application setup.
  * `apps/web/tailwind.config.ts` mapping Phase 2 colors (`brand-primary`, `brand-accent`, `institutional-dark`, `surface-light`), typography (`Outfit`, `Inter`), spacing, and radii.
  * Root bilingual layout structure: `app/[locale]/layout.tsx`.
  * Universal Header component with desktop mega-menus, mobile navigation drawer, and language switcher.
  * Master 4-column Institutional Footer component.
  * Sticky Wayfinding Sub-bar component.
* **Quality Gate:** `pnpm --filter @aic/web dev` launches without errors; language toggle updates locale route (`/` to `/mr/`); zero horizontal overflow on mobile drawer.

---

### Task 6: Reusable UI Component Migration
* **Objective:** Port the 27 reusable UI components from `prototype/components/` and `docs/design/components/component-inventory.md` into accessible React Server / Client Components using Tailwind CSS.
* **Dependencies:** Task 5.
* **Inputs:** `docs/design/components/component-inventory.md`, `prototype/components/showcase.html`.
* **Deliverables:**
  * Base components: `Button`, `Badge`, `Card`, `Container`, `SectionHeader`, `SkipLink`.
  * Form components: `Input`, `Select`, `Textarea`, `Checkbox`, `FormGroup`, `ErrorMessage`.
  * Interactive components: `Modal` (dialog, focus trapping, Escape listener), `Tabs`, `PillFilterBar`, `CounterBadge`.
  * Storybook or internal component gallery route (`/components`).
* **Quality Gate:** 100% of components support keyboard navigation; focus rings visible; all buttons $\ge 44\text{px}$ touch target; automated unit tests with Vitest verify render states.

---

### Task 7: Public Institutional Website Pages Implementation
* **Objective:** Construct the core public informational pages combining Next.js Server Components with backend API data.
* **Dependencies:** Task 4, Task 6.
* **Inputs:** `docs/design/page-templates-and-screen-mockups.md`, `prototype/index.html`.
* **Deliverables:**
  * Homepage (`app/[locale]/(public)/page.tsx`): Hero, legacy banner, programs continuum, 6 focus areas, startup showcase, impact stats, upcoming events.
  * About Us (`app/[locale]/(public)/about/page.tsx`): Overview, mission/vision, leadership team, 5 prototyping labs.
  * Programs Listing & Detail (`app/[locale]/(public)/programs/...`): Incubation continuum, SISFS tranches, eligibility self-assessment.
  * Innovation Focus Areas (`app/[locale]/(public)/innovation/page.tsx`): 6 thematic domains.
  * Impact Dashboard (`app/[locale]/(public)/impact/page.tsx`): Dynamic FY22-FY25 switcher, certified metric badges, audit records.
  * Reports & Publications (`app/[locale]/(public)/publications/page.tsx`): Centralized document downloads.
  * Contact & Campus (`app/[locale]/(public)/contact/page.tsx`): Campus location, travel directions, inquiry form.
* **Quality Gate:** Pages pre-render cleanly with SSG/SSR; bilingual mirroring verified across all public views; zero layout shifts (`CLS < 0.05`).

---

### Task 8: Interactive Features & API Integration
* **Objective:** Implement client-side interactive islands connecting to NestJS API endpoints.
* **Dependencies:** Task 7.
* **Inputs:** `prototype/script.js`, `docs/design/interactive-prototype-specification.md`.
* **Deliverables:**
  * Startup Directory (`app/[locale]/(public)/startups/page.tsx`): Live search query, sector pill filter buttons, startup detail modal.
  * Event Workshop RSVP (`app/[locale]/(public)/events/page.tsx`): Event filter tabs, modal registration form with phone/email validation, capacity check, and reference code generation.
  * SISFS Eligibility Self-Assessment Tool: Live checkbox calculator with conditional CTA unlock.
  * Institutional Contact Inquiry Form: Input validation, anti-spam honeypot, and database logging.
* **Quality Gate:** Search filters execute within 50ms; modal dialogs maintain focus trap and restore focus on close; contact and RSVP forms validate and persist records in PostgreSQL.

---

### Task 9: Storage Abstraction & Pitch Deck Upload System
* **Objective:** Implement the dual-storage service interface, public media distribution, and encrypted file upload handling for applicant pitch decks.
* **Dependencies:** Task 4, Task 8.
* **Inputs:** `docs/architecture/solution-architecture.md` (Section 7).
* **Deliverables:**
  * `IStorageService` interface and `LocalStorageAdapter` implementation.
  * Public file controller streaming annual reports and brochures.
  * Private file upload controller handling PDF pitch decks (MIME-type validation, 15 MB limit, SHA-256 integrity hash, disk encryption).
  * Streaming download controller enforcing RBAC and reviewer NDA access restrictions.
* **Quality Gate:** Upload of non-PDF or oversized files rejected with clear HTTP 400 errors; unauthenticated access to private uploads returns HTTP 401/403.

---

### Task 10: Docker Compose & Nginx Ingress Integration
* **Objective:** Create production and development Docker Compose configurations and Nginx reverse proxy routing.
* **Dependencies:** Tasks 4, 5, 9.
* **Inputs:** `docs/architecture/solution-architecture.md` (Sections 3 and 8).
* **Deliverables:**
  * `docker/nginx/default.conf` implementing TLS 1.3, reverse proxy routing, rate-limiting, and security headers (CSP, HSTS, X-Frame-Options).
  * `docker/docker-compose.yml` defining `nginx`, `web`, `api`, and `db` services with non-root execution (`uid: 1001`), resource limits, and persistent host volumes.
  * `docker/docker-compose.dev.yml` for rapid local containerized development.
* **Quality Gate:** `docker compose up -d` boots all 4 containers cleanly; `curl http://localhost/` returns Next.js HTML; `curl http://localhost/api/health` returns NestJS healthcheck; direct access to private storage blocked.

---

### Task 11: End-to-End Testing, Accessibility Auditing & Pre-Deployment Hardening
* **Objective:** Execute comprehensive automated test suites, verify WCAG 2.2 AA compliance via Axe-Core, test all 5 viewports, and audit security headers.
* **Dependencies:** Task 10.
* **Inputs:** `docs/design/reviews/accessibility-review.md`, `docs/design/reviews/responsive-test-results.md`.
* **Deliverables:**
  * Playwright E2E test suites covering:
    1. Navigation and bilingual switching.
    2. Startup search and modal interaction.
    3. Event RSVP registration flow.
    4. Contact form validation.
  * Automated accessibility suite using `@axe-core/playwright` reporting zero critical or serious WCAG 2.2 AA violations.
  * Lighthouse CI configuration verifying performance ($\ge 90$), accessibility ($100$), best practices ($100$), and SEO ($100$).
  * Final pre-deployment verification report.
* **Quality Gate:** 100% of E2E tests pass across Chromium, WebKit, and Firefox; zero WCAG Level AA violations; deployment checklist verified.

---

## 3. Risk Management & Mitigation Matrix

| Potential Risk | Impact | Probability | Architectural Mitigation Enforced in Plan |
| :--- | :---: | :---: | :--- |
| **Devanagari Font Layout Shift & Overflow** | High | Medium | Task 5 enforces `Noto Sans Devanagari` font fallback with explicit line-height (1.6) and flexible container wrapping. |
| **Prisma Schema Drift Between Services** | Critical | Low | Task 2 & 3 isolate Prisma in `packages/database`, ensuring a single authoritative schema source. |
| **Confidential Pitch Deck Leakage** | Critical | Low | Task 9 enforces private volume isolation outside Nginx web root; files accessible exclusively via authenticated streaming controllers. |
| **Memory Exhaustion on On-Premise VM** | High | Low | Task 10 configures strict Docker Compose memory reservations and omits memory-heavy distributed daemons like Redis/Kubernetes. |
| **Bilingual Translation Lag Delaying Launch** | Medium | High | Task 7 decouples page rendering: English content renders fully, with accessible fallback banners on incomplete Marathi translations. |

---

## 4. Immediate Next Steps

Upon approval of this architecture package:
1. **Proceed to Phase 3, Task 2:** Initialize the `pnpm` monorepo workspace, root configurations, shared packages, and tooling scripts.
2. Maintain all existing Phase 1 specifications, Phase 2 design documents, and prototypes untouched as authoritative reference baselines.
