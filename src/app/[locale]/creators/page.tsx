import { Metadata } from "next";
import { creators } from "@/lib/data/creators";
import { CreatorsBrowser } from "@/components/creators/CreatorsBrowser";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? "دليل صُنّاع المحتوى | أثير" : "Creators Directory | AIR",
        description: isAr
            ? "دليلك الشامل لأفضل صُنّاع المحتوى العرب في مجال الذكاء الاصطناعي. تعلم من الخبراء في البرمجة، التصميم، الأعمال، والمزيد."
            : "Your comprehensive guide to the best Arab content creators in the field of AI. Learn from experts in programming, design, business, and more.",
    };
}

export default async function CreatorsPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return (
        <div className={`min-h-screen bg-background pb-20 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className="relative border-b border-border/50 bg-card overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        {isAr ? (
                            <>دليل <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">صُنّاع المحتوى</span></>
                        ) : (
                            <>Creators <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Directory</span></>
                        )}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        {isAr
                            ? 'اكتشف نخبة الخبراء العرب في الذكاء الاصطناعي. تعلم من تجاربهم، تابع شروحاتهم، وابدأ رحلتك مع أفضل المصادر الموثوقة.'
                            : 'Discover the elite Arab experts in AI. Learn from their experiences, follow their explanations, and start your journey with the best trusted sources.'}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="#directory">
                            <Button size="lg" className="h-12 px-8 rounded-full text-lg">
                                {isAr ? 'تصفح الدليل' : 'Browse Directory'}
                            </Button>
                        </Link>
                        <Link href={`/${locale}/contact`}>
                            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-lg gap-2">
                                <PlusCircle className="w-5 h-5" />
                                {isAr ? 'رشح صانع محتوى' : 'Nominate a Creator'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Directory Section */}
            <div id="directory" className="container mx-auto px-4 py-12">
                <CreatorsBrowser initialCreators={creators} locale={locale} />
            </div>
        </div>
    );
}
