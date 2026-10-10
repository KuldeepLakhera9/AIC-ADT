# Homepage Wireframe Specification — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 3 (Information Architecture & Responsive Wireframes)  
**Route:** Canonical `/` (English) & `/mr` (Marathi)  
**Status:** Canonical Structural Wireframe  
**Design Lead:** Principal UX Designer & Information Architect  

---

## 1. Master Page Schematic & Natural Reading Sequence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [A] INSTITUTIONAL UTILITY STRIP (#063D27 | 36px)                            │
│  Govt Recognition | Helpline: +91 2112 255500 | Lang: [ EN | मराठी ]         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [B] MAIN HEADER NAVBAR (#FFFFFF | 76px)                                     │
│  [LOGO: AIC-ADT + AIM NITI Aayog]   About  Programs  Startups  Innovation...│
│                                            [Search Icon] [APPLY CTA (Green)]│
├─────────────────────────────────────────────────────────────────────────────┤
│ [C] INSTITUTIONAL HERO (#F8FAF7 / #F3F7EC | Fluid Split)                    │
│  Overline: SUPPORTED BY ATAL INNOVATION MISSION, NITI AAYOG                 │
│  Heading:  Catalyzing the Next Agricultural Revolution                      │
│  Body:     Bridging deep science, venture incubation, and rural farming.    │
│  Actions:  [Explore Incubation Programs (Primary)] [Analytical Lab (Outl)]  │
│  Media:    [Real Polyhouse / Biotech Lab Campus Photo Frame - 16:9 / 5:4]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [D] INSTITUTIONAL INTRODUCTION & MISSION (#FFFFFF | 64px Padding)           │
│  Title: Grounded in Baramati, Scaling Globally                              │
│  Grid:  3 Pillars: 1. Lab-to-Land Science | 2. Seed Grants | 3. Mentorship  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [E] PROGRAMS & INCUBATION OPPORTUNITIES (#F8FAF7 | 80px Padding)            │
│  Header: Incubation Pathways for Every Venture Stage                        │
│  Grid:   [Pre-Incubation Card] [Incubation Card (SISFS)] [Acceleration Card]│
│  Badge:  Cohort 4 Intake Active | Grant Tranches up to ₹20-50 Lakhs         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [F] AGRICULTURAL INNOVATION & TECHNOLOGY SHOWCASE (#FFFFFF | 80px Padding)  │
│  Header: 6 Focus Domains Transforming Agri-Food Systems                     │
│  Pills:  [Agri-Tech] [Smart Farming] [Biotech] [Food Proc] [Climate] [AI]   │
│  Card:   Featured Tech Pilot (Phenomics Sensors / Automated Fertigation)    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [G] FEATURED STARTUP STORIES (#F8FAF7 | 80px Padding)                       │
│  Header: Venture Building in Action                                         │
│  Grid:   3 Startup Cards: [GramHeet] [Innosapien] [Baramati Agribiotics]    │
│  Meta:   Sector, Farmers Impacted, Capital Raised, Link to Profile          │
├─────────────────────────────────────────────────────────────────────────────┤
│ [H] VERIFIED IMPACT METRICS (#063D27 | Deep Institutional Dark Canvas)      │
│  Header: Audited Ecosystem Achievements (Audited as of FY 2024-25)          │
│  Row:    [ 50+ Startups ] [ 42+ Patents ] [ ₹5Cr+ Funds ] [ 35k+ Farmers ]  │
│  Badge:  Audit Proof Certified by NITI Aayog Filing                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [I] UPCOMING EVENTS & APPLICATION DEADLINES (#FFFFFF | 80px Padding)        │
│  Header: Cohort Deadlines, Bootcamps & Technical Workshops                  │
│  Row:    [Date Box] Workshop Title | Venue: Lab 3 | [Register Button]       │
│  Alert:  SISFS Cohort 4 Deadline: November 30, 2026                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [J] REPORTS & PUBLICATIONS HIGHLIGHT (#F8FAF7 | 64px Padding)               │
│  Header: Institutional Knowledge, Annual Disclosures & Whitepapers          │
│  Cards:  [Annual Report FY 2024-25 (PDF)] [Millet Value-Chain Monograph]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [K] COLLABORATION CALL TO ACTION (#004B2A | Forest Green Banner)            │
│  Header: Are You an Agri-Tech Founder, Researcher, or Corporate Partner?    │
│  Buttons:[Apply for Incubation (White)] [Partner With Us Desk (Outline)]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [L] MASTER INSTITUTIONAL FOOTER (#063D27 | 96px Padding)                    │
│  4 Columns: About & Campus | Programs & Labs | Policies & RTI | Contact Map │
│  Legal:  AIM NITI Aayog Acknowledgment | Grievance Redressal | © 2026 AIC-ADT│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Section-by-Section Wireframe Breakdown

### Section A: Institutional Utility Strip
- **Purpose:** Reinforces national government credibility (AIM, NITI Aayog) and provides immediate access to emergency campus contact lines and language switching.
- **Content Hierarchy:**
  1. Left: AIM & NITI Aayog Recognition text with national emblem reference.
  2. Center: Direct campus emergency line: `+91 2112 255500`.
  3. Right: Context-preserving language toggle pill: `[ EN | मराठी ]`.
- **Visual Composition:** Single row flexbox, height 36px, background `#063D27`, text 12px white (`#FFFFFF`), border-bottom 1px `#73992A`.
- **Expected Visitor Action:** Verify institutional credibility; switch to Marathi if preferred.
- **Mobile Behavior:** Hidden on screens $< 640\text{px}$; recognition badge and language toggle relocate to the top of the mobile drawer.
- **Marathi Considerations:** String translated as: *"अटल इनोव्हेशन मिशन, नीती आयोग, भारत सरकार द्वारे समर्थित"*.

---

### Section B: Main Header Navbar
- **Purpose:** Primary wayfinding system providing access to the 7 core pillars and driving the primary application conversion funnel.
- **Content Hierarchy:**
  1. Left: Official dual-logo lockup (AIC-ADT Baramati Foundation + AIM Logo).
  2. Center: 7 Pillar links: *About, Programs, Startups, Innovation, Impact, Events, Resources*.
  3. Right: Global Search icon button + Primary CTA Button: `"Apply for Incubation"` (`#004B2A`).
- **Visual Composition:** White surface (`#FFFFFF`), height 76px, 1px bottom border (`#DDE5DC`), sticky on scroll.
- **Expected Visitor Action:** Click a mega-menu item to explore deeper pages or immediately enter the incubation application funnel.
- **Mobile Behavior:** Collapses to 64px header: Logo left, Language Toggle center, Hamburger menu button right.
- **Marathi Considerations:** Primary button text: *"इनक्युबेशनसाठी अर्ज करा"* (requires 22px auto-layout padding to prevent line break).

---

### Section C: Institutional Hero Section
- **Purpose:** Establishes the core institutional thesis: combining advanced laboratory science and venture incubation with real rural farming.
- **Content Hierarchy:**
  1. Overline Badge: `SUPPORTED BY ATAL INNOVATION MISSION • NITI AAYOG`.
  2. Display Heading (H1): *"Catalyzing the Next Agricultural Revolution Through Deep-Tech Innovation."*
  3. Sub-Heading (Body Large): *"AIC-ADT empowers agri-tech startups, progressive farmers, and scientists with seed capital, NABL-accredited analytical laboratories, and field testing grounds in Baramati."*
  4. Dual CTAs: Primary button `[Explore Incubation Programs]` + Secondary outline button `[Book Analytical Lab Testing]`.
  5. Trust Row: 3 verified credential pills (*DPIIT Recognized Incubator • NABL Accredited Lab • 110-Acre Demonstration Farm*).
  6. Hero Media: High-definition 5:4 aspect ratio frame featuring real Baramati campus tissue-culture lab or IoT polyhouse.
- **Visual Composition:** 12-column responsive grid (7 columns copy left, 5 columns photo frame right), canvas `#F8FAF7`.
- **Expected Visitor Action:** Click "Explore Programs" to check eligibility or "Book Lab Testing".
- **Mobile Behavior:** Stacks vertically (copy first, photo second); buttons become full-width vertical stack ($44\text{px}$ touch targets).
- **Marathi Considerations:** H1 uses Noto Sans Devanagari with `line-height: 1.40`: *"कृषी-जैवतंत्रज्ञान आणि नवउद्योगांच्या माध्यमातून आधुनिक कृषी क्रांतीची निर्मिती."*

---

### Section D: Institutional Introduction & Mission
- **Purpose:** Explains AIC-ADT's unique origin as an Atal Incubation Centre hosted by the 50-year-old Agricultural Development Trust (ADT).
- **Content Hierarchy:**
  1. Overline: `INSTITUTIONAL GENESIS`.
  2. Section Heading (H2): *"Where Scientific Rigor Meets Farm-Level Reality."*
  3. Narrative paragraph detailing the 110-acre campus, Centre of Excellence in Protected Cultivation, and collaboration with KVK Baramati.
  4. 3 Feature Highlights:
     - *Lab-to-Land Deployment:* Immediate access to real farmer testbeds.
     - *Government Grant Linkages:* Direct facilitation for SISFS, MeitY GENESIS, and NIDHI schemes.
     - *Advanced Prototyping:* In-house FabLab (3D printing, CNC, PCB milling) and Food Processing pilot plant.
- **Visual Composition:** 3-column card row on desktop (`#FFFFFF` surfaces with 1px border `#DDE5DC`), `#FFFFFF` section canvas.
- **Expected Visitor Action:** Understand institutional stature and campus capabilities.
- **Mobile Behavior:** Collapses from 3 columns to single-column vertical card stack with 16px gap.

---

### Section E: Programs & Incubation Opportunities
- **Purpose:** Guides early-stage founders to the correct incubation pathway without organizational friction.
- **Content Hierarchy:**
  1. Section Heading (H2): *"Structured Incubation Programs for Every Growth Stage."*
  2. Subtitle: *"From lab proof-of-concept to venture commercialization."*
  3. 3 Core Comparison Cards:
     - **Card 1: Pre-Incubation (Ideation & Prototype):** 6-Month batch, FabLab access, ₹10L prototype grant eligibility.
     - **Card 2: Incubation (Seed Stage - SISFS):** 12-Month residency, up to ₹20L grant / ₹50L debt, legal & IP support. *(Flagged as "Cohort 4 Active")*.
     - **Card 3: Acceleration (Scale & Series A):** Market access, institutional VC demo days, global export linkages.
  4. Section Footer: Link to `"View Comprehensive Program Comparison Matrix →"`.
- **Visual Composition:** 3-column card grid on canvas `#F8FAF7`. Card 2 features a subtle green highlight border (`#73992A`) to signal active intake.
- **Expected Visitor Action:** Click "Apply Now" on the appropriate stage card to view instructions.
- **Mobile Behavior:** 1-column stack; cards retain complete financial tranche badges.

---

### Section F: Agricultural Innovation & Technology Showcase
- **Purpose:** Positions AIC-ADT as a futuristic deep-tech hub across 6 domain areas.
- **Content Hierarchy:**
  1. Section Heading (H2): *"Pillars of Agricultural Innovation."*
  2. Domain Filter Chips: `[Agri-Tech]` `[Smart Farming]` `[Biotechnology]` `[Food Processing]` `[Climate Tech]` `[Digital Agri & AI]`.
  3. Featured Technical Showcase Card:
     - *Project Spotlight:* Automated Soil Nutrient & Salinity Sensor Network.
     - *Deployment:* Tested across 2,400 hectares in Baramati sugar belt.
     - *Outcome:* 28% reduction in chemical fertilizer application.
  4. CTA: `"Explore All 6 Technology Domains →"`.
- **Visual Composition:** Split layout on `#FFFFFF` canvas: horizontal filter chips top, split feature card (tech specs left, field photo right).
- **Expected Visitor Action:** Filter domains and explore technical case studies.
- **Mobile Behavior:** Filter chips become a horizontally scrollable strip with touch snapping.

---

### Section G: Startup Stories & Portfolio Showcase
- **Purpose:** Proves incubation track record through tangible founder success stories.
- **Content Hierarchy:**
  1. Section Heading (H2): *"Innovations Born in Baramati."*
  2. Subtitle: *"Discover startups creating systemic impact across agriculture and food value chains."*
  3. 3 Featured Startup Cards:
     - **GramHeet:** Post-harvest marketplace & decentralized storage reaching 35,000+ farmers.
     - **Innosapien Agro Technologies:** Phenomics sensors and AI pest forecasting.
     - **Baramati Agribiotics:** Bio-stimulants for saline soil reclamation.
  4. Card Metadata: Founder Names, Seed Scheme (SISFS), Sector Tag, Link to Public Profile.
  5. CTA: `"Browse Full Directory of 70+ Incubated Startups →"`.
- **Visual Composition:** 3-column card grid on canvas `#F8FAF7`.
- **Expected Visitor Action:** Click into a startup profile or browse the complete directory.
- **Mobile Behavior:** 1-column card stack.

---

### Section H: Verified Impact Metrics (Institutional Dark Anchor)
- **Purpose:** Communicates authoritative ecosystem impact backed by central government audit periods.
- **Content Hierarchy:**
  1. Section Header: *"Certified Institutional Impact"* with audit pill `[Audited as of FY 2024-25]`.
  2. 4 Stat Blocks (Horizontal Row):
     - **50+** *Startups Incubated & Mentored*
     - **42+** *Patents & Intellectual Property Filed*
     - **₹5.2 Cr+** *Seed Capital & External Funds Mobilized*
     - **35,000+** *Farmers Reached via Field Demonstrations*
  3. Verification Note: *"All impact metrics are formally audited and reported under annual NITI Aayog / AIM filings."*
- **Visual Composition:** Dark Institutional Green canvas (`#063D27`), white numbers in Display 2 (44px), leaf-green subtitle accents (`#73992A`).
- **Expected Visitor Action:** Trust institutional claims; download the annual report.
- **Mobile Behavior:** 2-column grid (2 rows of 2 stats) with 24px vertical separation.

---

### Section I: Upcoming Events & Application Deadlines
- **Purpose:** Drives active participation in campus workshops, seminars, and cohort deadlines.
- **Content Hierarchy:**
  1. Section Heading (H2): *"Upcoming Cohorts & Technical Events."*
  2. 3 Event Rows:
     - **Event 1:** *SISFS Cohort 4 Application Deadline* | Closes: Nov 30, 2026 | `[Apply Now]`
     - **Event 2:** *Millet Value-Added Processing Workshop* | Dec 08, 2026 | Venue: Food Lab | `[Register]`
     - **Event 3:** *Agri-Robotics Field Demonstration Day* | Dec 15, 2026 | Venue: Center of Excellence | `[View Details]`
- **Visual Composition:** White surface (`#FFFFFF`), horizontal split rows with calendar date box left, title/venue center, action button right.
- **Expected Visitor Action:** Register for workshop or submit cohort application.
- **Mobile Behavior:** Rows stack vertically: date box top, details middle, button full-width bottom.

---

### Section J: Reports & Publications Highlight
- **Purpose:** Satisfies statutory transparency standards for government auditors, researchers, and media.
- **Content Hierarchy:**
  1. Section Heading (H2): *"Institutional Knowledge & Annual Reports."*
  2. 2 Document Cards:
     - *AIC-ADT Annual Progress Report FY 2024-25* (PDF • 4.2 MB • NITI Aayog Certified).
     - *Agri-Tech Incubation in Maharashtra: A Policy Whitepaper* (PDF • 2.8 MB).
  3. Download Trigger: Direct download button with signed PDF badge.
- **Visual Composition:** 2-column card layout on canvas `#F8FAF7`.
- **Expected Visitor Action:** Download public disclosures.
- **Mobile Behavior:** 1-column stack.

---

### Section K: Collaboration Call-to-Action Panel
- **Purpose:** Primary bottom conversion funnel capturing entrepreneurs, researchers, and CSR sponsors.
- **Content Hierarchy:**
  1. Heading: *"Ready to Build the Future of Agriculture?"*
  2. Description: *"Whether you are a deep-tech founder with a working prototype or a corporate seeking high-impact CSR agriculture partnerships, AIC-ADT provides the infrastructure to scale."*
  3. Dual Buttons: Primary white button `[Apply for Incubation]` + Outline button `[Contact Partnership Desk]`.
- **Visual Composition:** Full-width Forest Green banner (`#004B2A`), high-contrast white typography, 64px padding.
- **Expected Visitor Action:** Initiate application or partner inquiry.
- **Mobile Behavior:** Stacked buttons (full width, 44px min height).

---

### Section L: Master Institutional Footer
- **Purpose:** Universal legal and navigation closing landmark.
- **Content Hierarchy:**
  - Column 1: Institutional Genesis, ADT Sharadanagar campus address, AIM recognition badge.
  - Column 2: Programs (Pre-Incubation, Incubation, SISFS, MeitY GENESIS, Acceleration).
  - Column 3: Infrastructure (FabLab, Analytical Lab, Food Processing, Co-Working).
  - Column 4: Governance & Transparency (Annual Reports, RTI, Whistle-Blower, POSH, Privacy Policy).
  - Bottom Bar: Copyright notice, Developer credit, verified emergency helpline.
- **Visual Composition:** Deep institutional green (`#063D27`), height ~400px desktop, white/leaf-green text.
- **Expected Visitor Action:** Access deep policy links, campus map, or institutional contact.
- **Mobile Behavior:** 4 columns collapse into vertical accordion lists.
