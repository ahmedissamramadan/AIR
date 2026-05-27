"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export const FadeIn = ({
    children,
    className,
    delay = 0,
    direction = "up"
}: MotionProps) => {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Consistent smooth easing
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, className, delay = 0 }: MotionProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export const MotionItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
