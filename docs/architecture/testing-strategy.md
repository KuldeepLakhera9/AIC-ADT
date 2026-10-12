# AIC-ADT Baramati Foundation — Automated Testing Strategy
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 8  
**Author:** Senior QA Automation Engineer & Software Reliability Specialist  
**Date:** October 10, 2026  
**Status:** **ACTIVE TEST ENGINEERING STANDARD**

---

## 1. Executive Summary & Testing Philosophy

The **AIC-ADT Baramati Foundation** digital platform serves as the public gateway and incubation hub for agricultural technology, rural enterprises, and research commercialization. Reliability, accessibility, and data integrity are non-negotiable.

This document establishes the multi-tier automated testing strategy for the pnpm monorepo. It codifies test boundaries, tooling standards, isolation mechanisms, and execution environments to guarantee zero regressions during full-stack implementation.

### Core Testing Tenets:
1. **Fast Local Feedback:** All unit and component tests execute in under 2 seconds locally without requiring external cloud services or slow container virtualization.
2. **Strict Isolation & Synthetic Test State:** Tests never mutate shared, staging, or production databases. Isolated in-memory mocks, synthetic test configurations, and ephemeral shadow schemas are used exclusively.
3. **Reproducibility Across Workstations & CI:** Identical scripts (`pnpm verify:phase3`) run on developer laptops and in continuous-integration pipelines.
4. **Transparent Scope Boundaries:** Clear distinction between structural unit/integration assertions and visual regression/browser matrix testing (reserved for end-to-end Playwright suites in Task 11).

---

## 2. Test Pyramid & Architectural Layers

```
                       ▲
                      / \
                     /   \
                    / E2E \       [Task 11: Playwright Multi-Browser Suites]
                   /-------\
                  / Integr. \     [Task 8: Supertest HTTP & Security Tests]
                 /-----------\
                /  Component  \   [Task 8: Vitest SSR & Accessibility Tests]
               /---------------\
              /  Unit / Domain  \ [Task 8: Vitest Modular Business Logic]
             /-------------------\
            /  Static / Typecheck \ [Task 8: tsc, oxlint, eslint, Prettier]
           /───────────────────────\
```

### Layer Breakdown:

| Testing Layer | Target Scope | Engine / Framework | Execution Time | Coverage Objective |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 1: Static Hygiene** | Syntax, formatting, type safety, linting | Prettier, Oxlint, ESLint, TypeScript (`tsc`) | ~2.5s | 100% type safety, 0 lint warnings, uniform formatting |
| **Layer 2: Database Contract** | Prisma schema validity, client generation | Prisma CLI (`validate`, `generate`) | ~1.5s | Strict relational schema integrity |
| **Layer 3: Frontend Component** | Shared UI primitives, accessible markup, layouts | Vitest, React DOM Server (`renderToStaticMarkup`) | <300ms | Responsive container tokens, a11y attributes, 44px touch targets |
| **Layer 4: Backend Unit** | Health probes, pipes, filters, interceptors, logger | Vitest, NestJS Testing Module | <1.0s | Edge-case validation, exception enveloping, credential redaction |
| **Layer 5: API Integration** | HTTP lifecycle, Helmet headers, CORS policies | Vitest, Supertest, Express HTTP adapter | <1.0s | End-to-end HTTP transport and correlation tracking |
| **Layer 6: Container Config** | Docker Compose topology and service networking | Docker Compose CLI (`config`) | <500ms | Offline syntax and port binding validation |

---

## 3. Frontend Testing Strategy (`@aic/web`)

### 3.1 Server-Side Component Rendering & Static Markup Assertions
Because Next.js 16 leverages React Server Components (RSC) and server-side rendering, component tests in Phase 3 execute using `react-dom/server` (`renderToStaticMarkup`) within Vitest. This allows rapid verification of rendered HTML markup without heavyweight browser DOM emulation.

### 3.2 Coverage Focus Areas:
1. **Root Layout & Branding Integrity:**
   * Container max-width constraints (`max-w-[1240px]`, `mx-auto`).
   * Institutional header landmarks (`<header>`, Atal Incubation Centre, ADT Baramati, `EN | मराठी`).
   * Institutional footer landmarks (`<footer>`, campus address, copyright notices).
2. **Shared Component Variants & Design Tokens:**
   * Botanical color tokens (`bg-[#004B2A]`, `bg-[#E8F0D9]`, `text-[#1B7340]`).
   * Minimum touch target compliance ($\ge 44\text{px}$ via `min-h-[44px]`).
   * Semantic badge variants (`default`, `botanical`, `success`, `warning`, `error`, `info`).
   * Alert roles (`role="status"` for warning/info, `role="alert"` for critical errors).
   * Card compound components (`CardHeader`, `CardTitle`, `CardContent`).
3. **Accessible Form Controls & Label Associations:**
   * Explicit `htmlFor` label-to-input association.
   * `aria-invalid="true"` injection upon error state.
   * `aria-describedby` linking input directly to `ErrorMessage` ID.
   * Distinct border highlight (`border-[#DC2626]`).
4. **Error Boundaries & 404 Behavior:**
   * Branded 404 page with functional return CTA (`/`).
   * `ErrorBoundary` UI rendering error notice and retry trigger.
5. **Client Environment Guards:**
   * Verification that `validatePublicEnvironmentSafety()` throws on sensitive keywords in `NEXT_PUBLIC_`.

---

## 4. Backend Testing Strategy (`@aic/api`)

### 4.1 Modular Monolith Isolation & Synthetic Configuration
Backend tests evaluate NestJS providers, controllers, and middlewares in total isolation from network dependencies.

### 4.2 Coverage Focus Areas:
1. **Health & Readiness Behavior:**
   * Liveness probe (`/api/v1/health/liveness`) returns `{ status: "ok", uptime }`.
   * Readiness probe (`/api/v1/health/readiness`) reports database status, handling both connected and disconnected states gracefully.
2. **Request Validation Pipes:**
   * Whitelist filtering strips non-DTO properties.
   * Validation errors return standardized RFC 7807-style error payloads.
3. **Global Exception Envelopes:**
   * Uniform error structure: `{ statusCode, message, timestamp, path, correlationId }`.
   * Automatic sanitization and redaction of database connection strings or passwords in error messages and stack traces.
4. **Logging & Credential Redaction:**
   * `AppLoggerService` produces single-line structured JSON logs with correlation IDs.
   * Redacts sensitive keys: `password`, `token`, `secret`, `authorization`, `database_url`.
5. **HTTP Security Defaults (Supertest E2E):**
   * Helmet security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`).
   * CORS allowlist permitting `http://localhost:3000` while disallowing unauthorized external origins.

---

## 5. Database Testing Strategy (`Prisma ORM`)

### 5.1 Relational Schema & Client Verification
Database quality gates verify the relational model without requiring destructive migrations:
1. **Schema Validation (`prisma validate`):** Static verification of syntax, relations, and index definitions in `schema.prisma`.
2. **Client Generation (`prisma generate`):** Validates TypeScript type emission for `@prisma/client`.
3. **Database Service Disconnected Mode:** Unit tests confirm `DatabaseService` and `PrismaService` operate cleanly in offline mode when `DATABASE_URL` is unavailable.
4. **Safe Transactions:** Verification of timeout boundaries (`withTransaction()`).

---

## 6. Scope Clarifications & Visual Regression Boundaries

> [!NOTE]
> **SCOPE BOUNDARY DECLARATION:**  
> The Phase 3, Task 8 quality gate validates static typing, component markup, accessibility attributes, API integration, and database schema contracts. Complete cross-browser layout rendering (Chromium, Firefox, WebKit) and visual regression snapshot comparison are scheduled for **Phase 3, Task 11 (End-to-End Testing & Pre-Deployment Hardening)** using Playwright.
