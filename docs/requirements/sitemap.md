# Comprehensive Sitemap Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Authors:** Senior Information Architect, Enterprise UX Strategist  
**Target Organization:** AIC-ADT Baramati Foundation (Supported by AIM, NITI Aayog; Hosted by Agricultural Development Trust, Baramati)  

---

## 1. Information Architecture Overview & Strategy

The information architecture of the new AIC-ADT Baramati Foundation digital platform replaces the fragmented, bloated, and defective structure documented in the baseline audit (`docs/audit/existing-website-audit.md` and `docs/audit/page-inventory.md`). 

### Core Architectural Principles:
1. **Elimination of Orphaned & Competing Routes:** Eradicate all 75+ commercial theme demo imports, dummy WooCommerce shop pages (`/shop/`, `/cart/`, `/checkout/`), unpurged template case studies, and rogue test URLs (`/demo/`, `/contact-form-333/`, `/elementor-8616/`).
2. **Predictable Canonical Hierarchy:** Every public page lives under a logical two-tier or three-tier URL hierarchy (e.g., `/programs/incubation`, `/infrastructure/analytical-lab`, `/resources/annual-reports`).
3. **Synchronous Bilingual Mirroring:** All approved public pages exist with direct 1-to-1 route symmetry under the `/mr/` locale prefix (e.g., `/about/leadership` ↔ `/mr/about/leadership`).
4. **Strict Confidentiality Segregation:** Public informational pages are strictly isolated from authenticated applicant routes (`/portal/...`) and administrative/review consoles (`/admin/...`). Private application forms never share URLs with public informational pages.

```
                                  PUBLIC PORTAL
                                       │
     ┌──────────┬──────────┬───────────┼───────────┬──────────┬──────────┐
     ▼          ▼          ▼           ▼           ▼          ▼          ▼
   About     Programs   Startups  Innovation    Impact     Events    Resources
     │          │          │           │           │          │          │
  Overview   Pre-Inc    Directory   Agri-Tech   Overview   Upcoming   Reports
  Mission    Incubation Profile     Smart Farm  Periods    Detail     Pubs
  Team       Accelerate Success     Food Proc   Case Std   Register   Guidelines
  Infra      SISFS      Stories     Agribiz                Past       Policies
  Partners   MeitY                  Climate
             CSR                    Digital/AI
```

---

## 2. Public Sitemap Structure (English & Marathi)

The table below outlines the primary public sitemap, contrasting proposed canonical routes against existing legacy URLs, defining target templates, and detailing Marathi path mirroring.

| Section / Level 1 | Subsection / Level 2 | Level 3 Detail | Canonical URL (EN) | Mirrored URL (MR) | Legacy URL Audited | Architecture & Migration Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Home** | — | — | `/` | `/mr` | `/` | **Revise:** Redesign hero, institutional pillars, verified impact metrics, focus areas, featured startups, upcoming events, and footer. |
| **About** | **Overview** | Institutional Genesis & ADT Heritage | `/about` | `/mr/about` | `/about-us/`<br>`/about-aic-adt/`<br>`/about-adt-baramati/` | **Merge & Revise:** Consolidate blank pages (`/about-aic-adt/`, `/about-adt-baramati/`) into an authoritative institutional overview. |
| | **Mission & Vision** | Mandate, Core Values & Strategic Goals | `/about/mission-vision` | `/mr/about/mission-vision` | Section on `/about-us/` | **Extract:** Provide dedicated institutional charter page with AIM (NITI Aayog) alignment and agricultural focus. |
| | **Leadership & Team**| Governing Board & Executive Staff | `/about/leadership` | `/mr/about/leadership` | `/our-team/`<br>`/team/*` (CPTs) | **Revise & Consolidate:** Unify Board of Directors, Advisory Council, and Executive Management; eliminate "Related Chef" CPT bugs. |
| | **Infrastructure** | Campus Overview & Specialized Facilities | `/about/infrastructure` | `/mr/about/infrastructure` | `/infrastructure/` | **Revise:** Architectural showcase of campus facilities with interactive facility cards linking to specialized lab pages. |
| | | *Fab & Makerspace Lab* | `/about/infrastructure/fab-lab` | `/mr/about/infrastructure/fab-lab` | `/prototyping-lab/` | **Re-route & Revise:** Rename from `/prototyping-lab/` to match official branding; detail 3D printing, laser cutting, PCB prototyping. |
| | | *NABL Analytical Lab* | `/about/infrastructure/analytical-lab` | `/mr/about/infrastructure/analytical-lab` | `/analytical-lab/` | **Revise:** Highlight NABL accreditation scope, testing instrumentation (GC-MS, HPLC), sample submission guidelines. |
| | | *Food Innovation Lab* | `/about/infrastructure/food-innovation-lab` | `/mr/about/infrastructure/food-innovation-lab` | `/food-innovation-lab/` | **Revise:** Pilot plant equipment, processing lines, product formulation, and FSSAI compliance support. |
| | | *Digital Media Lab* | `/about/infrastructure/digital-media-lab` | `/mr/about/infrastructure/digital-media-lab` | `/digital-media-lab/` | **Revise:** Visual storytelling, podcast studio, product photography stage for agri-startups. |
| | | *Co-Working Space* | `/about/infrastructure/co-working-space` | `/mr/about/infrastructure/co-working-space` | `/co-working-space/` | **Revise:** Hot desks, dedicated cabins, meeting rooms, high-speed fiber internet, and facility inquiry form. |
| | **Partners** | Institutional, Academic & Corporate Relationships | `/about/partners` | `/mr/about/partners` | `/partners/` | **Revise:** Categorized partner directory (Government, Academia, Corporates, Investors, Industry Associations) with verified logos. |
| **Programs** | **Programs Overview**| Incubation Continuum Comparison | `/programs` | `/mr/programs` | `/programs/` (Empty) | **Revise:** Transform blank parent page into flagship matrix comparing Pre-Incubation, Incubation, and Acceleration. |
| | **Pre-Incubation** | Ideation & Prototype Validation | `/programs/pre-incubation` | `/mr/programs/pre-incubation` | `/pre-incubation/` | **Revise:** Eligibility criteria, batch duration, curriculum, mentoring, and direct CTA to applicant portal. |
| | **Incubation** | Product Validation & Early Market Launch | `/programs/incubation` | `/mr/programs/incubation` | `/incubation/` | **Revise:** Seed funding linkage, specialized lab access, IP filing support, and investor demo day preparation. |
| | **Acceleration** | Scaling, Revenue Growth & Series Funding | `/programs/acceleration` | `/mr/programs/acceleration` | `/acceleration/` | **Revise:** Growth advisory, supply chain scaling, institutional VC networks, and international market access. |
| | **Schemes: SISFS** | Startup India Seed Fund Scheme | `/programs/schemes/startup-india` | `/mr/programs/schemes/startup-india` | `/startup-india/` | **Revise:** Official DPIIT guidelines, grant tranches (up to ₹20L grant / ₹50L debt), eligibility checklist, and cohort status. |
| | **Schemes: MeitY** | MeitY GENESIS (EiR & Pilot) | `/programs/schemes/meity-genesis` | `/mr/programs/schemes/meity-genesis` | `/meity-genesis/` | **Revise:** Correct severe legacy typos ("Bilding", "Workhop"); detail EiR Cohort 2 terms (up to ₹10L) and Pilot scheme. |
| | **Schemes: CSR** | Corporate CSR Partnerships | `/programs/schemes/csr` | `/mr/programs/schemes/csr` | `/careers/` (Wrong URL!) | **Re-route & Revise:** Move from erroneous `/careers/` slug to canonical `/programs/schemes/csr`; highlight Capgemini, HDFC, ED&F Man. |
| | **Mentorship** | Mentor Network & Empanelment | `/programs/mentorship` | `/mr/programs/mentorship` | `/mentors/` | **Revise:** Reconcile mentor directory with verified photos, LinkedIn links, and a dedicated "Become a Mentor" intake form. |
| | **Training** | Capacity Building & Entrepreneurship Workshops | `/programs/training` | `/mr/programs/training` | Incomplete sections | **New:** Formalize regular training modules (Millet processing, IoT in agriculture, business modeling) for farmers and students. |
| | **Instructions** | How to Apply, Evaluation Rubric & FAQs | `/programs/apply-instructions` | `/mr/programs/apply-instructions` | Non-existent | **New:** Step-by-step application guidelines, document checklist, evaluation criteria, and FAQ before applicant registers. |
| **Startups** | **Startup Directory**| Searchable & Filterable Portfolio | `/startups` | `/mr/startups` | `/startups/` | **Revise:** Replace 33k plain text dump with interactive sector/stage search grid, founder tags, and company logos. |
| | **Startup Profile** | Individual Venture Landing Page | `/startups/:slug` | `/mr/startups/:slug` | Non-existent | **New:** Dynamic public profile displaying problem statement, proprietary innovation, founder bios, website, and awards. |
| | **Success Stories** | In-Depth Impact Case Studies | `/startups/success-stories` | `/mr/startups/success-stories` | Dispersed snippets | **New:** Featured narrative case studies (e.g., GramHeet's 35,000+ farmer reach, Innosapien's phenomics sensor). |
| **Innovation** | **Innovation Overview**| Thematic Focus Areas | `/innovation` | `/mr/innovation` | Homepage focus blocks | **New:** High-level landing page articulating AIC-ADT's 6 technological domains driving rural transformation. |
| | **Agri Technology** | Farm Mechanization, Sensors & Robotics | `/innovation/agri-tech` | `/mr/innovation/agri-tech` | Incomplete sections | **New:** Innovations in farm automation, drone spraying, smart implements, and precision irrigation. |
| | **Smart Farming** | IoT, Precision Agronomy & Telemetry | `/innovation/smart-farming` | `/mr/innovation/smart-farming` | Incomplete sections | **New:** Weather stations, soil moisture sensors, satellite crop monitoring, and data-driven farming models. |
| | **Food Processing** | Post-Harvest Processing & Packaging | `/innovation/food-processing` | `/mr/innovation/food-processing` | Incomplete sections | **New:** Value-added millet processing, food preservation, retort pouches, and cold-chain innovations. |
| | **Agribusiness** | Market Linkage, FPO Tech & Supply Chain | `/innovation/agribusiness` | `/mr/innovation/agribusiness` | Incomplete sections | **New:** Direct-to-consumer farm models, FPO aggregation platforms, and transparent commodity grading. |
| | **Climate Tech** | Renewable Energy, Biochar & Waste-to-Value | `/innovation/climate-tech` | `/mr/innovation/climate-tech` | Incomplete sections | **New:** Solar-powered farm processing, carbon sequestration, circular agriculture, and bio-stimulants. |
| | **Digital Agri & AI**| Machine Learning, Computer Vision & LLMs | `/innovation/digital-agri-ai` | `/mr/innovation/digital-agri-ai` | Incomplete sections | **New:** AI-driven pest detection, computer vision crop grading, and vernacular advisory models. |
| **Impact** | **Impact Overview** | Certified Institutional Dashboard | `/impact` | `/mr/impact` | Broken counters on `/` | **Revise:** Certified dashboard displaying verified metrics (Startups, IP, Mentors, Funds, Farmers) with audit timestamps. |
| | **Reporting Periods** | Historical Cohort & Year-Wise Trends | `/impact/periods` | `/mr/impact/periods` | Non-existent | **New:** Transparent breakdown by reporting fiscal years (FY 2021–22 through FY 2025–26) with downloadable summaries. |
| | **Case Studies** | Grassroots Economic Transformation | `/impact/case-studies` | `/mr/impact/case-studies` | Non-existent | **New:** Quantitative field impact studies evaluating farmer income enhancement and rural job creation. |
| **Events** | **Upcoming Events** | Interactive Event Calendar | `/events` | `/mr/events` | `/demo/` (Active)<br>`/events/` (Old archive) | **Consolidate & Revise:** Overwrite canonical `/events/` with active upcoming calendar; eliminate `/demo/` slug. |
| | **Event Details** | Specific Workshop / Seminar Page | `/events/:slug` | `/mr/events/:slug` | Hardcoded text on `/demo/` | **New:** Structured event page with dates, venue map, speaker bios, syllabus, seat count, and registration CTA. |
| | **Event Registration**| Online RSVP & Ticket Generation | `/events/:slug/register` | `/mr/events/:slug/register` | Broken forms | **New:** Responsive registration form with automated seat capacity cutoffs and instant SMS/email confirmations. |
| | **Past Events** | Archive of Concluded Programs | `/events/past` | `/mr/events/past` | `/events/` | **Re-route:** Historical archive of concluded workshops with photo galleries and training outcome summaries. |
| **Resources** | **Resources Overview**| Knowledge & Policy Central | `/resources` | `/mr/resources` | `/resources/` | **Revise:** Rebuild broken page into an organized document hub; eliminate external insecure HTTP media links. |
| | **Annual Reports** | Institutional Annual Disclosures | `/resources/annual-reports` | `/mr/resources/annual-reports` | Non-existent | **New:** Searchable PDF archive of AIC-ADT Annual Progress Reports and NITI Aayog/AIM compliance filings. |
| | **Publications** | Research Whitepapers & Agri-Tech Insights | `/resources/publications` | `/mr/resources/publications` | Non-existent | **New:** Institutional research papers, sector monographs, and technical case studies published by AIC-ADT. |
| | **Program Guidelines**| Formal Scheme & Incubation Rules | `/resources/program-guidelines` | `/mr/resources/program-guidelines` | Non-existent | **New:** Official guidelines for SISFS, MeitY GENESIS, Incubation Agreement templates, and IP policies. |
| | **Policies & Downloads**| Compliance, RTI, Grievance & Media Kit | `/resources/policies-downloads` | `/mr/resources/policies-downloads` | Non-existent | **New:** Official logos, brand guidelines, whistle-blower policy, POSH disclosures, and RTI contact channels. |
| **Contact** | **General Inquiries**| Campus Address, Helpline & Directory | `/contact` | `/mr/contact` | `/contact/`<br>`/contact-us/` | **Consolidate & Revise:** Departmental inquiry routing, verified telephone hierarchy, accessible form labels, Google Map. |
| | **Partnership Desk** | CSR, Corporate & Academic Inquiries | `/contact/partnerships` | `/mr/contact/partnerships` | Non-existent | **New:** Specialized intake for corporate CSR heads, university MoUs, and investor empanelment. |
| | **Location & Directions**| Campus Navigation & Travel Guide | `/contact/directions` | `/mr/contact/directions` | Non-existent | **New:** Detailed travel instructions from Pune Airport, Daund Railway Junction, and Baramati Bus Stand. |

---

## 3. Protected Application & Administration Routes

To ensure strict compliance with the **Principle of Least Privilege (PoLP)** and data boundary requirements (`docs/requirements/roles-and-permissions.md`), all internal operational routes are divided into two authenticated zones:
1. **Applicant Portal Zone (`/portal/...`):** Founder authentication, multi-step application creation, auto-saving drafts, and review status tracking.
2. **Administrative & Evaluation Console (`/admin/...`):** Program management, reviewer scoring, CMS publication queues, user management, and audit logging.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATED ROUTE ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ ZONE A: APPLICANT PORTAL (`/portal/...`)                                    │
│ Auth Required: Yes | Allowed Roles: ROLE_APPLICANT                          │
│                                                                             │
│ /portal/login                 - Applicant Secure Sign-In                    │
│ /portal/register              - Founder Signup with Mobile OTP              │
│ /portal/forgot-password       - Secure Token Password Reset                 │
│ /portal/dashboard             - Application Status Hub & History            │
│ /portal/applications/new      - Program Selection (Pre-Inc / Inc / Acc)     │
│ /portal/applications/:id/edit - Multi-Step Intake Form (Auto-Save Draft)    │
│ /portal/applications/:id/view - Read-Only Submitted Application & PDF Export│
├─────────────────────────────────────────────────────────────────────────────┤
│ ZONE B: ADMINISTRATIVE CONSOLE (`/admin/...`)                               │
│ Auth Required: Yes (2FA Enforced) | Allowed Roles: Internal Staff           │
│                                                                             │
│ /admin/login                  - Staff Administrative 2FA Authentication     │
│ /admin/dashboard              - Role-Adaptive System Command Center         │
│ /admin/evaluations/*          - Reviewer Dossiers & Scoring Rubrics         │
│ /admin/pipeline/*             - Program Manager Cohort Triage & Scheduling  │
│ /admin/cms/*                  - Content Editor Drafting & Preview           │
│ /admin/approvals/*            - Content Approver Review & Publishing Queue  │
│ /admin/impact/*               - Impact Data Manager Metric Updates          │
│ /admin/events/*               - Event Management & CSV Roster Export        │
│ /admin/startups/*             - Public Startup Directory Curation           │
│ /admin/publications/*         - Reports & Scheme Guidelines Uploader        │
│ /admin/users/*                - User Account Provisioning & RBAC Matrix    │
│ /admin/audit-logs             - Immutable Security Audit Log Viewer         │
│ /admin/system-health          - Data-Center Health Monitoring               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Unnecessary Pages Removed & Preserved Legacy Content

### 4.1. Pages Formally Removed & Purged:
1. **Commercial eCommerce Storefront:** All 10 dummy WooCommerce products (`/product/travel-bag/`, `/product/bluetooth-headphone/`, etc.) and checkout routes (`/shop/`, `/cart/`, `/checkout/`, `/wishlist/`, `/my-account/`) are permanently expunged.
2. **Commercial Theme Demos:** `/home-1/` through `/home-7/`, `/case-studies-01/` through `/case-studies-07/`, `/pricing-table-01/`, `/counter-layout-01/`, and `/addon-test/` are archived.
3. **Fictitious Team & Case Records:** Fictitious theme entities (`/team/john-gonzalez/`, `/team/pull-maradona/`, `/case/sound-system/`, `/case/drone-camera/`) are completely purged.
4. **Developer Test Forms & Duplicate Slugs:** Unstyled test forms `/contact-form-111/`, `/contact-form-333/`, empty page `/contact-us/`, and orphaned sandbox `/elementor-8616/` are purged.

### 4.2. Existing Content Preserved & Elevated:
1. **All 71 Incubated Startups:** The text records on `/startups/` (e.g., Innosapien Agro Technologies, Health First Hydrofarms, Transity Digital, GramHeet) are preserved and migrated into the structured `/startups` directory and profile pages.
2. **Specialized Lab Inventories:** Descriptions of the FabLab, Analytical Lab, Food Innovation Lab, Digital Media Lab, and Co-Working Space are preserved, enriched with technical equipment specifications, and organized under `/about/infrastructure/*`.
3. **Government Scheme Case Studies:** Real case studies (e.g., GramHeet's 35,000+ farmer reach under SISFS) are migrated to `/programs/schemes/startup-india` and `/startups/success-stories`.
4. **Authentic Community Workshops:** Authentic event records (e.g., Baking & Cookies Workshop, Millet Entrepreneurship Bootcamps) from `/demo/` and `/events/` are consolidated into the active `/events` calendar and past archives.
