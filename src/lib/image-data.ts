import { IMAGE_DIMENSIONS, IMAGE_QUALITY } from './image-config';
import { getImageConfig } from './image-utils';

// Brand & Logo
export const brandImages = {
  logoVariations: getImageConfig('brand', 'logo-variations', undefined, {
    alt: 'تباينات شعار ذكاء عملي - العربية والإنجليزية والرموز المختلفة',
    width: 1200,
    height: 400,
    quality: IMAGE_QUALITY.logo
  }),
  logo: getImageConfig('brand', 'logo', undefined, {
    alt: 'شعار ذكاء عملي',
    width: 200,
    height: 200,
    quality: IMAGE_QUALITY.logo
  })
};

// Features Section
export const featureImages = {
  executionReady: getImageConfig('features', 'execution-ready', undefined, {
    alt: 'رؤى قابلة للتنفيذ - تحويل البيانات إلى استراتيجيات عملية'
  }),
  easyAutomation: getImageConfig('features', 'easy-automation', undefined, {
    alt: 'أتمتة سهلة - تبسيط المهام المتكررة بأدوات ذكية'
  }),
  smartTools: getImageConfig('features', 'smart-tools', undefined, {
    alt: 'أدوات ذكية - مجموعة متكاملة من أدوات الذكاء الاصطناعي'
  })
};

// Hero Sections
export const heroImages = {
  consultancy: getImageConfig('hero', 'consultancy', 'hero', {
    alt: 'خدمات الاستشارات - دليل شامل للذكاء الاصطناعي العملي',
    width: IMAGE_DIMENSIONS.hero.width,
    height: IMAGE_DIMENSIONS.hero.height,
    quality: IMAGE_QUALITY.hero,
    priority: true
  }),
  guide: getImageConfig('hero', 'guide', 'hero', {
    alt: 'دليل شامل - أدوات واقعية للمحترفين العرب',
    width: IMAGE_DIMENSIONS.hero.width,
    height: IMAGE_DIMENSIONS.hero.height,
    quality: IMAGE_QUALITY.hero,
    priority: true
  }),
  dashboard: getImageConfig('hero', 'dashboard-showcase', undefined, {
    alt: 'لوحة التحكم الذكية - منصة متكاملة لإدارة الذكاء الاصطناعي',
    width: IMAGE_DIMENSIONS.hero.width,
    height: IMAGE_DIMENSIONS.hero.height,
    quality: IMAGE_QUALITY.hero
  })
};

// Guides & Products
export const guideImages = {
  aiRoadmap: getImageConfig('guides', 'ai-roadmap', undefined, {
    alt: 'خريطة الطريق - 5 خطوات عملية لتطبيق الذكاء الاصطناعي في عملك',
    width: 1000,
    height: 800
  }),
  guidePreview: getImageConfig('guides', 'guide-preview', undefined, {
    alt: 'معاينة الدليل الشامل - صور توضيحية وأمثلة عملية',
    width: 600,
    height: 400
  }),
  masterclass: getImageConfig('guides', 'masterclass', 'card', {
    alt: 'بطاقة الدورة التدريبية - دليل شامل للذكاء الاصطناعي العملي',
    width: 600,
    height: 400
  }),
  dashboard: getImageConfig('guides', 'dashboard-mockup', undefined, {
    alt: 'واجهة لوحة التحكم - تصميم احترافي وتجربة المستخدم المحسّنة'
  })
};

// AI Tips & Weekly Content
export const tipImages = {
  automation: getImageConfig('tips', 'automation', 'tip', {
    alt: 'نصيحة الأسبوع - أتمتة ردود البريد الإلكترونية باستخدام الذكاء الاصطناعي',
    width: 1000,
    height: 600
  }),
  emailAutomation: getImageConfig('tips', 'email-automation', 'tip', {
    alt: 'أتمتة البريد الإلكترونية - استخدم أدوات الذكاء الاصطناعي لصياغة ردود فورية'
  }),
  startWithAI: getImageConfig('tips', 'start-with-ai', undefined, {
    alt: 'كيف تبدأ مع الذكاء الاصطناعي - أدوات وأمثلة عملية للمبتدئين'
  })
};

// Testimonials & Authors
export const testimonialImages = {
  ahmadEsam: getImageConfig('testimonials', 'ahmed-esam', undefined, {
    alt: 'أحمد عصام - مؤسس ذكاء عملي',
    width: IMAGE_DIMENSIONS.avatar.width,
    height: IMAGE_DIMENSIONS.avatar.height,
    quality: IMAGE_QUALITY.avatar
  })
};

// OG Images for Social Sharing
export const ogImages = {
  default: getImageConfig('og', 'og-default', undefined, {
    alt: 'ذكاء عملي - أدوات واقعية للمحترفين العرب',
    width: IMAGE_DIMENSIONS.og.width,
    height: IMAGE_DIMENSIONS.og.height,
    quality: IMAGE_QUALITY.og
  }),
  consultancy: getImageConfig('og', 'og-consultancy', undefined, {
    alt: 'خدمات الاستشارات - ذكاء عملي',
    width: IMAGE_DIMENSIONS.og.width,
    height: IMAGE_DIMENSIONS.og.height,
    quality: IMAGE_QUALITY.og
  }),
  guide: getImageConfig('og', 'og-guide', undefined, {
    alt: 'دليل شامل - ذكاء عملي',
    width: IMAGE_DIMENSIONS.og.width,
    height: IMAGE_DIMENSIONS.og.height,
    quality: IMAGE_QUALITY.og
  })
};

// Export all images as one object for easier access
export const IMAGES = {
  brand: brandImages,
  features: featureImages,
  hero: heroImages,
  guides: guideImages,
  tips: tipImages,
  testimonials: testimonialImages,
  og: ogImages
};
