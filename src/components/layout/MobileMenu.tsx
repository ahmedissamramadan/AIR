"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const MobileMenu = ({ locale: propLocale }: { locale?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const hookLocale = useLocale();
    const locale = propLocale || hookLocale;
    const isAr = locale === 'ar';

    const menuItems = [
        { title: isAr ? "الرئيسية" : "Home", href: `/${locale}` },
        { title: isAr ? "المدونة التقنية" : "Tech Blog", href: `/${locale}/blog` },
        { title: isAr ? "الأنظمة الجاهزة" : "Ready Systems", href: `/${locale}/systems` },
        { title: isAr ? "🎬 الديموهات" : "🎬 Demos", href: `/${locale}/demos` },
        { title: isAr ? "دليل الأدوات" : "Tools", href: `/${locale}/tools` },
        { title: isAr ? "استشارات ونماذج" : "Consultancy", href: `/${locale}/consultancy` },
        { title: isAr ? "من نحن" : "About Us", href: `/${locale}/about` },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed inset-0 z-[10000] w-full h-[100dvh] bg-background flex flex-col ${isAr ? 'text-right' : 'text-left'}`}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-2xl font-bold text-primary">
                                    {isAr ? 'القائمة' : 'Menu'}
                                </span>
                                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <nav className="flex flex-col space-y-4">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={toggleMenu}
                                            className="block text-2xl font-bold text-foreground hover:text-primary transition-colors py-3 border-b border-border/50"
                                        >
                                            {item.title}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8">
                                <Link href={`/${locale}/resources/10-hour-guide`} onClick={toggleMenu}>
                                    <Button className="w-full font-bold text-lg h-12" size="lg">
                                        {isAr ? 'ابدأ هنا مجاناً' : 'Start Here Free'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} aria-label={isAr ? "افتح القائمة" : "Open menu"}>
                <Menu className="h-6 w-6" />
            </Button>
            {mounted && createPortal(menuContent, document.body)}
        </div>
    );
};
