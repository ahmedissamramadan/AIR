"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
    className?: string;
}

export const TrustBadge = ({ className }: TrustBadgeProps) => {
    return (
        <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] md:text-xs font-bold w-fit", className)}>
            <BadgeCheck className="w-3.5 h-3.5 fill-green-500/10" />
            <span>مجرب وجاهز للتطبيق (Copy-Paste)</span>
        </div>
    );
};
