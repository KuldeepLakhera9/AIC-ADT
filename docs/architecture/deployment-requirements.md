# Deployment Requirements Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Technical Assessment & Validation Required  
**Date:** October 10, 2026  
**Authors:** Infrastructure Architect, Enterprise Deployment Engineer  
**Target Environment:** On-Premise Data Center, Agricultural Development Trust (ADT), Sharadanagar, Baramati  

---

## 1. Proposed Application Architecture & Container Topology

The proposed target architecture transitions AIC-ADT away from bloated, unmaintained WordPress theme builders to a high-speed, modular, type-safe, and secure enterprise architecture:
- **Frontend Layer:** **Next.js (App Router) & TypeScript** — High-performance server-side rendering (SSR), static site generation (SSG), progressive hydration, and bilingual routing.
- **Backend API Layer:** **NestJS & TypeScript** — Modular, scalable enterprise API framework with built-in dependency injection, guard-based RBAC, input validation pipes, and audit log interceptors.
- **Data Access & ORM:** **Prisma ORM** — Strongly-typed database client ensuring automated database migrations, type-safe queries, and zero raw SQL injection vulnerabilities.
- **Relational Database:** **PostgreSQL 16+** — Enterprise relational database with robust JSONB support, strict ACID compliance, and complete Unicode/UTF-8 collation for Marathi (Devanagari) script.
- **Caching & Async Queue:** **Redis 7+** — In-memory datastore for session state, API rate-limiting, and asynchronous background jobs (email/SMS dispatch, thumbnail generation).
- **Ingress & Reverse Proxy:** **Nginx (Alpine)** — High-efficiency TLS termination, HTTP/2 enforcement, micro-caching, security header injection, and static asset streaming.
- **Orchestration:** **Docker Engine (v24+) & Docker Compose (v2+)** — Standardized, immutable container execution environment ensuring environment parity between Staging and Production.

```
                                  PUBLIC INTERNET (Ports 80 / 443)
                                                │
                                                ▼
                                    ┌───────────────────────┐
                                    │  Campus Gateway / NAT │
                                    └───────────────────────┘
                                                │
                                                ▼
                                    ┌───────────────────────┐
                                    │ NGINX Reverse Proxy   │
                                    │ (TLS 1.3 / Security)  │
                                    └───────────────────────┘
                                                │
                     ┌──────────────────────────┴──────────────────────────┐
                     ▼                                                     ▼
         ┌───────────────────────┐                             ┌───────────────────────┐
         │ Next.js Frontend App  │                             │ NestJS Backend API    │
         │ (SSR / Bilingual)     │                             │ (RBAC / Workflows)    │
         └───────────────────────┘                             └───────────────────────┘
                     │                                                     │
                     │         Internal Container Network                  │
                     └──────────────────────────┬──────────────────────────┘
                                                │
                                ┌───────────────┴───────────────┐
                                ▼                               ▼
                    ┌───────────────────────┐       ┌───────────────────────┐
                    │ PostgreSQL 16+ (DB)   │       │ Redis (Cache & Queue) │
                    │ [Volume: 100 GB SSD]  │       │ [In-Memory Session]   │
                    └───────────────────────┘       └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────────────────────────────────┐
                    │ Persistent Storage Volumes:                       │
                    │ ├─ /storage/public  (250 GB - Reports & Media)    │
                    │ └─ /storage/private (Encrypted - Applicant Files) │
                    └───────────────────────────────────────────────────┘
```

---

## 2. Formal Deployment Requirements Matrix

*Status Legend:*
- **Unknown:** Technical configuration or parameter is currently unconfirmed by the data-center team.
- **Confirmed:** Verified in writing by data-center operations with technical evidence.
- **Not available:** Capability or resource does not exist in the current facility.
- **Approval required:** Institutional policy decision, architectural sign-off, or budget authorization required from management.

---

### 2.1. Compute, Virtualization & Operating System Sizing

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DEP-CMP-01** | **Production VM Compute Capacity:** Provisioning of 1 dedicated Linux VM with 4 vCPUs (2.4 GHz+), 16 GB ECC RAM, and 100 GB primary SSD storage. | Ensures adequate headroom for concurrent Next.js server-side rendering, NestJS request processing, and PostgreSQL connection pool. | **Unknown** | VM allocation receipt from hypervisor management interface. | Data-Center Operations | Low CPU/RAM allocation causes memory thrashing, high latency, and dropped application submissions. | 14 Days Prior to Sprint 1 |
| **DEP-CMP-02** | **Staging / UAT Environment Provisioning:** Provisioning of a secondary isolated VM with 2 vCPUs, 8 GB RAM, and 50 GB SSD storage. | Mandatory for validating Docker builds, database migrations, and editorial approvals before applying updates to production. | **Approval required** | Hypervisor resource quota approval from campus IT lead. | Campus IT Lead | Deploying updates directly to production without a staging environment risks service outages. | 14 Days Prior to Sprint 1 |
| **DEP-CMP-03** | **Host Linux LTS Baseline:** Approved installation of Ubuntu Server 24.04 LTS (x86_64) or Rocky Linux 9. | Provides a stable, standardized Linux kernel and long-term security maintenance support. | **Approval required** | Written approval from System Administrator on supported distribution. | System Administrator | Deploying on non-standard or unsupported Linux distros complicates package installation and patching. | 14 Days Prior to Sprint 1 |

---

### 2.2. Containerization, Registries & Runtime Hardening

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DEP-CNT-01** | **Docker Engine & Compose Runtime:** Official Docker Engine v24.0+ and Docker Compose v2.20+ installed on host VMs. | Standardizes multi-container orchestration across frontend, backend, database, cache, and reverse proxy. | **Approval required** | Policy confirmation verifying Docker Engine is permitted under campus IT guidelines. | IT Security / System Admin | If Docker is disallowed by institutional policy, bare-metal native services must be architected. | 14 Days Prior to Sprint 1 |
| **DEP-CNT-02** | **Container Image Delivery Mechanism:** Network egress to pull base images from Docker Hub or agreement on air-gapped tarball imports (`docker load`). | Determines how application container updates are pushed to the on-premise production server. | **Unknown** | Outbound firewall confirmation for registry endpoints (`registry-1.docker.io`). | Campus Network Administrator | Total air-gapping requires manual, time-consuming offline image transfers on physical media. | 14 Days Prior to Sprint 1 |
| **DEP-CNT-03** | **Non-Root Container Execution:** All application containers (Next.js, NestJS, Nginx) must execute as dedicated non-root service accounts (`uid: 1001`). | Defense-in-depth security principle preventing container breakout attacks from compromising the host operating system. | **Approval required** | Containerfile / Dockerfile security audit review. | Infrastructure Architect | Running containers as root creates severe privilege escalation exposure in the event of an RCE exploit. | 7 Days Prior to Staging Deploy |
| **DEP-CNT-04** | **Restart Policy & Resource Limits:** Enforcement of `restart: unless-stopped` with explicit CPU and memory reservations in `docker-compose.yml`. | Prevents a memory leak in a single container (e.g., node process) from exhausting host RAM and crashing the server. | **Approval required** | Validated Docker Compose configuration file review. | Deployment Engineer | Uncapped containers risk crashing the entire virtual machine during abnormal traffic spikes. | 7 Days Prior to Staging Deploy |

---

### 2.3. Persistent Storage Volumes & Data Segregation

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DEP-VOL-01** | **Database Persistent Volume (`postgres_data`):** Dedicated mount volume formatted with ext4/XFS residing on RAID-1/10 SSD storage. | Guarantees data durability across container restarts, updates, and host reboots. | **Unknown** | Host directory path allocation and disk speed benchmark. | Data-Center Storage Admin | Storing database files on ephemeral container layers results in complete data loss upon container restart. | 14 Days Prior to Sprint 1 |
| **DEP-VOL-02** | **Public Documents Volume (`public_uploads`):** Minimum 100 GB persistent volume for public annual reports, scheme guidelines, and startup logos. | Accommodates public media files served directly through Nginx caching layers. | **Unknown** | Storage volume mount point (`/storage/public`) confirmation. | Data-Center Storage Admin | Storage exhaustion blocks publication uploads and stalls CMS editorial workflows. | 14 Days Prior to Sprint 1 |
| **DEP-VOL-03** | **Confidential Applicant Volume (`private_uploads`):** Minimum 150 GB encrypted persistent volume for pitch decks, financial models, and patent documents. | Stores proprietary startup files outside the web root, accessible strictly via authenticated NestJS controller streaming. | **Approval required** | Storage volume mount point (`/storage/private`) and LUKS encryption plan. | Security Officer / Storage Admin | Exposing confidential files via direct Nginx static alias creates severe intellectual property breach risks. | 7 Days Prior to Staging Deploy |

---

### 2.4. Environment Variables, Secrets & Database Migrations

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DEP-SEC-01** | **Zero Hardcoded Secrets Policy:** Complete segregation of application secrets into environment files (`.env.production`) restricted to `chmod 600`. | Protects database credentials, session signing keys, and SMS gateway tokens from repository exposure. | **Approval required** | Deployment guide verifying zero secret tokens in git repositories or public images. | Lead Developer / DevOps | Committing database passwords to Git repositories creates permanent security compromises. | 7 Days Prior to Sprint 1 |
| **DEP-SEC-02** | **Automated Prisma Database Migration Pipeline:** Execution of `npx prisma migrate deploy` during container initialization. | Ensures database schema evolves consistently, avoiding manual, error-prone SQL script execution on production. | **Approval required** | CI/CD deployment script review verifying migration rollback handling. | Backend Lead / Deployment Eng | Manual database schema updates frequently cause schema drift and application crashes. | 7 Days Prior to Staging Deploy |
| **DEP-SEC-03** | **Database Seeding & Initial Role Provisioning:** Idempotent database seed script creating verified default roles (`ROLE_SYS_ADMIN`) and system metadata. | Establishes the initial administrative account securely without manual database row editing. | **Approval required** | Review of `prisma/seed.ts` script verifying secure credential generation. | Lead Developer | Unstandardized database initialization leads to missing default roles and broken login flows. | 7 Days Prior to Staging Deploy |

---

## 3. Production Service Orchestration Specification

The table below defines the proposed container composition to be deployed on the production host VM:

| Service Name | Base Image | CPU / RAM Allocation | Internal Ports | External Ingress | Volume Mounts | Purpose |
| :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| `web-proxy` | `nginx:1.27-alpine` | 1.0 vCPU / 1 GB RAM | 80, 443 | Public Ports 80 & 443 | `/etc/nginx/conf.d`, `/etc/letsencrypt`, `/storage/public:ro` | Reverse proxy, SSL termination, static file streaming, rate-limiting, and security headers. |
| `frontend-app` | `node:22-alpine` | 1.5 vCPU / 4 GB RAM | 3000 | Private Bridge Only | Ephemeral | Next.js App Router (SSR, SSG, English & Marathi bilingual rendering). |
| `backend-api` | `node:22-alpine` | 1.5 vCPU / 4 GB RAM | 4000 | Private Bridge Only | `/storage/private:rw`, `/storage/public:rw` | NestJS enterprise API, authentication, RBAC, application processing, audit logging. |
| `database` | `postgres:16-alpine`| 1.5 vCPU / 4 GB RAM | 5432 | Private Bridge Only | `postgres_data:/var/lib/postgresql/data` | Relational database storing users, CMS content, applications, scorecards, and audit logs. |
| `cache-queue` | `redis:7-alpine` | 0.5 vCPU / 1 GB RAM | 6379 | Private Bridge Only | `redis_data:/data` | Session cache, API rate-limit counter, asynchronous job queue. |
| `certbot` | `certbot/certbot` | 0.2 vCPU / 256 MB RAM | N/A | Triggered via cron | `/etc/letsencrypt`, `/var/www/certbot` | Automated TLS certificate issuance and renewal via Let's Encrypt HTTP-01 challenge. |
