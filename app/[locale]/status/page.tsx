import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle2, Mail } from 'lucide-react';
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

const components = ['app', 'api', 'webhooks', 'inbox', 'ai', 'auth', 'publishing'] as const;

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
        <div className="flex flex-col items-start gap-2">
          <Badge variant="success">99.95% {t('uptime')} · 90d</Badge>
          <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
            {t('lastCheck')}
          </p>
        </div>
      </PageHero>

      <section className="container-page pb-12">
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
                    title={`30-day uptime · ${t(`uptimes.${c}`)}`}
                  >
                    {Array.from({ length: 60 }).map((_, i) => (
                      <span key={i} className="h-5 w-1 rounded-sm bg-emerald-400/80" />
                    ))}
                  </div>
                  <span className="mono text-xs tabular-nums text-[color:var(--color-fg-tertiary)]">
                    {t(`uptimes.${c}`)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
          {t('disclaimer')}
        </p>
      </section>

      <section className="container-page pb-12">
        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
            <h2 className="text-base font-semibold text-[color:var(--color-fg)]">{t('history')}</h2>
            <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)]">{t('noIncidents')}</p>
          </div>
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
            <h2 className="text-base font-semibold text-[color:var(--color-fg)]">
              {t('maintenance')}
            </h2>
            <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)]">
              {t('noMaintenance')}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-[color:var(--color-fg-tertiary)]" />
            <div>
              <h2 className="text-base font-semibold text-[color:var(--color-fg)]">
                {t('subscribe.title')}
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">
                {t('subscribe.body')}
              </p>
              <a
                className="mt-2 inline-block mono text-xs text-[color:var(--color-fg)] underline-offset-4 hover:underline"
                href={`mailto:${t('subscribe.cta')}`}
              >
                {t('subscribe.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
