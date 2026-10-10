# Navigation Specification & Interaction Architecture
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Authors:** Senior UX Strategist, Lead Information Architect  
**Design Standards:** WCAG 2.1 Level AA, Government of India Guidelines for Indian Government Websites (GIGW)  

---

## 1. Global Navigation Architecture Overview

The AIC-ADT digital platform features a three-tier navigation architecture designed to provide predictable wayfinding, universal accessibility, and immediate access to core institutional pathways:
1. **Top Utility Bar:** Language toggle (English / मराठी), accessibility font-size controls, global search trigger, and prominent "Applicant Portal" call-to-action.
2. **Primary Navigation Bar:** Official institutional branding, top-level thematic categories with rich desktop mega-menus, and an accessible mobile slide-out drawer.
3. **Contextual Breadcrumb Bar:** Persistent location trail embedded on all interior pages, reinforcing spatial orientation and one-click ancestor traversal.
4. **Structured Institutional Footer:** Six-column thematic directory containing deep departmental links, statutory compliance disclosures, and verified contact channels.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             TOP UTILITY BAR                                 │
│ [Accessibility: A- A A+]  [English | मराठी]  [🔍 Search]  [🚀 Apply / Portal]│
├─────────────────────────────────────────────────────────────────────────────┤
│                          PRIMARY NAVIGATION BAR                             │
│ [AIC-ADT LOGO]   About ▼  Programs ▼  Startups ▼  Innovation ▼  Impact ...  │
├─────────────────────────────────────────────────────────────────────────────┤
│                          BREADCRUMB TRAIL (INTERIOR)                        │
│ Home > Programs > Schemes > Startup India Seed Fund Scheme                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Global Header Specification

### 2.1. Top Utility Bar
- **Location:** Pinned to the top-most viewport edge; background: Dark Institutional Green (`#0A381E` / Neutral Dark).
- **Height:** 40px desktop, 36px mobile.
- **Components (Left to Right):**
  1. **Government Affiliation Badge:** Text tag: *"Supported by Atal Innovation Mission (NITI Aayog) | Hosted by ADT Baramati"*.
  2. **Accessibility Controls:** Quick font size adjuster (`A-`, `A`, `A+`) and high-contrast theme toggle.
  3. **Bilingual Language Switcher:** Explicit two-state toggle button: `English` | `मराठी`.
  4. **Global Search Input:** Expanding accessible search trigger with keyboard shortcut (`/` or `Ctrl+K`).
  5. **Applicant Portal Quick CTA:** Pill button: *"Applicant Portal"* (routes authenticated users to `/portal/dashboard` and unauthenticated users to `/portal/login`).

### 2.2. Primary Navigation Bar
- **Location:** Directly beneath utility bar; desktop sticky upon downward scroll (`position: sticky; top: 0; z-index: 1000`).
- **Height:** 80px desktop, 68px mobile.
- **Brand Element:**
  - Official high-resolution vector lockup: AIC-ADT Baramati Foundation logo paired with Atal Innovation Mission (AIM) and Agricultural Development Trust (ADT) emblems.
  - Clicking the logo routes directly to `/` (or `/mr` if currently in Marathi mode).
- **Desktop Navigation Menu Structure (7 Main Categories):**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. ABOUT US (Mega-Menu)                                                     │
│ ├─ Institutional Overview (/about)                                          │
│ ├─ Mission & Vision (/about/mission-vision)                                 │
│ ├─ Leadership & Team (/about/leadership)                                    │
│ ├─ Campus Infrastructure (/about/infrastructure)                            │
│ └─ Partners & Institutional Ties (/about/partners)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. PROGRAMS & SCHEMES (Mega-Menu)                                           │
│ ├─ Incubation Continuum Matrix (/programs)                                  │
│ ├─ Pre-Incubation (/programs/pre-incubation)                                │
│ ├─ Incubation Program (/programs/incubation)                                │
│ ├─ Acceleration Program (/programs/acceleration)                            │
│ ├─ Startup India Seed Fund (/programs/schemes/startup-india)                 │
│ ├─ MeitY GENESIS (/programs/schemes/meity-genesis)                          │
│ ├─ CSR Partnerships (/programs/schemes/csr)                                 │
│ ├─ Mentorship Network (/programs/mentorship)                                │
│ └─ Application Instructions & FAQ (/programs/apply-instructions)            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. STARTUPS (Dropdown)                                                      │
│ ├─ Startup Directory (/startups)                                            │
│ └─ Success Stories & Alumni (/startups/success-stories)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. INNOVATION & LABS (Mega-Menu)                                            │
│ ├─ Thematic Focus Areas Overview (/innovation)                              │
│ ├─ Fab & Makerspace Lab (/about/infrastructure/fab-lab)                     │
│ ├─ NABL Analytical Lab (/about/infrastructure/analytical-lab)               │
│ ├─ Food Innovation Lab (/about/infrastructure/food-innovation-lab)          │
│ ├─ Digital Media Lab (/about/infrastructure/digital-media-lab)              │
│ └─ Co-Working Space (/about/infrastructure/co-working-space)                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. IMPACT (Dropdown)                                                        │
│ ├─ Certified Dashboard (/impact)                                            │
│ ├─ Reporting Periods & Trends (/impact/periods)                             │
│ └─ Grassroots Case Studies (/impact/case-studies)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. EVENTS (Dropdown)                                                        │
│ ├─ Upcoming Workshops & Calendar (/events)                                  │
│ └─ Past Event Archives (/events/past)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. RESOURCES & CONTACT (Dropdown)                                           │
│ ├─ Annual Reports (/resources/annual-reports)                               │
│ ├─ Publications & Whitepapers (/resources/publications)                     │
│ ├─ Scheme Guidelines (/resources/program-guidelines)                        │
│ ├─ General Inquiries (/contact)                                             │
│ └─ Campus Directions & Location (/contact/directions)                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Bilingual Switching Behavior & Route Mapping

The bilingual engine enforces synchronous, context-preserving URL resolution. A visitor must never be booted to the homepage when switching languages.

### 3.1. Language Switcher Mechanics

```
[Visitor on /programs/schemes/startup-india]
                     │
                     ▼
       [Clicks "मराठी" in Header]
                     │
                     ▼
       [System checks Marathi route]
         /mr/programs/schemes/startup-india
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
[Translation Exists & Approved]   [Translation Pending / Not Found]
        │                         │
        ▼                         ▼
[Renders Marathi Page]            [Renders English Page with Accessible Banner:]
- Localized Devanagari copy       "या पानाचे मराठी भाषांतर लवकरच उपलब्ध होईल"
- Marathi breadcrumbs             (Marathi translation coming soon)
- Preserves form field values     - Preserves English route context
```

### 3.2. Technical Rules for Language Switching:
1. **Prefix-Based Localization:** The default English route has no prefix (e.g., `/about`). The Marathi localized route is prefixed with `/mr` (e.g., `/mr/about`).
2. **Session Persistence:** When a visitor selects `मराठी`, a persistent cookie `preferred_locale=mr; SameSite=Lax; Path=/` is set, ensuring subsequent internal link clicks automatically resolve to `/mr/...`.
3. **HTML Lang Attribute:** The root `<html>` element dynamically updates to `<html lang="mr" dir="ltr">` or `<html lang="en" dir="ltr">`, enabling correct typography rendering and screen reader voice selection.
4. **Search Engine Alternates:** Every page injects proper SEO `rel="alternate"` hreflang tags:
   ```html
   <link rel="alternate" hreflang="en" href="https://aicadtbaramatifoundation.org/programs/incubation" />
   <link rel="alternate" hreflang="mr" href="https://aicadtbaramatifoundation.org/mr/programs/incubation" />
   <link rel="alternate" hreflang="x-default" href="https://aicadtbaramatifoundation.org/programs/incubation" />
   ```

---

## 4. Mobile Drawer Navigation Architecture

On viewport widths below 1024px (Tablets & Mobile), the horizontal navigation transitions to an accessible slide-out navigation drawer:
- **Trigger:** Accessible hamburger button (`aria-label="Open Navigation Menu"`, `aria-expanded="false"`, `aria-controls="mobile-nav-drawer"`).
- **Drawer Behavior:**
  - Slides in smoothly from the right; covers 85% of mobile screen width (max 380px).
  - Background overlay dims the background (`backdrop-filter: blur(4px); background: rgba(0,0,0,0.5)`).
  - Traps keyboard focus while active; pressing `Escape` closes the drawer and restores focus to the hamburger button.
- **Accordion Menus:** Nested categories (About, Programs, Labs, Resources) expand and collapse smoothly using accessible `<details>` and `<summary>` elements or ARIA accordion tabs.
- **Persistent Bottom Action Bar:** The drawer footer pins two primary action buttons:
  - Button 1: *"Apply for Incubation"* (Primary Green Button).
  - Button 2: *"Language: English / मराठी"* (Full-width Segmented Control).

---

## 5. Breadcrumb Navigation System

Every interior page on the platform must display a semantic, accessible breadcrumb trail directly beneath the primary header.

### 5.1. Breadcrumb Hierarchy Rules:
1. **Root Origin:** Always starts with `Home` (or `मुख्यपृष्ठ` in Marathi).
2. **Strict Ancestry:** Reflects exact URL directory structure (e.g., `Home` > `Programs` > `Schemes` > `Startup India Seed Fund`).
3. **Terminal Active Node:** The current page is the final item, rendered without a hyperlink, styled with bold text, and marked with `aria-current="page"`.
4. **Structured Data:** Implemented using JSON-LD `BreadcrumbList` schema according to Schema.org standards to power search engine rich snippets.

---

## 6. Footer Navigation Architecture

The global footer serves as the comprehensive institutional index and compliance anchor.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AIC-ADT INSTITUTIONAL FOOTER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 1: INSTITUTIONAL HERITAGE & MISSION                                     │
│ - AIC-ADT Baramati Foundation Logo + AIM / ADT Endorsement                  │
│ - Concise Mission Statement (Empowering Agri & Allied Startups)             │
│ - Official Campus Physical Address & Sharadanagar Geolocation               │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 2: INCUBATION PROGRAMS                                                  │
│ - Pre-Incubation Program                                                    │
│ - Core Incubation Track                                                     │
│ - Acceleration Program                                                      │
│ - Startup India Seed Fund (SISFS)                                           │
│ - MeitY GENESIS (EiR & Pilot)                                               │
│ - Corporate CSR Grant Tracks                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 3: SPECIALIZED LABS & FACILITIES                                        │
│ - Fab & Makerspace Hardware Lab                                             │
│ - NABL Accredited Analytical Lab                                            │
│ - Food Innovation & Processing Lab                                          │
│ - Digital Media Studio                                                      │
│ - Co-Working Desks & Meeting Facilities                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 4: STARTUPS & ECOSYSTEM                                                 │
│ - Incubated Startup Directory                                               │
│ - Success Stories & Case Studies                                            │
│ - Empaneled Mentors Directory                                               │
│ - Become a Mentor (Intake)                                                  │
│ - Corporate & Academic Partners                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 5: GOVERNANCE & TRANSPARENCY                                            │
│ - Annual Progress Reports                                                   │
│ - Statutory & Financial Disclosures                                         │
│ - Institutional Policies & Handbooks                                        │
│ - Right to Information (RTI) Disclosures                                    │
│ - Internal Complaints Committee (POSH)                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ COL 6: CONTACT & HELPLINE                                                   │
│ - Official Landline: +91 2112-255518                                        │
│ - Incubation Helpline: +91 86 69 91 12 99                                   │
│ - Departmental Email: aicadt@adtbaramati.com                                │
│ - Operating Hours: Monday – Saturday: 09:00 AM – 06:00 PM IST               │
├─────────────────────────────────────────────────────────────────────────────┤
│ BOTTOM COPYRIGHT BAR                                                        │
│ © 2026 AIC-ADT Baramati Foundation. All Rights Reserved.                    │
│ [Privacy Policy] | [Terms of Use] | [Hyperlinking Policy] | [Accessibility] │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Interactive States & Accessibility Enforcements

To satisfy WCAG 2.1 Level AA and eliminate keyboard trapping or invisible states, the following interaction rules are enforced:

| Interactive State | Technical Styling & Behavioral Enforcement |
| :--- | :--- |
| **Default State** | Clean contrast typography; minimum 4.5:1 contrast against background; minimum touch target size of 44x44px for touch interfaces. |
| **Hover State** | Subtle background tint (5% opacity of brand green) and smooth underline transition (`transition: all 0.2s ease-in-out`). |
| **Focus-Visible State** | Mandatory high-contrast outline (`outline: 3px solid #10B981; outline-offset: 2px`) upon keyboard `Tab` navigation. Zero suppression via `outline: none`. |
| **Active / Current Page** | Identified with a solid bottom indicator bar (`border-bottom: 3px solid #0A381E`) and programmatic attribute `aria-current="page"`. |
| **Disabled State** | Distinct opacity reduction (50%), cursor `not-allowed`, and programmatic attribute `aria-disabled="true"`. |
| **Keyboard Traversal** | Arrow keys (`Up` / `Down` / `Left` / `Right`) navigate through mega-menu dropdown items; `Escape` key immediately closes open menus and returns focus to the parent trigger. |
