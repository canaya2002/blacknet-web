import { track } from '@vercel/analytics';
import type { AnalyticsEventName, AnalyticsPropertiesFor, Device, Locale } from '@/types/analytics';

/**
 * Type-safe wrapper around `@vercel/analytics` `track()`.
 *
 * Vercel Analytics only sends events in production by design — calls during
 * `next dev` are silently no-ops, so we don't gate this ourselves.
 */
export function trackEvent<TName extends AnalyticsEventName>(
  name: TName,
  properties: AnalyticsPropertiesFor<TName>,
): void {
  try {
    track(name, properties as Record<string, string | number | boolean>);
  } catch {
    // Never let analytics break the user experience.
  }
}

export function detectDevice(): Device {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function pickLocale(value: string | undefined): Locale {
  return value === 'en' ? 'en' : 'es';
}

export function currentPath(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}
