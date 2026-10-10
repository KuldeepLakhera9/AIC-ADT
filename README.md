# AIC-ADT Baramati Foundation — Digital Platform

Official repository for the next-generation digital platform, enterprise web architecture, and infrastructure readiness specifications for the **AIC-ADT Baramati Foundation** (Atal Incubation Centre, supported by AIM, NITI Aayog; hosted by Agricultural Development Trust, Baramati).

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
    ├── requirements/                         # Phase 1, Tasks 2 & 3: Requirements & Navigation
    │   ├── product-requirements-document.md   # Executive vision, problem statement, architecture
    │   ├── functional-requirements.md         # Detailed functional specs (FR-PUB, FR-APP, etc.)
    │   ├── non-functional-requirements.md     # Performance, security, WCAG, and DC requirements
    │   ├── user-journeys.md                   # Workflows for all 9 platform user groups
    │   ├── roles-and-permissions.md           # Granular RBAC permissions matrix & SoD rules
    │   ├── acceptance-criteria.md             # Verifiable assertions and Given-When-Then criteria
    │   ├── out-of-scope.md                    # Explicit boundary exclusions & change controls
    │   ├── sitemap.md                         # Canonical sitemap & Marathi routes
    │   ├── navigation-specification.md        # Header, mega-menu, drawer, footer & bilingual toggle
    │   ├── user-flow-specification.md         # Step-by-step traversal & Mermaid interaction flows
    │   └── route-access-matrix.md             # Route security zones, allowed roles & rate limits
    │
    ├── architecture/                         # Phase 1, Task 4: Data-Center Readiness & RFI
    │   ├── data-center-readiness-checklist.md # 47-point RFI assessment across 12 operational domains
    │   ├── deployment-requirements.md         # Container topology, VM sizing, volumes & non-root security
    │   ├── network-and-security-requirements.md# DMZ VLAN, firewall ingress, SSH & dataset isolation
    │   ├── backup-and-recovery-requirements.md# Automated pg_dump, AES-256, RPO/RTO & DR execution
    │   └── infrastructure-open-questions.md   # Prioritized RFI questions & mandatory deliverables
    │
    ├── design/                               # Phase 2: Design Discovery & System Architecture
    │   ├── design-brief.md                   # Task 1: Personas, outcomes, brand personality & scope
    │   ├── visual-direction.md               # Task 1: Palette tokens, type scales, motion & layout
    │   ├── design-principles.md              # Task 1: Usability rules, WCAG 2.1 AA, bilingual parity
    │   ├── design-decisions.md               # Task 1: Approved, proposed & unresolved decisions
    │   ├── wireframes/                       # Detailed UI wireframes (Desktop & Mobile)
    │   ├── components/                       # Task 2: Component Library & Design System Tokens
    │   │   ├── design-tokens.md              # Multi-tier semantic tokens & CSS custom properties
    │   │   ├── component-inventory.md        # 27 reusable components with states & behaviors
    │   │   ├── responsive-guidelines.md      # 5 screen tiers, fluid typography & overflow rules
    │   │   └── accessibility-guidelines.md   # WCAG 2.1 AA contrast matrix, keyboard & ARIA rules
    │   └── reviews/                          # Design review records & stakeholder sign-offs
    │
    ├── phase-1-summary.md                    # Phase 1, Task 5: Master Discovery Summary & Architecture Roadmap
    ├── phase-1-open-decisions.md              # Phase 1, Task 5: 11 Open Governance & Policy Decisions Register
    └── phase-1-sign-off-checklist.md          # Phase 1, Task 5: Quality Checklist & Phase Gate Matrix
├── prototype/                                # Phase 2, Task 2: Standalone Component Showcase
│   └── components/
│       ├── showcase.html                     # Interactive HTML5 component showcase
│       └── styles.css                        # Pure CSS custom properties & component styles
```

---

## Discovery, Specifications & Architecture Highlights

### Phase 1, Task 1: Baseline Audit & Content Inventory
- **[Existing Website Audit](docs/audit/existing-website-audit.md)**: Documents severe commercial theme pollution, active dummy WooCommerce retail store, broken routing (CSR to `/careers/`, Events to `/demo/`), and brand errors ("AIC-DBT Baramati").
- **[Page Inventory & Migration Matrix](docs/audit/page-inventory.md)**: Catalogs all 178 database objects and maps candidate migration actions (`Retain`, `Revise`, `Merge`, `Archive`).
- **[Content Verification Register](docs/audit/content-verification-register.md)**: Flags conflicting metrics requiring executive approval (69+ mentors vs. 23 listed, hardcoded `0` counters).
- **[UX and Accessibility Findings](docs/audit/ux-and-accessibility-findings.md)**: Documents missing `<label for="...">` form bindings, absent top-level `<h1>` headings, and insecure mixed-content links (`http://test.aic-sku.com/...`).

### Phase 1, Tasks 2 & 3: Product Requirements, Sitemap & User Journeys
- **[Product Requirements Document (PRD)](docs/requirements/product-requirements-document.md)**: 4-zone data segregation model tailored for on-premise data-center deployment.
- **[Functional Requirements (FRS)](docs/requirements/functional-requirements.md)**: 12 core subsystems across 30+ structured requirements with unique IDs and priority ratings (P0, P1, P2).
- **[Non-Functional Requirements (NFRS)](docs/requirements/non-functional-requirements.md)**: Mobile LCP ≤ 2.0s, TLS 1.3 / HSTS, WCAG 2.1 AA, RTO ≤ 4h / RPO ≤ 24h.
- **[Sitemap Specification](docs/requirements/sitemap.md)**: Canonical public sitemap with 1-to-1 Marathi (`/mr/`) mirroring, removal of 75+ demo templates, and clear segregation of private portal routes.
- **[Navigation Specification](docs/requirements/navigation-specification.md)**: Desktop mega-menus, mobile drawer, context-preserving bilingual switching mechanics, and footer.
- **[User Flow Specification](docs/requirements/user-flow-specification.md)**: 9 comprehensive interaction flows with Mermaid sequence diagrams, validation rules, and error handling.
- **[Route Access Matrix](docs/requirements/route-access-matrix.md)**: Complete endpoint mapping across Public, Applicant Portal, and Admin Console with allowed RBAC roles.

### Phase 1, Task 4: Data-Center Readiness Assessment & RFI
- **[Data-Center Readiness Checklist](docs/architecture/data-center-readiness-checklist.md)**: 47-point RFI checklist evaluating compute, storage, networking, security, databases, power, and facilities.
- **[Deployment Requirements](docs/architecture/deployment-requirements.md)**: Production sizing for Next.js, NestJS, PostgreSQL 16+, Prisma, Nginx, and Redis multi-container architecture.
- **[Network & Security Requirements](docs/architecture/network-and-security-requirements.md)**: DMZ VLAN isolation (VLAN 30), 1:1 NAT mapping for ports 80/443, strict firewall barriers preventing lateral movement to internal agricultural IoT and KVK data lakes.
- **[Backup & Recovery Requirements](docs/architecture/backup-and-recovery-requirements.md)**: Nightly automated `pg_dump` with AES-256 encryption, independent NAS replication, RPO ≤ 24h, RTO ≤ 4h, and quarterly dry-run simulation drills.
- **[Infrastructure Open Questions](docs/architecture/infrastructure-open-questions.md)**: 21 prioritized technical questions and the definitive checklist of mandatory deliverables the organization must supply before deployment approval.

### Phase 1, Task 5: Discovery Review & Governance Sign-Off Package
- **[Phase 1 Discovery Summary](docs/phase-1-summary.md)**: Complete technical and architectural synthesis covering project vision, agreed v1 release scope, 7-pillar sitemap, Next.js/NestJS/PostgreSQL architecture, data center dependencies, risks/mitigations, and entry criteria.
- **[Phase 1 Open Decisions Register](docs/phase-1-open-decisions.md)**: 11 high-priority policy and organizational decisions (branding, impact metrics audit, startup classification, mentor consent, data privacy, RFI sign-offs) cataloged for executive resolution.
- **[Phase 1 Sign-Off Checklist & Gate Matrix](docs/phase-1-sign-off-checklist.md)**: Comprehensive quality verification across all 23 deliverables, evaluating the Phase Gate as **NEEDS APPROVAL** with formal signature blocks for stakeholder sign-off.

### Phase 2, Task 1: Design Discovery & Creative Direction
- **[Design Brief](docs/design/design-brief.md)**: Target user cohorts, experience priorities, brand personality pillars, measurable UX/Core Web Vitals outcomes, and scope boundaries.
- **[Visual Direction](docs/design/visual-direction.md)**: Established AIC-ADT botanical color tokens, Inter + Noto Sans Devanagari typography scale, authentic agricultural photography mandates, card elevation, and motion principles.
- **[Design Principles](docs/design/design-principles.md)**: 5 core tenets, Fitts's Law touch ergonomics, mobile-first responsive transforms, strict WCAG 2.1 AA accessibility rules, bilingual layout compensation, and `prefers-reduced-motion` specs.
- **[Design Decisions Register](docs/design/design-decisions.md)**: Classification of approved, proposed, and unresolved design decisions with explicit placeholders (`[AUDITED METRIC PENDING]`, `[CONSENT PENDING]`, etc.).

### Phase 2, Task 2: Design Tokens & Reusable Component Specification
- **[Design Tokens Specification](docs/design/components/design-tokens.md)**: Multi-tier token architecture (CSS custom properties) covering brand & neutral colors, state feedback, typography scale, 8-point spacing, container widths, radii, shadows, and z-index layers.
- **[Reusable Component Inventory](docs/design/components/component-inventory.md)**: Comprehensive specification of 27 core components covering purpose, variants, visual states, keyboard interaction, responsive behavior, WCAG 2.1 AA rules, and Marathi translation guidelines.
- **[Responsive Layout Guidelines](docs/design/components/responsive-guidelines.md)**: 5-tier responsive screen architecture (320px to 1440px+), fluid typography formulas (`clamp`), navigation collapse mechanics, table card transformations, and Marathi horizontal overflow defenses.
- **[Accessibility Guidelines](docs/design/components/accessibility-guidelines.md)**: WCAG 2.1 Level AA conformance framework with certified color contrast matrix, keyboard focus architecture, screen reader landmarks, persistent form labels, and `prefers-reduced-motion` overrides.
- **[Standalone Component Showcase](prototype/components/showcase.html)**: Interactive HTML5/CSS showcase in `prototype/components/` demonstrating representative buttons, typography, cards, form fields, badges, navigation, and color swatches without external dependencies.



