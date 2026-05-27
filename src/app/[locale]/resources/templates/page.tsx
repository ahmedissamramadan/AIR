import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { FileText, Table, CheckSquare, BarChart } from "lucide-react";

export const metadata: Metadata = {
    title: 'مكتبة القوالب المجانية | ذكاء',
    description: 'قوالب جاهزة للتحميل (Google Docs/Excel/Notion) لتنظيم العمل، التسويق، وإدارة المشاريع.',
    openGraph: {
        title: "مكتبة القوالب المجانية | ذكاء",
        description: "ابدأ العمل فوراً مع قوالب احترافية جاهزة.",
    },
};

const templates = [
    {
        title: "خطة التسويق بالمحتوى",
        description: "قالب شامل لتخطيط المحتوى الشهري، توزيع المنصات، وتتبع الأداء.",
        icon: FileText,
        format: "Google Docs",
        link: "#", // Placeholder
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
        title: "نظام إدارة المهام (Notion)",
        description: "لوحة تحكم كاملة لإدارة المشاريع مع قسم خاص للمساعد الذكي.",
        icon: CheckSquare,
        format: "Notion Template",
        link: "#", // Placeholder
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
        title: "نموذج تقييم الأدوات",
        description: "ملف Excel بحسابات تلقائية لمقارنة التكلفة والعائد للأدوات المختلفة.",
        icon: Table,
        format: "Google Sheets / Excel",
        link: "#", // Placeholder
        color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
        title: "تقرير تتبع النتائج (KPIs)",
        description: "قالب لمتابعة أداء حملاتك التسويقية ونمو مشروعك شهرياً.",
        icon: BarChart,
        format: "Google Sheets",
        link: "#", // Placeholder
        color: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    }
];

export default function TemplatesPage() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    مكتبة القوالب <span className="text-gradient-gold">المجانية</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    لا تبدأ من الصفر. وفر ساعات من العمل مع قوالب احترافية جاهزة للاستخدام وقابلة للتعديل.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto content-center">
                {templates.map((template, index) => (
                    <Card key={index} className="h-full flex flex-col hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className={`p-3 rounded-xl ${template.color}`}>
                                <template.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{template.title}</h3>
                                <span className="text-xs text-muted-foreground bg-secondary/10 px-2 py-1 rounded-full">{template.format}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground leading-relaxed">
                                {template.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full gap-2 group" size="lg">
                                تحميل القالب
                                <span className="group-hover:-translate-y-1 transition-transform">↓</span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-16 text-center bg-muted/30 rounded-2xl p-8 max-w-3xl mx-auto border border-border/50">
                <h3 className="text-xl font-bold mb-2">هل تبحث عن قالب محدد؟</h3>
                <p className="text-muted-foreground mb-4">
                    نحن نضيف قوالب جديدة أسبوعياً. أخبرنا بما تحتاجه وسنعمل على توفيره.
                </p>
                <Link href="/about">
                    <Button variant="outline">اقترح قالباً جديداً</Button>
                </Link>
            </div>
        </div>
    );
}
