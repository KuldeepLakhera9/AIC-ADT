# Phase 4 Programs, Agritech & Startup Ecosystem Implementation Architecture
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 4 (Public Website & Feature Implementation) — Task 5  
**Status:** **COMPLETED & VERIFIED**  
**Date:** October 12, 2026  
**Authors:** Senior Information Architect, Enterprise Frontend Lead  

---

## 1. Executive Summary & Sitemap Architecture

Following the approved sitemap (`docs/requirements/sitemap.md`), Task 5 implements the core programs, government seed funding schemes, verified startup directory, narrative case studies, and the six agricultural innovation domains for the AIC-ADT Baramati Foundation.

### Key Architectural Constraints Satisfied:
1. **Strict Sitemap Adherence**: Implemented only the 20 approved routes across Programs, Schemes, Startups, and Innovation.
2. **Zero Fabricated Content**: Every company record, funding grant cap, mentor designation, and technological showcase is verified against authoritative government sanction orders, DPIIT records, and `docs/audit/content-verification-register.md`.
3. **High-Performance Architecture**: Static pre-rendering (`○` and `◐`) across all program details, scheme guides, startup profiles (`generateStaticParams`), and innovation showcases.
4. **Accessible Interactive Search & Filters**: Client-side directory component (`StartupDirectoryClient.tsx`) supporting real-time keyboard and touch filtering by sector, company name, or technology, with accessible zero-result empty states.
5. **Clear Separation of Concern**: No founder login, applicant form persistence, or backend database mutations were introduced in this public informational phase.

---

## 2. Complete Route Implementation Hierarchy

### 2.1 Programs Continuum & Statutory Schemes
| Route | Page | Purpose & Scope |
| :--- | :--- | :--- |
| `/programs` | Programs Overview | Flagship comparison matrix spanning Pre-Incubation, Comprehensive Incubation, Acceleration, and Government Schemes. |
| `/programs/pre-incubation` | Pre-Incubation | Ideation to Proof-of-Concept track (3–6 months, TRL 2–4, FabLab access). |
| `/programs/incubation` | Comprehensive Incubation | Flagship prototype-to-market track (12–24 months, TRL 4–7, living farm testing, NABL assays, SISFS linkage). |
| `/programs/acceleration` | Growth Acceleration | Commercial scaling and Series A preparation (6–9 months, TRL 7–9, VC syndicate introductions). |
| `/programs/schemes/startup-india` | Startup India (SISFS) | Official DPIIT guidelines (up to ₹20L grant / ₹50L debt), eligibility checklist, disbursement milestones, GramHeet case study. |
| `/programs/schemes/meity-genesis` | MeitY GENESIS | Deep-tech electronics mandate, EiR fellowships (up to ₹10L), pilot grants, Innosapien case study. |
| `/programs/schemes/csr` | Corporate CSR Grants | Section 135 social innovation capital (Capgemini, HDFC Bank, ED&F Man), Baramati Agribiotics case study. |
| `/programs/mentorship` | Mentorship Roster | Directory of 69+ empaneled advisors across agronomy, venture capital, IPR law, and hardware prototyping. |
| `/programs/training` | Capacity Building | Hands-on bootcamps in millet food processing, IoT sensor fabrication, NABL soil diagnostics, and IPR. |
| `/programs/apply-instructions` | Application Instructions & FAQs | 6-step admissions roadmap, document checklist, 4-pillar scoring rubric (100 pts), and official applicant FAQs. |

### 2.2 Startup Portfolio & Success Stories
| Route | Page | Purpose & Scope |
| :--- | :--- | :--- |
| `/startups` | Startup Directory | Interactive searchable directory with sector filter pills, verified badges, reach metrics, and empty states. |
| `/startups/[slug]` | Startup Profile | Dynamic profile page statically generated for all verified ventures (GramHeet, Innosapien, Agribiotics, KisanDost, PhytoPure, Krishik). |
| `/startups/success-stories` | Narrative Success Stories | In-depth empirical case studies documenting challenge, AIC intervention, measured farmer outcome, and founder quotes. |

### 2.3 Agricultural Technology & Innovation Domains
| Route | Page | Purpose & Scope |
| :--- | :--- | :--- |
| `/innovation` | Innovation Overview | High-level landing page articulating AIC-ADT's 6 priority deep-tech domains driving rural transformation. |
| `/innovation/agri-tech` | Agri-Tech & Robotics | Autonomous electric weeding rover, drift-controlled electrostatic drone spray implement. |
| `/innovation/smart-farming` | Smart Farming | Canopy micro-weather telemetry towers (65 sites), multi-depth soil capacitance moisture probes. |
| `/innovation/food-processing` | Food Processing | Low-temperature vacuum dehydration pilot line, decentralized phase-change solar cold rooms. |
| `/innovation/agribusiness` | Agribusiness & FPO Tech | Village-level micro-warehousing model, digital quality assaying, post-harvest distress sale avoidance. |
| `/innovation/climate-tech` | Climate Tech & Circular Agri | Mobile farm-gate residue pyrolysis (biochar), saline-rhizosphere halotolerant microbial consortia. |
| `/innovation/digital-agri-ai` | Digital Agri & AI | Edge computer-vision red rot foliar classifiers, quantized MobileNetV3 models. |

---

## 3. Component Architecture & Reusability

1. **`ProgramCard` (`apps/web/src/components/programs/ProgramCard.tsx`)**:
   - Reusable card rendering status badges (`Active Intake`, `Rolling Review`), duration, TRL level, key offerings preview, and accessible dual CTAs (`min-h-[44px]`).
2. **`StartupDirectoryClient` (`apps/web/src/components/startups/StartupDirectoryClient.tsx`)**:
   - React 19 Client Component providing real-time multi-attribute search across company names, founder names, technologies, and sectors.
   - Includes full keyboard navigation, accessible ARIA attributes (`aria-pressed`, `type="search"`), and a dedicated zero-result empty state with reset controls.
3. **`InnovationShowcaseCard` (`apps/web/src/components/innovation/InnovationShowcaseCard.tsx`)**:
   - Editorial showcase component rigorously distinguishing between `Deployed Service`, `Technology Demonstration`, `Active Research Activity`, and `Proposed Initiative`.
   - Displays clear owner attribution, technical specification parameters, and field testbed validation locations.

---

## 4. Content Decoupling & CMS Readiness

All domain content is isolated in strongly typed data modules:
- `apps/web/src/data/programs.ts`: `PROGRAMS_CONTINUUM`, `SCHEMES_DATA`, `MENTORS_DATA`, `TRAINING_MODULES`, `APPLICATION_FAQS`.
- `apps/web/src/data/startups.ts`: `VERIFIED_STARTUPS_DIRECTORY`, `SUCCESS_STORIES`.
- `apps/web/src/data/innovation.ts`: `INNOVATION_DOMAINS` and `InnovationShowcaseItem` arrays.

Future phases can connect these typed structures directly to headless CMS or database endpoints with zero changes to page component templates.
