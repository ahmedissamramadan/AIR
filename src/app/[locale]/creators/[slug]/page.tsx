import { Metadata } from "next";
import { creators } from "@/lib/data/creators";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { LucideIcon, Youtube, Twitter, Linkedin, Globe, Mail, ExternalLink, ArrowRight, Check, X, Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getLocalizedContent } from "@/lib/data";

interface PageProps {
    params: Promise<{ slug: string; locale: string }>;
}

// Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const creator = creators.find((c) => c.slug === slug);
    if (!creator) return { title: "صانع محتوى غير موجود" };

    const name = getLocalizedContent(creator.name, locale);
    const bio = getLocalizedContent(creator.bio, locale);

    return {
        title: `${name} | ${locale === 'ar' ? 'دليل صُنّاع المحتوى' : 'Creators Directory'}`,
        description: bio,
    };
}

// Generate Static Params
export async function generateStaticParams() {
    return creators.flatMap((creator) => [
        { slug: creator.slug, locale: 'ar' },
        { slug: creator.slug, locale: 'en' }
    ]);
}

const PlatformIcons: Record<string, LucideIcon> = {
    youtube: Youtube,
    x: Twitter,
    linkedin: Linkedin,
    blog: Globe,
    newsletter: Mail,
};

const CategoryIcons: Record<string, string> = {
    education: "🎓",
    reviews: "⭐",
    business: "💼",
    programming: "💻",
    design: "🎨",
    news: "📰",
};

export default async function CreatorDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const isAr = locale === 'ar';
    const creator = creators.find((c) => c.slug === slug);

    if (!creator) {
        notFound();
    }

    const name = getLocalizedContent(creator.name, locale);
    const bio = getLocalizedContent(creator.bio, locale);

    return (
        <div className={`min-h-screen bg-background pb-20 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-8">
                <Link href={`/${locale}/creators`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                    {isAr ? (
                        <>
                            <ArrowRight className="w-4 h-4 ml-2" />
                            العودة للدليل
                        </>
                    ) : (
                        <>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Directory
                        </>
                    )}
                </Link>
            </div>

            {/* Hero Header */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-500" />

                    <div className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${isAr ? '' : 'flex-row-reverse'}`}>
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 border-4 border-background shadow-xl flex items-center justify-center text-4xl overflow-hidden relative">
                                {creator.image ? (
                                    <Image src={creator.image} alt={name} fill className="object-cover" />
                                ) : (
                                    <span>{CategoryIcons[creator.category] || "👤"}</span>
                                )}
                            </div>
                            <div className={`absolute -bottom-2 ${isAr ? '-right-2' : '-left-2'} bg-background rounded-full p-2 border border-border shadow-md`}>
                                {creator.platforms[0] && (() => {
                                    const I = PlatformIcons[creator.platforms[0].type];
                                    return I ? <I className="w-5 h-5 text-primary" /> : null;
                                })()}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div className={`flex flex-wrap items-center gap-3 ${isAr ? '' : 'flex-row-reverse'}`}>
                                <h1 className="text-3xl md:text-5xl font-black tracking-tight">{name}</h1>
                                {typeof creator.name !== 'string' && isAr && creator.name.en && (
                                    <span className="text-xl text-muted-foreground font-medium">({creator.name.en})</span>
                                )}
                                {creator.badge === "featured" && (
                                    <Badge variant="secondary" className="text-sm bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1">
                                        {isAr ? 'مميز 🌟' : 'Featured 🌟'}
                                    </Badge>
                                )}
                            </div>

                            <div className={`flex flex-wrap gap-2 text-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                                <Badge variant="outline" className="h-7 px-3 text-base">{creator.category}</Badge>
                                <span className="flex items-center text-muted-foreground px-2">
                                    <span className={isAr ? 'ml-2' : 'mr-2'}>📍</span> {creator.location?.country ? getLocalizedContent(creator.location.country, locale) : (isAr ? "غير محدد" : "Not specified")}
                                </span>
                                <span className={`flex items-center text-muted-foreground px-2 ${isAr ? 'border-r pr-4 mr-2' : 'border-l pl-4 ml-2'} border-border/50`}>
                                    {isAr ? 'مستوى المحتوى:' : 'Content Level:'} {
                                        creator.level === "beginner" ? (isAr ? "مبتدؤ" : "Beginner") :
                                            creator.level === "intermediate" ? (isAr ? "متوسط" : "Intermediate") :
                                                (isAr ? "متقدم" : "Advanced")
                                    }
                                </span>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                {bio}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className={`flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0 ${isAr ? '' : 'flex-row-reverse'}`}>
                            {creator.platforms.map((p) => {
                                const Icon = PlatformIcons[p.type] || ExternalLink;
                                return (
                                    <Link key={p.type} href={p.url} target="_blank">
                                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl hover:text-primary hover:border-primary/50 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isAr ? '' : 'direction-ltr'}`}>

                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Top Works */}
                        <section>
                            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                <span className="w-1 h-8 bg-primary rounded-full" />
                                {isAr ? 'أبرز الأعمال' : 'Top Works'}
                            </h2>
                            <div className="grid gap-4">
                                {creator.topWorks.map((work, idx) => (
                                    <Link key={idx} href={work.url} target="_blank" className="block group">
                                        <div className={`bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <div className={`flex items-center gap-4 ${isAr ? '' : 'flex-row-reverse'}`}>
                                                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                    {work.type === "video" ? "📺" : work.type === "article" ? "📄" : "🧵"}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{getLocalizedContent(work.title, locale)}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {work.type === "video" ? (isAr ? "فيديو" : "Video") : work.type === "article" ? (isAr ? "مقال" : "Article") : (isAr ? "سلسلة تغريدات" : "Thread")}
                                                    </p>
                                                </div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Detailed Analysis */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-6">
                                <h3 className={`text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                    <Check className="w-5 h-5" />
                                    {isAr ? 'مثالي لـ' : 'Best for'}
                                </h3>
                                <ul className="space-y-3">
                                    {creator.bestFor.map((item, idx) => (
                                        <li key={idx} className={`flex items-start gap-2 text-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                            {getLocalizedContent(item, locale)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {creator.notSuitableFor && creator.notSuitableFor.length > 0 && (
                                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                                    <h3 className={`text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                        <X className="w-5 h-5" />
                                        {isAr ? 'قد لا يناسب' : 'Not suitable for'}
                                    </h3>
                                    <ul className="space-y-3">
                                        {creator.notSuitableFor.map((item, idx) => (
                                            <li key={idx} className={`flex items-start gap-2 text-sm ${isAr ? '' : 'flex-row-reverse'}`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                {getLocalizedContent(item, locale)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                            <h3 className="font-bold mb-4 text-lg">{isAr ? 'معلومات إضافية' : 'Additional Info'}</h3>
                            <div className="space-y-4 divide-y divide-border/50">
                                <div className={`flex justify-between py-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                    <span className="text-muted-foreground">{isAr ? 'تاريخ آخر تحديث' : 'Last Updated'}</span>
                                    <span className={`font-medium flex items-center gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                        <Calendar className="w-4 h-4" />
                                        {creator.updatedAt}
                                    </span>
                                </div>
                                <div className={`flex justify-between py-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                    <span className="text-muted-foreground">{isAr ? 'اللغة الأساسية' : 'Primary Language'}</span>
                                    <span className="font-medium">
                                        {creator.language === "ar" ? (isAr ? "العربية 🇸🇦" : "Arabic 🇸🇦") : creator.language === "en" ? (isAr ? "الإنجليزية 🇺🇸" : "English 🇺🇸") : (isAr ? "مختلط 🌍" : "Mixed 🌍")}
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <p className={`text-xs text-muted-foreground mb-2 ${isAr ? '' : 'text-right'}`}>{isAr ? 'المنصات النشطة' : 'Active Platforms'}</p>
                                    <div className={`flex flex-wrap gap-2 ${isAr ? '' : 'flex-row-reverse'}`}>
                                        {creator.platforms.map(p => (
                                            <Badge key={p.type} variant="secondary" className="text-xs">
                                                {p.type} {p.followers && `(${p.followers})`}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
