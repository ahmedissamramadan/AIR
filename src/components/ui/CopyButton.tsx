"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
    text: string;
    label?: string;
    className?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

export function CopyButton({
    text,
    label = "نسخ",
    className,
    variant = "outline",
    size = "sm"
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleCopy}
            className={`${className} gap-2 transition-all duration-300 ${copied ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}`}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    <span>تم النسخ!</span>
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    <span>{label}</span>
                </>
            )}
        </Button>
    );
}
