import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: 'دليل اختيار أداة الذكاء الاصطناعي المناسبة | ذكاء',
    description: 'إطار عمل منهجي لاختيار الأدوات التقنية المناسبة لشركتك وتجنب هدر الميزانية.',
    openGraph: {
        title: "دليل اختيار أداة الذكاء الاصطناعي المناسبة | ذكاء",
        description: "كيف تختار الأداة الصحيحة وتتجنب هدر المال.",
        type: "article",
    },
};

export default function ToolSelectionGuidePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="inline-block px-4 py-2 mb-4 bg-primary/10 text-primary rounded-full text-sm font-bold">
                        إطار عمل
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        كيف تختار أداة الذكاء الاصطناعي <br />
                        <span className="text-gradient-gold">المناسبة لعملك؟</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        لا تضيع وقتك ومالك في تجربة كل أداة جديدة. إليك المنهجية الصحيحة للتقييم والاختيار.
                    </p>
                </header>

                <div className="bg-card border border-border rounded-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-4">خطوات الاختيار:</h2>
                    <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground list-decimal list-inside accent-primary">
                        <li>تحديد المشكلة الحقيقية أولاً</li>
                        <li>البحث والتقييم الأولي</li>
                        <li>التجربة المجانية (Pilot)</li>
                        <li>حساب العائد على الاستثمار (ROI)</li>
                        <li>اتخاذ القرار والتطبيق</li>
                    </ul>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary mb-16">
                    <h2>1. تحديد المشكلة الحقيقية أولاً</h2>
                    <p>
                        أكبر خطأ يقع فيه الرواد هو الانبهار بالأداة قبل تحديد الحاجة. &quot;هذه الأداة رائعة، كيف يمكننا استخدامها؟&quot; هو سؤال خاطئ.
                        السؤال الصحيح: &quot;لدينا مشكلة في بطء خدمة العملاء، ما هي الأدوات التي تحل ذلك؟&quot;
                    </p>

                    <h2>2. البحث والتقييم الأولي</h2>
                    <p>
                        استخدم دليل الأدوات في <Link href="/tools">موقع ذكاء</Link> لتصفية الخيارات.
                        ابحث عن:
                    </p>
                    <ul>
                        <li><strong>السهولة:</strong> هل واجهة المستخدم تدعم اللغة العربية؟ هل هي سهلة للفريق؟</li>
                        <li><strong>التكامل:</strong> هل ترتبط مع أدواتك الحالية (مثل Slack, Gmail)؟</li>
                        <li><strong>التكلفة:</strong> هل السعر يتناسب مع الميزانية على المدى الطويل؟</li>
                    </ul>

                    <h2>3. التجربة المجانية (Pilot)</h2>
                    <p>
                        لا تشترِ الاشتراك السنوي فوراً. جرب الأداة لمدة أسبوع في مهمة حقيقية واحدة.
                        اطلب من موظف واحد فقط استخدامها وقياس النتائج.
                    </p>

                    <div className="not-prose bg-secondary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                        <h4 className="font-bold text-lg mb-2">⚠️ تحذير:</h4>
                        <p className="text-muted-foreground">
                            احذر من &quot;فخ الاشتراكات&quot;. تأكد من سهولة إلغاء الاشتراك وتصدير بياناتك (Export Data) في حال قررت تغيير الأداة لاحقاً.
                        </p>
                    </div>

                    <h2>4. حساب العائد على الاستثمار (ROI)</h2>
                    <p>
                        إذا كانت الأداة تكلف 30$ شهرياً، فهل توفر عليك وقتاً قيمته أكثر من 30$؟
                        إذا كانت توفر ساعة واحدة فقط من وقتك (وقيمتك بالساعة 50$)، فهي صفقة رابحة.
                    </p>

                    <h2>5. اتخاذ القرار والتطبيق</h2>
                    <p>
                        بعد الاختيار، تأتي أهم مرحلة: التدريب. الأداة القوية في يد شخص لا يعرف استخدامها هي بلا فائدة.
                        خصص وقتاً لتدريب فريقك وشرح &quot;لماذا&quot; نستخدم هذه الأداة.
                    </p>
                </div>

                {/* CTA Box */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
                    <h3 className="text-3xl font-bold mb-4">هل مازلت محتاراً؟</h3>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        استخدم &quot;قالب تقييم الأدوات&quot; الخاص بنا للمقارنة بين الخيارات المختلفة بنظام النقاط.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/resources/templates">
                            <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                تحميل قالب التقييم (Excel)
                            </Button>
                        </Link>
                        <Link href="/tools">
                            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg px-8">
                                العودة للأدوات
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
