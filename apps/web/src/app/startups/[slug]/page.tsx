import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout";
import { Badge } from "@/components/ui/Badge";
import { VERIFIED_STARTUPS_DIRECTORY } from "@/data/startups";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return VERIFIED_STARTUPS_DIRECTORY.map((startup) => ({
    slug: startup.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const startup = VERIFIED_STARTUPS_DIRECTORY.find((s) => s.slug === slug);

  if (!startup) {
    return {
      title: "Startup Not Found | AIC-ADT Baramati Foundation",
    };
  }

  return {
    title: `${startup.name} | AIC-ADT Startup Portfolio`,
    description: startup.overview,
  };
}

export default async function StartupProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const startup = VERIFIED_STARTUPS_DIRECTORY.find((s) => s.slug === slug);

  if (!startup) {
    notFound();
  }

  const otherStartups = VERIFIED_STARTUPS_DIRECTORY.filter(
    (s) => s.slug !== startup.slug,
  ).slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        badge={startup.sector}
        badgeVariant="botanical"
        title={startup.name}
        description={startup.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Startups", href: "/startups" },
          { label: startup.name, href: `/startups/${startup.slug}` },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            {startup.websiteUrl && (
              <a
                href={startup.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
              >
                Visit Website ↗
              </a>
            )}
            <Link
              href="/startups"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              All Startups
            </Link>
          </div>
        }
      />

      {/* Venture Facts Banner */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D]">
                Founders
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#17231D] mt-0.5 line-clamp-1">
                {startup.founders}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D]">
                Cohort / Track
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#004B2A] mt-0.5">
                {startup.cohort}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D]">
                Scheme Support
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#73992A] mt-0.5 line-clamp-1">
                {startup.fundingScheme}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D]">
                Maturity
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#17231D] mt-0.5">
                {startup.trlLevel}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#59665D]">
                Verified Reach
              </span>
              <div className="text-xs sm:text-sm font-bold text-[#004B2A] mt-0.5">
                {startup.reachMetric}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem Statement vs Solution Innovation */}
      <section className="bg-white py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Problem Identified
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Agricultural Challenge Addressed
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {startup.problemStatement}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] space-y-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#004B2A]">
                Proprietary Innovation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Technical Solution &amp; Deployment
              </h2>
              <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
                {startup.solutionInnovation}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Milestones & Campus Facilities */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
                Empirical Validation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
                Key Verified Milestones
              </h2>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#17231D]">
                {startup.milestones.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#004B2A] font-bold">✓</span>
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#59665D]">
                Incubation Resources
              </span>
              <h3 className="text-lg font-bold text-[#17231D] font-heading">
                Campus Testbeds Leveraged
              </h3>
              <p className="text-xs text-[#647067] leading-relaxed">
                {startup.labsUsed}
              </p>

              <div className="pt-4 border-t border-[#EAEFE8] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#73992A] block">
                  Location &amp; Operational Base
                </span>
                <div className="text-xs text-[#17231D] font-medium">
                  {startup.location}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about/infrastructure"
                  className="text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore Campus Facilities</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-Navigation to Other Startups */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231D] font-heading">
              Other Accelerated Startups
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStartups.map((other) => (
              <Link
                key={other.slug}
                href={`/startups/${other.slug}`}
                className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] hover:border-[#004B2A] transition-colors shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="botanical">{other.sector}</Badge>
                    <span className="text-[10px] text-[#73992A] font-bold">
                      {other.cohort}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#17231D] group-hover:text-[#004B2A] transition-colors font-heading">
                    {other.name}
                  </h3>
                  <p className="text-xs text-[#647067] mt-2 line-clamp-2 leading-relaxed">
                    {other.overview}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAEFE8] text-[11px] font-bold text-[#004B2A] flex items-center justify-between">
                  <span>View Venture Profile</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
