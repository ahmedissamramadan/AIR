"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface ComparisonItem {
    text: string;
}

interface ComparisonCardProps {
    beforeTitle?: string;
    afterTitle?: string;
    beforeItems: ComparisonItem[];
    afterItems: ComparisonItem[];
    resultBadge?: string;
    className?: string;
}

export function ComparisonCard({
    beforeTitle = "بدون أنظمة ذكية",
    afterTitle = "مع أثير | AIR",
    beforeItems,
    afterItems,
    resultBadge,
    className,
}: ComparisonCardProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {/* Before Card */}
                <div
                    className={cn(
                        "relative p-6 md:p-8 rounded-2xl",
                        "bg-[var(--card)] border border-[var(--border)]",
                        "overflow-hidden"
                    )}
                >
                    {/* Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--error)]/5 rounded-bl-full -mr-4 -mt-4" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="p-2 rounded-full bg-[var(--error)]/10 text-[var(--error)]">
                                <X className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-bold text-[var(--muted-foreground)]">
                                {beforeTitle}
                            </h3>
                        </div>

                        <ul className="space-y-4">
                            {beforeItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-[var(--error)]/50 mt-0.5 shrink-0" />
                                    <span className="text-[var(--muted-foreground)]">
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* After Card */}
                <div
                    className={cn(
                        "relative p-6 md:p-8 rounded-2xl",
                        "bg-[var(--card)] border-2 border-[var(--primary)]/30",
                        "overflow-hidden shadow-lg shadow-[var(--primary)]/5"
                    )}
                >
                    {/* Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--success)]/10 rounded-bl-full -mr-4 -mt-4" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="p-2 rounded-full bg-[var(--success)]/10 text-[var(--success)]">
                                <Check className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-bold text-[var(--foreground)]">
                                {afterTitle}
                            </h3>
                        </div>

                        <ul className="space-y-4">
                            {afterItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[var(--success)] mt-0.5 shrink-0" />
                                    <span className="text-[var(--foreground)]">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Result Badge */}
            {resultBadge && (
                <div className="flex justify-center mt-8">
                    <div
                        className={cn(
                            "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                            "bg-[var(--success)]/10 text-[var(--success)] font-bold",
                            "border border-[var(--success)]/20"
                        )}
                    >
                        <Check className="w-5 h-5" />
                        {resultBadge}
                    </div>
                </div>
            )}
        </div>
    );
}
