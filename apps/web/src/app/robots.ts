import type { MetadataRoute } from "next";
import { getFrontendConfig } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const { appUrl } = getFrontendConfig();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/design-system"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
