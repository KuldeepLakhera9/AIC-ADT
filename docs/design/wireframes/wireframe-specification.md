# Information Architecture & Wireframe Master Specification — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 3 (Information Architecture & Responsive Wireframes)  
**Status:** Canonical Wireframe Specification & Page Coverage Matrix  
**Design Lead:** Principal UX Designer, Enterprise IA & Usability Specialist  

---

## 1. Information Architecture & Structural Principles

This specification establishes the structural wireframes for the complete public website of the **AIC-ADT Baramati Foundation**. It is grounded in the approved Phase 1 Information Architecture ([docs/requirements/sitemap.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/sitemap.md)), Navigation Specification ([docs/requirements/navigation-specification.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/requirements/navigation-specification.md)), and Design Tokens ([docs/design/components/design-tokens.md](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/docs/design/components/design-tokens.md)).

```
========================================================================================
                              CORE USER-CENTERED DESIGN RULES
========================================================================================
1. ZERO ORGANIZATIONAL CONFUSION: A startup founder or farmer can locate the right program 
   or lab in under two clicks without needing to understand the internal hierarchy of ADT.
2. TRANSPARENT ELIGIBILITY & INTAKE: Financial tranches, deadlines, and criteria are 
   front-and-center, not buried in nested PDF downloads.
3. NO ESSENTIAL DATA BEHIND ANIMATION: Every metric, deadline, and eligibility rule is 
   immediately readable without waiting for parallax scroll triggers or hover states.
4. SYMMETRIC BILINGUAL DIGNITY: Marathi routes (/mr/*) maintain identical layout geometry, 
   generous vertical line heights, and full navigational parity.
5. STRICT AIR-GAP: Public marketing wireframes never expose private applicant dossier 
   fields or internal reviewer scoring matrices.
========================================================================================
```

---

## 2. Public Page Coverage & Route Mapping Matrix

The 18 wireframed pages completely map the canonical public routes approved in the Phase 1 sitemap:

| Page # | Core Page Title | Canonical URL (EN) | Mirrored URL (MR) | Target User Group | Primary Action / Conversion Goal |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | **Homepage** | `/` | `/mr` | All Visitors | Discovery, institutional trust, route to programs. |
| **02** | **About AIC-ADT** | `/about` | `/mr/about` | Partners, Regulators | Understand genesis, ADT heritage, AIM affiliation. |
| **03** | **Mission & Vision** | `/about/mission-vision`| `/mr/about/mission-vision`| Auditors, Public | Institutional mandate, core values, SDG alignment. |
| **04** | **Leadership & Team**| `/about/leadership` | `/mr/about/leadership` | Investors, Founders | Review Governing Board, Advisors & Executive Team. |
| **05** | **Programs Listing** | `/programs` | `/mr/programs` | Founders, Innovators| Compare Pre-Incubation, Incubation, Acceleration. |
| **06** | **Program Details** | `/programs/incubation` | `/mr/programs/incubation`| Applicants | Deep dive into curriculum, seed funds, lab access. |
| **07** | **Application Instructions**| `/programs/apply-instructions`| `/mr/programs/apply-instructions`| Applicants | Review checklist, rubric & initiate portal signup. |
| **08** | **Startup Directory**| `/startups` | `/mr/startups` | Investors, Media | Filter portfolio by sector, cohort year & stage. |
| **09** | **Startup Profile** | `/startups/:slug` | `/mr/startups/:slug` | Ecosystem Partners | View innovation specs, founder bios, awards & links. |
| **10** | **Innovation Domains**| `/innovation` | `/mr/innovation` | Researchers, Farmers| Explore 6 agtech pillars (Sensors, Robotics, Biotech). |
| **11** | **Innovation Project**| `/innovation/agri-tech`| `/mr/innovation/agri-tech`| Technical Partners | Deep technical breakdown of pilot implementations. |
| **12** | **Impact Dashboard** | `/impact` | `/mr/impact` | Regulators, CSR | Review certified metrics tied to audited FY periods. |
| **13** | **Events Listing** | `/events` | `/mr/events` | Students, Farmers | Browse workshops, bootcamps, and hackathons. |
| **14** | **Event Details & RSVP**| `/events/:slug` | `/mr/events/:slug` | Attendees | Review speaker agenda, venue map & reserve seat. |
| **15** | **Reports & Publications**| `/resources` | `/mr/resources` | Auditors, Researchers| Download annual reports, guidelines, whitepapers. |
| **16** | **Contact & Inquiries**| `/contact` | `/mr/contact` | Public, Corporates | Departmental inquiry intake, campus route map. |
| **17** | **Global Search** | `/search?q=...` | `/mr/search?q=...` | Exploratory Users | Filtered cross-platform search across all 7 pillars. |
| **18** | **Error Pages (404/500)**| `/404`, `/500` | `/mr/404`, `/mr/500` | Lost Visitors | Clear recovery links back to Home, Programs & Help. |

---

## 3. Wireframe Annotation & Schematic Conventions

The wireframe documents utilize standardized ASCII schematics with structured behavioral blocks:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [CONTAINER_NAME] (Max-Width / Background Token)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  [COMPONENT]                                                                │
│  [ACTION_BUTTON]  ──> Primary conversion trigger                            │
│  [METADATA_CHIP]  ──> Secondary taxonomy tag / Audit badge                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Standard Layout Hierarchy on All Public Pages
1. **Top Institutional Utility Bar (`#063D27`):** Height 36px. Displays National Flag, AIM NITI Aayog acknowledgment, campus emergency line, and Language Toggle (`EN | मराठी`).
2. **Main Header Navbar (`#FFFFFF`):** Height 76px desktop, 64px mobile. Logo lockup left, 7 primary navigation items center, Search trigger and `"Apply for Incubation"` CTA right.
3. **Contextual Breadcrumb Bar (`#F8FAF7`):** Rendered on all inner pages below the header (`Home / Section / Page`).
4. **Main Landmark (`#F8FAF7`):** Semantic `<main id="main-content">` containing structured page sections with semantic `<h2>` and `<h3>` headings.
5. **Pre-Footer Conversion Banner (`#004B2A`):** Standard call-to-action driving relevant conversion before the footer.
6. **Master Institutional Footer (`#063D27`):** 4-column directory, NITI Aayog badges, campus address, RTI disclosures, copyright.

---

## 4. Phase Gate Review & Wireframes Requiring Stakeholder Approval

While the wireframe layouts are 100% technically consistent and fully resolved for responsive rendering, the following wireframes require explicit management confirmation:

| Wireframe Item | Governing Decision ID | Stakeholder Authority | Review Checkpoint |
| :--- | :--- | :--- | :--- |
| **Homepage Hero & Impact Metrics (Section H)** | DEC-MGT-02 | CEO (Ms. Jaya Tiwari) | Confirm audited baseline numbers before copy sign-off. |
| **Leadership Roster (Page 04)** | DEC-MGT-06 | Chairman / Board | Confirm official listing of Governing Board vs Executive staff. |
| **Central Scheme Tranche Cards (Page 05 & 06)** | DEC-MGT-04 | Incubation Operations | Confirm whether SISFS & MeitY GENESIS intakes are Open or Upcoming. |
| **Mentor Directory Display (Page 06 sub-link)** | DEC-MGT-03 | Legal / COO | Verify written consent for mentor photos & LinkedIn links. |
| **CSR Corporate Donor Cards (Page 05 sub-link)**| DEC-MGT-05 | Corporate Relations | Confirm written brand clearances from Capgemini & HDFC Bank. |
