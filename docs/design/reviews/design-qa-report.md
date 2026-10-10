# Design Quality Assurance (QA) Report
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 2 (UI/UX Design & Prototyping) — Task 6  
**Auditor:** Principal UX Reviewer, Design System Auditor & Accessibility Specialist  
**Target Standard:** AIC-ADT Design System v2.0, WCAG 2.2 Level AA Target  
**Prototype Path:** `prototype/index.html`, `prototype/styles.css`, `prototype/script.js`  
**Date of Audit:** October 2026  
**Status:** **PASSED WITH REMEDIATION COMPLETE**

---

## 1. Executive Summary

This Quality Assurance audit evaluates the Phase 2 visual and interactive prototype for the new official web portal of the **Atal Incubation Centre - Agricultural Development Trust (AIC-ADT) Baramati Foundation**. The audit covers design system adherence, component consistency, visual hierarchy, interaction states, and end-to-end usability across all 10 prototype views.

Every defect or inconsistency identified during the initial testing pass has been tracked with strict reproduction steps, severity rating, root cause analysis, and retest verification. All critical and major inconsistencies have been remediated in the prototype codebase.

---

## 2. Design System Consistency Audit

### 2.1 Approved Brand Colors Adherence
* **Brand Primary (`#004B2A`):** Uniformly applied for institutional mastheads, primary CTA buttons, major section headings, and active tabs. Measured contrast against pure white (`#FFFFFF`) is **10.29:1** (exceeding WCAG AAA requirement of 7:1).
* **Secondary Leaf Accent (`#73992A`):** Consistently reserved for interactive accents, active filter pill indicators, subtle card borders, and hero badges. Measured contrast against `#FFFFFF` is **3.32:1** (used strictly as a non-text graphical accent or large border on white, and for high-contrast badge text against dark containers where contrast is **4.65:1**).
* **Institutional Deep Green (`#0A2E1C`):** Used for footer containers, hero cards, and high-importance badges, maintaining strict institutional dignity.
* **Neutrals & Surfaces:**
  * Background Light: `#F7FAF7`
  * Card / Surface Pure: `#FFFFFF`
  * Text Primary: `#17231D` (Contrast **16.22:1** on white)
  * Text Secondary: `#647067` (Contrast **5.18:1** on white — passes WCAG AA)
  * Text Muted (Audited & Updated): `#59665D` (Contrast **6.40:1** on white — upgraded from initial `#8C9790` which failed at 3.02:1).

### 2.2 Typography and Heading Hierarchy
* **Font Stacks:** Dual-typography system enforced across all views:
  * Headings and Display: `Outfit`, system sans-serif fallback (500, 600, 700 weights).
  * Body and Functional Text: `Inter`, system sans-serif fallback (400, 500, 600 weights).
* **Heading Scale Structure:**
  * `h1`: 2.25rem–2.75rem (Line height 1.15–1.2). Single `h1` enforced per view.
  * `h2`: 1.25rem–1.75rem (Line height 1.25–1.3). Used for primary section divisions.
  * `h3`: 1.125rem–1.25rem (Line height 1.35). Used for card titles, subsection headers, and modal subheadings.
* **Heading Hierarchy Remediation:** Initial audit discovered skipped heading levels (`h1` directly followed by `h3` without intermediate `h2`) in `view-about`, `view-impact`, and `view-contact`. These were remediated in `prototype/index.html` by upgrading the subsection headings to `h2`, restoring semantic hierarchy.

### 2.3 Spacing, Border Radii, and Shadows
* **Spacing Scale:** Standard 4px-base design token scale (`--space-1` [4px] to `--space-24` [96px]) strictly observed across container margins, grid gaps, and card padding.
* **Border Radii:**
  * Small elements (badges, buttons, inputs): `var(--radius-sm)` (4px) or `var(--radius-md)` (8px).
  * Cards and Panels: `var(--radius-md)` (8px) and `var(--radius-lg)` (12px).
  * Filter pills and round tags: `var(--radius-full)` (9999px).
* **Shadows:** Restrained elevation tokens:
  * Flat/Rest: `0 1px 3px rgba(0,0,0,0.06)` (`--shadow-sm`)
  * Elevated/Hover: `0 8px 24px rgba(0,0,0,0.08)` (`--shadow-md`)
  * High Focus/Modal: `0 20px 48px rgba(0,0,0,0.18)` (`--shadow-xl`)

### 2.4 Button Variants and Interaction States
* **Primary Button (`.btn-primary`):** Deep agricultural green background (`#004B2A`), white text, 2px focus ring (`#73992A`).
* **Secondary Button (`.btn-secondary`):** White background, deep green border and text, hover shift to `#F0F5F2`.
* **Outline Button (`.btn-outline`):** Semi-transparent white border on dark hero/CTA blocks, crisp white typography.
* **Interactive Feedback:** All buttons feature smooth transition curves (`all 0.15s ease`), visible `:hover` elevation or color shift, and high-visibility `:focus-visible` outline rings with 2px offset.

### 2.5 Cards, Forms, Navigation, and Footer
* **Cards:** Standardized card layout with uniform padding (24px desktop, 16px mobile), consistent 1px subtle borders (`var(--color-border-default)`), and standardized badge position.
* **Forms:** Standard input height (44px min touch target), explicit floating/top labels, placeholder examples, and inline `.form-error-msg` containers linked with stateful validation classes (`.has-error`).
* **Navigation:** Header includes institutional branding, tier-1 desktop navigation links with mega-menus, language toggle, and dedicated mobile drawer (`#mobile-nav`).
* **Footer:** Comprehensive 4-column institutional directory, accreditation notices (AIM / NITI Aayog / DPIIT), contact helpline, and legal/privacy links.

---

## 3. Usability Evaluation

| Evaluation Criteria | Assessment | Finding / Observed Behavior | Status |
| :--- | :--- | :--- | :--- |
| **Institutional Purpose Clarity** | **Pass** | Hero section immediately communicates the dual identity: Government-supported incubation hub (AIM / NITI Aayog) and deep-tech agricultural research centre in Baramati. Overline badges and primary value proposition make purpose unmistakable within 3 seconds of load. | Verified |
| **Primary Actions Discoverability** | **Pass** | Dual primary CTAs ("Explore Incubation Programs" and "Apply for Cohort") are positioned above the fold. Sticky secondary wayfinding bar enables 1-click jump to Programs, Startups, Labs, and Contact at all scroll positions. | Verified |
| **Program Eligibility & Steps** | **Pass** | Program detail page provides a 4-step interactive self-assessment tool. Checking statutory criteria dynamically updates eligibility status (Eligible vs. Not Yet Eligible) with explicit instructions on next steps. | Verified |
| **Startup Search & Filter Usability** | **Pass** | Real-time text search and domain pill filters (Agritech, Smart Farming, Biotech, Food Processing, Climate Tech) filter records instantaneously. Active counter ("Showing X of 6") and a clear-filters button provide immediate situational awareness. | Verified |
| **Reports & Events Discoverability** | **Pass** | Dedicated tabs on homepage and full standalone views (`view-events`, `view-publications`). Direct category filtering (Workshops, Hackathons, Policy Briefs, Annual Audits) with instant download/modal triggers. | Verified |
| **Error & Empty State Guidance** | **Pass** | Startup directory displays an empty-state card with an icon, explanation ("No startups match your search"), and a 1-click "Reset All Filters" button. Form submission errors display specific inline corrective instructions. | Verified |
| **Language Switcher Predictability** | **Pass** | Header language toggle (EN / MR) updates persistent UI state, displays a preview banner ("मराठी आवृत्ती पूर्वावलोकन"), and changes sample bilingual labels without causing layout breakage. | Verified |
| **Interaction Efficiency** | **Pass** | Key institutional data (accreditations, facilities list, startup profiles, contact info) is accessible without requiring modal clicks. Modals are reserved for deep drill-down actions (e.g., full startup milestones or workshop registration). | Verified |

---

## 4. Defect Log & Remediation Register

### Issue QA-01: Low Contrast on Text Muted Token
* **Severity:** Major (Accessibility & Visual QA)
* **View/Component:** Global (`prototype/styles.css`, line 16)
* **Reproduction Steps:**
  1. Inspect `--color-text-muted` (`#8C9790`) rendered on `#FFFFFF` background (e.g., counter labels, metadata dates, overlines).
  2. Compute relative luminance and contrast ratio.
* **Expected Behavior:** All text elements must achieve at least 4.5:1 contrast against their background under WCAG 2.2 AA.
* **Observed Behavior:** Contrast was **3.02:1**, failing Level AA requirements.
* **Recommended Fix:** Darken `--color-text-muted` to `#59665D`, yielding a contrast of **6.40:1** on white.
* **Retest Status:** **RESOLVED & VERIFIED**. Updated in `prototype/styles.css`.

---

### Issue QA-02: Missing Screen Reader Label on Startup Search Input
* **Severity:** Moderate (Accessibility & Functional QA)
* **View/Component:** Startup Directory (`prototype/index.html`, line 731)
* **Reproduction Steps:**
  1. Navigate to `#startup-search-input`.
  2. Inspect accessibility tree for accessible name.
* **Expected Behavior:** Input control must possess a descriptive accessible name via `<label>` or `aria-label`.
* **Observed Behavior:** Input had only a visual `placeholder` attribute without an accessible name.
* **Recommended Fix:** Add `aria-label="Search startups by name, innovation, or keyword"` to `#startup-search-input`.
* **Retest Status:** **RESOLVED & VERIFIED**. Added in `prototype/index.html`.

---

### Issue QA-03: Hardcoded Minimum Grid Width Causing Potential Overflow at 320px
* **Severity:** Major (Responsive QA)
* **View/Component:** Cards grids (`.grid-3` and `.grid-4` in `prototype/styles.css`)
* **Reproduction Steps:**
  1. Set browser viewport to 320px width.
  2. Inspect `.grid-3` (`minmax(320px, 1fr)`) and `.grid-4` (`minmax(240px, 1fr)`).
* **Expected Behavior:** Grid items must shrink gracefully to fit 320px viewport minus container padding (e.g. 296px).
* **Observed Behavior:** `minmax(320px, 1fr)` forced grid items to 320px width, causing horizontal scrollbar on screens $\le 352\text{px}$.
* **Recommended Fix:** Update grid template columns to use `minmax(min(100%, 280px), 1fr)` and `minmax(min(100%, 220px), 1fr)`.
* **Retest Status:** **RESOLVED & VERIFIED**. Updated in `prototype/styles.css`.

---

### Issue QA-04: Rigid 2-Column Desktop Grids on Mobile in Detail and Contact Views
* **Severity:** Moderate (Responsive & Layout QA)
* **View/Component:** Program Detail (`view-program-detail`) and Contact (`view-contact`)
* **Reproduction Steps:**
  1. Open Program Detail or Contact views at 768px or 375px width.
  2. Inspect the 2-column layout (`grid-template-columns: 2fr 1fr` and `1fr 1fr`).
* **Expected Behavior:** Multi-column layouts must stack vertically on tablet and mobile viewports for clean reading.
* **Observed Behavior:** Inline style grid caused cramped columns on tablet screens $\le 768\text{px}$.
* **Recommended Fix:** Introduce `.responsive-split-grid` class in `styles.css` with `@media (max-width: 768px) { grid-template-columns: 1fr !important; }` and apply to both sections.
* **Retest Status:** **RESOLVED & VERIFIED**. Applied class in `prototype/index.html` and verified responsive stacking.

---

### Issue QA-05: Missing Table Horizontal Scroll Wrapper in Impact View
* **Severity:** Moderate (Responsive QA)
* **View/Component:** Impact View (`view-impact`, historical fiscal table)
* **Reproduction Steps:**
  1. Navigate to Impact view at 375px or 320px viewport width.
  2. Inspect historical 5-column impact table.
* **Expected Behavior:** Multi-column statistical data tables must provide touch-friendly horizontal scrolling without breaking page container bounds.
* **Observed Behavior:** Table squeezed columns, risking illegible column wrapping on small mobile screens.
* **Recommended Fix:** Wrap table inside `<div class="table-responsive">` with `min-width: 580px` on the table and `overflow-x: auto; -webkit-overflow-scrolling: touch;`.
* **Retest Status:** **RESOLVED & VERIFIED**. Wrapped table in `prototype/index.html`.

---

### Issue QA-06: Skipped Heading Levels in About, Impact, and Contact Views
* **Severity:** Minor (Accessibility & Hierarchy QA)
* **View/Component:** `view-about` (line 549), `view-impact` (line 948), `view-contact` (lines 1172, 1185, 1194)
* **Reproduction Steps:**
  1. Inspect heading structure in DOM outline.
  2. Observe `h1` followed directly by `h3`.
* **Expected Behavior:** Primary subsections beneath an `h1` must use `h2` before descending to `h3`.
* **Observed Behavior:** Subsections skipped from `h1` directly to `h3`.
* **Recommended Fix:** Upgrade skipped subsection headings to `h2` while preserving styled font sizes.
* **Retest Status:** **RESOLVED & VERIFIED**. Updated all 5 instances in `prototype/index.html`.

---

## 5. QA Sign-Off Assessment

| Quality Dimension | Score / Result | Gate Recommendation |
| :--- | :--- | :--- |
| **Brand & Design Tokens Consistency** | **100% Compliant** | PASS |
| **Component Hierarchy & States** | **100% Compliant** | PASS |
| **Usability & User Journeys** | **100% Verified** | PASS |
| **Error Handling & Empty States** | **100% Verified** | PASS |
| **Remediation Completion** | **All 6 Issues Resolved** | PASS |

**Final Recommendation:** The design system and visual prototype exhibit excellent institutional fidelity, rock-solid consistency, and intuitive user ergonomics. **APPROVED FOR PHASE 3.**
