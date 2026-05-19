'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { PricingTierAnchor } from '@/components/analytics/pricing-tier-anchor';
import { cn } from '@/lib/utils';

type Tier = 'standard' | 'growth' | 'enterprise';
const tiers: Tier[] = ['standard', 'growth', 'enterprise'];

type TierData = {
  name: string;
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  annualSavings: number;
  description: string;
  cta: string;
  features: string[];
};

function readTier(t: ReturnType<typeof useTranslations>, tier: Tier): TierData {
  const monthly = parseFloat(t(`${tier}.price`).replace(/,/g, ''));
  const annualMonthly = Math.round(monthly * 0.8);
  return {
    name: t(`${tier}.name`),
    monthly,
    annualMonthly,
    annualTotal: annualMonthly * 12,
    annualSavings: (monthly - annualMonthly) * 12,
    description: t(`${tier}.description`),
    cta: t(`${tier}.cta`),
    features: t.raw(`${tier}.features`) as string[],
  };
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US');
}

export function PricingCardsWithToggle() {
  const t = useTranslations('pricing');
  const tc = useTranslations('common');
  const tb = useTranslations('pricing.billing');
  const [annual, setAnnual] = useState(false);

  const data = tiers.map((tier) => ({ tier, ...readTier(t, tier) }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-1 backdrop-blur"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!annual}
            onClick={() => setAnnual(false)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm transition-colors',
              !annual
                ? 'bg-white text-black'
                : 'text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]',
            )}
          >
            {tb('monthly')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={annual}
            onClick={() => setAnnual(true)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors',
              annual
                ? 'bg-white text-black'
                : 'text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]',
            )}
          >
            {tb('annual')}
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 mono text-[9px]',
                annual ? 'bg-black/10 text-black' : 'bg-emerald-500/15 text-emerald-300',
              )}
            >
              {tb('annualBadge')}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {data.map(({ tier, name, monthly, annualMonthly, annualTotal, annualSavings, description, cta, features }, i) => {
          const highlight = tier === 'growth';
          const displayPrice = annual ? annualMonthly : monthly;
          return (
            <FadeInOnScroll key={tier} delay={i * 0.06}>
              <div
                className={cn(
                  'relative flex h-full flex-col gap-6 rounded-2xl border p-7 backdrop-blur-md transition-all',
                  highlight
                    ? 'z-10 border-white/25 bg-[color:var(--color-card-hover)] shadow-[0_0_80px_-12px_rgba(255,255,255,0.25)] ring-1 ring-white/10 md:scale-[1.03]'
                    : 'border-[color:var(--color-border)] bg-[color:var(--color-card)]',
                )}
              >
                {highlight && (
                  <Badge variant="accent" className="absolute right-7 top-7">
                    {tc('mostPopular')}
                  </Badge>
                )}
                <div>
                  <p className="mono text-xs uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-5xl font-semibold tracking-tight text-gradient-strong">
                      ${formatCurrency(displayPrice)}
                    </span>
                    <span className="mono text-sm text-[color:var(--color-fg-tertiary)]">
                      {tc('perMonth')}
                    </span>
                  </div>
                  {annual ? (
                    <p className="mt-1 mono text-[10px] uppercase tracking-wider text-emerald-300/80">
                      ${formatCurrency(annualTotal)} {tb('billedAnnually')} ·{' '}
                      {tb('savePerYear', { amount: `$${formatCurrency(annualSavings)}` })}
                    </p>
                  ) : (
                    <p className="mt-1 mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                      {tc('billedMonthly')}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)]">{description}</p>
                </div>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    asChild
                    variant={highlight ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full"
                  >
                    {tier === 'enterprise' ? (
                      <Link href="/contact">{cta}</Link>
                    ) : (
                      <PricingTierAnchor
                        tier={tier}
                        billing={annual ? 'annual' : 'monthly'}
                        sourceLocation="pricing_page"
                      >
                        {cta}
                      </PricingTierAnchor>
                    )}
                  </Button>
                </div>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>
    </div>
  );
}
