"use client";

import { ExternalLink, Copy, FileText, Layout, Table, MousePointer2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { Template } from "@/lib/data";

interface TemplateLibraryProps {
    templates: Template[];
    locale: string;
}

const platformIcons = {
    Notion: Layout,
    Trello: FileText,
    Sheets: Table,
    Miro: MousePointer2,
    Other: ExternalLink,
};

const languageLabels = {
    ar: "عربي",
    en: "English",
    both: "عربي / English",
};

export function TemplateLibrary({ templates, locale }: TemplateLibraryProps) {
    if (!templates || templates.length === 0) return null;
    const isAr = locale === 'ar';

    return (
        <section className={`space-y-8 my-16 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className={`flex flex-col md:flex-row ${isAr ? 'md:items-end text-right' : 'md:items-start text-left'} justify-between gap-4`}>
                <div>
                    <h3 className="text-3xl font-bold mb-2">
                        {isAr ? 'مكتبة القوالب' : 'Template Library'}
                    </h3>
                    <p className="text-muted-foreground">
                        {isAr ? 'قوالب جاهزة قابلة للتعديل والنسخ مباشرة لحسابك.' : 'Ready-to-use templates that can be edited and copied directly to your account.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => {
                    const Icon = platformIcons[template.platform] || platformIcons.Other;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className={`flex items-start justify-between mb-6 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <Badge variant="secondary" className="rounded-full px-3 py-1">
                                    {languageLabels[template.language]}
                                </Badge>
                            </div>

                            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {template.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-6">
                                {isAr ? `منصة: ${template.platform}` : `Platform: ${template.platform}`}
                            </p>

                            <a
                                href={template.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                                {isAr ? 'انسخ إلى حسابك' : 'Copy to your account'}
                            </a>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
