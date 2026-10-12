import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { PROGRAMS_CONTINUUM, SCHEMES_DATA } from "@/data/programs";

export const metadata: Metadata = {
  title: "Incubation Programs & Funding Schemes | AIC-ADT Baramati Foundation",
  description:
    "Explore AIC-ADT's incubation continuum: Pre-Incubation, Comprehensive Incubation, Acceleration, Startup India Seed Fund (SISFS), and MeitY GENESIS schemes.",
};

export default function ProgramsOverviewPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge="NITI Aayog & DPIIT Supported Incubation"
        badgeVariant="botanical"
        title="Agri-Innovation Programs & Catalytic Funding Pathways"
        description="From early laboratory ideation to national market scaling, AIC-ADT provides early-stage agritech entrepreneurs with structured mentorship, 110 acres of living farm testbeds, and non-dilutive government grant capital."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              How to Apply &amp; FAQs →
            </Link>
            <Link
              href="/programs/mentorship"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Mentor Network
            </Link>
          </div>
        }
      />

      {/* 2. Incubation Continuum Comparison Matrix */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Three-Tier Progression
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              The AIC-ADT Incubation Continuum
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-3">
              We structure our support into three distinct stages tailored to
              technology readiness and enterprise maturity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS_CONTINUUM.map((prog) => (
              <ProgramCard key={prog.slug} program={prog} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Catalytic Government & CSR Schemes Banner */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Statutory Seed Funding
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Government Schemes &amp; Corporate CSR Capital
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-3">
              AIC-ADT is an approved implementing incubator for premier Central
              Government funding schemes and multinational corporate CSR
              innovation grants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCHEMES_DATA.map((scheme) => (
              <div
                key={scheme.slug}
                className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 lg:p-7 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="botanical">{scheme.badge}</Badge>
                    <span className="text-[11px] font-bold text-[#73992A]">
                      {scheme.supportedStartupsCount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17231D] font-heading">
                    {scheme.name}
                  </h3>

                  <div className="text-xs font-bold text-[#004B2A] mt-1">
                    {scheme.grantCap}
                  </div>

                  <p className="text-xs text-[#59665D] mt-1">
                    Authority: {scheme.sanctioningBody}
                  </p>

                  <p className="text-xs sm:text-sm text-[#647067] mt-3 line-clamp-3 leading-relaxed">
                    {scheme.summary}
                  </p>

                  <div className="mt-4 p-3 bg-[#F8FAF7] rounded-xl border border-[#EAEFE8]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D] block mb-1">
                      Featured Venture Under Scheme
                    </span>
                    <div className="text-xs font-bold text-[#17231D]">
                      {scheme.featuredCaseStudy.startupName}
                    </div>
                    <div className="text-[11px] text-[#73992A]">
                      {scheme.featuredCaseStudy.impactHeadline}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAEFE8] flex items-center justify-between">
                  <Link
                    href={`/programs/schemes/${scheme.slug}`}
                    className="text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 min-h-[44px]"
                  >
                    <span>Scheme Terms &amp; Eligibility</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href={`/startups/${scheme.featuredCaseStudy.slug}`}
                    className="text-xs text-[#59665D] hover:text-[#004B2A] transition-colors min-h-[44px] inline-flex items-center"
                  >
                    Case Study ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Specialized Program Pathways */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Ecosystem Capacity Building
              </span>
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                Practical Bootcamps &amp; Farmer Training Modules
              </h3>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                Beyond full-time cohort incubation, AIC-ADT organizes hands-on
                workshops in post-harvest food value-addition, IoT telemetry
                fabrication, and modern NABL soil diagnostics for rural youth,
                farmers, and students.
              </p>
              <div>
                <Link
                  href="/programs/training"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
                >
                  Explore Upcoming Training Modules →
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Multidisciplinary Network
              </span>
              <h3 className="text-xl font-bold text-[#17231D] font-heading">
                69+ Empaneled Mentors &amp; IPR Facilitation Cell
              </h3>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                Startups receive one-on-one advisory from senior venture
                capitalists, patent attorneys, protected cultivation
                agronomists, and supply-chain logistics veterans.
              </p>
              <div>
                <Link
                  href="/programs/mentorship"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
                >
                  Meet the Mentor Network →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Application Call to Action */}
      <section className="bg-[#004B2A] text-white py-14 lg:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Ready to Accelerate Your Agritech Venture?
            </h2>
            <p className="text-sm sm:text-base text-[#E8F0EB] leading-relaxed">
              Review our transparent step-by-step application instructions,
              evaluate our scoring rubric, and assemble your concept note for
              the next cohort intake.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href="/programs/apply-instructions"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shadow-sm min-h-[44px]"
              >
                <span>Read Application Instructions &amp; FAQs</span>
                <span className="ml-1.5 font-bold" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border-1.5 border-white text-white hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Inquire with Program Manager
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
