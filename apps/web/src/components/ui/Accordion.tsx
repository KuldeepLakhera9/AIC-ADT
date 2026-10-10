"use client";

import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className = "",
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={`divide-y divide-[#DDE5DC] border-y border-[#DDE5DC] ${className}`}
    >
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        const headerId = `accordion-header-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="py-2">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex justify-between items-center py-3 text-left font-medium text-[#17231D] hover:text-[#004B2A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] rounded-md min-h-[44px]"
              >
                <span className="text-base font-semibold font-heading pr-4">
                  {item.title}
                </span>
                <span
                  className={`transform transition-transform duration-200 motion-reduce:transition-none text-[#59665D] ${
                    isExpanded ? "rotate-180 text-[#004B2A]" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
              className={`pt-1 pb-4 text-sm text-[#59665D] leading-relaxed ${
                !isExpanded ? "hidden" : ""
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
