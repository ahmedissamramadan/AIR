// ===========================
// Data Types & Interfaces
// ===========================

export interface Author {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
    twitter?: string;
    linkedin?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readingTime: string;
    image: string;
    author: Author;
    tags: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
    relatedSystem?: string;
    isSponsored?: boolean;
    sponsorName?: string;
    isPremium?: boolean;
}

export interface CourseModule {
    title: string;
    lessons: {
        title: string;
        duration: string;
        isFree?: boolean;
    }[];
}

export interface Course {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    price: number | "Free";
    category: string;
    duration: string;
    level: "مبتدئ" | "متوسط" | "متقدم";
    modules: CourseModule[];
    instructor: Author;
}

export interface ServicePackage {
    id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export interface Tool {
    id: string;
    name: string;
    slug: string;
    description: string;
    content?: string;
    category: string;
    link: string;
    featured: boolean;
    image: string;
    bestFor?: string[];
    notFor?: string[];
    affiliateLink?: string;
    pricingType?: 'free' | 'paid' | 'freemium';
}

export interface Template {
    name: string;
    platform: 'Notion' | 'Trello' | 'Sheets' | 'Other';
    url: string;
    language: 'ar' | 'en' | 'both';
}

export interface Lesson {
    title: string;
    duration: string;
    videoUrl?: string;
    exampleFiles?: {
        name: string;
        url: string;
    }[];
}

export interface Integration {
    name: string;
    type: 'Zapier' | 'n8n' | 'Webhook' | 'API';
    flowUrl?: string;
    description: string;
}

export interface System {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    problem: string;
    result: string;
    steps: {
        title: string;
        description: string;
        tool?: string;
    }[];
    stats: {
        label: string;
        value: string;
    }[];
    toolsUsed: string[];
    image: string;
    valueIdentity?: {
        promise7Days: string;
        roiIndicators: string[];
        beforeAfter: {
            before: string;
            after: string;
        }[];
    };
    templates?: Template[];
    lessons?: Lesson[];
    integrations?: Integration[];
    filterMetadata?: {
        goal: 'writing' | 'management' | 'analysis' | 'automation';
        level: 'beginner' | 'intermediate' | 'advanced';
        expectedTime: string;
    };
    socialProof?: {
        testimonials: {
            user: string;
            role: string;
            content: string;
            avatar?: string;
        }[];
        caseStudies?: {
            title: string;
            summary: string;
            link: string;
        }[];
    };
}

export interface PaymentDetails {
    instaPay: string;
    vodafoneCash: string;
    fawryCode: string;
}

export interface GlossaryTerm {
    term: string;
    arabicTerm: string;
    definition: string;
    category: "عام" | "تقني" | "تطبيقات";
    example?: string;
    misconception?: string;
    source?: string;
    relatedTools?: string[];
    relatedPosts?: string[];
}
