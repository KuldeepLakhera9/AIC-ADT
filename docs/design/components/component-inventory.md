# Reusable Component Inventory & Behavioral Specification — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 2 (Design Tokens & Reusable Component Specification)  
**Status:** Canonical Component Inventory & Design System Specification  
**Design Lead:** Senior Design-System Engineer & Frontend Design Architect  

---

## 1. Component System Overview & Classification

The AIC-ADT digital platform components are organized according to atomic design principles into six functional layers:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                           AIC-ADT COMPONENT SYSTEM ARCHITECTURE                       │
├─────────────────┬─────────────────────────────────────────────────────────────────────┤
│ 1. NAVIGATION   │ Header, Mega-Menu, Mobile Drawer, Logo, Language Selector, Footer,  │
│                 │ Breadcrumbs, Pagination.                                            │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ 2. ACTIONS      │ Primary/Secondary/Outline/Text Buttons, Text Links, Icon Buttons.   │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ 3. CONTENT &    │ Headings, Section Headers, Feature Cards, Startup Cards, Program    │
│    DISPLAY      │ Cards, Event Cards, Publication Cards, Statistic/Impact Cards,      │
│                 │ Image Containers, Content Banners, CTA Panels.                      │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ 4. CONTROLS &   │ Search Fields, Filter Segment Pills, Tabs, Accordions.              │
│    DISCOVERY    │                                                                     │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ 5. FORM INPUTS  │ Text Inputs, Selects, Textareas, Checkboxes, Validation Messages.   │
├─────────────────┼─────────────────────────────────────────────────────────────────────┤
│ 6. FEEDBACK &   │ Badges/Status Labels, Alerts/Notifications, Modals, Empty States,   │
│    SYSTEM       │ Loading Skeletons, Error Boundary States.                           │
└─────────────────┴─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Navigation Components

### 2.1 Header & Desktop Navigation
1. **Purpose:** Primary wayfinding system for the institutional platform, reinforcing AIM/NITI Aayog affiliation and providing fast navigation across 7 core pillars.
2. **Variants:**
   - *Full Institutional Header:* 36px Utility bar (`#063D27`) + 76px Primary bar (`#FFFFFF`).
   - *Sticky Compact Header:* 64px white bar with 1px border (`#DDE5DC`), active on scroll.
3. **Visual States:** Default, Hover on menu item (forest green text highlight with animated 2px underline), Active (leaf-green dot indicator), Open Mega-Menu (elevated white sheet with `--shadow-3`).
4. **Keyboard Behavior:** `Tab` moves through top-level links; `Enter`/`Space` opens mega-menu; `Down Arrow` moves into mega-menu list; `Escape` closes open menu and returns focus to trigger.
5. **Responsive Behavior:** Visible on desktop ($\ge 1024\text{px}$). Collapses into mobile drawer trigger on viewports $< 1024\text{px}$.
6. **Accessibility:** `<header role="banner">`, `<nav aria-label="Main Navigation">`, `aria-haspopup="true"`, `aria-expanded="false/true"`.
7. **Content & Translation:** All 7 pillar titles translated in Marathi; accommodates up to 25% wider labels without clipping.

### 2.2 Mobile Navigation Drawer
1. **Purpose:** Full-featured off-canvas mobile navigation replacing the desktop header on mobile and tablet devices.
2. **Variants:** Slide-in right drawer (`width: 320px` or `85vw`).
3. **Visual States:** Closed (off-screen, `display: none` or `visibility: hidden`), Open (slide-in transition 300ms, backdrop dimmer `rgba(6, 61, 39, 0.40)`).
4. **Keyboard Behavior:** Focus trapped inside drawer when open; `Tab` cycles through links; `Escape` closes drawer; focus returns to hamburger button upon close.
5. **Responsive Behavior:** Active on viewports $< 1024\text{px}$.
6. **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation Menu"`, close button has `aria-label="Close navigation menu"`.
7. **Content & Translation:** Bilingual toggle prominently placed at the top of drawer; accordion disclosure buttons for sub-menus.

### 2.3 Logo & Language Selector
1. **Purpose:** Institutional branding identifier and context-preserving bilingual switch (`EN | मराठी`).
2. **Variants:**
   - *Logo:* Full dual-lockup logo (AIC-ADT + AIM NITI Aayog) on desktop; compact icon lockup on mobile.
   - *Language Switcher:* Segmented pill switch (`EN` / `मराठी`) with smooth active highlight.
3. **Visual States:** Default, Hover (`#00643A`), Focus ring (`3px solid #004B2A`), Active selected state (`background: #004B2A; color: #FFFFFF`).
4. **Keyboard Behavior:** `Tab` focusable, `Enter` or `Space` executes language transition while preserving current route path and query parameters.
5. **Responsive Behavior:** Logo scales from 48px height (desktop) to 36px (mobile). Language selector remains visible in utility bar on desktop and at drawer top on mobile.
6. **Accessibility:** `aria-label="Select language / भाषा निवडा"`, active language marked with `aria-pressed="true"`.
7. **Content & Translation:** Retains native Devanagari script for the Marathi option ("मराठी") and Latin for English ("EN").

### 2.4 Master Footer
1. **Purpose:** Institutional closing landmark containing legal disclosures, NITI Aayog recognition, 7-pillar navigation links, campus address, and contact info.
2. **Variants:** Single deep institutional green canvas (`#063D27`) with 4 multi-column link groupings and bottom legal bar.
3. **Visual States:** Links have default white text (`#FFFFFF`), hover leaf green (`#73992A`), keyboard focus ring.
4. **Keyboard Behavior:** Standard linear tab sequence through grouped semantic lists (`<ul><li><a href="...">`).
5. **Responsive Behavior:** 4-column layout on desktop ($\ge 1024\text{px}$), 2-column on tablet, single-column stacked accordion on mobile.
6. **Accessibility:** `<footer role="contentinfo">`, headings use `<h2>` or `<h3>` with `class="sr-only"` or visible titles.
7. **Content & Translation:** Full Marathi mirror of all legal pages (गोपनीयता धोरण, अटी आणि शर्ती, माहितीचा अधिकार).

### 2.5 Breadcrumbs
1. **Purpose:** Secondary hierarchical wayfinding showing the current page's location within the site hierarchy.
2. **Variants:** Inline text trail with forward-slash or chevron dividers (`Home / Programs / SISFS`).
3. **Visual States:** Parent links in `--color-text-secondary` (`#647067`), hover `--color-brand-primary` (`#004B2A`), current page in `--color-text-primary` (`#17231D`, bold, non-clickable).
4. **Keyboard Behavior:** Standard tab focusable links.
5. **Responsive Behavior:** On screens $< 480\text{px}$, collapses to show only the immediate parent link with a left-arrow icon ("← Back to Programs").
6. **Accessibility:** `<nav aria-label="Breadcrumb">`, `<ol>`, `<li aria-current="page">` for active item.
7. **Content & Translation:** Dynamic translation of all crumb labels in Marathi routes.

---

## 3. Action Components (Buttons & Links)

### 3.1 Buttons (Primary, Secondary, Outline, Text)
1. **Purpose:** Triggers for user actions (form submission, modal open, program application).
2. **Variants:**
   - *Primary:* Solid forest green background (`#004B2A`), white text (`#FFFFFF`), hover `#00643A`.
   - *Secondary:* Pale botanical background (`#E8F0D9`), forest green text (`#004B2A`), hover `#DDE5DC`.
   - *Outline:* Transparent background, 1.5px border (`#004B2A`), forest green text (`#004B2A`), hover `#F3F7EC`.
   - *Text Button:* Transparent background, forest green text, hover underline.
3. **Visual States:**
   - *Default:* Crisp geometry, 6px radius (`--radius-sm`).
   - *Hover:* Background color shift, 2px elevation in 150ms.
   - *Focus:* 3px solid focus ring (`#004B2A`) with 2px outer offset.
   - *Active:* 0.98 scale compression.
   - *Disabled:* Muted grey surface, opacity 0.5, cursor `not-allowed`.
   - *Loading:* Spinner replaces icon; button disabled; maintains exact dimensions to avoid layout shift.
4. **Keyboard Behavior:** Triggered via `Enter` or `Space`.
5. **Responsive Behavior:** Full width (`width: 100%`) in mobile form footers; auto-width with minimum 44px height on desktop.
6. **Accessibility:** `<button type="button|submit">`, `aria-busy="true"` when loading, `aria-disabled="true"` when disabled.
7. **Content & Translation:** Accommodates 15–25% Marathi string expansion without text wrapping or clipping.

### 3.2 Text Links & Icon Buttons
1. **Purpose:** Inline navigation, utility actions (close modal, search, copy link).
2. **Variants:**
   - *Text Link:* Forest green text with subtle permanent underline or hover underline.
   - *Icon Button:* 40px circular or rounded square button containing SVG icon.
3. **Visual States:** Default, Hover (background `#E8F0D9`), Focus ring (3px solid), Active.
4. **Keyboard Behavior:** `Tab` focusable, `Enter` to activate.
5. **Responsive Behavior:** Touch hit box expanded to $44 \times 44\text{px}$ on mobile even if visual icon is 20px.
6. **Accessibility:** Icon buttons must have an explicit `aria-label` (e.g., `aria-label="Close dialog"`).

---

## 4. Content & Display Components (Cards & Banners)

### 4.1 Startup Cards
1. **Purpose:** Showcase incubated ventures in the directory with sector tags, founder name, cohort year, and website link.
2. **Variants:** Grid card (3-column desktop) and List row (admin or directory list view).
3. **Visual States:** Default (1px border `#DDE5DC`, white surface), Hover (subtle lift `-2px`, border `#73992A`, `--shadow-2`), Focus.
4. **Keyboard Behavior:** Card contains an embedded focusable title link.
5. **Responsive Behavior:** 1-column mobile, 2-column tablet, 3-column desktop.
6. **Accessibility:** Entire card surface is clickable via stretched pseudo-element or explicit title anchor; logo has descriptive alt text.
7. **Content & Translation:** Startup name preserved in original legal form; sector tags translated into Marathi (उदा. 'कृषी-तंत्रज्ञान').

### 4.2 Program Cards (Incubation & Schemes)
1. **Purpose:** Detail incubation offerings, grant limits, eligibility criteria, and cohort status (SISFS, MeitY GENESIS).
2. **Variants:** Standard incubation card, Central grant scheme card with financial badge.
3. **Visual States:** Default, Hover (border shifts to forest green), Active application open state (green status badge).
4. **Keyboard Behavior:** "Learn More" / "Apply" button focusable via `Tab`.
5. **Responsive Behavior:** Full width on mobile, 2-column on tablet, 2 or 3-column on desktop.
6. **Accessibility:** High-contrast text; grant tranche numbers use tabular numerals for legibility.
7. **Content & Translation:** Financial tranches formatted in Indian numbering format (उदा. ₹२० लाख).

### 4.3 Statistic & Impact Cards
1. **Purpose:** Display certified institutional achievements (Startups Incubated, Capital Raised, Patents Filed).
2. **Variants:** Light card variant (white surface with forest green numbers) and Dark institutional variant (forest green surface with white/leaf numbers).
3. **Visual States:** Static high-readability display; hover elevation on interactive cards.
4. **Keyboard Behavior:** Non-interactive unless linked to an audit report modal.
5. **Responsive Behavior:** 2-column grid on mobile, 4-column bar on desktop.
6. **Accessibility:** Numerical text accompanied by an explicit audit period badge (`Audited: FY 2024-25`). Where sign-off is pending, displays amber placeholder badge.
7. **Content & Translation:** Bilingual numbers support (Arabic numerals standard across both languages for audit consistency).

### 4.4 Event & Workshop Cards
1. **Purpose:** Promote upcoming bootcamps, agtech seminars, and pitching sessions.
2. **Variants:** Upcoming event card (with prominent date badge and "Register" CTA) and Past event card (with recording link).
3. **Visual States:** Default, Hover, Registration Closed state (muted badge).
4. **Keyboard Behavior:** Interactive registration CTA focusable.
5. **Responsive Behavior:** Horizontal split layout on desktop (Date box left, content right); stacked on mobile.
6. **Accessibility:** Event date structured using `<time datetime="2026-11-15">`.

### 4.5 Call-to-Action (CTA) Panels
1. **Purpose:** High-impact full-width conversion section driving applications or lab booking.
2. **Variants:** Deep forest green canvas (`#004B2A`) with leaf-green accent and dual buttons.
3. **Visual States:** High-contrast text, primary white button + secondary outline button.
4. **Responsive Behavior:** Stacked text and buttons on mobile; side-by-side flex layout on desktop.
5. **Accessibility:** WCAG AAA contrast ratio ($> 10:1$ white text on `#004B2A`).

---

## 5. Controls & Discovery (Search, Filters, Tabs, Accordions)

### 5.1 Search Fields & Filter Segment Pills
1. **Purpose:** Real-time discovery in directories (Startups, Mentors, Schemes, Press Releases).
2. **Variants:**
   - *Search Input:* Search icon prefix, clear "✕" button suffix, instant debounced filter.
   - *Segmented Filter Pills:* Horizontal row of toggle pills (`All`, `Smart Farming`, `Biotech`, `IoT`).
3. **Visual States:** Unselected pill (`background: #E8F0D9; color: #004B2A`), Active pill (`background: #004B2A; color: #FFFFFF`), Focus ring.
4. **Keyboard Behavior:** `Tab` moves between pills; `Enter`/`Space` toggles filter; `Arrow` keys navigate between grouped options.
5. **Responsive Behavior:** Horizontal scrolling container with touch-drag on mobile; multi-row flex wrap on desktop.
6. **Accessibility:** `role="tablist"` or `role="group"`, `aria-pressed="true/false"` for toggle filters.
7. **Content & Translation:** Filter labels dynamically translate into Marathi.

### 5.2 Tabs & Accordions
1. **Purpose:** Content chunking for dense sections (e.g., Program Eligibility vs. Selection Process, FAQ items).
2. **Variants:** Horizontal tabs, Vertical accordion disclosures with animated chevron icon.
3. **Visual States:** Collapsed, Expanded, Focus ring on header trigger.
4. **Keyboard Behavior:** Tabs: `Left/Right Arrow` switches active tab, `Home/End` jumps to first/last; Accordions: `Enter/Space` toggles expansion.
5. **Responsive Behavior:** Tabs switch to vertical accordion on viewports $< 640\text{px}$.
6. **Accessibility:** Accordion triggers use `<button aria-expanded="false/true" aria-controls="panel-id">`. Panels have `id="panel-id" role="region"`.

---

## 6. Form Components (Inputs, Selects, Checkboxes, Validation)

### 6.1 Form Inputs, Textareas & Selects
1. **Purpose:** Data collection in the Multi-Step Application Portal and Contact/Inquiry forms.
2. **Variants:** Text Input, Email Input, Phone Input (with `+91` prefix), Select Dropdown, Multiline Textarea, File Uploader.
3. **Visual States:**
   - *Default:* White background, 1px border (`#DDE5DC`), 6px radius (`--radius-sm`).
   - *Hover:* Border `#647067`.
   - *Focus:* 3px solid focus ring (`#004B2A`), border `#004B2A`.
   - *Error:* Border `#DC2626`, 3px light red glow, error message rendered beneath field.
   - *Disabled:* Background `#F3F7EC`, text muted, cursor `not-allowed`.
4. **Keyboard Behavior:** Full keyboard navigation; standard tab sequence; Enter submits form (except in textareas).
5. **Responsive Behavior:** 100% width on mobile; 2-column grid on desktop for related fields. Touch height $\ge 44\text{px}$.
6. **Accessibility:** Persistent `<label for="id">` strictly enforced; error messages bound via `aria-describedby="error-id"`; invalid fields flag `aria-invalid="true"`.
7. **Content & Translation:** Bilingual labels and contextual placeholder hints in both English and Marathi.

### 6.2 Validation Messages & Error Summaries
1. **Purpose:** Communicating form errors clearly and guiding the user to rapid correction.
2. **Variants:** Field-level error text (red text + warning icon) and Page-level Error Summary box (top of form).
3. **Visual States:** Red container (`#FEE2E2`), red border (`#DC2626`), high-contrast dark red text.
4. **Keyboard Behavior:** On failed submit, keyboard focus automatically shifts to the top-level Error Summary box.
5. **Accessibility:** `role="alert"`, `aria-live="assertive"`. Links in error summary jump directly to invalid inputs via `href="#field-id"`.

---

## 7. Feedback & System Components (Badges, Alerts, Modals, States)

### 7.1 Badges & Status Labels
1. **Purpose:** Indicate state, category, or verification status (e.g., `Open`, `Audited`, `Pending Approval`).
2. **Variants:**
   - *Success / Open:* Green background (`#EAF5EE`), dark green text (`#1B7340`), checkmark icon.
   - *Warning / Pending:* Amber background (`#FEF3C7`), dark amber text (`#B45309`), clock icon.
   - *Error / Closed:* Red background (`#FEE2E2`), dark red text (`#DC2626`), cross icon.
   - *Category / Tag:* Pale botanical background (`#E8F0D9`), forest green text (`#004B2A`).
3. **Accessibility:** Never rely on color alone; every badge includes explicit text and an accompanying SVG icon.

### 7.2 Alerts & Banner Notifications
1. **Purpose:** System-wide announcements (e.g., "Cohort 4 Applications Now Open until Nov 30").
2. **Variants:** Inline alert box and Global top banner.
3. **Visual States:** Info (blue), Success (green), Warning (amber), Danger (red). Includes close "✕" button.
4. **Accessibility:** `role="region" aria-label="Announcement"`, dismissible button has accessible label.

### 7.3 Modal Dialogs
1. **Purpose:** Focused user interactions (e.g., Pitch Deck Upload confirmation, Mentor details view).
2. **Variants:** Center-screen dialog (`max-width: 560px`), full-screen on mobile.
3. **Visual States:** Open with backdrop blur and overlay (`rgba(6, 61, 39, 0.40)`).
4. **Keyboard Behavior:** Focus trapped inside modal; `Escape` key dismisses; focus restored to triggering button.
5. **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`.

### 7.4 Empty, Loading, and Error States
1. **Purpose:** Provide graceful, informative system feedback when data is absent, fetching, or failed.
2. **Variants:**
   - *Empty State:* Clean botanical line illustration, clear explanation ("No startups found matching this filter"), and a "Reset Filters" action button.
   - *Loading Skeleton:* Pulsing grey/pale-green shape placeholders matching exact card dimensions to prevent Cumulative Layout Shift (CLS).
   - *Error State:* Error illustration, retry action button ("Try Again"), and contact helpdesk link.
3. **Accessibility:** Skeletons have `aria-busy="true"` and `aria-label="Loading content..."`.
