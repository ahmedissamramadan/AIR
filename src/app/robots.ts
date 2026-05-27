import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
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
                '/*?q=', // Disallow internal search query strings to prevent thin content indexing
            ],
        },
        sitemap: 'https://ahmdesam96.github.io/sitemap.xml', // TODO: Update this to Vercel URL
    };
}
