'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import { Heart, ThumbsUp, Laugh, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const REACTIONS = [
    { emoji: '❤️', icon: Heart, label: 'love' },
    { emoji: '👍', icon: ThumbsUp, label: 'like' },
    { emoji: '😂', icon: Laugh, label: 'haha' },
    { emoji: '🎉', icon: PartyPopper, label: 'wow' },
];

interface ReactionSystemProps {
    postSlug: string;
    locale?: string;
}

export const ReactionSystem = ({ postSlug, locale = 'ar' }: ReactionSystemProps) => {
    const { user } = useAuth();
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [userReaction, setUserReaction] = useState<string | null>(null);
    const isAr = locale === 'ar';

    const fetchReactions = useCallback(async () => {
        // Fetch counts
        const { data: countsData, error: countsError } = await supabase
            .rpc('get_reaction_counts', { post_slug_param: postSlug });

        if (!countsError && countsData) {
            const formattedCounts: Record<string, number> = {};
            (countsData as { reaction_type: string; count: number }[]).forEach((item) => {
                formattedCounts[item.reaction_type] = item.count;
            });
            setCounts(formattedCounts);
        }

        // Fetch user reaction
        if (user) {
            const { data: userData, error: userError } = await supabase
                .from('reactions')
                .select('reaction_type')
                .eq('post_slug', postSlug)
                .eq('user_id', user.id)
                .single();

            if (!userError && userData) {
                setUserReaction(userData.reaction_type);
            }
        }
    }, [postSlug, user]);

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) await fetchReactions();
        };
        init();
        return () => { isMounted = false; };
    }, [fetchReactions]);

    const handleReact = async (type: string) => {
        if (!user) {
            toast.error(isAr ? 'يرجى تسجيل الدخول للتفاعل مع المقال' : 'Please log in to react to the article');
            return;
        }

        if (userReaction === type) {
            // Remove reaction
            await supabase
                .from('reactions')
                .delete()
                .eq('post_slug', postSlug)
                .eq('user_id', user.id);
            setUserReaction(null);
        } else {
            // Add/Update reaction
            await supabase
                .from('reactions')
                .upsert({
                    post_slug: postSlug,
                    user_id: user.id,
                    reaction_type: type,
                });
            setUserReaction(type);
        }
        fetchReactions();
    };

    return (
        <div className={`flex flex-wrap gap-4 items-center py-6 border-y border-border my-12 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <span className="text-sm font-bold text-muted-foreground mr-1">
                {isAr ? 'تفاعل مع المقال:' : 'React to this article:'}
            </span>
            <div className={`flex gap-2 ${isAr ? 'mr-auto md:mr-0' : 'ml-auto md:ml-0'}`}>
                {REACTIONS.map(({ emoji, icon: Icon, label }) => (
                    <button
                        key={label}
                        onClick={() => handleReact(label)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200",
                            userReaction === label
                                ? "bg-primary/10 border-primary text-primary scale-110 shadow-sm"
                                : "bg-card border-border hover:border-primary/50 text-foreground"
                        )}
                    >
                        <span className="text-lg leading-none">{emoji}</span>
                        <span className="text-xs font-bold">{counts[label] || 0}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
