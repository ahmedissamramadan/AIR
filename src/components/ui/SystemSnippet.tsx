"use client";

import { useState } from "react";
import { Copy, Check, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SystemSnippetProps {
    title: string;
    code: string;
    description: string;
}

export function SystemSnippet({ title, code, description }: SystemSnippetProps) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 text-right" dir="rtl">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl relative group">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold">{title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="h-8 gap-2 font-medium hover:bg-muted transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4" />
                                    <span className="text-xs">إخفاء</span>
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4" />
                                    <span className="text-xs">عرض الكود</span>
                                </>
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8 gap-2 font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-xs">تم النسخ</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span className="text-xs">نسخ النظام</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Content - Collapsible */}
                {isExpanded && (
                    <div className="p-6 animate-in slide-in-from-top-2">
                        <div className="bg-secondary/5 rounded-xl p-4 font-mono text-xs leading-relaxed mb-4 text-left overflow-x-auto border border-border/50 max-h-[300px] overflow-y-auto">
                            <pre className="whitespace-pre-wrap break-words">
                                <code className="text-foreground/80">{code}</code>
                            </pre>
                        </div>
                    </div>
                )}

                {/* Description - Always visible */}
                <div className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary font-bold">خطوة تطبيق:</span> {description}
                    </p>
                </div>

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors" />
            </div>
        </div>
    );
}
