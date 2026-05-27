import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export const Header = ({ locale: propLocale }: { locale?: string }) => {
    const t = useTranslations("nav");
    const hookLocale = useLocale();
    const locale = propLocale || hookLocale;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-auto h-10 transition-transform duration-300 group-hover:scale-105">
                        {/* AIR Logo - switches based on theme */}
                        <Image
                            src="/images/brand/air-logo-full.png"
                            alt="AIR - Arab Intelligence Repository"
                            width={160}
                            height={40}
                            className="h-10 w-auto object-contain dark:hidden"
                            priority
                        />
                        <Image
                            src="/images/brand/air-logo-dark.png"
                            alt="AIR - Arab Intelligence Repository"
                            width={160}
                            height={40}
                            className="h-10 w-auto object-contain hidden dark:block"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/blog" className="hover:text-primary transition-colors">
                        {t("blog")}
                    </Link>
                    <Link href="/systems" className="hover:text-primary transition-colors">
                        {t("systems")}
                    </Link>
                    <Link href="/demos" className="hover:text-primary transition-colors text-blue-600 dark:text-blue-400 font-semibold">
                        {locale === 'ar' ? '🎬 الديموهات' : '🎬 Demos'}
                    </Link>
                    <Link href="/tools" className="hover:text-primary transition-colors">
                        {t("tools")}
                    </Link>
                    <Link href="/consultancy" className="hover:text-primary transition-colors font-bold">
                        {t("consultancy")}
                    </Link>
                    <Link href="/about" className="hover:text-primary transition-colors">
                        {t("about")}
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <div className="hidden md:block">
                        <Link href="/resources/10-hour-guide">
                            <Button variant="primary" size="sm" className="font-bold">
                                {locale === 'ar' ? 'ابدأ هنا' : 'Start Here'}
                            </Button>
                        </Link>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};
