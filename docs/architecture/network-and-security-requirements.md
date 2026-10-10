# Network & Security Requirements Specification
## Next-Generation Digital Platform for AIC-ADT Baramati Foundation

**Document Version:** 1.0.0  
**Status:** Draft — Technical Assessment & Validation Required  
**Date:** October 10, 2026  
**Authors:** Infrastructure Architect, Enterprise Network Security Engineer  
**Target Environment:** On-Premise Data Center, Agricultural Development Trust (ADT), Sharadanagar, Baramati  

---

## 1. Network Topology & Zero-Trust Perimeter Architecture

The network architecture for hosting the public digital platform within the organization's existing data center enforces a **Demilitarized Zone (DMZ) isolation model**. Under this architecture, the public web server is segregated from the core institutional campus network, ensuring that external traffic can never reach internal agricultural databases, student ERP systems, or NABL laboratory instrumentation.

```
                            PUBLIC INTERNET (WAN)
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │ Enterprise Edge Firewall  │
                        │ (Inbound: 80 & 443 Only)  │
                        └───────────────────────────┘
                                      │
               ┌──────────────────────┴──────────────────────┐
               │                                             │
               ▼                                             ▼
   ┌───────────────────────┐                     ┌───────────────────────┐
   │ DMZ VLAN (VLAN 30)    │                     │ CAMPUS VLANs (VLAN 10)│
   │ ├─ Web VM (Host OS)   │                     │ ├─ KVK Farmer Data    │
   │ ├─ NGINX Reverse Proxy│    STRICT FIREWALL  │ ├─ Student/Staff ERP  │
   │ ├─ Next.js Frontend   │ ◄─────────────────► │ ├─ Agronomy IoT Feeds │
   │ ├─ NestJS Backend     │    ISOLATION BARRIER│ ├─ NABL Lab PC Network│
   │ └─ PostgreSQL DB      │   (Zero Lateral Mvt)│ └─ Campus Wi-Fi Users │
   └───────────────────────┘                     └───────────────────────┘
               │
               ▼
   ┌───────────────────────┐
   │ Administrative Ingress│
   │ ├─ Port 22 (SSH Keys) │
   │ └─ Restricted strictly│
   │    to Campus VPN/LAN  │
   └───────────────────────┘
```

---

## 2. Formal Network & Security Requirements Matrix

*Status Legend:*
- **Unknown:** Technical configuration or parameter is currently unconfirmed by the data-center team.
- **Confirmed:** Verified in writing by data-center operations with technical evidence.
- **Not available:** Capability or resource does not exist in the current facility.
- **Approval required:** Institutional policy decision, architectural sign-off, or budget authorization required from management.

---

### 2.1. Public Ingress, IP Allocation & Perimeter Firewall

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-ING-01** | **Dedicated Public Static IPv4 Address:** Dedicated public IPv4 address assigned to the data-center gateway for AIC-ADT web traffic. | Essential for public DNS A-record mapping, reliable routing, and SSL certificate issuance. | **Unknown** | Static IP allocation sheet from campus internet service provider (ISP). | Campus Network Administrator | Dynamic IP allocation causes DNS desynchronization, taking the website offline globally. | 14 Days Prior to Sprint 1 |
| **NET-ING-02** | **Edge Firewall Ingress Rule Hardening:** Inbound firewall rule allowing external traffic exclusively on TCP Port 80 (HTTP) and TCP Port 443 (HTTPS); all other inbound ports blocked. | Exposes only the hardened Nginx reverse proxy; shields internal application ports and databases from internet scans. | **Unknown** | Perimeter firewall rule screenshot / network change ticket. | Campus Network Administrator | Accidental exposure of non-web ports (e.g., 22, 5432, 6379) creates immediate targets for automated exploit bots. | 7 Days Prior to Staging Deploy |
| **NET-ING-03** | **Network Address Translation (NAT) Routing:** 1:1 NAT or port forwarding directing public ports 80 and 443 to the private IP of the DMZ Web VM. | Maps incoming internet traffic directly to the containerized reverse proxy. | **Unknown** | Gateway router NAT mapping table confirmation. | Campus Network Administrator | Misconfigured NAT rules drop external incoming packets, resulting in connection timeouts. | 7 Days Prior to Staging Deploy |

---

### 2.2. Network Isolation from Internal Campus & Agricultural Datasets

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-ISO-01** | **Dedicated DMZ Virtual Local Area Network (VLAN):** Web VM hosted on an isolated subnet/VLAN (e.g., VLAN 30: `10.30.0.0/24`) with strict inter-VLAN routing controls. | Prevents compromised web containers from traversing laterally into internal campus networks. | **Approval required** | Network switch VLAN configuration and routing policy document. | Campus Network Administrator | Hosting public web servers on a flat campus network exposes all internal systems to lateral movement. | 14 Days Prior to Sprint 1 |
| **NET-ISO-02** | **Hard Firewall Barrier to Farmer & IoT Data Lakes:** Explicit firewall drop rules blocking outbound connections from the DMZ Web VM to internal Krishi Vigyan Kendra (KVK) farmer databases. | Enforces strict scope boundaries (`docs/requirements/out-of-scope.md`), protecting farmer personal records and agronomic sensor data. | **Unknown** | Firewall inter-VLAN access control list (ACL) verifying drop rules to internal database IPs. | Campus Network Administrator | Unauthorized lateral database connections create severe data protection liabilities under the DPDP Act. | 14 Days Prior to Sprint 1 |
| **NET-ISO-03** | **Air-Gapped Isolation from NABL Testing Instruments:** Zero physical or network connection between the web server and computers operating NABL analytical testing equipment. | Protects calibrated, certified analytical laboratory instruments (GC-MS, HPLC) from network-borne malware. | **Unknown** | Analytical lab network topology verification confirming instruments are on an isolated LAN. | Lab Systems Admin / Network Admin | Network contamination of testing computers invalidates NABL quality compliance. | 14 Days Prior to Sprint 1 |

---

### 2.3. Outbound Network Connectivity (Egress)

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-EGR-01** | **Outbound HTTPS Egress for Container Registries & OS Patches:** Permitted outbound TCP port 443 to official Linux and Docker package mirrors. | Necessary for system initialization, security kernel updates, and automated Let's Encrypt certificate renewals. | **Unknown** | Outbound firewall egress rule confirmation or proxy server configuration details. | Campus Network Administrator | Complete outbound egress blocking prevents automated security patching and cert renewals. | 14 Days Prior to Sprint 1 |
| **NET-EGR-02** | **Outbound Transactional SMTP Relay Egress:** Firewall permission allowing outbound connections to the campus SMTP relay on port 587 or 465 (avoiding port 25). | Required for applicant verification emails, password resets, and event registration receipts. | **Unknown** | SMTP relay IP, port, and authentication policy from mail administrator. | Network Admin / ADT Mail Admin | Inability to dispatch emails breaks applicant registration and password recovery. | 7 Days Prior to Staging Deploy |
| **NET-EGR-03** | **Outbound HTTPS Egress for DLT SMS Gateway:** Permitted outbound HTTPS to the approved Indian DLT SMS telecom gateway API. | Required for transmitting applicant 6-digit mobile OTP verification codes during registration. | **Approval required** | Firewall whitelist confirmation for SMS gateway provider API endpoint. | Campus Network Administrator | Blocked SMS gateway egress prevents mobile phone verification for rural founders. | 7 Days Prior to Staging Deploy |

---

### 2.4. Domain Name, DNS & SSL/TLS Configuration

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-DNS-01** | **Authoritative DNS Zone Management & Cutover Planning:** Administrative control of the domain `aicadtbaramatifoundation.org` at registrar (GoDaddy/NIXI). | Required to update DNS A-records pointing the official domain to the data-center static IP during cutover. | **Unknown** | Registrar account access verification and current DNS zone record export. | Web & System Manager / Registrar | Lack of registrar credentials prevents pointing the official domain to the new server. | 14 Days Prior to Sprint 1 |
| **NET-DNS-02** | **HTTPS Certificate Lifecycle & Renewal Ownership:** Selection and provisioning of valid TLS certificate: Let's Encrypt certbot automated renewal OR institutional commercial wildcard. | Eliminates existing audit finding where SSL cert defaulted to `autoconfig...` subject. | **Approval required** | Written certificate decision: commercial cert CRT/KEY files OR open port 80 for Let's Encrypt certbot. | System Admin / IT Lead | Expired or untrusted SSL certificates trigger alarming security warnings, blocking visitors. | 7 Days Prior to Staging Deploy |
| **NET-DNS-03** | **TLS Protocol Hardening & Modern Cipher Suites:** Web proxy configured strictly for TLS 1.3 and TLS 1.2; legacy protocols (TLS 1.0, 1.1, SSLv3) disabled. | Prevents cryptographic downgrade attacks and satisfies modern government security standards. | **Approval required** | Nginx SSL configuration file review targeting an A+ rating on SSL Labs test. | Infrastructure Architect | Supporting obsolete TLS ciphers exposes user sessions to protocol decryption exploits. | 7 Days Prior to Staging Deploy |

---

### 2.5. Administrative Ingress, SSH & Security Perimeter

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-ADM-01** | **SSH Key-Only Authentication & Root Login Prohibition:** Host SSH (`sshd`) configured strictly for public-key authentication (ED25519/RSA-4096); password logins disabled. | Neutralizes automated brute-force password guessing attacks against administrative ports. | **Unknown** | Host `/etc/ssh/sshd_config` inspection verifying `PasswordAuthentication no`. | System Administrator | Password-authenticated SSH ports are constantly targeted by automated scanning botnets. | 14 Days Prior to Sprint 1 |
| **NET-ADM-02** | **Administrative Network Boundary & Bastion Access:** SSH port 22 accessible strictly from internal campus management subnet (`10.x.x.x`) or authenticated staff VPN. | Completely conceals administrative interfaces from the public internet. | **Unknown** | Firewall inbound rule verifying port 22 is blocked from all external WAN IP addresses. | Campus Network Administrator | Publicly exposed SSH ports invite aggressive zero-day exploitation attempts. | 14 Days Prior to Sprint 1 |
| **NET-ADM-03** | **Host-Level Firewall & Automated Intrusion Blocking:** Active UFW / firewalld on host OS with Fail2ban blocking anomalous connection behavior. | Provides defense-in-depth security on the server itself, independent of network firewalls. | **Unknown** | Host firewall active rule report (`ufw status verbose`). | System Administrator | Unprotected host OS leaves internal communication ports accessible if perimeter firewall fails. | 7 Days Prior to Staging Deploy |

---

### 2.6. Web Application Firewall (WAF) & Incident Response

| Requirement ID | Requirement Specification | Why It Is Needed | Current Status | Evidence Needed | Responsible Department | Dependency or Risk | Decision Deadline |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **NET-WAF-01** | **Web Application Firewall (WAF) Baseline:** Upstream hardware WAF (e.g., Fortinet / Sophos) or containerized ModSecurity / OWASP Core Rule Set. | Inspects incoming HTTP payloads for SQL injection, cross-site scripting (XSS), and malicious upload patterns. | **Approval required** | Confirmation of campus perimeter WAF capabilities or approval of containerized ModSecurity. | IT Security / Network Admin | Absence of WAF increases reliance on application-layer input sanitization alone. | 14 Days Prior to Sprint 1 |
| **NET-WAF-02** | **Incident Response & Emergency Severance Procedure:** Documented procedure to isolate the web server from the network within 15 minutes of detected compromise. | Limits damage and prevents data exfiltration in the event of an active security intrusion. | **Approval required** | Signed incident response protocol with on-call network administrator contact tree. | IT Management / CEO Office | Undefined incident response leads to delayed reactions during active security breaches. | 7 Days Prior to Production Cutover |
