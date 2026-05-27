import { tools, getLocalizedContent } from "@/lib/data";
import { notFound } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Globe } from "lucide-react";
import { RichContent } from "@/components/RichContent";


export async function generateStaticParams() {
    return ['en', 'ar'].flatMap((locale) =>
        tools.map((tool) => ({
            locale,
            slug: tool.slug,
        }))
    );
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }) {
    const { slug, locale } = params;
    const decodedSlug = decodeURIComponent(slug);
    const tool = tools.find((t) => t.slug === decodedSlug);
    if (!tool) return { title: 'أداة غير موجودة' };

    const name = getLocalizedContent(tool.name, locale);
    const description = getLocalizedContent(tool.description, locale);
    const toolImage = tool.image || '/images/placeholder-tool.png';

    return {
        title: `${name} | أفضل أدوات الذكاء الاصطناعي`,
        description: description,
        openGraph: {
            title: name,
            description: description,
            images: [toolImage],
        },
    };
}

export default async function ToolDetailPage({ params }: { params: { slug: string; locale: string } }) {
    const { slug, locale } = params;
    const decodedSlug = decodeURIComponent(slug);
    const tool = tools.find((t) => t.slug === decodedSlug);

    if (!tool) {
        notFound();
    }

    const toolImage = tool.image || '/images/placeholder-tool.png';
    const name = getLocalizedContent(tool.name, locale);
    const description = getLocalizedContent(tool.description, locale);
    const content = tool.content ? getLocalizedContent(tool.content, locale) : '';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "applicationCategory": tool.category,
        "operatingSystem": "Web",
        "url": tool.link,
        "image": toolImage,
        "publisher": {
            "@type": "Organization",
            "name": "ذكاء عملي"
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 text-right" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    href={`/${locale}/tools`}
                    className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group"
                >
                    <ArrowLeft className={locale === 'ar' ? "ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" : "mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180"} />
                    {locale === 'ar' ? 'عودة للأدوات' : 'Back to Tools'}
                </Link>

                <div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
                >
                    <div className="relative h-64 md:h-80 w-full bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 bg-background rounded-2xl shadow-2xl p-4 flex items-center justify-center">
                                <OptimizedImage
                                    config={{
                                        src: toolImage,
                                        alt: name,
                                        category: "tools",
                                        width: 224,
                                        height: 224
                                    }}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Badge variant="secondary" className="text-sm">{tool.category}</Badge>
                                {tool.featured && <Badge variant="secondary">{locale === 'ar' ? 'مميز' : 'Featured'}</Badge>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                {description}
                            </p>
                        </div>

                        {content && (
                            <div className={`prose prose-lg dark:prose-invert mx-auto mb-12 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                                <RichContent content={content} />
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link href={tool.link} target="_blank">
                                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
                                    <Globe className={locale === 'ar' ? "ml-2 w-5 h-5" : "mr-2 w-5 h-5"} />
                                    {locale === 'ar' ? 'زيارة الموقع الرسمي' : 'Visit Official Website'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
