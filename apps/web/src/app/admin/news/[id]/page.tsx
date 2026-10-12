'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface NewsArticleDetail {
  id: string;
  slug: string;
  category: string;
  publishDate: string;
  sourceAttribution?: string | null;
  externalPressLink?: string | null;
  authorId?: string;
  currentVersion: number;
  author?: {
    fullName: string;
    email: string;
  } | null;
  translations: Array<{
    id?: string;
    locale: string;
    headline: string;
    summary: string;
    bodyMarkdown?: string;
    content?: unknown;
    tags?: string[];
    status: string;
    reviewerNotes?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    submittedAt?: string | null;
    publishedAt?: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function NewsArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<NewsArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/content/news/${id}`);
        if (!res.ok) {
          throw new Error('News article could not be retrieved.');
        }
        const data = await res.json();
        if (isMounted) {
          setArticle(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error retrieving article.');
          setLoading(false);
        }
      }
    }

    if (id) {
      void fetchArticle();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmitForReview = async () => {
    if (!window.confirm('Submit this draft for editorial review?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/news/${id}/submit-review?locale=en`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Submission failed.');
      }
      const updated = await res.json();
      setArticle(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!window.confirm('Archive this news announcement?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/news/${id}/archive?locale=en`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Archive failed.');
      }
      const updated = await res.json();
      setArticle(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!window.confirm('Restore this announcement to DRAFT?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/content/news/${id}/restore?locale=en`, {
        method: 'POST',
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Restore failed.');
      }
      const updated = await res.json();
      setArticle(updated);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 animate-pulse">
        Loading article details...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200">
        <h2 className="text-base font-bold">Article Unavailable</h2>
        <p className="text-xs mt-1">{error || 'Record not found.'}</p>
        <Link
          href="/admin/news"
          className="mt-4 inline-block px-4 py-1.5 bg-slate-800 text-slate-200 rounded text-xs"
        >
          ← Back to News Listing
        </Link>
      </div>
    );
  }

  const translation = article.translations?.[0];
  const status = translation?.status || 'DRAFT';

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'PUBLISHED':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40';
      case 'IN_REVIEW':
        return 'bg-amber-950/80 text-amber-300 border-amber-600/40';
      case 'APPROVED':
        return 'bg-blue-950/80 text-blue-300 border-blue-600/40';
      case 'ARCHIVED':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            title="Back to News List"
          >
            ← Back
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${getStatusBadge(status)}`}>
                {status}
              </span>
              <span className="text-xs font-mono text-slate-400">v{article.currentVersion}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-emerald-400">/{article.slug}</span>
            </div>
            <h1 className="text-lg font-bold text-white mt-1">
              {translation?.headline || article.slug}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {status === 'DRAFT' && (
            <>
              <Link
                href={`/admin/news/${article.id}/edit`}
                className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors"
              >
                Edit Draft
              </Link>
              <button
                type="button"
                onClick={handleSubmitForReview}
                disabled={actionLoading}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
              >
                Submit for Review →
              </button>
            </>
          )}

          {status === 'ARCHIVED' && (
            <button
              type="button"
              onClick={handleRestore}
              disabled={actionLoading}
              className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition-colors"
            >
              Restore to Draft
            </button>
          )}

          {status !== 'ARCHIVED' && (
            <button
              type="button"
              onClick={handleArchive}
              disabled={actionLoading}
              className="px-3 py-1.5 rounded-lg border border-red-900/60 bg-red-950/30 text-red-300 hover:bg-red-900/50 text-xs font-semibold transition-colors"
            >
              Archive
            </button>
          )}
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content Body */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Summary
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {translation?.summary}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Full Content Body
            </h2>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              {Array.isArray(translation?.content) ? (
                translation.content.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                <p>{String(translation?.content || '')}</p>
              )}
            </div>
          </div>

          {translation?.tags && translation.tags.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Tags
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {translation.tags.map((t: string) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Metadata Cards */}
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3.5 text-xs">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
              Article Properties
            </h2>

            <div>
              <span className="text-slate-400 block text-[11px]">Category</span>
              <span className="text-white font-medium">{article.category}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Source Attribution</span>
              <span className="text-white font-medium">{article.sourceAttribution}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Publication Date</span>
              <span className="text-white font-mono">
                {new Date(article.publishDate).toLocaleDateString()}
              </span>
            </div>

            {article.author && (
              <div>
                <span className="text-slate-400 block text-[11px]">Author</span>
                <span className="text-white font-medium">{article.author.fullName}</span>
                <span className="text-[10px] text-slate-400 block font-mono">{article.author.email}</span>
              </div>
            )}

            {article.externalPressLink && (
              <div>
                <span className="text-slate-400 block text-[11px]">External Press Coverage</span>
                <a
                  href={article.externalPressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline break-all"
                >
                  {article.externalPressLink} ↗
                </a>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              Created: {new Date(article.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
