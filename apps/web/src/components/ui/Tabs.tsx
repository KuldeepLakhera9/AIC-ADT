"use client";

import React, { useState, useRef } from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  ariaLabel: string;
  className?: string;
}

export function Tabs({
  items,
  defaultTabId,
  onChange,
  ariaLabel,
  className = "",
}: TabsProps) {
  const [activeId, setActiveId] = useState<string>(
    defaultTabId || (items[0]?.id ?? ""),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const enabledItems = items
      .map((item, idx) => ({ ...item, idx }))
      .filter((item) => !item.disabled);
    const enabledCurrentPos = enabledItems.findIndex(
      (item) => item.idx === currentIndex,
    );

    if (enabledCurrentPos === -1) return;

    let targetItemIndex: number | null = null;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextPos = (enabledCurrentPos + 1) % enabledItems.length;
      targetItemIndex = enabledItems[nextPos].idx;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevPos =
        (enabledCurrentPos - 1 + enabledItems.length) % enabledItems.length;
      targetItemIndex = enabledItems[prevPos].idx;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetItemIndex = enabledItems[0].idx;
    } else if (e.key === "End") {
      e.preventDefault();
      targetItemIndex = enabledItems[enabledItems.length - 1].idx;
    }

    if (targetItemIndex !== null) {
      const targetItem = items[targetItemIndex];
      handleSelect(targetItem.id);
      tabRefs.current[targetItemIndex]?.focus();
    }
  };

  const activeContent = items.find((item) => item.id === activeId)?.content;

  return (
    <div className={`w-full ${className}`}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-center gap-1 border-b border-[#DDE5DC] overflow-x-auto"
      >
        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-controls={`tabpanel-${item.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap min-h-[44px] flex items-center
                focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:ring-offset-2 rounded-t
                ${
                  isActive
                    ? "border-[#004B2A] text-[#004B2A] font-semibold"
                    : "border-transparent text-[#59665D] hover:text-[#17231D] hover:border-[#DDE5DC]"
                }
                ${item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`tabpanel-${activeId}`}
        aria-labelledby={`tab-${activeId}`}
        tabIndex={0}
        className="pt-6 focus:outline-none"
      >
        {activeContent}
      </div>
    </div>
  );
}
