"use client";

import React, { useState, useMemo } from "react";
import { PublicationItem, PublicationCategory } from "@/data/publications";
import { PublicationCard } from "./PublicationCard";

interface PublicationFilterClientProps {
  initialPublications: PublicationItem[];
  defaultCategory?: PublicationCategory;
}

export function PublicationFilterClient({
  initialPublications,
  defaultCategory = "All",
}: PublicationFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<PublicationCategory>(defaultCategory);

  const categories: PublicationCategory[] = [
    "All",
    "Annual Report",
    "Research Whitepaper",
    "Program Guideline",
    "Policy & Compliance",
    "Brand Asset",
  ];

  const filteredPublications = useMemo(() => {
    return initialPublications.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSummary = item.summary.toLowerCase().includes(query);
        const matchesAuthority = item.issuingAuthority
          .toLowerCase()
          .includes(query);
        const matchesHighlights = item.keyHighlights.some((h) =>
          h.toLowerCase().includes(query),
        );

        if (
          !matchesTitle &&
          !matchesSummary &&
          !matchesAuthority &&
          !matchesHighlights
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialPublications, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Header */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#DDE5DC] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="pub-search-input" className="sr-only">
              Search reports and publications
            </label>
            <input
              id="pub-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, whitepapers, or scheme guidelines..."
              className="w-full px-4 py-2.5 pl-10 text-sm rounded-lg border border-[#DDE5DC] bg-[#F8FAF7] text-[#17231D] placeholder-[#59665D] focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:border-transparent transition-all"
            />
            <span
              className="absolute left-3.5 top-3 text-[#59665D]"
              aria-hidden="true"
            >
              📄
            </span>
          </div>

          {/* Quick Counter */}
          <div
            role="status"
            aria-live="polite"
            className="text-xs text-[#59665D] self-center md:self-auto"
          >
            Displaying{" "}
            <strong className="text-[#17231D]">
              {filteredPublications.length}
            </strong>{" "}
            of {initialPublications.length} documents
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8F0EB]"
          role="tablist"
          aria-label="Filter documents by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#73992A] ${
                selectedCategory === cat
                  ? "bg-[#004B2A] text-white shadow-2xs"
                  : "bg-[#F8FAF7] text-[#59665D] border border-[#DDE5DC] hover:border-[#73992A] hover:text-[#17231D]"
              }`}
            >
              {cat === "All" ? "All Documents" : cat}
            </button>
          ))}
        </div>

        {(searchQuery || selectedCategory !== "All") && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-[#004B2A] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Grid of Publication Cards */}
      {filteredPublications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-[#DDE5DC] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-xl mx-auto">
            📁
          </div>
          <h3 className="text-lg font-bold text-[#17231D] font-heading">
            No Documents Found
          </h3>
          <p className="text-sm text-[#59665D] max-w-md mx-auto">
            No published reports or guidelines match your filter query. All
            unverified internal files have been excluded pursuant to
            institutional transparency policies.
          </p>
          <div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#004B2A] text-white font-semibold text-xs hover:bg-[#00643A] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
