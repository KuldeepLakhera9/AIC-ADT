"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPath,
  getEquivalentPath,
  isMarathiRouteSupported,
} from "@/lib/i18n/routes";
import { Locale, LOCALE_CONFIG } from "@/lib/i18n/config";

interface LanguageSelectorProps {
  className?: string;
  variant?: "topbar" | "drawer";
  currentPath?: string;
  currentLocale?: Locale;
}

export function LanguageSelector({
  className = "",
  variant = "topbar",
  currentPath,
  currentLocale: propLocale,
}: LanguageSelectorProps) {
  const routerPathname = usePathname();
  const pathname = currentPath || routerPathname || "/";
  const currentLocale = propLocale || getLocaleFromPath(pathname);

  // Compute symmetric target routes
  const enHref = getEquivalentPath(pathname, "en");
  const mrTarget = getEquivalentPath(pathname, "mr");

  // If target sub-page is not supported in Marathi, fallback gracefully
  const isDirectlySupported = isMarathiRouteSupported(pathname);
  const mrHref = mrTarget;

  if (variant === "drawer") {
    return (
      <div
        className={`flex items-center gap-2 p-1.5 bg-[#F8FAF7] rounded-lg border border-[#DDE5DC] ${className}`}
        role="group"
        aria-label="Language options"
      >
        <Link
          href={enHref}
          className={`flex-1 py-1.5 px-3 rounded text-center text-xs font-bold transition-all ${
            currentLocale === "en"
              ? "bg-[#004B2A] text-white shadow-2xs"
              : "text-[#59665D] hover:text-[#17231D]"
          }`}
          aria-current={currentLocale === "en" ? "true" : undefined}
          title="Switch to English"
        >
          English
        </Link>
        <Link
          href={mrHref}
          className={`flex-1 py-1.5 px-3 rounded text-center text-xs font-bold font-devanagari transition-all ${
            currentLocale === "mr"
              ? "bg-[#004B2A] text-white shadow-2xs"
              : "text-[#59665D] hover:text-[#17231D]"
          }`}
          aria-current={currentLocale === "mr" ? "true" : undefined}
          title={
            isDirectlySupported
              ? "मराठी आवृत्ती पहा (View in Marathi)"
              : "मराठी मुख्यपृष्ठावर जा (View Marathi Portal)"
          }
        >
          मराठी
        </Link>
      </div>
    );
  }

  // Topbar variant
  return (
    <div
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${className}`}
      role="group"
      aria-label="Language options"
    >
      <Link
        href={enHref}
        className={`px-2 py-0.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] ${
          currentLocale === "en"
            ? "bg-[#004B2A] text-white font-bold"
            : "text-white/80 hover:text-white"
        }`}
        aria-current={currentLocale === "en" ? "true" : undefined}
        title={LOCALE_CONFIG.en.label}
      >
        EN
      </Link>
      <span className="text-white/30" aria-hidden="true">
        /
      </span>
      <Link
        href={mrHref}
        className={`px-2 py-0.5 rounded transition-colors font-devanagari focus:outline-none focus:ring-1 focus:ring-[#73992A] ${
          currentLocale === "mr"
            ? "bg-[#004B2A] text-white font-bold"
            : "text-white/80 hover:text-white"
        }`}
        aria-current={currentLocale === "mr" ? "true" : undefined}
        title={
          isDirectlySupported
            ? "मराठी भाषेत पहा (View in Marathi)"
            : "मराठी पोर्टल (View Marathi Portal)"
        }
      >
        मराठी
      </Link>
    </div>
  );
}
