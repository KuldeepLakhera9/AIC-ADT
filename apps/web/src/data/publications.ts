/**
 * AIC-ADT Baramati Foundation — Publications & Resources Data Architecture
 * Source of truth: docs/requirements/sitemap.md, docs/audit/content-verification-register.md,
 * and apps/web/public/downloads directory
 */

export type PublicationCategory =
  | "All"
  | "Annual Report"
  | "Research Whitepaper"
  | "Program Guideline"
  | "Policy & Compliance"
  | "Brand Asset";

export interface PublicationItem {
  id: string;
  slug: string;
  title: string;
  category: PublicationCategory;
  reportingPeriod?: string;
  publishDate: string;
  summary: string;
  keyHighlights: string[];
  issuingAuthority: string;
  verificationBadge: string;
  file: {
    url: string;
    fileName: string;
    fileType: "PDF" | "ZIP";
    fileSize: string;
    isAvailableOnline: boolean;
    pageCount?: number;
  };
  relatedRoute?: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: "annual-report-fy25",
    slug: "annual-report-fy25",
    title: "AIC-ADT Annual Progress Report FY 2024-25",
    category: "Annual Report",
    reportingPeriod: "Fiscal Year 2024–2025",
    publishDate: "June 2025",
    summary:
      "Comprehensive institutional disclosure detailing incubated startup milestones, DPIIT/AIM compliance filings, NABL laboratory utilization metrics, and audited fiscal disbursements.",
    keyHighlights: [
      "50+ Startups Incubated and Supported Across AgriTech & BioTech",
      "₹5.2 Cr in Cumulative Seed Grants and Financial Linkages Mobilized",
      "42+ Facilitated Intellectual Property & Innovation Filings",
      "Living-Farm Field Trial Deployments across 110-Acre Campus",
    ],
    issuingAuthority: "Governing Board, AIC-ADT Baramati Foundation",
    verificationBadge: "NITI Aayog & AIM Certified",
    file: {
      url: "/downloads/AIC-ADT-Annual-Report-FY2024-25-Sample.pdf",
      fileName: "AIC-ADT-Annual-Report-FY2024-25-Sample.pdf",
      fileType: "PDF",
      fileSize: "4.2 MB",
      isAvailableOnline: true,
      pageCount: 48,
    },
    relatedRoute: "/resources/annual-reports",
  },
  {
    id: "whitepaper-agritech",
    slug: "whitepaper-agritech",
    title:
      "Agri-Tech Incubation in Maharashtra: A Policy & Ecosystem Whitepaper",
    category: "Research Whitepaper",
    reportingPeriod: "Applied Policy Study",
    publishDate: "November 2024",
    summary:
      "Empirical whitepaper assessing the technological barriers to smallholder farm mechanization, rural credit bottlenecks, and the efficacy of living-lab incubation models in Western Maharashtra.",
    keyHighlights: [
      "Survey of 350+ Smallholder Farmers in Baramati and Indapur Tehsils",
      "Analysis of Equipment Utilization in Custom Hiring Centres (CHCs)",
      "Policy Recommendations for FPO Equity Grants & Drone Operations",
      "Case Evidence from Incubated Ventures: GramHeet and Innosapien",
    ],
    issuingAuthority: "AIC-ADT Policy & Innovation Research Cell",
    verificationBadge: "Applied AgTech Research",
    file: {
      url: "/downloads/AIC-ADT-AgriTech-Whitepaper-Sample.pdf",
      fileName: "AIC-ADT-AgriTech-Whitepaper-Sample.pdf",
      fileType: "PDF",
      fileSize: "2.8 MB",
      isAvailableOnline: true,
      pageCount: 36,
    },
    relatedRoute: "/resources/publications",
  },
  {
    id: "sisfs-guidelines",
    slug: "sisfs-guidelines",
    title:
      "Startup India Seed Fund Scheme (SISFS) Incubation Operating Guidelines",
    category: "Program Guideline",
    reportingPeriod: "Operational Scheme Manual",
    publishDate: "March 2024",
    summary:
      "Official operational manual defining eligibility criteria, milestone tranches, investment committee scoring rubrics, and statutory compliance for SISFS applicants at AIC-ADT.",
    keyHighlights: [
      "Grant Tranches up to ₹20 Lakhs for Proof-of-Concept & Prototypes",
      "Debt / Convertible Debentures up to ₹50 Lakhs for Market Scaling",
      "100-Point Evaluation Rubric across 4 Core Institutional Pillars",
      "Quarterly Milestone Verification and Utilization Certificate (UC) Norms",
    ],
    issuingAuthority: "DPIIT, Ministry of Commerce & Industry / AIC-ADT",
    verificationBadge: "Government of India Scheme Manual",
    file: {
      url: "/downloads/SISFS-Incubation-Scheme-Guidelines-Sample.pdf",
      fileName: "SISFS-Incubation-Scheme-Guidelines-Sample.pdf",
      fileType: "PDF",
      fileSize: "1.6 MB",
      isAvailableOnline: true,
      pageCount: 24,
    },
    relatedRoute: "/resources/program-guidelines",
  },
  {
    id: "meity-genesis-guidelines",
    slug: "meity-genesis-guidelines",
    title: "MeitY GENESIS EiR & Pilot Scheme Operational Framework",
    category: "Program Guideline",
    reportingPeriod: "Scheme Reference Framework",
    publishDate: "August 2024",
    summary:
      "Administrative reference document for the Ministry of Electronics and Information Technology (MeitY) GENESIS program for Tier-2/3 deep-tech entrepreneurs.",
    keyHighlights: [
      "Entrepreneur-in-Residence (EiR) Monthly Stipend (up to ₹10L over 12 Months)",
      "Hardware Prototype & Pilot Grants for Edge-AI & IoT Solutions",
      "Mandatory Resident Incubation Norms at AIC-ADT Baramati",
      "Intellectual Property Retainment Guidelines for Student Innovators",
    ],
    issuingAuthority: "MeitY Startup Hub (MSH) & AIC-ADT Foundation",
    verificationBadge: "Ministry Reference Document",
    file: {
      url: "/programs/schemes/meity-genesis",
      fileName: "MeitY-GENESIS-Operational-Framework.pdf",
      fileType: "PDF",
      fileSize: "1.9 MB",
      isAvailableOnline: false,
      pageCount: 18,
    },
    relatedRoute: "/resources/program-guidelines",
  },
  {
    id: "posh-policy",
    slug: "posh-policy",
    title:
      "Internal Complaints Committee & Prevention of Sexual Harassment (POSH) Charter",
    category: "Policy & Compliance",
    reportingPeriod: "Statutory Disclosure",
    publishDate: "January 2025",
    summary:
      "Statutory policy and constitution of the Internal Complaints Committee (ICC) of AIC-ADT Baramati Foundation pursuant to the Sexual Harassment of Women at Workplace Act, 2013.",
    keyHighlights: [
      "Formal ICC Committee Composition and Contact Roster",
      "Time-Bound Inquiry and Redressal Mechanisms (90-Day Mandate)",
      "Zero-Tolerance Workplace Safety Code for Campus Incubatees & Staff",
      "Confidential Reporting Helpline: aicadt@adtbaramati.com",
    ],
    issuingAuthority: "Governing Board, AIC-ADT Baramati Foundation",
    verificationBadge: "Statutory Legal Compliance",
    file: {
      url: "/resources/policies-downloads",
      fileName: "AIC-ADT-POSH-Policy-Charter.pdf",
      fileType: "PDF",
      fileSize: "850 KB",
      isAvailableOnline: false,
      pageCount: 12,
    },
    relatedRoute: "/resources/policies-downloads",
  },
  {
    id: "rti-voluntary-disclosure",
    slug: "rti-voluntary-disclosure",
    title: "Section 4(1)(b) Voluntary Right to Information (RTI) Disclosures",
    category: "Policy & Compliance",
    reportingPeriod: "Public Authority Transparency",
    publishDate: "January 2025",
    summary:
      "Voluntary proactive disclosures regarding the institutional mandate, public grant allocations, governance structure, and public information officer designations.",
    keyHighlights: [
      "Statement of Institutional Sanction under Atal Innovation Mission",
      "Public Grievance and RTI Nodal Officer Designations",
      "Audited Grant Utilization and Public Benefit Records",
      "Official Communication Channel for Citizen Queries",
    ],
    issuingAuthority: "Secretariat, AIC-ADT Baramati Foundation",
    verificationBadge: "Voluntary Public Disclosure",
    file: {
      url: "/resources/policies-downloads",
      fileName: "AIC-ADT-RTI-Voluntary-Disclosures.pdf",
      fileType: "PDF",
      fileSize: "1.1 MB",
      isAvailableOnline: false,
      pageCount: 16,
    },
    relatedRoute: "/resources/policies-downloads",
  },
  {
    id: "aic-adt-brand-kit",
    slug: "aic-adt-brand-kit",
    title: "AIC-ADT Institutional Brand Identity & Vector Assets Kit",
    category: "Brand Asset",
    reportingPeriod: "Corporate Identity v2.1",
    publishDate: "March 2025",
    summary:
      "Approved high-resolution vector logos, color palette codes, partner co-branding rules, and typography guidelines for media houses and portfolio companies.",
    keyHighlights: [
      "Primary Vector Logo in SVG, EPS, and High-Res PNG formats",
      "Atal Innovation Mission & ADT Co-Branding Display Hierarchy",
      "Official HSL & Hex Color Specifications (#004B2A, #73992A, #E8F0EB)",
      "Strict Prohibition on Deprecated 'AIC-DBT' Nomenclature",
    ],
    issuingAuthority: "Communications & Media Cell, AIC-ADT",
    verificationBadge: "Official Media Resource",
    file: {
      url: "/resources/policies-downloads",
      fileName: "AIC-ADT-Brand-Assets-v2.1.zip",
      fileType: "ZIP",
      fileSize: "5.4 MB",
      isAvailableOnline: false,
    },
    relatedRoute: "/resources/policies-downloads",
  },
];

export const ANNUAL_REPORTS_LIST = PUBLICATIONS_DATA.filter(
  (p) => p.category === "Annual Report",
);

export const WHITEPAPERS_LIST = PUBLICATIONS_DATA.filter(
  (p) => p.category === "Research Whitepaper",
);

export const GUIDELINES_LIST = PUBLICATIONS_DATA.filter(
  (p) => p.category === "Program Guideline",
);

export const POLICIES_LIST = PUBLICATIONS_DATA.filter(
  (p) => p.category === "Policy & Compliance" || p.category === "Brand Asset",
);
