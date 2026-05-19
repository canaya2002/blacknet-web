'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { TrackedAnchor } from '@/components/analytics/tracked-anchor';
import { pickLocale, trackEvent } from '@/lib/analytics';
import type { CtaSourceLocation } from '@/types/analytics';

type Variant = 'sign_in' | 'start_trial';

type Props = {
  variant: Variant;
  sourceLocation: CtaSourceLocation;
  className?: string;
  children: ReactNode;
};

export function AuthCtaAnchor({ variant, sourceLocation, className, children }: Props) {
  const locale = pickLocale(useLocale());
  const href = 'https://app.blacknel.com/login';
  const destination = 'login' as const;

  const onClick = () => {
    trackEvent('app_redirect_clicked', {
      destination,
      source_page: window.location.pathname,
      source_location: sourceLocation,
      locale,
    });
    if (variant === 'start_trial') {
      trackEvent('signup_clicked', {
        source_page: window.location.pathname,
        source_location: sourceLocation,
        locale,
      });
    }
  };

  return (
    <TrackedAnchor href={href} className={className} onClick={onClick}>
      {children}
    </TrackedAnchor>
  );
}
