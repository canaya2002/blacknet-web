import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/magic/section-header';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { DotPattern } from '@/components/magic/dot-pattern';

export function HowItWorks() {
  const t = useTranslations('home.howItWorks');
  const steps = ['step1', 'step2', 'step3'] as const;

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <DotPattern />
      <div className="container-page">
        <FadeInOnScroll>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        </FadeInOnScroll>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
          />
          {steps.map((step, i) => (
            <FadeInOnScroll key={step} delay={i * 0.1}>
              <div className="relative flex flex-col gap-4">
                <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] mono text-sm">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 24px rgba(255,255,255,0.12)' }} />
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)] leading-relaxed">
                  {t(`${step}.description`)}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
