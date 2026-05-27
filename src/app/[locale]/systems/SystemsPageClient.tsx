"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { System, getLocalizedContent } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Search, Zap, Clock, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SystemsPageClientProps {
    locale: string;
    systems: System[];
}

const getGoals = (isAr: boolean) => [
    { id: "all", label: isAr ? "الكل" : "All" },
    { id: "writing", label: isAr ? "كتابة" : "Writing" },
    { id: "management", label: isAr ? "إدارة" : "Management" },
    { id: "analysis", label: isAr ? "تحليل" : "Analysis" },
    { id: "automation", label: isAr ? "أتمتة" : "Automation" },
];

const getLevels = (isAr: boolean) => [
    { id: "all", label: isAr ? "كل المستويات" : "All Levels" },
    { id: "beginner", label: isAr ? "مبتدئ" : "Beginner" },
    { id: "intermediate", label: isAr ? "متوسط" : "Intermediate" },
    { id: "advanced", label: isAr ? "متقدم" : "Advanced" },
];

const getSynonyms = (isAr: boolean): Record<string, string[]> => ({
    "automation": isAr ? ["أتمتة", "تلقائي", "آلي", "ربط"] : ["automation", "automatic", "automated", "connect"],
    "writing": isAr ? ["كتابة", "محتوى", "تدوين", "صناعة"] : ["writing", "content", "blogging", "creation"],
    "management": isAr ? ["إدارة", "تنظيم", "ترتيب", "تخطيط"] : ["management", "organization", "arrangement", "planning"],
    "analysis": isAr ? ["تحليل", "بيانات", "استخراج", "دراسة"] : ["analysis", "data", "extraction", "study"],
});

export default function SystemsPageClient({ locale, systems }: SystemsPageClientProps) {
    const isAr = locale === 'ar';
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");

    const goals = useMemo(() => getGoals(isAr), [isAr]);
    const levels = useMemo(() => getLevels(isAr), [isAr]);
    const synonyms = useMemo(() => getSynonyms(isAr), [isAr]);

    const filteredSystems = useMemo(() => {
        return systems.filter((system) => {
            const query = searchQuery.toLowerCase();
            const goalMatch = selectedGoal === "all" || system.filterMetadata?.goal === selectedGoal;
            const levelMatch = selectedLevel === "all" || system.filterMetadata?.level === selectedLevel;

            const title = getLocalizedContent(system.title, locale);
            if (!title) return false;
            const description = getLocalizedContent(system.description, locale);
            const subtitle = system.subtitle ? getLocalizedContent(system.subtitle, locale) : '';

            const content = `${title} ${description} ${subtitle}`.toLowerCase();
            let searchMatch = content.includes(query);

            if (!searchMatch) {
                for (const [key, list] of Object.entries(synonyms)) {
                    if (query === key || list.some(s => s.toLowerCase().includes(query) || query.includes(s.toLowerCase()))) {
                        if (system.filterMetadata?.goal === key || content.includes(key)) {
                            searchMatch = true;
                            break;
                        }
                    }
                }
            }

            return goalMatch && levelMatch && searchMatch;
        });
    }, [searchQuery, selectedGoal, selectedLevel, systems, locale, synonyms]);

    return (
        <div className={`min-h-screen bg-background ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-secondary/5 border-b border-border">
                <div className="absolute inset-0 bg-system-grid opacity-30 pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 bg-background/50 backdrop-blur border-primary/20 text-primary gap-1 mx-auto">
                        <Zap className="w-3 h-3 fill-current" />
                        {isAr ? 'أنظمة الإنتاجية' : 'Productivity Systems'}
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        {isAr ? (
                            <>أنظمة عمل جاهزة <br /><span className="text-gradient-gold">للنسخ واللصق</span></>
                        ) : (
                            <>Ready-to-use <br /><span className="text-gradient-gold">Copy & Paste Systems</span></>
                        )}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                        {isAr
                            ? 'لا تبدأ من الصفر. اختر النظام المناسب لهدفك، انسخ الخطوات، وابدأ بتوفير الوقت فوراً.'
                            : 'Don\'t start from scratch. Choose the system that fits your goal, copy the steps, and start saving time immediately.'}
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="max-w-4xl mx-auto bg-card border border-border shadow-2xl rounded-[2.5rem] p-4">
                        <div className={`flex flex-col md:flex-row gap-4 ${isAr ? '' : 'flex-row-reverse'}`}>
                            <div className="relative flex-1">
                                <Search className={`absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5`} />
                                <input
                                    type="text"
                                    placeholder={isAr ? "ابحث بالنظام أو الهدف (مثلاً: أتمتة المحتوى)..." : "Search by system or goal (e.g., content automation)..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full h-14 ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} rounded-2xl bg-secondary/5 border-transparent focus:bg-background focus:border-primary/20 transition-all outline-none`}
                                />
                            </div>
                            <div className={`flex gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                <select
                                    value={selectedGoal}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="h-14 px-4 rounded-2xl bg-secondary/5 border-transparent outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                >
                                    {goals.map(g => (
                                        <option key={g.id} value={g.id}>{g.label}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="h-14 px-4 rounded-2xl bg-secondary/5 border-transparent outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                >
                                    {levels.map(l => (
                                        <option key={l.id} value={l.id}>{l.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Systems Grid */}
            <div className="container mx-auto px-4 py-20 max-w-6xl">
                <AnimatePresence mode="popLayout">
                    <motion.div layout className="grid md:grid-cols-2 gap-8">
                        {filteredSystems.map((system) => {
                            const title = getLocalizedContent(system.title, locale);
                            const description = getLocalizedContent(system.description, locale);
                            const expectedTime = system.filterMetadata?.expectedTime ? getLocalizedContent(system.filterMetadata.expectedTime, locale) : (isAr ? "غير محدد" : "Not specified");

                            return (
                                <motion.div
                                    layout
                                    key={system.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative flex flex-col h-full bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    {/* Image & Badges */}
                                    <div className="relative h-64 w-full overflow-hidden bg-secondary/10">
                                        {system.image ? (
                                            <Image
                                                src={system.image}
                                                alt={title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                                <Zap className="w-24 h-24" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                                        <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} flex gap-2`}>
                                            {system.filterMetadata?.level && (
                                                <Badge className="bg-primary text-primary-foreground font-bold rounded-full px-3 py-1">
                                                    {levels.find(l => l.id === system.filterMetadata?.level)?.label}
                                                </Badge>
                                            )}
                                            <div className="flex flex-col gap-2 items-end">
                                                <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold rounded-full">
                                                    {system.toolsUsed.length} {isAr ? 'أدوات' : 'Tools'}
                                                </Badge>
                                                <div className="bg-green-500/90 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-lg">
                                                    {isAr ? '✅ تم اختباره' : '✅ Tested'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-10 flex flex-col flex-1">
                                        <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                            {title}
                                        </h2>
                                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-2">
                                            {description}
                                        </p>

                                        {/* Quick Info Bar */}
                                        <div className={`flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border/50 ${isAr ? '' : 'flex-row-reverse justify-end'}`}>
                                            <div className={`flex items-center gap-2 text-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span className="font-bold">{expectedTime}</span>
                                            </div>
                                            <div className={`flex items-center gap-2 text-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                                                <Target className="w-4 h-4 text-primary" />
                                                <span className="font-bold">{goals.find(g => g.id === system.filterMetadata?.goal)?.label || (isAr ? "عام" : "General")}</span>
                                            </div>
                                        </div>

                                        <div className={`flex flex-col sm:flex-row gap-4 mt-auto ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <Button
                                                className="h-14 flex-1 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${title}\n${description}`);
                                                    toast.success(isAr ? "تم نسخ تفاصيل النظام! جاهز للصق." : "System details copied! Ready to paste.");
                                                }}
                                            >
                                                {isAr ? 'نسخ النظام' : 'Copy System'}
                                            </Button>
                                            <Link href={`/${locale}/systems/${system.slug}`} className="flex-1">
                                                <Button variant="outline" className="w-full h-14 text-lg font-bold rounded-2xl border-2 hover:bg-primary/5">
                                                    {isAr ? 'عرض التفاصيل' : 'View Details'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {filteredSystems.length === 0 && (
                    <div className="text-center py-32 rounded-[3rem] bg-secondary/5 border border-dashed border-border">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">
                            {isAr ? 'لم نجد أنظمة تطابق بحثك' : 'No systems match your search'}
                        </h3>
                        <p className="text-muted-foreground text-lg">
                            {isAr ? 'جرب تغيير الفلاتر أو البحث بمرادفات أخرى.' : 'Try changing the filters or searching for other synonyms.'}
                        </p>
                        <Button
                            variant="ghost"
                            className="mt-8 text-primary font-bold"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedGoal("all");
                                setSelectedLevel("all");
                            }}
                        >
                            {isAr ? 'تصفير كل الفلاتر' : 'Reset all filters'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
