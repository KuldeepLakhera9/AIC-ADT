import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { ABOUT_OVERVIEW_DATA } from "@/data/institutional";

export const metadata: Metadata = {
  title: "About the Foundation | AIC-ADT Baramati Foundation",
  description:
    "Institutional genesis, 50-year ADT agricultural heritage, and Atal Innovation Mission (NITI Aayog) mandate in Baramati, Maharashtra.",
};

export default function AboutPage() {
  const { hero, genesis, milestones, accreditations, pillars } =
    ABOUT_OVERVIEW_DATA;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge={hero.badge}
        badgeVariant="botanical"
        title={hero.title}
        description={hero.leadCopy}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/infrastructure"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Explore Campus Labs →
            </Link>
            <Link
              href="/about/leadership"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Governing Leadership
            </Link>
          </div>
        }
      />

      {/* 2. Institutional Genesis & Heritage Section */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Narrative Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Foundational Heritage
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight leading-snug">
                {genesis.heading}
              </h2>
              <div className="space-y-4 text-base text-[#647067] leading-relaxed">
                {genesis.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Sub-navigation links */}
              <div className="pt-4 flex flex-wrap gap-4 text-sm font-semibold text-[#004B2A]">
                <Link
                  href="/about/mission-vision"
                  className="hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Our Mission &amp; Values</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/about/leadership"
                  className="hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Governing Board &amp; Team</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/about/partners"
                  className="hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Institutional Partners</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Information Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#DDE5DC] bg-[#F8FAF7] p-6 sm:p-7 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#EAEFE8] pb-4">
                  <h3 className="text-base font-bold text-[#17231D] font-heading">
                    Institutional Factsheet
                  </h3>
                  <Badge variant="leaf">Section 8 Registered</Badge>
                </div>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#59665D]">
                      Host Institution
                    </dt>
                    <dd className="font-bold text-[#17231D] mt-0.5">
                      {genesis.hostTrust}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#59665D]">
                      National Sanction
                    </dt>
                    <dd className="font-bold text-[#004B2A] mt-0.5">
                      {genesis.sanctioningBody}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#59665D]">
                      Campus Infrastructure
                    </dt>
                    <dd className="font-bold text-[#17231D] mt-0.5">
                      {genesis.campusArea}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#59665D]">
                      Legal Entity
                    </dt>
                    <dd className="font-bold text-[#17231D] mt-0.5">
                      {genesis.legalStatus}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-[#59665D]">
                      Registered Headquarters
                    </dt>
                    <dd className="text-[#647067] mt-0.5">
                      Sharadanagar, Baramati, District Pune, Maharashtra –
                      413115
                    </dd>
                  </div>
                </dl>

                <div className="pt-4 border-t border-[#EAEFE8]">
                  <Link
                    href="/about/infrastructure"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#E8F0D9] text-[#004B2A] hover:bg-[#DDE5DC] transition-colors min-h-[44px]"
                  >
                    <span>Tour 110-Acre Campus Facilities</span>
                    <span className="ml-1" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Three Strategic Pillars */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Strategic Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Three Pillars of the Incubation Continuum
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              How AIC-ADT bridges cutting-edge engineering with practical
              farming realities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white p-6 rounded-xl border border-[#DDE5DC] flex flex-col justify-between shadow-2xs hover:border-[#73992A] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-[#73992A] uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <Badge variant="botanical">{pillar.metric}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#EAEFE8]">
                  <Link
                    href={pillar.href}
                    className="text-xs font-semibold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Explore Pillar Scope</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Heritage Timeline */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Institutional Progression
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Milestones of Agricultural Transformation
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Chronological milestones from the 1971 founding of ADT to
              present-day deep-tech acceleration.
            </p>
          </div>

          <div className="relative border-l-2 border-[#DDE5DC] ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Marker dot */}
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#004B2A] border-4 border-white shadow-xs group-hover:bg-[#73992A] transition-colors"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base font-extrabold text-[#004B2A] font-heading">
                    {milestone.year}
                  </span>
                  <Badge variant="neutral">{milestone.category}</Badge>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#17231D] font-heading">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#647067] max-w-2xl mt-1 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Statutory Accreditations */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Statutory Stature
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Government Accreditations &amp; Scope
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Institutional recognitions ensuring compliance with national
              incubation directives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditations.map((acc, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-[#DDE5DC] space-y-3 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <Badge variant="botanical">{acc.status}</Badge>
                  <h3 className="text-base font-bold text-[#17231D] font-heading mt-2">
                    {acc.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#59665D] mt-0.5">
                    {acc.authority}
                  </div>
                  <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                    {acc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Institutional Action CTA */}
      <section className="bg-[#004B2A] text-white py-14 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Collaborate With Baramati&apos;s Agri-Innovation Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0EB] leading-relaxed">
              Explore our specialized testing laboratories, review our governing
              leadership roster, or apply for residency under active cohort
              intake calls.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href="/about/infrastructure"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-sm min-h-[44px]"
              >
                <span>View Campus Infrastructure</span>
                <span className="ml-1.5 font-bold" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border-1.5 border-white text-white hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Explore Incubation Pathways
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
