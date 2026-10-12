/**
 * AIC-ADT Baramati Foundation — Canonical Navigation Configuration
 * Source of Truth: docs/requirements/sitemap.md & docs/requirements/navigation-specification.md
 */

export interface NavSubItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavSection {
  heading?: string;
  items: NavSubItem[];
}

export interface NavItem {
  title: string;
  href: string;
  sections?: NavSection[];
  isExternal?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "About",
    href: "/about",
    sections: [
      {
        heading: "Institutional Identity",
        items: [
          {
            title: "Institutional Overview",
            href: "/about",
            description:
              "Genesis, ADT heritage & Atal Innovation Mission mandate",
          },
          {
            title: "Mission, Vision & SDGs",
            href: "/about/mission-vision",
            description:
              "Core values, national mandate & sustainable growth goals",
          },
          {
            title: "Leadership & Governance",
            href: "/about/leadership",
            description:
              "Board of Directors, advisory council & executive management",
          },
        ],
      },
      {
        heading: "Campus & Ecosystem",
        items: [
          {
            title: "Campus Infrastructure",
            href: "/about/infrastructure",
            description:
              "110-acre testbed, Center of Excellence & research spaces",
          },
          {
            title: "Institutional Partners",
            href: "/about/partners",
            description:
              "Government bodies, corporate CSR, academia & investors",
          },
        ],
      },
    ],
  },
  {
    title: "Programs",
    href: "/programs",
    sections: [
      {
        heading: "Incubation Continuum",
        items: [
          {
            title: "Programs Overview",
            href: "/programs",
            description: "Full comparison matrix: Ideation to Scale",
          },
          {
            title: "Pre-Incubation",
            href: "/programs/pre-incubation",
            description:
              "Prototype validation, market testing & ideation cohort",
          },
          {
            title: "Incubation Track",
            href: "/programs/incubation",
            description:
              "Seed funding linkage, lab access & early market launch",
            badge: "Cohort 4",
          },
          {
            title: "Acceleration Program",
            href: "/programs/acceleration",
            description:
              "Commercial scaling, institutional VC & market expansion",
          },
        ],
      },
      {
        heading: "Funding & Support",
        items: [
          {
            title: "Startup India Seed Fund (SISFS)",
            href: "/programs/schemes/startup-india",
            description:
              "Up to ₹20L grant and ₹50L debt commercialization support",
          },
          {
            title: "MeitY GENESIS",
            href: "/programs/schemes/meity-genesis",
            description: "Entrepreneur-in-Residence (EiR) & pilot schemes",
          },
          {
            title: "CSR Partnerships",
            href: "/programs/schemes/csr",
            description: "Capgemini, HDFC Parivartan & corporate grant tracks",
          },
          {
            title: "Mentorship Network",
            href: "/programs/mentorship",
            description: "69+ empaneled sector mentors & guidance framework",
          },
          {
            title: "How to Apply & FAQs",
            href: "/programs/apply-instructions",
            description:
              "Eligibility checklist, evaluation rubric & instructions",
          },
        ],
      },
    ],
  },
  {
    title: "Startups",
    href: "/startups",
    sections: [
      {
        heading: "Venture Showcase",
        items: [
          {
            title: "Startup Directory",
            href: "/startups",
            description:
              "Search and filter incubated Agritech & Biotech ventures",
          },
          {
            title: "Success Stories & Alumni",
            href: "/startups/success-stories",
            description: "Grassroots case studies: GramHeet, Innosapien & more",
          },
        ],
      },
    ],
  },
  {
    title: "Innovation & Labs",
    href: "/innovation",
    sections: [
      {
        heading: "Focus Domains",
        items: [
          {
            title: "Innovation Overview",
            href: "/innovation",
            description: "6 technological pillars transforming rural economies",
          },
          {
            title: "Agri Technology & Robotics",
            href: "/innovation/agri-tech",
            description: "Farm mechanization, precision drones & automation",
          },
          {
            title: "Smart Farming & IoT",
            href: "/innovation/smart-farming",
            description:
              "Soil sensors, weather telemetry & satellite analytics",
          },
          {
            title: "Food Processing & Millets",
            href: "/innovation/food-processing",
            description: "Post-harvest value addition & pilot processing lines",
          },
          {
            title: "Climate Tech & Circular Agri",
            href: "/innovation/climate-tech",
            description: "Solar farm tech, bio-stimulants & waste-to-value",
          },
          {
            title: "Digital Agri & AI",
            href: "/innovation/digital-agri-ai",
            description: "Computer vision grading & vernacular advisory models",
          },
        ],
      },
      {
        heading: "Specialized Facilities",
        items: [
          {
            title: "FabLab Makerspace",
            href: "/about/infrastructure/fab-lab",
            description:
              "3D printing, laser cutting & rapid hardware prototyping",
          },
          {
            title: "NABL Analytical Lab",
            href: "/about/infrastructure/analytical-lab",
            description: "Spectrometry, GC-MS, HPLC soil & microbial testing",
          },
          {
            title: "Food Innovation Lab",
            href: "/about/infrastructure/food-innovation-lab",
            description: "Pilot processing plant & FSSAI formulation support",
          },
          {
            title: "Digital Media Studio",
            href: "/about/infrastructure/digital-media-lab",
            description: "Product photography stage & founder podcast studio",
          },
          {
            title: "Co-Working Space",
            href: "/about/infrastructure/co-working-space",
            description: "Dedicated desks, high-speed fiber & meeting cabins",
          },
        ],
      },
    ],
  },
  {
    title: "Impact",
    href: "/impact",
    sections: [
      {
        heading: "Institutional Verification",
        items: [
          {
            title: "Certified Impact Dashboard",
            href: "/impact",
            description:
              "Audited metrics: Startups, funding, farmers & patents",
          },
          {
            title: "Historical Fiscal Trends",
            href: "/impact/periods",
            description:
              "Annual progression data from FY 2021-22 to FY 2024-25",
          },
          {
            title: "Grassroots Case Studies",
            href: "/impact/case-studies",
            description:
              "Smallholder farmer income & rural job creation impact",
          },
        ],
      },
    ],
  },
  {
    title: "Events",
    href: "/events",
    sections: [
      {
        heading: "Workshops & Ecosystem",
        items: [
          {
            title: "Upcoming Workshops & Calendar",
            href: "/events",
            description: "Hands-on masterclasses, demo days & cohort bootcamps",
          },
          {
            title: "Past Events Archive",
            href: "/events/past",
            description: "Photographs, summaries & training outcome records",
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    sections: [
      {
        heading: "Knowledge & Transparency",
        items: [
          {
            title: "Resources Hub",
            href: "/resources",
            description:
              "Publications, brochures & official institutional guidelines",
          },
          {
            title: "Annual Progress Reports",
            href: "/resources/annual-reports",
            description:
              "Statutory filings & NITI Aayog compliance disclosures",
          },
          {
            title: "Publications & Whitepapers",
            href: "/resources/publications",
            description: "AgTech sector monographs & applied research papers",
          },
          {
            title: "Program Guidelines",
            href: "/resources/program-guidelines",
            description: "SISFS, MeitY & Incubation agreement templates",
          },
          {
            title: "Policies & RTI Disclosures",
            href: "/resources/policies-downloads",
            description: "Governance policies, RTI contact, POSH & media kit",
          },
          {
            title: "News & Media Releases",
            href: "/news",
            description:
              "Institutional announcements, funding calls & milestones",
          },
        ],
      },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    sections: [
      {
        heading: "Connect With Us",
        items: [
          {
            title: "General Inquiries & Helpline",
            href: "/contact",
            description:
              "Departmental directory, reception desk & campus phone",
          },
          {
            title: "Partnership Desk",
            href: "/contact/partnerships",
            description: "Corporate CSR, academic MoUs & investor empanelment",
          },
          {
            title: "Location & Directions",
            href: "/contact/directions",
            description: "Transit guide from Pune Airport, Daund & Baramati",
          },
        ],
      },
    ],
  },
];

export const FOOTER_SECTIONS = [
  {
    title: "Incubation Programs",
    links: [
      { title: "Programs Overview", href: "/programs" },
      { title: "Pre-Incubation Track", href: "/programs/pre-incubation" },
      { title: "Core Incubation (SISFS)", href: "/programs/incubation" },
      { title: "Acceleration Program", href: "/programs/acceleration" },
      {
        title: "MeitY GENESIS Scheme",
        href: "/programs/schemes/meity-genesis",
      },
      { title: "CSR Partnership Grants", href: "/programs/schemes/csr" },
      {
        title: "Application Instructions",
        href: "/programs/apply-instructions",
      },
    ],
  },
  {
    title: "Specialized Labs",
    links: [
      { title: "Campus Infrastructure", href: "/about/infrastructure" },
      { title: "FabLab Makerspace", href: "/about/infrastructure/fab-lab" },
      {
        title: "NABL Analytical Lab",
        href: "/about/infrastructure/analytical-lab",
      },
      {
        title: "Food Innovation Lab",
        href: "/about/infrastructure/food-innovation-lab",
      },
      {
        title: "Digital Media Studio",
        href: "/about/infrastructure/digital-media-lab",
      },
      {
        title: "Co-Working Facilities",
        href: "/about/infrastructure/co-working-space",
      },
    ],
  },
  {
    title: "Venture Ecosystem",
    links: [
      { title: "Startup Directory", href: "/startups" },
      { title: "Success Stories", href: "/startups/success-stories" },
      { title: "Innovation Domains", href: "/innovation" },
      { title: "Mentorship Network", href: "/programs/mentorship" },
      { title: "Institutional Partners", href: "/about/partners" },
      { title: "Upcoming Events", href: "/events" },
    ],
  },
  {
    title: "Governance & Policies",
    links: [
      { title: "Certified Impact Dashboard", href: "/impact" },
      { title: "Annual Progress Reports", href: "/resources/annual-reports" },
      { title: "Publications & Insights", href: "/resources/publications" },
      { title: "Program Guidelines", href: "/resources/program-guidelines" },
      {
        title: "Policies & RTI Disclosures",
        href: "/resources/policies-downloads",
      },
      {
        title: "Internal Complaints (POSH)",
        href: "/resources/policies-downloads",
      },
    ],
  },
];

export const INSTITUTIONAL_INFO = {
  name: "AIC-ADT Baramati Foundation",
  legalType: "Section 8 Not-for-Profit Company",
  parentOrg: "Agricultural Development Trust, Baramati",
  mandate:
    "Supported by Atal Innovation Mission, NITI Aayog, Government of India",
  address: {
    line1: "Post Box No. 35 (Malegaon Col.), Sharadanagar",
    city: "Baramati",
    district: "District Pune",
    state: "Maharashtra",
    pincode: "413115",
    country: "India",
  },
  helplines: {
    landline: "+91 2112 255500",
    landlineAlt: "+91 2112 255518",
    incubationMobile: "+91 86 69 91 12 99",
  },
  emails: {
    primary: "aicadt@adtbaramati.com",
    incubation: "aicadt@adtbaramati.com",
  },
  hours: "Monday – Saturday: 09:00 AM – 06:00 PM IST",
};
