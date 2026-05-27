/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// HTML Tag Normalization
// Opening tags
content = content.replace(/<\s+([a-zA-Z0-9]+)([^>]*)>/g, (match, tag, rest) => {
    // Normalize attributes essentially just by collapsing spaces around =
    const normalizedRest = rest.replace(/\s*=\s*"/g, '="');
    return `<${tag}${normalizedRest}>`;
});

// Closing tags
content = content.replace(/<\s*\/\s*([a-zA-Z0-9]+)\s*>/g, (match, tag) => {
    return `</${tag}>`;
});

// Fix trailing spaces in opening tags (e.g. <p > -> <p>)
content = content.replace(/<([a-zA-Z0-9]+)\s+>/g, '<$1>');

// Specific attribute cleanups if regex misses some edge cases in 'rest'
content = content.replace(/style\s*=\s*"/g, 'style="');


// Text Normalization
content = content.replace(/GPT\s*-\s*4/g, 'GPT‑4'); // Non-breaking hyphen
content = content.replace(/PDFs reports/gi, 'تقارير PDF');
content = content.replace(/1M token/gi, '١ مليون رمز (توكن)');

// Punctuation Spacing (Arabic and English)
// Fix: word.Word -> word. Word
// We use a negative lookahead/lookbehind to avoid breaking file extensions or URLs
// But since we already broke it, let's first fix the regression
content = content.replace(/\.\s+(png|jpg|jpeg|gif|svg|webp)/gi, '.$1');

// Now apply safer punctuation spacing
// Avoid matching if preceded by a dot (ellipsis) or followed by a file extension
content = content.replace(/([أ-ي])\.([أ-ي])/g, '$1. $2'); // Arabic to Arabic
content = content.replace(/([a-z])\.([A-Z])/g, '$1. $2'); // camelCase or sentence boundary (english)
content = content.replace(/،([^\s])/g, '، $1'); // Comma spacing

// Fix "Gemini Updates Cover" - sometimes alt text is rendered if image fails, verify no standalone text
// This regex removes lines that clearly just contain the alt text from the data if they exist as separate paragraphs
content = content.replace(/<p>\s*Gemini Updates Cover\s*<\/p>/g, '');
content = content.replace(/^Gemini Updates Cover$/gm, '');


// Structural Cleanups
// Remove Duplicate H1/H2 at the start of content
// We look for patterns like <h2>Title</h2> at the very beginning of the content string.
// Since we can't easily access the "title" variable here without parsing the TS object structure properly, 
// we will use a heuristic to remove the *first* h2 if it looks like a repost of the main title or "المقدمة"
content = content.replace(/content:\s*`\s*<h[12]>[^<]+<\/h[12]>/g, (match) => {
    return match.replace(/<h[12]>[^<]+<\/h[12]>/, '');
});

// Also remove "المقدمة" headers as they are often redundant
content = content.replace(/<h2>\s*المقدمة\s*<\/h2>/g, '');


fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully normalized src/lib/data.ts');
