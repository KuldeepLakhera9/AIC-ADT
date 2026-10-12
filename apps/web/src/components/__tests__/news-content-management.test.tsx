import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useParams: () => ({
    id: "news-123",
  }),
  usePathname: () => "/admin/news",
}));

import NewsArticleForm from "../admin/content/NewsArticleForm";
import AdminNewsPage from "../../app/admin/news/page";
import NewsArticleDetailPage from "../../app/admin/news/[id]/page";

describe("Content Management Foundation: News Module UI Verification", () => {
  it("renders NewsArticleForm with accessible labels, input controls, and action buttons", () => {
    const html = renderToStaticMarkup(
      <NewsArticleForm
        onSubmit={async () => {}}
        loading={false}
      />,
    );

    expect(html).toContain("Headline *");
    expect(html).toContain("URL Slug *");
    expect(html).toContain("Short Summary / Teaser *");
    expect(html).toContain("Article Content");
    expect(html).toContain("Category *");
    expect(html).toContain("Language Edition *");
    expect(html).toContain("Save Draft");
    expect(html).toContain("Submit for Review");
  });

  it("renders NewsArticleForm populated with existing draft data in edit mode", () => {
    const sampleArticle = {
      id: "news-456",
      slug: "agritech-incubation-call",
      category: "FUNDING_MILESTONE",
      publishDate: "2026-10-15T00:00:00.000Z",
      sourceAttribution: "AIC-ADT Communications",
      translations: [
        {
          locale: "en",
          headline: "New Agritech Incubation Call 2026",
          summary: "Summary of incubation cohort.",
          content: ["Paragraph 1", "Paragraph 2"],
          tags: ["Agritech", "SISFS"],
          status: "DRAFT",
        },
      ],
    };

    const html = renderToStaticMarkup(
      <NewsArticleForm
        initialData={sampleArticle}
        onSubmit={async () => {}}
        loading={false}
      />,
    );

    expect(html).toContain("Edit News Announcement");
    expect(html).toContain("New Agritech Incubation Call 2026");
    expect(html).toContain("agritech-incubation-call");
    expect(html).toContain("Summary of incubation cohort.");
  });

  it("renders AdminNewsPage with search toolbar, category and status filters", () => {
    const html = renderToStaticMarkup(<AdminNewsPage />);

    expect(html).toContain("News &amp; Announcements Management");
    expect(html).toContain("Draft News Article");
    expect(html).toContain("Search");
    expect(html).toContain("Category");
    expect(html).toContain("Workflow Status");
    expect(html).toContain("All Categories");
    expect(html).toContain("All Statuses");
  });

  it("renders NewsArticleDetailPage with loading state and article container", () => {
    const html = renderToStaticMarkup(<NewsArticleDetailPage />);
    expect(html).toContain("Loading article details...");
  });
});
