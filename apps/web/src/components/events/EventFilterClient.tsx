"use client";

import React, { useState, useMemo } from "react";
import { EventItem } from "@/data/events";
import { EventCard } from "./EventCard";

interface EventFilterClientProps {
  initialEvents: EventItem[];
  defaultStatus?: "All" | "Upcoming" | "Concluded";
}

export function EventFilterClient({
  initialEvents,
  defaultStatus = "All",
}: EventFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Upcoming" | "Concluded"
  >(defaultStatus);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach((e) => set.add(e.category));
    return ["All", ...Array.from(set)];
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      // 1. Status Filter
      if (statusFilter === "Upcoming" && event.status !== "Upcoming") {
        return false;
      }
      if (statusFilter === "Concluded" && event.status !== "Concluded") {
        return false;
      }

      // 2. Category Filter
      if (categoryFilter !== "All" && event.category !== categoryFilter) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.shortDescription
          .toLowerCase()
          .includes(query);
        const matchesVenue = event.venue.name.toLowerCase().includes(query);
        const matchesTopics = event.agendaOrHighlights.some((h) =>
          h.toLowerCase().includes(query),
        );

        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesTopics) {
          return false;
        }
      }

      return true;
    });
  }, [initialEvents, statusFilter, categoryFilter, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  return (
    <div className="space-y-8">
      {/* Search & Control Filters Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#DDE5DC] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="event-search-input" className="sr-only">
              Search workshops and events
            </label>
            <input
              id="event-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, venue, or keyword..."
              className="w-full px-4 py-2.5 pl-10 text-sm rounded-lg border border-[#DDE5DC] bg-[#F8FAF7] text-[#17231D] placeholder-[#59665D] focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:border-transparent transition-all"
            />
            <span
              className="absolute left-3.5 top-3 text-[#59665D]"
              aria-hidden="true"
            >
              🔍
            </span>
          </div>

          {/* Status Tabs */}
          <div
            className="flex items-center gap-1.5 p-1 bg-[#F8FAF7] rounded-lg border border-[#DDE5DC] self-start md:self-auto"
            role="tablist"
            aria-label="Filter events by temporal status"
          >
            {(["All", "Upcoming", "Concluded"] as const).map((status) => (
              <button
                key={status}
                type="button"
                role="tab"
                aria-selected={statusFilter === status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#73992A] ${
                  statusFilter === status
                    ? "bg-[#004B2A] text-white shadow-xs"
                    : "text-[#59665D] hover:text-[#17231D] hover:bg-white"
                }`}
              >
                {status === "All"
                  ? "All Sessions"
                  : status === "Upcoming"
                    ? "Upcoming"
                    : "Past Archive"}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8F0EB]">
          <span className="text-xs font-semibold text-[#59665D] mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#73992A] ${
                categoryFilter === cat
                  ? "bg-[#E8F0EB] text-[#004B2A] border border-[#73992A] font-bold"
                  : "bg-white text-[#59665D] border border-[#DDE5DC] hover:border-[#73992A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Filter Counter */}
        <div
          role="status"
          aria-live="polite"
          className="text-xs text-[#59665D] flex items-center justify-between"
        >
          <span>
            Showing{" "}
            <strong className="text-[#17231D]">{filteredEvents.length}</strong>{" "}
            of {initialEvents.length} verified events
          </span>
          {(searchQuery ||
            statusFilter !== "All" ||
            categoryFilter !== "All") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#004B2A] hover:underline font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-[#DDE5DC] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#E8F0EB] text-[#004B2A] flex items-center justify-center font-bold text-xl mx-auto">
            📅
          </div>
          <h3 className="text-lg font-bold text-[#17231D] font-heading">
            No Events Match Your Selection
          </h3>
          <p className="text-sm text-[#59665D] max-w-md mx-auto">
            No verified events or workshops were found matching your current
            filter criteria. Try modifying your search term or selecting another
            category.
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
