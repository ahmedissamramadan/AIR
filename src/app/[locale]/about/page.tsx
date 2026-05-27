import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IMAGES } from "@/lib/image-data";
import { authors, getLocalizedContent } from "@/lib/data";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? "من نحن | ذكاء عملي" : "About Us | Zakaa Amaly",
        description: isAr
            ? "تعرف على الفريق وراء منصة ذكاء عملي، ورسالتنا في تمكين رواد الأعمال العرب باستخدام أدوات الذكاء الاصطناعي."
            : "Meet the team behind Zakaa Amaly, and our mission to empower Arab entrepreneurs using AI tools.",
        openGraph: {
            images: [
                {
                    url: IMAGES.og.default.src,
                    width: IMAGES.og.default.width || 1200,
                    height: IMAGES.og.default.height || 630,
                    alt: IMAGES.og.default.alt,
                },
            ],
        },
    };
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": isAr ? "ذكاء عملي" : "Zakaa Amaly",
            "url": `https://arabic-ai-blog.vercel.app/${locale}`,
            "logo": "https://arabic-ai-blog.vercel.app/logo.png",
            "sameAs": [
                "https://x.com/zakaa_ai",
                "https://linkedin.com/company/zakaa-ai"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@zakaa.ai",
                "contactType": "customer support"
            }
        }
    };

    return (
        <div className={`container mx-auto px-4 py-12 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-foreground">
                    {isAr ? 'من نحن' : 'About Us'}
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto mb-12 text-muted-foreground">
                    <p className="mb-6 text-xl leading-relaxed">
                        {isAr
                            ? 'نحن منصة متخصصة في تبسيط تقنيات الذكاء الاصطناعي لرواد الأعمال الشباب في العالم العربي. هدفنا هو سد الفجوة بين التكنولوجيا المعقدة والتطبيق العملي في مجال الأعمال.'
                            : 'We are a platform specialized in simplifying AI technologies for young entrepreneurs in the Arab world. Our goal is to bridge the gap between complex technology and practical business implementation.'}
                    </p>
                    <p className="mb-6">
                        {isAr
                            ? 'نؤمن بأن الذكاء الاصطناعي ليس مجرد "تريند"، بل هو أداة ولادة لفرص جديدة ومساحة لزيادة الإنتاجية بشكل غير مسبوق. من خلال مقالاتنا وأدواتنا، نسعى لتمكين الجيل القادم من المبتكرين العرب.'
                            : 'We believe that AI is not just a "trend", but a creative tool for new opportunities and a space for unprecedented productivity increases. Through our articles and tools, we seek to empower the next generation of Arab innovators.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {(isAr ? [
                        { title: "رؤيتنا", desc: "تمكين كل رائد أعمال عربي بأدوات المستقبل." },
                        { title: "مهمتنا", desc: "تبسيط المعرفة التقنية وجعلها قابلة للتنفيذ." },
                        { title: "قيمنا", desc: "المصداقية، البساطة، والجودة." }
                    ] : [
                        { title: "Our Vision", desc: "Empowering every Arab entrepreneur with the tools of the future." },
                        { title: "Our Mission", desc: "Simplifying technical knowledge and making it actionable." },
                        { title: "Our Values", desc: "Credibility, Simplicity, and Quality." }
                    ]).map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">{isAr ? 'فريق العمل' : 'Our Team'}</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {Object.values(authors).map((author) => {
                            const name = getLocalizedContent(author.name, locale);
                            const role = getLocalizedContent(author.role, locale);

                            return (
                                <div key={name} className="flex flex-col items-center gap-3">
                                    <div className="p-1 rounded-full border-2 border-primary/20">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted">
                                            <OptimizedImage
                                                config={{
                                                    src: author.avatar,
                                                    alt: name,
                                                    category: "testimonials",
                                                    width: 80,
                                                    height: 80
                                                }}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-bold">{name}</h4>
                                        <p className="text-xs text-muted-foreground">{role}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center">
                    <h2 className="text-3xl font-bold mb-4">{isAr ? 'هل لديك استفسار؟' : 'Have a Question?'}</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        {isAr
                            ? 'يسعدنا دائماً سماع آرائكم ومقترحاتكم. تواصل معنا في أي وقت عبر البريد الإلكتروني: '
                            : 'We are always happy to hear your opinions and suggestions. Contact us anytime via email: '}
                        <a href="mailto:hello@zakaa.ai" className="text-primary font-bold hover:underline">hello@zakaa.ai</a>
                    </p>
                    <a href="mailto:hello@zakaa.ai">
                        <Button size="lg" className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                            {isAr ? 'تواصل معنا مباشرة' : 'Contact Us Directly'}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
