# Comprehensive Audit of the Existing AIC-ADT Baramati Foundation Website

**Target Entity:** AIC-ADT Baramati Foundation  
**Audited Domain:** [https://aicadtbaramatifoundation.org/](https://aicadtbaramatifoundation.org/)  
**Audit Date:** October 10, 2026  
**Auditor Roles:** Senior Product Analyst, Institutional Website Consultant, UX Auditor, Technical Architect  
**Audit Scope:** Public web pages, navigation architecture, technical infrastructure, content integrity, forms, and compliance baseline for the planned next-generation digital platform.

---

## 1. Executive Summary

AIC-ADT Baramati Foundation is a premier Atal Incubation Centre established under the flagship **Atal Innovation Mission (AIM), NITI Aayog**, and hosted by the **Agricultural Development Trust (ADT), Baramati**. The institution plays a pivotal role in spearheading Agri-Tech innovation, rural entrepreneurship, biotechnology, food processing, and sustainable allied agricultural ventures across Western India.

However, an exhaustive factual audit of the current live website ([aicadtbaramatifoundation.org](https://aicadtbaramatifoundation.org/)) reveals a platform in severe structural and technical disrepair. Rather than projecting the stature of an elite national incubation hub, the current digital presence is heavily compromised by an incomplete commercial WordPress theme installation ("Techkit"), widespread orphaned demo templates, critical navigation routing flaws, duplicate and blank placeholder pages, contradictory institutional figures, and broken user journeys.

### Key Audit Findings at a Glance
1. **Severe Template Pollution & Dummy Data in Production:** Over 75 out of the 111 published pages on the website are unpurged demo imports from the commercial "Techkit" theme, including an entire WooCommerce dummy shop (`/shop/`, `/cart/`, `/checkout/`, dummy products such as headphones and travel bags), 12 dummy case studies, 11 dummy tech blog posts, and fake team members (e.g., "Pull Maradona", "John Gonzalez", "Olivia Evans") indexed alongside real leadership.
2. **Critical Navigation & URL Routing Errors:**
   - The primary navigation menu item labeled **"CSR"** links to `/careers/`.
   - The primary navigation menu item labeled **"Events"** routes to `/demo/`, while the canonical `/events/` URL is titled "old Events" and contains stale 2024 workshops.
   - The homepage CTA "Explore programs" routes directly to `/contact/` instead of an educational programs overview.
   - Parent menu pages `/programs/`, `/about-aic-adt/`, and `/about-adt-baramati/` are published as completely blank pages with zero body content.
3. **Severe Brand & Entity Inaccuracies:**
   - Multiple core startup application forms (`/pitch-your-idea/`, `/pre-incubation-form/`, `/incubation-form/`) feature prominent subheadings reading **"AIC-DBT Baramati"** instead of **"AIC-ADT Baramati"**, creating severe confusion with the Department of Biotechnology (DBT).
   - In individual team member breadcrumbs, the system displays theme-leftover labels such as **"Related Chef"** beneath mentors.
4. **Data Contradictions & Broken Counters:**
   - The homepage displays impact metrics in the hero as "71+ Startups Launched, 42+ IP Registered, 69+ Mentors". In the "Our Impact in Numbers" section, numbers are hardcoded in the HTML as literal `0` (relying on client-side JS animation that fails if scripts stall or for crawlers/screen readers).
   - The `/mentors/` directory lists 24 cards (representing 23 unique individuals due to a duplicate entry for Pranali Vichare), directly contradicting the claim of "69+ Mentors".
   - The `/startups/` portfolio lists 71 text cards but contains zero links to startup websites, zero founder photos, and no filtering by incubation cohort or sector.
5. **Security & Technical Liabilities:**
   - The Resources page (`/resources/`) embeds an unencrypted media asset (`http://test.aic-sku.com/...`) hosted on an insecure external test domain, generating mixed-content browser warnings.
   - Dual competing form plugins (Contact Form 7 and Fluent Forms/Elementor Forms) operate simultaneously, causing duplicate form pages for identical incubation stages.
   - The web server runs an Apache environment with PHP 8.4.25 and an active REST API revealing full backend page structures, plugins, and author IDs.

The existing website cannot be salvaged through minor patches. A complete architectural rebuild is urgently required to establish a secure, accessible, high-performance, and prestigious digital gateway that honors AIC-ADT's institutional mandate.

---

## 2. Current Strengths

While the digital implementation suffers from critical execution flaws, several authentic institutional assets and foundational strengths were identified that must be preserved and elevated in the new platform:

1. **Rich Grassroots Startup Portfolio:**
   - The `/startups/` page preserves documented profiles of 71 actual agri-tech and allied startups (e.g., Innosapien Agro Technologies, Health First Hydrofarms, Transity Digital Solutions, GramHeet, Ayurcin Biogenics). This portfolio represents high institutional equity and must be migrated into a modern searchable directory.
2. **Authentic Specialized Lab Infrastructure:**
   - Detailed functional equipment descriptions exist for five world-class specialized facilities:
     - **Fab & Makerspace Lab** (`/prototyping-lab/`): Laser cutting, 3D printing, PCB prototyping, electronics fabrication.
     - **Analytical Lab** (`/analytical-lab/`): NABL-accredited facility for soil, water, pesticide, and fertilizer testing.
     - **Food Innovation Lab** (`/food-innovation-lab/`): Post-harvest processing, value addition, food product formulations.
     - **Digital Media Lab** (`/digital-media-lab/`): Audio/video studio, podcast recording, brand storytelling for rural ventures.
     - **Co-Working Space** (`/co-working-space/`): Dedicated desks, high-speed fiber internet, conference facilities.
3. **Strong Scheme Alignment (SISFS & MeitY GENESIS):**
   - The platform clearly articulates participation in prestigious Central Government schemes:
     - **Startup India Seed Fund Scheme (SISFS)**: Documented grant support with case studies like GramHeet (35,000+ smallholder farmers reached, ₹4 Cr+ turnover).
     - **MeitY GENESIS (MSH)**: EiR (Entrepreneur-in-Residence) funding up to ₹10 Lakhs and Pilot funding up to ₹50 Lakhs.
     - **Corporate CSR Partnerships**: Documented grant tracks with Capgemini, HDFC Bank Parivartan (₹10 Lakhs/startup), and ED&F Man Commodities.
4. **Distinguished Advisory & Mentor Network:**
   - Genuine national leaders, domain experts, and investors are affiliated with AIC-ADT, including prominent figures in intellectual property, venture funding, agri-business, and regional administration.
5. **Real Grassroots Community Impact:**
   - Real workshop records (e.g., Millet Entrepreneurship Development Programmes, Women's Baking Workshops, Youth Bootcamps) demonstrate active on-ground capacity building.

---

## 3. Content and Navigation Weaknesses

### 3.1. Navigation Architecture & Information Hierarchy
- **Dead-End & Blank Parent Pages:** Clicking `/programs/` in the main navigation leads to an empty page (`Length: 192 bytes`) containing only header and footer chrome. The same defect occurs on `/about-aic-adt/` and `/about-adt-baramati/`.
- **Mismatched URL Slugs:**
  - Main menu item **"CSR"** links to `/careers/`.
  - Main menu item **"Events"** links to `/demo/`.
  - Main menu item **"Fab & Makerspace Lab"** links to `/prototyping-lab/`.
- **Duplicate & Competing Contact Pages:** Four distinct contact URLs exist: `/contact/` (content present), `/contact-us/` (completely blank page), `/contact-form-111/` (raw CF7 demo form), and `/contact-form-333/` (raw CF7 applicant form).
- **Broken & Empty Hyperlinks:**
  - On the Homepage, the CTA "View All Services" has an empty `href=""`.
  - In the hero area, a button contains `href="#"`.
  - The CTA "Explore programs" redirects users to `/contact/`.
  - On `/resources/`, multiple buttons labeled "Lear More" [sic] and "Learn More" have empty `href=""`.

### 3.2. Content Integrity & Editorial Quality
- **Severe Typographical Errors on Government Scheme Pages:**
  - On `/meity-genesis/`:
    - *"Bilding Robust IPR Strategies"* (Building misspelled).
    - *"Workhop PCB Design Using Open-Source Tools"* (Workshop misspelled).
    - *"Workshoop on Microcontroller Programming"* (Workshop misspelled).
    - *"Toos for PCB Desing"* (Tools and Design misspelled).
    - *"Hads on Training"* (Hands-on misspelled).
- **Editorial Inconsistencies on Mentor Profiles:**
  - Mentors listed with truncated designations: *"Piyush Sharma Global CEO|"* (hanging pipe symbol).
  - Spelling errors in institutional affiliations: *"Oceans Bridege"* (Bridge misspelled), *"Strategy Consllium"* (Consilium misspelled), *"Markeging Partner if Sailaja Sarvepalli"* (Marketing misspelled).
  - Redundant listing: Pranali Vichare (Talkd.Co) is listed twice under different initials.
- **Outdated & Static Event Listings:**
  - The `/demo/` page features past events from early 2026 written in Marathi without an English toggle, while the canonical `/events/` page only contains stale workshops from mid-to-late 2024.
- **Empty Resources Center:**
  - The `/resources/` page fails to provide downloadable PDFs, application guidelines, scheme handbooks, annual reports, or IP filing guides. Instead, it pastes raw descriptive text copied from the Prototyping Lab.

---

## 4. Functional Observations

1. **Dual Registration Channels & Duplicate Form Submissions:**
   - Applicants face two parallel application tracks with identical titles but different backend processors:
     - Track A (Contact Form 7): `/register-now-for-pre-incubation-stage/`, `/incubation-registration/`, `/accelerator-registration/`.
     - Track B (Custom/Fluent Forms): `/pre-incubation-form/`, `/incubation-form/`, `/acceleration-program-form/`.
   - Neither track provides applicant confirmation dashboards, tracking numbers, or automated receipt notifications.
2. **Missing Form Labels & Validation Deficiencies:**
   - 100% of form input elements on `/contact/` and `/pitch-your-idea/` lack explicit programmatic `<label for="...">` associations.
   - Text fields rely heavily on placeholder attributes (e.g., `e.g. Aditya Rajendra Bhosale`), which vanish upon user entry, causing accessibility barriers for screen reader users and cognitive friction.
3. **Absence of Real-Time Cohort & Scheme Status Indicators:**
   - Schemes such as Startup India Seed Fund, MeitY GENESIS EiR, and CSR Grants provide no real-time status badges (e.g., "Applications Open", "Review in Progress", "Closed"). Founders cannot verify whether an application window is live.
4. **Lack of Interactive Filtering in Startup Portfolio:**
   - All 71 startups on `/startups/` are rendered as an unfilterable, non-paginated vertical list spanning over 33,000 characters. Users cannot search by domain (Agri-Tech, Food Processing, Biotech, Animal Husbandry), stage, or funding year.
5. **No File Repository or Search Mechanism:**
   - The site provides no global search function, no knowledge base, and no repository for incubator policies or compliance disclosures.

---

## 5. Technical Observations

*All observations are supported by direct HTTP inspection, SSL analysis, and REST API queries conducted during the audit.*

| Parameter | Observed Technical Reality | Evidence / Inspection Source | Institutional Risk Level |
| :--- | :--- | :--- | :--- |
| **Web Server** | Apache | `server: Apache` HTTP response header | Low (Standard) |
| **Backend Runtime** | PHP version 8.4.25 | `x-powered-by: PHP/8.4.25` header | Medium (Header disclosure enables targeted exploits) |
| **Hosting IP** | 68.178.236.9 (GoDaddy Infrastructure, Mumbai/Singapore routing) | Direct curl IP resolution | Medium (Shared commercial hosting; lacks dedicated institutional SLA) |
| **SSL / TLS Certificate** | Let's Encrypt Authority (CN=YR1), Subject: `CN=autoconfig.aicadtbaramatifoundation.org` | OpenSSL TLSv1.2 handshake inspect | High (Misconfigured default certificate subject; valid through Nov 30, 2026) |
| **Content Management** | WordPress core with Elementor page builder & "Techkit" Theme v1.6 | Stylesheet headers, `wp-content/themes/techkit/` | Critical (Bloated DOM, severe plugin dependencies, unmaintained theme) |
| **Active Plugins in Production** | Elementor, Anywhere Elementor, Happy Addons, Contact Form 7, Ultimate Addons for CF7, Fluent Forms, WooCommerce, Review Schema, SchemaEngine AI, Smash Balloon Instagram Feed | Enqueued stylesheets and scripts | Critical (Severe plugin bloat; active WooCommerce on a non-commerce institution) |
| **REST API Exposure** | Publicly accessible WP REST API at `/wp-json/wp/v2/pages` without rate-limiting | HTTP 200 response returning all 111 published page objects | High (Allows full scraping of draft/published structures and user accounts) |
| **Mixed Content Security** | Unencrypted HTTP video link embedded on HTTPS page: `http://test.aic-sku.com/wp-content/uploads/2025/02/Media-Lab.mp4` | Direct DOM anchor extraction on `/resources/` | High (Triggers browser security warnings and broken media playback) |
| **Counter Rendering Implementation** | Metrics hardcoded to `0` in HTML with `data-target="XX"` attributes requiring client-side JS | Homepage HTML inspection (`<h2 class="count" data-target="71">0</h2>`) | Medium (Displays "0 Startups, 0 Training" if JavaScript execution is deferred) |

---

## 6. Priority-Ranked Recommendations

### Priority 1: Immediate Remediation (Days 1–7)
1. **Purge Commercial Template Demo Pages:** Immediately unpublish and draft/delete all 75+ dummy pages, including `/shop/`, `/cart/`, `/checkout/`, dummy products, dummy case studies, dummy tech blogs, and dummy team records ("Pull Maradona", etc.).
2. **Deactivate WooCommerce Plugin:** Remove WooCommerce and all eCommerce assets from production, as AIC-ADT is not an eCommerce store.
3. **Fix Critical Brand Errors:** Correct all occurrences of "AIC-DBT Baramati" on `/pitch-your-idea/` and incubation forms to "AIC-ADT Baramati Foundation".
4. **Fix Broken Navigation Links:** Re-route "CSR" to a proper `/csr/` slug, "Events" to a consolidated `/events/` page, and remove empty buttons.
5. **Eliminate Insecure Mixed Content:** Remove the unencrypted `http://test.aic-sku.com/` media reference on `/resources/`.

### Priority 2: High-Priority Architectural Rebuild (Next-Gen Website)
1. **Clean, Modern Headless/Modern Web Architecture:** Transition away from fragile WordPress/Elementor theme page builders to a high-speed, modern, accessible web framework (or custom structured CMS) adhering to semantic HTML5, zero plugin bloat, and sub-second page loads.
2. **Unified Navigation & Information Architecture:**
   - Consolidate About pages into an authoritative section (Genesis, ADT Heritage, AIM NITI Aayog mandate, Board of Directors, Leadership).
   - Consolidate Programs into structured cohorts (Pre-Incubation, Incubation, Acceleration) with transparent eligibility criteria, timeline charts, and live application buttons.
   - Consolidate Scheme pages (SISFS, MeitY GENESIS, CSR) with official funding caps, disbursement stages, and guidelines.
3. **Searchable Startup & Mentor Directories:**
   - Build a searchable, filterable grid for the 71+ startups with sector filters, founder names, website links, and success metrics.
   - Build an authenticated, complete Mentor directory with genuine profile pictures, verified LinkedIn URLs, and areas of expertise.
4. **Single Unified Application Portal:** Replace confusing dual-form tracks with a secure, multistep form featuring automated email confirmations, application reference IDs, and file upload capabilities for pitch decks and DPIIT certificates.

### Priority 3: Institutional Governance & Content Verification
1. **Formal Content Verification:** Submit all key statistics (Startups launched, funds disbursed, IP registered, mentors enrolled) to the CEO and Board for official sign-off.
2. **Bilingual Marathi/English Architecture:** Implement professional, structured bilingual support with a persistent language switcher, especially for farmer-centric and regional entrepreneurship workshops.
3. **Compliance & Disclosure Hub:** Dedicate a public repository for institutional annual reports, audited financial disclosures, NITI Aayog/AIM compliance reports, RTI disclosures, and grievance redressal contacts.

---

## 7. Research Limitations

During the audit, the following research boundaries and constraints were observed:
1. **Internal Server Logs & Analytics:** Google Analytics, search console metrics, server access logs, and bounce rates were not accessible as this was an external, unauthenticated audit.
2. **Form Submissions Testing:** Active incubation application forms were not submitted to avoid injecting dummy data into live operational queues or triggering alerts to AIC-ADT managers.
3. **Automated Load & Penetration Testing:** Formal vulnerability scanning, DDoS simulation, and heavy load testing were deliberately omitted to prevent service disruption to the live production server.
4. **Third-Party External Links:** Verification was restricted to the domain `aicadtbaramatifoundation.org` and immediate linked partner assets; external platforms (e.g., Startup India portal, MeitY portal) were not audited.
