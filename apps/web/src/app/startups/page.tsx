import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/layout";
import { StartupDirectoryClient } from "@/components/startups/StartupDirectoryClient";
import { VERIFIED_STARTUPS_DIRECTORY } from "@/data/startups";

export const metadata: Metadata = {
  title:
    "Startup Directory & Incubator Portfolio | AIC-ADT Baramati Foundation",
  description:
    "Explore AIC-ADT Baramati Foundation's portfolio of verified agritech, smart farming, biotechnology, food tech, and robotics startups.",
};

export default function StartupsDirectoryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Header */}
      <PageHeader
        badge="Incubator Portfolio"
        badgeVariant="botanical"
        title="Verified AgriTech &amp; Rural Innovation Ventures"
        description="A curated showcase of startups accelerated by AIC-ADT Baramati across Maharashtra. Each venture is verified against statutory records, living farm testbeds, and DPIIT seed funding allocations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Startups", href: "/startups" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              href="/startups/success-stories"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              In-Depth Success Stories →
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-[#004B2A] border border-[#004B2A] hover:bg-[#F3F7EC] transition-colors min-h-[44px]"
            >
              Apply for Incubation
            </Link>
          </div>
        }
      />

      {/* 2. Portfolio Stat Highlights */}
      <section className="bg-white py-8 border-b border-[#DDE5DC]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8FAF7] border border-[#DDE5DC] text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#004B2A] font-heading">
                71+
              </div>
              <div className="text-xs font-semibold text-[#17231D] mt-1">
                Total Startups Supported
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#73992A] font-heading">
                ₹5.2 Cr+
              </div>
              <div className="text-xs font-semibold text-[#17231D] mt-1">
                Seed Capital Mobilized
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#004B2A] font-heading">
                42+
              </div>
              <div className="text-xs font-semibold text-[#17231D] mt-1">
                IP Registrations &amp; Patents
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D97706] font-heading">
                35,000+
              </div>
              <div className="text-xs font-semibold text-[#17231D] mt-1">
                Smallholder Farmers Impacted
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Searchable & Filterable Directory Grid */}
      <section className="bg-[#F8FAF7] py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73992A]">
              Live Portfolio Search
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231D] font-heading mt-1">
              Explore Ventures by Sector &amp; Technology
            </h2>
            <p className="text-xs sm:text-sm text-[#59665D] mt-2">
              Filter by technology domain or search by founder and company name.
            </p>
          </div>

          <StartupDirectoryClient startups={VERIFIED_STARTUPS_DIRECTORY} />
        </Container>
      </section>
    </div>
  );
}
