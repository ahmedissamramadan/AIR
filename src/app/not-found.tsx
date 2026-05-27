'use client';

import Error from 'next/error';

// This file handles 404s that occur outside the [locale] structure
// affecting the root layout generation.
export default function NotFound() {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Error statusCode={404} />
            </body>
        </html>
    );
}
