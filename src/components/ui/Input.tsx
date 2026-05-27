import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="text-sm font-semibold mb-1.5 block text-[var(--foreground)]">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-lg border-2 border-[var(--neutral-200)] bg-background px-4 py-2 text-base",
                        "transition-all duration-200 ease-out",
                        "focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 focus:outline-none",
                        "placeholder:text-[var(--neutral-400)]",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
