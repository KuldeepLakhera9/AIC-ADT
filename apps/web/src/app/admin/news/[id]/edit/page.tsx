'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NewsArticleForm, { NewsFormData, NewsInitialData } from '@/components/admin/content/NewsArticleForm';

export default function EditNewsArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<NewsInitialData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadArticle() {
      try {
        const res = await fetch(`/api/content/news/${id}`);
        if (!res.ok) {
          throw new Error('News article could not be loaded.');
        }
        const data = await res.json();
        if (isMounted) {
          setInitialData(data);
          setFetching(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load article.');
          setFetching(false);
        }
      }
    }

    if (id) {
      void loadArticle();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (data: NewsFormData, submitForReview: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        slug: data.slug,
        category: data.category,
        publishDate: data.publishDate,
        sourceAttribution: data.sourceAttribution,
        externalPressLink: data.externalPressLink || undefined,
        locale: data.locale,
        headline: data.headline,
        summary: data.summary,
        content: data.content.split('\n\n').filter(Boolean),
        tags: data.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(`/api/content/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to update news article.');
      }

      if (submitForReview) {
        const reviewRes = await fetch(`/api/content/news/${id}/submit-review?locale=${data.locale}`, {
          method: 'POST',
        });
        if (!reviewRes.ok) {
          const reviewJson = await reviewRes.json();
          throw new Error(reviewJson.message || 'Updated, but review submission failed.');
        }
      }

      router.push('/admin/news');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during update.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-slate-400 animate-pulse">
        Loading article details...
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="p-6 bg-red-950/40 border border-red-800 rounded-xl text-red-200">
        <h2 className="text-base font-bold">Error Loading Article</h2>
        <p className="text-xs mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <NewsArticleForm
        initialData={initialData || undefined}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
