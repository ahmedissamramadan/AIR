'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { analytics } from '@/lib/analytics';
import clsx from 'clsx';

interface CopySystemButtonProps {
  systemSlug: string;
  systemTitle: string;
  prompt: string;
  language?: 'ar' | 'en';
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function CopySystemButton({
  systemSlug,
  systemTitle,
  prompt,
  language = 'ar',
  className,
  variant = 'primary',
  size = 'md',
  showLabel = true,
}: CopySystemButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      // Track event using analytics manager
      analytics.trackCopySystem(systemSlug, systemTitle);

      // Show success toast
      const message =
        language === 'ar'
          ? `تم نسخ Prompt "${systemTitle}" بنجاح! ✨`
          : `"${systemTitle}" copied to clipboard! ✨`;

      toast.success(message, {
        description:
          language === 'ar'
            ? 'الصق الـ Prompt في ChatGPT أو أي أداة ذكاء اصطناعي'
            : 'Paste it into ChatGPT or your favorite AI tool',
        duration: 5000,
      });

      // Reset button state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error(
        language === 'ar'
          ? 'فشل النسخ. حاول مرة أخرى.'
          : 'Failed to copy. Try again.'
      );
    }
  };

  const labelText =
    language === 'ar'
      ? copied
        ? 'تم النسخ!'
        : 'نسخ النظام'
      : copied
        ? 'Copied!'
        : 'Copy System';

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={clsx(
        'transition-all duration-300',
        copied && 'ring-2 ring-green-400',
        className
      )}
      disabled={copied}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {showLabel && <span className="ml-2">{labelText}</span>}
    </Button>
  );
}
