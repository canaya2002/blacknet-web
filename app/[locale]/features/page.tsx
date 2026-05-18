import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Badge } from '@/components/ui/badge';
import { FeaturesHeroVisual } from '@/components/hero-visuals/features';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'features.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/features',
    locale,
  });
}

// Reordenado por importancia para la decisión de compra
const sections = ['ai', 'inbox', 'publishing', 'reviews', 'analytics', 'ads', 'listening'] as const;

function FeatureBlock({ slug, index }: { slug: (typeof sections)[number]; index: number }) {
  const t = useTranslations(`features.${slug}`);
  const bullets = t.raw('bullets') as string[];
  const reverse = index % 2 === 1;

  return (
    <FadeInOnScroll>
      <div
        className={`grid grid-cols-1 items-start gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        <div className="flex flex-col gap-5">
          <Badge variant="mono" className="self-start uppercase">
            {String(index + 1).padStart(2, '0')} · {slug}
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-[color:var(--color-fg-secondary)] md:text-lg">
            {t('lead')}
          </p>

          <div className="mt-2">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
              {t('howTitle')}
            </p>
            <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">{t('how')}</p>
          </div>

          <div className="mt-2">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
              {t('readyTitle')}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4">
            <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
              {t('forWhomTitle')}
            </p>
            <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">{t('forWhom')}</p>
          </div>
        </div>

        <GlowCard className="aspect-[4/3] overflow-hidden lg:sticky lg:top-24">
          <div className="relative flex h-full w-full items-center justify-center p-8">
            <div className="grid-pattern absolute inset-0 opacity-30" />
            <div className="relative flex flex-col gap-2.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="surface flex items-center gap-3 rounded-lg px-4 py-3 backdrop-blur"
                  style={{ width: 280 - i * 8 }}
                >
                  <div className="h-2 w-2 rounded-full bg-white/60" />
                  <div className="h-2 flex-1 rounded-full bg-white/10" />
                  <div className="mono text-[10px] text-[color:var(--color-fg-tertiary)]">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </FadeInOnScroll>
  );
}

function CompareTable() {
  const t = useTranslations('features.compareTable');
  const columns = t.raw('columns') as string[];
  const rows = t.raw('rows') as { label: string; values: string[] }[];

  const renderCell = (value: string, isBlacknel: boolean) => {
    if (value === '✓') {
      return (
        <Check
          aria-label="yes"
          className={`mx-auto h-4 w-4 ${isBlacknel ? 'text-emerald-400' : 'text-emerald-400/60'}`}
        />
      );
    }
    if (value === '—' || value === '-') {
      return <X aria-label="no" className="mx-auto h-4 w-4 text-[color:var(--color-fg-tertiary)]" />;
    }
    return (
      <span
        className={`text-xs ${isBlacknel ? 'font-medium text-[color:var(--color-fg)]' : 'text-[color:var(--color-fg-secondary)]'}`}
      >
        {value}
      </span>
    );
  };

  return (
    <FadeInOnScroll>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[color:var(--color-border)] bg-white/[0.02]">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={`px-4 py-4 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)] ${
                      i === 1 ? 'bg-white/[0.03] text-[color:var(--color-fg)]' : ''
                    } ${i > 0 ? 'text-center' : ''}`}
                  >
                    {col || ' '}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[color:var(--color-border)] last:border-0">
                  <td className="px-4 py-3 text-sm text-[color:var(--color-fg)]">{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td
                      key={vi}
                      className={`px-4 py-3 text-center ${vi === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      {renderCell(v, vi === 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-center mono text-[10px] text-[color:var(--color-fg-tertiary)]">
        {t('footnote')}
      </p>
    </FadeInOnScroll>
  );
}

function CompareSection() {
  const t = useTranslations('features.compareTable');
  return (
    <section className="container-page py-20">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)] md:text-base">
            {t('subtitle')}
          </p>
        </div>
      </FadeInOnScroll>
      <CompareTable />
    </section>
  );
}

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'features.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<FeaturesHeroVisual />}
      />
      <section className="container-page space-y-24 py-16 md:py-24">
        {sections.map((s, i) => (
          <FeatureBlock key={s} slug={s} index={i} />
        ))}
      </section>
      <CompareSection />
      <CtaSection />
    </>
  );
}
