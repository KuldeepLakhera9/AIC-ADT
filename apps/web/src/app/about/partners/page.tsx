import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { INSTITUTIONAL_PARTNERS_DATA } from "@/data/institutional";

export const metadata: Metadata = {
  title: "Institutional & Strategic Partners | AIC-ADT Baramati Foundation",
  description:
    "Explore AIC-ADT's institutional ecosystem of government bodies, corporate CSR partners, academic institutions, and agritech investors.",
};

export default function PartnersPage() {
  const { hero, categories } = INSTITUTIONAL_PARTNERS_DATA;

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
          { label: "Partners", href: "/about/partners" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Explore Institutional Partnership →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Incubation Programs
            </Link>
          </div>
        }
      />

      {/* 2. Ecosystem Pillar Summary Banner */}
      <section className="bg-white py-10 lg:py-14 border-b border-[#DDE5DC]">
        <Container>
          <div className="rounded-2xl border border-[#DDE5DC] bg-[#F8FAF7] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Multi-Sectoral Quadruple Helix
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#17231D] font-heading">
                Bridging Government Mandates, Corporate Capital &amp; Living
                Farms
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                Our ecosystem model unites central government ministries,
                multinational corporate grantors, academic researchers, and
                grassroots farmer networks to de-risk agricultural
                entrepreneurship.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 shrink-0">
              <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] text-center min-w-[130px] shadow-2xs">
                <div className="text-2xl font-extrabold text-[#004B2A] font-heading">
                  5
                </div>
                <div className="text-[11px] font-semibold text-[#59665D] mt-0.5">
                  Partner Sectors
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#DDE5DC] text-center min-w-[130px] shadow-2xs">
                <div className="text-2xl font-extrabold text-[#73992A] font-heading">
                  15+
                </div>
                <div className="text-[11px] font-semibold text-[#59665D] mt-0.5">
                  Key Alliances
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Categorized Partners Directory */}
      <div className="bg-[#F8FAF7] py-14 lg:py-20 space-y-16 border-b border-[#DDE5DC]">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <Container>
              <div className="max-w-2xl mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-1">
                  Ecosystem Segment
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17231D] font-heading">
                  {category.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#59665D] mt-2">
                  {category.shortDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-6 rounded-2xl bg-white border border-[#DDE5DC] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge variant="botanical">{partner.badge}</Badge>
                        <span className="text-[11px] font-semibold text-[#73992A] flex items-center gap-1">
                          <span>✓</span>
                          <span>Verified</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#17231D] font-heading">
                        {partner.name}
                      </h3>

                      <div className="text-xs font-semibold text-[#004B2A] mt-1">
                        {partner.role}
                      </div>

                      <p className="text-xs text-[#647067] mt-3 leading-relaxed">
                        {partner.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#EAEFE8] flex items-center justify-between text-[11px] text-[#59665D]">
                      <span>Category: {partner.category}</span>
                      <span className="font-semibold text-[#004B2A]">
                        Active Alliance
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>

      {/* 4. Strategic Collaboration Opportunities */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#73992A] mb-2">
              Engagement Avenues
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Four Ways Institutions Collaborate With Us
            </h2>
            <p className="text-sm sm:text-base text-[#59665D] mt-3">
              We structure custom engagement pathways for corporate CSR
              programs, angel investors, universities, and technology
              enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
              <div className="text-2xl mb-3">🏢</div>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Corporate CSR Grants
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Direct statutory CSR capital into vetted rural innovation
                cohorts focusing on farmer income, water security, and women
                agritech entrepreneurship.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
              <div className="text-2xl mb-3">🔬</div>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Academic Translation
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Partner with universities to license patented bio-formulations,
                conduct joint clinical trials, and offer student residency
                fellowships.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
              <div className="text-2xl mb-3">💼</div>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Venture Syndicate Access
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Gain early proprietary access to graduate cohort demo days, due
                diligence dossiers, and co-investment syndicates with our seed
                fund.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
              <div className="text-2xl mb-3">🌾</div>
              <h3 className="text-base font-bold text-[#17231D] font-heading">
                Enterprise Field Pilots
              </h3>
              <p className="text-xs text-[#647067] mt-2 leading-relaxed">
                Validate enterprise agro-inputs, farm machinery, and drone
                sensors across 50+ acres of living crops with certified
                agronomic data logs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Partnership Call to Action */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="rounded-3xl border border-[#DDE5DC] bg-[#004B2A] text-white p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B9F5D8]">
                Institutional Engagement
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Become a Strategic Partner of AIC-ADT Baramati
              </h2>
              <p className="text-sm text-[#E2E8F0] leading-relaxed">
                Whether you represent a corporate CSR foundation, venture
                capital fund, research institute, or industry body, connect with
                our leadership to explore structured alliance opportunities.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
                >
                  Initiate Partnership Dialogue →
                </Link>
                <Link
                  href="/about/leadership"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors min-h-[44px]"
                >
                  Meet Leadership &amp; Board
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
