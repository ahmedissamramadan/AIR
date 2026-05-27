import { Metadata } from "next";
import { glossaryTerms } from "@/lib/data";

export const metadata: Metadata = {
    title: "قاموس المصطلحات | دليل الذكاء الاصطناعي العربي",
    description: "فهم مصطلحات الذكاء الاصطناعي ببساطة. شرح للمفاهيم التقنية مثل LLMs، الشبكات العصبية، والذكاء التوليدي بالعربية.",
    keywords: ["قاموس AI", "مصطلحات الذكاء الاصطناعي", "LLM", "شرح AI بالعربي"],
    openGraph: {
        title: "قاموس الذكاء الاصطناعي العربي | ذكاء",
        description: "أكثر من 45 مصطلح في الذكاء الاصطناعي مشروحة بالعربية بطريقة مبسطة.",
        type: "website",
    },
};

// Schema.org JSON-LD for glossary
function generateSchemaJsonLd() {
    const definedTerms = glossaryTerms.map((term) => ({
        "@type": "DefinedTerm",
        "@id": `https://zakaa-blog.vercel.app/glossary#${term.term.replace(/\s+/g, "-").toLowerCase()}`,
        "name": term.arabicTerm,
        "description": term.definition,
        "inDefinedTermSet": "https://zakaa-blog.vercel.app/glossary",
        "termCode": term.term,
    }));

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "DefinedTermSet",
                "@id": "https://zakaa-blog.vercel.app/glossary",
                "name": "قاموس الذكاء الاصطناعي العربي",
                "description": "مجموعة شاملة من مصطلحات الذكاء الاصطناعي مشروحة بالعربية",
                "inLanguage": "ar",
                "hasDefinedTerm": definedTerms,
            },
            {
                "@type": "ItemList",
                "name": "قائمة مصطلحات الذكاء الاصطناعي",
                "numberOfItems": glossaryTerms.length,
                "itemListElement": glossaryTerms.slice(0, 10).map((term, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": term.arabicTerm,
                    "description": term.definition,
                })),
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "الرئيسية",
                        "item": "https://zakaa-blog.vercel.app",
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "قاموس المصطلحات",
                        "item": "https://zakaa-blog.vercel.app/glossary",
                    },
                ],
            },
        ],
    };
}

export default function GlossaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const schemaJsonLd = generateSchemaJsonLd();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
            />
            {children}
        </>
    );
}
