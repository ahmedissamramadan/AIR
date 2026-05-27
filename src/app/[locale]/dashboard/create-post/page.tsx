'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FileText, Sparkles } from 'lucide-react';

export default function CreatePostPage() {
    const { user, loading: authLoading } = useAuth();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('ذكاء اصطناعي');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (authLoading) return <div className="container py-20 text-center">جاري التحميل...</div>;
    if (!user) {
        router.push('/auth/login');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const slug = title.trim().toLowerCase().replace(/\s+/g, '-');

        const { error } = await supabase
            .from('posts')
            .insert([
                {
                    title,
                    slug,
                    excerpt,
                    content,
                    category,
                    author_id: user.id,
                    date: new Date().toISOString().split('T')[0],
                },
            ]);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('تم نشر المقال بنجاح!');
            router.push(`/blog/${slug}`);
        }
        setLoading(false);
    };

    return (
        <div className="container max-w-4xl mx-auto py-20 px-4">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Sparkles className="text-primary" />
                    مساحة الكاتب
                </h1>
                <p className="text-muted-foreground">شارك معرفتك وساهم في إثراء المحتوى العملي للذكاء الاصطناعي</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="عنوان المقال"
                            placeholder="مثلاً: كيف تستخدم ChatGPT في البرمجة"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            required
                        />
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold mb-1.5 block">التصنيف</label>
                            <select
                                className="flex h-11 w-full rounded-lg border-2 border-[var(--neutral-200)] bg-background px-4 py-2 text-base focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 focus:outline-none transition-all"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="ذكاء اصطناعي">ذكاء اصطناعي</option>
                                <option value="إنتاجية">إنتاجية</option>
                                <option value="برمجة">برمجة</option>
                                <option value="بيزنس">بيزنس</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="وصف مختصر (Excerpt)"
                        placeholder="لخص مقالك في جملة واحدة جذابة"
                        value={excerpt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExcerpt(e.target.value)}
                        required
                    />

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold mb-1.5 block">محتوى المقال (HTML مدعوم حالياً)</label>
                        <textarea
                            className="w-full min-h-[300px] p-4 rounded-lg border-2 border-[var(--neutral-200)] bg-background focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 focus:outline-none transition-all resize-none"
                            placeholder="اكتب محتوى مقالك هنا..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" size="lg" className="flex-1" disabled={loading}>
                            <FileText size={18} className="ml-2" />
                            {loading ? 'جاري النشر...' : 'نشر المقال الآن'}
                        </Button>
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            إلغاء
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
