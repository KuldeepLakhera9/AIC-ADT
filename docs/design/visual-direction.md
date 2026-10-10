# Visual Direction & Design Language — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 1 (Design Discovery & Creative Direction)  
**Status:** Canonical Visual Direction  
**Design Lead:** Principal Product Designer & Creative Director  

---

## 1. Aesthetic Thesis & Visual Benchmark

The visual identity of the **AIC-ADT Baramati Foundation** marries **high-credibility institutional gravitas** with **contemporary agricultural technology innovation**. 

### 1.1 Aesthetic Benchmarks
The platform takes creative inspiration from premier global institutions and refined digital editorial platforms:
- **Wageningen University & Research (Netherlands):** World benchmark in clean, authoritative agricultural science communication.
- **ETH Zurich & CSIRO (Australia):** Rigorous, scientific typography, balanced white space, and clear lab equipment specifications.
- **Stripe Press / Modern Editorial Publishing:** Restrained, elegant layout hierarchies, crisp borders, and purposeful contrast rather than decorative clutter.
- **Gov.UK / Digital India Standards:** Uncompromising accessibility, clear button affordances, and zero-distraction form ergonomics.

```
========================================================================================
                                WHAT WE ARE VS. WHAT WE ARE NOT
========================================================================================
✔ WE ARE: A serious Atal Incubation Centre supporting deep-tech agtech startups.
✔ WE ARE: An NABL-accredited laboratory and agricultural research campus in Baramati.
✔ WE ARE: Grounded, transparent, scientifically rigorous, and accessible in Marathi.
────────────────────────────────────────────────────────────────────────────────────────
✖ WE ARE NOT: A generic corporate SaaS startup landing page with purple gradients.
✖ WE ARE NOT: A flashy web3/crypto accelerator with neon cyberpunk floating shapes.
✖ WE ARE NOT: A cluttered legacy government website with animated marquees and broken PDF links.
========================================================================================
```

---

## 2. Color System & Design Tokens

The palette is strictly anchored in the institutional brand identity of AIC-ADT and the Agricultural Development Trust, calibrated for WCAG 2.1 AA compliance (contrast ratio $\ge 4.5:1$ against backgrounds).

```
   #004B2A              #063D27              #73992A              #00643A
[ Primary Forest ]   [ Dark Institutional ]  [ Leaf Accent ]     [ Hover Green ]
   #E8F0D9              #F3F7EC              #F8FAF7              #FFFFFF
[ Pale Botanical ]   [ Light Botanical ]   [ Main Canvas ]       [ Pure White ]
   #17231D              #647067              #DDE5DC              #DC2626
[ Primary Text ]     [ Secondary Text ]    [ Subtle Border ]     [ Error Red ]
```

### 2.1 Core Palette Tokens
| Token Name | Hex Code | Contrast on Light (#F8FAF7) | Contrast on Dark (#004B2A) | Purpose & Usage |
| :--- | :--- | :---: | :---: | :--- |
| `--color-primary-forest` | `#004B2A` | **10.2:1 (AAA)** | N/A (Base) | Primary brand color: buttons, key headers, active navigation, logo elements. |
| `--color-dark-institutional`| `#063D27`| **12.4:1 (AAA)** | N/A (Base) | Deep institutional canvas for Hero banners, Impact dashboards, and Master Footer. |
| `--color-leaf-green` | `#73992A` | **3.8:1 (UI Only)** | **4.6:1 (AA)** | Accent color: metric progress bars, status pills, iconography, decorative badges. *Never used for small body text on light backgrounds.* |
| `--color-hover-green` | `#00643A` | **8.1:1 (AAA)** | N/A | Interactive hover and active focus state for primary buttons and text links. |
| `--color-pale-botanical` | `#E8F0D9` | N/A (Background) | N/A | Subtle background for category chips, program tags, and highlighted callout blocks. |
| `--color-light-botanical`| `#F3F7EC` | N/A (Background) | N/A | Section alternating background canvas (e.g., Features, Schemes, Lab equipment). |
| `--color-main-bg` | `#F8FAF7` | N/A (Base) | N/A | Global default page background canvas (softer on eyes than stark pure `#FFFFFF`). |
| `--color-surface-white` | `#FFFFFF` | N/A (Card Surface) | N/A | Card surfaces, modal containers, input field backgrounds. |
| `--color-text-primary` | `#17231D` | **13.8:1 (AAA)** | N/A | Master heading and body text color. Near-black forest charcoal, warm and readable. |
| `--color-text-secondary` | `#647067` | **4.9:1 (AA)** | N/A | Supporting subtitles, metadata, breadcrumbs, timestamps, and placeholder text. |
| `--color-border-subtle` | `#DDE5DC` | N/A (Structural) | N/A | 1px card borders, table dividers, input borders, and navigation dividers. |

### 2.2 Semantic & Functional Tokens
| Functional Role | Token Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Success / Verified** | `--color-feedback-success` | `#1B7340` | Verified claims, successful application submission, open program status. |
| **Warning / Pending** | `--color-feedback-warning` | `#B45309` | Unverified claim placeholder, pending executive approval badge, closing soon. |
| **Danger / Error** | `--color-feedback-error` | `#DC2626` | Form validation error, rejected file format, critical system alert. |
| **Information / Notice**| `--color-feedback-info` | `#0369A1` | Circulars, government notifications, informational tooltips. |
| **Focus Indicator** | `--color-focus-ring` | `#004B2A` | 3px visible outline with 2px offset for all interactive keyboard tab targets. |

---

## 3. Typography System & Bilingual Modular Scale

The typography pairing reflects technical clarity and vernacular dignity:
- **English Primary Font:** **Inter** (variable sans-serif designed for screen readability, tabular figures, and dense UI clarity).
- **Marathi / Devanagari Primary Font:** **Noto Sans Devanagari** (harmonious x-height, fully balanced matra diacritics, clear rendering at all weights).
- **Display Accent (Headings):** **Baloo 2** (used selectively for celebratory Marathi display headings, paired with Inter SemiBold).

### 3.1 Type Hierarchy & Modular Scale (Desktop vs. Mobile)

| Style Token | Font / Weight | Desktop Size / Line-Height | Mobile Size / Line-Height | Devanagari Adjustment |
| :--- | :--- | :---: | :---: | :--- |
| **Display 1** | Inter Bold (700) | 56px / 64px (1.14) | 40px / 48px (1.20) | Line-height $\ge 1.35$ (avoid matra clip) |
| **Display 2** | Inter SemiBold (600) | 44px / 52px (1.18) | 32px / 40px (1.25) | Line-height $\ge 1.35$ |
| **Heading 1 (H1)** | Inter SemiBold (600) | 36px / 44px (1.22) | 28px / 36px (1.28) | Line-height $\ge 1.40$ |
| **Heading 2 (H2)** | Inter SemiBold (600) | 28px / 36px (1.28) | 24px / 32px (1.33) | Line-height $\ge 1.40$ |
| **Heading 3 (H3)** | Inter Medium (500) | 22px / 30px (1.36) | 20px / 28px (1.40) | Line-height $\ge 1.45$ |
| **Heading 4 (H4)** | Inter Medium (500) | 18px / 26px (1.44) | 16px / 24px (1.50) | Line-height $\ge 1.45$ |
| **Body Large** | Inter Regular (400) | 18px / 28px (1.55) | 16px / 26px (1.62) | Line-height $\ge 1.60$ |
| **Body Regular** | Inter Regular (400) | 16px / 24px (1.50) | 15px / 24px (1.60) | Line-height $\ge 1.60$ |
| **Body Small** | Inter Regular (400) | 14px / 20px (1.42) | 13px / 20px (1.53) | Line-height $\ge 1.55$ |
| **Caption / Badge** | Inter Medium (500) | 12px / 16px (1.33) | 12px / 16px (1.33) | Line-height $\ge 1.50$ |
| **Overline (Caps)** | Inter SemiBold (600) | 12px / 16px (1.33, +0.08em) | 11px / 16px (1.45) | N/A (Devanagari has no uppercase) |

### 3.2 Devanagari Special Formatting Rules
1. **Vertical Rhythm Compensation:** Devanagari script features prominent ascending (उदा. ो, ै, ी) and descending (उदा. ु, ू, ृ) diacritics. In CSS, always enforce a minimum `line-height: 1.6` for Devanagari body text to prevent vertical collision.
2. **Horizontal Expansion Budget:** Marathi copy typically expands by **15% to 25%** in string length compared to English. Navigation bars and button pills must use flexible auto-layouts (`min-width` with generous horizontal padding) rather than fixed pixel widths.
3. **Numerals:** High-density data tables and fiscal amounts will default to international Arabic numerals (`1, 2, 3`) even in Marathi mode for administrative clarity, with optional Devanagari numerals (`१, २, ३`) in editorial body text.

---

## 4. Layout Grid, Spacing & Elevation Architecture

### 4.1 Responsive Breakpoint System
| Breakpoint | Target Screen Width | Container Max-Width | Column Count | Gutter Width | Outside Margins |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Mobile (`sm`)** | 360px – 639px | 100% fluid | 4 columns | 16px | 16px |
| **Tablet (`md`)** | 640px – 1023px | 100% fluid | 8 columns | 24px | 24px |
| **Desktop (`lg`)**| 1024px – 1279px | 1024px | 12 columns | 24px | 32px |
| **Wide Desktop (`xl`)** | 1280px – 1535px | 1240px | 12 columns | 32px | 48px |
| **Ultra-Wide (`2xl`)** | $\ge 1536px$ | 1360px | 12 columns | 32px | Auto-centered |

### 4.2 8-Point Spacing Scale
All margins, padding, and layout gaps adhere strictly to multiples of 8 (with 4px for micro-alignment):
- `--space-1`: `4px` (tag internal padding, icon gap)
- `--space-2`: `8px` (button internal gap, micro badge)
- `--space-3`: `12px` (input vertical padding, card dense padding)
- `--space-4`: `16px` (standard card padding, small component margin)
- `--space-6`: `24px` (grid gutter, card generous padding)
- `--space-8`: `32px` (stack gap between form groups, sub-section spacing)
- `--space-12`: `48px` (major component separation, tablet section padding)
- `--space-16`: `64px` (desktop section vertical padding)
- `--space-24`: `96px` (hero section vertical padding, landmark spacing)
- `--space-32`: `128px` (display hero container padding)

### 4.3 Border Radii & Elevation (Card Treatments)
To ensure a structured, trustworthy institutional appearance, border radii are restrained:
- `--radius-xs`: `4px` (badges, tooltips, tags)
- `--radius-sm`: `6px` (buttons, input fields, select dropdowns)
- `--radius-md`: `8px` (startup cards, program cards, table containers)
- `--radius-lg`: `12px` (feature modal dialogs, hero media frames)
- `--radius-full`: `9999px` (circular avatar chips, status pill indicators)

**Elevation & Shadows:**
The design relies on crisp 1px borders (`#DDE5DC`) rather than heavy drop shadows:
- `--shadow-card`: `0 1px 3px rgba(23, 35, 29, 0.05), 0 1px 2px rgba(23, 35, 29, 0.03)` + `1px solid #DDE5DC`
- `--shadow-card-hover`: `0 4px 12px rgba(0, 75, 42, 0.08), 0 2px 4px rgba(0, 75, 42, 0.04)` + `1px solid #73992A`
- `--shadow-modal`: `0 12px 32px rgba(6, 61, 39, 0.16), 0 4px 8px rgba(6, 61, 39, 0.08)` + `1px solid #DDE5DC`

---

## 5. Photography & Illustration Direction

### 5.1 Photography Mandate
The photographic language must reflect **tangible, authentic reality at the Baramati campus**:
1. **Real Infrastructure:** High-resolution photographs of the actual Agricultural Development Trust campus, Centre of Excellence in Protected Cultivation, IoT polyhouses, drip irrigation rigs, and the NABL Analytical Laboratory.
2. **Real People & Innovators:** Authentic startup founders working in the lab, local farmers interacting with soil testing technicians, women entrepreneurs operating food processing equipment, and mentors in genuine consultation sessions.
3. **Lighting & Color Grading:** Natural, clear daylight photography with crisp contrast. Avoid dark vignetting, unnatural saturation, or heavy moody filters.
4. **Strict Ban on Artificial Imagery:**
   - **NO** generic Western corporate stock photos of men in business suits shaking hands in generic office towers.
   - **NO** hallucinated AI-generated sci-fi imagery (e.g., glowing neon blue holographic plants floating over robotic tractors).
   - **NO** watermarked or low-resolution imagery.

### 5.2 Iconography & Technical Diagrams
1. **Icon Family:** Outlined, 1.5px stroke vector icons from a unified library (e.g., Lucide Icons or custom SVG set), rendered in `--color-primary-forest` (`#004B2A`) or `--color-leaf-green` (`#73992A`).
2. **Technical Architecture Diagrams:** SVG-based data-flow and incubation-cycle diagrams using crisp clean geometry, clear labels, and high contrast against background surfaces.
3. **Botanical Micro-Accents:** Subtle botanical geometric line-art patterns may be used as faint watermark textures (opacity $\le 0.04$) on dark institutional green banners, reinforcing the agricultural heritage.

---

## 6. Motion & Micro-Interaction Principles

Motion in the AIC-ADT interface is designed for **functional feedback and editorial elegance**, never for decorative distraction.

### 6.1 Timing & Easing Curves
- **Micro-Interactions (Buttons, Links, Checkboxes):** Duration `150ms`, easing `ease-out`.
- **Card Hover & Elevation:** Duration `200ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Dropdown & Modal Appearance:** Duration `250ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Tab & Segmented Control Transitions:** Duration `200ms`, easing `ease-in-out`.

### 6.2 Strict Reduced Motion Compliance (`prefers-reduced-motion`)
The design system enforces a mandatory CSS media query override:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
When reduced motion is enabled:
- Parallax effects and auto-playing video carousels are completely disabled.
- Page transitions switch instantly without fade or slide.
- Hover states change color and border without positional translations (`transform: translateY(...)` is suppressed).

---

## 7. Component Styling Specifications

### 7.1 Institutional Header
- **Top Utility Bar (`#063D27` Dark Institutional Green):** Height 36px. Displays National Flag / AIM recognition text ("Supported by Atal Innovation Mission, NITI Aayog"), Emergency/Helpline contact number, and the active English/Marathi language toggle pill (`EN | मराठी`).
- **Main Navigation Bar (`#FFFFFF` Pure White):** Height 76px desktop, sticky with subtle border (`1px solid #DDE5DC`). Features official AIC-ADT dual logo, 7 primary navigation items with subtle chevron indicators, global search icon, and primary CTA button: `"Apply for Incubation"` (`#004B2A`).
- **Mega-Menu Overlay:** Clean white card (`#FFFFFF`) with 1px border (`#DDE5DC`), 2-column or 3-column layout grouping sub-pages with concise 1-line descriptions and featured highlight callouts.

### 7.2 Editorial Hero Section
- **Option A (Light Editorial Wash):** Canvas `#F8FAF7` with pale botanical background accents (`#F3F7EC`). High-contrast typography, overline tag (`SUPPORTED BY NITI AAYOG`), dual CTA (`Apply for Incubation` / `Explore Programs`), and a 5:4 aspect ratio verified photo of the Baramati campus or agtech innovation lab.
- **Option B (Institutional Anchor):** Canvas `#004B2A` with pure white heading text and leaf-green (`#73992A`) accent badges. Used for key pillar landings (e.g., Homepage, Impact Dashboard).

### 7.3 Verified Impact Metric Cards
- **Structure:** Crisp white surface (`#FFFFFF`), 1px border (`#DDE5DC`), 8px border-radius.
- **Header:** Stat number in Inter Bold 40px (`#004B2A`).
- **Label:** Metric description in Body Regular 15px (`#17231D`).
- **Verification Badge:** Pill tag at bottom in Pale Botanical (`#E8F0D9`) with text: `Audited: FY 2024-25` or placeholder `[AUDIT SIGN-OFF PENDING]`.

### 7.4 Form Fields & Multi-Step Application Controls
- **Input Surfaces:** White `#FFFFFF`, border 1px `#DDE5DC`, text `#17231D`, placeholder `#647067`.
- **Focus State:** Border 1px `#004B2A`, box-shadow `0 0 0 3px rgba(0, 75, 42, 0.15)`.
- **Error State:** Border 1px `#DC2626`, box-shadow `0 0 0 3px rgba(220, 38, 38, 0.15)`, explicit error text below field with warning icon.
- **Progress Stepper:** Numbered circular steps (1 through 4) connected by clean horizontal line. Active step filled with `#004B2A`, completed steps show white checkmark in `#73992A`, future steps grey outlined.
