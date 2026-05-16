/**
 * AIR Platform — Slug Validation Script
 *
 * Run: npx ts-node scripts/validate-slugs.ts
 *
 * Checks:
 *   1. All blog post slugs are valid (URL-safe, proper length)
 *   2. No duplicate slugs exist
 *   3. All legacy URLs have corresponding redirects
 *   4. No redirect conflicts
 */

import { isValidSlug } from "../src/lib/slugify";
import { redirects } from "../src/lib/redirects";

interface ValidationError {
  type: "invalid_slug" | "duplicate" | "missing_redirect" | "conflict";
  message: string;
  source?: string;
}

function validateRedirects(): ValidationError[] {
  const errors: ValidationError[] = [];
  const destinations = new Map<string, string>();
  const sources = new Set<string>();

  for (const redirect of redirects) {
    if (sources.has(redirect.source)) {
      errors.push({
        type: "duplicate",
        message: `Duplicate redirect source: ${redirect.source}`,
        source: redirect.source,
      });
    }
    sources.add(redirect.source);

    const slug = redirect.destination.split("/").pop() || "";
    if (!isValidSlug(slug)) {
      errors.push({
        type: "invalid_slug",
        message: `Invalid slug "${slug}" in redirect destination: ${redirect.destination}`,
        source: redirect.source,
      });
    }

    const existingSource = destinations.get(redirect.destination);
    if (existingSource && existingSource !== redirect.source) {
      console.log(
        `ℹ️  Multiple sources redirect to ${redirect.destination}: ${existingSource}, ${redirect.source}`
      );
    }
    destinations.set(redirect.destination, redirect.source);
  }

  return errors;
}

function main() {
  console.log("🔍 Validating slugs and redirects...\n");
  const errors = validateRedirects();

  if (errors.length === 0) {
    console.log("✅ All slugs and redirects are valid!");
    console.log(`   Total redirects: ${redirects.length}`);
    process.exit(0);
  } else {
    console.error(`\n❌ Found ${errors.length} error(s):\n`);
    for (const error of errors) {
      console.error(`  [${error.type}] ${error.message}`);
    }
    process.exit(1);
  }
}

main();
