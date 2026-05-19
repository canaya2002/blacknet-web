import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, Mail, Quote } from 'lucide-react';
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

function PillarsSection() {
  const t = useTranslations('about');
  const pillars = ['mission', 'vision', 'story'] as const;
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((key, i) => {
          const paragraphs = t.raw(`${key}.paragraphs`) as string[];
          return (
            <FadeInOnScroll key={key} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md">
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                  {t(`${key}.title`)}
                </h2>
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
                  {paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}

function FounderQuote() {
  const t = useTranslations('about.story');
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-10 md:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(168,85,247,0.10), transparent 60%)',
            }}
          />
          <Quote className="h-6 w-6 text-[color:var(--color-fg-tertiary)]" aria-hidden="true" />
          <p className="mt-4 text-balance text-2xl font-medium leading-snug text-[color:var(--color-fg)] md:text-3xl">
            &ldquo;{t('quote')}&rdquo;
          </p>
          <p className="mt-6 mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            — {t('quoteAuthor')}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function ValuesSection() {
  const t = useTranslations('about.values');
  const values = t.raw('items') as { title: string; body: string }[];
  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
          {t('title')}
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
  );
}

function DecisionsSection() {
  const t = useTranslations('about.decisions');
  const items = t.raw('items') as { title: string; body: string }[];
  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)] md:text-base">
            {t('subtitle')}
          </p>
        </div>
      </FadeInOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <FadeInOnScroll key={item.title} delay={i * 0.05}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-lg font-semibold tracking-tight text-[color:var(--color-fg)]">
                {item.title}
              </h3>
              <p className="text-sm text-[color:var(--color-fg-secondary)]">{item.body}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  const t = useTranslations('about');
  const bioParagraphs = t.raw('team.founder.bioParagraphs') as string[];
  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 backdrop-blur md:p-12">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div
              className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)]"
              style={{ boxShadow: '0 0 60px rgba(255,255,255,0.12)' }}
            >
              <Image
                src="/team/fundador.jpg"
                alt={t('team.founder.name')}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1">
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {t('team.title')}
              </p>
              <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                {t('team.founder.name')}
              </h3>
              <p className="text-sm text-[color:var(--color-fg-secondary)]">
                {t('team.founder.role')}
              </p>
              <div className="mt-4 flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
                {bioParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={`mailto:${t('team.founder.contactEmail')}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-[color:var(--color-fg)] underline-offset-4 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                {t('team.founder.contact')}
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-[color:var(--color-border)] pt-8">
            <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
              {t('team.hiring')}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-[color:var(--color-fg-secondary)]">
              {t('team.subtitle')}
            </p>
            <div className="mt-5">
              <Button asChild variant="secondary" size="sm">
                <Link href="/careers">
                  {t('team.title')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
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
      <FounderQuote />
      <PillarsSection />
      <ValuesSection />
      <DecisionsSection />
      <TeamSection />
      <CtaSection />
    </>
  );
}
