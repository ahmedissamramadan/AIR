/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Scanning for broken URLs (v2)...');

// Strategy: Find strings starting with http/https enclosed in single or double quotes.
// Then remove ALL spaces within those specific strings.
// This assumes valid URLs should not contain raw spaces.

content = content.replace(/(["'])(https?:\/\/.*?)\1/g, (fullMatch, quote, urlContent) => {
    // Remove all spaces from the URL content part
    const cleanUrl = urlContent.replace(/\s+/g, '');

    if (cleanUrl !== urlContent) {
        console.log(`Fixed: "${urlContent}" -> "${cleanUrl}"`);
    }

    return `${quote}${cleanUrl}${quote}`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully repaired URLs in src/lib/data.ts');
