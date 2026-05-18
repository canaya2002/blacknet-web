import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/magic/section-header';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Tier = 'standard' | 'growth' | 'enterprise';

export function PricingPreview() {
  const t = useTranslations('home.pricing');
  const tp = useTranslations('pricing');
  const tc = useTranslations('common');

  const tiers: { key: Tier; highlight?: boolean; features: number }[] = [
    { key: 'standard', features: 5 },
    { key: 'growth', highlight: true, features: 7 },
    { key: 'enterprise', features: 7 },
  ];

  return (
    <section id="pricing-preview" className="relative py-24 md:py-32">
      <div className="container-page">
        <FadeInOnScroll>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        </FadeInOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const features = tp.raw(`${tier.key}.features`) as string[];
            return (
              <FadeInOnScroll key={tier.key} delay={i * 0.08}>
                <div
                  className={cn(
                    'relative flex h-full flex-col gap-6 rounded-2xl border p-7 backdrop-blur-md transition-colors',
                    tier.highlight
                      ? 'border-white/20 bg-[color:var(--color-card-hover)] shadow-[0_0_60px_-12px_rgba(255,255,255,0.18)]'
                      : 'border-[color:var(--color-border)] bg-[color:var(--color-card)] hover:border-[color:var(--color-border-hover)]',
                  )}
                >
                  {tier.highlight && (
                    <Badge variant="accent" className="absolute right-7 top-7">
                      {tc('mostPopular')}
                    </Badge>
                  )}
                  <div>
                    <p className="mono text-xs uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                      {tp(`${tier.key}.name`)}
                    </p>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-5xl font-semibold tracking-tight text-gradient-strong">
                        ${tp(`${tier.key}.price`)}
                      </span>
                      <span className="mono text-sm text-[color:var(--color-fg-tertiary)]">
                        {tc('perMonth')}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)]">
                      {tp(`${tier.key}.description`)}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 text-sm">
                    {features.slice(0, tier.features).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      asChild
                      variant={tier.highlight ? 'primary' : 'secondary'}
                      size="md"
                      className="w-full"
                    >
                      {tier.key === 'enterprise' ? (
                        <Link href="/contact">{tp(`${tier.key}.cta`)}</Link>
                      ) : (
                        <a href="https://app.blacknel.com/signup">{tp(`${tier.key}.cta`)}</a>
                      )}
                    </Button>
                  </div>
                </div>
              </FadeInOnScroll>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="mono text-sm text-[color:var(--color-fg-secondary)] underline-offset-4 hover:text-[color:var(--color-fg)] hover:underline"
          >
            {tc('viewPricing')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
