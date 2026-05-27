'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// You shoud replace this with your actual measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export function GoogleAnalytics() {
    return (
        <Suspense fallback={null}>
            <GoogleAnalyticsInner />
        </Suspense>
    );
}

function GoogleAnalyticsInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname && window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: pathname,
            });
        }
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}

// Helper to track events
export const trackEvent = (
    action: string,
    params?: Record<string, unknown>
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, params);
    }
};
