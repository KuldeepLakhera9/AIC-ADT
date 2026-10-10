# AIC-ADT Baramati Foundation — Shared UI Components Specification

## Document Metadata
- **Document Title:** Production Shared UI Components Architecture & Inventory
- **Phase:** Phase 3 — Production Architecture & Implementation (Task 3)
- **Status:** Approved & Implemented
- **Location:** `apps/web/src/components/ui/`
- **Date:** October 2026
- **Author:** Senior Frontend Architect & Design System Engineer

---

## 1. Executive Summary

This specification documents the production inventory of reusable UI components implemented in `apps/web/src/components/ui/`. These components form the building blocks for the upcoming public pages (Homepage, Programs, Startup Directory, Facilities, Events, and Application Workflows).

All components adhere to:
- **TypeScript strict typing** with predictable, type-safe props.
- **Tailwind CSS v4** styling without external component libraries.
- **WCAG 2.2 Level AA accessibility** (keyboard navigation, visible focus indicators, touch targets $\ge 44\text{px}$, ARIA attributes, semantic markup).
- **Reduced motion support** (`prefers-reduced-motion` compliance).
- **Bilingual Marathi compatibility** (`Noto Sans Devanagari` font fallback and graceful word wrapping).

---

## 2. Component Implementation Status & Inventory

| Component Category | Component Name | Source File | Status | Approved Design Alignment |
| :--- | :--- | :--- | :--- | :--- |
| **Buttons & Links** | `Button` | `src/components/ui/Button.tsx` | Implemented | 7 variants, 3 sizes, loading spinner, touch targets $\ge 44\text{px}$ |
| | `LinkButton` | `src/components/ui/LinkButton.tsx` | Implemented | Next.js `Link` with button styling and keyboard focus rings |
| **Typography** | `Heading` | `src/components/ui/Heading.tsx` | Implemented | Decoupled semantic level (h1–h6) and visual size, `Outfit` font |
| | `Text` | `src/components/ui/Text.tsx` | Implemented | `Inter` body variants (lead, body, small, muted, caption), `lang` prop |
| | `Overline` | `src/components/ui/Overline.tsx` | Implemented | Uppercase tracking-wider category tag in forest or leaf green |
| **Cards** | `Card` Compound | `src/components/ui/Card.tsx` | Implemented | 6 variants (`default`, `elevated`, `institutional`, `light`, `botanical`, `bordered`), hover elevation |
| | `CardHeader` | `src/components/ui/Card.tsx` | Implemented | Consistent card padding and vertical rhythm |
| | `CardTitle` | `src/components/ui/Card.tsx` | Implemented | Semantic heading tag with font-heading typography |
| | `CardDescription` | `src/components/ui/Card.tsx` | Implemented | Secondary text styling with 4.88:1 contrast |
| | `CardContent` | `src/components/ui/Card.tsx` | Implemented | Body container with zero-top-padding flow |
| | `CardFooter` | `src/components/ui/Card.tsx` | Implemented | Divided action bar with border separator |
| **Badges & Status** | `Badge` | `src/components/ui/Badge.tsx` | Implemented | 9 variants with WCAG contrast and subtle borders |
| | `StatusIndicator` | `src/components/ui/StatusIndicator.tsx` | Implemented | Accessible status dot + mandatory textual label (WCAG 1.4.1) |
| **Navigation** | `Breadcrumbs` | `src/components/ui/Breadcrumbs.tsx` | Implemented | Accessible `<nav aria-label="Breadcrumb">` with `aria-current="page"` |
| | `SectionHeader` | `src/components/ui/SectionHeader.tsx` | Implemented | Composed overline, title, and description with left/center alignment |
| **Form Controls** | `FormLabel` | `src/components/ui/FormLabel.tsx` | Implemented | Accessible `<label>` with required asterisk and optional text |
| | `ErrorMessage` | `src/components/ui/ErrorMessage.tsx` | Implemented | Inline error with icon, `role="alert"`, and `aria-live="polite"` |
| | `Input` | `src/components/ui/Input.tsx` | Implemented | Touch target $\ge 44\text{px}$, left/right addons, `aria-invalid` |
| | `Textarea` | `src/components/ui/Textarea.tsx` | Implemented | Vertical resize only, error styling, `aria-describedby` |
| | `Select` | `src/components/ui/Select.tsx` | Implemented | Native `<select>` with custom styled SVG chevron |
| | `Checkbox` | `src/components/ui/Checkbox.tsx` | Implemented | 44px min touch box, custom check styling, description text |
| | `FormGroup` | `src/components/ui/FormGroup.tsx` | Implemented | Compound wrapper binding label, input, helper text, and error |
| **Feedback** | `Alert` | `src/components/ui/Alert.tsx` | Implemented | 4 variants (`info`, `success`, `warning`, `error`), dismiss action |
| **Loading & States**| `Skeleton` | `src/components/ui/Skeleton.tsx` | Implemented | `text`, `circular`, `rectangular`, `card` with reduced-motion fallback |
| | `CardSkeleton` | `src/components/ui/Skeleton.tsx` | Implemented | Composite skeleton mimicking real startup/facility cards |
| | `EmptyState` | `src/components/ui/EmptyState.tsx` | Implemented | Zero-data container with icon, heading, copy, and action button |
| **Layout** | `Container` | `src/components/layout/Container.tsx` | Implemented | Max 1240px container with responsive gutters (16/24/32px) |
| | `Grid` | `src/components/ui/Grid.tsx` | Implemented | Column grid (1, 2, 3, 4, 6, 12) with responsive breakpoints |
| | `Section` | `src/components/ui/Section.tsx` | Implemented | Semantic `<section>` with standardized padding and background tints |
| **Disclosures** | `Tabs` | `src/components/ui/Tabs.tsx` | Implemented | WAI-ARIA tablist with ArrowLeft/Right/Home/End keyboard handling |
| | `Accordion` | `src/components/ui/Accordion.tsx` | Implemented | Accessible collapsible disclosure with animated chevron |
| **Media** | `MediaContainer` | `src/components/ui/MediaContainer.tsx` | Implemented | Aspect ratios (16:9, 4:3, 1:1, 21:9), `<figcaption>`, subtle overlay |
| **Complex Modules** | Desktop Mega-Menu | `apps/web/src/components/layout/Header.tsx` | Pending (Task 4) | Detailed multi-tier desktop dropdown menus |
| | Mobile Drawer | `apps/web/src/components/layout/Header.tsx` | Pending (Task 4) | Off-canvas mobile navigation with trap focus |
| | Bilingual Switcher | `apps/web/src/components/layout/` | Pending (Task 4) | Interactive route/cookie locale switcher |
| | Modal Dialog | `apps/web/src/components/ui/Modal.tsx` | Pending (Task 7) | Accessible `<dialog>` with backdrop and focus trap |

---

## 3. Detailed Component Specifications

### 3.1 Buttons & Link Buttons
- **Files:** `Button.tsx`, `LinkButton.tsx`
- **Variants:**
  - `primary`: Background `#004B2A`, white text, hover `#00643A`, active `#063D27`.
  - `secondary`: White background, border `#004B2A`, text `#004B2A`, hover `#F3F7EC`.
  - `institutional`: Background `#063D27`, white text, hover `#004B2A`.
  - `leaf`: Background `#73992A`, white text, hover `#628422`.
  - `botanical`: Background `#E8F0D9`, text `#004B2A`, border `#73992A`/30, hover `#D8E6C3`.
  - `outline`: Transparent background, border `#DDE5DC`, text `#004B2A`, hover border `#004B2A`.
  - `ghost`: Transparent background, text `#17231D`, hover background `#F3F7EC`.
  - `danger` / `destructive`: Background `#DC2626`, white text, hover `#B91C1C`.
- **Sizes:**
  - `sm`: Min height 36px, text-xs, px-3 py-1.5.
  - `md`: Min height 44px (WCAG touch compliant), text-sm, px-4 py-2.5.
  - `lg`: Min height 48px, text-base, px-6 py-3.
- **Features:** Integrated accessible spinner during `isLoading`, disabled cursor and opacity, left/right icon slots.

### 3.2 Typography Primitives
- **Files:** `Heading.tsx`, `Text.tsx`, `Overline.tsx`
- **Decoupled Architecture:** `Heading` permits rendering semantic `<h1–h6>` tags independently from visual size classes (`h1–h6`), preventing heading hierarchy skipping while preserving design intent.
- **Language Awareness:** `Text` and `Heading` support the `lang="mr"` prop to enforce Devanagari typography metrics and prevents orphan Marathi conjuncts.

### 3.3 Composable Cards
- **File:** `Card.tsx`
- **Variants:**
  - `default`: White surface with subtle `#DDE5DC` border.
  - `elevated`: White surface with green-tinted shadow (`rgba(0,75,42,0.08)`).
  - `institutional`: Deep dark green surface (`#063D27`) with white text and green border (`#004B2A`).
  - `light`: Soft botanical tint (`#F3F7EC`).
  - `botanical`: Botanical tint with leaf green border accent (`#73992A`/30).
  - `bordered`: Transparent canvas with border outline.
- **Interaction:** `isHoverable` adds `-translate-y-1` micro-interaction and leaf-green border hover.

### 3.4 Badges & Status Indicators
- **Files:** `Badge.tsx`, `StatusIndicator.tsx`
- **WCAG 1.4.1 Compliance:** `StatusIndicator` requires a textual label alongside the visual indicator dot, ensuring users with color vision deficiencies receive equivalent information.
- **Dot Styles:**
  - `active`: Emerald green (`#10B981`) with optional pulse animation.
  - `warning`: Amber (`#F59E0B`).
  - `error`: Rose red (`#EF4444`).
  - `neutral`: Slate/forest gray (`#647067`).

### 3.5 Accessible Form Controls
- **Files:** `FormLabel.tsx`, `ErrorMessage.tsx`, `Input.tsx`, `Textarea.tsx`, `Select.tsx`, `Checkbox.tsx`, `FormGroup.tsx`
- **Features:**
  - Standardized minimum 44px touch targets.
  - Clear red outline (`#DC2626`) and tinted background (`#FEE2E2`/10) on invalid state.
  - Accessible `aria-invalid` and `aria-describedby` linking input directly to `ErrorMessage`.
  - Prefix and suffix addon slots for currency (`₹`), search icons, and units.
  - `FormGroup` provides render-prop composition to prevent ID mismatch defects between labels and inputs.

### 3.6 Alerts & Notifications
- **File:** `Alert.tsx`
- **Semantic Roles:** `role="alert"` for errors (`aria-live="assertive"`), `role="status"` for info/success/warning (`aria-live="polite"`).
- **Customizable:** Title, body text, custom icon slot, action button slot, and dismiss button with accessible `aria-label`.

### 3.7 Loading Skeletons & Empty States
- **Files:** `Skeleton.tsx`, `EmptyState.tsx`
- **Accessibility:** Skeletons have `aria-busy="true"` and `role="status"` with hidden `<span className="sr-only">Loading...</span>`.
- **Reduced Motion:** Animations automatically halt when `prefers-reduced-motion` is active.
- **Empty States:** Dashed-border containers with thematic agricultural illustrations/icons, clear explanation, and primary recovery action.

### 3.8 Layout Primitives
- **Files:** `Container.tsx`, `Grid.tsx`, `Section.tsx`
- **Container:** Caps width at 1240px, ensuring optimal reading line length and consistent gutter spacing.
- **Section:** Eliminates hardcoded vertical paddings across pages by standardizing on `spacing="sm"`, `"md"`, or `"lg"`.
- **Grid:** Provides standardized responsive column mappings for mobile, tablet, and desktop breakpoints.

### 3.9 Interactive Disclosures
- **Files:** `Tabs.tsx`, `Accordion.tsx`
- **Tabs (WAI-ARIA Tablist Pattern):**
  - `<div role="tablist">`
  - `<button role="tab" aria-selected="..." aria-controls="..." tabIndex="...">`
  - `<div role="tabpanel" aria-labelledby="..." tabIndex="0">`
  - Full keyboard support: ArrowLeft, ArrowRight, Home, and End keys move active selection and focus.
- **Accordion (WAI-ARIA Disclosure Pattern):**
  - `<button aria-expanded="..." aria-controls="...">`
  - `<div role="region" aria-labelledby="..." hidden="...">`
  - Rotates chevron smoothly with `motion-reduce:transition-none`.
  - Supports both single-expanded and multiple-expanded accordion modes.

### 3.10 Image & Media Containers
- **File:** `MediaContainer.tsx`
- **Aspect Ratios:** 16:9 (standard wide), 4:3 (lab/pilot testing), 1:1 (founder portraits), 21:9 (panoramic farm landscapes).
- **Semantics:** Wraps in `<figure>` and `<figcaption>` when captions are provided.
- **Overlays:** Optional gradient overlay for readable text on top of photography.

---

## 4. Barrel Exports & Consumption

All UI primitives are exported from `apps/web/src/components/ui/index.ts`:

```typescript
import {
  Button,
  LinkButton,
  Heading,
  Text,
  Overline,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  StatusIndicator,
  SectionHeader,
  Breadcrumbs,
  Input,
  Textarea,
  Select,
  Checkbox,
  FormGroup,
  Alert,
  Skeleton,
  CardSkeleton,
  EmptyState,
  Grid,
  Section,
  Tabs,
  Accordion,
  MediaContainer,
} from '@/components/ui';
```

---

## 5. Verification & Testing

The component suite has been tested across:
1. **TypeScript Type Safety:** `tsc --noEmit` verified with 0 errors.
2. **ESLint Verification:** Next.js ESLint configuration passed with 0 errors and 0 warnings.
3. **Automated Unit Tests:** `node --test` executed `src/components/ui/__tests__/design-system.test.ts` with 8/8 tests passing.
4. **Visual Showcase:** Verified interactively at `/design-system` covering all states, variants, and responsive breakpoints.
5. **Next.js Production Build:** `next build` compiled cleanly into static pages.
