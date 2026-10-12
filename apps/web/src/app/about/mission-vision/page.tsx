import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { MISSION_VISION_DATA } from "@/data/institutional";

export const metadata: Metadata = {
  title: "Mission, Vision & SDGs | AIC-ADT Baramati Foundation",
  description:
    "Institutional charter, core values, UN Sustainable Development Goals (SDG) alignment, and 2030 strategic agritech roadmap.",
};

export default function MissionVisionPage() {
  const { hero, vision, mission, values, sdgs, roadmap } = MISSION_VISION_DATA;

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
          { label: "Mission & Vision", href: "/about/mission-vision" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources/annual-reports"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Read Annual Disclosures →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Institutional Genesis
            </Link>
          </div>
        }
      />

      {/* 2. Vision and Mission Canvas */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div className="rounded-2xl border border-[#DDE5DC] bg-gradient-to-br from-[#F8FAF7] to-white p-7 sm:p-9 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                    Long-Term Aspiration
                  </span>
                  <span className="text-xl">🔭</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight">
                  Our Vision
                </h2>
                <blockquote className="text-base sm:text-lg font-medium text-[#004B2A] leading-relaxed border-l-3 border-[#73992A] pl-4 italic">
                  &ldquo;{vision.statement}&rdquo;
                </blockquote>
                <p className="text-sm text-[#647067] leading-relaxed pt-2">
                  {vision.elaboration}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl border border-[#DDE5DC] bg-gradient-to-br from-[#F3F7EC] to-white p-7 sm:p-9 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#004B2A]">
                    Operational Mandate
                  </span>
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight">
                  Our Mission
                </h2>
                <p className="text-base text-[#17231D] font-semibold leading-relaxed">
                  {mission.statement}
                </p>
                <ul className="space-y-2.5 pt-2">
                  {mission.pillars.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#647067]"
                    >
                      <span
                        className="text-[#1B7340] font-bold mt-0.5"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Five Core Institutional Values */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Ethical Foundations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Our Five Guiding Institutional Values
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Principles that govern our technology evaluation, venture
              selection, and public disclosures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white p-6 rounded-xl border border-[#DDE5DC] space-y-3 shadow-2xs hover:border-[#73992A] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8F0D9] text-[#004B2A] flex items-center justify-center text-lg">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-[#17231D] font-heading">
                  {val.title}
                </h3>
                <div className="text-xs font-semibold text-[#73992A]">
                  {val.tagline}
                </div>
                <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. UN Sustainable Development Goals (SDG) Alignment */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Global Goals Alignment
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Targeting the UN Sustainable Development Goals
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Every startup incubated at AIC-ADT contributes directly to
              verifiable indicators across 4 primary SDGs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdgs.map((sdg) => (
              <div
                key={sdg.sdgNumber}
                className="rounded-xl border border-[#DDE5DC] bg-[#F8FAF7] p-6 space-y-4 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded text-xs font-black text-white"
                      style={{ backgroundColor: sdg.unColor }}
                    >
                      SDG {sdg.sdgNumber}
                    </span>
                    <span className="text-xs font-bold text-[#59665D]">
                      Goal {sdg.sdgNumber}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {sdg.sdgTitle}
                  </h3>
                  <div className="text-xs font-semibold text-[#004B2A]">
                    {sdg.focusArea}
                  </div>
                  <p className="text-xs text-[#647067] leading-relaxed">
                    {sdg.impactDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAEFE8] text-[11px] font-semibold text-[#1B7340]">
                  🎯 {sdg.metricTarget}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Strategic 2030 Roadmap */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Strategic Vision 2030
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading tracking-tight mb-2">
              Three-Stage Strategic Horizon
            </h2>
            <p className="text-sm sm:text-base text-[#647067]">
              Our roadmap to institutional self-sustainability, deep-tech
              excellence, and farmer empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((stage) => (
              <div
                key={stage.year}
                className="bg-white p-6 rounded-xl border border-[#DDE5DC] flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#73992A] uppercase">
                      {stage.horizon}
                    </span>
                    <Badge variant="neutral">{stage.year}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {stage.title}
                  </h3>
                  <ul className="space-y-2 pt-2">
                    {stage.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#647067] leading-relaxed"
                      >
                        <span
                          className="text-[#004B2A] font-bold"
                          aria-hidden="true"
                        >
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Action Call to Action */}
      <section className="bg-[#004B2A] text-white py-14 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Align With Our Agricultural Impact Mission
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0EB] leading-relaxed">
              Whether you are a deep-tech founder validating solutions or an
              institutional partner aligning with national SDGs, we welcome your
              collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-sm min-h-[44px]"
              >
                <span>Explore Incubation Pathways</span>
                <span className="ml-1.5 font-bold" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/about/partners"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border-1.5 border-white text-white hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Institutional Partnerships
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
