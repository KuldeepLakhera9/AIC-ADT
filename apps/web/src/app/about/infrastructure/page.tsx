import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { INFRASTRUCTURE_MASTER_DATA } from "@/data/institutional";

export const metadata: Metadata = {
  title: "Campus & Research Infrastructure | AIC-ADT Baramati Foundation",
  description:
    "Explore AIC-ADT's 110-acre campus, 5 specialized research laboratories, FabLab makerspace, NABL testing facility, pilot food plant, and living farm testbeds.",
};

export default function InfrastructurePage() {
  const { hero, campusStats, facilities } = INFRASTRUCTURE_MASTER_DATA;

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
          { label: "Infrastructure", href: "/about/infrastructure" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Request Lab Access / Tour →
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Institutional Partners
            </Link>
          </div>
        }
      />

      {/* 2. Campus Core Statistics Banner */}
      <section className="bg-white py-10 lg:py-14 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] text-center shadow-2xs">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#004B2A] font-heading">
                110 Acres
              </div>
              <div className="text-sm font-semibold text-[#17231D] mt-2">
                Sharadanagar Campus
              </div>
              <p className="text-xs text-[#647067] mt-1">
                {campusStats.acreage}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] text-center shadow-2xs">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#73992A] font-heading">
                50+ Acres
              </div>
              <div className="text-sm font-semibold text-[#17231D] mt-2">
                Living Farm Testbeds
              </div>
              <p className="text-xs text-[#647067] mt-1">
                {campusStats.demonstrationPlot}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] text-center shadow-2xs">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#004B2A] font-heading">
                5 Specialized
              </div>
              <div className="text-sm font-semibold text-[#17231D] mt-2">
                Research Labs
              </div>
              <p className="text-xs text-[#647067] mt-1">
                {campusStats.specializedLabs}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] text-center shadow-2xs">
              <div className="text-3xl lg:text-4xl font-extrabold text-[#D97706] font-heading">
                100% Microgrid
              </div>
              <div className="text-sm font-semibold text-[#17231D] mt-2">
                Solar Powered
              </div>
              <p className="text-xs text-[#647067] mt-1">
                {campusStats.solarCapacity}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Specialized Research Laboratories Grid */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Deep-Tech Facilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17231D] font-heading">
              Five State-of-the-Art Research Centers
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-3">
              Each specialized laboratory is equipped with precision industrial
              instrumentation, supervised by domain managers, and accessible to
              incubated startups and regional innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => (
              <div
                key={fac.slug}
                className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 lg:p-7 shadow-2xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-[#F3F7EC] rounded-xl border border-[#DDE5DC]">
                      {fac.icon}
                    </span>
                    <Badge variant="botanical">{fac.category}</Badge>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                    {fac.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#73992A] mt-1">
                    {fac.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#647067] mt-3 line-clamp-3 leading-relaxed">
                    {fac.shortDesc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#EAEFE8]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D] mb-2">
                      Key Instrumentation
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#17231D]">
                      {fac.equipment.slice(0, 3).map((item) => (
                        <li
                          key={item.name}
                          className="flex items-start gap-1.5"
                        >
                          <span className="text-[#004B2A] font-bold mt-0.5">
                            •
                          </span>
                          <span className="line-clamp-1">{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAEFE8] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#73992A]">
                    {fac.statusBadge.split("•")[0]?.trim() || "Operational"}
                  </span>
                  <Link
                    href={`/about/infrastructure/${fac.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors"
                  >
                    <span>Lab Details &amp; Specs</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}

            {/* Farm Testbed Card */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#004B2A] to-[#003820] text-white rounded-2xl p-6 lg:p-7 shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-white/10 rounded-xl border border-white/20">
                    🌱
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#73992A] text-white">
                    Field Testbed
                  </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-white font-heading">
                  110-Acre Living Agricultural Testbed
                </h3>

                <p className="text-xs font-semibold text-[#B9F5D8] mt-1">
                  Living Soil, Real Crops, Direct Farmer Interaction
                </p>

                <p className="text-xs sm:text-sm text-[#E2E8F0] mt-3 leading-relaxed">
                  Startups do not test in simulated software chambers alone. Our
                  50+ acres of controlled agronomic testbeds host active
                  sugarcane, pomegranate, grape, and polyhouse crops connected
                  to live telemetry.
                </p>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#B9F5D8] mb-2">
                    Field Capabilities
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#E2E8F0]">
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#B9F5D8] font-bold">•</span>
                      <span>Automated climate-controlled polyhouses</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#B9F5D8] font-bold">•</span>
                      <span>
                        Precision sub-surface drip irrigation telemetry
                      </span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-[#B9F5D8] font-bold">•</span>
                      <span>DGCA drone trial corridors and battery hubs</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-[#B9F5D8]">
                  KVK Collaboration
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#B9F5D8] transition-colors"
                >
                  <span>Request Field Pilot</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. The "Lab-to-Land" Validation Pipeline */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Integrated Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              The AIC-ADT Lab-to-Land Pipeline
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-3">
              How deep-tech inventions progress from initial CAD design to
              empirical farm validation on our campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] relative">
              <span className="text-xs font-extrabold text-[#73992A] uppercase tracking-wider block mb-2">
                Stage 01
              </span>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Prototyping &amp; FabLab
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Founders fabricate rugged sensor enclosures, custom drone
                brackets, and PCB daughter boards within 48 hours using
                high-precision CNC and 3D printing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] relative">
              <span className="text-xs font-extrabold text-[#73992A] uppercase tracking-wider block mb-2">
                Stage 02
              </span>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Analytical Validation
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Bio-stimulants, fertilizers, and plant formulations undergo
                GC-MS and HPLC spectrophotometry assays to verify stability and
                purity benchmarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] relative">
              <span className="text-xs font-extrabold text-[#73992A] uppercase tracking-wider block mb-2">
                Stage 03
              </span>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Living Farm Trials
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Hardware, robotics, and biologicals are deployed on 50+ acres of
                real sugarcane and vegetable plots with agronomic oversight from
                KVK scientists.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] relative">
              <span className="text-xs font-extrabold text-[#73992A] uppercase tracking-wider block mb-2">
                Stage 04
              </span>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Scale &amp; Commercialization
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Field-validated technologies receive SISFS seed grants, digital
                storytelling packages from our media studio, and introductions
                to regional FPO networks.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Facility Access Guidelines & Call to Action */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-[#DDE5DC] bg-white p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Institutional Policy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                Facility Access &amp; Booking Guidelines
              </h2>
              <p className="text-sm text-[#59665D] leading-relaxed">
                All AIC-ADT facilities operate under structured laboratory
                safety protocols. Incubated cohort members receive priority
                machine scheduling, subsidized consumables, and dedicated
                technical mentor support.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#004B2A] font-bold text-lg">✓</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#17231D]">
                      Incubated Startups
                    </h4>
                    <p className="text-xs text-[#647067] mt-0.5">
                      Subsidized testing rates, 24/7 co-working access, priority
                      booking slots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#004B2A] font-bold text-lg">✓</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#17231D]">
                      External Innovators &amp; FPOs
                    </h4>
                    <p className="text-xs text-[#647067] mt-0.5">
                      Standard fee schedule approved by AIC-ADT management;
                      supervised operation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
                >
                  Schedule a Lab Tour or Equipment Booking →
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#F3F7EC] text-[#004B2A] hover:bg-[#EAEFE8] transition-colors min-h-[44px]"
                >
                  Apply for Incubation
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
