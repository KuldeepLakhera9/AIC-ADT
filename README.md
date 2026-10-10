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
    └── requirements/                         # Phase 1, Task 2: Product Requirements & Scope
        ├── product-requirements-document.md   # Executive vision, problem statement, architecture
        ├── functional-requirements.md         # Detailed functional specs (FR-PUB, FR-APP, etc.)
        ├── non-functional-requirements.md     # Performance, security, WCAG, and DC requirements
        ├── user-journeys.md                   # Workflows for all 9 platform user groups
        ├── roles-and-permissions.md           # Granular RBAC permissions matrix & SoD rules
        ├── acceptance-criteria.md             # Verifiable assertions and Given-When-Then criteria
        └── out-of-scope.md                    # Explicit boundary exclusions & change controls
```

---

## Discovery & Requirements Highlights

### Phase 1, Task 1: Baseline Audit & Content Inventory
- **[Existing Website Audit](docs/audit/existing-website-audit.md)**: Uncovers over 75 orphaned commercial theme demo pages, active dummy WooCommerce retail merchandise, broken navigation paths ("CSR" leading to `/careers/`, "Events" leading to `/demo/`), and severe brand misnomers ("AIC-DBT Baramati").
- **[Page Inventory & Migration Matrix](docs/audit/page-inventory.md)**: Categorizes all 178 database objects and maps candidate migration actions (`Retain`, `Revise`, `Merge`, `Archive`).
- **[Content Verification Register](docs/audit/content-verification-register.md)**: Flags conflicting metrics (e.g., claimed "69+ Mentors" vs. 23 unique public profiles, hardcoded `0` counters) requiring executive approval.
- **[UX and Accessibility Findings](docs/audit/ux-and-accessibility-findings.md)**: Documents missing `<label for="...">` form bindings, absent top-level `<h1>` headings, and insecure mixed-content links (`http://test.aic-sku.com/...`).

### Phase 1, Task 2: Product Requirements & Scope Definition
- **[Product Requirements Document (PRD)](docs/requirements/product-requirements-document.md)**: Establishes a four-zone architectural isolation model (Public, Confidential Applicant, Internal Ops, and External Farmer Datasets) tailored for on-premise data-center deployment.
- **[Functional Requirements (FRS)](docs/requirements/functional-requirements.md)**: Specifies 12 core subsystems across 30+ structured requirements with unique IDs, user needs, acceptance criteria, and priority rankings (P0, P1, P2).
- **[Non-Functional Requirements (NFRS)](docs/requirements/non-functional-requirements.md)**: Enforces sub-2.0s mobile LCP, strict TLS 1.3 / HSTS, WCAG 2.1 Level AA compliance, RTO ≤ 4h, RPO ≤ 24h, and a comprehensive on-premise data-center confirmation matrix.
- **[User Journeys](docs/requirements/user-journeys.md)**: Maps end-to-end flows for all 9 stakeholder personas from public farmers toggling to Marathi to founders saving multi-step incubation application drafts and reviewers evaluating pitch decks behind mandatory NDA gates.
- **[Roles & Permissions (RBAC)](docs/requirements/roles-and-permissions.md)**: Enforces Segregation of Duties (SoD), prohibiting staff self-approval of content and preventing unauthorized access to proprietary founder intellectual property.
- **[Acceptance Criteria](docs/requirements/acceptance-criteria.md)**: Delivers testable, verifiable Gherkin criteria across all primary workflows and accessibility standards.
- **[Out-of-Scope Specification](docs/requirements/out-of-scope.md)**: Excludes online payment checkouts, raw agricultural IoT telemetry, automated AI scoring, and multi-tenant sub-licensing to protect core institutional focus and security.
