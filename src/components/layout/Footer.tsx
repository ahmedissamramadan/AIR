"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export const Footer = ({ locale: propLocale }: { locale?: string }) => {
    const t = useTranslations("nav");
    const commonT = useTranslations("common");
    const footerT = useTranslations("footer");
    const hookLocale = useLocale();
    const locale = propLocale || hookLocale;

    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-4">
                        <Link 
                            href="/" 
                            className="inline-block relative w-32 md:w-40 h-10 md:h-12" 
                            aria-label={`${commonT("name")} | ${commonT("nameEn")} - ${t("home")}`}
                        >
                            <Image
                                src="/images/brand/air-logo-full.png"
                                alt=""
                                aria-hidden="true"
                                width={160}
                                height={48}
                                className="w-full h-full object-contain dark:hidden"
                                priority={false}
                            />
                            <Image
                                src="/images/brand/air-logo-dark.png"
                                alt=""
                                aria-hidden="true"
                                width={160}
                                height={48}
                                className="w-full h-full object-contain hidden dark:block"
                                priority={false}
                            />
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-4 text-sm md:text-base">
                            {commonT("description")}
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="font-bold mb-4 text-base md:text-lg">{footerT("quickLinks")}</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors inline-block py-1">
                                    {t("blog")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/systems" className="hover:text-primary transition-colors inline-block py-1">
                                    {t("systems")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="hover:text-primary transition-colors inline-block py-1">
                                    {t("tools")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/consultancy" className="hover:text-primary transition-colors inline-block py-1">
                                    {t("consultancy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors inline-block py-1">
                                    {t("about")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/media-kit" className="hover:text-primary transition-colors font-bold text-primary inline-block py-1">
                                    {footerT("mediaKit")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="font-bold mb-4 text-base md:text-lg">{footerT("contactUs")}</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a 
                                    href="https://linkie.bio/ahmdesam96" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="hover:text-primary transition-colors flex items-center gap-2 py-1"
                                >
                                    <span role="img" aria-label="link">🔗</span>
                                    {footerT("allContactLinks")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-border/50 text-center text-xs md:text-sm text-muted-foreground font-medium">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            {footerT("privacyPolicy")}
                        </Link>
                        <span aria-hidden="true">•</span>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            {footerT("terms")}
                        </Link>
                    </div>
                    <p>
                        © {new Date().getFullYear()} {commonT("name")} | {commonT("nameEn")}. {footerT("allRightsReserved")}.
                    </p>
                </div>
            </div>
        </footer>
    );
};
