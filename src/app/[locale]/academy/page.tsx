import { Metadata } from "next";
import { courses, getLocalizedContent } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, BarChart } from "lucide-react";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? "أكاديمية ذكاء. | تعلم إتقان الذكاء الاصطناعي" : "AI Academy | Master AI Implementation",
        description: isAr ? "دورات تدريبية مكثفة وعملية لتطوير مهاراتك في استخدام الذكاء الاصطناعي في الأعمال." : "Intensive and practical training courses to develop your AI skills in business.",
    };
}

export default async function AcademyPage({ params }: PageProps) {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return (
        <div className={`container mx-auto px-4 py-20 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                <span className="text-primary font-bold tracking-widest uppercase py-1 px-3 bg-primary/10 rounded-full text-xs">
                    {isAr ? 'الأكاديمية' : 'Academy'}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold">
                    {isAr ? (
                        <>استثمر في <span className="text-gradient-gold">مهارات المستقبل.</span></>
                    ) : (
                        <>Invest in <span className="text-gradient-gold">skills of the future.</span></>
                    )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {isAr
                        ? 'دوراتنا لا تبيع "أحلاماً"، بل تمنحك "أنظمة" تعمل. تعلم كيف تدمج الـ AI في صلب عملك اليومي.'
                        : 'Our courses don\'t sell "dreams", they give you "systems" that work. Learn how to integrate AI into the core of your daily work.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {courses.map((course) => (
                    <Card key={course.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                            <Image
                                src={course.image}
                                alt={getLocalizedContent(course.title, locale)}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} flex gap-2`}>
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-white/10">{course.category}</Badge>
                                <Badge className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">{course.price === "Free" ? (isAr ? "مجاني" : "Free") : `${course.price}$`}</Badge>
                            </div>
                        </div>
                        <CardHeader className="pt-6">
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">{getLocalizedContent(course.title, locale)}</h3>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                {getLocalizedContent(course.description, locale)}
                            </p>
                            <div className={`flex items-center justify-between text-xs text-muted-foreground font-medium pt-4 border-t border-border/50 ${isAr ? '' : 'flex-row-reverse'}`}>
                                <div className={`flex items-center gap-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
                                    <BarChart className="w-4 h-4 text-primary" />
                                    <span>{course.level}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    <span>{course.modules.length} {isAr ? 'وحدات' : 'Modules'}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 pb-6">
                            <Link href={`/${locale}/academy/${course.slug}`} className="w-full">
                                <Button className="w-full text-lg font-bold group-hover:translate-x-1 transition-transform" variant="secondary">
                                    {isAr ? 'استعرض الدورة' : 'View Course'}
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Newsletter Integration */}
            <div className="mt-32 p-12 rounded-[2.5rem] bg-gradient-to-br from-secondary/10 to-background border border-border/50 text-center relative overflow-hidden max-w-4xl mx-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <h2 className="text-3xl font-bold mb-4">
                    {isAr ? 'هل تريد دورة مخصصة لفريقك؟' : 'Want a custom course for your team?'}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    {isAr
                        ? 'نحن نقدم تدريباً مخصصاً للشركات الصغير والمتوسطة حول كيفية رفع الإنتاجية باستخدام أدوات العصر الجديد.'
                        : 'We offer custom training for small and medium businesses on how to increase productivity using new era tools.'}
                </p>
                <Link href={`/${locale}/consultancy`}>
                    <Button size="lg" className="px-10 h-14 text-lg font-bold">
                        {isAr ? 'تواصل معنا للتدريب' : 'Contact us for training'}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
