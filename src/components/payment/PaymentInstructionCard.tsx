"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface PaymentInstructionCardProps {
    method: "instapay" | "vfcash" | "fawry";
    details: string;
    title: string;
}

import { useLocale } from "next-intl";

export function PaymentInstructionCard({ method, details, title }: PaymentInstructionCardProps) {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(details);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`p-6 rounded-2xl bg-card border-2 border-primary/20 hover:border-primary/50 transition-all space-y-4 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className={`flex items-center justify-between ${isAr ? '' : 'flex-row-reverse'}`}>
                <h3 className="font-bold text-lg">{title}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method === "instapay" ? "bg-[#e5f5f2] text-[#008a70]" :
                    method === "vfcash" ? "bg-red-50 text-red-600" :
                        "bg-orange-50 text-orange-600"
                    }`}>
                    {method === "instapay" ? "IP" : method === "vfcash" ? "VC" : "F"}
                </div>
            </div>

            <div className={`bg-muted p-4 rounded-xl flex items-center justify-between gap-4 ${isAr ? '' : 'flex-row-reverse'}`}>
                <code className="text-xl font-mono font-bold tracking-wider">{details}</code>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </Button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
                {method === "instapay" && (isAr ? "قم بالتحويل للحساب أعلاه من تطبيق إنستا باي مباشرة." : "Transfer directly to the account above via InstaPay.")}
                {method === "vfcash" && (isAr ? "يمكنك التحويل من محفظتك أو من أي فرع فودافون أو فوري." : "Transfer from your wallet or via any Vodafone or Fawry branch.")}
                {method === "fawry" && (isAr ? "استخدم كود الخدمة (ذكاء) في أي ماكينة فوري دفع فواتير." : "Use service code (Zakaa) at any Fawry machine for bill payments.")}
            </p>
        </div>
    );
}
