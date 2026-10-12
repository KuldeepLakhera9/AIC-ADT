import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { ProgramCore } from "@/data/programs";

interface ProgramCardProps {
  program: ProgramCore;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const statusVariant =
    program.status === "Active Intake"
      ? "botanical"
      : program.status === "Rolling Review"
        ? "leaf"
        : "neutral";

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 lg:p-7 shadow-2xs hover:shadow-md transition-shadow group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={statusVariant}>{program.status}</Badge>
          <span className="text-xs font-semibold text-[#59665D]">
            {program.duration}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
          {program.name}
        </h3>

        <div className="text-xs font-semibold text-[#73992A] mt-1">
          {program.stage} • {program.trlLevel}
        </div>

        <p className="text-xs sm:text-sm text-[#647067] mt-3 line-clamp-3 leading-relaxed">
          {program.summary}
        </p>

        <div className="mt-5 pt-4 border-t border-[#EAEFE8] space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
            Key Program Offerings
          </div>
          <ul className="space-y-1 text-xs text-[#17231D]">
            {program.offerings.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#004B2A] font-bold">•</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#EAEFE8] flex items-center justify-between gap-3">
        <Link
          href={`/programs/${program.slug}`}
          className="text-xs font-bold text-[#004B2A] hover:text-[#73992A] transition-colors inline-flex items-center gap-1 min-h-[44px]"
        >
          <span>View Curriculum &amp; Eligibility</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href={program.ctaHref}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors min-h-[44px]"
        >
          {program.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
