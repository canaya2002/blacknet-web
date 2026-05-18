import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { buildMetadata } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { StatusHeroVisual } from '@/components/hero-visuals/status';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'status.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/status', locale });
}

const components = ['api', 'app', 'publishing', 'inbox', 'ai', 'auth'] as const;

export default async function StatusPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'status' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        visual={<StatusHeroVisual />}
      >
        <Badge variant="success">99.95% {t('uptime')} · 90d</Badge>
      </PageHero>

      <section className="container-page pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-md">
          <ul className="divide-y divide-[color:var(--color-border)]">
            {components.map((c) => (
              <li key={c} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-[color:var(--color-fg)]">{t(`components.${c}`)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="hidden h-5 items-center gap-0.5 sm:flex"
                    title="90-day uptime"
                  >
                    {Array.from({ length: 60 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-5 w-1 rounded-sm bg-emerald-400/80"
                      />
                    ))}
                  </div>
                  <span className="mono text-xs text-[color:var(--color-fg-tertiary)]">
                    99.95%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight text-[color:var(--color-fg)]">
            {t('history')}
          </h2>
          <div className="mt-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
            <p className="text-sm text-[color:var(--color-fg-secondary)]">{t('noIncidents')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
