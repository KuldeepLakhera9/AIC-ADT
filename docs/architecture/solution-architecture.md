# Solution Architecture Specification
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 1  
**Author:** Principal Software Architect & Enterprise Solutions Consultant  
**Date:** October 10, 2026  
**Status:** **APPROVED BASELINE SPECIFICATION**

---

## 1. Architectural Vision & Core Principles

The solution architecture for the **AIC-ADT Baramati Foundation** establishes an enterprise-grade, accessible, and maintainable digital platform. It directly translates the requirements of Phase 1 and the visual/interaction specifications of Phase 2 into a robust, type-safe full-stack system.

### 1.1 Core Principles
1. **End-to-End Type Safety:** TypeScript across frontend, backend, database client, and shared validation DTOs.
2. **Modular Monolith Architecture:** Single cohesive backend codebase partitioned into clean, domain-driven modules rather than complex, distributed microservices.
3. **Lean Infrastructure:** No unnecessary distributed dependencies (e.g., omitting Redis and Kubernetes in favor of PostgreSQL-backed sessions/jobs and Docker Compose), ensuring reliable operation in an on-premise data center.
4. **Data Sovereignty & Defense in Depth:** Strict separation between public static content, authenticated applicant submissions, and private internal campus databases.
5. **Accessibility & Bilingual Parity:** First-class Devanagari (Marathi) support alongside English, fully compliant with WCAG 2.2 Level AA.

---

## 2. System Context (C4 Model — Level 1)

The system context diagram illustrates the AIC-ADT platform boundary and its interactions with human actors and external enterprise systems.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                     ACTORS                                             │
├─────────────────────┬──────────────────────┬────────────────────┬──────────────────────┤
│   Public Visitors   │   Startup Founders   │   Peer Reviewers   │ Institutional Admins │
│  (Farmers, Students,│ (Incubation & Grant  │  (Mentors, Experts,│  (Program Managers,  │
│  Researchers, CSR)  │     Applicants)      │    NDA Evaluators) │   Content Editors)   │
└──────────┬──────────┴──────────┬───────────┴──────────┬─────────┴──────────┬───────────┘
           │                     │                      │                    │
           │ HTTPS               │ HTTPS (Auth)         │ HTTPS (Auth)       │ HTTPS (RBAC)
           ▼                     ▼                      ▼                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      AIC-ADT DIGITAL PLATFORM BOUNDARY                                 │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                            NGINX Edge Reverse Proxy                              │  │
│  │                    (TLS 1.3 Termination, Rate Limiting, CSP)                     │  │
│  └──────────────────────────┬─────────────────────────────┬─────────────────────────┘  │
│                             │                             │                            │
│                             ▼                             ▼                            │
│              ┌─────────────────────────────┐┌─────────────────────────────┐            │
│              │    Next.js Web Application  ││    NestJS Modular API Engine│            │
│              │    (Bilingual SSR / SSG)    ││    (Core Business Services) │            │
│              └──────────────┬──────────────┘└─────────────┬───────────────┘            │
│                             │                             │                            │
│                             │                             ▼                            │
│                             │               ┌─────────────────────────────┐            │
│                             │               │      PostgreSQL 16+ DB      │            │
│                             │               │ (Encrypted Relational Store)│            │
│                             │               └─────────────┬───────────────┘            │
│                             │                             │                            │
│                             ▼                             ▼                            │
│              ┌────────────────────────────────────────────────────────────┐            │
│              │             Persistent Host Storage Volumes                │            │
│              │  ├─ /storage/public  (Static Media, Reports, Brochures)    │            │
│              │  └─ /storage/private (Encrypted Applicant Pitch Decks)     │            │
│              └────────────────────────────────────────────────────────────┘            │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            │ Egress (Internal Relay / HTTPS)
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                EXTERNAL SYSTEMS                                        │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│         Campus SMTP Mail Relay            │         DLT-Registered SMS Gateway         │
│   (Sharadanagar IT Server - Port 587)     │     (Govt. Telecom OTP Dispatches)         │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 3. Container Topology (C4 Model — Level 2)

The application runs as a cohesive multi-container topology orchestrated via Docker Compose on the dedicated on-premise virtual machine.

```
                                  PUBLIC INTERNET
                                         │
                                         ▼ (Port 80 / 443)
                         ┌───────────────────────────────┐
                         │      NGINX Reverse Proxy      │
                         │      (Alpine Linux Image)     │
                         └───────────────┬───────────────┘
                                         │
                     ┌───────────────────┴───────────────────┐
     Reverse Proxy   │ /                                     │ /api/
     Routing:        ▼                                       ▼
     ┌───────────────────────────────┐       ┌───────────────────────────────┐
     │    Next.js Frontend Service   │       │     NestJS API Service        │
     │    Container (Node.js 20 LTS) │       │   Container (Node.js 20 LTS)  │
     │    Internal Port: 3000        │       │   Internal Port: 4000         │
     └───────────────┬───────────────┘       └───────────────┬───────────────┘
                     │                                       │
                     │  Internal Bridge Network: aic_net     │
                     └───────────────────┬───────────────────┘
                                         │
                                         ▼
                         ┌───────────────────────────────┐
                         │     PostgreSQL 16+ Database   │
                         │    (Official Postgres Image)  │
                         │    Internal Port: 5432        │
                         └───────────────┬───────────────┘
                                         │
                     ┌───────────────────┴───────────────────┐
     Host Volume     │ postgres_data                         │ /storage
     Mounts:         ▼                                       ▼
     ┌───────────────────────────────┐       ┌───────────────────────────────┐
     │  Host: /var/lib/aic/postgres  │       │ Host: /var/lib/aic/storage    │
     │  (Database ACID Tablespace)   │       │ (Public Media & Private Docs) │
     └───────────────────────────────┘       └───────────────────────────────┘
```

### 3.1 Network Isolation Rules
* The database container does **not** expose port 5432 to the host network interface. It is accessible exclusively through the private Docker bridge network (`aic_net`).
* Only Nginx binds to host ports 80 and 443. All traffic between Nginx, Next.js, and NestJS traverses internal container DNS names (`http://web:3000` and `http://api:4000`).

---

## 4. Monorepo Architecture (`pnpm` Workspace)

To maximize code sharing, type consistency, and unified build orchestration without repository fragmentation, the codebase is structured as a **pnpm workspace monorepo**:

```
aic-adt-website/
├── apps/
│   ├── web/                         # Next.js 14+ App Router frontend application
│   │   ├── app/                     # Route tree ([locale]/(public), (portal), (admin))
│   │   ├── components/              # React UI components (migrated from prototype)
│   │   ├── hooks/                   # Custom React hooks (bilingual, filters, wizard)
│   │   ├── lib/                     # Client-side API fetchers and utilities
│   │   ├── public/                  # Static brand assets, fonts, icons
│   │   ├── styles/                  # Tailwind CSS root and design token mappings
│   │   ├── tailwind.config.ts       # Tailwind configuration with Phase 2 tokens
│   │   ├── next.config.mjs          # Next.js configuration (bilingual rewrites, image domains)
│   │   ├── tsconfig.json            # Frontend TypeScript configuration
│   │   └── package.json             # Frontend dependencies
│   │
│   └── api/                         # NestJS modular monolith backend application
│       ├── src/
│       │   ├── core/                # Core framework filters, interceptors, guards
│       │   ├── modules/             # Domain modules (Auth, Startups, Programs, etc.)
│       │   ├── app.module.ts        # Root module assembling domain providers
│       │   └── main.ts              # Entry point (CORS, Pipes, Helmet, Swagger)
│       ├── test/                    # Integration and e2e test suites
│       ├── tsconfig.json            # Backend TypeScript configuration
│       └── package.json             # Backend dependencies
│
├── packages/
│   ├── database/                    # Centralized Prisma data layer
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Complete schema definition
│   │   │   ├── migrations/          # Version-controlled SQL migrations
│   │   │   └── seed.ts              # Seeding script with Phase 2 prototype data
│   │   ├── src/                     # PrismaClient factory and extension utilities
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── shared/                      # Shared TypeScript types, DTOs, and validation schemas
│   │   ├── src/
│   │   │   ├── types/               # Domain interfaces (Startup, Event, Program)
│   │   │   ├── dto/                 # Request/Response DTO contracts
│   │   │   └── schemas/             # Zod validation schemas (forms, intake)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── config/                      # Shared configuration presets
│       ├── eslint-preset/           # Standardized ESLint configuration
│       └── typescript-preset/       # Base tsconfig.json bases
│
├── docker/                          # Containerization manifests
│   ├── nginx/                       # Nginx configuration (nginx.conf, default.conf)
│   ├── docker-compose.yml           # Production Docker Compose definition
│   └── docker-compose.dev.yml       # Local development Docker Compose definition
│
├── docs/                            # Comprehensive documentation repository
├── prototype/                       # Preserved Phase 2 high-fidelity prototypes
├── pnpm-workspace.yaml              # Monorepo package boundaries definition
├── package.json                     # Monorepo root scripts & dev dependencies
└── .gitignore                       # Repository-wide ignore rules
```

---

## 5. Component Architecture (C4 Model — Level 3)

### 5.1 Frontend Architecture (`apps/web`)
* **Framework:** Next.js 14+ with App Router and React Server Components (RSC).
* **Rendering Strategy:**
  * **Static Site Generation (SSG) / ISR:** Informational public pages (About, Programs Overview, Specialized Labs, Innovation Focus Areas) pre-rendered at build time with scheduled incremental revalidation.
  * **Server-Side Rendering (SSR):** Startup Directory (`/startups`), Event Calendar (`/events`), and Impact Dashboard (`/impact`) rendered per request to reflect certified database updates instantly.
  * **Client Components (`'use client'`):** Interactive user journey controls strictly limited to interactive islands:
    * Startup Search & Domain Filter Bar
    * SISFS Eligibility Self-Assessment Calculator
    * Multi-step Application Wizard
    * Event RSVP Modal & Form Validation
    * Universal Mobile Drawer and Language Toggle
* **Styling & Design Tokens:** Tailwind CSS configured with approved Phase 2 tokens:
  * Brand palette (`primary`, `accent`, `institutional-dark`, `surface-light`, `text-primary`, `text-secondary`, `text-muted`).
  * Custom font families (`Outfit` for display headings, `Inter` for body copy).
  * 4px base spacing scale and custom border-radius tokens.
* **Animation & Motion:** Restrained CSS transitions (`transition-all duration-150 ease-out`). Framer Motion used only for complex modal dialog transitions, wizard step slides, and drawer reveal animations. All motion wrapped in `prefers-reduced-motion` overrides.

### 5.2 Backend Modular Monolith (`apps/api`)
The NestJS backend API is designed as a **Modular Monolith**. Each domain represents an encapsulated module containing its own Controllers, Services, DTOs, and Entities:

```
apps/api/src/modules/
├── auth/                 # Session authentication, OTP generation, password hashing
├── users/                # User account management & RBAC role assignments
├── startups/             # Startup directory, domain filtering, profile detail
├── programs/             # Incubation continuum, SISFS tranches, eligibility rules
├── applications/         # Multi-step intake, 30s auto-save drafts, pitch deck uploads
├── reviews/              # Reviewer assignment, scoring rubric, electronic NDA gate
├── events/               # Event calendar, workshop RSVP intake, capacity check
├── impact/               # Certified metrics, historical fiscal periods (FY22–FY25)
├── publications/         # Annual reports repository, policy guidelines, downloads
├── media/                # File upload handler, storage abstraction, MIME validation
└── audit-logs/           # Append-only operational audit logging interceptor
```

---

## 6. Data Architecture & Database Modeling

The database is built on **PostgreSQL 16+** and managed using **Prisma ORM**.

### 6.1 Core Entity Relationship Overview
* **`User` (RBAC):** Id, email, phone, passwordHash, role (`PUBLIC_APPLICANT`, `REVIEWER`, `PROGRAM_MANAGER`, `CONTENT_EDITOR`, `APPROVER`, `IMPACT_MANAGER`, `ADMIN`), isActive, createdAt.
* **`Startup`:** Id, slug, name, founderName, sector (AGRITECH, SMART_FARMING, BIOTECH, FOOD_PROCESSING, CLIMATE_TECH), stage, cohortYear, trlLevel, farmerReach, labsUsed, description, logoUrl, status (PUBLISHED, DRAFT, ARCHIVED).
* **`Program`:** Id, slug, name, category (PRE_INCUBATION, INCUBATION, ACCELERATION), tranchesOverview, eligibilityCriteria (JSONB), isIntakeActive.
* **`Application`:** Id, referenceNumber (e.g. `AIC-2026-INC-0142`), userId, programId, status (DRAFT, SUBMITTED, UNDER_REVIEW, SHORTLISTED, REJECTED), stage1Data (JSONB), stage2Data (JSONB), pitchDeckUrl, submittedAt, lastAutoSavedAt.
* **`ApplicationReview`:** Id, applicationId, reviewerId, ndaAcceptedAt, scoreMarket (1-10), scoreTech (1-10), scoreFinancial (1-10), totalScore, comments, submittedAt.
* **`Event`:** Id, slug, title, eventDate, location, capacity, rsvpCount, isPublished, registrationDeadline.
* **`EventRsvp`:** Id, eventId, attendeeName, attendeeEmail, attendeePhone, organization, referenceCode.
* **`ImpactMetric`:** Id, fiscalYear (`FY24-25`, `FY23-24`, etc.), startupsGraduated, grantsDisbursedCrores, patentsFiled, farmersReached, isCertified, auditDocumentUrl.
* **`Publication`:** Id, title, category (ANNUAL_REPORT, POLICY_BRIEF, SCHEME_GUIDELINE), fileUrl, fileSize, publishDate.
* **`AuditLog`:** Id, userId, action, resource, resourceId, ipAddress, userAgent, timestamp, metadata (JSONB).

### 6.2 Data Collation & Character Encoding
Database cluster initialized with `UTF-8` character encoding and `mr_IN` Devanagari collation support to guarantee native alphabetical sorting of Marathi startup names and founder records.

---

## 7. Storage Abstraction Architecture

To handle public collateral and confidential startup pitch decks with high security:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STORAGE SERVICE INTERFACE                       │
│     (IStorageService: upload(), stream(), delete(), getPublicUrl())    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│       PUBLIC STORAGE ADAPTER        │   │       PRIVATE STORAGE ADAPTER       │
│ Mount Point: /storage/public        │   │ Mount Point: /storage/private       │
│ Access: Direct NGINX static caching │   │ Access: Authenticated NestJS stream │
│ Content: Annual Reports, Logos,     │   │ Content: Encrypted Pitch Decks,     │
│ Brochure PDFs, Event Posters        │   │ Financial Statements, Audits        │
└─────────────────────────────────────┘   └─────────────────────────────────────┘
```

* **Public Storage (`/storage/public`):** Nginx serves files directly with immutable caching headers (`Cache-Control: public, max-age=86400`).
* **Private Storage (`/storage/private`):** Encrypted at rest. Nginx blocks all direct HTTP access. Files are accessed strictly via authenticated NestJS endpoints (`GET /api/applications/:id/pitch-deck`) enforcing RBAC role checks and reviewer NDA verification.

---

## 8. Network & Ingress Routing Specification

Nginx acts as the single public gateway terminating TLS 1.3:

| URI Pattern | Route Destination | Caching / Security Policy |
| :--- | :--- | :--- |
| `/` (All public routes) | `http://web:3000` (Next.js) | Micro-cached for 60s during high traffic; HSTS & CSP enforced. |
| `/api/*` | `http://api:4000` (NestJS) | Rate-limited (100 req/min per IP); zero caching; security headers. |
| `/uploads/public/*` | `/storage/public` (Nginx Local) | Direct static file streaming; cached 24h in client. |
| `/uploads/private/*` | **BLOCKED (HTTP 403 Forbidden)** | Direct access prohibited; must go through `/api/`. |
| `/_next/static/*` | `http://web:3000` (Next.js Assets) | Immutable cache (`max-age=31536000, immutable`). |

---

## 9. Conclusion

The solution architecture provides a clean, maintainable, and type-safe roadmap. By avoiding unnecessary external infrastructure like Redis and Kubernetes, the system remains reliable, easy to operate in the Baramati data center, and completely faithful to the approved Phase 1 requirements and Phase 2 designs.
