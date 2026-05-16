"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getVisibleNavItems } from "@/config/navigation";

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Use the centralized navigation config — only visible items
    const menuItems = getVisibleNavItems().map(item => ({
        title: item.label,
        href: item.href,
    }));

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-background border-l border-border shadow-xl p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-2xl font-bold text-primary">القائمة</span>
                                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <nav className="flex flex-col space-y-4">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={toggleMenu}
                                            className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                                        >
                                            {item.title}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8 border-t border-border">
                                <Link href="/resources/10-hour-guide" onClick={toggleMenu}>
                                    <Button className="w-full font-bold" size="lg">ابدأ هنا مجاناً</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
