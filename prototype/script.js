/* ==========================================================================
   AIC-ADT BARAMATI FOUNDATION — MASTER INTERACTIVE PROTOTYPE SCRIPT
   Phase 2, Task 5: Interactive UI Prototype and User Journey Demonstration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initViewSwitcher();
  initLanguageToggle();
  initMobileDrawer();
  initStartupDirectory();
  initEligibilityChecker();
  initImpactPeriodSwitcher();
  initUniversalModals();
});

/* ==========================================================================
   1. VIEW SWITCHER & BREADCRUMB ROUTING
   ========================================================================== */
function switchProtoView(viewName) {
  const buttons = document.querySelectorAll('.proto-btn[data-view]');
  const views = document.querySelectorAll('.prototype-view');

  // Update button active state in prototype wayfinding bar
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  // Toggle view visibility
  let targetFound = false;
  views.forEach(v => {
    if (v.id === `view-${viewName}`) {
      v.style.display = 'block';
      targetFound = true;
    } else {
      v.style.display = 'none';
    }
  });

  if (targetFound) {
    window.scrollTo({ top: 38, behavior: 'smooth' });
  }
}

function initViewSwitcher() {
  const buttons = document.querySelectorAll('.proto-btn[data-view]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchProtoView(targetView);
    });
  });
}

/* ==========================================================================
   2. BILINGUAL PARITY ENGINE (ENGLISH | मराठी)
   ========================================================================== */
let currentLanguage = 'en';

const localizationDictionary = {
  en: {
    langCode: 'en',
    aimText: 'Supported by Atal Innovation Mission, NITI Aayog, Government of India',
    helplineText: 'Helpline: +91 2112 255500',
    brandTitle: 'AIC-ADT Baramati Foundation',
    brandSub: 'Atal Incubation Centre',
    applyBtn: 'Apply for Incubation',
    navAbout: 'About ▾',
    navPrograms: 'Programs ▾',
    navStartups: 'Startups',
    navInnovation: 'Innovation',
    navImpact: 'Impact',
    navEvents: 'Events',
    navReports: 'Resources',
    navContact: 'Contact',
    heroOverline: 'SUPPORTED BY ATAL INNOVATION MISSION • NITI Aayog',
    heroTitle: 'Catalyzing the Next Agricultural Revolution Through Deep-Tech Innovation',
    heroBody: 'AIC-ADT empowers agri-tech startups, progressive farmers, and scientists with seed capital, NABL-accredited analytical laboratories, and live field testing grounds in Baramati.',
    heroApplyBtn: 'Explore Incubation Programs',
    heroLabBtn: 'Book Analytical Lab Testing'
  },
  mr: {
    langCode: 'mr',
    aimText: 'अटल इनोव्हेशन मिशन, नीती आयोग, भारत सरकार द्वारे समर्थित [प्रारूप]',
    helplineText: 'हेल्पलाइन: +९१ २११२ २५५५००',
    brandTitle: 'एआयसी-एडीटी बारामती फाउंडेशन',
    brandSub: 'अटल इनक्युबेशन केंद्र',
    applyBtn: 'इनक्युबेशनसाठी अर्ज करा',
    navAbout: 'आमच्याबद्दल ▾',
    navPrograms: 'योजना व कार्यक्रम ▾',
    navStartups: 'स्टार्टअप्स',
    navInnovation: 'नवसंशोधन',
    navImpact: 'प्रमाणित प्रभाव',
    navEvents: 'कार्यक्रम',
    navReports: 'साधने व अहवाल',
    navContact: 'संपर्क',
    heroOverline: 'अटल इनोव्हेशन मिशन, नीती आयोग, भारत सरकार द्वारे समर्थित',
    heroTitle: 'कृषी-जैवतंत्रज्ञान आणि नवउद्योगांच्या माध्यमातून आधुनिक कृषी क्रांतीची निर्मिती',
    heroBody: 'बारामती परिसरातील अत्याधुनिक प्रयोगशाळा, तज्ज्ञ मार्गदर्शन आणि सरकारी योजनांच्या सहकार्याने नाविन्यपूर्ण कृषी तंत्रज्ञानाचा प्रसार करणे हे आमचे ध्येय आहे.',
    heroApplyBtn: 'इनक्युबेशन कार्यक्रम पहा',
    heroLabBtn: 'प्रयोगशाळा चाचणी बुक करा'
  }
};

function initLanguageToggle() {
  const enButtons = document.querySelectorAll('.btn-lang-en');
  const mrButtons = document.querySelectorAll('.btn-lang-mr');

  enButtons.forEach(btn => btn.addEventListener('click', () => setLanguage('en')));
  mrButtons.forEach(btn => btn.addEventListener('click', () => setLanguage('mr')));
}

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Toggle button active states and aria attributes
  document.querySelectorAll('.lang-btn').forEach(b => {
    const isActive = b.getAttribute('data-lang') === lang;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  const dict = localizationDictionary[lang];

  // Apply translations to UI elements if present
  const elAim = document.getElementById('utility-aim-text');
  const elHelpline = document.getElementById('utility-helpline');
  const elBrandTitle = document.getElementById('nav-brand-title');
  const elBrandSub = document.getElementById('nav-brand-sub');
  const elNavApply = document.getElementById('nav-btn-apply');
  const elNavAbout = document.getElementById('nav-item-about');
  const elNavPrograms = document.getElementById('nav-item-programs');
  const elNavStartups = document.getElementById('nav-item-startups');
  const elNavInnovation = document.getElementById('nav-item-innovation');
  const elNavImpact = document.getElementById('nav-item-impact');
  const elNavEvents = document.getElementById('nav-item-events');
  const elNavReports = document.getElementById('nav-item-reports');
  const elNavContact = document.getElementById('nav-item-contact');

  const elHeroOverline = document.getElementById('hero-overline');
  const elHeroTitle = document.getElementById('hero-title');
  const elHeroBody = document.getElementById('hero-body');
  const elHeroApply = document.getElementById('hero-apply-btn');

  if (elAim) elAim.textContent = dict.aimText;
  if (elHelpline) elHelpline.textContent = dict.helplineText;
  if (elBrandTitle) elBrandTitle.textContent = dict.brandTitle;
  if (elBrandSub) elBrandSub.textContent = dict.brandSub;
  if (elNavApply) elNavApply.textContent = dict.applyBtn;

  if (elNavAbout) elNavAbout.textContent = dict.navAbout;
  if (elNavPrograms) elNavPrograms.textContent = dict.navPrograms;
  if (elNavStartups) elNavStartups.textContent = dict.navStartups;
  if (elNavInnovation) elNavInnovation.textContent = dict.navInnovation;
  if (elNavImpact) elNavImpact.textContent = dict.navImpact;
  if (elNavEvents) elNavEvents.textContent = dict.navEvents;
  if (elNavReports) elNavReports.textContent = dict.navReports;
  if (elNavContact) elNavContact.textContent = dict.navContact;

  if (elHeroOverline) elHeroOverline.textContent = dict.heroOverline;
  if (elHeroTitle) {
    elHeroTitle.textContent = dict.heroTitle;
    elHeroTitle.style.fontFamily = lang === 'mr' ? 'var(--font-family-devanagari)' : 'var(--font-family-sans)';
    elHeroTitle.style.lineHeight = lang === 'mr' ? '1.4' : '1.15';
  }
  if (elHeroBody) {
    elHeroBody.textContent = dict.heroBody;
    elHeroBody.style.fontFamily = lang === 'mr' ? 'var(--font-family-devanagari)' : 'var(--font-family-sans)';
    elHeroBody.style.lineHeight = lang === 'mr' ? '1.75' : '1.6';
  }
  if (elHeroApply) elHeroApply.textContent = dict.heroApplyBtn;

  const toastMsg = lang === 'mr' 
    ? 'भाषा बदलली: मराठी (प्रारूप भाषांतर सक्रिय)' 
    : 'Language switched to English';
  showToast(toastMsg);
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (hamburgerBtn && drawer && backdrop) {
    hamburgerBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
    backdrop.addEventListener('click', closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================================================
   4. STARTUP PORTFOLIO DIRECTORY ENGINE
   ========================================================================== */
const startupPortfolioData = {
  gramheet: {
    name: 'GramHeet Solutions Pvt Ltd',
    sector: 'Agri-Tech',
    cohort: 'Cohort 2022',
    scheme: 'SISFS (₹20L Proof of Concept)',
    founders: 'Pankaj Mahalle & Shweta Thakare',
    location: 'Baramati / Yavatmal, Maharashtra',
    overview: 'Village-level integrated post-harvest storage and direct market linkage platform providing decentralized micro-warehousing, quality assaying, and distress-sale avoidance finance for smallholder farmers.',
    reach: '35,000+ Farmers Reached',
    labs: 'Food Pilot Plant & KVK Testing',
    trl: 'TRL 8 (Commercial Scale)',
    milestones: [
      'Disbursed over ₹3.2 Crores in harvest credit linkages across 42 FPOs.',
      'Validated decentralized solar cold rooms in Baramati demonstration campus.',
      'Received national DPIIT best agritech startup recognition award.'
    ]
  },
  innosapien: {
    name: 'Innosapien Agro Technologies',
    sector: 'Smart Farming',
    cohort: 'Cohort 2023',
    scheme: 'MeitY GENESIS EiR Grant',
    founders: 'Dr. Rahul Shinde & Aniket Pawar',
    location: 'Baramati / Pune, Maharashtra',
    overview: 'Edge-AI and computer-vision powered crop phenotyping and automated disease forecast weather stations, conducting live telemetry across Western Maharashtra sugarcane tracts.',
    reach: '14 Sugarcane Clusters',
    labs: '110-Acre Test Farm & FabLab',
    trl: 'TRL 7 (Operational Validation)',
    milestones: [
      'Deployed 65 micro-weather sensor towers across Baramati and Daund talukas.',
      'Reduced red rot fungal disease incidence by 28% through predictive spray advisories.',
      'Integrated edge-camera weed classification model on autonomous tractors.'
    ]
  },
  agribiotics: {
    name: 'Baramati Agribiotics Pvt Ltd',
    sector: 'Biotechnology',
    cohort: 'Cohort 2024',
    scheme: 'Seed Stage Grantee',
    founders: 'Dr. Sunita Kulkarni & Mahesh Jagtap',
    location: 'Sharadanagar, Baramati',
    overview: 'High-potency halotolerant microbial bio-stimulant formulations tackling soil salinity, boosting microbial biomass, and stimulating root elongation in cash crops.',
    reach: '1,800 Ha Soil Treated',
    labs: 'NABL Analytical Soil Lab',
    trl: 'TRL 6 (Pilot Field Trials)',
    milestones: [
      'Completed multi-season bio-efficacy trials on 110-acre ADT experimental farm.',
      'NABL certified heavy metal and pathogen-free microbial formulation.',
      'Filed provisional Indian patent for saline-soil rhizosphere consortium.'
    ]
  },
  kisandost: {
    name: 'KisanDost Robotics',
    sector: 'Agri-Tech',
    cohort: 'Cohort 2023',
    scheme: 'SISFS (₹20L Proof of Concept)',
    founders: 'Tanmay Deshmukh & Sagar Patil',
    location: 'Baramati / Satara, Maharashtra',
    overview: 'Electric autonomous inter-row weeding and micro-mulching rovers engineered specifically for smallholder sugarcane, turmeric, and onion cultivations.',
    reach: '45 FPOs Deployed',
    labs: 'FabLab Prototyping Workshop',
    trl: 'TRL 7 (Field Demonstration)',
    milestones: [
      'Engineered lithium-iron-phosphate battery packs supporting 8-hour continuous runtime.',
      'Reduced manual labor weeding expenditure by ₹4,500 per acre.',
      'Manufactured prototype chassis using Baramati FabLab CNC and laser cutting rigs.'
    ]
  },
  phytopure: {
    name: 'PhytoPure Biofuels',
    sector: 'Climate Tech',
    cohort: 'Cohort 2024',
    scheme: 'Pre-Incubation Track',
    founders: 'Vikas Jagdale & Sneha More',
    location: 'Baramati, Maharashtra',
    overview: 'Agricultural residue pyrolysis technology converting crop residue and sugarcane bagasse into carbon-negative biochar and condensed wood vinegar bio-stimulants.',
    reach: '4,200 Tons Biomass Saved',
    labs: 'NABL Analytical Testing Lab',
    trl: 'TRL 5 (Lab Prototype Validated)',
    milestones: [
      'Diverted 4,200 metric tons of agricultural residue from open-field burning.',
      'Produced verified biochar with 82% fixed carbon stability.',
      'Testing moisture retention benefits across dryland grape vineyards.'
    ]
  },
  krishik: {
    name: 'Krishik ColdChain Innovations',
    sector: 'Food Processing',
    cohort: 'Cohort 2022',
    scheme: 'SISFS (₹20L Proof of Concept)',
    founders: 'Abhijit Gaikwad & Neha Joshi',
    location: 'Baramati / Solapur, Maharashtra',
    overview: 'Decentralized solar-powered micro-cold rooms utilizing non-toxic phase change thermal material, preventing post-harvest spoilage for perishable pomegranate and fig growers.',
    reach: '120 Horticulture Farms',
    labs: 'Food Pilot Plant & Demonstration Farm',
    trl: 'TRL 8 (Commercialized Deployment)',
    milestones: [
      'Maintains 4°C to 8°C chilled temperature for up to 36 hours without active grid power.',
      'Decreased post-harvest distress spoilage from 22% down to less than 4%.',
      'Awarded commercial supply contract by two Maharashtra fig grower cooperatives.'
    ]
  }
};

function initStartupDirectory() {
  const searchInput = document.getElementById('startup-search-input');
  const filterPills = document.querySelectorAll('.startup-filter-pill');

  if (searchInput) {
    searchInput.addEventListener('input', applyStartupFilters);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.style.border = 'none';
        p.style.background = 'var(--color-brand-pale)';
        p.style.color = 'var(--color-text-primary)';
      });
      pill.classList.add('active');
      pill.style.border = '1px solid var(--color-brand-primary)';
      pill.style.background = 'var(--color-brand-primary)';
      pill.style.color = '#FFFFFF';
      applyStartupFilters();
    });
  });
}

function applyStartupFilters() {
  const searchInput = document.getElementById('startup-search-input');
  const activePill = document.querySelector('.startup-filter-pill.active');
  const startupCards = document.querySelectorAll('.startup-directory-card');
  const countDisplay = document.getElementById('startup-count-display');
  const clearBtn = document.getElementById('startup-clear-filters');
  const emptyNotice = document.getElementById('startup-empty-notice');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedSector = activePill ? activePill.getAttribute('data-sector') : 'all';

  let matchCount = 0;
  const totalCards = startupCards.length;

  startupCards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const sector = card.getAttribute('data-sector') || '';
    const bodyText = (card.querySelector('.card-body')?.textContent || '').toLowerCase();

    const matchesQuery = !query || name.includes(query) || bodyText.includes(query);
    const matchesSector = selectedSector === 'all' || sector === selectedSector;

    if (matchesQuery && matchesSector) {
      card.style.display = 'flex';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update dynamic count indicator
  if (countDisplay) {
    countDisplay.textContent = `Showing ${matchCount} of ${totalCards} demonstration records`;
  }

  // Toggle clear filters button visibility
  if (clearBtn) {
    clearBtn.style.display = (query || selectedSector !== 'all') ? 'inline-block' : 'none';
  }

  // Toggle empty state
  if (emptyNotice) {
    emptyNotice.style.display = matchCount === 0 ? 'block' : 'none';
  }
}

function resetStartupFilters() {
  const searchInput = document.getElementById('startup-search-input');
  const filterPills = document.querySelectorAll('.startup-filter-pill');

  if (searchInput) searchInput.value = '';

  filterPills.forEach(p => {
    p.classList.remove('active');
    p.style.border = 'none';
    p.style.background = 'var(--color-brand-pale)';
    p.style.color = 'var(--color-text-primary)';
    if (p.getAttribute('data-sector') === 'all') {
      p.classList.add('active');
      p.style.border = '1px solid var(--color-brand-primary)';
      p.style.background = 'var(--color-brand-primary)';
      p.style.color = '#FFFFFF';
    }
  });

  applyStartupFilters();
  showToast('Startup filters reset to display all ventures.');
}

function openStartupModal(startupId) {
  const data = startupPortfolioData[startupId];
  if (!data) return;

  const modal = document.getElementById('startup-modal');
  if (!modal) return;

  document.getElementById('modal-startup-title').textContent = data.name;
  document.getElementById('modal-startup-sector').textContent = data.sector;
  document.getElementById('modal-startup-cohort').textContent = data.cohort;
  document.getElementById('modal-startup-scheme').textContent = data.scheme;
  document.getElementById('modal-startup-founders').textContent = `Founders: ${data.founders} • Location: ${data.location}`;
  document.getElementById('modal-startup-overview').textContent = data.overview;
  document.getElementById('modal-startup-reach').textContent = data.reach;
  document.getElementById('modal-startup-labs').textContent = data.labs;
  document.getElementById('modal-startup-trl').textContent = data.trl;

  const milestoneList = document.getElementById('modal-startup-milestones');
  if (milestoneList) {
    milestoneList.innerHTML = data.milestones.map(m => `<li>${m}</li>`).join('');
  }

  openModal('startup-modal');
}

/* ==========================================================================
   5. INTERACTIVE ELIGIBILITY CHECKER
   ========================================================================== */
function initEligibilityChecker() {
  updateEligibilityChecker();
}

function updateEligibilityChecker() {
  const chkDpiit = document.getElementById('chk-dpiit');
  const chkTech = document.getElementById('chk-tech');
  const chkEquity = document.getElementById('chk-equity');
  const chkPrior = document.getElementById('chk-prior');
  const statusPill = document.getElementById('eligibility-status-pill');

  if (!statusPill) return;

  const items = [
    { el: chkDpiit, parent: document.getElementById('label-chk-dpiit') },
    { el: chkTech, parent: document.getElementById('label-chk-tech') },
    { el: chkEquity, parent: document.getElementById('label-chk-equity') },
    { el: chkPrior, parent: document.getElementById('label-chk-prior') }
  ];

  let metCount = 0;
  items.forEach(item => {
    if (item.el && item.el.checked) {
      metCount++;
      if (item.parent) item.parent.classList.add('checked');
    } else {
      if (item.parent) item.parent.classList.remove('checked');
    }
  });

  if (metCount === 4) {
    statusPill.className = 'eligibility-status-pill eligible';
    statusPill.textContent = '✓ Eligible for SISFS Application (4/4 Met)';
  } else {
    statusPill.className = 'eligibility-status-pill incomplete';
    statusPill.textContent = `⚠️ Incomplete Criteria (${metCount}/4 Met) — Review Guidelines`;
  }
}

function resetEligibilityChecker() {
  ['chk-dpiit', 'chk-tech', 'chk-equity', 'chk-prior'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  updateEligibilityChecker();
  showToast('Eligibility criteria checklist reset.');
}

/* ==========================================================================
   6. MULTI-STEP APPLICATION WIZARD
   ========================================================================== */
let wizardCurrentStep = 1;

function openApplyWizard() {
  wizardCurrentStep = 1;
  updateWizardDisplay();

  // Reset form inputs
  const entity = document.getElementById('app-entity');
  const dpiit = document.getElementById('app-dpiit');
  const email = document.getElementById('app-email');
  const summary = document.getElementById('app-summary');
  const decl = document.getElementById('app-declaration');

  if (entity) entity.value = '';
  if (dpiit) dpiit.value = '';
  if (email) email.value = '';
  if (summary) summary.value = '';
  if (decl) decl.checked = false;

  // Clear validation error highlights
  document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));

  openModal('apply-modal');
}

function updateWizardDisplay() {
  // Update step navigation tabs
  for (let i = 1; i <= 3; i++) {
    const tab = document.getElementById(`wizard-tab-${i}`);
    const pane = document.getElementById(`wizard-pane-${i}`);
    if (tab) {
      tab.classList.toggle('active', i === wizardCurrentStep);
      tab.classList.toggle('completed', i < wizardCurrentStep);
    }
    if (pane) {
      pane.classList.toggle('active', i === wizardCurrentStep);
    }
  }

  const successPane = document.getElementById('wizard-pane-success');
  if (successPane) {
    successPane.classList.toggle('active', wizardCurrentStep === 4);
  }

  const btnPrev = document.getElementById('wizard-btn-prev');
  const btnNext = document.getElementById('wizard-btn-next');
  const footer = document.getElementById('wizard-footer');

  if (wizardCurrentStep === 4) {
    if (footer) footer.style.display = 'none';
  } else {
    if (footer) footer.style.display = 'flex';
    if (btnPrev) btnPrev.style.display = wizardCurrentStep > 1 ? 'inline-block' : 'none';
    if (btnNext) {
      if (wizardCurrentStep === 1) btnNext.textContent = 'Next: Innovation & Labs →';
      else if (wizardCurrentStep === 2) btnNext.textContent = 'Next: Grant Tranches →';
      else if (wizardCurrentStep === 3) btnNext.textContent = 'Submit Demonstration Application ✓';
    }
  }
}

function wizardNextStep() {
  if (wizardCurrentStep === 1) {
    const entity = document.getElementById('app-entity');
    const dpiit = document.getElementById('app-dpiit');
    const email = document.getElementById('app-email');
    let hasError = false;

    if (!entity || !entity.value.trim()) {
      document.getElementById('grp-app-entity')?.classList.add('has-error');
      hasError = true;
    } else {
      document.getElementById('grp-app-entity')?.classList.remove('has-error');
    }

    if (!dpiit || !dpiit.value.trim() || !dpiit.value.toLowerCase().startsWith('dipp')) {
      document.getElementById('grp-app-dpiit')?.classList.add('has-error');
      hasError = true;
    } else {
      document.getElementById('grp-app-dpiit')?.classList.remove('has-error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) {
      document.getElementById('grp-app-email')?.classList.add('has-error');
      hasError = true;
    } else {
      document.getElementById('grp-app-email')?.classList.remove('has-error');
    }

    if (hasError) return;
    wizardCurrentStep = 2;
    updateWizardDisplay();

  } else if (wizardCurrentStep === 2) {
    const summary = document.getElementById('app-summary');
    if (!summary || !summary.value.trim() || summary.value.trim().length < 10) {
      document.getElementById('grp-app-summary')?.classList.add('has-error');
      return;
    } else {
      document.getElementById('grp-app-summary')?.classList.remove('has-error');
    }

    wizardCurrentStep = 3;
    updateWizardDisplay();

  } else if (wizardCurrentStep === 3) {
    const decl = document.getElementById('app-declaration');
    const errDecl = document.getElementById('err-app-declaration');

    if (!decl || !decl.checked) {
      if (errDecl) errDecl.style.display = 'block';
      return;
    } else {
      if (errDecl) errDecl.style.display = 'none';
    }

    // Submit Simulation
    const btnNext = document.getElementById('wizard-btn-next');
    if (btnNext) {
      btnNext.disabled = true;
      btnNext.textContent = 'Submitting Dossier...';
    }

    setTimeout(() => {
      if (btnNext) btnNext.disabled = false;
      const refCode = `SISFS-DEMO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const receiptEl = document.getElementById('app-receipt-id');
      if (receiptEl) receiptEl.textContent = refCode;

      wizardCurrentStep = 4;
      updateWizardDisplay();
      showToast(`Demonstration application registered! Ref: ${refCode}`);
    }, 600);
  }
}

function wizardPrevStep() {
  if (wizardCurrentStep > 1 && wizardCurrentStep < 4) {
    wizardCurrentStep--;
    updateWizardDisplay();
  }
}

/* ==========================================================================
   7. EVENTS & RSVP REGISTRATION ENGINE
   ========================================================================== */
const campusEventsData = {
  'millet-processing': {
    title: 'Millet Value-Addition & Advanced Thermal Processing',
    badge: 'Hands-On Training',
    date: 'December 08, 2026 • 10:00 AM - 4:00 PM • Baramati Food Pilot Plant'
  },
  'soil-telemetry': {
    title: 'Precision Soil Sensors & IoT Farm Telemetry Workshop',
    badge: 'Technical Masterclass',
    date: 'December 15, 2026 • 9:30 AM - 3:30 PM • 110-Acre Demonstration Farm'
  },
  'investor-showcase': {
    title: 'AIC-ADT Agri-Tech Investor Showcase & Pitch Day 2027',
    badge: 'Demo Day',
    date: 'January 10, 2027 • 11:00 AM - 5:00 PM • Main Auditorium, Sharadanagar'
  }
};

function filterEvents(category) {
  const pills = document.querySelectorAll('.event-filter-pill');
  pills.forEach(p => {
    const isTarget = p.getAttribute('data-category') === category;
    p.classList.toggle('active', isTarget);
    p.style.border = isTarget ? '1px solid var(--color-brand-primary)' : 'none';
    p.style.background = isTarget ? 'var(--color-brand-primary)' : 'var(--color-brand-pale)';
    p.style.color = isTarget ? '#FFFFFF' : 'var(--color-text-primary)';
  });

  const eventRows = document.querySelectorAll('#events-list-container .event-row');
  eventRows.forEach(row => {
    const cat = row.getAttribute('data-category');
    row.style.display = (category === 'all' || cat === category) ? 'flex' : 'none';
  });
}

function openEventModal(eventId) {
  const data = campusEventsData[eventId];
  if (!data) return;

  document.getElementById('modal-event-title').textContent = data.title;
  document.getElementById('modal-event-badge').textContent = data.badge;
  document.getElementById('modal-event-date').textContent = data.date;

  // Reset form and view states
  document.getElementById('event-form-section').style.display = 'block';
  document.getElementById('event-success-section').style.display = 'none';

  const nameInput = document.getElementById('rsvp-name');
  const emailInput = document.getElementById('rsvp-email');
  const phoneInput = document.getElementById('rsvp-phone');
  if (nameInput) nameInput.value = '';
  if (emailInput) emailInput.value = '';
  if (phoneInput) phoneInput.value = '';

  document.querySelectorAll('#event-modal .form-group.has-error').forEach(g => g.classList.remove('has-error'));

  openModal('event-modal');
}

function handleEventRsvpSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('rsvp-name');
  const email = document.getElementById('rsvp-email');
  const phone = document.getElementById('rsvp-phone');
  let hasError = false;

  if (!name || name.value.trim().length < 3) {
    document.getElementById('grp-rsvp-name')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('grp-rsvp-name')?.classList.remove('has-error');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.value.trim())) {
    document.getElementById('grp-rsvp-email')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('grp-rsvp-email')?.classList.remove('has-error');
  }

  const phoneClean = (phone ? phone.value.replace(/\D/g, '') : '');
  if (phoneClean.length !== 10) {
    document.getElementById('grp-rsvp-phone')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('grp-rsvp-phone')?.classList.remove('has-error');
  }

  if (hasError) return;

  const submitBtn = document.getElementById('rsvp-submit-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Validating Registration...';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm RSVP Registration';
    }

    const refPass = `AIC-EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const passEl = document.getElementById('event-ref-code');
    if (passEl) passEl.textContent = refPass;

    document.getElementById('event-form-section').style.display = 'none';
    document.getElementById('event-success-section').style.display = 'block';

    showToast(`RSVP Confirmed! Access code: ${refPass}`);
  }, 500);
}

/* ==========================================================================
   8. IMPACT DASHBOARD REPORTING PERIODS
   ========================================================================== */
const impactPeriodData = {
  fy25: {
    startups: '50+',
    ip: '42+',
    capital: '₹5.2 Cr+',
    farmers: '35,000+',
    badge: 'Audited under AIM NITI Aayog Filings • FY 2024-25',
    text: 'All figures certified via independent financial audit and statutory NITI Aayog annual filings.',
    status: 'Statutory Audit Verified'
  },
  fy24: {
    startups: '35+',
    ip: '28+',
    capital: '₹3.8 Cr+',
    farmers: '24,000+',
    badge: 'Audited Statutory Governance Filing • FY 2023-24',
    text: 'Metrics finalized and approved by Governing Board in AGM 2024. Audit clearance certified.',
    status: 'Statutory Audit Verified'
  },
  fy23: {
    startups: '22+',
    ip: '16+',
    capital: '₹2.4 Cr+',
    farmers: '14,000+',
    badge: 'Audited Statutory Governance Filing • FY 2022-23',
    text: 'Pre-seed and seed cohort disbursements validated under DPIIT SISFS tranche 1 evaluation.',
    status: 'Statutory Audit Verified'
  },
  fy22: {
    startups: '10+',
    ip: '7+',
    capital: '₹1.1 Cr+',
    farmers: '6,500+',
    badge: 'Inaugural Foundation Year Audit • FY 2021-22',
    text: 'Foundational baseline metrics following official inception and laboratory commissioning.',
    status: 'Foundation Baseline Audit'
  }
};

function initImpactPeriodSwitcher() {
  // Initial state is set to fy25
}

function setImpactPeriod(periodKey) {
  const data = impactPeriodData[periodKey];
  if (!data) return;

  // Update button active state
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-period') === periodKey);
  });

  // Highlight corresponding row in historical table
  ['fy25', 'fy24', 'fy23', 'fy22'].forEach(key => {
    const row = document.getElementById(`impact-row-${key}`);
    if (row) {
      if (key === periodKey) {
        row.classList.add('table-row-selected');
      } else {
        row.classList.remove('table-row-selected');
      }
    }
  });

  // Dynamically update KPI metrics
  const statStartups = document.getElementById('impact-stat-startups');
  const statIp = document.getElementById('impact-stat-ip');
  const statCapital = document.getElementById('impact-stat-capital');
  const statFarmers = document.getElementById('impact-stat-farmers');
  const badgeEl = document.getElementById('impact-filing-badge');
  const textEl = document.getElementById('impact-filing-text');
  const statusEl = document.getElementById('impact-period-status');

  if (statStartups) statStartups.textContent = data.startups;
  if (statIp) statIp.textContent = data.ip;
  if (statCapital) statCapital.textContent = data.capital;
  if (statFarmers) statFarmers.textContent = data.farmers;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (textEl) textEl.textContent = data.text;
  if (statusEl) statusEl.textContent = data.status;

  showToast(`Impact reporting period updated to ${periodKey.toUpperCase()}`);
}

/* ==========================================================================
   9. REPORTS & PUBLICATIONS FILTER
   ========================================================================== */
function filterReports(category) {
  const pills = document.querySelectorAll('.report-filter-pill');
  pills.forEach(p => {
    const isTarget = p.getAttribute('data-category') === category;
    p.classList.toggle('active', isTarget);
    p.style.border = isTarget ? '1px solid var(--color-brand-primary)' : 'none';
    p.style.background = isTarget ? 'var(--color-brand-primary)' : 'var(--color-brand-pale)';
    p.style.color = isTarget ? '#FFFFFF' : 'var(--color-text-primary)';
  });

  const cards = document.querySelectorAll('#reports-grid-container .report-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    card.style.display = (category === 'all' || cat === category) ? 'flex' : 'none';
  });
}

/* ==========================================================================
   10. CONTACT FORM SIMULATION
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const msg = document.getElementById('contact-msg');
  let hasError = false;

  if (!name || !name.value.trim()) {
    document.getElementById('group-contact-name')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-contact-name')?.classList.remove('has-error');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.value.trim())) {
    document.getElementById('group-contact-email')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-contact-email')?.classList.remove('has-error');
  }

  if (!msg || !msg.value.trim()) {
    document.getElementById('group-contact-msg')?.classList.add('has-error');
    hasError = true;
  } else {
    document.getElementById('group-contact-msg')?.classList.remove('has-error');
  }

  if (hasError) return;

  const btn = document.getElementById('contact-submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Transmitting Inquiry...';
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Submit Inquiry';
    }
    document.getElementById('contact-success-notice').style.display = 'block';
    document.getElementById('contact-inquiry-form').reset();
    showToast('Inquiry logged successfully (Prototype Simulation).');
  }, 500);
}

/* ==========================================================================
   11. UNIVERSAL MODAL SYSTEM & ACCESSIBILITY
   ========================================================================== */
let activeModalTrigger = null;

function initUniversalModals() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMobileDrawer();
    }
  });

  document.querySelectorAll('.proto-modal-backdrop').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  activeModalTrigger = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Shift focus to close button or header for accessibility
  const closeBtn = modal.querySelector('.proto-modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeAllModals() {
  document.querySelectorAll('.proto-modal-backdrop.open').forEach(modal => {
    modal.classList.remove('open');
  });
  document.body.style.overflow = '';

  if (activeModalTrigger && typeof activeModalTrigger.focus === 'function') {
    activeModalTrigger.focus();
    activeModalTrigger = null;
  }
}

function openPlaceholderModal(title, description, phase = 'Phase 3 Integration') {
  document.getElementById('modal-placeholder-title').textContent = title;
  document.getElementById('modal-placeholder-desc').textContent = description;
  document.getElementById('placeholder-phase-badge').textContent = phase;
  openModal('placeholder-modal');
}

/* ==========================================================================
   12. TOAST NOTIFICATION SERVICE
   ========================================================================== */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('proto-toast');
  const textEl = document.getElementById('proto-toast-text');
  if (!toast || !textEl) return;

  textEl.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
