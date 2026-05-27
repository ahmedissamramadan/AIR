/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/data.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Scanning for broken URLs...');

// Fix 1: Protocol separators (http: // -> http://)
content = content.replace(/(https?):\s+\/\//g, '$1://');

// Fix 2: Domains with spaces (e.g. "openai. com")
// We look for http/https sequences and fix spaces after dots within them
content = content.replace(/(https?:\/\/[^"'\s`]+)/g, (match) => {
    // Replace ". " with "." inside the URL
    // Also replace " /" with "/" if that happened
    let fixed = match.replace(/\.\s+/g, '.');
    fixed = fixed.replace(/\/\s+/g, '/');

    // Also fix specific version numbers like "9. x" -> "9.x" which might occur in paths
    fixed = fixed.replace(/\/(\d+)\.\s+([a-zA-Z0-9])/g, '/$1.$2');

    if (fixed !== match) {
        console.log(`Fixed: ${match} -> ${fixed}`);
    }
    return fixed;
});

// Fix 3: Fix emails if any were broken (e.g. name@domain. com)
content = content.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, (match) => {
    return match.replace(/\.\s+/g, '.');
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully repaired URLs in src/lib/data.ts');
