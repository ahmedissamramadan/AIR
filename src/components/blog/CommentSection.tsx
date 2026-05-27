'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { MessageSquare, Send, User } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    profiles: {
        full_name: string;
    };
}

interface CommentSectionProps {
    postSlug: string;
    locale?: string;
}

export const CommentSection = ({ postSlug, locale = 'ar' }: CommentSectionProps) => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const isAr = locale === 'ar';

    const fetchComments = useCallback(async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*, profiles(full_name)')
            .eq('post_slug', postSlug)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data as Comment[]);
        }
    }, [postSlug]);

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) await fetchComments();
        };
        init();
        return () => { isMounted = false; };
    }, [fetchComments]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error(isAr ? 'يرجى تسجيل الدخول للتعليق' : 'Please log in to comment');
            return;
        }

        if (!newComment.trim()) return;

        setLoading(true);
        const { error } = await supabase
            .from('comments')
            .insert([
                {
                    content: newComment,
                    post_slug: postSlug,
                    user_id: user.id,
                },
            ]);

        if (error) {
            toast.error(error.message);
        } else {
            setNewComment('');
            fetchComments();
            toast.success(isAr ? 'تم إضافة التعليق' : 'Comment added successfully');
        }
        setLoading(false);
    };

    return (
        <div className={`mt-12 space-y-8 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <h3 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="text-primary" />
                {isAr ? `التعليقات (${comments.length})` : `Comments (${comments.length})`}
            </h3>

            {user ? (
                <form onSubmit={handleAddComment} className={`flex gap-4 ${isAr ? '' : 'flex-row-reverse'}`}>
                    <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={isAr ? "اكتب تعليقك هنا..." : "Write your comment here..."}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={loading} className={isAr ? '' : 'flex-row-reverse'}>
                        <Send size={18} className={isAr ? 'ml-2' : 'mr-2 rotate-180'} />
                        {isAr ? 'نشر' : 'Post'}
                    </Button>
                </form>
            ) : (
                <div className="p-6 rounded-xl bg-muted/30 border border-dashed border-border text-center">
                    <p className="text-muted-foreground mb-4">
                        {isAr ? 'يجب عليك تسجيل الدخول لتتمكن من إضافة تعليق' : 'You must log in to be able to add a comment'}
                    </p>
                    <Button variant="outline" onClick={() => window.location.href = `/${locale}/auth/login`}>
                        {isAr ? 'تسجيل الدخول' : 'Log In'}
                    </Button>
                </div>
            )}

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className={`flex gap-4 p-4 rounded-xl bg-card border border-border ${isAr ? '' : 'flex-row-reverse'}`}>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <User size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-bold text-sm">{comment.profiles?.full_name || (isAr ? 'مستخدم' : 'User')}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(comment.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US')}
                                </p>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">{comment.content}</p>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-muted-foreground py-10 italic">
                        {isAr ? 'لا توجد تعليقات بعد. كن أول من يعلق!' : 'No comments yet. Be the first to comment!'}
                    </p>
                )}
            </div>
        </div>
    );
};
