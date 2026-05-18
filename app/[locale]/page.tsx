import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, faqSchema } from '@/components/seo/structured-data';
import { Hero } from '@/components/home/hero';
import { FeaturesBento } from '@/components/home/features-bento';
import { HowItWorks } from '@/components/home/how-it-works';
import { SocialProof } from '@/components/home/social-proof';
import { PricingPreview } from '@/components/home/pricing-preview';
import { Faq } from '@/components/home/faq';
import { CtaSection } from '@/components/home/cta-section';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/',
    locale,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations({ locale, namespace: 'home.faq' });
  const faqQuestions = tFaq.raw('questions') as { q: string; a: string }[];

  return (
    <div id="main">
      <JsonLd data={faqSchema(faqQuestions)} />
      <Hero />
      <FeaturesBento />
      <HowItWorks />
      <SocialProof />
      <PricingPreview />
      <Faq />
      <CtaSection />
    </div>
  );
}
