import React from "react";
import Link from "next/link";
import { NewsArticle } from "@/data/news";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article
      className="bg-white rounded-xl border border-[#DDE5DC] overflow-hidden flex flex-col justify-between hover:border-[#73992A] hover:shadow-md transition-all group"
      aria-labelledby={`news-headline-${article.slug}`}
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F0EB] text-[#004B2A] border border-[#73992A]/30">
            {article.category}
          </span>
          <time className="text-xs text-[#59665D] font-medium">
            {article.publishDate}
          </time>
        </div>

        {/* Headline */}
        <h3
          id={`news-headline-${article.slug}`}
          className="text-lg sm:text-xl font-bold text-[#17231D] font-heading leading-snug group-hover:text-[#004B2A] transition-colors"
        >
          <Link href={`/news/${article.slug}`} className="focus:outline-none">
            {article.headline}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-[#59665D] leading-relaxed line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-[#59665D] bg-[#F8FAF7] px-2 py-0.5 rounded border border-[#DDE5DC]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 sm:p-6 bg-[#F8FAF7] border-t border-[#E8F0EB] flex items-center justify-between gap-3">
        <span className="text-xs text-[#59665D] line-clamp-1">
          Source:{" "}
          <strong className="text-[#17231D] font-semibold">
            {article.sourceAttribution}
          </strong>
        </span>

        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#004B2A] hover:text-[#00643A] group-hover:translate-x-0.5 transition-transform shrink-0"
        >
          <span>Read Release</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
