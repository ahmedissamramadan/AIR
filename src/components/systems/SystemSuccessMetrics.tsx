"use client";

import { CheckCircle2, ArrowRightLeft, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { LocalizableString, getLocalizedContent } from "@/lib/data";

interface SuccessMetricsProps {
    valueIdentity: {
        promise7Days: LocalizableString;
        roiIndicators: LocalizableString[];
        beforeAfter: {
            before: {
                title: LocalizableString;
                description: LocalizableString;
                stats?: { label: LocalizableString; value: LocalizableString }[];
            };
            after: {
                title: LocalizableString;
                description: LocalizableString;
                stats?: { label: LocalizableString; value: LocalizableString }[];
            };
        };
    };
    locale: string;
}

export function SystemSuccessMetrics({ valueIdentity, locale }: SuccessMetricsProps) {
    const isAr = locale === 'ar';

    return (
        <section className={`space-y-12 my-16 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            {/* 7-Day Promise Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-card border border-primary/20 rounded-[2.5rem] p-8 md:p-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Clock className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                {isAr ? 'ماذا أحقق لك خلال 7 أيام؟' : 'What will I achieve for you in 7 days?'}
                            </h3>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {getLocalizedContent(valueIdentity.promise7Days, locale)}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ROI Indicators */}
                <motion.div
                    initial={{ opacity: 0, x: isAr ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-[2.5rem] p-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-500" />
                        </div>
                        <h4 className="text-xl font-bold">{isAr ? 'مؤشرات النجاح (ROI)' : 'Success Metrics (ROI)'}</h4>
                    </div>
                    <ul className="space-y-4">
                        {valueIdentity.roiIndicators.map((indicator, index) => (
                            <li key={index} className="flex items-center gap-3 text-lg text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                {getLocalizedContent(indicator, locale)}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Before / After */}
                <motion.div
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-[2.5rem] p-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ArrowRightLeft className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold">{isAr ? 'نتائج حقيقية (قبل / بعد)' : 'Real Results (Before / After)'}</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Before */}
                        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <span className="text-xs font-bold text-red-500 block mb-2 uppercase tracking-wider">
                                {getLocalizedContent(valueIdentity.beforeAfter.before.title, locale)}
                            </span>
                            <p className="text-sm text-muted-foreground mb-4">
                                {getLocalizedContent(valueIdentity.beforeAfter.before.description, locale)}
                            </p>
                            {valueIdentity.beforeAfter.before.stats && (
                                <div className="space-y-2 pt-4 border-t border-red-500/10">
                                    {valueIdentity.beforeAfter.before.stats.map((stat, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs">
                                            <span className="opacity-60">{getLocalizedContent(stat.label, locale)}</span>
                                            <span className="font-bold">{getLocalizedContent(stat.value, locale)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* After */}
                        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
                            <span className="text-xs font-bold text-green-500 block mb-2 uppercase tracking-wider">
                                {getLocalizedContent(valueIdentity.beforeAfter.after.title, locale)}
                            </span>
                            <p className="text-sm text-muted-foreground mb-4">
                                {getLocalizedContent(valueIdentity.beforeAfter.after.description, locale)}
                            </p>
                            {valueIdentity.beforeAfter.after.stats && (
                                <div className="space-y-2 pt-4 border-t border-green-500/10">
                                    {valueIdentity.beforeAfter.after.stats.map((stat, i) => (
                                        <div key={i} className="flex justify-between items-center text-xs">
                                            <span className="opacity-60">{getLocalizedContent(stat.label, locale)}</span>
                                            <span className="font-bold">{getLocalizedContent(stat.value, locale)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
