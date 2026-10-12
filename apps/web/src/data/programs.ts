export interface ProgramCore {
  slug: string;
  name: string;
  badge: string;
  stage: string;
  duration: string;
  trlLevel: string;
  tagline: string;
  summary: string;
  audience: string[];
  offerings: string[];
  eligibility: string[];
  selectionProcess: string[];
  fundingScope: string;
  facilityAccess: string[];
  status: "Active Intake" | "Rolling Review" | "Upcoming Call";
  ctaLabel: string;
  ctaHref: string;
}

export interface SchemeCore {
  slug: string;
  name: string;
  sanctioningBody: string;
  badge: string;
  grantCap: string;
  summary: string;
  fundingMechanism: string[];
  eligibilityCriteria: string[];
  disbursementMilestones: string[];
  supportedStartupsCount: string;
  featuredCaseStudy: {
    startupName: string;
    founderNames: string;
    sector: string;
    impactHeadline: string;
    description: string;
    slug: string;
  };
  officialStatus:
    "Active Applications" | "Cohort in Progress" | "Empaneled Pipeline";
  applicationNote: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertiseArea: string;
  domains: string[];
  verified: boolean;
  avatarPlaceholder: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  category: "Technology" | "Processing" | "Agronomy" | "Enterprise";
  targetAudience: string;
  duration: string;
  keyTopics: string[];
  certification: string;
  status: "Open Registration" | "Concluded Session" | "Quarterly Module";
}

export interface ApplicationFaq {
  question: string;
  answer: string;
  category: "Eligibility" | "Funding & Equity" | "Facilities" | "Process";
}

// ============================================================================
// 1. INCUBATION CONTINUUM PROGRAMS
// ============================================================================

export const PROGRAMS_CONTINUUM: ProgramCore[] = [
  {
    slug: "pre-incubation",
    name: "Pre-Incubation Program",
    badge: "Ideation to Proof of Concept",
    stage: "Idea & Early Prototype",
    duration: "3 to 6 Months",
    trlLevel: "TRL 2 – TRL 4",
    tagline:
      "Validating Agricultural Problems and Engineering Early Bench Prototypes",
    summary:
      "Designed for student innovators, researchers, and early founders with a compelling agritech hypothesis. Focuses on customer discovery, technical prototyping in our FabLab, and feasibility testing with local farmers.",
    audience: [
      "Student innovators and engineering/agriculture graduates.",
      "Early founders with an unvalidated technical hypothesis.",
      "Grassroots rural inventors needing CAD and hardware engineering.",
    ],
    offerings: [
      "Subsidized access to FabLab makerspace, 3D printers, and PCB milling rigs.",
      "Bi-weekly advisory check-ins with dedicated incubation managers.",
      "Direct interactions with local farmer producer organizations (FPOs) for customer discovery.",
      "Curriculum covering business model canvas, patent searching, and regulatory basics.",
    ],
    eligibility: [
      "Must address a verified problem in agriculture, biotechnology, food processing, or rural mechanization.",
      "At least one core founder dedicated full-time or substantive part-time.",
      "Indian citizenship or DPIIT-recognized early venture.",
    ],
    selectionProcess: [
      "Online concept note submission via portal.",
      "Preliminary internal screening by incubation staff.",
      "10-minute pitch presentation before Technical Advisory Committee.",
      "Induction and workspace allocation within 14 days of selection.",
    ],
    fundingScope:
      "Subsidized prototyping credits and eligibility for downstream seed grant nominations.",
    facilityAccess: [
      "FabLab Makerspace",
      "Co-Working Hot Desks",
      "Campus Library & Seminar Halls",
    ],
    status: "Active Intake",
    ctaLabel: "Apply for Pre-Incubation",
    ctaHref: "/programs/apply-instructions",
  },
  {
    slug: "incubation",
    name: "Comprehensive Incubation Program",
    badge: "Flagship Incubation",
    stage: "Prototype to Market Launch",
    duration: "12 to 24 Months",
    trlLevel: "TRL 4 – TRL 7",
    tagline:
      "Empirical Field Validation, Seed Capital Linkages & Commercial Launch",
    summary:
      "Our core incubation track providing rigorous support for startups with working prototypes. Combines 110-acre living farm trials, NABL testing assays, DPIIT SISFS seed capital nominations, and intellectual property facilitation.",
    audience: [
      "Incorporated startups (Private Limited or LLP) with working prototypes.",
      "Bio-stimulant and biotechnology ventures requiring clinical lab assays.",
      "Ag-robotics, drone, and IoT hardware ventures requiring controlled farm validation.",
    ],
    offerings: [
      "Controlled trial plots across 50+ acres of living sugarcane, pomegranate, and grape crops.",
      "Nomination for DPIIT Startup India Seed Fund Scheme (SISFS) grants and convertible debt.",
      "Analytical chemical testing in NABL laboratory (GC-MS, HPLC, spectrophotometry).",
      "Dedicated patent filing support and subsidy through AIC-ADT IP Facilitation Cell.",
      "Air-conditioned dedicated team cabins and high-speed gigabit fiber co-working amenities.",
    ],
    eligibility: [
      "DPIIT-recognized startup incorporated within the last 5 years.",
      "Clear technological innovation or proprietary deep-tech formulation.",
      "Willingness to conduct pilot trials on or around the Baramati campus.",
    ],
    selectionProcess: [
      "Detailed application dossier with pitch deck and financial projections.",
      "Technical due diligence and lab feasibility review.",
      "In-person or virtual pitch before the Governing Project Evaluation Committee.",
      "Execution of official Incubation Agreement and milestone charter.",
    ],
    fundingScope:
      "Access to SISFS (up to ₹20L grant / ₹50L debt) and Corporate CSR co-funding tranches.",
    facilityAccess: [
      "110-Acre Living Farm Testbeds",
      "NABL Analytical Lab",
      "Food Innovation Pilot Plant",
      "Dedicated Team Cabins",
    ],
    status: "Active Intake",
    ctaLabel: "Apply for Full Incubation",
    ctaHref: "/programs/apply-instructions",
  },
  {
    slug: "acceleration",
    name: "Growth Acceleration Program",
    badge: "Commercial Scale & Series Funding",
    stage: "Revenue Generation & Scaling",
    duration: "6 to 9 Months",
    trlLevel: "TRL 7 – TRL 9",
    tagline:
      "Supply Chain Optimization, Institutional VC Access & National Market Penetration",
    summary:
      "A fast-tracked intensive program tailored for post-revenue agritech startups ready to scale operations across multiple districts. Focuses on institutional venture capital syndication, large corporate B2B contracts, and international market readiness.",
    audience: [
      "Revenue-generating agritech companies seeking institutional Pre-Series A / Series A funding.",
      "FPO tech aggregators expanding distribution across western and central India.",
      "Export-ready food processing and packaged produce enterprises.",
    ],
    offerings: [
      "Direct introductions to institutional agritech venture funds (Bharat Innovation Fund, Omnivore network).",
      "B2B pilot matchmaking with agricultural processing conglomerates and sugar cooperatives.",
      "Vernacular marketing campaigns and product reels produced in our Digital Media Studio.",
      "Advisory on supply chain unit economics, ERP deployment, and statutory tax governance.",
    ],
    eligibility: [
      "Demonstrated minimum monthly recurring revenue or executed commercial farm contracts.",
      "Scalable business model addressing substantial smallholder acreage.",
      "Audited financial statements and corporate compliance records.",
    ],
    selectionProcess: [
      "Curated cohort intake and partner investor referral.",
      "Commercial traction evaluation and unit economics audit.",
      "One-on-one partner interview with senior venture advisors.",
    ],
    fundingScope:
      "Investor syndication pipelines, commercial debt linkages, and institutional Demo Day.",
    facilityAccess: [
      "Digital Media Studio",
      "Executive Conference Suites",
      "Enterprise Pilot Testbeds",
    ],
    status: "Rolling Review",
    ctaLabel: "Explore Acceleration Track",
    ctaHref: "/programs/apply-instructions",
  },
];

// ============================================================================
// 2. GOVERNMENT & CSR SCHEMES
// ============================================================================

export const SCHEMES_DATA: SchemeCore[] = [
  {
    slug: "startup-india",
    name: "Startup India Seed Fund Scheme (SISFS)",
    sanctioningBody:
      "DPIIT, Ministry of Commerce & Industry, Government of India",
    badge: "Flagship Central Grant",
    grantCap: "Up to ₹20 Lakhs Grant | Up to ₹50 Lakhs Debt",
    summary:
      "Financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization through AIC-ADT as an approved incubator.",
    fundingMechanism: [
      "Up to ₹20 Lakhs as a non-dilutive grant for proof-of-concept validation, prototype fabrication, or field trials.",
      "Up to ₹50 Lakhs as debt financing or convertible debentures for early commercial market rollout.",
      "Milestone-based disbursement linked to empirical prototype deliverables.",
    ],
    eligibilityCriteria: [
      "Recognized by DPIIT with an active Startup India certificate.",
      "Incorporated not more than 2 years prior to application date.",
      "Must have a business idea to develop a product or service with market fit.",
      "Has not received more than ₹10 Lakhs of monetary support under any other Central/State Govt scheme.",
    ],
    disbursementMilestones: [
      "Tranche 1 (40%): Upon signing agreement and initial procurement plan sign-off.",
      "Tranche 2 (30%): Upon successful delivery of working prototype or pilot deployment.",
      "Tranche 3 (30%): Upon field trial data submission, financial audit, and final review.",
    ],
    supportedStartupsCount: "14+ Ventures Funded",
    featuredCaseStudy: {
      startupName: "GramHeet Solutions Pvt Ltd",
      founderNames: "Pankaj Mahalle & Shweta Thakare",
      sector: "Agri-Tech / Post-Harvest",
      impactHeadline:
        "Empowering 35,000+ Farmers with Village-Level Micro-Cold Storage",
      description:
        "Utilized SISFS grant funding to deploy decentralized micro-warehousing and digital quality assaying, preventing distress crop selling across drought-prone rural farming clusters.",
      slug: "gramheet",
    },
    officialStatus: "Active Applications",
    applicationNote:
      "Applications are processed via the official Startup India portal with AIC-ADT Baramati selected as the primary incubator preference.",
  },
  {
    slug: "meity-genesis",
    name: "MeitY GENESIS (EiR & Pilot Scheme)",
    sanctioningBody:
      "MeitY Startup Hub (MSH), Ministry of Electronics & IT, Government of India",
    badge: "Electronics & Deep-Tech Mandate",
    grantCap: "Up to ₹10 Lakhs EiR Fellowship | Up to ₹40L Pilot Grants",
    summary:
      "Catalyzing deep-tech electronics, IoT hardware, and vernacular digital platforms through Entrepreneur-in-Residence (EiR) fellowships and commercial pilot funding tranches.",
    fundingMechanism: [
      "Monthly Entrepreneur-in-Residence (EiR) stipend totaling up to ₹10 Lakhs over 12 months for prototype founders.",
      "Competitive pilot challenge grants up to ₹40 Lakhs for validated agritech IoT hardware and AI solutions.",
      "Direct technical mentorship from semiconductor and hardware manufacturing leaders.",
    ],
    eligibilityCriteria: [
      "Founders developing electronic hardware, IoT sensors, robotics, or edge-AI agritech.",
      "Working prototype or clear schematic ready for FabLab fabrication.",
      "Indian national committed full-time to commercializing the technology.",
    ],
    disbursementMilestones: [
      "Monthly fellowship disbursements upon verification of sprint milestones.",
      "Mid-cohort hardware design review and CE/FCC compliance assessment.",
      "Final pilot demonstration across connected telemetry towers in Baramati.",
    ],
    supportedStartupsCount: "Cohort 2 Completed • 8 Tech Fellows",
    featuredCaseStudy: {
      startupName: "Innosapien Agro Technologies",
      founderNames: "Dr. Rahul Shinde & Aniket Pawar",
      sector: "Smart Farming / Edge AI",
      impactHeadline: "Edge-AI Phenotyping & Micro-Weather Telemetry Towers",
      description:
        "Leveraged MeitY GENESIS support to fabricate IoT weather stations and deploy computer-vision disease forecast models across 14 sugarcane growing clusters.",
      slug: "innosapien",
    },
    officialStatus: "Cohort in Progress",
    applicationNote:
      "Call for EiR Cohort 3 applications will be formally announced following NITI Aayog and MeitY schedule releases.",
  },
  {
    slug: "csr",
    name: "Corporate CSR Innovation Partnerships",
    sanctioningBody:
      "Capgemini India, HDFC Bank Parivartan, ED&F Man Commodities",
    badge: "Corporate Social Impact",
    grantCap: "₹5 Lakhs – ₹15 Lakhs Seed Grants",
    summary:
      "Catalytic grant funding mobilized under statutory Corporate Social Responsibility mandates to support startups that demonstrably increase smallholder farmer incomes, water efficiency, and sustainable soil health.",
    fundingMechanism: [
      "Milestone-based non-dilutive social enterprise grants directly allocated to pilot trials.",
      "Corporate technical mentorship, supply-chain access, and enterprise vendor empanelment.",
      "Rigorous third-party social impact audit and carbon reduction metrics tracking.",
    ],
    eligibilityCriteria: [
      "Ventures targeting smallholder farmer livelihoods, rural women entrepreneurship, or water conservation.",
      "Clear measurable impact metrics (e.g., acres treated, input cost reduction, water liters saved).",
      "Compliant with Section 135 Schedule VII of the Companies Act, 2013.",
    ],
    disbursementMilestones: [
      "Tranche 1: Baseline farmer cohort survey and implementation roadmap.",
      "Tranche 2: Field deployment verification across participating talukas.",
      "Tranche 3: Third-party social impact assessment and final outcome report.",
    ],
    supportedStartupsCount: "9+ Startups Supported Across 3 Corporate Tracks",
    featuredCaseStudy: {
      startupName: "Baramati Agribiotics Pvt Ltd",
      founderNames: "Dr. Sunita Kulkarni & Mahesh Jagtap",
      sector: "Biotechnology / Soil Health",
      impactHeadline:
        "Remediating Soil Salinity Across 1,800 Hectares of Cash Crops",
      description:
        "Supported by corporate CSR grant tranches to produce indigenous halotolerant microbial consortia, reversing soil degradation in intensively irrigated sugarcane belts.",
      slug: "agribiotics",
    },
    officialStatus: "Empaneled Pipeline",
    applicationNote:
      "CSR cohort intake occurs through specialized thematic challenges announced jointly with corporate partners.",
  },
];

// ============================================================================
// 3. MENTORSHIP ROSTER
// ============================================================================

export const MENTORS_DATA: MentorProfile[] = [
  {
    id: "prataprao-pawar",
    name: "Mr. Prataprao Pawar",
    role: "Chairman & Industrial Mentor",
    organization: "Sakal Media Group / ADT",
    expertiseArea: "Corporate Strategy & Media Outreach",
    domains: [
      "Institutional Strategy",
      "Public-Private Alliances",
      "Governance",
    ],
    verified: true,
    avatarPlaceholder: "PP",
  },
  {
    id: "ganesh-hingmire",
    name: "Prof. Adv. Ganesh Hingmire",
    role: "IPR & Patent Counsel",
    organization: "Great Mission Group Consultants (GMGC)",
    expertiseArea: "Intellectual Property Rights",
    domains: [
      "Patent Prosecution",
      "Geographical Indications",
      "Trademark Strategy",
    ],
    verified: true,
    avatarPlaceholder: "GH",
  },
  {
    id: "hemendra-mathur",
    name: "Mr. Hemendra Mathur",
    role: "Senior Venture Advisor",
    organization: "Bharat Innovation Fund",
    expertiseArea: "Agritech Venture Capital",
    domains: ["Venture Capital", "Unit Economics", "Agritech Financing"],
    verified: true,
    avatarPlaceholder: "HM",
  },
  {
    id: "aditya-arora",
    name: "Mr. Aditya Arora",
    role: "Angel Network Mentor",
    organization: "Faust / Angel Syndicates",
    expertiseArea: "Pitch Architecture & Scaling",
    domains: ["Pitch Deck Framing", "Angel Syndication", "Early-Stage Growth"],
    verified: true,
    avatarPlaceholder: "AA",
  },
  {
    id: "kvk-scientists",
    name: "KVK Agronomy Scientists",
    role: "Field Agronomy Board",
    organization: "Krishi Vigyan Kendra, Baramati",
    expertiseArea: "Crop Science & Soil Trials",
    domains: [
      "Soil Nutrient Dynamics",
      "Polyhouse Cultivation",
      "Pest Diagnostics",
    ],
    verified: true,
    avatarPlaceholder: "KVK",
  },
  {
    id: "avinash-pudale-mentor",
    name: "Mr. Avinash Pudale",
    role: "Hardware & IoT Mentor",
    organization: "AIC-ADT Technology Division",
    expertiseArea: "Rapid Prototyping",
    domains: ["FabLab Machines", "PCB Design", "Sensor Enclosures"],
    verified: true,
    avatarPlaceholder: "AP",
  },
];

// ============================================================================
// 4. TRAINING & CAPACITY BUILDING
// ============================================================================

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "millet-processing",
    title: "Post-Harvest Millet Value-Addition & Packaging Masterclass",
    category: "Processing",
    targetAudience:
      "Food entrepreneurs, Women Self-Help Groups (SHGs), and Farmer Producer Organizations.",
    duration: "3-Day Practical Bootcamp",
    keyTopics: [
      "Dehusking and pin-milling sorghum (Jowar), pearl millet (Bajra), and finger millet (Ragi).",
      "Formulation of shelf-stable millet snacks without chemical preservatives.",
      "FSSAI food hygiene, packaging regulations, and nutritional labeling standards.",
    ],
    certification: "Certified by AIC-ADT Food Innovation Division",
    status: "Quarterly Module",
  },
  {
    id: "iot-precision-agri",
    title: "Agricultural IoT Sensor Prototyping & Telemetry Workshop",
    category: "Technology",
    targetAudience:
      "Engineering students, hardware hobbyists, and early agritech technical founders.",
    duration: "2-Day Hands-On Lab",
    keyTopics: [
      "Microcontroller interfacing with soil moisture, NPK, and ambient weather sensors.",
      "Low-power LoRaWAN and 4G NB-IoT telemetry data transmission pipelines.",
      "Weather-proof 3D-printed enclosure fabrication in the campus FabLab.",
    ],
    certification: "Certified by AIC-ADT Makerspace & FabLab",
    status: "Open Registration",
  },
  {
    id: "soil-health-diagnostics",
    title: "Modern Soil Chemical Analysis & NABL Testing Standards",
    category: "Agronomy",
    targetAudience:
      "Rural soil testing lab operators, agri-input dealers, and FPO technical staff.",
    duration: "5-Day Certificate Course",
    keyTopics: [
      "Standard soil sampling, preservation, and digestion protocols.",
      "Operating spectrophotometers and flame photometers for N-P-K assays.",
      "Interpreting micronutrient deficiency reports and issuing farmer advisories.",
    ],
    certification: "Certified by AIC-ADT Analytical Testing Laboratory",
    status: "Quarterly Module",
  },
  {
    id: "agritech-business-ipr",
    title: "Agri-Enterprise Governance, SISFS Grants & Patent Prosecution",
    category: "Enterprise",
    targetAudience:
      "Startup co-founders, incubatee teams, and prospective grant applicants.",
    duration: "1-Day Strategic Seminar",
    keyTopics: [
      "Structuring DPIIT startup recognition and SISFS grant applications.",
      "Patent prior-art searches and drafting provisional patent applications.",
      "Statutory MCA corporate compliance, GST filing, and cap-table structuring.",
    ],
    certification: "Certified by AIC-ADT Incubation & IPR Cell",
    status: "Open Registration",
  },
];

// ============================================================================
// 5. APPLICATION GUIDELINES & FAQS
// ============================================================================

export const APPLICATION_STEPS = [
  {
    stepNumber: "01",
    title: "Check Eligibility & Select Track",
    description:
      "Review the requirements for Pre-Incubation, Incubation, or Acceleration. Verify that your solution addresses agriculture, biotechnology, robotics, or rural processing.",
  },
  {
    stepNumber: "02",
    title: "Prepare Concept Dossier",
    description:
      "Assemble your DPIIT certificate (if incorporated), pitch deck (maximum 15 slides), founder CVs, technical architecture diagram, and prototype photography.",
  },
  {
    stepNumber: "03",
    title: "Submit Online Application",
    description:
      "Complete the structured application form with accurate problem statements, target smallholder acreage, and campus facility requirements.",
  },
  {
    stepNumber: "04",
    title: "Internal Screening & Technical Review",
    description:
      "Incubation management reviews your submission against technical viability, campus facility fit, and regulatory compliance within 10 business days.",
  },
  {
    stepNumber: "05",
    title: "Pitch Before Advisory Committee",
    description:
      "Shortlisted founders present a 10-minute pitch followed by 10 minutes of Q&A before our Technical Evaluation Committee.",
  },
  {
    stepNumber: "06",
    title: "Agreement Execution & Induction",
    description:
      "Selected ventures sign standard incubation agreements, receive facility access credentials, and begin milestone-based support.",
  },
];

export const APPLICATION_DOCUMENT_CHECKLIST = [
  "Certificate of Incorporation (CIN) and Memorandum of Association (for Incubation track).",
  "DPIIT Startup India Recognition Certificate (if available).",
  "Executive Pitch Deck (covering Problem, Solution, Traction, Market Size, Team, and Facility Needs).",
  "Technical Schematic, CAD render, or prototype photograph (high resolution).",
  "KYC documents of all primary founders (Aadhaar / Passport).",
  "Audited Financial Statements / Bank Statements for past 6 months (for Acceleration track).",
];

export const APPLICATION_FAQS: ApplicationFaq[] = [
  {
    category: "Eligibility",
    question: "Do I need to be legally incorporated as a company to apply?",
    answer:
      "For the Pre-Incubation track, you do not need an incorporated entity at the time of application; individual founders and student teams are welcome. However, for the Comprehensive Incubation and Acceleration tracks, you must be incorporated as a Private Limited company or LLP in India.",
  },
  {
    category: "Funding & Equity",
    question: "Does AIC-ADT take an equity stake in incubated startups?",
    answer:
      "Standard incubation at AIC-ADT does not take mandatory upfront equity. In specific acceleration cohorts or structured co-investment arrangements, nominal advisory equity or board observer rights may be discussed transparently per approved NITI Aayog guidelines.",
  },
  {
    category: "Funding & Equity",
    question:
      "How do startups access the Startup India Seed Fund Scheme (SISFS)?",
    answer:
      "Once incubated or approved by our Project Evaluation Committee, eligible startups submit their application on the official Startup India portal selecting AIC-ADT Baramati as their host incubator. The committee evaluates the prototype and milestones before approving grant tranches up to ₹20 Lakhs.",
  },
  {
    category: "Facilities",
    question:
      "Can startups access the 110-acre farm testbed for drone and robotics trials?",
    answer:
      "Yes. AIC-ADT operates 50+ acres of active living crops (sugarcane, pomegranate, grapes, vegetables) and climate-controlled polyhouses specifically for pilot trials, telemetry logging, and drone corridor demonstrations with KVK agronomic oversight.",
  },
  {
    category: "Process",
    question:
      "What is the typical turnaround time from application to induction?",
    answer:
      "The screening process takes approximately 2 to 3 weeks from the application deadline. Shortlisted founders are invited to pitch within 10 days of screening, and final induction decisions are communicated within 5 business days post-pitch.",
  },
  {
    category: "Facilities",
    question:
      "Is physical residency in Baramati mandatory for all cohort members?",
    answer:
      "We offer both physical and virtual incubation. Startups requiring specialized hardware machines (FabLab), chemical analysis (NABL Lab), or farm trial plots must be on campus for their test runs. Software and digital market platforms can participate through hybrid check-ins.",
  },
];
