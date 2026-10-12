import type { Metadata } from "next";
import { Outfit, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getFrontendConfig } from "@/config/env";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

const { appUrl } = getFrontendConfig();

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default:
      "AIC-ADT Baramati Foundation | Agricultural Deep-Tech Incubation Centre",
    template: "%s | AIC-ADT Baramati Foundation",
  },
  description:
    "Official digital platform of Atal Incubation Centre - Agricultural Development Trust (AIC-ADT) Baramati Foundation. Supported by AIM, NITI Aayog.",
  applicationName: "AIC-ADT Baramati Foundation",
  authors: [{ name: "AIC-ADT Baramati Foundation", url: appUrl }],
  creator: "AIC-ADT Baramati Foundation",
  publisher: "Agricultural Development Trust, Baramati",
  keywords: [
    "AIC-ADT Baramati",
    "Atal Incubation Centre",
    "Agricultural Development Trust",
    "AgriTech Incubator",
    "NITI Aayog",
    "Atal Innovation Mission",
    "Startup India Seed Fund",
    "Baramati Incubation",
    "Living Lab Baramati",
    "NABL Soil Testing Lab",
    "Rural Innovation",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "mr-IN": "/mr",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["mr_IN"],
    url: appUrl,
    siteName: "AIC-ADT Baramati Foundation",
    title:
      "AIC-ADT Baramati Foundation | Agricultural Deep-Tech Incubation Centre",
    description:
      "Catalyzing agricultural transformation through deep-tech innovation, seed funding, living lab testing, and farmer outreach at Baramati.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AIC-ADT Baramati Foundation | Agricultural Deep-Tech Incubation Centre",
    description:
      "Catalyzing agricultural transformation through deep-tech innovation, seed funding, living lab testing, and farmer outreach at Baramati.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${notoSansDevanagari.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAF7] text-[#17231D] antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#004B2A] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[#73992A] focus:shadow-md"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
