"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-2"
            title={locale === 'ar' ? 'English' : 'عربي'}
        >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-bold">
                {locale === 'ar' ? 'EN' : 'AR'}
            </span>
        </Button>
    );
};
