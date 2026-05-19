'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/types/analytics';

type Props = {
  slug: string;
  locale: Locale;
};

const SCROLL_DEPTHS = [25, 50, 75, 100] as const;
type ScrollDepth = (typeof SCROLL_DEPTHS)[number];

export function BlogReadTracker({ slug, locale }: Props) {
  const fired = useRef<Set<ScrollDepth>>(new Set());
  const dwellFired = useRef(false);

  useEffect(() => {
    let dwellTimer: ReturnType<typeof setTimeout> | null = null;

    const compute = (): number => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.scrollY || doc.scrollTop;
      const docHeight = Math.max(
        body.scrollHeight,
        doc.scrollHeight,
        body.offsetHeight,
        doc.offsetHeight,
      );
      const viewport = window.innerHeight;
      if (docHeight <= viewport) return 100;
      return Math.min(100, Math.round(((scrollTop + viewport) / docHeight) * 100));
    };

    const onScroll = () => {
      const pct = compute();
      for (const depth of SCROLL_DEPTHS) {
        if (pct >= depth && !fired.current.has(depth)) {
          fired.current.add(depth);
          trackEvent('blog_post_read', { slug, scroll_depth: depth, locale });
        }
      }
    };

    dwellTimer = setTimeout(() => {
      if (dwellFired.current) return;
      dwellFired.current = true;
      // 30s dwell — treat as a "read" of at least 25%.
      if (!fired.current.has(25)) {
        fired.current.add(25);
        trackEvent('blog_post_read', { slug, scroll_depth: 25, locale });
      }
    }, 30_000);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [slug, locale]);

  return null;
}
