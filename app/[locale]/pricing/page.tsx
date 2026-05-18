import { Check, X } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/layout/page-hero';
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
import { PricingCardsWithToggle } from '@/components/pricing/billing-toggle';
import { NoChargeExtra } from '@/components/pricing/no-charge-extra';

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
        <PricingCardsWithToggle />
      </section>

      <NoChargeExtra />

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
