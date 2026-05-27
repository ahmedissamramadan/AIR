"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IMAGES } from "@/lib/image-data";

export default function LeadMagnetPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            toast.success("شكراً لك! الدليل متاح للتحميل الآن.");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-aurora relative overflow-hidden py-20">
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div>
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">
                            دليل مجاني للتنفيذ السريع
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            10 استخدامات للذكاء الاصطناعي <br />
                            <span className="text-gradient-gold">توفر 10 ساعات أسبوعياً</span>
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            ملف PDF بسيط (5 صفحات). تفتحه، تطبق ما فيه، وتوفر الوقت. بهذه البساطة.
                        </p>

                        {!success ? (
                            <>
                                <div className="space-y-4 mb-10">
                                    {[
                                        "حالات استخدام عملية وليست مجرد نظريات",
                                        "أسماء الأدوات والخطوات بالترتيب",
                                        "الناتج المتوقع من كل خطوة",
                                        "أخطاء شائعة قد تقع فيها أثناء التطبيق"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="bg-green-500/10 p-1 rounded-full text-green-500 flex-shrink-0">
                                                <Check className="w-5 h-5" />
                                            </div>
                                            <span className="text-lg font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="text-sm font-bold mb-2 block">
                                            البريد الإلكتروني الشخصي
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full h-14 px-4 bg-secondary/5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={loading || !email}
                                        className="w-full h-14 text-lg font-bold shadow-2xl shadow-primary/20"
                                    >
                                        {loading ? "جاري التحميل..." : "احصل على الدليل مجاناً"}
                                    </Button>

                                    <p className="text-xs text-muted-foreground text-center">
                                        لن نرسل لك رسائل مزعجة. فقط الدليل والمحتوى المفيد.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="space-y-6 p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-xl mb-2">تم بنجاح!</h3>
                                        <p className="text-muted-foreground mb-4">
                                            تحقق من بريدك الإلكتروني. الدليل في طريقه إليك الآن.
                                        </p>
                                        <Button variant="outline" onClick={() => setSuccess(false)}>
                                            إرسال لبريد آخر
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Image */}
                    <div>
                        <OptimizedImage
                            config={IMAGES.guides.guidePreview}
                            context="card"
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                        <div className="mt-8 p-6 bg-card rounded-2xl border border-border">
                            <p className="text-sm font-bold mb-4">الدليل يتضمن:</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>استراتيجيات فورية</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>أدوات مجانية وبسيطة</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>أمثلة عملية جاهزة</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
