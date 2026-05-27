import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

// Generate consistent page metadata
export function generatePageMeta(
    title: string,
    description: string,
    options?: {
        image?: string;
        noIndex?: boolean;
    }
): Metadata {
    const fullTitle = `${title} | ${SITE_CONFIG.name}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            siteName: SITE_CONFIG.name,
            locale: 'ar_SA',
            type: 'website',
            ...(options?.image && { images: [{ url: options.image, width: 1200, height: 630 }] }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            creator: SITE_CONFIG.twitterHandle,
        },
        ...(options?.noIndex && { robots: { index: false, follow: false } }),
    };
}

// Generate blog post metadata
export function generatePostMeta(post: {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: { name: string };
}): Metadata {
    return {
        ...generatePageMeta(post.title, post.excerpt, { image: post.image }),
        authors: [{ name: post.author.name }],
        openGraph: {
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
        },
    };
}

// Generate system page metadata
export function generateSystemMeta(system: {
    title: string;
    description: string;
    image: string;
}): Metadata {
    return generatePageMeta(system.title, system.description, { image: system.image });
}

// JSON-LD helpers
export function generateWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };
}

export function generateOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/logo.png`,
        sameAs: [
            'https://x.com/zakaa_ai',
            'https://linkedin.com/company/zakaa-ai',
        ],
    };
}
