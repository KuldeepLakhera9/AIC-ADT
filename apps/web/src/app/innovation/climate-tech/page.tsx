import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { InnovationShowcaseCard } from "@/components/innovation/InnovationShowcaseCard";
import { INNOVATION_DOMAINS } from "@/data/innovation";

export const metadata: Metadata = {
  title:
    "Renewable Energy, Biochar & Circular Agriculture | AIC-ADT Innovation",
  description:
    "Explore innovations in agricultural residue pyrolysis, halotolerant microbial soil restoration, and solar microgrids tested at AIC-ADT Baramati.",
};

export default function ClimateTechDomainPage() {
  const domain = INNOVATION_DOMAINS.find((d) => d.slug === "climate-tech");

  if (!domain) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge={domain.badge}
        badgeVariant="botanical"
        title={domain.title}
        description={domain.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Innovation", href: "/innovation" },
          { label: "Climate Tech", href: "/innovation/climate-tech" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/infrastructure/analytical-lab"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              NABL Soil Testing Lab →
            </Link>
            <Link
              href="/innovation"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              All Domains
            </Link>
          </div>
        }
      />

      {/* Domain Overview */}
      <section className="bg-white py-12 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Domain Mandate
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
                Soil Carbon &amp; Circular Agriculture
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {domain.overview}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#59665D] block mb-2">
                  Campus Facilities Involved
                </span>
                <div className="flex flex-wrap gap-2">
                  {domain.campusInfrastructureNodes.map((node) => (
                    <Badge key={node} variant="botanical">
                      {node}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                Climate Tech Focus Areas
              </span>
              <ul className="space-y-2 text-xs text-[#17231D]">
                {domain.mandatePillars.map((pil, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#004B2A] font-bold">✓</span>
                    <span>{pil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Showcases Grid */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading">
              Featured Climate &amp; Biochar Showcases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domain.items.map((item) => (
              <InnovationShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
