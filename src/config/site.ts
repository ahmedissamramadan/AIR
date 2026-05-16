/**
 * AIR Platform — Site Configuration
 * Central source of truth for site-wide metadata and settings.
 */

export const siteConfig = {
  name: "AIR",
  nameAr: "المستودع العربي للذكاء الاصطناعي",
  url: "https://air-platform.com",
  description:
    "أدوات، مقالات، ودورات لتعلم واستخدام الذكاء الاصطناعي باللغة العربية",
  locale: "ar_SA",
  dir: "rtl" as const,
  author: {
    name: "Ahmed Esam",
    url: "https://air-platform.com",
    email: "hello@air-platform.com",
  },
  links: {
    twitter: "https://twitter.com/air_platform",
    linkedin: "",
    youtube: "",
  },
  ogImage: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

export type SiteConfig = typeof siteConfig;
