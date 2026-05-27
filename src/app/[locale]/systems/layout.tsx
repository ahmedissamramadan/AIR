import { Metadata } from "next";

export const metadata: Metadata = {
    title: "الأنظمة الجاهزة | ذكاء",
    description: "أنظمة عمل جاهزة مدعومة بالذكاء الاصطناعي لتوفير وقتك وزيادة إنتاجيتك.",
};

export default function SystemsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
