export type InnovationStatus =
  | "Deployed Service"
  | "Technology Demonstration"
  | "Active Research Activity"
  | "Proposed Initiative";

export interface InnovationShowcaseItem {
  id: string;
  title: string;
  domainSlug: string;
  category: string;
  status: InnovationStatus;
  statusBadgeVariant: "botanical" | "leaf" | "neutral" | "warning";
  shortDescription: string;
  fullOverview: string;
  attribution: {
    leadEntity: string;
    collaborator?: string;
    type:
      | "Incubatee Invention"
      | "AIC-ADT Facility Pilot"
      | "Academic Collaboration"
      | "KVK Trial";
  };
  specifications: { label: string; value: string }[];
  fieldLocation: string;
  verifiedValidationNotes: string;
  icon: string;
}

export interface InnovationDomain {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  overview: string;
  mandatePillars: string[];
  campusInfrastructureNodes: string[];
  items: InnovationShowcaseItem[];
}

export const INNOVATION_DOMAINS: InnovationDomain[] = [
  // 1. AGRI-TECH
  {
    slug: "agri-tech",
    title: "Farm Mechanization, Sensors & Agri-Robotics",
    subtitle:
      "Precision Engineering Tailored to Smallholder Farming Topographies",
    badge: "Hardware & Robotics",
    icon: "🚜",
    overview:
      "Bridging the mechanization gap for Indian smallholders through lightweight, electric, and autonomous implements designed specifically for narrow-row horticulture and sugarcane topographies.",
    mandatePillars: [
      "Electric autonomous weeding rovers to eliminate chemical herbicide dependence.",
      "Custom drone spray adapters with drift-minimization nozzle geometry.",
      "Affordable tractor-mounted implement sensors for micro-depth tillage control.",
    ],
    campusInfrastructureNodes: [
      "FabLab Makerspace",
      "50-Acre Living Trial Beds",
      "DGCA Drone Corridor",
    ],
    items: [
      {
        id: "rover-weeder",
        title: "Autonomous Electric Inter-Row Weeding Rover",
        domainSlug: "agri-tech",
        category: "Farm Robotics",
        status: "Technology Demonstration",
        statusBadgeVariant: "leaf",
        shortDescription:
          "Narrow-track autonomous rover engineered with RTK-GPS navigation for chemical-free weed control in sugarcane and onion crops.",
        fullOverview:
          "Engineered by KisanDost Robotics using the AIC-ADT FabLab CNC facilities, this lightweight battery rover uses oscillating steel tines to dislodge weeds within 3cm of crop stems without causing root compaction.",
        attribution: {
          leadEntity: "KisanDost Robotics (Incubatee Venture)",
          collaborator: "FabLab Makerspace Prototyping Workshop",
          type: "Incubatee Invention",
        },
        specifications: [
          {
            label: "Power Source",
            value: "Lithium Iron Phosphate (LiFePO4) 48V",
          },
          { label: "Runtime", value: "Up to 8 hours per charge" },
          {
            label: "Working Width",
            value: "Adjustable 45cm to 90cm row spacing",
          },
          {
            label: "Navigation",
            value: "Dual-band RTK-GPS with ultrasonic safety stops",
          },
        ],
        fieldLocation: "Sharadanagar Polyhouse & Sugarcane Test Plots",
        verifiedValidationNotes:
          "Demonstrated across 45 pilot farm plots; prototype operational under supervisor monitoring.",
        icon: "🤖",
      },
      {
        id: "drone-spray-nozzle",
        title: "Drift-Controlled Electrostatic Drone Spray Implement",
        domainSlug: "agri-tech",
        category: "UAV Technology",
        status: "Active Research Activity",
        statusBadgeVariant: "warning",
        shortDescription:
          "Electrostatic droplet charging ring fitted to agricultural drone booms to enhance under-leaf bio-pesticide adhesion.",
        fullOverview:
          "An ongoing joint research project between campus engineers and regional agronomists to evaluate whether electrostatically charged micronized droplets cling more effectively to the abaxial (underside) surfaces of grape and pomegranate canopies.",
        attribution: {
          leadEntity: "AIC-ADT Rapid Prototyping Group",
          collaborator: "College of Agriculture Baramati Engineering Faculty",
          type: "Academic Collaboration",
        },
        specifications: [
          {
            label: "Operational Voltage",
            value: "3.5 kV low-current induction ring",
          },
          { label: "Droplet Size", value: "80 to 120 microns VMD" },
          {
            label: "Boom Compatibility",
            value: "Standard 16mm/20mm carbon-fiber tubes",
          },
        ],
        fieldLocation: "ADT Research Vineyard Trial Rows",
        verifiedValidationNotes:
          "Currently undergoing wind-tunnel testing and fluorometric tracer deposition trials.",
        icon: "🚁",
      },
    ],
  },

  // 2. SMART FARMING
  {
    slug: "smart-farming",
    title: "IoT, Precision Agronomy & Telemetry",
    subtitle:
      "Empirical Environmental Telemetry Connected to Living Crop Canopies",
    badge: "Precision Agronomy",
    icon: "📡",
    overview:
      "Transforming agricultural decision-making from intuition to empirical science through micro-weather telemetry towers, sub-surface capacitance probes, and automated drip scheduling.",
    mandatePillars: [
      "Continuous micro-climate monitoring beneath dense sugarcane canopies.",
      "Multi-depth capacitance soil moisture profiling to optimize canal irrigation cycles.",
      "Automated disease sporulation prediction based on leaf-wetness duration.",
    ],
    campusInfrastructureNodes: [
      "NABL Analytical Laboratory",
      "KVK Reference Weather Station",
      "Campus Telemetry Hub",
    ],
    items: [
      {
        id: "canopy-telemetry-tower",
        title: "Micro-Weather Canopy Telemetry Tower Network",
        domainSlug: "smart-farming",
        category: "Agricultural IoT",
        status: "Deployed Service",
        statusBadgeVariant: "botanical",
        shortDescription:
          "Solar-powered IoT towers logging ambient temperature, relative humidity, leaf wetness, and solar irradiance across sugarcane tracts.",
        fullOverview:
          "Developed by Innosapien Agro Technologies, these telemetry towers operate on cellular 4G/NB-IoT bands, relaying canopy-level climatic data every 15 minutes to generate automated fungal disease alerts for surrounding farmers.",
        attribution: {
          leadEntity: "Innosapien Agro Technologies",
          collaborator: "KVK Baramati Agronomy Division",
          type: "Incubatee Invention",
        },
        specifications: [
          {
            label: "Sensor Array",
            value: "Air Temp, RH, Leaf Wetness, Pyranometer",
          },
          {
            label: "Connectivity",
            value: "Dual SIM NB-IoT / 4G LTE with offline buffer",
          },
          {
            label: "Power Autonomy",
            value: "10W Monocrystalline panel with Li-ion reserve",
          },
        ],
        fieldLocation: "65 Field Sites across Baramati & Daund Talukas",
        verifiedValidationNotes:
          "Actively deployed and verified across 14 operational sugarcane clusters.",
        icon: "🗼",
      },
      {
        id: "soil-capacitance-probe",
        title: "Multi-Depth Soil Moisture & EC Capacitance Probe",
        domainSlug: "smart-farming",
        category: "Soil Telemetry",
        status: "Technology Demonstration",
        statusBadgeVariant: "leaf",
        shortDescription:
          "Segmented tubular probe logging volumetric water content and bulk electrical conductivity at 10cm, 20cm, 30cm, and 50cm depths.",
        fullOverview:
          "A precision hardware instrument designed to help growers manage root-zone water penetration and detect fertilizer leaching below the active root zone in automated drip irrigation systems.",
        attribution: {
          leadEntity: "AIC-ADT Telemetry Labs",
          collaborator: "Centre of Excellence in Protected Cultivation",
          type: "AIC-ADT Facility Pilot",
        },
        specifications: [
          {
            label: "Sensor Depths",
            value: "4 discrete measuring zones (10 to 50cm)",
          },
          {
            label: "Measurement Type",
            value: "High-frequency FDR capacitance",
          },
          { label: "Communication", value: "RS-485 Modbus RTU / LoRaWAN" },
        ],
        fieldLocation: "Sharadanagar Automated Polyhouse Complex",
        verifiedValidationNotes:
          "Demonstrated in polyhouse bell pepper and tomato trials with calibrated soil moisture curves.",
        icon: "🌱",
      },
    ],
  },

  // 3. FOOD PROCESSING
  {
    slug: "food-processing",
    title: "Post-Harvest Processing, Retort & Food Value-Addition",
    subtitle:
      "Industrial Pilot Equipment Transforming Raw Harvest Commodities into Packaged Foods",
    badge: "Food Technology",
    icon: "🥫",
    overview:
      "Bridging the perilous gap between kitchen recipe formulation and commercial food processing with FSSAI-compliant pilot facilities, retort packaging, vacuum dehydration, and millet processing lines.",
    mandatePillars: [
      "Thermal retort processing to create preservative-free, shelf-stable meals.",
      "Vacuum dehydration retaining heat-sensitive vitamins and pigments in fruits and herbs.",
      "Millet dehusking and micro-milling to support the National Millet Mission.",
    ],
    campusInfrastructureNodes: [
      "Food Innovation Pilot Plant",
      "FSSAI Testing Division",
      "Packaging Station",
    ],
    items: [
      {
        id: "vacuum-dehydration-line",
        title: "Low-Temperature Vacuum Dehydration Pilot Line",
        domainSlug: "food-processing",
        category: "Dehydration Tech",
        status: "Deployed Service",
        statusBadgeVariant: "botanical",
        shortDescription:
          "Industrial vacuum drying system operating at 40°C–50°C to preserve color, aroma, and nutritional compounds in fruits and herbs.",
        fullOverview:
          "Installed in the AIC-ADT Food Innovation Lab, this pilot plant line allows incubatees to produce premium dehydrated onion flakes, fruit crisps, and botanical extracts without the browning and nutrient loss of hot-air dryers.",
        attribution: {
          leadEntity: "AIC-ADT Food Innovation Division",
          collaborator: "Supervised by Mr. Vaibhav Yadav (Food Lab Manager)",
          type: "AIC-ADT Facility Pilot",
        },
        specifications: [
          { label: "Batch Capacity", value: "Up to 50 kg wet produce per run" },
          {
            label: "Operating Temperature",
            value: "Controlled 35°C to 55°C range",
          },
          { label: "Vacuum Level", value: "-0.095 MPa continuous vacuum" },
        ],
        fieldLocation: "Sharadanagar Food Innovation Pilot Plant",
        verifiedValidationNotes:
          "Operational pilot line available for incubatee trial shifts and commercial recipe batch runs.",
        icon: "🍎",
      },
      {
        id: "solar-pcm-cold-room",
        title: "Decentralized Phase-Change Solar Micro-Cold Room",
        domainSlug: "food-processing",
        category: "Cold Chain",
        status: "Deployed Service",
        statusBadgeVariant: "botanical",
        shortDescription:
          "Farm-gate cold room utilizing thermal phase change material to maintain 4°C–8°C for 36 hours during rural power interruptions.",
        fullOverview:
          "Engineered by Krishik ColdChain Innovations, this modular unit solves rural post-harvest losses for fig and pomegranate farmers by storing thermal energy in non-toxic eutectic plates charged by rooftop solar PV.",
        attribution: {
          leadEntity: "Krishik ColdChain Innovations",
          collaborator: "AIC-ADT Seed Fund Facilitation",
          type: "Incubatee Invention",
        },
        specifications: [
          {
            label: "Storage Volume",
            value: "5 Metric Ton / 10 Metric Ton modular",
          },
          {
            label: "Thermal Backup",
            value: "Up to 36 hours without grid or generator",
          },
          {
            label: "Temperature Range",
            value: "4°C to 8°C (Horticulture mode)",
          },
        ],
        fieldLocation:
          "Baramati Demonstration Farm & Solapur Fig Growers Cluster",
        verifiedValidationNotes:
          "Deployed across 120 participating horticulture orchards in Western Maharashtra.",
        icon: "❄️",
      },
    ],
  },

  // 4. AGRIBUSINESS
  {
    slug: "agribusiness",
    title: "Market Linkage, FPO Tech & Supply Chain",
    subtitle: "Decentralized Aggregation Platforms Eliminating Distress Sales",
    badge: "Supply Chain & FPO Tech",
    icon: "📈",
    overview:
      "Empowering smallholder farmers and Farmer Producer Organizations (FPOs) through decentralized digital grading, village-level storage access, and fair-value commodity market linkages.",
    mandatePillars: [
      "Village-level micro-warehousing connected to electronic warehouse receipts.",
      "Fair-price digital auction and commodity grading networks.",
      "FPO enterprise management and traceability from harvest to retail shelf.",
    ],
    campusInfrastructureNodes: [
      "Digital Media Studio",
      "KVK Farmer Extension Center",
      "Rural Telemetry Hub",
    ],
    items: [
      {
        id: "village-micro-warehouse",
        title: "Integrated Village-Level Post-Harvest Micro-Warehouse Model",
        domainSlug: "agribusiness",
        category: "Commodity Warehousing",
        status: "Deployed Service",
        statusBadgeVariant: "botanical",
        shortDescription:
          "Decentralized storage infrastructure allowing farmers to store grain at the village gate and access post-harvest credit.",
        fullOverview:
          "Pioneered by GramHeet Solutions with AIC-ADT support, this platform combines standardized village-level testing, scientific bagging, and collateral storage to allow farmers to sell their harvest during off-peak price surges.",
        attribution: {
          leadEntity: "GramHeet Solutions Pvt Ltd",
          collaborator: "Supported under DPIIT SISFS Scheme",
          type: "Incubatee Invention",
        },
        specifications: [
          {
            label: "Farmer Reach",
            value: "35,000+ registered smallholder farmers",
          },
          { label: "Credit Linkage", value: "Over ₹3.2 Crores facilitated" },
          {
            label: "Partner FPOs",
            value: "42 FPO aggregation nodes in Maharashtra",
          },
        ],
        fieldLocation:
          "Rural Maharashtra Village Clusters (Yavatmal, Baramati, Washim)",
        verifiedValidationNotes:
          "Empirical operations verified under statutory DPIIT and NITI Aayog impact audits.",
        icon: "🌾",
      },
    ],
  },

  // 5. CLIMATE TECH
  {
    slug: "climate-tech",
    title: "Renewable Energy, Biochar & Circular Agriculture",
    subtitle:
      "Transforming Agricultural Byproducts into Soil Carbon & Renewable Value",
    badge: "Climate & Biochar",
    icon: "♻️",
    overview:
      "Addressing open-field crop burning, agricultural carbon sequestration, and clean energy microgrids through circular biotechnology, biochar pyrolysis, and solar farm integration.",
    mandatePillars: [
      "Decentralized batch pyrolysis of bagasse and crop residues into permanent biochar.",
      "Halotolerant microbial consortia to regenerate degraded saline canal soils.",
      "Solar microgrid infrastructure powering campus laboratory loads.",
    ],
    campusInfrastructureNodes: [
      "NABL Soil Laboratory",
      "Solar Microgrid Array",
      "Compost Testing Yard",
    ],
    items: [
      {
        id: "bagasse-biochar-pyrolysis",
        title: "Mobile Farm-Gate Agricultural Residue Pyrolyzer",
        domainSlug: "climate-tech",
        category: "Carbon Sequestration",
        status: "Technology Demonstration",
        statusBadgeVariant: "leaf",
        shortDescription:
          "Batch pyrolysis system converting sugarcane bagasse and cotton stalks into stable biochar with 82% fixed carbon.",
        fullOverview:
          "Developed by PhytoPure Biofuels during pre-incubation, this mobile system provides farmers with an economically viable alternative to burning agricultural waste by producing high-grade soil conditioner on-site.",
        attribution: {
          leadEntity: "PhytoPure Biofuels (Incubatee Venture)",
          collaborator: "NABL Analytical Testing Division",
          type: "Incubatee Invention",
        },
        specifications: [
          {
            label: "Pyrolysis Temp",
            value: "450°C to 550°C oxygen-limited retort",
          },
          {
            label: "Fixed Carbon Content",
            value: "82.4% (Analytical Lab Assayed)",
          },
          {
            label: "Byproduct",
            value: "Condensed wood vinegar for organic pest deterrence",
          },
        ],
        fieldLocation: "Baramati Demonstration Farm Agro-Forestry Plot",
        verifiedValidationNotes:
          "Successfully diverted 4,200 metric tons of biomass during pilot testing.",
        icon: "🔥",
      },
      {
        id: "halotolerant-microbial-consortium",
        title: "Saline-Rhizosphere Halotolerant Microbial Consortium",
        domainSlug: "climate-tech",
        category: "Soil Biotechnology",
        status: "Deployed Service",
        statusBadgeVariant: "botanical",
        shortDescription:
          "Indigenous soil microbial formulation solubilizing locked phosphorus in saline, degraded canal-irrigated soils.",
        fullOverview:
          "Formulated by Baramati Agribiotics, this biological liquid inoculant colonizes crop root zones in soils with high electrical conductivity, secreting organic acids and exopolysaccharides that shield root membranes from sodium toxicity.",
        attribution: {
          leadEntity: "Baramati Agribiotics Pvt Ltd",
          collaborator: "Tested on 110-Acre ADT Experimental Farm",
          type: "Incubatee Invention",
        },
        specifications: [
          { label: "Viable Cell Count", value: "Minimum 1 x 10^9 CFU/ml" },
          {
            label: "Salinity Tolerance",
            value: "Maintains viability up to 8.5 dS/m EC",
          },
          {
            label: "Target Crops",
            value: "Sugarcane, pomegranate, grapes, turmeric",
          },
        ],
        fieldLocation: "1,800 Hectares of Canal Soils in Western Maharashtra",
        verifiedValidationNotes:
          "Formulation certified pathogen-free under official NABL laboratory testing assays.",
        icon: "🧪",
      },
    ],
  },

  // 6. DIGITAL AGRI & AI
  {
    slug: "digital-agri-ai",
    title: "Machine Learning, Computer Vision & Vernacular Advisory",
    subtitle:
      "Edge-AI Inference and Vernacular Communications Democratizing Agronomy",
    badge: "Artificial Intelligence",
    icon: "💻",
    overview:
      "Deploying computer vision models for automated crop disease diagnosis, weed discrimination, and multimodal vernacular agricultural advisory tailored for Marathi and Hindi-speaking growers.",
    mandatePillars: [
      "On-device edge neural networks classifying crop leaf symptoms without cloud connectivity.",
      "Multimodal vernacular agronomic chatbots calibrated against verified ICAR-KVK package of practices.",
      "Camera-based automated post-harvest grading for size, color, and surface defects.",
    ],
    campusInfrastructureNodes: [
      "Digital Media Studio",
      "FabLab Computing Cluster",
      "KVK Advisory Database",
    ],
    items: [
      {
        id: "edge-vision-pest-classifier",
        title: "Edge Computer-Vision Red Rot & Rust Canopy Classifier",
        domainSlug: "digital-agri-ai",
        category: "Computer Vision",
        status: "Active Research Activity",
        statusBadgeVariant: "warning",
        shortDescription:
          "Lightweight convolutional neural network running on edge micro-processors to detect fungal lesions from field camera traps.",
        fullOverview:
          "An ongoing joint initiative integrating Innosapien's optical sensor traps with AIC-ADT computing nodes to evaluate real-time sporulation detection on leaf blades, eliminating the latency of uploading high-resolution imagery over weak 2G/3G rural networks.",
        attribution: {
          leadEntity: "Innosapien Agro Technologies & AIC-ADT Web Division",
          collaborator: "KVK Baramati Plant Pathology Division",
          type: "Academic Collaboration",
        },
        specifications: [
          {
            label: "Model Architecture",
            value: "Quantized MobileNetV3 / Edge TPU",
          },
          {
            label: "Inference Latency",
            value: "Under 120ms on onboard processor",
          },
          {
            label: "Training Dataset",
            value: "18,000+ verified sugarcane foliar disease images",
          },
        ],
        fieldLocation: "Sharadanagar Telemetry Experimental Corridor",
        verifiedValidationNotes:
          "Model training validated on Baramati campus dataset; field accuracy benchmarking in progress.",
        icon: "👁️",
      },
    ],
  },
];
