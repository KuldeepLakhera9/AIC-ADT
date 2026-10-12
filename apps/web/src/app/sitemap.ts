import type { MetadataRoute } from "next";
import { getFrontendConfig } from "@/config/env";
import { VERIFIED_STARTUPS_DIRECTORY } from "@/data/startups";
import { EVENTS_DATA } from "@/data/events";
import { NEWS_ARTICLES } from "@/data/news";
import { INFRASTRUCTURE_MASTER_DATA } from "@/data/institutional";

export default function sitemap(): MetadataRoute.Sitemap {
  const { appUrl } = getFrontendConfig();
  const currentDate = new Date().toISOString();

  // 1. Core English Landing Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${appUrl}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${appUrl}/`,
          mr: `${appUrl}/mr`,
        },
      },
    },
    {
      url: `${appUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/about`,
          mr: `${appUrl}/mr/about`,
        },
      },
    },
    {
      url: `${appUrl}/programs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/programs`,
          mr: `${appUrl}/mr/programs`,
        },
      },
    },
    {
      url: `${appUrl}/startups`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/startups`,
          mr: `${appUrl}/mr/startups`,
        },
      },
    },
    {
      url: `${appUrl}/innovation`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/innovation`,
          mr: `${appUrl}/mr/innovation`,
        },
      },
    },
    {
      url: `${appUrl}/events`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/events`,
          mr: `${appUrl}/mr/events`,
        },
      },
    },
    {
      url: `${appUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/resources`,
          mr: `${appUrl}/mr/resources`,
        },
      },
    },
    {
      url: `${appUrl}/news`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${appUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/contact`,
          mr: `${appUrl}/mr/contact`,
        },
      },
    },
  ];

  // 2. Institutional Sub-Routes
  const institutionalSubpages: MetadataRoute.Sitemap = [
    "/about/mission-vision",
    "/about/leadership",
    "/about/infrastructure",
    "/about/partners",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Infrastructure facility detail pages
  const facilityPages: MetadataRoute.Sitemap =
    INFRASTRUCTURE_MASTER_DATA.facilities.map((facility) => ({
      url: `${appUrl}/about/infrastructure/${facility.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // 3. Program Continuum & Funding Sub-Routes
  const programSubpages: MetadataRoute.Sitemap = [
    "/programs/pre-incubation",
    "/programs/incubation",
    "/programs/acceleration",
    "/programs/mentorship",
    "/programs/training",
    "/programs/apply-instructions",
    "/programs/schemes/startup-india",
    "/programs/schemes/meity-genesis",
    "/programs/schemes/csr",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Startup Portfolio Dynamic Routes
  const startupPages: MetadataRoute.Sitemap = [
    {
      url: `${appUrl}/startups/success-stories`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...VERIFIED_STARTUPS_DIRECTORY.map((startup) => ({
      url: `${appUrl}/startups/${startup.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // 5. Innovation Research Domains
  const innovationPages: MetadataRoute.Sitemap = [
    "/innovation/agri-tech",
    "/innovation/smart-farming",
    "/innovation/food-processing",
    "/innovation/agribusiness",
    "/innovation/climate-tech",
    "/innovation/digital-agri-ai",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 6. Events Detail Pages
  const eventPages: MetadataRoute.Sitemap = [
    {
      url: `${appUrl}/events/past`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...EVENTS_DATA.map((event) => ({
      url: `${appUrl}/events/${event.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // 7. News Announcement Detail Pages
  const newsPages: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => ({
    url: `${appUrl}/news/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 8. Resources Sub-Routes
  const resourcePages: MetadataRoute.Sitemap = [
    "/resources/annual-reports",
    "/resources/publications",
    "/resources/program-guidelines",
    "/resources/policies-downloads",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 9. Contact Sub-Routes
  const contactPages: MetadataRoute.Sitemap = [
    "/contact/partnerships",
    "/contact/directions",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 10. Legal & Compliance Pages
  const legalPages: MetadataRoute.Sitemap = [
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${appUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  // 11. Dedicated Marathi Mirror Pages
  const marathiMirrorPages: MetadataRoute.Sitemap = [
    {
      url: `${appUrl}/mr`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${appUrl}/`,
          mr: `${appUrl}/mr`,
        },
      },
    },
    {
      url: `${appUrl}/mr/about`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/about`,
          mr: `${appUrl}/mr/about`,
        },
      },
    },
    {
      url: `${appUrl}/mr/programs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/programs`,
          mr: `${appUrl}/mr/programs`,
        },
      },
    },
    {
      url: `${appUrl}/mr/startups`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/startups`,
          mr: `${appUrl}/mr/startups`,
        },
      },
    },
    {
      url: `${appUrl}/mr/innovation`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/innovation`,
          mr: `${appUrl}/mr/innovation`,
        },
      },
    },
    {
      url: `${appUrl}/mr/events`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/events`,
          mr: `${appUrl}/mr/events`,
        },
      },
    },
    {
      url: `${appUrl}/mr/resources`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/resources`,
          mr: `${appUrl}/mr/resources`,
        },
      },
    },
    {
      url: `${appUrl}/mr/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${appUrl}/contact`,
          mr: `${appUrl}/mr/contact`,
        },
      },
    },
  ];

  return [
    ...corePages,
    ...institutionalSubpages,
    ...facilityPages,
    ...programSubpages,
    ...startupPages,
    ...innovationPages,
    ...eventPages,
    ...newsPages,
    ...resourcePages,
    ...contactPages,
    ...legalPages,
    ...marathiMirrorPages,
  ];
}
