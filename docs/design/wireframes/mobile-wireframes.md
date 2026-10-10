# Mobile Responsive Wireframe Specification — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 3 (Information Architecture & Responsive Wireframes)  
**Status:** Canonical Mobile Wireframe Standard  
**Design Lead:** Principal UX Designer & Mobile Architect  

---

## 1. Mobile Experience Thesis & Ergonimic Rules

Over 65% of regional agricultural innovators, students, and smallholder farmers in Maharashtra will access `aicadtbaramatifoundation.org` via mobile devices (primarily Android smartphones on 4G/5G networks).

```
========================================================================================
                               MOBILE ERGONOMIC PRINCIPLES
========================================================================================
1. ONE-THUMB OPERABILITY: Critical conversion actions (Apply, Register, Call Helpline) 
   remain within the natural thumb reach zone at the bottom of the viewport.
2. ZERO ACCIDENTAL TAPS: Touch targets strictly $\ge 44 \times 44\text{px}$ with $\ge 8\text{px}$ 
   clearance between adjacent interactive controls.
3. ADAPTIVE TABLE CARDS: Multi-column tables automatically transform into vertical key-value 
   cards on screens $< 768\text{px}$—no awkward horizontal page pinching.
4. MARATHI TEXT DEFENSE: Flexible auto-layout containers prevent clipped diacritics or ugly 
   single-word line wraps on 360px viewports.
========================================================================================
```

---

## 2. Key Mobile Page Wireframes (ASCII Schematics)

### 2.1 Mobile Homepage (`/` | `/mr`)
```
┌──────────────────────────────────────────────┐
│ [MOBILE HEADER: 64px]                        │
│  [Logo Lockup]            [EN | मराठी]  [☰]  │
├──────────────────────────────────────────────┤
│ [HERO BANNER: #F8FAF7]                       │
│  SUPPORTED BY ATAL INNOVATION MISSION        │
│                                              │
│  Catalyzing the Next                         │
│  Agricultural Revolution                     │
│                                              │
│  Bridging laboratory science, venture        │
│  incubation, and farm-level reality.         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [APPLY FOR INCUBATION (48px Primary)]  │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ [Book Analytical Lab Testing (Outline)]│  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [CAMPUS PHOTO FRAME: 16:9 Aspect Ratio]     │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │   Baramati Polyhouse / Lab Facility    │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ [PROGRAMS STACK: #FFFFFF]                    │
│  Incubation Pathways                         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Pre-Incubation (Ideation Stage)        │  │
│  │ Duration: 6 Months • ₹10L Grant        │  │
│  │ [View Program Details →]               │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ Flagship Incubation (SISFS Active)     │  │
│  │ Grant up to ₹20L • Debt up to ₹50L     │  │
│  │ [Apply for Cohort 4 →]                 │  │
│  └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ [AUDITED IMPACT GRID: #063D27]               │
│  Audited as of FY 2024-25                    │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │ 50+              │  │ 42+              │  │
│  │ Startups         │  │ Patents Filed    │  │
│  └──────────────────┘  └──────────────────┘  │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │ ₹5.2 Cr+         │  │ 35,000+          │  │
│  │ Capital Raised   │  │ Farmers Reached  │  │
│  └──────────────────┘  └──────────────────┘  │
├──────────────────────────────────────────────┤
│ [UPCOMING DEADLINE CARD: #FFFFFF]            │
│  ┌────────────────────────────────────────┐  │
│  │ [30 NOV] SISFS Cohort 4 Deadline       │  │
│  │ [Submit Application (Full Width)]      │  │
│  └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ [MOBILE FOOTER: #063D27]                     │
│  ▸ About AIC-ADT & Campus                    │
│  ▸ Incubation Programs & Grants              │
│  ▸ Policies, RTI & Disclosures               │
│  Helpline: +91 2112 255500                   │
│  © 2026 AIC-ADT Baramati Foundation          │
└──────────────────────────────────────────────┘
```

---

### 2.2 Mobile Startup Directory (`/startups` | `/mr/startups`)
```
┌──────────────────────────────────────────────┐
│ [BREADCRUMB] Home / Startups                 │
├──────────────────────────────────────────────┤
│ [SEARCH INPUT: 44px]                         │
│  [🔍 Search 70+ incubated ventures...]       │
├──────────────────────────────────────────────┤
│ [TOUCH-SCROLL FILTER CHIPS (Horizontal)]     │
│  [All (71)]  [Smart Agri]  [Biotech]  [Food] │
├──────────────────────────────────────────────┤
│ [STARTUP CARD STACK (1-Column)]              │
│  ┌────────────────────────────────────────┐  │
│  │ [LOGO] GramHeet                        │  │
│  │ Post-harvest decentralized marketplace │  │
│  │ Tag: Agribusiness • Reached 35k Farmers│  │
│  │ [View Venture Profile → (44px)]        │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │ [LOGO] Innosapien Agro Technologies    │  │
│  │ Sensor-based automated phenomics       │  │
│  │ Tag: Precision Farming • SISFS Cohort 2│  │
│  │ [View Venture Profile → (44px)]        │  │
│  └────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ [PAGINATION CONTROLS]                        │
│  [← Previous]       Page 1 of 8      [Next →]│
└──────────────────────────────────────────────┘
```

---

### 2.3 Mobile Application Instructions (`/programs/apply-instructions`)
```
┌──────────────────────────────────────────────┐
│ [BREADCRUMB] Home / Programs / How to Apply  │
├──────────────────────────────────────────────┤
│ Application Process & Checklist              │
│                                              │
│ [PROGRESS STEPPER (Vertical Stack)]          │
│  (1) Register Founder Account                │
│  (2) Complete 4-Step Intake Dossier          │
│  (3) Pitch Presentation to Screening Panel   │
│  (4) Due Diligence & Seed Grant Sanction     │
├──────────────────────────────────────────────┤
│ [MANDATORY DOCUMENT CHECKLIST]               │
│  ☑ Executive Pitch Deck (PPT/PDF < 15MB)     │
│  ☑ Company Certificate of Incorporation      │
│  ☑ DPIIT Startup Recognition Certificate     │
│  ☑ Founder Identity Proof (Aadhaar / PAN)    │
│  [Download Pitch Deck Template (44px)]       │
├──────────────────────────────────────────────┤
│ [STICKY MOBILE BOTTOM BAR: 60px]             │
│  ┌────────────────────────────────────────┐  │
│  │ [PROCEED TO APPLICATION PORTAL (48px)] │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

---

## 3. Responsive Table-to-Card Transformations

Dense tabular data (e.g., Fiscal Year Impact Tables or NABL Lab Fee Schedules) automatically transforms into stacked mobile cards on screens $< 768\text{px}$:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ DESKTOP TABLE VIEW (>= 768px):                                              │
│  Fiscal Year  | Startups | Seed Grants (₹) | Patents | Farmers Reached      │
│  FY 2024-25   | 18       | ₹1.85 Cr        | 14      | 14,200               │
├─────────────────────────────────────────────────────────────────────────────┤
│ MOBILE CARD VIEW (< 768px):                                                 │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ FISCAL YEAR: FY 2024-25                                               │  │
│  │ ───────────────────────────────────────────────────────────────────── │  │
│  │ Startups Incubated:   18 Ventures                                     │  │
│  │ Seed Capital Granted: ₹1.85 Crores                                    │  │
│  │ Patents / IP Filed:   14 Registrations                                │  │
│  │ Farmers Reached:      14,200 Farmers                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Marathi Typography Wrapping & Narrow Viewport Defenses

On compact mobile screens (320px–375px), Marathi words with multiple ligatures must wrap predictably without breaking character integrity:

1. **Font Size Adjustment:** Display headings scale down to 28px/32px via fluid `clamp()` formulas, preventing headers from overflowing container bounds.
2. **Line-Height Enforcement:** Line height remains locked at `1.65` to avoid clipping top and bottom matras.
3. **Compound Word Handling:** Soft hyphens (`&shy;`) are embedded in long multi-syllable terms (उदा. 'जैव&shy;तंत्र&shy;ज्ञान' किंवा 'इनक्यु&shy;बेशन') allowing graceful line breaks when viewport bounds are reached.
4. **Button Width Flexibility:** All mobile buttons expand to `width: 100%` within card footers, ensuring Marathi action labels ("इनक्युबेशनसाठी अर्ज करा") fit comfortably on a single line.
