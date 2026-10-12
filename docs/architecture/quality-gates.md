# AIC-ADT Baramati Foundation — Engineering Quality Gates
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 3 (Architecture & Implementation) — Task 8  
**Author:** Senior QA Automation Engineer & Software Reliability Specialist  
**Date:** October 10, 2026  
**Status:** **ACTIVE QUALITY GATE SPECIFICATION**

---

## 1. Quality Gate Framework & Governance

To ensure architectural integrity, security compliance, and zero defect leakage, all code merged into `main` or prepared for release must pass through **10 Engineering Quality Gates**.

Execution of these gates is 100% automated and reproducible locally through the root orchestration script:
```bash
pnpm verify:phase3
```

---

## 2. The 10 Engineering Quality Gates

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          10 MANDATORY ENGINEERING QUALITY GATES                        │
├───────┬──────────────────────────┬─────────────────────────────────────────────────────┤
│ Gate  │ Category                 │ Command / Gate Target                               │
├───────┼──────────────────────────┼─────────────────────────────────────────────────────┤
│ QG-01 │ Code Formatting          │ pnpm format:check (Prettier)                         │
│ QG-02 │ Static Analysis & Lints  │ pnpm lint (Oxlint in API, ESLint in Web)             │
│ QG-03 │ Strict Type Checking     │ pnpm typecheck (tsc --noEmit in all packages)       │
│ QG-04 │ Database Contract        │ pnpm prisma:validate (Prisma schema validation)     │
│ QG-05 │ Database Client          │ pnpm --filter @aic/api prisma:generate              │
│ QG-06 │ Frontend Unit & Layout   │ pnpm test:web (Vitest SSR & component assertions)   │
│ QG-07 │ Backend Modular Monolith │ pnpm test:api (Vitest NestJS unit tests)            │
│ QG-08 │ API Integration & CORS   │ pnpm test:e2e (Supertest HTTP & security tests)     │
│ QG-09 │ Docker Topology Syntax   │ docker compose -f infra/docker/compose.yaml config  │
│ QG-10 │ Production Application   │ pnpm build (Next.js Turbopack + NestJS compiler)    │
└───────┴──────────────────────────┴─────────────────────────────────────────────────────┘
```

### Detailed Gate Specifications:

#### QG-01: Code Formatting
* **Command:** `pnpm format:check`
* **Rule:** Zero unformatted lines in `apps/**/*.{ts,tsx,js,json,css}`.
* **Failure Remediation:** Execute `pnpm format`.

#### QG-02: Static Code Analysis & Linting
* **Command:** `pnpm lint`
* **Rule:** 0 ESLint errors or warnings in `@aic/web`; 0 Oxlint errors or warnings in `@aic/api`.
* **Failure Remediation:** Resolve flagged rule violations or type assertion warnings.

#### QG-03: Strict TypeScript Type Checking
* **Command:** `pnpm typecheck`
* **Rule:** 0 TypeScript compiler diagnostic errors (`tsc --noEmit`).
* **Failure Remediation:** Rectify missing interfaces, type mismatches, or invalid prop definitions.

#### QG-04: Database Contract Validation
* **Command:** `pnpm prisma:validate`
* **Rule:** Schema syntax and relations in `apps/api/prisma/schema.prisma` must be completely valid.
* **Failure Remediation:** Fix corrupted models, missing inverse relations, or foreign keys.

#### QG-05: Database Client Generation
* **Command:** `pnpm --filter @aic/api prisma:generate`
* **Rule:** Prisma Client must generate without compilation warnings or missing binary engines.
* **Failure Remediation:** Ensure `@prisma/client` matches the Prisma CLI version.

#### QG-06: Frontend Component & Layout Suite
* **Command:** `pnpm test:web`
* **Rule:** 100% pass rate across all 21 unit tests (design tokens, a11y attributes, button touch targets $\ge 44\text{px}$, form labels, 404/error views).
* **Failure Remediation:** Fix failing component markup or broken styling classnames.

#### QG-07: Backend Modular Monolith Suite
* **Command:** `pnpm test:api`
* **Rule:** 100% pass rate across all 36 unit tests (health probes, exception filters, request validation pipes, correlation IDs, structured logging).
* **Failure Remediation:** Resolve controller or provider logic errors.

#### QG-08: HTTP Security & Integration Suite
* **Command:** `pnpm test:e2e`
* **Rule:** 100% pass rate across all 8 Supertest end-to-end integration tests (Helmet headers, CORS allowlist/denial, correlation header lifecycle).
* **Failure Remediation:** Verify NestJS middleware and security configuration.

#### QG-09: Docker Compose Topology Validation
* **Command:** `docker compose -f infra/docker/compose.yaml config`
* **Rule:** Compose syntax, container healthchecks, and loopback port bindings (`127.0.0.1`) must parse cleanly offline.
* **Failure Remediation:** Resolve YAML indentation, invalid environment substitutions, or volume paths.

#### QG-10: Production Application Build
* **Command:** `pnpm build`
* **Rule:** `@aic/web` Next.js Turbopack build and `@aic/api` NestJS production bundle compile with zero errors.
* **Failure Remediation:** Investigate build-time prerender failures or missing dependencies.

---

## 3. Continuous Integration Pipeline (`.github/workflows/ci.yml`)

The GitHub Actions workflow executes on every pull request and push to `main`, running the exact quality gate sequence evaluated locally:

```yaml
name: Engineering Quality Gates
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
...
```

### CI Characteristics:
* **Zero Secrets Required:** The pipeline does not require database connection credentials or production keys; all tests execute with synthetic configuration.
* **No Deployment Side-Effects:** The workflow terminates after quality verification; zero automated deployment occurs in this phase.
