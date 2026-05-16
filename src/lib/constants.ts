// Site-wide constants
export const SITE_CONFIG = {
    name: 'أثير',
    nameEn: 'AIR',
    tagline: 'Arab Intelligence Repository',
    description: 'مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات والمعرفة في مجال الذكاء الاصطناعي',
    url: 'https://arabic-ai-blog.vercel.app',
    author: 'Ahmed Esam',
    twitterHandle: '@zakaa_ai',
    email: 'hello@zakaa.ai',
    socialLinks: {
        twitter: 'https://x.com/zakaa_ai',
        linkedin: 'https://linkedin.com/company/zakaa-ai',
        github: 'https://github.com/ahmdesam96'
    }
} as const;

export const SOCIAL_LINKS = {
    twitter: 'https://x.com/zakaa_ai',
    linkedin: 'https://linkedin.com/company/zakaa-ai',
    email: 'mailto:hello@zakaa.ai',
} as const;

// ★ NAV_ITEMS and FOOTER_LINKS are DEPRECATED.
// Use `getVisibleNavItems()` from `@/config/navigation` instead.
// Kept here temporarily for backward compatibility.
import { getVisibleNavItems } from '@/config/navigation';

export const NAV_ITEMS = getVisibleNavItems()
    .filter(item => item.href !== '/')
    .map(item => ({ href: item.href, label: item.label }));

export const FOOTER_LINKS = [
    ...NAV_ITEMS,
    { href: '/media-kit', label: 'مركز المعلنين (Media Kit)', isBold: true, isPrimary: true },
] as const;

// Categories
export const BLOG_CATEGORIES = ['الكل', 'ذكاء اصطناعي', 'إنتاجية', 'أخبار'] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
