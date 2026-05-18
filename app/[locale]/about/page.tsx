import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { AboutHeroVisual } from '@/components/hero-visuals/about';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/about',
    locale,
  });
}

function AboutBody() {
  const t = useTranslations('about');
  const values = t.raw('values.items') as { title: string; body: string }[];
  return (
    <>
      <section className="container-page py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {(['mission', 'vision', 'story'] as const).map((key, i) => (
            <FadeInOnScroll key={key} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md">
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                  {t(`${key}.title`)}
                </h2>
                <p className="text-sm text-[color:var(--color-fg-secondary)] leading-relaxed">
                  {t(`${key}.body`)}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <FadeInOnScroll>
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('values.title')}
          </h2>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <FadeInOnScroll key={v.title} delay={i * 0.06}>
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{v.title}</h3>
                  <p className="text-sm text-[color:var(--color-fg-secondary)]">{v.body}</p>
                </div>
              </GlowCard>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <FadeInOnScroll>
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 backdrop-blur md:p-12">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div
                aria-hidden="true"
                className="h-24 w-24 shrink-0 rounded-2xl border border-[color:var(--color-border-strong)] bg-[radial-gradient(circle_at_30%_30%,#ffffff,#52525b_55%,#0a0a0a)]"
                style={{ boxShadow: '0 0 60px rgba(255,255,255,0.18)' }}
              />
              <div>
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {t('team.title')}
                </p>
                <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                  {t('team.founder.name')}
                </h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">
                  {t('team.founder.role')}
                </p>
                <p className="mt-3 max-w-xl text-sm text-[color:var(--color-fg-secondary)]">
                  {t('team.founder.bio')}
                </p>
                <p className="mt-4 text-sm text-[color:var(--color-fg-secondary)]">
                  {t('team.subtitle')}
                </p>
                <div className="mt-5">
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/careers">
                      Careers
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
    </>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<AboutHeroVisual />}
      />
      <AboutBody />
      <CtaSection />
    </>
  );
}
