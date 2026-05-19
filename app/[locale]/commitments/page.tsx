import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { GlowCard } from '@/components/aceternity/card-hover';
import { CtaSection } from '@/components/home/cta-section';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 3600;

const commitmentSlugs = [
  'professional-development',
  'diversity-equity-inclusion',
  'sustainability',
  'social-impact',
  'work-life-balance',
] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'commitments.index' });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/commitments',
    locale,
  });
}

function PrincipleBar() {
  const t = useTranslations('commitments.index');
  const items = t.raw('principleBar') as string[];
  return (
    <section className="container-page pt-2 pb-10">
      <FadeInOnScroll>
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4 backdrop-blur md:grid-cols-3 md:p-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-[color:var(--color-fg)]">{item}</span>
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function CommitmentsGrid() {
  const t = useTranslations('commitments.index');
  const tShared = useTranslations('commitments.shared');

  return (
    <section className="container-page py-14 md:py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {commitmentSlugs.map((slug, i) => (
          <FadeInOnScroll key={slug} delay={i * 0.06}>
            <Link href={`/commitments/${slug}`} className="group block h-full">
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-5 p-7">
                  <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
                    {String(i + 1).padStart(2, '0')} · {t('hero.eyebrow')}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                    {t(`cards.${slug}.title`)}
                  </h2>
                  <p className="text-sm text-[color:var(--color-fg-secondary)]">
                    {t(`cards.${slug}.tagline`)}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[color:var(--color-fg)] underline-offset-4 transition-all group-hover:underline">
                    {t('explore')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </GlowCard>
            </Link>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll delay={0.18}>
        <div className="mt-10 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-8 backdrop-blur md:p-10">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            {tShared('accountabilityHeading')}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)] md:text-3xl">
            {t('report.title')}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-[color:var(--color-fg-secondary)] md:text-base">
            {t('report.body')}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  );
}

export default async function CommitmentsIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'commitments.index.hero' });

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <PrincipleBar />
      <CommitmentsGrid />
      <CtaSection />
    </>
  );
}
