import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export const Badge = ({
    children,
    variant = "primary",
    className = "",
}: BadgeProps) => {
    const baseStyles =
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
        primary: "bg-primary/20 text-primary-foreground hover:bg-primary/30",
        secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
        outline: "text-foreground border border-border",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
