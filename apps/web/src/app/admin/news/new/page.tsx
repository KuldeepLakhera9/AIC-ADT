'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsArticleForm, { NewsFormData } from '@/components/admin/content/NewsArticleForm';

export default function NewNewsArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch('/api/content/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to create news article.');
      }

      const createdId = json.id;

      if (submitForReview && createdId) {
        const reviewRes = await fetch(`/api/content/news/${createdId}/submit-review?locale=${data.locale}`, {
          method: 'POST',
        });
        if (!reviewRes.ok) {
          const reviewJson = await reviewRes.json();
          throw new Error(reviewJson.message || 'Created as draft, but review submission failed.');
        }
      }

      router.push('/admin/news');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during submission.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <NewsArticleForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
