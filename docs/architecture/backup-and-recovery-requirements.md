# Backup & Disaster Recovery Requirements Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Technical Assessment & Validation Required  
**Date:** October 10, 2026  
**Authors:** Infrastructure Architect, Enterprise Systems Reliability Engineer  
**Target Environment:** On-Premise Data Center, Agricultural Development Trust (ADT), Sharadanagar, Baramati  

---

## 1. Executive Summary & Continuity Mandate

The AIC-ADT digital platform houses institutional records, startup founder applications, proprietary agricultural technology pitch decks, reviewer scorecards, and public transparency disclosures. To ensure business continuity, legal compliance under the Digital Personal Data Protection (DPDP) Act, and protection against catastrophic hardware failure, power disruptions, or ransomware, this document establishes the **Backup & Disaster Recovery Requirements**.

### Institutional Service Level Objectives:
1. **Recovery Point Objective (RPO) ≤ 24 Hours:** In the event of catastrophic primary disk or server destruction, the maximum allowable data loss is 24 hours of operational data (achieved through automated daily encrypted backups; reduced to 6 hours during active cohort deadlines).
2. **Recovery Time Objective (RTO) ≤ 4 Hours:** The complete digital platform must be restored, validated, and operational from backup archives onto a standby or newly provisioned virtual machine within 4 hours.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DISASTER RECOVERY ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ PRIMARY PRODUCTION SERVER (DMZ VLAN)                                        │
│ ├─ PostgreSQL Database (Live Transactions)                                  │
│ ├─ Document Storage (/storage/public & /storage/private)                    │
│ └─ Nightly Automated Backup Cron (02:00 AM IST)                             │
│     │                                                                       │
│     ├─ 1. Executes pg_dump (Custom compressed format)                       │
│     ├─ 2. Captures incremental tar of upload directories                    │
│     ├─ 3. Applies AES-256 Symmetric Encryption (GPG/OpenSSL)                │
│     └─ 4. Generates SHA-256 Checksum Manifest                               │
│            │                                                                │
│            ▼ (Encrypted Network Transfer via SSH/rsync/NFS)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ INDEPENDENT BACKUP TARGET (SECONDARY CAMPUS BUILDING / NAS)                 │
│ ├─ Physical chassis segregation (Separate from primary host)                │
│ ├─ Local Storage Volume: Minimum 500 GB dedicated capacity                  │
│ ├─ Automated Retention & Pruning:                                           │
│ │   ├─ Daily Backups: Retained for 14 Days                                  │
│ │   ├─ Weekly Backups: Retained for 8 Weeks                                 │
│ │   └─ Monthly Backups: Retained for 12 Months                              │
│ └─ Read-Only Mount / Immutable Storage (Ransomware protection)              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Formal Backup & Recovery Requirements Matrix

*Status Legend:*
- **Unknown:** Technical configuration or parameter is currently unconfirmed by the data-center team.
- **Confirmed:** Verified in writing by data-center operations with technical evidence.
- **Not available:** Capability or resource does not exist in the current facility.
- **Approval required:** Institutional policy decision, architectural sign-off, or budget authorization required from management.

---

### 2.1. Backup Automation, Scope & Cryptographic Protection

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **BCK-AUT-01** | **Automated Nightly Database Backups:** Automated script executing `pg_dump` in custom compressed format (`-Fc`) at 02:00 AM IST daily. | Captures complete transactional schema, tables, applicant dossiers, CMS pages, and audit logs. | **Approval required** | Automated backup shell script review and cron configuration. | System Administrator | Relying on manual backups guarantees human error and missed recovery points during incidents. | 7 Days Prior to Staging Deploy |
| **BCK-AUT-02** | **Document Uploads Incremental Backup:** Nightly incremental backup of `/storage/private` (pitch decks) and `/storage/public` (reports). | Protects proprietary founder uploads, pitch deck PDFs, and publication documents against loss. | **Unknown** | Storage sync script (`rsync` / `rclone`) configuration review. | System Administrator | Backing up only the database leaves uploaded pitch deck files orphaned and missing upon restore. | 7 Days Prior to Staging Deploy |
| **BCK-ENC-01** | **AES-256 Encryption of Backup Archives:** Symmetric encryption (AES-256-CBC/GCM via GPG/OpenSSL) applied to all backup archives prior to transmission. | Confidential founder applications and intellectual property must remain encrypted at rest on backup media. | **Approval required** | Encryption key management protocol and sample encrypted archive test. | Security Officer / Sys Admin | Storing unencrypted database dumps on shared network storage violates DPDP data protection rules. | 7 Days Prior to Staging Deploy |
| **BCK-INT-01** | **SHA-256 Checksum Integrity Verification:** Automated generation and verification of SHA-256 hashes for every backup archive upon creation. | Detects silent bit-rot, storage corruption, or incomplete network transfers before archives are archived. | **Approval required** | Checksum verification script output log. | Lead Deployment Engineer | Corrupted backup files will fail during emergency restoration, resulting in total data loss. | 7 Days Prior to Staging Deploy |

---

### 2.2. Independent Backup Destinations & Retention

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **BCK-DST-01** | **Physically Independent Backup Destination:** Secondary storage target (Network Attached Storage - NAS or dedicated server) located in a separate physical rack/room. | Protects against local server chassis collapse, RAID controller failure, or local physical damage. | **Unknown** | Secondary NAS IP address, protocol (NFS/SSH/SMB), and capacity allocation confirmation. | Data-Center Storage Admin | Storing backups on the same physical drive array means hardware failure destroys both data and backups. | 14 Days Prior to Sprint 1 |
| **BCK-DST-02** | **Backup Storage Volume Sizing:** Minimum 500 GB dedicated storage on the secondary backup target. | Accommodates multi-generational backup retention (14 dailies, 8 weeklies, 12 monthlies) without overflow. | **Unknown** | Storage volume allocation receipt from secondary storage system. | Data-Center Storage Admin | Backup target storage exhaustion causes backup scripts to fail silently, halting data protection. | 14 Days Prior to Sprint 1 |
| **BCK-RET-01** | **Formal Grandfather-Father-Son (GFS) Retention Policy:** Automated pruning schedule: retain 14 daily, 8 weekly, and 12 monthly backup snapshots. | Balances historical recovery granularity with storage capacity management. | **Approval required** | Backup retention script review and institutional data policy sign-off. | System Admin / IT Director | Unpruned backups fill storage; over-pruned backups eliminate point-in-time historical recovery. | 7 Days Prior to Staging Deploy |
| **BCK-IMM-01** | **Immutable / Write-Once Backup Protection:** Secondary backup volume configured with read-only permissions or append-only snapshots (anti-ransomware). | Protects historical backup archives from malicious deletion if the production server is compromised. | **Unknown** | NAS snapshot configuration or write-once retention policy confirmation. | Data-Center Storage Admin | Sophisticated ransomware encrypts both live systems and accessible network backup drives. | 7 Days Prior to Production Cutover |

---

### 2.3. Disaster Recovery Objectives & Restore Testing

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **BCK-RTO-01** | **Recovery Time Objective (RTO ≤ 4 Hours):** Formal commitment that the platform will be restored and operational within 4 hours of hardware provisioning. | Restores public services, applicant portals, and event registration promptly following an outage. | **Approval required** | Signed Disaster Recovery SLA from IT Director and CEO. | IT Management / CEO Office | Undefined recovery targets result in unstructured, delayed responses during server disasters. | 7 Days Prior to Sprint 1 |
| **BCK-RPO-01** | **Recovery Point Objective (RPO ≤ 24 Hours):** Formal commitment to maximum 24 hours of data loss (reduced to 6h during active application deadlines). | Establishes the maximum acceptable transactional data loss under institutional governance. | **Approval required** | Signed Disaster Recovery SLA from IT Director and CEO. | IT Management / CEO Office | Exceeding 24h data loss forces applicants to re-enter complex multi-step application forms. | 7 Days Prior to Sprint 1 |
| **BCK-DRL-01** | **Quarterly Dry-Run Restore Simulation Drills:** Mandatory quarterly restore drill restoring encrypted archives onto an isolated clean VM. | Proves that backup archives are valid, uncorrupted, and restorable within the RTO target. | **Unknown** | Written schedule for quarterly disaster recovery drills and verification logs. | Data-Center Operations | Untested backups frequently fail during real disasters due to silent syntax errors or missing keys. | 7 Days Prior to Production Cutover |

---

### 2.4. Power Continuity, Facilities & Hardware Maintenance

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **BCK-PWR-01** | **Uninterruptible Power Supply (UPS) Protection:** Online dual-conversion UPS with minimum 30 minutes runtime under full data-center load. | Prevents sudden power cutoffs from corrupting PostgreSQL database transactions and disk partitions. | **Unknown** | UPS model, kVA capacity, battery load calculation, and battery health test log. | Facility Operations / Electrical Lead | Unprotected power outages corrupt database transaction write-ahead logs (WAL). | 14 Days Prior to Sprint 1 |
| **BCK-PWR-02** | **Automated Diesel Generator Backup:** Campus diesel generator with Automated Transfer Switch (ATS) engaging within 60 seconds of grid failure. | Guarantees operational continuity during regional electricity load shedding in Baramati. | **Unknown** | ATS test logs, generator service logs, and on-site fuel reserve policy. | Facility Operations | Grid failure exceeding UPS battery capacity causes sudden server crash and hardware stress. | 14 Days Prior to Sprint 1 |
| **BCK-HWD-01** | **Server Hardware OEM Warranty & AMC Contract:** Active hardware maintenance contract (Dell / HP / Lenovo) with 4-hour on-site part replacement. | Ensures failed physical server components (disks, RAM, power supply units) are replaced rapidly. | **Unknown** | Server chassis serial number, OEM service contract level, and AMC expiration date. | IT Management | Out-of-warranty hardware failure halts the entire platform for weeks awaiting replacement parts. | 14 Days Prior to Sprint 1 |

---

## 3. Disaster Recovery Execution Protocol

In the event of primary hardware failure, fire, or catastrophic data corruption, the designated operations team executes the following emergency recovery sequence:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DISASTER RECOVERY PLAYBOOK (RTO ≤ 4H)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: TRIAGE & STANDBY PROVISIONING (0 - 60 Minutes)                     │
│ 1. Incident Commander declares Disaster State; notifies IT Director & CEO.  │
│ 2. Data-Center Operator provisions clean standby VM from template.          │
│ 3. Verifies Docker Engine, Docker Compose, and network IP configuration.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: BACKUP RETRIEVAL & DECRYPTION (60 - 120 Minutes)                   │
│ 4. System Administrator locates latest verified archive on secondary NAS.   │
│ 5. Validates SHA-256 checksum manifest against the archive.                 │
│ 6. Decrypts database and storage archives using secure offline GPG key.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: DATABASE & VOLUME RESTORATION (120 - 180 Minutes)                  │
│ 7. Starts PostgreSQL container; initializes database schema.                │
│ 8. Executes pg_restore into PostgreSQL database; verifies zero fatal errors.│
│ 9. Unpacks /storage/public and /storage/private volumes with proper uid/gid.│
├─────────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: VALIDATION, CUTOVER & AUDIT (180 - 240 Minutes)                    │
│ 10. Starts Next.js, NestJS, Redis, and Nginx containers via Docker Compose. │
│ 11. Executes automated sanity health checks (/api/health returns HTTP 200). │
│ 12. Updates perimeter firewall NAT to route traffic to standby VM IP.       │
│ 13. Verifies public platform accessibility; logs recovery event in audit log│
└─────────────────────────────────────────────────────────────────────────────┘
```
