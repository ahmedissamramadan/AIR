"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Lock, Crown, Check } from "lucide-react";
import Link from "next/link";

interface PremiumGateProps {
    children: React.ReactNode;
    isPremium?: boolean;
    locale?: string;
}

export const PremiumGate = ({ children, isPremium, locale = 'ar' }: PremiumGateProps) => {
    if (!isPremium) {
        return <>{children}</>;
    }
    const isAr = locale === 'ar';

    return (
        <div className="relative">
            {/* Blurred Content Preview */}
            <div className={`select-none pointer-events-none blur-[6px] opacity-40 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
                {children}
            </div>

            {/* Locked Overlay */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                <div className="max-w-md w-full bg-card border-2 border-primary rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none`} />

                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                        {isAr ? 'هذا المحتوى ' : 'This content is '}
                        <span className="text-primary italic">{isAr ? 'حصري' : 'Exclusive'}</span>
                        <Crown className="w-6 h-6 text-primary fill-primary" />
                    </h3>

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        {isAr
                            ? 'أنت تحاول الوصول إلى نظام عملي متقدم مخصص لأعضاء "ذكاء PRO". اشترك الآن للوصول الكامل.'
                            : 'You are trying to access an advanced practical system dedicated to "Zakaa PRO" members. Subscribe now for full access.'}
                    </p>

                    <div className={`space-y-4 mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
                        {(isAr ? [
                            "وصول كامل لكل المقالات والأنظمة",
                            "تحميل قوالب العمل الجاهزة",
                            "خصم 20% على الدورات والاستشارات",
                            "أولوية الوصول للميزات الجديدة"
                        ] : [
                            "Full access to all articles and systems",
                            "Download ready-to-use templates",
                            "20% discount on courses and consultations",
                            "Priority access to new features"
                        ]).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium">
                                <Check className="w-4 h-4 text-primary" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href={`/${locale}/pricing`}>
                            <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20">
                                {isAr ? 'انضم للـ PRO الآن' : 'Join PRO Now'}
                            </Button>
                        </Link>
                        <Link href={`/${locale}/login`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {isAr ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Log in'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
