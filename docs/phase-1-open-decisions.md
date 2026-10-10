# Phase 1 Open Decisions Register
## AIC-ADT Baramati Foundation Digital Platform

**Document Version:** 1.0.0  
**Status:** Open for Executive Review & Action  
**Date:** October 10, 2026  
**Auditor & Reviewer Roles:** Senior Project Manager, Technical Reviewer  
**Target Authority:** CEO (Ms. Jaya Tiwari) and Governing Board, AIC-ADT Baramati Foundation  

---

## 1. Overview of Open Management Decisions

During the Phase 1 discovery and technical review, eleven critical policy, content, and infrastructure decisions were identified that require formal executive determination. To maintain documentation integrity and prevent unverified assumptions from propagating into Phase 2 technical implementation, these decisions are consolidated below with concrete recommendations, impact analyses, and target decision deadlines.

---

## 2. Executive Decision Register

### DEC-MGT-01: Public Navigation Taxonomy & Top-Level Categories
- **Topic:** Global Primary Navigation Categories.
- **Context & Background:** The legacy website suffered from broken routing (CSR pointing to `/careers/`, Events pointing to `/demo/`, blank parent `/programs/` page). Task 3 proposed a streamlined 7-category taxonomy: **About Us**, **Programs & Schemes**, **Startups**, **Innovation & Labs**, **Impact**, **Events**, and **Resources & Contact**.
- **Proposed Recommendation (Recommended):** Ratify the proposed 7-category taxonomy with canonical route bindings and mega-menu layouts.
- **Alternative Option:** Maintain 9 top-level links by splitting "Schemes" and "Contact" into separate primary header items (increases header clutter on standard desktop displays).
- **Business & Compliance Impact:** Clean wayfinding; prevents visitor disorientation; eliminates legacy 404 traps.
- **Approving Authority:** CEO (Ms. Jaya Tiwari) / Communications Lead.
- **Decision Deadline:** Prior to Phase 2 Wireframe Approval.

---

### DEC-MGT-02: Certified Impact Metrics Baseline & Audit Date Sign-Off
- **Topic:** Public Institutional Statistics on Homepage and Impact Dashboard.
- **Context & Background:** The legacy homepage displayed conflicting numbers: hero claimed "71+ Startups Launched, 42+ IP Registered, 69+ Mentors", while the lower section hardcoded `0` counters. Task 1 identified that unverified claims create severe compliance risks with NITI Aayog.
- **Proposed Recommendation (Recommended):** Formally approve verified baseline numbers with an explicit audit date (e.g., *"Audited as of September 30, 2026"*): Total Startups Incubated (distinguishing physically incubated vs. pre-incubated), Total Patents/IP Filed, Empaneled Mentors, External Capital Mobilized, and Smallholder Farmers Reached.
- **Alternative Option:** Temporarily suppress aggregate impact numbers on the homepage until the annual auditor report is finalized, displaying only qualitative startup case studies.
- **Business & Compliance Impact:** Protects institutional credibility; satisfies central government disclosure standards.
- **Approving Authority:** Governing Board / CEO.
- **Decision Deadline:** Prior to Phase 2 Sprint 1.

---

### DEC-MGT-03: Empaneled Mentors Directory Disclosure & Consent
- **Topic:** Public Publication of Mentor Profiles.
- **Context & Background:** The existing site claimed "69+ Mentors" but listed only 23 unique individuals with initials and no photos. Task 2 specifies publishing verified names, designations, corporate affiliations, photos, and LinkedIn URLs.
- **Proposed Recommendation (Recommended):** Obtain written/email consent from all 69+ empaneled mentors to publish their professional profiles and corporate affiliations; publish a featured subset (top 25) in Phase 1 if complete assets are pending.
- **Alternative Option:** Publish only mentor names and sectors without photographs or direct LinkedIn links (reduces investor engagement and ecosystem credibility).
- **Business & Compliance Impact:** Reconciles the public discrepancy while respecting mentor privacy and GDPR/DPDP consent norms.
- **Approving Authority:** Incubation Operations Manager / Legal Counsel.
- **Decision Deadline:** Prior to Directory Content Migration.

---

### DEC-MGT-04: Active Status and Tranche Limits for Central Schemes (SISFS & MeitY GENESIS)
- **Topic:** Grant Funding Rules and Cohort Intake Windows.
- **Context & Background:** Current scheme pages lack clarity on whether application rounds are open or closed, what the exact grant/debt tranches are, and contained severe typos.
- **Proposed Recommendation (Recommended):** Publish official DPIIT/MeitY terms: SISFS (up to ₹20 Lakhs grant for proof-of-concept; up to ₹50 Lakhs convertible debenture for commercialization); MeitY GENESIS (EiR up to ₹10 Lakhs; Pilot up to ₹50 Lakhs). State clearly whether the next intake is "Open" or "Announced Soon".
- **Alternative Option:** Withhold specific financial figures and instruct applicants to contact the incubator for scheme guidelines (increases administrative email overhead).
- **Business & Compliance Impact:** Eliminates applicant confusion; establishes transparent, professional intake expectations.
- **Approving Authority:** CEO / Finance Advisory Committee.
- **Decision Deadline:** Prior to Scheme Page Drafting.

---

### DEC-MGT-05: Corporate CSR Grant Disclosures & Donor Logo Approvals
- **Topic:** Publication of Corporate CSR Partnerships on `/csr/`.
- **Context & Background:** The legacy site cited collaborations with Capgemini (4 startups), HDFC Bank Parivartan (3 startups, ₹10 Lakhs each), and ED&F Man Commodities (2 startups), but mounted them on `/careers/`.
- **Proposed Recommendation (Recommended):** Re-route to `/csr/` and secure written authorization from Capgemini, HDFC Bank, and ED&F Man to publicly display their corporate logos and grant programs.
- **Alternative Option:** Publish CSR partnership summaries using textual descriptions without corporate donor logos.
- **Business & Compliance Impact:** Comply with corporate branding guidelines and mutual non-disclosure clauses.
- **Approving Authority:** CEO / Corporate Partnerships Lead.
- **Decision Deadline:** Prior to CSR Page Staging.

---

### DEC-MGT-06: Governing Board & Advisory Council Official Roster
- **Topic:** Leadership and Governance Page Structure.
- **Context & Background:** Legacy team pages omitted the Board of Directors, burying prominent leaders (e.g., Mr. Prataprao Pawar, Dr. Amit Sehgal) in broken custom post types labeled "Related Chef".
- **Proposed Recommendation (Recommended):** Establish a dedicated "Governance & Leadership" section featuring approved biographies, high-resolution photographs, and official board titles for all Governing Board and Advisory Council members.
- **Alternative Option:** List only operational executive staff on the website, withholding board member profiles (weakens institutional authority and governance stature).
- **Business & Compliance Impact:** Projects high institutional stature and governance transparency for government auditors.
- **Approving Authority:** Chairman / Governing Board.
- **Decision Deadline:** Prior to Leadership Page Production.

---

### DEC-MGT-07: Analytical Lab NABL Accreditation Certificate & Testing Fees
- **Topic:** Publication of Laboratory Credentials and Commercial Service Rates.
- **Context & Background:** The website advertises the Analytical Lab as "NABL Accredited" without citing the certificate number, validity period, or testing discipline.
- **Proposed Recommendation (Recommended):** Publish the official NABL Accreditation Certificate Number, valid discipline scope (soil, water, pesticide residue testing), and provide a downloadable testing service request form. Confirm if testing fee rate cards are public or inquiry-only.
- **Alternative Option:** Mention NABL accreditation qualitatively without publishing certificate details or testing rate cards.
- **Business & Compliance Impact:** Compliance with Quality Council of India regulations; enables transparent commercial testing inquiries from regional agribusinesses.
- **Approving Authority:** Laboratory Director / NABL Quality Manager.
- **Decision Deadline:** Prior to Lab Page Production.

---

### DEC-MGT-08: Devanagari (Marathi) Technical Translation Sign-Off Ownership
- **Topic:** Localization Governance for Agri-Tech Content.
- **Context & Background:** Task 2 and Task 3 specify complete 1-to-1 bilingual mirroring (`/path` ↔ `/mr/path`). Specialized agricultural, biotechnology, and legal terms require expert Devanagari translation.
- **Proposed Recommendation (Recommended):** Formally designate an internal bilingual editorial lead (e.g., from ADT Agricultural Extension / Communications) responsible for reviewing and authorizing Marathi technical copy.
- **Alternative Option:** Outsource technical Marathi translation to a certified professional translation agency with final sign-off by the Incubation Manager.
- **Business & Compliance Impact:** Ensures accurate, respectful, and natural vernacular communication for rural farming communities.
- **Approving Authority:** CEO / Communications Head.
- **Decision Deadline:** Prior to Bilingual Content Entry.

---

### DEC-MGT-09: Data-Center Compute Allocation & Container Policy Authorization
- **Topic:** On-Premise Virtual Machine Provisioning.
- **Context & Background:** The proposed technology stack requires a dedicated Production VM (4 vCPUs, 16 GB RAM, 100 GB SSD + 250 GB storage volume), an isolated Staging VM, and Docker Engine authorization.
- **Proposed Recommendation (Recommended):** Formally approve the VM provisioning request and grant container runtime authorization under campus IT policy.
- **Alternative Option:** If Docker is prohibited by institutional security policy, authorize rewriting the deployment specification to native bare-metal systemd services (increases configuration complexity).
- **Business & Compliance Impact:** Foundation of the entire technical implementation; blocks deployment if delayed.
- **Approving Authority:** Campus IT Director / Data-Center Lead.
- **Decision Deadline:** 14 Days Prior to Sprint 1.

---

### DEC-MGT-10: Indian DLT Transactional SMS Gateway Ownership
- **Topic:** Mobile Phone OTP Dispatch for Founder Applications.
- **Context & Background:** Applicant registration and event RSVP confirmations require transactional SMS dispatch adhering to Telecom Regulatory Authority of India (TRAI) DLT mandates.
- **Proposed Recommendation (Recommended):** Register official DLT transactional message templates under the entity "AIC-ADT Baramati Foundation" (or authorize utilizing ADT's existing DLT registration and SMS gateway credentials).
- **Alternative Option:** Fall back strictly to email verification for Phase 1, deferring mobile SMS OTPs to Phase 2 (reduces mobile onboarding speed for rural applicants).
- **Business & Compliance Impact:** Direct impact on applicant onboarding friction and TRAI telecom compliance.
- **Approving Authority:** IT Lead / Telecom Operations.
- **Decision Deadline:** 7 Days Prior to Staging Deploy.

---

### DEC-MGT-11: Unselected Applicant Pitch Deck Archival Retention Policy
- **Topic:** Data Privacy & Document Retention Policy.
- **Context & Background:** Hundreds of confidential pitch decks containing proprietary intellectual property will be submitted through the portal. A formal data retention schedule must be established.
- **Proposed Recommendation (Recommended):** Enforce an institutional retention policy: retain unselected applicant dossiers in encrypted storage for 3 years (to satisfy AIM / NITI Aayog audit review), after which proprietary documents are permanently purged with applicant notification.
- **Alternative Option:** Retain submitted documents indefinitely or purge immediately upon cohort rejection (conflicts with government grant audit guidelines).
- **Business & Compliance Impact:** Compliance with the Digital Personal Data Protection (DPDP) Act while satisfying grant auditing requirements.
- **Approving Authority:** Legal Counsel / Governing Board.
- **Decision Deadline:** Prior to Application Portal Production Launch.
