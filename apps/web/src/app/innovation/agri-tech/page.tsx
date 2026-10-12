import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { InnovationShowcaseCard } from "@/components/innovation/InnovationShowcaseCard";
import { INNOVATION_DOMAINS } from "@/data/innovation";

export const metadata: Metadata = {
  title: "Farm Mechanization, Sensors & Agri-Robotics | AIC-ADT Innovation",
  description:
    "Explore innovations in electric farm rovers, drone spray implements, and mechatronic farm machinery tested at AIC-ADT Baramati.",
};

export default function AgriTechDomainPage() {
  const domain = INNOVATION_DOMAINS.find((d) => d.slug === "agri-tech");

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
          { label: "Agri-Tech & Robotics", href: "/innovation/agri-tech" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/infrastructure/fab-lab"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              FabLab Prototyping →
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
                Engineering Smallholder Mechanization
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
                Key Research &amp; Prototyping Focus
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
              Featured Technologies &amp; Research Showcases
            </h2>
            <p className="text-xs sm:text-sm text-[#59665D] mt-2">
              Empirically verified prototypes, deployed implements, and active
              research trials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domain.items.map((item) => (
              <InnovationShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-12">
        <Container>
          <div className="p-8 rounded-2xl bg-[#004B2A] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-heading">
                Prototyping an Agricultural Machine or Drone Implement?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8F0EB] mt-1">
                Access our FabLab makerspace, CNC machinery, and drone test
                corridors.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-[#004B2A] hover:bg-[#F3F7EC] transition-colors shrink-0 min-h-[44px]"
            >
              Inquire with FabLab Manager →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
