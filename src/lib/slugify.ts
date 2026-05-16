/**
 * AIR Platform — Arabic → English Slug Utility
 *
 * Strategy:
 *   1. Each piece of content MUST have a manual `slug` in its frontmatter.
 *   2. This auto-slugify is a FALLBACK only — used for validation and previews.
 *   3. All slugs are validated for uniqueness via `scripts/validate-slugs.ts`.
 */

/** Common Arabic stop-words to remove */
const ARABIC_STOP_WORDS = new Set([
  "في", "من", "على", "إلى", "عن", "مع",
  "هذا", "هذه", "ذلك", "تلك", "التي", "الذي",
  "هو", "هي", "أن", "لا", "ما", "قد", "كل",
  "بين", "أو", "ثم", "لكن", "حتى", "كان",
  "عند", "بعد", "قبل", "فوق", "تحت", "منذ",
  "و", "ال",
]);

/** Arabic-to-English numeral mapping */
const ARABIC_NUMERALS: Record<string, string> = {
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

/**
 * Converts Arabic numerals in a string to English numerals.
 */
function convertArabicNumerals(text: string): string {
  return text.replace(/[٠-٩]/g, (match) => ARABIC_NUMERALS[match] || match);
}

/**
 * Removes Arabic definite article (ال) and common prefixes.
 */
function removeArabicPrefixes(word: string): string {
  if (word.startsWith("ال") && word.length > 3) {
    return word.slice(2);
  }
  return word;
}

/**
 * Auto-generates an English-friendly slug from a mixed Arabic/English title.
 *
 * ⚠️  This is a FALLBACK. Always prefer manual slugs in frontmatter.
 *
 * @example
 *   slugify("5 أخطاء شائعة في ChatGPT وحلولها")
 *   // → "5-chatgpt" (partial — needs manual slug for SEO quality)
 */
export function slugify(text: string): string {
  let result = text.toLowerCase().trim();
  result = convertArabicNumerals(result);
  const words = result.split(/[\s\-_]+/);
  const filtered = words
    .map((w) => removeArabicPrefixes(w))
    .filter((w) => !ARABIC_STOP_WORDS.has(w))
    .filter((w) => /[a-z0-9]/.test(w))
    .map((w) => w.replace(/[^a-z0-9]/g, ""));
  return filtered.join("-").replace(/-{2,}/g, "-").replace(/^-|-$/g, "") || "untitled";
}

/**
 * Validates that a slug is URL-safe and SEO-friendly.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && slug.length >= 3 && slug.length <= 80;
}
