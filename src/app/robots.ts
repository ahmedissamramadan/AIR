import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * AIR Platform — Robots.txt Generator
 *
 * Disallows:
 *   - /private/, /admin/, /api/, /checkout/
 *   - /_hidden/ (temporarily disabled pages)
 *   - Search query strings (prevent thin content indexing)
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/private/',
                '/admin/',
                '/api/',
                '/checkout/',
                '/_hidden/',
                '/*?q=',
            ],
        },
        sitemap: 'https://arabic-ai-blog.vercel.app/sitemap.xml',
    };
}
