import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ImageDeduplicationProvider } from "@/components/providers/ImageDeduplicationProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SITE_CONFIG } from "@/lib/constants";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface PageProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      template: `%s | ${isAr ? SITE_CONFIG.name : SITE_CONFIG.nameEn}`,
      default: isAr ? `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي` : `${SITE_CONFIG.nameEn} | Practical AI Implementation`,
    },
    description: isAr ? SITE_CONFIG.description : SITE_CONFIG.descriptionEn,
    applicationName: SITE_CONFIG.nameEn,
    authors: [{ name: SITE_CONFIG.author }],
    generator: 'Next.js',
    keywords: isAr
      ? ['ذكاء اصطناعي', 'ذكاء عملي', 'ChatGPT', 'إنتاجية', 'أنظمة عمل', 'Business Automation']
      : ['AI', 'Practical AI', 'ChatGPT', 'Productivity', 'Work Systems', 'Business Automation'],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.nameEn,
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      url: `${SITE_CONFIG.url}/${locale}`,
      title: isAr
        ? `${SITE_CONFIG.name} | لن تتعلم الذكاء الاصطناعي هنا.. بل ستستخدمه`
        : `${SITE_CONFIG.nameEn} | You won't learn AI here.. you will use it`,
      description: isAr
        ? "أنظمة مجربة تجعل الذكاء الاصطناعي يعمل نيابة عنك بدلاً من التفكير فيه."
        : "Proven systems that make AI work for you instead of thinking about it.",
      siteName: isAr ? SITE_CONFIG.name : SITE_CONFIG.nameEn,
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: isAr ? `${SITE_CONFIG.name} - استخدم الذكاء الاصطناعي واطلع نتيجة` : `${SITE_CONFIG.nameEn} - Use AI and get results`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي` : `${SITE_CONFIG.nameEn} | Practical AI Implementation`,
      description: isAr ? "منصة عربية تنفيذية للذكاء الاصطناعي." : "Arabic executive platform for AI.",
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params,
}: PageProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <GoogleAnalytics />
          <ImageDeduplicationProvider>
            <Header locale={locale} />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
            <CommandPalette locale={locale} />
          </ImageDeduplicationProvider>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
