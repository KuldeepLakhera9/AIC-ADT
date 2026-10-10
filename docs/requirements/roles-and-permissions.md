# Roles & Permissions Specification (RBAC)
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Auditor & Security Roles:** Enterprise Solution Architect, Security & Governance Consultant  

---

## 1. Principles of Access Control & Governance

In strict accordance with enterprise data protection, the Principle of Least Privilege (PoLP), and the Indian Digital Personal Data Protection (DPDP) Act guidelines, the platform enforces strict boundary controls:
1. **Zero Implicit Staff Trust:** Being an AIC-ADT staff member does *not* grant global access to confidential applicant records, financial data, or administrative system configurations.
2. **Segregation of Duties (SoD):** The person who drafts content (Content Editor) cannot approve or publish it. The person who evaluates applications (Reviewer) cannot alter cohort selection stages or view competing reviewers' scorecards before review closure.
3. **Immutability of Audit Trails:** No role—including the System Administrator—can delete or tamper with system security audit logs.
4. **Data Isolation:** Confidential applicant pitch decks and proprietary intellectual property are strictly segregated from public website assets and database tables.

---

## 2. Platform Roles Taxonomy

| Role Identifier | Role Title | Institutional User Group | Primary Responsibility & Boundary Scope |
| :--- | :--- | :--- | :--- |
| `ROLE_ANONYMOUS` | **Public Visitor** | Farmers, Entrepreneurs, Students, Investors, Public | Read-only access to published public web pages, events calendar, public startup directory, and reports. Can submit unauthenticated contact inquiries. |
| `ROLE_APPLICANT` | **Startup Founder / Applicant** | Founders applying for Incubation / Pre-Incubation / SISFS | Manages own profile, creates and auto-saves application drafts, uploads proprietary pitch decks, submits final forms, and monitors personal application status history. Zero access to other applicants' data. |
| `ROLE_REVIEWER` | **Application Reviewer** | Empaneled Mentors, External Investors, Technical Evaluators | Confidentially reviews specifically assigned startup applications. Signs digital NDAs/COI declarations, inspects pitch decks, and submits evaluation scores. Zero access to unassigned applications, CMS, or system controls. |
| `ROLE_PROGRAM_MGR` | **Program Manager** | Incubation Managers (e.g., Ms. Sonali Saste, Mr. Abhishek Gite) | Triages cohort applications, assigns reviewers, schedules pitch presentations, manages event attendee lists, and reviews startup directory submissions. Cannot alter system code, user roles, or server settings. |
| `ROLE_CONTENT_EDITOR` | **Content Editor** | Communications Staff, Lab Managers (Equipment copy) | Drafts and edits English and Marathi web pages, articles, lab profiles, and event announcements. Cannot publish directly to production. |
| `ROLE_CONTENT_APPROVER`| **Content Approver / Publisher**| CEO (Ms. Jaya Tiwari), Communications Head | Reviews pending drafts, verifies factual claims and translations, approves or rejects copy, schedules and publishes live pages. Cannot view confidential applicant scorecards. |
| `ROLE_IMPACT_MGR` | **Impact Data Manager** | Ecosystem & Monitoring Lead (Mr. Avinash Pudale) | Updates dated impact figures (startups, patents, mentors) with mandatory audit verification documents. Metric changes require executive sign-off before rendering live. |
| `ROLE_SYS_ADMIN` | **System Administrator** | Web & System Manager (Mr. Ravi Londhe), IT Lead | Manages staff user accounts, provisions roles, configures SMTP/SMS gateways, monitors security audit logs, and oversees platform health. Restricted from evaluating applicant scores or altering submitted founder files. |
| `ROLE_DC_OPERATOR` | **Data-Center Operator** | ADT Campus Data-Center Engineers | Manages host VM OS, hypervisor virtualization, container engines, storage allocations, daily backup execution, and physical network firewalls. Operates at the infrastructure layer; zero direct database or business application access. |

---

## 3. Comprehensive Permissions Matrix

*Legend: **C** = Create, **R** = Read, **U** = Update, **D** = Delete, **A** = Approve/Publish, **X** = Execute/Assign, **—** = Denied (No Access).*

| Functional Entity / Module | Public Visitor | Applicant | Reviewer | Program Manager | Content Editor | Content Approver | Impact Manager | System Admin | DC Operator |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Published Public Pages** | R | R | R | R | R | R | R | R | R |
| **Draft CMS Pages & Articles** | — | — | — | R | C / R / U | C / R / U / A | — | R | — |
| **Marathi Translations** | R (Pub) | R (Pub) | R (Pub) | R | C / R / U | C / R / U / A | — | R | — |
| **Published Startup Directory** | R | R | R | R | R | R | R | R | — |
| **Confidential Applicant Drafts** | — | C / R / U (Own)| — | — | — | — | — | — | — |
| **Submitted Applications (Full Dossier)**| — | R (Own only)| R (Assigned)| R / U | — | — | — | R (Audit) | — |
| **Proprietary Pitch Decks & Files**| — | C / R (Own)| R (Assigned)| R | — | — | — | R (Audit) | — |
| **Reviewer Assignments** | — | — | — | C / R / X | — | — | — | — | — |
| **Evaluation Scoring Rubrics** | — | — | C / R / U (Own)| R (All Cohort)| — | — | — | R (Audit) | — |
| **Cohort Status Transitions** | — | — | — | U / X | — | — | — | — | — |
| **Approved Impact Metrics** | R | R | R | R | R | R | R | R | — |
| **Draft Impact Metric Updates** | — | — | — | — | — | R / A | C / R / U | R | — |
| **Event Listings (Public)** | R | R | R | R | R | R | R | R | — |
| **Event Registrations / RSVPs** | C (RSVP) | C (RSVP) | C (RSVP) | C / R / U / D | — | — | — | R | — |
| **Attendee Rosters & CSV Export** | — | — | — | R / X | — | — | — | R / X | — |
| **Reports & Public Documents** | R | R | R | R | C / R / U | C / R / U / A | — | R | — |
| **Public Contact Inquiries** | C | C | C | R / U (Dept) | — | — | — | R | — |
| **Staff User Account Provisioning**| — | — | — | — | — | — | — | C / R / U / D | — |
| **Role Assignment & RBAC Settings**| — | — | — | — | — | — | — | C / R / U | — |
| **Security Audit Logs** | — | — | — | — | — | — | — | R (Read-Only)| — |
| **Host OS, Docker & Backup Infrastructure**| — | — | — | — | — | — | — | — | C / R / U / D |

---

## 4. Segregation of Duties (SoD) Enforcements

To eliminate institutional fraud, reputational risk, and administrative errors, the platform code enforces the following programmatic rules:

1. **Editorial SoD Rule:**
   - A user possessing `ROLE_CONTENT_EDITOR` cannot self-approve content. If a user is assigned both `ROLE_CONTENT_EDITOR` and `ROLE_CONTENT_APPROVER`, the system blocks self-approval: an item created or edited by User A must be approved by an independent User B.
2. **Applicant Evaluation SoD Rule:**
   - `ROLE_REVIEWER` users can never access reviewer assignment controls or modify cohort status.
   - Program Managers cannot submit evaluation scores on behalf of assigned reviewers.
3. **Impact Verification SoD Rule:**
   - An impact metric updated by the Impact Data Manager cannot become live until the digital verification signature of the CEO or Board Member is recorded in the system.
4. **Audit Immutability Rule:**
   - The System Administrator can view audit logs but has zero database permissions to modify, truncate, or delete records in the `audit_logs` table.

---

## 5. Authentication, Session Security & Credential Governance

### 5.1. Authentication Standards by Role

| User Group / Role | Authentication Factor 1 | Authentication Factor 2 (MFA) | Session Inactivity Timeout | Maximum Concurrent Sessions |
| :--- | :--- | :--- | :--- | :--- |
| **Public Visitor** | None (Unauthenticated) | None | N/A | Unlimited |
| **Startup Applicant** | Email + Strong Password | Mobile SMS OTP during signup/reset | 30 minutes | 2 devices |
| **Internal Staff & Reviewers** (`REVIEWER`, `PROGRAM_MGR`, `CONTENT_EDITOR`, `CONTENT_APPROVER`, `IMPACT_MGR`) | Corporate Email + Strong Password | Mandatory TOTP Authenticator App (Google Authenticator / MS Authenticator) | 15 minutes | 1 active session |
| **System Administrator** | Admin Email + 16+ Char Complex Password | Mandatory Hardware Security Key (FIDO2/WebAuthn) or TOTP App | 10 minutes | 1 active session (Restricted to Campus Subnet / VPN) |
| **Data-Center Operator** | SSH Public Key (ED25519) + Passphrase | Bastion Host 2FA | 15 minutes | 1 active SSH session |

### 5.2. Credential Security Rules
- **Password Complexity:** Minimum 8 characters for applicants; minimum 14 characters for internal staff and administrators. Must include uppercase, lowercase, numbers, and symbols.
- **Account Lockout Policy:** 5 consecutive failed login attempts locks the account for 15 minutes. Automatic unlock requires email re-verification or administrator override.
- **Session Revocation:** Changing a password, modifying roles, or detecting a suspicious user-agent change instantly terminates all active session tokens globally.
- **Cookies & Storage:** Session identifiers stored in encrypted, HTTP-only, `SameSite=Strict`, `Secure` cookies. Zero session tokens stored in browser `localStorage`.
