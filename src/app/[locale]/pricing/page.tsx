import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Check, X, Crown } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "خطط الأسعار | انضم لـ ذكاء PRO",
    description: "اختر الخطة المناسبة لك وابدأ في تحويل الذكاء الاصطناعي إلى محرك لإنتاجيتك.",
};

export default function PricingPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                <h1 className="text-5xl md:text-7xl font-bold">خطط <span className="text-gradient-gold">النمو.</span></h1>
                <p className="text-xl text-muted-foreground">
                    ابدأ مجاناً وتعلم الأساسيات، أو انضم للمحترفين واحصل على الأنظمة الكاملة.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32">
                {/* Free Tier */}
                <div className="p-10 rounded-[2.5rem] bg-card border border-border flex flex-col hover:border-border/80 transition-all">
                    <h3 className="text-2xl font-bold mb-2">الخطة المجانية</h3>
                    <div className="text-4xl font-bold mb-6">0$<span className="text-lg text-muted-foreground font-medium"> / للأبد</span></div>
                    <ul className="space-y-4 mb-10 flex-1">
                        {[
                            { text: "قراءة المقالات العامة", available: true },
                            { text: "تصفح دليل الأدوات", available: true },
                            { text: "تحميل Lead Magnets المجانية", available: true },
                            { text: "الوصول للأنظمة المتقدمة", available: false },
                            { text: "قوالب العمل الجاهزة (Notion/Make)", available: false },
                            { text: "دعم فني خاص", available: false }
                        ].map((f, i) => (
                            <li key={i} className={`flex items-center gap-3 text-sm font-medium ${f.available ? '' : 'text-muted-foreground/50'}`}>
                                {f.available ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5" />}
                                <span>{f.text}</span>
                            </li>
                        ))}
                    </ul>
                    <Link href="/login">
                        <Button variant="secondary" className="w-full h-14 text-lg">ابدأ مجاناً</Button>
                    </Link>
                </div>

                {/* Pro Tier */}
                <div className="p-10 rounded-[2.5rem] bg-card border-2 border-primary shadow-2xl shadow-primary/10 flex flex-col relative overflow-hidden transform scale-105">
                    <div className="absolute top-8 left-[-35px] bg-primary text-primary-foreground text-[10px] font-bold px-12 py-1 rotate-[-45deg]">الأكثر طلباً</div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        ذكاء PRO
                        <Crown className="w-5 h-5 text-primary fill-primary" />
                    </h3>
                    <div className="text-4xl font-bold text-primary mb-6">29$<span className="text-lg text-muted-foreground font-medium"> / شهرياً</span></div>
                    <ul className="space-y-4 mb-10 flex-1">
                        {[
                            { text: "كل مميزات الخطة المجانية", available: true },
                            { text: "دخول كامل للأنظمة الحصرية", available: true },
                            { text: "مكتبة قوالب العمل (Copy-Paste)", available: true },
                            { text: "خصم 20% على الاستشارات", available: true },
                            { text: "جلسة أسئلة وأجوبة شهرية", available: true },
                            { text: "دعم فني ذو أولوية", available: true }
                        ].map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                <Check className="w-5 h-5 text-primary" />
                                <span>{f.text}</span>
                            </li>
                        ))}
                    </ul>
                    <Link href="/checkout?type=pro">
                        <Button className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" variant="primary">
                            اشترك الآن
                        </Button>
                    </Link>
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">أسئلة شائعة</h2>
                <div className="space-y-6">
                    {[
                        { q: "هل يمكنني إلغاء الاشتراك في أي وقت؟", a: "نعم، يمكنك إلغاء اشتراكك في ذكاء PRO بضغطة زر واحدة من لوحة تحكمك، وفترة اشتراكك الحالية ستظل فعالة." },
                        { q: "ما هي طرق الدفع المتاحة؟", a: "نقبل جميع بطاقات الائتمان الرئيسية (Visa, Mastercard) عبر بوابة Stripe الآمنة." },
                        { q: "هل أحصل على تحديثات للأنظمة القديمة؟", a: "بالتأكيد. كعضو PRO، ستحصل دائماً على أحدث التحديثات والتعديلات على أي نظام عمل قمت بتحميله." }
                    ].map((faq, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                            <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
