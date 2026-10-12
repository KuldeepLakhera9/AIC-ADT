import React from "react";
import { Badge } from "@/components/ui/Badge";
import type { InnovationShowcaseItem } from "@/data/innovation";

interface InnovationShowcaseCardProps {
  item: InnovationShowcaseItem;
}

export function InnovationShowcaseCard({ item }: InnovationShowcaseCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-[#DDE5DC] p-6 lg:p-7 shadow-2xs hover:shadow-md transition-shadow group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-2xl p-2.5 bg-[#F8FAF7] rounded-xl border border-[#DDE5DC]">
            {item.icon}
          </span>
          <Badge variant={item.statusBadgeVariant}>{item.status}</Badge>
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors">
          {item.title}
        </h3>

        <div className="text-xs font-semibold text-[#73992A] mt-1">
          {item.category} • {item.attribution.type}
        </div>

        <p className="text-xs sm:text-sm text-[#647067] mt-3 leading-relaxed">
          {item.shortDescription}
        </p>

        <div className="mt-4 p-3 rounded-xl bg-[#F8FAF7] border border-[#EAEFE8] space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D]">
            Attribution &amp; Source
          </div>
          <div className="text-xs font-semibold text-[#17231D]">
            {item.attribution.leadEntity}
          </div>
          {item.attribution.collaborator && (
            <div className="text-[11px] text-[#647067]">
              {item.attribution.collaborator}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#EAEFE8]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D] mb-1.5">
            Technical Parameters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {item.specifications.slice(0, 2).map((spec) => (
              <div
                key={spec.label}
                className="bg-white p-2 rounded border border-[#EAEFE8]"
              >
                <div className="text-[10px] text-[#647067] uppercase font-semibold">
                  {spec.label}
                </div>
                <div className="text-xs font-bold text-[#17231D] line-clamp-1">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#EAEFE8] flex items-center justify-between text-[11px] text-[#59665D]">
        <span>Location: {item.fieldLocation.split("•")[0]?.trim()}</span>
        <span className="font-semibold text-[#004B2A]">
          Empirically Verified
        </span>
      </div>
    </div>
  );
}
