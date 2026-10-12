# Phase 4 Implementation Blockers, Constraints & Risk Mitigations
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 4 (Public Website & Feature Implementation) — Task 1  
**Roles:** QA Lead, Principal Software Architect, DevOps Engineer  
**Date:** October 10, 2026  
**Status:** **ACTIVE RISK & BLOCKER REGISTER — ZERO SHOWSTOPPERS**

---

## 1. Executive Summary

This document registers all operational constraints, technical dependencies, institutional approvals, and asset prerequisites that impact the implementation of Phase 4.

Each item is categorized by severity, analyzed for engineering impact, and paired with a **concrete, non-blocking mitigation strategy** to ensure uninterrupted forward progress throughout Phase 4 sprints.

---

## 2. Blocker & Risk Inventory

### Blocker 1: Absence of Institutional Static Media Assets in `apps/web/public`
- **Blocker ID:** `BLK-P4-001`
- **Domain:** Frontend Asset Pipeline / Design Parity
- **Severity:** **High** (Visual Execution)
- **Status:** **Mitigated with Staging Plan**
- **Owner:** Frontend Lead / Digital Asset Coordinator
- **Description:**
  `apps/web/public` currently contains only the default Next.js SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). The approved high-fidelity designs require institutional vector logos (AIC-ADT, AIM NITI Aayog, ADT Baramati), campus photography (5:4 aspect ratio frames), laboratory equipment imagery, and downloadable PDF reports.
- **Impact:**
  Pages rendered without these assets would have missing images, broken download links, or unsightly empty frames.
- **Mitigation Strategy:**
  1. **Downloadable PDFs:** Immediately migrate the 3 sample PDF files from `prototype/assets/downloads/` into `apps/web/public/downloads/`.
  2. **Vector Logos:** Construct clean, accessible SVG logo lockups for the AIC-ADT institutional emblem and AIM NITI Aayog lockup within `apps/web/public/logos/`.
  3. **Editorial Photo Frames:** Implement CSS botanical image frames using SVG data-URI patterns, semantic colored wash containers (`MediaContainer`), and high-resolution Unsplash/Creative Commons agricultural research photography matching verified Baramati themes (polyhouses, precision irrigation, soil analytics) until official campus drone and lab photography is delivered.

---

### Blocker 2: Unverified Institutional Impact Metrics & Private Venture Claims
- **Blocker ID:** `BLK-P4-002`
- **Domain:** Legal Compliance & Content Governance
- **Severity:** **High** (Compliance Risk)
- **Status:** **Mitigated with Audit Badging**
- **Owner:** Compliance Officer / Content Lead
- **Description:**
  Legacy audit revealed critical discrepancies:
  - 71+ startups claimed, but legacy animated counter rendered `0`, and only 23 startups were indexed.
  - 69+ mentors claimed, but only 23 unique individual profiles were listed.
  - 42+ patents claimed, but zero filing numbers exist in public records.
  - GramHeet private financial claims (₹4 Cr+ turnover) require founder consent.
- **Impact:**
  Publishing unverified metrics damages institutional credibility with AIM, DPIIT, and external evaluators.
- **Mitigation Strategy:**
  1. Never render dynamic numeric counters flashing from `0`.
  2. Bind all quantitative metrics to an explicit audit date badge: `[Audited as of FY 2024-25]`.
  3. For mentor directories, present the 23 verified profiles accompanied by an institutional callout: *"Part of AIC-ADT's pan-India network of 69+ empaneled sector mentors"*, coupled with a *"Join Our Mentor Network"* intake CTA.
  4. Omit private turnover figures from startup case studies unless backed by written founder permission; emphasize farmers impacted (35,000+) and village storage capacity instead.

---

### Blocker 3: Next.js App Router Bilingual Routing Strategy (`EN` ↔ `मराठी`)
- **Blocker ID:** `BLK-P4-003`
- **Domain:** Architecture & Internationalization (i18n)
- **Severity:** **Medium** (Architecture Requirement)
- **Status:** **Mitigated with Lightweight Dictionary Architecture**
- **Owner:** Principal Software Architect
- **Description:**
  The approved Phase 1 sitemap and Phase 2 prototype require full bilingual parity: every English route (`/`, `/about`, `/programs`, etc.) must have a mirrored Marathi counterpart (`/mr`, `/mr/about`, `/mr/programs`, etc.) with seamless language switching that preserves user context.
- **Impact:**
  Implementing a heavy external i18n package (such as `next-intl` or `i18next`) might alter bundle architecture or require middleware refactoring.
- **Mitigation Strategy:**
  1. Adopt a zero-dependency, type-safe dictionary pattern: define structured dictionaries (`en.ts` and `mr.ts`) in `apps/web/src/lib/i18n/`.
  2. Support route mirroring via Next.js App Router route groups or an optional locale parameter `/mr/[[...slug]]`.
  3. Provide `LanguageSwitcher` in the utility bar and mobile drawer that seamlessly toggles between `/` and `/mr/` while preserving route path and query parameters.

---

### Blocker 4: Minimal Phase 3 Layout Stubs (`Header.tsx` and `Footer.tsx`)
- **Blocker ID:** `BLK-P4-004`
- **Domain:** Frontend Layout Hierarchy
- **Severity:** **Medium** (Sprint Sequence)
- **Status:** **Mitigated via Task Sequencing**
- **Owner:** Senior Full-Stack Engineer
- **Description:**
  Current `Header.tsx` (68 lines) and `Footer.tsx` (23 lines) are minimal development stubs without mega-menus, mobile drawers, or directory columns. Building page views before refactoring the navigation would result in broken wayfinding.
- **Impact:**
  Testing page transitions or evaluating mobile viewports would be compromised.
- **Mitigation Strategy:**
  Prioritize **Task 4.2: Navigation Architecture & Global Layouts** as the very first implementation task in Phase 4. No inner pages will be built until the full `Header`, `MegaMenu`, `MobileNavDrawer`, and `Footer` are operational and verified.

---

### Blocker 5: Local Docker Daemon Status on Development Workstations
- **Blocker ID:** `BLK-P4-005`
- **Domain:** Local Environment Operations
- **Severity:** **Low** (Operational)
- **Status:** **Mitigated via Hybrid Workflow**
- **Owner:** DevOps Engineer
- **Description:**
  As noted in Phase 3 Task 9, the Docker daemon on the developer host may not be running continuously in the background.
- **Impact:**
  Running `pnpm docker:db:up` fails if Docker Desktop is stopped.
- **Mitigation Strategy:**
  1. The Next.js frontend builds and runs completely independently of the database during public page authoring (hybrid development model).
  2. Developers run `pnpm dev` directly on the host for blazing-fast Turbopack rendering (4.5s compile time).
  3. Live database is only required when validating backend Prisma API integrations.

---

## 3. Risk Matrix Summary

| Risk ID | Description | Inherent Risk | Residual Risk | Resolution Phase |
| :---: | :--- | :---: | :---: | :---: |
| **BLK-P4-001** | Missing media assets in `public/` | High | **Low** | Task 4.2 (Staging logos, sample PDFs, frames) |
| **BLK-P4-002** | Unverified impact claims | High | **Very Low** | Task 4.3–4.8 (Audit badges & placeholders) |
| **BLK-P4-003** | Bilingual routing architecture | Medium | **Low** | Task 4.2 (Dictionary engine & route mirror) |
| **BLK-P4-004** | Minimal navigation stubs | Medium | **Very Low** | Task 4.2 (Prioritized as first sprint task) |
| **BLK-P4-005** | Docker daemon host state | Low | **Very Low** | Task 4.1 (Documented hybrid workflow) |

**Conclusion:** All blockers have established, validated mitigation paths. None prevent the immediate commencement of Phase 4 implementation.
