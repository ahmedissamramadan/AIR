'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني');
            router.push('/auth/login');
        }
        setLoading(false);
    };

    return (
        <div className="container max-w-md mx-auto py-20 px-4">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">الاسم بالكامل</label>
                        <Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="أحمد عصام"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    لديك حساب بالفعل؟{' '}
                    <Link href="/auth/login" className="text-primary hover:underline">
                        تسجيل الدخول
                    </Link>
                </p>
            </div>
        </div>
    );
}
