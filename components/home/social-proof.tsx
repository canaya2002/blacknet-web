import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/magic/section-header';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Marquee } from '@/components/animations/marquee';
import { GlowCard } from '@/components/aceternity/card-hover';

const logos = [
  'Studio Norte',
  'Cafetería Nube',
  'Grupo Loma',
  'Aurum Capital',
  'Volar Travel',
  'Naranja Studio',
  'Magnolia Brands',
  'Coral Hotels',
  'Holos Health',
  'Verde Foods',
  'Lume Cosmetics',
  'Norte Logistics',
];

export function SocialProof() {
  const t = useTranslations('home.social');
  const tt = useTranslations('home.testimonials');

  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <FadeInOnScroll>
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        </FadeInOnScroll>

        <div className="mt-12">
          <Marquee>
            {logos.map((l) => (
              <span
                key={l}
                className="mono whitespace-nowrap text-lg text-[color:var(--color-fg-tertiary)] hover:text-[color:var(--color-fg-secondary)] transition-colors"
              >
                {l}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {(['1', '2', '3'] as const).map((id, i) => (
            <FadeInOnScroll key={id} delay={i * 0.08}>
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-5 p-7">
                  <Quote className="h-6 w-6 text-[color:var(--color-fg-tertiary)]" />
                  <p className="text-base leading-relaxed text-[color:var(--color-fg)]">
                    “{tt(`${id}.quote`)}”
                  </p>
                  <div className="mt-auto border-t border-[color:var(--color-border)] pt-4">
                    <p className="text-sm font-medium text-[color:var(--color-fg)]">
                      {tt(`${id}.author`)}
                    </p>
                    <p className="text-xs text-[color:var(--color-fg-tertiary)]">
                      {tt(`${id}.role`)}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
