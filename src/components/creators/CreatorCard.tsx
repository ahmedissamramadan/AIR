"use client";

import Link from "next/link";
import { Creator } from "@/lib/types/creators";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { LucideIcon, Check, X, Youtube, Twitter, Linkedin, Globe, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getLocalizedContent } from "@/lib/data";

interface CreatorCardProps {
    creator: Creator;
    locale?: string;
}

const CategoryIcons: Record<string, string> = {
    education: "🎓",
    reviews: "⭐",
    business: "💼",
    programming: "💻",
    design: "🎨",
    news: "📰",
};

const PlatformIcons: Record<string, LucideIcon> = {
    youtube: Youtube,
    x: Twitter,
    linkedin: Linkedin,
    blog: Globe,
    newsletter: Mail,
};

export function CreatorCard({ creator, locale = 'ar' }: CreatorCardProps) {
    const isAr = locale === 'ar';
    const name = getLocalizedContent(creator.name, locale);
    const bio = getLocalizedContent(creator.bio, locale);

    return (
        <Card className={`h-full flex flex-col hover:border-primary/50 transition-colors group bg-card/50 backdrop-blur-sm ${isAr ? 'text-right' : 'text-left'} overflow-hidden`}>
            <div dir={isAr ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                <CardHeader className="pb-4">
                    <div className={`flex justify-between items-start mb-4 ${isAr ? '' : 'flex-row-reverse'}`}>
                        <div className="relative">
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl overflow-hidden border-2 border-background shadow-sm relative">
                                {creator.image ? (
                                    <Image src={creator.image} alt={name} fill className="object-cover" />
                                ) : (
                                    <span>{CategoryIcons[creator.category] || "👤"}</span>
                                )}
                            </div>
                            {creator.platforms.slice(0, 1).map((p) => {
                                const Icon = PlatformIcons[p.type] || Globe;
                                return (
                                    <div key={p.type} className={`absolute -bottom-1 ${isAr ? '-left-1' : '-right-1'} bg-background rounded-full p-1 border border-border`}>
                                        <Icon className="w-3 h-3 text-muted-foreground" />
                                    </div>
                                )
                            })}
                        </div>
                        {creator.badge === "featured" && (
                            <Badge variant="secondary" className="text-xs backdrop-blur-md bg-amber-500/10 text-amber-600 border-amber-500/20">
                                {isAr ? 'مميز 🌟' : 'Featured 🌟'}
                            </Badge>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {name}
                        </h3>
                        <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isAr ? '' : 'flex-row-reverse'}`}>
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">{isAr ? creator.category : creator.category}</Badge>
                            {creator.location && (
                                <span>📍 {getLocalizedContent(creator.location.country, locale)}</span>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4 pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                        {bio}
                    </p>

                    {/* Best For */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-foreground/80">{isAr ? 'مثالي لـ:' : 'Best for:'}</p>
                        <div className={`flex flex-wrap gap-1.5 ${isAr ? '' : 'flex-row-reverse'}`}>
                            {creator.bestFor.slice(0, 2).map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                                    <Check className="w-3 h-3" /> {getLocalizedContent(tag, locale)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Not Suitable For (Optional) */}
                    {creator.notSuitableFor && creator.notSuitableFor.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-foreground/80">{isAr ? 'لا يصلح لـ:' : 'Not for:'}</p>
                            <div className={`flex flex-wrap gap-1.5 ${isAr ? '' : 'flex-row-reverse'}`}>
                                {creator.notSuitableFor.slice(0, 1).map((tag, idx) => (
                                    <div key={idx} className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                                        <X className="w-3 h-3" /> {getLocalizedContent(tag, locale)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="pt-2 border-t border-border/50 mt-auto">
                    <Link href={`/${locale}/creators/${creator.slug}`} className="w-full">
                        <Button variant="ghost" className={`w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground ${isAr ? '' : 'flex-row-reverse'}`}>
                            {isAr ? 'عرض الملف الشخصي' : 'View Profile'}
                            <ExternalLink className={`w-4 h-4 ${isAr ? 'ml-2' : 'mr-2'} opacity-50 group-hover:opacity-100`} />
                        </Button>
                    </Link>
                </CardFooter>
            </div>
        </Card>
    );
}
