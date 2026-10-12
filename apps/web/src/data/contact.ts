/**
 * AIC-ADT Baramati Foundation — Contact & Departmental Data Architecture
 * Source of truth: docs/audit/content-verification-register.md, navigation.ts,
 * and official campus registry.
 */

export interface DepartmentDesk {
  id: string;
  name: string;
  focus: string;
  email: string;
  phone: string;
  hours: string;
  leadRole: string;
}

export interface TransitRoute {
  mode: "Flight / Air" | "Train / Rail" | "Bus / Road" | "Local Transit";
  hub: string;
  distance: string;
  travelTime: string;
  instructions: string[];
}

export const CAMPUS_HEADQUARTERS = {
  institution: "AIC-ADT Baramati Foundation",
  legalType: "Section 8 Not-for-Profit Company (CIN: U74999PN2019NPL184742)",
  parentTrust: "Agricultural Development Trust (ADT), Baramati",
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
  coordinates: {
    latitude: "18.1561° N",
    longitude: "74.5779° E",
    googleMapsUrl:
      "https://maps.google.com/?q=Agricultural+Development+Trust+Baramati",
  },
  helplines: {
    landlinePrimary: "+91 2112 255500",
    landlineSecondary: "+91 2112 255518",
    incubationMobile: "+91 86 69 91 12 99",
  },
  emails: {
    general: "aicadt@adtbaramati.com",
    incubation: "aicadt@adtbaramati.com",
    partnerships: "aicadt@adtbaramati.com",
  },
  workingHours:
    "Monday – Saturday: 09:00 AM – 06:00 PM IST (Closed Sundays & National Holidays)",
};

export const DEPARTMENT_DESKS: DepartmentDesk[] = [
  {
    id: "incubation-desk",
    name: "Incubation & Cohort Admissions Desk",
    focus:
      "Pre-incubation, incubation cohorts, SISFS seed funding applications, and founder triage.",
    email: "aicadt@adtbaramati.com",
    phone: "+91 86 69 91 12 99",
    hours: "09:00 AM – 06:00 PM IST",
    leadRole: "Incubation Management Team",
  },
  {
    id: "labs-facilities",
    name: "Specialized Labs & Technical Facilities",
    focus:
      "NABL analytical testing, Food Innovation Pilot Plant bookings, and FabLab hardware prototyping.",
    email: "aicadt@adtbaramati.com",
    phone: "+91 2112 255518",
    hours: "09:30 AM – 05:30 PM IST",
    leadRole: "Technical Lab Operations & Quality Team",
  },
  {
    id: "corporate-partnerships",
    name: "Corporate CSR & Institutional Partnerships Desk",
    focus:
      "Section 135 CSR grants, university MoUs, mentor empanelment, and investor demo day coordination.",
    email: "aicadt@adtbaramati.com",
    phone: "+91 2112 255500",
    hours: "10:00 AM – 05:00 PM IST",
    leadRole: "Strategic Partnerships & Outreach Directorate",
  },
  {
    id: "transparency-rti",
    name: "Public Information, POSH & Grievance Desk",
    focus:
      "RTI disclosures, POSH Internal Complaints Committee, media inquiries, and statutory filings.",
    email: "aicadt@adtbaramati.com",
    phone: "+91 2112 255500",
    hours: "10:00 AM – 04:00 PM IST",
    leadRole: "Administration & Institutional Secretariat",
  },
];

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    mode: "Flight / Air",
    hub: "Pune International Airport (PNQ), Lohegaon",
    distance: "Approx. 105 km",
    travelTime: "2.5 to 3 Hours",
    instructions: [
      "Hire a prepaid taxi or cab from Pune Airport towards Hadapsar – Saswad – Jejuri – Morgaon – Baramati.",
      "Alternatively, travel via Pune–Solapur Highway (NH 65) via Uruli Kanchan and turn towards Patas / Baramati.",
      "Ask the driver for 'Sharadanagar, Agricultural Development Trust Campus, Malegaon Colony Road'.",
    ],
  },
  {
    mode: "Train / Rail",
    hub: "Daund Railway Junction (DD) / Baramati Station (BRMT)",
    distance: "Daund: 42 km | Baramati: 5 km",
    travelTime: "Daund: 50 Mins | Baramati: 15 Mins",
    instructions: [
      "Daund Junction connects to major pan-India express trains on the Central Railway network.",
      "From Daund, regular state transport (MSRTC) buses and private taxis connect directly to Baramati (approx. 50 minutes).",
      "From Baramati Railway Station, local auto-rickshaws take 15 minutes to reach the Sharadanagar campus.",
    ],
  },
  {
    mode: "Bus / Road",
    hub: "Baramati MSRTC Central Bus Station (ST Stand)",
    distance: "Approx. 4.5 km",
    travelTime: "12 to 15 Mins",
    instructions: [
      "Direct MSRTC 'Shivshahi' and Semi-Luxury buses operate every 30 minutes from Pune (Swargate & Shivajinagar) to Baramati.",
      "Regular direct buses also connect from Mumbai, Satara, Solapur, and Ahmednagar.",
      "From Baramati ST Stand, hail a local auto-rickshaw to 'Sharadanagar ADT Campus'.",
    ],
  },
  {
    mode: "Local Transit",
    hub: "Sharadanagar Main Gate (Campus Entrance)",
    distance: "On Campus",
    travelTime: "2 Mins Walk",
    instructions: [
      "Report to the Main Security Reception at the Sharadanagar gate.",
      "Inform the officer on duty that you are visiting the 'AIC-ADT Atal Incubation Centre Building'.",
      "Visitor parking is available directly adjacent to the Innovation & Incubation Complex.",
    ],
  },
];
