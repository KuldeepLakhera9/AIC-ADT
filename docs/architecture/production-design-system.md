# AIC-ADT Baramati Foundation — Production Design System Architecture

## Document Metadata
- **Document Title:** Production Design System Architecture & Token Specification
- **Phase:** Phase 3 — Production Architecture & Implementation (Task 3)
- **Status:** Approved & Implemented
- **Target Application:** `apps/web` (Next.js 16, React 19, Tailwind CSS v4)
- **Date:** October 2026
- **Author:** Senior Frontend Architect & Design System Engineer

---

## 1. Executive Summary

This document specifies the production implementation of the AIC-ADT Baramati Foundation design system in `apps/web`. The design system translates the approved Phase 2 design brief, design tokens, responsive guidelines, and accessibility standards into a high-performance, strictly typed, WCAG 2.2 AA compliant frontend foundation.

### Core Architecture Highlights
1. **Zero Additional UI Frameworks:** Built entirely on vanilla React 19 primitives, TypeScript strict typing, and Tailwind CSS v4. No third-party UI suites (such as Radix, MUI, Chakra, or Shadcn) were introduced.
2. **Authoritative Semantic Tokens:** Dual-bound into Tailwind v4's `@theme` directive and standard CSS custom properties (`:root`), guaranteeing compatibility across utility classes and inline styles.
3. **Multilingual Typography Stack:** Seamless font pairing of **Outfit** (editorial institutional headings), **Inter** (high-legibility body), and **Noto Sans Devanagari** (official Marathi script fallback).
4. **WCAG 2.2 AA Compliance:** Guaranteed 44px minimum touch targets, visible 2px leaf-green focus indicators (`#73992A`), non-color-reliant status communication, and mandatory `@media (prefers-reduced-motion: reduce)` fallbacks.
5. **Private Verification Showcase:** Dedicated internal route at `/design-system` for design review, isolated from public production navigation.

---

## 2. Design Token System & Semantic Palette

The production token system strictly preserves the approved Phase 2 visual identity for AIC-ADT Baramati Foundation. All hex values have been validated for contrast and semantic integrity.

### 2.1 Brand & Neutral Palette

| Token Name | Hex Code | Semantic Role | Contrast vs `#FFFFFF` |
| :--- | :--- | :--- | :--- |
| `--color-forest` / Primary | `#004B2A` | Primary brand green; primary CTA buttons, main headings | 9.53:1 (AAA) |
| `--color-institutional` / Dark | `#063D27` | Deep header, footer, dark hero banners, institutional authority | 12.82:1 (AAA) |
| `--color-leaf` / Accent | `#73992A` | Secondary buttons, badges, active focus rings, agritech vitality | 3.12:1 (Large text / UI) |
| `--color-hover` / Hover Green | `#00643A` | Hover and active interaction states on primary controls | 7.72:1 (AAA) |
| `--color-pale-botanical` | `#E8F0D9` | Badge fills, card backgrounds, active tab pills | 1.18:1 (Canvas tint) |
| `--color-botanical-bg` | `#F3F7EC` | Alternating section backgrounds, subtle form control fills | 1.08:1 (Canvas tint) |
| `--color-main-bg` | `#F8FAF7` | Default canvas and application body background | 1.04:1 (Canvas tint) |
| `--color-surface` | `#FFFFFF` | Card surfaces, inputs, modal dialogs, elevated containers | 1:1 (Reference) |
| `--color-text-primary` | `#17231D` | Primary body copy, labels, table content | 15.68:1 (AAA) |
| `--color-text-secondary` | `#647067` | Subheadings, descriptions, secondary metadata | 4.88:1 (AA) |
| `--color-text-muted` | `#59665D` | Helper text, disabled states, date stamps | 6.04:1 (AA) |
| `--color-border` | `#DDE5DC` | Card borders, table dividers, input outlines | 1.28:1 (UI boundary) |
| `--color-border-subtle` | `#EAEFE8` | Subtle card dividers, skeleton placeholders | 1.15:1 (UI boundary) |

### 2.2 Semantic Feedback Palette

| State | Background | Border | Text | Icon / Dot |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `#ECFDF5` | `#10B981` (50%) | `#064E3B` (11.8:1) | `#059669` |
| **Warning** | `#FFFBEB` | `#F59E0B` (50%) | `#78350F` (8.4:1) | `#D97706` |
| **Error** | `#FEF2F2` | `#EF4444` (50%) | `#7F1D1D` (10.9:1) | `#DC2626` |
| **Info** | `#F3F7EC` | `#73992A` (40%) | `#17231D` (14.5:1) | `#004B2A` |

---

## 3. Typography Architecture

### 3.1 Font Families & Loading Strategy
Fonts are loaded through `next/font/google` in `apps/web/src/app/layout.tsx` using variable fonts for optimal performance and zero layout shift:
- `--font-outfit`: `Outfit` (Latin, weights 400–800) — applied via `.font-heading` to display headings (`h1`–`h4`).
- `--font-inter`: `Inter` (Latin, weights 300–700) — applied via `.font-sans` to the root `<body>` for all running text.
- `--font-devanagari`: `Noto Sans Devanagari` (Devanagari, weights 400–700) — applied as automatic Marathi fallback and via `[lang="mr"]` selectors.

### 3.2 Type Hierarchy

| Level | Size | Line Height | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | `2.25rem` (36px) | `2.75rem` (44px) | 700 / Bold | `-0.025em` | Page titles, hero banners |
| **Section / H2** | `1.75rem` (28px) | `2.25rem` (36px) | 700 / Bold | `-0.02em` | Major content sections |
| **Sub / H3** | `1.375rem` (22px) | `1.75rem` (28px) | 600 / Semibold | `-0.015em` | Card titles, group headings |
| **Feature / H4** | `1.125rem` (18px) | `1.5rem` (24px) | 600 / Semibold | `-0.01em` | Accordion titles, list headers |
| **Lead Body** | `1.125rem` (18px) | `1.75rem` (28px) | 400 / Normal | `0` | Intro paragraphs |
| **Standard Body**| `1rem` (16px) | `1.5rem` (24px) | 400 / Normal | `0` | Default content |
| **Small Body** | `0.875rem` (14px) | `1.25rem` (20px) | 400 / Normal | `0` | Card body, table text, metadata |
| **Caption / Help**| `0.75rem` (12px) | `1rem` (16px) | 500 / Medium | `+0.01em` | Field helpers, date stamps |
| **Overline** | `0.75rem` (12px) | `1rem` (16px) | 700 / Bold | `+0.08em` | Uppercase category labels |

---

## 4. Layout Primitives & Responsive Grid

### 4.1 Responsive Container
The global container primitive (`apps/web/src/components/layout/Container.tsx`) standardizes responsive page margins:
- `max-w-[1240px]` matching `--container-max: 1240px`.
- Horizontal padding: `px-4` (16px mobile), `sm:px-6` (24px tablet), `lg:px-8` (32px desktop).
- Auto margin: `mx-auto`.

### 4.2 Semantic Sections
The `Section` component (`apps/web/src/components/ui/Section.tsx`) enforces uniform vertical rhythm:
- Spacing options:
  - `none`: `py-0`
  - `sm`: `py-8 md:py-12` (compact utility sections)
  - `md`: `py-12 md:py-16` (standard content sections)
  - `lg`: `py-16 md:py-24` (hero and major milestone sections)
- Background variants: `main` (`#F8FAF7`), `botanical` (`#F3F7EC`), `white` (`#FFFFFF`), `dark` (`#063D27`), and `forest` (`#004B2A`).

### 4.3 Responsive Grid
The `Grid` component (`apps/web/src/components/ui/Grid.tsx`) supports columns `1`, `2`, `3`, `4`, `6`, and `12` with standardized gutters (`sm` 12–16px, `md` 16–24px, `lg` 24–32px, `xl` 32–40px).

---

## 5. Accessibility & Interaction Foundations

### 5.1 Minimum Touch Targets
All interactive controls (`Button`, `LinkButton`, `Input`, `Select`, `Checkbox`, `Tabs`, `Accordion` headers) enforce a minimum touch target bounding box of **$44\text{px} \times 44\text{px}$** pursuant to WCAG 2.2 Success Criterion 2.5.8.

### 5.2 Visible Focus Indicators
The design system enforces a visible focus indicator using the brand leaf-green tone:
```css
:focus-visible {
  outline: 2px solid var(--focus-ring); /* #73992A */
  outline-offset: 2px;
}
```
Form controls and buttons incorporate corresponding Tailwind focus rings (`focus:ring-2 focus:ring-[#73992A] focus:ring-offset-2`).

### 5.3 Reduced-Motion Compliance
Animated elements (loading skeletons, pulse indicators, accordion chevrons, button spinners) respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Components utilize Tailwind's `motion-reduce:animate-none` and `motion-reduce:transition-none` utility classes.

### 5.4 Text Selection
Consistent branded selection highlight:
```css
::selection {
  background-color: var(--color-pale-botanical); /* #E8F0D9 */
  color: var(--color-forest); /* #004B2A */
}
```

---

## 6. Implementation & Verification Status

| Milestone / Deliverable | Status | Verification Result |
| :--- | :--- | :--- |
| Global CSS & Tailwind v4 Theme | Complete | Build passes without warnings |
| Google Fonts (Outfit, Inter, Devanagari) | Complete | Variable font classes loaded in layout |
| Design System Showcase (`/design-system`) | Complete | Statically prerendered (`5/5` routes static) |
| Unit Test Suite (`design-system.test.ts`) | Complete | 8/8 tests passed |
| TypeScript Strict Compilation (`typecheck`) | Complete | Code 0, 0 errors |
| ESLint Check (`lint`) | Complete | Code 0, 0 warnings/errors |
| Prettier Code Formatting (`format:check`) | Complete | Code 0, all files formatted |

---

## 7. Next Steps for Subsequent Tasks

1. **Phase 3 Task 4 (Navigation & Header/Footer):** Integrate desktop mega-menus, mobile navigation drawer, and bilingual toggle into the shared `apps/web/src/components/layout/` primitives.
2. **Phase 3 Task 5 (Homepage Implementation):** Compose the approved shared UI components (Hero, Statistics, Startup Spotlight, Facilities Grid) into the production homepage.
3. **Phase 3 Task 6+ (Directory & Dynamic Features):** Connect backend NestJS APIs (`apps/api`) to the startup directory, filtration, and contact application journeys.
