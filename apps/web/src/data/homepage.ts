/**
 * AIC-ADT Baramati Foundation — Homepage Content Data Architecture
 * Separates structured presentation data from UI components for future headless CMS binding.
 * Source of truth: docs/design/wireframes/homepage-wireframe.md,
 * docs/design/high-fidelity-design-specification.md, and docs/audit/content-verification-register.md
 */

export interface HeroContent {
  overline: string;
  headline: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  credentials: string[];
}

export interface IntroPillar {
  title: string;
  description: string;
  icon: "science" | "seed" | "mentorship";
  href: string;
}

export interface ProgramCard {
  id: string;
  stage: string;
  title: string;
  duration: string;
  grantTranche: string;
  description: string;
  badge?: string;
  isCohortActive?: boolean;
  href: string;
}

export interface InnovationDomain {
  id: string;
  title: string;
  shortDesc: string;
  href: string;
}

export interface FeaturedStartup {
  slug: string;
  name: string;
  sector: string;
  founders: string;
  scheme: string;
  impactSummary: string;
  verifiedMetric: string;
  href: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  auditPeriod: string;
  verifiedSource: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  type: string;
  venue: string;
  deadlineAlert?: string;
  href: string;
}

export interface ReportPublication {
  id: string;
  title: string;
  type: string;
  fileSize: string;
  downloadUrl: string;
  verificationBadge: string;
}

export const HERO_DATA: HeroContent = {
  overline: "Supported by Atal Innovation Mission • NITI Aayog",
  headline:
    "Catalyzing the Next Agricultural Revolution Through Deep-Tech Innovation",
  body: "AIC-ADT empowers agri-tech startups, progressive farmers, and researchers with seed capital, NABL-accredited analytical laboratories, and field testing grounds across 110 acres in Baramati.",
  primaryCta: {
    label: "Explore Incubation Programs",
    href: "/programs",
  },
  secondaryCta: {
    label: "Book Analytical Lab Testing",
    href: "/about/infrastructure/analytical-lab",
  },
  credentials: [
    "DPIIT Recognized Incubator",
    "NABL Analytical Testing Scope",
    "110-Acre Live Demonstration Farm",
  ],
};

export const INTRO_PILLARS: IntroPillar[] = [
  {
    title: "Lab-to-Land Science",
    description:
      "Direct validation of biotech formulations, IoT telemetry, and farm robotics on real farmland in the Baramati agricultural belt.",
    icon: "science",
    href: "/about/infrastructure",
  },
  {
    title: "Government Seed Grants",
    description:
      "Structured funding linkages facilitating DPIIT Startup India Seed Fund (SISFS) and MeitY GENESIS EiR tranches up to ₹50 Lakhs.",
    icon: "seed",
    href: "/programs/schemes/startup-india",
  },
  {
    title: "69+ Empaneled Mentors",
    description:
      "One-on-one advisory from agronomists, patent attorneys, supply chain leaders, and venture capitalists across India.",
    icon: "mentorship",
    href: "/programs/mentorship",
  },
];

export const PROGRAM_CARDS: ProgramCard[] = [
  {
    id: "pre-incubation",
    stage: "Stage 01: Ideation & Prototype",
    title: "Pre-Incubation Program",
    duration: "6 Months Cohort",
    grantTranche: "Up to ₹10 Lakhs Prototype Grant",
    description:
      "Designed for early-stage innovators and students validating technical feasibility with FabLab rapid prototyping access.",
    href: "/programs/pre-incubation",
  },
  {
    id: "incubation",
    stage: "Stage 02: Seed Validation (SISFS)",
    title: "Core Incubation Track",
    duration: "12–18 Months Residency",
    grantTranche: "Up to ₹20L Grant / ₹50L Debt",
    description:
      "Comprehensive venture acceleration with seed capital linkages, dedicated pilot labs, and commercial pilot deployment.",
    badge: "Cohort 4 Applications Open",
    isCohortActive: true,
    href: "/programs/incubation",
  },
  {
    id: "acceleration",
    stage: "Stage 03: Scale & Institutional VC",
    title: "Acceleration Program",
    duration: "6 Months Intensive",
    grantTranche: "Institutional Venture Linkages",
    description:
      "Market expansion, supply chain scaling, institutional VC demo days, and global market export linkages for revenue-stage ventures.",
    href: "/programs/acceleration",
  },
];

export const INNOVATION_DOMAINS: InnovationDomain[] = [
  {
    id: "agri-tech",
    title: "Agri-Tech & Robotics",
    shortDesc:
      "Drone crop spraying, smart implements, automated weeders, and farm mechanization.",
    href: "/innovation/agri-tech",
  },
  {
    id: "smart-farming",
    title: "Smart Farming & IoT",
    shortDesc:
      "Soil telemetry sensors, automated weather stations, and precision irrigation controls.",
    href: "/innovation/smart-farming",
  },
  {
    id: "biotechnology",
    title: "Biotechnology & Soil",
    shortDesc:
      "Microbial inoculants, bio-stimulants, tissue culture, and saline soil rejuvenation.",
    href: "/innovation",
  },
  {
    id: "food-processing",
    title: "Food Processing & Millets",
    shortDesc:
      "Post-harvest value addition, vacuum drying, retort packaging, and pilot plant testing.",
    href: "/innovation/food-processing",
  },
  {
    id: "climate-tech",
    title: "Climate Tech & Circular Agri",
    shortDesc:
      "Solar-powered farm systems, biochar carbon sequestration, and waste-to-value solutions.",
    href: "/innovation/climate-tech",
  },
  {
    id: "digital-ai",
    title: "Digital Agri & AI Models",
    shortDesc:
      "Computer vision pest detection, satellite vegetation analytics, and vernacular advisory.",
    href: "/innovation/digital-agri-ai",
  },
];

export const FEATURED_PILOT = {
  title: "Automated Soil Moisture & Salinity Telemetry Network",
  domain: "Smart Farming & Telemetry Pilot",
  acreage: "2,400 Hectares Tested",
  metric: "28% Reduction",
  metricLabel: "in chemical fertilizer application via precision dosing",
  description:
    "Deployed across Baramati sugarcane and horticultural clusters in partnership with KVK Baramati, validating solar-powered telemetry nodes connected to regional weather stations.",
  href: "/innovation/smart-farming",
};

export const FEATURED_STARTUPS: FeaturedStartup[] = [
  {
    slug: "gramheet",
    name: "GramHeet Pvt. Ltd.",
    sector: "Post-Harvest Agribusiness",
    founders: "Pankaj Mahalle & Shweta Thakare",
    scheme: "Startup India Seed Fund (SISFS)",
    impactSummary:
      "Village-level digital marketplace and decentralized post-harvest cold storage preventing distress selling for smallholder farmers.",
    verifiedMetric: "35,000+ Smallholder Farmers Impacted",
    href: "/startups",
  },
  {
    slug: "innosapien",
    name: "Innosapien Agro Tech",
    sector: "Precision Phenomics & IoT",
    founders: "Dr. Sagar Patil & Engineering Team",
    scheme: "MeitY GENESIS Cohort",
    impactSummary:
      "Proprietary plant phenomics sensor network measuring transpiration, leaf microclimate, and predictive pest forecasting in polyhouses.",
    verifiedMetric: "Field Validated on 110-Acre Campus",
    href: "/startups",
  },
  {
    slug: "baramati-agribiotics",
    name: "Baramati Agribiotics",
    sector: "Agricultural Biotechnology",
    founders: "Bio-Agri Research Team",
    scheme: "AIC-ADT Research Translation",
    impactSummary:
      "Native microbial consortia and bio-stimulant formulations engineered specifically for saline soil reclamation in Maharashtra.",
    verifiedMetric: "42+ Lab Formulations Screened",
    href: "/startups",
  },
];

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    value: "50+",
    label: "Startups Incubated & Mentored",
    auditPeriod: "FY 2024-25",
    verifiedSource: "AIM Annual Compliance Filing",
  },
  {
    value: "42+",
    label: "Facilitated IP & Innovations",
    auditPeriod: "FY 2024-25",
    verifiedSource: "AIC-ADT Innovation Cell",
  },
  {
    value: "₹5.2 Cr+",
    label: "Seed Grants & Funding Mobilized",
    auditPeriod: "FY 2021–25",
    verifiedSource: "SISFS & CSR Corporate Grants",
  },
  {
    value: "35,000+",
    label: "Smallholder Farmers Reached",
    auditPeriod: "FY 2024-25",
    verifiedSource: "Incubatee Demonstration Records",
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "sisfs-cohort-4",
    title: "Startup India Seed Fund (SISFS) Cohort 4 Application Deadline",
    day: "30",
    month: "NOV",
    year: "2026",
    type: "Intake Deadline",
    venue: "Online National Portal",
    deadlineAlert: "Intake Active — Grants up to ₹20L",
    href: "/programs/schemes/startup-india",
  },
  {
    id: "millet-processing-workshop",
    title: "Millet Value-Added Processing & FSSAI Standards Masterclass",
    day: "08",
    month: "DEC",
    year: "2026",
    type: "Technical Workshop",
    venue: "Food Innovation Pilot Plant, Baramati",
    href: "/events",
  },
  {
    id: "agri-robotics-demo-day",
    title: "Agri-Robotics & Autonomous Telemetry Field Demonstration Day",
    day: "15",
    month: "DEC",
    year: "2026",
    type: "Field Showcase",
    venue: "Centre of Excellence Demonstration Farm",
    href: "/events",
  },
];

export const REPORT_PUBLICATIONS: ReportPublication[] = [
  {
    id: "annual-report-fy25",
    title: "AIC-ADT Annual Progress Report FY 2024-25",
    type: "Institutional Annual Disclosure",
    fileSize: "PDF • 4.2 MB",
    downloadUrl: "/downloads/AIC-ADT-Annual-Report-FY2024-25-Sample.pdf",
    verificationBadge: "NITI Aayog & AIM Certified",
  },
  {
    id: "whitepaper-agritech",
    title:
      "Agri-Tech Incubation in Maharashtra: A Policy & Ecosystem Whitepaper",
    type: "Research Whitepaper",
    fileSize: "PDF • 2.8 MB",
    downloadUrl: "/downloads/AIC-ADT-AgriTech-Whitepaper-Sample.pdf",
    verificationBadge: "Applied AgTech Research",
  },
];

export const COLLABORATION_CTA = {
  headline: "Ready to Build the Future of Agriculture?",
  body: "Whether you are a deep-tech founder with a working prototype, a researcher seeking lab infrastructure, or a corporate partner creating high-impact CSR agriculture programs, AIC-ADT provides the ecosystem to scale.",
  primaryButton: {
    label: "Apply for Incubation",
    href: "/programs/apply-instructions",
  },
  secondaryButton: {
    label: "Contact Partnership Desk",
    href: "/contact/partnerships",
  },
};
