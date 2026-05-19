'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/types/analytics';

type Props = {
  locale: Locale;
};

/**
 * Calendly posts messages to `window` when the embed mounts and when a user
 * starts an event interaction. We fire `calendly_booking_started` on the first
 * `calendly.event_type_viewed` or `calendly.event_scheduled` message.
 */
export function CalendlyTracker({ locale }: Props) {
  useEffect(() => {
    let fired = false;
    const onMessage = (e: MessageEvent) => {
      const data = e.data as unknown;
      if (!data || typeof data !== 'object') return;
      const event = (data as { event?: unknown }).event;
      if (typeof event !== 'string' || !event.startsWith('calendly.')) return;
      if (fired) return;
      if (event === 'calendly.event_type_viewed' || event === 'calendly.event_scheduled') {
        fired = true;
        trackEvent('calendly_booking_started', {
          source_page: window.location.pathname,
          locale,
        });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [locale]);
  return null;
}
