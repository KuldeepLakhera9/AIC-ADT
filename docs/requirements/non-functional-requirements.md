# Non-Functional Requirements Specification (NFRS)
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Awaiting Management Review & Approval  
**Date:** October 10, 2026  
**Auditor & Architect Roles:** Senior Solution Architect, Infrastructure & Security Consultant  
**Priority Legend:**
- **P0 (Mandatory):** Core baseline requirement for first production release (MVP).
- **P1 (Important):** High-priority operational requirement for stabilization iteration.
- **P2 (Enhancement):** Long-term architectural enhancement.

---

## 1. Performance, Scalability & Caching

### NFR-PER-01: Page Load Speed & Core Web Vitals Standards
- **Description:** The public website must deliver sub-second initial server responses and achieve optimal Core Web Vitals under realistic network conditions across India (broadband and 4G mobile).
- **User or Business Need:** High-speed delivery is essential for rural entrepreneurs and mobile visitors accessing the platform from agricultural field environments with varying connectivity.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Largest Contentful Paint (LCP) ≤ 2.0 seconds on a standard 4G mobile connection.
  2. Interaction to Next Paint (INP) ≤ 150 milliseconds.
  3. Cumulative Layout Shift (CLS) ≤ 0.05.
  4. Time to First Byte (TTFB) ≤ 400 milliseconds for cached public pages delivered from the data center.
  5. Total initial page payload (HTML, critical CSS, compressed assets) ≤ 1.5 MB on initial load, and ≤ 300 KB on subsequent navigation.
- **Dependencies:** Data-center network bandwidth and reverse-proxy caching layer.
- **Security or Privacy Implications:** None.
- **Open Questions:** What is the dedicated uplink bandwidth available at the Baramati campus data center (e.g., 100 Mbps or 1 Gbps dedicated line)?

---

### NFR-PER-02: Concurrency & Traffic Spike Handling
- **Description:** The platform must support concurrent traffic spikes during major national cohort announcements, hackathons, and media launches without service degradation.
- **User or Business Need:** Prevents server outages when national programs (e.g., Startup India Seed Fund, MeitY GENESIS calls) are announced.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Sustain a minimum of 500 concurrent active public users and 50 concurrent authenticated applicants without latency exceeding 2.5 seconds.
  2. Implement an edge/reverse-proxy micro-caching architecture (e.g., NGINX / Caddy) caching static and public GET endpoints for 60 seconds during high traffic.
  3. Graceful degradation under excessive load: application queue throttling with friendly user queuing messages rather than HTTP 500 errors.
- **Dependencies:** Multi-core virtual machine allocation in the on-premise data center.
- **Security or Privacy Implications:** Rate-limiting must prevent volumetric application layer denial-of-service (DoS).
- **Open Questions:** Does the data center maintain an existing enterprise hardware load balancer (e.g., F5) or will software-based reverse proxies handle ingress?

---

## 2. Security, Authentication & Data Privacy

### NFR-SEC-01: Transport Layer Security & Hardened HTTPS Configuration
- **Description:** Enforce strict HTTPS encryption across all subdomains and paths, eliminating unencrypted HTTP fallbacks and misconfigured SSL certificates.
- **User or Business Need:** Resolves existing audit findings where SSL certificates displayed default subjects (`autoconfig...`) and pages contained mixed-content unencrypted links.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. All HTTP requests automatically 301-redirected to HTTPS.
  2. TLS 1.3 enforced (with TLS 1.2 minimum fallback; all legacy TLS 1.0/1.1 and SSLv3 disabled).
  3. Valid SSL/TLS certificate issued for canonical domain (`aicadtbaramatifoundation.org` and `www`) with automated renewal.
  4. HTTP Strict Transport Security (HSTS) header enabled (`max-age=31536000; includeSubDomains; preload`).
  5. Zero mixed-content warnings across all pages.
- **Dependencies:** Firewall port 443 open; Let's Encrypt automated certbot or institutional enterprise CA cert.
- **Security or Privacy Implications:** Prevents eavesdropping, MITM attacks, and credential interception.
- **Open Questions:** Does ADT Baramati maintain an enterprise wildcard SSL certificate, or will automated Let's Encrypt renewals be utilized?

---

### NFR-SEC-02: Enterprise Security Headers & Browser Hardening
- **Description:** Implement modern HTTP security response headers across all responses to mitigate injection, clickjacking, and cross-site scripting risks.
- **User or Business Need:** Protects the institutional domain and applicant data from client-side exploitation.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. `Content-Security-Policy (CSP)` configured to restrict script, object, and frame sources strictly to self and approved CDNs.
  2. `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`) preventing clickjacking of application forms.
  3. `X-Content-Type-Options: nosniff` preventing MIME-type sniffing exploits.
  4. `Referrer-Policy: strict-origin-when-cross-origin`.
  5. `Permissions-Policy` disabling unused browser APIs (geolocation, camera, microphone) on public pages.
  6. Server tokens suppressed: remove `x-powered-by: PHP/...` and detailed server signature headers.
- **Dependencies:** Reverse-proxy web server configuration.
- **Security or Privacy Implications:** Essential defense-in-depth posture against OWASP Top 10 web vulnerabilities.
- **Open Questions:** None.

---

### NFR-SEC-03: Applicant Data Protection & Cryptographic Separation
- **Description:** Enforce strict data isolation and encryption for confidential founder applications, pitch decks, and financial projections.
- **User or Business Need:** Fulfills institutional non-disclosure duties to prevent leaks of proprietary startup intellectual property.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. All applicant files stored in an isolated, private filesystem/object storage directory completely outside the web root (`public_html`).
  2. Files served only through authenticated, authorization-checked proxy controllers using short-lived signed tokens; direct static URL access strictly prohibited.
  3. Sensitive database fields (passwords, OTP secrets, session keys) encrypted using industry-standard cryptography (Argon2id for passwords, AES-256-GCM for tokens).
  4. Database backups encrypted at rest using AES-256 prior to off-site replication.
- **Dependencies:** Data-center dedicated volume allocation with filesystem-level encryption.
- **Security or Privacy Implications:** Strict compliance with Digital Personal Data Protection (DPDP) Act guidelines.
- **Open Questions:** Are applicant pitch decks subject to specific governmental archival mandates (e.g., minimum 5-year retention under NITI Aayog)?

---

### NFR-SEC-04: API Rate Limiting & Abuse Prevention
- **Description:** Implement strict IP-based and token-based rate limiting on public forms, login endpoints, and API endpoints.
- **User or Business Need:** Prevents automated credential stuffing, brute-force password cracking, and form spamming.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Public contact and inquiry forms rate-limited to maximum 5 submissions per IP per 10 minutes.
  2. Authentication endpoints (`/login`, `/signup`, `/forgot-password`) rate-limited to 5 requests per IP per 15 minutes.
  3. Search endpoints rate-limited to 60 requests per minute per IP.
  4. Cryptographic proof-of-work or invisible honeypot challenge integrated into all unauthenticated forms, rejecting 100% of headless bot payloads.
- **Dependencies:** Redis / in-memory cache layer for rate-limit tracking.
- **Security or Privacy Implications:** Prevents resource starvation and database exhaustion attacks.
- **Open Questions:** Does the campus data center employ an upstream Web Application Firewall (WAF) such as Cloudflare or Fortinet?

---

## 3. Accessibility & Usability (WCAG 2.1 AA)

### NFR-A11Y-01: WCAG 2.1 Level AA Compliance & Semantic Markup
- **Description:** Ensure the entire platform adheres strictly to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA across both English and Marathi interfaces.
- **User or Business Need:** Guarantees universal access for individuals with visual, auditory, cognitive, and motor impairments, in compliance with the Rights of Persons with Disabilities Act (RPwD Act) and Government of India Guidelines for Indian Government Websites (GIGW).
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Minimum color contrast ratio of 4.5:1 for standard text and 3:1 for large text and interactive UI components.
  2. 100% of form input controls have explicit programmatic `<label for="...">` associations and `aria-describedby` error bindings.
  3. Exact heading hierarchy maintained on every page: exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags without skipped levels.
  4. All informative images possess meaningful `alt` text in the corresponding page language; purely decorative graphics marked `alt=""` and `aria-hidden="true"`.
  5. Zero reliance on color alone to convey crucial status or error information.
- **Dependencies:** Design system token definition and semantic HTML components.
- **Security or Privacy Implications:** None.
- **Open Questions:** Will automated CI/CD accessibility testing (e.g., axe-core CLI) be integrated into the deployment pipeline?

---

### NFR-A11Y-02: Complete Keyboard Navigation & Screen Reader Operability
- **Description:** Ensure all platform functions (forms, dialogs, menus, tabs, document downloads) are fully operable using keyboard navigation alone without mouse input.
- **User or Business Need:** Supports motor-impaired founders, keyboard-only users, and screen reader assistive devices.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Unbroken tab order matching the visual flow of the page.
  2. Highly visible focus indicator ring (`:focus-visible` with minimum 2px outline and 3:1 contrast against adjacent backgrounds) on all interactive elements.
  3. Modal dialogs trap keyboard focus while open and restore focus to trigger element upon closing.
  4. Skip-to-main-content link provided at the very top of every page, becoming visible upon first keyboard Tab press.
  5. Tested and verified on modern screen readers (NVDA, VoiceOver) across desktop and mobile browsers.
- **Dependencies:** Semantic HTML5 and WAI-ARIA authoring practices.
- **Security or Privacy Implications:** None.
- **Open Questions:** None.

---

## 4. Reliability, Availability & Disaster Recovery (RTO / RPO)

### NFR-REL-01: High Availability & Uptime Service Level
- **Description:** The digital platform must achieve an institutional availability level of 99.5% uptime during standard operations (excluding scheduled maintenance windows).
- **User or Business Need:** Ensures founders, applicants, and partners have reliable access to program deadlines and forms.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Monthly uptime ≥ 99.5% measured via external ping and health-check monitoring.
  2. Scheduled maintenance windows restricted to off-peak hours (e.g., Sunday 01:00 AM – 04:00 AM IST) with prior warning banner.
  3. Containerized application auto-restart on process failure with zero manual intervention required.
- **Dependencies:** Uninterruptible Power Supply (UPS) and dual ISP lines at the campus data center.
- **Security or Privacy Implications:** None.
- **Open Questions:** Does the data center have automated generator backup and redundant internet failover?

---

### NFR-REL-02: Recovery Time Objective (RTO) and Recovery Point Objective (RPO)
- **Description:** Define and enforce strict institutional disaster recovery objectives for system restoration following hardware failure, network outage, or corruption.
- **User or Business Need:** Protects institutional data integrity and guarantees business continuity.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. **Recovery Point Objective (RPO) ≤ 24 hours:** Maximum allowable data loss in catastrophic hardware destruction is 24 hours of operational data (achieved via daily encrypted backups).
  2. **Recovery Time Objective (RTO) ≤ 4 hours:** Platform must be fully restored and operational from backups within 4 hours of hardware provisioning.
  3. Point-in-time database transaction log snapshots taken every 6 hours during active cohort application windows.
- **Dependencies:** Off-site or secondary network storage allocation for backup copies.
- **Security or Privacy Implications:** Backup archives must be encrypted with AES-256 before transmission and storage.
- **Open Questions:** Is there a secondary physical server or DR rack located at an alternate building on the Baramati campus?

---

## 5. Data-Center Infrastructure & On-Premise Deployment Requirements

### NFR-INF-01: Virtualization & Compute Specifications
- **Description:** Document and confirm required compute resources with the campus data-center engineering team.
- **User or Business Need:** Ensures adequate processing capacity without resource contention with other campus systems.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. **Production Virtual Machine (VM) Allocation:**
     - vCPU: Minimum 4 vCPUs (x86_64 architecture).
     - RAM: Minimum 16 GB ECC RAM.
     - OS: Linux Enterprise LTS (Ubuntu Server 24.04 LTS or Rocky Linux 9 / RHEL 9).
  2. **Staging / UAT Virtual Machine Allocation:**
     - vCPU: 2 vCPUs.
     - RAM: 8 GB RAM.
  3. Hypervisor support: VMware ESXi, Proxmox VE, or KVM compatible.
- **Dependencies:** Data-center virtualization cluster provisioning.
- **Security or Privacy Implications:** VMs isolated on a dedicated virtual network (VLAN) separate from general student/campus Wi-Fi.
- **Open Questions:** What hypervisor platform is currently active in the ADT Baramati data center?

---

### NFR-INF-02: Containerization & Process Architecture
- **Description:** Deploy the platform utilizing standardized, immutable OCI container images (Docker / Podman) managed via Docker Compose or lightweight Kubernetes (K3s).
- **User or Business Need:** Guarantees environment parity between development, staging, and production, eliminating configuration drift and simplifying updates.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Base images restricted to official, security-scanned minimal distributions (e.g., Alpine Linux or Debian Slim).
  2. Multi-container architecture:
     - `web-proxy`: Hardened NGINX reverse proxy handling TLS termination and static caching.
     - `app-server`: Application runtime executing backend logic.
     - `database`: PostgreSQL 16+ relational database.
     - `cache-queue`: Redis for session storage, rate-limiting, and async jobs.
  3. Containers execute as non-root users with read-only root filesystems where applicable.
- **Dependencies:** Docker / Podman installed on the host OS.
- **Security or Privacy Implications:** Container isolation prevents container-escape vulnerabilities from compromising the host OS.
- **Open Questions:** Does data-center policy mandate Docker or rootless Podman?

---

### NFR-INF-03: Storage & Backup Capacity Allocation
- **Description:** Allocate dedicated solid-state storage (SSD/NVMe) for database transactions and high-capacity storage for applicant documents and publications.
- **User or Business Need:** Ensures fast database queries and durable retention of PDF pitch decks and multimedia.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Primary Fast Volume (OS + Database): Minimum 100 GB SSD (RAID-1 or RAID-10).
  2. Document & Object Storage Volume: Minimum 250 GB dedicated storage for applicant uploads, PDF annual reports, and media assets.
  3. Backup Volume: Minimum 500 GB storage located on separate physical media or network-attached storage (NAS).
- **Dependencies:** Storage area network (SAN) or NAS configuration in data center.
- **Security or Privacy Implications:** Encrypted storage volumes (LUKS or ZFS native encryption).
- **Open Questions:** Is local NAS storage available for automated daily backup synchronization?

---

### NFR-INF-04: Network Boundaries, DNS & Firewall Architecture
- **Description:** Establish explicit network routing, port configurations, and ingress controls with the network administration team.
- **User or Business Need:** Ensures public internet discoverability while shielding administrative ports and databases from external exposure.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Public Ingress: Ports 80 (HTTP redirect) and 443 (HTTPS) open to the internet through the institutional gateway firewall.
  2. Administrative Ingress: Port 22 (SSH) and administrative CMS consoles restricted to the internal institutional campus subnet or authenticated administrative VPN.
  3. Database Port (5432) and Cache Port (6379) bound strictly to the private container network; zero external exposure.
  4. DNS records configured: A/AAAA records for `aicadtbaramatifoundation.org` and `www` pointing to the public static IP provided by the campus ISP.
- **Dependencies:** Network Administrator firewall rules and campus gateway routing.
- **Security or Privacy Implications:** Strict firewall perimeter prevents unauthorized access to internal infrastructure.
- **Open Questions:** What is the external static public IPv4 address assigned by the ISP for AIC-ADT web traffic?

---

## 6. Observability, Monitoring & Operations Check-Off

### NFR-OPS-01: Health Checks, Metrics & Proactive Monitoring
- **Description:** Implement health-check endpoints and operational monitoring reporting system health, memory usage, disk capacity, and error rates.
- **User or Business Need:** Enables rapid incident response before outages impact founders or visitors.
- **Priority:** **P0**
- **Acceptance Criteria:**
  1. Unauthenticated health endpoint `/api/health` reporting database connectivity, storage status, and memory headroom.
  2. Automated alerts dispatched to System Administrator email/SMS if disk usage exceeds 85%, memory exceeds 90%, or error rate exceeds 2% over 5 minutes.
  3. Application error logging with standardized JSON format capturing timestamp, stack trace, and correlation ID.
- **Dependencies:** SMTP notification configuration.
- **Security or Privacy Implications:** Health check output must never expose database passwords, server paths, or internal hostnames.
- **Open Questions:** Does the data center maintain an existing enterprise monitoring solution (e.g., Zabbix, Prometheus, or Nagios)?

---

## 7. Data-Center Confirmation & Check-Off Matrix

Before production deployment, the engineering team must formally verify and execute the following technical confirmation checklist with the ADT Baramati Data-Center operations team:

| Checklist Item | Scope & Technical Questions to Confirm | Responsible Team | Status |
| :--- | :--- | :--- | :--- |
| **Compute & Virtualization** | Confirm hypervisor cluster (VMware / Proxmox / KVM), available core count (4 vCPUs allocated), and ECC RAM (16 GB allocated). Verify whether CPU overcommit is enabled. | Data-Center Operator / IT Lead | **Pending Confirmation** |
| **Operating System & Runtime** | Confirm approved base OS distribution (Ubuntu 24.04 LTS or Rocky Linux 9). Confirm root access permissions for container engine setup. | System Administrator | **Pending Confirmation** |
| **Container Engine** | Confirm availability and policy regarding Docker Engine vs. Podman. Verify if rootless execution is mandatory under institutional security policy. | Security Officer / DC Operator | **Pending Confirmation** |
| **Storage & RAID Config** | Verify local storage tiering: 100 GB SSD for DB, 250 GB for uploads, 500 GB for local backups. Confirm RAID level (RAID-1/RAID-10) and disk health. | DC Storage Admin | **Pending Confirmation** |
| **Backup & Off-Site Sync** | Confirm automated daily backup schedule (02:00 AM IST). Identify designated secondary NAS / backup server IP and protocol (SSH/rsync/NFS). | Backup Operator | **Pending Confirmation** |
| **Public IP & Gateway NAT** | Confirm dedicated static public IPv4 address. Verify 1:1 NAT or port forwarding rules (80 and 443 only) on the perimeter router/firewall. | Network Administrator | **Pending Confirmation** |
| **DNS Delegation** | Confirm registrar DNS management access (NS or A-record control) to update `aicadtbaramatifoundation.org` to point to the data-center public IP. | Web & System Manager | **Pending Confirmation** |
| **Reverse Proxy & TLS** | Confirm whether TLS termination happens at an upstream campus reverse proxy or directly on the platform's NGINX container. | Network Admin / Architect | **Pending Confirmation** |
| **Outbound Email & SMS Gateway** | Confirm outbound SMTP relay host and port (preventing port 25 blocking by ISP). Confirm DLT-compliant SMS gateway credentials for applicant OTPs. | System Admin / ADT Telecom | **Pending Confirmation** |
| **Incident Response & Support Ownership** | Define first-response protocol for server failure: 24/7 on-call contact at campus DC, maximum response time, and physical server reboot protocol. | IT Management / CEO Office | **Pending Confirmation** |
