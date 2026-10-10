# Functional Requirements Specification (FRS)
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Priority Legend:**
- **P0 (Mandatory):** Critical requirement required for the First Production Release (MVP).
- **P1 (Important):** High-value requirement planned for the subsequent release iteration.
- **P2 (Enhancement):** Value-add enhancement for future platform evolutions.

---

## 1. Public Institutional Website & Navigation

### FR-PUB-01: Canonical Information Architecture & Navigation
- **Description:** Implement a unified, hierarchical navigation system comprising Home, About Us (Genesis, ADT Heritage, Leadership, Governance), Programs (Pre-Incubation, Incubation, Acceleration), Schemes (SISFS, MeitY GENESIS, CSR), Infrastructure (Labs, Co-Working), Startups, Mentors, Events, Reports & Publications, and Contact.
- **User or Business Need:** Overcomes existing broken routing (e.g., CSR linking to `/careers/`, Events pointing to `/demo/`, blank `/programs/` page), providing intuitive wayfinding for all visitors.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. All menu items must route to canonical, active, non-blank destination pages.
  2. The parent item "Programs" must render a comprehensive overview page comparing the three incubation stages.
  3. "CSR" must resolve to `/csr/` (or `/partnerships/csr/`), completely decoupling from any employment or career paths.
  4. Global header must remain sticky or easily retrievable on scroll, featuring an accessible skip-to-main-content link.
- **Dependencies:** None.
- **Security or Privacy Implications:** None. Public routing only.
- **Open Questions:** Does management prefer "Partnerships" as an independent top-level nav item or grouped under "About Us"?

---

### FR-PUB-02: Institutional Leadership & Governance Showcase
- **Description:** Provide structured public profiles for the Governing Board, Board of Directors, Academic Advisors, and Executive Staff.
- **User or Business Need:** Eliminates legacy bugs where board members were classified as "Related Chef" or buried in broken custom post types while omitted from the main team page.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Distinguish clearly between Governing Board/Advisors and Executive Management.
  2. Display verified name, official designation, organization affiliation, professional bio, and authorized LinkedIn URL.
  3. No legacy theme taxonomy remnants or generic stock placeholders may appear.
- **Dependencies:** Management approval of the official leadership roster.
- **Security or Privacy Implications:** Direct staff personal phone numbers and private email addresses must not be published; only official departmental contact channels are permitted.
- **Open Questions:** Should executive staff have direct public profile pages or modal dialog summaries on a single team page?

---

### FR-PUB-03: Government Schemes Information Hub (SISFS & MeitY GENESIS)
- **Description:** Publish dedicated, authoritatively verified scheme pages for the Startup India Seed Fund Scheme (SISFS) and MeitY GENESIS (EiR and Pilot funding).
- **User or Business Need:** Provides clear eligibility guidelines, funding caps, application timelines, and prevents misinformation.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Specify exact grant/investment tranches (e.g., up to ₹20 Lakhs grant for prototype validation, up to ₹50 Lakhs convertible debenture for market launch under SISFS).
  2. Display a live status indicator (e.g., "Cohort Applications Open" or "Next Call Announced Soon").
  3. Provide downloadable official scheme guidelines and direct call-to-action to the application portal.
  4. Fix all legacy typographical errors ("Bilding", "Workhop", "Toos for PCB Desing").
- **Dependencies:** Signed scheme sanction agreements and guidelines from DPIIT/MeitY.
- **Security or Privacy Implications:** Ensure compliance with central government communication guidelines and official logo usage.
- **Open Questions:** Is the SISFS funding call currently accepting applications, or is it operating on an ad-hoc continuous evaluation model?

---

### FR-PUB-04: Corporate Social Responsibility (CSR) Partnership Hub
- **Description:** Create an authoritative CSR partnership showcase documenting existing collaborations (Capgemini, HDFC Bank Parivartan, ED&F Man Commodities) and inviting corporate sponsors.
- **User or Business Need:** Positions AIC-ADT as an approved, high-impact implementation partner for corporate CSR mandates in agriculture and rural sustainability.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Correctly mounted on canonical URL `/csr/`.
  2. Document verified corporate support programs with verified numbers of startups funded.
  3. Feature a specialized "Partner with Us via CSR" institutional inquiry form.
- **Dependencies:** Written approval from corporate donors to publish their logos and program names.
- **Security or Privacy Implications:** Comply with corporate brand guidelines and mutual non-disclosure clauses regarding exact grant disbursements.
- **Open Questions:** Does AIC-ADT possess an active Section 80G / 12A / CSR-1 registration certificate that should be publicly cited for donor verification?

---

### FR-PUB-05: Verified Mentors Directory
- **Description:** Provide a searchable, categorized directory of approved industry mentors, investors, technical specialists, and intellectual property experts.
- **User or Business Need:** Resolves the existing contradiction where the site claims "69+ Mentors" but displays only 23 unique individuals with initials.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Display verified full names, high-resolution photographs, official corporate titles, areas of expertise, and LinkedIn links.
  2. Enable filtering by domain (e.g., Agronomy, IPR & Patent Law, Food Processing, Venture Finance, Supply Chain).
  3. Include a prominent "Apply as a Mentor" call-to-action.
- **Dependencies:** Empanelment roster and photo assets provided by the Incubation Management team.
- **Security or Privacy Implications:** Mentor personal contact details (phone, email) must remain confidential within the internal administrative system.
- **Open Questions:** Will all 69+ empaneled mentors consent to public web listing, or will a subset be featured?

---

## 2. Content Management System (CMS) & Editorial Workflows

### FR-CMS-01: Multi-Tier Content Workflow (Draft, Review, Approve, Publish, Archive)
- **Description:** Implement a role-based editorial lifecycle preventing direct publishing to production without authorized sign-off.
- **User or Business Need:** Eliminates accidental publishing of dummy theme templates, unverified statistics, or draft event tests.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Content Editors can create and edit content items, transitioning them only to `Pending Review`.
  2. Content Approvers (or Program Managers) can review, reject with comments, or approve content.
  3. Only approved items may be transitioned to `Published` state.
  4. Content can be scheduled for future publication and un-published/archived without hard deletion.
- **Dependencies:** User authentication and RBAC module.
- **Security or Privacy Implications:** Role enforcement must occur on the server side, preventing privilege escalation.
- **Open Questions:** Does minor copy editing require full re-approval by the Approver, or can Editors patch minor typos in published articles?

---

### FR-CMS-02: Content Revision History & Visual Diff Comparison
- **Description:** Maintain an audit trail of every modification to CMS pages and articles, allowing comparisons between revisions.
- **User or Business Need:** Facilitates accountability, enables rollback in case of error, and tracks historical claims.
- **Priority:** **P1**
- **Acceptance Criteria:**
  1. Every save event creates a distinct revision record tagged with editor user ID and timestamp.
  2. Administrators can view side-by-side or inline diffs between revisions.
  3. One-click rollback restores an earlier revision as a new draft.
- **Dependencies:** `FR-CMS-01`.
- **Security or Privacy Implications:** Revision records must be immutable.
- **Open Questions:** What is the retention policy for historical revision logs (e.g., 365 days or perpetual)?

---

## 3. Bilingual Engine (English & Marathi)

### FR-BIL-01: Synchronous Bilingual Routing & Content Association
- **Description:** Deliver complete English and Marathi versions of institutional pages, ensuring that toggling the language maintains the visitor's current page context.
- **User or Business Need:** Overcomes current language silos where Marathi content is confined to isolated event URLs (`/demo/`) with no English parity.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Language switcher prominently accessible in the utility header on desktop and mobile.
  2. Switching from `/about-us` to Marathi toggles to `/mr/about-us` (or localized slug) without resetting the visitor to the homepage.
  3. If a specific page lacks an approved Marathi translation, an accessible banner notifies the user while displaying the English version gracefully.
- **Dependencies:** Approved Marathi translations of foundational site copy.
- **Security or Privacy Implications:** Ensure URL parameters for language switching are sanitized against open redirect vulnerabilities.
- **Open Questions:** Will legal terms and scheme policy documents be translated into Marathi in full or provided as bilingual summaries?

---

### FR-BIL-02: Independent Translation Lifecycle & Editorial Decoupling
- **Description:** Allow English and Marathi versions of a content entity to progress independently through the draft-review-publish lifecycle.
- **User or Business Need:** Prevents a delay in Marathi translation from blocking the immediate release of critical English updates (and vice versa).
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. An English page can be published while its Marathi counterpart remains in `Draft` or `Pending Translation`.
  2. The CMS dashboard displays a translation completeness matrix highlighting missing language variants.
- **Dependencies:** `FR-CMS-01`, `FR-BIL-01`.
- **Security or Privacy Implications:** None.
- **Open Questions:** Who is officially designated to translate technical agri-tech terms into Marathi?

---

## 4. Startup Directory & Portfolio Showcase

### FR-DIR-01: Interactive, Filterable Startup Showcase
- **Description:** Provide a searchable, facet-filtered directory for all startups nurtured by AIC-ADT Baramati Foundation.
- **User or Business Need:** Replaces the current unfilterable 33,000-character plain text list with an engaging, interactive investor-facing portal.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Filter startups by Sector (Agri-Tech, Food Processing, Biotech, Smart Farming, Animal Husbandry, Climate Tech).
  2. Filter startups by Incubation Stage (Pre-Incubation, Incubation, Acceleration, Graduated Alumni).
  3. Instant keyword search across startup legal name, trade name, founder name, and solution keywords.
  4. Display responsive card grid featuring startup logo, entity name, one-sentence elevator pitch, sector badges, and "View Profile" link.
- **Dependencies:** Cleaned, structured database of the 71+ startups.
- **Security or Privacy Implications:** Display only publicly authorized company data; founder personal phone numbers, financial revenue numbers, and valuation metrics must be excluded.
- **Open Questions:** How many of the 71 startups have high-resolution vector or PNG logos ready for immediate deployment?

---

### FR-DIR-02: Detailed Public Startup Profile Pages
- **Description:** Provide individual landing pages for featured startups showcasing their founding team, technology innovation, field impact, awards, and external links.
- **User or Business Need:** Empowers incubated startups with SEO visibility, investor discoverability, and institutional backing.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Profile contains Founder Names, Establishment Year, Headquarters, Problem Statement, Proprietary Innovation, Website URL, Social Links, and Awards.
  2. Includes a "Featured Impact Case Study" section (e.g., GramHeet's 35,000+ farmer reach).
  3. Outbound links open securely with `rel="noopener noreferrer"`.
- **Dependencies:** Written founder consent for published metrics.
- **Security or Privacy Implications:** Explicit founder sign-off required prior to publishing company claims.
- **Open Questions:** Can founders request updates to their public profile through an applicant portal, or is editing strictly administrative?

---

## 5. Incubation Application Portal

### FR-APP-01: Applicant Identity Authentication & Session Security
- **Description:** Provide a secure registration and login system for startup founders utilizing email and password with mobile OTP verification.
- **User or Business Need:** Eliminates unauthenticated, vulnerable form submissions and establishes an authenticated applicant account.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Secure password policy enforcement (minimum 8 characters, uppercase, lowercase, numbers, special characters).
  2. Email verification link and mobile OTP validation during signup.
  3. Secure HTTP-only cookies, anti-CSRF tokens, and rate-limited login endpoints (maximum 5 failed attempts per 15 minutes).
  4. Password reset self-service with expiring, single-use cryptographic tokens.
- **Dependencies:** On-premise mail transfer agent (SMTP) and SMS gateway.
- **Security or Privacy Implications:** High privacy zone. Passwords salted and hashed with Argon2id or bcrypt. Zero plain-text storage.
- **Open Questions:** What SMS gateway provider is approved by ADT Baramati for transactional OTP dispatch within India (e.g., NIC/CDAC or commercial DLT-registered gateway)?

---

### FR-APP-02: Multi-Step Application Intake & Auto-Save Drafts
- **Description:** Implement a structured, multi-step application workflow for Pre-Incubation, Incubation, and Acceleration with automatic draft saving.
- **User or Business Need:** Resolves existing applicant friction where complex multi-field questionnaires lacked draft saving, causing dropped applications.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Logical step progression:
     - Step 1: Founder & Team Background
     - Step 2: Venture Details & Legal Entity (CIN, DPIIT, UDYAM)
     - Step 3: Agri Problem Statement & Innovation Description
     - Step 4: Market Traction & Lab/Infrastructure Requirements
     - Step 5: Document Uploads & Declarations
  2. Automatic draft saving every 30 seconds and upon step transition.
  3. Visual progress indicator displaying percentage of completion.
  4. Correct branding: "AIC-ADT Baramati Foundation" exclusively.
- **Dependencies:** `FR-APP-01`.
- **Security or Privacy Implications:** Drafts are accessible only by the authenticated applicant and system administrators.
- **Open Questions:** Should applicants be permitted to switch programs (e.g., from Pre-Incubation to Incubation) mid-draft without losing common entered fields?

---

### FR-APP-03: Document Uploads & Verification Management
- **Description:** Allow applicants to securely upload pitch decks, certificates of incorporation, DPIIT recognition letters, and patent filings.
- **User or Business Need:** Enables comprehensive evaluative material collection within a single encrypted portal.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Supported file formats restricted to PDF, DOCX, and PPTX with a maximum file size of 20 MB per document.
  2. Files validated on the server side for MIME type, file signature (magic bytes), and scanned for malware prior to storage.
  3. Files stored in an isolated, private on-premise object storage directory with non-predictable UUID keys.
- **Dependencies:** Storage volume allocation in on-premise data center.
- **Security or Privacy Implications:** Critical privacy asset. Uploaded files must never be publicly accessible via predictable URLs. Access restricted to authorized reviewers via short-lived, signed URLs.
- **Open Questions:** What is the maximum anticipated storage volume required for the first year of applicant documents?

---

### FR-APP-04: Formal Application Submission & Immutable Receipt
- **Description:** Provide a final validation, legal declaration, and submission step generating a unique, trackable Application Reference Number (e.g., `AIC-2026-INC-0142`).
- **User or Business Need:** Provides formal institutional acknowledgment and proof of submission for founders.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Pre-submission review screen displaying all entered data and attached documents.
  2. Mandatory acceptance of institutional terms, IP disclosure disclaimers, and data privacy policies.
  3. Instant generation of unique reference number upon submission.
  4. Immediate automated email and SMS acknowledgment sent to applicant.
  5. The submitted record transitions to read-only for the applicant.
- **Dependencies:** `FR-APP-02`, `FR-APP-03`.
- **Security or Privacy Implications:** Once submitted, the application payload becomes immutable; applicants cannot alter entered text post-submission.
- **Open Questions:** Can applicants withdraw a submitted application before review commences?

---

### FR-APP-05: Applicant Dashboard & Status History Tracker
- **Description:** Provide an authenticated dashboard allowing founders to view active applications, past cohort submissions, and current review status.
- **User or Business Need:** Eliminates blind waiting and repetitive phone calls to incubation staff inquiring about application progress.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Displays application status timeline: `Submitted` → `Under Initial Screening` → `Pitch Evaluation Scheduled` → `Committee Review` → `Approved / Not Selected`.
  2. If invited for pitch presentation, displays date, time, venue, and video conference link.
  3. Downloadable PDF copy of the completed application form for founder records.
- **Dependencies:** `FR-APP-04`.
- **Security or Privacy Implications:** Confined strictly to applicant's own account.
- **Open Questions:** Will reviewer written feedback be visible to applicants, or only final stage outcomes?

---

## 6. Application Review & Internal Evaluation System

### FR-REV-01: Reviewer Assignment & Conflict of Interest Declaration
- **Description:** Enable Program Managers to assign submitted applications to internal or external domain experts with mandatory conflict of interest declarations.
- **User or Business Need:** Ensures fair, professional evaluation of proprietary startup innovations by qualified evaluators.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Program Manager can assign one or more Reviewers to any submitted application.
  2. Assigned Reviewer must sign an electronic Non-Disclosure Agreement (NDA) and Conflict of Interest (COI) declaration before unlocking application documents.
  3. If a COI is declared, the application is unassigned and returned to the pool.
- **Dependencies:** `FR-APP-04`, RBAC module.
- **Security or Privacy Implications:** Enforces legal non-disclosure regarding proprietary intellectual property.
- **Open Questions:** What is the standard evaluation turnaround window for assigned reviewers (e.g., 7 or 14 calendar days)?

---

### FR-REV-02: Structured Evaluative Scoring Rubric
- **Description:** Provide an online evaluation rubric with standardized quantitative scoring criteria (1–5 scale) and qualitative feedback fields.
- **User or Business Need:** Replaces unstandardized email notes with an objective institutional scoring matrix.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Standard evaluation dimensions:
     - Innovation & Technology Novelty (Weight: 25%)
     - Agricultural Impact & Farmer Value Proposition (Weight: 25%)
     - Market Feasibility & Scalability (Weight: 20%)
     - Team Capability & Domain Expertise (Weight: 20%)
     - Alignment with AIC-ADT Lab Infrastructure (Weight: 10%)
  2. Weighted composite score calculated automatically.
  3. Qualitative strengths, weaknesses, and recommendation recommendation (Recommend / Defer / Reject).
- **Dependencies:** `FR-REV-01`.
- **Security or Privacy Implications:** Individual reviewer scorecards remain confidential; visible only to Program Managers and Board.
- **Open Questions:** Should reviewer scorecards be editable after submission until cohort review closes?

---

### FR-REV-03: Cohort Batch Management & Triage Matrix
- **Description:** Provide administrative tools to group applications by batch/cohort, filter by composite score, and execute batch status updates.
- **User or Business Need:** Empowers managers to handle cohorts of 100+ applications efficiently before selection committee meetings.
- **Priority:** **P1**
- **Acceptance Criteria:**
  1. Filterable triage matrix displaying Applicant Name, Sector, Total Score, Assigned Reviewers, and Stage.
  2. Bulk stage progression actions (e.g., batch moving top 15 candidates to "Pitch Scheduled").
  3. Secure export of evaluation summary to password-protected spreadsheet.
- **Dependencies:** `FR-REV-02`.
- **Security or Privacy Implications:** Exported files must be logged in the security audit trail.
- **Open Questions:** Who has authorization to execute final approval status changes (Program Manager or CEO exclusively)?

---

## 7. Agri-Tech, Labs & Infrastructure Showcase

### FR-LAB-01: Interactive Facility & Equipment Specifications Showcase
- **Description:** Deliver comprehensive digital showcases for the 5 specialized campus facilities: Fab & Makerspace Lab, NABL Analytical Lab, Food Innovation Lab, Digital Media Lab, and Co-Working Space.
- **User or Business Need:** Educates startups and industry partners on cutting-edge physical capabilities available at Baramati.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Detailed technical specifications for major equipment (e.g., 3D printers, laser cutters, PCB milling, GC-MS, HPLC, spectrophotometers, food packaging lines).
  2. NABL accreditation details displayed prominently with official certificate registration number.
  3. High-resolution campus photographs and facility safety protocols.
- **Dependencies:** Approved technical equipment inventories from Lab Managers.
- **Security or Privacy Implications:** None. Public technical information.
- **Open Questions:** Does management want virtual 360-degree tour integration in Phase 1 or Phase 2?

---

### FR-LAB-02: Structured Lab Service & Facility Inquiry System
- **Description:** Provide specialized inquiry funnels allowing external farmers, students, and businesses to request testing or booking services.
- **User or Business Need:** Facilitates commercial utilization of NABL analytical services and fabrication tools without exposing internal testing databases.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Service request forms capturing Sample Type, Required Tests, Urgency, Organization Details, and Billing Type.
  2. Automated routing of inquiries to the respective Lab Manager email and dashboard.
  3. Downloadable rate cards and sample packaging/shipping instructions.
- **Dependencies:** Approved testing service fee schedules.
- **Security or Privacy Implications:** User submitted data kept secure; no public exposure of commercial test inquiries.
- **Open Questions:** Are testing rate cards public documents or provided upon inquiry only?

---

## 8. Impact Dashboard & Metrics Reporting

### FR-IMP-01: Certified Dated Impact Metrics Dashboard
- **Description:** Render an authoritative visual dashboard displaying verified impact figures with explicit audit dates and data sources.
- **User or Business Need:** Replaces misleading legacy hardcoded `0` counters and unsubstantiated claims with transparent, verifiable institutional data.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Displays primary metrics: Total Startups Incubated, Patents/IP Filed, Empaneled Mentors, External Capital Raised, and Farmers Reached.
  2. Every metric displays an explicit audit timestamp (e.g., *"Audited as of September 30, 2026"*).
  3. Server-side rendered values ensuring immediate screen reader and crawler readability without JavaScript dependency.
  4. Explanatory modal or footnote detailing methodology (e.g., distinguishing DPIIT recognized vs. Pre-Incubated ventures).
- **Dependencies:** Certified figures from CEO and Governing Board.
- **Security or Privacy Implications:** Zero speculative or unverified marketing figures.
- **Open Questions:** What is the frequency of official metric updates (quarterly, semi-annually, or annually)?

---

### FR-IMP-02: Historical Impact Trend Visualizations
- **Description:** Provide interactive visual charts displaying year-over-year ecosystem growth (startups incubated per year, seed funding disbursed, IP growth).
- **User or Business Need:** Demonstrates institutional trajectory and grant stewardship to funding agencies (NITI Aayog, MeitY, CSR partners).
- **Priority:** **P1**
- **Acceptance Criteria:**
  1. Accessible SVG/HTML5 charts with full tabular fallback data tables for screen reader accessibility.
  2. Toggle between different impact parameters (Startups, Grants, Patents).
- **Dependencies:** `FR-IMP-01`.
- **Security or Privacy Implications:** Tabular data must be WCAG 2.1 compliant.
- **Open Questions:** Are historical year-by-year grant disbursement figures cleared for public visual charts?

---

## 9. Events, Workshops & Attendee Management

### FR-EVT-01: Master Event Calendar & Detail Showcase
- **Description:** Deliver an authoritative events directory replacing the rogue `/demo/` and stale `/events/` pages, supporting upcoming workshops, bootcamps, and training sessions.
- **User or Business Need:** Keeps the regional startup and farming community actively engaged with upcoming training opportunities.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Filter events by Status (Upcoming, Ongoing, Past Archive) and Category (Farmer Workshops, Tech Bootcamps, Investor Demo Days).
  2. Event detail pages include Title, Synopsis, Date, Time, Venue, Speakers/Trainers, Eligibility, and Fee (or Free notice).
  3. Bilingual presentation: events can be published in English, Marathi, or both.
- **Dependencies:** Event calendar provided by Incubation Events Manager.
- **Security or Privacy Implications:** None. Public information.
- **Open Questions:** Should past events automatically transition to the "Past Archives" tab based on server system clock?

---

### FR-EVT-02: Event Registration & Attendee RSVP Intake
- **Description:** Provide online registration forms for upcoming workshops capturing attendee details and dispatching confirmation receipts.
- **User or Business Need:** Eliminates reliance on unformatted phone number lists posted on social media and tracks event capacity.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Responsive registration form capturing Attendee Name, Mobile Number, Email, Village/City, and Category (Farmer, Student, Entrepreneur).
  2. Real-time capacity limit enforcement (e.g., "Batch Full — Waitlist Only" when 30 seats are filled).
  3. Instant confirmation email and SMS confirmation containing event date, venue map, and confirmation code.
- **Dependencies:** SMS/Email gateway.
- **Security or Privacy Implications:** Attendee personal data stored securely in internal database; never publicly exposed.
- **Open Questions:** Will attendees receive digital entry QR codes for on-ground scanning at the Baramati campus?

---

### FR-EVT-03: Attendee Management & Roster Export
- **Description:** Provide administrative tools for Program Managers to view real-time registrant lists, mark on-ground attendance, and export rosters.
- **User or Business Need:** Streamlines on-ground workshop operations and training attendance certification reporting.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Internal attendee list searchable by name, mobile, and status.
  2. Single-click CSV export of verified attendee list for printing and reporting.
  3. Ability to dispatch bulk SMS/email reminders 24 hours prior to workshop.
- **Dependencies:** `FR-EVT-02`.
- **Security or Privacy Implications:** Export actions recorded in administrative audit logs.
- **Open Questions:** Who manages attendee certificate issuance post-event?

---

## 10. Reports, Policies & Publications Library

### FR-REP-01: Searchable Public Reports & Policy Archive
- **Description:** Provide a centralized, accessible repository for downloading annual reports, institutional policies, scheme handbooks, and audited impact brochures.
- **User or Business Need:** Replaces current broken `/resources/` page with an authentic institutional transparency and compliance archive.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Document cards display Title, Publication Year, Document Type (Annual Report, Scheme Guideline, Policy, Newsletter), File Format (PDF), and File Size.
  2. Secure downloads served with explicit caching and content-disposition headers.
  3. Search and filter by publication year and category.
- **Dependencies:** Uploaded PDF assets approved by Administration.
- **Security or Privacy Implications:** Documents must be sanitized for metadata prior to publication. Zero confidential internal files may be uploaded to this public bucket.
- **Open Questions:** What is the oldest historical annual report available for public upload (e.g., from 2019 onwards)?

---

## 11. Departmental Contact & Collaboration Forms

### FR-CON-01: Departmental Inquiry Routing & Spam Protection
- **Description:** Implement a unified contact engine routing messages dynamically based on user category (Incubation, Lab Testing, CSR, Careers, General Press).
- **User or Business Need:** Eliminates multiple unmonitored generic forms (`/contact-form-111/`, `/contact-form-333/`) and routes inquiries to responsible officers directly.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. User selects inquiry department from dropdown:
     - Incubation & Startup Queries → Incubation Manager
     - Lab Testing & Equipment → Respective Lab Manager
     - CSR Partnerships → CEO Office
     - Media & General → Front Desk Officer
  2. Integrated privacy-preserving anti-spam mechanism (e.g., cryptographic proof-of-work or invisible honeypot, avoiding intrusive third-party captcha tracking).
  3. Explicit `<label for="...">` markup on all inputs.
  4. Automated email dispatch to internal department inbox with applicant auto-reply receipt.
- **Dependencies:** Mail transport infrastructure.
- **Security or Privacy Implications:** Sanitized form inputs against SQL injection and cross-site scripting (XSS).
- **Open Questions:** Should inquiry history be preserved in the administrative database or strictly forwarded via email?

---

## 12. Role-Based Administration & Audit Logging

### FR-ADM-01: Granular Role-Based Access Control (RBAC)
- **Description:** Implement strict access boundary enforcement separating administrative duties, review functions, content editing, and infrastructure operations.
- **User or Business Need:** Ensures staff members only access records relevant to their specific institutional function.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. System defines nine isolated roles (Public Visitor, Applicant, Reviewer, Program Manager, Content Editor, Content Approver, Impact Data Manager, System Administrator, Data-Center Operator).
  2. Enforced at the API and routing levels; unauthorized attempts return HTTP 403 Forbidden.
- **Dependencies:** Central Authentication Service.
- **Security or Privacy Implications:** Zero horizontal or vertical privilege escalation.
- **Open Questions:** Will internal staff authenticate via existing ADT LDAP/Active Directory or local platform credentials?

---

### FR-ADM-02: Immutable Security & Operational Audit Log
- **Description:** Maintain an append-only audit log recording all administrative logins, content status transitions, applicant score submissions, and user role modifications.
- **User or Business Need:** Provides forensic accountability and satisfies institutional compliance standards.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Logs record: Timestamp (UTC & IST), Actor ID, IP Address, Event Category, Target Object ID, Action Performed, and Outcome.
  2. Audit log records cannot be edited or deleted by any application user, including System Administrators.
  3. Searchable audit log viewer available to authorized System Administrators.
- **Dependencies:** Persistent logging database engine.
- **Security or Privacy Implications:** Audit records must be retained for a minimum of 3 years for regulatory compliance.
- **Open Questions:** Should audit logs be mirrored to an external syslog server in the data center?
