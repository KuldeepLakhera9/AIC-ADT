# AIC-ADT BARAMATI FOUNDATION
## Prototype Interaction Verification Checklist

**Document Reference:** `AIC-ADT/DOCS/DESIGN/PROTOTYPE-INTERACTION-CHECKLIST-V1`  
**Phase:** Phase 2 (UI/UX Design & Prototyping) — Task 5  
**Status:** Verification Completed & Signed Off  
**Classification:** Quality Assurance & Interaction Verification Matrix  
**Evaluator:** Senior Frontend Prototyping Engineer & Principal UX Architect  
**Test Environment:** macOS (Brave / Chromium 120+, Safari 17+, Firefox 120+)  

---

### Executive Overview

This checklist documents the verification of all interactive capabilities and user journeys implemented in the **AIC-ADT Baramati Foundation** interactive prototype (`prototype/`). Every item has been exercised against the design requirements and accessibility standards.

---

## 1. Navigation and Wayfinding Test Matrix

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **NAV-01** | Desktop Mega-Menu Hover & Click | Hover over "About" and "Programs" dropdown menus | Dropdown expands smoothly with shadow elevation; sub-category lists are legible. | **PASS** |
| **NAV-02** | Deep Navigation Link Routing | Click "Startup India Seed Fund (SISFS)" from Mega-Menu | Directly switches to View 4 (`view-program-detail`), updates breadcrumb to Scheme Detail. | **PASS** |
| **NAV-03** | Mobile Drawer Open / Close | Click hamburger menu `☰` on viewport $\le 1024\text{px}$ | Drawer slides in from right; page scroll is locked; backdrop appears. | **PASS** |
| **NAV-04** | Mobile Drawer Keyboard Dismissal | Press `Escape` while drawer is open | Drawer slides out; backdrop vanishes; background scroll unlocked; focus restored. | **PASS** |
| **NAV-05** | Mobile Drawer Route Navigation | Click "Startups Directory" inside mobile drawer | Drawer closes cleanly; View 5 (`view-startups`) is displayed immediately. | **PASS** |
| **NAV-06** | Interactive Breadcrumbs | In View 5, click the "Home" breadcrumb link | View transitions back to View 1 (`view-home`) with smooth scroll to top. | **PASS** |
| **NAV-07** | Zero Dead Links Guarantee | Click any exploratory link (e.g., "Campus FabLab", "RTI") | Opens accessible Prototype Route Preview Modal explaining delivery scope and phase. | **PASS** |
| **NAV-08** | Keyboard Focus Ring Visibility | Tab through all header links, buttons, and inputs | High-contrast double green focus outline (`3px solid #004B2A`) visible on active elements. | **PASS** |

---

## 2. Language Switching and Vernacular Typography

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **LNG-01** | Global Language Toggle | Click "मराठी" in top utility bar or mobile drawer | Document updates to `lang="mr"`; button sets `aria-pressed="true"`. | **PASS** |
| **LNG-02** | View State Preservation | Switch to Marathi while viewing View 7 (`view-impact`) | User remains on Impact Dashboard view; view does not reset to Homepage. | **PASS** |
| **LNG-03** | Navigation Label Vernacularization | Observe header and drawer navigation in Marathi mode | Links update to "आमच्याबद्दल", "योजना आणि कार्यक्रम", "स्टार्टअप्स", "प्रभाव", etc. | **PASS** |
| **LNG-04** | Devanagari Line-Height Protection | Inspect multiline Marathi headings and body paragraphs | Line height $\ge 1.65$ prevents any upper or lower vowel matra clipping. | **PASS** |
| **LNG-05** | Provisional Translation Labeling | Inspect untranslated institutional terminology | Displays watermark `[प्रारूप भाषांतर / Provisional Translation]` for reviewer clarity. | **PASS** |
| **LNG-06** | Bidirectional Toggle Consistency | Toggle back to "English" | All text strings, button labels, and headings restore to Latin typography instantly. | **PASS** |

---

## 3. Startup Portfolio Directory Test Matrix

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **DIR-01** | Sample Data Demarcation | Inspect directory cards and header banner | Clear watermark: "Demonstration Sample Records — Fictional Data for UI Testing". | **PASS** |
| **DIR-02** | Real-Time Search Querying | Type "GramHeet" into startup search input | Directory dynamically filters down to GramHeet card in real-time. | **PASS** |
| **DIR-03** | Sector Pill Filtering | Click "Biotechnology" filter pill | Cards filter down to bio-stimulant startups; non-matching sectors hidden. | **PASS** |
| **DIR-04** | Dynamic Count Indicator | Observe counter pill during filtering | Updates from "Showing 6 of 6" to "Showing 1 of 6 demonstration records". | **PASS** |
| **DIR-05** | Clear Filters Interaction | Click "Clear Filters" button | Search text clears; "All" sector pill activates; all 6 cards re-rendered. | **PASS** |
| **DIR-06** | No Results State Handling | Type nonexistent term "xyz999" into search input | Displays friendly empty notice with one-click "Reset Search Filters" button. | **PASS** |
| **DIR-07** | Startup Profile Modal Inspection | Click "View Profile" on Innosapien Agro card | Opens modal displaying founder name, TRL stage, NABL lab usage, and reach stats. | **PASS** |
| **DIR-08** | Return to Filtered Directory | Close startup profile modal | Modal closes; user returns to directory; previous filter state is intact. | **PASS** |

---

## 4. Events, Workshops and RSVP Demonstration

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **EVT-01** | Event Category Filtering | Click "Workshops" filter button in Events View | Only hands-on training and capacity workshops are displayed. | **PASS** |
| **EVT-02** | Event Detail & RSVP Modal | Click "RSVP" button on Millet Processing Workshop | Registration modal opens with event date, speaker, capacity, and registration form. | **PASS** |
| **EVT-03** | Form Validation (Empty Fields) | Click "Confirm RSVP" with empty form | Prevents submit; highlights required fields; shows red validation hints. | **PASS** |
| **EVT-04** | Form Validation (Invalid Format) | Enter invalid email "user@" and 4-digit phone | Highlights email and phone fields with specific format error requirements. | **PASS** |
| **EVT-05** | Simulated Submission & Success | Enter valid test details and submit form | Displays 500ms progress indicator; transitions to success badge with code `AIC-EVT-XXXX`. | **PASS** |
| **EVT-06** | Data Privacy Safeguard | Inspect form submission network tab | Zero HTTP POST requests sent; banner confirms no personal data is stored. | **PASS** |

---

## 5. Incubation Application Journey and Eligibility Check

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **APP-01** | Eligibility Check (Unchecked) | View SISFS Eligibility card with 0 checkboxes checked | Pill displays "Incomplete Criteria (0/4 Met) — Review Guidelines" in amber. | **PASS** |
| **APP-02** | Eligibility Check (Partial) | Check 2 criteria (DPIIT recognition + 51% shareholding) | Pill displays "Incomplete Criteria (2/4 Met)"; button remains disabled/cautioned. | **PASS** |
| **APP-03** | Eligibility Check (Complete) | Check all 4 criteria | Pill dynamically turns green: "Eligible for SISFS Application (4/4 Met)". | **PASS** |
| **APP-04** | Launch Application Portal | Click "Launch Application Portal" button | Multi-step Application Wizard Modal opens with prominent prototype banner. | **PASS** |
| **APP-05** | Step 1 Validation & Progression | Click "Next Step" without entity name | Displays error message; fills required details and advances cleanly to Step 2. | **PASS** |
| **APP-06** | Step 2 Technology & Lab Scope | Select TRL Stage and Baramati Analytical Lab facilities | Retains selections; advances cleanly to Step 3. | **PASS** |
| **APP-07** | Step 3 Review & Submission | Agree to declaration and click "Submit Demo Application" | Generates prototype application acknowledgement slip (`SISFS-DEMO-XXXX`). | **PASS** |

---

## 6. Certified Impact Dashboard and Reporting Periods

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **IMP-01** | Reporting Period Selector | Click "FY 2023-24 (Audited)" period pill | Active pill highlights; summary banner updates with FY 2023-24 audit filing ID. | **PASS** |
| **IMP-02** | Metric Synchronization | Observe KPI cards upon period change | Startups: 35+, Capital: ₹3.8 Cr, Patents: 28, Farmers: 24,000+ updated dynamically. | **PASS** |
| **IMP-03** | Baseline Demarcation | Inspect impact cards across periods | Badges clearly distinguish "Certified AIM Audit" from "Provisional Annual Metric". | **PASS** |
| **IMP-04** | Historical Table Highlighting | Observe table row for FY 2023-24 | Corresponding row background highlights to indicate selected reporting period. | **PASS** |

---

## 7. Reports, Publications and Sample Document Downloads

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **REP-01** | Publication Category Filter | Click "Policy Whitepaper" filter in Resources View | Only agricultural whitepapers and policy briefs remain visible. | **PASS** |
| **REP-02** | Bundled PDF Download Trigger | Click "Download" on Annual Progress Report | Browser initiates native download of bundled sample PDF file. | **PASS** |
| **REP-03** | Non-Blocking Toast Notification | Observe UI upon clicking download | Toast alert appears in bottom-right corner confirming sample file download. | **PASS** |

---

## 8. Interaction Quality, Accessibility and Robustness

| ID | Verification Test Case | Action Performed | Expected Behavior | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **QUA-01** | Skip to Content Link | Press `Tab` immediately upon page load | "Skip to main content" link appears at top of screen; activates on Enter. | **PASS** |
| **QUA-02** | Modal Keyboard Focus Trap | Open any modal and press `Tab` repeatedly | Focus stays within modal elements; pressing `Escape` closes modal and restores focus. | **PASS** |
| **QUA-03** | Reduced-Motion Emulation | Emulate `prefers-reduced-motion: reduce` in browser | Modal transitions and drawer animations collapse to instant state switches ($0.01\text{ms}$). | **PASS** |
| **QUA-04** | Responsive Layout (375px) | Test viewport on iPhone SE / 375px width | No horizontal scroll bar; buttons full-width; hamburger navigation functions smoothly. | **PASS** |
| **QUA-05** | Browser Console Cleanliness | Execute all 7 journeys with Developer Console open | Zero uncaught exceptions, zero console errors, zero failed network fetches. | **PASS** |

---

### Verification Sign-Off

* **All 38 test criteria passed successfully.**
* **Local demonstration prototype is verified for stakeholder review and Phase 2 sign-off.**
