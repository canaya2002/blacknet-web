import { Check, X } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CtaSection } from '@/components/home/cta-section';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, productSchema, faqSchema } from '@/components/seo/structured-data';
import { PricingHeroVisual } from '@/components/hero-visuals/pricing';
import { cn } from '@/lib/utils';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/pricing',
    locale,
  });
}

const tiers = ['standard', 'growth', 'enterprise'] as const;

function PricingCards() {
  const t = useTranslations('pricing');
  const tc = useTranslations('common');

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {tiers.map((tier, i) => {
        const features = t.raw(`${tier}.features`) as string[];
        const highlight = tier === 'growth';
        return (
          <FadeInOnScroll key={tier} delay={i * 0.06}>
            <div
              className={cn(
                'relative flex h-full flex-col gap-6 rounded-2xl border p-7 backdrop-blur-md',
                highlight
                  ? 'border-white/20 bg-[color:var(--color-card-hover)] shadow-[0_0_80px_-12px_rgba(255,255,255,0.2)]'
                  : 'border-[color:var(--color-border)] bg-[color:var(--color-card)]',
              )}
            >
              {highlight && (
                <Badge variant="accent" className="absolute right-7 top-7">
                  {tc('mostPopular')}
                </Badge>
              )}
              <div>
                <p className="mono text-xs uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {t(`${tier}.name`)}
                </p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-tight text-gradient-strong">
                    ${t(`${tier}.price`)}
                  </span>
                  <span className="mono text-sm text-[color:var(--color-fg-tertiary)]">
                    {tc('perMonth')}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)]">
                  {t(`${tier}.description`)}
                </p>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  asChild
                  variant={highlight ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  {tier === 'enterprise' ? (
                    <Link href="/contact">{t(`${tier}.cta`)}</Link>
                  ) : (
                    <a href="https://app.blacknel.com/signup">{t(`${tier}.cta`)}</a>
                  )}
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        );
      })}
    </div>
  );
}

function ComparisonTable() {
  const t = useTranslations('pricing.comparison');
  const rows = t.raw('rows') as {
    feature: string;
    standard: string;
    growth: string;
    enterprise: string;
  }[];

  const renderCell = (val: string) => {
    if (val === '✓')
      return <Check className="mx-auto h-4 w-4 text-emerald-400/80" aria-label="included" />;
    if (val === '—')
      return <X className="mx-auto h-4 w-4 text-[color:var(--color-fg-tertiary)]" aria-label="not included" />;
    return <span className="text-[color:var(--color-fg)]">{val}</span>;
  };

  return (
    <FadeInOnScroll>
      <div className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-border)]">
                <th className="px-5 py-4 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {t('feature')}
                </th>
                <th className="px-5 py-4 text-center mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  Standard
                </th>
                <th className="px-5 py-4 text-center mono text-[10px] uppercase tracking-wider text-white">
                  Growth
                </th>
                <th className="px-5 py-4 text-center mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-[color:var(--color-border)] last:border-b-0">
                  <td className="px-5 py-3.5 text-[color:var(--color-fg-secondary)]">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3.5 text-center text-[color:var(--color-fg-secondary)]">
                    {renderCell(row.standard)}
                  </td>
                  <td className="px-5 py-3.5 text-center bg-white/[0.02]">
                    {renderCell(row.growth)}
                  </td>
                  <td className="px-5 py-3.5 text-center text-[color:var(--color-fg-secondary)]">
                    {renderCell(row.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

function PricingFaq() {
  const t = useTranslations('pricing.faq');
  const questions = t.raw('questions') as { q: string; a: string }[];

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-6 backdrop-blur md:px-8">
      <h3 className="sr-only">{t('title')}</h3>
      <Accordion type="single" collapsible>
        {questions.map((q, i) => (
          <AccordionItem key={i} value={`q-${i}`}>
            <AccordionTrigger>{q.q}</AccordionTrigger>
            <AccordionContent>{q.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing.hero' });
  const tComp = await getTranslations({ locale, namespace: 'pricing.comparison' });
  const tFaq = await getTranslations({ locale, namespace: 'pricing.faq' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const faqQuestions = tFaq.raw('questions') as { q: string; a: string }[];

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema(faqQuestions)} />
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<PricingHeroVisual />}
      >
        <p className="mono text-xs text-[color:var(--color-fg-tertiary)]">{tc('trial.noCard')}</p>
      </PageHero>

      <section className="container-page py-12 md:py-16">
        <PricingCards />
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {tComp('title')}
          </h2>
          <p className="mt-3 text-[color:var(--color-fg-secondary)]">{tComp('subtitle')}</p>
        </div>
        <ComparisonTable />
      </section>

      <section className="container-page pb-16 md:pb-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {tFaq('title')}
          </h2>
        </div>
        <PricingFaq />
      </section>

      <CtaSection />
    </>
  );
}
