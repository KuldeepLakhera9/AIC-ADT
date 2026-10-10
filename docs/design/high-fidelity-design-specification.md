# High-Fidelity Design Specification — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 4 (High-Fidelity Institutional Website Design)  
**Status:** Canonical High-Fidelity Design Specification  
**Design Lead:** Principal Digital Product Designer & Frontend Prototyping Architect  
**Visual Style:** Premium Institutional AgTech & Venture Incubation (Editorial Precision)  

---

## 1. Executive Visual Direction & Creative Synthesis

The high-fidelity design translates the wireframes and design tokens into a **state-of-the-art institutional digital experience**. It deliberately rejects the fleeting aesthetics of consumer SaaS startups (floating neon blobs, indiscriminate purple gradients, and generic hero illustrations) in favor of **authoritative editorial rigor, authentic agricultural science, and grounded rural trust**.

```
========================================================================================
                                  DESIGN SYSTEM ANCHORS
========================================================================================
• PRIMARY PALETTE:       Deep Forest Green (#004B2A) & Dark Institutional Green (#063D27)
• BOTANICAL ACCENTS:     Leaf Green (#73992A) & Pale Botanical (#E8F0D9 / #F3F7EC)
• EDITORIAL CANVASES:    Off-White Canvas (#F8FAF7) & Pure Card Surfaces (#FFFFFF)
• TYPOGRAPHIC CLARITY:   Inter (Latin) + Noto Sans Devanagari & Baloo 2 (Marathi)
• STRUCTURAL PRECISION:  1px Subtle Boundaries (#DDE5DC), 8px Card Radii, Zero Heavy Shadows
• AUTHENTIC IMAGERY:     Real Baramati campus labs, polyhouses, tissue culture & real farmers
========================================================================================
```

---

## 2. High-Fidelity Homepage Specification

The homepage is organized into twelve sequential, purposeful sections adhering strictly to the natural reading hierarchy:

### Section A: Institutional Utility Strip
- **Visual Spec:** Height 36px, Background `--color-brand-institutional` (`#063D27`), 1px bottom border in Leaf Accent (`#73992A`).
- **Typography:** Inter Medium 12px, White text (`#FFFFFF`), uppercase tracking `+0.05em`.
- **Components:**
  - National Acknowledgment: *"Supported by Atal Innovation Mission, NITI Aayog, Government of India"*.
  - Emergency Campus Helpline: `+91 2112 255500`.
  - Language Switcher Pill: Active state filled with `#004B2A` and `#FFFFFF` text; inactive state transparent with hover highlight.

### Section B: Main Header Navbar
- **Visual Spec:** Height 76px desktop, 64px mobile. Background `#FFFFFF`, 1px bottom border `#DDE5DC`, sticky elevation on scroll (`--shadow-1`).
- **Components:**
  - Official Dual-Logo lockup: AIC-ADT Baramati Foundation paired with Atal Innovation Mission emblem.
  - 7 Primary Nav Links: *About, Programs, Startups, Innovation, Impact, Events, Resources* with subtle chevron indicators.
  - Interactive Mega-Menu: 3-column white card (`#FFFFFF`, `--shadow-3`, 1px border `#DDE5DC`) with featured cohort alert callouts.
  - Primary Action Button: `"Apply for Incubation"` (`#004B2A` surface, `#FFFFFF` text, 44px height, 6px radius).

### Section C: Institutional Hero Section
- **Visual Spec:** Two-column fluid grid on Canvas `#F8FAF7` with a light botanical wash (`#F3F7EC`).
- **Typography:**
  - Overline Badge: Inter SemiBold 12px (`#004B2A`), uppercase with leaf-green dot indicator.
  - Display Title (H1): Inter Bold 48px/56px desktop (32px/40px mobile), color `#17231D`.
  - Body Text: Inter Regular 18px/28px, color `#647067`.
- **Action Group:**
  - Primary Button: `[Explore Incubation Programs]` (Forest green, 52px height).
  - Secondary Outline: `[Book Analytical Lab Testing]` (1.5px border `#004B2A`, 52px height).
- **Credential Strip:** 3 verified badges: *✓ DPIIT Recognized Incubator • ✓ NABL Analytical Lab • ✓ 110-Acre Demonstration Farm*.
- **Media Frame:** 5:4 aspect ratio photo frame with a 1px border (`#DDE5DC`) and 12px border radius, showcasing real Baramati campus facilities.

### Section D: Institutional Introduction & Heritage
- **Visual Spec:** Pure white background (`#FFFFFF`), 64px vertical padding.
- **Components:** Section header + 3-card grid highlighting *Lab-to-Land Science*, *Seed Funding Facilitation (SISFS/MeitY)*, and *Specialized Facilities (FabLab, NABL Lab, Pilot Plant)*.

### Section E: Incubation Pathways & Program Comparison
- **Visual Spec:** Background `#F8FAF7`, 80px vertical padding.
- **Components:**
  - 3 Stage Cards: *Pre-Incubation (Ideation)*, *Incubation (Seed Stage - SISFS Cohort 4 Open)*, and *Acceleration (Growth)*.
  - Active Intake Badge: Card 2 features a leaf-green accent badge (`#73992A`) and a prominent `"Cohort 4 Applications Open"` pill.
  - Grant Tranche Callouts: Bold Indian rupee typography (e.g., `Up to ₹20,00,000 Grant`).

### Section F: Agricultural Innovation Focus Domains
- **Visual Spec:** Background `#FFFFFF`, split layout.
- **Components:**
  - Horizontal segmented filter pills for 6 domains (*Agri-Tech, Smart Farming, Biotechnology, Food Processing, Climate Tech, Digital Agri & AI*).
  - Featured Project Card: Real-world pilot case study (Automated Soil Moisture & Salinity Telemetry Network tested across 2,400 hectares in Baramati).

### Section G: Startup Stories & Portfolio Showcase
- **Visual Spec:** Background `#F8FAF7`, 80px vertical padding.
- **Components:** 3 featured venture cards showcasing real incubated startups: *GramHeet* (post-harvest marketplace, 35,000+ farmers reached), *Innosapien Agro Technologies* (phenomics sensors), and *Baramati Agribiotics* (saline bio-stimulants).

### Section H: Verified Impact Metrics (Institutional Dark Anchor)
- **Visual Spec:** Deep Institutional Green canvas (`#063D27`), 80px padding.
- **Components:**
  - Audit Badge: `[Audited as of FY 2024-25 • Formally Filed Under AIM Filings]`.
  - 4 Stat Blocks: `50+ Startups Incubated`, `42+ Patents / IP Filed`, `₹5.2 Cr+ Capital Raised`, `35,000+ Farmers Reached`.
  - Typography: Pure white Display 2 numerals (44px) paired with leaf-green labels (`#73992A`).

### Section I: Upcoming Events & Application Deadlines
- **Visual Spec:** Background `#FFFFFF`, 80px vertical padding.
- **Components:** 3 structured event rows with calendar date box left, title/venue center, and one-click RSVP button right (e.g., *SISFS Cohort 4 Deadline: Nov 30, 2026*, *Millet Processing Workshop: Dec 08, 2026*).

### Section J: Reports & Publications Highlight
- **Visual Spec:** Background `#F8FAF7`, 64px padding.
- **Components:** 2 downloadable document cards featuring the signed *Annual Progress Report FY 2024-25* (PDF • 4.2 MB) and the *Agri-Tech Incubation Policy Whitepaper*.

### Section K: Collaboration Call-to-Action Banner
- **Visual Spec:** Forest Green banner (`#004B2A`), 64px padding, high-contrast white typography.
- **Components:** Dual action buttons: Primary white button `[Apply for Incubation]` + Secondary outline button `[Contact Partnerships Desk]`.

### Section L: Master Institutional Footer
- **Visual Spec:** Deep Institutional Green (`#063D27`), 4-column structured link grid, campus address at Sharadanagar Baramati, emergency contact lines, RTI disclosures, and AIM NITI Aayog acknowledgment.

---

## 3. High-Fidelity Inner Page Design Specifications

### 3.1 About AIC-ADT (`/about`)
- **Hero:** Institutional genesis summary detailing the 50-year legacy of the Agricultural Development Trust.
- **Campus Aerial Map:** Visual layout of the 110-acre campus showing the incubation building, FabLab, Analytical Lab, and demonstration polyhouses.
- **Governance:** Section detailing Governing Board and Advisory Council oversight.

### 3.2 Programs Listing & Program Detail (`/programs` & `/programs/incubation`)
- **Comparison Table:** Full desktop comparison matrix contrasting Pre-Incubation, Incubation, and Acceleration across duration, grant limits, equity terms, and residency rules.
- **Scheme Details:** Comprehensive breakdown of Startup India Seed Fund Scheme (SISFS) guidelines, tranche milestones, and downloadable pitch deck templates.

### 3.3 Startup Directory & Startup Profile (`/startups` & `/startups/:slug`)
- **Directory:** Search input with debounced filtering, sector pills, stage filters, and responsive 3-column card grid.
- **Profile:** Deep-dive venture page displaying problem statement, proprietary innovation, founder headshots, traction metrics, and verified seed funding badges.

### 3.4 Innovation Showcase & Project Detail (`/innovation` & `/innovation/agri-tech`)
- **Thematic Showcase:** Cards for each of the 6 technological domains with active pilot counters and researcher lead bios.
- **Project Detail:** Detailed engineering breakdown of sensor telemetry, testing methodologies, and direct links to book testing instrumentation.

### 3.5 Certified Impact Dashboard (`/impact`)
- **Aggregate KPI Grid:** 4 prominent stat cards anchored by audit badges.
- **Cohort Historical Table:** Multi-year breakdown (FY22 through FY25) comparing startups graduated, capital mobilized, and patents filed. Converts to responsive card stack on mobile viewports.

### 3.6 Events Listing & Registration (`/events` & `/events/:slug`)
- **Calendar Directory:** Upcoming bootcamps, workshops, and cohort admission deadlines with seat counters.
- **RSVP Form:** Touch-optimized form with full name, email, mobile (+91), occupation select, and instant confirmation modal.

### 3.7 Reports & Publications Repository (`/resources`)
- **Document Table:** Searchable table of public filings, annual reports, and scheme guidelines with signed PDF badges and file size indicators.

### 3.8 Contact & Campus Directions (`/contact`)
- **Directory:** Verified departmental email and telephone numbers (Incubation, Lab Testing, CSR Partnerships, RTI Officer).
- **Travel Guide:** Travel instructions from Pune International Airport, Daund Railway Junction, and Baramati Bus Stand with interactive map container.

---

## 4. Responsive Viewport Testing & Visual Polish

| Viewport Range | Tested Width | Header State | Card Grid Layout | Form & Table State |
| :--- | :---: | :--- | :--- | :--- |
| **Mobile Small** | `375px` | 64px compact bar, hamburger drawer trigger | Strict 1-column stack | 1-column inputs; tables transform to key-value card stacks |
| **Tablet Portrait** | `768px` | 64px compact bar, drawer navigation | 2-column card grid | 2-column input rows; horizontal scroll enabled on tables |
| **Desktop Standard**| `1024px` | 76px sticky navbar, full mega-menus | 3-column card grid | Multi-column layouts; full tabular displays active |
| **Widescreen Desktop**| `1440px` | 76px sticky navbar with utility bar | 3-column card grid | Content clamped to 1240px container with centered margins |

---

## 5. Prototype Implementation Architecture

The high-fidelity visual prototype is implemented in `prototype/`:
- **HTML:** [prototype/index.html](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/prototype/index.html) (Master High-Fidelity Multi-View Showcase).
- **CSS:** [prototype/styles.css](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/prototype/styles.css) (Complete Design Token System & Component Styles).
- **JavaScript:** [prototype/script.js](file:///Users/kuldeeplakhera/ADT/Projects/AIC-ADT/prototype/script.js) (Interactive view switching, language toggle, search filtering, and mobile drawer mechanics).
