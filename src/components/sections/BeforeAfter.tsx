import { X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const examples = [
    {
        title: "كتابة محتوى طويل",
        before: "ساعات من البحث والكتابة العشوائية مع بلوك إبداعي متكرر.",
        after: "نظام أتمتة يولد المسودة الأولى في 10 دقائق مع تدقيق كامل.",
        link: "/blog/صناعة-المحتوى-بالذكاء-الاصطناعي"
    },
    {
        title: "إدارة المهام",
        before: "مئات الملاحظات المشتتة في 5 تطبيقات مختلفة.",
        after: "لوحة تحكم واحدة مركزية مربوطة بذكاء اصطناعي يرتب الأولويات.",
        link: "/blog/ادوات-الإنتاجية-2025"
    }
];

export function BeforeAfter() {
    return (
        <section className="bg-secondary/5 border-y border-border/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">سترى الفرق بنفسك</h2>
                    <p className="text-xl text-muted-foreground">كيف يتغير يومك بعد استخدام أنظمة أثير | AIR؟</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {examples.map((item, i) => (
                        <div key={i} className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                            <h3 className="text-2xl font-bold mb-8 text-center">{item.title}</h3>

                            <div className="space-y-8">
                                {/* Before */}
                                <div className="relative p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                                    <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">بدوننا</div>
                                    <div className="flex gap-4">
                                        <X className="w-6 h-6 text-red-500 shrink-0" />
                                        <p className="text-muted-foreground leading-relaxed">{item.before}</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="flex justify-center">
                                    <ArrowRight className="w-8 h-8 text-primary rotate-90 md:rotate-0" />
                                </div>

                                {/* After */}
                                <div className="relative p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                                    <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">مع أثير | AIR</div>
                                    <div className="flex gap-4">
                                        <Check className="w-6 h-6 text-green-500 shrink-0" />
                                        <p className="text-foreground font-medium leading-relaxed">{item.after}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <Link href={item.link}>
                                    <Button variant="ghost" className="gap-2 group-hover:bg-primary/10 group-hover:text-primary">
                                        اقرأ القصة بالكامل
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background blur elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-secondary/10 blur-[100px] pointer-events-none" />
        </section>
    );
}
