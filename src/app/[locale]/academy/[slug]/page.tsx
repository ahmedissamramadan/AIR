import { courses } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock, Globe, BarChart, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

import { getLocalizedContent } from "@/lib/data";

export function generateStaticParams() {
    return courses.flatMap((course) => [
        { slug: course.slug, locale: 'ar' },
        { slug: course.slug, locale: 'en' }
    ]);
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { slug, locale } = await params;
    const isAr = locale === 'ar';
    const decodedSlug = decodeURIComponent(slug);
    const course = courses.find((c) => c.slug === decodedSlug);

    if (!course) {
        notFound();
    }

    return (
        <div className={`container mx-auto px-4 py-12 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {/* Left Column: Course Info */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="space-y-6">
                        <Badge variant="primary" className="text-sm px-4 py-1">{course.category}</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{getLocalizedContent(course.title, locale)}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{getLocalizedContent(course.longDescription, locale)}</p>
                    </div>

                    <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image src={course.image} alt={getLocalizedContent(course.title, locale)} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Link href="#enroll" className="absolute inset-0 flex items-center justify-center group">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary-foreground border-b-[10px] border-b-transparent ml-2" />
                            </div>
                        </Link>
                    </div>

                    {/* Syllabus */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold">{isAr ? 'منهج الدورة' : 'Course Syllabus'}</h2>
                        <div className="space-y-4">
                            {course.modules.map((module, i) => (
                                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                                    <div className="bg-muted/50 p-6 border-b border-border">
                                        <h3 className="text-xl font-bold font-arabic mb-1">{isAr ? `الوحدة ${i + 1}: ${getLocalizedContent(module.title, locale)}` : `Module ${i + 1}: ${getLocalizedContent(module.title, locale)}`}</h3>
                                        <p className="text-sm text-muted-foreground">{module.lessons.length} {isAr ? 'دروس تقديرية' : 'Estimated lessons'}</p>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {module.lessons.map((lesson, j) => (
                                            <div key={j} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-secondary/5 group-hover:bg-primary/10 flex items-center justify-center text-xs font-bold transition-colors">
                                                        {j + 1}
                                                    </div>
                                                    <span className="font-medium">{getLocalizedContent(lesson.title, locale)}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-muted-foreground font-mono">{lesson.duration}</span>
                                                    {lesson.isFree ? (
                                                        <Badge variant="outline" className="text-[10px] text-green-600 bg-green-50 animate-pulse">{isAr ? 'شاهده مجاناً' : 'Watch Free'}</Badge>
                                                    ) : (
                                                        <CheckCircle2 className="w-4 h-4 text-muted-foreground/30" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {/* Enrollment Card */}
                        <div className="p-8 rounded-3xl bg-card border-2 border-primary shadow-2xl shadow-primary/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <div className="text-sm font-bold text-primary mb-2">{isAr ? 'سعر الدورة' : 'Course Price'}</div>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-5xl font-bold">{course.price === "Free" ? (isAr ? "مجاني" : "Free") : `$${course.price}`}</span>
                                {course.price !== "Free" && <span className="text-muted-foreground line-through text-xl">$999</span>}
                            </div>

                            <div className="space-y-6 mb-8">
                                {[
                                    { icon: Clock, text: isAr ? `المدة: ${course.duration}` : `Duration: ${course.duration}` },
                                    { icon: BarChart, text: isAr ? `المستوى: ${course.level}` : `Level: ${course.level}` },
                                    { icon: BookOpen, text: isAr ? `المحتوى: ${course.modules.length} وحدات` : `Content: ${course.modules.length} modules` },
                                    { icon: Globe, text: isAr ? "وصول دائم مدى الحياة" : "Lifetime access" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <item.icon className="w-5 h-5 text-primary shrink-0" />
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href={`/${locale}/checkout?type=course&id=${course.slug}`}>
                                <Button id="enroll" size="lg" className="w-full h-16 text-xl font-bold shadow-xl shadow-primary/20 mb-4">
                                    {isAr ? 'اشترك في الدورة الآن' : 'Enroll in the course now'}
                                </Button>
                            </Link>
                            <p className="text-xs text-center text-muted-foreground">{isAr ? 'ضمان استرجاع الأموال لمدة 14 يوماً' : '14-day money back guarantee'}</p>
                        </div>

                        {/* Instructor Card */}
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                            <div className="flex items-center gap-4 mb-4">
                                <Image src={course.instructor.avatar} alt={getLocalizedContent(course.instructor.name, locale)} width={60} height={60} className="rounded-full shadow-md" />
                                <div>
                                    <div className="text-xs font-bold text-primary uppercase mb-0.5">{isAr ? 'مدرب الدورة' : 'Course Instructor'}</div>
                                    <div className="text-lg font-bold">{getLocalizedContent(course.instructor.name, locale)}</div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{course.instructor.bio ? getLocalizedContent(course.instructor.bio, locale) : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
