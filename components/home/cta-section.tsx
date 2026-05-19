import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { AuthCtaAnchor } from '@/components/analytics/header-ctas';

export function CtaSection() {
  const t = useTranslations('home.cta');
  const tc = useTranslations('common');

  return (
    <section className="container-page pb-24">
      <FadeInOnScroll>
        <div className="relative isolate overflow-hidden rounded-3xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-10 md:p-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at center top, rgba(255,255,255,0.10), transparent 60%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="grid-pattern absolute inset-0 -z-10 opacity-30 mask-fade-b" />

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gradient md:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-pretty text-base text-[color:var(--color-fg-secondary)] md:text-lg">
              {t('description')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="primary">
                <AuthCtaAnchor variant="start_trial" sourceLocation="cta_section">
                  {t('primary')}
                  <ArrowRight className="h-4 w-4" />
                </AuthCtaAnchor>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t('secondary')}</Link>
              </Button>
            </div>
            <p className="mt-4 mono text-xs text-[color:var(--color-fg-tertiary)]">
              {tc('trial.noCard')}
            </p>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
