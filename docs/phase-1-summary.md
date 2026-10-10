# Phase 1 Discovery Summary & Institutional Baseline
## AIC-ADT Baramati Foundation Digital Platform

**Document Version:** 1.0.0  
**Phase Gate Status:** **NEEDS APPROVAL** (Awaiting Executive Management Sign-Off)  
**Date:** October 10, 2026  
**Authors:** Senior Project Manager, Enterprise Technical Reviewer  
**Target Organization:** AIC-ADT Baramati Foundation (Supported by AIM, NITI Aayog; Hosted by Agricultural Development Trust, Baramati)  

---

## 1. Project Vision and Strategic Objectives

The **AIC-ADT Baramati Foundation** is an institutional cornerstone for agricultural innovation, biotechnology, rural entrepreneurship, and farmer-centric startup incubation. As uncovered during the Phase 1, Task 1 baseline audit, the legacy WordPress website suffered from severe structural neglect: over 75 orphaned commercial theme demo pages, an active unpurged WooCommerce dummy shop (`/shop/`, `/cart/`, `/checkout/`), broken navigation paths (CSR routed to `/careers/`, Events routed to `/demo/`), blank parent pages, hardcoded zero impact metrics, and critical branding misnomers ("AIC-DBT Baramati").

The strategic objective of the new platform is to deliver a premium, accessible, high-performance, and bilingual (English and Marathi) digital gateway that combines:
1. **Institutional Stature:** Reflecting the prestige of Atal Innovation Mission (AIM), NITI Aayog, and the 50+ year legacy of Agricultural Development Trust (ADT), Baramati.
2. **Technological Leadership:** Interactive, filterable startup directories, specialized laboratory capability profiles, and a frictionless multi-step incubation intake portal.
3. **Agricultural Relevance & Community Trust:** Accessible Devanagari localization for rural innovators, women entrepreneurs, and grassroots farming communities.
4. **Data Sovereignty & On-Premise Security:** Strict network isolation within the organization's dedicated data center, protecting proprietary startup intellectual property while completely separating public web traffic from campus agricultural databases.

---

## 2. Agreed First-Release Scope (Phase 1 / MVP Baseline)

The first production release is strictly confined to mandatory **P0** requirements to guarantee rapid delivery, high security, and zero scope creep:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       FIRST-RELEASE SCOPE (PHASE 1 / MVP)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. PUBLIC INSTITUTIONAL PORTAL                                              │
│    • Canonical navigation, About Us, ADT Legacy, Leadership & Team          │
│    • Scheme Information Hub: Startup India (SISFS), MeitY GENESIS, and CSR  │
│    • Verified Contact Engine with anti-spam honeypot and departmental routing│
│ 2. CONTENT MANAGEMENT SYSTEM (CMS) & BILINGUAL ENGINE                       │
│    • Multi-tier editorial governance: Draft -> Review -> Approve -> Publish │
│    • Synchronous English & Marathi route mirroring (/path <-> /mr/path)     │
│ 3. STARTUP DIRECTORY & ECOSYSTEM SHOWCASE                                   │
│    • Interactive search and multi-facet filtering (Sector, Stage, Cohort)   │
│    • 71+ startup profiles and in-depth impact case studies                  │
│    • Verified Mentor Network Directory with LinkedIn integration            │
│ 4. INCUBATION APPLICATION PORTAL                                            │
│    • Founder accounts with mobile OTP authentication and session security   │
│    • Multi-step application intake (Pre-Incubation, Incubation, Acceleration)│
│    • 30-second background auto-save drafts and encrypted pitch deck upload  │
│    • Immutable submission tracking receipts (e.g., AIC-2026-INC-0142)       │
│ 5. APPLICATION REVIEW & EVALUATION DASHBOARD                                │
│    • Reviewer assignment with mandatory electronic NDA / Conflict gate      │
│    • Standardized 5-dimension scoring rubric and cohort triage matrix       │
│ 6. SPECIALIZED LABS & INFRASTRUCTURE SHOWCASE                              │
│    • FabLab, NABL Analytical Lab, Food Innovation Lab, Digital Media Studio │
│    • Structured testing and equipment inquiry forms                         │
│ 7. CERTIFIED DATED IMPACT DASHBOARD                                         │
│    • Server-rendered verified metrics with visible audit timestamps         │
│ 8. EVENTS, WORKSHOPS & ATTENDEE MANAGEMENT                                 │
│    • Workshop calendar, online RSVP intake with seat capacity cutoffs       │
│    • Automated SMS confirmations and administrative CSV roster exports      │
│ 9. REPORTS & PUBLICATIONS REPOSITORY                                        │
│    • Centralized public archive for Annual Reports and Scheme Guidelines    │
│ 10. ROLE-BASED ACCESS CONTROL (RBAC) & SECURITY AUDIT LOGS                  │
│    • 9 isolated user roles with Segregation of Duties (SoD) enforcement     │
│    • Append-only operational audit logging for all state changes            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Sitemap & Main User Groups

### 3.1. Public Sitemap Summary
- **Home:** Hero tagline, institutional pillars, verified impact metrics, focus areas, featured startups, upcoming events, and footer.
- **About:** Overview, Mission and Vision, Leadership and Team, Infrastructure (FabLab, Analytical Lab, Food Lab, Media Lab, Co-Working), and Partners.
- **Programs:** Incubation Continuum Overview, Pre-Incubation, Incubation, Acceleration, Schemes (Startup India, MeitY GENESIS, CSR), Mentorship, Training, and How to Apply.
- **Startups:** Searchable Directory, Individual Profiles (`/startups/:slug`), and Success Stories.
- **Innovation:** 6 Thematic Focus Areas (Agri-Tech, Smart Farming, Food Processing, Agribusiness, Climate Tech, Digital Agriculture & AI).
- **Impact:** Certified Dashboard, Historical Reporting Periods, and Grassroots Case Studies.
- **Events:** Master Calendar, Event Details (`/events/:slug`), Online RSVP Intake, and Past Archives.
- **Resources:** Annual Reports, Research Publications, Scheme Guidelines, and Institutional Policies.
- **Contact:** General Inquiries, Corporate Partnerships Desk, Campus Directions, and Emergency Helplines.
- **Bilingual Mirroring:** 100% of public informational routes exist symmetrically under the `/mr/` locale prefix.

### 3.2. Main User Groups & Personas
1. **Public Visitor:** Farmers, students, researchers, and citizens exploring labs, workshops, and news in English or Marathi.
2. **Startup Founder / Applicant:** Agri-innovators creating accounts, drafting multi-step applications, uploading pitch decks, and tracking review milestones.
3. **Application Reviewer:** Empaneled mentors and investors evaluating assigned applications behind electronic NDA gates.
4. **Program Manager:** Incubation staff triaging applications, assigning reviewers, scheduling pitches, and exporting attendee rosters.
5. **Content Editor:** Communications staff drafting English and Marathi articles, lab profiles, and event notices.
6. **Content Approver / Publisher:** Executive leadership (CEO) reviewing diffs, validating factual claims, and authorizing live publication.
7. **Impact Data Manager:** Operations staff updating certified metric figures with mandatory audit documentation attachments.
8. **System Administrator:** IT personnel provisioning staff user accounts, configuring RBAC roles, and inspecting security audit logs.
9. **Data-Center Operator:** Infrastructure engineers managing VM virtualization, container runtimes, storage, and nightly backups.

---

## 4. Recommended Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RECOMMENDED APPLICATION STACK                        │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ Frontend Layer                │ Next.js (App Router) & TypeScript           │
│                               │ • Server-Side Rendering (SSR) & SSG         │
│                               │ • Context-preserving bilingual routing      │
│                               │ • WCAG 2.1 AA accessible component baseline │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ Backend API Layer             │ NestJS & TypeScript                         │
│                               │ • Modular enterprise architecture           │
│                               │ • Guard-based RBAC & input validation pipes │
│                               │ • Immutable audit logging interceptors      │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ Database & ORM                │ PostgreSQL 16+ & Prisma ORM                 │
│                               │ • Strongly typed schema & automated migrates│
│                               │ • Complete UTF-8 Devanagari collation       │
│                               │ • Port 5432 bound to private bridge only    │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ Ingress & Reverse Proxy       │ NGINX (Alpine)                              │
│                               │ • TLS 1.3 / HSTS termination                │
│                               │ • Micro-caching & rate-limiting             │
│                               │ • Strict security headers (CSP, X-Frame)    │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ Cache & Asynchronous Queue    │ Redis 7+ (Alpine)                           │
│                               │ • Session caching & API rate-limit tracking │
│                               │ • Background SMS/email job execution        │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ Container Orchestration       │ Docker Engine (v24+) & Docker Compose (v2+) │
│                               │ • Immutable multi-container execution       │
│                               │ • Non-root container execution (uid: 1001)  │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 5. Data-Center Dependencies & Infrastructure Prerequisites

The deployment plan strictly distinguishes confirmed parameters from unverified assumptions. The following prerequisites must be confirmed by the ADT Data-Center Operations team prior to deployment:

1. **Virtual Machine Allocation:**
   - Production VM: 4 vCPUs (x86_64), 16 GB ECC RAM, 100 GB SSD (Database/OS) + 250 GB storage volume (Uploads).
   - Staging VM: 2 vCPUs, 8 GB RAM, 50 GB SSD storage.
   - Host OS: Ubuntu Server 24.04 LTS or Rocky Linux 9 with Docker Engine permitted.
2. **Network & Perimeter Ingress:**
   - Dedicated static public IPv4 address assigned to the gateway.
   - Gateway firewall 1:1 NAT mapping for TCP ports 80 and 443 exclusively.
   - Isolated Demilitarized Zone (DMZ) VLAN (e.g., VLAN 30) separate from internal campus networks.
   - Hard firewall drop rules blocking outbound connections from the Web VM to internal Krishi Vigyan Kendra (KVK) farmer data lakes and student ERPs.
3. **Transactional Services & Egress:**
   - Outbound port 587/465 access to the campus internal SMTP relay.
   - DLT-compliant SMS gateway credentials for mobile phone OTP dispatch.
   - Outbound HTTPS egress for Docker registries and OS security updates.
4. **Disaster Recovery & Facilities:**
   - Dedicated secondary independent storage target (NAS/SAN) with minimum 500 GB capacity for daily AES-256 encrypted backups.
   - Verified online dual-conversion UPS (minimum 30 minutes runtime under load) and automated diesel generator failover (ATS engage within 60s).
   - Formal institutional commitment to **RPO ≤ 24 Hours** and **RTO ≤ 4 Hours**.

---

## 6. Unresolved Organizational Questions

The following operational questions require executive clarification:
1. **SMS Gateway DLT Registration:** Does ADT Baramati maintain an existing DLT registration for "AIC-ADT Baramati Foundation" with telecommunications providers, or will OTP templates be routed through Agricultural Development Trust's existing registration?
2. **Active SISFS Funding Tranche:** Is the Startup India Seed Fund Scheme application intake currently open, operating on rolling evaluation, or awaiting renewal tranches from DPIIT?
3. **Unselected Pitch Deck Retention Policy:** What is the mandatory institutional data retention period for unselected startup pitch decks under AIM (NITI Aayog) compliance guidelines (3 years vs. 5 years)?
4. **Testing Service Fee Disclosures:** Are Analytical Lab and Food Lab testing rate cards cleared for public download, or must they be provided exclusively via structured inquiry response?

---

## 7. Risks and Mitigation Plans

| Risk Description | Severity | Probability | Mitigation Strategy Enforced in Design |
| :--- | :---: | :---: | :--- |
| **Exposure of Confidential Startup Pitch Decks** | **Critical** | Low | Files stored in encrypted private storage (`/storage/private`) outside the web root; served exclusively through authenticated NestJS streaming controllers with signed, short-lived URLs. |
| **Inaccurate Impact Claims Disputed by Auditors** | **High** | Medium | Eliminated client-side zero counters; every live metric requires an approved reporting period, attached verification document, and digital sign-off from the CEO/Board. |
| **Cross-Contamination with Campus Farmer Records** | **Critical** | Low | Hard architectural boundary: public web server isolated in a DMZ VLAN with firewall drop rules blocking lateral connections to internal KVK farmer databases. |
| **Data-Center Power or Hardware Failure** | **High** | Medium | Enforced online dual-conversion UPS, automated diesel generator failover, nightly automated AES-256 encrypted backups replicated to independent secondary NAS, and quarterly DR simulation drills. |
| **Bilingual Translation Delays Blocking Releases** | **Medium** | High | Decoupled editorial lifecycle: English content can be published independently while Marathi translations remain in staging, supported by an accessible fallback banner. |
| **Application Form Abandonment by Rural Founders** | **High** | High | Multi-step form with 30-second background auto-saving drafts, mobile OTP authentication, and device-independent session restoration. |

---

## 8. Phase 2 Entry Criteria

Phase 2 (Technical Architecture, Database Schema Design, Wireframing, and Prototyping) may commence only upon satisfaction of the following criteria:

- [x] **Criterion 1 (Audit Complete):** Exhaustive baseline audit and content inventory completed and committed (`docs/audit/`).
- [x] **Criterion 2 (Requirements Defined):** PRD, Functional Requirements, NFRs, User Journeys, RBAC, and Out-of-Scope boundaries completed and committed (`docs/requirements/`).
- [x] **Criterion 3 (Sitemap & Navigation Specified):** Canonical sitemap, bilingual switching rules, and route access matrices completed and committed (`docs/requirements/sitemap.md`, `route-access-matrix.md`).
- [x] **Criterion 4 (Infrastructure RFI Packaged):** Data-center readiness checklist and hardware sizing requirements completed and committed (`docs/architecture/`).
- [ ] **Criterion 5 (Management Policy Approval):** Written sign-off on the Open Decisions Register (`docs/phase-1-open-decisions.md`) from the CEO and Board.
- [ ] **Criterion 6 (Data-Center RFI Confirmation):** Written receipt of the 6 Data-Center Confirmation Deliverables from the campus IT Operations team.
