import React from "react";
import { getFrontendConfig } from "@/config/env";

export interface BreadcrumbJsonLdItem {
  name: string;
  item: string;
}

export interface BreadcrumbJsonLdProps {
  items: BreadcrumbJsonLdItem[];
}

/**
 * Renders verified Schema.org Organization structured data for AIC-ADT Baramati Foundation.
 * Does not include fabricated ratings, fake reviews, speculative awards, or unverified claims.
 */
export function OrganizationJsonLd() {
  const { appUrl } = getFrontendConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${appUrl}#organization`,
    name: "AIC-ADT Baramati Foundation",
    alternateName: [
      "Atal Incubation Centre - Agricultural Development Trust",
      "AIC-ADT Baramati",
      "एआयसी-एडीटी बारामती फाउंडेशन",
    ],
    url: appUrl,
    logo: `${appUrl}/favicon.ico`,
    description:
      "Official incubation centre established by Agricultural Development Trust, Baramati and supported by Atal Innovation Mission (AIM), NITI Aayog, Government of India, promoting agritech, biotechnology, and rural entrepreneurship.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Agricultural Development Trust Campus, Shardanagar, Malegaon Colony",
      addressLocality: "Baramati",
      addressRegion: "Maharashtra",
      postalCode: "413115",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.1549",
      longitude: "74.5808",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9404984566",
        contactType: "incubation admissions & support",
        areaServed: "IN",
        availableLanguage: ["en", "mr", "hi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-2112-255517",
        contactType: "campus reception",
        areaServed: "IN",
        availableLanguage: ["en", "mr", "hi"],
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Agricultural Development Trust, Baramati",
      url: "https://adtbaramati.com",
    },
    funder: {
      "@type": "GovernmentOrganization",
      name: "Atal Innovation Mission, NITI Aayog, Government of India",
      url: "https://aim.gov.in",
    },
    knowsAbout: [
      "Agricultural Technology",
      "Biotechnology",
      "Precision Farming",
      "Food Processing",
      "Soil Analysis",
      "Startup Incubation",
      "Living Lab Testing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Renders verified Schema.org WebSite structured data.
 */
export function WebSiteJsonLd() {
  const { appUrl } = getFrontendConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${appUrl}#website`,
    name: "AIC-ADT Baramati Foundation",
    url: appUrl,
    inLanguage: ["en-IN", "mr-IN"],
    publisher: {
      "@id": `${appUrl}#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Renders verified Schema.org BreadcrumbList structured data for deep pages.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const { appUrl } = getFrontendConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http")
        ? crumb.item
        : `${appUrl}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
