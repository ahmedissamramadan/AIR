/**
 * AIR Platform — 301 Redirect Mapping
 *
 * This file maps old Arabic URLs to new English slug URLs.
 * Used by `next.config.ts` to generate permanent (301) redirects.
 *
 * ★ HOW TO ADD NEW REDIRECTS:
 *   1. Find the old URL in Google Search Console
 *   2. Add it below with its new English slug destination
 *   3. Run `npm run validate:slugs` to check for conflicts
 *   4. Deploy — redirects take effect immediately
 *
 * ★ IMPORTANT:
 *   - Arabic paths are automatically URL-encoded by Next.js
 *   - Keep this file updated for at least 6 months after migration
 *   - Never remove a redirect without checking GSC for indexed URLs
 */

export interface RedirectEntry {
  /** Old path (may contain Arabic characters) */
  source: string;
  /** New English slug path */
  destination: string;
  /** Always true for SEO (301 redirect) */
  permanent: true;
  /** Optional note for documentation */
  note?: string;
}

/**
 * Master redirect map.
 * ⚠️  This MUST be complete before launch.
 *     Pull all indexed URLs from Google Search Console.
 */
export const redirects: RedirectEntry[] = [
  // ── Blog Redirects ──
  {
    source: "/blog/عطاء",
    destination: "/blog/chatgpt-mistakes-solutions",
    permanent: true,
    note: "مقال أخطاء ChatGPT",
  },
  {
    source: "/blog/أخطاء-ChatGPT",
    destination: "/blog/chatgpt-mistakes-solutions",
    permanent: true,
    note: "رابط بديل لنفس المقال",
  },
  {
    source: "/blog/أدوات-الذكاء-الاصطناعي",
    destination: "/blog/ai-tools-comparison-2026",
    permanent: true,
    note: "مقارنة أدوات AI",
  },

  // ── Tool Redirects ──
  {
    source: "/tools/شات-جي-بي-تي",
    destination: "/tools/chatgpt",
    permanent: true,
  },

  // ── Store Redirects ──
  {
    source: "/store/دليل-البرومبت",
    destination: "/store/prompt-engineering-guide",
    permanent: true,
  },

  // ── TODO: Add all remaining Arabic URLs from GSC before launch ──
];

/**
 * Returns redirects formatted for next.config.ts.
 * Handles URL encoding of Arabic characters.
 */
export function getNextRedirects() {
  return redirects.map(({ source, destination, permanent }) => ({
    source: encodeURI(source),
    destination,
    permanent,
  }));
}
