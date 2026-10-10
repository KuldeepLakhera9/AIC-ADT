import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 text-xs text-[#59665D] ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link
            href="/"
            className="hover:text-[#004B2A] transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded px-1"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <span className="text-[#DDE5DC] select-none" aria-hidden="true">
                /
              </span>
              {isLast || !item.href ? (
                <span
                  className="font-medium text-[#17231D]"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#004B2A] transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded px-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
