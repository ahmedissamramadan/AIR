"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface TestimonialCardProps {
    quote: string;
    authorName: string;
    authorRole: string;
    authorAvatar?: string;
    highlightedMetric?: string;
    isVerified?: boolean;
    className?: string;
}

export function TestimonialCard({
    quote,
    authorName,
    authorRole,
    authorAvatar,
    highlightedMetric,
    isVerified = false,
    className,
}: TestimonialCardProps) {
    return (
        <div
            className={cn(
                "relative p-6 md:p-8 rounded-2xl",
                "bg-[var(--card)] border border-[var(--border)]",
                "hover:border-[var(--primary)]/30 transition-colors",
                "overflow-hidden group",
                className
            )}
        >
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--primary)]/5 rounded-bl-full -mr-4 -mt-4" />

            {/* Quote */}
            <blockquote className="relative z-10 mb-6">
                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                    &quot;{quote}&quot;
                </p>
            </blockquote>

            {/* Highlighted Metric */}
            {highlightedMetric && (
                <div
                    className={cn(
                        "inline-flex items-center px-4 py-2 rounded-full mb-6",
                        "bg-[var(--success)]/10 text-[var(--success)] font-bold text-sm"
                    )}
                >
                    {highlightedMetric}
                </div>
            )}

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
                {authorAvatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--border)]">
                        <Image
                            src={authorAvatar}
                            alt={authorName}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-2xl">
                        👤
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--foreground)]">
                            {authorName}
                        </span>
                        {isVerified && (
                            <span className="text-[var(--primary)]" title="مستخدم موثق">
                                ✓
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-[var(--muted-foreground)]">
                        {authorRole}
                    </span>
                </div>
            </div>
        </div>
    );
}
