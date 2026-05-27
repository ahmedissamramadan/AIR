import { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? "الشروط والأحكام" : "Terms and Conditions",
        description: isAr ? "الشروط والأحكام لاستخدام موقع ذكاء." : "Terms and conditions for using Zakaa.",
    };
}

export default async function TermsPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return (
        <div className={`min-h-screen bg-noise pb-20 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 pt-32 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">{isAr ? 'الشروط والأحكام' : 'Terms and Conditions'}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    {isAr ? 'آخر تحديث: ديسمبر 2025' : 'Last Updated: December 2025'}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'قبول الشروط' : 'Acceptance of Terms'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'باستخدامك لموقع "ذكاء"، فإنك توافق على هذه الشروط والأحكام. إذا لم توافق على أي جزء منها، يرجى عدم استخدام الموقع.'
                                : 'By using Zakaa, you agree to these terms and conditions. If you do not agree to any part of them, please do not use the site.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'استخدام المحتوى' : 'Content Use'}</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>{isAr ? 'المحتوى المنشور للأغراض التعليمية والمعلوماتية فقط' : 'Content published is for educational and informational purposes only'}</li>
                            <li>{isAr ? 'يُسمح بمشاركة المقالات مع ذكر المصدر' : 'Articles may be shared with attribution'}</li>
                            <li>{isAr ? 'لا يُسمح بنسخ المحتوى لأغراض تجارية دون إذن' : 'Copying content for commercial purposes without permission is not allowed'}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'إخلاء المسؤولية' : 'Disclaimer'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'نبذل جهدنا لتقديم معلومات دقيقة ومحدثة، لكن لا نضمن دقة أو اكتمال المحتوى. استخدام الأدوات والنصائح المذكورة على مسؤوليتك الخاصة.'
                                : 'We strive to provide accurate and updated information, but we do not guarantee the accuracy or completeness of the content. Use of the tools and tips mentioned is at your own risk.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'الروابط الخارجية' : 'External Links'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'قد يحتوي الموقع على روابط لمواقع خارجية. لسنا مسؤولين عن محتوى أو سياسات خصوصية هذه المواقع.'
                                : 'The site may contain links to external sites. We are not responsible for the content or privacy policies of these sites.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'التعديلات' : 'Amendments'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr
                                ? 'نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة مع تحديث التاريخ.'
                                : 'We reserve the right to amend these terms at any time. Amendments will be posted on this page with an updated date.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">{isAr ? 'تواصل معنا' : 'Contact Us'}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {isAr ? 'لأي استفسارات، تواصل معنا عبر:' : 'For any inquiries, contact us via:'}{" "}
                            <a href="mailto:hello@zakaa.ai" className="text-primary hover:underline">hello@zakaa.ai</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
