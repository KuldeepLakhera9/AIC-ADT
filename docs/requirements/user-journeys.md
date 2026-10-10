# User Journeys & Workflow Specifications
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Auditor & UX Roles:** Senior UX Architect, Enterprise Product Analyst  

---

## 1. Overview & Stakeholder Matrix

This document defines the end-to-end operational workflows and interactive journeys for all nine approved user groups across the AIC-ADT digital platform. Every journey is designed to eliminate cognitive friction, respect strict data security boundaries, and provide complete bilingual accessibility.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PLATFORM ACTOR TAXONOMY                             │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ EXTERNAL ACTORS               │ INTERNAL INSTITUTIONAL ACTORS               │
│ 1. Public Visitor             │ 4. Program Manager                          │
│ 2. Startup Founder / Applicant│ 5. Application Reviewer                     │
│ 3. Industry Mentor / Partner  │ 6. Content Editor                           │
│                               │ 7. Content Approver / Publisher             │
│                               │ 8. Impact Data Manager                      │
│                               │ 9. System Administrator                     │
│                               │ 10. Data-Center Operator                    │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 2. Journey 1: Public Visitor (Farmer, Rural Entrepreneur, Student, Researcher)

### Persona Profile
- **Goal:** Explore specialized lab facilities (e.g., Food Innovation or Soil Testing), discover upcoming training workshops, read startup success stories, and toggle to Marathi effortlessly.
- **Pain Point with Old Site:** Pages in Marathi were hidden at `/demo/`, buttons were unlinked or broken (`href=""`), impact numbers displayed as `0`, and labs had no contact routing.

### Step-by-Step Flow: Discovering a Workshop & Enrolling

```
[Arrive at Homepage]
        │
        ▼
[Toggle to Marathi (मराठी) in Header] ──► URL updates to /mr/ with full Marathi UI
        │
        ▼
[Navigate to Events / कार्यशाळा]
        │
        ▼
[Filter: "कृषी व अन्न प्रक्रिया कार्यशाळा"] ──► Sees "मिलेट्स केक व हेल्दी बेकिंग कार्यशाळा"
        │
        ▼
[Click: तपशील पहा (View Details)]
        │
        ▼
[Review Date, Venue, Trainers, Fees & Available Seats]
        │
        ▼
[Click: नोंदणी करा (Register Now)] ──► Inline Registration Form
        │
        ▼
[Enter Name, Mobile, Village, Category]
        │
        ▼
[Submit with Anti-Spam Verification]
        │
        ▼
[Instant Success Screen with Booking Code] ──► Receives SMS Confirmation in Marathi
```

### Edge Cases & Accessibility Handlers:
- **Batch Full:** If registration capacity is reached, the CTA automatically transitions to an accessible badge *"प्रतीक्षा यादी (Join Waitlist)"* or *"नोंदणी पूर्ण (Batch Full)"*.
- **No JavaScript:** The registration form executes via standard HTTP POST, ensuring full operability on basic mobile browsers without requiring advanced client scripts.

---

## 3. Journey 2: Startup Founder / Applicant

### Persona Profile
- **Goal:** Understand eligibility under the Startup India Seed Fund Scheme (SISFS) or Pre-Incubation, register an account, draft a comprehensive application, attach a pitch deck, submit securely, and track review status.
- **Pain Point with Old Site:** Two confusing form URLs with identical names, branding reading "AIC-DBT Baramati", zero draft saving, and no reference receipt upon submission.

### Step-by-Step Flow: Incubation Application Intake & Tracking

```
[Arrive at Programs / SISFS Page]
        │
        ▼
[Review Tranches, Criteria & Deadlines]
        │
        ▼
[Click: "Apply for Incubation"]
        │
        ▼
[Founder Login / Registration Screen] ──► Enters Email, Phone; verifies mobile OTP
        │
        ▼
[Access Application Workspace (Dashboard)]
        │
        ▼
[Initiate: Pre-Incubation / Incubation Application]
        │
        ▼
┌────────────────────────────────────────────────────────┐
│ MULTI-STEP APPLICATION FORM (Auto-Saves Every 30s)     │
│ Step 1: Founder Details & Co-Founders                  │
│ Step 2: Venture Legal Status (CIN, DPIIT, UDYAM)       │
│ Step 3: Problem Statement & Agri-Tech Novelty          │
│ Step 4: Traction, Revenue & Lab Requirements           │
│ Step 5: Document Uploads (Pitch Deck PDF, CIN Doc)     │
└────────────────────────────────────────────────────────┘
        │
        ▼
[Review & Validation Summary Screen]
        │
        ▼
[Accept Legal Terms, IP Declaration & Non-Disclosure]
        │
        ▼
[Click: "Submit Final Application"]
        │
        ▼
[System Generates Unique ID: AIC-2026-INC-0142]
        │
        ▼
[Application Locks to Read-Only; Confirmation Email & SMS Dispatched]
        │
        ▼
[Founder Logs In Later: Sees Timeline "Under Initial Screening"]
```

### Edge Cases & Handlers:
- **Connection Drops Mid-Draft:** Upon reconnecting, the founder logs in and resumes from the exact saved field without data loss.
- **Invalid File Format:** The upload module strictly rejects files exceeding 20 MB or non-whitelisted formats (e.g., rejecting `.exe` or `.zip`), displaying inline guidance.

---

## 4. Journey 3: Application Reviewer (Domain Expert, Investor, Mentor)

### Persona Profile
- **Goal:** Access assigned startup applications, review pitch decks confidentially, evaluate proposals using the institutional scoring rubric, and submit quantitative scores and qualitative remarks.
- **Pain Point with Old Site:** Reviewers received messy email attachments with zero standardized scoring criteria, raising confidentiality risks.

### Step-by-Step Flow: Confidential Evaluation Workflow

```
[Reviewer Receives Secure Email Notification: "New Application Assigned for Review"]
        │
        ▼
[Clicks Link & Authenticates via 2-Factor Authentication (2FA)]
        │
        ▼
[Reviewer Dashboard: Lists Assigned Applications with Deadlines]
        │
        ▼
[Selects Application: AIC-2026-INC-0142]
        │
        ▼
[Mandatory Gate: Reviewer Signs Electronic NDA & Conflict of Interest Declaration]
        │
        ├─ If Conflict of Interest Declared ──► Application returns to Program Manager; Access Denied
        │
        └─ If No Conflict Declared ──► Unlocks Application Dossier
                │
                ▼
        [Inspects Form Responses & Views Pitch Deck via In-Browser Secure PDF Viewer]
                │
                ▼
        [Fills Evaluative Scoring Rubric: 5 Quantitative Categories (1–5) + Comments]
                │
                ▼
        [Selects Final Recommendation: "Recommend for Committee Pitch" / "Defer" / "Reject"]
                │
                ▼
        [Submits Evaluation Scorecard] ──► Scorecard locked and logged in audit trail
```

### Security & Privacy Enforcements:
- The in-browser viewer suppresses local document printing and right-click saving.
- The reviewer cannot view other reviewers' scores until the entire cohort review window is officially closed.

---

## 5. Journey 4: Program Manager (Incubation Operations Lead)

### Persona Profile
- **Goal:** Oversee cohort application pipelines, triage incoming submissions, assign domain reviewers, review composite scores, schedule committee pitch days, and transition applicants to "Incubated" status.
- **Pain Point with Old Site:** No administrative dashboard; submissions were buried in Contact Form 7 database tables without status history.

### Step-by-Step Flow: Cohort Pipeline Management & Triage

```
[Program Manager Authenticates to Administrative Console]
        │
        ▼
[Navigates to "Incubation Pipeline" -> Cohort 2026-B]
        │
        ▼
[Triage Inbox: Filters Applications by Stage, Score, and Completeness]
        │
        ▼
[Assigns Reviewers: Maps 2 Agronomy & 1 Finance Reviewer to AIC-2026-INC-0142]
        │
        ▼
[Monitors Review Progress: Sees "2 of 3 Reviews Complete"]
        │
        ▼
[All Reviews In: System Computes Weighted Composite Score (e.g., 84.5 / 100)]
        │
        ▼
[Batch Action: Selects Top 12 Startups -> "Transition to Pitch Presentation Scheduled"]
        │
        ▼
[Configures Pitch Schedule: Date, Time, Boardroom / Zoom Link]
        │
        ▼
[Dispatches Automated Batch Notification to Selected Founders]
        │
        ▼
[Exports Verified Cohort Evaluation Summary to Encrypted Spreadsheet for Board Meeting]
```

### Audit & Security Enforcements:
- Every stage transition requires the Program Manager's explicit confirmation and is recorded with timestamp and reason in the audit log.

---

## 6. Journey 5: Content Editor

### Persona Profile
- **Goal:** Draft new institutional articles, add upcoming lab equipment details, create workshop announcement drafts in English and Marathi, and submit them for executive approval.
- **Pain Point with Old Site:** Direct live edits on Elementor templates frequently resulted in broken layouts and unpurged demo blocks.

### Step-by-Step Flow: Creating & Staging a New Lab Equipment Profile

```
[Content Editor Logs In to CMS Workspace]
        │
        ▼
[Navigates to "Labs & Infrastructure" -> "Food Innovation Lab"]
        │
        ▼
[Clicks: "Add New Equipment Profile"]
        │
        ▼
[Fills English Metadata: Title, Manufacturer, Model, Testing Capacity, Technical Specs]
        │
        ▼
[Uploads Sanitized High-Res Equipment Photography with Meaningful Alt Text]
        │
        ▼
[Saves Draft] ──► State: `Draft (English)`
        │
        ▼
[Switches to Marathi Tab -> Translates Copy into Devanagari Script]
        │
        ▼
[Saves Marathi Draft] ──► State: `Draft (Marathi)`
        │
        ▼
[Previews Staged Page via Secure Preview Link (Desktop & Mobile Viewport Emulation)]
        │
        ▼
[Clicks: "Submit for Approval"] ──► State transitions to `Pending Review`; Notification to Approver
```

### Authorization Boundaries:
- The Content Editor possesses zero privileges to publish directly to production. The "Publish" button is hidden/disabled.

---

## 7. Journey 6: Content Approver / Publisher (CEO / Communications Head)

### Persona Profile
- **Goal:** Review content submitted by editors, verify factual accuracy, ensure zero grammatical/branding errors, approve translations, and publish to the live site.
- **Pain Point with Old Site:** Unchecked changes by developers led to "AIC-DBT" typos, "Related Chef" labels, and published retail dummy gear.

### Step-by-Step Flow: Editorial Review, Rejection or Publishing

```
[Approver Logs In -> Navigates to "Editorial Approval Queue"]
        │
        ▼
[Inspects Pending Item: "Food Innovation Lab: Industrial Retort Sterilizer"]
        │
        ▼
[Views Side-by-Side Diff: Compares proposed text against existing live page]
        │
        ▼
[Verifies Content Quality Gate:]
 ├─ Factual verification checked? (Yes)
 ├─ Image alt text accessible? (Yes)
 ├─ Marathi translation accurate? (No - minor spelling error found)
        │
        ▼
[Actions:]
 ├─ Option A (Reject with Comments): Returns Marathi tab to Editor with specific feedback
 │
 └─ Option B (Approve English Only): Approves English version for immediate release;
    Marathi remains in staging until edited
        │
        ▼
[Approver Sets Publish Schedule: "Publish Immediately"]
        │
        ▼
[System Clears Edge Micro-Cache -> New Equipment Profile Goes Live Worldwide]
        │
        ▼
[Audit Log Records: Actor, Action: PUBLISH_CONTENT, Entity ID, Timestamp]
```

---

## 8. Journey 7: Impact Data Manager

### Persona Profile
- **Goal:** Update official ecosystem metrics (Startups Incubated, Patents Filed, Mentors Empaneled, Funds Mobilized) with verifiable audit dates and supporting evidence.
- **Pain Point with Old Site:** Metrics were hardcoded as literal `0` in client-side scripts, completely detached from verified institutional records.

### Step-by-Step Flow: Updating Certified Impact Dashboard Figures

```
[Impact Data Manager Logs In -> Navigates to "Impact Metrics Manager"]
        │
        ▼
[Selects Metric: "Total Patents & IP Registered"]
        │
        ▼
[Current Value: 42 (Audited June 2026)]
        │
        ▼
[Enters New Value: 48 | Enters New Audit Date: September 30, 2026]
        │
        ▼
[Mandatory Gate: Attaches Internal Verification File (IP Master Register PDF / Sign-Off)]
        │
        ▼
[Enters Methodology Note: "Includes 34 Patents, 10 Trademarks, 4 Design Filings"]
        │
        ▼
[Submits Metric Update for Executive Sign-Off]
        │
        ▼
[CEO / Governing Board Member Approves via 1-Click Secure Authorization]
        │
        ▼
[Live Homepage Impact Counter and Dashboard Update Dynamically with New Audit Timestamp]
```

---

## 9. Journey 8: System Administrator

### Persona Profile
- **Goal:** Manage staff user accounts, configure role-based access permissions, monitor security audit logs, review system health alerts, and manage SSL/system settings.
- **Pain Point with Old Site:** No centralized user management; shared WordPress administrative passwords without audit accountability.

### Step-by-Step Flow: Role Provisioning & Audit Log Inspection

```
[System Administrator Logs In via Administrative VPN + 2FA]
        │
        ▼
[Navigates to "User & Access Management"]
        │
        ▼
[Creates Account for New Staff Member: "Avinash Pudale (Technology Manager)"]
        │
        ▼
[Assigns Role: `Program Manager` (Restricted to Incubation & Lab Modules)]
        │
        ▼
[Enforces Password Reset on First Login + Mandatory 2FA Setup]
        │
        ▼
[Navigates to "Security Audit Logs"]
        │
        ▼
[Filters Logs by Event Category: `AUTHENTICATION_FAILURE` and `EXPORT_APPLICANTS`]
        │
        ▼
[Verifies zero unauthorized attempts; exports monthly compliance report for IT Director]
```

---

## 10. Journey 9: Data-Center Operator (On-Premise Infrastructure Lead)

### Persona Profile
- **Goal:** Monitor host virtual machine performance, manage automated local/NAS backups, apply OS security kernel patches, and verify data-center network uptime.
- **Pain Point with Old Site:** Hosted on GoDaddy shared infrastructure without direct host monitoring, enterprise SLAs, or automated disaster recovery protocols.

### Step-by-Step Flow: Routine Maintenance & Automated Backup Verification

```
[Daily 06:00 AM IST: Automated Health Check Script Runs on Host]
        │
        ▼
[Checks Docker Container Status: All 4 containers Healthy (web, app, db, redis)]
        │
        ▼
[Checks Disk Utilization: DB Volume 28%, Uploads Volume 42%, Backup Volume 55%]
        │
        ▼
[Verifies Overnight Backup: Confirms Encrypted Archive Created (02:00 AM IST) & Synced to NAS]
        │
        ▼
[Inspects NGINX SSL Expiration: 52 Days Remaining on Let's Encrypt / Institutional CA]
        │
        ▼
[Prepares for Scheduled Security Patch Window: Off-Peak Sunday 02:00 AM IST]
 ├─ Takes pre-patch VM snapshot on VMware / Proxmox hypervisor
 ├─ Pulls updated hardened base container images
 ├─ Executes zero-downtime rolling restart of container containers
 ├─ Verifies unauthenticated health endpoint /api/health returns HTTP 200 OK
 └─ Confirms production platform fully operational
```
