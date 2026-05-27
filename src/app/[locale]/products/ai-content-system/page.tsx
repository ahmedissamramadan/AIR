import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
    title: 'AI Content System | نظام المحتوى الرقمي',
    description: 'نظام Notion متكامل لإنتاج محتوى أسبوع كامل في ساعتين باستخدام الذكاء الاصطناعي.',
};

export default function ProductPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        AI Content System <br />
                        <span className="text-gradient-gold text-3xl md:text-5xl">(Arabic Edition)</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        نظام عملي يمكنك من إنتاج محتوى أسبوع كامل في ساعتين فقط باستخدام الذكاء الاصطناعي.
                        <br /><span className="text-primary font-bold">بدون إرهاق. بدون تشتت.</span>
                    </p>
                </div>

                {/* The Problem */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 mb-16">
                    <h3 className="text-2xl font-bold text-red-600 mb-4">المشكلة:</h3>
                    <p className="text-lg leading-relaxed">
                        مشكلتك ليست في &quot;الأفكار&quot;، بل في &quot;النظام&quot;.
                        تجلس أمام ChatGPT وتكتب &quot;اكتب لي منشوراً&quot;... فتحصل على نتيجة سيئة.
                        تضيع ساعات في التعديل، وفي النهاية تشعر أن الذكاء الاصطناعي مبالغ في تقديره (Overrated).
                    </p>
                </div>

                {/* The Solution */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="text-3xl font-bold mb-6">الحل: هذا النظام سيغير حياتك.</h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            هذا ليس دورة تدريبية مدتها 10 ساعات. هذا نظام جاهز على Notion.
                            تنسخه لديك، وتبدأ بملئه بالأفكار، وهو يرشدك خطوة بخطوة حتى تصل للمحتوى النهائي.
                        </p>
                        <h4 className="font-bold text-xl mb-4">ما ستحصل عليه:</h4>
                        <ul className="space-y-3">
                            {[
                                "Notion Dashboard شامل لإدارة المحتوى",
                                "Workflow جاهز (فكرة -> مسودة -> نشر)",
                                "مكتبة Prompts ذكية (Prompt Logic)",
                                "أمثلة حقيقية لمخرجات (Outputs)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-secondary/10 rounded-2xl p-8 flex items-center justify-center border border-border">
                        {/* Placeholder for Product Image */}
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">📦</span>
                            <p className="text-sm text-muted-foreground">صورة النظام (Notion Template)</p>
                        </div>
                    </div>
                </div>

                {/* Pricing CTA */}
                <div className="bg-card border-2 border-primary/20 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-black font-bold px-6 py-1 rounded-b-xl text-sm">
                        عرض محدود
                    </div>
                    <h3 className="text-5xl font-bold mb-2">15$</h3>
                    <p className="text-muted-foreground mb-8">سعر رمزي مقابل ساعات من راحة البال</p>

                    <Button size="lg" className="w-full md:w-auto px-16 h-16 text-xl font-bold shadow-xl shadow-primary/20 mb-4">
                        اشترِ النظام الآن
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        * دفع آمن عبر Stripe. تحميل فوري.
                    </p>
                </div>
            </div>
        </div>
    );
}
