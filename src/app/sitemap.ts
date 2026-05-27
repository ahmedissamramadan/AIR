import { MetadataRoute } from 'next';
import { posts, tools, systems, courses } from '@/lib/data';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ahmdesam96.github.io/AIR'; // TODO: Update this to your Vercel URL after deployment


    const staticRoutes = [
        '',
        '/about',
        '/blog',
        '/tools',
        '/glossary',
        '/systems',
        '/academy',
        '/pricing',
        '/consultancy',
        '/media-kit',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const postsEntries = posts.map((post: { slug: string; date: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const systemRoutes = (typeof systems !== 'undefined' ? (systems as { slug: string }[]) : []).map((system) => ({
        url: `${baseUrl}/systems/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const academyRoutes = (typeof courses !== 'undefined' ? (courses as { slug: string }[]) : []).map((course) => ({
        url: `${baseUrl}/academy/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...postsEntries, ...toolRoutes, ...systemRoutes, ...academyRoutes];
}
