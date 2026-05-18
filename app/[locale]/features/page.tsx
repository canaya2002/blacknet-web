import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
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

const sections = ['inbox', 'publishing', 'reviews', 'ai', 'ads', 'analytics', 'listening'] as const;

function FeatureBlock({ slug, index }: { slug: (typeof sections)[number]; index: number }) {
  const t = useTranslations(`features.${slug}`);
  const bullets = t.raw('bullets') as string[];
  const reverse = index % 2 === 1;

  return (
    <FadeInOnScroll>
      <div
        className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
      >
        <div className="flex flex-col gap-4">
          <Badge variant="mono" className="self-start uppercase">
            {String(index + 1).padStart(2, '0')} · {slug}
          </Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-[color:var(--color-fg-secondary)] md:text-lg">
            {t('subtitle')}
          </p>
          <p className="text-sm text-[color:var(--color-fg-secondary)]">{t('description')}</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <GlowCard className="aspect-[4/3] overflow-hidden">
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
      <CtaSection />
    </>
  );
}
