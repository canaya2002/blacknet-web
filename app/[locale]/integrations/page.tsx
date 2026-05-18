import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { AuroraBackground } from '@/components/aceternity/aurora-background';
import { CtaSection } from '@/components/home/cta-section';
import { IntegrationsExplorer } from '@/components/integrations/explorer';
import { NetworkVisual } from '@/components/integrations/network-visual';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'integrations.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/integrations',
    locale,
  });
}

export default async function IntegrationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'integrations.hero' });

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-20 md:pb-20 md:pt-24">
        <AuroraBackground />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="grid-pattern absolute inset-0 mask-fade-b opacity-40" />
        </div>

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5 text-center lg:text-left">
              <div className="flex items-center gap-2 lg:justify-start justify-center">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-gradient-to-r from-transparent to-white/40"
                />
                <Badge variant="mono">{t('eyebrow')}</Badge>
              </div>
              <h1
                className="text-balance text-5xl font-semibold tracking-[-0.04em] text-gradient-strong md:text-6xl xl:text-7xl"
                style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.08))' }}
              >
                {t('title')}
              </h1>
              <p className="text-pretty text-base text-[color:var(--color-fg-secondary)] md:text-lg lg:max-w-xl">
                {t('subtitle')}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 lg:justify-start justify-center">
                <div className="flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-1.5 backdrop-blur">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-secondary)]">
                    28 live
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-secondary)]">
                    4 soon
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-1.5 backdrop-blur">
                  <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-secondary)]">
                    OAuth · official APIs
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <NetworkVisual />
            </div>
          </div>
        </div>
      </section>

      <IntegrationsExplorer />
      <CtaSection />
    </>
  );
}
