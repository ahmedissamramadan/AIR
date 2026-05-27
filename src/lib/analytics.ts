/**
 * Analytics Events Tracking
 * نظام تتبع الأحداث الرئيسية
 */

export type EventType =
  | 'view_video'
  | 'copy_system'
  | 'start_trial'
  | 'complete_payment'
  | 'view_demo'
  | 'click_cta'
  | 'download_file'
  | 'share_content';

export interface AnalyticsEvent {
  eventName: EventType;
  eventLabel?: string;
  eventValue?: string | number;
  timestamp: string;
  userAgent?: string;
  language?: string;
  [key: string]: string | number | boolean | undefined | null;
}

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private isProduction = false;

  constructor() {
    this.isProduction =
      typeof window !== 'undefined'
        ? window.location.hostname === 'zakaa.ai'
        : false;
  }

  /**
   * Track a video view event
   */
  trackVideoView(demoSlug: string, demoDuration: string) {
    this.trackEvent('view_video', {
      demo_slug: demoSlug,
      video_duration: demoDuration,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a system copy event
   */
  trackCopySystem(systemSlug: string, systemTitle: string) {
    this.trackEvent('copy_system', {
      system_slug: systemSlug,
      system_title: systemTitle,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a trial start event
   */
  trackStartTrial(planName: string) {
    this.trackEvent('start_trial', {
      plan_name: planName,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a payment completion event
   */
  trackPaymentComplete(
    planName: string,
    amount: number,
    currency: string = 'EGP'
  ) {
    this.trackEvent('complete_payment', {
      plan_name: planName,
      amount: amount,
      currency: currency,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a demo view event
   */
  trackDemoView(demoSlug: string, demoTitle: string) {
    this.trackEvent('view_demo', {
      demo_slug: demoSlug,
      demo_title: demoTitle,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a CTA click event
   */
  trackCTAClick(ctaText: string, ctaLocation: string) {
    this.trackEvent('click_cta', {
      cta_text: ctaText,
      cta_location: ctaLocation,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a file download event
   */
  trackFileDownload(fileName: string, fileFormat: string) {
    this.trackEvent('download_file', {
      file_name: fileName,
      file_format: fileFormat,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track a content share event
   */
  trackShare(contentTitle: string, platform: string) {
    this.trackEvent('share_content', {
      content_title: contentTitle,
      platform: platform,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Generic event tracking
   */
  private trackEvent(
    eventName: EventType,
    eventData: Record<string, string | number | boolean | undefined | null>
  ) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      ...eventData,
    };

    // Add to local buffer
    this.events.push(event);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, eventData);
    }

    // Log in development mode
    if (!this.isProduction) {
      console.log('📊 Analytics Event:', event);
    }

    // Send to backend API if in production
    if (this.isProduction && this.events.length >= 5) {
      this.flushEvents();
    }
  }

  /**
   * Flush accumulated events to backend
   */
  private async flushEvents() {
    if (this.events.length === 0) return;

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: this.events }),
      });

      this.events = [];
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
    }
  }

  /**
   * Flush on page unload
   */
  setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flushEvents();
      });
    }
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Setup before unload
if (typeof window !== 'undefined') {
  analytics.setupBeforeUnload();
}
