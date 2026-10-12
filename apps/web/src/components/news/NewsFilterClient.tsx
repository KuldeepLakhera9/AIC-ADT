"use client";

import React, { useState, useMemo } from "react";
import { NewsArticle, NewsCategory } from "@/data/news";
import { NewsCard } from "./NewsCard";

interface NewsFilterClientProps {
  initialArticles: NewsArticle[];
}

export function NewsFilterClient({ initialArticles }: NewsFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("All");

  const categories: NewsCategory[] = [
    "All",
    "Official Announcement",
    "Funding Milestone",
    "Infrastructure",
    "Ecosystem Partnership",
  ];

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      // 1. Category
      if (selectedCategory !== "All" && article.category !== selectedCategory) {
        return false;
      }

      // 2. Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesHeadline = article.headline.toLowerCase().includes(query);
        const matchesSummary = article.summary.toLowerCase().includes(query);
        const matchesSource = article.sourceAttribution
          .toLowerCase()
          .includes(query);
        const matchesTags = article.tags.some((t) =>
          t.toLowerCase().includes(query),
        );

        if (
          !matchesHeadline &&
          !matchesSummary &&
          !matchesSource &&
          !matchesTags
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="space-y-8">
      {/* Filter and Search Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#DDE5DC] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="news-search-input" className="sr-only">
              Search press releases and announcements
            </label>
            <input
              id="news-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements, milestones, or partners..."
              className="w-full px-4 py-2.5 pl-10 text-sm rounded-lg border border-[#DDE5DC] bg-[#F8FAF7] text-[#17231D] placeholder-[#59665D] focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:border-transparent transition-all"
            />
            <span
              className="absolute left-3.5 top-3 text-[#59665D]"
              aria-hidden="true"
            >
              📰
            </span>
          </div>

          {/* Active Counter */}
          <div
            role="status"
            aria-live="polite"
            className="text-xs text-[#59665D] self-center md:self-auto"
          >
            Displaying{" "}
            <strong className="text-[#17231D]">
              {filteredArticles.length}
            </strong>{" "}
            of {initialArticles.length} releases
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8F0EB]"
          role="tablist"
          aria-label="Filter news by category"
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
              {cat === "All" ? "All Releases" : cat}
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

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-[#DDE5DC] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-xl mx-auto">
            📢
          </div>
          <h3 className="text-lg font-bold text-[#17231D] font-heading">
            No Announcements Found
          </h3>
          <p className="text-sm text-[#59665D] max-w-md mx-auto">
            No institutional press releases match your search criteria. In
            accordance with official guidelines, only verified organizational
            announcements are published.
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
