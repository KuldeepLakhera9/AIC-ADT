import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NEWS_ARTICLES } from "@/data/news";
import { getPublishedNewsBySlug } from "@/lib/api/public-content";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug, 'en');

  if (!article) {
    return {
      title: "Announcement Not Found | AIC-ADT Baramati Foundation",
    };
  }

  return {
    title: `${article.headline} | AIC-ADT Baramati Foundation`,
    description: article.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug, 'en');

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News & Announcements", href: "/news" },
    { label: article.headline, href: `/news/${article.slug}` },
  ];

  return (
    <div className="bg-[#F8FAF7] min-h-screen py-8 sm:py-12">
      <Container className="space-y-10 sm:space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Editorial Header */}
        <header className="bg-white rounded-2xl border border-[#DDE5DC] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30">
                {article.category}
              </span>
              <time className="text-xs text-[#59665D] font-semibold">
                {article.publishDate}
              </time>
            </div>

            <span className="text-xs text-[#59665D] font-medium">
              Source:{" "}
              <strong className="text-[#17231D]">
                {article.sourceAttribution}
              </strong>
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17231D] font-heading tracking-tight leading-tight">
              {article.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#59665D] leading-relaxed max-w-4xl border-l-4 border-[#73992A] pl-4 italic">
              {article.summary}
            </p>
          </div>

          {/* Key Facts Strip */}
          {article.keyFacts && article.keyFacts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#E8F0EB] text-xs">
              {article.keyFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAF7] p-3.5 rounded-xl border border-[#DDE5DC]"
                >
                  <span className="text-[#59665D] block mb-1">
                    {fact.label}:
                  </span>
                  <strong className="text-[#17231D] font-bold text-sm block">
                    {fact.value}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Body (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <article className="bg-white rounded-xl border border-[#DDE5DC] p-6 sm:p-10 space-y-6">
              <div className="space-y-4 text-base text-[#17231D] leading-relaxed font-normal">
                {article.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-[#E8F0EB] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#59665D]">
                    Topics:
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-[#004B2A] bg-[#E8F0EB] px-2.5 py-1 rounded-full border border-[#73992A]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Verification Footer Note */}
            <div className="bg-white rounded-xl border border-[#DDE5DC] p-6 text-xs text-[#59665D] space-y-2">
              <span className="font-bold text-[#17231D] uppercase tracking-wider block">
                Verification &amp; Provenance
              </span>
              <p className="leading-relaxed">
                This document is a formal public release issued by the AIC-ADT
                Baramati Foundation. Secondary repostings must credit the
                original source: <em>{article.sourceAttribution}</em>.
              </p>
            </div>
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-6">
            {/* External Press Link if available */}
            {article.externalPressLink && (
              <div className="bg-white rounded-xl border-2 border-[#004B2A] p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#73992A] block">
                  Official Portal Reference
                </span>
                <p className="text-xs text-[#59665D] leading-relaxed">
                  Access the primary government portal or associated scheme
                  system referenced in this announcement.
                </p>
                <a
                  href={article.externalPressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#004B2A] text-white font-bold text-xs hover:bg-[#00643A] transition-colors"
                >
                  <span>Visit External Portal</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-[#DDE5DC] p-6 space-y-4 text-xs">
              <h3 className="font-bold text-[#17231D] font-heading text-sm">
                Related Resources
              </h3>
              <ul className="space-y-2.5 text-[#59665D]">
                <li>
                  <Link
                    href="/programs/schemes/startup-india"
                    className="hover:text-[#004B2A] hover:underline"
                  >
                    Startup India Seed Fund Scheme (SISFS) →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/infrastructure/analytical-lab"
                    className="hover:text-[#004B2A] hover:underline"
                  >
                    NABL Analytical Testing Laboratory →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/annual-reports"
                    className="hover:text-[#004B2A] hover:underline"
                  >
                    Annual Progress Reports Archive →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Return link */}
            <div>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#59665D] hover:text-[#004B2A] transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>Return to All News &amp; Announcements</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
