"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, Clock, Zap } from "lucide-react";

interface VisualComparisonProps {
    before: {
        title: string;
        description: string;
        stats?: { label: string; value: string }[];
    };
    after: {
        title: string;
        description: string;
        stats?: { label: string; value: string }[];
    };
}

export const VisualComparison = ({ before, after }: VisualComparisonProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Before Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-red-500/5 border border-red-500/10 overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <XCircle className="w-24 h-24 text-red-500" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <Clock className="w-6 h-6" />
                        <h3 className="text-2xl font-bold">{before.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        {before.description}
                    </p>

                    {before.stats && (
                        <div className="grid grid-cols-2 gap-4">
                            {before.stats.map((stat, i) => (
                                <div key={i} className="bg-background/50 p-3 rounded-xl border border-red-500/10">
                                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                                    <div className="text-xl font-bold text-red-600/80">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* VS Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-xl font-black text-muted-foreground text-xs">
                VS
            </div>

            {/* After Card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-green-500/5 border border-green-500/10 overflow-hidden shadow-lg shadow-green-500/5 group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle className="w-24 h-24 text-green-500" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-green-600">
                        <Zap className="w-6 h-6" />
                        <h3 className="text-2xl font-bold">{after.title}</h3>
                    </div>
                    <p className="text-foreground text-lg mb-8 leading-relaxed">
                        {after.description}
                    </p>

                    {after.stats && (
                        <div className="grid grid-cols-2 gap-4">
                            {after.stats.map((stat, i) => (
                                <div key={i} className="bg-background/80 p-3 rounded-xl border border-green-500/20 shadow-sm">
                                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                                    <div className="text-xl font-bold text-green-600">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
            </motion.div>
        </div>
    );
};
