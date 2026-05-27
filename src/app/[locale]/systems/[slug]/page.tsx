import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Zap } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { systems, getLocalizedContent, System } from "@/lib/data";
import { Metadata } from "next";
import { CopyButton } from "@/components/ui/CopyButton";
import { SystemSuccessMetrics } from "@/components/systems/SystemSuccessMetrics";
import { TemplateLibrary } from "@/components/systems/TemplateLibrary";
import { SystemLessons } from "@/components/systems/SystemLessons";
import { VisualComparison } from "@/components/systems/VisualComparison";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { MidPageCTA } from "@/components/ui/MidPageCTA";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const system = systems.find(s => s.slug === decodedSlug);
    if (!system) return {};

    const title = getLocalizedContent(system.title, locale);
    const description = getLocalizedContent(system.description, locale);

    return {
        title: `${title} | ذكاء`,
        description: description,
    };
}

export function generateStaticParams() {
    return systems.map(system => ({
        slug: system.slug,
    }));
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const system = systems.find(s => s.slug === decodedSlug);

    if (!system) notFound();

    const title = getLocalizedContent(system.title, locale);
    const subtitle = getLocalizedContent(system.subtitle, locale);
    const description = getLocalizedContent(system.description, locale);
    const problem = getLocalizedContent(system.problem, locale);
    const result = getLocalizedContent(system.result, locale);

    // JSON-LD for System
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: title,
        description: description,
        image: system.image,
        step: system.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: getLocalizedContent(step.title, locale),
            itemListElement: [{
                "@type": "HowToDirection",
                text: getLocalizedContent(step.description, locale)
            }]
        })),
        totalTime: "PT30M", // From system stats if available
        publisher: {
            "@type": "Organization",
            "name": "ذكاء عملي",
            "logo": {
                "@type": "ImageObject",
                "url": "https://arabic-ai-blog.vercel.app/logo.png"
            }
        }
    };

    return (
        <div className={`min-h-screen bg-background ${locale === 'ar' ? 'text-right' : 'text-left'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Header */}
            <header className="relative pt-32 pb-20 px-4 overflow-hidden bg-secondary/5 border-b border-border">
                <div className="absolute inset-0 bg-system-grid opacity-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-5xl relative z-10">
                    <Link href={`/${locale}/systems`}>
                        <Button variant="ghost" size="sm" className="mb-6 hover:bg-background/50 gap-2">
                            <ArrowLeft className={locale === 'ar' ? "w-4 h-4" : "w-4 h-4 rotate-180"} />
                            {locale === 'ar' ? 'العودة للأنظمة' : 'Back to Systems'}
                        </Button>
                    </Link>

                    <CopyButton
                        text={`${title}\n\n${description}`}
                        label={locale === 'ar' ? "نسخ فكرة النظام" : "Copy system idea"}
                        variant="secondary"
                        className={`mb-6 ${locale === 'ar' ? 'mr-4' : 'ml-4'} font-bold`}
                    />

                    <div className="flex flex-wrap gap-3 mb-6">
                        <Badge variant="outline" className="bg-background/50 backdrop-blur border-primary/20 text-primary gap-1">
                            <Zap className="w-3 h-3 fill-current" />
                            {locale === 'ar' ? 'نظام جاهز' : 'Ready System'}
                        </Badge>
                        <TrustBadge />
                        <Badge variant="secondary" className="bg-background/50">{system.toolsUsed.length} {locale === 'ar' ? 'أدوات' : 'Tools'}</Badge>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                        {subtitle}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                        {system.stats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-background border border-border shadow-sm">
                                <div className="text-xs text-muted-foreground mb-1">{getLocalizedContent(stat.label, locale)}</div>
                                <div className="font-bold text-lg text-primary">{getLocalizedContent(stat.value, locale)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Problem / Result Split (Using VisualComparison) */}
            <section className="py-20 container mx-auto px-4 max-w-5xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">{locale === 'ar' ? 'لماذا تحتاج هذا النظام؟' : 'Why do you need this system?'}</h2>
                    <p className="text-muted-foreground">{locale === 'ar' ? 'الفرق بين الطريقة التقليدية والنظام المؤتمت' : 'The difference between the traditional method and the automated system'}</p>
                </div>

                <VisualComparison
                    before={{
                        title: locale === 'ar' ? "الطريقة التقليدية (المشكلة)" : "Traditional Method (Problem)",
                        description: problem,
                        stats: [
                            { label: locale === 'ar' ? "الجهد" : "Effort", value: locale === 'ar' ? "يدوي ومرهق" : "Manual and exhausting" },
                            { label: locale === 'ar' ? "المخاطرة" : "Risk", value: locale === 'ar' ? "خطأ بشري وارد" : "Human error possible" }
                        ]
                    }}
                    after={{
                        title: locale === 'ar' ? "مع نظام ذكاء (النتيجة)" : "With AI System (Result)",
                        description: result,
                        stats: [
                            { label: locale === 'ar' ? "الجهد" : "Effort", value: locale === 'ar' ? "آلي بالكامل" : "Fully automated" },
                            { label: locale === 'ar' ? "الدقة" : "Accuracy", value: "100%" }
                        ]
                    }}
                />

                {/* Success Metrics (Phase 4) */}
                {system.valueIdentity && (
                    <div className="mt-16">
                        <SystemSuccessMetrics valueIdentity={system.valueIdentity} locale={locale} />
                    </div>
                )}
            </section>

            {/* Implementation Steps */}
            <section className="py-20 bg-secondary/5 border-y border-border/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">{locale === 'ar' ? 'كيف يعمل النظام؟' : 'How does the system work?'}</h2>
                    <div className={`space-y-12 relative ${locale === 'ar' ? 'before:absolute before:right-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-border/50' : 'before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-border/50'} h-full`}>
                        {system.steps.map((step, i) => (
                            <div key={i} className="relative flex gap-8">
                                <div className="flex-none w-16 h-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center font-bold text-2xl text-primary z-10 relative">
                                    {i + 1}
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold">{getLocalizedContent(step.title, locale)}</h3>
                                        {step.tool && (
                                            <Badge variant="outline" className="text-xs font-normal opacity-70">
                                                {step.tool}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-lg">{getLocalizedContent(step.description, locale)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Templates & Lessons (Phase 4) */}
                    {system.templates && (
                        <TemplateLibrary templates={system.templates} locale={locale} />
                    )}
                    {system.lessons && (
                        <SystemLessons lessons={system.lessons} locale={locale} />
                    )}
                </div>
            </section>

            {/* Mid-Page Sticky CTA */}
            <MidPageCTA locale={locale} />

            {/* Social Proof (Phase 4) - Note: socialProof is currently not used but kept for consistency */}
            {(system as System & { socialProof?: { testimonials: { content: string; avatar?: string; user: string; role: string }[] } }).socialProof && (
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">{locale === 'ar' ? 'نتائج المشتركين وشهاداتهم' : 'Subscriber Results and Testimonials'}</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {(system as System & { socialProof: { testimonials: { content: string; avatar?: string; user: string; role: string }[] } }).socialProof.testimonials.map((t, i: number) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-card border border-border relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
                                    <p className="text-lg text-muted-foreground mb-8 relative z-10">&quot;{getLocalizedContent(t.content, locale)}&quot;</p>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-secondary/20 border border-border overflow-hidden">
                                            {t.avatar ? (
                                                <OptimizedImage
                                                    config={{
                                                        src: t.avatar,
                                                        alt: getLocalizedContent(t.user, locale),
                                                        category: "testimonials",
                                                        width: 48,
                                                        height: 48
                                                    }}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold">{getLocalizedContent(t.user, locale)}</div>
                                            <div className="text-sm text-muted-foreground">{getLocalizedContent(t.role, locale)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <div className="container mx-auto px-4 max-w-4xl py-20">
                <ArticleCTA locale={locale} />
            </div>

        </div>
    );
}
