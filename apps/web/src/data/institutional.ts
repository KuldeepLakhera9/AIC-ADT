/**
 * AIC-ADT Baramati Foundation — Institutional Content Data Architecture
 * Strongly typed models decoupling public institutional data from presentation markup.
 * Sources of truth: docs/requirements/sitemap.md, docs/audit/content-verification-register.md,
 * docs/design/wireframes/public-page-wireframes.md, and docs/architecture/phase-4-content-dependencies.md.
 */

// ============================================================================
// ABOUT OVERVIEW DATA
// ============================================================================

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  category: "Heritage" | "Milestone" | "Sanction" | "Scale";
}

export interface AccreditationItem {
  name: string;
  authority: string;
  status: string;
  description: string;
}

export interface InstitutionalPillar {
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  href: string;
}

export interface AboutOverviewData {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    leadCopy: string;
  };
  genesis: {
    heading: string;
    body: string[];
    campusArea: string;
    hostTrust: string;
    sanctioningBody: string;
    legalStatus: string;
  };
  milestones: TimelineMilestone[];
  accreditations: AccreditationItem[];
  pillars: InstitutionalPillar[];
}

export const ABOUT_OVERVIEW_DATA: AboutOverviewData = {
  hero: {
    badge: "Supported by Atal Innovation Mission • NITI Aayog",
    title:
      "Bridging Half a Century of Agricultural Trust with 21st Century Science",
    subtitle: "AIC-ADT Baramati Foundation — Institutional Genesis & Heritage",
    leadCopy:
      "Established as an Atal Incubation Centre under the aegis of NITI Aayog, Government of India, and anchored by the 50-year legacy of the Agricultural Development Trust (ADT), AIC-ADT operates at the nexus of applied research, living farm testbeds, and deep-tech venture building.",
  },
  genesis: {
    heading: "Where Grounded Agronomy Meets Deep-Tech Commercialization",
    body: [
      "The Agricultural Development Trust (ADT), Baramati, was founded in 1971 by visionary agricultural leaders dedicated to rural transformation through science-based farming, protected cultivation, and education. Over five decades, ADT established renowned educational colleges, model dairy infrastructure, Krishi Vigyan Kendra (KVK Baramati), and advanced agrometeorological advisory centers across Maharashtra.",
      "Recognizing the critical need to translate lab discoveries into commercially viable agri-enterprises, the Atal Innovation Mission (AIM), NITI Aayog, sanctioned the establishment of the AIC-ADT Baramati Foundation under the flagship Atal Incubation Centre scheme.",
      "Incorporated as an independent Section 8 Not-for-Profit Company under the Companies Act, 2013, the Foundation serves as an open innovation launchpad. Here, entrepreneurs, biotechnologists, and software engineers test their prototypes on real agricultural soils with immediate agronomic feedback from thousands of practicing farmers.",
    ],
    campusArea: "110-Acre Live Campus Testbed",
    hostTrust: "Agricultural Development Trust, Baramati (Est. 1971)",
    sanctioningBody: "Atal Innovation Mission (AIM), NITI Aayog, GoI",
    legalStatus: "Section 8 Not-for-Profit Company",
  },
  milestones: [
    {
      year: "1971",
      title: "Founding of Agricultural Development Trust (ADT)",
      description:
        "Established by agricultural visionaries in Sharadanagar, Baramati, initiating five decades of soil conservation, vocational education, and dairy advancement.",
      category: "Heritage",
    },
    {
      year: "1992",
      title: "Establishment of KVK Baramati",
      description:
        "Indian Council of Agricultural Research (ICAR) sanctioned Krishi Vigyan Kendra Baramati, creating the regional benchmark for agricultural extension and farmer training.",
      category: "Heritage",
    },
    {
      year: "2014",
      title: "Centre of Excellence in Protected Cultivation",
      description:
        "Commissioned high-tech polyhouses, automated micro-fertigation units, and tissue culture laboratories on the 110-acre Sharadanagar campus.",
      category: "Milestone",
    },
    {
      year: "2019",
      title: "AIC-ADT Foundation Sanctioned by NITI Aayog",
      description:
        "Selected under the Atal Innovation Mission to establish a specialized Agri-Tech and Bio-Innovation incubator; incorporated as a Section 8 company.",
      category: "Sanction",
    },
    {
      year: "2021",
      title: "Startup India Seed Fund Scheme (SISFS) Empanelment",
      description:
        "Recognized by DPIIT to disburse proof-of-concept grants up to ₹20 Lakhs and commercialization debt up to ₹50 Lakhs to early-stage ventures.",
      category: "Sanction",
    },
    {
      year: "2024",
      title: "Telemetry Field Pilot & NABL Analytical Scope",
      description:
        "Deployed 2,400 Ha automated soil telemetry network in the Baramati sugar belt; expanded analytical laboratory testing instrumentation for soil, water, and bio-stimulants.",
      category: "Scale",
    },
    {
      year: "2026",
      title: "Cohort 4 Expansion & Deep-Tech Acceleration",
      description:
        "Active intake across MeitY GENESIS EiR, SISFS Cohort 4, and corporate CSR partnerships with Capgemini and HDFC Bank Parivartan.",
      category: "Scale",
    },
  ],
  accreditations: [
    {
      name: "Atal Innovation Mission (AIM)",
      authority: "NITI Aayog, Government of India",
      status: "Sanctioned Incubator",
      description:
        "Established under statutory Grant-in-Aid charter to foster deep-tech agriculture innovation and rural venture creation.",
    },
    {
      name: "DPIIT Incubator Recognition",
      authority: "Ministry of Commerce and Industry",
      status: "Recognized Incubator",
      description:
        "Accredited implementing agency for Startup India Seed Fund Scheme (SISFS) grant and convertible debt disbursals.",
    },
    {
      name: "MeitY Startup Hub (MSH)",
      authority: "Ministry of Electronics & Information Technology",
      status: "Implementing Partner",
      description:
        "Facilitating GENESIS EiR (Entrepreneur-in-Residence) and digital hardware pilot tranches for electronics and software founders.",
    },
    {
      name: "Analytical Testing Scope",
      authority: "NABL Chemical & Biological Testing Alignment",
      status: "Standard Laboratory Scope",
      description:
        "Analytical laboratory equipped with GC-MS, HPLC, and UV-Vis spectrophotometers for soil, water, and bio-stimulant sample assays.",
    },
  ],
  pillars: [
    {
      title: "Lab-to-Land Science",
      subtitle: "110-Acre Living Farm Testbed",
      description:
        "Innovations are rigorously field-validated in operational sugarcane, horticulture, and polyhouse clusters with direct agronomist guidance before commercial market rollout.",
      metric: "2,400 Ha Tested",
      href: "/about/infrastructure",
    },
    {
      title: "Government Seed Grants",
      subtitle: "Direct Funding Linkages",
      description:
        "Structured access to DPIIT SISFS grants up to ₹20 Lakhs, convertible debt up to ₹50 Lakhs, and corporate CSR co-funding for seed-stage startups.",
      metric: "₹5.2 Cr+ Mobilized",
      href: "/programs",
    },
    {
      title: "Multidisciplinary Mentorship",
      subtitle: "69+ Empaneled Industry Mentors",
      description:
        "Advisory guidance covering agronomy, patent law (IPR), supply-chain logistics, international export protocols, and institutional venture capital.",
      metric: "69+ Mentors",
      href: "/about/leadership",
    },
  ],
};

// ============================================================================
// MISSION, VISION & SDG DATA
// ============================================================================

export interface CoreValue {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface SdgAlignment {
  sdgNumber: number;
  sdgTitle: string;
  unColor: string;
  focusArea: string;
  impactDescription: string;
  metricTarget: string;
}

export interface RoadmapMilestone {
  horizon: string;
  year: string;
  title: string;
  deliverables: string[];
}

export interface MissionVisionData {
  hero: {
    badge: string;
    title: string;
    leadCopy: string;
  };
  vision: {
    statement: string;
    elaboration: string;
  };
  mission: {
    statement: string;
    pillars: string[];
  };
  values: CoreValue[];
  sdgs: SdgAlignment[];
  roadmap: RoadmapMilestone[];
}

export const MISSION_VISION_DATA: MissionVisionData = {
  hero: {
    badge: "Institutional Charter & Mandate",
    title: "Our Mission, Vision, and Sustainable Development Commitment",
    leadCopy:
      "Guided by national self-reliance priorities and the UN Sustainable Development Goals, AIC-ADT fosters ethical, science-backed technologies that regenerate soil systems, optimize rural livelihoods, and enhance agricultural productivity.",
  },
  vision: {
    statement:
      "To be India's premier agritech and rural biotechnology innovation powerhouse, transforming grassroots agriculture into a resilient, deep-tech-enabled, and climate-positive economy.",
    elaboration:
      "We envision an agricultural ecosystem where every progressive farmer has real-time access to precision data, biological soil solutions, and mechanization, developed collaboratively with indigenous deep-tech entrepreneurs.",
  },
  mission: {
    statement:
      "To nurture, mentor, and accelerate early-stage agritech ventures by linking laboratory scientific rigor with living agricultural testbeds, catalytic seed capital, and ethical market linkages.",
    pillars: [
      "Accelerate breakthrough innovations in farm robotics, soil biotechnology, precision IoT, and climate-resilient crop solutions.",
      "Democratize state-of-the-art testing infrastructure (NABL lab, FabLab, Pilot Food Plant) for student innovators, researchers, and early founders.",
      "Channel statutory central government grant schemes (SISFS, MeitY GENESIS) directly into verified agricultural prototypes with zero friction.",
      "Bridge smallholder farmers with fair digital marketplaces and value-added post-harvest processing models to eliminate distress selling.",
    ],
  },
  values: [
    {
      title: "Scientific Rigor",
      tagline: "Empirically Validated Solutions",
      description:
        "Every claim, bio-stimulant formulation, and sensor reading must stand up to rigorous laboratory measurement and replicable agronomic trial data.",
      icon: "🔬",
    },
    {
      title: "Farmer-Centricity",
      tagline: "Solving Grassroots Pain Points",
      description:
        "We prioritize solutions that tangibly reduce farmer input costs, enhance crop yield, or safeguard grower income over purely theoretical inventions.",
      icon: "🌾",
    },
    {
      title: "Radical Transparency",
      tagline: "Public Trust & Compliance",
      description:
        "We adhere to strict corporate governance, published statutory audits, verified impact claims, and ethical grant disbursals.",
      icon: "⚖️",
    },
    {
      title: "Ecological Sustainability",
      tagline: "Circular, Climate-Positive Agriculture",
      description:
        "We champion non-destructive soil microbiology, water-conserving precision telemetry, renewable energy, and circular waste-to-value pathways.",
      icon: "🌱",
    },
    {
      title: "Inclusive Empowerment",
      tagline: "Catalyzing Rural & Women Innovators",
      description:
        "We actively foster entrepreneurship among rural youth, women-led agricultural cooperatives, and grassroots problem solvers.",
      icon: "🤝",
    },
  ],
  sdgs: [
    {
      sdgNumber: 2,
      sdgTitle: "Zero Hunger",
      unColor: "#DDA63A",
      focusArea: "Precision Agronomy & Nutrient Management",
      impactDescription:
        "Incubating biological inputs and smart irrigation systems that boost agricultural productivity while arresting chemical soil degradation.",
      metricTarget: "35,000+ farmers reached via demonstration trials",
    },
    {
      sdgNumber: 8,
      sdgTitle: "Decent Work & Economic Growth",
      unColor: "#A21942",
      focusArea: "Rural AgTech Enterprise Creation",
      impactDescription:
        "Enabling early-stage startups to create high-skilled manufacturing, telemetry service, and post-harvest operations jobs in rural Maharashtra.",
      metricTarget:
        "50+ ventures accelerated, creating direct rural employment",
    },
    {
      sdgNumber: 9,
      sdgTitle: "Industry, Innovation & Infrastructure",
      unColor: "#F36E25",
      focusArea: "Open Specialized Pilot Infrastructure",
      impactDescription:
        "Providing shared NABL chemical testing, rapid PCB prototyping, and food processing pilot plants accessible to rural innovators.",
      metricTarget: "5 specialized labs serving regional innovators",
    },
    {
      sdgNumber: 12,
      sdgTitle: "Responsible Consumption & Production",
      unColor: "#CF8D2A",
      focusArea: "Post-Harvest Waste & Value Addition",
      impactDescription:
        "Supporting decentralized cold storage (GramHeet), vacuum dehydration, and millet processing to prevent crop spoilage and distress selling.",
      metricTarget:
        "28% fertilizer reduction validated across telemetry testbeds",
    },
  ],
  roadmap: [
    {
      horizon: "Phase 1: Consolidation & Intake",
      year: "2026",
      title: "Scale Cohorts & Precision Telemetry",
      deliverables: [
        "Complete disbursals for SISFS Cohort 4 across agritech and biotech tracks.",
        "Expand the 2,400 Ha automated soil moisture telemetry network to additional horticultural clusters.",
        "Integrate digital booking workflows for NABL Analytical and FabLab testing services.",
      ],
    },
    {
      horizon: "Phase 2: Deep-Tech Ecosystem",
      year: "2028",
      title: "Bio-Economy & Robotics Testbed Hub",
      deliverables: [
        "Establish regional Bio-Stimulant and Microbial Consortia testing protocol with ICAR / KVK.",
        "Expand autonomous farm implement and drone-testing corridors on the 110-acre campus.",
        "Scale the resident portfolio to 100+ active ventures with institutional investor syndicates.",
      ],
    },
    {
      horizon: "Phase 3: National Transformation",
      year: "2030",
      title: "Centres of Excellence Network",
      deliverables: [
        "Facilitate over ₹25 Crores in cumulative venture capital and commercialization debt.",
        "Expand direct field impact to over 100,000 smallholder farmers across western India.",
        "Publish national open-access research monographs on dryland agriculture technology adoption.",
      ],
    },
  ],
};

// ============================================================================
// LEADERSHIP & GOVERNANCE DATA
// ============================================================================

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  committee: "Board of Directors" | "Advisory Council" | "Executive Management";
  affiliation: string;
  bio: string;
  expertise: string[];
  isVerified: boolean;
  avatarPlaceholder: string;
}

export interface LeadershipData {
  hero: {
    badge: string;
    title: string;
    leadCopy: string;
  };
  governanceCommitment: {
    title: string;
    summary: string;
    statutoryFiling: string;
    cinNumberBadge: string;
  };
  members: LeadershipMember[];
}

export const LEADERSHIP_DATA: LeadershipData = {
  hero: {
    badge: "Governance & Leadership Roster",
    title: "Governing Board, Advisory Council & Executive Team",
    leadCopy:
      "AIC-ADT Baramati Foundation is steered by leaders spanning agricultural policy, venture capital, intellectual property law, and applied biosciences, committed to institutional rigor and transparent stewardship.",
  },
  governanceCommitment: {
    title: "Corporate Governance & Fiduciary Standards",
    summary:
      "As a Section 8 Not-for-Profit Company under the Companies Act, 2013, AIC-ADT operates under statutory oversight by NITI Aayog, DPIIT, and the Ministry of Corporate Affairs. Financial statements and annual compliance filings are audited annually by independent statutory auditors.",
    statutoryFiling:
      "Annual Returns filed under AIM & MCA guidelines (FY 2024-25 Audited)",
    cinNumberBadge: "Section 8 Registered Entity",
  },
  members: [
    // ------------------------------------------------------------------------
    // BOARD OF DIRECTORS
    // ------------------------------------------------------------------------
    {
      id: "prataprao-pawar",
      name: "Mr. Prataprao Pawar",
      role: "Chairman & Director",
      committee: "Board of Directors",
      affiliation:
        "Chairman, Sakal Media Group; Trustee, Agricultural Development Trust",
      bio: "Distinguished industrialist, media leader, and institutional trustee with over four decades of stewardship across educational, agricultural, and industrial institutions in Maharashtra. Instrumental in establishing the Baramati rural development model.",
      expertise: [
        "Institutional Governance",
        "Industrial Policy",
        "Rural Development",
      ],
      isVerified: true,
      avatarPlaceholder: "PP",
    },
    {
      id: "dr-amit-sehgal",
      name: "Dr. Amit Sehgal",
      role: "Director",
      committee: "Board of Directors",
      affiliation: "Academic Leader & Innovation Ecosystem Director",
      bio: "Senior technology strategist and researcher specializing in university-industry technology transfer, deep-tech incubator management, and incubation program architecture.",
      expertise: [
        "Technology Commercialization",
        "Academic Partnerships",
        "Ecosystem Strategy",
      ],
      isVerified: true,
      avatarPlaceholder: "AS",
    },
    {
      id: "dr-paresh-raut",
      name: "Dr. Paresh Raut",
      role: "Director",
      committee: "Board of Directors",
      affiliation: "Director, Life Sciences & Agro-Biotechnology Advisory",
      bio: "Senior scientist and biotechnology entrepreneur with extensive expertise in microbial formulation, saline soil remediation, and bioprocess commercialization.",
      expertise: [
        "Agricultural Biotechnology",
        "Microbiology",
        "Regulatory Compliance",
      ],
      isVerified: true,
      avatarPlaceholder: "PR",
    },
    {
      id: "adv-ganesh-hingmire",
      name: "Prof. Adv. Ganesh Hingmire",
      role: "Director & IP Counsel",
      committee: "Board of Directors",
      affiliation:
        "National IPR Specialist & Geographical Indications (GI) Authority",
      bio: "Renowned intellectual property rights lawyer and national awardee who has registered over 15 Geographical Indications (GIs) for Indian agricultural commodities. Advises incubatees on patents, trademarks, and farmers' variety rights.",
      expertise: [
        "Intellectual Property (IPR)",
        "Patent Prosecution",
        "Geographical Indications",
      ],
      isVerified: true,
      avatarPlaceholder: "GH",
    },

    // ------------------------------------------------------------------------
    // ADVISORY COUNCIL
    // ------------------------------------------------------------------------
    {
      id: "hemendra-mathur",
      name: "Mr. Hemendra Mathur",
      role: "Senior Venture Advisor",
      committee: "Advisory Council",
      affiliation: "Venture Partner, Bharat Innovation Fund; AgTech Investor",
      bio: "Pioneer in Indian agritech venture capital with 25+ years in agricultural investment, mentor to dozens of institutional startups, and policy advisor to national agtech task forces.",
      expertise: ["Venture Capital", "Agritech Financing", "Market Linkage"],
      isVerified: true,
      avatarPlaceholder: "HM",
    },
    {
      id: "aditya-arora",
      name: "Mr. Aditya Arora",
      role: "Ecosystem & Angel Advisory",
      committee: "Advisory Council",
      affiliation: "Angel Investor, CEO Faust; Startup Mentor",
      bio: "Prominent young entrepreneur and angel investor who has backed over 30 early-stage ventures. Mentors AIC-ADT founders on pitch deck framing, growth marketing, and investor readiness.",
      expertise: [
        "Angel Investment",
        "Pitch Architecture",
        "Early-Stage Scaling",
      ],
      isVerified: true,
      avatarPlaceholder: "AA",
    },
    {
      id: "kvk-agronomy-advisor",
      name: "Agronomy Advisory Board",
      role: "Technical Field Advisory",
      committee: "Advisory Council",
      affiliation:
        "KVK Baramati Agronomists & Protected Cultivation Specialists",
      bio: "Senior agronomists and soil scientists from Krishi Vigyan Kendra Baramati providing technical trial reviews, crop pest validation, and field efficacy assessment for all incubatee technologies.",
      expertise: [
        "Crop Agronomy",
        "Protected Polyhouses",
        "Soil Nutrient Dynamics",
      ],
      isVerified: true,
      avatarPlaceholder: "KVK",
    },

    // ------------------------------------------------------------------------
    // EXECUTIVE MANAGEMENT TEAM
    // ------------------------------------------------------------------------
    {
      id: "jaya-tiwari",
      name: "Ms. Jaya Tiwari",
      role: "Chief Executive Officer (CEO)",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Executive leader overseeing foundation strategy, NITI Aayog compliance, government scheme administration, and ecosystem partnerships. Has spearheaded the scaling of incubatee grants under SISFS and corporate CSR.",
      expertise: [
        "Incubator Management",
        "Government Liaison",
        "Strategic Funding",
      ],
      isVerified: true,
      avatarPlaceholder: "JT",
    },
    {
      id: "sonali-saste",
      name: "Ms. Sonali Saste",
      role: "Incubation Manager (Startup Programs)",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Manages cohort intake, startup due diligence, milestone monitoring, and DPIIT Startup India Seed Fund Scheme (SISFS) disbursements and documentation.",
      expertise: [
        "Cohort Operations",
        "Due Diligence",
        "SISFS Grant Management",
      ],
      isVerified: true,
      avatarPlaceholder: "SS",
    },
    {
      id: "abhishek-gite",
      name: "Mr. Abhishek Gite",
      role: "Incubation Manager (Training & Outreach)",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Coordinates technical workshops, agri-entrepreneurship bootcamps, farmer demonstration days, and institutional outreach with academic universities across Maharashtra.",
      expertise: [
        "Ecosystem Outreach",
        "Bootcamp Execution",
        "Capacity Building",
      ],
      isVerified: true,
      avatarPlaceholder: "AG",
    },
    {
      id: "avinash-pudale",
      name: "Mr. Avinash Pudale",
      role: "Technology & Prototyping Manager",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Manages the FabLab makerspace, hardware prototyping infrastructure, IoT testing instruments, and MeitY GENESIS EiR technology validation cohorts.",
      expertise: ["Rapid Prototyping", "IoT Hardware", "FabLab Operations"],
      isVerified: true,
      avatarPlaceholder: "AP",
    },
    {
      id: "vaibhav-yadav",
      name: "Mr. Vaibhav Yadav",
      role: "Food Innovation Lab Manager",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Specializes in food technology, value-added processing, retort packaging lines, vacuum drying trials, and nutritional shelf-life validation for food startups.",
      expertise: [
        "Food Processing",
        "FSSAI Compliance",
        "Pilot Plant Operations",
      ],
      isVerified: true,
      avatarPlaceholder: "VY",
    },
    {
      id: "ravi-londhe",
      name: "Mr. Ravi Londhe",
      role: "Web & Digital Systems Manager",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Oversees campus IT infrastructure, telemetry sensor data capture systems, digital portal infrastructure, and technical communications.",
      expertise: [
        "Systems Administration",
        "Network Security",
        "Data Infrastructure",
      ],
      isVerified: true,
      avatarPlaceholder: "RL",
    },
    {
      id: "chetana-nimbalkar",
      name: "Ms. Chetana Nimbalkar",
      role: "Front Desk & Operations Officer",
      committee: "Executive Management",
      affiliation: "AIC-ADT Baramati Foundation",
      bio: "Handles campus visitor logistics, facility booking inquiries, co-working space administration, and day-to-day administrative operations.",
      expertise: [
        "Visitor Coordination",
        "Facilities Management",
        "Office Administration",
      ],
      isVerified: true,
      avatarPlaceholder: "CN",
    },
  ],
};

// ============================================================================
// INFRASTRUCTURE & SPECIALIZED LABS DATA
// ============================================================================

export interface LabSpecification {
  slug: string;
  name: string;
  shortDesc: string;
  category:
    | "Prototyping"
    | "Analytical"
    | "Food Innovation"
    | "Digital Media"
    | "Resident Hub";
  icon: string;
  statusBadge: string;
  tagline: string;
  overview: string;
  equipment: { name: string; spec: string; application: string }[];
  capabilities: string[];
  targetUsers: string[];
  guidelines: string[];
  bookingInfo: {
    pricingNotice: string;
    accessType: string;
    contactPerson: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface InfrastructureMasterData {
  hero: {
    badge: string;
    title: string;
    leadCopy: string;
  };
  campusStats: {
    acreage: string;
    demonstrationPlot: string;
    specializedLabs: string;
    solarCapacity: string;
  };
  facilities: LabSpecification[];
}

export const INFRASTRUCTURE_MASTER_DATA: InfrastructureMasterData = {
  hero: {
    badge: "110-Acre Campus & Research Infrastructure",
    title: "World-Class Prototyping, Analytical & Field Testbed Facilities",
    leadCopy:
      "AIC-ADT provides startups and researchers with state-of-the-art laboratory instrumentation, rapid hardware prototyping machines, pilot processing plants, and 110 acres of living farmland to validate deep-tech inventions before commercial scale.",
  },
  campusStats: {
    acreage: "110 Acres Total Campus Extent",
    demonstrationPlot: "50+ Acres Active Precision Field Plots",
    specializedLabs: "5 Specialized Research Laboratories",
    solarCapacity: "Clean Energy Microgrid Powered",
  },
  facilities: [
    // ------------------------------------------------------------------------
    // 1. FABLAB MAKERSPACE
    // ------------------------------------------------------------------------
    {
      slug: "fab-lab",
      name: "FabLab Makerspace & Hardware Prototyping",
      shortDesc:
        "Industrial 3D printers, laser cutters, CNC routers, and PCB milling machines for rapid agricultural hardware and drone development.",
      category: "Prototyping",
      icon: "⚙️",
      statusBadge: "Operational • Open for Booking",
      tagline: "From Schematic to Physical Prototype in Days, Not Months",
      overview:
        "The FabLab at AIC-ADT is an advanced prototyping facility supporting agritech founders with rapid CAD fabrication, enclosure modeling, mechatronic assembly, and precision electronic PCB milling. It enables hardware startups to iterate device prototypes at a fraction of traditional machine-shop costs.",
      equipment: [
        {
          name: "Industrial 3D Printers (FDM & SLA)",
          spec: "Layer height down to 25 microns; Build volume up to 300x300x400mm",
          application:
            "Drone brackets, custom sensor enclosures, robotic end-effectors.",
        },
        {
          name: "CO2 Laser Cutter & Engraver",
          spec: "100W Tube Power; 900x600mm Bed; Acrylic, wood, and delrin cutting",
          application:
            "Chassis plates, acrylic viewing windows, rapid packaging mockups.",
        },
        {
          name: "Precision CNC Router",
          spec: "3-Axis machining; High-speed spindle; Aluminum & composites",
          application:
            "Structural bracket milling, mold creation, implement components.",
        },
        {
          name: "PCB Prototyping & Milling Machine",
          spec: "Double-sided PCB trace milling down to 0.1mm; SMD soldering station",
          application:
            "Telemetry board prototyping, microcontroller daughter boards.",
        },
      ],
      capabilities: [
        "Rapid CAD-to-part manufacturing with quick turnaround.",
        "Custom weather-proof sensor enclosure fabrication with O-ring sealing.",
        "Drone motor mounts and agricultural spray nozzle adapter prototyping.",
        "Electronics circuit debugging with multi-channel digital storage oscilloscopes.",
      ],
      targetUsers: [
        "Agri-Robotics and drone hardware startups.",
        "IoT telemetry sensor and weather station developers.",
        "Student innovators from regional engineering institutions.",
      ],
      guidelines: [
        "All fabrication requests require standard CAD models (STEP, STL, DXF, or Gerber).",
        "Incubated cohort members receive priority scheduling and subsidized consumables.",
        "Machine operations must be supervised by the FabLab Lab Manager (Mr. Avinash Pudale).",
      ],
      bookingInfo: {
        pricingNotice:
          "Free for incubated startups; nominal hourly rate for external innovators",
        accessType: "Supervised Access / Machine Rental",
        contactPerson: "Mr. Avinash Pudale (Tech & Ecosystem Manager)",
        ctaLabel: "Book FabLab Prototyping Session",
        ctaHref: "/contact",
      },
    },

    // ------------------------------------------------------------------------
    // 2. NABL ANALYTICAL LAB
    // ------------------------------------------------------------------------
    {
      slug: "analytical-lab",
      name: "NABL Analytical Testing Laboratory",
      shortDesc:
        "High-precision testing instrumentation including GC-MS, HPLC, and spectrophotometers for soil, water, fertilizer, and bio-stimulant sample assays.",
      category: "Analytical",
      icon: "🔬",
      statusBadge: "Operational • Sample Intake Active",
      tagline:
        "Empirical Precision for Soil Health, Residues & Bio-Formulations",
      overview:
        "The Analytical Laboratory provides rigorous chemical and biological testing for agricultural inputs and harvested produce. Staffed by trained analytical chemists, the facility adheres to standard testing methodologies for nutrient mapping, pesticide residue screening, and microbial purity validation.",
      equipment: [
        {
          name: "Gas Chromatography-Mass Spectrometry (GC-MS)",
          spec: "High-sensitivity quadrupole detector with auto-sampler",
          application:
            "Pesticide residue detection, volatile organic compound analysis.",
        },
        {
          name: "High-Performance Liquid Chromatography (HPLC)",
          spec: "Binary high-pressure pump, UV-Vis Photodiode Array (PDA)",
          application:
            "Bio-stimulant ingredient quantification, aflatoxin profiling.",
        },
        {
          name: "Double-Beam UV-Vis Spectrophotometer",
          spec: "190–1100 nm wavelength range with spectral bandwidth 1.0 nm",
          application:
            "Available phosphorus, protein, chlorophyll, and enzyme assays.",
        },
        {
          name: "Flame Photometer & Ion-Selective Electrodes",
          spec: "Multi-element simultaneous potassium and sodium quantification",
          application:
            "Soil saline salinity mapping, irrigation water sodium adsorption ratio (SAR).",
        },
      ],
      capabilities: [
        "Comprehensive 12-parameter soil health profiling (pH, EC, OC, N, P, K, micronutrients).",
        "Irrigation water suitability certification for micro-drip and polyhouse systems.",
        "Bio-fertilizer and native microbial consortia viability and CFU counting.",
        "Heavy metal screening in agricultural soils and organic composts.",
      ],
      targetUsers: [
        "Bio-stimulant and bio-fertilizer biotechnology startups.",
        "Commercial farming cooperatives and Farmer Producer Organizations (FPOs).",
        "Agronomic researchers validating controlled trial plots.",
      ],
      guidelines: [
        "Soil and water samples must adhere to official collection and preservation protocols.",
        "Testing turnaround time is typically 5 to 7 business days depending on parameter count.",
        "Formal sample submission forms must accompany every testing batch.",
      ],
      bookingInfo: {
        pricingNotice:
          "Standard subsidized rate card approved by AIC-ADT management",
        accessType: "Sample Testing Service",
        contactPerson: "Laboratory Director, AIC-ADT Analytical Division",
        ctaLabel: "Submit Samples for Testing",
        ctaHref: "/contact",
      },
    },

    // ------------------------------------------------------------------------
    // 3. FOOD INNOVATION LAB & PILOT PLANT
    // ------------------------------------------------------------------------
    {
      slug: "food-innovation-lab",
      name: "Food Innovation Lab & Pilot Processing Plant",
      shortDesc:
        "Industrial pilot line with vacuum dehydrators, retort packaging, and grain milling to formulate and scale value-added food and millet products.",
      category: "Food Innovation",
      icon: "🥫",
      statusBadge: "Operational • Pilot Production Available",
      tagline:
        "Transforming Harvest Commodities into High-Margin Packaged Foods",
      overview:
        "The Food Innovation Lab bridges the gap between kitchen recipe experimentation and industrial manufacturing. Designed to meet FSSAI hygienic standards, the facility allows food-tech startups and farmer cooperatives to produce commercial-grade pilot batches for shelf-life testing and market launch.",
      equipment: [
        {
          name: "Vacuum Dehydration System",
          spec: "Low-temperature vacuum drying retaining natural color and nutrients",
          application:
            "Dehydrated onion flakes, fruits, vegetables, and herbal extracts.",
        },
        {
          name: "Retort Processing & Sterilization Autoclave",
          spec: "Fully automated counter-pressure retort with temperature data logging",
          application:
            "Shelf-stable ready-to-eat (RTE) meals, curries, and retort pouches.",
        },
        {
          name: "Millet Dehulling & Micronization Line",
          spec: "Multi-stage de-husker, aspirator, and stainless-steel pin mill",
          application:
            "Value-added sorghum (Jowar), pearl millet (Bajra), and ragi flours.",
        },
        {
          name: "Form-Fill-Seal & Nitrogen Flushing Packaging Line",
          spec: "Continuous band sealer with gas flush and batch coding",
          application:
            "Extended shelf-life packaging for snack foods and extruded cereals.",
        },
      ],
      capabilities: [
        "Pilot batch commercial production runs (up to 500 units per shift).",
        "Nutritional label profiling and moisture activity measurement.",
        "Accelerated temperature shelf-life stability studies.",
        "Formulation optimization for clean-label, preservative-free snacks.",
      ],
      targetUsers: [
        "Post-harvest food processing and millet value-addition startups.",
        "Women-led Self Help Groups (SHGs) and agricultural FPOs.",
        "Culinary researchers developing novel functional foods.",
      ],
      guidelines: [
        "Raw ingredients must be FSSAI-compliant and certified pesticide-free.",
        "Operators must complete mandatory sanitation and food safety training.",
        "Production batch scheduling requires at least 10 business days advance notice.",
      ],
      bookingInfo: {
        pricingNotice:
          "Per-shift pilot plant rental with subsidized raw material handling",
        accessType: "Pilot Plant Shift Rental",
        contactPerson: "Mr. Vaibhav Yadav (Food Innovation Lab Manager)",
        ctaLabel: "Schedule Pilot Plant Run",
        ctaHref: "/contact",
      },
    },

    // ------------------------------------------------------------------------
    // 4. DIGITAL MEDIA LAB
    // ------------------------------------------------------------------------
    {
      slug: "digital-media-lab",
      name: "Digital Media Studio & Agritech Storytelling",
      shortDesc:
        "Multi-camera podcast studio, product photography stage, and vernacular audio suites enabling startups to market their technologies to farmers.",
      category: "Digital Media",
      icon: "🎙️",
      statusBadge: "Operational • Booking Open",
      tagline:
        "Connecting Complex Agricultural Science with Millions of Farmers",
      overview:
        "Agritech innovations often fail because founders struggle to communicate their technical value to vernacular rural audiences. The Digital Media Studio empowers startups with broadcast-grade audio, video, and photography production to create compelling demonstration videos, vernacular farmer testimonials, and investor pitch reels.",
      equipment: [
        {
          name: "Multi-Camera 4K Video Production Rig",
          spec: "Cinema cameras with prime lenses, teleprompter, and continuous LED grid",
          application:
            "Founder interviews, technology demonstrations, masterclasses.",
        },
        {
          name: "Broadcast Audio & Podcast Suite",
          spec: "Shure SM7B broadcast microphones, digital audio workstation, soundproofing",
          application:
            "Agritech podcasting, vernacular Marathi/Hindi agricultural advisory.",
        },
        {
          name: "Product Photography Turntable & Light Stage",
          spec: "Motorized 360-degree turntable, diffused softboxes, macro lenses",
          application:
            "Hardware device cataloging, packaged food product photography.",
        },
        {
          name: "Video Editing & Color Grading Workstation",
          spec: "High-spec graphics workstation with DaVinci Resolve color-calibrated monitors",
          application:
            "Rapid post-production turnaround of high-impact marketing videos.",
        },
      ],
      capabilities: [
        "Professional 4K product demonstration videos for agricultural trade shows.",
        "Multi-track vernacular podcast recording for farmer outreach campaigns.",
        "High-resolution 360-degree e-commerce photography for hardware tools.",
        "Live-streaming webinars and hybrid cohort demo day broadcasts.",
      ],
      targetUsers: [
        "Incubated startups preparing investor pitches and crowdfunding reels.",
        "Agritech founders creating farmer-facing vernacular video tutorials.",
        "Visiting technical masterclass instructors and faculty.",
      ],
      guidelines: [
        "Studio booking includes access to equipment under supervision of the digital team.",
        "Raw footage is provided to the startup via secure cloud drive or high-speed USB.",
        "Commercial media editing packages are available upon request.",
      ],
      bookingInfo: {
        pricingNotice:
          "Complimentary production slots allocated per incubation cohort",
        accessType: "Studio Session Booking",
        contactPerson: "Mr. Ravi Londhe (Web & Systems Manager)",
        ctaLabel: "Book Media Studio Session",
        ctaHref: "/contact",
      },
    },

    // ------------------------------------------------------------------------
    // 5. CO-WORKING SPACE & RESIDENT HUB
    // ------------------------------------------------------------------------
    {
      slug: "co-working-space",
      name: "Incubation Co-Working Hub & Resident Amenities",
      shortDesc:
        "Modern air-conditioned collaborative workspaces, dedicated founder cabins, high-speed fiber internet, meeting rooms, and campus cafeteria.",
      category: "Resident Hub",
      icon: "🏢",
      statusBadge: "Active Residency • Hot Desks Available",
      tagline:
        "A Vibrant Community of Agritech Founders Living & Working Together",
      overview:
        "The AIC-ADT Co-Working Space offers an energizing workplace surrounded by greenery on the Sharadanagar campus. Resident founders enjoy 24/7 power backup, gigabit fiber internet, private meeting rooms, video-conferencing suites, and direct proximity to demonstration fields and testing labs.",
      equipment: [
        {
          name: "Ergonomic Hot Desks & Dedicated Workstations",
          spec: "Commercial task chairs, individualized power ports, locking storage",
          application:
            "Daily productive workspace for startup founders and engineers.",
        },
        {
          name: "Private Executive Team Cabins",
          spec: "Glass-partitioned 4-person and 6-person dedicated private suites",
          application:
            "Confidential company operations, hiring, and team collaboration.",
        },
        {
          name: "Smart Conference & Video Suites",
          spec: "4K smart display, omni-directional conference microphone, whiteboard",
          application: "Investor pitch calls, board meetings, team standups.",
        },
        {
          name: "High-Speed Redundant Gigabit Fiber",
          spec: "Dual-ISP leased lines with 100% DG power backup and secure Wi-Fi 6",
          application:
            "Continuous cloud compute, large dataset telemetry uploads.",
        },
      ],
      capabilities: [
        "Plug-and-play residency setup within 24 hours of incubator acceptance.",
        "Official commercial mailing address for company registration (MCA / GST).",
        "Access to campus library, dining cafeteria, sports complex, and guest house.",
        "Regular peer-learning mixers, founder brown-bag lunches, and mentor sessions.",
      ],
      targetUsers: [
        "Full-time physically incubated startup teams and remote founders.",
        "Visiting mentors, angel investors, and venture capital associates.",
        "Student innovators participating in intensive hackathon cohorts.",
      ],
      guidelines: [
        "Resident founders must sign standard campus co-working and code-of-conduct agreements.",
        "Conference room usage operates on an advance calendar reservation system.",
        "Official government photo identification required for all resident badges.",
      ],
      bookingInfo: {
        pricingNotice:
          "Included in official physical incubation packages; daily desk passes available",
        accessType: "Desk & Cabin Residency",
        contactPerson: "Ms. Chetana Nimbalkar (Front Desk Officer)",
        ctaLabel: "Apply for Co-Working Residency",
        ctaHref: "/contact",
      },
    },
  ],
};

// ============================================================================
// INSTITUTIONAL PARTNERS DATA
// ============================================================================

export interface PartnerItem {
  id: string;
  name: string;
  category:
    | "Government"
    | "Corporate CSR"
    | "Academic & Research"
    | "Investors"
    | "Industry Chambers";
  role: string;
  description: string;
  verified: boolean;
  badge: string;
}

export interface PartnerCategory {
  id: string;
  title: string;
  shortDesc: string;
  partners: PartnerItem[];
}

export interface InstitutionalPartnersData {
  hero: {
    badge: string;
    title: string;
    leadCopy: string;
  };
  categories: PartnerCategory[];
}

export const INSTITUTIONAL_PARTNERS_DATA: InstitutionalPartnersData = {
  hero: {
    badge: "Ecosystem & Strategic Alliances",
    title: "Government, Corporate CSR, Academic & Investment Partners",
    leadCopy:
      "AIC-ADT convenes national ministries, corporate grant makers, elite research universities, and venture funds to build a self-sustaining innovation corridor for agricultural deep-tech.",
  },
  categories: [
    {
      id: "government",
      title: "Government & National Granting Bodies",
      shortDesc:
        "Statutory bodies providing charter mandates, grant-in-aid, and seed funding schemes.",
      partners: [
        {
          id: "aim-niti",
          name: "Atal Innovation Mission (AIM)",
          category: "Government",
          role: "Sanctioning National Mission",
          description:
            "Flagship national initiative of NITI Aayog promoting innovation and entrepreneurship across India. Provides capital grant-in-aid and strategic oversight to AIC-ADT.",
          verified: true,
          badge: "NITI Aayog Charter",
        },
        {
          id: "dpiit-startup-india",
          name: "DPIIT — Startup India",
          category: "Government",
          role: "Seed Fund Implementing Partner",
          description:
            "Department for Promotion of Industry and Internal Trade facilitating seed capital disbursals to vetted agritech startups through the Startup India Seed Fund Scheme (SISFS).",
          verified: true,
          badge: "SISFS Allocation",
        },
        {
          id: "meity-startup-hub",
          name: "MeitY Startup Hub (MSH)",
          category: "Government",
          role: "Digital & Electronics Innovation Partner",
          description:
            "Supporting electronics, sensor hardware, and AI agritech founders under the GENESIS Entrepreneur-in-Residence (EiR) and digital pilot schemes.",
          verified: true,
          badge: "GENESIS Cohort",
        },
        {
          id: "icar-kvk",
          name: "ICAR — KVK Baramati",
          category: "Government",
          role: "Agronomic Trial & Extension Partner",
          description:
            "Krishi Vigyan Kendra Baramati collaborates on controlled agronomic field trials, farmer advisory linkages, and regional pest surveillance.",
          verified: true,
          badge: "Field Extension",
        },
      ],
    },
    {
      id: "corporate-csr",
      title: "Corporate CSR Innovation Partners",
      shortDesc:
        "Forward-thinking corporations funding high-impact rural development cohorts.",
      partners: [
        {
          id: "capgemini",
          name: "Capgemini India",
          category: "Corporate CSR",
          role: "CSR AgTech Cohort Sponsor",
          description:
            "Strategic CSR partnership providing direct catalytic grant tranches and technology advisory to deep-tech agritech startups creating rural livelihood impact.",
          verified: true,
          badge: "CSR Partner",
        },
        {
          id: "hdfc-parivartan",
          name: "HDFC Bank Parivartan",
          category: "Corporate CSR",
          role: "Social Enterprise Grant Partner",
          description:
            "Funding early-stage agricultural social enterprises focused on decentralized farmer storage, water conservation, and soil biological health.",
          verified: true,
          badge: "Parivartan Grant",
        },
        {
          id: "edf-man",
          name: "ED&F Man Commodities",
          category: "Corporate CSR",
          role: "Sustainable Agriculture Sponsor",
          description:
            "Supporting sustainable sugarcane agronomy trials, soil salinity remediation technologies, and farm labor mechanization.",
          verified: true,
          badge: "Agri Commodity Partner",
        },
      ],
    },
    {
      id: "academia",
      title: "Academic & Research Collaborators",
      shortDesc:
        "Premier agricultural and engineering universities sharing research and lab talent.",
      partners: [
        {
          id: "sppu-pune",
          name: "Savitribai Phule Pune University (SPPU)",
          category: "Academic & Research",
          role: "Research Translation Partner",
          description:
            "Academic collaboration facilitating joint research, faculty mentorship, student patent translation, and cross-laboratory analytical testing.",
          verified: true,
          badge: "University MOU",
        },
        {
          id: "mpkv-rahuri",
          name: "Mahatma Phule Krishi Vidyapeeth (MPKV)",
          category: "Academic & Research",
          role: "State Agricultural University",
          description:
            "State agricultural university providing crop variety research alignment, certified germplasm testing, and doctoral researcher linkages.",
          verified: true,
          badge: "State Agri University",
        },
        {
          id: "college-of-agriculture-baramati",
          name: "College of Agriculture, Baramati",
          category: "Academic & Research",
          role: "Campus Academic Node",
          description:
            "ADT's constituent agricultural college supplying student innovation talent, greenhouse resources, and experimental field plots on Sharadanagar campus.",
          verified: true,
          badge: "Host College",
        },
      ],
    },
    {
      id: "investors",
      title: "Venture Capital & Investor Linkages",
      shortDesc:
        "Institutional investment networks evaluating graduate cohort ventures for Series funding.",
      partners: [
        {
          id: "bharat-innovation-fund",
          name: "Bharat Innovation Fund",
          category: "Investors",
          role: "Deep-Tech Venture Partner",
          description:
            "Early-stage deep-tech venture capital fund providing mentorship and demo-day evaluation to AIC-ADT hardware and biotechnology ventures.",
          verified: true,
          badge: "Deep-Tech VC",
        },
        {
          id: "omnivore-network",
          name: "Agritech Investor Network",
          category: "Investors",
          role: "Institutional Advisory Network",
          description:
            "Ecosystem mentor linkages connecting resident founders with specialized agritech angel syndicates and venture fund partners.",
          verified: true,
          badge: "Investor Network",
        },
        {
          id: "ian",
          name: "Indian Angel Network Linkages",
          category: "Investors",
          role: "Angel Syndication Channel",
          description:
            "Bridging revenue-generating agritech ventures with accredited angel investors for bridge capital and commercial expansion.",
          verified: true,
          badge: "Angel Syndicates",
        },
      ],
    },
    {
      id: "chambers",
      title: "Industry & Chamber Associations",
      shortDesc:
        "Industry federations facilitating enterprise B2B pilots and export corridors.",
      partners: [
        {
          id: "mccia",
          name: "Mahratta Chamber of Commerce (MCCIA)",
          category: "Industry Chambers",
          role: "Industry Linkage Partner",
          description:
            "Western Maharashtra's premier industrial chamber connecting incubatees with manufacturing vendors, supply chain vendors, and export houses.",
          verified: true,
          badge: "Chamber Partner",
        },
        {
          id: "tie-pune",
          name: "TiE Pune Chapter",
          category: "Industry Chambers",
          role: "Entrepreneurial Network",
          description:
            "Global entrepreneurial network providing founder coaching, international immersion programs, and peer founder networking.",
          verified: true,
          badge: "TiE Network",
        },
      ],
    },
  ],
};
