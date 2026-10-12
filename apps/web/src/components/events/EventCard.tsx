import React from "react";
import Link from "next/link";
import { EventItem } from "@/data/events";

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const isUpcoming = event.status === "Upcoming";

  return (
    <article
      className="bg-white rounded-xl border border-[#DDE5DC] overflow-hidden flex flex-col hover:border-[#73992A] hover:shadow-md transition-all group"
      aria-labelledby={`event-title-${event.slug}`}
    >
      {/* Top Banner with Date & Status */}
      <div className="p-5 sm:p-6 border-b border-[#E8F0EB] bg-[#F8FAF7] flex items-start justify-between gap-4">
        {/* Date Box */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#004B2A] text-white font-heading font-extrabold shadow-2xs">
            <span className="text-lg leading-none">{event.date.day}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#E8F0EB] mt-0.5">
              {event.date.month}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#59665D] uppercase tracking-wider block">
              {event.date.year}
            </span>
            <span className="text-xs font-semibold text-[#17231D]">
              {event.date.formatted}
            </span>
            {event.date.time && (
              <span className="text-[11px] text-[#59665D] block">
                {event.date.time}
              </span>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
              isUpcoming
                ? "bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            {isUpcoming ? "● Upcoming" : "Concluded"}
          </span>
          <span className="text-[11px] font-semibold text-[#59665D]">
            {event.category}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <h3
            id={`event-title-${event.slug}`}
            className="text-lg sm:text-xl font-bold text-[#17231D] font-heading leading-snug group-hover:text-[#004B2A] transition-colors"
          >
            <Link href={`/events/${event.slug}`} className="focus:outline-none">
              {event.title}
            </Link>
          </h3>

          <p className="text-sm text-[#59665D] leading-relaxed line-clamp-3">
            {event.shortDescription}
          </p>

          {/* Venue & Organizer Details */}
          <div className="pt-2 border-t border-[#E8F0EB] space-y-1.5 text-xs text-[#59665D]">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#17231D] shrink-0">
                Venue:
              </span>
              <span className="line-clamp-1">{event.venue.name}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#17231D] shrink-0">
                Format:
              </span>
              <span>{event.venue.type}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Action */}
        <div className="pt-4 border-t border-[#E8F0EB] flex items-center justify-between gap-3">
          <span className="text-xs text-[#59665D] italic line-clamp-1">
            {event.registration.statusNote}
          </span>

          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:text-[#00643A] group-hover:translate-x-0.5 transition-transform shrink-0"
          >
            <span>View Details</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
