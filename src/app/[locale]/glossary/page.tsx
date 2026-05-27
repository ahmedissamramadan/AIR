"use client";

import { useState, useMemo, useEffect } from "react";
import { glossaryTerms, tools, getLocalizedContent } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Search, BookOpen, Cpu, Wrench, Filter, ChevronUp, ExternalLink, AlertCircle, Lightbulb, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";

const categories = [
    { id: "الكل", label: "الكل", icon: Filter, color: "bg-primary/10 text-primary" },
    { id: "عام", label: "عام", icon: BookOpen, color: "bg-green-500/10 text-green-500" },
    { id: "تقني", label: "تقني", icon: Cpu, color: "bg-blue-500/10 text-blue-500" },
    { id: "تطبيقات", label: "تطبيقات", icon: Wrench, color: "bg-orange-500/10 text-orange-500" },
];

const categoryColors: Record<string, string> = {
    "عام": "bg-green-500/10 text-green-500 border-green-500/30",
    "تقني": "bg-blue-500/10 text-blue-500 border-blue-500/30",
    "تطبيقات": "bg-orange-500/10 text-orange-500 border-orange-500/30",
};

// Arabic text normalization for search
function normalizeArabic(text: string): string {
    return text
        .replace(/[\u064B-\u065F]/g, "") // Remove tashkeel
        .replace(/[أإآ]/g, "ا") // Normalize alef
        .replace(/ة/g, "ه") // Normalize taa marbuta
        .replace(/ى/g, "ي") // Normalize alef maksura
        .toLowerCase();
}

// Fuzzy search for typo tolerance
function fuzzyMatch(text: string, query: string): boolean {
    const normalizedText = normalizeArabic(text);
    const normalizedQuery = normalizeArabic(query);

    // Exact match
    if (normalizedText.includes(normalizedQuery)) return true;

    // Simple fuzzy: allow 1 character difference for short queries
    if (normalizedQuery.length <= 3) return normalizedText.includes(normalizedQuery);

    // For longer queries, check if most characters match
    let matches = 0;
    for (const char of normalizedQuery) {
        if (normalizedText.includes(char)) matches++;
    }
    return matches >= normalizedQuery.length * 0.7;
}

export default function GlossaryPage() {
    const locale = useLocale();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["الكل"]);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Show back to top button on scroll
    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const toggleCategory = (categoryId: string) => {
        if (categoryId === "الكل") {
            setSelectedCategories(["الكل"]);
        } else {
            const newCategories = selectedCategories.filter(c => c !== "الكل");
            if (newCategories.includes(categoryId)) {
                const filtered = newCategories.filter(c => c !== categoryId);
                setSelectedCategories(filtered.length ? filtered : ["الكل"]);
            } else {
                setSelectedCategories([...newCategories, categoryId]);
            }
        }
    };

    const filteredTerms = useMemo(() => {
        return glossaryTerms.filter((item) => {
            const matchesSearch = !searchQuery.trim() ||
                fuzzyMatch(item.term, searchQuery) ||
                fuzzyMatch(item.arabicTerm, searchQuery) ||
                fuzzyMatch(item.definition, searchQuery);

            const matchesCategory = selectedCategories.includes("الكل") ||
                selectedCategories.includes(item.category);

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategories]);

    // Get suggested terms when no results
    const suggestedTerms = useMemo(() => {
        if (filteredTerms.length > 0 || !searchQuery.trim()) return [];
        return glossaryTerms.slice(0, 3);
    }, [filteredTerms.length, searchQuery]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { "الكل": glossaryTerms.length };
        glossaryTerms.forEach((term) => {
            counts[term.category] = (counts[term.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Highlight search term in text
    const highlightText = (text: string, query: string) => {
        if (!query.trim()) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={i} className="bg-primary/30 text-foreground px-0.5 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    // Get related tool by slug
    const getRelatedTool = (slug: string) => tools.find(t => t.slug === slug);

    // Last updated date
    const lastUpdated = "7 ديسمبر 2025";

    return (
        <div className="min-h-screen bg-noise pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <FadeIn>
                        <Badge variant="secondary" className="mb-6 px-4 py-2">المصطلحات التقنية</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            قاموس <span className="text-gradient-gold">الذكاء الاصطناعي</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
                            دليلك الشامل لفهم أهم المصطلحات والمفاهيم في عالم الذكاء الاصطناعي، مشروحة ببساطة.
                        </p>
                        <p className="text-sm text-muted-foreground/70 mb-8">
                            آخر تحديث: {lastUpdated} • {glossaryTerms.length} مصطلح • يُحدّث أسبوعياً
                        </p>
                    </FadeIn>

                    {/* Search Bar */}
                    <FadeIn delay={0.2}>
                        <div className="max-w-2xl mx-auto relative group mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-lg transition-all duration-500 opacity-50 group-hover:opacity-100" />
                            <div className="relative bg-card border border-border rounded-2xl flex items-center p-2 shadow-lg">
                                <Search className="w-6 h-6 text-muted-foreground mr-4" />
                                <input
                                    type="text"
                                    placeholder="ابحث بالعربية أو الإنجليزية (مثال: LLM, هلوسة, Prompt...)"
                                    className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-2 h-12"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="ml-2 text-muted-foreground hover:text-foreground transition-colors px-3"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Category Filters - Multi-select */}
                    <FadeIn delay={0.3}>
                        <div className="flex flex-wrap justify-center gap-3 mb-4">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = selectedCategories.includes(cat.id);
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : `${cat.color} hover:opacity-80`
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {cat.label}
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-background/50"}`}>
                                            {categoryCounts[cat.id] || 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Terms Grid */}
            <div className="container mx-auto px-4">
                {/* Results count */}
                <div className="text-sm text-muted-foreground mb-6 text-center">
                    عرض {filteredTerms.length} من {glossaryTerms.length} مصطلح
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredTerms.map((item) => (
                            <motion.div
                                layout
                                key={item.term}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group"
                            >
                                <div
                                    className={`h-full bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden cursor-pointer ${expandedCard === item.term ? 'ring-2 ring-primary' : ''}`}
                                    onClick={() => setExpandedCard(expandedCard === item.term ? null : item.term)}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Header: Category + English term */}
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge
                                            variant="outline"
                                            className={`${categoryColors[item.category] || "bg-background/50"} backdrop-blur-md border`}
                                        >
                                            {item.category}
                                        </Badge>
                                        <span className="text-xs font-mono text-muted-foreground bg-secondary/10 px-2 py-1 rounded">
                                            {item.term.split(" ")[0]}
                                        </span>
                                    </div>

                                    {/* Arabic term (primary) */}
                                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                        {highlightText(item.arabicTerm, searchQuery)}
                                    </h3>

                                    {/* English term (secondary) */}
                                    <p className="text-xs text-muted-foreground/70 font-mono mb-3">
                                        {item.term}
                                    </p>

                                    {/* Definition */}
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {highlightText(item.definition, searchQuery)}
                                    </p>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {expandedCard === item.term && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-3 border-t border-border pt-4 mt-4"
                                            >
                                                {/* Example */}
                                                {item.example && (
                                                    <div className="flex gap-2 text-sm">
                                                        <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-medium text-yellow-500">مثال: </span>
                                                            <span className="text-muted-foreground">{item.example}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Misconception */}
                                                {item.misconception && (
                                                    <div className="flex gap-2 text-sm">
                                                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-medium text-red-500">سوء فهم شائع: </span>
                                                            <span className="text-muted-foreground">{item.misconception}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Source */}
                                                {item.source && (
                                                    <div className="flex gap-2 text-sm">
                                                        <ExternalLink className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-medium text-blue-500">المصدر: </span>
                                                            <span className="text-muted-foreground text-xs">{item.source}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Related Tools */}
                                                {item.relatedTools && item.relatedTools.length > 0 && (
                                                    <div className="flex gap-2 items-start text-sm">
                                                        <Link2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="font-medium text-primary">أدوات:</span>
                                                            {item.relatedTools.map(slug => {
                                                                const tool = getRelatedTool(slug);
                                                                return tool ? (
                                                                    <Link
                                                                        key={slug}
                                                                        href={`/tools/${slug}`}
                                                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        {getLocalizedContent(tool.name, locale)}
                                                                    </Link>
                                                                ) : null;
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Click hint */}
                                    <p className="text-xs text-muted-foreground/50 mt-3 text-center">
                                        {expandedCard === item.term ? "اضغط للإغلاق" : "اضغط للمزيد"}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </StaggerContainer>

                {/* Empty state with suggestions */}
                {filteredTerms.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-4">لا توجد نتائج مطابقة لـ &quot;{searchQuery}&quot;</p>
                        {suggestedTerms.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm text-muted-foreground mb-3">جرب هذه المصطلحات:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {suggestedTerms.map(term => (
                                        <button
                                            key={term.term}
                                            onClick={() => setSearchQuery(term.arabicTerm)}
                                            className="px-3 py-1.5 bg-secondary/10 hover:bg-secondary/20 rounded-full text-sm transition-colors"
                                        >
                                            {term.arabicTerm}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategories(["الكل"]);
                            }}
                            className="text-primary hover:underline mt-4 block mx-auto"
                        >
                            إعادة تعيين البحث
                        </button>
                    </div>
                )}

                {/* CTA Section */}
                <FadeIn delay={0.2}>
                    <div className="mt-16 text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl p-8 border border-border">
                        <h2 className="text-2xl font-bold mb-4">تريد تعلم المزيد؟</h2>
                        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                            اشترك لتصلك تحديثات القاموس ودروس عملية أسبوعية عن الذكاء الاصطناعي.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/blog" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                                تصفح المقالات
                            </Link>
                            <Link href="/tools" className="px-6 py-3 bg-secondary/10 text-foreground rounded-xl font-medium hover:bg-secondary/20 transition-colors">
                                استكشف الأدوات
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 left-8 p-4 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors z-50"
                        aria-label="العودة للأعلى"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
