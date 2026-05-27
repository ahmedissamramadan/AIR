"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Upload, AlertCircle } from "lucide-react";

import { useLocale } from "next-intl";

export function ProofUploadForm() {
    const locale = useLocale();
    const isAr = locale === 'ar';
    const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle");
    const [transactionId, setTransactionId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionId) return;

        setStatus("uploading");
        setTimeout(() => setStatus("success"), 1500);
    };

    if (status === "success") {
        return (
            <div className={`text-center p-8 bg-green-50 rounded-3xl border-2 border-green-200 space-y-4 animate-in fade-in zoom-in duration-500 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-green-800">{isAr ? 'تم استلام طلبك!' : 'Request Received!'}</h3>
                <p className="text-green-700 leading-relaxed text-center">
                    {isAr
                        ? 'نقوم الآن بمراجعة عملية التحويل. ستصلك رسالة تفعيل على بريدك الإلكتروني خلال أقل من ساعتين.'
                        : 'We are now reviewing the transfer. You will receive an activation email within less than two hours.'}
                </p>
                <Button variant="outline" className="mt-4 border-green-300 text-green-700 hover:bg-green-100 mx-auto block" onClick={() => window.location.href = `/${locale}`}>
                    {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
            <div className="space-y-2">
                <label className={`text-sm font-bold text-muted-foreground block ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? 'رقم المعاملة / رقم المحفظة المحول منها' : 'Transaction ID / Sending Wallet Number'}
                </label>
                <input
                    required
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder={isAr ? 'مثال: 010XXXXXXXX أو رقم العملية' : 'e.g., 010XXXXXXXX or transaction number'}
                    className={`w-full h-14 px-6 rounded-2xl bg-muted border-2 border-transparent focus:border-primary focus:bg-background transition-all font-mono ${isAr ? 'text-right' : 'text-left'}`}
                />
            </div>

            <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center space-y-3 group hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                </div>
                <div>
                    <p className="font-bold">{isAr ? 'ارفع صورة التحويل (اختياري)' : 'Upload transfer receipt (optional)'}</p>
                    <p className="text-sm text-muted-foreground">{isAr ? 'سكرين شوت يساعد في سرعة التفعيل' : 'A screenshot helps speed up activation'}</p>
                </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl flex items-start gap-3 text-xs text-primary leading-relaxed border border-primary/10">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className={`${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr
                        ? 'يتم تفعيل الحساب يدوياً بعد التأكد من وصول المبلغ. إذا واجهت أي مشكلة تواصل معنا عبر واتساب مباشرة.'
                        : 'Accounts are activated manually after confirming the payment. If you face any issues, contact us via WhatsApp directly.'}
                </p>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-xl font-bold shadow-xl shadow-primary/20"
                disabled={status === "uploading" || !transactionId}
            >
                {status === "uploading" ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "تأكيد الدفع والتفعيل" : "Confirm Payment & Activate")}
            </Button>
        </form>
    );
}
