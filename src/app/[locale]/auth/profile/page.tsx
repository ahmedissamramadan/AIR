'use client';

import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div className="container py-20 text-center">جاري التحميل...</div>;
    }

    if (!user) {
        router.push('/auth/login');
        return null;
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <div className="container max-w-2xl mx-auto py-20 px-4">
            <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-card bg-background flex items-center justify-center overflow-hidden">
                            <User size={64} className="text-muted-foreground" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">
                        {user.user_metadata?.full_name || 'مستخدم ذكاء'}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mb-8">
                        <Mail size={16} />
                        {user.email}
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                            <Shield className="text-primary" />
                            <div>
                                <p className="font-semibold text-sm">نوع الحساب</p>
                                <p className="text-xs text-muted-foreground">عضو أساسي</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-between items-center">
                        <Button variant="outline" onClick={() => router.push('/')}>
                            العودة للرئيسية
                        </Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={handleSignOut}>
                            <LogOut size={18} className="ml-2" />
                            تسجيل الخروج
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
