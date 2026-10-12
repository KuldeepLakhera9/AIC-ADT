/**
 * AIC-ADT Baramati Foundation — News & Announcements Data Architecture
 * Source of truth: docs/audit/content-verification-register.md, docs/requirements/sitemap.md,
 * and verified institutional milestones.
 */

export type NewsCategory =
  | "All"
  | "Official Announcement"
  | "Funding Milestone"
  | "Infrastructure"
  | "Ecosystem Partnership";

export interface NewsArticle {
  slug: string;
  headline: string;
  publishDate: string;
  category: NewsCategory;
  summary: string;
  content: string[];
  sourceAttribution: string;
  externalPressLink?: string;
  tags: string[];
  keyFacts: { label: string; value: string }[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "sisfs-cohort-4-announcement",
    headline:
      "AIC-ADT Baramati Foundation Opens National Call for Startup India Seed Fund Scheme Cohort 4",
    publishDate: "October 15, 2026",
    category: "Funding Milestone",
    summary:
      "DPIIT-recognized agritech, food processing, and rural biotech startups across India are invited to apply for seed tranches of up to ₹20 Lakhs in grant and ₹50 Lakhs in convertible debt.",
    content: [
      "The AIC-ADT Baramati Foundation has formally announced the application intake for Cohort 4 of the Startup India Seed Fund Scheme (SISFS), sanctioned by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry.",
      "Early-stage startups with innovative solutions addressing farm mechanization, precision agronomy, post-harvest losses, and climate-resilient inputs are eligible to apply. Resident incubatees gain direct access to the 110-acre demonstration testbeds of the Agricultural Development Trust, cutting-edge analytical chemistry labs, and comprehensive pilot plant infrastructure.",
      "The evaluation process is conducted by an independent Investment Committee following the certified 100-point national evaluation rubric. Applications must be submitted through the official Startup India Seed Fund portal before November 30, 2026.",
    ],
    sourceAttribution: "DPIIT & AIC-ADT Incubation Secretariat",
    externalPressLink: "https://seedfund.startupindia.gov.in/",
    tags: ["SISFS", "DPIIT", "Seed Capital", "AgriTech", "Cohort 4"],
    keyFacts: [
      { label: "Intake Deadline", value: "November 30, 2026" },
      { label: "Grant Support", value: "Up to ₹20 Lakhs (Proof of Concept)" },
      { label: "Debt Facility", value: "Up to ₹50 Lakhs (Commercialization)" },
      { label: "Host Institution", value: "AIC-ADT Baramati Foundation" },
    ],
  },
  {
    slug: "nabl-analytical-testing-scope",
    headline:
      "NABL Analytical Testing Laboratory Commissioned for Precision Soil & Chemical Profiling",
    publishDate: "September 18, 2024",
    category: "Infrastructure",
    summary:
      "Advanced analytical instrumentation suite featuring GC-MS, HPLC, and spectrophotometers operational for incubatees, FPOs, and regional agricultural researchers.",
    content: [
      "To accelerate biotech formulation and quality validation, the AIC-ADT Baramati Foundation has fully operationalized its NABL-accredited Analytical Testing Laboratory on the Sharadanagar campus.",
      "The laboratory provides quantitative residue profiling, soil heavy metal testing, micronutrient spectroscopy, and fertilizer purity assays. Startups developing organic inputs and biostimulants can now obtain certified analytical test reports without sending samples to distant metropolitan facilities.",
      "The lab adheres to Good Laboratory Practices (GLP) and offers discounted testing quotas for resident incubator startups and affiliated farmer producer organizations.",
    ],
    sourceAttribution: "AIC-ADT Analytical Testing Facility Directorate",
    tags: ["NABL", "Analytical Chemistry", "Soil Health", "Infrastructure"],
    keyFacts: [
      { label: "Facility Type", value: "NABL Analytical Testing Scope" },
      { label: "Key Equipment", value: "GC-MS, HPLC, Atomic Absorption" },
      { label: "Location", value: "Sharadanagar Campus, Baramati" },
      { label: "Primary Users", value: "Incubatees, FPOs & Researchers" },
    ],
  },
  {
    slug: "kvk-living-labs-expansion",
    headline:
      "110-Acre Agricultural Testbed Integrated for Incubatee Living Farm Trials",
    publishDate: "February 22, 2024",
    category: "Ecosystem Partnership",
    summary:
      "Strategic partnership with Krishi Vigyan Kendra (KVK) Baramati integrates live crop plots for agritech telemetry, robotic weeders, and drone spraying validation.",
    content: [
      "In a major validation milestone for regional agricultural technology, AIC-ADT Baramati Foundation and KVK Baramati have structured a unified 'Living Lab' protocol across the 110-acre campus.",
      "Early-stage innovators frequently encounter difficulties securing real-world farmland for hardware and IoT durability testing. Under this initiative, startups deploy IoT weather stations, capacitance probes, and automated weeding rovers directly in active sugarcane, grape, and soybean canopies.",
      "KVK agronomists provide structured feedback, validating crop safety, drift mitigation, and operational longevity under real Western Maharashtra climate conditions.",
    ],
    sourceAttribution: "Agricultural Development Trust & KVK Baramati",
    tags: ["Living Labs", "KVK Baramati", "Field Trials", "IoT"],
    keyFacts: [
      { label: "Testbed Size", value: "110 Acres Contiguous Farmland" },
      {
        label: "Crops Cultivated",
        value: "Sugarcane, Grapes, Pomegranates, Soy",
      },
      { label: "Knowledge Partner", value: "ICAR-KVK Baramati" },
      { label: "Validation Focus", value: "Robotics, Telemetry, Soil Sensors" },
    ],
  },
  {
    slug: "aim-niti-aayog-sanction",
    headline:
      "AIC-ADT Baramati Foundation Formally Established under Atal Innovation Mission (NITI Aayog)",
    publishDate: "June 12, 2019",
    category: "Official Announcement",
    summary:
      "Selected as one of India's premier agricultural Atal Incubation Centres by NITI Aayog to foster rural entrepreneurship, food security, and deep-tech innovation.",
    content: [
      "Under the national mandate of the Atal Innovation Mission (AIM), NITI Aayog, Government of India, the Agricultural Development Trust (ADT) Baramati was sanctioned an Atal Incubation Centre to catalyze rural enterprise creation.",
      "Incorporated as a dedicated Section 8 not-for-profit company ('AIC-ADT Baramati Foundation'), the incubator bridges grassroots agricultural knowledge with modern engineering, biotechnology, and venture funding.",
      "The foundation works closely with Central and State ministries, research bodies, corporate CSR partners, and financial institutions to establish Baramati as a national nexus for agrarian innovation.",
    ],
    sourceAttribution: "NITI Aayog & Agricultural Development Trust",
    tags: ["Atal Innovation Mission", "NITI Aayog", "Foundation Genesis"],
    keyFacts: [
      {
        label: "Institutional Sanction",
        value: "Atal Innovation Mission (AIM)",
      },
      {
        label: "Governing Apex Body",
        value: "NITI Aayog, Government of India",
      },
      { label: "Corporate Status", value: "Section 8 Not-For-Profit" },
      { label: "Host Entity", value: "Agricultural Development Trust" },
    ],
  },
];
