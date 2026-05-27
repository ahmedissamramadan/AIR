'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { demos } from '@/lib/demos';
import { ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">الديموهات</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
              شاهد الأنظمة الذكية تعمل مباشرة. 3 ديموهات فيديو توضح كيف توفر كل نظام ساعات من وقتك.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Demos Grid */}
      <section className="py-12 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {demos.map((demo, idx) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                {/* Video Thumbnail */}
                <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                  <iframe
                    src={demo.videoUrl}
                    title={demo.demoTitle}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {demo.systemTitle}
                    </p>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2">
                      {demo.demoTitle}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    {demo.demoDescription}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {demo.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {metric.label}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button asChild className="w-full mt-4" variant="primary">
                    <Link href={`/demos/${demo.slug}`}>
                      اشاهد الديمو الكامل
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            اخترت الديمو اللي يناسبك؟
          </h2>

          <p className="text-lg text-blue-100">
            انسخ الـ Prompt من أي ديمو ابدأ تطبيقها الآن. كل نظام يوفر لك ساعات من الوقت.
          </p>

          <Button
            asChild
            variant="secondary"
            size="lg"
          >
            <Link href="/systems">عرض جميع الأنظمة</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
