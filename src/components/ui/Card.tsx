import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`bg-card text-card-foreground rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "" }: CardProps) => (
    <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }: CardProps) => (
    <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);
