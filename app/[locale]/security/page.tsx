import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Lock, Shield, Users2, FileSearch, ClipboardCheck, Bug } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { SecurityHeroVisual } from '@/components/hero-visuals/security';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'security.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/security', locale });
}

const icons = [Lock, Users2, ClipboardCheck, FileSearch, Shield, Bug];

function Principles() {
  const t = useTranslations('security');
  const principles = t.raw('principles') as { title: string; body: string }[];

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <FadeInOnScroll key={p.title} delay={i * 0.05}>
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-3 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
                    <Icon className="h-5 w-5 text-[color:var(--color-fg)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{p.title}</h3>
                  <p className="text-sm text-[color:var(--color-fg-secondary)]">{p.body}</p>
                </div>
              </GlowCard>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'security.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<SecurityHeroVisual />}
      />
      <Principles />
      <CtaSection />
    </>
  );
}
