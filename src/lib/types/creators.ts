import { LocalizableString } from "@/lib/data";

export type CreatorCategory =
    | "education"
    | "reviews"
    | "business"
    | "programming"
    | "design"
    | "news";

export type PlatformType = "youtube" | "x" | "linkedin" | "blog" | "newsletter";

export type ContentLevel = "beginner" | "intermediate" | "advanced";

export interface CreatorPlatform {
    type: PlatformType;
    url: string;
    followers?: string;
}

export interface CreatorWork {
    title: LocalizableString;
    url: string;
    type: "video" | "article" | "thread" | "newsletter";
}

export interface Creator {
    id: string;
    name: LocalizableString;
    slug: string;
    badge: "featured" | "normal";
    category: CreatorCategory;
    bio: LocalizableString;
    bestFor: LocalizableString[];
    notSuitableFor?: LocalizableString[];
    topWorks: CreatorWork[];
    language: "ar" | "en" | "mixed";
    level: ContentLevel;
    platforms: CreatorPlatform[];
    location?: {
        country: LocalizableString;
        city?: LocalizableString;
    };
    transparency?: {
        sponsors?: boolean;
        disclosures?: string[];
    };
    updatedAt: string;
    image?: string;
}
