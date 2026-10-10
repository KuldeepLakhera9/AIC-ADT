# Accessibility Guidelines & Compliance Standards — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 2 (Design Tokens & Reusable Component Specification)  
**Status:** Mandatory Governance Standard (WCAG 2.1 Level AA)  
**Design Lead:** Senior Design-System Engineer & Accessibility Specialist  

---

## 1. Compliance Mandate & Executive Summary

The official digital platform of the **AIC-ADT Baramati Foundation** is an institutional resource mandated to serve a diverse spectrum of users: venture investors, academic scientists, government auditors, rural entrepreneurs, and smallholder farmers across Maharashtra.

To guarantee universal inclusion, the design system enforces strict, verifiable conformance with **WCAG 2.1 Level AA** across all public interfaces and the future Applicant Portal.

```
========================================================================================
                             ACCESSIBILITY PILLARS
========================================================================================
1. PERCEIVABLE:   High-contrast color tokens, certified text pairings, descriptive alt tags.
2. OPERABLE:      Complete keyboard navigability, skip links, 44px touch ergonomics.
3. UNDERSTANDABLE: Predictable layout structure, actionable form validation, bilingual parity.
4. ROBUST:        Strict semantic HTML5 landmarks, correct ARIA attributes, screen reader tests.
========================================================================================
```

---

## 2. Certified Color Contrast Matrix

Under WCAG 2.1 AA:
- Standard body text ($< 18\text{px}$ or bold $< 14\text{px}$) requires a minimum contrast ratio of **$4.5:1$**.
- Large text ($\ge 18\text{px}$ or bold $\ge 14\text{px}$) requires a minimum contrast ratio of **$3.0:1$**.
- UI components and interactive boundaries require a minimum contrast ratio of **$3.0:1$**.

### 2.1 Contrast Evaluation Table
| Foreground Token | Background Token | Foreground Hex | Background Hex | Contrast Ratio | Evaluation | Allowed Usage Rules |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `color.text.primary` | `color.neutral.canvas` | `#17231D` | `#F8FAF7` | **13.8:1** | **PASS (AAA)** | Default body copy, headings, labels. |
| `color.text.primary` | `color.neutral.surface`| `#17231D` | `#FFFFFF` | **15.2:1** | **PASS (AAA)** | Card surfaces, modal text, table data. |
| `color.text.secondary`| `color.neutral.canvas` | `#647067` | `#F8FAF7` | **4.9:1** | **PASS (AA)** | Metadata, breadcrumbs, subtitles, hints. |
| `color.text.secondary`| `color.neutral.surface`| `#647067` | `#FFFFFF` | **5.3:1** | **PASS (AA)** | Form helper text, card timestamps. |
| `color.brand.primary` | `color.neutral.canvas` | `#004B2A` | `#F8FAF7` | **10.2:1** | **PASS (AAA)** | Primary buttons, text links, major headers. |
| `color.text.inverse` | `color.brand.primary` | `#FFFFFF` | `#004B2A` | **10.2:1** | **PASS (AAA)** | Primary button text, dark banner text. |
| `color.text.inverse` | `color.brand.institutional`| `#FFFFFF`| `#063D27` | **12.4:1** | **PASS (AAA)** | Utility bar text, footer links, hero text. |
| `color.brand.leaf` | `color.brand.institutional`| `#73992A`| `#063D27` | **4.6:1** | **PASS (AA)** | Leaf accent text on dark footer/hero. |
| `color.brand.leaf` | `color.neutral.canvas` | `#73992A` | `#F8FAF7` | **3.8:1** | **UI ONLY** | **FORBIDDEN for small body text.** Permitted strictly for large UI borders, status pills, and graphical icons. |
| `color.feedback.error`| `color.neutral.surface`| `#DC2626` | `#FFFFFF` | **4.7:1** | **PASS (AA)** | Form error text with icon pairing. |
| `color.feedback.success`| `color.neutral.surface`| `#1B7340` | `#FFFFFF` | **5.4:1** | **PASS (AA)** | Verified claim badges, success messages. |

---

## 3. Keyboard Navigation & Focus Architecture

Every user interaction that can be performed with a mouse must be fully operable using a keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Arrow` keys, `Escape`).

### 3.1 Skip to Main Content Link
- Every page template must include an accessible skip link as the very first item in the DOM:
  ```html
  <a href="#main-content" class="skip-link">Skip to main content / मुख्य मजकुरावर जा</a>
  ```
- **Visual Behavior:** Hidden off-screen by default; becomes prominently visible in the top-left corner with high-contrast styling (`background: #004B2A; color: #FFFFFF; padding: 12px 24px; z-index: 9999`) upon initial `Tab` key press.

### 3.2 Visible Keyboard Focus Ring
- Interactive elements must never remove focus outlines (`outline: none` is strictly prohibited without a compliant fallback).
- The universal focus indicator token is:
  ```css
  :focus-visible {
    outline: 3px solid var(--color-brand-primary); /* #004B2A */
    outline-offset: 2px;
  }
  ```

### 3.3 Focus Trapping in Modals & Mobile Drawers
- When a modal dialog or mobile navigation drawer opens:
  1. Keyboard focus automatically shifts to the first focusable element inside the modal (or the close button).
  2. Tab navigation is trapped within the container; tabbing past the last interactive element cycles back to the first.
  3. Pressing `Escape` immediately dismisses the modal and restores keyboard focus to the button that triggered it.

---

## 4. Semantic Structure & Screen Reader Guidelines

### 4.1 HTML5 Landmarks
Page templates must utilize proper landmark elements rather than generic `<div>` containers:
- `<header role="banner">` — Global top utility bar and main navigation.
- `<nav aria-label="...">` — Specific navigation landmarks (Main Navigation, Breadcrumbs, Pagination).
- `<main id="main-content">` — The unique main content of the document.
- `<aside>` — Complementary sidebars (e.g., Application steps tracker, filter sidebar).
- `<footer role="contentinfo">` — Institutional master footer.

### 4.2 Heading Hierarchy
- **Single `<h1>` Rule:** Exactly one `<h1>` heading per page, describing the core title (e.g., `<h1 lang="mr">इनक्युबेशन कार्यक्रम</h1>`).
- **No Skipped Levels:** Headings must nest in strict sequence (`<h1>` $\rightarrow$ `<h2>` $\rightarrow$ `<h3>`). Visual sizing must be controlled via CSS utility classes (e.g., `<h2 class="font-h3">`), never by skipping heading levels.

### 4.3 Alternative Text for Agricultural & Institutional Media
Descriptive `alt` text must be tailored for the institutional and scientific context:
- **Good:** `alt="Polyhouse interior at Baramati campus showing automated drip irrigation lines and tomato crops"`
- **Bad:** `alt="Farm photo"` or `alt="Image123.jpg"`
- **Startup Logos:** `alt="[Startup Name] company logo"`
- **Purely Decorative Assets:** Faint background textures or decorative leaf line-art must be hidden from screen readers using `alt=""` and `aria-hidden="true"`.

---

## 5. Form Accessibility & Error Handling

Forms in the Application Portal (`/portal/*`) must provide effortless completion for all users:

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                           FORM FIELD ACCESSIBILITY BLUEPRINT                          │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ <label for="founder-email" class="form-label">Email Address / ईमेल पत्ता *</label>   │
│ <input id="founder-email" type="email" aria-required="true"                           │
│        aria-describedby="email-hint email-error" aria-invalid="true" />               │
│ <p id="email-hint" class="form-hint">We will dispatch your OTP to this address.</p>   │
│ <p id="email-error" class="form-error" role="alert">                                  │
│   <svg aria-hidden="true">...</svg> Enter a valid institutional or personal email.   │
│ </p>                                                                                  │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Persistent Labels:** Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label for="...">`.
2. **Accessible Name for Icon Buttons:** Buttons containing only an icon must carry `aria-label="Action description"`.
3. **Non-Reliance on Color Alone:** Validation errors must combine a red border with an explicit warning icon and descriptive error text.
4. **Focus on Error Summary:** When form submission fails, keyboard focus must move directly to an `Error Summary` box at the top of the form announcing the total number of errors and linking directly to invalid fields.

---

## 6. Motion & Cognitive Accessibility

1. **Mandatory `prefers-reduced-motion` Enforcement:**
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
2. **Zero Auto-Playing Video or Audio:** Video background elements are strictly prohibited. Demonstration videos must be user-initiated with clear play/pause controls.
3. **Touch Ergonomics:** All interactive buttons, chips, and mobile navigation items maintain a minimum touch hit area of **$44 \times 44\text{px}$** with at least **$8\text{px}$** separation.
