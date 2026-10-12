import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { INNOVATION_DOMAINS } from "@/data/innovation";

export const metadata: Metadata = {
  title: "Agricultural Technology & Innovation | AIC-ADT Baramati Foundation",
  description:
    "Explore AIC-ADT Baramati Foundation's six technological domains driving agricultural transformation: Agri-Tech, Smart Farming, Food Processing, Agribusiness, Climate Tech, and Digital Agri AI.",
};

export default function InnovationOverviewPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge="Deep-Tech Focus Areas"
        badgeVariant="botanical"
        title="Six Technological Domains Driving Rural Transformation"
        description="AIC-ADT clusters scientific research, hardware makerspaces, and living crop plots into six focused deep-tech domains designed to enhance farm productivity, soil resilience, and post-harvest margins."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Innovation", href: "/innovation" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/infrastructure"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Campus Research Labs →
            </Link>
            <Link
              href="/startups"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Startup Portfolio
            </Link>
          </div>
        }
      />

      {/* 2. The 6 Domains Grid */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Thematic Clustering
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Our Priority Innovation Domains
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-2">
              Each domain is anchored by dedicated laboratory equipment, living
              field trials, and empaneled agronomic mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INNOVATION_DOMAINS.map((domain) => (
              <div
                key={domain.slug}
                className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 lg:p-7 shadow-2xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-[#F8FAF7] rounded-xl border border-[#DDE5DC]">
                      {domain.icon}
                    </span>
                    <Badge variant="botanical">{domain.badge}</Badge>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                    {domain.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#73992A] mt-1">
                    {domain.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#647067] mt-3 line-clamp-3 leading-relaxed">
                    {domain.overview}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#EAEFE8] space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
                      Core Mandate Focus
                    </div>
                    <ul className="space-y-1 text-xs text-[#17231D]">
                      {domain.mandatePillars.slice(0, 2).map((pil, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#004B2A] font-bold">•</span>
                          <span className="line-clamp-1">{pil}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAEFE8] flex items-center justify-between">
                  <span className="text-xs text-[#59665D]">
                    {domain.items.length} Showcases
                  </span>
                  <Link
                    href={`/innovation/${domain.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors min-h-[44px]"
                  >
                    <span>Domain Showcase &amp; Specs</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. The Living Lab Philosophy */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-[#DDE5DC] bg-white p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Empirical Research Mandate
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                Why Living Farm Testing Matters
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                Agriculture cannot be simulated on whiteboard screens alone.
                Environmental factors such as soil pH variance, monsoon
                downpours, canal water salinity, and canopy micro-climates
                cannot be modeled accurately without physical deployment.
              </p>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                AIC-ADT operates 110 acres of living campus farmland directly
                alongside Krishi Vigyan Kendra Baramati to ensure that every
                sensor, bio-stimulant, and drone implement is rigorously tested
                before being offered to farmers.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/about/infrastructure"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
                >
                  Explore 110-Acre Campus Facilities →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#F3F7EC] text-[#004B2A] hover:bg-[#EAEFE8] transition-colors min-h-[44px]"
                >
                  Schedule an Innovation Tour
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
