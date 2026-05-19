'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrackedAnchor } from '@/components/analytics/tracked-anchor';
import { detectDevice, pickLocale, trackEvent } from '@/lib/analytics';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
};

export function HeroCtas({ primaryLabel, secondaryLabel }: Props) {
  const locale = pickLocale(useLocale());

  const fireHero = (ctaType: 'primary' | 'secondary') => {
    trackEvent('hero_cta_clicked', {
      cta_type: ctaType,
      locale,
      device: detectDevice(),
    });
    if (ctaType === 'primary') {
      trackEvent('app_redirect_clicked', {
        destination: 'login',
        source_page: window.location.pathname,
        source_location: 'hero',
        locale,
      });
      trackEvent('signup_clicked', {
        source_page: window.location.pathname,
        source_location: 'hero',
        locale,
      });
    }
  };

  return (
    <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
      <Button asChild size="lg" variant="primary">
        <TrackedAnchor
          href="https://app.blacknel.com/login"
          onClick={() => fireHero('primary')}
        >
          {primaryLabel}
          <ArrowRight className="h-4 w-4" />
        </TrackedAnchor>
      </Button>
      <Button asChild size="lg" variant="secondary">
        <Link href="/contact" onClick={() => fireHero('secondary')}>
          {secondaryLabel}
        </Link>
      </Button>
    </div>
  );
}
