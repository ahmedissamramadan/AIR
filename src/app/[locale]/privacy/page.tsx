import { Metadata } from "next";
interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
        description: isAr ? "سياسة الخصوصية لموقع ذكاء - كيف نحمي بياناتك ونستخدمها." : "Privacy policy for Zakaa - how we protect and use your data.",
    };
}

export default async function PrivacyPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return (
        <div className={`min-h-screen bg-noise pb-20 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 pt-32 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    {isAr ? 'آخر تحديث: ديسمبر 2025' : 'Last Updated: December 2025'}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'مقدمة' : 'Introduction'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'نحن في "ذكاء" نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا.'
                                : 'At Zakaa, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when using our site.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'البيانات التي نجمعها' : 'Data We Collect'}</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>{isAr ? 'البريد الإلكتروني (عند الاشتراك في النشرة البريدية)' : 'Email (when subscribing to newsletter)'}</li>
                            <li>{isAr ? 'بيانات التصفح المجهولة (عبر أدوات التحليل)' : 'Anonymous browsing data (via analytics tools)'}</li>
                            <li>{isAr ? 'ملفات تعريف الارتباط (Cookies) لتحسين التجربة' : 'Cookies to improve experience'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'كيف نستخدم بياناتك' : 'How We Use Your Data'}</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>{isAr ? 'إرسال النشرة البريدية الأسبوعية (إذا اشتركت)' : 'Send weekly newsletter (if subscribed)'}</li>
                            <li>{isAr ? 'تحسين محتوى الموقع بناءً على تحليلات الاستخدام' : 'Improve site content based on usage analysis'}</li>
                            <li>{isAr ? 'التواصل معك بخصوص استفساراتك' : 'Communicate with you regarding your inquiries'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'حماية البيانات' : 'Data Protection'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'نستخدم إجراءات أمنية معيارية لحماية بياناتك. لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية.'
                                : 'We use standard security measures to protect your data. We do not sell or share your personal data with third parties for marketing purposes.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'حقوقك' : 'Your Rights'}</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>{isAr ? 'إلغاء الاشتراك من النشرة البريدية في أي وقت' : 'Unsubscribe from newsletter at any time'}</li>
                            <li>{isAr ? 'طلب حذف بياناتك الشخصية' : 'Request deletion of your personal data'}</li>
                            <li>{isAr ? 'الاستفسار عن البيانات المحفوظة لديك' : 'Inquire about data held about you'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'تواصل معنا' : 'Contact Us'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr ? 'لأي استفسارات حول هذه السياسة، تواصل معنا عبر:' : 'For any inquiries about this policy, contact us via:'}{" "}
                            <a href="mailto:hello@zakaa.ai" className="text-primary hover:underline">hello@zakaa.ai</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
