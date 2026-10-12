/**
 * AIC-ADT Baramati Foundation — Events Data Architecture
 * Source of truth: docs/requirements/sitemap.md, docs/audit/content-verification-register.md,
 * and docs/architecture/phase-4-homepage-content-register.md
 */

export type EventStatus = "Upcoming" | "Registration Closed" | "Concluded";

export type EventCategory =
  | "All"
  | "Intake Deadline"
  | "Technical Workshop"
  | "Field Showcase"
  | "Ecosystem Conclave"
  | "Training Bootcamp";

export interface EventItem {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  category: EventCategory;
  status: EventStatus;
  date: {
    day: string;
    month: string;
    year: string;
    formatted: string;
    time?: string;
  };
  venue: {
    name: string;
    type: "In-Person Campus" | "Online National Portal" | "Hybrid";
    address: string;
    directionsUrl?: string;
  };
  organizer: string;
  targetAudience: string[];
  agendaOrHighlights: string[];
  registration: {
    isAvailable: boolean;
    buttonLabel: string;
    externalUrl?: string;
    fee: string;
    deadline?: string;
    contactEmail: string;
    statusNote: string;
  };
  verifiedSource: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    slug: "sisfs-cohort-4",
    title: "Startup India Seed Fund (SISFS) Cohort 4 Application Intake",
    shortDescription:
      "Official DPIIT national funding round providing seed capital up to ₹20 Lakhs in grants and up to ₹50 Lakhs in convertible debt.",
    fullDescription: [
      "AIC-ADT Baramati Foundation is actively evaluating eligible early-stage agri-tech, food processing, and rural biotech innovations under the DPIIT Startup India Seed Fund Scheme (SISFS).",
      "Selected startups receive milestone-based grant tranches, laboratory incubation at the Baramati campus, mentorship from domain leaders, and direct living-lab testing access across 110 acres of cultivated farmland.",
      "Applications must be filed directly through the official Government of India Startup India portal, selecting 'AIC-ADT Baramati Foundation' as the preferred incubation incubator.",
    ],
    category: "Intake Deadline",
    status: "Upcoming",
    date: {
      day: "30",
      month: "NOV",
      year: "2026",
      formatted: "November 30, 2026",
      time: "11:59 PM IST",
    },
    venue: {
      name: "Online National Portal",
      type: "Online National Portal",
      address: "Official Startup India Seed Fund Portal (DPIIT)",
      directionsUrl: "https://seedfund.startupindia.gov.in/",
    },
    organizer: "DPIIT, Ministry of Commerce & Industry / AIC-ADT Foundation",
    targetAudience: [
      "DPIIT-recognized early-stage startups",
      "Agri-hardware and farm mechanization innovators",
      "Biotechnology and sustainable input ventures",
      "Smallholder supply chain & post-harvest platforms",
    ],
    agendaOrHighlights: [
      "Grant Tranches: Up to ₹20 Lakhs for Proof of Concept & Prototype Validation",
      "Debt Tranches: Up to ₹50 Lakhs for Commercialization & Market Rollout",
      "Living-Farm Testbeds: Direct deployment on 110-acre campus farm",
      "Evaluation: Scored against 100-point national rubric by Investment Committee",
    ],
    registration: {
      isAvailable: true,
      buttonLabel: "Apply on Startup India Portal",
      externalUrl: "https://seedfund.startupindia.gov.in/",
      fee: "Free (Government of India Scheme)",
      deadline: "November 30, 2026",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote: "Official National Portal Intake Active",
    },
    verifiedSource:
      "DPIIT Startup India Seed Fund Guidelines & AIC-ADT Sanction",
  },
  {
    slug: "millet-processing-workshop",
    title: "Millet Value-Added Processing & FSSAI Standards Masterclass",
    shortDescription:
      "Hands-on technical masterclass covering extrusion, vacuum dehydration, nutritional testing, and commercial FSSAI compliance for millet entrepreneurs.",
    fullDescription: [
      "Hosted at the Food Innovation Pilot Plant at the AIC-ADT Baramati campus, this technical workshop equips agri-entrepreneurs, FPO leaders, and food researchers with practical processing skills.",
      "Participants will run pilot production batches on modern continuous vacuum dryers, twin-screw extruders, and packaging equipment under the direct supervision of food technology scientists.",
      "The curriculum includes mandatory labeling standards, nutritional shelf-life validation, and protocol requirements for NABL analytical laboratory testing.",
    ],
    category: "Technical Workshop",
    status: "Upcoming",
    date: {
      day: "08",
      month: "DEC",
      year: "2026",
      formatted: "December 08, 2026",
      time: "09:30 AM – 05:30 PM IST",
    },
    venue: {
      name: "Food Innovation Pilot Plant",
      type: "In-Person Campus",
      address:
        "Sharadanagar Campus, Malegaon Colony, Baramati, Maharashtra 413115",
      directionsUrl: "/contact/directions",
    },
    organizer: "AIC-ADT Food Innovation Lab & KVK Baramati",
    targetAudience: [
      "Millet value-addition entrepreneurs",
      "Farmer Producer Organizations (FPOs)",
      "Food science researchers & postgraduates",
      "Incubated food-tech startup technical teams",
    ],
    agendaOrHighlights: [
      "Extrusion & Dehydration Operations in Pilot Plant",
      "Nutrient Retention & Moisture Profiling via NABL Protocols",
      "Packaging Metallurgy & Modified Atmosphere Packaging (MAP)",
      "FSSAI Compliance, Licensing & Traceability Documentation",
    ],
    registration: {
      isAvailable: false,
      buttonLabel: "Inquire via Incubation Desk",
      fee: "Subsidized for Incubatees & Student Innovators",
      deadline: "December 01, 2026",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote:
        "Roster Finalization in Progress — Inquire with Incubation Desk",
    },
    verifiedSource: "Food Innovation Pilot Plant Training Calendar Q4 2026",
  },
  {
    slug: "agri-robotics-demo-day",
    title: "Agri-Robotics & Autonomous Telemetry Field Demonstration Day",
    shortDescription:
      "Live field showcase of autonomous inter-row weeding rovers, electrostatic drone spray implements, and LoRaWAN soil moisture towers in active cultivation.",
    fullDescription: [
      "The Centre of Excellence Demonstration Farm opens its testbeds for an intensive demonstration day showcasing deep-tech agri-mechanization hardware.",
      "Hardware engineers, drone pilots, and agronomy researchers will witness live demonstrations of autonomous row-following robots navigating sugarcane and soybean plots.",
      "Startups will demonstrate LoRaWAN telemetry nodes, precision capacitance soil probes, and computer-vision disease classification systems under real-world weather conditions.",
    ],
    category: "Field Showcase",
    status: "Upcoming",
    date: {
      day: "15",
      month: "DEC",
      year: "2026",
      formatted: "December 15, 2026",
      time: "10:00 AM – 04:30 PM IST",
    },
    venue: {
      name: "Centre of Excellence Demonstration Farm",
      type: "In-Person Campus",
      address:
        "110-Acre Agricultural Development Trust Campus, Baramati, Maharashtra 413115",
      directionsUrl: "/contact/directions",
    },
    organizer: "AIC-ADT Foundation & Agricultural Development Trust",
    targetAudience: [
      "Hardware robotics founders and developers",
      "Progressive farmers and farm machinery contractors",
      "Agritech venture capital and angel syndicate delegates",
      "Agricultural engineering faculty and student innovators",
    ],
    agendaOrHighlights: [
      "Live Rover Demonstrations in Active Crop Rows",
      "Electrostatic Ultra-Low Volume Drone Spray Trials",
      "Edge-AI Foliar Diagnostic Demonstrations on Tablets",
      "Panel Discussion: 'Commercialising Hardware for Smallholder Affordability'",
    ],
    registration: {
      isAvailable: false,
      buttonLabel: "Request Delegation Pass",
      fee: "Complimentary with Advance Registration",
      deadline: "December 10, 2026",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote: "Delegation Passes Available via Direct Desk Inquiry",
    },
    verifiedSource: "Centre of Excellence Demonstration Farm Schedule Q4 2026",
  },
  {
    slug: "aarambh-2025",
    title: "AARAMBH AgTech Pitch Fest & Ecosystem Conclave",
    shortDescription:
      "Annual flagship showcase uniting 30+ incubated startups, 14 institutional venture funds, and rural enterprise mentors for seed demo day.",
    fullDescription: [
      "Concluded flagship conclave where incubated founders pitched working prototypes and commercial metrics to institutional venture funds, corporate CSR leaders, and angel syndicates.",
      "The conclave featured formal signing ceremonies for collaborative pilots between incubated agritech ventures and regional FPO networks across Western Maharashtra.",
      "Panel tracks covered rural credit access, bio-stimulant regulatory compliance, and domestic manufacturing of agricultural IoT hardware.",
    ],
    category: "Ecosystem Conclave",
    status: "Concluded",
    date: {
      day: "14",
      month: "MAR",
      year: "2025",
      formatted: "March 14, 2025",
      time: "Concluded",
    },
    venue: {
      name: "Sharadanagar Main Auditorium",
      type: "In-Person Campus",
      address:
        "Agricultural Development Trust Campus, Baramati, Maharashtra 413115",
      directionsUrl: "/contact/directions",
    },
    organizer: "AIC-ADT Baramati Foundation",
    targetAudience: [
      "Incubated portfolio startups",
      "Institutional investors and corporate CSR directors",
      "Government officials from AIM and MeitY",
    ],
    agendaOrHighlights: [
      "32 Venture Presentations Across Agritech, Biotech & Food Tech",
      "14 Venture Funds Participated in One-on-One Investor Clinics",
      "₹1.8 Cr in Indicative Pilot Commitments Facilitated",
      "Keynote Addresses by Agricultural Development Trust Trustees",
    ],
    registration: {
      isAvailable: false,
      buttonLabel: "Event Concluded",
      fee: "By Invitation",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote: "Concluded • Archived in Institutional Records",
    },
    verifiedSource: "AIC-ADT Annual Progress Report FY 2024-25",
  },
  {
    slug: "drone-agronomy-bootcamp",
    title: "DGCA Agricultural Drone Pilot & Precision Spraying Workshop",
    shortDescription:
      "Intensive 5-day certification workshop on DGCA Remotely Piloted Aircraft System (RPAS) rules, flight telemetry, and ULV pesticide spraying.",
    fullDescription: [
      "Rigorous technical training curriculum conducted in partnership with authorized Remote Pilot Training Organizations (RPTO) and KVK Baramati.",
      "35 rural youth, agricultural graduates, and custom hiring operators completed simulator hours and hands-on flight trials over test crops.",
      "The syllabus encompassed payload calibration, battery maintenance, DGCA DigitalSky compliance, and safety protocols for crop canopy protection.",
    ],
    category: "Training Bootcamp",
    status: "Concluded",
    date: {
      day: "24",
      month: "AUG",
      year: "2024",
      formatted: "August 20–24, 2024",
      time: "Concluded",
    },
    venue: {
      name: "KVK Demonstration Farm & Drone Arena",
      type: "In-Person Campus",
      address: "Sharadanagar, Baramati, Maharashtra 413115",
      directionsUrl: "/contact/directions",
    },
    organizer: "AIC-ADT Baramati Foundation & KVK Baramati",
    targetAudience: [
      "Rural youth & drone service entrepreneurs",
      "FPO technical operators",
      "Agricultural engineering diploma and degree holders",
    ],
    agendaOrHighlights: [
      "10 Flight Hours per Trainee on Agricultural Drones",
      "Calibration of Ultra-Low Volume (ULV) Centrifugal Nozzles",
      "Battery Management and On-Field Charging Infrastructure",
      "100% Course Completion Rate with Official Certificate Issuance",
    ],
    registration: {
      isAvailable: false,
      buttonLabel: "Event Concluded",
      fee: "Subsidized Trainee Fee",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote: "Concluded • 35 Candidates Certified",
    },
    verifiedSource: "KVK Training Archives & AIC-ADT Capacity Building Records",
  },
  {
    slug: "nabl-soil-analysis-masterclass",
    title: "Analytical Soil Profiling & Spectral Chromatography Workshop",
    shortDescription:
      "Hands-on laboratory training on Gas Chromatography-Mass Spectrometry (GC-MS), High-Performance Liquid Chromatography (HPLC), and heavy metal profiling.",
    fullDescription: [
      "Specialized training for quality analysts and bio-fertilizer startup founders on operating analytical chemistry instrumentation in an NABL-certified setting.",
      "Covered sample digestion protocols, calibration curves, detection limit calculations, and interpretation of soil salinity and residual chemical profiles.",
      "Participants prepared standard reference samples and verified results against certified institutional reference materials.",
    ],
    category: "Technical Workshop",
    status: "Concluded",
    date: {
      day: "14",
      month: "OCT",
      year: "2024",
      formatted: "October 12–14, 2024",
      time: "Concluded",
    },
    venue: {
      name: "NABL Analytical Testing Laboratory",
      type: "In-Person Campus",
      address:
        "Ground Floor, Innovation Complex, Sharadanagar, Baramati 413115",
      directionsUrl: "/contact/directions",
    },
    organizer: "AIC-ADT Analytical Testing Facility",
    targetAudience: [
      "Quality assurance chemists and lab technicians",
      "Biotechnology startup founders",
      "Soil science research scholars",
    ],
    agendaOrHighlights: [
      "GC-MS and HPLC Instrumentation Operation",
      "Atomic Absorption Spectrophotometry for Micronutrient Analysis",
      "Good Laboratory Practices (GLP) and Quality Assurance Controls",
      "Standard Operating Procedures for NABL Sample Logging",
    ],
    registration: {
      isAvailable: false,
      buttonLabel: "Event Concluded",
      fee: "Laboratory Fee",
      contactEmail: "aicadt@adtbaramati.com",
      statusNote: "Concluded • Annual Laboratory Training Track",
    },
    verifiedSource: "AIC-ADT Analytical Testing Laboratory Logs 2024",
  },
];

export const UPCOMING_EVENTS_LIST = EVENTS_DATA.filter(
  (e) => e.status === "Upcoming",
);

export const PAST_EVENTS_LIST = EVENTS_DATA.filter(
  (e) => e.status === "Concluded",
);
