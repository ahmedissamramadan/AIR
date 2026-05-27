'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('تم تسجيل الدخول بنجاح');
            router.push('/');
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="container max-w-md mx-auto py-20 px-4">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-center">تسجيل الدخول</h1>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        {loading ? 'جاري التحميل...' : 'دخول'}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    ليس لديك حساب؟{' '}
                    <Link href="/auth/signup" className="text-primary hover:underline">
                        أنشئ حساباً جديداً
                    </Link>
                </p>
            </div>
        </div>
    );
}
