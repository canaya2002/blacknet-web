import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { GlowCard } from '@/components/aceternity/card-hover';
import { Button } from '@/components/ui/button';
import { CtaSection } from '@/components/home/cta-section';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/structured-data';

const commitmentSlugs = [
  'professional-development',
  'diversity-equity-inclusion',
  'sustainability',
  'social-impact',
  'work-life-balance',
] as const;

type Slug = (typeof commitmentSlugs)[number];

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return commitmentSlugs.flatMap((slug) => [
    { locale: 'es', slug },
    { locale: 'en', slug },
  ]);
}

function isValidSlug(slug: string): slug is Slug {
  return (commitmentSlugs as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: `commitments.items.${slug}` });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: `/commitments/${slug}`,
    locale,
  });
}

type Principle = { title: string; body: string };
type Program = { title: string; body: string };
type Metric = { label: string; value: string; hint?: string };

function DescriptionSection({ slug }: { slug: Slug }) {
  const t = useTranslations(`commitments.items.${slug}`);
  const paragraphs = t.raw('description') as string[];
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-[color:var(--color-fg-secondary)] md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function PrinciplesSection({ slug }: { slug: Slug }) {
  const t = useTranslations(`commitments.items.${slug}`);
  const tShared = useTranslations('commitments.shared');
  const items = t.raw('principles') as Principle[];
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
          {tShared('principlesHeading')}
        </p>
      </FadeInOnScroll>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((p, i) => (
          <FadeInOnScroll key={p.title} delay={i * 0.05}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{p.title}</h3>
              <p className="text-sm text-[color:var(--color-fg-secondary)]">{p.body}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function ProgramsSection({ slug }: { slug: Slug }) {
  const t = useTranslations(`commitments.items.${slug}`);
  const tShared = useTranslations('commitments.shared');
  const programs = t.raw('programs') as Program[];
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
          {tShared('programsHeading')}
        </p>
      </FadeInOnScroll>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {programs.map((p, i) => (
          <FadeInOnScroll key={p.title} delay={(i % 4) * 0.04}>
            <GlowCard className="h-full">
              <div className="flex h-full items-start gap-4 p-6">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
                  <Check className="h-4 w-4 text-emerald-400/90" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[color:var(--color-fg)]">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
                    {p.body}
                  </p>
                </div>
              </div>
            </GlowCard>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function MetricsSection({ slug }: { slug: Slug }) {
  const t = useTranslations(`commitments.items.${slug}`);
  const tShared = useTranslations('commitments.shared');
  const metrics = t.raw('metrics') as Metric[];
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
          {tShared('metricsHeading')}
        </p>
      </FadeInOnScroll>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <FadeInOnScroll key={m.label} delay={i * 0.04}>
            <div className="flex h-full flex-col gap-2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
              <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                {m.label}
              </p>
              <p className="text-3xl font-semibold tracking-tight text-gradient-strong">{m.value}</p>
              {m.hint && (
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {m.hint}
                </p>
              )}
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function AccountabilitySection({ slug }: { slug: Slug }) {
  const t = useTranslations(`commitments.items.${slug}`);
  const tShared = useTranslations('commitments.shared');
  return (
    <section className="container-page py-12 md:py-16">
      <FadeInOnScroll>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-8 md:p-10">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            {tShared('accountabilityHeading')}
          </p>
          <p className="mt-3 text-base leading-relaxed text-[color:var(--color-fg)] md:text-lg">
            {t('accountability')}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="md">
              <Link href="/contact">
                {tShared('ctaButton')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="md">
              <Link href="/commitments">{tShared('viewAll')}</Link>
            </Button>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function NextCommitments({ currentSlug }: { currentSlug: Slug }) {
  const t = useTranslations('commitments.index');
  const tShared = useTranslations('commitments.shared');
  const others = commitmentSlugs.filter((s) => s !== currentSlug);
  return (
    <section className="container-page pb-20">
      <FadeInOnScroll>
        <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
          {tShared('viewAll')}
        </p>
      </FadeInOnScroll>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {others.map((slug, i) => (
          <FadeInOnScroll key={slug} delay={i * 0.04}>
            <Link href={`/commitments/${slug}`} className="group block h-full">
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 backdrop-blur transition-colors hover:border-[color:var(--color-border-hover)]">
                <p className="text-sm font-medium text-[color:var(--color-fg)]">
                  {t(`cards.${slug}.title`)}
                </p>
                <p className="text-xs text-[color:var(--color-fg-secondary)]">
                  {t(`cards.${slug}.tagline`)}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)] group-hover:text-[color:var(--color-fg)]">
                  {t('explore')}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

export default async function CommitmentDetail({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: `commitments.items.${slug}` });

  const url = siteUrl(`/${locale}/commitments/${slug}`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('title'),
    description: t('metaDescription'),
    url,
    inLanguage: locale === 'es' ? 'es-MX' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Blacknel',
      url: siteUrl('/'),
    },
    about: t('title'),
    publisher: {
      '@type': 'Organization',
      name: 'Blacknel',
      url: siteUrl('/'),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <DescriptionSection slug={slug} />
      <PrinciplesSection slug={slug} />
      <ProgramsSection slug={slug} />
      <MetricsSection slug={slug} />
      <AccountabilitySection slug={slug} />
      <NextCommitments currentSlug={slug} />
      <CtaSection />
    </>
  );
}
