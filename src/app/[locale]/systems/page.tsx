import { Metadata } from "next";
import { systems } from "@/lib/data";
import SystemsPageClient from "./SystemsPageClient";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? 'أنظمة عمل جاهزة | ذكاء عملي' : 'Ready-to-use Work Systems | Zakaa Amaly',
        description: isAr
            ? 'تصفح أنظمة العمل الجاهزة للنسخ واللصق لتوفير الوقت وزيادة الإنتاجية.'
            : 'Browse ready-to-use work systems for copy-pasting to save time and increase productivity.',
    };
}

export default async function SystemsPage({ params }: PageProps) {
    const { locale } = await params;
    return <SystemsPageClient locale={locale} systems={systems} />;
}
