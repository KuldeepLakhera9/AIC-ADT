export interface StartupProfile {
  slug: string;
  name: string;
  tagline: string;
  sector:
    | "Agri-Tech"
    | "Smart Farming"
    | "Biotechnology"
    | "Food Processing"
    | "Climate Tech"
    | "Agribusiness";
  cohort: string;
  fundingScheme: string;
  founders: string;
  location: string;
  overview: string;
  problemStatement: string;
  solutionInnovation: string;
  reachMetric: string;
  labsUsed: string;
  trlLevel: string;
  milestones: string[];
  websiteUrl?: string;
  verified: boolean;
  featuredInHomepage: boolean;
  avatarPlaceholder: string;
}

export interface SuccessStoryCaseStudy {
  slug: string;
  startupSlug: string;
  title: string;
  subtitle: string;
  sector: string;
  founderNames: string;
  heroMetric: string;
  heroMetricLabel: string;
  challengeNarrative: string;
  aicInterventionNarrative: string;
  empiricalOutcomeNarrative: string;
  verifiedQuotes: {
    quote: string;
    author: string;
    designation: string;
  }[];
  keyMilestones: string[];
}

export const VERIFIED_STARTUPS_DIRECTORY: StartupProfile[] = [
  {
    slug: "gramheet",
    name: "GramHeet Solutions Pvt Ltd",
    tagline:
      "Decentralized Village-Level Post-Harvest Storage & Digital Market Linkage",
    sector: "Agri-Tech",
    cohort: "Cohort 2022",
    fundingScheme: "Startup India Seed Fund Scheme (SISFS)",
    founders: "Pankaj Mahalle & Shweta Thakare",
    location: "Baramati / Yavatmal, Maharashtra",
    overview:
      "Village-level integrated post-harvest storage and direct market linkage platform providing decentralized micro-warehousing, quality assaying, and distress-sale avoidance finance for smallholder farmers.",
    problemStatement:
      "Smallholder farmers lose 15%–25% of their crop value to distress selling immediately post-harvest due to a lack of affordable village-level storage and accessible commodity credit.",
    solutionInnovation:
      "Integrated micro-cold rooms and standardized digital quality assaying stationed at village clusters, allowing farmers to store produce safely and borrow against electronic warehouse receipts.",
    reachMetric: "35,000+ Smallholder Farmers",
    labsUsed: "Food Pilot Plant & KVK Testing Plots",
    trlLevel: "TRL 8 (Commercial Scale)",
    milestones: [
      "Facilitated transparent harvest credit linkages across 42 Farmer Producer Organizations.",
      "Field-validated decentralized solar micro-cold rooms on the Baramati demonstration campus.",
      "Recognized with national DPIIT best agritech startup recognition award.",
    ],
    websiteUrl: "https://gramheet.com",
    verified: true,
    featuredInHomepage: true,
    avatarPlaceholder: "GH",
  },
  {
    slug: "innosapien",
    name: "Innosapien Agro Technologies",
    tagline:
      "Edge-AI Powered Crop Phenotyping & Automated Telemetry Disease Forecasting",
    sector: "Smart Farming",
    cohort: "Cohort 2023",
    fundingScheme: "MeitY GENESIS EiR Grant",
    founders: "Dr. Rahul Shinde & Aniket Pawar",
    location: "Baramati / Pune, Maharashtra",
    overview:
      "Edge-AI and computer-vision powered crop phenotyping and automated disease forecast weather stations, conducting live telemetry across Western Maharashtra sugarcane tracts.",
    problemStatement:
      "Sudden fungal infestations such as red rot and rust destroy up to 30% of standing sugarcane acreage before visible symptoms can be manually diagnosed by agronomists.",
    solutionInnovation:
      "Autonomous solar micro-weather telemetry towers with onboard optical multi-spectral sensors running edge-AI inference to forecast disease sporulation 72 hours before outbreak.",
    reachMetric: "14 Sugarcane Clusters",
    labsUsed: "110-Acre Test Farm & FabLab Makerspace",
    trlLevel: "TRL 7 (Operational Validation)",
    milestones: [
      "Deployed 65 micro-weather sensor towers across Baramati and Daund talukas.",
      "Reduced red rot fungal disease incidence by 28% through predictive spray advisories.",
      "Integrated edge-camera weed classification model on autonomous tractor implements.",
    ],
    verified: true,
    featuredInHomepage: true,
    avatarPlaceholder: "IA",
  },
  {
    slug: "agribiotics",
    name: "Baramati Agribiotics Pvt Ltd",
    tagline:
      "Halotolerant Microbial Bio-Stimulants for Soil Salinity Remediation",
    sector: "Biotechnology",
    cohort: "Cohort 2024",
    fundingScheme: "Corporate CSR Innovation Grant",
    founders: "Dr. Sunita Kulkarni & Mahesh Jagtap",
    location: "Sharadanagar, Baramati",
    overview:
      "High-potency halotolerant microbial bio-stimulant formulations tackling soil salinity, boosting microbial biomass, and stimulating root elongation in cash crops.",
    problemStatement:
      "Decades of intensive flood irrigation and chemical fertilizing in the canal-irrigated sugarcane belt have turned thousands of hectares of arable soil saline and barren.",
    solutionInnovation:
      "A consortia of native halotolerant rhizosphere bacteria capable of solubilizing locked phosphorus, regulating osmotic stress, and restoring cation-exchange balance in saline soils.",
    reachMetric: "1,800 Hectares Treated",
    labsUsed: "NABL Analytical Soil & Water Laboratory",
    trlLevel: "TRL 6 (Pilot Field Trials)",
    milestones: [
      "Completed multi-season bio-efficacy trials on the 110-acre ADT experimental farm.",
      "Certified pathogen-free and heavy-metal-free under official NABL laboratory assays.",
      "Filed provisional Indian patent for saline-soil rhizosphere microbial consortium.",
    ],
    verified: true,
    featuredInHomepage: true,
    avatarPlaceholder: "BA",
  },
  {
    slug: "kisandost",
    name: "KisanDost Robotics",
    tagline: "Autonomous Electric Inter-Row Weeding & Mulching Farm Rovers",
    sector: "Agri-Tech",
    cohort: "Cohort 2023",
    fundingScheme: "Startup India Seed Fund Scheme (SISFS)",
    founders: "Tanmay Deshmukh & Sagar Patil",
    location: "Baramati / Satara, Maharashtra",
    overview:
      "Electric autonomous inter-row weeding and micro-mulching rovers engineered specifically for smallholder sugarcane, turmeric, and onion cultivations.",
    problemStatement:
      "Acute farm labor shortages during monsoon weeding windows lead to rampant weed competition, reducing crop yields by up to 35% and increasing manual weeding expenses.",
    solutionInnovation:
      "Lightweight, narrow-track electric autonomous rovers equipped with real-time RTK-GPS navigation and mechanical oscillating weeders that operate without damaging crop roots.",
    reachMetric: "45 FPOs Deployed",
    labsUsed: "FabLab Makerspace Prototyping Workshop",
    trlLevel: "TRL 7 (Field Demonstration)",
    milestones: [
      "Engineered lithium-iron-phosphate battery packs supporting 8 hours of continuous field runtime.",
      "Reduced manual labor weeding expenditure by ₹4,500 per acre.",
      "Manufactured chassis components using Baramati FabLab CNC routers and laser cutting rigs.",
    ],
    verified: true,
    featuredInHomepage: false,
    avatarPlaceholder: "KD",
  },
  {
    slug: "phytopure",
    name: "PhytoPure Biofuels",
    tagline: "Agricultural Residue Pyrolysis to Carbon-Negative Biochar",
    sector: "Climate Tech",
    cohort: "Cohort 2024",
    fundingScheme: "Pre-Incubation Track",
    founders: "Vikas Jagdale & Sneha More",
    location: "Baramati, Maharashtra",
    overview:
      "Agricultural residue pyrolysis technology converting crop residue and sugarcane bagasse into carbon-negative biochar and condensed wood vinegar bio-stimulants.",
    problemStatement:
      "Post-harvest open-field burning of crop residue and bagasse generates severe air pollution, depletes soil organic carbon, and wastes valuable biomass energy.",
    solutionInnovation:
      "Mobile, decentralized batch pyrolyzers that operate at farm gates to convert crop waste into high-surface-area biochar that sequesters carbon for hundreds of years.",
    reachMetric: "4,200 Tons Residue Saved",
    labsUsed: "NABL Analytical Testing Laboratory",
    trlLevel: "TRL 5 (Lab Prototype Validated)",
    milestones: [
      "Diverted 4,200 metric tons of agricultural residue from open-field burning.",
      "Produced verified biochar with 82% fixed carbon stability.",
      "Testing moisture retention benefits across dryland grape vineyards.",
    ],
    verified: true,
    featuredInHomepage: false,
    avatarPlaceholder: "PB",
  },
  {
    slug: "krishik",
    name: "Krishik ColdChain Innovations",
    tagline:
      "Phase-Change Decentralized Solar Micro-Cold Rooms for Perishable Horticulture",
    sector: "Food Processing",
    cohort: "Cohort 2022",
    fundingScheme: "Startup India Seed Fund Scheme (SISFS)",
    founders: "Abhijit Gaikwad & Neha Joshi",
    location: "Baramati / Solapur, Maharashtra",
    overview:
      "Decentralized solar-powered micro-cold rooms utilizing non-toxic phase change thermal material, preventing post-harvest spoilage for perishable pomegranate and fig growers.",
    problemStatement:
      "Horticulture growers face severe spoilage (over 20%) within 48 hours of picking when ambient temperatures exceed 38°C in semi-arid cultivation regions.",
    solutionInnovation:
      "Modular cold-storage units integrated with phase-change thermal storage banks that maintain 4°C–8°C for 36 hours without requiring active grid power or diesel backup.",
    reachMetric: "120 Horticulture Farms",
    labsUsed: "Food Pilot Plant & Demonstration Farm",
    trlLevel: "TRL 8 (Commercialized Deployment)",
    milestones: [
      "Maintains 4°C to 8°C chilled temperature for up to 36 hours without active grid power.",
      "Decreased post-harvest distress spoilage from 22% down to less than 4%.",
      "Awarded commercial supply contract by two Maharashtra fig grower cooperatives.",
    ],
    verified: true,
    featuredInHomepage: false,
    avatarPlaceholder: "KC",
  },
];

export const SUCCESS_STORIES: SuccessStoryCaseStudy[] = [
  {
    slug: "gramheet-post-harvest-case-study",
    startupSlug: "gramheet",
    title:
      "How GramHeet Built a Village-Level Post-Harvest Safety Net for 35,000+ Farmers",
    subtitle:
      "A comprehensive study on decentralized micro-warehousing, digital quality assaying, and post-harvest distress sale avoidance funded through DPIIT SISFS.",
    sector: "Agri-Tech / Post-Harvest",
    founderNames: "Pankaj Mahalle & Shweta Thakare",
    heroMetric: "35,000+",
    heroMetricLabel: "Farmers Reached Across Maharashtra",
    challengeNarrative:
      "In drought-prone and rainfed agricultural districts, smallholder farmers often invest entire household savings into seed and fertilizer. Upon harvest, market gluts force them to sell their crops to local middlemen at prices well below minimum support rates simply because they lack clean storage facilities or immediate working capital to hold stock.",
    aicInterventionNarrative:
      "AIC-ADT Baramati provided GramHeet with ₹20 Lakhs in milestone-based grant funding under the Startup India Seed Fund Scheme (SISFS), alongside specialized pilot testing space in the Food Pilot Plant and living trial linkages with regional Farmer Producer Organizations (FPOs). The incubator's agronomists helped standardize non-destructive grain moisture and quality testing protocols.",
    empiricalOutcomeNarrative:
      "GramHeet has deployed decentralized storage units across rural Maharashtra, enabling farmers to safely store their produce at the village gate, receive digital warehouse receipts, and access instant micro-credit up to 70% of crop value. Farmers holding their produce through GramHeet's model have achieved 20% to 30% higher net realizations by selling during off-peak market windows.",
    verifiedQuotes: [
      {
        quote:
          "AIC-ADT's living testbeds and SISFS grant support provided the catalytic foundation we needed to prove that decentralized village warehousing is commercially sustainable.",
        author: "Pankaj Mahalle",
        designation: "Co-Founder & CEO, GramHeet Solutions",
      },
    ],
    keyMilestones: [
      "35,000+ smallholder farmers actively onboarded onto the digital marketplace.",
      "Over ₹3.2 Crores in harvest credit linkages facilitated with zero default rates.",
      "Featured as a premier national agritech case study by NITI Aayog.",
    ],
  },
  {
    slug: "innosapien-smart-farming-case-study",
    startupSlug: "innosapien",
    title:
      "Edge-AI Phenotyping: Protecting Sugarcane Acres with Predictive Micro-Weather Telemetry",
    subtitle:
      "How Innosapien deployed IoT micro-weather sensor towers and edge-AI computer vision to reduce fungal disease outbreaks across 14 sugarcane clusters.",
    sector: "Smart Farming / Edge AI",
    founderNames: "Dr. Rahul Shinde & Aniket Pawar",
    heroMetric: "28%",
    heroMetricLabel: "Reduction in Red Rot Fungal Incidence",
    challengeNarrative:
      "Sugarcane is Western Maharashtra's primary cash crop, but humid micro-climates inside dense sugarcane canopies create fertile breeding grounds for devastating fungal pathogens such as red rot. Conventional satellite imagery lacks the ground-level resolution beneath the dense canopy to detect early-stage infections before entire fields are compromised.",
    aicInterventionNarrative:
      "Through the MeitY GENESIS EiR initiative at AIC-ADT, Innosapien fabricated ruggedized, weather-proof telemetry enclosures in the campus FabLab and deployed test towers across the 110-acre campus farm. Innosapien's optical sensors were calibrated directly against KVK Baramati's reference weather station data.",
    empiricalOutcomeNarrative:
      "The deployed network of 65 telemetry towers continuously logs micro-temperature, canopy humidity, and leaf wetness. By combining micro-climatic data with edge-AI image recognition, Innosapien alerts farmers 72 hours ahead of spore dissemination, allowing targeted bio-fungicide spraying that cuts chemical usage by 40% while preserving crop tonnage.",
    verifiedQuotes: [
      {
        quote:
          "The ability to fabricate CAD parts in the FabLab in the morning and test them on real sugarcane plots in the afternoon accelerated our hardware deployment cycle by six months.",
        author: "Dr. Rahul Shinde",
        designation: "Founder, Innosapien Agro Technologies",
      },
    ],
    keyMilestones: [
      "65 micro-weather sensor towers actively monitoring Western Maharashtra cane clusters.",
      "Empirical field trials verified a 28% drop in fungal red rot crop loss.",
      "Integrated with regional sugar cooperative automated advisory notification networks.",
    ],
  },
];
