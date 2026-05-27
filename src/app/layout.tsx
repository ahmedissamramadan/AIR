import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "next-intl/server";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const isAr = locale === 'ar';

    return (
        <html lang={locale} dir={isAr ? "rtl" : "ltr"} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": isAr ? "أثير | AIR" : "AIR | Arab Intelligence Repository",
                            "alternateName": isAr ? "مستودع الذكاء العربي" : "Arab Intelligence Repository",
                            "url": `${SITE_CONFIG.url}/${locale}`,
                            "description": isAr
                                ? "مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات والمعرفة في مجال الذكاء الاصطناعي"
                                : "Arab Intelligence Repository - A comprehensive platform for systems, tools, and knowledge in the field of AI",
                            "inLanguage": locale,
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": `https://arabic-ai-blog.vercel.app/${locale}/blog?search={search_term_string}`,
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
            </head>
            <body className={`antialiased font-['IBM_Plex_Sans_Arabic'] font-medium bg-background text-foreground min-h-screen flex flex-col`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
