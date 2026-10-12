"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { StartupProfile } from "@/data/startups";

interface StartupDirectoryClientProps {
  startups: StartupProfile[];
}

export function StartupDirectoryClient({
  startups,
}: StartupDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const sectors = useMemo(() => {
    const list = Array.from(new Set(startups.map((s) => s.sector)));
    return ["All", ...list];
  }, [startups]);

  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      const matchesSector =
        selectedSector === "All" || startup.sector === selectedSector;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        startup.name.toLowerCase().includes(query) ||
        startup.founders.toLowerCase().includes(query) ||
        startup.overview.toLowerCase().includes(query) ||
        startup.fundingScheme.toLowerCase().includes(query);

      return matchesSector && matchesQuery;
    });
  }, [startups, searchQuery, selectedSector]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSector("All");
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white p-6 rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Accessible Search Input */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="startup-search" className="sr-only">
              Search startups by company name, founder, or technology
            </label>
            <input
              id="startup-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, founder, or technology..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[#DDE5DC] text-sm text-[#17231D] placeholder-[#647067] focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:border-transparent min-h-[44px]"
            />
            <span
              className="absolute left-3.5 top-3 text-[#647067] select-none"
              aria-hidden="true"
            >
              🔍
            </span>
          </div>

          <div className="text-xs font-semibold text-[#59665D] shrink-0">
            Showing{" "}
            <span className="text-[#004B2A] font-bold">
              {filteredStartups.length}
            </span>{" "}
            of {startups.length} Verified Startups
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAEFE8]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#59665D] mr-2">
            Sector Filter:
          </span>
          {sectors.map((sector) => {
            const isActive = selectedSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
                  isActive
                    ? "bg-[#004B2A] text-white shadow-2xs"
                    : "bg-[#F8FAF7] text-[#59665D] hover:bg-[#EAEFE8] border border-[#DDE5DC]"
                }`}
                aria-pressed={isActive}
              >
                {sector}
              </button>
            );
          })}

          {(searchQuery || selectedSector !== "All") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-[#D97706] hover:underline ml-auto min-h-[36px]"
            >
              Reset Filters ↺
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <div
              key={startup.slug}
              className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 shadow-2xs hover:shadow-md transition-shadow group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0D9] text-[#004B2A] font-heading font-extrabold text-base flex items-center justify-center border border-[#73992A]/30">
                    {startup.avatarPlaceholder}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="botanical">{startup.sector}</Badge>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF5EE] text-[#1B7340] border border-[#1B7340]/20">
                      ✓ Verified
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
                    {startup.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#73992A] mt-0.5">
                    {startup.cohort} • {startup.fundingScheme}
                  </div>
                  <div className="text-xs text-[#59665D] mt-1 font-medium">
                    Founders: {startup.founders}
                  </div>
                </div>

                <p className="text-xs text-[#647067] line-clamp-3 leading-relaxed">
                  {startup.overview}
                </p>

                <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8]">
                  <span className="text-[10px] uppercase font-bold text-[#59665D] block">
                    Verified Reach Metric
                  </span>
                  <span className="text-xs font-extrabold text-[#004B2A]">
                    {startup.reachMetric}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EAEFE8] flex items-center justify-between">
                <Link
                  href={`/startups/${startup.slug}`}
                  className="text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 min-h-[44px]"
                >
                  <span>Full Venture Profile</span>
                  <span aria-hidden="true">→</span>
                </Link>

                {startup.websiteUrl && (
                  <a
                    href={startup.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#59665D] hover:text-[#004B2A] transition-colors inline-flex items-center gap-1 min-h-[44px]"
                  >
                    <span>Website</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-2xl border border-[#DDE5DC] shadow-2xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F3F7EC] text-[#004B2A] flex items-center justify-center font-bold text-2xl mx-auto">
            🌱
          </div>
          <h3 className="text-lg font-bold text-[#17231D] font-heading">
            No Matching Startups Located
          </h3>
          <p className="text-xs sm:text-sm text-[#647067] max-w-md mx-auto leading-relaxed">
            We could not find any verified incubator portfolio records matching
            &ldquo;
            {searchQuery || selectedSector}&rdquo;. Try adjusting your keywords
            or clearing the active sector filter.
          </p>
          <div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
            >
              Reset Search &amp; Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
