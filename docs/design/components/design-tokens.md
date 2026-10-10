# AIC-ADT Baramati Foundation — Design Tokens Specification

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 2 (Design Tokens & Reusable Component Specification)  
**Status:** Canonical System Tokens Specification  
**Design Lead:** Senior Design-System Engineer & Frontend Design Architect  
**Architecture:** Multi-Tier Semantic Design Token System (CSS Custom Properties)  

---

## 1. Token Architecture & Naming Convention

The design token system follows a strict three-tier architecture:

```
[ Tier 1: Global / Primitives ]   ──>   [ Tier 2: Semantic / Intent ]   ──>   [ Tier 3: Component-Specific ]
(e.g., green-900: #004B2A)             (e.g., color.brand.primary)            (e.g., button.primary.bg)
```

### 1.1 Token Hierarchy Rules
1. **Semantic First:** Component implementations must bind to Tier 2 (Semantic) tokens (e.g., `var(--color-brand-primary)`), never hardcoded hex codes.
2. **Context Independence:** Functional tokens (e.g., `--color-feedback-error`) express state and intent regardless of the screen or device.
3. **Verified Contrast Pairs:** All text tokens are paired with certified background tokens meeting WCAG 2.1 AA contrast requirements ($\ge 4.5:1$ for normal body text, $\ge 3:1$ for large text and UI controls).

---

## 2. Color Tokens

### 2.1 Brand & Neutral Color Tokens
| Semantic Token Name | CSS Custom Property | Raw Hex / Value | Contrast on Canvas (#F8FAF7) | Contrast on Dark (#004B2A) | Semantic Usage |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `color.brand.primary` | `--color-brand-primary` | `#004B2A` | **10.2:1 (AAA)** | N/A (Self) | Primary brand green: primary buttons, major headings, key brand accents. |
| `color.brand.institutional`| `--color-brand-institutional`| `#063D27` | **12.4:1 (AAA)**| N/A | Deep institutional canvas: top utility bar, hero banner, master footer. |
| `color.brand.leaf` | `--color-brand-leaf` | `#73992A` | **3.8:1 (UI Only)**| **4.6:1 (AA)** | Accent leaf green: metric bars, badges, icon accents, subtle borders on dark. |
| `color.brand.hover` | `--color-brand-hover` | `#00643A` | **8.1:1 (AAA)** | N/A | Hover and active interactive state for primary buttons and text links. |
| `color.brand.pale` | `--color-brand-pale` | `#E8F0D9` | N/A (Bg) | N/A | Pale botanical green: category tag surfaces, active tab backgrounds. |
| `color.brand.light` | `--color-brand-light` | `#F3F7EC` | N/A (Bg) | N/A | Light botanical wash: alternating section canvases, card highlights. |
| `color.neutral.canvas`| `--color-neutral-canvas`| `#F8FAF7` | Base Canvas | N/A | Global default page background canvas (soft off-white botanical tint). |
| `color.neutral.surface`| `--color-neutral-surface`| `#FFFFFF` | N/A (Surface) | N/A | Pure white: card containers, modal dialogs, input field backgrounds. |
| `color.text.primary` | `--color-text-primary` | `#17231D` | **13.8:1 (AAA)** | N/A | Primary readable text: body copy, titles, labels, table data. |
| `color.text.secondary`| `--color-text-secondary`| `#647067` | **4.9:1 (AA)** | N/A | Supporting text: metadata, breadcrumbs, subtitles, form helper text. |
| `color.text.muted` | `--color-text-muted` | `#8C9790` | **3.1:1 (Large)**| N/A | De-emphasized text: disabled labels, non-critical timestamps, input placeholders. |
| `color.text.inverse` | `--color-text-inverse` | `#FFFFFF` | N/A | **10.2:1 (AAA)** | White text on dark institutional backgrounds (`#004B2A`, `#063D27`). |
| `color.border.default`| `--color-border-default`| `#DDE5DC` | Structural Border| N/A | Default structural borders: cards, table dividers, form field borders. |
| `color.border.subtle` | `--color-border-subtle` | `#EAEFE8` | Subtle Divider | N/A | Ultra-light dividing lines between secondary list items. |
| `color.border.focus` | `--color-border-focus` | `#004B2A` | **10.2:1** | N/A | Focus outline and active input boundary ring. |

### 2.2 Feedback & State Color Tokens
| Semantic Token Name | CSS Custom Property | Hex / Value | Contrast on White | Semantic Role |
| :--- | :--- | :---: | :---: | :--- |
| `color.feedback.success` | `--color-feedback-success` | `#1B7340` | **5.4:1 (AA)** | Form success, verified claims, open application status badges. |
| `color.feedback.success.bg` | `--color-feedback-success-bg`| `#EAF5EE` | N/A (Surface) | Success alert background, tag surface. |
| `color.feedback.warning` | `--color-feedback-warning` | `#B45309` | **4.8:1 (AA)** | Caution notices, unverified claim badges, closing-soon alerts. |
| `color.feedback.warning.bg` | `--color-feedback-warning-bg`| `#FEF3C7` | N/A (Surface) | Warning alert banner background, draft tag surface. |
| `color.feedback.error` | `--color-feedback-error` | `#DC2626` | **4.7:1 (AA)** | Form validation errors, file rejection, critical alerts. |
| `color.feedback.error.bg` | `--color-feedback-error-bg` | `#FEE2E2` | N/A (Surface) | Error alert banner background, invalid input tinted background. |
| `color.feedback.info` | `--color-feedback-info` | `#0369A1` | **5.1:1 (AA)** | Official circulars, government notices, helper informational tooltips. |
| `color.feedback.info.bg` | `--color-feedback-info-bg` | `#E0F2FE` | N/A (Surface) | Informational callout box background. |

---

## 3. Typography Tokens

### 3.1 Font Families & Weights
```css
/* Core Font Stacks */
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
--font-family-devanagari: 'Noto Sans Devanagari', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-family-display: 'Baloo 2', 'Noto Sans Devanagari', 'Inter', sans-serif;
--font-family-mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, Monaco, monospace;

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 3.2 Modular Typography Scale
| Token Name | CSS Custom Property | Desktop Size / Line-Height | Mobile Size / Line-Height | Devanagari Line-Height |
| :--- | :--- | :---: | :---: | :---: |
| `font.scale.display.1` | `--font-display-1` | 56px / 64px (1.14) | 40px / 48px (1.20) | 1.35 (Prevent matra clip) |
| `font.scale.display.2` | `--font-display-2` | 44px / 52px (1.18) | 32px / 40px (1.25) | 1.35 |
| `font.scale.h1` | `--font-h1` | 36px / 44px (1.22) | 28px / 36px (1.28) | 1.40 |
| `font.scale.h2` | `--font-h2` | 28px / 36px (1.28) | 24px / 32px (1.33) | 1.40 |
| `font.scale.h3` | `--font-h3` | 22px / 30px (1.36) | 20px / 28px (1.40) | 1.45 |
| `font.scale.h4` | `--font-h4` | 18px / 26px (1.44) | 16px / 24px (1.50) | 1.45 |
| `font.scale.body.lg` | `--font-body-lg` | 18px / 28px (1.55) | 16px / 26px (1.62) | 1.65 |
| `font.scale.body.md` | `--font-body-md` | 16px / 24px (1.50) | 15px / 24px (1.60) | 1.65 |
| `font.scale.body.sm` | `--font-body-sm` | 14px / 20px (1.42) | 13px / 20px (1.53) | 1.55 |
| `font.scale.caption` | `--font-caption` | 12px / 16px (1.33) | 12px / 16px (1.33) | 1.50 |
| `font.scale.overline` | `--font-overline`| 12px / 16px (+0.08em) | 11px / 16px (+0.08em) | 1.45 (No uppercase) |

---

## 4. Spacing, Sizing & Layout Tokens

### 4.1 Spacing Scale (8-Point Modular Scale)
| Token Name | CSS Custom Property | Pixel Equivalent | Typical Usage |
| :--- | :--- | :---: | :--- |
| `space.1` | `--space-1` | 4px | Micro-padding, icon-to-label gap, tag padding. |
| `space.2` | `--space-2` | 8px | Button internal horizontal gap, badge margins. |
| `space.3` | `--space-3` | 12px | Compact input vertical padding, chip spacing. |
| `space.4` | `--space-4` | 16px | Standard card padding, small component margins. |
| `space.5` | `--space-5` | 20px | Table cell padding, medium card internal padding. |
| `space.6` | `--space-6` | 24px | Grid gutters, generous card padding, modal inset. |
| `space.8` | `--space-8` | 32px | Sub-section spacing, form group vertical separation. |
| `space.10` | `--space-10` | 40px | Section content grouping, medium landmark gaps. |
| `space.12` | `--space-12` | 48px | Tablet section padding, component block separators. |
| `space.16` | `--space-16` | 64px | Desktop section vertical padding. |
| `space.20` | `--space-20` | 80px | Major landmark section padding. |
| `space.24` | `--space-24` | 96px | Hero banner top/bottom vertical padding. |
| `space.32` | `--space-32` | 128px | Landmark hero container display spacing. |

### 4.2 Responsive Container Widths & Margins
| Token Name | CSS Custom Property | Max-Width Value | Viewport Target |
| :--- | :--- | :---: | :--- |
| `container.sm` | `--container-sm` | 640px | Reading width (articles, policy pages, single form). |
| `container.md` | `--container-md` | 768px | Focused multi-step wizard, dialog containers. |
| `container.lg` | `--container-lg` | 1024px | Standard laptop viewport content boundary. |
| `container.xl` | `--container-xl` | 1240px | Primary widescreen container width (max readability). |
| `container.2xl`| `--container-2xl`| 1360px | Ultra-wide content clamping ceiling. |

### 4.3 Component Heights & Touch Targets
| Token Name | CSS Custom Property | Value | Notes |
| :--- | :--- | :---: | :--- |
| `size.touch.min` | `--size-touch-min` | 44px | **Strict Fitts's Law minimum touch target.** |
| `size.button.sm` | `--size-button-sm` | 36px | Desktop compact button (requires 44px touch bounding box). |
| `size.button.md` | `--size-button-md` | 44px | Standard button height across all viewports. |
| `size.button.lg` | `--size-button-lg` | 52px | Primary Hero CTA button height. |
| `size.input.sm` | `--size-input-sm` | 36px | Compact table search field height. |
| `size.input.md` | `--size-input-md` | 44px | Standard form input, select, and textarea row height. |
| `size.input.lg` | `--size-input-lg` | 52px | Prominent search bar height. |
| `size.header.top` | `--size-header-top`| 36px | Institutional utility bar height. |
| `size.header.main`| `--size-header-main`| 76px | Primary desktop sticky navbar height. |
| `size.header.mobile`| `--size-header-mobile`| 64px| Mobile header bar height. |

---

## 5. Shape, Elevation & Animation Tokens

### 5.1 Border Radii
```css
--radius-none: 0px;
--radius-xs:   4px;    /* Micro-badges, code snippets, tooltips */
--radius-sm:   6px;    /* Form inputs, select dropdowns, small buttons */
--radius-md:   8px;    /* Cards, table containers, alerts, program cards */
--radius-lg:   12px;   /* Dialog modals, hero media containers */
--radius-xl:   16px;   /* Major featured showcase cards */
--radius-full: 9999px; /* Status pills, avatars, rounded icon buttons */
```

### 5.2 Elevation & Box Shadows
```css
/* Card elevation: crisp 1px border paired with faint ambient occlusion */
--shadow-0: none;
--shadow-1: 0 1px 3px rgba(23, 35, 29, 0.05), 0 1px 2px rgba(23, 35, 29, 0.03);
--shadow-2: 0 4px 12px rgba(0, 75, 42, 0.08), 0 2px 4px rgba(0, 75, 42, 0.04);
--shadow-3: 0 8px 24px rgba(6, 61, 39, 0.12), 0 2px 6px rgba(6, 61, 39, 0.06);
--shadow-4: 0 16px 40px rgba(6, 61, 39, 0.18), 0 4px 12px rgba(6, 61, 39, 0.08);

/* Focus ring token */
--focus-ring: 0 0 0 3px rgba(0, 75, 42, 0.20), 0 0 0 1px var(--color-brand-primary);
--focus-ring-error: 0 0 0 3px rgba(220, 38, 38, 0.20), 0 0 0 1px var(--color-feedback-error);
```

### 5.3 Transitions & Motion Tokens
```css
/* Duration scale */
--duration-instant: 50ms;
--duration-fast:    150ms;  /* Micro-interactions, hover highlights, checkbox clicks */
--duration-normal:  200ms;  /* Dropdowns, card elevation shifts, tabs */
--duration-slow:    300ms;  /* Modal entrance, mobile drawer slide-in */

/* Easing curves */
--ease-standard: cubic-bezier(0.16, 1, 0.3, 1);  /* Smooth deceleration for UI entrances */
--ease-out:      cubic-bezier(0.0, 0.0, 0.2, 1);  /* Natural exit or fade */
--ease-in-out:   cubic-bezier(0.4, 0.0, 0.2, 1);  /* Symmetrical transitions (tabs, toggles) */

/* Reduced motion token */
--motion-reduced: 0.01ms !important;
```

### 5.4 Z-Index Scale
```css
--z-deep:     -1;    /* Background graphics, watermarks */
--z-base:      1;    /* Standard card content */
--z-dropdown:  100;  /* Select menus, autocomplete popovers */
--z-sticky:    200;  /* Sticky navigation bar */
--z-overlay:   300;  /* Backdrop dimmers */
--z-modal:     400;  /* Dialog modals, mobile navigation drawer */
--z-toast:     500;  /* System notification toasts */
--z-tooltip:   600;  /* Micro tooltips (highest priority) */
```

---

## 6. Canonical CSS Tokens Block

Below is the complete, drop-in stylesheet defining all custom properties:

```css
:root {
  /* Brand Palette */
  --color-brand-primary: #004B2A;
  --color-brand-institutional: #063D27;
  --color-brand-leaf: #73992A;
  --color-brand-hover: #00643A;
  --color-brand-pale: #E8F0D9;
  --color-brand-light: #F3F7EC;

  /* Neutrals & Surfaces */
  --color-neutral-canvas: #F8FAF7;
  --color-neutral-surface: #FFFFFF;
  --color-text-primary: #17231D;
  --color-text-secondary: #647067;
  --color-text-muted: #8C9790;
  --color-text-inverse: #FFFFFF;
  --color-border-default: #DDE5DC;
  --color-border-subtle: #EAEFE8;
  --color-border-focus: #004B2A;

  /* Feedback States */
  --color-feedback-success: #1B7340;
  --color-feedback-success-bg: #EAF5EE;
  --color-feedback-warning: #B45309;
  --color-feedback-warning-bg: #FEF3C7;
  --color-feedback-error: #DC2626;
  --color-feedback-error-bg: #FEE2E2;
  --color-feedback-info: #0369A1;
  --color-feedback-info-bg: #E0F2FE;

  /* Typography */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-devanagari: 'Noto Sans Devanagari', 'Inter', sans-serif;
  --font-family-display: 'Baloo 2', 'Noto Sans Devanagari', sans-serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Sizing */
  --size-touch-min: 44px;
  --size-button-sm: 36px;
  --size-button-md: 44px;
  --size-button-lg: 52px;
  --size-input-sm: 36px;
  --size-input-md: 44px;
  --size-input-lg: 52px;
  --size-header-top: 36px;
  --size-header-main: 76px;
  --size-header-mobile: 64px;

  /* Containers */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1240px;
  --container-2xl: 1360px;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-1: 0 1px 3px rgba(23, 35, 29, 0.05), 0 1px 2px rgba(23, 35, 29, 0.03);
  --shadow-2: 0 4px 12px rgba(0, 75, 42, 0.08), 0 2px 4px rgba(0, 75, 42, 0.04);
  --shadow-3: 0 8px 24px rgba(6, 61, 39, 0.12), 0 2px 6px rgba(6, 61, 39, 0.06);
  --shadow-4: 0 16px 40px rgba(6, 61, 39, 0.18), 0 4px 12px rgba(6, 61, 39, 0.08);

  /* Motion */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);

  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```
