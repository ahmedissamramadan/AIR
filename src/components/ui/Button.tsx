import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
    asChild?: boolean;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    asChild = false,
    fullWidth = false,
    ...props
}: ButtonProps) => {
    // Base styles with WCAG AA focus states
    const baseStyles = cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        "active:scale-[0.98]",
        fullWidth && "w-full"
    );

    // Variant styles with new color system
    const variants = {
        primary: cn(
            "bg-[var(--primary)] text-[var(--primary-foreground)]",
            "shadow-md hover:shadow-lg",
            "hover:bg-[var(--primary-hover)] hover:-translate-y-0.5"
        ),
        secondary: cn(
            "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
            "shadow-md hover:shadow-lg",
            "hover:bg-[var(--secondary-hover)] hover:-translate-y-0.5"
        ),
        outline: cn(
            "border-2 border-[var(--neutral-300)] text-[var(--foreground)]",
            "bg-transparent hover:bg-[var(--neutral-100)]",
            "hover:border-[var(--neutral-400)]"
        ),
        ghost: cn(
            "text-[var(--foreground)] bg-transparent",
            "hover:bg-[var(--neutral-100)]"
        ),
    };

    // Size styles with min 44px tap targets
    const sizes = {
        sm: "min-h-[36px] h-9 px-4 text-sm",
        md: "min-h-[44px] h-11 px-6 text-base",
        lg: "min-h-[52px] h-[52px] px-8 text-lg",
        icon: "min-h-[44px] h-11 w-11 p-0",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    // If asChild is true, clone the child element and apply our styles to it
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            className: cn(combinedClassName, (children.props as { className?: string }).className),
            ...props,
        } as React.HTMLAttributes<HTMLElement>);
    }

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
};
