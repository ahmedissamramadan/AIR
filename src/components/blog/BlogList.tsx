"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/lib/data";
import { formatDateArabic } from "@/lib/formatters";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedContent } from "@/lib/i18n-utils";
import { Link } from "@/i18n/routing";

export default function BlogList({ limit, locale: propLocale }: { limit?: number; locale?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const contextLocale = useLocale();
    const locale = propLocale || contextLocale;
    const t = useTranslations("nav");
    const isRtl = locale === 'ar';

    const categories = isRtl
        ? ["الكل", "ذكاء اصطناعي", "إنتاجية", "أخبار"]
        : ["All", "AI", "Productivity", "News"];

    const currentAll = categories[0];

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || currentAll);

    // Sync state with URL only on the blog page
    useEffect(() => {
        if (!pathname.includes("/blog")) return;

        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (selectedCategory && selectedCategory !== currentAll) params.set("category", selectedCategory);

        const queryString = params.toString();
        router.push(queryString ? `?${queryString}` : "/blog", { scroll: false });
    }, [searchQuery, selectedCategory, router, pathname, currentAll]);

    const filteredPosts = useMemo(() => {
        const _filtered = posts.filter((post) => {
            const title = getLocalizedContent(post.title, locale);
            if (!title) return false;
            const excerpt = getLocalizedContent(post.excerpt, locale);
            const category = getLocalizedContent(post.category, locale);

            const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === currentAll || category === selectedCategory || (selectedCategory === "All" && category === "AI"); // Rough mapping

            return matchesSearch && matchesCategory;
        });

        return limit ? _filtered.slice(0, limit) : _filtered;
    }, [searchQuery, selectedCategory, limit, locale, currentAll]);

    return (
        <div className="min-h-screen">
            <div className="text-center mb-16">
                <h1 className="leading-tight mb-6">
                    {isRtl ? "المدونة" : "Tech"} <span className="text-gradient-gold">{isRtl ? "التقنية" : "Blog"}</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
                    {isRtl
                        ? "مقالات وشروحات تفصيلية حول أحدث تقنيات الذكاء الاصطناعي وكيفية الاستفادة منها في ريادة الأعمال."
                        : "Detailed articles and tutorials on the latest AI technologies and how to leverage them in entrepreneurship."}
                </p>

                {/* Search & Filter UI */}
                <div className="max-w-2xl mx-auto rounded-full bg-secondary/5 border border-border p-2 pr-6 flex items-center shadow-lg transition-all focus-within:shadow-primary/10 focus-within:border-primary/20" role="search">
                    <label htmlFor="blog-search-input" className="sr-only">{isRtl ? "البحث في المدونة" : "Search blog"}</label>
                    <Search className={`w-5 h-5 text-muted-foreground ${isRtl ? 'ml-4' : 'mr-4'}`} aria-hidden="true" />
                    <input
                        id="blog-search-input"
                        type="search"
                        placeholder={isRtl ? "ابحث في المدونة..." : "Search the blog..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none h-12 text-lg"
                        aria-label={isRtl ? "البحث في المدونة" : "Search blog"}
                    />
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "hover:bg-background/50 text-muted-foreground"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <motion.div
                            layout
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group h-full block">
                                <div className="h-full flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                    <div className="aspect-[16/10] bg-muted w-full relative overflow-hidden">
                                        {post.image ? (
                                            <OptimizedImage
                                                config={{
                                                    src: post.image,
                                                    alt: getLocalizedContent(post.title, locale),
                                                    category: "blog",
                                                    width: 600,
                                                    height: 400
                                                }}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-muted-foreground">
                                                <span className="text-4xl">📝</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-background/90 backdrop-blur-md border-white/10 text-xs font-bold px-3 py-1 rounded-full">{getLocalizedContent(post.category, locale)}</Badge>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                                            <span>{isRtl ? formatDateArabic(post.date) : post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span>{getLocalizedContent(post.readingTime, locale)}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                            {getLocalizedContent(post.title, locale)}
                                        </h3>

                                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-8">
                                            {getLocalizedContent(post.excerpt, locale)}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border">
                                                    <OptimizedImage
                                                        config={{
                                                            src: post.author.avatar,
                                                            alt: getLocalizedContent(post.author.name, locale),
                                                            category: "testimonials",
                                                            width: 28,
                                                            height: 28
                                                        }}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-muted-foreground">{getLocalizedContent(post.author.name, locale)}</span>
                                            </div>
                                            <div className={`text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${isRtl ? '' : 'flex-row-reverse'}`}>
                                                {isRtl ? "اقرأ المقال" : "Read Article"}
                                                <span className="text-lg">{isRtl ? "←" : "→"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-32 rounded-[3rem] bg-secondary/5 border border-dashed border-border">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">{isRtl ? "لا توجد نتائج للبحث" : "No results found"}</h3>
                    <p className="text-muted-foreground">{isRtl ? "جرب البحث بكلمات مختلفة أو تصفح التصنيفات." : "Try searching for different keywords or browse categories."}</p>
                </div>
            )}
        </div>
    );
}
