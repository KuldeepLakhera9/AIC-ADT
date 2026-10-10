# AIC-ADT Baramati Foundation — Digital Platform

Official repository for the next-generation digital platform and enterprise web architecture of the **AIC-ADT Baramati Foundation** (Atal Incubation Centre, supported by AIM, NITI Aayog; hosted by Agricultural Development Trust, Baramati).

---

## Repository Structure

```
AIC-ADT/
├── README.md
└── docs/
    ├── audit/                                # Phase 1, Task 1: Audit & Content Inventory
    │   ├── existing-website-audit.md          # Comprehensive institutional website audit
    │   ├── page-inventory.md                  # Catalog of 178 database objects & migration matrix
    │   ├── content-verification-register.md   # Baseline register of 20 public claims & approvals
    │   └── ux-and-accessibility-findings.md   # UX heuristic and WCAG 2.1 accessibility findings
    │
    └── requirements/                         # Phase 1, Tasks 2 & 3: Requirements & Architecture
        ├── product-requirements-document.md   # Executive vision, problem statement, architecture
        ├── functional-requirements.md         # Detailed functional specs (FR-PUB, FR-APP, etc.)
        ├── non-functional-requirements.md     # Performance, security, WCAG, and DC requirements
        ├── user-journeys.md                   # Workflows for all 9 platform user groups
        ├── roles-and-permissions.md           # Granular RBAC permissions matrix & SoD rules
        ├── acceptance-criteria.md             # Verifiable assertions and Given-When-Then criteria
        ├── out-of-scope.md                    # Explicit boundary exclusions & change controls
        ├── sitemap.md                         # Phase 1, Task 3: Canonical sitemap & Marathi routes
        ├── navigation-specification.md        # Header, mega-menu, drawer, footer & bilingual toggle
        ├── user-flow-specification.md         # Step-by-step traversal & Mermaid interaction flows
        └── route-access-matrix.md             # Route security zones, allowed roles & rate limits
```

---

## Discovery & Architecture Highlights

### Phase 1, Task 1: Baseline Audit & Content Inventory
- **[Existing Website Audit](docs/audit/existing-website-audit.md)**: Documents severe commercial theme pollution, active dummy WooCommerce retail store, broken routing (CSR to `/careers/`, Events to `/demo/`), and brand errors ("AIC-DBT Baramati").
- **[Page Inventory & Migration Matrix](docs/audit/page-inventory.md)**: Catalogs all 178 database objects and maps candidate migration actions (`Retain`, `Revise`, `Merge`, `Archive`).
- **[Content Verification Register](docs/audit/content-verification-register.md)**: Flags conflicting metrics requiring executive approval (69+ mentors vs. 23 listed, hardcoded `0` counters).
- **[UX and Accessibility Findings](docs/audit/ux-and-accessibility-findings.md)**: Documents missing `<label for="...">` form bindings, absent top-level `<h1>` headings, and insecure mixed-content links (`http://test.aic-sku.com/...`).

### Phase 1, Task 2: Product Requirements & Scope Definition
- **[Product Requirements Document (PRD)](docs/requirements/product-requirements-document.md)**: 4-zone data segregation model tailored for on-premise data-center deployment.
- **[Functional Requirements (FRS)](docs/requirements/functional-requirements.md)**: 12 core subsystems across 30+ structured requirements with unique IDs and priority ratings (P0, P1, P2).
- **[Non-Functional Requirements (NFRS)](docs/requirements/non-functional-requirements.md)**: Mobile LCP ≤ 2.0s, TLS 1.3 / HSTS, WCAG 2.1 AA, RTO ≤ 4h / RPO ≤ 24h, and On-Premise Data-Center Confirmation Matrix.
- **[User Journeys](docs/requirements/user-journeys.md)**: End-to-end flows for all 9 stakeholder personas.
- **[Roles & Permissions (RBAC)](docs/requirements/roles-and-permissions.md)**: Granular permissions matrix enforcing Segregation of Duties (SoD).
- **[Acceptance Criteria](docs/requirements/acceptance-criteria.md)**: Testable Gherkin acceptance criteria across all workflows.
- **[Out-of-Scope Specification](docs/requirements/out-of-scope.md)**: Strict boundary exclusions (eCommerce, raw farmer datasets, LIMS databases, automated AI scoring).

### Phase 1, Task 3: Sitemap, Navigation & User Journey Specification
- **[Sitemap Specification](docs/requirements/sitemap.md)**: Canonical public sitemap with 1-to-1 Marathi (`/mr/`) mirroring, removal of 75+ demo templates, and clear segregation of private portal routes.
- **[Navigation Specification](docs/requirements/navigation-specification.md)**: Desktop mega-menus, mobile slide-out drawer, context-preserving bilingual switching mechanics, breadcrumb JSON-LD schema, and institutional footer.
- **[User Flow Specification](docs/requirements/user-flow-specification.md)**: 9 comprehensive interaction flows with Mermaid sequence diagrams, validation rules, decision gates, and failure recovery.
- **[Route Access Matrix](docs/requirements/route-access-matrix.md)**: Complete endpoint mapping across Zone 1 (Public), Zone 2 (Applicant Portal), and Zone 3 (Admin Console) with HTTP methods, allowed roles, session timeouts, and rate limits.
