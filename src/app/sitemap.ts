import { MetadataRoute } from 'next';
import { posts, tools, systems, courses } from '@/lib/data';

export const dynamic = 'force-static';

/**
 * AIR Platform — Dynamic Sitemap Generator
 *
 * Excludes hidden/empty pages:
 *   - /about, /systems, /demos, /consultancy
 *
 * Priority tiers:
 *   1.0  — Home
 *   0.8  — Blog, Tools (listing pages)
 *   0.7  — Individual blog posts, tool pages, systems, courses
 *   0.5  — Legal, pricing, other static pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://arabic-ai-blog.vercel.app';

    // Static routes — only pages with actual content
    const staticRoutes = [
        { route: '', priority: 1.0, changeFreq: 'weekly' as const },
        { route: '/blog', priority: 0.8, changeFreq: 'daily' as const },
        { route: '/tools', priority: 0.8, changeFreq: 'weekly' as const },
        { route: '/glossary', priority: 0.7, changeFreq: 'weekly' as const },
        { route: '/academy', priority: 0.7, changeFreq: 'weekly' as const },
        { route: '/pricing', priority: 0.5, changeFreq: 'monthly' as const },
        { route: '/resources', priority: 0.6, changeFreq: 'monthly' as const },
        { route: '/media-kit', priority: 0.4, changeFreq: 'monthly' as const },
        { route: '/privacy', priority: 0.2, changeFreq: 'yearly' as const },
        { route: '/terms', priority: 0.2, changeFreq: 'yearly' as const },
        // Hidden pages excluded: /about, /systems, /demos, /consultancy
    ].map(({ route, priority, changeFreq }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority,
    }));

    // Blog posts
    const postsEntries = posts.map((post: { slug: string; date: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Tool pages
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // System pages (only if data exists)
    const systemRoutes = (typeof systems !== 'undefined' ? (systems as { slug: string }[]) : []).map((system) => ({
        url: `${baseUrl}/systems/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Academy courses
    const academyRoutes = (typeof courses !== 'undefined' ? (courses as { slug: string }[]) : []).map((course) => ({
        url: `${baseUrl}/academy/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...postsEntries, ...toolRoutes, ...systemRoutes, ...academyRoutes];
}
