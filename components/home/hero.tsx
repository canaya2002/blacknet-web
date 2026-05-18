import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { AuroraBackground } from '@/components/aceternity/aurora-background';
import { Spotlight } from '@/components/aceternity/spotlight';
import { AnimatedShinyText } from '@/components/magic/animated-shiny-text';
import { Marquee } from '@/components/animations/marquee';
import { HeroMockup } from './hero-mockup';

const trustLogos = [
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
];

export function Hero() {
  const t = useTranslations('home.hero');
  const tc = useTranslations('common');

  return (
    <section className="relative isolate overflow-hidden pb-32 pt-20 md:pt-28">
      <AuroraBackground />
      <Spotlight />

      <div className="container-page relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors hover:border-[color:var(--color-border-hover)]"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <AnimatedShinyText>{t('badge')}</AnimatedShinyText>
            <ArrowRight className="h-3 w-3 text-[color:var(--color-fg-tertiary)] transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] text-gradient md:text-7xl lg:text-[88px] lg:leading-[0.95]">
            {t('title')}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base text-[color:var(--color-fg-secondary)] md:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <a href="https://app.blacknel.com/signup">
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">{t('ctaSecondary')}</Link>
            </Button>
          </div>
          <p className="mt-4 mono text-xs text-[color:var(--color-fg-tertiary)]">
            {tc('trial.noCard')}
          </p>
        </div>

        <div className="relative mt-20 md:mt-24">
          <HeroMockup />
        </div>
      </div>

      <div className="relative z-10 mt-24">
        <p className="mb-6 text-center mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-tertiary)]">
          {t('trustBar')}
        </p>
        <Marquee speed="slow">
          {trustLogos.map((name) => (
            <span
              key={name}
              className="mono whitespace-nowrap text-base text-[color:var(--color-fg-tertiary)] hover:text-[color:var(--color-fg-secondary)] transition-colors"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
