// Site-wide constants
export const SITE_CONFIG = {
    name: 'أثير',
    nameEn: 'AIR',
    tagline: 'Arab Intelligence Repository',
    description: 'مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات والمعرفة في مجال الذكاء الاصطناعي',
    descriptionEn: 'Arab Intelligence Repository - A comprehensive platform for systems, tools, and knowledge in the field of AI',
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

export const NAV_ITEMS = [
    { href: '/blog', label: { ar: 'المدونة التقنية', en: 'Tech Blog' } },
    { href: '/systems', label: { ar: 'الأنظمة الجاهزة', en: 'Ready Systems' } },
    { href: '/creators', label: { ar: 'دليل الصُنّاع', en: 'Creators Directory' } },
    { href: '/tools', label: { ar: 'دليل الأدوات', en: 'Tools Directory' } },
    { href: '/consultancy', label: { ar: 'استشارات ونماذج', en: 'Consultancy & Models' }, isBold: true },
    { href: '/about', label: { ar: 'من نحن', en: 'About Us' } },
] as const;

export const FOOTER_LINKS = [
    ...NAV_ITEMS,
    { href: '/media-kit', label: { ar: 'مركز المعلنين (Media Kit)', en: 'Media Kit' }, isBold: true, isPrimary: true },
] as const;

// Categories
export const BLOG_CATEGORIES = [
    { ar: 'الكل', en: 'All' },
    { ar: 'ذكاء اصطناعي', en: 'AI' },
    { ar: 'إنتاجية', en: 'Productivity' },
    { ar: 'أخبار', en: 'News' }
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
