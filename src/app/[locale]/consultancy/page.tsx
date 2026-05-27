import { Metadata } from "next";
import { servicePackages, getLocalizedContent } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Check, Mail, Calendar, MessageSquare, Zap } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IMAGES } from "@/lib/image-data";

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
        title: isAr ? "خدمات الاستشارات والتحول الرقمي | ذكاء." : "Consultancy & Digital Transformation | Zakaa",
        description: isAr
            ? "نساعد الشركات في تبني أدوات الذكاء الاصطناعي وأتمتة العمليات لرفع الكفاءة وتقليل التكاليف."
            : "We help companies adopt AI tools and process automation to increase efficiency and reduce costs.",
        openGraph: {
            images: [
                {
                    url: IMAGES.og.consultancy.src,
                    width: IMAGES.og.consultancy.width || 1200,
                    height: IMAGES.og.consultancy.height || 630,
                    alt: IMAGES.og.consultancy.alt,
                },
            ],
        },
    };
}

export default async function ConsultancyPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return (
        <div className={`container mx-auto px-4 py-20 min-h-screen ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* Value Prop */}
            <div className="max-w-4xl mx-auto text-center mb-32 space-y-8">
                <span className="text-primary font-bold tracking-widest uppercase py-2 px-4 bg-primary/10 rounded-full text-xs">
                    {isAr ? 'خدمات استشارية' : 'Consultancy Services'}
                </span>
                <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter mb-4">
                    {isAr ? (
                        <>اجعل الـ AI <br /><span className="text-gradient-gold">الموظف الأذكى في فريقك.</span></>
                    ) : (
                        <>Make AI <br /><span className="text-gradient-gold">the smartest employee in your team.</span></>
                    )}
                </h1>

                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <OptimizedImage
                        config={IMAGES.hero.consultancy}
                        className="object-cover"
                        priority={true}
                    />
                </div>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    {isAr
                        ? 'الذكاء الاصطناعي ليس مجرد "شات". هو نظام متكامل يمكنه أداء مهامك الروتينية، والرد على عملائك، وصناعة محتواك في ثوانٍ. نحن نساعدك على بنائه.'
                        : 'AI is not just a "chat". It is an integrated system that can perform your routine tasks, respond to your customers, and create your content in seconds. We help you build it.'}
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-8">
                    <a href="#booking">
                        <Button size="lg" className="h-16 px-10 text-xl font-bold shadow-2xl shadow-primary/20">
                            {isAr ? 'احجز جلستك الآن' : 'Book your session now'}
                        </Button>
                    </a>
                    <a href="#packages">
                        <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold">
                            {isAr ? 'باقات الأتمتة' : 'Automation Packages'}
                        </Button>
                    </a>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-40">
                {[
                    {
                        icon: MessageSquare,
                        title: isAr ? "تحليل سير العمل" : "Workflow Analysis",
                        desc: isAr ? "ندرس كيف تعمل الآن، ونحدد الثغرات التي يمكن للـ AI سدها فوراً." : "We study how you work now and identify the gaps that AI can fill immediately."
                    },
                    {
                        icon: Zap,
                        title: isAr ? "بناء أنظمة مخصصة" : "Custom Systems Building",
                        desc: isAr ? "نصمم لك أنظمة (Custom GPTs) أو وكلاء (Agents) تعمل خلف الكواليس." : "We design custom systems (Custom GPTs) or agents that work behind the scenes for you."
                    },
                    {
                        icon: Calendar,
                        title: isAr ? "تدريب الفريق" : "Team Training",
                        desc: isAr ? "لا نتركك وحدك. ندرب فريقك على كيفية استخدام الأدوات بأعلى كفاءة." : "We don't leave you alone. We train your team on how to use the tools with the highest efficiency."
                    }
                ].map((s, i) => (
                    <div key={i} className="text-center group p-8 rounded-3xl hover:bg-muted/30 transition-all border border-transparent hover:border-border">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary transition-all">
                            <s.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>

            {/* Packages Section */}
            <div id="packages" className="mb-40">
                <h2 className="text-4xl font-bold text-center mb-20 tracking-tight">
                    {isAr ? 'باقات التعاون والتنفيذ' : 'Collaboration & Implementation Packages'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {servicePackages.map((pkg) => {
                        const pkgTitle = getLocalizedContent(pkg.title, locale);
                        const pkgDesc = getLocalizedContent(pkg.description, locale);
                        return (
                            <div key={pkg.id} className={`p-10 rounded-[2.5rem] bg-card border-2 flex flex-col relative overflow-hidden group transition-all duration-500 hover:shadow-3xl ${pkg.isPopular ? 'border-primary shadow-2xl shadow-primary/10 scale-105' : 'border-border hover:border-primary/30'}`}>
                                {pkg.isPopular && (
                                    <div className={`absolute top-6 ${isAr ? 'left-[-30px]' : 'right-[-30px]'} bg-primary text-primary-foreground text-[10px] font-bold px-10 py-1 ${isAr ? 'rotate-[-45deg]' : 'rotate-[45deg]'} shadow-lg`}>
                                        {isAr ? 'الأكثر مبيعاً' : 'Most Popular'}
                                    </div>
                                )}
                                <h3 className="text-3xl font-bold mb-2">{pkgTitle}</h3>
                                <div className="text-4xl font-bold text-primary mb-6">{pkg.price}</div>
                                <p className="text-muted-foreground mb-8 text-lg font-medium">{pkgDesc}</p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {pkg.features.map((f, i) => (
                                        <li key={i} className={`flex items-start gap-3 font-semibold ${isAr ? '' : 'flex-row-reverse'}`}>
                                            <div className="bg-green-500/10 p-1 rounded-full mt-1">
                                                <Check className="w-4 h-4 text-green-500" />
                                            </div>
                                            <span className={isAr ? '' : 'text-right'}>{getLocalizedContent(f, locale)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button size="lg" className="w-full h-14 text-lg font-bold group-hover:scale-105 transition-transform" variant={pkg.isPopular ? 'primary' : 'secondary'}>
                                    {isAr ? 'ابدأ المشروع' : 'Start Project'}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Booking Form Overlay */}
            <div id="booking" className="max-w-5xl mx-auto p-12 rounded-[3rem] bg-gradient-to-br from-primary via-primary/95 to-primary-foreground text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                <div className={`relative z-10 flex flex-col md:flex-row items-center gap-12 ${isAr ? '' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
                        <h2 className="text-4xl font-bold mb-6">
                            {isAr ? 'هل أنت جاهز للتحول؟' : 'Ready for transformation?'}
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8 font-medium">
                            {isAr
                                ? 'املأ المعلومات السريعة وسنتواصل معك خلال 24 ساعة لترتيب جلسة استكشافية مجانية.'
                                : 'Fill in the quick information and we will contact you within 24 hours to arrange a free exploratory session.'}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 opacity-70" />
                                <span className="text-lg font-bold">hello@zakaa.ai</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[400px] bg-background p-8 rounded-[2rem] shadow-3xl text-foreground">
                        <form className="space-y-4">
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <label className="text-sm font-bold block mb-2">{isAr ? 'اسمك الكريم' : 'Your Name'}</label>
                                <input className="w-full h-12 px-4 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-primary outline-none" required />
                            </div>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <label className="text-sm font-bold block mb-2">{isAr ? 'بريد العمل' : 'Work Email'}</label>
                                <input type="email" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-primary outline-none" required />
                            </div>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <label className="text-sm font-bold block mb-2">{isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}</label>
                                <textarea className="w-full h-32 px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-primary outline-none resize-none" />
                            </div>
                            <Button className="w-full h-14 text-lg font-bold">
                                {isAr ? 'أرسل الطلب' : 'Send Request'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
