# Navigation Wireframe & Wayfinding Architecture — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 3 (Information Architecture & Responsive Wireframes)  
**Status:** Canonical Navigation Specification  
**Design Lead:** Principal UX Designer & Information Architect  

---

## 1. Global Navigation Architecture

The global wayfinding system is structured to provide effortless discovery across all 7 institutional pillars without requiring the visitor to understand internal corporate or university reporting hierarchies:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   GLOBAL HEADER TOPOLOGY                                │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ [UTILITY BAR: 36px]  Govt Recognition • Helpline: +91 2112 255500 • [ EN | मराठी ]      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ [MAIN NAVBAR: 76px]  [LOGO: AIC-ADT + AIM NITI Aayog]                                   │
│                      [About ▾] [Programs ▾] [Startups ▾] [Innovation ▾]                 │
│                      [Impact ▾] [Events ▾] [Resources ▾]                                │
│                      [🔍 Search] [ APPLY FOR INCUBATION CTA ]                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Desktop Mega-Menu Wireframes (7 Pillars)

When a user hovers over or focuses (`Enter`/`Space`) on a primary navigation item, an accessible, full-width white dropdown card (`#FFFFFF`, `--shadow-3`, 1px border `#DDE5DC`) appears immediately below the navbar:

### 2.1 Mega-Menu: About Us (`/about`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [ABOUT US MEGA-MENU]                                                                    │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ INSTITUTIONAL OVERVIEW           │ CAMPUS INFRASTRUCTURE           │ GOVERNANCE        │
│ • Overview & ADT Heritage        │ • FabLab Prototyping Lab         │ • Governing Board │
│ • Mission, Vision & SDGs         │ • NABL Analytical Testing Lab    │ • Advisory Council│
│ • Accreditation & AIM Alignment  │ • Food Innovation Pilot Plant    │ • Executive Team  │
│ • Institutional Partners         │ • Agri-Media Studio & Co-Working │ • Annual Audits   │
├──────────────────────────────────┴──────────────────────────────────┴───────────────────┤
│ FEATURED HIGHLIGHT: "110-Acre Live Demonstration Farm & Center of Excellence" [Explore] │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Mega-Menu: Programs & Schemes (`/programs`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [PROGRAMS & SCHEMES MEGA-MENU]                                                          │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ INCUBATION PATHWAYS              │ GOVERNMENT & CSR SCHEMES         │ FOUNDER SUPPORT   │
│ • Programs Overview & Comparison │ • Startup India Seed Fund (SISFS)│ • How to Apply    │
│ • Pre-Incubation (Ideation)      │ • MeitY GENESIS (EiR & Pilot)    │ • Document Rubric │
│ • Flagship Incubation (Seed)     │ • Corporate CSR Grant Programs   │ • Mentor Network  │
│ • Acceleration (Series A Scaling)│ • NIDHI-PRAYAS / NIDHI-EIR       │ • Training Classes│
├──────────────────────────────────┴──────────────────────────────────┴───────────────────┤
│ ACTIVE INTAKE ALERT: "SISFS Cohort 4 Applications Open — Grants up to ₹20L" [Apply Now] │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Mega-Menu: Startups & Portfolio (`/startups`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [STARTUPS MEGA-MENU]                                                                    │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ STARTUP DIRECTORY                │ IMPACT HIGHLIGHTS                │ ECOSYSTEM ACCESS  │
│ • Browse All 70+ Startups        │ • Featured Success Stories       │ • Pitch to Angels │
│ • Precision Agri & IoT Startups  │ • GramHeet Case Study            │ • Procurement Desk│
│ • Biotechnology & Biofertilizers │ • Innosapien Phenomics           │ • Startup FAQ     │
│ • Food Processing Startups       │ • Agritech Patent Portfolio      │ • Alumni Network  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Mega-Menu: Innovation Focus Areas (`/innovation`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [INNOVATION FOCUS AREAS MEGA-MENU]                                                      │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ THEMATIC PILLARS (1 TO 3)        │ THEMATIC PILLARS (4 TO 6)        │ DEMONSTRATION     │
│ • 1. Agri-Tech & Farm Machinery  │ • 4. Agribusiness & FPO Tech     │ • 110-Acre Farm   │
│ • 2. Smart Farming & Precision   │ • 5. Climate Tech & Bioeconomy   │ • Soil Sensor Grid│
│ • 3. Food Processing & Packaging │ • 6. Digital Agri, AI & Robotics │ • Pilot Results   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.5 Mega-Menu: Impact & Governance (`/impact`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [IMPACT & GOVERNANCE MEGA-MENU]                                                         │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ CERTIFIED DASHBOARD              │ HISTORICAL REPORTING             │ STATUTORY AUDIT   │
│ • Impact Overview & Live Metrics │ • Cohort Breakdown (FY22–FY25)   │ • NITI Aayog Cert │
│ • Farmers Reached & Income Gain  │ • Capital Mobilized Trends       │ • Audited Filings │
│ • Intellectual Property Filed    │ • Rural Jobs Created Breakdown   │ • Download Report │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.6 Mega-Menu: Events & Bootcamps (`/events`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [EVENTS & BOOTCAMPS MEGA-MENU]                                                          │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ SCHEDULE & CALENDAR              │ TYPES OF EVENTS                  │ PAST ARCHIVES     │
│ • Upcoming Calendar 2026         │ • Application Deadlines          │ • 2025 Bootcamps  │
│ • Featured Workshop Registration │ • Technical Training Workshops   │ • Event Gallery   │
│ • Hackathons & Demo Days         │ • Farmer Demonstration Seminars  │ • Media Releases  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.7 Mega-Menu: Resources & Reports (`/resources`)
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [RESOURCES & REPORTS MEGA-MENU]                                                         │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────┤
│ KNOWLEDGE BASE                   │ COMPLIANCE & GOVERNANCE          │ MEDIA & BRAND     │
│ • Institutional Annual Reports   │ • Scheme Policy Guidelines       │ • Official Logos  │
│ • Agri-Tech Whitepapers & Books  │ • Right to Information (RTI)     │ • Brand Stylebook │
│ • Pitch Deck Templates           │ • POSH & Whistle-Blower Policies │ • Press Contacts  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Mobile Navigation Drawer Specification

On viewports $< 1024\text{px}$, the desktop navigation collapses into a dedicated slide-in sheet:

```
┌──────────────────────────────────────────────┐
│ [DRAWER HEADER]                              │
│  [Logo Lockup]            [EN | मराठी]  [✕]  │
├──────────────────────────────────────────────┤
│ [SEARCH BAR: 44px] [🔍 Search website...]    │
├──────────────────────────────────────────────┤
│ [ACCORDION MENU LIST] (Row Height: 48px)     │
│  ▸ About Us                                  │
│  ▸ Programs & Schemes (Badge: Cohort 4 Open) │
│  ▸ Startups Directory                        │
│  ▸ Innovation Domains                        │
│  ▸ Impact Dashboard                          │
│  ▸ Events Calendar                           │
│  ▸ Resources & Reports                       │
│  ▸ Contact & Directions                      │
├──────────────────────────────────────────────┤
│ [PRIMARY CTA]                                │
│  [ APPLY FOR INCUBATION (Full Width 48px) ]  │
├──────────────────────────────────────────────┤
│ [DRAWER FOOTER]                              │
│  Helpline: +91 2112 255500                   │
│  Email: contact@aicadtbaramatifoundation.org │
└──────────────────────────────────────────────┘
```

- **Touch Target Assurance:** Every accordion trigger maintains a minimum hit area of $48 \times 48\text{px}$.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, focus trapped within sheet, `Escape` key dismisses drawer.
- **Scroll Lock:** Background page scrolling is locked (`body.overflow = 'hidden'`) while drawer is open.

---

## 4. Search Overlay & Entry Point

Clicking the Search Icon in the header triggers a dedicated full-screen overlay:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [SEARCH MODAL]                                                       [✕ ESC]│
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ 🔍 Type to search programs, startups, labs, or reports...             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  POPULAR QUICK LINKS:                                                       │
│  [Startup India Seed Fund (SISFS)]  [Analytical Lab NABL]  [Annual Report]   │
│  [GramHeet Case Study]              [FabLab 3D Printing]   [Apply Cohort 4] │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Bilingual Toggle Mechanics & State Preservation

The language switch (`EN | मराठी`) is an architectural mechanism preserving user context:

```
                                  USER CLICKS "मराठी"
[ English URL: /programs/sisfs?cohort=4 ] ───> [ Marathi URL: /mr/programs/sisfs?cohort=4 ]
- Path is prefixed with /mr/
- Exact scroll position is preserved
- Active search query and filter parameters are preserved
- HTML document updates to <html lang="mr">
```

---

## 6. Contextual Cross-Linking Matrix

To ensure visitors never reach dead-ends, structured cross-links connect the 7 pillars:

| Origin Page | Destination Page | Contextual Trigger & Placement |
| :--- | :--- | :--- |
| **Program Details (`/programs/incubation`)** | **Startup Directory (`/startups`)** | *"See ventures previously funded under this scheme"* (Card carousel at bottom). |
| **Startup Profile (`/startups/:slug`)** | **Innovation Detail (`/innovation/:slug`)**| *"Explore the technology domain backing this venture"* (Domain chip in sidebar). |
| **Innovation Project (`/innovation/agri-tech`)**| **Lab Facilities (`/about/infrastructure/fab-lab`)**| *"Book prototyping equipment used in this project"* (Action button). |
| **Impact Dashboard (`/impact`)** | **Reports (`/resources/annual-reports`)** | *"Download the certified audit filing backing these numbers"* (Signed PDF link). |
| **Event Details (`/events/:slug`)** | **Program Instructions (`/programs/apply-instructions`)**| *"Attending this cohort workshop? Read application instructions"*. |
