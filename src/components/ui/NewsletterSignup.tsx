"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface NewsletterSignupProps {
    variant?: "default" | "compact";
}

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("يرجى إدخال بريد إلكتروني صحيح");
            return;
        }

        setLoading(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setSuccess(true);
        toast.success("تم الاشتراك بنجاح! تفقد بريدك قريباً.");
        setEmail("");
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-green-500/10 border border-green-500/20 rounded-3xl text-center animate-in fade-in zoom-in duration-500" role="alert" aria-live="polite">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">تم اشتراكك بنجاح!</h3>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                    ستصلك أول رسالة يوم الخميس القادم. <br />
                    <span className="text-primary font-bold">تأكد من فحص البريد العشوائي (Spam) وتفعيل الرسائل.</span>
                </p>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2" role="form" aria-label="نموذج الاشتراك في النشرة البريدية">
                <div className="flex-1">
                    <label htmlFor="newsletter-email-compact" className="sr-only">البريد الإلكتروني</label>
                    <input
                        id="newsletter-email-compact"
                        type="email"
                        placeholder="بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-3 bg-secondary/10 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        required
                        aria-required="true"
                        aria-describedby="newsletter-privacy-compact"
                    />
                </div>
                <Button size="sm" type="submit" disabled={loading}>
                    {loading ? "جاري..." : "اشترك"}
                </Button>
            </form>
        );
    }

    return (
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                </div>

                <h2 className="text-3xl font-bold">ملخص الذكاء الاصطناعي الأسبوعي</h2>
                <p className="text-lg text-muted-foreground">
                    انضم لـ <strong>+5,000</strong> مهتم واحصل على أقوى 5 أدوات ذكاء اصطناعي يمكن تطبيقها فوراً في عملك كل يوم خميس.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4" role="form" aria-label="نموذج الاشتراك في النشرة البريدية">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label htmlFor="newsletter-email" className="sr-only">البريد الإلكتروني</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                name="email"
                                autoComplete="email"
                                className={`w-full h-14 px-6 bg-secondary/5 border rounded-xl text-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${error ? 'border-red-500' : 'border-border'}`}
                                required
                                aria-required="true"
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby="newsletter-error newsletter-privacy"
                            />
                            {error && (
                                <p id="newsletter-error" className="text-red-500 text-sm mt-2 text-right" role="alert">
                                    {error}
                                </p>
                            )}
                        </div>
                        <Button
                            size="lg"
                            variant="primary"
                            type="submit"
                            className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 whitespace-nowrap"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? "جاري الاشتراك..." : "اشترك الآن مجاناً"}
                        </Button>
                    </div>

                    <p id="newsletter-privacy" className="text-xs text-muted-foreground">
                        بالاشتراك، أنت توافق على{" "}
                        <Link href="/privacy" className="underline hover:text-primary transition-colors">
                            سياسة الخصوصية
                        </Link>
                        . نعدك بالفائدة فقط، لا سبام.
                    </p>
                </form>
            </div>
        </div>
    );
}
