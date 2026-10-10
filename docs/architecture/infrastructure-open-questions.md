# Infrastructure Open Questions & Information Request
## AIC-ADT Baramati Foundation Digital Platform

**Document Version:** 1.0.0  
**Status:** Open Request for Information (RFI)  
**Date:** October 10, 2026  
**Authors:** Infrastructure Architect, Enterprise Deployment Engineer  
**Target Recipient:** ADT Campus Data-Center Team & IT Leadership, Baramati  

---

## 1. Executive Summary & Purpose of the Request for Information

To deploy the proposed Next.js, NestJS, PostgreSQL, Prisma, Nginx, and Docker Compose platform within the Agricultural Development Trust (ADT) on-premise data center, a set of foundational technical parameters must be confirmed.

Operating an on-premise institutional server carries operational responsibilities regarding power continuity, hardware maintenance, network security, and data protection. This document consolidates the **unresolved technical questions** that the organization must formally answer before technical architecture is finalized, development sprints commence, and production cutover is scheduled.

---

## 2. Structured Infrastructure Questions Matrix

*Status Legend:*
- **Unknown:** Technical configuration or parameter is currently unconfirmed by the data-center team.
- **Confirmed:** Verified in writing by data-center operations with technical evidence.
- **Not available:** Capability or resource does not exist in the current facility.
- **Approval required:** Institutional policy decision, architectural sign-off, or budget authorization required from management.

---

| Item ID | Technical Question / Parameter | Why It Is Needed | Current Status | Evidence Needed from Organization | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **IOQ-CMP-01** | What hypervisor cluster is active (VMware ESXi, Proxmox VE, KVM, or Hyper-V), and can 4 vCPUs and 16 GB ECC RAM be allocated for Production? | Determines VM template format, virtual disk drivers, and guarantees performance headroom for SSR and database. | **Unknown** | Hypervisor version report and confirmed VM resource reservation. | Data-Center Operations | Low compute allocation causes API latency spikes and database query timeouts. | 14 Days Prior to Sprint 1 |
| **IOQ-CMP-02** | Is there capacity to provision a secondary staging/UAT VM (2 vCPUs, 8 GB RAM) for pre-production validation? | Critical for testing database migrations and Docker Compose builds before touching production. | **Approval required** | Approval of secondary VM allocation from IT Lead. | Campus IT Lead | Without staging, updates are applied directly to production, risking unpredicted outages. | 14 Days Prior to Sprint 1 |
| **IOQ-CMP-03** | Is Ubuntu Server 24.04 LTS or Rocky Linux 9 approved as the standard host operating system? | Establishes a hardened, supported Linux LTS baseline with security updates through 2029+. | **Approval required** | Written sign-off approving designated Linux distribution. | System Administrator | Non-standard distros complicate automated setup and security patch maintenance. | 14 Days Prior to Sprint 1 |
| **IOQ-STR-01** | Is high-speed SSD/NVMe storage (minimum 100 GB in RAID-1/10) available for the PostgreSQL database volume? | Relational databases require fast random read/write IOPS for concurrent application transactions. | **Unknown** | Disk hardware specification sheet confirming SSD/NVMe RAID tier. | Data-Center Storage Admin | Mechanical HDDs cause database bottlenecks and sluggish search queries. | 14 Days Prior to Sprint 1 |
| **IOQ-STR-02** | Can a dedicated 250 GB storage volume be provisioned for document uploads, and does it support online LVM expansion? | Accommodates multi-year startup pitch decks, annual reports, and media without partition exhaustion. | **Unknown** | Storage volume mount point confirmation and LVM volume group details. | Data-Center Storage Admin | Inability to expand storage online forces disruptive offline disk migration procedures. | 14 Days Prior to Sprint 1 |
| **IOQ-NET-01** | Is a dedicated, static public IPv4 address available for the web platform, or does the campus share an IP across multiple systems? | Essential for public DNS resolution, reverse proxy routing, and SSL certificate issuance. | **Unknown** | Public static IP address string and ISP subnet documentation. | Campus Network Administrator | Dynamic IP allocation causes DNS breaks, taking the website offline globally. | 14 Days Prior to Sprint 1 |
| **IOQ-NET-02** | Can campus firewall inbound rules be configured to forward TCP ports 80 and 443 exclusively to the Web VM private IP? | Exposes the Nginx reverse proxy to external visitors while shielding all internal ports from the internet. | **Unknown** | Firewall configuration ticket / NAT confirmation from network team. | Campus Network Administrator | Missing port forwarding prevents external access; open non-web ports create security holes. | 7 Days Prior to Staging Deploy |
| **IOQ-NET-03** | Can the Web VM be assigned to an isolated Demilitarized Zone (DMZ) VLAN separate from student Wi-Fi and campus ERP systems? | Enforces strict network isolation; prevents lateral movement if the web container is targeted. | **Approval required** | Network switch VLAN configuration verifying DMZ subnet. | Campus Network Administrator | Hosting public web servers on a flat campus network exposes all internal systems. | 14 Days Prior to Sprint 1 |
| **IOQ-NET-04** | Can outbound HTTPS egress (port 443) be whitelisted for pulling container images and executing OS updates? | Required for initial deployment, package installation, and automated Let's Encrypt certificate renewals. | **Unknown** | Outbound firewall egress rule confirmation or proxy server configuration. | Campus Network Administrator | Complete outbound egress blocks prevent automated security patching and cert renewals. | 14 Days Prior to Sprint 1 |
| **IOQ-NET-05** | What is the campus SMTP relay host, port, and authentication policy for transactional email dispatch? | Required for applicant verification emails, password resets, and event registration receipts. | **Unknown** | SMTP relay hostname, port (587/465), and authentication method. | Network Admin / ADT Mail Admin | ISP port 25 blocking drops all applicant registration emails and password reset links. | 7 Days Prior to Staging Deploy |
| **IOQ-NET-06** | Does ADT Baramati have an active DLT entity registration and SMS gateway credentials for Indian telecom OTP dispatch? | Mandatory for applicant phone OTP verification and event registration SMS confirmations. | **Approval required** | DLT Principal Entity ID, registered SMS template IDs, and API gateway documentation. | ADT Telecom / IT Management | Inability to dispatch OTPs blocks founder account creation and portal applications. | 7 Days Prior to Staging Deploy |
| **IOQ-DNS-01** | Who manages authoritative DNS for `aicadtbaramatifoundation.org`, and can A-records be updated during cutover? | Required to point the official domain to the data-center static IP during cutover. | **Unknown** | DNS provider credentials confirmation and current TTL setting. | Web & System Manager / Registrar | Lack of registrar credentials prevents pointing the official domain to the new server. | 14 Days Prior to Sprint 1 |
| **IOQ-DNS-02** | Will HTTPS certificates use automated Let's Encrypt renewal (port 80 open) or an institutional commercial wildcard certificate? | Eliminates existing audit finding where SSL cert defaulted to `autoconfig...` subject. | **Approval required** | Written certificate decision: commercial cert CRT/KEY files OR Let's Encrypt approval. | System Admin / IT Lead | Expired or untrusted SSL certificates trigger alarming security warnings, blocking visitors. | 7 Days Prior to Staging Deploy |
| **IOQ-CNT-01** | Is Docker Engine (v24+) with Docker Compose (v2+) permitted under institutional IT security policies? | Modern containerization is the foundation of the proposed Next.js, NestJS, PostgreSQL stack. | **Approval required** | Institutional container policy document or written IT Lead waiver. | Security Officer / IT Lead | If Docker is disallowed, bare-metal native services must be architected. | 14 Days Prior to Sprint 1 |
| **IOQ-BCK-01** | Is an independent secondary storage destination (NAS, SAN, or separate server rack) available for daily backup replication? | Protects against local server chassis failure, disk array collapse, or local physical damage. | **Unknown** | Secondary NAS IP address, protocol (NFS/SSH/SMB), and capacity allocation confirmation. | Data-Center Storage Admin | Backups stored on the same physical drive array are destroyed if hardware fails. | 14 Days Prior to Sprint 1 |
| **IOQ-BCK-02** | Does management formally approve the Disaster Recovery targets: RPO ≤ 24 Hours and RTO ≤ 4 Hours? | Establishes measurable business continuity metrics for NITI Aayog and institutional governance. | **Approval required** | Signed Disaster Recovery SLA from IT Director and CEO. | IT Management / CEO Office | Undefined RTO/RPO leaves recovery timelines ambiguous during an emergency. | 7 Days Prior to Sprint 1 |
| **IOQ-PWR-01** | Does the data center maintain an online dual-conversion UPS with minimum 30 minutes runtime under full load? | Protects database storage against sudden power cutoffs, preventing filesystem and database corruption. | **Unknown** | UPS model, kVA capacity, battery load calculation, and battery health test log. | Facility Operations / Electrical Lead | Unprotected power outages corrupt database transaction write-ahead logs (WAL). | 14 Days Prior to Sprint 1 |
| **IOQ-PWR-02** | Is there an automated diesel generator with an Automatic Transfer Switch (ATS) engaging within 60 seconds of grid failure? | Guarantees extended operational continuity during regional electricity load shedding in Baramati. | **Unknown** | ATS test logs, generator service logs, and on-site fuel reserve policy. | Facility Operations | Grid failure exhausting UPS batteries brings the entire data center offline. | 14 Days Prior to Sprint 1 |
| **IOQ-HWD-01** | Is the host physical server covered under an active OEM hardware warranty (Dell/HP/Lenovo AMC) with 4-hour on-site part replacement? | Ensures failed physical components (disks, RAM, power supplies) are replaced rapidly. | **Unknown** | Server chassis serial number, OEM service contract level, and AMC expiration date. | IT Management | Out-of-warranty hardware failure halts the entire platform for weeks awaiting spare parts. | 14 Days Prior to Sprint 1 |
| **IOQ-SEC-01** | Can host SSH access be restricted strictly to public-key authentication (ED25519) and confined to the internal campus management network? | Neutralizes automated brute-force password guessing attacks against administrative ports. | **Unknown** | Host SSH configuration confirmation and network ACL verification. | System Administrator | Password-based SSH logins on public IP addresses invite aggressive scanning. | 14 Days Prior to Sprint 1 |
| **IOQ-ISO-01** | Can data-center network firewalls guarantee zero direct connectivity between the public web server and internal farmer IoT / KVK datasets? | Upholds strict scope boundaries (`docs/requirements/out-of-scope.md`), protecting farmer personal records. | **Approval required** | Firewall inter-VLAN access control list (ACL) verifying drop rules to internal database IPs. | Campus Network Administrator | Unauthorized lateral database connections create severe data protection liabilities under DPDP. | 14 Days Prior to Sprint 1 |

---

## 3. Essential Information the Organization Must Supply

Before technical implementation can begin and deployment can be formally scheduled, the **Agricultural Development Trust (ADT) Data-Center Operations team** must supply the following specific technical deliverables:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 MANDATORY PRE-DEPLOYMENT INFORMATION DELIVERABLES           │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. COMPUTE & VIRTUALIZATION CONFIRMATION SHEET                              │
│    - Hypervisor platform and version (e.g., VMware ESXi 8.0 / Proxmox 8.2)  │
│    - Dedicated VM specs: 4 vCPUs (x86_64), 16 GB ECC RAM, 100 GB SSD (Prod) │
│    - Secondary Staging VM allocation: 2 vCPUs, 8 GB RAM, 50 GB SSD          │
│    - Approved Host OS: Ubuntu Server 24.04 LTS or Rocky Linux 9             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. NETWORK INGRESS & IP ALLOCATION SPECIFICATION                            │
│    - Dedicated Static Public IPv4 address assigned to the gateway           │
│    - Private static IP, subnet mask, default gateway, and DNS resolvers     │
│    - Confirmation of 1:1 NAT mapping for TCP ports 80 and 443 exclusively   │
│    - Confirmation of isolated DMZ VLAN (e.g., VLAN 30)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. EGRESS & TRANSACTIONAL GATEWAY DETAILS                                   │
│    - Internal SMTP relay hostname, port, and authentication mechanism       │
│    - Indian DLT Principal Entity ID, approved SMS templates & API endpoint  │
│    - Whitelisted outbound HTTPS egress for Docker registries and OS updates │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. DOMAIN & SSL STRATEGY SIGN-OFF                                           │
│    - Registrar DNS administrative access confirmation for authoritative zone│
│    - Decision on SSL: Automated Let's Encrypt vs. Institutional Wildcard CA │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. STORAGE & BACKUP TARGET CONFIRMATION                                     │
│    - 100 GB SSD volume for PostgreSQL DB + 250 GB volume for uploads        │
│    - Secondary independent backup destination IP (NAS/NFS/SSH) with 500 GB  │
│    - Confirmation of daily AES-256 encrypted automated backup schedule      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. FACILITY CONTINUITY & ESCALATION ROSTER                                  │
│    - Online UPS runtime confirmation (minimum 30 minutes) & ATS diesel gen  │
│    - Server hardware OEM AMC warranty status and part-replacement SLA       │
│    - Data-center on-call engineer contact roster (names, shifts, phone #s)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

> [!CAUTION]
> **Implementation Blocker:** Technical implementation of Phase 2 (Docker Compose scripts, Prisma database schemas, and on-premise container configurations) cannot proceed past initial local scaffolding until the Data-Center Operations team formally submits the confirmation deliverables listed above.
