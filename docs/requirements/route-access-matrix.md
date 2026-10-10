# Route Access Matrix & Security Boundary Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Authors:** Senior Enterprise Architect, Lead Security Engineer  
**Security Standard:** OWASP Top 10, Principle of Least Privilege (PoLP), Zero Trust Ingress  

---

## 1. Route Classification & Security Zones

To enforce strict boundary governance and prevent data leaks, the AIC-ADT platform partitions all network endpoints and application paths into three isolated architectural security zones:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ROUTE SECURITY ZONES                             │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ ZONE 1: PUBLIC INTERNET       │ ZONE 2: APPLICANT PORTAL                    │
│ - Open access to all visitors │ - Authenticated founders only               │
│ - Cached at reverse proxy     │ - Restricted to personal applicant records  │
│ - Zero sensitive/private data │ - Session rate-limiting & anti-CSRF         │
│ Prefix: / and /mr/*           │ Prefix: /portal/*                           │
├───────────────────────────────┴─────────────────────────────────────────────┤
│ ZONE 3: ADMINISTRATIVE & REVIEW CONSOLE                                     │
│ - Restricted strictly to verified institutional staff & empaneled reviewers │
│ - Mandatory Multi-Factor Authentication (TOTP 2FA enforced)                 │
│ - Ingress restricted to campus internal subnet or administrative VPN         │
│ - Immutable audit logging for 100% of state-changing transactions           │
│ Prefix: /admin/* and /api/v1/admin/*                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Route Access Matrix

*Legend for Allowed Roles:*
- `ANON`: Public Unauthenticated Visitor (`ROLE_ANONYMOUS`)
- `APP`: Startup Applicant (`ROLE_APPLICANT`)
- `REV`: Application Reviewer (`ROLE_REVIEWER`)
- `PM`: Program Manager (`ROLE_PROGRAM_MGR`)
- `ED`: Content Editor (`ROLE_CONTENT_EDITOR`)
- `APPV`: Content Approver / Publisher (`ROLE_CONTENT_APPROVER`)
- `IMP`: Impact Data Manager (`ROLE_IMPACT_MGR`)
- `ADM`: System Administrator (`ROLE_SYS_ADMIN`)
- `DCO`: Data-Center Operator (`ROLE_DC_OPERATOR`)

### 2.1. Zone 1: Public Institutional Website Routes

| Route ID | HTTP Method | URL Pattern | Route Name | Access Level | Allowed Roles | Auth Required | Rate Limiting / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `RT-PUB-001` | GET | `/` | Homepage (EN) | Public | All | No | CDN / Reverse-proxy cached (60s) |
| `RT-PUB-002` | GET | `/mr` | Homepage (MR) | Public | All | No | CDN / Reverse-proxy cached (60s) |
| `RT-PUB-003` | GET | `/about` | Institutional Overview | Public | All | No | Cached (300s) |
| `RT-PUB-004` | GET | `/about/mission-vision` | Mission & Vision | Public | All | No | Cached (300s) |
| `RT-PUB-005` | GET | `/about/leadership` | Leadership & Team | Public | All | No | Cached (300s) |
| `RT-PUB-006` | GET | `/about/infrastructure` | Campus Infrastructure | Public | All | No | Cached (300s) |
| `RT-PUB-007` | GET | `/about/infrastructure/:lab`| Specialized Lab Profile | Public | All | No | Cached (300s) |
| `RT-PUB-008` | GET | `/about/partners` | Institutional Partners | Public | All | No | Cached (300s) |
| `RT-PUB-009` | GET | `/programs` | Programs Continuum | Public | All | No | Cached (300s) |
| `RT-PUB-010` | GET | `/programs/:program` | Program Detail (Pre-Inc/Inc/Acc)| Public | All | No | Cached (300s) |
| `RT-PUB-011` | GET | `/programs/schemes/:scheme`| Scheme Page (SISFS/MeitY/CSR) | Public | All | No | Cached (300s) |
| `RT-PUB-012` | GET | `/programs/mentorship` | Mentors Directory | Public | All | No | Cached (300s) |
| `RT-PUB-013` | GET | `/programs/apply-instructions`| How to Apply & FAQ | Public | All | No | Cached (300s) |
| `RT-PUB-014` | GET | `/startups` | Startup Directory Search | Public | All | No | Client-side filterable / 60 req/min |
| `RT-PUB-015` | GET | `/startups/:slug` | Public Startup Profile | Public | All | No | Cached (300s) |
| `RT-PUB-016` | GET | `/startups/success-stories` | Impact Success Stories | Public | All | No | Cached (300s) |
| `RT-PUB-017` | GET | `/innovation` | Innovation Focus Overview | Public | All | No | Cached (300s) |
| `RT-PUB-018` | GET | `/innovation/:domain` | Agri-Tech Domain Profile | Public | All | No | Cached (300s) |
| `RT-PUB-019` | GET | `/impact` | Certified Impact Dashboard| Public | All | No | Cached (300s) |
| `RT-PUB-020` | GET | `/impact/periods` | Historical Reporting Periods| Public | All | No | Cached (300s) |
| `RT-PUB-021` | GET | `/events` | Master Event Calendar | Public | All | No | Cached (60s) |
| `RT-PUB-022` | GET | `/events/:slug` | Event Detail Page | Public | All | No | Cached (60s) |
| `RT-PUB-023` | GET/POST | `/events/:slug/register` | Event RSVP Intake | Public | All | No | 5 submissions / IP / 10 min |
| `RT-PUB-024` | GET | `/events/past` | Concluded Event Archives | Public | All | No | Cached (300s) |
| `RT-PUB-025` | GET | `/resources/annual-reports`| Annual Reports Archive | Public | All | No | Cached (300s) |
| `RT-PUB-026` | GET | `/resources/publications` | Research Publications | Public | All | No | Cached (300s) |
| `RT-PUB-027` | GET | `/resources/program-guidelines`| Scheme Guidelines Archive | Public | All | No | Cached (300s) |
| `RT-PUB-028` | GET/POST | `/contact` | Departmental Inquiries | Public | All | No | 5 submissions / IP / 10 min + Honeypot |
| `RT-PUB-029` | GET | `/mr/*` | Marathi Mirrored Routes | Public | All | No | Symmetrical caching to English paths |

---

### 2.2. Zone 2: Applicant Portal Routes (`/portal/...`)

| Route ID | HTTP Method | URL Pattern | Route Name | Access Level | Allowed Roles | Auth Required | Rate Limiting / Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `RT-APP-001` | GET/POST | `/portal/login` | Applicant Sign-In | Public Intake | ANON | No | 5 attempts / IP / 15 min |
| `RT-APP-002` | GET/POST | `/portal/register` | Founder Account Signup | Public Intake | ANON | No | Mobile OTP verification enforced |
| `RT-APP-003` | GET/POST | `/portal/forgot-password` | Password Reset Request | Public Intake | ANON | No | Expiring cryptographic token |
| `RT-APP-004` | GET | `/portal/dashboard` | Applicant Main Dashboard | Authenticated | APP | **Yes** | Session timeout: 30 minutes |
| `RT-APP-005` | GET | `/portal/applications` | Founder Submission History | Authenticated | APP | **Yes** | Displays only personal applications |
| `RT-APP-006` | GET/POST | `/portal/applications/new` | Start New Application | Authenticated | APP | **Yes** | Restricts to 1 active draft per cohort |
| `RT-APP-007` | GET/PUT | `/portal/applications/:id/edit`| Multi-Step Form Editor | Authenticated | APP | **Yes** | Auto-save API: max 2 calls/min |
| `RT-APP-008` | POST | `/api/v1/portal/upload` | Pitch Deck / Doc Uploader | Authenticated | APP | **Yes** | PDF/PPTX/DOCX ≤ 20 MB; Magic byte scan |
| `RT-APP-009` | POST | `/portal/applications/:id/submit`| Final Submission Gate | Authenticated | APP | **Yes** | Generates tracking ID; locks form |
| `RT-APP-010` | GET | `/portal/applications/:id/view`| Read-Only Form Viewer | Authenticated | APP | **Yes** | Restricted strictly to author |
| `RT-APP-011` | GET | `/portal/applications/:id/pdf` | Export Application PDF | Authenticated | APP | **Yes** | Watermarked encrypted PDF stream |

---

### 2.3. Zone 3: Administrative & Evaluation Console Routes (`/admin/...`)

| Route ID | HTTP Method | URL Pattern | Route Name | Access Level | Allowed Roles | Auth Required | Security & Ingress Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `RT-ADM-001` | GET/POST | `/admin/login` | Staff 2FA Login | Public Gate | Staff Roles | No | Campus Subnet / VPN + TOTP 2FA |
| `RT-ADM-002` | GET | `/admin/dashboard` | Adaptive Command Center | Authenticated | Staff Roles | **Yes (2FA)** | Renders view based on role |
| `RT-ADM-003` | GET | `/admin/evaluations` | Reviewer Assigned Queue | Role-Restricted| REV | **Yes (2FA)** | Lists assigned applications only |
| `RT-ADM-004` | POST | `/admin/evaluations/:id/nda` | Digital NDA & COI Gate | Role-Restricted| REV | **Yes (2FA)** | Mandatory before unlocking dossier |
| `RT-ADM-005` | GET | `/admin/evaluations/:id/dossier`| Application Dossier | Role-Restricted| REV, PM, ADM | **Yes (2FA)** | In-browser viewer (Print/Copy disabled)|
| `RT-ADM-006` | POST | `/admin/evaluations/:id/score` | Submit Evaluation Scorecard| Role-Restricted| REV | **Yes (2FA)** | 5-dimension weighted rubric; locked post-save |
| `RT-ADM-007` | GET | `/admin/pipeline` | Incubation Pipeline Triage | Role-Restricted| PM, ADM | **Yes (2FA)** | Cohort filterable triage matrix |
| `RT-ADM-008` | POST | `/admin/pipeline/assign` | Assign Reviewers | Role-Restricted| PM, ADM | **Yes (2FA)** | Maps reviewers to applications |
| `RT-ADM-009` | POST | `/admin/pipeline/stage` | Update Application Stage | Role-Restricted| PM, ADM | **Yes (2FA)** | Transitions stage (e.g. to Pitch Scheduled)|
| `RT-ADM-010` | GET | `/admin/pipeline/export` | Export Evaluation CSV | Role-Restricted| PM, ADM | **Yes (2FA)** | Export logged in immutable audit trail |
| `RT-ADM-011` | GET/POST | `/admin/cms/pages` | CMS Page Manager | Role-Restricted| ED, APPV, ADM| **Yes (2FA)** | Draft / Edit English & Marathi copy |
| `RT-ADM-012` | GET | `/admin/cms/pages/:id/preview` | Staged Preview Viewer | Role-Restricted| ED, APPV, ADM| **Yes (2FA)** | Viewport emulation (Desktop / Mobile) |
| `RT-ADM-013` | GET | `/admin/approvals` | Publishing Queue | Role-Restricted| APPV, ADM | **Yes (2FA)** | Side-by-side revision diff viewer |
| `RT-ADM-014` | POST | `/admin/approvals/:id/publish` | Authorize Live Publishing | Role-Restricted| APPV, ADM | **Yes (2FA)** | Clears cache; logs `PUBLISH_CONTENT` |
| `RT-ADM-015` | GET/POST | `/admin/impact` | Impact Metrics Manager | Role-Restricted| IMP, APPV, ADM| **Yes (2FA)** | Draft metric updates with proof upload |
| `RT-ADM-016` | POST | `/admin/impact/:id/approve` | Authorize Live Metric | Role-Restricted| APPV, ADM | **Yes (2FA)** | CEO / Board digital sign-off |
| `RT-ADM-017` | GET/POST | `/admin/events` | Event Management Console | Role-Restricted| PM, ED, ADM | **Yes (2FA)** | Create workshops & configure seats |
| `RT-ADM-018` | GET | `/admin/events/:id/attendees` | Attendee Roster | Role-Restricted| PM, ADM | **Yes (2FA)** | Attendee list & attendance marking |
| `RT-ADM-019` | GET | `/admin/events/:id/export` | Export Attendee CSV | Role-Restricted| PM, ADM | **Yes (2FA)** | Download attendee roster for printing |
| `RT-ADM-020` | GET/POST | `/admin/startups` | Startup Directory Curation| Role-Restricted| PM, ED, ADM | **Yes (2FA)** | Manage public startup cards & logos |
| `RT-ADM-021` | GET/POST | `/admin/publications` | Reports & Guidelines Upload| Role-Restricted| ED, APPV, ADM| **Yes (2FA)** | PDF uploads with metadata sanitization |
| `RT-ADM-022` | GET/POST | `/admin/users` | Staff Account Provisioning | Role-Restricted| ADM | **Yes (2FA)** | User creation & RBAC role assignment |
| `RT-ADM-023` | GET | `/admin/audit-logs` | Security Audit Log Viewer | Role-Restricted| ADM | **Yes (2FA)** | Append-only, read-only audit log query |
| `RT-ADM-024` | GET | `/admin/system-health` | Data-Center Infrastructure | Role-Restricted| ADM, DCO | **Yes (2FA)** | CPU, RAM, disk, and container health |

---

## 3. Session, Ingress & Security Constraints Summary

1. **VPN & Campus Subnet Boundary:**
   - Routes prefixed with `/admin/*` are shielded by the perimeter firewall and reverse proxy. Access is permitted exclusively from the internal Baramati campus management VLAN (`10.x.x.x`) or authenticated staff VPN. Direct public WAN access to `/admin` returns `HTTP 403 Forbidden`.
2. **Multi-Factor Authentication (MFA):**
   - 100% of internal administrative routes require active session validation with TOTP 2FA. Session tokens expire after **15 minutes of inactivity**.
3. **Applicant Portal Rate-Limiting:**
   - Authentication routes (`/portal/login`, `/portal/register`) enforce IP-based rate-limiting: maximum 5 attempts per 15 minutes.
   - Form auto-save endpoints (`/portal/applications/:id/edit`) allow a maximum of 2 requests per minute per authenticated user to prevent database connection pool saturation.
4. **Document Proxy Security:**
   - Applicant uploaded pitch decks and financial documents are never served directly via static NGINX file paths. File requests pass through authenticated controller `RT-ADM-005` which validates that the requester possesses active reviewer assignment before streaming the byte payload with strict watermarking headers.
