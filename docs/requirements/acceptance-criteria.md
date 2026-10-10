# Acceptance Criteria Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Auditor & QA Roles:** Lead QA Architect, Enterprise Product Manager  
**Specification Format:** Structured Verifiable Assertions and Gherkin (Given-When-Then) Scenarios  

---

## 1. Public Institutional Portal & Navigation

### AC-PUB-01: Canonical Information Architecture & Routing Integrity
- **Scenario 1: Main Navigation Traversal**
  - **Given** an unauthenticated visitor accessing any page on the website,
  - **When** the visitor clicks any primary navigation link (Home, About Us, Programs, Schemes, Infrastructure, Startups, Mentors, Events, Reports, Contact),
  - **Then** the browser must navigate to a canonical, active, non-blank destination page containing authentic AIC-ADT content,
  - **And** zero pages may return blank bodies (under 200 bytes) or 404 Not Found errors,
  - **And** the parent navigation item `/programs/` must render a comprehensive overview page comparing the three incubation stages.
- **Scenario 2: Resolution of Legacy Routing Errors**
  - **Given** a visitor clicking the "CSR" link in the global navigation,
  - **When** the navigation completes,
  - **Then** the browser must resolve to `/csr/` (or `/partnerships/csr/`) displaying corporate partnership records,
  - **And** the legacy URL `/careers/` must not be associated with CSR content.
- **Scenario 3: Events Routing Integrity**
  - **Given** a visitor clicking "Events" in the header,
  - **When** the page loads,
  - **Then** the URL must be the canonical `/events/` path,
  - **And** zero traffic may be routed to `/demo/` or `/events/old-events`.

### AC-PUB-02: Leadership & Governance Presentation
- **Scenario 1: Board and Executive Presentation**
  - **Given** a visitor viewing the "Our Team" or "Leadership" page,
  - **When** the page renders,
  - **Then** the Governing Board and Advisory Council must be visually and structurally segregated from the operational executive team,
  - **And** all staff profiles must display verified names, official titles, and approved institutional descriptions,
  - **And** zero profiles may contain legacy theme strings such as "Related Chef" or stock placeholder photos.

---

## 2. Content Management System (CMS) Workflows

### AC-CMS-01: Multi-Tier Editorial Approval Lifecycle
- **Scenario 1: Editor Submits Draft for Approval**
  - **Given** a Content Editor logged into the CMS,
  - **When** the editor creates or edits a web page and clicks "Submit for Review",
  - **Then** the page state must transition from `Draft` to `Pending Review`,
  - **And** the page must NOT be visible to public visitors or published to the live site,
  - **And** Content Approvers must receive an internal dashboard notification of the pending item.
- **Scenario 2: Approver Rejection with Feedback**
  - **Given** a Content Approver inspecting a `Pending Review` article,
  - **When** the approver clicks "Reject" and enters revision comments,
  - **Then** the article state must revert to `Draft`,
  - **And** the editor must see the approver's comments highlighted in their editing dashboard.
- **Scenario 3: Approver Authorizes Live Publishing**
  - **Given** a Content Approver inspecting a `Pending Review` article,
  - **When** the approver clicks "Approve and Publish",
  - **Then** the article state must immediately transition to `Published`,
  - **And** the reverse proxy cache must be invalidated within 5 seconds,
  - **And** the updated article must render publicly on the live site,
  - **And** an immutable log entry tagged `PUBLISH_CONTENT` must be written to the audit log.

---

## 3. Bilingual Engine (English & Marathi)

### AC-BIL-01: Synchronous Route-Preserving Language Switching
- **Scenario 1: Language Switcher Behavior**
  - **Given** a visitor viewing the English page at `/infrastructure/food-innovation-lab`,
  - **When** the visitor clicks the language toggle "मराठी" in the header,
  - **Then** the platform must switch the locale to Marathi and load `/mr/infrastructure/food-innovation-lab` (or localized Marathi route),
  - **And** the visitor must remain on the Food Innovation Lab page (not redirected to the homepage),
  - **And** all interface labels, headings, navigation links, and body content must render in grammatically correct Devanagari script.
- **Scenario 2: Graceful Fallback for Untranslated Pages**
  - **Given** a visitor toggling to Marathi on a page that lacks an approved Marathi translation,
  - **When** the page loads,
  - **Then** the platform must render the English content accompanied by an accessible, polite notice in Marathi: *"या पानाचे मराठी भाषांतर लवकरच उपलब्ध होईल"* (Marathi translation for this page is coming soon).

---

## 4. Startup Directory & Portfolio Showcase

### AC-DIR-01: Search & Multi-Facet Filtering
- **Scenario 1: Filtering by Sector and Stage**
  - **Given** a visitor browsing the Startups directory (`/startups`),
  - **When** the visitor selects the sector filter "Agri-Tech" and stage filter "Incubation",
  - **Then** the card grid must update within 200ms to show only startups matching both criteria,
  - **And** an accurate count of matching results (e.g., *"Showing 14 Agri-Tech Startups"*) must be announced to assistive technologies via an `aria-live` region.
- **Scenario 2: Keyword Search**
  - **Given** a visitor typing "Hydroponics" or "Innosapien" into the search bar,
  - **When** typing reaches 3 characters,
  - **Then** matching startups must filter instantly,
  - **And** matching keywords in titles and descriptions must be visually emphasized.
- **Scenario 3: Public Startup Profile Integrity**
  - **Given** a visitor clicking "View Profile" on any startup card,
  - **When** the profile page loads,
  - **Then** it must display founder names, headquarters, problem statement, technology description, and official website link,
  - **And** all outbound external links must include `rel="noopener noreferrer"`,
  - **And** zero private financial metrics, valuations, or personal phone numbers may be exposed.

---

## 5. Incubation Application Portal

### AC-APP-01: Founder Authentication & Session Security
- **Scenario 1: Registration with Mobile OTP**
  - **Given** a prospective startup founder registering an applicant account,
  - **When** the founder submits their email, mobile number, and password,
  - **Then** the system must dispatch a 6-digit numeric OTP via SMS and an activation link via email,
  - **And** entering the valid OTP activates the account and creates a secure session.
- **Scenario 2: Failed Login Rate-Limiting**
  - **Given** an applicant attempting to log in with an incorrect password,
  - **When** 5 consecutive incorrect attempts occur within 15 minutes,
  - **Then** the account must be temporarily locked for 15 minutes, returning a generic error: *"Too many failed login attempts. Please try again later or reset your password"*.

### AC-APP-02: Multi-Step Application Intake & Auto-Save
- **Scenario 1: Automatic Draft Saving**
  - **Given** an authenticated applicant filling Step 3 (Innovation Description) of the incubation form,
  - **When** the applicant types text and pauses for 30 seconds (or clicks "Next Step"),
  - **Then** an asynchronous background request must save the entered data to the database,
  - **And** a visual indicator must display *"Draft saved at [HH:MM:SS]"*.
- **Scenario 2: Session Restoration Across Devices**
  - **Given** an applicant who saved a draft on desktop,
  - **When** the applicant logs in later on a mobile browser,
  - **Then** the system must restore all previously entered fields and allow resuming from the last completed step.
- **Scenario 3: File Upload Validation**
  - **Given** an applicant uploading a pitch deck on Step 5,
  - **When** the applicant selects a valid PDF file under 20 MB,
  - **Then** the file must upload successfully, display a green checkmark with file size, and store the asset in private object storage,
  - **And** if an applicant selects an invalid file (e.g., `.exe`, `.zip`, or a 25 MB file), the system must reject the upload with an inline error explaining the limitation.

### AC-APP-03: Final Submission & Immutable Receipt
- **Scenario 1: Application Submission**
  - **Given** an applicant completing all required fields and checking mandatory legal declarations,
  - **When** the applicant clicks "Submit Final Application",
  - **Then** the system must generate a unique tracking ID format `AIC-YYYY-[PGM]-[XXXX]` (e.g., `AIC-2026-INC-0084`),
  - **And** the application state must permanently lock to `Submitted` (read-only for applicant),
  - **And** automated confirmation emails and SMS receipts containing the reference number must be dispatched within 60 seconds,
  - **And** the applicant dashboard must reflect the updated status timeline: `Submitted`.

---

## 6. Application Review & Internal Evaluation

### AC-REV-01: Reviewer Conflict of Interest Gate & Scoring Rubric
- **Scenario 1: Mandatory NDA / COI Electronic Gate**
  - **Given** an assigned Reviewer opening application `AIC-2026-INC-0084`,
  - **When** the application screen renders,
  - **Then** all applicant documents and proprietary text must remain blurred or locked behind an electronic modal,
  - **And** the reviewer must explicitly check "I declare no commercial or familial conflict of interest" and agree to institutional NDA terms before documents are unlocked.
- **Scenario 2: Submitting Standardized Evaluation Scores**
  - **Given** a reviewer evaluating an unlocked application,
  - **When** the reviewer completes all 5 scoring dimensions (1 to 5 scale) and qualitative feedback,
  - **Then** the system must calculate the weighted composite score out of 100,
  - **And** upon clicking "Submit Evaluation", the scorecard is permanently saved and locked from further edits,
  - **And** the Program Manager's dashboard reflects that the reviewer has completed evaluation.

---

## 7. Impact Dashboard & Certified Metrics

### AC-IMP-01: Server-Rendered Dated Metrics
- **Scenario 1: Displaying Verified Metrics Without JavaScript Dependency**
  - **Given** a visitor or automated crawler requesting the Homepage or Impact Dashboard,
  - **When** the HTML response is received with JavaScript disabled,
  - **Then** the impact metrics must render actual numerical values directly inside semantic heading tags (e.g., `<h2>71+</h2>`),
  - **And** zero metric counters may display literal `0` as raw HTML text,
  - **And** each metric must display an adjacent audit timestamp (e.g., *"Verified as of September 30, 2026"*).

---

## 8. Events & Attendee Management

### AC-EVT-01: Workshop Registration & Roster Export
- **Scenario 1: Online RSVP Intake with Capacity Throttling**
  - **Given** an upcoming workshop with a maximum seat capacity of 30 attendees,
  - **When** attendee number 30 registers successfully,
  - **Then** the registration form for subsequent visitors must transition to "Waitlist Only" or "Batch Full",
  - **And** the 30 registered attendees must receive automated SMS and email confirmations with their registration code.
- **Scenario 2: Program Manager CSV Export**
  - **Given** a Program Manager viewing the event management console,
  - **When** the manager clicks "Export Attendee Roster (CSV)",
  - **Then** the system must generate a downloadable CSV file containing attendee names, contact details, village/city, and registration timestamps,
  - **And** the download action must be logged in the system security audit trail.

---

## 9. Accessibility (WCAG 2.1 AA Compliance)

### AC-A11Y-01: Form Controls & Accessible Label Associations
- **Scenario 1: Programmatic Label Bindings**
  - **Given** any form across the website (Contact, Pitch Your Idea, Pre-Incubation, Events),
  - **When** inspecting the DOM tree of every `<input>`, `<textarea>`, and `<select>` element,
  - **Then** every control must possess a unique `id` attribute matching the `for` attribute of an adjacent `<label>` element,
  - **And** clicking the text of the `<label>` element must place browser focus into the corresponding input field,
  - **And** screen readers must announce the label text upon focusing the input control.

### AC-A11Y-02: Heading Outline & Hierarchy
- **Scenario 1: Semantic Document Outline**
  - **Given** any public page on the platform,
  - **When** validating heading structure via an automated HTML outline parser,
  - **Then** the page must contain exactly one non-empty `<h1>` element communicating document purpose,
  - **And** all subsequent headings must follow strict descending levels (`<h1>` → `<h2>` → `<h3>`) with zero skipped levels.

### AC-A11Y-03: Keyboard Focus Visibility & Navigation
- **Scenario 1: Tab Navigation and Focus Ring**
  - **Given** a keyboard-only user navigating the platform using the `Tab` key,
  - **When** focusing on any interactive element (links, buttons, inputs, dropdowns),
  - **Then** a high-contrast focus indicator (`:focus-visible` with minimum 2px solid ring and 3:1 contrast against adjacent background) must be distinctly visible,
  - **And** zero elements may have `outline: none` or `outline: 0` without an explicit high-contrast replacement.

---

## 10. Performance, Security & Data-Center Deployment

### AC-SEC-01: SSL & Transport Security Verification
- **Scenario 1: TLS Protocol and Handshake Inspection**
  - **Given** an external connection initiated via cURL or browser to `aicadtbaramatifoundation.org`,
  - **When** inspecting the TLS handshake,
  - **Then** the server certificate must be issued directly to `aicadtbaramatifoundation.org` (eliminating `autoconfig...` default subjects),
  - **And** connections over unencrypted HTTP (port 80) must return an immediate HTTP 301 redirect to HTTPS (port 443),
  - **And** the response header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` must be present.

### AC-SEC-02: Public vs. Private Asset Isolation
- **Scenario 1: Direct File Access Rejection**
  - **Given** an unauthenticated user attempting to access a direct static file path for an applicant pitch deck (e.g., `/uploads/applicants/2026/deck.pdf`),
  - **When** the HTTP request is executed,
  - **Then** the web server must return HTTP 403 Forbidden or HTTP 404 Not Found,
  - **And** files can only be accessed through authenticated proxy endpoints returning short-lived expiring URLs for assigned reviewers.
