import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/magic/section-header';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { TrackedFaqAccordion } from '@/components/analytics/tracked-accordion';

type Q = { q: string; a: string };

export function Faq() {
  const t = useTranslations('home.faq');
  const questions = t.raw('questions') as Q[];

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <FadeInOnScroll>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-6 backdrop-blur md:px-8">
            <TrackedFaqAccordion questions={questions} page="home" />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
