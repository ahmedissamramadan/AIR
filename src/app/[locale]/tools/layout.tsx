import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'دليل الأدوات',
    description: 'مكتبة شاملة لأفضل أدوات الذكاء الاصطناعي المجانية والمدفوعة، مصنفة ومراجعة لمساعدتك في اختيار الأداة المناسبة.',
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
