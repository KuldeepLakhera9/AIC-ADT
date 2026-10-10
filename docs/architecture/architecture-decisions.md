# Architecture Decision Records (ADRs)
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 1  
**Author:** Principal Software Architect & Senior TypeScript Engineer  
**Date:** October 10, 2026  
**Status:** **ACTIVE / PROPOSED ARCHITECTURE DECISION LOG**

---

## Index of Architecture Decisions

* [ADR-001: Monorepo Management via pnpm Workspace](#adr-001-monorepo-management-via-pnpm-workspace)
* [ADR-002: Frontend Framework Selection — Next.js App Router with TypeScript](#adr-002-frontend-framework-selection--nextjs-app-router-with-typescript)
* [ADR-003: Frontend Styling — Tailwind CSS with Custom Phase 2 Design Tokens](#adr-003-frontend-styling--tailwind-css-with-custom-phase-2-design-tokens)
* [ADR-004: Motion & Animation Framework — Restrained Transitions with Targeted Framer Motion](#adr-004-motion--animation-framework--restrained-transitions-with-targeted-framer-motion)
* [ADR-005: Backend Architecture — NestJS Modular Monolith](#adr-005-backend-architecture--nestjs-modular-monolith)
* [ADR-006: Database Engine & ORM — PostgreSQL 16+ with Prisma ORM](#adr-006-database-engine--orm--postgresql-16-with-prisma-orm)
* [ADR-007: Lean Infrastructure Architecture — Omission of Redis & Kubernetes](#adr-007-lean-infrastructure-architecture--omission-of-redis--kubernetes)
* [ADR-008: Authentication Strategy — Secure Server-Side Sessions via HTTP-Only Cookies](#adr-008-authentication-strategy--secure-server-side-sessions-via-http-only-cookies)
* [ADR-009: Ingress, Reverse-Proxy & TLS Termination — Nginx Alpine](#adr-009-ingress-reverse-proxy--tls-termination--nginx-alpine)
* [ADR-010: File Storage Abstraction — Dual Public & Encrypted Private Host Volumes](#adr-010-file-storage-abstraction--dual-public--encrypted-private-host-volumes)
* [ADR-011: Testing & Quality Assurance Strategy — Vitest, Playwright, and Axe-Core](#adr-011-testing--quality-assurance-strategy--vitest-playwright-and-axe-core)
* [ADR-012: On-Premise Baramati Data Center Deployment — Docker Compose with Hardened Non-Root Containers](#adr-012-on-premise-baramati-data-center-deployment--docker-compose-with-hardened-non-root-containers)

---

## ADR-001: Monorepo Management via pnpm Workspace

### Status
**APPROVED**

### Context
The AIC-ADT digital platform consists of a Next.js frontend, a NestJS backend API, a shared database schema (Prisma), and common validation schemas (DTOs/Zod). Managing these in separate repositories risks version drift, duplicate type definitions, and complex multi-repo CI/CD coordination.

### Decision
Adopt a **pnpm workspace monorepo** layout:
* `apps/web`: Next.js frontend.
* `apps/api`: NestJS backend.
* `packages/database`: Prisma schema, migrations, and database client export.
* `packages/shared`: Shared TypeScript types, DTO contracts, and validation schemas.

### Rationale & Benefits
* **Strict Dependency Isolation:** `pnpm` uses a content-addressable storage model and symlinks, preventing phantom dependencies common in npm/yarn.
* **Shared Type Contracts:** Frontend and backend share the exact same DTO interfaces and Zod schemas directly from `packages/shared`, ensuring compile-time contract safety.
* **Efficient Disk & Build Footprint:** Rapid local dependency installation and cache sharing across packages.

### Alternatives Considered
* *npm / yarn workspaces:* Less strict dependency isolation; prone to phantom dependencies.
* *Turborepo / Nx:* High overhead for a 2-app monolithic system in early implementation. Can be layered on top later if caching requires it.
* *Multi-repo structure:* High friction, out-of-sync API contracts, and fragmented deployment workflows.

### Operational Trade-offs
* Requires team familiarity with pnpm workspace filtering syntax (`pnpm --filter @aic/web ...`).

---

## ADR-002: Frontend Framework Selection — Next.js App Router with TypeScript

### Status
**APPROVED**

### Context
The public website requires fast initial server rendering, search engine visibility (SEO), bilingual route mirroring (`/` vs `/mr/`), and low Time to First Byte (TTFB) across rural 4G connections.

### Decision
Use **Next.js 14+ with App Router and TypeScript**.

### Rationale & Benefits
* **Hybrid Rendering:** Pre-renders static institutional pages (About, Programs, Labs) via SSG/ISR while server-rendering dynamic content (Startups, Events, Impact) via SSR.
* **Native Bilingual Routing:** App Router folder organization (`app/[locale]/(public)/...`) provides clean, context-preserving bilingual switching without third-party router hacks.
* **SEO & Core Web Vitals:** Native image optimization (`next/image`), font optimization (`next/font`), and zero-JS static HTML payloads where interactions are not needed.

### Alternatives Considered
* *Single-Page Application (Vite + React SPA):* Poor SEO for institutional publications and reports; slower initial page render over rural mobile networks.
* *Remix / React Router v7:* Excellent SSR, but smaller ecosystem for bilingual institutional workflows and less mature static generation options for on-premise static caching.

### Operational Trade-offs
* Next.js server runtime requires Node.js execution container instead of a simple static file server. Mitigated by standardized Docker packaging.

---

## ADR-003: Frontend Styling — Tailwind CSS with Custom Phase 2 Design Tokens

### Status
**APPROVED**

### Context
Phase 2 established an extensive, audited design system documented in `docs/design/components/design-tokens.md` and visually demonstrated in `prototype/styles.css`. We need a production styling pipeline that enforces this system while preventing CSS bloat.

### Decision
Implement **Tailwind CSS**, configured to consume the exact custom tokens approved in Phase 2:
* Colors: `brand-primary` (`#004B2A`), `brand-accent` (`#73992A`), `institutional-dark` (`#0A2E1C`), `surface-light` (`#F7FAF7`), `text-muted` (`#59665D`).
* Typography: Fonts mapped to `Outfit` and `Inter`.
* Radii, shadows, and spacing matching Phase 2 specifications.

### Rationale & Benefits
* **Zero Runtime Overhead:** Tailwind compiles down to minimal, purged utility CSS, ensuring critical stylesheet payloads remain under 30 KB.
* **Component Encapsulation:** Enables rapid composition of accessible UI components with consistent utility classes matching the design system.
* **Responsive & Accessibility Modifiers:** Built-in breakpoint modifiers (`sm:`, `md:`, `lg:`) and pseudo-classes (`focus-visible:`, `disabled:`, `motion-reduce:`) eliminate error-prone custom media queries.

### Alternatives Considered
* *Raw Vanilla CSS:* Used in the prototype, but harder to maintain across modular React components without style leakage or naming collisions.
* *CSS Modules:* Clean scoping, but causes fragmented style files and duplicate CSS declarations across team members.

### Operational Trade-offs
* Developers must use the configured semantic token names rather than arbitrary values (e.g. `bg-brand-primary` instead of `bg-[#004B2A]`).

---

## ADR-004: Motion & Animation Framework — Restrained Transitions with Targeted Framer Motion

### Status
**APPROVED**

### Context
Phase 2 guidelines mandate an institutional, serious aesthetic avoiding flashy, gimmicky animations, while maintaining smooth state transitions for drawers, modals, and multi-step forms. Furthermore, WCAG 2.2 AA mandates strict compliance with `prefers-reduced-motion`.

### Decision
Adopt a **two-tier motion approach**:
1. **Tier 1 (Default):** Standard Tailwind CSS micro-transitions (`transition-all duration-150 ease-out`) for hover, focus, and button interactions.
2. **Tier 2 (Interactive Islands):** **Framer Motion** applied exclusively where complex React layout animations are needed (modal backdrop enter/exit, mobile drawer slide, and application wizard step transitions).
3. **Mandatory Reduced Motion:** Wrap all Framer Motion motion components and Tailwind transitions in `motion-reduce:transition-none` and `useReducedMotion()`.

### Rationale & Benefits
* Avoids bloating the main bundle on static public pages.
* Guarantees smooth, GPU-accelerated enter/exit animations on modal dialogs.
* Ensures 100% compliance with accessibility motion reduction guidelines.

### Alternatives Considered
* *Framer Motion everywhere:* Heavy bundle size penalty on simple informational pages.
* *Pure CSS animations everywhere:* Awkward handling of React component unmounting and dynamic layout shifts in multi-step wizards.

---

## ADR-005: Backend Architecture — NestJS Modular Monolith

### Status
**APPROVED**

### Context
The backend API must support multiple institutional workflows: public startup directory search, event RSVPs, multi-step incubation applications with auto-saving, peer review evaluation with electronic NDAs, and append-only audit logging.

### Decision
Structure the backend as a **NestJS Modular Monolith**:
* Domain-driven modules (`AuthModule`, `StartupsModule`, `ProgramsModule`, `ApplicationsModule`, `ReviewsModule`, `EventsModule`, `ImpactModule`, `PublicationsModule`, `AuditLogModule`).
* Built-in dependency injection, validation pipes, and guard-based RBAC.

### Rationale & Benefits
* **Maintainability & Governance:** Enforces clear architectural boundaries between business domains without the operational complexity of microservices.
* **Enterprise Features:** First-class support for interceptors (audit logging), filters (unified error formats), and decorators (role-based security).
* **Future Modularity:** If a specific service (e.g., Application Review Intake) ever requires independent scaling in future phases, clean module encapsulation enables trivial extraction.

### Alternatives Considered
* *Express / Fastify with ad-hoc routing:* Lacks standardized structure, dependency injection, and uniform validation pipelines.
* *Microservices Architecture:* Excessive operational overhead, network latency, distributed transaction complexity, and monitoring burden for an on-premise single-server deployment.

---

## ADR-006: Database Engine & ORM — PostgreSQL 16+ with Prisma ORM

### Status
**APPROVED**

### Context
The platform stores structured relational data (users, startups, programs, applications, reviews) alongside semi-structured JSON documents (dynamic form stages, eligibility checklists, evaluation rubrics). Complete UTF-8 Devanagari collation is mandatory for Marathi text.

### Decision
Adopt **PostgreSQL 16+** with **Prisma ORM**:
* Centralized in `packages/database`.
* Automated, version-controlled migrations via `prisma migrate`.
* Strongly typed Prisma Client shared across backend services.

### Rationale & Benefits
* **Type Safety & Productivity:** Prisma generates type-safe database queries directly from `schema.prisma`, catching schema mismatches at compile time.
* **Devanagari Support:** PostgreSQL handles UTF-8 collation natively, ensuring accurate alphabetical sorting of Marathi names and records.
* **JSONB Flexibility:** Allows multi-step application form drafts and dynamic evaluation criteria to be stored as structured JSONB without sacrificing query performance.

### Alternatives Considered
* *TypeORM / MikroORM:* Good alternatives, but Prisma provides superior DX, automatic migration generation, and cleaner TypeScript client generation.
* *MySQL / MariaDB:* Weaker JSONB indexing capabilities compared to PostgreSQL 16+.

---

## ADR-007: Lean Infrastructure Architecture — Omission of Redis & Kubernetes

### Status
**APPROVED**

### Context
Phase 1 initial exploration mentioned Redis for session caching and rate-limiting. However, Phase 3 architecture guidelines mandate: *"Do not add Redis, Kubernetes, microservices, or additional infrastructure without a documented requirement."* The Baramati data center environment demands operational simplicity, resource efficiency, and minimal failure surfaces.

### Decision
1. **Omit Redis:**
   * Session state and rate-limiting will be managed via PostgreSQL-backed session tables and NestJS in-memory throttlers (`@nestjs/throttler`), complemented by Nginx edge rate-limiting.
   * Background notifications (emails, SMS dispatches) will utilize transactional database task records rather than BullMQ/Redis.
2. **Omit Kubernetes:**
   * Multi-container orchestration will be managed via **Docker Compose**.

### Rationale & Benefits
* **Operational Reliability:** Eliminates Redis and Kubernetes daemon overhead, memory overhead, and network partition failure modes on the on-premise VM.
* **Simplified Disaster Recovery:** A single PostgreSQL backup (`pg_dump`) captures 100% of the application state, eliminating complex multi-datastore point-in-time synchronization.
* **Resource Optimization:** Conserves host RAM and CPU for the core Next.js and NestJS runtimes.

### Operational Trade-offs
* If concurrent traffic expands beyond 2,000 active sessions in future years, Redis can be introduced cleanly as a dedicated caching adapter without altering business code.

---

## ADR-008: Authentication Strategy — Secure Server-Side Sessions via HTTP-Only Cookies

### Status
**APPROVED (IMPLEMENTATION DEFERRED TO LATER FEATURE PHASE)**

### Context
Startup founders, expert reviewers, and institutional administrators require secure access to sensitive application data. The authentication mechanism must protect confidential intellectual property from cross-site scripting (XSS) and cross-site request forgery (CSRF).

### Decision
Adopt **Server-Side Session Authentication via Encrypted, HTTP-Only Cookies**:
* Session identifiers stored in a dedicated PostgreSQL `Session` table.
* Session cookies configured with `HttpOnly`, `Secure`, `SameSite=Lax`, and path restrictions.
* Integration of CSRF protection tokens for state-changing endpoints (`POST`, `PUT`, `DELETE`).
* **Implementation Phase:** In accordance with Phase 3 sequencing, authentication functionality is formally scheduled for a subsequent feature phase following public website completion.

### Rationale & Benefits
* **Immunity to LocalStorage XSS Theft:** Unlike JWTs stored in browser `localStorage`, HTTP-only session cookies cannot be read by malicious JavaScript.
* **Instant Session Revocation:** Administrators can revoke compromised sessions immediately in the database, which is impossible with stateless JWTs until expiration.

### Alternatives Considered
* *Stateless JWT in LocalStorage:* Severe security risk; tokens vulnerable to XSS exfiltration and cannot be revoked prior to expiration.
* *OAuth / Social Login (Google, LinkedIn):* Planned as an optional convenience layer in Phase 4, but institutional email/phone OTP credentials remain the authoritative primary method.

---

## ADR-009: Ingress, Reverse-Proxy & TLS Termination — Nginx Alpine

### Status
**APPROVED**

### Context
The application runs inside a Docker network and requires a hardened, high-performance edge proxy to terminate TLS 1.3, serve static media assets, route API requests, and inject mandatory HTTP security headers.

### Decision
Deploy **Nginx (Alpine Linux)** as the primary gateway container:
* Terminate TLS 1.3 (with TLS 1.2 fallback).
* Reverse proxy `/` to Next.js (`http://web:3000`) and `/api/` to NestJS (`http://api:4000`).
* Directly serve and cache public uploaded assets (`/uploads/public/`).
* Block direct public access to `/uploads/private/`.
* Inject CSP, HSTS, X-Frame-Options, and X-Content-Type-Options headers.

### Rationale & Benefits
* Battle-tested performance, minimal memory footprint (under 30 MB RAM), and robust rate-limiting and security header configuration.

---

## ADR-010: File Storage Abstraction — Dual Public & Encrypted Private Host Volumes

### Status
**APPROVED**

### Context
The platform manages two distinct classes of digital assets:
1. Public institutional publications, annual reports, and startup logos (freely downloadable).
2. Confidential startup business plans, financial projections, and patent documents (accessible only to authorized reviewers under NDA).

### Decision
Implement a **Storage Service Interface (`IStorageService`)** backed by two dedicated host volume mount points:
1. **Public Storage (`/storage/public`):** Mounted read-only into Nginx for high-speed static delivery.
2. **Private Storage (`/storage/private`):** Encrypted at rest. Mounted strictly into the NestJS backend container. Files streamed exclusively through authenticated controllers with RBAC and NDA checks.

### Rationale & Benefits
* Architectural abstraction prevents vendor lock-in, enabling future migration to on-premise S3-compatible storage (e.g. MinIO) without changing application code.
* Physical segregation prevents accidental exposure of proprietary intellectual property.

---

## ADR-011: Testing & Quality Assurance Strategy — Vitest, Playwright, and Axe-Core

### Status
**APPROVED**

### Context
Maintaining high code quality and WCAG 2.2 AA accessibility standards across iterative development sprints requires an automated testing harness.

### Decision
Standardize on a modern testing stack:
* **Unit & Component Testing:** **Vitest** + **React Testing Library** for fast, native TypeScript execution.
* **End-to-End Testing:** **Playwright** for multi-browser user journey verification across mobile and desktop viewports.
* **Automated Accessibility Testing:** **@axe-core/playwright** integrated into CI checks to catch WCAG regressions automatically.
* **Code Quality & Formatting:** **ESLint** (typescript-eslint) + **Prettier**.

### Rationale & Benefits
* Vitest provides instant feedback with zero-config TypeScript and ESM support.
* Playwright allows automated testing across Chromium, Firefox, and WebKit at exact viewport widths (320px, 375px, 768px, 1024px, 1440px).

---

## ADR-012: On-Premise Baramati Data Center Deployment — Docker Compose with Hardened Non-Root Containers

### Status
**APPROVED**

### Context
Deployment occurs on a single Linux Virtual Machine within the campus data center. The deployment model must be reproducible, secure, and resilient to host reboots.

### Decision
Deploy via **Docker Compose v2** with security hardening:
* All containers run as unprivileged users (`user: "1001:1001"`).
* Mandatory `restart: unless-stopped` policies.
* Explicit CPU and memory reservations in `docker-compose.yml`.
* Database port bound strictly to the internal Docker bridge network (`127.0.0.1` / private subnet).

### Rationale & Benefits
* Defense-in-depth against container breakout exploits.
* Predictable memory consumption preventing host operating system exhaustion.
