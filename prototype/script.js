/* ==========================================================================
   AIC-ADT BARAMATI FOUNDATION — HIGH-FIDELITY PROTOTYPE SCRIPT
   Interactive Behaviors: View Switching, Bilingual Parity, Mobile Drawer, Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initViewSwitcher();
  initLanguageToggle();
  initMobileDrawer();
  initStartupFilter();
});

// 1. View Switcher Logic
function initViewSwitcher() {
  const buttons = document.querySelectorAll('.proto-btn[data-view]');
  const views = document.querySelectorAll('.prototype-view');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');

      // Update button active states
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update view visibility
      views.forEach(v => {
        if (v.id === `view-${targetView}`) {
          v.style.display = 'block';
        } else {
          v.style.display = 'none';
        }
      });

      window.scrollTo({ top: 40, behavior: 'smooth' });
    });
  });
}

// 2. Global Bilingual Toggle (EN | मराठी)
let currentLang = 'en';

const langStrings = {
  en: {
    heroOverline: "SUPPORTED BY ATAL INNOVATION MISSION • NITI AAYOG",
    heroTitle: "Catalyzing the Next Agricultural Revolution Through Deep-Tech Innovation",
    heroBody: "AIC-ADT empowers agri-tech startups, progressive farmers, and scientists with seed capital, NABL-accredited analytical laboratories, and live field testing grounds in Baramati.",
    btnApply: "Apply for Incubation",
    btnLab: "Book Analytical Lab Testing",
    navAbout: "About Us",
    navPrograms: "Programs & Schemes",
    navStartups: "Startups",
    navInnovation: "Innovation Labs",
    navImpact: "Impact",
    navEvents: "Events",
    navResources: "Resources & Reports"
  },
  mr: {
    heroOverline: "अटल इनोव्हेशन मिशन, नीती आयोग, भारत सरकार द्वारे समर्थित",
    heroTitle: "कृषी-जैवतंत्रज्ञान आणि नवउद्योगांच्या माध्यमातून आधुनिक कृषी क्रांतीची निर्मिती",
    heroBody: "बारामती परिसरातील प्रयोगशाळा, तज्ज्ञ मार्गदर्शन आणि सरकारी योजनांच्या सहकार्याने नाविन्यपूर्ण कृषी तंत्रज्ञानाचा प्रसार करणे हे आमचे ध्येय आहे.",
    btnApply: "इनक्युबेशनसाठी अर्ज करा",
    btnLab: "प्रयोगशाळा चाचणी बुक करा",
    navAbout: "आमच्याबद्दल",
    navPrograms: "कार्यक्रम आणि योजना",
    navStartups: "स्टार्टअप्स",
    navInnovation: "नवसंशोधन क्षेत्रे",
    navImpact: "प्रमाणित प्रभाव",
    navEvents: "कार्यक्रम आणि कार्यशाळा",
    navResources: "अहवाल आणि माहिती"
  }
};

function initLanguageToggle() {
  const enButtons = document.querySelectorAll('.btn-lang-en');
  const mrButtons = document.querySelectorAll('.btn-lang-mr');

  enButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage('en'));
  });

  mrButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage('mr'));
  });
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Toggle button active classes
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });

  // Apply translations
  const strings = langStrings[lang];
  const heroOverline = document.getElementById('hero-overline');
  const heroTitle = document.getElementById('hero-title');
  const heroBody = document.getElementById('hero-body');
  const heroApplyBtn = document.getElementById('hero-apply-btn');

  if (heroOverline) heroOverline.textContent = strings.heroOverline;
  if (heroTitle) {
    heroTitle.textContent = strings.heroTitle;
    heroTitle.style.fontFamily = lang === 'mr' ? 'var(--font-family-devanagari)' : 'var(--font-family-sans)';
    heroTitle.style.lineHeight = lang === 'mr' ? '1.35' : '1.15';
  }
  if (heroBody) {
    heroBody.textContent = strings.heroBody;
    heroBody.style.fontFamily = lang === 'mr' ? 'var(--font-family-devanagari)' : 'var(--font-family-sans)';
    heroBody.style.lineHeight = lang === 'mr' ? '1.65' : '1.6';
  }
  if (heroApplyBtn) heroApplyBtn.textContent = strings.btnApply;
}

// 3. Mobile Drawer Controls
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

    const closeDrawer = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

// 4. Startup Filter Logic
function initStartupFilter() {
  const searchInput = document.getElementById('startup-search-input');
  const filterPills = document.querySelectorAll('.startup-filter-pill');
  const startupCards = document.querySelectorAll('.startup-directory-card');

  if (!searchInput || !startupCards.length) return;

  function filterCards() {
    const query = searchInput.value.toLowerCase().trim();
    const activePill = document.querySelector('.startup-filter-pill.active');
    const selectedSector = activePill ? activePill.getAttribute('data-sector') : 'all';

    let matchCount = 0;

    startupCards.forEach(card => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const sector = card.getAttribute('data-sector') || '';
      const desc = (card.querySelector('.card-body')?.textContent || '').toLowerCase();

      const matchesQuery = !query || name.includes(query) || desc.includes(query);
      const matchesSector = selectedSector === 'all' || sector === selectedSector;

      if (matchesQuery && matchesSector) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('startup-empty-notice');
    if (emptyNotice) {
      emptyNotice.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', filterCards);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCards();
    });
  });
}
