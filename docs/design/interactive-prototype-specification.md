# AIC-ADT BARAMATI FOUNDATION
## Interactive UI Prototype and User Journey Specification

**Document Reference:** `AIC-ADT/DOCS/DESIGN/PROTOTYPE-INTERACTIVE-SPEC-V1`  
**Phase:** Phase 2 (UI/UX Design & Prototyping) — Task 5  
**Status:** Approved Prototype Specification  
**Classification:** Institutional Design Artifact (Demonstration UI Engine)  
**Authors:** Senior Frontend Prototyping Engineer & Principal UX Interaction Designer  
**Target Environment:** Local Demonstration Prototype (`prototype/`)  

---

### Executive Summary

This specification establishes the interactive mechanics, state machines, vernacular localization behaviors, and demonstration data contracts for the high-fidelity interactive prototype of the **AIC-ADT Baramati Foundation** official web platform.

The prototype bridges high-fidelity visual design (Task 4) and production frontend implementation (Phase 3). It enables institutional leaders, startup founders, program evaluators, and Atal Innovation Mission (AIM) stakeholders to interact with realistic user journeys offline without requiring backend services, live DPIIT credentials, real applicant submissions, or external database infrastructure.

---

## 1. Prototype Boundary and Operational Principles

```
+---------------------------------------------------------------------------------------+
|                              AIC-ADT DEMONSTRATION BOUNDARY                           |
|                                                                                       |
|  [Client Browser Environment]                                                         |
|  * Pure HTML5 / CSS3 / Vanilla JavaScript (ES2022)                                    |
|  * Zero External Runtime Dependencies                                                 |
|  * Zero Production Network Telemetry                                                  |
|  * Offline Execution (`file://` or `python3 -m http.server`)                          |
|                                                                                       |
|  +--------------------+   +-----------------------+   +----------------------------+  |
|  | Navigation Engine  |   | State Machine Hub     |   | Localization Engine        |  |
|  | - 10 Core Views    |   | - Modals & Overlays   |   | - EN <-> MR Switching      |  |
|  | - Mega Menus       |   | - Wizards & Checks    |   | - Devanagari Typography    |  |
|  | - Breadcrumbs      |   | - Filter & Counters   |   | - Line-height Preservation |  |
|  +--------------------+   +-----------------------+   +----------------------------+  |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | Demonstration Data Stores (Read-Only & Transient Session Memory)                |  |
|  | - 6 Sample Startup Records  - 4 Campus Events  - 3 Bundled Sample PDFs         |  |
|  | - 4 Fiscal Impact Periods   - Multi-step Grant Application Schema              |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
```

### 1.1 Scope Boundaries & Safety Disclaimers
1. **Local Demonstration Isolation:** All interactions run strictly inside the local web browser session. No applicant or venture data is transmitted across the network or persisted to external databases.
2. **Fictionalized Demonstration Records:** All startup case studies, funding tranches, founder references, and event participants are clearly marked with institutional prototype badges: `[Demonstration Sample Record / प्रात्यक्षिक नमुना]`.
3. **Audit Data Demarcation:** Impact figures represent sample baseline models for institutional workflow validation and are visibly distinguished from statutory audited filings.
4. **Zero Broken Links Guarantee:** No clickable element acts as a dead `#` link. Every navigation item either transitions to an active demonstration view or triggers an accessible **Prototype Route Preview Modal** detailing the production delivery phase.

---

## 2. Core User Journey State Machines

### Journey 1: Universal Navigation and Wayfinding

```
+---------------+     Click Top-Level Nav     +--------------------+
|  Any View     | --------------------------> | Mega-Menu Displays |
+---------------+                             +--------------------+
       |                                                |
       | Click Breadcrumb / Link                        | Click Sub-Category
       v                                                v
+-----------------------------+               +-----------------------------+
| Active View Switched (1-10) | <-------------| Target View Routed          |
+-----------------------------+               +-----------------------------+
       |                                                |
       | Scroll to View Top                             | Link to Unimplemented Route
       v                                                v
+-----------------------------+               +-----------------------------+
| View Rendered with Active   |               | Route Preview Modal Opens   |
| Breadcrumbs Updated         |               | (Phase & Scope Explained)   |
+-----------------------------+               +-----------------------------+
```

#### Specifications:
* **Desktop Navigation:** Mega-menus reveal categorized institutional pathways (About, Campus Facilities, Incubation Pathways, Active Schemes). Sub-links transition directly to target views or trigger informative placeholder dialogs.
* **Mobile Drawer:** Accessible slide-over drawer triggered by hamburger icon. Supports keyboard `Escape` dismissal, focus restoration, backdrop click closing, and automatic view transition upon link selection.
* **Breadcrumb Navigation:** Full contextual breadcrumbs across all sub-views. Every segment before the terminal node is a clickable navigational trigger returning the user cleanly up the information hierarchy.
* **Prototype Route Preview Modal:** Any institutional link not requiring a full independent prototype view (e.g., *Right to Information*, *Campus FabLab*, *Whistleblower Policy*) triggers a standardized accessible modal dialog detailing the route's architecture, target API integration, and Phase 3 delivery milestone.

---

### Journey 2: Bilingual Parity and Vernacular Adaptation (EN ⇄ MR)

```
[Default State: English (en)]
  * HTML lang="en"
  * Primary Font: Inter
  * Standard Line-height: 1.5 - 1.6
         |
         | User clicks "मराठी" (Utility Bar / Mobile Drawer)
         v
[Switched State: Marathi (mr)]
  * HTML lang="mr"
  * Typography: Noto Sans Devanagari + Baloo 2
  * Line-height Expansion: min 1.65 (headings 1.35)
  * Dynamic String Replacement:
      - Navigation & Utility Items
      - Hero & Section Headings
      - Button Actions & Status Badges
  * Preserves Current Active View
  * Badges Provisional Translations: [प्रारूप भाषांतर / Provisional]
```

#### Specifications:
* **View Preservation:** Toggling between languages never resets the user's active view; the active screen remains visible in the selected tongue.
* **Devanagari Line-Height Protection:** Automatic CSS adjustments ensure Marathi vowel signs (*matras*, *velanti*, *ukar*) never clip against container boundaries (`line-height: >= 1.65` for body copy and `>= 1.35` for display headings).
* **Provisional Translation Labeling:** Terms translated for UI testing that require institutional validation from AIC-ADT Marathi language reviewers are clearly watermarked.

---

### Journey 3: Startup Portfolio Directory and Profile Inspection

```
+---------------------------------------------------------------------------------+
| Startup Directory View (`view-startups`)                                        |
| [Search Input] [Sector Filters: All | Agri-Tech | Smart Farming | Biotech | ...] |
+---------------------------------------------------------------------------------+
         |
         | Filter by Sector OR Type in Search Box
         v
+---------------------------------------------------------------------------------+
| Dynamic Filter Engine Evaluates Records:                                        |
| - Filter matches displayed                                                      |
| - Dynamic Count Pill Updates: "Showing X of Y demonstration records"            |
| - "Clear Filters" Button reveals when active filter/query applied               |
| - Zero-match state reveals "Reset Search" action                                |
+---------------------------------------------------------------------------------+
         |
         | Click "View Profile" on any Startup Card
         v
+---------------------------------------------------------------------------------+
| Startup Profile Detail Modal (`#startup-modal`)                                 |
| * Venture Identity, DPIIT Number, Cohort Year, Funding Scheme                   |
| * Technological Innovation Overview & NABL Lab Utilization Metric               |
| * Smallholder Farmer Outreach Metric & External Website Link                    |
| * "Return to Directory" closes modal and PRESERVES filter/search state          |
+---------------------------------------------------------------------------------+
```

#### Sample Data Contract:
| Startup Identifier | Sector | Year | Grant Scheme | Innovation Focus | Reach Metric |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GramHeet Solutions** | Agri-Tech | 2022 | SISFS (₹20L) | Post-harvest digital storage & market linkage | 35,000+ Farmers |
| **Innosapien Agro** | Smart Farming | 2023 | MeitY GENESIS | Computer-vision crop phenotyping & disease forecasting | 14 Sugarcane Clusters |
| **Baramati Agribiotics** | Biotechnology | 2024 | Seed Grantee | Halotolerant microbial bio-stimulants for saline soils | 1,800 Ha Soil Treated |
| **KisanDost Robotics** | Agri-Tech | 2023 | SISFS (₹20L) | Electric autonomous inter-row weeding & mulching rover | 45 FPOs Deployed |
| **PhytoPure Biofuels** | Climate Tech | 2024 | Pre-Incubation | Sugarcane bagasse bio-pelletization & pyrolytic biochar | 4,200 Tons Biomass Saved |
| **Krishik ColdChain** | Food Processing | 2022 | SISFS (₹20L) | Farm-gate solar cold micro-rooms with phase-change storage | 120 Horticulture Farms |

---

### Journey 4: Events, Masterclasses and Demonstration RSVP

```
+---------------------------------------------------------------------------------+
| Campus Events View (`view-events`)                                              |
| [Category Filters: All Events | Admissions & Deadlines | Workshops | Masterclasses] |
+---------------------------------------------------------------------------------+
         |
         | Click "RSVP" or "View Event"
         v
+---------------------------------------------------------------------------------+
| Event Registration Modal (`#event-modal`)                                       |
| * Displays Event Name, Date, Venue, Capacity & Prerequisites                    |
| * Interactive Form:                                                             |
|     - Full Name (required, min 3 chars)                                         |
|     - Email Address (regex validation)                                          |
|     - Phone Number (10-digit validation)                                        |
|     - Organization / College / Farm                                             |
|     - Stakeholder Category (Founder, Farmer, Student, Researcher)               |
+---------------------------------------------------------------------------------+
         |
         | Submit Form
         v
+---------------------------------------------------------------------------------+
| Client-Side Form Validation:                                                    |
| * Failure: Highlight fields in red, display inline ARIA error message           |
| * Success:                                                                      |
|     - Show 500ms Simulated Processing Spinner                                   |
|     - Display Confirmation Card with Demo Reference Code (`AIC-EVT-XXXX`)       |
|     - Display "Demonstration Only: No data transmitted" banner                  |
|     - Button to Add Sample Calendar (.ics simulation) or Close Modal            |
+---------------------------------------------------------------------------------+
```

---

### Journey 5: Incubation Application and Eligibility Self-Assessment

```
+---------------------------------------------------------------------------------+
| Program Detail View (`view-program-detail`)                                     |
| [Program Overview: SISFS Seed Fund / MeitY GENESIS]                             |
+---------------------------------------------------------------------------------+
         |
         v
+---------------------------------------------------------------------------------+
| Interactive Eligibility Self-Assessment Tool (On-Page)                          |
| [ ] 1. Registered Private Limited / LLP within last 2 years                     |
| [ ] 2. DPIIT Startup Recognition Number active                                  |
| [ ] 3. Indian promoter shareholding >= 51%                                      |
| [ ] 4. Prior monetary government grants <= ₹10 Lakhs                            |
|                                                                                 |
| Dynamic Status Pill:                                                            |
| * 0-3 Checked: "Incomplete Criteria (X/4 Met) - Review Guidelines" [Amber]      |
| * 4 Checked:   "Eligible for SISFS Application (4/4 Met)" [Green]               |
+---------------------------------------------------------------------------------+
         |
         | Click "Launch Application Portal"
         v
+---------------------------------------------------------------------------------+
| Demonstration Application Wizard Modal (`#apply-modal`)                         |
| Banner: [PROTOTYPE DEMONSTRATION ONLY — DO NOT SUBMIT SENSITIVE DATA]          |
|                                                                                 |
| Step 1: Venture & Founder Identity (Entity Name, DPIIT Number, Founder Email)   |
| Step 2: Technology & Baramati Lab Scope (TRL Stage, Lab Facilities Required)   |
| Step 3: Grant Tranche & Declaration (Requested Amount, Milestone Commitment)   |
|                                                                                 |
| Progression: Next validates step before advancing; Previous preserves inputs    |
| Final Submission: Generates Prototype Application Receipt (`SISFS-DEMO-XXXX`)   |
+---------------------------------------------------------------------------------+
```

---

### Journey 6: Certified Impact Dashboard with Dynamic Reporting Periods

```
+---------------------------------------------------------------------------------+
| Impact Dashboard View (`view-impact`)                                           |
| Period Selector: [FY 2024-25 (Current)] [FY 2023-24] [FY 2022-23] [FY 2021-22]  |
+---------------------------------------------------------------------------------+
         |
         | User clicks a Fiscal Reporting Period
         v
+---------------------------------------------------------------------------------+
| Interactive Metric Synchronization:                                             |
| 1. Metric Counter Transition:                                                   |
|    - Startups Incubated (e.g. 50+ -> 35+ -> 22+ -> 10+)                         |
|    - Capital Mobilized  (e.g. ₹5.2 Cr -> ₹3.8 Cr -> ₹2.4 Cr -> ₹1.1 Cr)         |
|    - Patents / IP Filed (e.g. 42+ -> 28+ -> 16+ -> 7+)                          |
|    - Farmers Reached    (e.g. 35,000+ -> 24,000+ -> 14,000+ -> 6,500+)          |
| 2. Audit Narrative Updates with specific NITI Aayog filing reference            |
| 3. Historical Table row highlighted corresponding to active selection           |
| 4. Clear Badge: [Verified Audit Baseline] vs [Simulated Projection]             |
+---------------------------------------------------------------------------------+
```

---

### Journey 7: Public Publications & Sample Document Distribution

```
+---------------------------------------------------------------------------------+
| Reports & Resources View (`view-reports`)                                       |
| Search: [Search publication by title or topic...]                               |
| Filter: [All (3) | Statutory Filings | Policy Whitepapers | Guidelines]        |
+---------------------------------------------------------------------------------+
         |
         | Click "Download PDF" on any Card
         v
+---------------------------------------------------------------------------------+
| Download Trigger Engine:                                                        |
| 1. Resolves path to bundled sample PDF (`prototype/assets/downloads/...`)       |
| 2. Initiates native browser download of sample document                         |
| 3. Fires Accessible Toast Notification:                                          |
|    "Downloading sample institutional document: AIC-ADT-Annual-Report-Sample.pdf" |
+---------------------------------------------------------------------------------+
```

---

## 3. Accessibility and Interaction Quality Architecture

### 3.1 Focus Management & Keyboard Operability
* **Focus Rings:** High-visibility double outline: `3px solid #004B2A` with `2px` offset.
* **Modal Trap:** Upon opening any modal, focus shifts to the modal heading; `Tab` key cycles through internal interactive elements; `Escape` key immediately closes the modal and returns focus to the triggering element.
* **Skip Navigation:** A visible skip-link (`#main-content`) is available to keyboard users upon first tab navigation.

### 3.2 Responsive Breakpoints & Touch Targets
* **Mobile (375px - 640px):** Single-column stacks, full-width touch targets ($\ge 44 \times 44\text{px}$), accessible drawer navigation.
* **Tablet (768px - 1024px):** Two-column card grids, adapted utility strip, collapsed desktop navigation.
* **Desktop ($\ge 1240px$):** Container constraint at `1240px`, multi-column mega-menus, sticky wayfinding bars.

### 3.3 Motion & Transition Accessibility
* All CSS animations and transitions respect `@media (prefers-reduced-motion: reduce)`.
* Motion durations are clamped to $0.01\text{ms}$ when reduced motion is requested.

---

## 4. Verification and Acceptance Criteria

| Criteria ID | Category | Verification Condition | Expected Result |
| :--- | :--- | :--- | :--- |
| **CR-01** | Navigation | Click all desktop mega-menu items and sub-links | All transition to valid views or trigger Route Preview Modal; 0 dead `#` links. |
| **CR-02** | Navigation | Open mobile drawer, press `Escape`, click backdrop | Drawer opens smoothly, closes on `Escape` or backdrop click without trapping page scroll. |
| **CR-03** | Localization | Toggle EN ⇄ MR on any sub-page | Text updates dynamically, page view remains unchanged, Devanagari text does not clip. |
| **CR-04** | Directory | Search "GramHeet" or filter by "Biotechnology" | Only matching cards appear, count updates ("Showing 1 of 6"), clear filter restores list. |
| **CR-05** | Directory | Click "View Profile" on any startup card | Profile modal opens with sample founder, lab, and metric details; close restores directory. |
| **CR-06** | Events | Submit RSVP with empty or invalid email/phone | Inline red validation error appears with descriptive guidance. |
| **CR-07** | Events | Submit RSVP with valid test credentials | Shows 500ms simulated spinner, then displays confirmation badge with reference ID. |
| **CR-08** | Application | Toggle 4 eligibility checkboxes | Badge transitions dynamically from Amber ("Incomplete") to Green ("Eligible (4/4 Met)"). |
| **CR-09** | Application | Complete 3-step application wizard | Progresses through steps, validates required fields, produces sample receipt slip. |
| **CR-10** | Impact | Click FY 2023-24 in Impact Dashboard | Metric cards transition smoothly to FY24 values; filing narrative updates; table highlights. |
| **CR-11** | Resources | Click "Download" on Annual Report card | Browser initiates download of bundled sample PDF; toast notification displays. |
| **CR-12** | Quality | Run browser developer console during all user journeys | Exactly 0 JavaScript exceptions or unhandled errors. |

---

## 5. Local Execution Instructions

To review and demonstrate the interactive prototype locally:

1. **Direct File Mode:**
   Open `prototype/index.html` directly in any modern browser (Chrome, Firefox, Safari, Edge).
2. **Local HTTP Server Mode (Recommended):**
   ```bash
   cd /Users/kuldeeplakhera/ADT/Projects/AIC-ADT
   python3 -m http.server 3000
   ```
   Navigate to: `http://localhost:3000/prototype/` in your browser.
