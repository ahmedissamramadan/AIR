import { createClient } from '@supabase/supabase-js';

const isValidUrl = (url: string | undefined): url is string => {
    if (!url) return false;
    try {
        new URL(url);
        return url.startsWith('http');
    } catch {
        return false;
    }
};

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY')
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
