"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { LanguageSelector } from "./LanguageSelector";
import { MAIN_NAV_ITEMS, INSTITUTIONAL_INFO } from "@/config/navigation";

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<
    Record<string, boolean>
  >({});

  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Adjust state during render when route changes (React recommended pattern)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key to close open menus
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (openDropdown) {
          setOpenDropdown(null);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          hamburgerBtnRef.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, isMobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  const toggleMobileCategory = (title: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isCurrentActive = (
    href: string,
    sections?: { items: { href: string }[] }[],
  ) => {
    if (pathname === href) return true;
    if (sections) {
      return sections.some((s) => s.items.some((i) => pathname === i.href));
    }
    return false;
  };

  return (
    <header className="relative w-full z-40" ref={navRef}>
      {/* 1. Top Utility Strip */}
      <div className="bg-[#063D27] text-white py-1.5 text-xs border-b border-[#0A2E1C]">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <span
              className="inline-block w-2 h-2 rounded-full bg-[#73992A] shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">
              Supported by{" "}
              <strong className="font-semibold text-white">
                Atal Innovation Mission (NITI Aayog)
              </strong>{" "}
              | Hosted by ADT Baramati
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-white/90">
            <a
              href={`tel:${INSTITUTIONAL_INFO.helplines.landline}`}
              className="hidden md:inline hover:text-[#73992A] transition-colors focus:outline-none focus:ring-1 focus:ring-[#73992A] rounded px-1"
            >
              Helpline: {INSTITUTIONAL_INFO.helplines.landline}
            </a>
            <span className="hidden md:inline text-white/30" aria-hidden="true">
              |
            </span>
            <LanguageSelector variant="topbar" />
            <span className="text-white/30" aria-hidden="true">
              |
            </span>
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#73992A] text-white hover:bg-[#5C7E1F] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>Portal</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Container>
      </div>

      {/* 2. Primary Institutional Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#DDE5DC] shadow-xs sticky top-0">
        <Container className="flex justify-between items-center py-3.5">
          {/* Institutional Logo Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#73992A] rounded-lg p-1 group shrink-0"
            aria-label="AIC-ADT Baramati Foundation Home"
          >
            <div className="w-11 h-11 rounded-lg bg-[#004B2A] text-white flex flex-col items-center justify-center font-heading shadow-xs group-hover:bg-[#00643A] transition-colors">
              <span className="text-sm font-extrabold tracking-tight leading-none">
                AIC
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-[#73992A] leading-none mt-0.5">
                ADT
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#17231D] font-heading group-hover:text-[#004B2A] transition-colors leading-tight">
                AIC-ADT Baramati Foundation
              </span>
              <span className="text-[11px] sm:text-xs text-[#647067] font-medium leading-tight">
                Centre for AgTech, Biotech & Rural Innovation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const hasSections = item.sections && item.sections.length > 0;
              const isActive = isCurrentActive(item.href, item.sections);
              const isOpen = openDropdown === item.title;

              return (
                <div key={item.title} className="relative">
                  {hasSections ? (
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.title)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] ${
                        isActive
                          ? "text-[#004B2A] font-semibold bg-[#E8F0D9]/40"
                          : "text-[#17231D] hover:text-[#004B2A] hover:bg-[#F8FAF7]"
                      }`}
                    >
                      <span>{item.title}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#73992A] inline-block ml-0.5"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] ${
                        isActive
                          ? "text-[#004B2A] font-semibold bg-[#E8F0D9]/40"
                          : "text-[#17231D] hover:text-[#004B2A] hover:bg-[#F8FAF7]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Mega-Menu / Dropdown Sheet */}
                  {hasSections && isOpen && (
                    <div
                      className={`absolute top-full left-0 mt-2 bg-white rounded-xl border border-[#DDE5DC] shadow-xl p-5 z-50 ${
                        item.sections && item.sections.length > 1
                          ? "w-[560px] grid grid-cols-2 gap-6"
                          : "w-[300px] flex flex-col gap-3"
                      }`}
                      role="menu"
                      aria-label={`${item.title} Submenu`}
                    >
                      {item.sections?.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          {section.heading && (
                            <div className="text-[11px] font-bold uppercase tracking-wider text-[#59665D] border-b border-[#EAEFE8] pb-1 mb-2">
                              {section.heading}
                            </div>
                          )}
                          <ul className="space-y-1.5">
                            {section.items.map((subItem) => (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="group flex flex-col p-2 rounded-lg hover:bg-[#F8FAF7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A]"
                                  role="menuitem"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#17231D] group-hover:text-[#004B2A] transition-colors">
                                      {subItem.title}
                                    </span>
                                    {subItem.badge && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E8F0D9] text-[#004B2A]">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  {subItem.description && (
                                    <span className="text-xs text-[#647067] line-clamp-1 mt-0.5">
                                      {subItem.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/programs/apply-instructions"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:ring-offset-2"
            >
              Apply for Incubation
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/programs/apply-instructions"
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] transition-colors"
            >
              Apply
            </Link>
            <button
              ref={hamburgerBtnRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#17231D] hover:bg-[#F8FAF7] focus:outline-none focus:ring-2 focus:ring-[#73992A]"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </div>

      {/* 3. Mobile Navigation Drawer (Off-Canvas) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop Dimmer */}
          <div
            className="fixed inset-0 bg-[#063D27]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div
            ref={mobileDrawerRef}
            className="fixed inset-y-0 right-0 max-w-[340px] w-full bg-white shadow-2xl flex flex-col z-50 transform transition-transform"
          >
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#DDE5DC] bg-[#F8FAF7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#004B2A] text-white font-bold text-xs flex items-center justify-center font-heading">
                  AIC
                </div>
                <div className="text-xs font-bold text-[#17231D] font-heading">
                  AIC-ADT Baramati
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-[#59665D] hover:bg-[#EAEFE8] focus:outline-none focus:ring-2 focus:ring-[#73992A]"
                aria-label="Close navigation menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {MAIN_NAV_ITEMS.map((item) => {
                const hasSections = item.sections && item.sections.length > 0;
                const isExpanded = expandedMobileCategories[item.title];
                const isActive = isCurrentActive(item.href, item.sections);

                return (
                  <div
                    key={item.title}
                    className="border-b border-[#EAEFE8] pb-1 last:border-b-0"
                  >
                    {hasSections ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleMobileCategory(item.title)}
                          className={`w-full flex items-center justify-between py-2.5 px-2 rounded-md text-sm font-semibold text-left transition-colors ${
                            isActive
                              ? "text-[#004B2A] bg-[#E8F0D9]/40"
                              : "text-[#17231D] hover:bg-[#F8FAF7]"
                          }`}
                          aria-expanded={isExpanded}
                        >
                          <span>{item.title}</span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>

                        {/* Collapsible Submenu */}
                        {isExpanded && (
                          <div className="pl-3 pr-1 py-1 space-y-3 bg-[#F8FAF7] rounded-lg mt-1 mb-2">
                            {item.sections?.map((section, sIdx) => (
                              <div key={sIdx} className="space-y-1">
                                {section.heading && (
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#59665D] pt-1">
                                    {section.heading}
                                  </div>
                                )}
                                <ul className="space-y-1">
                                  {section.items.map((subItem) => (
                                    <li key={subItem.href}>
                                      <Link
                                        href={subItem.href}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className="block py-1.5 px-2 rounded text-xs font-medium text-[#17231D] hover:text-[#004B2A] hover:bg-white transition-colors"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>{subItem.title}</span>
                                          {subItem.badge && (
                                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#E8F0D9] text-[#004B2A] font-bold">
                                              {subItem.badge}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-2.5 px-2 rounded-md text-sm font-semibold ${
                          isActive
                            ? "text-[#004B2A] bg-[#E8F0D9]/40"
                            : "text-[#17231D] hover:bg-[#F8FAF7]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-[#DDE5DC] bg-[#F8FAF7] space-y-3">
              <LanguageSelector variant="drawer" />
              <Link
                href="/programs/apply-instructions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-semibold bg-[#004B2A] text-white hover:bg-[#00643A] shadow-xs text-center"
              >
                Apply for Incubation
              </Link>
              <div className="text-center text-[11px] text-[#647067]">
                Helpline:{" "}
                <a
                  href={`tel:${INSTITUTIONAL_INFO.helplines.landline}`}
                  className="font-semibold text-[#004B2A]"
                >
                  {INSTITUTIONAL_INFO.helplines.landline}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
