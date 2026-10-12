import React from "react";
import Link from "next/link";
import { PublicationItem } from "@/data/publications";

interface PublicationCardProps {
  publication: PublicationItem;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const isAvailableOnline = publication.file.isAvailableOnline;

  return (
    <article
      className="bg-white rounded-xl border border-[#DDE5DC] overflow-hidden flex flex-col justify-between hover:border-[#73992A] hover:shadow-md transition-all group"
      aria-labelledby={`pub-title-${publication.id}`}
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Category & Period Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30">
            {publication.category}
          </span>
          <span className="text-xs text-[#59665D] font-medium">
            {publication.reportingPeriod || publication.publishDate}
          </span>
        </div>

        {/* Title */}
        <h3
          id={`pub-title-${publication.id}`}
          className="text-lg sm:text-xl font-bold text-[#17231D] font-heading leading-snug group-hover:text-[#004B2A] transition-colors"
        >
          {publication.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[#59665D] leading-relaxed line-clamp-3">
          {publication.summary}
        </p>

        {/* Highlights */}
        {publication.keyHighlights && publication.keyHighlights.length > 0 && (
          <div className="pt-2 border-t border-[#E8F0EB]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#59665D] block mb-2">
              Key Focus Highlights:
            </span>
            <ul className="space-y-1.5 text-xs text-[#59665D]">
              {publication.keyHighlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#73992A] font-bold shrink-0">✓</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer with Document Metadata & Download/Action Button */}
      <div className="p-5 sm:p-6 bg-[#F8FAF7] border-t border-[#E8F0EB] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#59665D]">
          <div className="flex items-center gap-1.5 font-semibold">
            <span aria-hidden="true">📄</span>
            <span>
              {publication.file.fileType} • {publication.file.fileSize}
            </span>
            {publication.file.pageCount && (
              <span className="text-[#59665D]/70">
                ({publication.file.pageCount} pp.)
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#004B2A] font-semibold bg-white px-2 py-0.5 rounded border border-[#DDE5DC]">
            {publication.verificationBadge}
          </span>
        </div>

        <div className="pt-1">
          {isAvailableOnline ? (
            <a
              href={publication.file.url}
              download={publication.file.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#004B2A] text-white font-semibold text-xs hover:bg-[#00643A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A]"
            >
              <span>Download Official {publication.file.fileType}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <Link
              href={publication.relatedRoute || "/contact"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#DDE5DC] text-[#17231D] font-semibold text-xs hover:bg-[#E8F0EB] hover:text-[#004B2A] hover:border-[#004B2A] transition-colors"
            >
              <span>Request Copy via Institutional Desk</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
