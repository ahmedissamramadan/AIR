/**
 * AIR Platform — SEO Default Configuration
 * Fallback meta tags and structured data settings.
 */

import { siteConfig } from "./site";

export const seoDefaults = {
  titleTemplate: `%s — ${siteConfig.name}`,
  defaultTitle: `${siteConfig.name} — ${siteConfig.nameAr}`,
  defaultDescription: siteConfig.description,

  openGraph: {
    type: "website" as const,
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.nameAr,
      },
    ],
  },

  twitter: {
    card: "summary_large_image" as const,
    site: "@air_platform",
    creator: "@air_platform",
  },

  /** Pages to exclude from sitemap */
  sitemapExclusions: ["/api", "/_hidden"],

  /** Priority mapping by page type */
  sitemapPriority: {
    home: 1.0,
    blog: 0.8,
    blogPost: 0.8,
    tools: 0.7,
    toolPage: 0.7,
    store: 0.6,
    storePage: 0.6,
    membership: 0.5,
    newsletter: 0.3,
  },

  /** Change frequency mapping */
  sitemapChangeFreq: {
    home: "weekly" as const,
    blog: "daily" as const,
    blogPost: "monthly" as const,
    tools: "weekly" as const,
    store: "weekly" as const,
    static: "monthly" as const,
  },
} as const;
