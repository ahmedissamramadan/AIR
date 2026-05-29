import { notFound } from 'next/navigation';
import { demos } from '@/lib/demos';
import { DemoPageTemplate } from '@/components/systems/DemoPageTemplate';

export function generateStaticParams() {
  return demos.map((demo) => ({
    slug: demo.slug,
  }));
}

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = demos.find((d) => d.slug === slug);

  if (!demo) {
    notFound();
  }

  return (
    <DemoPageTemplate
      systemTitle={demo.systemTitle}
      systemSlug={demo.slug}
      demoTitle={demo.demoTitle}
      demoDescription={demo.demoDescription}
      videoUrl={demo.videoUrl}
      videoDuration={demo.videoDuration}
      problem={demo.problem}
      result={demo.result}
      prompt={demo.prompt}
      language={demo.language}
      metrics={demo.metrics}
      beforeAfter={demo.beforeAfter}
      steps={demo.steps}
      tools={demo.tools}
      downloadFile={demo.downloadFile}
      nextSystemSlug={demo.nextSystemSlug}
      nextSystemTitle={demo.nextSystemTitle}
    />
  );
}
