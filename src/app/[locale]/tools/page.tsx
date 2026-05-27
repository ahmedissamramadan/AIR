import { Metadata } from "next";
import { tools } from "@/lib/data";
import ToolsBrowser from "@/components/tools/ToolsBrowser";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? 'الأدوات | ذكاء عملي' : 'Tools | Zakaa Amaly',
        description: isAr
            ? 'دليل شامل لأفضل أدوات الذكاء الاصطناعي لزيادة الإنتاجية.'
            : 'A comprehensive guide to the best AI tools for increasing productivity.',
    };
}

export default async function ToolsPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return (
        <div className={`container mx-auto px-4 py-12 min-h-screen ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {isAr ? (
                        <>أدوات <span className="text-gradient-gold">الذكاء الاصطناعي</span></>
                    ) : (
                        <>AI <span className="text-gradient-gold">Tools</span></>
                    )}
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                    {isAr
                        ? 'دليلك الشامل لأفضل الأدوات التي تساعدك على زيادة الإنتاجية وتحسين جودة العمل.'
                        : 'Your comprehensive guide to the best tools that help you increase productivity and improve work quality.'}
                </p>
                <ToolsBrowser initialTools={tools} />
            </div>
        </div>
    );
}
