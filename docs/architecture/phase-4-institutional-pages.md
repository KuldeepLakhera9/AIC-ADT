# Phase 4 Institutional Public Pages Implementation Architecture
**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 4 (Public Website & Feature Implementation) — Task 4  
**Status:** **COMPLETED & VERIFIED**  
**Date:** October 12, 2026  
**Authors:** Principal Information Architect, Senior Frontend Engineer  

---

## 1. Executive Summary & Approved Sitemap Alignment

As mandated by the approved sitemap (`docs/requirements/sitemap.md`), the institutional section of the AIC-ADT Baramati Foundation digital platform communicates the foundation's genesis, statutory standing, charter, leadership, campus infrastructure, and strategic ecosystem alliances.

Per the strict architectural constraints of Phase 4 Task 4:
- Only routes approved in the official sitemap were created. No arbitrary standalone routes (such as an unapproved standalone `/faq` route) were introduced.
- Content integrity has been strictly enforced: zero fabricated biographies, zero fictitious portraits, and zero synthetic claims. All facts were extracted and validated against `docs/audit/content-verification-register.md` and statutory records.
- Zero unnecessary client-side JavaScript: All institutional pages are compiled as high-performance **React Server Components (RSC)** with static pre-rendering.
- Responsive multi-device layout (320px mobile through 1440px desktop), WCAG 2.2 AA contrast adherence, and $\ge 44\text{px}$ touch targets across all interactive links.

---

## 2. Implemented Route Hierarchy

| Route | Page Name | Primary Content & Architectural Purpose | Rendering Model |
| :--- | :--- | :--- | :--- |
| `/about` | Institutional Overview | Foundation genesis, 50-year ADT parentage, NITI Aayog sanction, core pillars, statutory accreditations, and 1971–2026 heritage milestones. | Static (`○`) |
| `/about/mission-vision` | Mission, Vision & Values | Official charter mandate, 5 core institutional values, UN Sustainable Development Goals (SDG) mapping matrix, and 2030 strategic horizon roadmap. | Static (`○`) |
| `/about/leadership` | Leadership & Governance | Governing Board of Directors (Pawar, Hingmire, etc.), Advisory Council (Mathur, Arora, KVK Agronomists), Executive Management Roster (CEO Jaya Tiwari, Managers), and CIN corporate fiduciary disclosures. | Static (`○`) |
| `/about/infrastructure` | Campus & Research Overview | 110-acre campus extent, 50+ acres living farm testbed, solar microgrid, 5 specialized research labs directory, and the 4-stage "Lab-to-Land" pipeline. | Static (`○`) |
| `/about/infrastructure/[slug]` | Specialized Lab Specifications | Deep-dive technical specification pages for all 5 facilities with industrial equipment matrices, calibration ratings, operating guidelines, and booking metadata. | Static (`○` / `◐`) |
| `/about/partners` | Ecosystem Alliances | Multi-sectoral directory categorized by Government, Corporate CSR, Academic & Research, Venture Capital, and Industry Chambers. | Static (`○`) |
| `/_not-found` (`/not-found`) | 404 Institutional Recovery | Accessible error resolution page with clear institutional navigation recovery paths back to all institutional public pillars. | Static (`○`) |

---

## 3. Specialized Laboratory Dynamic Routes (`/about/infrastructure/[slug]`)

All 5 specialized research centers are statically generated using Next.js `generateStaticParams()`:

```typescript
export async function generateStaticParams() {
  return [
    { slug: "fab-lab" },
    { slug: "analytical-lab" },
    { slug: "food-innovation-lab" },
    { slug: "digital-media-lab" },
    { slug: "co-working-space" },
  ];
}
```

### Lab Specifications Summary:
1. **FabLab Makerspace & Hardware Prototyping (`/about/infrastructure/fab-lab`)**:
   - Focus: Mechatronics, rapid CAD fabrication, ag-robotics enclosures, and drone bracketry.
   - Primary Equipment: Industrial FDM/SLA 3D Printers (down to 25 microns), 100W CO2 Laser Cutter, 3-Axis Precision CNC Router, and Double-Sided PCB Milling Machine.
   - Lab Manager: Mr. Avinash Pudale.

2. **NABL Analytical Testing Laboratory (`/about/infrastructure/analytical-lab`)**:
   - Focus: Empirical chemical and biological assays for soil health, water suitability, fertilizer quality, and bio-stimulant formulations.
   - Primary Equipment: Gas Chromatography-Mass Spectrometry (GC-MS), High-Performance Liquid Chromatography (HPLC), Double-Beam UV-Vis Spectrophotometer, and Flame Photometer.
   - Lab Division: AIC-ADT Analytical Division.

3. **Food Innovation Lab & Pilot Processing Plant (`/about/infrastructure/food-innovation-lab`)**:
   - Focus: Post-harvest value-addition, retort meal formulations, vacuum dehydration, and FSSAI shelf-life compliance.
   - Primary Equipment: Industrial Vacuum Dehydration System, Retort Sterilization Autoclave, Millet Dehulling & Pin Mill Line, and Nitrogen-Flushed Form-Fill-Seal Packaging Line.
   - Lab Manager: Mr. Vaibhav Yadav.

4. **Digital Media Studio & Agritech Storytelling (`/about/infrastructure/digital-media-lab`)**:
   - Focus: Vernacular farmer communication, 4K trade demonstration videos, podcast recording, and investor pitch reels.
   - Primary Equipment: Multi-Camera 4K Production Rig with teleprompter, Shure SM7B Broadcast Audio Suite, 360-degree Motorized Product Turntable, and Color-Calibrated Grading Workstation.
   - Lab Manager: Mr. Ravi Londhe.

5. **Incubation Co-Working Hub & Resident Amenities (`/about/infrastructure/co-working-space`)**:
   - Focus: Plug-and-play founder workspace, registered office services, fiber connectivity, and collaborative community.
   - Primary Equipment: Ergonomic Hot Desks, Private 4–6 Person Team Cabins, Smart 4K Conference Video Suites, and Dual-ISP Redundant Gigabit Leased Lines with 100% DG backup.
   - Operations Lead: Ms. Chetana Nimbalkar.

---

## 4. Architectural Patterns & Component Reusability

### 4.1 Layout Primitives
- **`PageHeader` (`apps/web/src/components/layout/PageHeader.tsx`)**: Shared institutional banner enforcing consistent visual rhythm, category badge pill, single accessible `<h1>`, lead copy, WAI-ARIA breadcrumbs, and contextual action CTA buttons.
- **`Container` (`apps/web/src/components/layout/Container.tsx`)**: Consistent max-width wrapper (`max-w-7xl px-4 sm:px-6 lg:px-8`).
- **`Badge` (`apps/web/src/components/ui/Badge.tsx`)**: Standardized semantic tokens (`botanical`, `leaf`, `neutral`) for statutory accreditations, CIN markers, and verification checkmarks.

### 4.2 Content Decoupling Pattern
Presentation is completely decoupled from structured institutional records. All data lives in `apps/web/src/data/institutional.ts`:
- Strongly typed TypeScript interfaces (`AboutOverviewData`, `MissionVisionData`, `LeadershipData`, `InfrastructureMasterData`, `InstitutionalPartnersData`).
- Enables zero-downtime CMS migration or headless API consumption in future phases without altering React component layouts.

### 4.3 Editorial Portrait & Verification Policy
To prevent synthetic profile generation:
- Pure editorial botanical initial badges (e.g., `PP` for Prataprao Pawar, `JT` for Jaya Tiwari) rendered in accessible high-contrast circular containers (`#E8F0D9` background, `#004B2A` text, `#73992A` border).
- Explicit `✓ Verified` badge displayed alongside all personnel, confirming cross-referencing with Ministry of Corporate Affairs and AIC-ADT official records.

---

## 5. Performance, Accessibility & SEO Architecture

- **Semantic Landmarks**: Semantic `<header>`, `<main>`, `<section>`, and `<nav aria-label="Breadcrumb">` tags throughout.
- **Heading Hierarchy**: Strictly one `<h1>` per page (within `PageHeader`), with logical `<h2>` section dividers and `<h3>` component headings.
- **Metadata Configuration**: Each page exports an individualized Next.js `Metadata` object specifying page title, OpenGraph description, and canonical search indices.
- **Static Compilation**: 100% static generation with zero client-side hydration penalty for reading institutional static records.
