# Phase 5 Entry Checklist & Headless CMS Architecture Requirements

**Project:** AIC-ADT Baramati Foundation Institutional Website  
**Phase:** Phase 5 — Content Management & Dynamic Publishing Transition  
**Roles:** Enterprise Architect, Senior Backend Engineer, Lead DevOps  
**Date:** October 12, 2026  
**Status:** **READY FOR PHASE 5 INITIATION**  

---

## 1. Executive Summary

This checklist establishes the prerequisite specifications, architectural guardrails, content schemas, and security boundaries required for **Phase 5 (Content Management System, Editorial Workflows & Dynamic Publishing)**.

In accordance with institutional guidelines, **no administrative portals, CMS components, privileged authentication mechanisms, or database writes were implemented in Phase 4**. Phase 5 will transition the verified static content models in `apps/web/src/data/` into dynamic, version-controlled database models managed via a headless API architecture.

---

## 2. Content Models & Schema Specifications

The Phase 5 CMS must support the exact typed structures established in Phase 4:

### A. Startup Profile Schema (`startups`)
- **Fields**: `id`, `slug` (unique), `name`, `tagline`, `sector` (enum: Agri-Tech, Smart Farming, Biotechnology, Food Processing, Climate Tech, Agribusiness), `cohort`, `fundingScheme` (SISFS, MeitY GENESIS, CSR, Equity), `founders`, `location`, `overview` (rich text), `problemStatement`, `solutionInnovation`, `reachMetric`, `labsUsed` (FabLab, Analytical Lab, Living Lab), `trlLevel` (TRL 1–9), `milestones` (array of strings), `websiteUrl`, `logoAssetId`, `verified` (boolean), `featuredInHomepage` (boolean).
- **Validation**: Enforce slug formatting (`/^[a-z0-9-]+$/`), mandatory founder names, and verified boolean flag.

### B. Event & Workshop Schema (`events`)
- **Fields**: `id`, `slug` (unique), `title`, `shortDescription`, `fullDescription` (rich text), `category` (Intake Deadline, Workshop, Demo Day, Masterclass, Bootcamp), `status` (Upcoming, Concluded, Postponed), `startDate`, `endDate`, `timeRange`, `venueName`, `venueType` (In-Person Campus, Online National Portal, Hybrid), `venueAddress`, `organizer`, `targetAudience` (string array), `registrationUrl`, `registrationDeadline`, `isExternal` (boolean), `bannerAssetId`.
- **Validation**: `endDate >= startDate`, external URLs validated against whitelist (`startupindia.gov.in`, `aicadt.com`).

### C. News & Press Release Schema (`news`)
- **Fields**: `id`, `slug` (unique), `headline`, `publishDate`, `category` (Funding Milestone, Institutional Sanction, Infrastructure Expansion, Partnership MoU), `summary`, `bodyHtml` (sanitized rich text), `sourceAttribution`, `externalPressLink`, `tags` (string array), `keyFacts` (JSON array: `{ label, value }`), `thumbnailAssetId`.
- **Validation**: Compulsory source attribution; zero publication of unverified press claims.

### D. Publication & Knowledge Document Schema (`publications`)
- **Fields**: `id`, `slug` (unique), `title`, `category` (Annual Progress Report, Research Whitepaper, Program Operating Manual, Institutional Policy), `publicationDate`, `fiscalYear`, `authorOrAuthority`, `summary`, `documentFileId` (PDF attachment), `fileSizeBytes`, `pageCount`, `isStatutory` (boolean), `requiresDevanagariSummary` (boolean).
- **Validation**: MIME type restricted to `application/pdf`; virus scanning on upload.

### E. Facility & Infrastructure Schema (`facilities`)
- **Fields**: `id`, `slug` (unique), `name`, `tagline`, `description`, `keyFeatures` (string array), `equipmentList` (JSON array: `{ name, model, capacity }`), `bookingNotice`, `contactOfficerName`, `contactPhone`, `contactEmail`, `coverAssetId`.

---

## 3. Editorial Roles & Role-Based Access Control (RBAC)

The Phase 5 backend (`@aic/api`) will implement JWT/cookie-authenticated RBAC:

| Role Name | Scope & Authority | Allowed Actions |
| :--- | :--- | :--- |
| **Super Admin** | Incubation Secretariat / System Administrator | User management, role assignment, audit log review, platform settings, hard deletes. |
| **Content Editor** | Chief Editorial Officer / Communications Lead | Full editorial control across news, events, publications, and Marathi translations; publish/unpublish authority. |
| **Content Author** | Program Coordinators / Lab Managers | Create and update drafts for assigned modules (e.g. Lab Manager manages equipment and workshops); submit for review. |
| **Legal / Compliance Reviewer** | Legal Counsel / Trust Secretary | Review and approve statutory disclosures, RTI updates, POSH policies, and Marathi certified translations. |
| **Public User** | Anonymous web visitors | Read-only access to published content via cached public API endpoints. |

---

## 4. Editorial Workflow State Machine

Every managed content entity follows a linear state transition:

```
[ DRAFT ] ───────────► [ UNDER REVIEW ] ───────────► [ APPROVED ] ───────────► [ PUBLISHED ]
   ▲                         │                            │                          │
   │ (Revisions Needed)      │                            │                          ▼
   └─────────────────────────┴────────────────────────────┴────────────────────► [ ARCHIVED ]
```

- **Version History**: The CMS must maintain an immutable revision trail of who changed what, when, and from which IP.
- **Rollback Capability**: Editors can revert to any prior published state with a single action.
- **Scheduled Publishing**: Support publish timestamps for embargoed announcements.

---

## 5. Media & Document Asset Management

- **Storage Adapter**: Local MinIO (development) transitioning to dedicated S3-compatible private storage in the Baramati Data Center.
- **Image Processing**: Automatic generation of optimized WebP and AVIF variants at standard responsive widths (320w, 640w, 1024w, 1920w).
- **PDF Ingestion**: ClamAV anti-malware scanning upon upload; extraction of page count and file size metadata.
- **Storage Isolation**: Private administrative assets stored separately from public website assets.

---

## 6. Bilingual & Localization Workflow

- **Side-by-Side Editor**: The CMS UI must present parallel English and Marathi editing panes.
- **Fallback Flagging**: If a Marathi translation is pending, the CMS automatically tags the record with `status: "mr_pending"` and triggers the front-end fallback.
- **Devanagari Spellcheck & Formatting**: Input fields must support UTF-8 Devanagari text input with font preview in `Noto Sans Devanagari`.

---

## 7. Public Read Access vs. Privileged Write Access

- **Public Delivery (Read-Only)**:
  - Static generation using Next.js Incremental Static Regeneration (ISR) or on-demand cache revalidation (`revalidateTag("startups")`).
  - Public REST endpoints cached via reverse-proxy CDN.
- **Administrative Portal (Write/Privileged)**:
  - Private route `/admin` protected by strict session authentication, Multi-Factor Authentication (MFA), and rate limiting.
  - Zero admin route indexing via `robots.txt` and security headers.

---

## 8. Data Center Deployment & Infrastructure Dependencies

Prior to Phase 5 production deployment at the Baramati Data Center:
1. **PostgreSQL 16 Cluster**: Provision clustered database with automated daily physical backups and point-in-time recovery.
2. **Reverse Proxy & SSL**: Nginx with TLS 1.3, Let's Encrypt / Institutional certificate rotation, and HSTS headers.
3. **Firewall & Network Isolation**: Database and object storage restricted to private LAN; only ports 80/443 exposed to the public internet.
4. **Log Retention**: Audit logs archived for 365 days in compliance with statutory digital governance standards.
