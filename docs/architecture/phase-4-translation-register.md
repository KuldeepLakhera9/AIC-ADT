# Phase 4 — Marathi Translation Status & Content Dependency Register

**Document Version:** 1.0  
**Phase:** Phase 4 — Production Frontend Implementation  
**Task:** Task 7 — English and Marathi Localization Readiness  
**Target Entity:** AIC-ADT Baramati Foundation  
**Language Pairs:** English (en) / Marathi (मराठी - mr)  
**Status Date:** October 2026  

---

## 1. Executive Summary & Translation Governance

This document establishes the official **Translation Status Register** for the AIC-ADT Baramati Foundation website. In accordance with institutional truthfulness standards:
- **No Machine-Generated Placeholders**: Translations utilize approved institutional copy from Phase 1 requirements, Phase 2 prototype scripts (`prototype/script.js`), and NITI Aayog / Atal Innovation Mission bilingual standards.
- **Explicit Content State Tracking**: Every route, component, and data item is classified into one of three strict states:
  1. **Fully Localized**: Approved Marathi copy active on production frontend.
  2. **Localization-Ready**: Architectural scaffolding, route mirroring, typed dictionaries, and UI ready, pending final institutional review of long-form copy.
  3. **English-Only (Statutory / Pending Copy)**: Retained in English with explicit disclaimer; translations require certified institutional review.

---

## 2. Route-by-Route Translation Register

| Route Path | Marathi Equivalent | Content Status | Approved Source / Basis | Notes & Dependencies |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `/mr` | **Fully Localized** | Phase 1 & 2 Approved Copy | Hero, 3 pillars, impact metrics, and navigation cards translated into verified Devanagari. |
| `/about` | `/mr/about` | **Fully Localized** | Institutional Charter & AIM Guidelines | History, ADT legacy, AIM mandate, and 4 pillar sub-links. |
| `/about/mission-vision` | `/mr/about` (fallback) | **Localization-Ready** | Trust Deeds & Annual Reports | High-level mission translated; detailed charter points pending board review. |
| `/about/leadership` | `/mr/about` (fallback) | **Localization-Ready** | Board Resolution Register | Names & designations verified; full Marathi biographies pending translation. |
| `/about/infrastructure` | `/mr/about` (fallback) | **Localization-Ready** | Campus Facility Directory | 110-acre farm, NABL lab, and FabLab overview ready. |
| `/about/partners` | `/mr/about` (fallback) | **Localization-Ready** | MoUs & CSR Partnerships | Partner list ready; Marathi descriptions pending sign-off. |
| `/programs` | `/mr/programs` | **Fully Localized** | Incubation Continuum Specifications | Pre-incubation, Incubation, Acceleration tracks, SISFS & MeitY GENESIS schemes. |
| `/programs/[stage]` | `/mr/programs` (fallback) | **Localization-Ready** | Program Track Guidelines | Individual stage detail pages fall back to main programs overview. |
| `/startups` | `/mr/startups` | **Fully Localized** | Verified Portfolio Register | Ecosystem directory with verified cohort startups (GramHeet, Innosapien, BioPrime, BharatRohan, etc.). |
| `/startups/[slug]` | `/mr/startups` (fallback) | **Localization-Ready** | Portfolio Company Records | Founder case study narratives pending Marathi editorial review. |
| `/innovation` | `/mr/innovation` | **Fully Localized** | 6 Core Research Domain Taxonomy | Agri-mechanization, Smart IoT, Millets Food Processing, Agribusiness, Climate Tech, and Agri-AI. |
| `/innovation/[domain]` | `/mr/innovation` (fallback) | **Localization-Ready** | Technical Lab Specs | Sub-domain deep-dive pages fall back gracefully to parent hub. |
| `/events` | `/mr/events` | **Fully Localized** | Official Campus Calendar | Workshop calendar, intake deadlines, and event card actions. |
| `/events/[slug]` | `/mr/events` (fallback) | **Localization-Ready** | Workshop Agendas | Registration links route directly to official portals. |
| `/events/past` | `/mr/events` (fallback) | **Localization-Ready** | Concluded Event Archives | Concluded cohort records fall back to main events directory. |
| `/resources` | `/mr/resources` | **Fully Localized** | Institutional Document Hub | 4 document pillars (Annual Reports, Whitepapers, Guidelines, Policies) and language notice. |
| `/resources/*` (PDFs) | (English PDFs) | **English-Only (Statutory)** | NITI Aayog / Legal Sanctions | Statutory filings, audited balance sheets, and agreements are legally binding in English. |
| `/news` | `/mr/resources` (fallback) | **Localization-Ready** | Press Release Register | Media releases will be published bilingually upon issuance. |
| `/contact` | `/mr/contact` | **Fully Localized** | Institutional Directory | Shardanagar headquarters, phone lines, triage emails, and 4 department desks. |
| `/contact/directions` | `/mr/contact` (fallback) | **Localization-Ready** | Campus Transit Guide | Transit directions fallback to `/mr/contact` with GPS coordinates. |
| `/privacy-policy` | (English Policy) | **English-Only (Statutory)** | DPDP Act 2023 Compliance Draft | Requires formal legal translation review before Devanagari publication. |
| `/terms-of-service` | (English Terms) | **English-Only (Statutory)** | Legal Counsel Review Draft | Legal terms governing jurisdiction require bilingual legal counsel approval. |

---

## 3. Approved Bilingual Terminology Glossary

To prevent ad-hoc or inconsistent phrasing across developers and content authors, the following verified terminology must be used:

| English Term | Approved Marathi Translation | Context / Usage Rule |
| :--- | :--- | :--- |
| **AIC-ADT Baramati Foundation** | **एआयसी-एडीटी बारामती फाउंडेशन** | Formal institutional name. |
| **Atal Innovation Mission (AIM)** | **अटल इनोव्हेशन मिशन** | NITI Aayog initiative. Always cite with नीती आयोग. |
| **NITI Aayog, Government of India** | **नीती आयोग, भारत सरकार** | National planning authority. |
| **Agricultural Development Trust** | **ॲग्रिकल्चरल डेव्हलपमेंट ट्रस्ट** | Parent trust organization. |
| **Incubator / Incubation** | **इनक्युबेटर / इनक्युबेशन** | Phonetic Devanagari transliteration preferred over obscure neologisms. |
| **Pre-Incubation** | **पूर्व-इनक्युबेशन** | Stage 1 ideation and prototyping. |
| **Acceleration** | **एक्सलरेटर / व्यावसायिक गती** | Growth stage scaling. |
| **Seed Capital / Seed Funding** | **बीजभांडवल / प्रारंभिक भांडवल** | Early-stage financial support. |
| **Startup India Seed Fund Scheme (SISFS)** | **स्टार्टअप इंडिया सीड फंड योजना** | DPIIT flagship scheme. |
| **MeitY GENESIS** | **मेईटी जेनेसिस योजना** | Ministry of Electronics & IT deep-tech scheme. |
| **NABL Accredited Laboratory** | **एनएबीएल मान्यताप्राप्त प्रयोगशाळा** | National Accreditation Board for Testing Labs. |
| **FabLab Maker Space** | **फॅबलॅब मेकर्सपेस** | Prototyping and digital fabrication facility. |
| **Farmer Producer Organization (FPO)** | **शेतकरी उत्पादक कंपनी / संस्था (FPO)** | Community agricultural collectives. |
| **Precision Agriculture / IoT** | **अचूक शेती आणि आयओटी सेन्सर्स** | Smart agriculture domain. |
| **Post-Harvest Management** | **काढणीपश्चात व्यवस्थापन** | Grain, horticulture, and storage technologies. |
| **Climate-Resilient Agriculture** | **हवामान-अनुकूल शेती** | Sustainable ecology and soil tech. |
| **Annual Progress Report** | **वार्षिक प्रगती अहवाल** | Official statutory filings. |
| **Right to Information (RTI)** | **माहितीचा अधिकार (RTI)** | Statutory public disclosures. |

---

## 4. Content Dependency Backlog & Action Items

The following items are logged in the content dependency register for subsequent editorial phases:

1. **DEP-I18N-01: Certified Translation of Statutory Legal Policies**
   - **Scope**: `/privacy-policy` and `/terms-of-service`.
   - **Action**: Retain English master as legally governing. Engage legal translation team for Devanagari translation of DPDP Act disclosures.
2. **DEP-I18N-02: Bilingual PDF Executive Summaries**
   - **Scope**: Annual Progress Reports (FY 2023-24, FY 2024-25).
   - **Action**: Produce 2-page Devanagari executive summaries for statutory submissions alongside the full English audit reports.
3. **DEP-I18N-03: Startup Narrative Bios in Marathi**
   - **Scope**: Startup detail modal / pages (`/startups/[slug]`).
   - **Action**: Collect approved Marathi founder quotes and company overviews from the active portfolio companies.
4. **DEP-I18N-04: Deep-Route Mirroring Expansion**
   - **Scope**: Sub-routes such as `/contact/directions` and `/events/past`.
   - **Action**: Generate dedicated Marathi sub-route pages once high-traffic demand is confirmed via analytics. Current parent fallback ensures zero 404 errors.
