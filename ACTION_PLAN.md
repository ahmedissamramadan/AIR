# 🚀 خطة التنفيذ - إصلاحات AIR

## المرحلة 1: الإصلاحات العاجلة (اليوم)

### ✅ 1. إصلاح SystemSnippet Component
**الحالة:** تم ✅
**الملف:** `src/components/ui/SystemSnippet.tsx`
- الكود الآن مخفي بشكل افتراضي
- تحسين UX مع animations

### 🔄 2. إضافة ARIA Labels
**المطلوب:**
```bash
# الملفات التي تحتاج تعديل:
- src/components/ui/Button.tsx
- src/components/ui/SystemSnippet.tsx  
- src/components/layout/Header.tsx
- src/components/layout/MobileMenu.tsx
```

**الكود المطلوب:**
```typescript
// Button.tsx
<button
  aria-label={ariaLabel || children}
  aria-pressed={pressed}
  aria-disabled={disabled}
>
```

### 🔄 3. تحسين OptimizedImage
**المطلوب:**
- مراجعة جميع الصور
- التأكد من وجود alt texts
- تحسين lazy loading

```typescript
// في كل استخدام للصور
<OptimizedImage
  src="..."
  alt="وصف واضح ومفيد"
  priority={isAboveFold}
/>
```

---

## المرحلة 2: تحسينات Performance (هذا الأسبوع)

### 📊 1. قياس الأداء الحالي
```bash
# تشغيل Lighthouse
npm run build
npm run start
# ثم في Chrome DevTools > Lighthouse > Generate Report
```

### ⚡ 2. تطبيق Code Splitting
**الملفات المستهدفة:**
```typescript
// في الصفحات الثقيلة
import dynamic from 'next/dynamic'

const DemoPageTemplate = dynamic(
  () => import('@/components/systems/DemoPageTemplate'),
  { loading: () => <div>جاري التحميل...</div> }
)

const CreatorsBrowser = dynamic(
  () => import('@/components/creators/CreatorsBrowser'),
  { ssr: false }
)
```

### 🖼️ 3. تحسين الصور
```bash
# استخدام أداة لضغط الصور
npm install -D sharp

# في next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
}
```

---

## المرحلة 3: SEO Enhancement (الأسبوع القادم)

### 🔍 1. إضافة Structured Data
**الملف:** `src/app/[locale]/layout.tsx`

```typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AIR - Arab Intelligence Repository",
  "url": "https://airrepository.com",
  "description": "مستودع شامل للأنظمة والأدوات في الذكاء الاصطناعي",
  "sameAs": [
    "https://twitter.com/air_repo",
    "https://linkedin.com/company/air-repo"
  ]
}
```

### 📄 2. تحسين Meta Tags
```typescript
// في كل page.tsx
export const metadata = {
  title: "العنوان",
  description: "الوصف (150-160 حرف)",
  keywords: ["ذكاء اصطناعي", "AI", "أتمتة"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://airrepository.com/path',
    languages: {
      'ar': '/ar/path',
      'en': '/en/path',
    },
  },
}
```

---

## المرحلة 4: Testing & Quality Assurance

### 🧪 1. إعداد Testing Environment
```bash
# تثبيت dependencies
npm install -D @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# إنشاء jest.config.js
npx jest --init
```

### ✅ 2. كتابة Unit Tests
```typescript
// __tests__/SystemSnippet.test.tsx
describe('SystemSnippet', () => {
  it('يبدأ مخفياً', () => {
    render(<SystemSnippet />)
    expect(screen.queryByRole('code')).not.toBeVisible()
  })
  
  it('يظهر عند الضغط', () => {
    render(<SystemSnippet />)
    fireEvent.click(screen.getByText('عرض الكود'))
    expect(screen.getByRole('code')).toBeVisible()
  })
})
```

---

## الأوامر السريعة

### Development
```bash
# تشغيل المشروع
npm run dev

# فحص TypeScript
npm run type-check

# فحص ESLint
npm run lint

# إصلاح ESLint تلقائياً
npm run lint:fix
```

### Production
```bash
# Build للإنتاج
npm run build

# تشغيل production build
npm run start

# تحليل bundle size
npm run analyze
```

### Testing
```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل مع coverage
npm run test:coverage

# تشغيل E2E tests
npm run test:e2e
```

---

## Checklist يومي

### قبل كل commit:
- [ ] npm run lint
- [ ] npm run type-check
- [ ] npm test (عندما تكون جاهزة)
- [ ] مراجعة console للـ errors
- [ ] اختبار في dark mode
- [ ] اختبار responsive design

### قبل كل deploy:
- [ ] npm run build بنجاح
- [ ] Lighthouse score > 90
- [ ] لا توجد accessibility errors
- [ ] اختبار على browsers مختلفة
- [ ] مراجعة SEO meta tags
- [ ] فحص broken links

---

## Resources مفيدة

### Documentation
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### Tools
- Lighthouse: Chrome DevTools
- axe DevTools: Browser Extension
- PageSpeed Insights: https://pagespeed.web.dev
- WebPageTest: https://www.webpagetest.org

### Testing
- Testing Library: https://testing-library.com
- Jest: https://jestjs.io
- Playwright: https://playwright.dev

---

**المرجع:** راجع `FIXES_AND_IMPROVEMENTS.md` للتفاصيل الكاملة
