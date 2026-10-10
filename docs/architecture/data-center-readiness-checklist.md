# Data-Center Readiness Assessment & RFI Checklist
## AIC-ADT Baramati Foundation Digital Platform

**Document Version:** 1.0.0  
**Status:** Under Review — Request for Information (RFI) Issued to Data-Center Operations  
**Date:** October 10, 2026  
**Auditor Roles:** Infrastructure Architect, Enterprise Deployment Engineer  
**Target Environment:** On-Premise Data Center, Agricultural Development Trust (ADT), Sharadanagar, Baramati  

---

## 1. Executive Summary & Readiness Assessment Overview

To support the deployment of the proposed modern technology stack (Next.js, NestJS, PostgreSQL with Prisma ORM, Nginx, and Docker Compose), this document establishes a formal **Data-Center Readiness Assessment** and **Request-for-Information (RFI) Checklist**. 

At present, server availability, hardware virtualization, network perimeter configurations, and storage allocations in the organization's existing data center remain **unconfirmed**. In strict adherence to enterprise architecture standards:
- **No infrastructure assumptions are made:** The existence of a dedicated public static IP, enterprise hypervisor, container execution policy, firewall port-forwarding, or spare physical hardware is treated as **Unknown** until formally verified.
- **Zero credential solicitation:** No production passwords, private encryption keys, API tokens, or confidential database credentials are requested.
- **Zero premature production clearance:** The platform will not be declared production-ready until each critical parameter is confirmed in writing by the ADT Data-Center operations team.

---

## 2. Infrastructure Readiness Status Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       READINESS DOMAIN STATUS SUMMARY                       │
├───────────────────────────────────┬───────────────┬─────────────────────────┤
│ Technical Domain                  │ Total Items   │ Status Breakdown        │
├───────────────────────────────────┼───────────────┼─────────────────────────┤
│ 1. Virtualization & Host Compute  │ 5 Requirements│ 4 Unknown, 1 Approval   │
│ 2. Storage & File System Volumes  │ 4 Requirements│ 3 Unknown, 1 Approval   │
│ 3. Network, IP & Firewall Ingress │ 6 Requirements│ 5 Unknown, 1 Approval   │
│ 4. Domain, DNS & SSL Certificates │ 4 Requirements│ 3 Unknown, 1 Approval   │
│ 5. Container Policy & Deployments │ 4 Requirements│ 3 Unknown, 1 Approval   │
│ 6. Database Hosting & Isolation   │ 4 Requirements│ 3 Unknown, 1 Approval   │
│ 7. File Storage & Confidentiality │ 3 Requirements│ 2 Unknown, 1 Approval   │
│ 8. Monitoring, Logging & Support  │ 4 Requirements│ 4 Unknown               │
│ 9. Power Continuity & Facilities  │ 3 Requirements│ 3 Unknown               │
│ 10. Disaster Recovery (RTO / RPO) │ 4 Requirements│ 3 Unknown, 1 Approval   │
│ 11. Administrative Access & SSH   │ 3 Requirements│ 2 Unknown, 1 Approval   │
│ 12. Network Isolation Boundaries  │ 3 Requirements│ 2 Unknown, 1 Approval   │
├───────────────────────────────────┴───────────────┴─────────────────────────┤
│ TOTAL ASSESSMENT REQUIREMENTS: 47 ITEMS (0 Confirmed, 37 Unknown, 10 Appr.) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Comprehensive Data-Center Readiness Checklist

*Status Legend:*
- **Unknown:** Technical configuration, availability, or parameter is currently unconfirmed by the data-center team.
- **Confirmed:** Verified in writing by data-center operations with technical evidence.
- **Not available:** Capability or resource does not exist in the current facility.
- **Approval required:** Institutional policy decision, architectural sign-off, or budget authorization required from management.

---

### 3.1. Virtualization, Compute & Host Operating System

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-CMP-01** | **Dedicated Virtual Machine Provisioning:** Minimum 4 vCPUs (x86_64, non-overcommitted) and 16 GB ECC RAM for Production; 2 vCPUs and 8 GB RAM for Staging. | Ensures predictable application response times under load, preventing resource starvation caused by other campus workloads. | **Unknown** | Hypervisor provisioning receipt; CPU/RAM allocation screenshot. | Data-Center Operations / IT Lead | If under-provisioned, database and API performance degrades under concurrent application traffic. | 14 Days Prior to Sprint 1 |
| **DCR-CMP-02** | **Hypervisor Compatibility:** Confirmation of active virtualization platform (VMware ESXi, Proxmox VE, KVM, or Hyper-V). | Determines guest tools, disk expansion mechanisms, live migration options, and VM snapshot procedures. | **Unknown** | Hypervisor vendor, version number, and cluster architecture confirmation. | Data-Center Operations | Incompatible hypervisor blocks scripted VM templating and automated disaster recovery. | 14 Days Prior to Sprint 1 |
| **DCR-CMP-03** | **Host Operating System Approval:** Deployment of an approved Enterprise Linux LTS distribution (Ubuntu Server 24.04 LTS or Rocky Linux 9 / RHEL 9). | Standardized, hardened operating system baseline with long-term security patching support through 2029+. | **Approval required** | Written sign-off from IT Lead approving the designated Linux distribution. | Campus IT Lead / System Admin | Outdated or non-LTS Linux distributions introduce unpatched kernel CVE vulnerabilities. | 14 Days Prior to Sprint 1 |
| **DCR-CMP-04** | **Host OS Patching & Kernel Maintenance Ownership:** Formal definition of patching schedules, repository mirrors, and maintenance windows. | Regular kernel and package security updates prevent operating system-level compromises. | **Unknown** | Written maintenance SLA; internal apt/dnf update repository access policy. | Data-Center Operations | Unclear patching ownership leads to neglected systems vulnerable to exploits. | 7 Days Prior to Staging Deploy |
| **DCR-CMP-05** | **Hardware Architecture Verification:** Dedicated x86_64 server hardware with VT-x/AMD-V virtualization extensions enabled. | Required for hypervisor guest performance and standard container image execution. | **Unknown** | Host CPU model (e.g., Intel Xeon / AMD EPYC) and BIOS virtualization status. | Hardware Operations Team | Legacy 32-bit or non-standard server hardware cannot run modern containerized runtimes. | 14 Days Prior to Sprint 1 |

---

### 3.2. Storage, Volumes & Expansion Capacity

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-STR-01** | **Primary High-Speed Storage (SSD/NVMe):** Minimum 100 GB SSD/NVMe configured in RAID-1 or RAID-10 for OS, PostgreSQL database, and cache. | Fast input/output operations per second (IOPS) are mandatory for relational database transactions. | **Unknown** | Disk hardware specs, RAID controller model, and benchmark IOPS verification. | Data-Center Storage Admin | Mechanical HDDs (SATA/SAS) cause database query bottlenecking and slow page rendering. | 14 Days Prior to Sprint 1 |
| **DCR-STR-02** | **Document Storage Volume Allocation:** Minimum 250 GB dedicated storage for PDF pitch decks, annual reports, and media assets. | Ensures capacity for large applicant files, pitch decks (up to 20 MB each), and public publication PDFs. | **Unknown** | Allocated volume path, filesystem format (ext4/XFS), and mount-point confirmation. | Data-Center Storage Admin | Storage exhaustion causes file upload failures and database write rejections. | 14 Days Prior to Sprint 1 |
| **DCR-STR-03** | **Dynamic Storage Expansion Policy:** Procedures for expanding virtual disk volumes online without unmounting or data destruction. | Accommodates multi-year startup directory and applicant file growth without downtime. | **Unknown** | LVM (Logical Volume Manager) volume group setup verification. | Data-Center Storage Admin | Fixed non-LVM disk partitions require complex offline migrations when capacity is reached. | 7 Days Prior to Staging Deploy |
| **DCR-STR-04** | **Persistent Storage Encryption Approval:** Approval of filesystem-level or volume-level encryption (LUKS or ZFS native encryption) for applicant documents. | Protects proprietary startup intellectual property against physical disk theft or unauthorized raw disk access. | **Approval required** | Storage encryption policy document; key management plan. | Security Officer / IT Director | Plaintext disk storage violates DPDP Act data protection standards. | 7 Days Prior to Sprint 1 |

---

### 3.3. Internal Network, IP Allocation, DNS & Firewall Ingress

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-NET-01** | **Dedicated Static Public IPv4 Address:** Institutional static public IP assigned to the web platform. | Essential for public DNS resolution, SSL certificate validation, and institutional credibility. | **Unknown** | Public static IP string; ISP contract allocation confirmation. | Campus Network Administrator | If public IP is dynamic, DNS updates will break, causing global platform unavailability. | 14 Days Prior to Sprint 1 |
| **DCR-NET-02** | **Gateway Firewall Port Ingress Rules:** 1:1 NAT or port forwarding allowing external inbound traffic strictly on ports 80 (HTTP) and 443 (HTTPS). | Public web traffic must reach the Nginx reverse proxy; all other external inbound ports must be blocked. | **Unknown** | Firewall configuration screenshot / approval ticket from network team. | Campus Network Administrator | Inbound blocks prevent public access; exposing non-web ports creates network security holes. | 7 Days Prior to Staging Deploy |
| **DCR-NET-03** | **Internal Subnet & Gateway Allocation:** Private static IP assignment (e.g., `10.x.x.x` or `192.168.x.x`), subnet mask, default gateway, and internal DNS resolvers. | Allows the server VM to communicate on the campus management network and resolve dependencies. | **Unknown** | Static IP allocation sheet, gateway IP, and primary/secondary DNS server IPs. | Campus Network Administrator | IP conflicts cause intermittent connectivity drops and packet loss. | 14 Days Prior to Sprint 1 |
| **DCR-NET-04** | **Outbound Internet Egress for Updates & Registries:** Outbound HTTPS (port 443) and HTTP (port 80) access for downloading OS patches and container images. | Necessary for system initialization, security updates, and base container image downloads. | **Unknown** | Proxy server IP/port (if enterprise proxy exists) or direct egress firewall rule confirmation. | Campus Network Administrator | Strict egress blocks prevent `apt/dnf` updates and container image pulls. | 14 Days Prior to Sprint 1 |
| **DCR-NET-05** | **Outbound Transactional Email (SMTP Relay):** Dedicated SMTP relay host and port configuration allowing transactional notifications without port 25 ISP blocking. | Required for applicant password resets, OTP confirmations, and event RSVPs. | **Unknown** | Internal SMTP relay hostname, port (587/465/25), and authentication method. | Network Admin / ADT Mail Admin | ISP port 25 blocking drops all applicant registration emails and password reset links. | 7 Days Prior to Staging Deploy |
| **DCR-NET-06** | **DLT-Compliant Transactional SMS Gateway:** Integration credentials and whitelisted sender ID for Indian telecom SMS dispatch. | Mandatory for applicant phone OTP verification and event registration SMS confirmations. | **Approval required** | DLT Principal Entity ID, registered SMS template IDs, and API gateway documentation. | ADT Telecom / IT Management | Inability to dispatch OTPs blocks founder account creation and portal applications. | 7 Days Prior to Staging Deploy |

---

### 3.4. Domain Name, DNS & SSL Certificates

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-DNS-01** | **Authoritative DNS Zone Management:** Access to the domain registrar or DNS hosting provider for `aicadtbaramatifoundation.org` to update A and AAAA records. | Required to point the official domain to the data-center public IP address during cutover. | **Unknown** | DNS provider name (e.g., GoDaddy), administrative login confirmation, and current TTL setting. | Web & System Manager / Registrar | Inability to modify DNS records delays platform cutover indefinitely. | 14 Days Prior to Sprint 1 |
| **DCR-DNS-02** | **DNS Propagation Strategy & TTL Lowering:** Agreement to lower DNS TTL to 300 seconds 72 hours prior to scheduled production cutover. | Minimizes downtime and enables rapid rollback if unforeseen issues arise during cutover. | **Approval required** | Written cutover execution plan with verified reduced TTL. | Web & System Manager | High TTL (e.g., 86400s) delays global propagation and prolongs cutover disruptions. | 7 Days Prior to Cutover |
| **DCR-DNS-03** | **HTTPS Certificate Strategy & Renewal Ownership:** Selection between automated Let's Encrypt (Certbot HTTP-01/DNS-01) or institutional commercial wildcard certificate. | Eliminates existing audit defects where SSL subjects defaulted to `autoconfig...`. | **Approval required** | Written certificate decision: commercial cert CRT/KEY files OR open port 80 for Let's Encrypt renewal. | System Admin / IT Lead | Expired or invalid certificates trigger alarming browser security warnings, blocking traffic. | 7 Days Prior to Staging Deploy |
| **DCR-DNS-04** | **Subdomain Routing & Wildcard Planning:** Determination of whether staging/UAT will use subdomains (e.g., `staging.aicadtbaramatifoundation.org`). | Allows testing of the new platform on real network infrastructure before overriding the root domain. | **Unknown** | Subdomain DNS record creation approval. | Web & System Manager | Lack of staging subdomain forces risky direct cutover without live network testing. | 14 Days Prior to Sprint 1 |

---

### 3.5. Container Policy & Deployment Workflow

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-CNT-01** | **Container Engine Policy Approval:** Confirmation that Docker Engine (v24+) with Docker Compose (v2+) is permitted on the host OS. | Modern containerization is the foundation of the proposed Next.js, NestJS, PostgreSQL stack. | **Approval required** | Institutional container policy document or written IT Lead waiver. | Security Officer / IT Lead | Host policy prohibiting Docker requires rewriting the architecture to bare-metal systemd services. | 14 Days Prior to Sprint 1 |
| **DCR-CNT-02** | **Rootless Container Execution Policy:** Policy decision on whether containers must execute in rootless mode or standard Docker daemon. | Determines user namespaces, volume permissions, and host security boundary hardening. | **Unknown** | Campus container security guidelines. | System Administrator | Permission mismatches cause persistent volume mount failures for PostgreSQL and Nginx. | 7 Days Prior to Staging Deploy |
| **DCR-CNT-03** | **Container Image Registry Access:** Network egress permission to pull official base images from Docker Hub or an internal harbor registry. | Required for initial container builds and updates (Node.js, PostgreSQL, Nginx, Redis). | **Unknown** | Test image pull verification (`docker pull alpine`) from host terminal. | Network Admin / Sys Admin | Inability to pull images requires cumbersome manual offline tarball image transfers. | 14 Days Prior to Sprint 1 |
| **DCR-CNT-04** | **Deployment Privilege & Sudo Access:** Designated administrative user accounts with permissions to run Docker Compose commands. | Development and deployment engineers must be able to execute rolling service updates. | **Approval required** | Non-root system account provisioned in the `docker` user group. | System Administrator | Restrictive permissions prevent continuous deployment and automated service restarts. | 7 Days Prior to Staging Deploy |

---

### 3.6. PostgreSQL Database Hosting, Isolation & Maintenance

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-DB-01** | **PostgreSQL Hosting Model Confirmation:** Decision between containerized PostgreSQL (inside Docker Compose) vs. dedicated campus DB server. | Clarifies deployment topology, connection strings, backup scripts, and resource allocation. | **Approval required** | Architecture decision sign-off from IT Lead. | Infrastructure Architect / IT Lead | Unclear DB ownership causes conflicting backup and maintenance procedures. | 14 Days Prior to Sprint 1 |
| **DCR-DB-02** | **Database Network Isolation:** Strict binding of PostgreSQL port 5432 to the internal private container bridge; zero external WAN binding. | Protects applicant profiles, evaluation rubrics, and CMS data from external SQL injection and brute-force scans. | **Unknown** | Docker network configuration file; port binding audit (`netstat -tuln`). | Deployment Engineer | Exposing database ports to the internet creates an immediate target for automated ransomware. | 7 Days Prior to Staging Deploy |
| **DCR-DB-03** | **Database Encoding & Collation Standards:** Enforce `UTF8` character set and Unicode collation (`en_US.UTF-8` and `mr_IN.UTF-8`). | Mandatory for storing Devanagari script (Marathi text) accurately without character corruption. | **Unknown** | Test PostgreSQL initialization script verifying `lc_collate = 'en_US.UTF-8'`. | Database Admin / Lead Dev | Non-UTF8 databases garble Marathi text, resulting in unreadable question marks (`???`). | 7 Days Prior to Staging Deploy |
| **DCR-DB-04** | **Connection Pooling & Tuning Baseline:** Allocation of database connection pool headroom (minimum 50 concurrent connections). | Accommodates Next.js frontend server-side rendering and NestJS API queries simultaneously. | **Unknown** | PostgreSQL `postgresql.conf` tuning plan (`max_connections = 100`, `shared_buffers = 2GB`). | Database Admin | Inadequate connection limits trigger "too many connections" errors during traffic spikes. | 7 Days Prior to Staging Deploy |

---

### 3.7. File Storage & Confidential Document Segregation

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-DOC-01** | **Physical Directory Segregation:** Hardened directory segregation between public publications (`/storage/public`) and confidential applicant uploads (`/storage/private`). | Ensures public web servers cannot serve confidential founder pitch decks or financial statements directly. | **Approval required** | Directory tree specification and Nginx configuration rules. | System Administrator | Accidental public exposure of founder pitch decks creates legal liability. | 7 Days Prior to Staging Deploy |
| **DCR-DOC-02** | **Filesystem Permissions & Ownership:** Dedicated non-root service account (`uid: 1001`) with exclusive read/write permissions on upload directories. | Prevents local file inclusion (LFI) attacks and unauthorized file system traversal. | **Unknown** | Host directory permission listing (`ls -la /storage`). | System Administrator | Incorrect permissions block file uploads or allow unauthorized cross-directory access. | 7 Days Prior to Staging Deploy |
| **DCR-DOC-03** | **Anti-Virus & ClamAV Daemon Integration:** On-premise ClamAV scanning integration for all incoming PDF/PPTX file uploads. | Prevents malicious macro-enabled documents or weaponized PDFs from infecting data-center servers. | **Unknown** | ClamAV daemon installation and scanning benchmark verification. | Security Officer / Sys Admin | Uploading uninspected files risks internal campus network infection. | 7 Days Prior to Sprint 1 |

---

### 3.8. Monitoring, Logging & Support Ownership

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-MON-01** | **Proactive System Health Monitoring:** Uptime and resource utilization monitoring (CPU, RAM, disk space, Nginx response status). | Detects degradation, memory leaks, and service crashes before users experience outages. | **Unknown** | Integration with campus monitoring tool (Zabbix, Nagios, Prometheus) or standalone setup. | Data-Center Operations | Silent server crashes lead to extended, unacknowledged outages. | 7 Days Prior to Staging Deploy |
| **DCR-MON-02** | **Centralized Log Management & Log Rotation:** Daily log rotation (`logrotate`) and centralized aggregation for Nginx, NestJS, and PostgreSQL. | Prevents uncompressed log files from filling up the root disk volume; provides forensic audit trails. | **Unknown** | Log rotation configuration file (`/etc/logrotate.d/aic-adt`). | System Administrator | Unrotated logs rapidly exhaust disk space, causing sudden database crashes. | 7 Days Prior to Staging Deploy |
| **DCR-MON-03** | **Emergency Alerting & Incident Notification:** Automated email and SMS alerts dispatched to on-call IT engineers upon service disruption. | Ensures response times within the institutional SLA (sub-30 minute notification). | **Unknown** | Alerting recipient list and test notification verification. | Data-Center Operations | Alerts sent to unmonitored mailboxes result in ignored production failures. | 7 Days Prior to Production Cutover |
| **DCR-MON-04** | **Support Ownership & 24/7 Physical Facility Escalation:** Documented contact roster for on-duty data-center engineers for physical server resets. | Required when operating an on-premise data center subject to physical hardware or power issues. | **Unknown** | Tier-1 / Tier-2 / Tier-3 support contact roster with phone numbers and shift timings. | Data-Center Operations | Lack of escalation contacts leaves the system offline during weekends and holidays. | 7 Days Prior to Production Cutover |

---

### 3.9. Facilities, Power Continuity & Hardware Support

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-PWR-01** | **Uninterruptible Power Supply (UPS) Protection:** Dual-conversion online UPS with minimum 30 minutes of battery runtime under full load. | Protects database storage against sudden power cutoffs, preventing filesystem and database corruption. | **Unknown** | UPS capacity (kVA), battery health audit, and runtime calculation sheet. | Facility Operations / Electrical Lead | Unprotected power outages corrupt PostgreSQL WAL logs and damage physical storage. | 14 Days Prior to Sprint 1 |
| **DCR-PWR-02** | **Automated Diesel Generator Backup:** Campus backup generator with automated transfer switch (ATS) activating within 60 seconds of grid failure. | Guarantees extended operational continuity during regional electricity load shedding in Baramati. | **Unknown** | ATS test logs and generator fuel maintenance protocols. | Facility Operations | Extended power cuts exhausting UPS batteries bring the entire data center offline. | 14 Days Prior to Sprint 1 |
| **DCR-PWR-03** | **Physical Server Hardware Warranty & Vendor SLA:** Active hardware maintenance contract (OEM AMC with Dell, HP, or Lenovo) with 4-hour on-site response. | Ensures physical replacement parts (failed power supplies, disks, RAM) are available rapidly. | **Unknown** | Server serial number, AMC contract status, and expiry date. | IT Management | Out-of-warranty hardware failure can halt the platform for weeks awaiting spare parts. | 14 Days Prior to Sprint 1 |

---

### 3.10. Disaster Recovery, Backup Retention & Recovery Objectives

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-BCK-01** | **Automated Daily Encrypted Backups:** Automated nightly script executing `pg_dump` and incremental document sync, encrypted via AES-256. | Safeguards institutional records, application dossiers, and CMS copy against catastrophic loss. | **Approval required** | Backup shell script review and encryption key generation protocol. | System Administrator | Unencrypted backups expose confidential founder applications if backup media is copied. | 7 Days Prior to Staging Deploy |
| **DCR-BCK-02** | **Physically Independent Backup Destination:** Secondary storage target (NAS, SAN, or separate server rack in an alternate campus building). | Protects against local server chassis failure, disk array collapse, or local room fire. | **Unknown** | Secondary storage IP, protocol (NFS/SSH/SMB), and capacity allocation. | Data-Center Storage Admin | Backups stored on the same physical disk array are destroyed if the server hardware fails. | 14 Days Prior to Sprint 1 |
| **DCR-BCK-03** | **Formal Recovery Point (RPO ≤ 24h) & Recovery Time (RTO ≤ 4h):** Institutional commitment to maximum 24h data loss and maximum 4h recovery duration. | Establishes measurable business continuity metrics for NITI Aayog and institutional governance. | **Approval required** | Signed disaster recovery policy agreement from IT Director and CEO. | IT Management / CEO Office | Undefined RTO/RPO leaves recovery timelines ambiguous during an emergency. | 7 Days Prior to Sprint 1 |
| **DCR-BCK-04** | **Quarterly Disaster Recovery Simulation Drill:** Commitment to execute dry-run test restores on a clean VM once every 90 days. | Verifies that backup archives are valid, uncorrupted, and restorable within the RTO window. | **Unknown** | Written schedule for DR drills and post-restore verification checklist. | Data-Center Operations | Untested backups frequently fail during real disasters due to silent script errors. | 7 Days Prior to Production Cutover |

---

### 3.11. Administrative Access & Security Perimeter

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-SEC-01** | **SSH Key-Only Authentication & Port Hardening:** Root password login disabled; SSH accessible only via ED25519/RSA-4096 public keys. | Prevents automated internet-wide SSH brute-force attacks and credential stuffing. | **Unknown** | Host `/etc/ssh/sshd_config` inspection (`PasswordAuthentication no`, `PermitRootLogin no`). | System Administrator | Password-based SSH logins are constantly targeted by automated botnets. | 14 Days Prior to Sprint 1 |
| **DCR-SEC-02** | **Administrative Network Boundary & Bastion Access:** SSH port 22 and administrative consoles accessible strictly via internal campus VLAN or VPN. | Eliminates exposure of administrative entry points to the public internet. | **Unknown** | Firewall inbound rules showing port 22 restricted to campus subnet `10.x.x.x`. | Campus Network Administrator | Publicly exposed SSH ports invite aggressive port scanning and zero-day exploits. | 14 Days Prior to Sprint 1 |
| **DCR-SEC-03** | **Host-Level Firewall & Fail2ban Enforcement:** Active host firewall (UFW / firewalld) and Fail2ban blocking repeated connection anomalies. | Defense-in-depth protection even if perimeter network firewalls experience temporary misconfiguration. | **Unknown** | Active firewall status (`ufw status verbose` / `firewall-cmd --list-all`). | System Administrator | Unprotected host OS leaves internal container communication ports vulnerable. | 7 Days Prior to Staging Deploy |

---

### 3.12. Network Isolation from Internal Agricultural Datasets

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DCR-ISO-01** | **VLAN Isolation from Campus Systems:** Hosting the public web platform on a dedicated, isolated Virtual Local Area Network (VLAN). | Prevents compromised web containers from traversing into internal ADT ERP, student networks, or KVK databases. | **Approval required** | Network switch VLAN tagging schedule (e.g., VLAN 30: Public Web DMZ). | Campus Network Administrator | Placing public servers on the flat internal network exposes all campus devices to lateral movement. | 14 Days Prior to Sprint 1 |
| **DCR-ISO-02** | **Zero Direct Access to Farmer & IoT Data Lakes:** Explicit firewall rules blocking outbound connections from the web server into internal agronomic data lakes. | Upholds strict scope boundaries (`docs/requirements/out-of-scope.md`), preventing leaks of farmer personal records. | **Unknown** | Egress firewall rule table confirming drop rules to internal database subnets. | Campus Network Administrator | Lateral connection access risks exposing farmer Aadhaar, land records, or telemetry. | 14 Days Prior to Sprint 1 |
| **DCR-ISO-03** | **Air-Gapped Isolation from NABL LIMS Network:** Complete network separation between the public website and NABL testing equipment computers. | Protects certified analytical laboratory instruments from malware and unauthorized external queries. | **Unknown** | Network topology map verifying Analytical Lab instruments are on an air-gapped subnet. | Lab Systems Admin / Network Admin | Contaminating analytical lab instrumentation invalidates NABL compliance and data integrity. | 14 Days Prior to Sprint 1 |
