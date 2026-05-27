import { posts, getLocalizedContent } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { formatDateArabic, toArabicNumerals } from "@/lib/formatters";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface Props {
    params: Promise<{
        category: string;
        locale: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, locale } = await params;
    const decodedCategory = decodeURIComponent(category);
    const isAr = locale === 'ar';

    // Check if category exists (using English as canonical or any match)
    const categoryExists = posts.some(p =>
        getLocalizedContent(p.category, 'en') === decodedCategory ||
        getLocalizedContent(p.category, 'ar') === decodedCategory
    );

    if (!categoryExists) return { title: isAr ? 'قسم غير موجود' : 'Category Not Found' };

    return {
        title: isAr ? `مقالات ${decodedCategory} | ذكاء عملي` : `${decodedCategory} Articles | Zakaa Amaly`,
        description: isAr
            ? `تصفح أحدث المقالات والنصائح في قسم ${decodedCategory} على منصة ذكاء عملي.`
            : `Browse the latest articles and tips in the ${decodedCategory} section on Zakaa Amaly platform.`,
    };
}

export async function generateStaticParams() {
    const categoriesEn = Array.from(new Set(posts.map(p => getLocalizedContent(p.category, 'en'))));
    const categoriesAr = Array.from(new Set(posts.map(p => getLocalizedContent(p.category, 'ar'))));
    const allCategories = Array.from(new Set([...categoriesEn, ...categoriesAr]));

    return allCategories.map(category => ({
        category: encodeURIComponent(category),
    }));
}

export default async function CategoryPage({ params }: Props) {
    const { category, locale } = await params;
    const decodedCategory = decodeURIComponent(category);
    const isAr = locale === 'ar';

    const filteredPosts = posts.filter(p =>
        getLocalizedContent(p.category, 'en') === decodedCategory ||
        getLocalizedContent(p.category, 'ar') === decodedCategory
    );

    if (filteredPosts.length === 0) {
        notFound();
    }

    return (
        <div className={`container mx-auto px-4 py-12 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="max-w-6xl mx-auto">
                <Link href={`/${locale}/blog`} className="inline-flex items-center text-primary font-bold mb-8 hover:underline gap-2">
                    <ArrowLeft className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} />
                    {isAr ? 'العودة لكل المقالات' : 'Back to all articles'}
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {isAr ? 'قسم ' : 'Section '}
                        <span className="text-gradient-gold">{decodedCategory}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        {isAr
                            ? `مجموعة من أفضل المقالات والشروحات العملية المتخصصة في ${decodedCategory}.`
                            : `A collection of the best practical articles and explanations specialized in ${decodedCategory}.`}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => {
                        const title = getLocalizedContent(post.title, locale);
                        const excerpt = getLocalizedContent(post.excerpt, locale);
                        const readingTime = getLocalizedContent(post.readingTime, locale);
                        const authorName = getLocalizedContent(post.author.name, locale);

                        return (
                            <Link href={`/${locale}/blog/${post.slug}`} key={post.slug} className="group h-full block">
                                <SpotlightCard className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-white/10 dark:border-white/5 overflow-hidden">
                                    <div className="aspect-video bg-muted w-full relative overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader className="pt-4 pb-2">
                                        <div className={`flex items-center gap-3 text-xs text-muted-foreground mb-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <span>{formatDateArabic(post.date)}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span>{isAr ? `${toArabicNumerals(readingTime)} قراءة` : `${readingTime} read`}</span>
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-4 text-sm text-muted-foreground line-clamp-3">
                                        {excerpt}
                                    </CardContent>
                                    <CardFooter className="border-t border-border/50 pt-4 mt-auto flex justify-between items-center">
                                        <div className={`flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                                <Image src={post.author.avatar} alt={authorName} fill className="object-cover" />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{authorName}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-primary font-bold p-0 h-auto">
                                            {isAr ? 'اقرأ المزيد ←' : 'Read More →'}
                                        </Button>
                                    </CardFooter>
                                </SpotlightCard>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
