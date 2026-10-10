# Out-of-Scope Specification & Boundary Governance
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Auditor & Scope Roles:** Senior Product Manager, Enterprise Solution Architect  

---

## 1. Executive Summary & Purpose of Scope Boundaries

A primary finding from the Task 1 website audit was severe architectural bloat: the legacy WordPress site was polluted with an active WooCommerce eCommerce shop (`/shop/`, `/cart/`, `/checkout/`), unpurged IT agency demo cases, and dozens of orphaned theme components completely unrelated to an agricultural incubation center.

To ensure architectural integrity, timely Phase 1 delivery, strict security compliance, and data sovereignty in the on-premise data center, this document defines the **explicit boundaries of the digital platform**. Features listed below are strictly excluded from the initial release (Phase 1 / MVP). No implementation work, database schema creation, or third-party integrations for these items may commence without formal written amendment approved by the AIC-ADT Governing Board.

---

## 2. Explicitly Excluded Capabilities (Out-of-Scope for Phase 1)

| Feature / Capability | Exclusion Classification | Institutional & Technical Rationale | Future Considerations |
| :--- | :--- | :--- | :--- |
| **Online Payment Gateways & eCommerce Checkouts** | **Strictly Excluded** | AIC-ADT is a non-profit section 8 incubation foundation supported by central grants; it is not a retail eCommerce store. Introducing payment gateways (Razorpay, CCAvenue) incurs financial ledger reconciliation liabilities, merchant compliance overhead, and PCI-DSS audit burdens unnecessary for program applications. | Incubation agreements or workshop fees will be processed via offline NEFT/RTGS bank tranches. Re-evaluate in Phase 3 if online lab fee checkout is formally mandated. |
| **Farmer Field Datasets & Agronomic Sensor Feeds** | **Strictly Excluded** | The Agricultural Development Trust (ADT) manages extensive agricultural telemetry, Krishi Vigyan Kendra (KVK) field records, and farmer extension datasets on separate isolated institutional systems. Exposing these on the public web platform creates severe privacy, performance, and data contamination risks. | The public site provides service inquiry forms for farmers; it does *not* query internal agricultural extension databases. |
| **Laboratory Information Management Systems (LIMS)** | **Strictly Excluded** | The NABL-accredited Analytical Lab utilizes dedicated, calibrated instruments (GC-MS, HPLC, Spectrophotometry) tied to internal quality assurance workflows. The public website must not connect directly to lab testing machines or internal sample databases. | The platform provides testing rate cards and sample submission request forms; test report generation remains internal to the laboratory staff. |
| **Automated AI/ML Applicant Scoring & Recommendations** | **Strictly Excluded** | Proprietary startup innovations in agriculture require human expert qualitative evaluation. Automated or algorithmic scoring introduces algorithmic bias, risks hallucination, and creates legal exposure under emerging AI governance regulations. | Applications are evaluated exclusively by verified human domain experts using standardized quantitative rubrics (`FR-REV-02`). |
| **Public Unauthenticated Pitch Deck / Financial Access** | **Strictly Excluded** | Confidential founder pitch decks, cap tables, provisional patents, and financial models must never be accessible publicly or indexed by search engines. | Founder files are stored in private, encrypted object storage accessible solely by assigned, NDA-bound reviewers. |
| **Native Mobile App Store Applications (iOS & Android)** | **Strictly Excluded** | Developing native Swift/Kotlin applications multiplies development and data-center backend overhead without operational necessity. The platform’s responsive web architecture delivers complete mobile functionality via standard mobile web browsers. | May be considered in Phase 3 as an offline-first Progressive Web App (PWA) if field extension demands warrant it. |
| **In-App Direct Chat & Social Networking** | **Strictly Excluded** | Building real-time peer-to-peer messaging, founder forums, or chat functionality requires persistent WebSocket infrastructure and introduces content moderation liabilities. | Communication between startups, reviewers, and staff is handled via official institutional email, scheduled video calls, and on-ground Baramati meetings. |
| **Automated Co-Working Desk Access Card IoT Integration** | **Strictly Excluded** | Physical turnstile and RFID access control at the Sharadanagar incubation campus is handled by on-ground security infrastructure. Developing IoT access card provisioning on the web server creates security surface vulnerabilities. | The website presents desk plans and inquiry forms; physical pass issuance remains an on-ground administrative function. |
| **Multi-Tenant Sub-Incubator Franchising** | **Strictly Excluded** | The platform is engineered exclusively for the single institutional mandate of the AIC-ADT Baramati Foundation. Multi-tenant software models serving external incubation centers are out of scope. | Single-tenant architecture with clean institutional branding. |

---

## 3. Strict Data Boundary & Non-Exposure Guarantees

The architecture strictly separates public informational assets from operational and confidential data:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DATA PRIVACY & BOUNDARY MATRIX                        │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ ZONE                          │ GOVERNANCE & ACCESS CONTROL RULES           │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 1. Public Content             │ Open access. Cached at reverse proxy. Zero  │
│    (Pages, Directory, Reports)│ sensitive personally identifiable info.    │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 2. Confidential Applicant Data│ Encrypted at rest. Accessible only by the   │
│    (Pitch decks, financials)  │ applicant and assigned, NDA-bound reviewers.│
│                               │ Zero search engine indexing.                │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 3. Internal Staff Ops         │ Restricted to authorized staff via internal │
│    (Review scores, triage)    │ subnet/VPN. Immutable audit logging.        │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 4. External Organizational    │ HARD BARRIER: No direct database links to   │
│    Data (KVK, LIMS, Farmer DB)│ campus ERP, farmer extension, or lab LIMS.  │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

### Specific Prohibitions:
1. **Zero Exposure of Farmer Personal Records:** No citizen Aadhaar numbers, landholding records (7/12 extracts), or soil health card databases may be queried, stored, or exposed on the web server.
2. **Zero Plaintext Storage of Applicant Credentials:** Passwords, password reset tokens, and SMS verification OTPs must never be stored in plaintext.
3. **Zero Cross-Contamination with Commercial Storefronts:** No WooCommerce, Shopify, or commercial payment dependencies may exist within the codebase or container runtime.

---

## 4. Phase-Wise Roadmap Deferrals

Features evaluated during discovery that have been explicitly deferred to subsequent phases:

### Deferred to Phase 2 (Subsequent Iteration / P1)
- Automated applicant email notifications with customizable template builder.
- Calendar file (`.ics`) download and Google Calendar / Outlook integration for workshops.
- Dynamic visual impact trend charts comparing year-over-year ecosystem growth.
- Batch triage and bulk status progression tools for cohort management.
- Multi-revision visual diff comparison for CMS editors.

### Deferred to Phase 3 (Future Enhancements / P2)
- Offline-first Progressive Web App (PWA) caching for rural field access.
- Startup-to-mentor automated matching recommendation tool based on domain keywords.
- Secure virtual data room (VDR) allowing invited angel investors to view vetted startup pitch decks with non-disclosure tracking.
- Virtual 360-degree interactive campus tour of the specialized laboratories.

---

## 5. Scope Change Control Procedure

To prevent scope creep, ensure predictable delivery, and protect data-center deployment stability, any proposed addition to the platform scope must follow this formal protocol:

1. **Change Request Submission:** The stakeholder submits a written Change Request Form specifying the proposed feature, user justification, and impact on timeline and security.
2. **Technical Feasibility & Security Assessment:** The Enterprise Solution Architect and Data-Center Operator evaluate compute requirements, potential data boundary breaches, and compliance implications.
3. **Governance Gate:** Changes affecting core boundaries (e.g., adding payments, integrating farmer data, or modifying reviewer access) require unanimous written approval from the **CEO (Ms. Jaya Tiwari)** and the **IT & Infrastructure Lead**.
4. **Baseline Freeze:** Upon approval of these Phase 1 Task 2 requirements documents, the scope is officially frozen for sprint implementation.
