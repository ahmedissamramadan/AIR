import { IMAGES } from "@/lib/image-data";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, X, Zap } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { SystemSnippet } from "@/components/ui/SystemSnippet";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { FeatureCard } from "@/components/ui/FeatureCard";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr ? "أثير | AIR - Arab Intelligence Repository" : "AIR - Arab Intelligence Repository",
    description: isAr
      ? "مستودع الذكاء العربي - أنظمة جاهزة، أدوات إنتاجية، ومعرفة شاملة في مجال الذكاء الاصطناعي"
      : "Arab Intelligence Repository - Ready systems, productivity tools, and comprehensive knowledge in AI",
    openGraph: {
      title: isAr ? "أثير | AIR" : "AIR | Arab Intelligence Repository",
      description: isAr
        ? "مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات في مجال الذكاء الاصطناعي"
        : "Arab Intelligence Repository - A comprehensive platform for systems and tools in AI",
      images: [
        {
          url: IMAGES.og.default.src,
          width: IMAGES.og.default.width || 1200,
          height: IMAGES.og.default.height || 630,
          alt: IMAGES.og.default.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [IMAGES.og.default.src],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <div className={`flex flex-col min-h-screen ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden bg-aurora">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-primary">
              {isAr ? 'مستودع الذكاء العربي' : 'Arab Intelligence Repository'}
            </span>
          </div>

          <h1 className="leading-tight">
            {isAr ? 'أثير | AIR' : 'AIR | Repository'} <br />
            <span className="text-gradient-tech">Arab Intelligence Repository</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'مستودع شامل للأنظمة، الأدوات، والمعرفة في مجال الذكاء الاصطناعي.'
              : 'A comprehensive repository for systems, tools, and knowledge in the field of AI.'}
            <br />
            {isAr
              ? 'كل ما تحتاجه لتطبيق الذكاء الاصطناعي في عملك.'
              : 'Everything you need to apply AI in your business.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={`/${locale}/resources/10-hour-guide`}>
              <Button size="lg" className="w-full sm:w-auto text-lg px-12 h-16 font-bold shadow-2xl shadow-primary/20">
                {isAr ? 'استكشف المستودع' : 'Explore Repository'}
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              {isAr ? '* أنظمة جاهزة للتطبيق الفوري' : '* Systems ready for immediate application'}
            </p>
          </div>

          <SystemSnippet
            title={isAr ? "نظام خدمة العملاء الآلي (n8n)" : "Automated Customer Service (n8n)"}
            code={`{
  "nodes": [
    { "name": "Telegram Trigger", "type": "n8n-nodes-base.telegramTrigger" },
    { "name": "AI Agent", "type": "@n8n/n8n-nodes-langchain.agent", 
      "parameters": { "model": "gpt-4o", "systemMessage": "You are a helpful support agent." } 
    },
    { "name": "Google Sheets", "type": "n8n-nodes-base.googleSheets", 
      "parameters": { "operation": "append", "sheetId": "LEADS_DB" } 
    }
  ]
}`}
            description={isAr
              ? "انسخ هذا الـ Workflow JSON وضعه في n8n ليصبح لديك موظف خدمة عملاء يعمل 24/7."
              : "Copy this Workflow JSON and paste it into n8n to have a 24/7 customer service agent."}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-[var(--muted)]/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">
              {isAr ? 'ما الذي يميز أثير | AIR؟' : 'What makes AIR special?'}
            </h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              {isAr
                ? 'مستودع متكامل يحوّل الذكاء الاصطناعي من مفهوم نظري إلى أداة عملية في يدك'
                : 'An integrated repository that transforms AI from a theoretical concept into a practical tool in your hand'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title={isAr ? "أتمتة سير العمل (Workflow)" : "Workflow Automation"}
              description={isAr
                ? "تعلم كيف تربط التطبيقات ببعضها (n8n, Zapier) لبناء أنظمة تعمل تلقائياً وأنت نائم."
                : "Learn how to connect applications (n8n, Zapier) to build systems that work automatically while you sleep."}
            />
            <FeatureCard
              icon={<Check className="w-6 h-6" />}
              title={isAr ? "ذكاء اصطناعي محلي" : "Local AI"}
              description={isAr
                ? "شغّل أقوى الموديلات (Llama 3, Stable Diffusion) على جهازك الخاص مجاناً وبخصوصية تامة."
                : "Run the most powerful models (Llama 3, Stable Diffusion) on your own device for free and with complete privacy."}
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title={isAr ? "تحليل البيانات الضخمة" : "Big Data Analysis"}
              description={isAr
                ? "استخدم Gemini 1.5 لتحليل ملايين الكلمات والمستندات واستخراج رؤى استراتيجية في ثوانٍ."
                : "Use Gemini 1.5 to analyze millions of words and documents and extract strategic insights in seconds."}
            />
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <BeforeAfter />

      {/* Why Section */}
      <section className="bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-bold">{isAr ? 'الفرق بيننا وبين المحتوى التقليدي' : 'The difference between us and traditional content'}</h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 items-stretch ${isAr ? '' : 'direction-ltr'}`}>
            {/* Others Card */}
            <div className="relative p-8 rounded-[2rem] bg-card border border-border/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <h3 className="font-bold text-muted-foreground flex items-center gap-2">
                <span className="p-2 rounded-full bg-red-500/10 text-red-600"><X className="w-5 h-5" /></span>
                {isAr ? 'معظم المحتوى العربي' : 'Most Arabic Content'}
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <X className={`w-5 h-5 text-red-500/50 mt-1 shrink-0 ${isAr ? '' : 'rotate-180'}`} />
                  <span>{isAr ? 'شرح مصطلحات أكاديمية (LLM, NLP) دون تطبيق' : 'Academic terms explanation (LLM, NLP) without application'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className={`w-5 h-5 text-red-500/50 mt-1 shrink-0 ${isAr ? '' : 'rotate-180'}`} />
                  <span>{isAr ? 'أخبار يومية وصيحات "التريند"' : 'Daily news and "trend" fads'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className={`w-5 h-5 text-red-500/50 mt-1 shrink-0 ${isAr ? '' : 'rotate-180'}`} />
                  <span>{isAr ? '"جرب هذه الأداة ستبهرك" (بدون هدف)' : '"Try this tool, it will amaze you" (without a goal)'}</span>
                </li>
              </ul>
            </div>

            {/* Practical AI Card */}
            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-br-full -ml-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h3 className="text-primary flex items-center gap-2">
                <span className="p-2 rounded-full bg-green-500/10 text-green-600"><Check className="w-6 h-6" /></span>
                {isAr ? 'ذكاء عملي' : 'Practical Intelligence'}
              </h3>
              <ul className="space-y-3 text-foreground font-medium">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>{isAr ? 'أنظمة جاهزة للنسخ واللصق فوراً' : 'Ready-to-copy-and-paste systems immediately'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>{isAr ? 'ركز على الإنتاجية وتوفير الوقت والمال' : 'Focus on productivity and saving time and money'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>{isAr ? '"خذ هذا النظام وابدأ العمل به غداً"' : '"Take this system and start working with it tomorrow"'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-bold underline decoration-primary/30 underline-offset-8">
            {isAr ? 'ماذا ستستفيد من هنا؟' : 'What will you gain here?'}
          </h2>
          <p className="text-xl text-muted-foreground mt-4">
            {isAr ? 'لا حشو. أنظمة عمل مجهزة للنمو.' : 'No fluff. Work systems built for growth.'}
          </p>
        </div>

        <div className="bento-grid max-w-6xl mx-auto">
          <div className="bento-item-1 p-8 rounded-3xl bg-card border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <h3 className="font-bold text-3xl mb-4 text-primary">{isAr ? 'أنظمة جاهزة للنسخ' : 'Ready-to-copy Systems'}</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {isAr
                ? 'سير عمل كامل يمكنك من إنجاز عمل أسبوع في يومين. ركزنا على أن تكون الخطوات واضحة وسهلة التنفيذ فوراً.'
                : 'A full workflow that enables you to complete a week\'s work in two days. We focused on clear steps and immediate implementation.'}
            </p>
          </div>

          <div className="bento-item-2 p-8 rounded-3xl bg-card border border-border/50">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-2xl mb-2">{isAr ? 'وفّر الوقت' : 'Save Time'}</h3>
            <p className="text-muted-foreground">{isAr ? '10 ساعات أسبوعياً على الأقل' : 'At least 10 hours weekly'}</p>
          </div>

          <div className="bento-item-3 p-8 rounded-3xl bg-card border border-border/50">
            <Check className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-2xl mb-2">{isAr ? 'ابدأ الآن' : 'Start Now'}</h3>
            <p className="text-muted-foreground">{isAr ? 'بدون دورات طويلة أو نظريات' : 'Without long courses or theories'}</p>
          </div>

          <div className="bento-item-4 p-8 rounded-3xl bg-card border border-border/50">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">{isAr ? 'صُمّمت للعرب' : 'Designed for Arabs'}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? 'بأمثلة ولغة تفهمها' : 'With examples and language you understand'}</p>
            </div>
          </div>

          <div className="bento-item-5 p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="font-bold text-2xl mb-4">{isAr ? 'أدوات موثوقة' : 'Trusted Tools'}</h3>
            <p className="text-muted-foreground mb-6">
              {isAr
                ? 'مختارة بعناية من أفضل المنصات والمراجع العالمية'
                : 'Carefully selected from the best platforms and global references'}
            </p>
            <Link href={`/${locale}/tools`}>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                {isAr ? 'استكشف الأدوات ←' : 'Explore Tools →'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4">{isAr ? 'ماذا يقول مستخدمونا؟' : 'What do our users say?'}</h2>
          <p className="text-xl text-muted-foreground">{isAr ? 'تجارب حقيقية من رواد أعمال وصناع محتوى' : 'Real experiences from entrepreneurs and content creators'}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              {isAr
                ? '"وفرت 12 ساعة أسبوعياً بعد تطبيق نظام إعادة استغلال المحتوى. الأنظمة واضحة وسهلة التنفيذ."'
                : '"I saved 12 hours weekly after applying the content repurposing system. The systems are clear and easy to implement."'}
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👨‍💼
              </div>
              <div>
                <div className="font-bold">{isAr ? 'محمد الراشد' : 'Mohammed Al-Rashed'}</div>
                <div className="text-sm text-muted-foreground">{isAr ? 'صانع محتوى' : 'Content Creator'}</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              {isAr
                ? '"أخيراً محتوى عربي عملي عن الذكاء الاصطناعي! الأدوات المختارة مميزة والشروحات واضحة."'
                : '"Finally, practical Arabic content about AI! The selected tools are excellent and the explanations are clear."'}
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👩‍💻
              </div>
              <div>
                <div className="font-bold">{isAr ? 'سارة الأحمد' : 'Sara Al-Ahmed'}</div>
                <div className="text-sm text-muted-foreground">{isAr ? 'مديرة تسويق' : 'Marketing Manager'}</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              {isAr
                ? '"النشرة الأسبوعية رائعة! كل خميس أحصل على أدوات جديدة يمكنني تطبيقها فوراً."'
                : '"The weekly newsletter is great! Every Thursday I get new tools I can apply immediately."'}
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👨‍🎓
              </div>
              <div>
                <div className="font-bold">{isAr ? 'خالد المنصور' : 'Khaled Al-Mansour'}</div>
                <div className="text-sm text-muted-foreground">{isAr ? 'رائد أعمال' : 'Entrepreneur'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-card border-t border-border">
        <NewsletterSignup />
      </section>

      {/* Recent Blog Posts */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="mb-12">
          <h2 className="font-bold mb-2">{isAr ? 'أحدث المقالات' : 'Latest Articles'}</h2>
          <p className="text-muted-foreground">{isAr ? 'نصائح عملية وأمثلة واقعية كل أسبوع' : 'Practical tips and real examples every week'}</p>
        </div>
        <BlogList limit={6} locale={locale} />
      </section>
    </div>
  );
}
