# Design Principles & Interface Standards — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 1 (Design Discovery & Creative Direction)  
**Status:** Canonical Design Principles & Governance Standard  
**Design Lead:** Principal Product Designer, UX Architect & Accessibility Specialist  

---

## 1. Core Design Principles

The design of the AIC-ADT digital platform is anchored in five immutable principles that guide every wireframe, component, interaction, and content layout:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ 1. ROOTED AUTHORITY & SCIENTIFIC RIGOR                                                │
│    Reflecting national incubation stature (AIM, NITI Aayog) and campus agricultural   │
│    excellence. Authoritative, scientific, and dignified.                              │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ 2. EDITORIAL CLARITY OVER DECORATIVE NOISE                                            │
│    Prioritizing typography, purposeful white space, and clear content wayfinding over │
│    transient SaaS trends, glowing gradients, or superficial animations.               │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ 3. UNIVERSAL ACCESSIBILITY & LOW COGNITIVE FRICTION                                   │
│    Designed from the ground up for WCAG 2.1 AA compliance. Seamless for both a rural │
│    farmer on an entry-level smartphone and a venture capitalist on a 4K display.       │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ 4. SYMMETRICAL VERNACULAR DIGNITY                                                     │
│    Marathi is treated as an equal, first-class citizen with dedicated Devanagari      │
│    typography rules, not a clumsy afterthought or automated machine translation.      │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ 5. TRANSPARENT INTEGRITY & AUDITED TRUTH                                              │
│    Institutional credibility is paramount. Every metric cites its audit period; every│
│    pending claim carries an explicit verification badge. No fake vanity counters.     │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Usability & Interaction Rules

Every interactive element on the platform must adhere to the following human interface guidelines:

### 2.1 Touch Target Sizing (Fitts's Law)
- **Minimum Interactive Target Size:** All touch targets (buttons, links, form checkboxes, tab triggers, mobile menu items) must occupy a minimum interactive hit area of **$44 \times 44\text{px}$** on mobile and touch devices.
- **Adjacent Target Clearance:** A minimum spacing of **$8\text{px}$** must separate adjacent interactive targets to prevent accidental mis-taps.

### 2.2 Explicit State Affordances
Interactive elements must never rely on subtle cursor changes alone. Every component must define five explicit visual states:
1. **Default:** Crisp borders (`1px solid #DDE5DC`), high-contrast text (`#17231D`), recognizable button affordance.
2. **Hover:** Subtle elevation, background shift to `--color-hover-green` (`#00643A`), or text underline within 150ms.
3. **Focus (Keyboard):** Unmistakable 3px solid focus ring in `--color-primary-forest` (`#004B2A`) with a 2px outer offset.
4. **Active / Pressed:** Visual compression (scale `0.98` or border deepening) providing tactile confirmation of tap/click.
5. **Disabled:** Contrast-compliant muted surface (`#E8F0D9` or `#F3F7EC`), text opacity 0.5, cursor `not-allowed`, and `aria-disabled="true"`.

### 2.3 Form Ergonomics & Validation Rules
- **Top-Aligned Form Labels:** All input fields must utilize persistent, top-aligned `<label>` elements. Floating labels or placeholder-only forms are strictly prohibited due to cognitive strain and accessibility failures.
- **Inline Validation on Blur:** Input fields must validate after user focus leaves the field (`onBlur`), never while the user is actively typing.
- **Actionable Error Messages:** Validation errors must explicitly explain how to fix the issue (e.g., *"Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"*, not *"Invalid input"*).
- **Preservation of User Input:** Multi-step applications must save progress locally (`localStorage`) and never erase filled form data upon validation error or step navigation.
- **Clear Progress Steppers:** Complex workflows (e.g., SISFS application) must present an explicit 4-step progress header indicating current, completed, and remaining stages.

---

## 3. Responsive Behavior & Layout Architecture

The platform follows a **Mobile-First Responsive Strategy**, ensuring that layouts degrade gracefully and progressively enhance based on viewport capabilities.

### 3.1 Viewport Breakpoints
- **Mobile Small (`xs`):** 360px – 479px (Standard Indian Android smartphone base).
- **Mobile Large (`sm`):** 480px – 639px (Phablets and wide smartphones).
- **Tablet Portrait (`md`):** 640px – 1023px (iPads, Android tablets, foldable devices).
- **Desktop Standard (`lg`):** 1024px – 1279px (Laptops, standard desktop monitors).
- **Desktop Wide (`xl`):** 1280px – 1535px (High-resolution widescreen monitors).
- **Ultra-Wide (`2xl`):** $\ge 1536px$ (4K workstations; max-width clamped to 1360px).

### 3.2 Responsive Content Transformation Rules
1. **Desktop Mega-Menus $\rightarrow$ Mobile Slide-In Drawer:**
   - On viewports $< 1024\text{px}$, the desktop horizontal navigation collapses into a persistent hamburger button.
   - The mobile drawer opens as a full-height sheet (`width: 320px` or `85vw`) with high-contrast accordion lists, large touch targets ($48\text{px}$ row height), and immediate language switching at the top.
2. **Dense Data Tables $\rightarrow$ Responsive Card Stacks:**
   - Multi-column tables (e.g., Startup Directory, Scheme Comparison, Lab Testing Fee Schedule) must not force unstyled horizontal scrollbars on mobile.
   - On screens $< 768\text{px}$, tables must transform into vertical card stacks with clear key-value pair layouts.
3. **Multi-Column Grids $\rightarrow$ Single-Column Stacks:**
   - 3-column and 4-column feature grids (e.g., Pillars of Innovation, Program cards) must collapse to 2 columns on tablet (`md`) and 1 column on mobile (`sm`).
   - Card images must maintain aspect ratio (16:9 or 4:3) and never distort or overflow container bounds.

---

## 4. Accessibility Standards (WCAG 2.1 Level AA)

Accessibility is an architectural requirement, not an optional enhancement. The platform must conform strictly to **WCAG 2.1 AA** benchmarks:

### 4.1 Contrast Requirements
- **Standard Body Text ($< 18\text{px}$ or bold $< 14\text{px}$):** Minimum contrast ratio of **$4.5:1$** against the background. (AIC-ADT Primary Text `#17231D` on Canvas `#F8FAF7` achieves **$13.8:1$**).
- **Large Text ($\ge 18\text{px}$ or bold $\ge 14\text{px}$):** Minimum contrast ratio of **$3.0:1$** against the background.
- **User Interface Components & Borders:** Minimum contrast ratio of **$3.0:1$** for interactive boundaries, form input borders on focus, and icons conveying essential meaning.
- **Never Rely on Color Alone:** Statuses (e.g., Open, Closed, Pending) must pair color with a distinct text label and an accessible icon.

### 4.2 Keyboard Navigation & Focus Flow
- **Logical Tab Order:** DOM source order must match visual reading order across all layouts.
- **Skip Navigation Link:** Every page must include an accessible `"Skip to main content"` link as the first focusable element, visible immediately upon pressing `Tab`.
- **Trap Focus in Modals:** When dialogs, mobile drawers, or search overlays open, keyboard focus must be trapped within the modal container. Pressing `Escape` must dismiss the overlay and restore focus to the triggering element.

### 4.3 Semantic HTML & Screen Reader Support
- **Single `<h1>` Landmark:** Every rendered page must feature exactly one `<h1>` heading describing the primary page topic.
- **Structured Heading Hierarchy:** Heading levels must never be skipped (e.g., `<h1>` followed by `<h2>`, then `<h3>`, never `<h1>` followed by `<h4>`).
- **Descriptive Alt Text:** Every informative image must carry descriptive English or Marathi alt text. Purely decorative graphics must carry `alt=""` and `aria-hidden="true"`.
- **ARIA Live Regions:** Dynamic search results, filtering count updates, and application status messages must use `aria-live="polite"` so screen readers announce changes without interrupting speech.

---

## 5. Bilingual Interface Governance (English & Marathi)

The AIC-ADT platform serves both national/international stakeholders and local farming communities across Maharashtra. Bilingual parity is governed by strict technical rules:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                           BILINGUAL ARCHITECTURE PARITY                               │
├───────────────────────────────────────────────────┬───────────────────────────────────┤
│ ENGLISH ROUTE (`/`)                               │ MARATHI MIRROR (`/mr/`)           │
├───────────────────────────────────────────────────┼───────────────────────────────────┤
│ `aicadtbaramatifoundation.org/programs/sisfs`     │ `.../mr/programs/sisfs`           │
│ Primary Font: Inter (Latin glyphs)                │ Primary Font: Noto Sans Devanagari│
│ Line Height: 1.50                                 │ Line Height: 1.65 (Matra padding) │
│ Label: "Apply for Incubation"                     │ Label: "इनक्युबेशनसाठी अर्ज करा" │
└───────────────────────────────────────────────────┴───────────────────────────────────┘
```

### 5.1 Symmetric Routing & Context Preservation
- **1-to-1 Mirroring:** Every public English page must have an identical Marathi equivalent prefixed with `/mr/`.
- **Zero Loss Language Toggle:** Clicking the `EN | मराठी` toggle must preserve the user's exact current page, scroll depth, and active search/filter parameters (e.g., toggling on `/startups?sector=agritech` transitions smoothly to `/mr/startups?sector=agritech`).
- **HTML Language Tags:** The document root must dynamically declare `<html lang="en">` or `<html lang="mr">` to trigger appropriate browser hyphenation and screen reader pronunciations.

### 5.2 Devanagari Typography Handling
- **Vertical Line-Height Compensation:** Because Devanagari glyphs incorporate top matras (शिरोरेषा, काना, मात्रा) and bottom u-kars (उकार), cramped line heights cause clipping. CSS must enforce:
  - Body text: `line-height: 1.65` (vs. 1.50 in English).
  - Headings: `line-height: 1.45` (vs. 1.25 in English).
- **Text Expansion Allowance:** Marathi words frequently require 15% to 25% more horizontal space than English counterparts. Navigation bars, table cells, and button components must use fluid auto-layout containers with adequate horizontal padding (`padding: 12px 24px`) to prevent ugly line breaks.
- **Zero Automated Translation Artifacts:** All Marathi content must originate from verified human translation or domain-reviewed copy. Automated, untranslated English strings leaking into `/mr/` pages are treated as high-severity defects.

---

## 6. Motion & Accessibility (`prefers-reduced-motion`)

All interface animations must respect user comfort and cognitive accessibility:

1. **Mandatory Reduced Motion Query:**
   - Any animation or transition exceeding 100ms must be wrapped in `@media (prefers-reduced-motion: no-preference)`.
   - When the user prefers reduced motion, all animations are set to `0ms` duration, transitions resolve instantaneously, and all auto-scrolling components freeze into static controls.
2. **No Scroll-Hijacking:**
   - Scrolling velocity and acceleration must remain native to the user's operating system. Parallax effects that alter natural scroll mechanics are strictly prohibited.
3. **No Flashing or Rapid Strobing:**
   - No element may flash or oscillate more than 3 times per second to prevent triggering photosensitive seizures (WCAG 2.3.1).
