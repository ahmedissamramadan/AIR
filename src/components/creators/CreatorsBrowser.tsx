"use client";

import { useState, useMemo } from "react";
import { Creator, CreatorCategory, ContentLevel } from "@/lib/types/creators";
import { CreatorCard } from "./CreatorCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalizedContent } from "@/lib/data";

interface CreatorsBrowserProps {
    initialCreators: Creator[];
    locale?: string;
}

export function CreatorsBrowser({ initialCreators, locale = 'ar' }: CreatorsBrowserProps) {
    const isAr = locale === 'ar';
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | "all">("all");
    const [selectedLevel] = useState<ContentLevel | "all">("all");

    const categories: { value: CreatorCategory | "all"; label: string }[] = useMemo(() => [
        { value: "all", label: isAr ? "الكل" : "All" },
        { value: "education", label: isAr ? "تعليم" : "Education" },
        { value: "business", label: isAr ? "أعمال" : "Business" },
        { value: "programming", label: isAr ? "برمجة" : "Programming" },
        { value: "design", label: isAr ? "تصميم" : "Design" },
        { value: "news", label: isAr ? "أخبار" : "News" },
        { value: "reviews", label: isAr ? "مراجعات" : "Reviews" },
    ], [isAr]);

    const filteredCreators = useMemo(() => {
        return initialCreators.filter((creator) => {
            const name = getLocalizedContent(creator.name, locale);
            const bio = creator.bio ? getLocalizedContent(creator.bio, locale) : '';

            const matchesSearch =
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bio.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "all" || creator.category === selectedCategory;
            const matchesLevel = selectedLevel === "all" || creator.level === selectedLevel;

            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [initialCreators, searchQuery, selectedCategory, selectedLevel, locale]);

    // Sort: Featured first
    const sortedCreators = useMemo(() => {
        return [...filteredCreators].sort((a, b) => {
            if (a.badge === 'featured' && b.badge !== 'featured') return -1;
            if (a.badge !== 'featured' && b.badge === 'featured') return 1;
            return 0;
        });
    }, [filteredCreators]);

    return (
        <div className={`space-y-8 ${isAr ? 'text-right' : 'text-left'}`}>
            {/* Search and Filter Section */}
            <div className={`flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border/50 shadow-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                <div className="relative w-full md:w-96">
                    <Search className={`absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4`} />
                    <input
                        type="text"
                        placeholder={isAr ? "ابحث عن صانع محتوى..." : "Search for a creator..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full h-10 ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent text-sm`}
                        dir={isAr ? 'rtl' : 'ltr'}
                    />
                </div>

                <div className={`flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar ${isAr ? '' : 'flex-row-reverse'}`}>
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/50 hover:bg-secondary text-muted-foreground"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {sortedCreators.length > 0 ? (
                        sortedCreators.map((creator) => (
                            <motion.div
                                layout
                                key={creator.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CreatorCard creator={creator} locale={locale} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-20 text-muted-foreground"
                        >
                            <p className="text-lg">{isAr ? 'لم يتم العثور على نتائج تطابق بحثك 🔍' : 'No results matching your search 🔍'}</p>
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                className="mt-2 underline"
                            >
                                {isAr ? 'مسح الفلاتر' : 'Clear filters'}
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
