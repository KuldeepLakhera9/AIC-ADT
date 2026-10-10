# Responsive Guidelines & Layout Rules — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 2 (Design Tokens & Reusable Component Specification)  
**Status:** Canonical Responsive Design Standard  
**Design Lead:** Senior Design-System Engineer & Frontend Design Architect  

---

## 1. Responsive Screen Tiers

Rather than designing for isolated device models, the layout system defines five continuous responsive ranges based on available viewport width:

```
┌─────────────────┬─────────────────┬─────────────────┬───────────────────┬────────────────────┐
│  SMALL MOBILE   │  LARGE MOBILE   │     TABLET      │      DESKTOP      │   LARGE DESKTOP    │
│   320px–479px   │   480px–767px   │  768px–1023px   │   1024px–1439px   │   1440px & above   │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┼────────────────────┤
│ 4 Columns       │ 4 Columns       │ 8 Columns       │ 12 Columns        │ 12 Columns         │
│ Gutter: 16px    │ Gutter: 16px    │ Gutter: 24px    │ Gutter: 24px      │ Gutter: 32px       │
│ Margin: 16px    │ Margin: 20px    │ Margin: 32px    │ Margin: 48px      │ Margin: Auto (Max) │
│ Nav: Drawer     │ Nav: Drawer     │ Nav: Drawer     │ Nav: Mega-Menu    │ Nav: Mega-Menu     │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┴────────────────────┘
```

### 1.1 Detailed Tier Specifications
1. **Tier 1: Small Mobile Screens (320px – 479px):**
   - **Baseline Target:** Entry-level 4G/5G Android smartphones common among regional agricultural college students, smallholder farmers, and rural field officers.
   - **Layout Behavior:** Strict single-column stack for all cards and forms. Touch targets strictly $\ge 44\text{px}$. Tables converted into vertical key-value cards. Top utility bar collapsed into an accessible drawer trigger.
2. **Tier 2: Large Mobile Screens (480px – 767px):**
   - **Baseline Target:** Standard and large-format smartphones (iPhone Pro Max, Samsung Galaxy Plus), portrait foldables, landscape mobile viewing.
   - **Layout Behavior:** 4-column grid. Select dual-column layouts enabled for compact summary metrics and photo galleries. Full mobile drawer navigation remains active.
3. **Tier 3: Tablets (768px – 1023px):**
   - **Baseline Target:** iPad standard, Android tablets used by incubation mentors during pitching sessions, field demonstration kiosks.
   - **Layout Behavior:** 8-column grid. 2-column feature card layouts. Form fields transition into 2-column groupings (First Name / Last Name). Horizontal table views enabled with visual scroll affordances. Navigation uses slide-in drawer.
4. **Tier 4: Desktop Standard (1024px – 1439px):**
   - **Baseline Target:** Standard enterprise laptops (13" to 15" MacBooks, ThinkPads, government desktop PCs).
   - **Layout Behavior:** 12-column grid. Desktop sticky navigation bar and full multi-column mega-menus active. 3-column startup directory and program cards. Container max-width clamped to `1240px`.
5. **Tier 5: Large Desktop (1440px and above):**
   - **Baseline Target:** 24" to 32" workstation monitors, 4K displays, institutional boardroom projectors.
   - **Layout Behavior:** 12-column grid. Content strictly centered with `--container-2xl: 1360px` maximum width. Generous outer margins prevent lines of text from exceeding optimal reading length (65–75 characters).

---

## 2. Fluid Typography & Modular Scaling Formulas

To eliminate jarring layout jumps at discrete breakpoints, major headings utilize fluid CSS `clamp()` formulas:

```css
/* Fluid Typography Scale (Viewport-Responsive) */
:root {
  /* Display 1: Clamped between 40px (at 360px viewport) and 56px (at 1240px viewport) */
  --font-fluid-display-1: clamp(2.5rem, 1.8rem + 3.1vw, 3.5rem);

  /* Display 2: Clamped between 32px and 44px */
  --font-fluid-display-2: clamp(2.0rem, 1.5rem + 2.2vw, 2.75rem);

  /* Heading 1: Clamped between 28px and 36px */
  --font-fluid-h1: clamp(1.75rem, 1.4rem + 1.6vw, 2.25rem);

  /* Heading 2: Clamped between 24px and 28px */
  --font-fluid-h2: clamp(1.5rem, 1.3rem + 0.9vw, 1.75rem);

  /* Heading 3: Clamped between 20px and 22px */
  --font-fluid-h3: clamp(1.25rem, 1.15rem + 0.5vw, 1.375rem);

  /* Body Regular: 15px mobile, 16px desktop */
  --font-fluid-body: clamp(0.9375rem, 0.9rem + 0.2vw, 1.0rem);
}
```

---

## 3. Responsive Image Aspect Ratios & Media Containers

Images must never distort or create layout reflow (Cumulative Layout Shift, CLS). Standardized container aspect ratios are enforced across all media components:

| Media Component | Aspect Ratio Token | Mobile Layout | Desktop Layout | Object-Fit Rule |
| :--- | :---: | :--- | :--- | :--- |
| **Hero Landmark Media** | `16:9` or `5:4` | Full-width container | Right column frame (`width: 100%`) | `object-fit: cover` |
| **Facility / Lab Photo** | `4:3` | Stacked card header | 3-column grid card top | `object-fit: cover` |
| **Startup Logo / Avatar** | `1:1` (Square) | 64px circular chip | 80px rounded square (`radius: 8px`) | `object-fit: contain` |
| **Mentor Headshot** | `1:1` (Square) | 72px circular chip | 120px circular chip | `object-fit: cover` |
| **Wide Banner / CSR** | `21:9` (Panoramic) | 16:9 fallback | Full-width contained banner | `object-fit: cover` |

```css
/* Responsive Image Frame Utility */
.media-frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  background-color: var(--color-brand-pale);
}
.media-frame-16-9 { aspect-ratio: 16 / 9; }
.media-frame-4-3  { aspect-ratio: 4 / 3; }
.media-frame-1-1  { aspect-ratio: 1 / 1; }

.media-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

## 4. Navigation Collapse & Drawer Mechanics

```
[ Desktop: >= 1024px ] ──> Sticky Utility Bar (36px) + Mega-Menu Navbar (76px) + CTA Button
[ Mobile:  < 1024px  ] ──> Compact Header (64px): Logo + Language Toggle + Hamburger Button (44px)
```

### 4.1 Mobile Drawer Architecture
- **Trigger Hit Area:** Minimum $48 \times 48\text{px}$ touch target with `aria-expanded="false"`, `aria-controls="mobile-nav-drawer"`, and `aria-label="मुख्य मेनू उघडा / Open main menu"`.
- **Drawer Canvas:** Slides in from the right edge, covering `320px` (or `85vw` on narrow phones).
- **Z-Index:** Set to `--z-modal: 400` with a darkened backdrop (`--z-overlay: 300`, `background: rgba(6, 61, 39, 0.40)`).
- **Content Hierarchy:**
  1. Header with close button (`Escape` key supported) and prominent language toggle (`EN | मराठी`).
  2. Vertical accordion list for the 7 pillars (Touch row height $\ge 48\text{px}$).
  3. Prominent primary CTA button (`"Apply for Incubation"`).
  4. Institutional helpline phone number and social media links.
- **Scroll Lock:** When the drawer opens, `document.body.style.overflow = 'hidden'` is applied to prevent background scroll bleeding.

---

## 5. Responsive Card Stacking & Grid Wrapping

To prevent rigid layout breaks, card containers use flexible auto-wrapping CSS Grid definitions rather than fixed media queries:

```css
/* Fluid Auto-Fit Grid Pattern */
.grid-auto-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-6);
}

.grid-3-col-desktop {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .grid-3-col-desktop {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .grid-3-col-desktop {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }
}
```

---

## 6. Responsive Tables & Complex Data Displays

Dense tables (e.g., Startup Directories, NABL Lab Testing Rate Cards, Scheme Grant Tranches) are notorious for breaking mobile screens. The AIC-ADT design system mandates two responsive strategies:

### 6.1 Strategy A: Card-List Transformation (Recommended for Directories & Startups)
On viewports $< 768\text{px}$, tabular rows transform into individual structured cards using CSS Grid/Flexbox:
```css
@media (max-width: 767px) {
  .table-responsive-stack thead {
    display: none; /* Hide traditional table header */
  }
  .table-responsive-stack tr {
    display: block;
    margin-bottom: var(--space-4);
    padding: var(--space-4);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    background: var(--color-neutral-surface);
  }
  .table-responsive-stack td {
    display: flex;
    justify-content: space-between;
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--color-border-subtle);
  }
  .table-responsive-stack td::before {
    content: attr(data-label); /* Render column name from data-label */
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
}
```

### 6.2 Strategy B: Controlled Horizontal Scroll with Shadow Indicators (For Financial/NABL Tables)
When tabular columns must stay intact (e.g., fee schedules with 6 comparison columns), the table container enforces:
- `overflow-x: auto` with smooth touch scrolling (`-webkit-overflow-scrolling: touch`).
- Visual gradient shadows on the right edge indicating that more content is scrollable.
- Sticky first column (`position: sticky; left: 0; background: #FFFFFF`) so row titles remain visible while scrolling data.

---

## 7. Prevention of Horizontal Overflow (Marathi & Complex URLs)

Horizontal scrolling on a webpage is a critical defect. The design system prevents overflow through five mandatory rules:

1. **Word-Break Defense:**
   ```css
   body, p, h1, h2, h3, h4, span, a {
     overflow-wrap: break-word;
     word-wrap: break-word;
   }
   ```
2. **Marathi Compound Word Handling:** Complex Devanagari compound ligatures (उदा. 'कृषी-जैवतंत्रज्ञान' किंवा 'इनक्युबेशन-प्रक्रिया') can be lengthy. Words must use soft hyphens (`&shy;`) where necessary, and containers must avoid fixed pixel widths.
3. **Flexible Button & Badge Layouts:** Never assign `width: 120px` to buttons. Always use `min-width: max-content; padding: 10px 20px;` to let Marathi text expand naturally by 15% to 25%.
4. **Max-Width Clamping on Media:**
   ```css
   img, svg, video, canvas, iframe {
     max-width: 100%;
     height: auto;
   }
   ```
5. **No Negative Margins Without Container Inset:** Negative margins that break container padding are strictly forbidden unless inside a container with `overflow: hidden`.
