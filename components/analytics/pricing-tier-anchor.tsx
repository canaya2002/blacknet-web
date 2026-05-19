'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { TrackedAnchor } from '@/components/analytics/tracked-anchor';
import { pickLocale, trackEvent } from '@/lib/analytics';
import type { BillingPeriod, CtaSourceLocation, PricingTier } from '@/types/analytics';

type Props = {
  tier: PricingTier;
  billing?: BillingPeriod;
  sourceLocation: CtaSourceLocation;
  className?: string;
  children: ReactNode;
};

export function PricingTierAnchor({
  tier,
  billing = 'monthly',
  sourceLocation,
  className,
  children,
}: Props) {
  const locale = pickLocale(useLocale());

  const onClick = () => {
    trackEvent('pricing_tier_clicked', {
      tier,
      action: 'start_trial',
      billing,
      locale,
      source_location: sourceLocation,
    });
    trackEvent('app_redirect_clicked', {
      destination: 'login',
      source_page: window.location.pathname,
      source_location: sourceLocation,
      locale,
    });
    trackEvent('signup_clicked', {
      source_page: window.location.pathname,
      source_location: sourceLocation,
      locale,
    });
  };

  return (
    <TrackedAnchor
      href="https://app.blacknel.com/login"
      className={className}
      onClick={onClick}
    >
      {children}
    </TrackedAnchor>
  );
}
