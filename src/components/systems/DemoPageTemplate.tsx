'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CopySystemButton } from '@/components/systems/CopySystemButton';
import { Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoPageTemplateProps {
  systemTitle: string;
  systemSlug: string;
  demoTitle: string;
  demoDescription: string;
  videoUrl: string; // YouTube embed URL
  videoDuration: '45s' | '90s' | string;
  problem: string;
  result: string;
  prompt: string;
  language?: 'ar' | 'en';
  downloadFile?: {
    name: string;
    url: string;
    format: 'PDF' | 'DOC' | 'CSV' | 'JSON';
  };
  steps?: {
    title: string;
    description: string;
  }[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  tools?: string[];
  nextSystemSlug?: string;
  nextSystemTitle?: string;
}

export function DemoPageTemplate({
  systemTitle,
  systemSlug,
  demoTitle,
  demoDescription,
  videoUrl,
  videoDuration,
  problem,
  result,
  prompt,
  language = 'ar',
  downloadFile,
  steps,
  beforeAfter,
  metrics,
  tools,
  nextSystemSlug,
  nextSystemTitle,
}: DemoPageTemplateProps) {
  const isArabic = language === 'ar';

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{systemTitle}</Badge>
            <Badge variant="outline">{videoDuration}</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {demoTitle}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {demoDescription}
          </p>

          {/* Key Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-slate-200 dark:border-slate-800">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metric.value}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden group"
          >
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={demoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </motion.div>

          <p className="text-center text-slate-400 mt-4 text-sm">
            {isArabic
              ? `مدة الفيديو: ${videoDuration}`
              : `Video duration: ${videoDuration}`}
          </p>
        </div>
      </section>

      {/* Problem & Result */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {isArabic ? '❌ المشكلة' : '❌ The Problem'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {problem}
            </p>
            {beforeAfter && (
              <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl mt-6 border border-red-200 dark:border-red-900">
                <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                  {isArabic ? 'قبل النظام:' : 'Before:'}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  {beforeAfter.before}
                </p>
              </div>
            )}
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {isArabic ? '✨ النتيجة' : '✨ The Result'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {result}
            </p>
            {beforeAfter && (
              <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl mt-6 border border-green-200 dark:border-green-900">
                <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  {isArabic ? 'بعد النظام:' : 'After:'}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  {beforeAfter.after}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      {steps && steps.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {isArabic ? 'خطوات التنفيذ' : 'Implementation Steps'}
            </h2>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prompt Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {isArabic ? 'الـ Prompt الجاهز' : 'Ready-to-Use Prompt'}
          </h2>

          <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-8 rounded-xl overflow-x-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap break-words">
              {prompt}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <CopySystemButton
              systemSlug={systemSlug}
              systemTitle={systemTitle}
              prompt={prompt}
              language={language}
              size="lg"
              variant="primary"
            />

            {downloadFile && (
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="gap-2"
              >
                <a href={downloadFile.url} download={downloadFile.name}>
                  <Download className="w-5 h-5" />
                  {isArabic ? 'تحميل النموذج' : `Download (${downloadFile.format})`}
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Tools Section */}
      {tools && tools.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {isArabic ? 'الأدوات المستخدمة' : 'Tools Used'}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {tool}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {isArabic
              ? 'جاهز للبدء؟ اختبر النظام الآن'
              : 'Ready to Get Started?'}
          </h2>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {isArabic
              ? 'انسخ الـ Prompt أعلاه والصقه في ChatGPT أو أي أداة ذكاء اصطناعي وابدأ الآن'
              : 'Copy the prompt above and paste it into ChatGPT or your favorite AI tool'}
          </p>

          <CopySystemButton
            systemSlug={systemSlug}
            systemTitle={systemTitle}
            prompt={prompt}
            language={language}
            variant="secondary"
            size="lg"
          />
        </div>
      </section>

      {/* Next System Navigation */}
      {nextSystemSlug && nextSystemTitle && (
        <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8">
              {isArabic ? 'الخطوة التالية' : 'What\'s Next?'}
            </h2>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full md:w-auto gap-2"
            >
              <a href={`/systems/${nextSystemSlug}`}>
                {nextSystemTitle}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </section>
      )}
    </div>
  );
}
