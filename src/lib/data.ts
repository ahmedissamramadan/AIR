export type LocalizableString = string | { ar?: string; en?: string };

export function getLocalizedContent(content: LocalizableString | undefined | null, locale: string): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    const l = locale as 'ar' | 'en';
    return (content as any)[l] || (content as any).en || '';
}

export interface Author {
    name: LocalizableString;
    avatar: string;
    role: LocalizableString;
    bio?: LocalizableString;
    twitter?: string;
    linkedin?: string;
}

export interface BlogPost {
    slug: string;
    title: LocalizableString;
    excerpt: LocalizableString;
    content: LocalizableString;
    date: string;
    category: LocalizableString;
    readingTime: LocalizableString;
    image: string;
    author: Author;
    tags: string[];
    seo: {
        metaTitle: LocalizableString;
        metaDescription: LocalizableString;
        keywords: string[];
    };
    relatedSystem?: string; // Slug of the related system
    isSponsored?: boolean;
    sponsorName?: string;
    isPremium?: boolean;
}

export interface CourseModule {
    title: LocalizableString;
    lessons: {
        title: LocalizableString;
        duration: string;
        isFree?: boolean;
    }[];
}

export interface Course {
    id: string;
    slug: string;
    title: LocalizableString;
    description: LocalizableString;
    longDescription: LocalizableString;
    image: string;
    price: number | "Free";
    category: string;
    duration: string;
    level: string;
    instructor: Author;
    rating: number;
    students: number;
    modules: CourseModule[];
    learningOutcomes: LocalizableString[];
    requirements: LocalizableString[];
}

export interface ServicePackage {
    id: string;
    title: LocalizableString;
    price: string;
    description: LocalizableString;
    features: LocalizableString[];
    isPopular?: boolean;
}

export interface Tool {
    id: string;
    name: LocalizableString;
    slug: string;
    description: LocalizableString;
    content?: LocalizableString; // HTML content for the detailed article
    category: string;
    link: string;
    featured: boolean;
    image: string;
    bestFor?: LocalizableString[];
    notFor?: LocalizableString[];
    affiliateLink?: string;
    pricingType?: 'free' | 'paid' | 'freemium';
}

export interface Template {
    name: string;
    platform: 'Notion' | 'Trello' | 'Sheets' | 'Miro' | 'Other';
    url: string;
    language: 'ar' | 'en' | 'both';
}

export interface Lesson {
    title: string;
    duration: string;
    videoUrl?: string; // e.g., YouTube or Vimeo link
    exampleFiles?: {
        name: string;
        url: string;
    }[];
}

export interface Integration {
    name: string;
    type: 'Zapier' | 'n8n' | 'Webhook' | 'API';
    flowUrl?: string;
    description: string;
}

export interface System {
    id: string;
    slug: string;
    title: LocalizableString;
    subtitle: LocalizableString;
    description: LocalizableString;
    problem: LocalizableString;
    result: LocalizableString;
    steps: {
        title: LocalizableString;
        description: LocalizableString;
        tool?: string; // Slug of the tool used
    }[];
    stats: {
        label: LocalizableString;
        value: LocalizableString;
    }[];
    toolsUsed: string[]; // Slugs of tools
    image: string;
    // New fields for Phase 4
    valueIdentity?: {
        promise7Days: LocalizableString;
        roiIndicators: LocalizableString[];
        beforeAfter: {
            before: {
                title: LocalizableString;
                description: LocalizableString;
                stats?: { label: LocalizableString; value: LocalizableString }[];
            };
            after: {
                title: LocalizableString;
                description: LocalizableString;
                stats?: { label: LocalizableString; value: LocalizableString }[];
            };
        };
    };
    templates?: Template[];
    lessons?: Lesson[];
    integrations?: Integration[];
    filterMetadata?: {
        goal: 'writing' | 'management' | 'analysis' | 'automation';
        level: 'beginner' | 'intermediate' | 'advanced';
        expectedTime: LocalizableString;
    };
    socialProof?: {
        testimonials: {
            user: LocalizableString;
            role: LocalizableString;
            content: LocalizableString;
            avatar?: string;
        }[];
        caseStudies?: {
            title: LocalizableString;
            summary: LocalizableString;
            link: string;
        }[];
    };
}

export interface PaymentDetails {
    instaPay: string;
    vodafoneCash: string;
    fawryCode: string;
}

export const paymentDetails: PaymentDetails = {
    instaPay: "zakaa@instapay",
    vodafoneCash: "01012345678",
    fawryCode: "78912345"
};

export const authors: Record<string, Author> = {
    ahmed: {
        name: { ar: "أحمد عصام", en: "Ahmed Esam" },
        avatar: "/images/ahmed-esam.png",
        role: { ar: "مؤسس AIR.", en: "Founder of AIR." },
        bio: {
            ar: "رائد أعمال تقني مهتم بتبسيط الذكاء الاصطناعي للشركات الناشئة.",
            en: "Tech entrepreneur interested in simplifying AI for startups."
        },
        twitter: "ahmed_esam",
        linkedin: "ahmed-esam"
    },
    guest_expert: {
        name: { ar: "خبير زائر", en: "Guest Expert" },
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Expert",
        role: { ar: "مستشار أتمتة", en: "Automation Consultant" },
        bio: {
            ar: "خبير في أتمتة العمليات التجارية باستخدام أدوات الذكاء الاصطناعي.",
            en: "Expert in business process automation using AI tools."
        },
        twitter: "expert_ai",
        linkedin: "expert-ai"
    }
};

export interface GlossaryTerm {
    term: string;
    arabicTerm: string;
    definition: string;
    category: "عام" | "تقني" | "تطبيقات";
    example?: string; // مثال محلي عربي
    misconception?: string; // سوء فهم شائع
    source?: string; // مصدر أو مرجع
    relatedTools?: string[]; // أدوات ذات صلة
    relatedPosts?: string[]; // مقالات ذات صلة
}

export const glossaryTerms: GlossaryTerm[] = [
    // === المفاهيم الأساسية ===
    {
        term: "Artificial Intelligence (AI)",
        arabicTerm: "الذكاء الاصطناعي",
        definition: "أنظمة حاسوبية قادرة على أداء مهام تتطلب عادة ذكاءً بشرياً، مثل التعلم، الاستنتاج، وحل المشكلات.",
        category: "عام",
        example: "مساعد ذكي في متجر إلكتروني مصري يجيب على استفسارات العملاء تلقائياً.",
        misconception: "AI ليس 'عقلاً' يفكر مثل البشر، بل خوارزميات تتعلم من البيانات.",
        relatedTools: ["chatgpt", "gemini"]
    },
    {
        term: "Machine Learning (ML)",
        arabicTerm: "تعلم الآلة",
        definition: "فرع من الذكاء الاصطناعي يركز على بناء أنظمة يمكنها التعلم من البيانات وتحسين أدائها دون برمجة صريحة لكل قاعدة.",
        category: "تقني"
    },
    {
        term: "Deep Learning",
        arabicTerm: "التعلم العميق",
        definition: "فرع متقدم من تعلم الآلة يستخدم شبكات عصبية متعددة الطبقات لتحليل البيانات المعقدة مثل الصور والصوت.",
        category: "تقني"
    },
    {
        term: "Generative AI",
        arabicTerm: "الذكاء الاصطناعي التوليدي",
        definition: "نوع من الذكاء الاصطناعي قادر على إنشاء محتوى جديد (نصوص، صور، فيديو) بناءً على الأنماط التي تعلمها.",
        category: "عام"
    },
    {
        term: "AGI (Artificial General Intelligence)",
        arabicTerm: "الذكاء الاصطناعي العام",
        definition: "ذكاء اصطناعي افتراضي قادر على أداء أي مهمة فكرية يمكن للإنسان القيام بها. لم يتحقق بعد.",
        category: "عام"
    },

    // === النماذج اللغوية ===
    {
        term: "Large Language Model (LLM)",
        arabicTerm: "النماذج اللغوية الكبيرة",
        definition: "نظام ذكاء اصطناعي مدرب على كميات هائلة من النصوص لفهم اللغة البشرية وتوليدها (مثل ChatGPT, Claude).",
        category: "تقني",
        example: "استخدام LLM لكتابة وصف منتجات بالعربية لمتجر إلكتروني.",
        misconception: "LLM لا 'يفهم' المعنى حقاً، بل يتنبأ بالكلمة التالية احتمالياً.",
        relatedTools: ["chatgpt", "claude", "gemini"]
    },
    {
        term: "Transformer",
        arabicTerm: "المحوّل",
        definition: "بنية الشبكة العصبية الثورية التي تقف وراء جميع النماذج اللغوية الحديثة. تم تقديمها في ورقة 'Attention is All You Need' عام 2017.",
        category: "تقني",
        source: "Vaswani et al., 'Attention Is All You Need', NeurIPS 2017",
        misconception: "ليس روبوتاً متحولاً! اسمه يأتي من آلية تحويل البيانات داخل النموذج."
    },
    {
        term: "GPT (Generative Pre-trained Transformer)",
        arabicTerm: "المحوّل التوليدي المُدرَّب مسبقاً",
        definition: "عائلة نماذج لغوية من OpenAI تشمل GPT-3.5 و GPT‑4، وهي الأساس الذي بُني عليه ChatGPT.",
        category: "تقني"
    },
    {
        term: "Token",
        arabicTerm: "الرمز (Token)",
        definition: "وحدة القياس الأساسية للنصوص في النماذج اللغوية. يتم تقسيم النص وفق خوارزميات مثل Byte-Pair Encoding (BPE)، وقد تمثل كلمة كاملة أو جزءاً منها أو حتى عدة كلمات.",
        category: "تقني",
        example: "كلمة 'الاستراتيجية' قد تُقسَّم إلى 3-4 tokens حسب النموذج.",
        misconception: "Token ≠ كلمة. الكلمات الطويلة أو غير الشائعة تُقسَّم لعدة tokens."
    },
    {
        term: "Context Window",
        arabicTerm: "نافذة السياق",
        definition: "كمية المعلومات (بالـ Tokens) التي يمكن للنموذج تذكرها ومعالجتها في المحادثة الواحدة. تختلف حسب النموذج والإصدار (تتراوح من آلاف إلى مئات الآلاف).",
        category: "تقني"
    },

    // === مفاهيم التدريب ===
    {
        term: "Training Data",
        arabicTerm: "بيانات التدريب",
        definition: "مجموعة البيانات الضخمة (نصوص، صور، إلخ) المستخدمة لتعليم نموذج الذكاء الاصطناعي الأنماط والمعرفة.",
        category: "تقني"
    },
    {
        term: "Fine-tuning",
        arabicTerm: "الضبط الدقيق",
        definition: "عملية تدريب نموذج ذكاء اصطناعي مدرب مسبقاً على مجموعة بيانات محددة لتحسين أدائه في مهمة أو مجال معين.",
        category: "تقني",
        example: "ضبط GPT على بيانات طبية مصرية ليصبح متخصصاً في الاستشارات الطبية.",
        misconception: "Fine-tuning ليس 'برمجة' النموذج، بل تدريب إضافي على بياناتك."
    },
    {
        term: "RLHF (Reinforcement Learning from Human Feedback)",
        arabicTerm: "التعلم المعزز من التغذية الراجعة البشرية",
        definition: "تقنية لتحسين النماذج اللغوية عبر تدريبها على تفضيلات المراجعين البشريين لجعل الردود أكثر فائدة وأماناً.",
        category: "تقني",
        example: "ChatGPT يستخدم RLHF لتعلم الردود المفضلة لدى المستخدمين.",
        source: "InstructGPT paper, OpenAI 2022"
    },
    {
        term: "Pre-training",
        arabicTerm: "التدريب المسبق",
        definition: "المرحلة الأولى من تدريب النماذج حيث تتعلم من كميات هائلة من البيانات العامة قبل التخصص.",
        category: "تقني"
    },

    // === الشبكات العصبية ===
    {
        term: "Neural Network",
        arabicTerm: "الشبكة العصبية",
        definition: "نظام حوسبة مستوحى من طريقة عمل الدماغ البشري، يتكون من طبقات من العقد (Neurons) لمعالجة المعلومات.",
        category: "تقني"
    },
    {
        term: "Parameters",
        arabicTerm: "المعاملات",
        definition: "الأوزان القابلة للتعديل داخل الشبكة العصبية التي تحدد سلوكها. عدد المعاملات في النماذج الكبيرة يقاس بالمليارات (عدد معاملات GPT‑4 غير مُعلن رسمياً).",
        category: "تقني"
    },
    {
        term: "Weights",
        arabicTerm: "الأوزان",
        definition: "القيم الرقمية التي تتعلمها الشبكة العصبية وتحدد قوة الاتصال بين العقد.",
        category: "تقني"
    },

    // === توليد الصور ===
    {
        term: "Diffusion Model",
        arabicTerm: "نموذج الانتشار",
        definition: "تقنية تستخدم في توليد الصور (مثل Midjourney, DALL-E)، تعمل عن طريق تحويل الضوضاء العشوائية تدريجياً إلى صورة واضحة.",
        category: "تقني",
        example: "Stable Diffusion يبدأ من ضوضاء عشوائية وينقيها خطوة بخطوة حتى تظهر الصورة.",
        relatedTools: ["midjourney", "stable-diffusion", "dalle"]
    },
    {
        term: "Latent Space",
        arabicTerm: "الثضاء الكامن",
        definition: "تمثيل رياضي مضغوط للبيانات. في توليد الصور، هو المكان الذي 'يفهم' فيه النموذج مفاهيم مثل 'قطة' أو 'لون أحمر' كأرقام.",
        category: "تقني",
        misconception: "لا يحتوي على صور حقيقية، بل 'وصفات' رياضية لإنشاء الصور."
    },
    {
        term: "Text-to-Image",
        arabicTerm: "تحويل النص إلى صورة",
        definition: "تقنية تولد صوراً بناءً على وصف نصي. أمثلة: Midjourney، DALL-E 3، Stable Diffusion.",
        category: "تطبيقات",
        example: "اكتب 'قطة تقرأ كتاباً في مقهى مصري' واحصل على صورة فريدة.",
        relatedTools: ["midjourney", "dalle", "stable-diffusion"]
    },
    {
        term: "Image-to-Image",
        arabicTerm: "تحويل الصورة إلى صورة",
        definition: "تقنية تعدل صورة موجودة بناءً على تعليمات نصية، مثل تغيير الأسلوب الفني أو إضافة عناصر.",
        category: "تطبيقات"
    },
    {
        term: "Inpainting",
        arabicTerm: "الرسم الداخلي",
        definition: "تقنية لملء أو تعديل أجزاء محددة من صورة مع الحفاظ على باقي الصورة.",
        category: "تطبيقات"
    },

    // === التطبيقات والاستخدام ===
    {
        term: "Prompt",
        arabicTerm: "الأمر / الموجه",
        definition: "النص أو التعليمات التي تقدمها لنموذج الذكاء الاصطناعي للحصول على نتيجة معينة.",
        category: "تطبيقات"
    },
    {
        term: "Prompt Engineering",
        arabicTerm: "هندسة الأوامر",
        definition: "فن صياغة المدخلات (الأوامر) للنماذج اللغوية للحصول على أفضل وأدق النتائج الممكنة. مهارة مطلوبة جداً.",
        category: "تطبيقات",
        example: "بدلاً من 'اكتب لي إيميل' → 'تصرف كمدير تسويق. اكتب إيميل رسمي لعميل مصري يشكره على التعاون.'",
        misconception: "ليست مهارة برمجة! يمكن لأي شخص تعلمها بالممارسة.",
        relatedPosts: ["ai-beginners-guide"]
    },
    {
        term: "Zero-shot Learning",
        arabicTerm: "التعلم بدون أمثلة",
        definition: "قدرة النموذج على أداء مهمة جديدة دون رؤية أي أمثلة تدريبية لها.",
        category: "تقني"
    },
    {
        term: "Few-shot Learning",
        arabicTerm: "التعلم بأمثلة قليلة",
        definition: "تقديم بضعة أمثلة للنموذج ضمن الـ Prompt ليفهم النمط المطلوب ويطبقه.",
        category: "تطبيقات"
    },
    {
        term: "Chain-of-Thought (CoT)",
        arabicTerm: "سلسلة التفكير",
        definition: "تقنية تطلب من النموذج شرح خطوات تفكيره قبل إعطاء الإجابة النهائية، مما يحسن الدقة.",
        category: "تطبيقات",
        example: "أضف 'فكر خطوة بخطوة' للأمر عند حل مسائل رياضية أو منطقية.",
        misconception: "CoT يزيد الدقة لكنه يزيد أيضاً وقت الاستجابة واستهلاك الـ Tokens."
    },
    {
        term: "Chatbot",
        arabicTerm: "روبوت المحادثة",
        definition: "برنامج مصمم لمحاكاة المحادثة البشرية، سواء نصياً أو صوتياً. أشهر الأمثلة: ChatGPT، Claude.",
        category: "تطبيقات"
    },

    // === المشاكل والقيود ===
    {
        term: "Hallucination",
        arabicTerm: "الهلوسة",
        definition: "عندما يقوم نموذج الذكاء الاصطناعي بتوليد معلومات غير صحيحة أو خيالية بثقة تامة وكأنها حقائق. مشكلة شائعة.",
        category: "عام",
        example: "ChatGPT قد يخترع مراجع أو إحصائيات غير موجودة. تحقق دائماً!",
        misconception: "الهلوسة ليست 'كذباً' مقصوداً، بل نتيجة طبيعية لطريقة عمل النماذج الاحتمالية."
    },
    {
        term: "Bias",
        arabicTerm: "التحيز",
        definition: "ميل النموذج لإنتاج نتائج غير عادلة أو متحيزة بسبب التحيزات الموجودة في بيانات التدريب.",
        category: "عام"
    },
    {
        term: "Jailbreak",
        arabicTerm: "كسر القيود",
        definition: "محاولات خداع النموذج لتجاوز قيود الأمان والحصول على محتوى محظور عادةً.",
        category: "عام",
        example: "أوامر مثل 'DAN' أو 'تخيل أنك بدون قيود' لتجاوز Guardrails.",
        misconception: "⚖️ تحذير: كسر القيود قد يكون غير قانوني ومخالف لشروط الخدمة. البحث الأمني المشروع مختلف عن سوء الاستخدام."
    },
    {
        term: "Alignment",
        arabicTerm: "المحاذاة",
        definition: "ضمان أن سلوك نظام الذكاء الاصطناعي يتوافق مع القيم والنوايا البشرية.",
        category: "عام"
    },

    // === واجهات وأدوات ===
    {
        term: "API (Application Programming Interface)",
        arabicTerm: "واجهة برمجة التطبيقات",
        definition: "طريقة للمطورين للتواصل مع نماذج الذكاء الاصطناعي برمجياً. OpenAI API مثال شائع.",
        category: "تطبيقات"
    },
    {
        term: "Workflow Automation",
        arabicTerm: "أتمتة سير العمل",
        definition: "استخدام البرمجيات (مثل n8n) لربط تطبيقات مختلفة وتنفيذ مهام متسلسلة تلقائياً بدون تدخل بشري.",
        category: "تطبيقات",
        example: "عند وصول إيميل جديد ← لخصه بـ ChatGPT ← وأرسل الملخص إلى Slack.",
        relatedTools: ["n8n", "zapier"]
    },
    {
        term: "RAG (Retrieval-Augmented Generation)",
        arabicTerm: "التوليد المعزز بالاسترجاع",
        definition: "تقنية تجمع بين البحث في قاعدة بيانات والتوليد النصي، مما يجعل الردود أكثر دقة وحداثة.",
        category: "تقني"
    },
    {
        term: "Embedding",
        arabicTerm: "التضمين",
        definition: "تحويل النصوص إلى أرقام (متجهات) يمكن للحاسوب فهمها ومقارنتها. أساس البحث الدلالي.",
        category: "تقني"
    },
    {
        term: "Vector Database",
        arabicTerm: "قاعدة البيانات المتجهة",
        definition: "قاعدة بيانات متخصصة في تخزين والبحث في الـ Embeddings بسرعة فائقة.",
        category: "تقني"
    },

    // === الوسائط المتعددة ===
    {
        term: "Multimodal AI",
        arabicTerm: "الذكاء الاصطناعي متعدد الوسائط",
        definition: "نماذج تفهم وتعالج أنواعاً متعددة من البيانات (نص، صور، صوت، فيديو) معاً. مثال: GPT‑4V.",
        category: "عام"
    },
    {
        term: "Text-to-Speech (TTS)",
        arabicTerm: "تحويل النص إلى كلام",
        definition: "تقنية تحول النص المكتوب إلى صوت بشري طبيعي.",
        category: "تطبيقات"
    },
    {
        term: "Speech-to-Text (STT)",
        arabicTerm: "تحويل الكلام إلى نص",
        definition: "تقنية تحول الكلام المنطوق إلى نص مكتوب. مثال: Whisper من OpenAI.",
        category: "تطبيقات"
    },
    {
        term: "Text-to-Video",
        arabicTerm: "تحويل النص إلى فيديو",
        definition: "تقنية ناشئة تولد مقاطع فيديو من وصف نصي. أمثلة: Sora، Runway.",
        category: "تطبيقات"
    },

    // === مفاهيم متقدمة ===
    {
        term: "Attention Mechanism",
        arabicTerm: "آلية الانتباه",
        definition: "تقنية تسمح للنموذج بالتركيز على الأجزاء الأكثر أهمية من المدخلات. أساس نجاح المحولات.",
        category: "تقني"
    },
    {
        term: "Temperature",
        arabicTerm: "درجة الحرارة",
        definition: "معامل يتحكم في إبداعية/عشوائية ردود النموذج. قيمة منخفضة = ردود ثابتة، قيمة عالية = ردود متنوعة.",
        category: "تطبيقات"
    },
    {
        term: "Top-p (Nucleus Sampling)",
        arabicTerm: "أخذ العينات النواة",
        definition: "تقنية للتحكم في تنوع الردود عبر تحديد نسبة الاحتمالات التي يُختار منها الرد.",
        category: "تقني"
    },
    {
        term: "Inference",
        arabicTerm: "الاستدلال",
        definition: "عملية استخدام النموذج المدرب لتوليد تنبؤات أو ردود على مدخلات جديدة.",
        category: "تقني"
    },
    {
        term: "Latency",
        arabicTerm: "زمن الاستجابة",
        definition: "الوقت بين إرسال الطلب واستلام أول جزء من الرد. مهم في التطبيقات التفاعلية.",
        category: "تقني"
    },

    // === الأخلاقيات والسلامة ===
    {
        term: "AI Safety",
        arabicTerm: "سلامة الذكاء الاصطناعي",
        definition: "مجال بحثي يركز على ضمان أن أنظمة الذكاء الاصطناعي آمنة ومفيدة للبشرية.",
        category: "عام"
    },
    {
        term: "Guardrails",
        arabicTerm: "حواجز الأمان",
        definition: "قيود وضوابط مبرمجة لمنع النموذج من إنتاج محتوى ضار أو غير مناسب.",
        category: "عام"
    },
    {
        term: "Content Moderation",
        arabicTerm: "الإشراف على المحتوى",
        definition: "استخدام الذكاء الاصطناعي لاكتشاف وفلترة المحتوى الضار أو غير المناسب.",
        category: "تطبيقات"
    },

    // === أنواع خاصة ===
    {
        term: "Computer Vision",
        arabicTerm: "الرؤية الحاسوبية",
        definition: "فرع من الذكاء الاصطناعي يمكّن الحواسيب من 'رؤية' وفهم محتوى الصور والفيديو.",
        category: "تقني"
    },
    {
        term: "NLP (Natural Language Processing)",
        arabicTerm: "معالجة اللغة الطبيعية",
        definition: "فرع من الذكاء الاصطناعي يركز على فهم وتوليد اللغة البشرية.",
        category: "تقني"
    },
    {
        term: "Autonomous Agents",
        arabicTerm: "الوكلاء المستقلون",
        definition: "أنظمة ذكاء اصطناعي قادرة على اتخاذ قرارات وتنفيذ مهام معقدة بشكل مستقل. مثال: AutoGPT.",
        category: "تطبيقات"
    }
];

export const posts: BlogPost[] = [
    {
        slug: "اخطاء-chatgpt-وحلولها",
        title: {
            ar: "كيف يهدر ChatGPT وقتك إذا استخدمته بشكل خاطئ (والحل)",
            en: "How ChatGPT Wastes Your Time If You Use It Wrong (And the Solution)"
        },
        excerpt: {
            ar: "دليل عملي لتجنب الأخطاء الشائعة عند استخدام ChatGPT وكيفية الحصول على أفضل النتائج.",
            en: "A practical guide to avoiding common ChatGPT mistakes and getting the best results."
        },
        content: {
            ar: `
                <hr />
                <h2>الخطوة 1: تجهيز "السياق" (The Context)</h2>
                <p>أكبر خطأ يرتكبه المبتدئون هو الدخول مباشرة في الطلب: "اكتب لي خطة تسويق". النتيجة ستكون كلاماً عاماً لا قيمة له. السر يكمن في تغذية الشات جي بي تي بالمعلومات الصحيحة أولاً.</p>
                <p><strong>استخدم هذا الهيكل في أول رسالة (Prompt):</strong></p>
                <ul>
                    <li><strong>الدور:</strong> تصرف كأنك خبير تسويق رقمي بخبرة 10 سنوات.</li>
                    <li><strong>المنتج:</strong> نحن [اسم الشركة] نبيع [المنتج/الخدمة] لـ [الجمهور المستهدف].</li>
                    <li><strong>الميزة التنافسية:</strong> ما يميزنا هو [نقاط القوة].</li>
                    <li><strong>الهدف:</strong> نريد زيادة المبيعات بنسبة 20% خلال 3 أشهر.</li>
                </ul>
                
                <hr />
                
                <h2>الخطوة 2: تحليل الجمهور المستهدف (Persona)</h2>
                <p>اطلب من ChatGPT أن يرسم لك صورة دقيقة لعميلك المثالي. هذا سيساعدك لاحقاً في صياغة الرسائل الإعلانية.</p>
                <p><strong>جرب هذا الأمر:</strong></p>
                <blockquote>"بناءً على المعلومات السابقة، قم بإنشاء 3 شخصيات للمشتري (Buyer Personas) بالتفصيل، تتضمن: الآلام، الطموحات، المنصات التي يتواجدون عليها، والعوائق التي تمنعهم من الشراء."</blockquote>
                
                <hr />
                
                <h2>الخطوة 3: استراتيجية المحتوى (Content Strategy)</h2>
                <p>الآن، دعنا نطلب جدول محتوى. لا تطلب "أفكار لمنشورات"، بل اطلب "خطة محتوى".</p>
                <p><strong>الأمر المقترح:</strong></p>
                <blockquote>"قم بإنشاء جدول محتوى لمدة 4 أسابيع لمنصتي LinkedIn و Instagram. يجب أن يركز الأسبوع الأول على الوعي (Awareness)، والثاني على التفاعل (Engagement)، والثالث على البيع (Conversion). أعطني العناوين ونوع المحتوى (فيديو/صورة)."</blockquote>
                
                <hr />
                
                <h2>الخطوة 4: كتابة نصوص الإعلانات (Copywriting)</h2>
                <p>يمكن لـ ChatGPT كتابة نصوص إعلانية مقنعة باستخدام أطر عمل تسويقية مثبتة مثل AIDA أو PAS.</p>
                <p><strong>الأمر المقترح:</strong></p>
                <blockquote>"اكتب لي نص إعلان فيسبوك يستهدف الشخصية الأولى التي حددناها سابقاً. استخدم إطار العمل (Problem-Agitation-Solution). ركز على الألم الذي يعانون منه وقدم منتجنا كحل سحري."</blockquote>
                
                <hr />
                
                <h2>الخطوة 5: التحسين والمراجعة</h2>
                <p>لا تأخذ المخرجات كأنها مسلمات. أنت المدير، و ChatGPT هو المساعد. راجع النبرة، وتأكد من دقة المعلومات، وأضف روح علامتك التجارية.</p>
                
                <hr />
                
                <h2>الخاتمة</h2>
                <p>استخدام ChatGPT في التسويق ليس غشاً، بل هو ذكاء في استغلال الموارد. ما كان يأخذ فريقاً كاملاً أسبوعاً لإنجازه، يمكنك الآن عمل مسودة أولية ممتازة له في جلسة واحدة. تذكر دائماً: الأداة قوية بقدر ذكاء المستخدم الذي يديرها.</p>
            `,
            en: `
                <hr />
                <h2>Step 1: Preparing "Context"</h2>
                <p>The biggest mistake beginners make is jumping straight into the request: "Write me a marketing plan". The result will be generic talk with no value. The secret lies in feeding ChatGPT the right information first.</p>
                <p><strong>Use this structure in the first message (Prompt):</strong></p>
                <ul>
                    <li><strong>Role:</strong> Act as a digital marketing expert with 10 years of experience.</li>
                    <li><strong>Product:</strong> We are [Company Name] selling [Product/Service] to [Target Audience].</li>
                    <li><strong>Competitive Advantage:</strong> What sets us apart is [Strengths].</li>
                    <li><strong>Goal:</strong> We want to increase sales by 20% in 3 months.</li>
                </ul>
                
                <hr />
                
                <h2>Step 2: Target Audience Analysis (Persona)</h2>
                <p>Ask ChatGPT to draw a precise picture of your ideal customer. This will help you later in crafting advertising messages.</p>
                <p><strong>Try this command:</strong></p>
                <blockquote>"Based on the previous information, create 3 detailed Buyer Personas, including: pains, ambitions, platforms they are on, and barriers preventing them from buying."</blockquote>
                
                <hr />
                
                <h2>Step 3: Content Strategy</h2>
                <p>Now, let's ask for a content schedule. Don't ask for "post ideas", but ask for a "content plan".</p>
                <p><strong>Suggested command:</strong></p>
                <blockquote>"Create a 4-week content schedule for LinkedIn and Instagram. The first week should focus on Awareness, the second on Engagement, and the third on Conversion. Give me titles and content types (video/image)."</blockquote>
                
                <hr />
                
                <h2>Step 4: Copywriting</h2>
                <p>ChatGPT can write compelling ad copy using proven marketing frameworks like AIDA or PAS.</p>
                <p><strong>Suggested command:</strong></p>
                <blockquote>"Write me a Facebook ad copy targeting the first persona we identified earlier. Use the Problem-Agitation-Solution (PAS) framework. Focus on the pain they suffer from and offer our product as a magic solution."</blockquote>
                
                <hr />
                
                <h2>Step 5: Refinement and Review</h2>
                <p>Don't take outputs as given. You are the manager, and ChatGPT is the assistant. Review the tone, ensure information accuracy, and add your brand's soul.</p>
                
                <hr />
                
                <h2>Conclusion</h2>
                <p>Using ChatGPT in marketing is not cheating, but intelligence in resource utilization. What used to take an entire team a week to finish, you can now do an excellent initial draft for in one session. Always remember: the tool is only as powerful as the intelligence of the user managing it.</p>
            `
        },
        date: "2025-05-15",
        category: { ar: "ذكاء اصطناعي", en: "AI" },
        readingTime: { ar: "5 دقائق", en: "5 min" },
        image: "/images/blog/marketing.png",
        author: authors.ahmed,
        tags: ["ChatGPT", "تسويق", "استراتيجية"],
        seo: {
            metaTitle: {
                ar: "خطة تسويقية باستخدام ChatGPT | ذكاء.",
                en: "Marketing Plan Using ChatGPT | Zakaa."
            },
            metaDescription: {
                ar: "تعلم كيف تكتب خطة تسويقية احترافية باستخدام ChatGPT في خطوات بسيطة.",
                en: "Learn how to write a professional marketing plan using ChatGPT in simple steps."
            },
            keywords: ["ChatGPT", "تسويق", "ذكاء اصطناعي", "خطة عمل"]
        },
        relatedSystem: "نظام-إعادة-استغلال-المحتوى",
        isSponsored: false
    },
    {
        slug: "ادوات-الإنتاجية-2025",
        title: { ar: "أفضل 5 أدوات لتنظيم الوقت لرواد الأعمال في 2025" },
        excerpt: { ar: "مقارنة شاملة بين Notion و Trello و ClickUp مع نصائح لاختيار الأداة المناسبة لفريق عملك." },
        content: {
            ar: `
    <img src = "/images/blog/productivity.png" alt = "Productivity Tools Cover" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    <h2>لماذا أدوات الإنتاجية ليست رفاهية؟</h2>
    <p> في عام 2025، المنافسة لم تعد من يعمل بجد أكثر، بل من يعمل بذكاء أكثر...</p>

    <div style="background: rgba(239, 68, 68, 0.1); border-right: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #ef4444; display: block; margin-bottom: 0.5rem;" >⚠️ تحذير: </strong>
                لا تقع في فخ "تعدد الأدوات". استخدام 3 أدوات جزئية أفضل من استخدام أداة واحدة معقدة لا يفهمها فريقك.
            </div>

    <hr />

    <h2>1. Notion: نظام التشغيل الشامل </h2>
    <p> <strong>الأفضل لـ: </strong> بناء "دماغ ثاني" وتوثيق العمليات.</p>
    <p>Notion ليس مجرد قائمة مهام. إنه مساحة فارغة يمكنك تحويلها لأي شيء: موقع ويب، قاعدة بيانات عملاء(CRM)، أو لوحة إدارة مشاريع. ميزته القاتلة هي المرونة المطلقة.</p>
    <ul>
    <li><strong>الميزة: </strong> يجمع المستندات والمهام في مكان واحد.</li>
    <li><strong>العيب: </strong> يحتاج وقتاً للتعلم والإعداد (Learning Curve).</li>
    </ul>

    <hr />

    <h2>2. ClickUp: التطبيق الذي يحل محلهم جميعاً </h2>
    <p> <strong>الأفضل لـ: </strong> الفرق الكبيرة والمشاريع المعقدة.</p>
    <p>شعارهم "One app to replace them all" ليس مبالغة. يحتوي ClickUp على كل ميزة قد تتخيلها: تتبع وقت، دردشة، مستندات، ولوحات كانبان.</p>
    <ul>
    <li><strong>الميزة: </strong> تخصيص عالي جداً لكل جزئية.</li>
    <li><strong>العيب: </strong> قد يكون مزدحماً ومشتتاً للمبتدئين.</li>
    </ul>

    <hr />

    <h2>3. Trello: البساطة والوضوح </h2>
    <p> <strong>الأفضل لـ: </strong> البداية السريعة والمشاريع البسيطة.</p>
    <p>إذا كنت تحب نظام البطاقات(Kanban) ولا تريد تعقيداً، فتريلو هو الخيار الأمثل. بصري جداً وسهل الفهم لأي شخص من النظرة الأولى.</p>

    <hr />

    <h2>4. Todoist: لمهامك الشخصية </h2>
    <p> <strong>الأفضل لـ: </strong> التخطيط اليومي السريع.</p>
    <p>أحياناً تحتاج فقط لقائمة مهام سريعة وذكية. Todoist يتميز بخاصية "فهم اللغة الطبيعية". يمكنك كتابة: "اجتماع كل يوم اثنين الساعة 10"، وسيفهمها ويجدولها فوراً.</p>

    <hr />

    <h2>5. Google Calendar: الملك غير المتوج </h2>
    <p> قد تستغرب وجوده هنا، لكن "Time Blocking"(حجز أوقات للمهام على التقويم) هو أقوى تقنية إنتاجية. إذا لم تكن المهمة على التقويم، فهي لن تنجز.</p>

    <hr />

    <h2>كيف تختار الأداة المناسبة؟</h2>
    <p> لا تقع في فخ "تجربة كل الأدوات". اسأل نفسك: </p>
    <ol>
    <li>هل أعمل وحدي أم مع فريق؟ (وحدك: Notion/Todoist، فريق: ClickUp/Asana).</li>
    <li> هل أحب الحرية أم الهيكلة؟ (حرية: Notion، هيكلة: Trello).</li>
    </ol>

    <h2> الخلاصة </h2>
    <p> الأداة الأفضل هي الأداة التي تستخدمها بالفعل. ابدأ بأداة واحدة، التزم بها لمدة شهر، ثم قيم فعاليتها.</p>
        `
        },
        date: "2025-05-12",
        category: { ar: "إنتاجية" },
        readingTime: { ar: "7 دقائق" },
        image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=800&auto=format&fit=crop",
        author: authors.ahmed,
        tags: ["أدوات", "إنتاجية", "خطط 2025"],
        isPremium: true,
        isSponsored: true,
        sponsorName: "Notion",
        seo: {
            metaTitle: { ar: "أفضل أدوات الإنتاجية 2025 | ذكاء." },
            metaDescription: { ar: "مقارنة بين أفضل أدوات تنظيم الوقت لرواد الأعمال: Notion vs ClickUp." },
            keywords: ["إنتاجية", "Notion", "ClickUp", "تنظيم الوقت"]
        },
        relatedSystem: "نظام-توفير-10-ساعات"
    },
    {
        slug: "تحديثات-gemini-ديسمبر-2024",
        title: { ar: "تحديثات Google Gemini الجديدة: ما الذي تغير؟" },
        excerpt: { ar: "نظرة سريعة على المميزات الجديدة في نموذج Gemini 1.5 Pro وكيف يمكنك الاستفادة منها في تحليل البيانات." },
        content: {
            ar: `
    <img src = "/images/blog/gemini.png" alt = "Gemini Updates Cover" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    <h2>عصر جديد من نماذج جوجل </h2>
    <p> أعلنت Google مؤخراً عن تحديثات ضخمة لنموذجها الرائد Gemini...</p>

    <div style="background: rgba(59, 130, 246, 0.1); border-right: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem;" >📊 إحصائية مهمة: </strong>
                نافذة السياق بحجم ١ مليون رمز (توكن) تعادل حوالي 750,000 كلمة، أو ساعة كاملة من الفيديو، أو 11 ساعة من الصوت!
    </div>

    <hr />

    <h2>1. نافذة السياق المليونية(1 Million Token Context Window) </h2>
    <p> هذا هو الخبر الأهم. يمكن لـ Gemini الآن استيعاب ما يصل إلى ** مليون رمز ** (Token) في الأمر الواحد. ماذا يعني هذا بلغة البشر؟</p>
    <ul>
    <li>يمكنك رفع ** كتاب كامل ** من 500 صفحة وسؤاله عن تفاصيل دقيقة فيه.</li>
    <li> يمكنك رفع ** قاعدة كود برمجية ** لمشروع كامل ليقوم بتحليلها.</li>
    <li> يمكنك رفع ** فيديو مدته ساعة ** وطلب استخراج معلومات معينة منه.</li>
    </ul>
    <p> هذه الميزة تتفوق بمراحل على المنافسين(حتى GPT‑4 Turbo) وتفتح آفاقاً جديدة للبحث والتحليل.</p>

    <hr />

    <h2>2. التكامل العميق مع خدمات Google(Workspace) </h2>
    <p> Gemini ليس معزولاً. إنه الآن يعيش داخل بريدك(Gmail) ومستنداتك(Docs). يمكنك أن تقول له: </p>
    <blockquote> "لخص لي جميع الإيميلات التي وصلتني من شركة X الأسبوع الماضي واستخرج المواعيد واحفظها في Google Sheets." </blockquote>
    <p> هذا الربط يجعل منه مساعداً شخصياً حقيقياً وليس مجرد روبوت دردشة.</p>

    <hr />

    <h2>3. التفوق في البرمجة والرياضيات </h2>
    <p> أظهرت الاختبارات الجديدة تفوق Gemini 1.5 Pro في حل المسائل الرياضية المعقدة وفهم المنطق البرمجي، مما يجعله منافساً شرساً لـ Claude 3 Opus و GPT‑4. </p>

    <hr />

    <h2>كيف تستفيد منه اليوم؟</h2>
    <p> إذا كنت باحثاً، أو مبرمجاً، أو شخصاً يتعامل مع ملفات ضخمة(تقارير PDF)، فـ Gemini 1.5 Pro هو أداتك المثالية. لم تعد مضطراً لتقسيم ملفاتك لأجزاء صغيرة ليقرأها الذكاء الاصطناعي.</p>

    <h2> الخلاصة </h2>
    <p> جوجل عادت للمنافسة بقوة. حرب الذكاء الاصطناعي تشتعل، والمستفيد الأكبر هو نحن المستخدمين. جرب Gemini Advanced اليوم واستكشف قوة المليون توكن.</p>
        `
        },
        date: "2025-05-10",
        category: { ar: "أخبار" },
        readingTime: { ar: "4 دقائق" },
        image: "/images/blog/gemini.png",
        author: authors.ahmed,
        tags: ["Google Gemini", "أخبار", "تحليل بيانات", "Google"],
        seo: {
            metaTitle: { ar: "تحديثات Google Gemini | ذكاء." },
            metaDescription: { ar: "كل ما تريد معرفته عن تحديثات Google Gemini 1.5 Pro الجديدة." },
            keywords: ["Google Gemini", "AI", "Google"]
        }
    },
    {
        slug: "افضل-5-ادوات-ذكاء-اصطناعي-2025",
        title: { ar: "5 أدوات ذكاء اصطناعي ستغير قواعد اللعبة في 2025" },
        excerpt: { ar: "قائمة شاملة بأقوى أدوات الذكاء الاصطناعي التي يجب على كل رائد أعمال معرفتها، من البحث الذكي إلى صناعة المحتوى." },
        content: {
            ar: `
    <img src = "/images/blog/blog_top_tools.png" alt = "Top AI Tools Cover" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    
    <p> في عالم يتطور بسرعة الضوء، لم يعد استخدام الذكاء الاصطناعي رفاهية، بل ضرورة للبقاء في المنافسة...</p>

    <div style="background:linear-gradient(90deg, #6366f1 0%, #a855f7 100%); padding: 2px; border-radius: 8px; margin: 2rem 0;" >
    <div style="background: #0f172a; padding: 1.5rem; border-radius: 6px;" >
    <strong style="color: #fff; display: block; margin-bottom: 0.5rem;" >🏆 القائمة الذهبية: </strong>
                    هذه الأدوات الخمس تم اختيارها بناءً على معايير: سهولة الاستخدام، السعر مقابل القيمة، والتأثير المباشر على الإنتاجية.
                </div>
    </div>

    <hr />

    <h3>1. Perplexity AI: نهاية محركات البحث التقليدية؟</h3>
    <p> تخيل محرك بحث لا يعطيك روابط، بل يعطيك إجابات. <strong> Perplexity </strong> يفعل ذلك بالضبط. يستخدم عدة نماذج ذكاء اصطناعي للبحث في الويب وتقديم إجابة موثقة بالمصادر.</p>
    <ul>
    <li><strong>لماذا نستخدمه؟</strong> للبحث الأكاديمي، التحقق من المعلومات، وتلخيص المقالات الطويلة.</li>
    </ul>

    <hr />

    <h3>2. Claude 3.5 Sonnet: المبرمج المبدع </h3>
    <p> بينما يتميز ChatGPT في المحادثة، يتفوق <strong> Claude 3.5 </strong> في البرمجة والتحليل المنطقي وكتابة المحتوى الطبيعي. يتميز بـ "نافذة سياق" ضخمة تسمح له بقراءة كتب كاملة وتحليلها.</p>

    <hr />

    <h3> 3. Gamma: وداعاً لـ PowerPoint </h3>
    <p> هل تكره تصميم الشرائح؟ <strong>Gamma </strong> يصمم لك عرضاً تقديمياً كاملاً، من النصوص إلى الصور والتنسيق، في ثوانٍ بمجرد كتابة عنوان العرض.</p>

    <hr />

    <h3> 4. Suno: استوديو موسيقي في جيبك </h3>
    <p> أداة مذهلة بكل ما تعنيه الكلمة. اكتب وصفًا للأغنية(مثلاً: "أغنية بوب حزينة عن البرمجة") وسيؤلف <strong> Suno </strong> الكلمات واللحن ويغنيها بصوت بشري واقعي للغاية.</p>

    <hr />

    <h3> 5. HeyGen: استنسخ نفسك رقمياً </h3>
    <p> لصناع المحتوى الذين لا يملكون وقتاً للتصوير. يمكنك إنشاء "أفاتار" يشبهك ويتحدث بصوتك بأي لغة في العالم، دون أن تقف أمام الكاميرا دقيقة واحدة.</p>

    <hr />

    <h2>الخلاصة </h2>
    <p> هذه الأدوات ليست مجرد برمجيات، بل هي موظفون رقميون يعملون لخدمتك 24 / 7. ابدأ بتجربة واحدة منها اليوم.</p>
        `
        },
        date: "2025-06-01",
        category: { ar: "أدوات" },
        readingTime: "6 دقائق",
        image: "/images/blog/blog_top_tools.png",
        author: authors.ahmed,
        tags: ["Perplexity", "Claude", "AI Tools", "Suno", "Gamma"],
        seo: {
            metaTitle: { ar: "أقوى أدوات الذكاء الاصطناعي 2025 | ذكاء." },
            metaDescription: { ar: "أفضل 5 أدوات ذكاء اصطناعي يجب عليك استخدامها في 2025." },
            keywords: ["AI Tools", "Perplexity", "Claude", "أدوات"]
        }
    },
    {
        slug: "دليل-الذكاء-الاصطناعي-للمبتدئين",
        title: { ar: "دليل المبتدئين الشامل للذكاء الاصطناعي في 2025" },
        excerpt: { ar: "كل ما تحتاج معرفته عن الذكاء الاصطناعي من الصفر: المفاهيم الأساسية، الأدوات، وكيف تبدأ رحلتك." },
        content: {
            ar: `
    <img src = "/images/blog/ai-beginners.png" alt = "AI Beginners Guide" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    <h2>مقدمة: لماذا يجب أن تهتم بالذكاء الاصطناعي؟</h2>
    <p> الذكاء الاصطناعي لم يعد خيالاً علمياً أو حكراً على المتخصصين. في 2025، أصبح أداة يومية يستخدمها الملايين لكتابة الإيميلات، تصميم الصور، البرمجة، وحتى التعلم. إذا كنت لا تستخدمه، فأنت تتخلف عن الركب.</p>

    <div style="background: rgba(34, 197, 94, 0.1); border-right: 4px solid #22c55e; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #22c55e; display: block; margin-bottom: 0.5rem;" >🎯 في نهاية هذا الدليل ستتعلم: </strong>
                ما هو الذكاء الاصطناعي فعلاً، كيف تختار الأداة المناسبة، وكيف تبدأ استخدامه اليوم.
            </div>

    <hr />

    <h2>الجزء الأول: ما هو الذكاء الاصطناعي؟</h2>
    <p> ببساطة، الذكاء الاصطناعي(AI) هو برنامج حاسوبي يمكنه "التعلم" من البيانات وأداء مهام كانت تتطلب ذكاءً بشرياً.</p>

    <h3> أنواع الذكاء الاصطناعي التي ستتعامل معها: </h3>
    <ul>
    <li><strong>النماذج اللغوية(LLMs): </strong> مثل ChatGPT و Claude - تفهم وتولد النصوص.</li>
    <li><strong>مولدات الصور: </strong> مثل Midjourney و DALL-E - تحول الوصف لصور.</li>
    <li><strong>مولدات الصوت والفيديو: </strong> مثل Suno و HeyGen - تنتج محتوى سمعي بصري.</li>
    <li><strong>أدوات البرمجة: </strong> مثل Cursor و Copilot - تساعد في كتابة الكود.</li>
    </ul>

    <hr />

    <h2>الجزء الثاني: من أين أبدأ؟</h2>
    <p> أفضل طريقة للبدء هي التجربة المباشرة. إليك خارطة الطريق: </p>

    <h3> الأسبوع الأول: تعرف على ChatGPT </h3>
    <ol>
    <li>أنشئ حساباً مجانياً على <a href="https://chat.openai.com" target="_blank" > chat. openai. com </a>.</li>
    <li>جرب أن تطلب منه: "اشرح لي الذكاء الاصطناعي كأني طفل عمري 10 سنوات".</li>
    <li> اطلب منه كتابة إيميل احترافي، أو تلخيص مقال طويل.</li>
    <li> جرب أن تحادثه كأنه مستشار شخصي.</li>
    </ol>

    <h3> الأسبوع الثاني: جرب أدوات الصور </h3>
    <ol>
    <li>استخدم <a href="https://www.bing.com/create" target="_blank" > Bing Image Creator </a> (مجاني).</li>
    <li>اكتب وصفاً مثل: "قط يرتدي نظارات يقرأ كتاباً في مكتبة قديمة".</li>
    <li> لاحظ كيف تؤثر الكلمات على النتيجة.</li>
    </ol>

    <h3> الأسبوع الثالث: دمج AI في عملك </h3>
    <ul>
    <li>استخدم Notion AI لتنظيم ملاحظاتك.</li>
    <li> جرب Grammarly لتحسين كتاباتك بالإنجليزية.</li>
    <li> استخدم Perplexity بدلاً من Google للبحث.</li>
    </ul>

    <hr />

    <h2>الجزء الثالث: أخطاء المبتدئين(تجنبها!) </h2>

    <div style="background: rgba(239, 68, 68, 0.1); border-right: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #ef4444; display: block; margin-bottom: 0.5rem;" >❌ أخطاء شائعة: </strong>
    <ul style="margin: 0; padding-right: 1.5rem;" >
    <li>الثقة العمياء: AI قد يخطئ أو "يهلوس" معلومات. تحقق دائماً.</li>
    <li> الأوامر الغامضة: "اكتب لي شيء حلو" ستعطي نتيجة سيئة.</li>
    <li> عدم التكرار: النتيجة الأولى ليست النهائية. عدّل واطلب مجدداً.</li>
    </ul>
    </div>

    <hr />

    <h2>الجزء الرابع: هندسة الأوامر(Prompt Engineering) </h2>
    <p> سر الحصول على نتائج ممتازة من AI هو كيفية صياغة طلبك.</p>

    <h3> صيغة ذهبية للأوامر الفعالة: </h3>
    <blockquote style="background: rgba(99, 102, 241, 0.1); border-right: 4px solid #6366f1; padding: 1rem; margin: 1rem 0; border-radius: 8px;" >
    <strong>الدور + السياق + المهمة + الشكل </strong><br><br>
                مثال: "تصرف كخبير تسويق رقمي (الدور). لدي متجر إلكتروني لبيع الملابس الرياضية (السياق). اكتب لي 5 أفكار لحملة إعلانية على إنستغرام (المهمة). قدمها في جدول مع العنوان والوصف والتكلفة المتوقعة (الشكل)."
    </blockquote>

    <hr />

    <h2>الخلاصة: ابدأ اليوم، لا غداً </h2>
    <p> الذكاء الاصطناعي ليس موضة عابرة. إنه تحول جذري في كيفية عملنا. كل يوم تتأخر فيه عن التعلم، يتقدم فيه منافسوك. ابدأ بخطوة صغيرة اليوم: افتح ChatGPT واطلب منه أن يساعدك في مهمة كنت تؤجلها.</p>
        `
        },
        date: "2025-05-20",
        category: { ar: "شروحات" },
        readingTime: { ar: "8 دقائق" },
        image: "/images/blog/ai-beginners.png",
        author: authors.ahmed,
        tags: ["مبتدئين", "تعلم", "ChatGPT", "دليل"],
        seo: {
            metaTitle: { ar: "دليل المبتدئين للذكاء الاصطناعي 2025 | ذكاء." },
            metaDescription: { ar: "تعلم أساسيات الذكاء الاصطناعي من الصفر مع هذا الدليل الشامل للمبتدئين." },
            keywords: ["AI للمبتدئين", "تعلم الذكاء الاصطناعي", "ChatGPT", "دليل"]
        }
    },
    {
        slug: "صناعة-المحتوى-بالذكاء-الاصطناعي",
        title: { ar: "كيف تصنع محتوى احترافي باستخدام الذكاء الاصطناعي" },
        excerpt: { ar: "دليل عملي لصناع المحتوى: من الفكرة للنشر باستخدام أدوات AI المختلفة." },
        content: {
            ar: `
    <img src = "/images/blog/ai-content.png" alt = "AI Content Creation" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    <h2>ثورة صناعة المحتوى </h2>
    <p> ما كان يحتاج فريقاً من الكتّاب والمصممين والمحررين، أصبح اليوم ممكناً لشخص واحد بمساعدة الذكاء الاصطناعي. هذا ليس بديلاً عن الإبداع البشري، بل هو تضخيم له.</p>

    <div style="background: rgba(245, 158, 11, 0.1); border-right: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #f59e0b; display: block; margin-bottom: 0.5rem;" >⚡ واقع جديد: </strong>
                صانع محتوى واحد + أدوات AI = إنتاجية فريق كامل. لكن الجودة تعتمد على مهاراتك في توجيه هذه الأدوات.
            </div>

    <hr />

    <h2>خطوات العمل الاحترافي </h2>

    <h3> المرحلة 1: توليد الأفكار(Ideation) </h3>
    <p> بدلاً من التحديق في صفحة بيضاء، استخدم AI كشريك عصف ذهني: </p>
    <ul>
    <li><strong>ChatGPT / Claude: </strong> "أعطني 20 فكرة لمحتوى عن [موضوعك] تناسب جمهور [وصف الجمهور]".</li>
    <li><strong>Perplexity: </strong> ابحث عن "trending topics in [مجالك]" للحصول على أفكار مدعومة بالبيانات.</li>
    <li><strong>نصيحة: </strong> اطلب أفكاراً "غير تقليدية" أو "مثيرة للجدل" للخروج من المألوف.</li>
    </ul>

    <h3> المرحلة 2: البحث والتحقق </h3>
    <ul>
    <li>استخدم <strong> Perplexity </strong> للحصول على معلومات موثقة بالمصادر.</li>
    <li>اطلب من <strong> Claude </strong> تحليل موضوع من عدة زوايا.</li>
    <li><strong>تحذير: </strong> لا تنشر معلومات دون التحقق منها. AI قد يخطئ!</li>
    </ul>

    <h3> المرحلة 3: الكتابة والتحرير </h3>
    <ol>
    <li><strong>المسودة الأولى: </strong> اكتب بنفسك أو اطلب من AI مسودة أولية.</li>
    <li><strong>التحسين: </strong> اطلب من Claude "حسّن هذا النص ليكون أكثر جاذبية".</li>
    <li><strong>التدقيق: </strong> استخدم Grammarly للإنجليزية أو اطلب من ChatGPT مراجعة العربية.</li>
    <li><strong>اللمسة الشخصية: </strong> أضف صوتك الخاص. AI جيد في القالب، أنت تضيف الروح.</li>
    </ol>

    <h3> المرحلة 4: التصميم المرئي </h3>
    <ul>
    <li><strong>Canva AI: </strong> للتصميمات السريعة والسوشيال ميديا.</li>
    <li><strong>Midjourney: </strong> للصور الفنية والإبداعية.</li>
    <li><strong>DALL - E 3: </strong> للصور الواقعية والتوضيحية (عبر ChatGPT Plus).</li>
    <li><strong>Gamma: </strong> للعروض التقديمية الاحترافية.</li>
    </ul>

    <hr />

    <h2>سير عمل يومي مقترح </h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;" >
    <tr style="background: rgba(99, 102, 241, 0.1);" >
    <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;" > الوقت </th>
    <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;" > المهمة </th>
    <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb;" > الأداة </th>
    </tr>
    <tr>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > 9:00 </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > عصف ذهني للأفكار </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > ChatGPT </td>
    </tr>
    <tr>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > 10:00 </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > بحث وتحقق </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > Perplexity </td>
    </tr>
    <tr>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > 11:00 </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > كتابة المسودة </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > Claude </td>
    </tr>
    <tr>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > 14:00 </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > تصميم الصور </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > Canva / Midjourney </td>
    </tr>
    <tr>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > 15:00 </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > جدولة ونشر </td>
    <td style="padding: 12px; border: 1px solid #e5e7eb;" > Buffer / Later </td>
    </tr>
    </table>

    <hr />

    <h2>نصائح ذهبية </h2>
    <ul>
    <li><strong>طوّر "مكتبة أوامر": </strong> احفظ الـ Prompts الناجحة لإعادة استخدامها.</li>
    <li><strong>اخلط الأدوات: </strong> لا تعتمد على أداة واحدة. كل واحدة لها نقاط قوة.</li>
    <li><strong>اختبر وقِس: </strong> أي محتوى يحقق تفاعلاً أكبر؟ حلل واضبط.</li>
    <li><strong>ابقَ إنساناً: </strong> أضف قصصك وتجاربك الشخصية. AI لا يملكها.</li>
    </ul>

    <hr />

    <h2>الخلاصة </h2>
    <p> الذكاء الاصطناعي هو أقوى مساعد يمكن لصانع المحتوى الحصول عليه. لكنه يبقى مساعداً. القرار الإبداعي، الرؤية، والصوت الفريد - هذه تبقى مسؤوليتك. استخدم AI لتوفير الوقت والجهد، واستثمر هذا الوفر في تطوير إبداعك.</p>
        `
        },
        date: "2025-05-25",
        category: { ar: "إنتاجية" },
        readingTime: { ar: "7 دقائق" },
        image: "/images/blog/ai-content.png",
        author: authors.ahmed,
        tags: ["صناعة المحتوى", "إنتاجية", "تسويق", "Canva"],
        seo: {
            metaTitle: { ar: "صناعة المحتوى بالذكاء الاصطناعي | ذكاء." },
            metaDescription: { ar: "دليل عملي لصناع المحتوى لاستخدام AI في كل مرحلة من مراحل الإنتاج." },
            keywords: ["صناعة المحتوى", "AI", "تسويق", "إنتاجية"]
        },
        relatedSystem: "نظام-إعادة-استغلال-المحتوى"
    },
    {
        slug: "مستقبل-الذكاء-الاصطناعي-في-العالم-العربي",
        title: { ar: "مستقبل الذكاء الاصطناعي في العالم العربي: الفرص والتحديات" },
        excerpt: { ar: "تحليل شامل لوضع الذكاء الاصطناعي في المنطقة العربية والفرص الهائلة التي تنتظر الجيل الجديد." },
        content: {
            ar: `
    <img src = "/images/blog/ai-arab.png" alt = "AI in Arab World" style="width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" >

    <h2>لحظة تاريخية </h2>
    <p> نحن نعيش ما يمكن تسميته "لحظة الإنترنت الثانية". كما غيّر الإنترنت كل شيء في التسعينات، يعيد الذكاء الاصطناعي تشكيل العالم الآن. والسؤال: أين العالم العربي من هذا كله؟</p>

    <div style="background: rgba(59, 130, 246, 0.1); border-right: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem;" >📊 حقائق مهمة: </strong>
    <ul style="margin: 0; padding-right: 1.5rem;" >
    <li>400 مليون ناطق بالعربية = سوق ضخم غير مُستَغَل.</li>
    <li> أقل من 1 % من محتوى الإنترنت بالعربية.</li>
    <li> معظم أدوات AI لا تدعم العربية بشكل جيد... بعد.</li>
    </ul>
    </div>

    <hr />

    <h2>الفرص الذهبية </h2>

    <h3> 1. اللغة العربية كميزة تنافسية </h3>
    <p> بينما يتسابق الجميع على السوق الإنجليزي المشبع، السوق العربي شبه فارغ. من يبني أدوات AI عربية الآن سيملك السوق لسنوات.</p>
    <ul>
    <li><strong>فرصة: </strong> روبوتات محادثة عربية للخدمة، التعليم، الصحة.</li>
    <li><strong>فرصة: </strong> محتوى عربي تعليمي عن AI (مثل هذه المدونة!).</li>
    <li><strong>فرصة: </strong> تطبيقات متخصصة للثقافة العربية.</li>
    </ul>

    <h3> 2. التعليم الإلكتروني </h3>
    <p> AI يمكنه توفير "معلم شخصي" لكل طالب. في منطقة تعاني من تفاوت جودة التعليم، هذه فرصة ذهبية.</p>

    <h3> 3. ريادة الأعمال التقنية </h3>
    <p> تكلفة بناء شركة تقنية انخفضت 10 أضعاف بفضل AI. شخص واحد اليوم يمكنه بناء ما كان يحتاج فريقاً من 10. </p>

    <hr />

    <h2>التحديات الحقيقية </h2>

    <h3> 1. فجوة المهارات </h3>
    <p> معظم الشباب العربي لا يعرف كيف يستخدم هذه الأدوات بفعالية. هناك فجوة بين "سمعت عن ChatGPT" و "أستخدمه يومياً لمضاعفة إنتاجيتي".</p>

    <h3> 2. البنية التحتية </h3>
    <p> بعض الدول العربية لا تزال تعاني من بطء الإنترنت أو القيود على الوصول لبعض الخدمات.</p>

    <h3> 3. المحتوى العربي </h3>
    <p> نماذج الذكاء الاصطناعي تتعلم من الإنترنت. ولأن المحتوى العربي قليل، أداؤها بالعربية أضعف. هذه مشكلة وفرصة في آن واحد.</p>

    <hr />

    <h2>كيف تستعد للمستقبل؟</h2>

    <h3> للأفراد: </h3>
    <ol>
    <li><strong>تعلم الآن: </strong> لا تنتظر أن تُفرض عليك هذه التقنيات. كن سباقاً.</li>
    <li><strong>بناء مهارات لا تُستبدل: </strong> الإبداع، التفكير النقدي، حل المشكلات المعقدة.</li>
    <li><strong>تعلم الإنجليزية: </strong> معظم المصادر والأدوات المتقدمة بالإنجليزية.</li>
    <li><strong>جرب وطبق: </strong> لا تكتفِ بالقراءة. استخدم الأدوات يومياً.</li>
    </ol>

    <h3> للشركات: </h3>
    <ul>
    <li>ابدأ بتجربة أدوات AI في عمليات بسيطة(خدمة العملاء، التسويق).</li>
    <li> استثمر في تدريب فريقك.</li>
    <li> فكر: كيف يمكن لـ AI تحسين منتجك / خدمتك؟</li>
    </ul>

    <hr />

    <h2>رسالة للجيل الجديد </h2>
    <div style="background: rgba(34, 197, 94, 0.1); border-right: 4px solid #22c55e; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <p style="font-size: 1.1rem; margin: 0;" > أنتم لستم متأخرين. نحن في بدايات هذه الثورة. الفرصة لا تزال مفتوحة لمن يريد أن يتعلم، يجرب، ويبني. العالم العربي يحتاج شباباً يفهمون هذه التقنيات ويوظفونها لخدمة مجتمعاتنا.</p>
    </div>

    <hr />

    <h2>الخلاصة </h2>
    <p> الذكاء الاصطناعي ليس تهديداً للعالم العربي، بل هو فرصة تاريخية للقفز عدة مراحل للأمام. لكن هذه الفرصة لن تنتظر. كل يوم يمر، ينضم المزيد من الناس لهذه الثورة. السؤال: هل ستكون منهم؟</p>
        `
        },
        date: "2025-05-28",
        category: { ar: "مستقبل" },
        readingTime: { ar: "6 دقائق" },
        image: "/images/blog/ai-arab.png",
        author: authors.ahmed,
        tags: ["مستقبل", "العالم العربي", "ريادة الأعمال", "تعليم"],
        seo: {
            metaTitle: { ar: "مستقبل الذكاء الاصطناعي في العالم العربي | ذكاء." },
            metaDescription: { ar: "تحليل شامل للفرص والتحديات التي يواجهها العالم العربي في عصر الذكاء الاصطناعي." },
            keywords: ["AI", "العالم العربي", "مستقبل", "فرص"]
        }
    },
    {
        slug: "agentic-ai-revolution",
        title: {
            ar: "ثورة الوكلاء الأذكياء (Agentic AI): زملاؤك الجدد في العمل",
            en: "The Agentic AI Revolution: Your New Virtual Coworkers"
        },
        excerpt: {
            ar: "كيف تنتقل تقنيات الذكاء الاصطناعي من مجرد مساعدين إلى وكلاء مستقلين ينفذون مهام معقدة.",
            en: "How AI is moving from assistants to autonomous agents executing complex tasks."
        },
        content: {
            ar: `
                <img src="/images/blog/agentic-ai.png" alt="Agentic AI" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;"/>
                <h2>عصر الوكلاء الأذكياء</h2>
                <p>نحن نشهد نقلة نوعية من الـ Chatbots إلى الـ Agents. لم يعد الذكاء الاصطناعي مجرد مجيب على الأسئلة، بل أصبح منقذاً للمهام.</p>
                <h3>ما الفرق؟</h3>
                <ul>
                <li><strong>Chatbot:</strong> تسأله "كيف أحجز تذكرة؟" فيجيبك بالخطوات.</li>
                <li><strong>Agent:</strong> تقول له "احجز تذكرة للقاهرة غداً" فيقوم هو بالبحث والحجز والدفع وإرسال التذكرة لك.</li>
                </ul>
            `,
            en: `
                <img src="/images/blog/agentic-ai.png" alt="Agentic AI" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;"/>
                <h2>The Era of Intelligent Agents</h2>
                <p>We are witnessing a paradigm shift from Chatbots to Agents. AI is no longer just an answer engine; it's a task executor.</p>
                <h3>What's the difference?</h3>
                <ul>
                <li><strong>Chatbot:</strong> You ask "How do I book a ticket?" and it tells you the steps.</li>
                <li><strong>Agent:</strong> You say "Book a ticket to Cairo tomorrow" and it searches, books, pays, and sends you the ticket.</li>
                </ul>
            `
        },
        date: "2026-01-14",
        category: { ar: "مستقبل", en: "Future" },
        readingTime: { ar: "5 دقائق", en: "5 min" },
        image: "/images/blog/agentic-ai.png",
        author: authors.ahmed,
        tags: ["Agentic AI", "Automation", "Future Work"],
        seo: {
            metaTitle: { ar: "ثورة الوكلاء الأذكياء | ذكاء", en: "Agentic AI Revolution | AIR" },
            metaDescription: { ar: "تعرف على مستقبل العمل مع الوكلاء الأذكياء.", en: "Learn about the future of work with Agentic AI." },
            keywords: ["Agentic AI", "Agents", "Automation"]
        }
    },
    {
        slug: "physical-ai",
        title: {
            ar: "الذكاء الاصطناعي الفيزيائي: عندما يقابل الكود العالم الحقيقي",
            en: "Physical AI: When Code Meets the Real World"
        },
        excerpt: {
            ar: "دمج الذكاء الاصطناعي مع الروبوتات وأجهزة الاستشعار لخلق تفاعل حقيقي مع البيئة.",
            en: "Merging AI with robotics and sensors for real-world interaction."
        },
        content: {
            ar: `
                <img src="/images/blog/physical-ai.png" alt="Physical AI" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;"/>
                <h2>الذكاء الاصطناعي يخرج من الشاشة</h2>
                <p>لم يعد الذكاء الاصطناعي حبيس الخوادم والشاشات. إنه الآن يقود السيارات، يحرك الروبوتات في المصانع، ويتحكم في شبكات الطاقة.</p>
                <h3>أهم التطبيقات:</h3>
                <ul>
                <li>الروبوتات البشرية (Humanoids).</li>
                <li>المركبات ذاتية القيادة.</li>
                <li>إنترنت الأشياء الذكي (AIoT).</li>
                </ul>
            `,
            en: `
                <img src="/images/blog/physical-ai.png" alt="Physical AI" style="width: 100%; border-radius: 12px; margin-bottom: 2rem;"/>
                <h2>AI Steps Out of the Screen</h2>
                <p>AI is no longer confined to servers and screens. It's now driving cars, operating factory robots, and controlling power grids.</p>
                <h3>Key Applications:</h3>
                <ul>
                <li>Humanoid Robots.</li>
                <li>Autonomous Vehicles.</li>
                <li>Intelligent IoT (AIoT).</li>
                </ul>
            `
        },
        date: "2026-01-18",
        category: { ar: "تكنولوجيا", en: "Technology" },
        readingTime: { ar: "6 دقائق", en: "6 min" },
        image: "/images/blog/physical-ai.png",
        author: authors.ahmed,
        tags: ["Physical AI", "Robotics", "IoT"],
        seo: {
            metaTitle: { ar: "الذكاء الاصطناعي الفيزيائي | ذكاء", en: "Physical AI | AIR" },
            metaDescription: { ar: "كيف يغير الذكاء الاصطناعي العالم المادي.", en: "How AI is transforming the physical world." },
            keywords: ["Physical AI", "Robotics", "Future"]
        }
    }
];

export const systems: System[] = [
    {
        id: "1",
        slug: "نظام-إعادة-استغلال-المحتوى",
        title: {
            ar: "نظام إعادة التدوير الذكي",
            en: "Smart Content Repurposing"
        },
        subtitle: {
            ar: "كيف تحول قطعة محتوى واحدة إلى 10 قطع في 30 دقيقة",
            en: "How to turn one content piece into 10 in 30 minutes"
        },
        description: {
            ar: "لا تبدأ من الصفر أبداً. تعلم كيف تأخذ فيديو يوتيوب أو بودكاست وتحوله إلى مقالات، تغريدات، ومنشورات لينكد إن باستخدام تسلسل ذكي من أدوات الذكاء الاصطناعي.",
            en: "Never start from scratch. Learn how to take a YouTube video or podcast and turn it into articles, tweets, and LinkedIn posts using a smart sequence of AI tools."
        },
        problem: {
            ar: "نشر المحتوى يتطلب وقتاً طويلاً جداً. كتابة تغريدة، ثم مقال، ثم سكربت فيديو... هذا يستهلك يوماً كاملاً.",
            en: "Posting content takes a very long time. Writing a tweet, then an article, then a video script... this consumes a whole day."
        },
        result: {
            ar: "نشر محتوى يومي على 3 منصات (تويتر، لينكد إن، مدونة) باستثمار 30 دقيقة فقط من وقتك.",
            en: "Daily content on 3 platforms (Twitter, LinkedIn, Blog) with just 30 minutes of your time."
        },
        steps: [
            {
                title: { ar: "الخطوة الأولى: التفريغ والتلخيص", en: "Step 1: Transcription" },
                description: {
                    ar: "استخدم أداة مثل TurboScribe أو Whisper لتحويل الفيديو/الصوت إلى نص كامل، ثم اطلب من Claude تلخيص النقاط الأساسية.",
                    en: "Use TurboScribe or Whisper to transcribe, then ask Claude to summarize."
                },
                tool: "claude"
            },
            {
                title: { ar: "الخطوة الثانية: توليد المنشورات القصيرة", en: "Step 2: Post Generation" },
                description: {
                    ar: "خذ الملخص إلى ChatGPT واطلب منه: 'اكتب لي 5 تغريدات فيرال و 3 منشورات لينكد إن من هذا الملخص بأسلوب قصصي'.",
                    en: "Take the summary to ChatGPT and ask for viral tweets and LinkedIn posts."
                },
                tool: "chatgpt"
            },
            {
                title: { ar: "الخطوة الثالثة: التصميم البصري", en: "Step 3: Visual Design" },
                description: {
                    ar: "انسخ النقاط الرئيسية وضعها في خيار 'Text to Design' في Canva لتحويلها إلى عرض كاروسيل (Carousel) جاهز للنشر.",
                    en: "Use Canva's 'Text to Design' to create carousels."
                },
                tool: "canva"
            }
        ],
        stats: [
            { label: { ar: "الوقت المستغرق", en: "Time Spent" }, value: { ar: "30 دقيقة", en: "30 mins" } },
            { label: { ar: "قطع المحتوى", en: "Content Pieces" }, value: { ar: "10 قطع", en: "10 pieces" } },
            { label: { ar: "المنصات", en: "Platforms" }, value: { ar: "3 منصات", en: "3 platforms" } }
        ],
        toolsUsed: ["chatgpt", "claude", "canva"],
        image: "/images/systems/content-repurposing.png",
        valueIdentity: {
            promise7Days: {
                ar: "ستمتلك مكتبة محتوى متجددة تكفيك لشهر كامل خلال 7 أيام فقط.",
                en: "You'll have a content library for a month within 7 days."
            },
            roiIndicators: [
                { ar: "توفير 20 ساعة عمل أسبوعياً", en: "20 hours saved weekly" },
                { ar: "زيادة التفاعل بنسبة 40%", en: "40% engagement boost" },
                { ar: "ثبات في النشر اليومي", en: "Consistent daily posting" }
            ],
            beforeAfter: {
                before: {
                    title: { ar: "نشر فوضوي", en: "Chaotic Posting" },
                    description: { ar: "نشر عشوائي وغير منتظم وإجهاد في التفكير في أفكار جديدة.", en: "Irregular posting and mental exhaustion from ideation." },
                    stats: [{ label: { ar: "سقوط مهام", en: "Dropped Tasks" }, value: { ar: "50%", en: "50%" } }]
                },
                after: {
                    title: { ar: "نشر يومي", en: "Daily Posting" },
                    description: { ar: "نشر يومي على 3 منصات باحترافية واستغلال ذكي لمحتوى موجود مسبقاً.", en: "Daily posting on 3 platforms and smart reuse of existing content." },
                    stats: [{ label: { ar: "سقوط مهام", en: "Dropped Tasks" }, value: { ar: "5%", en: "5%" } }]
                }
            }
        },
        templates: [
            { name: "جدول إعادة تدوير المحتوى", platform: "Notion", url: "https://notion.so/template-link", language: "ar" },
            { name: "قالب منشورات لينكد إن", platform: "Notion", url: "https://notion.so/template-link-2", language: "both" }
        ],
        lessons: [
            { title: "مقدمة في إعادة التدوير", duration: "3:45", videoUrl: "https://youtube.com/link1" },
            { title: "التطبيق العملي مع ChatGPT", duration: "5:20", videoUrl: "https://youtube.com/link2" }
        ],
        filterMetadata: {
            goal: "automation",
            level: "beginner",
            expectedTime: { ar: "30 دقيقة", en: "30 mins" }
        }
    },
    {
        id: "2",
        slug: "نظام-توفير-10-ساعات",
        title: {
            ar: "نظام توفير 10 ساعات أسبوعياً",
            en: "10-Hour Weekly Saving System"
        },
        subtitle: {
            ar: "التخلص من المهام الروتينية للأبد",
            en: "Get rid of routine tasks forever"
        },
        description: {
            ar: "نظام شامل لأتمتة المهام اليومية المملة، من تنظيم الاجتماعات إلى إدارة البريد الإلكتروني والبحث، لتركز فقط على العمل الاستراتيجي.",
            en: "A comprehensive system for automating boring daily tasks to focus on strategic work."
        },
        problem: {
            ar: "تغرق يومياً في مهام صغيرة: الرد على الإيميلات، تنسيق المواعيد، البحث عن معلومات، وتلخيص الاجتماعات. ينتهي اليوم ولم تنجز شيئاً مهماً.",
            en: "You drown daily in small tasks: replying to emails, coordinating appointments, and summarizing meetings."
        },
        result: {
            ar: "استعادة 10 ساعات كاملة من وقتك أسبوعياً، وتركيز طاقتك الذهنية على القرارات الكبيرة والإبداع.",
            en: "Reclaim 10 full hours of your time weekly."
        },
        steps: [
            {
                title: { ar: "الخطوة الأولى: أتمتة الاجتماعات", en: "Step 1: Automated Meetings" },
                description: {
                    ar: "توقف عن كتابة الملاحظات. استخدم مساعد اجتماع AI لتسجيل وتلخيص كل اجتماعاتك واستخراج المهام المطلوبة تلقائياً.",
                    en: "Use an AI meeting assistant to record and summarize all your meetings."
                },
                tool: "notion"
            },
            {
                title: { ar: "الخطوة الثانية: البحث الذكي", en: "Step 2: Smart Research" },
                description: {
                    ar: "بدلاً من ضياع ساعات في جوجل، استخدم Perplexity للحصول على إجابات موثقة وجاهزة لأي سؤال بحثي في ثوانٍ.",
                    en: "Use Perplexity for documented answers."
                },
                tool: "perplexity"
            },
            {
                title: { ar: "الخطوة الثالثة: بناء المعرفة", en: "Step 3: Building Knowledge" },
                description: {
                    ar: "كل فكرة أو معلومة تذهب إلى Notion فوراً. لا تعتمد على ذاكرتك. ابنِ 'عقلاً ثانياً' يحفظ لك كل شيء.",
                    en: "Build a 'Second Brain' in Notion."
                },
                tool: "notion"
            }
        ],
        stats: [
            { label: { ar: "توفير وقت", en: "Time Saving" }, value: { ar: "10+ ساعات/أسبوع", en: "10+ hours/week" } },
            { label: { ar: "الإنتاجية", en: "Productivity" }, value: { ar: "x2 ضعف", en: "x2" } },
            { label: { ar: "الضغط الذهني", en: "Mental Stress" }, value: { ar: "-80%", en: "-80%" } }
        ],
        toolsUsed: ["perplexity", "notion"],
        image: "/images/systems/10-hour.png",
        valueIdentity: {
            promise7Days: {
                ar: "ستستعيد أول 10 ساعات من وقتك الضائع قبل نهاية الأسبوع الأول.",
                en: "Reclaim your first 10 hours within a week."
            },
            roiIndicators: [
                { ar: "توفير 10 ساعات/أسبوع", en: "10 hours/week saved" },
                { ar: "صفر فوضى في المواعيد", en: "Zero appointment chaos" },
                { ar: "أرشفة آلية لكل الاجتماعات", en: "Automated archiving" }
            ],
            beforeAfter: {
                before: {
                    title: { ar: "تشتت وفوضى", en: "Distraction and Chaos" },
                    description: { ar: "نسيان تفاصيل الاجتماعات المهمة وتشتت بين 10 تطبيقات مختلفة.", en: "Forgetting important meeting details and scattered across 10 apps." },
                    stats: [{ label: { ar: "ضغط ذهني", en: "Mental Stress" }, value: { ar: "90%", en: "90%" } }]
                },
                after: {
                    title: { ar: "تركيز تام", en: "Full Focus" },
                    description: { ar: "ملخصات آلية ومهام محددة لكل اجتماع ومركز إدارة موحد في Notion.", en: "Automated summaries and a unified management center in Notion." },
                    stats: [{ label: { ar: "ضغط ذهني", en: "Mental Stress" }, value: { ar: "10%", en: "10%" } }]
                }
            }
        },
        templates: [
            { name: "نظام العقل الثاني", platform: "Notion", url: "https://notion.so/second-brain", language: "ar" },
            { name: "متتبع الوقت الذكي", platform: "Sheets", url: "https://docs.google.com/sheets/link", language: "both" }
        ],
        lessons: [
            { title: "كيف تضبط Perplexity للبحث", duration: "4:15" },
            { title: "إعداد هيكل Notion الأساسي", duration: "6:30" }
        ],
        filterMetadata: {
            goal: "management",
            level: "intermediate",
            expectedTime: { ar: "24 ساعة", en: "24 hours" }
        }
    },
    {
        id: "3",
        slug: "agentic-automation-system",
        title: {
            ar: "نظام الأتمتة الوكيلية (Agentic Automation)",
            en: "Agentic Automation System"
        },
        subtitle: {
            ar: "ابنِ فريقاً من الموظفين الرقميين يعملون وأنت نائم",
            en: "Build a team of digital employees working while you sleep"
        },
        description: {
            ar: "هذا ليس مجرد أتمتة عادية. هذا النظام يعلمك كيف تبني 'وكلاء' (Agents) مستقلين يمكنهم البحث، وتنفيذ المهام، واتخاذ القرارات البسيطة نيابة عنك.",
            en: "This is not just normal automation. This system teaches you how to build autonomous Agents that can search, execute tasks, and make simple decisions for you."
        },
        problem: {
            ar: "الأتمتة التقليدية (مثل Zapier) غبية؛ إذا واجهت خطأ تتوقف. أنت بحاجة لنظام يفهم ويصحح نفسه.",
            en: "Traditional automation (like Zapier) is dumb; if it hits an error, it stops. You need a system that understands and self-corrects."
        },
        result: {
            ar: "فريق كامل من الوكلاء يديرون عملياتك اليومية (بحث، كتابة، ردود عملاء) بتكلفة 0$.",
            en: "A full team of agents managing your daily operations (research, writing, support) for $0."
        },
        steps: [
            {
                title: { ar: "الخطوة 1: وكيل البحث (The Researcher)", en: "Step 1: The Researcher" },
                description: {
                    ar: "استخدم LiveDocs أو Perplexity للبحث العميق وجمع البيانات حول أي موضوع، ثم تلخيصه في تقرير منظم.",
                    en: "Use LiveDocs or Perplexity for deep research and data gathering, then summarize into a structured report."
                },
                tool: "livedocs"
            },
            {
                title: { ar: "الخطوة 2: وكيل التنفيذ (The Executor)", en: "Step 2: The Executor" },
                description: {
                    ar: "حول ملاحظاتك الصوتية من الاجتماعات باستخدام AudioScribe إلى مهام واضحة، ثم دع PostSyncer يحولها لمحتوى.",
                    en: "Turn voice notes using AudioScribe into clear tasks, then let PostSyncer turn them into content."
                },
                tool: "audioscribe"
            },
            {
                title: { ar: "الخطوة 3: وكيل المراجعة (The Reviewer)", en: "Step 3: The Reviewer" },
                description: {
                    ar: "لا تنشر شيئاً دون مراجعة. استخدم Claude كـ 'مدير جودة' لمراجعة المخرجات قبل اعتمادها.",
                    en: "Never publish without review. Use Claude as a 'Quality Manager' to review outputs before approval."
                },
                tool: "claude"
            }
        ],
        stats: [
            { label: { ar: "التكلفة", en: "Cost" }, value: { ar: "0$ / شهر", en: "$0 / mo" } },
            { label: { ar: "التوفر", en: "Availability" }, value: { ar: "24/7", en: "24/7" } },
            { label: { ar: "السرعة", en: "Speed" }, value: { ar: "10x", en: "10x" } }
        ],
        toolsUsed: ["livedocs", "audioscribe", "claude", "postsyncer"],
        image: "/images/systems/agentic-system.png",
        valueIdentity: {
            promise7Days: {
                ar: "ستطلق أول وكيل ذكي لك (AI Agent) يقوم بمهمة كاملة من البداية للنهاية.",
                en: "You will launch your first AI Agent performing a complete end-to-end task."
            },
            roiIndicators: [
                { ar: "استبدال موظف مبتدئ", en: "Replace junior hire" },
                { ar: "عمل متواصل 24 ساعة", en: "24h continuous work" },
                { ar: "دقة 99% في المهام الروتينية", en: "99% accuracy in routine tasks" }
            ],
            beforeAfter: {
                before: {
                    title: { ar: "أنت تقوم بكل شيء", en: "You do everything" },
                    description: { ar: "تقضي يومك في التنقل بين التطبيقات والنسخ واللصق.", en: "Spending your day switching apps and copy-pasting." },
                    stats: [{ label: { ar: "وقت ضائع", en: "Wasted Time" }, value: { ar: "40%", en: "40%" } }]
                },
                after: {
                    title: { ar: "الوكلاء يعملون", en: "Agents at work" },
                    description: { ar: "أنت المدير، والوكلاء ينفذون العمل. تراجع النتائج فقط.", en: "You are the manager, agents execute. You only review results." },
                    stats: [{ label: { ar: "وقت ضائع", en: "Wasted Time" }, value: { ar: "0%", en: "0%" } }]
                }
            }
        },
        templates: [
            { name: "خارطة طريق الوكلاء", platform: "Miro", url: "https://miro.com/templates", language: "en" },
            { name: "أوامر الوكلاء (Prompts)", platform: "Notion", url: "https://notion.so/prompts", language: "both" }
        ],
        lessons: [
            { title: "مقدمة في الـ Agentic Workflow", duration: "8:00" },
            { title: "بناء وكيلك الأول مع LiveDocs", duration: "12:30" }
        ],
        filterMetadata: {
            goal: "automation",
            level: "advanced",
            expectedTime: { ar: "3 ساعات (إعداد)", en: "3 hours (setup)" }
        }
    }
];

export const tools: Tool[] = [
    {
        id: "1",
        name: {
            ar: "ChatGPT",
            en: "ChatGPT"
        },
        slug: "chatgpt",
        description: {
            ar: "المساعد الذكي الأكثر شهرة للمحادثة وتوليد النصوص.",
            en: "The most famous smart assistant for conversation and text generation."
        },
        content: {
            ar: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/chatgpt.png" alt = "ChatGPT Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) مقدمة عن الأداة </h2>
    <p> ChatGPT هو روبوت محادثة(Chatbot) طورته شركة OpenAI، يعتمد على الذكاء الاصطناعي التوليدي...</p>

    <div style="background: rgba(16, 185, 129, 0.1); border-right: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #10b981; display: block; margin-bottom: 0.5rem;" >💡 نصيحة احترافية: </strong>
                للحصول على أفضل النتائج، تخيل أنك تتحدث مع موظف ذكي جديد. كن محدداً في طلبك، وحدد الدور الذي تريده أن يلعبه(مثلاً: "تصرف كخبير تسويق").
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
    <p> قبل ChatGPT، كان البحث عن المعلومات يتطلب تصفح عشرات الروابط، وكانت كتابة المحتوى أو البرمجة تستغرق ساعات طويلة من الجهد اليدوي. يحل ChatGPT مشكلة "استهلاك الوقت" في المهام الروتينية والإبداعية، ويوفر حلاً فورياً لأسئلة معقدة تتطلب تحليلاً وليس مجرد بحث.</p>

    <hr />

    <h2>3) كيف تعمل الأداة؟</h2>
    <ul>
    <li><strong>التقنية المستخدمة: </strong> يعتمد على نماذج لغوية كبيرة (LLMs) مثل GPT-3.5 و GPT‑4o، تم تدريبها على كميات هائلة من النصوص.</li>
    <li><strong>المدخلات: </strong> نصوص مكتوبة (Prompts)، صور، أو ملفات.</li>
    <li><strong>المخرجات: </strong> نصوص، أكواد برمجية، جداول، وتحليل بيانات.</li>
    <li><strong>خصائص مميزة: </strong> القدرة على "تذكر" سياق المحادثة السابقة.</li>
    </ul>

    <hr />

    <h2>4) المزايا الأساسية </h2>
    <ul>
    <li><strong>السرعة الفائقة: </strong> توليد مقالات أو أكواد في ثوانٍ.</li>
    <li><strong>تعدد اللغات: </strong> يدعم العربية وعشرات اللغات بدقة عالية.</li>
    <li><strong>الإبداع: </strong> يمكنه تأليف قصص، شعر، وسيناريوهات.</li>
    <li><strong>التكامل: </strong> يتوفر له آلاف الإضافات (GPTs) للربط مع أدوات أخرى.</li>
    </ul>

    <hr />

    <h2>5) حالات استخدام عملية </h2>
    <ul>
    <li><strong>فردي: </strong> طالب يستخدمه لتلخيص كتاب أو شرح نظرية فيزيائية معقدة.</li>
    <li><strong>فريق: </strong> فريق تسويق يستخدمه لتوليد أفكار لمنشورات السوشيال ميديا لمدة شهر كامل.</li>
    <li><strong>مؤسسة: </strong> شركة برمجة تستخدمه لمراجعة الأكواد واكتشاف الأخطاء (Bugs) بشكل آلي.</li>
    </ul>

    <hr />

    <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
    <ol>
    <li>أنشئ حساباً على <a href="https://chat.openai.com" target="_blank" > chat. openai. com </a>.</li>
    <li>اختر النموذج(GPT - 3.5 المجاني أو GPT‑4o المدفوع).</li>
    <li> اكتب أمرًا(Prompt) في خانة المحادثة، مثلاً: "اكتب لي خطة تعلم برمجة بايثون للمبتدئين".</li>
    <li> تفاعل مع الإجابة واطلب تعديلات إذا لزم الأمر.</li>
    </ol>

    <hr />

    <h2>7) لمن تُعد الأداة مناسبة؟</h2>
    <ul>
    <li>كتاب المحتوى والمدونين.</li>
    <li> المبرمجين والمطورين.</li>
    <li> الطلاب والباحثين.</li>
    <li> المسوقين ورواد الأعمال.</li>
    <li> سحاب الأعمال الصغيرة.</li>
    </ul>

    <hr />

    <h2>8) خطة الأسعار </h2>
    <ul>
    <li><strong>المجانية(Free): </strong> وصول لنموذج GPT‑4o (بحدود) و GPT-3.5 mini.</li>
    <li><strong>Plus($20 / شهر): </strong> وصول غير محدود لـ GPT‑4o، تحليل بيانات متقدم، وتوليد صور بـ DALL-E 3.</li>
    </ul>

    <hr />

    <h2>9) المقارنة مع أدوات بديلة </h2>
    <p> <strong>مقابل Claude 3: </strong> يتميز Claude بأسلوب كتابة أكثر "إنسانية" وسياق أطول، بينما يتفوق ChatGPT في تعدد الأدوات (تصفح، صور، تحليل).<br>
    <strong> مقابل Gemini: </strong> يتكامل Gemini بشكل أفضل مع خدمات Google (Docs, Drive)، بينما ChatGPT أقوى في المنطق العام والبرمجة.</p>

    <hr />

    <h2> 10) الخلاصة </h2>
    <p> ChatGPT هو "السكين السويسري" للذكاء الاصطناعي. إذا كنت ستبدأ بأداة واحدة فقط، فهي هذه الأداة. ابدأ بالنسخة المجانية، وستجد أنها كافية لتغيير طريقة عملك بالكامل.</p>
        `,
            en: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/chatgpt.png" alt = "ChatGPT Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) Introduction </h2>
    <p> ChatGPT is a Chatbot developed by OpenAI, based on generative AI...</p>

    <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #10b981; display: block; margin-bottom: 0.5rem;" >💡 Pro Tip: </strong>
                For best results, imagine you are talking to a smart new employee. Be specific and define the role you want it to play (e.g., "Act as a marketing expert").
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Before ChatGPT, searching for information required browsing dozens of links. ChatGPT solves the "time consumption" problem in routine and creative tasks.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Technology: </strong> Based on LLMs like GPT-3.5 and GPT-4o.</li>
    <li><strong>Inputs: </strong> Text (Prompts), images, or files.</li>
    <li><strong>Outputs: </strong> Text, code, tables, and data analysis.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Extreme Speed: </strong> Generate articles or code in seconds.</li>
    <li><strong>Multilingual: </strong> Supports Arabic and dozens of languages.</li>
    <li><strong>Creativity: </strong> Can write stories, poetry, and scripts.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Individual: </strong> Students summarizing books.</li>
    <li><strong>Team: </strong> Marketing teams generating social media ideas.</li>
    <li><strong>Organization: </strong> Software companies reviewing code.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Create an account at <a href="https://chat.openai.com" target="_blank" > chat.openai.com </a>.</li>
    <li>Choose your model.</li>
    <li>Write a prompt.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Content creators and bloggers.</li>
    <li>Developers and programmers.</li>
    <li>Marketing teams and entrepreneurs.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> Access to GPT-4o (limited) and GPT-3.5 mini.</li>
    <li><strong>Plus ($20 / month): </strong> Unlimited GPT-4o and advanced features.</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs Claude 3: </strong> Claude is more "human-like", ChatGPT is more versatile.<br>
    <strong>vs Gemini: </strong> Gemini integrates with Google Workspace.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> ChatGPT is the "Swiss Army Knife" of AI. If you start with one tool, this is it.</p>
        `
        },
        category: "Chatbots",
        link: "https://chat.openai.com",
        featured: true,
        image: "/images/tools/chatgpt.png",
        bestFor: [
            { ar: "العصف الذهني وتوليد الأفكار", en: "Brainstorming and ideation" },
            { ar: "التلخيص والكتابة السريعة", en: "Summarization and fast writing" },
            { ar: "شرح المفاهيم المعقدة", en: "Explaining complex concepts" }
        ],
        notFor: [
            { ar: "البحث عن حقائق حديثة (النسخة المجانية)", en: "Fact-checking recent events (Free version)" },
            { ar: "كتابة محتوى نهائي دون مراجعة", en: "Writing final content without review" }
        ]
    },
    {
        id: "2",
        name: {
            ar: "Notion",
            en: "Notion"
        },
        slug: "notion",
        description: {
            ar: "مساحة عمل شاملة للملاحظات والمهام وإدارة المشاريع.",
            en: "An all-in-one workspace for notes, tasks, and project management."
        },
        content: {
            ar: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/notion.png" alt = "Notion Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) مقدمة عن الأداة </h2>
    <p> Notion هو التطبيق "الكل في واحد" الذي يجمع بين تدوين الملاحظات، وإدارة المهام، وقواعد البيانات...</p>

    <div style="background: rgba(59, 130, 246, 0.1); border-right: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem;" >🚀 سر الإنتاجية: </strong>
                استخدم الاختصار "/" لفتح قائمة الأوامر السحرية في أي مكان بالصفحة. يمكنك بناء نظام كامل دون رفع يدك عن لوحة المفاتيح.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
    <p> التشتت بين عشرات التطبيقات(Google Docs للمستندات، Trello للمهام، Excel للجداول). يجمع Notion كل هذه الوظائف في مكان واحد، مما يقلل من تشتت الانتباه ويوفر مصدراً واحداً للحقيقة(Single Source of Truth).</p>

    <hr />

    <h2>3) كيف تعمل الأداة؟</h2>
    <ul>
    <li><strong>التقنية: </strong> يعتمد على نظام "الكتل" (Blocks). كل شي في Notion هو كتلة (نص، صورة، جدول، صفحة).</li>
    <li><strong>المدخلات: </strong> نصوص، وسائط، قواعد بيانات علائقية.</li>
    <li><strong>Notion AI: </strong> ميزة ذكاء اصطناعي مدمجة للمساعدة في الكتابة والتلخيص والترجمة داخل الصفحات.</li>
    </ul>

    <hr />

    <h2>4) المزايا الأساسية </h2>
    <ul>
    <li><strong>المرونة المطلقة: </strong> صمم صفحتك كأنها موقع ويب.</li>
    <li><strong>قواعد البيانات: </strong> ربط المهام بالمشاريع وعرضها بعدة طرق (Board, List, Calendar).</li>
    <li><strong>التعاون: </strong> العمل الجماعي في الوقت الفعلي.</li>
    <li><strong>القوالب: </strong> آلاف القوالب الجاهزة لكل الاستخدامات.</li>
    </ul>

    <hr />

    <h2>5) حالات استخدام عملية </h2>
    <ul>
    <li><strong>فردي: </strong> تنظيم الحياة الشخصية (تتبع العادات، ميزانية، خطة قراءة).</li>
    <li><strong>فريق: </strong> إدارة خارطة طريق المنتج (Product Roadmap) وتوثيق اجتماعات الفريق.</li>
    <li><strong>مؤسسة: </strong> بناء "Wiki" داخلي للشركة يحتوي على دليل الموظف والسياسات.</li>
    </ul>

    <hr />

    <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
    <ol>
    <li>سجل في Notion. so.</li>
    <li> ابدأ بصفحة فارغة واكتب "/" لتظهر لك قائمة الأوامر.</li>
    <li> جرب إنشاء قاعدة بيانات(Table View).</li>
    <li> حمل قالب جاهز(Template) من معرض القوالب لتوفير الوقت.</li>
    </ol>

    <hr />

    <h2>7) لمن تُعد الأداة مناسبة؟</h2>
    <ul>
    <li>مدراء المشاريع والمنتجات.</li>
    <li> الطلاب(لتنظيم المحاضرات).</li>
    <li> الشركات الناشئة(لتوثيق العمليات).</li>
    <li> صناع المحتوى(لجدولة المنشورات).</li>
    </ul>

    <hr />

    <h2>8) خطة الأسعار </h2>
    <ul>
    <li><strong>المجانية: </strong> سخية جداً للاستخدام الفردي (عدد كتل غير محدود).</li>
    <li><strong>Plus($8 / شهر): </strong> لفرق العمل الصغيرة (تاريخ تعديلات أطول، رفع ملفات أكبر).</li>
    <li><strong>Notion AI: </strong> إضافة مدفوعة ($8/شهر).</li>
    </ul>

    <hr />

    <h2>9) المقارنة مع أدوات بديلة </h2>
    <p> <strong>مقابل Trello: </strong> نوشن أكثر شمولاً (مستندات + مهام) بينما Trello أسهل وأبسط للمهام فقط.<br>
    <strong> مقابل Evernote: </strong> نوشن يتفوق في الهيكلة وقواعد البيانات، بينما Evernote أفضل في التدوين السريع والبحث في ملفات PDF.</p>

    <hr />

    <h2> 10) الخلاصة </h2>
    <p> Notion ليس مجرد تطبيق ملاحظات، بل هو نظام تشغيل لحياتك وعملك. قد يكون صعباً في البداية بسبب كثرة الخيارات، لكن بمجرد إتقانه لا يمكنك الاستغناء عنه.</p>
        `,
            en: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/notion.png" alt = "Notion Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) Introduction </h2>
    <p> Notion is the "all-in-one" app that combines note-taking, task management, and databases...</p>

    <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem;" >🚀 Productivity Secret: </strong>
                Use the "/" shortcut to open the magic commands menu anywhere on the page.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Fragmentation across dozens of apps. Notion brings everything together, reducing distraction and providing a Single Source of Truth.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Technology: </strong> Uses a "Blocks" system. Everything is a block.</li>
    <li><strong>Inputs: </strong> Text, media, relational databases.</li>
    <li><strong>Notion AI: </strong> Built-in AI for writing and summarization.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Absolute Flexibility: </strong> Design your page like a website.</li>
    <li><strong>Databases: </strong> Connect tasks to projects and view them in multiple ways.</li>
    <li><strong>Templates: </strong> Thousands of ready-to-use templates.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Individual: </strong> Personal life organization (habit tracking, budgeting).</li>
    <li><strong>Team: </strong> Product Roadmap management.</li>
    <li><strong>Organization: </strong> Building an internal company Wiki.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Sign up at Notion.so.</li>
    <li>Start with a blank page and type "/".</li>
    <li>Try creating a database (Table View).</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Project and product managers.</li>
    <li>Students (organizing lectures).</li>
    <li>Startups (documenting processes).</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> Very generous for personal use.</li>
    <li><strong>Plus ($8 / month): </strong> For small teams.</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs Trello: </strong> Notion is more comprehensive (Docs + Tasks).<br>
    <strong>vs Evernote: </strong> Notion excels in structure and databases.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> Notion is an operating system for your life and work. Once mastered, you can't live without it.</p>
        `
        },
        category: "Productivity",
        link: "https://notion.so",
        featured: true,
        image: "/images/tools/notion.png",
        bestFor: [
            { ar: "بناء الأنظمة وتوثيق العمليات", en: "Building systems and documenting processes" },
            { ar: "إدارة المشاريع وقواعد البيانات", en: "Project management and databases" },
            { ar: "تنظيم الحياة الشخصية", en: "Personal life organization" }
        ],
        notFor: [
            { ar: "التدوين السريع جداً للملاحظات", en: "Very quick note-taking" },
            { ar: "الجداول الحسابية المعقدة (بديل Excel)", en: "Complex spreadsheets (Excel alternative)" }
        ]
    },
    {
        id: "3",
        name: {
            ar: "Midjourney",
            en: "Midjourney"
        },
        slug: "midjourney",
        description: {
            ar: "توليد صور فنية عالية الجودة من خلال الأوامر النصية.",
            en: "Generating high-quality artistic images from text prompts."
        },
        content: {
            ar: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/midjourney.png" alt = "Midjourney Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) مقدمة عن الأداة </h2>
    <p> Midjourney هو مختبر أبحاث مستقل ينتج برنامج ذكاء اصطناعي خاصاً يحمل نفس الاسم...</p>

    <div style="background: rgba(236, 72, 153, 0.1); border-right: 4px solid #ec4899; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #ec4899; display: block; margin-bottom: 0.5rem;" >🎨 معلومة فنية: </strong>
                أضف الكلمات <code> --v 6.0 </code> في نهاية الأمر للحصول على أحدث وأقوى إصدار من حيث الواقعية، و <code>--style raw</code> لتقليل اللمسة الفنية وجعل الصورة تبدو كصورة فوتوغرافية حقيقية.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
    <p> الحاجة إلى صور حصرية وعالية الجودة كانت تتطلب استئجار مصورين أو رسامين بتكلفة عالية، أو استخدام صور المخزون(Stock Photos) المكررة. Midjourney مكن أي شخص من تحويل خياله إلى لوحة فنية في دقائق.</p>

    <hr />

    <h2>3) كيف تعمل الأداة؟</h2>
    <ul>
    <li><strong>البيئة: </strong> يعمل حصرياً عن طريق تطبيق Discord (حتى وقت قريب بدأ بإطلاق موقع ويب تجريبي).</li>
    <li><strong>المدخلات: </strong> أوامر نصية تبدأ بـ <code>/imagine </code>.</li>
    <li><strong>المخرجات: </strong> 4 خيارات للصور يمكنك تكبير إحداها أو طلب تنويعات عليها.</li>
    </ul>

    <hr />

    <h2>4) المزايا الأساسية </h2>
    <ul>
    <li><strong>جودة فنية مذهلة: </strong> الصور تبدو كأعمال فنية احترافية وليست مجرد "تركيب".</li>
    <li><strong>الواقعية: </strong> الإصدارات الحديثة (v6) تنتج صوراً واقعية يصعب تمييزها عن التصوير الفوتوغرافي.</li>
    <li><strong>فهم الأنماط: </strong> يمكنه محاكاة أي أسلوب فني (زيتي، مائي، سايبربانك، بيكسار).</li>
    </ul>

    <hr />

    <h2>5) حالات استخدام عملية </h2>
    <ul>
    <li><strong>فردي: </strong> كاتب روايات يصمم أغلفة ورسوم توضيحية لشخصيات قصته.</li>
    <li><strong>فريق: </strong> وكالة إعلانات تصمم "Storyboard" مبدئي لإعلان تلفزيوني قبل التصوير.</li>
    <li><strong>مؤسسة: </strong> شركة ألعاب فيديو تصمم خلفيات وشخصيات (Concept Art) لألعابها الجديدة.</li>
    </ul>

    <hr />

    <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
    <ol>
    <li>أنشئ حساباً على Discord.</li>
    <li> اشترك في خطة Midjourney(لا توجد خطة مجانية حالياً).</li>
    <li> ادخل لسيرفر Midjourney أو راسل البوت(Midjourney Bot).</li>
    <li> اكتب<code> / imagine futuristic city with flying cars </code> وانتظر النتيجة.</li>
        </ol>

        <hr />

        <h2>7) لمن تُعد الأداة مناسبة؟</h2>
            <ul>
            <li>المصممون والفنانون(للإلهام).</li>
                <li> المخرجون وصناع الأفلام.</li>
                    <li> فرق التسويق والمحتوى.</li>
                        <li> مصممو الديكور والأزياء.</li>
                            </ul>

                            <hr />

                            <h2>8) خطة الأسعار </h2>
                                <ul>
                                <li><strong>Basic($10 / شهر): </strong> حوالي 200 صورة شهرياً.</li>
                                    <li><strong>Standard($30 / شهر): </strong> صور غير محدودة (بوضع الاسترخاء Relax Mode).</li>
                                        <li><strong>Pro($60 / شهر): </strong> ميزات الخصوصية (Stealth Mode) وسرعة أكبر.</li>
                                            </ul>

                                            <hr />

                                            <h2>9) المقارنة مع أدوات بديلة </h2>
                                                <p> <strong>مقابل DALL - E 3: </strong> دالي أسهل في الاستخدام ويفهم الأوامر المعقدة بدقة أكبر، لكن Midjourney يتفوق بوضوح في الجمالية والواقعية وتفاصيل الإضاءة والنسيج.</p>

                                                <hr />

                                                <h2> 10) الخلاصة </h2>
                                                    <p> إذا كنت تبحث عن الجمال والإبهار البصري، فـ Midjourney هو الملك المتوج. قد تكون واجهة Discord غريبة في البداية، لكن النتائج تستحق عناء التعلم.</p>
        `,
            en: `
    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
    <img src="/images/tools/midjourney.png" alt = "Midjourney Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
    </div>
    <h2> 1) Introduction </h2>
    <p> Midjourney is an independent research lab producing a proprietary AI program...</p>

    <div style="background: rgba(236, 72, 153, 0.1); border-left: 4px solid #ec4899; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #ec4899; display: block; margin-bottom: 0.5rem;" >🎨 Art Tip: </strong>
                Add <code>--v 6.0</code> for latest realism.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> High-quality custom images used to require expensive artists. Midjourney allows anyone to transform imagination into art in minutes.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Environment: </strong> Works exclusively through Discord.</li>
    <li><strong>Inputs: </strong> Text prompts starting with <code>/imagine</code>.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Stunning Artistic Quality: </strong> Images look like professional artwork.</li>
    <li><strong>Realism: </strong> Modern versions produce near-photographic results.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Individual: </strong> Authors designing book covers.</li>
    <li><strong>Team: </strong> Agencies creating storyboards.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Create a Discord account.</li>
    <li>Subscribe to a Midjourney plan.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Designers and artists.</li>
    <li>Filmmakers and directors.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Basic ($10 / month): </strong> ~200 images.</li>
    <li><strong>Standard ($30 / month): </strong> Unlimited images (Relax Mode).</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs DALL-E 3: </strong> DALL-E is easier for complex prompts, Midjourney wins on aesthetics.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> For "Art" and hyper-realism, Midjourney is unmatched.</p>
        `
        },
        category: "Design",
        link: "https://midjourney.com",
        featured: false,
        image: "/images/tools/midjourney.png",
        bestFor: [
            { ar: "صور فنية عالية الجودة", en: "High-quality artistic images" },
            { ar: "الإلهام البصري (Moodboards)", en: "Visual inspiration (Moodboards)" },
            { ar: "الصور الواقعية جداً", en: "Highly realistic images" }
        ],
        notFor: [
            { ar: "تعديل صور حقيقية موجودة", en: "Editing existing real photos" },
            { ar: "النصوص الدقيقة داخل الصور", en: "Accurate text within images" }
        ]
    },
    {
        id: "4",
        name: {
            ar: "Canva",
            en: "Canva"
        },
        slug: "canva",
        description: {
            ar: "أداة تصميم سهلة الاستخدام لغير المصممين.",
            en: "An easy-to-use design tool for non-designers."
        },
        content: {
            ar: `
                                                            <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                <img src="/images/tools/canva.png" alt = "Canva Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                    </div>
                                                                    <h2> 1) مقدمة عن الأداة </h2>
                                                                        <p> Canva هي منصة تصميم جرافيك عالمية تهدف إلى "تمكين العالم من التصميم"...</p>

                                                                            <div style="background: rgba(139, 92, 246, 0.1); border-right: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                <strong style="color: #8b5cf6; display: block; margin-bottom: 0.5rem;" >✨ هل تعلم؟</strong>
                يمكنك الآن كتابة "Magic Edit" وتحديد جزء من الصورة(مثلاً زهرة) وطلب استبدالها بشيء آخر(مثلاً بيتزا)، وسيقوم الذكاء الاصطناعي بتنفيذ ذلك ببراعة.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> تعقيد برامج التصميم الاحترافية وتكلفتها العالية. Canva أزال الحاجز التقني، ومكن أصحاب المشاريع الصغيرة والطلاب من تصميم شعارات ومنشورات احترافية بأنفسهم.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>الواجهة: </strong> متصفح ويب أو تطبيق جوال.</li>
                    <li><strong>Magic Studio: </strong> مجموعة أدوات ذكاء اصطناعي مدمجة (Magic Write, Magic Edit, Magic Eraser).</li>
                        <li><strong>المكتبة: </strong> ملايين الصور والعناصر والقوالب الجاهزة.</li>
                            </ul>

                            <hr />

                            <h2>4) المزايا الأساسية </h2>
                                <ul>
                                <li><strong>سهولة الاستخدام: </strong> تعلمها يستغرق دقائق.</li>
                                    <li><strong>القوالب: </strong> قوالب لكل شيء (سيرة ذاتية، انستجرام، عروض تقديمية).</li>
                                        <li><strong>أدوات AI: </strong> إزالة الخلفية بضغطة زر، وتوسيع الصور، وتوليد نصوص.</li>
                                            <li><strong>التعاون: </strong> دعوة الفريق للتعديل على نفس التصميم.</li>
                                                </ul>

                                                <hr />

                                                <h2>5) حالات استخدام عملية </h2>
                                                    <ul>
                                                    <li><strong>فردي: </strong> تصميم دعوة زفاف أو سيرة ذاتية (CV).</li>
                                                        <li><strong>فريق: </strong> إدارة هوية العلامة التجارية (Brand Kit) وتصميم منشورات الحملات الإعلانية.</li>
                                                            <li><strong>شركة: </strong> إنشاء تقارير سنوية وعروض تقديمية تفاعلية.</li>
                                                                </ul>

                                                                <hr />

                                                                <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                                    <ol>
                                                                    <li>سجل دخولك للموقع.</li>
                                                                        <li> اضغط "Create a design" واختر نوع التصميم(مثلاً Instagram Post).</li>
                                                                            <li> اختر قالباً من القائمة الجانبية.</li>
                                                                                <li> عدل النصوص والصور والألوان لتناسبك.</li>
                                                                                    <li> حمل التصميم بصيغة PNG أو PDF.</li>
                                                                                        </ol>

                                                                                        <hr />

                                                                                        <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                            <ul>
                                                                                            <li>المسوقين ومديري السوشيال ميديا.</li>
                                                                                                <li> أصحاب المشاريع الصغيرة.</li>
                                                                                                    <li> الطلاب والمعلمين.</li>
                                                                                                        <li> المصممين المبتدئين.</li>
                                                                                                            </ul>

                                                                                                            <hr />

                                                                                                            <h2>8) خطة الأسعار </h2>
                                                                                                                <ul>
                                                                                                                <li><strong>المجانية: </strong> كافية جداً للاستخدام الأساسي وآلاف القوالب.</li>
                                                                                                                    <li><strong>Pro(حوالي $12 / شهر): </strong> تفتح المكتبة الكاملة (صور بريميم)، أداة إزالة الخلفية، وتغيير المقاسات السحري.</li>
                                                                                                                        </ul>

                                                                                                                        <hr />

                                                                                                                        <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                                            <p> <strong>مقابل Photoshop: </strong> فوتوشوب هو للمحترفين للتحكم بكل بكسل، بينما كانفا للسرعة والإنتاجية لغير المصممين.<br>
                                                                                                                                <strong> مقابل Adobe Express: </strong> منافس قوي، لكن كانفا يتميز بمكتبة قوالب أضخم ومجتمع مستخدمين أكبر.</p>

                                                                                                                                    <hr />

                                                                                                                                    <h2> 10) الخلاصة </h2>
                                                                                                                                        <p> Canva هي الأداة التي يجب أن تكون في جيب كل شخص يعمل أونلاين. إنها توفر 80 % من احتياجات التصميم بـ 20 % من الجهد. الاشتراك في نسخة Pro يعتبر استثماراً ممتازاً.</p>
        `,
            en: `
                                                            <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                <img src="/images/tools/canva.png" alt = "Canva Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                    </div>
                                                                    <h2> 1) Introduction </h2>
    <p> Canva is a global graphic design platform aimed at "empowering the world to design"...</p>

    <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #8b5cf6; display: block; margin-bottom: 0.5rem;" >✨ Did you know?</strong>
                You can now use "Magic Edit" to replace parts of an image using AI.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> The complexity of professional design software. Canva removed the technical barrier.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Interface: </strong> Web browser or mobile app.</li>
    <li><strong>Magic Studio: </strong> Integrated AI tools.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Ease of Use: </strong> Takes minutes to learn.</li>
    <li><strong>Templates: </strong> Templates for everything.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Individual: </strong> Designing a wedding invitation or CV.</li>
    <li><strong>Team: </strong> Managing Brand Kits.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Log in.</li>
    <li>Click "Create a design".</li>
    <li>Choose a template.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Marketers and social media managers.</li>
    <li>Small business owners.</li>
    <li>Students and teachers.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> Sufficient for basic use.</li>
    <li><strong>Pro (~$12 / month): </strong> Unlocks the full library.</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs Photoshop: </strong> Photoshop is for professionals, Canva is for speed.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> Canva is a must-have for anyone working online. 80% of design needs with 20% effort.</p>
        `
        },
        category: "Design",
        link: "https://canva.com",
        featured: true,
        image: "/images/tools/canva.png",
        bestFor: [
            { ar: "تصميمات السوشيال ميديا السريعة", en: "Fast social media designs" },
            { ar: "العروض التقديمية", en: "Presentations" },
            { ar: "غير المصممين", en: "Non-designers" }
        ],
        notFor: [
            { ar: "تعديل الصور المتقدم (Photoshop)", en: "Advanced photo editing (Photoshop)" },
            { ar: "تصميم الشعارات الفيكتور (Illustrator)", en: "Vector logo design (Illustrator)" }
        ]
    },
    {
        id: "5",
        name: {
            ar: "Perplexity",
            en: "Perplexity"
        },
        slug: "perplexity",
        description: {
            ar: "محرك بحث ذكي يقدم إجابات دقيقة مع المصادر.",
            en: "A smart search engine providing accurate answers with sources."
        },
        content: {
            ar: `
                                                                                                                                            <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                                <img src="/images/tools/perplexity.png" alt = "Perplexity Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                    </div>
                                                                                                                                                    <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                        <p> Perplexity AI هو محرك "إجابات" يطمح ليكون بديلاً لجوغل...</p>

                                                                                                                                                             <div style="background: rgba(14, 165, 233, 0.1); border-right: 4px solid #0ea5e9; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                                 <strong style="color: #0ea5e9; display: block; margin-bottom: 0.5rem;" >🔍 ميزة خفية: </strong>
                استخدم وضع "Focus" واختر "Writing" إذا كنت تريد من Perplexity أن يكتب لك مقالاً أو إيميلاً دون البحث في الإنترنت، ليعمل كمساعد كتابة سريع ومجاني.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> إضاعة الوقت في تصفح الروابط(SEO spam) والمقالات الطويلة للوصول لمعلومة صغيرة. كذلك مشكلة "هلوسة" أدوات الذكاء الاصطناعي الأخرى، حيث يحلها Perplexity بالاعتماد الحصري على المصادر الحقيقية.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>التقنية: </strong> يجمع بين فهرس بحث ويب مباشر (Real-time index) ونماذج لغوية متطورة (LLMs) لصياغة الإجابة.</li>
                    <li><strong>Search Focus: </strong> يمكنك توجيه البحث ليكون في (الويب المفتوح، أوراق علمية، يوتيوب، ريديت).</li>
                        <li><strong>Pro Search: </strong> ميزة تطرح عليك أسئلة توضيحية لفهم قصدك بدقة قبل البحث.</li>
                            </ul>

                            <hr />

                            <h2>4) المزايا الأساسية </h2>
                                <ul>
                                <li><strong>المصداقية: </strong> كل جملة لها رقم مرجعي (Citation) ينقلك للمصدر.</li>
                                    <li><strong>حداثة المعلومات: </strong> متصل بالإنترنت لحظة بلحظة.</li>
                                        <li><strong>تعدد النماذج: </strong> يتيح لك التبديل بين GPT‑4 و Claude 3 و Sonar (نموذجهم الخاص).</li>
                                            <li><strong>خالي من الإعلانات: </strong> تجربة قراءة نظيفة.</li>
                                                </ul>

                                                <hr />

                                                <h2>5) حالات استخدام عملية </h2>
                                                    <ul>
                                                    <li><strong>فردي: </strong> التخطيط لرحلة سياحية (يعطيك جدولاً ومطاعم وروابط حجز).</li>
                                                        <li><strong>باحث: </strong> البحث عن دراسات سابقة لموضوع أكاديمي باستخدام فلتر "Academic".</li>
                                                            <li><strong>مالي: </strong> تحليل أداء سهم شركة معينة بناءً على آخر الأخبار المالية.</li>
                                                                </ul>

                                                                <hr />

                                                                <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                                    <ol>
                                                                    <li>ادخل موقع perplexity. ai(لا يلزم تسجيل للدخول المبدئي).</li>
                                                                        <li> اكتب سؤالك في المربع(مثلاً: ما هي أسباب التضخم العالمي حالياً؟).</li>
                                                                            <li> اقرأ الملخص، واضغط على المصادر للتوسع.</li>
                                                                                <li> استخدم قسم "Related" لمتابعة الأسئلة المقترحة.</li>
                                                                                    </ol>

                                                                                    <hr />

                                                                                    <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                        <ul>
                                                                                        <li>الباحثون والطلاب.</li>
                                                                                            <li> كتاب المقالات الصحفية.</li>
                                                                                                <li> المحللون الماليون.</li>
                                                                                                    <li> أي شخص يحب الحقائق السريعة الموثقة.</li>
                                                                                                        </ul>

                                                                                                        <hr />

                                                                                                        <h2>8) خطة الأسعار </h2>
                                                                                                            <ul>
                                                                                                            <li><strong>المجانية: </strong> بحث قياسي غير محدود، و5 محاولات Pro يومياً.</li>
                                                                                                                <li><strong>Pro($20 / شهر): </strong> بحث Pro غير محدود، اختيار ذكي للنماذج (GPT‑4, Opus)، ورفع ملفات لتحليلها.</li>
                                                                                                                    </ul>

                                                                                                                    <hr />

                                                                                                                    <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                                        <p> <strong>مقابل Google Gemini(Search): </strong> بيربليكسيتي أكثر تركيزاً على "المصادر" وواجهته أنظف بكثير.<br>
                                                                                                                            <strong> مقابل Google Search: </strong> أسرع في الوصول للإجابة النهائية، لكن جوجل أفضل للبحث عن المواقع والخدمات المحلية (خرائط، متاجر).</p>

                                                                                                                                <hr />

                                                                                                                                <h2> 10) الخلاصة </h2>
                                                                                                                                    <p> Perplexity هو مستقبل البحث. بمجرد أن تعتاد على الحصول على الإجابة مباشرة، سيصبح من الصعب عليك العودة للبحث التقليدي في جوجل.</p>
        `,
            en: `
                                                                                                                                            <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                                <img src="/images/tools/perplexity.png" alt = "Perplexity Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                    </div>
                                                                                                                                                    <h2> 1) Introduction </h2>
    <p> Perplexity AI is an "answer" engine aiming to be an alternative to Google...</p>

    <div style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid #0ea5e9; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #0ea5e9; display: block; margin-bottom: 0.5rem;" >🔍 Hidden Feature: </strong>
                Use "Focus" mode for specific source searching.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Time wasted browsing multiple links. Perplexity provides direct answers with citations.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Technology: </strong> Combines real-time web search with LLMs.</li>
    <li><strong>Sources: </strong> Always points to actual sources.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Credibility: </strong> Citations for every sentence.</li>
    <li><strong>Real-time: </strong> Connected to the live web.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Researcher: </strong> Finding academic citations.</li>
    <li><strong>Planner: </strong> Creating travel itineraries.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Visit perplexity.ai.</li>
    <li>Ask a question.</li>
    <li>Review sources.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Students and researchers.</li>
    <li>Analysts and writers.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> Standard search.</li>
    <li><strong>Pro ($20 / month): </strong> Advanced models and unlimited Pro Search.</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs Google Search: </strong> Faster for direct answers.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> Perplexity is the future of search.</p>
        `
        },
        category: "Productivity",
        link: "https://perplexity.ai",
        featured: true,
        image: "/images/tools/perplexity.png",
        bestFor: [
            { ar: "البحث الأكاديمي والتحقق من الحقائق", en: "Academic research and fact-checking" },
            { ar: "الحصول على إجابات مع مصادر", en: "Getting answers with sources" },
            { ar: "تلخيص الأخبار", en: "News summarization" }
        ],
        notFor: [
            { ar: "الكتابة الإبداعية", en: "Creative writing" },
            { ar: "توليد محتوى طويل", en: "Long-form content generation" }
        ]
    },
    {
        id: "6",
        name: {
            ar: "Claude 3.5",
            en: "Claude 3.5"
        },
        slug: "claude",
        description: {
            ar: "نموذج لغوي متفوق في البرمجة والتحليل المنطقي.",
            en: "An advanced language model superior in coding and logical analysis."
        },
        content: {
            ar: `
                                                                                                                                        <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                            <img src="/images/tools/claude.png" alt = "Claude Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                </div>
                                                                                                                                                <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                    <p> Claude هي عائلة نماذج ذكاء اصطناعي من شركة Anthropic...</p>

                                                                                                                                                        <div style="background: rgba(245, 158, 11, 0.1); border-right: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                            <strong style="color: #f59e0b; display: block; margin-bottom: 0.5rem;" >👨‍💻 للمبرمجين: </strong>
                عندما تطلب من Claude كتابة كود، اطلب منه وضعه في "Artifact". هذا سيتيح لك رؤية الكود وتشغيله(إذا كان HTML / JS) في نافذة جانبية فوراً دون الحاجة لنسخه.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> النصوص "الروبوتية" والمكررة التي تنتجها النماذج الأخرى، وقصر "الذاكرة"(Context Window). كلود يحل ذلك بأسلوب كتابة طبيعي جداً وذاكرة عملاقة تستوعب كتباً كاملة.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>Constitutional AI: </strong> تدريب يركز على جعل النموذج يتبع مبادئ أخلاقية صارمة.</li>
                    <li><strong>Artifacts: </strong> ميزة واجهة المستخدم التي تفتح نافذة جانبية لعرض الكود أو المستندات التي يولدها النموذج بشكل منفصل وتفاعلي.</li>
                        <li><strong>الرؤية(Vision): </strong> قدرة فائقة على تحليل المخططات البيانية والصور وقراءة الخط اليدوي.</li>
                            </ul>

                            <hr />

                            <h2>4) المزايا الأساسية </h2>
                                <ul>
                                <li><strong>البرمجة: </strong> يعتبره المطورون المساعد الأفضل حالياً لكتابة الكود وتصحيحه.</li>
                                    <li><strong>الكتابة الأدبية: </strong> فارق ملموس في صياغة الجمل والعبارات بشكل بليغ وغير مبتذل.</li>
                                        <li><strong>نافذة السياق(200K tokens): </strong> يمكنه قراءة وتحليل ملفات ضخمة جداً في أمر واحد.</li>
                                            </ul>

                                            <hr />

                                            <h2>5) حالات استخدام عملية </h2>
                                                <ul>
                                                <li><strong>مطور: </strong> لصق ملف كود كامل (أو عدة ملفات) وسؤال كلود عن سبب خطأ معين أو طلب إضافة ميزة جديدة.</li>
                                                    <li><strong>كاتب: </strong> المساعدة في صياغة بريد إلكتروني حساس ومهم بأسلوب دبلوماسي.</li>
                                                        <li><strong>محامي: </strong> رفع عقد قانوني طويل وطلب تلخيص البنود الخطرة فيه.</li>
                                                            </ul>

                                                            <hr />

                                                            <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                                <ol>
                                                                <li>اذهب لـ claude. ai.</li>
                                                                    <li> سجل بالبريد الإلكتروني.</li>
                                                                        <li> فعل ميزة "Artifacts" من إعدادات الحساب(Feature Preview) لتجربة أفضل.</li>
                                                                            <li> ابدأ المحادثة.</li>
                                                                                </ol>

                                                                                <hr />

                                                                                <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                    <ul>
                                                                                    <li>المبرمجون(بشكل أساسي).</li>
                                                                                    <li> الكتاب والمؤلفون.</li>
                                                                                        <li> المحللون الذين يتعاملون مع تقارير طويلة.</li>
                                                                                            </ul>

                                                                                            <hr />

                                                                                            <h2>8) خطة الأسعار </h2>
                                                                                                <ul>
                                                                                                <li><strong>المجانية: </strong> وصول للنموذج الأقوى Sonnet 3.5 لكن بعدد رسائل يومي محدود.</li>
                                                                                                    <li><strong>Pro($20 / شهر): </strong> استخدام أكبر بكثير للنموذج الأقوى، والوصول لنموذج Opus (الأضخم).</li>
                                                                                                        </ul>

                                                                                                        <hr />

                                                                                                        <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                            <p> <strong>مقابل ChatGPT: </strong> كلود يبدو "أكثر ذكاءً" وهدوءاً في الإجابات المعقدة، بينما ChatGPT أكثر مرحاً وتنوعاً في الميزات (صوت، توليد صور).<br>
                                                                                                                <strong> نصيحة: </strong> استخدم كلود للعمل الجاد والبرمجة، وChatGPT للاستخدام اليومي العام.</p>

                                                                                                                    <hr />

                                                                                                                    <h2> 10) الخلاصة </h2>
                                                                                                                        <p> Claude 3.5 Sonnet هو البطل الحالي في ساحة الذكاء الاصطناعي. إذا كنت مبرمجاً أو كاتباً، فهو ليس خياراً بل ضرورة. ميزة Artifacts وحدها تستحق التجربة.</p>
        `,
            en: `
                                                                                                                                        <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                            <img src="/images/tools/claude.png" alt = "Claude Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                </div>
                                                                                                                                                <h2> 1) Introduction </h2>
    <p> Claude is a family of AI models from Anthropic...</p>

    <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #f59e0b; display: block; margin-bottom: 0.5rem;" >👨‍💻 For Coders: </strong>
                Use "Artifacts" to view and run code side-by-side.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Robotic and repetitive text from other models. Claude provides human-like writing and a massive context window.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Constitutional AI: </strong> Training focused on AI safety and ethics.</li>
    <li><strong>Artifacts: </strong> UI feature for interactive code and document viewing.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Coding: </strong> Currently considered the best assistant for writing and debugging.</li>
    <li><strong>Human-like Writing: </strong> Distinguished for natural and expressive language.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Developers: </strong> Analyzing large codebases.</li>
    <li><strong>Writers: </strong> Drafting sensitive emails and documents.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Visit claude.ai.</li>
    <li>Sign up via email.</li>
    <li>Enable "Artifacts" in settings.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Programmers and software engineers.</li>
    <li>Writers and authors.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> Access to Claude 3.5 Sonnet (limited).</li>
    <li><strong>Pro ($20 / month): </strong> Higher usage limits.</li>
    </ul>

    <hr />

    <h2>9) Alternatives </h2>
    <p> <strong>vs ChatGPT: </strong> Claude is often smarter for complex reasoning and coding.</p>

    <hr />

    <h2> 10) Summary </h2>
    <p> Claude 3.5 Sonnet is the current champion of LLMs. A necessity for coders and writers.</p>
        `
        },
        category: "Chatbots",
        link: "https://anthropic.com",
        featured: true,
        image: "/images/tools/claude.png",
        bestFor: [
            { ar: "البرمجة (Coding) وتحليل الكود", en: "Coding and code analysis" },
            { ar: "الكتابة الطبيعية الشبيهة بالبشر", en: "Natural, human-like writing" },
            { ar: "تحليل المستندات الكبيرة", en: "Analyzing large documents" }
        ],
        notFor: [
            { ar: "توليد الصور", en: "Image generation" },
            { ar: "البحث المباشر في الإنترنت (أقل كفاءة)", en: "Live internet searching (less efficient)" }
        ]
    },
    {
        id: "7",
        name: {
            ar: "Gamma",
            en: "Gamma"
        },
        slug: "gamma",
        description: {
            ar: "إنشاء عروض تقديمية احترافية في ثوانٍ.",
            en: "Create professional presentations in seconds."
        },
        content: {
            ar: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/gamma.png" alt = "Gamma Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                         <p> Gamma هو بديل حديث لـ PowerPoint و Google Slides...</p>

                                                                                                                                             <div style="background: rgba(168, 85, 247, 0.1); border-right: 4px solid #a855f7; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                 <strong style="color: #a855f7; display: block; margin-bottom: 0.5rem;" >⚡ خدعة سريعة: </strong>
                يمكنك لصق رابط مقال أو مستند كامل في Gamma، وسيقول بتحويله إلى عرض تقديمي جذاب تلقائياً. لا داعي للنسخ واللصق اليدوي!
    </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> ساعات العمل المهدرة في تحريك المربعات وتنسيق الخطوط واختيار الألوان في برامج العروض التقليدية. Gamma يقول لك: "ركز على المحتوى، واترك التصميم لي".</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>Generative AI: </strong> تكتب الموضوع، فيولد لك الهيكل (Outline)، ثم يملأ الشرائح بالنصوص والصور المناسبة.</li>
                    <li><strong>التصميم المرن: </strong> لا يستخدم نظام الشرائح الجامد (Slides) بل "بطاقات" مرنة تتوسع حسب المحتوى، مما يجعله مثالياً للقراءة.</li>
                        </ul>

                        <hr />

                        <h2>4) المزايا الأساسية </h2>
                            <ul>
                            <li><strong>السرعة الخيالية: </strong> عرض تقديمي من 10 شرائح جاهز للعرض في أقل من دقيقة.</li>
                                <li><strong>التحرير بالمحادثة: </strong> لا يعجبك التصميم؟ تحدث مع الذكاء الاصطناعي: "اجعل الصور أصغر"، "استخدم ألواناً زرقاء"، وسينفذ.</li>
                                    <li><strong>تفاعلية: </strong> يمكنك تضمين فيديوهات يوتيوب، مواقع ويب، وتطبيقات مباشرة داخل العرض.</li>
                                        </ul>

                                        <hr />

                                        <h2>5) حالات استخدام عملية </h2>
                                            <ul>
                                            <li><strong>رائد أعمال: </strong> تجهيز عرض للمستثمرين (Pitch Deck) بسرعة.</li>
                                                <li><strong>مدرب: </strong> تحويل ملف PDF تعليمي إلى عرض تقديمي جذاب للدورة التدريبية.</li>
                                                    <li><strong>مسوق: </strong> إنشاء صفحة هبوط (Landing Page) بسيطة لمنتج جديد.</li>
                                                        </ul>

                                                        <hr />

                                                        <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                            <ol>
                                                            <li>سجل في Gamma. app.</li>
                                                                <li> اختر "Create New" ثم "Generate".</li>
                                                                    <li> حدد ما تريد(Presentation).</li>
                                                                        <li> اكتب الموضوع، مثلاً: "مستقبل الزراعة المائية".</li>
                                                                            <li> اختر الثيم(Theme) وشاهد السحر.</li>
                                                                                </ol>

                                                                                <hr />

                                                                                <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                    <ul>
                                                                                    <li>المتحدثون والمدربون.</li>
                                                                                        <li> فرق المبيعات.</li>
                                                                                            <li> الطلاب.</li>
                                                                                            <li> أي شخص يكره استخدام PowerPoint.</li>
                                                                                                </ul>

                                                                                                <hr />

                                                                                                <h2>8) خطة الأسعار </h2>
                                                                                                    <ul>
                                                                                                    <li><strong>المجانية: </strong> 400 نقطة عند التسجيل (تكفي لعدة عروض)، وعلامة مائية Gamma.</li>
                                                                                                        <li><strong>Plus($8 / شهر): </strong> إزالة العلامة المائية، تصدير PDF و PPT.</li>
                                                                                                            </ul>

                                                                                                            <hr />

                                                                                                            <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                                <p> <strong>مقابل PowerPoint Copilot: </strong> جاما أجمل بصرياً وأسهل وأكثر مرونة، بينما Copilot مفيد إذا كنت ملزماً ببيئة مايكروسوفت الرسمية.</p>

                                                                                                                    <hr />

                                                                                                                    <h2> 10) الخلاصة </h2>
                                                                                                                        <p> Gamma أداة "واو". ستذهل جمهورك بجودة العرض، والأهم أنك ستذهل نفسك من سرعة الإنجاز. جربها مرة واحدة ولن تعود للطرق القديمة.</p>
        `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/gamma.png" alt = "Gamma Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Gamma is a modern alternative to PowerPoint and Google Slides...</p>

    <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #a855f7; display: block; margin-bottom: 0.5rem;" >⚡ Quick Tip: </strong>
                Paste a link to an article or document, and Gamma will automatically convert it into a presentation.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Hours spent formatting slides. Gamma lets you focus on content while it handles the design.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Generative AI: </strong> Generates the structure and content for you.</li>
    <li><strong>Flexible Design: </strong> Uses "cards" instead of rigid slides.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Incredible Speed: </strong> 10-slide presentation in under a minute.</li>
    <li><strong>AI Editing: </strong> Edit your design by chatting with the AI.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Entrepreneurs: </strong> Creating Pitch Decks.</li>
    <li><strong>Trainers: </strong> Converting PDFs into engaging slides.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Sign up at Gamma.app.</li>
    <li>Select "Create New" > "Generate".</li>
    <li>Enter your topic and choose a theme.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Speakers and trainers.</li>
    <li>Sales teams and students.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> 400 credits to start.</li>
    <li><strong>Plus ($8 / month): </strong> Removes watermark.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Gamma is a "wow" tool for stunning presentations in record time.</p>
        `
        },
        category: "Design",
        link: "https://gamma.app",
        featured: true,
        image: "/images/tools/gamma.png",
        bestFor: [
            { ar: "إنشاء عرض تقديمي كامل في ثوانٍ", en: "Creating complete presentations in seconds" },
            { ar: "تحويل مستند نصي إلى عرض", en: "Converting text documents to presentations" }
        ],
        notFor: [
            { ar: "تصميم شرائح مخصصة ومعقدة جداً", en: "Very complex custom slide designs" },
            { ar: "التحكم الكامل في التحركات", en: "Full control over animations" }
        ]
    },
    {
        id: "8",
        name: {
            ar: "Suno",
            en: "Suno"
        },
        slug: "suno",
        description: {
            ar: "توليد أغاني وموسيقى كاملة بجودة استوديو.",
            en: "Generate full songs and music with studio quality."
        },
        content: {
            ar: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/suno.png" alt = "Suno Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                         <p> Suno v3 هو برنامج ذكاء اصطناعي متخصص في توليد الصوتيات...</p>

                                                                                                                                             <div style="background: rgba(239, 68, 68, 0.1); border-right: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                 <strong style="color: #ef4444; display: block; margin-bottom: 0.5rem;" >🎵 جرب هذا: </strong>
                اكتب في الوصف[Instrumental Break]أو[Guitar Solo] للتحكم في بنية الأغنية وإضافة فواصل موسيقية حماسية.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> صناعة الموسيقى كانت حكراً على ذوي المواهب والخبرة والآلات. Suno "دمقرط" الموسيقى، وجعل بإمكان أي شخص لديه فكرة أغنية أن يسمعها بصوت احترافي فوراً.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>التقنية: </strong> نموذج ذكاء اصطناعي يفهم الأنماط الموسيقية وبنية الأغاني وتوزيع الآلات.</li>
                    <li><strong>المدخلات: </strong> وصف الأغنية (Style) والكلمات (Lyrics) أو ترك الكلمات للذكاء الاصطناعي.</li>
                        <li><strong>المخرجات: </strong> ملف صوتي أو فيديو للأغنية.</li>
                            </ul>

                            <hr />

                            <h2>4) المزايا الأساسية </h2>
                                <ul>
                                <li><strong>الجودة المذهلة: </strong> الأصوات البشرية واقعية لدرجة مخيفة، مع التنفس والأداء العاطفي.</li>
                                    <li><strong>تنوع الأنماط: </strong> من الأوبرا إلى المهرجانات، ومن الروك إلى الموسيقى العربية الكلاسيكية.</li>
                                        <li><strong>السرعة: </strong> دقيقتين لإنتاج أغنية كاملة.</li>
                                            </ul>

                                            <hr />

                                            <h2>5) حالات استخدام عملية </h2>
                                                <ul>
                                                <li><strong>صانع محتوى: </strong> إنشاء موسيقى خلفية حصرية للفيديوهات لتجنب مشاكل حقوق النشر.</li>
                                                    <li><strong>مسوق: </strong> عمل "Jingle" أو أغنية إعلانية لمنتج بطريقة فكاهية.</li>
                                                        <li><strong>ترفيه شخصي: </strong> إهداء أغنية خاصة لصديق في عيد ميلاده بكلمات مضحكة.</li>
                                                            </ul>

                                                            <hr />

                                                            <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                                <ol>
                                                                <li>اذهب إلى Suno. com.</li>
                                                                    <li> اضغط "Create".</li>
                                                                        <li> فعل "Custom Mode".</li>
                                                                            <li> أدخل الكلمات(أو اطلب منه تأليفها)، وحدد النمط(مثلاً: Arabic Pop, Upbeat).</li>
                                                                                <li> اضغط Create واستمع.</li>
                                                                                    </ol>

                                                                                    <hr />

                                                                                    <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                        <ul>
                                                                                        <li>صناع الفيديو(يوتيوبرز).</li>
                                                                                            <li> وكالات الدعاية والإعلان.</li>
                                                                                                <li> الموسيقيين(لأخذ أفكار وتوزيعات أولية).</li>
                                                                                                </ul>

                                                                                                <hr />

                                                                                                <h2>8) خطة الأسعار </h2>
                                                                                                    <ul>
                                                                                                    <li><strong>المجانية: </strong> 50 نقطة يومياً (10 أغاني)، لكن <strong>لا تمتلك الحقوق التجارية</strong>.</li>
                                                                                                        <li> <strong>Pro($20 / شهر): </strong> <strong>ملكية تجارية كاملة للأغاني</strong>، ونقاط أكثر.</li>
                                                                                                            </ul>

                                                                                                            <hr />

                                                                                                            <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                                <p> <strong>مقابل Udio: </strong> المنافس الأقوى. Udio يتميز بجودة صوت "أنقى" أحياناً وتحكم أدق، لكن Suno أفضل في تماسك بناء الأغنية وسهولة الاستخدام والوصول لنتائج "Catchy" بسرعة.</p>

                                                                                                                    <hr />

                                                                                                                    <h2> 10) الخلاصة </h2>
                                                                                                                        <p> Suno هي أداة سحرية ستجعلك تضحك وتذهل. لأول مرة في التاريخ، يمكنك أن تكون "منتجاً موسيقياً" بمجرد كتابة بضع كلمات. جربها الآن! </p>
        `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/suno.png" alt = "Suno Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Suno v3 is an AI program specializing in audio generation...</p>

    <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #ef4444; display: block; margin-bottom: 0.5rem;" >🎵 Try this: </strong>
                Use [Instrumental Break] or [Guitar Solo] tags to control the song structure.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Music production was limited to those with talent and instruments. Suno "democratizes" music.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Technology: </strong> AI model that understands musical patterns and structure.</li>
    <li><strong>Input: </strong> Song description and lyrics.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Incredible Quality: </strong> Human voices are terrifyingly realistic.</li>
    <li><strong>Variety: </strong> From Opera to Rock, and everything in between.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Content Creators: </strong> Unique background music for videos.</li>
    <li><strong>Marketers: </strong> Creating catchy jingles for products.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Go to Suno.com.</li>
    <li>Click "Create".</li>
    <li>Use "Custom Mode" and enter your lyrics/style.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Video creators and YouTubers.</li>
    <li>Advertising agencies.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> 50 points daily.</li>
    <li><strong>Pro ($8 / month): </strong> Full commercial ownership of generated songs.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Suno is a magical tool that lets you be a music producer just by typing. Try it now!</p>
        `
        },
        category: "Design",
        link: "https://suno.com",
        featured: true,
        image: "/images/tools/suno.png",
        bestFor: [
            { ar: "توليد أغاني كاملة من الكلمات", en: "Generating full songs from lyrics" },
            { ar: "إنشاء موسيقى خلفية للفيديوهات", en: "Creating background music for videos" }
        ],
        notFor: [
            { ar: "التحكم الكامل بآلات معينة بمفردها", en: "Full control over individual instruments" },
            { ar: "التعديل الدقيق لنوتات معينة", en: "Fine-tuning specific notes" }
        ]
    },
    {
        id: "9",
        name: {
            ar: "HeyGen",
            en: "HeyGen"
        },
        slug: "heygen",
        description: {
            ar: "إنشاء أفاتار متحدث واقعي للفيديو.",
            en: "Create realistic speaking avatars for video."
        },
        content: {
            ar: `
                                                                                                                            <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                <img src="/images/tools/heygen.png" alt = "HeyGen Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                    </div>
                                                                                                                                    <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                        <p> HeyGen منصة رائدة في توليد الفيديو بالذكاء الاصطناعي...</p>

                                                                                                                                            <div style="background: rgba(99, 102, 241, 0.1); border-right: 4px solid #6366f1; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                <strong style="color: #6366f1; display: block; margin-bottom: 0.5rem;" >🌍 الوصول للعالمية: </strong>
                استخدم ميزة "Video Translate" لتحويل فيديوهاتك الحالية إلى الإسبانية أو اليابانية. النتيجة ستذهلك لأن حركة الشفاه ستتغير لتطابق اللغة الجديدة!
    </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> صعوبة وتكلفة إنتاج الفيديو(كاميرات، إضاءة، استوديو، ممثلين، إعادة تصوير عند الخطأ). HeyGen يلغي الحاجة للتصوير أصلاً، ويجعل تعديل الفيديو سهلاً مثل تعديل ملف Word.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>تقنية Lip - Sync: </strong> مطابقة حركة الشفاه مع الكلام بدقة متناهية.</li>
                    <li><strong>الاستنساخ(Cloning): </strong> يمكنك تصوير نفسك دقيقتين لإنشاء نسخة رقمية منك تتحدث أي لغة.</li>
                        <li><strong>الترجمة: </strong> يغير لغة الفيديو الأصلي ويعدل حركة الشفاه للمتحدث لتناسب اللغة الجديدة!</li>
                            </ul>

                            <hr />

                            <h2>4) المزايا الأساسية </h2>
                                <ul>
                                <li><strong>الواقعية: </strong> يصعب جداً تفريق الأفاتار الحديث عن البشر الحقيقيين.</li>
                                    <li><strong>تعدد اللغات: </strong> يدعم أكثر من 40 لغة بلهجات مختلفة وبجودة ممتازة.</li>
                                        <li><strong>القوالب: </strong> قوالب جاهزة للأخبار، التعليم، السوشيال ميديا.</li>
                                            </ul>

                                            <hr />

                                            <h2>5) حالات استخدام عملية </h2>
                                                <ul>
                                                <li><strong>شركة عالمية: </strong> الرئيس التنفيذي يرسل رسالة فيديو للموظفين بـ 10 لغات مختلفة بصوته وشكله.</li>
                                                    <li><strong>دورة تدريبية: </strong> إنشاء فيديوهات شرح دون الحاجة لظهور المدرب بشكله الحقيقي كل مرة.</li>
                                                        <li><strong>خدمة عملاء: </strong> بوت فيديو تفاعلي يجيب على الأسئلة.</li>
                                                            </ul>

                                                            <hr />

                                                            <h2>6) الخطوات الأساسية لبدء الاستخدام </h2>
                                                                <ol>
                                                                <li>سجل في HeyGen.</li>
                                                                    <li> اختر "Instance Avatar"(سريع) أو "Photo Avatar".</li>
                                                                        <li> اكتب النص(Script) الذي تريد قوله.</li>
                                                                            <li> اختر الصوت(يمكنك استنساخ صوتك).</li>
                                                                                <li> اضغط Submit وانتظر المعالجة.</li>
                                                                                    </ol>

                                                                                    <hr />

                                                                                    <h2>7) لمن تُعد الأداة مناسبة؟</h2>
                                                                                        <ul>
                                                                                        <li>فرق التدريب والتطوير(L & D).</li>
                                                                                            <li> صناع المحتوى التعليمي.</li>
                                                                                                <li> الشركات التي تستهدف أسواقاً عالمية بلغات متعددة.</li>
                                                                                                    </ul>

                                                                                                    <hr />

                                                                                                    <h2>8) خطة الأسعار </h2>
                                                                                                        <ul>
                                                                                                        <li><strong>المجانية: </strong> دقيقة واحدة رصيد (للتجربة)، بعلامة مائية.</li>
                                                                                                            <li><strong>Creator($24 / شهر): </strong> 15 دقيقة شهرياً، إزالة العلامة المائية، ومعالجة أسرع.</li>
                                                                                                                </ul>

                                                                                                                <hr />

                                                                                                                <h2>9) المقارنة مع أدوات بديلة </h2>
                                                                                                                    <p> <strong>مقابل D - ID: </strong> هيجين يتفوق بوضوح في واقعية الحركة وجودة الصورة، بينما D-ID كان السباق في تحريك الصور الثابتة.<br>
                                                                                                                        <strong> مقابل Synthesia: </strong> سينثسيا منافس شرس جداً ويركز على الشركات الكبرى، لكن HeyGen حالياً يقدم ميزة "Video Translate" التي لا تُضاهى.</p>

                                                                                                                            <hr />

                                                                                                                            <h2> 10) الخلاصة </h2>
                                                                                                                                <p> HeyGen هو الاستوديو الافتراضي المتكامل. إذا كنت تريد دخول عالم الفيديو ولكن الكاميرا تمثل عائقاً لك، فهذه الأداة هي الحل السحري.</p>
                                                                                                                                    `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/heygen.png" alt = "HeyGen Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> HeyGen is a leading AI platform for video generation...</p>

    <div style="background: rgba(99, 102, 241, 0.1); border-left: 4px solid #6366f1; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
    <strong style="color: #6366f1; display: block; margin-bottom: 0.5rem;" >🌍 Go Global: </strong>
                Use "Video Translate" to translate your videos into other languages with perfect lip-sync.
            </div>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> High cost and complexity of video production. HeyGen eliminates the need for cameras and studios.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Lip-Sync Tech: </strong> Perfectly matches mouth movements to speech.</li>
    <li><strong>Cloning: </strong> Create a digital version of yourself.</li>
    </ul>

    <hr />

    <h2>4) Key Advantages </h2>
    <ul>
    <li><strong>Realism: </strong> Hard to distinguish from real humans.</li>
    <li><strong>Multilingual: </strong> Supports over 40 languages.</li>
    </ul>

    <hr />

    <h2>5) Use Cases </h2>
    <ul>
    <li><strong>Global Companies: </strong> CEOs sending messages in multiple languages.</li>
    <li><strong>Trainers: </strong> Creating instructional videos without filming.</li>
    </ul>

    <hr />

    <h2>6) Basic Steps to Start </h2>
    <ol>
    <li>Sign up at HeyGen.</li>
    <li>Choose an avatar and enter your script.</li>
    <li>Submit and wait for processing.</li>
    </ol>

    <hr />

    <h2>7) Who is it for?</h2>
    <ul>
    <li>Training and development teams.</li>
    <li>Educational content creators.</li>
    </ul>

    <hr />

    <h2>8) Pricing </h2>
    <ul>
    <li><strong>Free: </strong> 1 free minute of video.</li>
    <li><strong>Creator ($24 / month): </strong> 15 minutes of video.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> HeyGen is the future of visual content. Perfect for those who are camera-shy or busy.</p>
        `
        },
        category: "Video",
        link: "https://heygen.com",
        featured: false,
        image: "/images/tools/heygen.png",
        bestFor: [
            { ar: "إنشاء فيديوهات تدريبية وشرح دون تصوير", en: "Creating training videos without filming" },
            { ar: "ترجمة فيديوهاتك للغات أخرى مع تعديل حركة الشفاه", en: "Translating videos with lip-syncing" }
        ],
        notFor: [
            { ar: "الأفلام السينمائية ذات الدراما العميقة", en: "Cinematic films with deep drama" },
            { ar: "الحركات الجسدية المعقدة جداً (حالياً)", en: "Very complex physical movements (currently)" }
        ]
    },
    // ========== أدوات البرمجة باللغة الطبيعية (Vibe Coding) ==========
    {
        id: "10",
        name: {
            ar: "Lovable",
            en: "Lovable"
        },
        slug: "lovable",
        description: {
            ar: "منصة لبناء تطبيقات كاملة من الوصف النصي فقط، بدون كتابة كود.",
            en: "Platform for building full apps from text descriptions, without writing code."
        },
        content: {
            ar: `
                                                                                                                                    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                        <img src="/images/tools/lovable.png" alt = "Lovable Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                            </div>
                                                                                                                                            <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                <p> Lovable(المعروفة سابقاً بـ GPT Engineer) هي منصة رائدة في عالم "Vibe Coding" - أسلوب برمجة جديد تصف فيه ما تريده بالكلام وتترك الذكاء الاصطناعي يكتب الكود. تدعي المنصة أنها أسرع 20 مرة من البرمجة التقليدية.</p>

                                                                                                                                                    <div style="background: rgba(34, 197, 94, 0.1); border-right: 4px solid #22c55e; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                        <strong style="color: #22c55e; display: block; margin-bottom: 0.5rem;" >🚀 ما هو Vibe Coding؟</strong>
                مصطلح صاغه Andrej Karpathy(أحد مؤسسي OpenAI) يصف أسلوباً جديداً في البرمجة حيث تركز على "وصف النتيجة" بدلاً من "كتابة الكود"، والذكاء الاصطناعي ينفذ.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> ملايين الأفكار تموت لأن أصحابها لا يملكون مهارات البرمجة أو ميزانية توظيف فريق تطوير. Lovable يزيل هذه العقبة تماماً ويمكّن أي شخص من تحويل فكرته لتطبيق عامل.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>Chat Mode: </strong> تحادث الذكاء الاصطناعي وتصف له ما تريد بالتفصيل.</li>
                    <li><strong>توليد Full - Stack: </strong> يكتب React + Tailwind للواجهة، و Supabase للباك إند (قاعدة البيانات والمصادقة).</li>
                        <li><strong>معاينة حية: </strong> ترى التطبيق يتشكل أمامك في الوقت الفعلي.</li>
                            <li><strong>GitHub Sync: </strong> الكود ملكك 100%، يمكن تصديره لـ GitHub ومتابعة العمل عليه يدوياً.</li>
                                </ul>

                                <hr />

                                <h2>4) أهم المميزات </h2>
                                    <ul>
                                    <li><strong>سرعة فائقة: </strong> بناء MVP في ساعات بدلاً من أسابيع.</li>
                                        <li><strong>كود حقيقي: </strong> لست محبوساً في المنصة، الكود مفتوح ونظيف.</li>
                                            <li><strong>تكامل Supabase: </strong> قاعدة بيانات ومصادقة وتخزين ملفات جاهز.</li>
                                                <li><strong>Multiplayer: </strong> يمكن لفريقك العمل معاً في الوقت الفعلي.</li>
                                                    <li><strong>نشر بنقرة واحدة: </strong> استضافة مجانية على سحابة Lovable.</li>
                                                        </ul>

                                                        <hr />

                                                        <h2>5) حالات الاستخدام </h2>
                                                            <ul>
                                                            <li><strong>رواد الأعمال: </strong> بناء MVP للتحقق من فكرة قبل الاستثمار الكبير.</li>
                                                                <li><strong>المسوقون: </strong> إنشاء صفحات هبوط وأدوات داخلية بسرعة.</li>
                                                                    <li><strong>الفرق الصغيرة: </strong> بناء أدوات إنتاجية مخصصة للفريق.</li>
                                                                        <li><strong>المعلمون: </strong> إنشاء تطبيقات تعليمية تفاعلية.</li>
                                                                            </ul>

                                                                            <hr />

                                                                            <h2>6) كيف تبدأ؟</h2>
                                                                                <ol>
                                                                                <li>ادخل على <a href="https://lovable.dev" target="_blank" > lovable. dev </a> وسجل حساباً مجانياً.</li>
                                                                                    <li>اضغط "Create New Project".</li>
                                                                                        <li> صف تطبيقك في الشات: "أريد تطبيق مهام يدعم المصادقة وتخزين المهام في قاعدة بيانات".</li>
                                                                                            <li> شاهد Lovable يبني التطبيق أمامك وتفاعل معه لتعديله.</li>
                                                                                                <li> انشر بنقرة واحدة أو صدّر الكود لـ GitHub.</li>
                                                                                                    </ol>

                                                                                                    <hr />

                                                                                                    <h2>7) الفئة المستهدفة </h2>
                                                                                                        <ul>
                                                                                                        <li>رواد الأعمال و "الـ Solo Founders" 👨‍💼</li>
                                                                                                            <li> مؤسسو الشركات الناشئة 🚀</li>
                                                                                                                <li> المصممون الذين يريدون تحويل تصميماتهم لتطبيقات 🎨</li>
                                                                                                                    <li> أي شخص لديه فكرة ولا يملك خبرة برمجية 💡</li>
                                                                                                                        </ul>

                                                                                                                        <hr />

                                                                                                                        <h2>8) التسعير </h2>
                                                                                                                            <ul>
                                                                                                                            <li><strong>مجاني: </strong> عدد محدود من الرسائل والمشاريع للتجربة.</li>
                                                                                                                                <li><strong>Starter: </strong> $20/شهر - لبناء مشاريع شخصية.</li>
                                                                                                                                    <li> <strong>Launch: </strong> $50/شهر - لإطلاق مشاريع حقيقية مع دعم أسرع.</li>
                                                                                                                                        <li> <strong>Teams: </strong> أسعار مخصصة للفرق.</li>
                                                                                                                                            </ul>

                                                                                                                                            <hr />

                                                                                                                                            <h2>9) مقارنة مع المنافسين </h2>
                                                                                                                                                <p> <strong>مقابل Bolt. new: </strong> كلاهما ممتازان، لكن Lovable أفضل للمشاريع الأكبر مع Supabase، بينما Bolt أسرع للتجارب السريعة.<br>
                                                                                                                                                    <strong> مقابل Replit Agent: </strong> Replit أفضل للمبرمجين الذين يريدون تحكماً أكبر، Lovable أفضل لغير المبرمجين.</p>

                                                                                                                                                        <hr />

                                                                                                                                                        <h2> 10) الخلاصة </h2>
                                                                                                                                                            <p> Lovable هو بوابتك لتحويل الأفكار إلى تطبيقات حقيقية دون كتابة سطر كود واحد. إذا كان لديك فكرة تطبيق تراودك منذ سنوات، الآن هو الوقت لتنفيذها.</p>
                                                                                                                                                                `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/lovable.png" alt = "Lovable Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Lovable (formerly GPT Engineer) is a pioneer in "Vibe Coding" - a new programming style where you describe what you want and AI writes the code.</p>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Ideas usually die because of lack of coding skills. Lovable removes this barrier.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Chat Mode: </strong> Describe your app in detail.</li>
    <li><strong>Full-Stack Generation: </strong> Generates React + Tailwind + Supabase.</li>
    </ul>

    <hr />

    <h2>4) Key Features </h2>
    <ul>
    <li><strong>Extreme Speed: </strong> Build an MVP in hours.</li>
    <li><strong>Real Code: </strong> Clean code that you can export to GitHub.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Lovable is your gateway to turning ideas into real apps without writing a single line of code.</p>
        `
        },
        category: "Coding",
        link: "https://lovable.dev",
        featured: true,
        image: "/images/tools/lovable.png",
        bestFor: [
            { ar: "بناء تطبيقات ويب كاملة (MVP) بسرعة", en: "Building full web apps (MVPs) quickly" },
            { ar: "الأشخاص الذين ليس لديهم خبرة في البرمجة", en: "People without coding experience" }
        ],
        notFor: [
            { ar: "التطبيقات ذات المنطق الرياضي المعقد جداً", en: "Apps with extremely complex mathematical logic" },
            { ar: "الألعاب ثلاثية الأبعاد الثقيلة", en: "Heavy 3D games" }
        ]
    },
    {
        id: "11",
        name: {
            ar: "Bolt.new",
            en: "Bolt.new"
        },
        slug: "bolt-new",
        description: {
            ar: "بناء وتشغيل تطبيقات ويب كاملة في المتصفح باستخدام الذكاء الاصطناعي.",
            en: "Build and run full web apps in the browser using AI."
        },
        content: {
            ar: `
                                                                                                                                                                <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                                                    <img src="/images/tools/bolt.png" alt = "Bolt. new Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                                        </div>
                                                                                                                                                                        <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                                            <p> Bolt. new من StackBlitz هو ثورة في عالم البرمجة السريعة. يجمع بين قوة Claude 3.5 Sonnet وتقنية WebContainers الفريدة لتشغيل Node. js مباشرة في المتصفح، مما يجعل البناء والتشغيل والنشر يحدث في ثوانٍ.</p>

                                                                                                                                                                                <div style="background: rgba(59, 130, 246, 0.1); border-right: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                                                    <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem;" >⚡ ما هي WebContainers؟</strong>
                تقنية من StackBlitz تُشغّل بيئة Node. js كاملة داخل المتصفح بدون أي تثبيت. هذا يعني أن الذكاء الاصطناعي يمكنه كتابة الكود، تشغيله، ورؤية الأخطاء وإصلاحها - كلها في المتصفح!
    </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> معظم أدوات الذكاء الاصطناعي تعطيك كوداً "نظرياً" يحتاج تجربة وإصلاح يدوي. Bolt يختلف: الكود يُنفَّذ فورياً، والذكاء الاصطناعي يرى الأخطاء ويصلحها بنفسه! </p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>الوصف النصي: </strong> تكتب ما تريده بالعربية أو الإنجليزية.</li>
                    <li><strong>توليد الكود: </strong> Claude يكتب الكود الكامل (Frontend + Backend).</li>
                        <li><strong>التنفيذ الفوري: </strong> WebContainers تُشغّل الكود في المتصفح مباشرة.</li>
                            <li><strong>التصحيح الذاتي: </strong> إذا ظهر خطأ، الذكاء الاصطناعي يراه ويصلحه تلقائياً.</li>
                                <li><strong>النشر: </strong> نشر بنقرة واحدة على Netlify.</li>
                                    </ul>

                                    <hr />

                                    <h2>4) أهم المميزات </h2>
                                        <ul>
                                        <li><strong>لا تثبيتات: </strong> كل شيء يعمل في المتصفح.</li>
                                            <li><strong>تصحيح تلقائي: </strong> الذكاء الاصطناعي يرى مخرجات الكونسول ويصلح الأخطاء.</li>
                                                <li><strong>دعم Frameworks: </strong> React, Next. js, Vue, Astro والمزيد.</li>
                                                    <li><strong>سرعة مذهلة: </strong> من الفكرة للتطبيق العامل في دقائق.</li>
                                                        <li><strong>كود قابل للتحرير: </strong> تستطيع تعديل أي سطر يدوياً.</li>
                                                            </ul>

                                                            <hr />

                                                            <h2>5) حالات الاستخدام </h2>
                                                                <ul>
                                                                <li><strong>Prototyping: </strong> تحويل أفكار سريعة لنماذج عاملة فوراً.</li>
                                                                    <li><strong>تعلم البرمجة: </strong> شاهد كيف يبني الذكاء الاصطناعي التطبيقات وتعلم منه.</li>
                                                                        <li><strong>الأدوات الداخلية: </strong> بناء أدوات مخصصة لفريقك.</li>
                                                                            <li><strong>المشاريع الجانبية: </strong> تنفيذ أفكارك بسرعة دون إعداد بيئة تطوير.</li>
                                                                                </ul>

                                                                                <hr />

                                                                                <h2>6) كيف تبدأ؟</h2>
                                                                                    <ol>
                                                                                    <li>ادخل على <a href="https://bolt.new" target="_blank" > bolt. new </a>.</li>
                                                                                        <li>سجّل حساباً بـ GitHub.</li>
                                                                                            <li> اكتب وصفاً لتطبيقك(مثلاً: "موقع لعرض وصفات الطبخ مع بحث وتصنيفات").</li>
                                                                                                <li> شاهد Bolt يبني التطبيق ويشغّله أمامك مباشرة.</li>
                                                                                                    <li> عدّل وأضف ميزات عبر الشات أو يدوياً في الكود.</li>
                                                                                                        </ol>

                                                                                                        <hr />

                                                                                                        <h2>7) الفئة المستهدفة </h2>
                                                                                                            <ul>
                                                                                                            <li>المطورون الذين يريدون بناء سريع 👨‍💻</li>
                                                                                                                <li> رواد الأعمال لبناء MVPs ⚡</li>
                                                                                                                    <li> المتعلمون الذين يريدون فهم البرمجة 📚</li>
                                                                                                                        <li> الفرق التي تحتاج أدوات داخلية سريعة 🛠️</li>
                                                                                                                            </ul>

                                                                                                                            <hr />

                                                                                                                            <h2>8) التسعير </h2>
                                                                                                                                <ul>
                                                                                                                                <li><strong>مجاني: </strong> 150K tokens يومياً (كافية للتجربة).</li>
                                                                                                                                    <li><strong>Pro: </strong> $20/شهر - tokens أكثر ودعم أولوي.</li>
                                                                                                                                        <li> <strong>Team: </strong> أسعار مخصصة.</li>
                                                                                                                                            </ul>
                                                                                                                                            <p> <strong>ملاحظة: </strong> المشاريع المعقدة تستهلك tokens بسرعة، خطط للاستخدام.</p>

                                                                                                                                                <hr />

                                                                                                                                                <h2> 9) مقارنة مع المنافسين </h2>
                                                                                                                                                    <p> <strong>مقابل Lovable: </strong> Bolt أسرع للتجارب السريعة، Lovable أفضل للمشاريع مع قواعد بيانات معقدة.<br>
                                                                                                                                                        <strong> مقابل Cursor: </strong> Cursor للمطورين المحترفين في بيئة IDE، Bolt للسرعة والبساطة في المتصفح.</p>

                                                                                                                                                            <hr />

                                                                                                                                                            <h2> 10) الخلاصة </h2>
                                                                                                                                                                <p> Bolt. new هو أسرع طريقة لتحويل الفكرة إلى تطبيق عامل. إذا كانت السرعة أولويتك، فهذه أداتك.</p>
                                                                                                                                                                    `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/bolt.png" alt = "Bolt. new Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Bolt.new by StackBlitz is a revolution in rapid prototyping. It combines Claude 3.5 Sonnet with WebContainers to run Node.js in your browser.</p>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Most AI tools give you "theoretical" code. Bolt runs it immediately and fixes errors itself.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Text Description: </strong> Write what you want.</li>
    <li><strong>Immediate Execution: </strong> WebContainers run the code in-browser.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Bolt.new is the fastest way to turn an idea into a working app. If speed is your priority, this is your tool.</p>
        `
        },
        category: "Coding",
        link: "https://bolt.new",
        featured: true,
        image: "/images/tools/bolt.png",
        bestFor: [
            { ar: "النماذج الأولية السريعة جداً", en: "Very rapid prototyping" },
            { ar: "إصلاح الأخطاء البرمجية تلقائياً", en: "Automatic bug fixing" }
        ],
        notFor: [
            { ar: "المشاريع الضخمة التي تتطلب سيرفرات خاصة", en: "Large projects requiring private servers" },
            { ar: "تطبيقات الهاتف الأصلية (Native)", en: "Native mobile apps" }
        ]
    },
    {
        id: "12",
        name: {
            ar: "Replit Agent",
            en: "Replit Agent"
        },
        slug: "replit-agent",
        description: {
            ar: "وكيل ذكاء اصطناعي يبني تطبيقات كاملة من الفكرة للنشر.",
            en: "AI agent that builds full apps from idea to deployment."
        },
        content: {
            ar: `
                                                                                                                                                                    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                                                        <img src="/images/tools/replit.png" alt = "Replit Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                                            </div>
                                                                                                                                                                            <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                                                <p> Replit Agent هو "مساعد برمجة" متكامل يتجاوز مجرد كتابة الكود. يمكنه إدارة المشروع بالكامل: من تحليل الفكرة، لكتابة الكود، لإصلاح الأخطاء، للنشر على الإنترنت.</p>

                                                                                                                                                                                    <div style="background: rgba(249, 115, 22, 0.1); border-right: 4px solid #f97316; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                                                        <strong style="color: #f97316; display: block; margin-bottom: 0.5rem;" >🤖 الفرق بين Agent و Ghostwriter </strong>
                Ghostwriter هو الإكمال التلقائي الذكي للكود. أما Agent فهو "وكيل" يدير المشروع بالكامل باستقلالية عالية - يفهم الصورة الكبيرة ويتخذ قرارات.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> بناء تطبيق يتطلب عادة: كتابة الكود، إعداد قاعدة البيانات، التعامل مع الاستضافة، إصلاح الأخطاء... Replit Agent يتعامل مع كل هذا، أنت فقط تصف ما تريد.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>وصف الفكرة: </strong> تكتب بالعربية أو الإنجليزية ما تريده.</li>
                    <li><strong>التخطيط: </strong> Agent يضع خطة ويشرح ما سيفعله.</li>
                        <li><strong>التنفيذ: </strong> يكتب الكود، ينشئ الملفات، يُعد قاعدة البيانات.</li>
                            <li><strong>الاختبار: </strong> يشغّل التطبيق ويتعامل مع الأخطاء.</li>
                                <li><strong>النشر: </strong> ينشر على رابط Replit عام جاهز للمشاركة.</li>
                                    </ul>

                                    <hr />

                                    <h2>4) أهم المميزات </h2>
                                        <ul>
                                        <li><strong>IDE كامل في المتصفح: </strong> لا حاجة لتثبيت أي شيء على جهازك.</li>
                                            <li><strong>دعم 50 + لغة برمجة: </strong> Python, JavaScript, Go, Rust, والمزيد.</li>
                                                <li><strong>Extended Thinking: </strong> تفكير عميق للمهام المعقدة.</li>
                                                    <li><strong>Web Search: </strong> يبحث في الإنترنت لإيجاد حلول محدثة.</li>
                                                        <li><strong>Replit DB & Auth: </strong> قاعدة بيانات ومصادقة مدمجة.</li>
                                                            <li><strong>التعاون الجماعي: </strong> يمكن لعدة أشخاص العمل على نفس المشروع.</li>
                                                                </ul>

                                                                <hr />

                                                                <h2>5) حالات الاستخدام </h2>
                                                                    <ul>
                                                                    <li><strong>تعلم البرمجة: </strong> أفضل بيئة للمبتدئين - شاهد، تعلم، طبّق.</li>
                                                                        <li><strong>Hackathons: </strong> بناء مشاريع سريعة في وقت محدود.</li>
                                                                            <li><strong>التطوير السريع: </strong> بناء واختبار APIs و Bots.</li>
                                                                                <li><strong>التعليم: </strong> منصة مثالية للجامعات والدورات.</li>
                                                                                    </ul>

                                                                                    <hr />

                                                                                    <h2>6) كيف تبدأ؟</h2>
                                                                                        <ol>
                                                                                        <li>ادخل على <a href="https://replit.com" target="_blank" > replit. com </a> وأنشئ حساباً.</li>
                                                                                            <li>اشترك في خطة Core للوصول لـ Agent.</li>
                                                                                                <li> اضغط "Create Repl" → "Agent".</li>
                                                                                                    <li> صف تطبيقك: "أريد تطبيق لتتبع العادات اليومية مع رسوم بيانية للتقدم".</li>
                                                                                                        <li> راقب Agent يبني ويسألك أسئلة توضيحية عند الحاجة.</li>
                                                                                                            </ol>

                                                                                                            <hr />

                                                                                                            <h2>7) الفئة المستهدفة </h2>
                                                                                                                <ul>
                                                                                                                <li>طلاب البرمجة والمبتدئون 👨‍🎓</li>
                                                                                                                    <li> المطورون المستقلون(Freelancers) 💻</li>
                                                                                                                        <li> الفرق الصغيرة التي تريد بيئة موحدة 👥</li>
                                                                                                                            <li> المعلمون ومقدمو الدورات التدريبية 📚</li>
                                                                                                                                </ul>

                                                                                                                                <hr />

                                                                                                                                <h2>8) التسعير </h2>
                                                                                                                                    <ul>
                                                                                                                                    <li><strong>Free: </strong> IDE كامل + Ghostwriter الأساسي.</li>
                                                                                                                                        <li><strong>Core: </strong> $25/شهر - Agent + 100 checkpoints + دعم أولوي.</li>
                                                                                                                                            <li> <strong>Teams: </strong> أسعار مخصصة للفرق والمؤسسات.</li>
                                                                                                                                                </ul>

                                                                                                                                                <hr />

                                                                                                                                                <h2>9) مقارنة مع المنافسين </h2>
                                                                                                                                                    <p> <strong>مقابل Cursor: </strong> Cursor للمطورين المحترفين على سطح المكتب، Replit للتعاون والسحابة والتعلم.<br>
                                                                                                                                                        <strong> مقابل Bolt / Lovable: </strong> Replit يوفر تحكماً برمجياً أكبر للمطورين، الآخران أسهل لغير المبرمجين.</p>

                                                                                                                                                            <hr />

                                                                                                                                                            <h2> 10) الخلاصة </h2>
                                                                                                                                                                <p> Replit Agent هو الخيار الأمثل إذا كنت تريد بيئة تطوير كاملة في السحابة مع وكيل ذكي يساعدك في كل خطوة.</p>
                                                                                                                                                                    `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/replit.png" alt = "Replit Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Replit Agent is a comprehensive "coding assistant" that manages the entire project lifecycle, from idea analysis to deployment.</p>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Building an app requires many steps: coding, database setup, hosting. Replit Agent handles all of this automatically.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Idea Description: </strong> Write what you want in natural language.</li>
    <li><strong>Planning: </strong> The Agent creates a plan and explains it.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Replit Agent is the perfect choice if you want a complete cloud development environment with an intelligent agent helping you every step.</p>
        `
        },
        category: "Coding",
        link: "https://replit.com",
        featured: true,
        image: "/images/tools/replit.png",
        bestFor: [
            { ar: "بناء تطبيقات كاملة مع قواعد بيانات", en: "Building full apps with databases" },
            { ar: "المبتدئين في البرمجة", en: "Beginners in programming" }
        ],
        notFor: [
            { ar: "التطبيقات التي تتطلب موارد جهاز عالية جداً", en: "Apps requiring very high hardware resources" },
            { ar: "المشاريع التي تتطلب خصوصية بيانات قصوى محلياً", en: "Projects requiring extreme local data privacy" }
        ]
    },
    {
        id: "13",
        name: {
            ar: "Cursor",
            en: "Cursor"
        },
        slug: "cursor",
        description: {
            ar: "محرر أكواد ذكي مبني على VS Code مع قوة الذكاء الاصطناعي.",
            en: "Intelligent code editor built on VS Code with the power of AI."
        },
        content: {
            ar: `
                                                                                                                                                                    <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                                                        <img src="/images/tools/cursor.png" alt = "Cursor Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                                                            </div>
                                                                                                                                                                            <h2> 1) مقدمة عن الأداة </h2>
                                                                                                                                                                                <p> Cursor هو "VS Code on Steroids" - محرر أكواد احترافي يدمج أقوى نماذج الذكاء الاصطناعي(GPT‑4, Claude) مباشرة في تجربة البرمجة. إنه الخيار المفضل للمطورين المحترفين الذين يريدون تسريع عملهم بشكل كبير.</p>

                                                                                                                                                                                    <div style="background: rgba(147, 51, 234, 0.1); border-right: 4px solid #9333ea; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;" >
                                                                                                                                                                                        <strong style="color: #9333ea; display: block; margin-bottom: 0.5rem;" >💡 لماذا Cursor وليس Copilot؟</strong>
                GitHub Copilot رائع للإكمال التلقائي، لكن Cursor يتفوق بـ: فهم قاعدة الكود بالكامل، Agent Mode للمهام المعقدة، وإمكانية التعديل على ملفات متعددة بأمر واحد.
            </div>

    <hr />

    <h2>2) المشكلة التي تعالجها الأداة </h2>
        <p> الـ Copilot العادي يفهم فقط الملف الحالي. لكن عند العمل على مشاريع كبيرة، تحتاج للذكاء الاصطناعي أن يفهم كل الكودبيس - الملفات، العلاقات، الأنماط. Cursor يفعل ذلك.</p>

            <hr />

            <h2>3) كيف تعمل الأداة؟</h2>
                <ul>
                <li><strong>Codebase Indexing: </strong> يحلل كل ملفات مشروعك ويفهم العلاقات بينها.</li>
                    <li><strong>Chat(Cmd + L): </strong> تحدث مع الذكاء الاصطناعي وهو يفهم سياق مشروعك بالكامل.</li>
                        <li><strong>Inline Edit(Cmd + K): </strong> ظلل كوداً واكتب ما تريد تغييره.</li>
                            <li><strong>Agent Mode: </strong> اعطه مهمة معقدة وسينفذها عبر ملفات متعددة.</li>
                                <li><strong>Tab Autocomplete: </strong> إكمال تلقائي ذكي يتنبأ بالأسطر القادمة.</li>
                                    </ul>

                                    <hr />

                                    <h2>4) أهم المميزات </h2>
                                        <ul>
                                        <li><strong>يفهم الكودبيس: </strong> اسأله عن أي جزء من مشروعك وسيجيبك.</li>
                                            <li><strong>تعديلات متعددة الملفات: </strong> "غيّر اسم هذه الدالة في كل مكان تُستخدم فيه".</li>
                                                <li><strong>Agent Mode: </strong> ينفذ مهام معقدة ويشغّل أوامر في Terminal.</li>
                                                    <li><strong>دعم VS Code Extensions: </strong> كل إضافاتك المفضلة تعمل.</li>
                                                        <li><strong>Privacy Mode: </strong> خيار لعدم إرسال الكود للسيرفرات.</li>
                                                            </ul>

                                                            <hr />

                                                            <h2>5) حالات الاستخدام </h2>
                                                                <ul>
                                                                <li><strong>Refactoring: </strong> إعادة هيكلة كود قديم بأوامر بسيطة.</li>
                                                                    <li><strong>فهم كود جديد: </strong> "اشرح لي كيف تعمل هذه الميزة في المشروع".</li>
                                                                        <li><strong>Debugging: </strong> ألصق الخطأ واطلب الحل مع فهم السياق.</li>
                                                                            <li><strong>كتابة Tests: </strong> "اكتب unit tests لهذه الدالة".</li>
                                                                                <li><strong>توليد كود: </strong> "أنشئ API endpoint لـ user authentication".</li>
                                                                                    </ul>

                                                                                    <hr />

                                                                                    <h2>6) كيف تبدأ؟</h2>
                                                                                        <ol>
                                                                                        <li>حمّل Cursor من <a href="https://cursor.com" target="_blank" > cursor. com </a>.</li>
                                                                                            <li>استورد إعدادات VS Code الخاصة بك(اختياري).</li>
                                                                                                <li> افتح أي مشروع موجود.</li>
                                                                                                    <li> اضغط Cmd + L للشات أو Cmd + K للتعديل السريع.</li>
                                                                                                        <li> جرّب Agent Mode بكتابة "@ agent" في الشات.</li>
                                                                                                            </ol>

                                                                                                            <hr />

                                                                                                            <h2>7) الفئة المستهدفة </h2>
                                                                                                                <ul>
                                                                                                                <li>المطورون المحترفون 💻</li>
                                                                                                                    <li> فرق التطوير في الشركات 🏢</li>
                                                                                                                        <li> مطورو الـ Open Source 🌐</li>
                                                                                                                            <li> أي شخص يكتب كود يومياً ⌨️</li>
                                                                                                                                </ul>

                                                                                                                                <hr />

                                                                                                                                <h2>8) التسعير </h2>
                                                                                                                                    <ul>
                                                                                                                                    <li><strong>Free: </strong> 2000 completions + 50 slow premium requests/شهر.</li>
                                                                                                                                        <li> <strong>Pro: </strong> $20/شهر - 500 fast requests + unlimited slow.</li>
                                                                                                                                            <li> <strong>Business: </strong> $40/شهر - للفرق مع admin controls.</li>
                                                                                                                                                </ul>

                                                                                                                                                <hr />

                                                                                                                                                <h2>9) مقارنة مع المنافسين </h2>
                                                                                                                                                    <p> <strong>مقابل GitHub Copilot: </strong> Cursor يفهم المشروع كاملاً ويوفر Agent Mode، Copilot أبسط وأرخص.<br>
                                                                                                                                                        <strong> مقابل Windsurf(Codeium): </strong> منافس جديد وقوي، لكن Cursor أكثر نضجاً والمجتمع أكبر.</p>

                                                                                                                                                            <hr />

                                                                                                                                                            <h2> 10) الخلاصة </h2>
                                                                                                                                                                <p> Cursor هو الخيار الأفضل للمطورين المحترفين الذين يريدون ذكاءً اصطناعياً "يفهم" مشاريعهم بالفعل. إذا كنت تكتب كود يومياً، ستوفر ساعات أسبوعياً.</p>
                                                                                                                                                                    `,
            en: `
                                                                                                                             <div style="width: 100%; text-align: center; margin-bottom: 2rem;" >
                                                                                                                                 <img src="/images/tools/cursor.png" alt = "Cursor Logo" style="width: 120px; height: 120px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" >
                                                                                                                                     </div>
                                                                                                                                     <h2> 1) Introduction </h2>
    <p> Cursor is "VS Code on Steroids" - a professional code editor that integrates powerful AI models (GPT-4, Claude) directly into the coding experience.</p>

    <hr />

    <h2>2) Problem Solved </h2>
    <p> Standard Copilots only understand the current file. Cursor understands your entire codebase.</p>

    <hr />

    <h2>3) How it works?</h2>
    <ul>
    <li><strong>Codebase Indexing: </strong> Analyzes all your files to understand relationships.</li>
    <li><strong>Agent Mode: </strong> Executes complex tasks across multiple files.</li>
    </ul>

    <hr />

    <h2> 10) Summary </h2>
    <p> Cursor is the best choice for professional developers who want AI that actually "understands" their projects.</p>
        `
        },
        category: "Coding",
        link: "https://cursor.com",
        featured: true,
        image: "/images/tools/cursor.png",
        bestFor: [
            { ar: "المطورين المحترفين لإسراع الإنتاجية", en: "Professional developers to speed up productivity" },
            { ar: "إعادة هيكلة الكود (Refactoring) وتغييرات الملفات المتعددة", en: "Code refactoring and multi-file changes" }
        ],
        notFor: [
            { ar: "غير المبرمجين الذين يريدون بناء تطبيق بدون كود", en: "Non-programmers who want to build without code" },
            { ar: "المهام البسيطة جداً التي لا تحتاج ذكاء اصطناعي", en: "Very simple tasks that don't need AI" }
        ]
    },
    // === أدوات الكتابة والمحتوى ===
    {
        id: "14",
        name: {
            ar: "Jasper",
            en: "Jasper"
        },
        slug: "jasper",
        description: {
            ar: "أداة كتابة محتوى تسويقي بالذكاء الاصطناعي للشركات.",
            en: "AI marketing content writing tool for businesses."
        },
        content: {
            ar: `<p>Jasper هو منصة كتابة بالذكاء الاصطناعي مصممة خصيصاً للفرق التسويقية. يساعد في إنشاء محتوى تسويقي، إعلانات، ومقالات بسرعة فائقة مع الحفاظ على صوت العلامة التجارية.</p> <h3>المميزات </h3><ul><li>قوالب جاهزة للإعلانات والإيميلات</li> <li>دعم أكثر من 25 لغة </li><li>تكامل مع Surfer SEO</li> </ul>`,
            en: `<p>Jasper is an AI writing platform designed specifically for marketing teams. It helps create marketing content, ads, and articles at super speed while maintaining brand voice.</p> <h3>Features</h3><ul><li>Ready-made templates for ads and emails</li> <li>Supports over 25 languages</li><li>Integration with Surfer SEO</li></ul>`
        },
        category: "Productivity",
        link: "https://jasper.ai",
        featured: false,
        image: "https://logo.clearbit.com/jasper.ai"
    },
    {
        id: "15",
        name: {
            ar: "Copy. ai",
            en: "Copy.ai"
        },
        slug: "copyai",
        description: {
            ar: "مولد نصوص تسويقية وإعلانية بالذكاء الاصطناعي.",
            en: "AI-powered marketing and ad copy generator."
        },
        content: {
            ar: `<p>Copy. ai متخصص في توليد نصوص قصيرة وجذابة للإعلانات، وسائل التواصل، والتسويق. مثالي للمسوقين ورواد الأعمال.</p><h3>الاستخدامات</h3><ul><li>كتابة إعلانات Facebook/Instagram</li><li>وصف المنتجات</li><li>عناوين جذابة</li></ul>`,
            en: `<p>Copy.ai specializes in generating short, engaging copy for ads, social media, and marketing. Perfect for marketers and entrepreneurs.</p><h3>Use Cases</h3><ul><li>Writing Facebook/Instagram ads</li><li>Product descriptions</li><li>Catchy headlines</li></ul>`
        },
        category: "Productivity",
        link: "https://copy.ai",
        featured: false,
        image: "https://logo.clearbit.com/copy.ai"
    },
    {
        id: "16",
        name: {
            ar: "Writesonic",
            en: "Writesonic"
        },
        slug: "writesonic",
        description: {
            ar: "منصة كتابة شاملة للمقالات والمحتوى بالـ AI.",
            en: "All-in-one platform for writing articles and content with AI."
        },
        content: {
            ar: `<p>Writesonic يقدم مجموعة أدوات كتابة متكاملة تشمل مولد مقالات، أداة إعادة صياغة، ومحرر SEO.</p>`,
            en: `<p>Writesonic offers an integrated suite of writing tools including an article generator, paraphrasing tool, and SEO editor.</p>`
        },
        category: "Productivity",
        link: "https://writesonic.com",
        featured: false,
        image: "https://logo.clearbit.com/writesonic.com"
    },
    {
        id: "17",
        name: {
            ar: "Grammarly",
            en: "Grammarly"
        },
        slug: "grammarly",
        description: {
            ar: "مدقق لغوي ونحوي ذكي للكتابة بالإنجليزية.",
            en: "Intelligent grammar and spelling checker for English writing."
        },
        content: {
            ar: `<p>أداة تدقيق لغوي تستخدم AI لتحسين كتاباتك الإنجليزية من حيث القواعد، الأسلوب، والوضوح.</p>`,
            en: `<p>A grammar checking tool that uses AI to improve your English writing in terms of grammar, style, and clarity.</p>`
        },
        category: "Productivity",
        link: "https://grammarly.com",
        featured: false,
        image: "https://logo.clearbit.com/grammarly.com"
    },
    {
        id: "18",
        name: {
            ar: "QuillBot",
            en: "QuillBot"
        },
        slug: "quillbot",
        description: {
            ar: "أداة إعادة صياغة وتلخيص النصوص بذكاء.",
            en: "Intelligent paraphrasing and summarizing tool."
        },
        content: {
            ar: `<p>QuillBot يعيد صياغة النصوص بأساليب متعددة، مع أدوات للتلخيص والتدقيق اللغوي.</p>`,
            en: `<p>QuillBot paraphrases text in multiple styles, with tools for summarizing and grammar checking.</p>`
        },
        category: "Productivity",
        link: "https://quillbot.com",
        featured: false,
        image: "https://logo.clearbit.com/quillbot.com"
    },
    {
        id: "19",
        name: {
            ar: "Rytr",
            en: "Rytr"
        },
        slug: "rytr",
        description: {
            ar: "مساعد كتابة ميسور التكلفة للمحتوى المتنوع.",
            en: "Affordable AI writing assistant for various content types."
        },
        content: {
            ar: `<p>خيار اقتصادي لكتابة المحتوى بالذكاء الاصطناعي، يدعم أكثر من 30 لغة و20+ قالب.</p>`,
            en: `<p>An affordable option for AI content writing, supports over 30 languages and 20+ templates.</p>`
        },
        category: "Productivity",
        link: "https://rytr.me",
        featured: false,
        image: "https://logo.clearbit.com/rytr.me"
    },

    {
        id: "21",
        name: {
            ar: "DALL-E 3",
            en: "DALL-E 3"
        },
        slug: "dalle",
        description: {
            ar: "مولد صور من OpenAI متكامل مع ChatGPT.",
            en: "OpenAI image generator integrated with ChatGPT."
        },
        content: {
            ar: `<p>DALL-E 3 متكامل مع ChatGPT Plus ويفهم الأوامر المعقدة بشكل أفضل من أي منافس.</p>`,
            en: `<p>DALL-E 3 is integrated with ChatGPT Plus and understands complex commands better than any competitor.</p>`
        },
        category: "Design",
        link: "https://openai.com/dall-e-3",
        featured: true,
        image: "https://logo.clearbit.com/openai.com",
        bestFor: [
            { ar: "سهولة الاستخدام عبر الدردشة", en: "Ease of use via chat" },
            { ar: "فهم الأوامر المعقدة والحرفية", en: "Understanding complex and literal commands" }
        ],
        notFor: [
            { ar: "التحكم الاحترافي الدقيق في المعاييv", en: "Precise professional control over parameters" }
        ]
    },
    {
        id: "22",
        name: {
            ar: "Stable Diffusion",
            en: "Stable Diffusion"
        },
        slug: "stable-diffusion",
        description: {
            ar: "نموذج مفتوح المصدر لتوليد الصور.",
            en: "Open-source model for image generation."
        },
        content: {
            ar: `<p>نموذج مفتوح المصدر يمكن تشغيله محلياً، مما يوفر خصوصية وتحكم كامل.</p>`,
            en: `<p>Open-source model that can be run locally, providing full privacy and control.</p>`
        },
        category: "Design",
        link: "https://stability.ai",
        featured: false,
        image: "https://logo.clearbit.com/stability.ai"
    },
    {
        id: "23",
        name: {
            ar: "Leonardo. ai",
            en: "Leonardo.ai"
        },
        slug: "leonardo",
        description: {
            ar: "منصة توليد صور للألعاب والأصول الرقمية.",
            en: "Image generation platform for games and digital assets."
        },
        content: {
            ar: `<p>متخصص في توليد أصول للألعاب والتطبيقات مع نماذج قابلة للتخصيص.</p>`,
            en: `<p>Specializes in generating assets for games and apps with customizable models.</p>`
        },
        category: "Design",
        link: "https://leonardo.ai",
        featured: false,
        image: "https://logo.clearbit.com/leonardo.ai"
    },
    {
        id: "24",
        name: {
            ar: "Ideogram",
            en: "Ideogram"
        },
        slug: "ideogram",
        description: {
            ar: "الأفضل في توليد صور تحتوي على نصوص.",
            en: "The best for generating images containing text."
        },
        content: {
            ar: `<p>يتفوق على المنافسين في إدراج نصوص واضحة داخل الصور المولدة.</p>`,
            en: `<p>Excels at inserting clear text within generated images.</p>`
        },
        category: "Design",
        link: "https://ideogram.ai",
        featured: false,
        image: "https://logo.clearbit.com/ideogram.ai"
    },
    {
        id: "25",
        name: {
            ar: "Flux",
            en: "Flux"
        },
        slug: "flux",
        description: {
            ar: "نموذج توليد صور جديد بجودة فائقة.",
            en: "New image generation model with superior quality."
        },
        content: {
            ar: `<p>من Black Forest Labs، يقدم جودة منافسة لـ Midjourney مع سرعة أعلى.</p>`,
            en: `<p>From Black Forest Labs, offers quality competing with Midjourney with higher speed.</p>`
        },
        category: "Design",
        link: "https://blackforestlabs.ai",
        featured: false,
        image: "https://logo.clearbit.com/blackforestlabs.ai"
    },
    {
        id: "26",
        name: {
            ar: "Adobe Firefly",
            en: "Adobe Firefly"
        },
        slug: "firefly",
        description: {
            ar: "مولد صور من Adobe متكامل مع Creative Cloud.",
            en: "Adobe image generator integrated with Creative Cloud."
        },
        content: {
            ar: `<p>مدرب على محتوى مرخص، مثالي للاستخدام التجاري.</p>`,
            en: `<p>Trained on licensed content, ideal for commercial use.</p>`
        },
        category: "Design",
        link: "https://firefly.adobe.com",
        featured: false,
        image: "https://logo.clearbit.com/adobe.com"
    },
    // === أدوات الفيديو ===
    {
        id: "27",
        name: {
            ar: "Runway",
            en: "Runway"
        },
        slug: "runway",
        description: {
            ar: "منصة توليد وتحرير فيديو بالذكاء الاصطناعي.",
            en: "AI video generation and editing platform."
        },
        content: {
            ar: `<p>Runway Gen-2 و Gen-3 يوفران أدوات متقدمة لتوليد وتحرير الفيديو بالـ AI.</p>`,
            en: `<p>Runway Gen-2 and Gen-3 provide advanced tools for AI video generation and editing.</p>`
        },
        category: "Design",
        link: "https://runwayml.com",
        featured: true,
        image: "https://logo.clearbit.com/runwayml.com"
    },
    {
        id: "28",
        name: {
            ar: "Pika",
            en: "Pika"
        },
        slug: "pika",
        description: {
            ar: "تحويل النص والصور إلى فيديوهات قصيرة.",
            en: "Convert text and images into short videos."
        },
        content: {
            ar: `<p>أداة سهلة لتحويل الأفكار إلى فيديوهات قصيرة متحركة.</p>`,
            en: `<p>An easy tool to turn ideas into short animated videos.</p>`
        },
        category: "Design",
        link: "https://pika.art",
        featured: false,
        image: "https://logo.clearbit.com/pika.art"
    },
    {
        id: "29",
        name: {
            ar: "Luma Dream Machine",
            en: "Luma Dream Machine"
        },
        slug: "luma",
        description: {
            ar: "توليد فيديو واقعي من النصوص.",
            en: "Generate realistic video from text."
        },
        content: {
            ar: `<p>يولد فيديوهات واقعية بشكل مذهل من وصف نصي بسيط.</p>`,
            en: `<p>Generates stunningly realistic videos from simple text descriptions.</p>`
        },
        category: "Design",
        link: "https://lumalabs.ai",
        featured: false,
        image: "https://logo.clearbit.com/lumalabs.ai"
    },
    {
        id: "30",
        name: {
            ar: "Synthesia",
            en: "Synthesia"
        },
        slug: "synthesia",
        description: {
            ar: "إنشاء فيديوهات بأفاتار AI بدون كاميرا.",
            en: "Create videos with AI avatars without a camera."
        },
        content: {
            ar: `<p>أنشئ فيديوهات احترافية مع متحدثين رقميين بعشرات اللغات.</p>`,
            en: `<p>Create professional videos with digital speakers in dozens of languages.</p>`
        },
        category: "Design",
        link: "https://synthesia.io",
        featured: false,
        image: "https://logo.clearbit.com/synthesia.io"
    },
    {
        id: "31",
        name: {
            ar: "D-ID",
            en: "D-ID"
        },
        slug: "d-id",
        description: {
            ar: "تحريك الصور الثابتة وإنشاء أفاتار ناطقة.",
            en: "Animate still images and create speaking avatars."
        },
        content: {
            ar: `<p>حوّل أي صورة ثابتة إلى فيديو متحرك ناطق.</p>`,
            en: `<p>Convert any still image into a speaking animated video.</p>`
        },
        category: "Design",
        link: "https://d-id.com",
        featured: false,
        image: "https://logo.clearbit.com/d-id.com"
    },
    {
        id: "32",
        name: {
            ar: "Kling AI",
            en: "Kling AI"
        },
        slug: "kling",
        description: {
            ar: "مولد فيديو صيني بجودة عالية جداً.",
            en: "Chinese video generator with very high quality."
        },
        content: {
            ar: `<p>من Kuaishou، ينافس Runway بفيديوهات طويلة وواقعية.</p>`,
            en: `<p>From Kuaishou, competes with Runway with long and realistic videos.</p>`
        },
        category: "Design",
        link: "https://klingai.com",
        featured: false,
        image: "https://logo.clearbit.com/kuaishou.com"
    },
    // === أدوات الصوت ===
    {
        id: "33",
        name: {
            ar: "ElevenLabs",
            en: "ElevenLabs"
        },
        slug: "elevenlabs",
        description: {
            ar: "أفضل أداة لتوليد أصوات بشرية واقعية.",
            en: "The best tool for generating realistic human voices."
        },
        content: {
            ar: `<p>توليد أصوات بشرية بجودة استثنائية، مع استنساخ الصوت وتعدد اللغات.</p>`,
            en: `<p>Generating human voices with exceptional quality, with voice cloning and multi-language support.</p>`
        },
        category: "Productivity",
        link: "https://elevenlabs.io",
        featured: true,
        image: "https://logo.clearbit.com/elevenlabs.io"
    },
    {
        id: "34",
        name: {
            ar: "Descript",
            en: "Descript"
        },
        slug: "descript",
        description: {
            ar: "تحرير الصوت والفيديو عبر تحرير النص.",
            en: "Edit audio and video by editing text."
        },
        content: {
            ar: `<p>حرر الفيديو والبودكاست بتحرير النص المكتوب. ثوري!</p>`,
            en: `<p>Edit video and podcasts by editing the written text. Revolutionary!</p>`
        },
        category: "Productivity",
        link: "https://descript.com",
        featured: false,
        image: "https://logo.clearbit.com/descript.com"
    },
    {
        id: "35",
        name: {
            ar: "Whisper",
            en: "Whisper"
        },
        slug: "whisper",
        description: {
            ar: "نموذج تحويل الصوت إلى نص من OpenAI.",
            en: "OpenAI's speech-to-text model."
        },
        content: {
            ar: `<p>نموذج مفتوح المصدر لتحويل الكلام لنص بدقة عالية وعشرات اللغات.</p>`,
            en: `<p>Open-source model for high-accuracy speech-to-text conversion in dozens of languages.</p>`
        },
        category: "Productivity",
        link: "https://openai.com/whisper",
        featured: false,
        image: "https://logo.clearbit.com/openai.com"
    },
    {
        id: "36",
        name: {
            ar: "Murf. ai",
            en: "Murf.ai"
        },
        slug: "murf",
        description: {
            ar: "تحويل النص إلى صوت للفيديوهات والإعلانات.",
            en: "Text-to-speech for videos and advertisements."
        },
        content: {
            ar: `<p>مكتبة أصوات متنوعة لإنشاء تعليقات صوتية احترافية.</p>`,
            en: `<p>A diverse library of voices for creating professional voiceovers.</p>`
        },
        category: "Productivity",
        link: "https://murf.ai",
        featured: false,
        image: "https://logo.clearbit.com/murf.ai"
    },
    {
        id: "37",
        name: {
            ar: "Udio",
            en: "Udio"
        },
        slug: "udio",
        description: {
            ar: "توليد موسيقى كاملة من وصف نصي.",
            en: "Generate full music from text descriptions."
        },
        content: {
            ar: `<p>منافس قوي لـ Suno في توليد الأغاني والموسيقى بالـ AI.</p>`,
            en: `<p>A strong competitor to Suno in generating songs and music with AI.</p>`
        },
        category: "Design",
        link: "https://udio.com",
        featured: false,
        image: "https://logo.clearbit.com/udio.com"
    },
    // === أدوات البحث والمعرفة ===
    {
        id: "38",
        name: {
            ar: "You. com",
            en: "You.com"
        },
        slug: "youcom",
        description: {
            ar: "محرك بحث ذكي مع إجابات AI فورية.",
            en: "Intelligent search engine with instant AI answers."
        },
        content: {
            ar: `<p>محرك بحث يدمج الـ AI لتقديم إجابات مباشرة مع مصادر.</p>`,
            en: `<p>A search engine that integrates AI to provide direct answers with sources.</p>`
        },
        category: "Chatbots",
        link: "https://you.com",
        featured: false,
        image: "https://logo.clearbit.com/you.com"
    },
    {
        id: "39",
        name: {
            ar: "Phind",
            en: "Phind"
        },
        slug: "phind",
        description: {
            ar: "محرك بحث متخصص للمطورين والبرمجة.",
            en: "Specialized search engine for developers and coding."
        },
        content: {
            ar: `<p>مصمم خصيصاً للإجابة على أسئلة البرمجة مع أكواد جاهزة.</p>`,
            en: `<p>Specially designed to answer programming questions with ready-made code.</p>`
        },
        category: "Coding",
        link: "https://phind.com",
        featured: false,
        image: "https://logo.clearbit.com/phind.com"
    },
    {
        id: "40",
        name: {
            ar: "Elicit",
            en: "Elicit"
        },
        slug: "elicit",
        description: {
            ar: "مساعد بحث علمي لقراءة الأوراق الأكاديمية.",
            en: "AI research assistant for reading academic papers."
        },
        content: {
            ar: `<p>يساعد في البحث العلمي بتلخيص الأوراق واستخراج البيانات.</p>`,
            en: `<p>Helps in scientific research by summarizing papers and extracting data.</p>`
        },
        category: "Productivity",
        link: "https://elicit.com",
        featured: false,
        image: "https://logo.clearbit.com/elicit.com"
    },
    {
        id: "41",
        name: {
            ar: "Consensus",
            en: "Consensus"
        },
        slug: "consensus",
        description: {
            ar: "بحث في الأوراق العلمية بإجابات مدعومة بالبحث.",
            en: "Search scientific papers with research-backed answers."
        },
        content: {
            ar: `<p>ابحث في ملايين الدراسات واحصل على إجابات علمية موثقة.</p>`,
            en: `<p>Search millions of studies and get documented scientific answers.</p>`
        },
        category: "Productivity",
        link: "https://consensus.app",
        featured: false,
        image: "https://logo.clearbit.com/consensus.app"
    },
    {
        id: "42",
        name: {
            ar: "Semantic Scholar",
            en: "Semantic Scholar"
        },
        slug: "semantic-scholar",
        description: {
            ar: "محرك بحث أكاديمي مدعوم بالـ AI.",
            en: "AI-powered academic search engine."
        },
        content: {
            ar: `<p>من Allen AI، يساعد في اكتشاف الأوراق العلمية ذات الصلة.</p>`,
            en: `<p>From Allen AI, helps discover relevant scientific papers.</p>`
        },
        category: "Productivity",
        link: "https://semanticscholar.org",
        featured: false,
        image: "https://logo.clearbit.com/semanticscholar.org"
    },
    // === أدوات البرمجة ===
    {
        id: "43",
        name: {
            ar: "GitHub Copilot",
            en: "GitHub Copilot"
        },
        slug: "copilot",
        description: {
            ar: "مساعد البرمجة الأشهر من GitHub وOpenAI.",
            en: "The most famous coding assistant from GitHub and OpenAI."
        },
        content: {
            ar: `<p>أكثر مساعدي البرمجة انتشاراً، يقترح أكواد كاملة أثناء الكتابة.</p>`,
            en: `<p>The most widely used coding assistant, suggests full code while writing.</p>`
        },
        category: "Coding",
        link: "https://github.com/features/copilot",
        featured: true,
        image: "https://logo.clearbit.com/github.com"
    },
    {
        id: "44",
        name: {
            ar: "Tabnine",
            en: "Tabnine"
        },
        slug: "tabnine",
        description: {
            ar: "إكمال كود ذكي مع خيار التشغيل المحلي.",
            en: "Intelligent code completion with a local running option."
        },
        content: {
            ar: `<p>يمكن تشغيله محلياً لضمان خصوصية الكود.</p>`,
            en: `<p>Can be run locally to ensure code privacy.</p>`
        },
        category: "Coding",
        link: "https://tabnine.com",
        featured: false,
        image: "https://logo.clearbit.com/tabnine.com"
    },
    {
        id: "45",
        name: {
            ar: "Codeium",
            en: "Codeium"
        },
        slug: "codeium",
        description: {
            ar: "بديل مجاني لـ Copilot مع Windsurf IDE.",
            en: "Free alternative to Copilot with Windsurf IDE."
        },
        content: {
            ar: `<p>يقدم ميزات شبيهة بـ Copilot مجاناً، مع IDE كامل (Windsurf).</p>`,
            en: `<p>Offers Copilot-like features for free, with a full IDE (Windsurf).</p>`
        },
        category: "Coding",
        link: "https://codeium.com",
        featured: false,
        image: "https://logo.clearbit.com/codeium.com"
    },
    {
        id: "46",
        name: {
            ar: "Amazon CodeWhisperer",
            en: "Amazon CodeWhisperer"
        },
        slug: "codewhisperer",
        description: {
            ar: "مساعد برمجة من Amazon متخصص في AWS.",
            en: "Amazon coding assistant specialized in AWS."
        },
        content: {
            ar: `<p>متخصص في خدمات AWS والأمان.</p>`,
            en: `<p>Specialized in AWS services and security.</p>`
        },
        category: "Coding",
        link: "https://aws.amazon.com/codewhisperer",
        featured: false,
        image: "https://logo.clearbit.com/aws.amazon.com"
    },
    {
        id: "47",
        name: {
            ar: "Sourcegraph Cody",
            en: "Sourcegraph Cody"
        },
        slug: "cody",
        description: {
            ar: "مساعد برمجة يفهم Codebase كاملة.",
            en: "Coding assistant that understands your entire codebase."
        },
        content: {
            ar: `<p>يفهم مشروعك بالكامل ويجيب على أسئلة حوله.</p>`,
            en: `<p>Understands your entire project and answers questions about it.</p>`
        },
        category: "Coding",
        link: "https://sourcegraph.com/cody",
        featured: false,
        image: "https://logo.clearbit.com/sourcegraph.com"
    },
    {
        id: "48",
        name: {
            ar: "v0",
            en: "v0"
        },
        slug: "v0",
        description: {
            ar: "توليد واجهات React من الوصف النصي.",
            en: "Generate React interfaces from text descriptions."
        },
        content: {
            ar: `<p>اكتب وصفاً واحصل على كود React/Next. js جاهز.</p>`,
            en: `<p>Write a description and get ready-made React/Next.js code.</p>`
        },
        category: "Coding",
        link: "https://v0.dev",
        featured: true,
        image: "https://logo.clearbit.com/v0.dev",
        pricingType: 'freemium'
    },
    // === أدوات التصميم ===
    {
        id: "49",
        name: {
            ar: "Canva AI",
            en: "Canva AI"
        },
        slug: "canva-ai",
        description: {
            ar: "أدوات AI متكاملة في منصة التصميم الشهيرة.",
            en: "Integrated AI tools in the famous design platform."
        },
        content: {
            ar: `<p>Magic Write, Magic Design, وأدوات أخرى للتصميم السريع.</p>`,
            en: `<p>Magic Write, Magic Design, and other tools for rapid design.</p>`
        },
        category: "Design",
        link: "https://canva.com",
        featured: true,
        image: "https://logo.clearbit.com/canva.com",
        pricingType: 'freemium'
    },
    {
        id: "50",
        name: {
            ar: "Figma AI",
            en: "Figma AI"
        },
        slug: "figma-ai",
        description: {
            ar: "ميزات AI جديدة في Figma للمصممين.",
            en: "New AI features in Figma for designers."
        },
        content: {
            ar: `<p>توليد تصاميم، إكمال التخطيطات، وإعادة التسمية الذكية.</p>`,
            en: `<p>Generating designs, completing layouts, and smart renaming.</p>`
        },
        category: "Design",
        link: "https://figma.com",
        featured: false,
        image: "https://logo.clearbit.com/figma.com"
    },
    {
        id: "51",
        name: {
            ar: "Framer AI",
            en: "Framer AI"
        },
        slug: "framer-ai",
        description: {
            ar: "بناء مواقع من الوصف النصي.",
            en: "Build websites from text descriptions."
        },
        content: {
            ar: `<p>اكتب وصفاً واحصل على موقع كامل وجميل.</p>`,
            en: `<p>Write a description and get a complete, beautiful website.</p>`
        },
        category: "Design",
        link: "https://framer.com",
        featured: false,
        image: "https://logo.clearbit.com/framer.com"
    },
    {
        id: "52",
        name: {
            ar: "Looka",
            en: "Looka"
        },
        slug: "looka",
        description: {
            ar: "تصميم شعارات وهوية بصرية بالـ AI.",
            en: "Logo and visual identity design with AI."
        },
        content: {
            ar: `<p>أنشئ شعاراً احترافياً وهوية بصرية كاملة.</p>`,
            en: `<p>Create a professional logo and a full visual identity.</p>`
        },
        category: "Design",
        link: "https://looka.com",
        featured: false,
        image: "https://logo.clearbit.com/looka.com"
    },
    {
        id: "53",
        name: {
            ar: "Remove. bg",
            en: "Remove.bg"
        },
        slug: "remove-bg",
        description: {
            ar: "إزالة خلفية الصور تلقائياً.",
            en: "Remove image background automatically."
        },
        content: {
            ar: `<p>أزل خلفية أي صورة بضغطة زر واحدة.</p>`,
            en: `<p>Remove any image background with a single click.</p>`
        },
        category: "Design",
        link: "https://remove.bg",
        featured: false,
        image: "https://logo.clearbit.com/remove.bg"
    },
    {
        id: "54",
        name: {
            ar: "Cleanup. pictures",
            en: "Cleanup.pictures"
        },
        slug: "cleanup",
        description: {
            ar: "إزالة العناصر غير المرغوبة من الصور.",
            en: "Remove unwanted elements from images."
        },
        content: {
            ar: `<p>أزل أي عنصر من الصورة مع ملء ذكي للفراغ.</p>`,
            en: `<p>Remove any element from the image with smart void filling.</p>`
        },
        category: "Design",
        link: "https://cleanup.pictures",
        featured: false,
        image: "https://logo.clearbit.com/cleanup.pictures"
    },
    {
        id: "55",
        name: {
            ar: "Upscayl",
            en: "Upscayl"
        },
        slug: "upscayl",
        description: {
            ar: "تكبير الصور مع تحسين الجودة.",
            en: "Upscale images with quality enhancement."
        },
        content: {
            ar: `<p>برنامج مفتوح المصدر لتكبير الصور 4x مع الحفاظ على الوضوح.</p>`,
            en: `<p>Open-source software to upscale images 4x while maintaining clarity.</p>`
        },
        category: "Design",
        link: "https://upscayl.github.io",
        featured: false,
        image: "https://logo.clearbit.com/github.com"
    },
    // === أدوات الإنتاجية ===
    {
        id: "56",
        name: {
            ar: "Notion AI",
            en: "Notion AI"
        },
        slug: "notion-ai",
        description: {
            ar: "مساعد AI متكامل في Notion للكتابة والتنظيم.",
            en: "Integrated AI assistant in Notion for writing and organization."
        },
        content: {
            ar: `<p>اكتب، لخص، وحلل البيانات داخل Notion مباشرة.</p>`,
            en: `<p>Write, summarize, and analyze data directly inside Notion.</p>`
        },
        category: "Productivity",
        link: "https://notion.so",
        featured: true,
        image: "https://logo.clearbit.com/notion.so"
    },
    {
        id: "57",
        name: {
            ar: "Otter. ai",
            en: "Otter.ai"
        },
        slug: "otter",
        description: {
            ar: "تفريغ الاجتماعات تلقائياً.",
            en: "Automatically transcribe meetings."
        },
        content: {
            ar: `<p>يسجل ويفرغ الاجتماعات مع ملخصات ذكية.</p>`,
            en: `<p>Records and transcribes meetings with smart summaries.</p>`
        },
        category: "Productivity",
        link: "https://otter.ai",
        featured: false,
        image: "https://logo.clearbit.com/otter.ai"
    },
    {
        id: "58",
        name: {
            ar: "Fireflies. ai",
            en: "Fireflies.ai"
        },
        slug: "fireflies",
        description: {
            ar: "تسجيل وتحليل المكالمات والاجتماعات.",
            en: "Record and analyze calls and meetings."
        },
        content: {
            ar: `<p>يحضر اجتماعاتك، يسجلها، ويستخرج المهام.</p>`,
            en: `<p>Attends your meetings, records them, and extracts tasks.</p>`
        },
        category: "Productivity",
        link: "https://fireflies.ai",
        featured: false,
        image: "https://logo.clearbit.com/fireflies.ai"
    },
    {
        id: "59",
        name: {
            ar: "Mem",
            en: "Mem"
        },
        slug: "mem",
        description: {
            ar: "ملاحظات ذكية تنظم نفسها.",
            en: "Smart notes that organize themselves."
        },
        content: {
            ar: `<p>ملاحظات بـ AI ترتبط تلقائياً وتُستدعى عند الحاجة.</p>`,
            en: `<p>AI notes that link automatically and are recalled when needed.</p>`
        },
        category: "Productivity",
        link: "https://mem.ai",
        featured: false,
        image: "https://logo.clearbit.com/mem.ai"
    },
    {
        id: "60",
        name: {
            ar: "Reclaim. ai",
            en: "Reclaim.ai"
        },
        slug: "reclaim",
        description: {
            ar: "إدارة الوقت والتقويم بالـ AI.",
            en: "Time and calendar management with AI."
        },
        content: {
            ar: `<p>ينظم تقويمك تلقائياً ويحمي وقت التركيز.</p>`,
            en: `<p>Automatically organizes your calendar and protects focus time.</p>`
        },
        category: "Productivity",
        link: "https://reclaim.ai",
        featured: false,
        image: "https://logo.clearbit.com/reclaim.ai"
    },
    {
        id: "61",
        name: {
            ar: "Taskade",
            en: "Taskade"
        },
        slug: "taskade",
        description: {
            ar: "مساحة عمل تعاونية مع AI مدمج.",
            en: "Collaborative workspace with integrated AI."
        },
        content: {
            ar: `<p>قوائم مهام ومستندات ومحادثات مع AI متكامل.</p>`,
            en: `<p>Task lists, documents, and conversations with integrated AI.</p>`
        },
        category: "Productivity",
        link: "https://taskade.com",
        featured: false,
        image: "https://logo.clearbit.com/taskade.com"
    },
    {
        id: "62",
        name: {
            ar: "Tome",
            en: "Tome"
        },
        slug: "tome",
        description: {
            ar: "عروض تقديمية ذكية بالـ AI.",
            en: "Smart presentations with AI."
        },
        content: {
            ar: `<p>أنشئ عروضاً تقديمية تفاعلية من النص.</p>`,
            en: `<p>Create interactive presentations from text.</p>`
        },
        category: "Productivity",
        link: "https://tome.app",
        featured: false,
        image: "https://logo.clearbit.com/tome.app"
    },
    {
        id: "63",
        name: {
            ar: "Beautiful. ai",
            en: "Beautiful.ai"
        },
        slug: "beautiful-ai",
        description: {
            ar: "تصميم شرائح احترافية تلقائياً.",
            en: "Design professional slides automatically."
        },
        content: {
            ar: `<p>يصمم الشرائح لك بناءً على المحتوى.</p>`,
            en: `<p>Designs slides for you based on the content.</p>`
        },
        category: "Productivity",
        link: "https://beautiful.ai",
        featured: false,
        image: "https://logo.clearbit.com/beautiful.ai"
    },
    // === أدوات التسويق ===
    {
        id: "64",
        name: {
            ar: "AdCreative. ai",
            en: "AdCreative.ai"
        },
        slug: "adcreative",
        description: {
            ar: "توليد تصميمات إعلانية بالـ AI.",
            en: "Generate advertising designs with AI."
        },
        content: {
            ar: `<p>أنشئ مئات الإعلانات المختلفة للاختبار.</p>`,
            en: `<p>Create hundreds of different ads for testing.</p>`
        },
        category: "Design",
        link: "https://adcreative.ai",
        featured: false,
        image: "https://logo.clearbit.com/adcreative.ai"
    },
    {
        id: "65",
        name: {
            ar: "Predis. ai",
            en: "Predis.ai"
        },
        slug: "predis",
        description: {
            ar: "إنشاء محتوى سوشيال ميديا تلقائياً.",
            en: "Create social media content automatically."
        },
        content: {
            ar: `<p>يولد منشورات وفيديوهات للسوشيال ميديا.</p>`,
            en: `<p>Generates posts and videos for social media.</p>`
        },
        category: "Design",
        link: "https://predis.ai",
        featured: false,
        image: "https://logo.clearbit.com/predis.ai"
    },
    {
        id: "66",
        name: {
            ar: "Pictory",
            en: "Pictory"
        },
        slug: "pictory",
        description: {
            ar: "تحويل المقالات إلى فيديوهات قصيرة.",
            en: "Convert articles into short videos."
        },
        content: {
            ar: `<p>حوّل مقالاتك ونصوصك إلى فيديوهات للسوشيال.</p>`,
            en: `<p>Convert your articles and text into social media videos.</p>`
        },
        category: "Design",
        link: "https://pictory.ai",
        featured: false,
        image: "https://logo.clearbit.com/pictory.ai"
    },
    {
        id: "67",
        name: {
            ar: "Lumen5",
            en: "Lumen5"
        },
        slug: "lumen5",
        description: {
            ar: "فيديوهات ماركتنج من المحتوى النصي.",
            en: "Marketing videos from text content."
        },
        content: {
            ar: `<p>حوّل مدوناتك إلى فيديوهات جذابة.</p>`,
            en: `<p>Convert your blogs into engaging videos.</p>`
        },
        category: "Design",
        link: "https://lumen5.com",
        featured: false,
        image: "https://logo.clearbit.com/lumen5.com"
    },
    {
        id: "68",
        name: {
            ar: "Surfer SEO",
            en: "Surfer SEO"
        },
        slug: "surfer",
        description: {
            ar: "تحسين المحتوى لمحركات البحث.",
            en: "Optimize content for search engines."
        },
        content: {
            ar: `<p>يحلل المنافسين ويرشدك لكتابة محتوى يتصدر نتائج البحث.</p>`,
            en: `<p>Analyzes competitors and guides you to write content that tops search results.</p>`
        },
        category: "Productivity",
        link: "https://surferseo.com",
        featured: false,
        image: "https://logo.clearbit.com/surferseo.com"
    },
    {
        id: "69",
        name: {
            ar: "Frase",
            en: "Frase"
        },
        slug: "frase",
        description: {
            ar: "بحث وكتابة محتوى SEO.",
            en: "SEO content research and writing."
        },
        content: {
            ar: `<p>يبحث ويلخص ويكتب مقالات محسّنة للبحث.</p>`,
            en: `<p>Researches, summarizes, and writes search-optimized articles.</p>`
        },
        category: "Productivity",
        link: "https://frase.io",
        featured: false,
        image: "https://logo.clearbit.com/frase.io"
    },
    // === أدوات الأعمال والبيانات ===
    {
        id: "70",
        name: {
            ar: "Obviously AI",
            en: "Obviously AI"
        },
        slug: "obviously-ai",
        description: {
            ar: "تنبؤات وتحليلات بدون كود.",
            en: "No-code predictions and analytics."
        },
        content: {
            ar: `<p>ارفع بياناتك واحصل على تنبؤات بدون برمجة.</p>`,
            en: `<p>Upload your data and get predictions without programming.</p>`
        },
        category: "Productivity",
        link: "https://obviously.ai",
        featured: false,
        image: "https://logo.clearbit.com/obviously.ai"
    },
    {
        id: "71",
        name: {
            ar: "MonkeyLearn",
            en: "MonkeyLearn"
        },
        slug: "monkeylearn",
        description: {
            ar: "تحليل النصوص والمشاعر بدون كود.",
            en: "No-code text and sentiment analysis."
        },
        content: {
            ar: `<p>صنّف النصوص وحلل المشاعر بسحب وإفلات.</p>`,
            en: `<p>Classify text and analyze sentiment with drag-and-drop.</p>`
        },
        category: "Productivity",
        link: "https://monkeylearn.com",
        featured: false,
        image: "https://logo.clearbit.com/monkeylearn.com"
    },
    {
        id: "72",
        name: {
            ar: "ChatPDF",
            en: "ChatPDF"
        },
        slug: "chatpdf",
        description: {
            ar: "محادثة مع ملفات PDF.",
            en: "Chat with PDF files."
        },
        content: {
            ar: `<p>ارفع أي PDF واسأله مباشرة عن محتواه.</p>`,
            en: `<p>Upload any PDF and ask it directly about its content.</p>`
        },
        category: "Productivity",
        link: "https://chatpdf.com",
        featured: false,
        image: "https://logo.clearbit.com/chatpdf.com"
    },
    {
        id: "73",
        name: {
            ar: "Humata",
            en: "Humata"
        },
        slug: "humata",
        description: {
            ar: "تحليل المستندات الطويلة بالـ AI.",
            en: "Analyze long documents with AI."
        },
        content: {
            ar: `<p>يقرأ ويلخص ويجيب عن المستندات الطويلة.</p>`,
            en: `<p>Reads, summarizes, and answers questions about long documents.</p>`
        },
        category: "Productivity",
        link: "https://humata.ai",
        featured: false,
        image: "https://logo.clearbit.com/humata.ai"
    },
    {
        id: "74",
        name: {
            ar: "Bardeen",
            en: "Bardeen"
        },
        slug: "bardeen",
        description: {
            ar: "أتمتة المهام المتكررة بدون كود.",
            en: "No-code automation of repetitive tasks."
        },
        content: {
            ar: `<p>أتمت المهام الروتينية بين التطبيقات.</p>`,
            en: `<p>Automate routine tasks between apps.</p>`
        },
        category: "Productivity",
        link: "https://bardeen.ai",
        featured: false,
        image: "https://logo.clearbit.com/bardeen.ai"
    },
    {
        id: "75",
        name: {
            ar: "Rows",
            en: "Rows"
        },
        slug: "rows",
        description: {
            ar: "جداول بيانات مع AI مدمج.",
            en: "Spreadsheets with integrated AI."
        },
        content: {
            ar: `<p>جداول بيانات تتحدث AI وتستورد بيانات من APIs.</p>`,
            en: `<p>Spreadsheets that talk AI and import data from APIs.</p>`
        },
        category: "Productivity",
        link: "https://rows.com",
        featured: false,
        image: "https://logo.clearbit.com/rows.com"
    },
    // === روبوتات محادثة ونماذج لغوية ===
    {
        id: "76",
        name: {
            ar: "Pi",
            en: "Pi"
        },
        slug: "pi",
        description: {
            ar: "مساعد شخصي ودود من Inflection AI.",
            en: "Friendly personal assistant from Inflection AI."
        },
        content: {
            ar: `<p>روبوت محادثة مصمم ليكون ودوداً وداعماً.</p>`,
            en: `<p>A chatbot designed to be friendly and supportive.</p>`
        },
        category: "Chatbots",
        link: "https://pi.ai",
        featured: false,
        image: "https://logo.clearbit.com/pi.ai"
    },
    {
        id: "77",
        name: {
            ar: "Poe",
            en: "Poe"
        },
        slug: "poe",
        description: {
            ar: "منصة للوصول لأنظمة AI متعددة.",
            en: "Platform to access multiple AI systems."
        },
        content: {
            ar: `<p>اختر من GPT‑4, Claude, Llama والعديد من النماذج.</p>`,
            en: `<p>Choose from GPT‑4, Claude, Llama, and many other models.</p>`
        },
        category: "Chatbots",
        link: "https://poe.com",
        featured: false,
        image: "https://logo.clearbit.com/poe.com"
    },
    {
        id: "78",
        name: {
            ar: "Character. AI",
            en: "Character.AI"
        },
        slug: "character",
        description: {
            ar: "تحدث مع شخصيات AI مصممة.",
            en: "Talk with designed AI characters."
        },
        content: {
            ar: `<p>أنشئ وتحدث مع شخصيات AI بأنماط مختلفة.</p>`,
            en: `<p>Create and talk with AI characters in different styles.</p>`
        },
        category: "Chatbots",
        link: "https://character.ai",
        featured: false,
        image: "https://logo.clearbit.com/character.ai"
    },
    {
        id: "79",
        name: {
            ar: "Mistral AI",
            en: "Mistral AI"
        },
        slug: "mistral",
        description: {
            ar: "نماذج لغوية أوروبية مفتوحة المصدر.",
            en: "European open-source language models."
        },
        content: {
            ar: `<p>نماذج قوية مفتوحة المصدر من فرنسا.</p>`,
            en: `<p>Powerful open-source models from France.</p>`
        },
        category: "Chatbots",
        link: "https://mistral.ai",
        featured: false,
        image: "https://logo.clearbit.com/mistral.ai"
    },
    {
        id: "80",
        name: {
            ar: "Llama (Meta)",
            en: "Llama (Meta)"
        },
        slug: "llama",
        description: {
            ar: "نموذج Meta المفتوح للمطورين.",
            en: "Meta's open model for developers."
        },
        content: {
            ar: `<p>نموذج Meta المفتوح المصدر الذي غير المعادلة.</p>`,
            en: `<p>Meta's open-source model that changed the equation.</p>`
        },
        category: "Chatbots",
        link: "https://llama.meta.com",
        featured: false,
        image: "https://logo.clearbit.com/meta.com"
    },
    {
        id: "81",
        name: {
            ar: "Cohere",
            en: "Cohere"
        },
        slug: "cohere",
        description: {
            ar: "نماذج لغوية للمؤسسات والشركات.",
            en: "Language models for institutions and companies."
        },
        content: {
            ar: `<p>حلول AI Enterprise مع Command وEmbed.</p>`,
            en: `<p>AI Enterprise solutions with Command and Embed.</p>`
        },
        category: "Chatbots",
        link: "https://cohere.com",
        featured: false,
        image: "https://logo.clearbit.com/cohere.com"
    },
    {
        id: "82",
        name: {
            ar: "Groq",
            en: "Groq"
        },
        slug: "groq",
        description: {
            ar: "أسرع استدلال للنماذج اللغوية.",
            en: "Fastest inference for language models."
        },
        content: {
            ar: `<p>شرائح LPU توفر سرعة استجابة فائقة.</p>`,
            en: `<p>LPU chips provide ultra-fast response speed.</p>`
        },
        category: "Chatbots",
        link: "https://groq.com",
        featured: false,
        image: "https://logo.clearbit.com/groq.com"
    },
    // === أدوات متخصصة ===
    {
        id: "83",
        name: {
            ar: "Hugging Face",
            en: "Hugging Face"
        },
        slug: "huggingface",
        description: {
            ar: "منصة النماذج المفتوحة المصدر.",
            en: "The platform for open-source models."
        },
        content: {
            ar: `<p>آلاف النماذج والـ Datasets مجاناً.</p>`,
            en: `<p>Thousands of models and datasets for free.</p>`
        },
        category: "Coding",
        link: "https://huggingface.co",
        featured: true,
        image: "https://logo.clearbit.com/huggingface.co"
    },
    {
        id: "84",
        name: {
            ar: "Replicate",
            en: "Replicate"
        },
        slug: "replicate",
        description: {
            ar: "تشغيل نماذج AI عبر API.",
            en: "Run AI models via API."
        },
        content: {
            ar: `<p>شغّل أي نموذج AI عبر API بسيط.</p>`,
            en: `<p>Run any AI model via a simple API.</p>`
        },
        category: "Coding",
        link: "https://replicate.com",
        featured: false,
        image: "https://logo.clearbit.com/replicate.com"
    },
    {
        id: "85",
        name: {
            ar: "RunPod",
            en: "RunPod"
        },
        slug: "runpod",
        description: {
            ar: "استضافة GPU سحابية للـ AI.",
            en: "Cloud GPU hosting for AI."
        },
        content: {
            ar: `<p>استأجر GPUs بأسعار منافسة لتدريب وتشغيل النماذج.</p>`,
            en: `<p>Rent GPUs at competitive prices for training and running models.</p>`
        },
        category: "Coding",
        link: "https://runpod.io",
        featured: false,
        image: "https://logo.clearbit.com/runpod.io"
    },
    {
        id: "86",
        name: {
            ar: "Modal",
            en: "Modal"
        },
        slug: "modal",
        description: {
            ar: "تشغيل كود Python على السحابة بسهولة.",
            en: "Run Python code in the cloud easily."
        },
        content: {
            ar: `<p>انشر كود Python للـ AI بسطر واحد.</p>`,
            en: `<p>Deploy Python code for AI with a single line.</p>`
        },
        category: "Coding",
        link: "https://modal.com",
        featured: false,
        image: "https://logo.clearbit.com/modal.com"
    },
    {
        id: "87",
        name: {
            ar: "LangChain",
            en: "LangChain"
        },
        slug: "langchain",
        description: {
            ar: "إطار عمل لبناء تطبيقات LLM.",
            en: "Framework for building LLM applications."
        },
        content: {
            ar: `<p>الإطار الأشهر لربط LLMs بالبيانات والأدوات.</p>`,
            en: `<p>The most famous framework for connecting LLMs to data and tools.</p>`
        },
        category: "Coding",
        link: "https://langchain.com",
        featured: false,
        image: "https://logo.clearbit.com/langchain.com"
    },
    {
        id: "88",
        name: {
            ar: "LlamaIndex",
            en: "LlamaIndex"
        },
        slug: "llamaindex",
        description: {
            ar: "ربط النماذج اللغوية ببياناتك.",
            en: "Connect language models to your data."
        },
        content: {
            ar: `<p>اربط LLM ببياناتك الخاصة بسهولة.</p>`,
            en: `<p>Connect LLM to your own data easily.</p>`
        },
        category: "Coding",
        link: "https://llamaindex.ai",
        featured: false,
        image: "https://logo.clearbit.com/llamaindex.ai"
    },
    // === أدوات أخرى متنوعة ===
    {
        id: "89",
        name: {
            ar: "Superhuman",
            en: "Superhuman"
        },
        slug: "superhuman",
        description: {
            ar: "إيميل ذكي وسريع للغاية.",
            en: "Smart and extremely fast email."
        },
        content: {
            ar: `<p>أسرع تجربة إيميل مع AI للردود والتلخيص.</p>`,
            en: `<p>Fastest email experience with AI for replies and summarization.</p>`
        },
        category: "Productivity",
        link: "https://superhuman.com",
        featured: false,
        image: "https://logo.clearbit.com/superhuman.com"
    },
    {
        id: "90",
        name: {
            ar: "Raycast",
            en: "Raycast"
        },
        slug: "raycast",
        description: {
            ar: "launcher ذكي لـ Mac مع AI مدمج.",
            en: "Smart launcher for Mac with built-in AI."
        },
        content: {
            ar: `<p>بديل Spotlight مع AI وإضافات قوية.</p>`,
            en: `<p>Spotlight alternative with AI and powerful extensions.</p>`
        },
        category: "Productivity",
        link: "https://raycast.com",
        featured: false,
        image: "https://logo.clearbit.com/raycast.com"
    },
    {
        id: "91",
        name: {
            ar: "Krisp",
            en: "Krisp"
        },
        slug: "krisp",
        description: {
            ar: "إلغاء الضوضاء في المكالمات بالـ AI.",
            en: "AI noise cancellation in calls."
        },
        content: {
            ar: `<p>يزيل الضوضاء من مكالماتك في الوقت الفعلي.</p>`,
            en: `<p>Removes noise from your calls in real-time.</p>`
        },
        category: "Productivity",
        link: "https://krisp.ai",
        featured: false,
        image: "https://logo.clearbit.com/krisp.ai"
    },
    {
        id: "92",
        name: {
            ar: "Photoroom",
            en: "Photoroom"
        },
        slug: "photoroom",
        description: {
            ar: "تحرير صور المنتجات للتجارة الإلكترونية.",
            en: "Edit product photos for e-commerce."
        },
        content: {
            ar: `<p>أزل الخلفية وأضف خلفيات احترافية للمنتجات.</p>`,
            en: `<p>Remove the background and add professional backgrounds for products.</p>`
        },
        category: "Design",
        link: "https://photoroom.com",
        featured: false,
        image: "https://logo.clearbit.com/photoroom.com"
    },
    {
        id: "93",
        name: {
            ar: "Clipdrop",
            en: "Clipdrop"
        },
        slug: "clipdrop",
        description: {
            ar: "مجموعة أدوات تحرير صور بالـ AI.",
            en: "AI image editing toolset."
        },
        content: {
            ar: `<p>إزالة خلفية، تكبير، إزالة عناصر، والمزيد.</p>`,
            en: `<p>Background removal, upscaling, object removal, and more.</p>`
        },
        category: "Design",
        link: "https://clipdrop.co",
        featured: false,
        image: "https://logo.clearbit.com/clipdrop.co"
    },
    {
        id: "94",
        name: {
            ar: "Krea AI",
            en: "Krea AI"
        },
        slug: "krea",
        description: {
            ar: "توليد صور في الوقت الفعلي.",
            en: "Real-time image generation."
        },
        content: {
            ar: `<p>ولّد صوراً أثناء الكتابة مع معاينة مباشرة.</p>`,
            en: `<p>Generate images while typing with a live preview.</p>`
        },
        category: "Design",
        link: "https://krea.ai",
        featured: false,
        image: "https://logo.clearbit.com/krea.ai"
    },
    {
        id: "95",
        name: {
            ar: "Magnific",
            en: "Magnific"
        },
        slug: "magnific",
        description: {
            ar: "تكبير وتحسين الصور بتفاصيل مذهلة.",
            en: "Upscale and enhance images with stunning detail."
        },
        content: {
            ar: `<p>يكبر الصور ويضيف تفاصيل جديدة بالـ AI.</p>`,
            en: `<p>Upscales images and adds new details using AI.</p>`
        },
        category: "Design",
        link: "https://magnific.ai",
        featured: false,
        image: "https://logo.clearbit.com/magnific.ai"
    },
    {
        id: "96",
        name: {
            ar: "Ideamap",
            en: "Ideamap"
        },
        slug: "ideamap",
        description: {
            ar: "خرائط ذهنية ذكية بالـ AI.",
            en: "Smart mind maps with AI."
        },
        content: {
            ar: `<p>أنشئ خرائط ذهنية مع اقتراحات AI.</p>`,
            en: `<p>Create mind maps with AI suggestions.</p>`
        },
        category: "Productivity",
        link: "https://ideamap.ai",
        featured: false,
        image: "https://logo.clearbit.com/ideamap.ai"
    },
    {
        id: "97",
        name: {
            ar: "Mapify",
            en: "Mapify"
        },
        slug: "mapify",
        description: {
            ar: "تحويل المحتوى لخرائط ذهنية.",
            en: "Convert content to mind maps."
        },
        content: {
            ar: `<p>حوّل أي محتوى لخريطة ذهنية تلقائياً.</p>`,
            en: `<p>Convert any content into a mind map automatically.</p>`
        },
        category: "Productivity",
        link: "https://mapify.so",
        featured: false,
        image: "https://logo.clearbit.com/mapify.so"
    },
    {
        id: "98",
        name: {
            ar: "Tldraw",
            en: "Tldraw"
        },
        slug: "tldraw",
        description: {
            ar: "سبورة بيضاء مع تحويل الرسم لـ UI.",
            en: "Whiteboard with drawing-to-UI conversion."
        },
        content: {
            ar: `<p>ارسم واجهة وحولها لكود React فعلي.</p>`,
            en: `<p>Draw an interface and convert it into actual React code.</p>`
        },
        category: "Coding",
        link: "https://tldraw.com",
        featured: false,
        image: "https://logo.clearbit.com/tldraw.com"
    },
    {
        id: "99",
        name: {
            ar: "Tripnotes",
            en: "Tripnotes"
        },
        slug: "tripnotes",
        description: {
            ar: "تخطيط السفر بمساعدة AI.",
            en: "Travel planning with AI help."
        },
        content: {
            ar: `<p>خطط لرحلتك مع توصيات AI مخصصة.</p>`,
            en: `<p>Plan your trip with personalized AI recommendations.</p>`
        },
        category: "Productivity",
        link: "https://tripnotes.ai",
        featured: false,
        image: "https://logo.clearbit.com/tripnotes.ai"
    },
    {
        id: "100",
        name: {
            ar: "Galileo AI",
            en: "Galileo AI"
        },
        slug: "galileo",
        description: {
            ar: "توليد تصاميم UI كاملة من النص.",
            en: "Generate full UI designs from text."
        },
        content: {
            ar: `<p>صمم واجهات مستخدم بمجرد وصفها.</p>`,
            en: `<p>Design user interfaces just by describing them.</p>`
        },
        category: "Design",
        link: "https://usegalileo.ai",
        featured: false,
        image: "https://logo.clearbit.com/usegalileo.ai"
    },
    {
        id: "101",
        name: {
            ar: "Uizard",
            en: "Uizard"
        },
        slug: "uizard",
        description: {
            ar: "تحويل الأفكار لنماذج UI أولية.",
            en: "Convert ideas into UI prototypes."
        },
        content: {
            ar: `<p>حوّل الرسومات اليدوية لتصاميم رقمية.</p>`,
            en: `<p>Convert handheld drawings into digital designs.</p>`
        },
        category: "Design",
        link: "https://uizard.io",
        featured: false,
        image: "https://logo.clearbit.com/uizard.io"
    },
    {
        id: "102",
        name: {
            ar: "Magic Eraser",
            en: "Magic Eraser"
        },
        slug: "magic-eraser",
        description: {
            ar: "إزالة أي شيء من الصور بسهولة.",
            en: "Easily remove anything from images."
        },
        content: {
            ar: `<p>أزل أي عنصر غير مرغوب من صورك.</p>`,
            en: `<p>Remove any unwanted element from your photos.</p>`
        },
        category: "Design",
        link: "https://magiceraser.io",
        featured: false,
        image: "https://logo.clearbit.com/magiceraser.io"
    },
    {
        id: "103",
        name: {
            ar: "Deep Nostalgia",
            en: "Deep Nostalgia"
        },
        slug: "deep-nostalgia",
        description: {
            ar: "تحريك الصور القديمة بالـ AI.",
            en: "Animate old photos with AI."
        },
        content: {
            ar: `<p>حوّل صور الأجداد لفيديوهات متحركة.</p>`,
            en: `<p>Convert ancestors' photos into animated videos.</p>`
        },
        category: "Design",
        link: "https://myheritage.com/deep-nostalgia",
        featured: false,
        image: "https://logo.clearbit.com/myheritage.com"
    },
    {
        id: "104",
        name: {
            ar: "Opus Clip",
            en: "Opus Clip"
        },
        slug: "opus",
        description: {
            ar: "تحويل الفيديوهات الطويلة لـ Shorts.",
            en: "Convert long videos into Shorts."
        },
        content: {
            ar: `<p>يختار أفضل اللحظات ويحولها لفيديوهات قصيرة.</p>`,
            en: `<p>Selects the best moments and converts them into short videos.</p>`
        },
        category: "Design",
        link: "https://opus.pro",
        featured: false,
        image: "https://logo.clearbit.com/opus.pro"
    },
    {
        id: "105",
        name: {
            ar: "Kapwing",
            en: "Kapwing"
        },
        slug: "kapwing",
        description: {
            ar: "محرر فيديو أونلاين مع AI.",
            en: "Online video editor with AI."
        },
        content: {
            ar: `<p>حرر الفيديوهات في المتصفح مع أدوات AI.</p>`,
            en: `<p>Edit videos in the browser with AI tools.</p>`
        },
        category: "Design",
        link: "https://kapwing.com",
        featured: false,
        image: "https://logo.clearbit.com/kapwing.com"
    },
    {
        id: "postsyncer",
        name: { ar: "PostSyncer", en: "PostSyncer" },
        slug: "postsyncer",
        description: { ar: "أداة أتمتة نشر المحتوى على منصات التواصل الاجتماعي.", en: "AI Content Maker for social media publishing automation." },
        content: {
            ar: `<p>أداة قوية لأتمتة وجدولة المحتوى على مختلف المنصات.</p>`,
            en: `<p>A powerful tool for automating and scheduling content across platforms.</p>`
        },
        category: "Social Media",
        link: "https://postsyncer.com",
        featured: true,
        image: "https://logo.clearbit.com/postsyncer.com",
        bestFor: [{ ar: "أتمتة النشر", en: "Automating posts" }, { ar: "جدولة المحتوى", en: "Content scheduling" }]
    },
    {
        id: "anima-vibe",
        name: { ar: "Anima", en: "Anima" },
        slug: "anima",
        description: { ar: "تحويل التصميم إلى كود برمجي نظيف باستخدام الذكاء الاصطناعي (Vibe Coding).", en: "Turn design into clean code using AI (Vibe Coding)." },
        content: {
            ar: `<p>حول تصميمات Figma إلى كود React/Vue نظيف جاهز للنشر.</p>`,
            en: `<p>Turn Figma designs into clean production-ready React/Vue code.</p>`
        },
        category: "Design",
        link: "https://animaapp.com",
        featured: true,
        image: "https://logo.clearbit.com/animaapp.com",
        bestFor: [{ ar: "تحويل التصميم لكود", en: "Design to code" }, { ar: "تطوير الواجهات", en: "Frontend development" }]
    },
    {
        id: "audioscribe",
        name: { ar: "AudioScribe", en: "AudioScribe" },
        slug: "audioscribe",
        description: { ar: "حول أفكارك الصوتية وملاحظاتك إلى نصوص منظمة ومشاريع.", en: "Turn voice thoughts and notes into structured text and projects." },
        content: {
            ar: `<p>سجل صوتك ودع الذكاء الاصطناعي يحوله لكتابة احترافية، رسائل إيميل، أو خطط مشاريع.</p>`,
            en: `<p>Record your voice and let AI turn it into professional writing, emails, or project plans.</p>`
        },
        category: "Productivity",
        link: "https://audioscribe.io", // Placeholder URL based on search
        featured: true,
        image: "https://logo.clearbit.com/audioscribe.io",
        bestFor: [{ ar: "اجتماعات", en: "Meeting notes" }, { ar: "ترتيب الأفكار", en: "Thought structuring" }]
    },
    {
        id: "livedocs",
        name: { ar: "LiveDocs", en: "LiveDocs" },
        slug: "livedocs",
        description: { ar: "مساحة عمل ذكية للبيانات تجمع بين المستندات، الكود، والذكاء الاصطناعي.", en: "Intelligent data workspace combining docs, code, and AI." },
        content: {
            ar: `<p>حلل بياناتك، اكتب SQL، وانشئ تقارير تفاعلية بمساعدة وكيل بيانات ذكي.</p>`,
            en: `<p>Analyze data, write SQL, and build interactive reports with a smart data agent.</p>`
        },
        category: "Productivity", // Or 'Data' if available, but staying safe with Productivity/Coding
        link: "https://livedocs.com",
        featured: true,
        image: "https://logo.clearbit.com/livedocs.com",
        bestFor: [{ ar: "تحليل البيانات", en: "Data analysis" }, { ar: "SQL توليد", en: "SQL generation" }]
    }
];

export const courses: Course[] = [
    {
        id: "c1",
        slug: "ai-content-mastery",
        title: {
            ar: "إتقان صناعة المحتوى بالذكاء الاصطناعي",
            en: "AI Content Mastery"
        },
        description: {
            ar: "تعلم كيف تنتج محتوى عام كامل (فيديو، نص، صور) باستخدام أدوات الـ AI في نصف الوقت.",
            en: "Learn how to produce complete general content (video, text, images) using AI tools in half the time."
        },
        longDescription: {
            ar: "هذه الدورة مصممة لصناع المحتوى والمسوقين الذين يرغبون في الاستفادة من ثورة الذكاء الاصطناعي. سنغطي كل شيء من كتابة السيناريو وصولاً إلى المونتاج الآلي.",
            en: "This course is designed for content creators and marketers who want to take advantage of the AI revolution. We will cover everything from scriptwriting to automated editing."
        },
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        price: 499,
        category: "Content Creation",
        duration: "6 ساعات",
        level: "متوسط",
        instructor: authors.ahmed,
        rating: 4.8,
        students: 1240,
        learningOutcomes: [
            { ar: "إنشاء فيديوهات كاملة بالـ AI", en: "Creating complete videos with AI" },
            { ar: "كتابة محتوى تسويقي احترافي", en: "Writing professional marketing content" },
            { ar: "أتمتة عملية النشر", en: "Automating the publishing process" }
        ],
        requirements: [
            { ar: "لا توجد متطلبات تقنية مسبقة", en: "No prior technical requirements" }
        ],
        modules: [
            {
                title: { ar: "المقدمة والأساسيات", en: "Introduction & Basics" },
                lessons: [
                    { title: { ar: "ما هو المحتوى التوليدي؟", en: "What is Generative Content?" }, duration: "15 min", isFree: true },
                    { title: { ar: "تجهيز بيئة العمل والأدوات", en: "Preparing Workspace & Tools" }, duration: "20 min" }
                ]
            },
            {
                title: { ar: "كتابة النصوص (Copywriting)", en: "Copywriting" },
                lessons: [
                    { title: { ar: "هندسة الأوامر (Prompt Engineering) للمحتوى", en: "Prompt Engineering for Content" }, duration: "45 min" },
                    { title: { ar: "استخراج الأفكار اللانهائية", en: "Extracting Infinite Ideas" }, duration: "30 min" }
                ]
            }
        ]
    },
    {
        id: "c2",
        slug: "ai-automation-for-business",
        title: {
            ar: "أتمتة الأعمال الصغيرة بالذكاء الاصطناعي",
            en: "AI Automation for Small Business"
        },
        description: {
            ar: "وفر 20 ساعة أسبوعياً من خلال ربط أدواتك المفضلة بذكاء.",
            en: "Save 20 hours a week by intelligently connecting your favorite tools."
        },
        longDescription: {
            ar: "دورة عملية تركز على استخدام Zapier و Make مع OpenAI لإنشاء أنظمة تعمل بدلاً عنك.",
            en: "A practical course focused on using Zapier and Make with OpenAI to create systems that work for you."
        },
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        price: "Free",
        category: "Automation",
        duration: "4 ساعات",
        level: "متقدم",
        instructor: authors.guest_expert,
        rating: 4.9,
        students: 2150,
        learningOutcomes: [
            { ar: "ربط الأدوات ببعضها", en: "Connecting tools together" },
            { ar: "بناء سير عمل تلقائي", en: "Building automated workflows" }
        ],
        requirements: [
            { ar: "معرفة أساسية بـ ChatGPT", en: "Basic knowledge of ChatGPT" }
        ],
        modules: [
            {
                title: { ar: "مبادئ الأتمتة", en: "Principles of Automation" },
                lessons: [
                    { title: { ar: "لماذا الأتمتة الآن؟", en: "Why Automation Now?" }, duration: "10 min", isFree: true },
                    { title: { ar: "أدوات الربط: Zapier vs Make", en: "Connection Tools: Zapier vs Make" }, duration: "25 min" }
                ]
            }
        ]
    }
];

export const servicePackages: ServicePackage[] = [
    {
        id: "s1",
        title: {
            ar: "جلسة استشارية مكثفة",
            en: "Intensive Consultancy Session"
        },
        price: "150$",
        description: {
            ar: "ساعة واحدة وجهاً لوجه لحل مشكلة محددة في عملك باستخدام الـ AI.",
            en: "One-on-one hour to solve a specific problem in your business using AI."
        },
        features: [
            { ar: "تحليل سير العمل الحالي", en: "Current workflow analysis" },
            { ar: "اقتراح أفضل الأدوات لميزانيتك", en: "Proposing best tools for your budget" },
            { ar: "خطة تنفيذ مكتوبة", en: "Written execution plan" },
            { ar: "تسجيل الجلسة للرجوع إليها", en: "Session recording for reference" }
        ]
    },
    {
        id: "s2",
        title: {
            ar: "بناء نظام أتمتة كامل",
            en: "Complete Automation System Building"
        },
        price: "1500$",
        description: {
            ar: "نقوم ببناء الأنظمة لك. من خدمة العملاء التلقائية إلى صناعة المحتوى الآلية.",
            en: "We build systems for you. From automatic customer service to automated content creation."
        },
        features: [
            { ar: "تصميم المعمارية التقنية", en: "Technical architecture design" },
            { ar: "ربط جميع الأدوات (Integration)", en: "Integrating all tools" },
            { ar: "تدريب الفريق على الاستخدام", en: "Team training on usage" },
            { ar: "دعم فني لمدة شهر", en: "One month technical support" },
            { ar: "توفير تكاليف الموظفين", en: "Staff cost savings" }
        ],
        isPopular: true
    }
];
