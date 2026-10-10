# Product Requirements Document (PRD)
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Authors:** Senior Product Manager, Enterprise Solution Architect  
**Target Organization:** AIC-ADT Baramati Foundation (Atal Incubation Centre, Supported by AIM, NITI Aayog; Hosted by Agricultural Development Trust, Baramati)  

---

## 1. Executive Summary & Strategic Context

The **AIC-ADT Baramati Foundation** is an institutional anchor for agricultural technology innovation, rural entrepreneurship, biotechnology, food processing, and sustainable allied agricultural ventures across India. As documented in the Phase 1, Task 1 baseline audit (`docs/audit/existing-website-audit.md`), the current digital presence suffers from severe structural debt: over 75 orphaned commercial theme demo pages, unpurged WooCommerce dummy retail shops, mismatched navigation paths (e.g., "CSR" leading to `/careers/`, "Events" pointing to `/demo/`), duplicate blank parent pages, unencrypted external HTTP media references, and critical branding misnomers ("AIC-DBT Baramati" on intake forms).

This Product Requirements Document defines the enterprise blueprint for a completely new, secure, resilient, and accessible digital platform. The new platform must project:
1. **Institutional Credibility:** Reflecting the prestige of NITI Aayog's Atal Innovation Mission and the 50+ year legacy of the Agricultural Development Trust (ADT).
2. **Technological Excellence:** Demonstrating cutting-edge technical leadership through an innovation showcase, interactive startup directory, and modern digital applicant workflows.
3. **Agricultural Relevance & Community Trust:** Providing accessible, bilingual (English and Marathi) digital pathways for rural innovators, grassroots farmers, women entrepreneurs, and agri-researchers.
4. **Data Sovereignty & On-Premise Security:** Ensuring zero reliance on shared commercial hosting by deploying on the organization’s dedicated, secure data-center infrastructure with strict role-based access control (RBAC).

---

## 2. Product Vision & Value Proposition

### 2.1. Product Vision Statement
To establish an authoritative, world-class, and accessible digital gateway for the AIC-ADT Baramati Foundation that accelerates agricultural transformation, connects early-stage agri-innovators to vital institutional resources, transparently showcases verified ecosystem impact, and delivers a frictionless, bilingual incubation journey from ideation to scale.

### 2.2. Value Proposition by Audience

| Stakeholder Group | Current Pain Point | New Platform Value Proposition |
| :--- | :--- | :--- |
| **Startup Founders & Applicants** | Fragmented, duplicate form URLs, lack of draft saving, confusing "AIC-DBT" branding, zero visibility into application review status. | Unified, secure applicant portal with draft saving, pitch deck upload, document tracking, status history, and instant confirmation receipts. |
| **Public, Farmers & Rural Innovators** | Incomplete Marathi translations, isolated demo pages, hardcoded zero metrics, no knowledge base. | Accessible, responsive, bilingual interface (English/Marathi) with real-world lab capabilities, event enrollment, and downloadable guides. |
| **Institutional Partners & Investors** | Unsearchable 33,000-character plain text startup list, broken CTAs, missing mentor credentials, no compliance archive. | Interactive, filterable startup directory, verified mentor profiles with LinkedIn integration, and official annual report library. |
| **Program Managers & Reviewers** | Inquiries scattered across unmonitored mailboxes and raw Contact Form 7 database entries without audit trails. | Streamlined administrative dashboard with role-based evaluation scoring, cohort lifecycle management, and exportable data sheets. |
| **Leadership & Governing Board** | Reputational risk from dummy ecommerce gear, unverified figures, and broken external links. | Rigorous draft-review-approval-publishing CMS governance, certified dated impact metrics, and complete data privacy. |

---

## 3. Scope Boundaries & Information Architecture Segregation

In strict compliance with institutional data governance, the platform establishes four isolated architectural and security zones:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            AIC-ADT DIGITAL PLATFORM                         │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ ZONE 1: PUBLIC PORTAL         │ ZONE 2: CONFIDENTIAL APPLICANT REPOSITORY    │
│ - Public Institutional CMS    │ - Applicant Profiles & Auth Credentials     │
│ - Filterable Startup Directory│ - Pitch Decks, Financials, IPR Disclosures  │
│ - Impact Dashboard (Approved) │ - Reviewer Scores & Evaluation Comments     │
│ - Event Discovery & RSVP      │ - Stage Progression History & Review Audit  │
│ - Publications & Lab Profiles │ [STRICT RBAC: Access restricted to assigned]│
│ [OPEN ACCESS: Cached CDN/Web] │ [reviewers, managers, and applicant only   ]│
├───────────────────────────────┼─────────────────────────────────────────────┤
│ ZONE 3: INTERNAL OPS & CMS    │ ZONE 4: EXTERNAL / OUT-OF-SCOPE SYSTEMS     │
│ - Draft Content Workspace     │ - Core ERP / ADT HR Systems (External)      │
│ - Review & Approval Queue     │ - Regional Farmer IoT Data Lakes (Separate) │
│ - Security Audit Logs         │ - NABL Lab LIMS System (Isolated)           │
│ - Role & User Management      │ - Online Payment Gateway / Financial Ledgers│
│ [RESTRICTED: Intranet/VPN/2FA]│ [HARD BOUNDARY: Zero direct DB connections  ]│
└───────────────────────────────┴─────────────────────────────────────────────┘
```

### Boundary Safeguards:
1. **Public vs. Confidential Applicant Data:** The public startup directory displays *only* startups formally designated as "Graduated" or "Active Incubatee" whose public profiles have been explicitly authorized by the founder and approved by the Program Manager. Applicant drafts, submitted pitch decks, company financial projections, and reviewer scores are stored in encrypted object storage and are inaccessible to public queries or search engines.
2. **Internal Operations vs. External Datasets:** The platform does *not* host raw farmer databases, agronomic field-level sensor feeds, or live NABL laboratory information management systems (LIMS). Testing inquiries and lab booking forms submit structured service requests; they do not expose internal testing databases.
3. **Exclusion of eCommerce & Payments:** All commerce mechanisms, cart models, checkout funnels, and payment gateways are strictly excluded. Incubation application fees (if ever introduced) or workshop fees will remain manual/institutional bank tranches out of scope for this release.

---

## 4. High-Level Feature Inventory

The target digital platform comprises 13 core functional subsystems:

1. **Public Institutional Portal:** Authorized narratives for About Us, ADT Legacy, AIM (NITI Aayog) Partnership, Leadership, and Infrastructure.
2. **Draft-Review-Publish CMS:** Multi-tier workflow ensuring that no content goes live without authorized approval.
3. **Bilingual Engine (English & Marathi):** High-fidelity bilingual architecture with synchronous route mapping and translation workflows.
4. **Filterable Startup Showcase:** Interactive search and multi-facet filtering (Sector, Stage, Cohort, SDGs) for all incubated startups.
5. **Incubation Application Portal:** Secure applicant authentication, draft saving, structured multi-step forms, document uploads, and tracking.
6. **Application Review & Evaluation System:** Internal scoring rubrics, reviewer assignments, and stage transition audit logs.
7. **Agri-Tech & Lab Infrastructure Showcase:** Comprehensive facility guides (FabLab, NABL Analytical Lab, Food Innovation Lab, Digital Media Lab, Co-Working).
8. **Dated Impact Dashboard:** Authoritative visual metrics displaying verifiable numbers, last-audited dates, and validation footnotes.
9. **Events & Workshop Management:** Calendar, registration funnels, attendee management, ticket/badge generation, and CSV attendee exports.
10. **Reports & Publications Repository:** Secure document library for downloadable annual reports, scheme guidelines, and research papers.
11. **Institutional Contact & Inquiry Engine:** Department-specific inquiry routing (Incubation, Lab Services, CSR, Press) with anti-spam protections.
12. **Role-Based Administration & Audit Logging:** Granular role definitions with immutable audit logs recording all data modifications.
13. **Enterprise On-Premise Deployment Architecture:** Hardened containerized infrastructure optimized for the organization's dedicated data center.

---

## 5. Visual Identity & Usability Principles

- **Green-Led Institutional Identity:** Deep agricultural greens (Forest Green, Emerald, Olive Accents) harmonized with clean crisp neutrals (Slate Grey, Warm White) and subtle technological blues/golds.
- **Modern Typography & Hierarchy:** Clean, highly readable typefaces (e.g., Inter / Outfit for English, Noto Sans Devanagari / Mukta for Marathi) ensuring consistent optical weight across scripts.
- **Accessible State Handling:** Strict visual and programmatic feedback across all interactive components: distinct Loading, Empty, Success, Error, Disabled, and Validation states.
- **Progressive Enhancement:** Server-rendered markup ensuring complete accessibility, search engine indexing, and screen reader parsing even when client-side JavaScript execution is delayed.
- **Predictable Wayfinding:** Persistent breadcrumb trails, sticky desktop header with mega-menus, accessible skip-to-content links, and unambiguous primary calls-to-action.

---

## 6. Implementation Phasing Strategy

| Release Phase | Scope Focus | Target Capabilities |
| :--- | :--- | :--- |
| **Phase 1: First Production Release (P0)** | Institutional Baseline, Public Portal, Core Application Portal, Bilingual CMS | Full public site, bilingual content, filterable startup directory, multi-step incubation intake forms with applicant accounts & review dashboard, dated impact metrics, event RSVP, reports library, secure on-premise deployment. |
| **Phase 2: Subsequent Iteration (P1)** | Advanced Workflow Automation & Ecosystem Integration | Automated applicant email notifications, calendar sync for workshops, dynamic lab booking time-slot reservation, advanced reviewer scorecards, interactive impact charts. |
| **Phase 3: Future Enhancements (P2)** | Expanded Ecosystem Intelligence | Alumni mentor matching algorithms, startup investor deck viewer, multi-tenant portal for affiliated incubation centers, offline mobile PWA support. |

---

## 7. Strategic Success Metrics & Target KPIs

1. **Usability & Application Completion:** Increase verified, complete incubation application submissions by 40% within 6 months while eliminating incomplete duplicate submissions.
2. **Accessibility & Compliance:** 100% adherence to WCAG 2.1 Level AA across both English and Marathi language interfaces.
3. **Performance Baseline:** Core Web Vitals targets: Largest Contentful Paint (LCP) ≤ 2.0s, Interaction to Next Paint (INP) ≤ 150ms, Cumulative Layout Shift (CLS) ≤ 0.05 on standard 4G connections.
4. **Administrative Efficiency:** Reduce content publishing cycle from weeks to < 24 hours via structured approval workflows; reduce application triage time by 60%.
5. **Zero Security Breaches:** 100% elimination of unauthenticated API data leaks, mixed-content errors, and unauthorized access to founder pitch decks.
