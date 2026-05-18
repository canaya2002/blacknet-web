import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { CareersHeroVisual } from '@/components/hero-visuals/careers';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/careers', locale });
}

const roles = ['engineer', 'designer', 'csm'] as const;

function Culture() {
  const t = useTranslations('careers.culture');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
          {t('title')}
        </h2>
      </FadeInOnScroll>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <FadeInOnScroll key={item.title} delay={i * 0.06}>
            <GlowCard className="h-full">
              <div className="flex h-full flex-col gap-3 p-6">
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{item.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">{item.body}</p>
              </div>
            </GlowCard>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function Roles() {
  const t = useTranslations('careers');

  return (
    <section className="container-page pb-20">
      <FadeInOnScroll>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
          {t('openRoles')}
        </h2>
      </FadeInOnScroll>
      <div className="flex flex-col gap-4">
        {roles.map((role, i) => (
          <FadeInOnScroll key={role} delay={i * 0.06}>
            <div className="group relative flex flex-col items-start justify-between gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur-md transition-colors hover:border-[color:var(--color-border-hover)] md:flex-row md:items-center md:p-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-[color:var(--color-fg)]">
                  {t(`roles.${role}.title`)}
                </h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">
                  {t(`roles.${role}.summary`)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[color:var(--color-fg-tertiary)]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {t(`roles.${role}.location`)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {t(`roles.${role}.type`)}
                  </span>
                  <Badge variant="mono">{role}</Badge>
                </div>
              </div>
              <Button asChild variant="secondary" size="md">
                <a href={`mailto:hiring@blacknel.com?subject=Application: ${t(`roles.${role}.title`)}`}>
                  {t('apply')}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'careers.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<CareersHeroVisual />}
      />
      <Culture />
      <Roles />
      <CtaSection />
    </>
  );
}
