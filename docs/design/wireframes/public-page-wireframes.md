# Public Page Wireframe Specifications — AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Phase:** Phase 2, Task 3 (Information Architecture & Responsive Wireframes)  
**Status:** Canonical Public Page Wireframes (Pages 02 through 18)  
**Design Lead:** Principal UX Designer & Information Architect  

---

## Page 02: About AIC-ADT Overview (`/about` | `/mr/about`)

### 1. Specifications
- **Page Objective:** Establish the institutional genesis, heritage of the Agricultural Development Trust (ADT), and statutory alignment with Atal Innovation Mission (AIM), NITI Aayog.
- **Primary Audience:** Government auditors, prospective partners, institutional investors, media, and academic researchers.
- **Main User Task:** Understand the scale, history, and statutory credibility of the incubator.
- **Header & Breadcrumbs:** Sticky Header with "About" highlighted. Breadcrumbs: `Home / About Us`.
- **Section Order:**
  1. Hero Header (Institutional Title & Genesis Summary)
  2. ADT Heritage & Baramati Ecosystem (50-year legacy of agricultural transformation)
  3. Strategic Pillars (AIM Mandate, NABL Rigor, Farmer Grounding)
  4. Campus Overview (110-acre site, Center of Excellence, Labs)
  5. Governance & Accreditations (NITI Aayog, DPIIT, NABL)
  6. CTA Panel ("Explore Our Specialized Infrastructure →")
- **Content Hierarchy:** H1 Institutional Genesis $\rightarrow$ H2 Campus Capabilities $\rightarrow$ H3 Statutory Accreditations.
- **Actions:** Primary CTA: `[Explore Labs & Infrastructure]`; Secondary CTA: `[View Governing Leadership]`.
- **Required Data Fields:** Institution name, founding year, parent trust profile, campus acreage, certification logos.
- **Mobile Layout:** 1-column responsive stack; timeline changes from horizontal to vertical card stack.
- **Bilingual Considerations:** Marathi page title: *"आमच्याबद्दल - परिचय आणि वारसा"*. Accommodates 20% wider body copy.
- **Links to Other Pages:** `/about/mission-vision`, `/about/leadership`, `/about/infrastructure`, `/about/partners`.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [BREADCRUMB] Home / About Us                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ [HERO] About AIC-ADT Baramati Foundation                                    │
│  "Bridging Half a Century of Agricultural Trust with 21st Century Science"   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [SPLIT SECTION] The ADT Heritage (Left) | Campus Aerial Map (Right)         │
├─────────────────────────────────────────────────────────────────────────────┤
│ [3-COL CARDS] 1. AIM NITI Aayog Mandate | 2. Lab-to-Land | 3. Seed Grants   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [CTA] Explore Specialized Infrastructure & Labs                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 03: Mission & Vision (`/about/mission-vision` | `/mr/about/mission-vision`)

### 1. Specifications
- **Page Objective:** Articulate the incubator's statutory mission, 2030 strategic vision, and alignment with UN Sustainable Development Goals (SDG 2: Zero Hunger, SDG 8: Decent Work).
- **Primary Audience:** NITI Aayog evaluators, corporate CSR partners, international foundations.
- **Main User Task:** Review official charter, core institutional values, and qualitative milestones.
- **Header & Breadcrumbs:** Sticky Header. Breadcrumbs: `Home / About / Mission & Vision`.
- **Section Order:**
  1. Header with Mission & Vision Statements (High-contrast typography)
  2. 5 Core Institutional Values (Scientific Integrity, Farmer-Centricity, Transparency, Inclusivity, Sustainability)
  3. SDG Alignment Matrix (Icons and metrics mapping to UN goals)
  4. Strategic 2030 Roadmap (Incubate 150+ ventures, deploy ₹25Cr+ seed capital)
- **Actions:** Primary: `[Read Annual Reports]`; Secondary: `[Apply for Incubation]`.
- **Required Data Fields:** Vision statement, mission pillars, core values list, SDG targets.
- **Mobile Layout:** 1-column stack; SDG matrix displays as 2-column card grid.
- **Bilingual Considerations:** Marathi: *"ध्येय आणि उद्दिष्टे"*.

---

## Page 04: Leadership & Team (`/about/leadership` | `/mr/about/leadership`)

### 1. Specifications
- **Page Objective:** Showcase institutional governance, Governing Board of Directors, Advisory Council, and Executive Management team.
- **Primary Audience:** Investors, grant agencies, startup founders seeking mentor credibility.
- **Main User Task:** Review bios, professional qualifications, and corporate/academic affiliations of leadership.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / About / Leadership & Governance`.
- **Section Order:**
  1. Section Intro (Governance transparency commitment)
  2. Segmented Filter: `[All Leadership] [Governing Board] [Advisory Council] [Executive Team]`
  3. Governing Board Grid (High-resolution headshots, board titles, affiliations)
  4. Executive Team Grid (Operational designations, email/LinkedIn links)
  5. Mentorship Network Link Banner
- **Actions:** Click profile to view bio modal; download institutional governance PDF.
- **Required Data Fields:** Full name, designation, committee role, biography, photograph, LinkedIn URL.
- **Placeholders Applied:** Profiles awaiting clearance display `[ROSTER REVIEW PENDING]`.
- **Mobile Layout:** 1-column card stack on mobile, 2-column tablet, 3-column desktop.
- **Bilingual Considerations:** Marathi: *"नेतृत्व आणि व्यवस्थापन समिती"*.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [BREADCRUMB] Home / About / Leadership & Team                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ [SEGMENTED TABS] [ Governing Board ] [ Advisory Council ] [ Executive Staff]│
├─────────────────────────────────────────────────────────────────────────────┤
│ [LEADERSHIP GRID (3-Col)]                                                   │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐  │
│ │ [Headshot Photo 1:1] │ │ [Headshot Photo 1:1] │ │ [Headshot Photo 1:1] │  │
│ │ Name, Title          │ │ Name, Title          │ │ Name, Title          │  │
│ │ Governing Board      │ │ Governing Board      │ │ CEO & Director       │  │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 05: Programs Listing & Comparison (`/programs` | `/mr/programs`)

### 1. Specifications
- **Page Objective:** Central hub comparing all incubation pathways, government grant schemes, and capacity-building programs.
- **Primary Audience:** Startup founders, student entrepreneurs, progressive farmers.
- **Main User Task:** Compare stages, grant tranches, and eligibility to identify the right program.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Programs`.
- **Section Order:**
  1. Header with Stage Guidance ("Which stage is your innovation?")
  2. 3 Core Pathway Cards (Pre-Incubation, Incubation, Acceleration)
  3. Government Grant Schemes Section (SISFS, MeitY GENESIS, NIDHI-PRAYAS)
  4. Corporate CSR Programs (Capgemini, HDFC Bank Parivartan)
  5. Interactive Eligibility Wizard CTA ("Check Eligibility in 60 Seconds")
- **Actions:** Primary: `[Apply for Selected Program]`; Secondary: `[Download Scheme Guidelines]`.
- **Required Data Fields:** Program name, funding ceiling, duration, eligibility criteria, active cohort status.
- **Mobile Layout:** Cards stack vertically with full-width action buttons.
- **Bilingual Considerations:** Marathi: *"इनक्युबेशन आणि अनुदान योजना"*.

---

## Page 06: Program Details (`/programs/incubation` | `/mr/programs/incubation`)

### 1. Specifications
- **Page Objective:** Comprehensive technical overview of a specific incubation offering (e.g., Flagship Incubation under SISFS).
- **Primary Audience:** Founders preparing an application.
- **Main User Task:** Understand exact grant tranches, selection rubric, batch curriculum, and residency terms.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Programs / Incubation (Seed Stage)`.
- **Section Order:**
  1. Program Banner (Name, Funding ceiling: up to ₹20L grant / ₹50L debt, Cohort intake status: `Open`)
  2. Key Benefits (Seed Capital, FabLab access, IP filing, Mentor matching)
  3. Eligibility Criteria Checklist (DPIIT recognized startup, innovative agtech focus, etc.)
  4. Selection Process & Evaluation Rubric (Step 1 Screening $\rightarrow$ Step 2 Pitching $\rightarrow$ Step 3 Due Diligence)
  5. Past Cohort Success Stories (Featured startup cards)
  6. Sticky Sidebar: Batch dates, contact coordinator, `[APPLY NOW]` button.
- **Actions:** Primary: `[Apply for Incubation]` (Redirects to `/portal/register`); Secondary: `[Download FAQ PDF]`.
- **Required Data Fields:** Tranche limits, duration, curriculum modules, eligibility rules, key dates.
- **Mobile Layout:** Sticky sidebar moves to persistent bottom action bar on mobile.
- **Bilingual Considerations:** Marathi: *"इनक्युबेशन कार्यक्रम तपशील"*.

---

## Page 07: Application Instructions & Rubric (`/programs/apply-instructions` | `/mr/programs/apply-instructions`)

### 1. Specifications
- **Page Objective:** Eliminate applicant confusion by providing a step-by-step checklist, document requirements, and scoring criteria before registration.
- **Primary Audience:** First-time applicants, student founders.
- **Main User Task:** Gather required documents (Pitch deck, PAN/Aadhaar, DPIIT certificate) and review rubric.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Programs / How to Apply`.
- **Section Order:**
  1. Header ("Application Guidelines & Checklist")
  2. 4-Step Process Overview (1. Register Account $\rightarrow$ 2. Fill Application $\rightarrow$ 3. Pitch Presentation $\rightarrow$ 4. Due Diligence)
  3. Mandatory Document Checklist (Downloadable pitch deck template in PPT/PDF)
  4. Evaluation Rubric Table (Innovation 30%, Market Potential 25%, Team 25%, Scalability 20%)
  5. Application FAQs Accordion
  6. Launch Portal CTA: `[Proceed to Application Portal →]`
- **Actions:** Primary: `[Create Applicant Account]`; Secondary: `[Download Pitch Deck Template]`.
- **Required Data Fields:** Process steps, document checklist items, scoring weights, FAQs.
- **Mobile Layout:** 1-column stack; accordion FAQs touch-optimized ($48\text{px}$ row height).
- **Bilingual Considerations:** Marathi: *"अर्ज कसा करावा - मार्गदर्शक सूचना"*.

---

## Page 08: Startup Directory (`/startups` | `/mr/startups`)

### 1. Specifications
- **Page Objective:** Searchable and filterable portfolio of all 70+ incubated ventures.
- **Primary Audience:** Venture capitalists, angel investors, corporate procurement teams, media.
- **Main User Task:** Discover startups by sector, funding stage, or cohort year.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Startups Directory`.
- **Section Order:**
  1. Header with Stats Bar (70+ Startups Incubated, ₹5.2Cr+ Capital Raised)
  2. Search & Filter Bar: Text search + Sector Pills (`All`, `Smart Farming`, `Biotech`, `Food Tech`, `Robotics`)
  3. Startup Cards Grid (3-column desktop: Logo, Name, Sector Tag, 1-line Pitch, Cohort Year, Link)
  4. Pagination Controls (`Previous 1 2 3 Next`)
- **Actions:** Search input, filter toggle, click card to view individual profile.
- **Empty State:** Botanical illustration + *"No startups match your search criteria. Try resetting filters."*
- **Mobile Layout:** Filter chips horizontally scroll; cards stack in 1 column.
- **Bilingual Considerations:** Marathi: *"स्टार्टअप निर्देशिका"*.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [BREADCRUMB] Home / Startups Directory                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ [SEARCH BAR] [🔍 Search by startup name, founder, or keyword...]             │
│ [FILTER PILLS] [All (71)] [Smart Agri] [Biotech] [Food Tech] [Climate Tech] │
├─────────────────────────────────────────────────────────────────────────────┤
│ [3-COL STARTUP GRID]                                                        │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐  │
│ │ [Logo] GramHeet      │ │ [Logo] Innosapien    │ │ [Logo] Agribiotics   │  │
│ │ Post-harvest storage │ │ Phenomics sensors    │ │ Saline bio-stimulant │  │
│ │ [View Profile →]     │ │ [View Profile →]     │ │ [View Profile →]     │  │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘  │
│ [PAGINATION] ← Previous  [1]  [2]  [3]  [4]  Next →                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 09: Individual Startup Profile (`/startups/:slug` | `/mr/startups/:slug`)

### 1. Specifications
- **Page Objective:** Dedicated public showcase highlighting an individual startup's innovation, founders, and traction.
- **Primary Audience:** Potential investors, enterprise customers, media reporters.
- **Main User Task:** Review product specs, founder contact, and verified incubation credentials.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Startups / GramHeet`.
- **Section Order:**
  1. Profile Hero: Startup Logo, Name, Tagline, Seed Scheme Badge (`Supported by SISFS`), Website Link
  2. The Problem & Agricultural Impact (Quantified metrics: farmers reached, income enhanced)
  3. The Proprietary Technology / Product (Description + product photos)
  4. Founder Profiles (Names, Bios, LinkedIn links)
  5. Awards, Accreditations & Media Mentions
  6. Back to Directory Link + Related Startups in Same Sector
- **Actions:** Primary: `[Visit Startup Website]`; Secondary: `[Connect via Incubation Desk]`.
- **Required Data Fields:** Company legal name, brand name, logo, sector, funding tranches, founder bios, impact numbers.
- **Mobile Layout:** 1-column stack; founder cards stack vertically.
- **Bilingual Considerations:** Marathi: *"स्टार्टअप तपशील"*.

---

## Page 10: Agricultural Innovation Domains (`/innovation` | `/mr/innovation`)

### 1. Specifications
- **Page Objective:** Thematic exploration of the 6 core agricultural technology focus areas driving AIC-ADT's incubation strategy.
- **Primary Audience:** Scientists, agritech researchers, corporate R&D teams, progressive farmers.
- **Main User Task:** Discover research initiatives and infrastructure in a specific agtech field.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Innovation Focus Areas`.
- **Section Order:**
  1. Header: *"Pioneering Technology for Climate-Resilient Agriculture."*
  2. 6 Domain Cards (2-column desktop grid):
     - *1. Agri-Tech & Farm Mechanization*
     - *2. Smart Farming & Precision Agronomy*
     - *3. Food Processing & Value Addition*
     - *4. Agribusiness & Supply Chain Tech*
     - *5. Climate Tech & Circular Bioeconomy*
     - *6. Digital Agriculture, AI & Robotics*
  3. Campus Testing Demonstration Facility Overview (110-Acre Live Farm)
- **Actions:** Click domain card to view detailed research and pilot projects.
- **Required Data Fields:** Domain title, icon, summary, active pilot count, link.
- **Mobile Layout:** Cards stack in 1 column with clear icon markers.
- **Bilingual Considerations:** Marathi: *"कृषी नवसंशोधन आणि तंत्रज्ञान क्षेत्रे"*.

---

## Page 11: Innovation Project Detail (`/innovation/agri-tech` | `/mr/innovation/agri-tech`)

### 1. Specifications
- **Page Objective:** Technical deep dive into pilot implementations, laboratory instruments, and field trial data in a domain.
- **Primary Audience:** Technical researchers, corporate R&D heads, agritech innovators.
- **Main User Task:** Evaluate testing facilities and review pilot trial outcomes.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Innovation / Agri-Tech & Mechanization`.
- **Section Order:**
  1. Domain Title & Engineering Scope
  2. Active Field Demonstrations (e.g., Automated Precision Drip System)
  3. Available Laboratory & Prototyping Infrastructure (FabLab CNC, 3D printers, PCB milling)
  4. Incubated Startups Working in This Domain
  5. Technical Inquiry Form CTA
- **Actions:** Primary: `[Inquire About Prototyping Facilities]`; Secondary: `[Explore Startups]`.
- **Required Data Fields:** Domain description, equipment list, trial case studies, coordinator contact.
- **Mobile Layout:** 1-column stack.
- **Bilingual Considerations:** Marathi: *"कृषी तंत्रज्ञान आणि यांत्रिकीकरण"*.

---

## Page 12: Impact Dashboard (`/impact` | `/mr/impact`)

### 1. Specifications
- **Page Objective:** Comprehensive statutory disclosure of audited ecosystem outcomes.
- **Primary Audience:** NITI Aayog, Central Grant Officers, CSR committees, media.
- **Main User Task:** Verify institutional claims and explore historical cohort trends.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Certified Impact Dashboard`.
- **Section Order:**
  1. Header with Statutory Audit Badge: `[Audited as of FY 2024-25 • Certified Under AIM Filings]`
  2. Aggregate KPI Cards (Startups Incubated, Patents Filed, Capital Mobilized, Rural Jobs Created)
  3. Fiscal Year Breakdown Table (`/impact/periods` comparison: FY22 through FY25)
  4. Qualitative Case Studies Highlight (GramHeet, Innosapien)
  5. Download Audited Impact Dossier (Signed PDF)
- **Actions:** Primary: `[Download Signed Impact Report PDF]`; Secondary: `[Explore Case Studies]`.
- **Required Data Fields:** Audited KPI values, audit timestamp, year-wise table rows, signed PDF download link.
- **Placeholders Applied:** Any pending figure displays `[AUDITED METRIC PENDING BOARD APPROVAL]`.
- **Mobile Layout:** Metric cards stack 2x2; historical comparison table converts to responsive card stack.
- **Bilingual Considerations:** Marathi: *"प्रमाणित सामाजिक आणि आर्थिक प्रभाव"*.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [BREADCRUMB] Home / Impact Dashboard                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ [AUDIT BADGE] Verified Under Annual NITI Aayog Filings • FY 2024-25         │
│  "Certified Social & Economic Transformation Metrics"                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ [KPI ROW (4-Col)]                                                           │
│  [ 50+ Startups ]  [ 42+ Patents ]  [ ₹5.2Cr+ Capital ]  [ 35k+ Farmers ]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [HISTORICAL TABLE: FY 2021-22 to FY 2024-25]                                │
│  Year       | Incubated | Seed Grants (₹) | Patents | Farmers Reached       │
│  FY 2024-25 | 18        | ₹1.85 Cr        | 14      | 14,200                │
├─────────────────────────────────────────────────────────────────────────────┤
│ [DOWNLOAD CTA] Download Signed Audit Certificate (PDF • 1.8 MB)             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 13: Events Listing (`/events` | `/mr/events`)

### 1. Specifications
- **Page Objective:** Interactive calendar and directory of all upcoming cohort deadlines, bootcamps, and workshops.
- **Primary Audience:** Founders, students, regional farmers, agribusiness executives.
- **Main User Task:** Browse upcoming events, filter by event type, and initiate registration.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Events Calendar`.
- **Section Order:**
  1. Header with Category Filters: `[All Events] [Cohort Deadlines] [Workshops] [Conferences] [Past Archive]`
  2. Featured Event Banner (e.g., SISFS Cohort 4 Application Deadline)
  3. Upcoming Events List (Date Box, Title, Venue, Seat Availability, `[Register]` CTA)
  4. Link to Past Events & Outcome Archive (`/events/past`)
- **Actions:** Primary: `[Register for Event]`; Secondary: `[Add to Google/Outlook Calendar]`.
- **Required Data Fields:** Event title, date, time, venue, category, registration cutoff, speaker names.
- **Mobile Layout:** 1-column stack; date box stays pinned to card top.
- **Bilingual Considerations:** Marathi: *"कार्यक्रम आणि कार्यशाळा"*.

---

## Page 14: Event Details & Registration (`/events/:slug` | `/mr/events/:slug`)

### 1. Specifications
- **Page Objective:** Dedicated page detailing an individual workshop's agenda, trainer profile, and registration form.
- **Primary Audience:** Prospective workshop attendees.
- **Main User Task:** Review agenda, venue directions, and submit RSVP form.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Events / Millet Processing Workshop`.
- **Section Order:**
  1. Event Hero: Date Badge, Title, Category Pill, Remaining Seats Counter
  2. Workshop Objectives & Syllabus Breakdown
  3. Speaker / Trainer Profiles (Headshot, Credentials)
  4. Venue & Directions (Food Processing Pilot Plant, Baramati Campus)
  5. Registration Form: Full Name, Email, Mobile (+91), Occupation (Farmer, Student, Startup), Submit CTA
- **Actions:** Primary: `[Confirm Registration]`; Secondary: `[Download Syllabus PDF]`.
- **Required Data Fields:** Attendee name, phone, email, category; auto-capacity cutoff.
- **Mobile Layout:** Sticky bottom CTA bar with `"Register (Seats Left: 14)"` on mobile viewports.
- **Bilingual Considerations:** Marathi: *"कार्यक्रम तपशील आणि नावनोंदणी"*.

---

## Page 15: Reports & Publications (`/resources` | `/mr/resources`)

### 1. Specifications
- **Page Objective:** Central document repository for statutory annual reports, whitepapers, scheme guidelines, and policies.
- **Primary Audience:** Auditors, grant bodies, researchers, journalists.
- **Main User Task:** Search, filter, and download certified institutional PDF documents.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Resources & Publications`.
- **Section Order:**
  1. Header + Search Bar (`"Search publications, reports, or policies..."`)
  2. Category Tabs: `[All] [Annual Reports] [Policy Whitepapers] [Scheme Guidelines] [RTI & Compliance]`
  3. Document Table / Cards (Title, Publishing Date, File Format, Size, Direct Download Link)
  4. Media Kit & Official Brand Assets Section
- **Actions:** Primary: `[Download PDF]`; Secondary: `[Copy Document Link]`.
- **Required Data Fields:** Title, category, publication date, file size, SHA-256 integrity checksum, PDF URL.
- **Mobile Layout:** Table converts to responsive card stack.
- **Bilingual Considerations:** Marathi: *"अहवाल आणि प्रकाशने"*.

---

## Page 16: Contact & Inquiries (`/contact` | `/mr/contact`)

### 1. Specifications
- **Page Objective:** Direct departmental contact routing, campus directions, and general collaboration intake.
- **Primary Audience:** General public, corporate CSR heads, visiting delegations.
- **Main User Task:** Find phone/email directory, submit inquiry, get travel directions to Baramati.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Contact Us`.
- **Section Order:**
  1. Header with Primary Contact Grid (Campus Address, Helpline, Incubation Desk Email)
  2. Departmental Directory Table (Incubation, Analytical Lab, CSR, RTI Officer)
  3. General Inquiry Form: Name, Email, Phone, Inquiry Type (Startup, Lab, CSR, Press), Message, Submit
  4. Campus Travel & Navigation Guide (Directions from Pune Airport, Daund Junction, Baramati Bus Stand)
  5. Interactive Google Map Embed
- **Actions:** Primary: `[Submit Inquiry]`; Secondary: `[Open Directions in Maps]`.
- **Required Data Fields:** Contact fields with validation; inquiry classification.
- **Mobile Layout:** 1-column stack; telephone numbers use `<a href="tel:...">` for 1-tap dialing.
- **Bilingual Considerations:** Marathi: *"संपर्क आणि चौकशी"*.

---

## Page 17: Global Search Results (`/search?q=...` | `/mr/search?q=...`)

### 1. Specifications
- **Page Objective:** Search discovery page returning indexed results across all 7 pillars.
- **Primary Audience:** Exploratory visitors looking for specific startups, schemes, or reports.
- **Main User Task:** Scan categorized search results and navigate directly to target content.
- **Header & Breadcrumbs:** Breadcrumbs: `Home / Search Results`.
- **Section Order:**
  1. Prominent Search Query Bar with result count (`Showing 14 results for "SISFS"`)
  2. Faceted Category Filter Chips: `[All (14)] [Programs (3)] [Startups (6)] [Reports (2)] [Events (3)]`
  3. Results List (Result Title, Section Pill, Snippet with matched keywords highlighted, URL link)
  4. Pagination Controls
- **Actions:** Query re-submission, category filter toggle, click result.
- **Empty State:** Clean illustration + *"No results found for 'xyz'. Try searching for 'incubation', 'lab', or 'grants'."*
- **Mobile Layout:** 1-column vertical list; touch targets $\ge 44\text{px}$.
- **Bilingual Considerations:** Marathi: *"शोध परिणाम"*.

---

## Page 18: Not-Found (404) & System Error (500) (`/404`, `/500`)

### 1. Specifications
- **Page Objective:** Help stranded visitors recover seamlessly without friction.
- **Primary Audience:** Visitors hitting broken legacy URLs, mistyped addresses, or server errors.
- **Main User Task:** Navigate back to active institutional hubs (Home, Programs, Startups).
- **Header & Breadcrumbs:** Standard Header. No breadcrumbs.
- **Section Order:**
  1. Error Code Badge (`404: Page Not Found` or `500: Server Temporarily Unavailable`)
  2. Plain Language Explanation: *"The page you are looking for may have been migrated or updated during our website relaunch."*
  3. Quick Search Bar
  4. 4 Popular Navigation Cards: `[Return to Homepage]` `[Explore Programs]` `[Startup Directory]` `[Contact Helpdesk]`
- **Actions:** Primary: `[Back to Home]`; Secondary: `[Search Website]`.
- **Mobile Layout:** Centered 1-column stack.
- **Bilingual Considerations:** Marathi: *"पृष्ठ आढळले नाही (४०४)"*.
