import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  HERO_DATA,
  INTRO_PILLARS,
  PROGRAM_CARDS,
  INNOVATION_DOMAINS,
  FEATURED_PILOT,
  FEATURED_STARTUPS,
  IMPACT_METRICS,
  UPCOMING_EVENTS,
  REPORT_PUBLICATIONS,
  COLLABORATION_CTA,
} from "@/data/homepage";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          SECTION C: INSTITUTIONAL HERO
          ========================================================================= */}
      <section className="bg-gradient-to-b from-[#F3F7EC] via-[#F8FAF7] to-white py-12 md:py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0D9] text-[#004B2A] border border-[#DDE5DC]">
                <span
                  className="w-2 h-2 rounded-full bg-[#73992A] animate-pulse"
                  aria-hidden="true"
                />
                <span>{HERO_DATA.overline}</span>
              </div>

              {/* Display Heading (H1) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17231D] font-heading leading-[1.15]">
                {HERO_DATA.headline}
              </h1>

              {/* Subtitle Body */}
              <p className="text-base sm:text-lg text-[#647067] leading-relaxed max-w-2xl">
                {HERO_DATA.body}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={HERO_DATA.primaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:ring-offset-2 min-h-[44px]"
                >
                  <span>{HERO_DATA.primaryCta.label}</span>
                  <span className="ml-2 font-bold" aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link
                  href={HERO_DATA.secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border-1.5 border-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#73992A] min-h-[44px]"
                >
                  <span>{HERO_DATA.secondaryCta.label}</span>
                </Link>
              </div>

              {/* Credential Verification Strip */}
              <div className="pt-4 border-t border-[#DDE5DC] flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#59665D]">
                {HERO_DATA.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1B7340"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Media Column (5 cols) - Editorial Campus Facility Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#DDE5DC] bg-[#063D27] text-white p-7 shadow-lg aspect-[5/4] flex flex-col justify-between">
                {/* Visual Botanical Texture Accents */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 bg-[#73992A]/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 w-40 h-40 bg-[#004B2A]/40 rounded-full blur-xl pointer-events-none"
                  aria-hidden="true"
                />

                {/* Card Top Tag */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-[#73992A] text-white tracking-wide uppercase">
                    110-Acre Campus Testbed
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-[#E8F0D9] border border-white/20">
                    🌱
                  </div>
                </div>

                {/* Central Illustration / Schematic */}
                <div className="relative z-10 my-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2.5">
                  <div className="text-xs font-semibold text-[#73992A] uppercase tracking-wider">
                    Infrastructure Highlights
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#E8F0EB]">
                    <div className="bg-white/5 p-2 rounded">
                      <div className="font-bold text-white">NABL Lab</div>
                      <div className="text-[11px] text-white/70">
                        GC-MS &amp; HPLC
                      </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                      <div className="font-bold text-white">FabLab</div>
                      <div className="text-[11px] text-white/70">
                        Rapid Prototyping
                      </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                      <div className="font-bold text-white">Pilot Plant</div>
                      <div className="text-[11px] text-white/70">
                        Food Innovation
                      </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                      <div className="font-bold text-white">IoT Farm</div>
                      <div className="text-[11px] text-white/70">
                        Telemetry Testbed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Caption */}
                <div className="relative z-10 border-t border-white/15 pt-3 flex items-center justify-between text-xs text-white/80">
                  <span>Centre of Excellence, Sharadanagar</span>
                  <Link
                    href="/about/infrastructure"
                    className="text-[#73992A] hover:text-white font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Tour Facilities</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION D: INSTITUTIONAL INTRODUCTION & MISSION
          ========================================================================= */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Institutional Genesis
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-4">
              Where Scientific Rigor Meets Farm-Level Reality
            </h2>
            <p className="text-base text-[#647067] leading-relaxed">
              Established under the flagship mandate of the Atal Innovation
              Mission (NITI Aayog) and hosted by the 50-year-old Agricultural
              Development Trust (ADT), AIC-ADT bridges cutting-edge university
              research and grassroots agricultural deployment. Startups
              incubated at Baramati test their innovations on real farmers&apos;
              fields with direct agronomic feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTRO_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-[#DDE5DC] bg-[#F8FAF7] hover:border-[#73992A] transition-colors flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F0D9] text-[#004B2A] flex items-center justify-center font-bold text-sm">
                    {pillar.icon === "science" && "🔬"}
                    {pillar.icon === "seed" && "🪙"}
                    {pillar.icon === "mentorship" && "🤝"}
                  </div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EAEFE8]">
                  <Link
                    href={pillar.href}
                    className="text-xs font-semibold text-[#004B2A] group-hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:text-left">
            <Link
              href="/about"
              className="text-sm font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded p-1"
            >
              <span>
                Read Full Institutional Charter &amp; Leadership Directory
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION E: PROGRAMS & INCUBATION OPPORTUNITIES
          ========================================================================= */}
      <section className="bg-[#F8FAF7] py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Incubation Continuum
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
                Structured Incubation Programs for Every Growth Stage
              </h2>
              <p className="text-sm sm:text-base text-[#647067] max-w-2xl">
                From lab proof-of-concept to venture commercialization and
                institutional funding.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Compare All Pathways</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {PROGRAM_CARDS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROGRAM_CARDS.map((prog) => (
                <div
                  key={prog.id}
                  className={`p-6 rounded-xl bg-white border flex flex-col justify-between transition-shadow shadow-xs hover:shadow-md ${
                    prog.isCohortActive
                      ? "border-[#73992A] ring-1 ring-[#73992A]"
                      : "border-[#DDE5DC]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold text-[#59665D] uppercase tracking-wider">
                        {prog.stage}
                      </span>
                      {prog.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F0D9] text-[#004B2A] border border-[#73992A]/30">
                          {prog.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#17231D] font-heading">
                        {prog.title}
                      </h3>
                      <div className="text-xs font-semibold text-[#73992A] mt-1">
                        {prog.duration}
                      </div>
                    </div>

                    <div className="bg-[#F8FAF7] p-3 rounded-lg border border-[#EAEFE8]">
                      <div className="text-[11px] text-[#59665D]">
                        Financial Support Tranche:
                      </div>
                      <div className="text-sm font-bold text-[#004B2A] mt-0.5">
                        {prog.grantTranche}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#EAEFE8]">
                    <Link
                      href={prog.href}
                      className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                        prog.isCohortActive
                          ? "bg-[#004B2A] text-white hover:bg-[#00643A]"
                          : "bg-[#F3F7EC] text-[#004B2A] hover:bg-[#E8F0D9]"
                      }`}
                    >
                      <span>View Eligibility &amp; Apply</span>
                      <span className="ml-1.5" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-[#DDE5DC] bg-white text-center">
              <p className="text-sm text-[#647067]">
                Program cohorts and incubation guidelines for the upcoming cycle
                are under administrative review.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          SECTION F: AGRICULTURAL INNOVATION & TECHNOLOGY SHOWCASE
          ========================================================================= */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Thematic Focus Areas
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Pillars of Agricultural Innovation
            </h2>
            <p className="text-sm sm:text-base text-[#647067] max-w-2xl">
              Driving deep-tech solutions tailored to Maharashtra&apos;s
              drought-prone, saline, and horticultural belts.
            </p>
          </div>

          {/* 6 Focus Domain Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {INNOVATION_DOMAINS.map((domain) => (
              <Link
                key={domain.id}
                href={domain.href}
                className="p-4 rounded-xl border border-[#DDE5DC] bg-[#F8FAF7] hover:border-[#004B2A] hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 rounded-md bg-[#E8F0D9] text-[#004B2A] flex items-center justify-center font-bold text-xs mb-3">
                    🌱
                  </div>
                  <h3 className="text-xs font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors leading-snug">
                    {domain.title}
                  </h3>
                  <p className="text-[11px] text-[#647067] line-clamp-2 mt-1.5 leading-relaxed">
                    {domain.shortDesc}
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-[#004B2A] mt-3 inline-flex items-center gap-0.5">
                  <span>Explore</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Technical Pilot Highlight Banner */}
          <div className="rounded-2xl border border-[#DDE5DC] bg-gradient-to-r from-[#F3F7EC] to-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#004B2A] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded border border-[#DDE5DC]">
                <span>Featured Field Pilot Trial</span>
                <span className="text-[#647067]">
                  • {FEATURED_PILOT.acreage}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#17231D] font-heading">
                {FEATURED_PILOT.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {FEATURED_PILOT.description}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] shrink-0 text-center min-w-[200px] shadow-2xs">
              <div className="text-2xl font-extrabold text-[#004B2A] font-heading">
                {FEATURED_PILOT.metric}
              </div>
              <div className="text-xs text-[#59665D] mt-1">
                {FEATURED_PILOT.metricLabel}
              </div>
              <div className="mt-3 pt-2 border-t border-[#EAEFE8]">
                <Link
                  href={FEATURED_PILOT.href}
                  className="text-xs font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Read Pilot Whitepaper</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION G: FEATURED STARTUP STORIES
          ========================================================================= */}
      <section className="bg-[#F8FAF7] py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Venture Building in Action
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
                Innovations Born in Baramati
              </h2>
              <p className="text-sm sm:text-base text-[#647067] max-w-2xl">
                Discover startups creating systemic economic impact across
                agriculture and food value chains.
              </p>
            </div>
            <Link
              href="/startups"
              className="text-sm font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Browse Full Directory (50+ Startups)</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {FEATURED_STARTUPS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_STARTUPS.map((startup) => (
                <div
                  key={startup.slug}
                  className="p-6 rounded-xl bg-white border border-[#DDE5DC] hover:border-[#73992A] transition-colors flex flex-col justify-between shadow-2xs group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F0D9] text-[#004B2A]">
                        {startup.sector}
                      </span>
                      <span className="text-[10px] text-[#59665D] font-medium">
                        {startup.scheme}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                        {startup.name}
                      </h3>
                      <div className="text-xs text-[#647067] mt-0.5">
                        Founders: {startup.founders}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                      {startup.impactSummary}
                    </p>

                    <div className="bg-[#F8FAF7] p-2.5 rounded-lg border border-[#EAEFE8] text-xs font-semibold text-[#004B2A]">
                      ✓ {startup.verifiedMetric}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EAEFE8]">
                    <Link
                      href={startup.href}
                      className="text-xs font-semibold text-[#004B2A] group-hover:text-[#73992A] transition-colors inline-flex items-center gap-1 min-h-[44px]"
                    >
                      <span>View Venture Profile</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-[#DDE5DC] bg-white text-center">
              <p className="text-sm text-[#647067]">
                Incubatee venture profiles for the current cohort are being
                verified in accordance with national incubation registry
                standards.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          SECTION H: VERIFIED IMPACT METRICS (INSTITUTIONAL DARK ANCHOR)
          ========================================================================= */}
      <section className="bg-[#063D27] text-white py-16 lg:py-20 border-b border-[#0A2E1C]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#73992A] text-white tracking-wide uppercase mb-3">
                <span>Audited Institutional Impact</span>
                <span>• FY 2024-25</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Empowering Deep-Tech Across Rural Ecosystems
              </h2>
            </div>
            <div className="text-xs text-white/70 max-w-md">
              All displayed figures are compiled from official annual progress
              reports and statutory NITI Aayog / AIM filings.
            </div>
          </div>

          {IMPACT_METRICS.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {IMPACT_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#73992A] font-heading tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {metric.label}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60">
                    <span>Source: {metric.verifiedSource}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-center">
              <p className="text-sm text-white/80">
                Audited impact metrics for the upcoming statutory cycle are
                undergoing annual compliance review under NITI Aayog guidelines.
              </p>
            </div>
          )}

          <div className="mt-10 text-center sm:text-left">
            <Link
              href="/impact"
              className="text-xs font-semibold text-[#73992A] hover:text-white transition-colors inline-flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded p-1"
            >
              <span>
                Explore Historical Cohort Progression &amp; Fiscal Trends
                (FY22–FY25)
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION I: UPCOMING EVENTS & APPLICATION DEADLINES
          ========================================================================= */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Calendar &amp; Deadlines
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
                Upcoming Cohorts &amp; Technical Events
              </h2>
              <p className="text-sm text-[#647067]">
                Participate in campus masterclasses, specialized lab workshops,
                and funding intake calls.
              </p>
            </div>
            <Link
              href="/events"
              className="text-sm font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>View Full Calendar &amp; Past Archives</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {UPCOMING_EVENTS.length > 0 ? (
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-xl border border-[#DDE5DC] bg-[#F8FAF7] hover:border-[#004B2A] transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Calendar Date Box */}
                    <div className="w-14 h-14 rounded-lg bg-white border border-[#DDE5DC] flex flex-col items-center justify-center shrink-0 shadow-2xs">
                      <span className="text-[10px] font-bold text-[#004B2A] uppercase leading-none">
                        {evt.month}
                      </span>
                      <span className="text-xl font-extrabold text-[#17231D] font-heading leading-tight">
                        {evt.day}
                      </span>
                      <span className="text-[8px] text-[#59665D] leading-none">
                        {evt.year}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F0D9] text-[#004B2A]">
                          {evt.type}
                        </span>
                        {evt.deadlineAlert && (
                          <span className="text-[10px] font-semibold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded">
                            {evt.deadlineAlert}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#17231D] font-heading">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-[#647067]">
                        Venue: {evt.venue}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={evt.href}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors shrink-0 min-h-[44px]"
                  >
                    Register / Apply
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-[#DDE5DC] bg-[#F8FAF7] text-center">
              <p className="text-sm text-[#647067]">
                No public intake cohorts or masterclasses are currently
                scheduled. Cohort intake circulars are published in accordance
                with institutional calendars.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          SECTION J: REPORTS & PUBLICATIONS HIGHLIGHT
          ========================================================================= */}
      <section className="bg-[#F8FAF7] py-16 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
                Transparency &amp; Research
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
                Institutional Knowledge &amp; Annual Reports
              </h2>
              <p className="text-sm text-[#647067]">
                Public disclosures, compliance filings, and applied research
                whitepapers.
              </p>
            </div>
            <Link
              href="/resources"
              className="text-sm font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore All Publications</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {REPORT_PUBLICATIONS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REPORT_PUBLICATIONS.map((rep) => (
                <div
                  key={rep.id}
                  className="p-6 rounded-xl bg-white border border-[#DDE5DC] hover:border-[#73992A] transition-colors flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-[#E8F0D9] text-[#004B2A]">
                        {rep.type}
                      </span>
                      <span className="text-[#59665D]">{rep.fileSize}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#17231D] font-heading">
                      {rep.title}
                    </h3>

                    <div className="text-xs text-[#1B7340] font-medium flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{rep.verificationBadge}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#EAEFE8]">
                    <a
                      href={rep.downloadUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#F3F7EC] text-[#004B2A] hover:bg-[#E8F0D9] transition-colors w-full min-h-[44px]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download Official PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-[#DDE5DC] bg-white text-center">
              <p className="text-sm text-[#647067]">
                Annual publications and statutory disclosure documents are
                uploaded following board audit approvals.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          SECTION K: COLLABORATION CALL TO ACTION
          ========================================================================= */}
      <section className="bg-[#004B2A] text-white py-16 lg:py-20 border-b border-[#063D27]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              {COLLABORATION_CTA.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0EB] leading-relaxed">
              {COLLABORATION_CTA.body}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href={COLLABORATION_CTA.primaryButton.href}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white min-h-[44px]"
              >
                <span>{COLLABORATION_CTA.primaryButton.label}</span>
                <span className="ml-1.5 font-bold" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href={COLLABORATION_CTA.secondaryButton.href}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold border-1.5 border-white text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white min-h-[44px]"
              >
                <span>{COLLABORATION_CTA.secondaryButton.label}</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
