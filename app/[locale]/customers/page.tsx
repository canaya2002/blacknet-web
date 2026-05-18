import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { GlowCard } from '@/components/aceternity/card-hover';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { NumberCounter } from '@/components/animations/number-counter';
import { CustomersHeroVisual } from '@/components/hero-visuals/customers';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'customers.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/customers',
    locale,
  });
}

const cases = ['studioNorte', 'cafeteriaNube', 'grupoLoma'] as const;

type ResultRaw = { value: string; suffix?: string; prefix?: string; label: string };

function CaseStudy({ slug, index }: { slug: (typeof cases)[number]; index: number }) {
  const t = useTranslations(`customers.cases.${slug}`);
  const ts = useTranslations('customers.sections');
  const results = t.raw('results') as ResultRaw[];

  return (
    <FadeInOnScroll>
      <GlowCard>
        <div className="grid grid-cols-1 gap-10 p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-5 flex flex-col gap-4">
            <Badge variant="mono" className="self-start">
              {String(index + 1).padStart(2, '0')}
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)] md:text-3xl">
              {t('company')}
            </h2>
            <p className="text-sm text-[color:var(--color-fg-tertiary)]">{t('industry')}</p>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-5">
              <Quote className="h-5 w-5 shrink-0 text-[color:var(--color-fg-tertiary)]" />
              <div>
                <p className="text-sm leading-relaxed text-[color:var(--color-fg)]">
                  &ldquo;{t('quote')}&rdquo;
                </p>
                <p className="mt-2 text-xs text-[color:var(--color-fg-tertiary)]">
                  — {t('person')}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-6">
            <div>
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {ts('background')}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
                {t('background')}
              </p>
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {ts('challenge')}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
                {t('challenge')}
              </p>
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {ts('implementation')}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">{t('solution')}</p>
            </div>
            <div>
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {ts('results')}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {results.map((r, j) => {
                  const numeric = parseFloat(r.value);
                  const isNumeric = !Number.isNaN(numeric);
                  return (
                    <div
                      key={j}
                      className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4"
                    >
                      <p className="text-3xl font-semibold text-gradient-strong tracking-tight">
                        {isNumeric ? (
                          <NumberCounter
                            to={numeric}
                            prefix={r.prefix}
                            suffix={r.suffix}
                            decimals={r.value.includes('.') ? 1 : 0}
                          />
                        ) : (
                          <span>{r.value}</span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-[color:var(--color-fg-secondary)]">
                        {r.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </FadeInOnScroll>
  );
}

export default async function CustomersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'customers.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<CustomersHeroVisual />}
      />
      <section className="container-page space-y-8 py-16 md:py-24">
        {cases.map((c, i) => (
          <CaseStudy key={c} slug={c} index={i} />
        ))}
      </section>
      <CtaSection />
    </>
  );
}
