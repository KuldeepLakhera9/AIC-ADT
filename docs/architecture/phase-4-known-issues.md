# Phase 4 Known Issues & Risk Register

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 4 — Production Frontend Implementation (Task 9)  
**Roles:** QA Lead, Principal Software Architect, Frontend Tech Lead  
**Date:** October 12, 2026  
**Status:** **ACTIVE REGISTER — NO BLOCKERS FOR PHASE 4 CLOSURE**  

---

## 1. Overview

This document catalogs all known operational limitations, environment quirks, content dependencies, and intentional architectural deferrals identified during the **Phase 4 Full Production Website Verification**.

Every issue is categorized by severity, accompanied by evidence, corrective actions, and ownership assignments to ensure transparent engineering governance into Phase 5.

---

## 2. Issue Inventory and Risk Matrix

### Issue 1: Host Workstation Docker Daemon Inactivity
- **Issue ID:** `ISSUE-P4-001`
- **Domain:** Local Development Environment / DevOps
- **Severity:** **Low** (Operational Environment)
- **Status:** **Mitigated / Documented**
- **Owner:** DevOps Engineer / Local Developer
- **Evidence:**
  ```text
  Cannot connect to the Docker daemon at unix:///Users/kuldeeplakhera/.docker/run/docker.sock. Is the docker daemon running?
  ```
- **Description:** Docker Desktop is installed, but the background daemon is not running continuously on the development workstation.
- **Impact:** Live container provisioning (`docker compose up`) requires starting the daemon. Offline configuration validation (`docker compose config`) passes with exit code 0.
- **Corrective Action:** Start Docker Desktop prior to database deployment tasks.

---

### Issue 2: Transitive Dependency Advisory in `@prisma/config` (`deepmerge-ts`)
- **Issue ID:** `ISSUE-P4-002`
- **Domain:** Dependency Supply Chain / Security
- **Severity:** **Low** (Build-time Tooling Only)
- **Status:** **Documented / Monitored**
- **Owner:** Lead Architect / Security Lead
- **Evidence:** `pnpm audit` flags prototype pollution in `deepmerge-ts` transitive dependency in `@prisma/config`.
- **Impact:** Zero runtime risk. `@prisma/config` executes exclusively during build time when processing `prisma.config.ts`. It does not accept untrusted user input or execute in the production HTTP request lifecycle.
- **Corrective Action:** Will upgrade `@prisma/config` once Prisma publishes version 6.5.x+ incorporating the patched dependency.

---

### Issue 3: Statutory Legal Policies in Marathi Awaiting Certified Translation
- **Issue ID:** `ISSUE-P4-003`
- **Domain:** Localization / Governance
- **Severity:** **Low** (Content Dependency)
- **Status:** **Mitigated via Advisory Banner**
- **Owner:** Institutional Legal Counsel / Translation Committee
- **Evidence:** `/privacy-policy` and `/terms-of-service` are rendered in English.
- **Description:** Complex legal terminology under India's DPDP Act 2023 requires certified legal translation before publication in Marathi.
- **Impact:** Statutory documents remain legally governing in English.
- **Mitigation:** An official institutional review banner is prominently rendered at the top of all Marathi pages (`apps/web/src/app/mr/layout.tsx`), alerting citizens that English documents govern statutory/legal matters.

---

### Issue 4: Dynamic Event Registration Routes Directly to External Portals
- **Issue ID:** `ISSUE-P4-004`
- **Domain:** Content Architecture / User Journey
- **Severity:** **Low** (Intended Design Decision)
- **Status:** **Operational as Designed**
- **Owner:** Incubation Secretariat
- **Description:** Events and grant application rounds (such as SISFS Cohort 4) direct users to the official Government of India portal (`seedfund.startupindia.gov.in`) rather than accepting applications on this unauthenticated site.
- **Impact:** Prevents handling unauthenticated financial or applicant data before the Phase 5 secure authenticated portal is provisioned.
- **Mitigation:** Clear external link indicators (`↗`) and verified ministerial portal instructions guide applicants safely.

---

### Issue 5: Content Decoupled via In-Memory TypeScript Data Models
- **Issue ID:** `ISSUE-P4-005`
- **Domain:** Data Architecture
- **Severity:** **Low** (Phase Baseline)
- **Status:** **Scheduled for Phase 5 Integration**
- **Owner:** Backend Lead / Full-Stack Engineer
- **Description:** Portfolio startups, publications, news releases, and events are maintained in typed data files under `apps/web/src/data/` rather than a dynamic database CMS.
- **Impact:** Content updates require a Git commit and Next.js static build rather than an in-browser editorial workflow.
- **Mitigation:** Typed interfaces strictly mirror the relational PostgreSQL Prisma schema created in Phase 3, enabling clean headless CMS integration in Phase 5.
