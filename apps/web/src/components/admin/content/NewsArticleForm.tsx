'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface NewsFormData {
  slug: string;
  category: string;
  publishDate: string;
  sourceAttribution: string;
  externalPressLink?: string;
  locale: string;
  headline: string;
  summary: string;
  content: string;
  tags: string;
}

export interface NewsInitialData {
  id: string;
  slug: string;
  category: string;
  publishDate: string;
  sourceAttribution: string;
  externalPressLink?: string | null;
  translations: Array<{
    locale: string;
    headline: string;
    summary: string;
    content: unknown;
    tags: string[];
    status: string;
  }>;
}

interface NewsArticleFormProps {
  initialData?: NewsInitialData;
  onSubmit: (data: NewsFormData, submitForReview: boolean) => Promise<void>;
  loading: boolean;
  error?: string | null;
}

export default function NewsArticleForm({
  initialData,
  onSubmit,
  loading,
  error,
}: NewsArticleFormProps) {
  const currentTranslation = initialData?.translations?.[0];

  const [formData, setFormData] = useState<NewsFormData>({
    slug: initialData?.slug || '',
    category: initialData?.category || 'OFFICIAL_ANNOUNCEMENT',
    publishDate: initialData?.publishDate
      ? new Date(initialData.publishDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    sourceAttribution: initialData?.sourceAttribution || 'AIC-ADT Baramati Communications Office',
    externalPressLink: initialData?.externalPressLink || '',
    locale: currentTranslation?.locale || 'en',
    headline: currentTranslation?.headline || '',
    summary: currentTranslation?.summary || '',
    content: Array.isArray(currentTranslation?.content)
      ? currentTranslation.content.join('\n\n')
      : typeof currentTranslation?.content === 'string'
      ? currentTranslation.content
      : '',
    tags: currentTranslation?.tags ? currentTranslation.tags.join(', ') : '',
  });

  const [isDirty, setIsDirty] = useState(false);
  const [showReviewConfirm, setShowReviewConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Auto-slugify when creating new article
  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const headline = e.target.value;
    setIsDirty(true);
    setFormData((prev) => {
      const shouldAutoSlug = !initialData && (!prev.slug || prev.slug === slugify(prev.headline));
      return {
        ...prev,
        headline,
        slug: shouldAutoSlug ? slugify(headline) : prev.slug,
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.headline.trim()) {
      errs.headline = 'Headline is required (minimum 5 characters).';
    } else if (formData.headline.trim().length < 5) {
      errs.headline = 'Headline must be at least 5 characters.';
    }

    if (!formData.slug.trim()) {
      errs.slug = 'URL slug is required.';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug.trim())) {
      errs.slug = 'Slug must only contain lowercase letters, numbers, and hyphens.';
    }

    if (!formData.summary.trim()) {
      errs.summary = 'Summary is required (minimum 10 characters).';
    } else if (formData.summary.trim().length < 10) {
      errs.summary = 'Summary must be at least 10 characters.';
    }

    if (!formData.content.trim()) {
      errs.content = 'Content body paragraphs are required.';
    }

    if (!formData.sourceAttribution.trim()) {
      errs.sourceAttribution = 'Source attribution is required.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData, false);
    setIsDirty(false);
  };

  const handleConfirmSubmitReview = async () => {
    setShowReviewConfirm(false);
    if (!validate()) return;
    await onSubmit(formData, true);
    setIsDirty(false);
  };

  return (
    <form className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {initialData ? 'Edit News Announcement' : 'Author News Announcement'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {initialData
              ? `Editing revision v${initialData.translations?.[0]?.status || 'DRAFT'}`
              : 'Create a draft press release or official announcement.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            onClick={(e) => {
              if (isDirty && !window.confirm('You have unsaved changes. Discard and leave?')) {
                e.preventDefault();
              }
            }}
            className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors flex items-center gap-2"
          >
            {loading ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            type="button"
            onClick={() => {
              if (validate()) setShowReviewConfirm(true);
            }}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors flex items-center gap-2 shadow-sm"
          >
            Submit for Review →
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800 rounded-xl text-red-200 text-xs flex items-center gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Core Content */}
        <div className="lg:col-span-2 space-y-5 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div>
            <label htmlFor="headline" className="block text-xs font-semibold text-slate-200 mb-1.5">
              Headline *
            </label>
            <input
              id="headline"
              name="headline"
              type="text"
              value={formData.headline}
              onChange={handleHeadlineChange}
              placeholder="e.g., AIC-ADT Baramati Sanctions 15 New Agritech Grants under SISFS"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {validationErrors.headline && (
              <p className="text-[11px] text-red-400 mt-1">{validationErrors.headline}</p>
            )}
          </div>

          <div>
            <label htmlFor="slug" className="block text-xs font-semibold text-slate-200 mb-1.5">
              URL Slug *
            </label>
            <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 overflow-hidden">
              <span className="px-3 text-xs font-mono text-slate-500 bg-slate-850 select-none">
                /news/
              </span>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                placeholder="sisfs-seed-fund-call"
                className="flex-1 px-3 py-2.5 bg-transparent text-white text-xs font-mono focus:outline-none"
              />
            </div>
            {validationErrors.slug && (
              <p className="text-[11px] text-red-400 mt-1">{validationErrors.slug}</p>
            )}
          </div>

          <div>
            <label htmlFor="summary" className="block text-xs font-semibold text-slate-200 mb-1.5">
              Short Summary / Teaser *
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              value={formData.summary}
              onChange={handleChange}
              placeholder="A concise synopsis of the institutional announcement (appears on listing cards and search previews)."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
            {validationErrors.summary && (
              <p className="text-[11px] text-red-400 mt-1">{validationErrors.summary}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-xs font-semibold text-slate-200 mb-1.5">
              Article Content (Markdown / Paragraphs) *
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              value={formData.content}
              onChange={handleChange}
              placeholder="Full text of the announcement. Separate paragraphs with double newlines."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
            {validationErrors.content && (
              <p className="text-[11px] text-red-400 mt-1">{validationErrors.content}</p>
            )}
          </div>
        </div>

        {/* Right 1 Column: Metadata & Settings */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
              Taxonomy & Classification
            </h2>

            <div>
              <label htmlFor="category" className="block text-xs font-semibold text-slate-200 mb-1.5">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="OFFICIAL_ANNOUNCEMENT">Official Announcement</option>
                <option value="FUNDING_MILESTONE">Funding Milestone</option>
                <option value="INFRASTRUCTURE">Infrastructure & Labs</option>
                <option value="ECOSYSTEM_PARTNERSHIP">Ecosystem Partnership</option>
              </select>
            </div>

            <div>
              <label htmlFor="locale" className="block text-xs font-semibold text-slate-200 mb-1.5">
                Language Edition *
              </label>
              <select
                id="locale"
                name="locale"
                value={formData.locale}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="en">English (Primary)</option>
                <option value="mr">Marathi (मराठी)</option>
              </select>
            </div>

            <div>
              <label htmlFor="publishDate" className="block text-xs font-semibold text-slate-200 mb-1.5">
                Publication Date
              </label>
              <input
                id="publishDate"
                name="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="sourceAttribution" className="block text-xs font-semibold text-slate-200 mb-1.5">
                Source Attribution *
              </label>
              <input
                id="sourceAttribution"
                name="sourceAttribution"
                type="text"
                value={formData.sourceAttribution}
                onChange={handleChange}
                placeholder="AIC-ADT Communications Office"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {validationErrors.sourceAttribution && (
                <p className="text-[11px] text-red-400 mt-1">{validationErrors.sourceAttribution}</p>
              )}
            </div>

            <div>
              <label htmlFor="externalPressLink" className="block text-xs font-semibold text-slate-200 mb-1.5">
                External Press Link (Optional)
              </label>
              <input
                id="externalPressLink"
                name="externalPressLink"
                type="url"
                value={formData.externalPressLink}
                onChange={handleChange}
                placeholder="https://pib.gov.in/..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-xs font-semibold text-slate-200 mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="SISFS, Seed Fund, Agritech"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Review Submission */}
      {showReviewConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Submit for Editorial Review?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Submitting transitions this article to the <strong>IN_REVIEW</strong> queue.
              You will not be able to edit this draft until a reviewer approves or requests revisions.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowReviewConfirm(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmitReview}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
