import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Check, Mail, Users, BarChart3, Target } from "lucide-react";
import Link from "next/link";

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
        title: isAr ? "Media Kit | Advertise with Zakaa" : "Media Kit | Advertise with Zakaa Amaly",
        description: isAr
            ? "شاركنا النجاح. قدم أداتك أو خدمتك لجمهور متخصص من رواد الأعمال والمهتمين بالذكاء الاصطناعي."
            : "Join our success. Present your tool or service to a specialized audience of entrepreneurs and AI enthusiasts.",
    };
}

export default async function MediaKitPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return (
        <div className={`container mx-auto px-4 py-20 min-h-screen ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
                <span className="text-primary font-bold tracking-widest uppercase py-1 px-3 bg-primary/10 rounded-full text-xs">
                    {isAr ? 'Media Kit 2025' : 'Media Kit 2025'}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    {isAr ? (
                        <>أطلق منتجك أمام <br /><span className="text-gradient-gold">جمهور ذكي وعملي.</span></>
                    ) : (
                        <>Launch your product in front of <br /><span className="text-gradient-gold">a smart and practical audience.</span></>
                    )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {isAr
                        ? 'نحن نساعد شركات التقنية وأصحاب أدوات الـ AI في الوصول إلى رياديي الأعمال والصناع في العالم العربي من خلال محتوى تقني رصين وموثوق.'
                        : 'We help tech companies and AI tool owners reach entrepreneurs and makers in the Arab world through solid and reliable tech content.'}
                </p>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="mailto:hello@zakaa.ai">
                        <Button size="lg" className="h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/30 rounded-2xl">
                            {isAr ? 'تواصل معنا للإعلان' : 'Contact us for advertising'}
                        </Button>
                    </a>
                    <Button variant="outline" size="lg" className="h-16 px-12 text-xl font-bold border-2 rounded-2xl hover:bg-primary/5">
                        {isAr ? 'تحميل الـ Media Kit (PDF)' : 'Download Media Kit (PDF)'}
                    </Button>
                </div>
            </div>

            {/* Platform Screenshots Section */}
            <div className="max-w-6xl mx-auto mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{isAr ? 'لمحات من المنصة' : 'Platform Insights'}</h2>
                    <p className="text-muted-foreground mt-2">
                        {isAr ? 'صور عالية الجودة تمثل هويتنا واحترافيتنا' : 'High-quality images representing our identity and professionalism'}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[16/10] bg-secondary/10 border border-border rounded-3xl flex items-center justify-center relative overflow-hidden group">
                        <span className="text-muted-foreground font-bold">{isAr ? 'لقطة شاشة: الرئيسية' : 'Screenshot: Homepage'}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-0 transition-opacity" />
                    </div>
                    <div className="aspect-[16/10] bg-secondary/10 border border-border rounded-3xl flex items-center justify-center relative overflow-hidden group">
                        <span className="text-muted-foreground font-bold">{isAr ? 'لقطة شاشة: نظام عمل' : 'Screenshot: Work System'}</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-0 transition-opacity" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
                {[
                    { label: isAr ? "مشترك في النشرة البريدية" : "Newsletter Subscribers", value: "+10,000", icon: Mail, color: "text-blue-500" },
                    { label: isAr ? "زيارة شهرية للمنصة" : "Monthly Platform Visits", value: "+50,000", icon: Users, color: "text-green-500" },
                    { label: isAr ? "معدل فتح النشرة البريدية" : "Newsletter Open Rate", value: "48%", icon: BarChart3, color: "text-purple-500" }
                ].map((stat, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-secondary/5 border border-border/50 text-center hover:bg-secondary/10 transition-colors">
                        <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
                        <div className="text-4xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Why Advertise With Us */}
            <div className="max-w-5xl mx-auto mb-32">
                <h2 className="text-4xl font-bold text-center mb-16">
                    {isAr ? <>لماذا تعلن في &quot;ذكاء&quot;؟</> : <>Why advertise with &quot;Zakaa&quot;?</>}
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {[
                        {
                            title: isAr ? "جمهور عالي الجودة" : "High-Quality Audience",
                            desc: isAr ? "القراء هم رواد أعمال، مسوقون، ومبرمجون يبحثون عن أدوات لزيادة إنتاجيتهم ولدي القوة الشرائية." : "Readers are entrepreneurs, marketers, and programmers looking for tools to increase their productivity and having purchasing power."
                        },
                        {
                            title: isAr ? "سلطة ومصداقية" : "Authority and Credibility",
                            desc: isAr ? "نحن لا ننشر إعلانات 'عشوائية'. نختار فقط الأدوات التي تقدم قيمة حقيقية، مما يزيد من ثقة الجمهور في المعلن." : "We don't publish 'random' ads. We choose only tools that provide real value, which increases audience trust in the advertiser."
                        },
                        {
                            title: isAr ? "توزيع متعدد القنوات" : "Multi-Channel Distribution",
                            desc: isAr ? "إعلانك لا يظهر في الموقع فقط، بل يصل لآلاف الصناديق البريدية ويظهر في منصاتنا الاجتماعية." : "Your ad doesn't only appear on the site, but reaches thousands of mailboxes and appears on our social platforms."
                        },
                        {
                            title: isAr ? "دعم فني وتسويقي" : "Technical and Marketing Support",
                            desc: isAr ? "نساعدك في صياغة الرسالة الإعلانية باللهجة المصرية أو العربية الفصحى بما يتناسب مع جمهورنا." : "We help you draft the advertising message in Egyptian dialect or Modern Standard Arabic to suit our audience."
                        }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                            <div className="bg-primary/10 p-3 rounded-xl h-fit shrink-0">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ad Slots */}
            <div className="max-w-5xl mx-auto mb-32">
                <h2 className="text-4xl font-bold text-center mb-16">{isAr ? 'المساحات المتوفرة' : 'Available Spaces'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: isAr ? "مراجعة أداة (Tool Listing)" : "Tool Listing Review",
                            price: "250$",
                            features: isAr
                                ? ["إدراج في الصفحة الرئيسية", "شرح تفصيلي للميزات", "رابط دائم خلفي (Backlink)", "نشر في منصات التواصل"]
                                : ["Homepage listing", "Detailed features explanation", "Permanent backlink", "Social media promotion"]
                        },
                        {
                            title: isAr ? "مقال ممول (Sponsored Post)" : "Sponsored Post",
                            price: "500$",
                            features: isAr
                                ? ["كتابة مقال متخصص (1500 كلمة)", "تصميمات مخصصة", "بقاء المقال مدى الحياة", "إرسال المقال في النشرة"]
                                : ["Specialized article writing (1500 words)", "Custom designs", "Lifetime article retention", "Newsletter distribution"]
                        },
                        {
                            title: isAr ? "رعاية النشرة (Newsletter)" : "Newsletter Sponsorship",
                            price: "150$",
                            features: isAr
                                ? ["ذكر في مقدمة النشرة برابط مباشر", "فقرة مخصصة للمنتج", "وصول مباشر لبريد +10,000 مشترك", "تقارير أداء مفصلة"]
                                : ["Mention in newsletter intro with direct link", "Dedicated product paragraph", "Direct access to +10,000 subscribers", "Detailed performance reports"]
                        }
                    ].map((slot, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-card border-2 border-border flex flex-col hover:border-primary/30 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
                            <h3 className="text-2xl font-bold mb-4">{slot.title}</h3>
                            <div className="text-3xl font-bold text-primary mb-8">{isAr ? `بدءاً من ${slot.price}` : `Starting from ${slot.price}`}</div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {slot.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm font-medium">
                                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href={`mailto:ads@zakaa.ai?subject=Advertising - ${slot.title}`}>
                                <Button className="w-full h-12 font-bold group-hover:scale-105 transition-transform" variant={i === 1 ? "primary" : "secondary"}>
                                    {isAr ? 'احجز الآن' : 'Book Now'}
                                </Button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final Call */}
            <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 via-background to-secondary/20 border border-primary/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                <h2 className="text-4xl font-bold mb-6">{isAr ? 'هل أنت جاهز للنمو؟' : 'Ready to grow?'}</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    {isAr
                        ? 'انضم إلى قائمة شركائنا اليوم وابدأ في الوصول إلى الجمهور الذي يبحث عن حلولك.'
                        : 'Join our list of partners today and start reaching the audience looking for your solutions.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="mailto:hello@zakaa.ai">
                        <Button size="lg" className="h-14 px-10 text-lg font-bold">{isAr ? 'تواصل معنا' : 'Contact Us'}</Button>
                    </a>
                    <Link href={`/${locale}/about`}>
                        <Button size="lg" variant="ghost" className="h-14 px-10 text-lg font-bold">{isAr ? 'المزيد عن المنصة' : 'More about the platform'}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
