# Monorepo Workspace Structure & Package Architecture
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 2  
**Author:** Senior Full-Stack Engineer & Solution Architect  
**Date:** October 10, 2026  
**Status:** **ACTIVE MONOREPO SPECIFICATION**

---

## 1. Monorepo Overview

The AIC-ADT digital platform utilizes a **pnpm workspace monorepo** layout to coordinate the frontend web portal and backend API engine under a unified, type-safe development environment.

### 1.1 Architecture Goals
1. **Strict Dependency Isolation:** Managed via `pnpm` content-addressable storage and symlinks, eliminating phantom dependencies.
2. **Independent Deployability:** Frontend (`apps/web`) and Backend (`apps/api`) maintain isolated build lifecycles and can be built, tested, or containerized independently.
3. **Single Unified Lockfile:** `pnpm-lock.yaml` at the root guarantees 100% deterministic dependency versions across development machines and CI/CD pipelines.
4. **Preservation of Design Baselines:** All Phase 1 requirements, Phase 2 design specifications, and prototypes (`prototype/`) remain untouched as authoritative references.

---

## 2. Directory & Package Layout

```
AIC-ADT/
├── apps/
│   ├── web/                         # Next.js Frontend Application (@aic/web)
│   │   ├── src/
│   │   │   ├── app/                 # App Router (layout, page, error, not-found)
│   │   │   │   ├── error.tsx        # Client error boundary with recovery action
│   │   │   │   ├── globals.css      # Tailwind v4 import, Phase 2 tokens & reduced motion
│   │   │   │   ├── layout.tsx       # Root layout with Outfit/Inter fonts & skip link
│   │   │   │   ├── not-found.tsx    # Branded custom 404 page
│   │   │   │   └── page.tsx         # Minimal branded development overview page
│   │   │   └── components/          # Reusable UI components & layout primitives
│   │   │       └── layout/
│   │   │           ├── Container.tsx# Responsive container primitive (max-w-7xl)
│   │   │           ├── Footer.tsx   # Institutional footer with campus address
│   │   │           └── Header.tsx   # Institutional header with utility bar & status
│   │   ├── .env.example             # Frontend environment variables template
│   │   ├── next.config.ts           # Next.js configuration
│   │   ├── package.json             # @aic/web dependencies & scripts
│   │   └── tsconfig.json            # Frontend TypeScript configuration
│   │
│   └── api/                         # NestJS Modular Monolith API (@aic/api)
│       ├── src/
│       │   ├── common/              # Shared infrastructure filters & pipes
│       │   │   └── filters/
│       │   │       └── http-exception.filter.ts # Global standardized JSON error filter
│       │   ├── health/              # Service healthcheck domain module
│       │   │   ├── health.controller.ts     # GET /api/v1/health endpoint
│       │   │   ├── health.controller.spec.ts# Vitest unit test suite
│       │   │   ├── health.module.ts         # Module declaration
│       │   │   └── health.service.ts        # Health check payload builder
│       │   ├── app.controller.ts    # Root controller
│       │   ├── app.controller.spec.ts# Vitest unit test
│       │   ├── app.module.ts        # Root module with ConfigModule & HealthModule
│       │   ├── app.service.ts       # Root service
│       │   └── main.ts              # Entry point with global prefix, CORS, validation
│       ├── test/                    # End-to-end test suites
│       │   └── app.e2e-spec.ts
│       ├── .env.example             # Backend environment variables template
│       ├── nest-cli.json            # NestJS CLI configuration
│       ├── package.json             # @aic/api dependencies & scripts
│       ├── tsconfig.json            # NodeNext ESM TypeScript configuration
│       └── vitest.config.ts         # Vitest test runner configuration
│
├── docs/                            # Comprehensive documentation repository
├── prototype/                       # Preserved Phase 2 high-fidelity prototypes
├── .editorconfig                    # Universal code style conventions
├── .env.example                     # Root environment configuration template
├── .gitignore                       # Repository-wide Git exclusions
├── .npmrc                           # pnpm build script approval policy
├── package.json                     # Monorepo root scripts & dev dependencies
├── pnpm-lock.yaml                   # Deterministic dependency lockfile
└── pnpm-workspace.yaml              # Workspace package boundaries
```

---

## 3. Package Manifests & Responsibilities

### 3.1 Root Package (`aic-adt-monorepo`)
* **Role:** Orchestrates development commands, linting, formatting, and builds across all workspace members.
* **Key Scripts:**
  * `pnpm dev`: Runs both applications concurrently (`@aic/web` on `:3000`, `@aic/api` on `:4000`).
  * `pnpm build`: Concurrently builds production bundles for web and api.
  * `pnpm typecheck`: Validates TypeScript types across both applications.
  * `pnpm lint`: Lints both applications with zero errors.
  * `pnpm test`: Executes automated Vitest test suites.
  * `pnpm format:check`: Validates Prettier code style across `apps/`.

### 3.2 Frontend Application (`@aic/web`)
* **Role:** Public web portal, bilingual routing, interactive search/filter islands, and institutional storytelling.
* **Core Technologies:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 5.
* **Key Features Initialized:**
  * Custom font integration via `next/font/google` (`Outfit` for display headings, `Inter` for functional body text).
  * Design tokens mapped into Tailwind CSS theme and `:root` custom properties.
  * Responsive layout primitives (`Container`, `Header`, `Footer`).
  * Accessible skip-to-content target (`#main-content`).
  * Custom error boundary (`error.tsx`) and branded 404 page (`not-found.tsx`).

### 3.3 Backend API Engine (`@aic/api`)
* **Role:** Business logic, data ingestion, validation, and health monitoring.
* **Core Technologies:** NestJS 12, NodeNext ESM, Express, Vitest, TypeScript 6.
* **Key Features Initialized:**
  * Versioned API routing under prefix `/api/v1`.
  * Dedicated health module (`GET /api/v1/health`) exposing uptime, service name, version, and environment.
  * Global exception filter formatting all HTTP errors into consistent JSON envelopes.
  * Global validation pipe (`ValidationPipe`) enforcing request body whitelisting and type transformation.
  * Environment configuration loaded via `@nestjs/config`.
  * Automated unit tests powered by Vitest.

---

## 4. Boundary Isolation & Dependency Rules

1. **No Circular References:** `apps/web` must communicate with `apps/api` strictly over HTTP/JSON (`/api/v1/*`). No direct cross-app TypeScript imports are permitted between `apps/web` and `apps/api`.
2. **Shared Contracts (Phase 3, Task 3+):** Common TypeScript types, DTO interfaces, and Zod validation schemas will be introduced into `packages/shared/` when multi-module endpoints expand.
3. **Preservation of Prototypes:** The static files in `prototype/` serve as the visual reference and must not be imported or modified during production builds.
