"use client";

import React from "react";
import Link from "next/link";
import { getVisibleNavItems } from "@/config/navigation";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export const Footer = () => {
    // Only show visible nav items in footer
    const visibleItems = getVisibleNavItems().filter(item => item.href !== "/");

    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block relative w-32 md:w-40 h-10 md:h-12" aria-label="أثير | AIR - الصفحة الرئيسية">
                            <img
                                src="/images/brand/air-logo-full.png"
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-contain dark:hidden"
                            />
                            <img
                                src="/images/brand/air-logo-dark.png"
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-contain hidden dark:block"
                            />
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-4">
                            {SITE_CONFIG.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">روابط سريعة</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            {visibleItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">تواصل معنا</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                                    تويتر (X)
                                </a>
                            </li>
                            <li>
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                                    لينكد إن
                                </a>
                            </li>
                            <li>
                                <a href={SOCIAL_LINKS.email} className="hover:text-primary transition-colors flex items-center gap-2">
                                    البريد الإلكتروني
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground font-medium">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
                    </div>
                    <p>© {new Date().getFullYear()} أثير | AIR. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};
