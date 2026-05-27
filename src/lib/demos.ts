
/**
 * Demo Data - 3 Ready-to-Use Systems with Videos
 * أول 3 ديموهات جاهزة للإطلاق
 */

export interface Demo {
  id: string;
  slug: string;
  systemTitle: string;
  demoTitle: string;
  demoDescription: string;
  videoUrl: string; // YouTube embed URL
  videoDuration: '45s' | '90s' | string;
  problem: string;
  result: string;
  prompt: string;
  language: 'ar' | 'en';
  metrics: {
    label: string;
    value: string;
  }[];
  beforeAfter: {
    before: string;
    after: string;
  };
  steps: {
    title: string;
    description: string;
  }[];
  tools: string[];
  downloadFile?: {
    name: string;
    url: string;
    format: 'PDF' | 'DOC' | 'CSV' | 'JSON';
  };
  nextSystemSlug?: string;
  nextSystemTitle?: string;
}

export const demos: Demo[] = [
  {
    id: 'd1',
    slug: 'n8n-ai-agent',
    systemTitle: 'الموظف الرقمي الشامل (AI Agent)',
    demoTitle: 'بناء موظف خدمة عملاء ذكي بـ n8n',
    demoDescription: 'شاهد كيف نبني "وكيل ذكي" يستقبل طلبات العملاء من تيليجرام، يعالجها بذكاء، ويرد عليهم فوراً - بدون تدخل بشري.',
    // Video: Codezilla - "وظف جيشاً من الذكاء الاصطناعي مجانا! شرح N8N AI Agents"
    // Placeholder ID until confirmed
    videoUrl: 'https://www.youtube.com/embed/N8N_VIDEO_ID',
    videoDuration: '14:12',
    problem: 'خدمة العملاء تتطلب تواجداً دائماً، والرد على نفس الأسئلة المتكررة يستهلك وقت الفريق وموارده. التأخر في الرد يعني خسارة عملاء.',
    result: 'نظام آلي بالكامل يعمل 24/7، يفهم لغة العميل (حتى العامية)، ويرد بدقة وسرعة، ويحول الطلبات المعقدة للموظفين فقط.',
    prompt: `// هذا مثال لخطوات الـ Workflow في n8n وليس Prompt نصي
{
  "nodes": [
    {
      "name": "Telegram Trigger",
      "type": "n8n-nodes-base.telegramTrigger",
      "parameters": { "updates": ["message"] }
    },
    {
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": {
        "model": "gpt-4o",
        "systemMessage": "أنت موظف خدمة عملاء ودود لشركة 'ذكاء'. رد باختصار وباللهجة السعودية."
      }
    },
    {
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "append", "sheetId": "LEADS_DB" }
    }
  ]
}`,
    language: 'en', // Code/JSON is English-based
    metrics: [
      { label: 'زمن الرد', value: '3 ثوانٍ' },
      { label: 'التكلفة', value: '0$ (Self-hosted)' },
      { label: 'توفير الوقت', value: '90%' },
    ],
    beforeAfter: {
      before: 'فريق مرهق، ردود متأخرة، عملاء غاضبون',
      after: 'رد فوري 24/7، رضا عملاء عالي، تكلفة شبه معدومة',
    },
    steps: [
      {
        title: 'الخطوة 1: تثبيت n8n',
        description: 'قم بتثبيت n8n محلياً أو استخدم النسخة السحابية. ابدأ بإنشاء Workflow جديد فارغ.',
      },
      {
        title: 'الخطوة 2: إعداد Telegram Bot',
        description: 'تحدث مع @BotFather في تيليجرام لإنشاء بوت جديد والحصول على الـ API Token.',
      },
      {
        title: 'الخطوة 3: ربط الذكاء الاصطناعي',
        description: 'أضف عقدة (Node) الخاصة بـ OpenAI أو Anthropic. اربطها بمفتاح الـ API الخاص بك.',
      },
      {
        title: 'الخطوة 4: تصميم الذاكرة',
        description: 'أضف Window Buffer Memory ليتذكر البوت سياق المحادثة السابقة مع العميل.',
      },
      {
        title: 'الخطوة 5: الاختبار والنشر',
        description: 'جرب المحادثة مع البوت. إذا كان الرد ممتازاً، اضغط Activate ليعمل النظام بشكل دائم.',
      },
    ],
    tools: ['n8n', 'OpenAI', 'Telegram'],
    nextSystemSlug: 'comfyui-creative-studio',
    nextSystemTitle: 'استوديو الإبداع الآلي',
  },
  {
    id: 'd2',
    slug: 'comfyui-creative-studio',
    systemTitle: 'استوديو الإبداع الآلي (ComfyUI)',
    demoTitle: 'توليد صور بجودة سينمائية وتحكم كامل',
    demoDescription: 'انسَ القيود. تعلم كيف تصمم صوراً دقيقة جداً وتتحكم في أدق التفاصيل باستخدام ComfyUI، الأداة الأقوى للمحترفين.',
    // Video: Sherif Oneway - "اتعلم كومفى من الصفر للاحتراف الجزء الأول"
    videoUrl: 'https://www.youtube.com/embed/6vglLJeUUVQ',
    videoDuration: '24:00',
    problem: 'أدوات مثل Midjourney سهلة لكنها محدودة التحكم. لا يمكنك تعديل وضعية اليد أو الإضاءة بدقة، والاشتراكات الشهرية مكلفة.',
    result: 'تحكم لا نهائي (Infinite Control). عدّل الإضاءة، الوضعية، والملابس بدقة بكسل وبدون اشتراكات شهرية باهظة.',
    prompt: `(Positive Prompt):
masterpiece, best quality, ultra realistic, 8k, 
cinematic lighting, portrait of a young arab businessman, 
modern office in riyadh background, wearing traditional thobe, 
confident smile, depth of field, sharp focus, ray tracing

(Negative Prompt):
low quality, blurry, distorted face, bad hands, 
extra fingers, missing limbs, cartoon, illustration, 
text, watermark, lowres`,
    language: 'en',
    metrics: [
      { label: 'الدقة', value: '4K/8K' },
      { label: 'التكلفة/صورة', value: 'مجاني (Local)' },
      { label: 'مستوى التحكم', value: '100%' },
    ],
    beforeAfter: {
      before: 'صور عشوائية، "هذا ما أعطاني إياه البوت"، اشتراكات مكلفة',
      after: 'الصورة التي في خيالك بالضبط، وبأعلى جودة ممكنة',
    },
    steps: [
      {
        title: 'الخطوة 1: تثبيت ComfyUI',
        description: 'حمل النسخة المحمولة (Portable) من GitHub. فك الضغط وشغل run_nvidia_gpu.bat.',
      },
      {
        title: 'الخطوة 2: تحميل الموديل (Checkpoints)',
        description: 'حمل موديل قوي مثل Juggernaut XL أو RealVisXL وضعه في مجلد models/checkpoints.',
      },
      {
        title: 'الخطوة 3: بناء الـ Workflow',
        description: 'اربط العقد: Load Checkpoint -> CLIP Text Encode (Prompt) -> KSampler -> VAE Decode.',
      },
      {
        title: 'الخطوة 4: كتابة الوصف (Prompt)',
        description: 'اكتب وصفك بدقة في الـ Positive Prompt، وما لا تريده في الـ Negative Prompt.',
      },
      {
        title: 'الخطوة 5: توليد (Queue Prompt)',
        description: 'اضغط Queue وانتظر النتيجة. غير الـ Seed للحصول على نتائج مختلفة لنفس الوصف.',
      },
    ],
    tools: ['ComfyUI', 'Stable Diffusion', 'Python'],
    downloadFile: {
      name: 'basic_workflow.json',
      url: '/templates/comfyui-basic.json',
      format: 'JSON',
    },
    nextSystemSlug: 'gemini-data-analyst',
    nextSystemTitle: 'محلل البيانات العملاق',
  },
  {
    id: 'd3',
    slug: 'gemini-data-analyst',
    systemTitle: 'محلل البيانات العملاق (Gemini 1.5)',
    demoTitle: 'تحليل مليون كلمة في ثوانٍ مع Gemini',
    demoDescription: 'كيف تستفيد من "نافذة السياق" الضخمة في Gemini 1.5 لقراءة مكتبة كاملة من المستندات واستخراج رؤى استراتيجية.',
    // Video: Heba Ahmed - "شرح إستخدام نماذج Gemini 1.5 Pro"
    // Placeholder ID
    videoUrl: 'https://www.youtube.com/embed/GEMINI_VIDEO_ID',
    videoDuration: '12:30',
    problem: 'تحليل التقارير السنوية، العقود القانونية، أو قواعد البيانات الضخمة يستغرق أسابيع من العمل  البشري الشاق والمعرض للخطأ.',
    result: 'استخرج الإجابات، الملخصات، والملفات Excel من مئات المستندات في دقيقة واحدة وبدقة مذهلة.',
    prompt: `أنت محلل بيانات استراتيجي.
لقد قمت برفع 10 ملفات PDF تحتوي على تقارير الأداء المالي لـ 5 شركات منافسة في السوق السعودي لعام 2024.

المطلوب:
1. استخرج جدولاً يقارن "صافي الربح"، "المصاريف التشغيلية"، و"الحصة السوقية" لكل شركة.
2. حدد 3 توجهات (Trends) مشتركة ذكرت في جميع التقارير.
3. بناءً على البيانات، ما هي الشركة التي استثمرت أكثر في الذكاء الاصطناعي؟
4. لخص المخاطر المستقبلية التي توقعتها الشركات في قطاع التجزئة.

المخرجات:
- جدول Excel (CSV)
- تقرير ملخص من صفحة واحدة
- توصيات استراتيجية`,
    language: 'ar',
    metrics: [
      { label: 'سعة التحليل', value: '1M+ Tokens' },
      { label: 'الوقت المستغرق', value: '60 ثانية' },
      { label: 'الدقة', value: 'عالية جداً' },
    ],
    beforeAfter: {
      before: 'أسابيع من القراءة، ضياع التفاصيل، إرهاق ذهني',
      after: 'رؤية كاملة فورية، قرارات مبنية على بيانات دقيقة',
    },
    steps: [
      {
        title: 'الخطوة 1: الدخول لـ Google AI Studio',
        description: 'سجل دخولك بحساب جوجل. الواجهة مجانية وتمنحك وصولاً للموديلات الأحدث.',
      },
      {
        title: 'الخطوة 2: رفع الملفات',
        description: 'اضغط على زر (+) وارفع كل ملفاتك (PDF, CSV, Video, Audio).',
      },
      {
        title: 'الخطوة 3: اختيار الموديل',
        description: 'اختر Gemini 1.5 Pro من القائمة الجانبية (لأنه يدعم سياقاً أكبر).',
      },
      {
        title: 'الخطوة 4: كتابة الأمر (Prompt)',
        description: 'اكتب أمراً واضحاً ومحدداً كما في المثال. حدد شكل المخرجات بوضوح.',
      },
      {
        title: 'الخطوة 5: التصدير',
        description: 'انسخ النتيجة أو صدر الجدول مباشرة إلى Google Sheets بضغطة زر.',
      },
    ],
    tools: ['Google AI Studio', 'Gemini 1.5 Pro', 'Excel'],
    nextSystemSlug: 'n8n-ai-agent',
    nextSystemTitle: 'الموظف الرقمي الشامل',
  },
];
