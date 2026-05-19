'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function NotFoundTracker() {
  useEffect(() => {
    trackEvent('page_not_found', {
      attempted_path: window.location.pathname,
      referrer: document.referrer || '',
    });
  }, []);
  return null;
}
