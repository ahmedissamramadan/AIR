"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Tool } from "@/lib/data";
import { useLocale } from "next-intl";
import { getLocalizedContent } from "@/lib/i18n-utils";

interface ToolsBrowserProps {
    initialTools: Tool[];
}

export default function ToolsBrowser({ initialTools }: ToolsBrowserProps) {
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const categories = isRtl
        ? ["الكل", "المحادثة", "التصميم", "الإنتاجية", "البرمجة"]
        : ["All", "Chatbots", "Design", "Productivity", "Coding"];

    const currentAll = categories[0];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(currentAll);

    // Categories mapping for data filtering
    const categoryMapping = useMemo<Record<string, string>>(() => ({
        "المحادثة": "Chatbots",
        "التصميم": "Design",
        "الإنتاجية": "Productivity",
        "البرمجة": "Coding",
        "Chatbots": "Chatbots",
        "Design": "Design",
        "Productivity": "Productivity",
        "Coding": "Coding"
    }), []);

    const filteredTools = useMemo(() => {
        return initialTools.filter((tool) => {
            const name = getLocalizedContent(tool.name, locale);
            if (!name) return false;
            const description = getLocalizedContent(tool.description, locale);

            const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                description.toLowerCase().includes(searchQuery.toLowerCase());

            const normalizedSelected = categoryMapping[selectedCategory] || selectedCategory;
            const matchesCategory = selectedCategory === currentAll || tool.category === normalizedSelected;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, initialTools, currentAll, locale, categoryMapping]);

    return (
        <div className={`space-y-12 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Search & Filter */}
            <div className="max-w-xl mx-auto space-y-6">
                <div className="relative">
                    <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5`} />
                    <input
                        type="text"
                        placeholder={isRtl ? "ابحث عن أداة..." : "Search for a tool..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full h-12 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} rounded-xl border border-input bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-secondary/5 hover:bg-secondary/10 text-muted-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tools Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <motion.div
                            layout
                            key={tool.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className={`h-full flex flex-col hover:border-primary/50 transition-colors group bg-card/50 backdrop-blur-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                                            {tool.category === "Chatbots" ? "🤖" :
                                                tool.category === "Design" ? "🎨" : "⚡"}
                                        </div>
                                        {tool.featured && (
                                            <Badge variant="secondary" className="text-xs backdrop-blur-md bg-secondary/10 border-secondary/20">
                                                {isRtl ? 'مميز' : 'Featured'}
                                            </Badge>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{getLocalizedContent(tool.name, locale)}</h3>
                                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {tool.pricingType && (
                                            <Badge variant="outline" className={`text-[10px] font-bold ${tool.pricingType === 'free' ? 'text-green-600 border-green-200 bg-green-50' :
                                                tool.pricingType === 'freemium' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                                                    'text-orange-600 border-orange-200 bg-orange-50'
                                                }`}>
                                                {tool.pricingType === 'free' ? (isRtl ? 'مجاني' : 'Free') :
                                                    tool.pricingType === 'freemium' ? (isRtl ? 'مجاني جزئياً' : 'Freemium') : (isRtl ? 'مدفوع' : 'Paid')}
                                            </Badge>
                                        )}
                                        {tool.featured && (
                                            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                                                {isRtl ? 'مميز' : 'Featured'}
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {getLocalizedContent(tool.description, locale)}
                                    </p>

                                    {/* Use Cases Section */}
                                    {(tool.bestFor || tool.notFor) && (
                                        <div className="pt-4 border-t border-border/50 space-y-3">
                                            {tool.bestFor && tool.bestFor.length > 0 && (
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-green-600 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> {isRtl ? 'مثالي لـ' : 'Best for'}
                                                    </span>
                                                    <ul className={`text-xs text-muted-foreground ${isRtl ? 'pr-4' : 'pl-4'} space-y-1`}>
                                                        {tool.bestFor.slice(0, 2).map((item, i) => (
                                                            <li key={i} className="list-disc">{getLocalizedContent(item, locale)}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {tool.notFor && tool.notFor.length > 0 && (
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-red-500 flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" /> {isRtl ? 'لا يصلح لـ' : 'Not for'}
                                                    </span>
                                                    <ul className={`text-xs text-muted-foreground ${isRtl ? 'pr-4' : 'pl-4'} space-y-1`}>
                                                        {tool.notFor.slice(0, 2).map((item, i) => (
                                                            <li key={i} className="list-disc">{getLocalizedContent(item, locale)}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <div className="flex gap-3 w-full">
                                        <Link href={`/tools/${tool.slug}`} className="flex-1">
                                            <Button variant="secondary" className="w-full bg-secondary/5 hover:bg-primary shadow-sm hover:text-primary-foreground text-foreground border border-border transition-all duration-300">
                                                {isRtl ? 'اقرأ المزيد' : 'Read More'}
                                            </Button>
                                        </Link>
                                        <a href={tool.affiliateLink || tool.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className={`shrink-0 px-3 hover:scale-105 transition-transform ${tool.affiliateLink ? 'border-primary/50 text-primary' : ''}`} title={tool.affiliateLink ? (isRtl ? "رابط إحالة" : "Affiliate link") : (isRtl ? "زيارة الموقع" : "Visit site")}>
                                                ↗
                                            </Button>
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredTools.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">{isRtl ? 'لا توجد نتائج مطابقة لبحثك.' : 'No results matching your search.'}</p>
                </div>
            )}
        </div>
    );
}
