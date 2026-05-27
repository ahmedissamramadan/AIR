import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function FeatureCard({
    icon,
    title,
    description,
    className,
}: FeatureCardProps) {
    return (
        <div
            className={cn(
                "group relative p-6 rounded-xl",
                "bg-[var(--card)] border border-[var(--border)]",
                "shadow-sm hover:shadow-md transition-all duration-300",
                "hover:border-[var(--primary)]/30",
                className
            )}
        >
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--primary)]/5 rounded-bl-full -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Icon */}
            <div
                className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    "bg-[var(--primary)]/10 text-[var(--primary)]",
                    "group-hover:bg-[var(--primary)] group-hover:text-white",
                    "transition-colors duration-300"
                )}
            >
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
                {title}
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
                {description}
            </p>
        </div>
    );
}

