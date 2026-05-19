import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AuroraBackground } from '@/components/aceternity/aurora-background';
import { Spotlight } from '@/components/aceternity/spotlight';
import { AnimatedShinyText } from '@/components/magic/animated-shiny-text';
import { Marquee } from '@/components/animations/marquee';
import { HeroCtas } from '@/components/analytics/hero-ctas';
import { HeroMockup } from './hero-mockup';

type TrustLogo = {
  name: string;
  className: string;
};

const trustLogos: TrustLogo[] = [
  { name: 'STUDIO·NORTE', className: 'mono font-medium tracking-[0.18em]' },
  { name: 'Cafetería Nube', className: 'font-serif italic font-light tracking-wide' },
  { name: 'GRUPO LOMA', className: 'font-bold tracking-tighter' },
  { name: 'AURUM', className: 'font-serif font-medium tracking-[0.32em] uppercase' },
  { name: 'volar·travel', className: 'font-light tracking-wide' },
  { name: 'naranja', className: 'mono font-semibold lowercase' },
  { name: 'MAGNOLIA', className: 'font-serif font-bold tracking-[0.14em]' },
  { name: 'CORAL HOTELS', className: 'font-light tracking-[0.22em]' },
  { name: 'holos health', className: 'font-medium tracking-tight' },
  { name: 'VERDE FOODS', className: 'mono font-semibold tracking-[0.18em]' },
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
          <Link
            href="/changelog"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors hover:border-[color:var(--color-border-hover)]"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <AnimatedShinyText>{t('badge')}</AnimatedShinyText>
            <ArrowRight className="h-3 w-3 text-[color:var(--color-fg-tertiary)] transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] text-gradient md:text-7xl lg:text-[88px] lg:leading-[0.95]">
            {t('title')}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base text-[color:var(--color-fg-secondary)] md:text-lg">
            {t('subtitle')}
          </p>

          <HeroCtas primaryLabel={t('ctaPrimary')} secondaryLabel={t('ctaSecondary')} />

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
          {trustLogos.map((logo) => (
            <span
              key={logo.name}
              className={`whitespace-nowrap text-lg text-[color:var(--color-fg-tertiary)] transition-colors hover:text-[color:var(--color-fg)] ${logo.className}`}
            >
              {logo.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
