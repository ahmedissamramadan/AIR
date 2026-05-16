import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getVisibleNavItems } from "@/config/navigation";

export const Header = () => {
    // Filter to only show visible (non-hidden) nav items, excluding home
    const visibleItems = getVisibleNavItems().filter(item => item.href !== "/");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-auto h-10 transition-transform duration-300 group-hover:scale-105">
                        {/* AIR Logo - switches based on theme */}
                        <img
                            src="/images/brand/air-logo-full.png"
                            alt="AIR - Arab Intelligence Repository"
                            className="h-10 w-auto object-contain dark:hidden"
                        />
                        <img
                            src="/images/brand/air-logo-dark.png"
                            alt="AIR - Arab Intelligence Repository"
                            className="h-10 w-auto object-contain hidden dark:block"
                        />
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {visibleItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="hidden md:block">
                        <Link href="/resources/10-hour-guide">
                            <Button variant="primary" size="sm" className="font-bold">
                                ابدأ هنا
                            </Button>
                        </Link>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};
