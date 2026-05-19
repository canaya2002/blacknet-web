import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Download, Mail } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { formatDate } from '@/lib/utils';
import { PressHeroVisual } from '@/components/hero-visuals/press';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/press', locale });
}

function PressBody({ locale }: { locale: string }) {
  const t = useTranslations('press');
  const releases = t.raw('releases.items') as { date: string; title: string; excerpt: string }[];

  return (
    <>
      <section className="container-page pb-12 pt-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FadeInOnScroll>
            <GlowCard>
              <div className="flex flex-col gap-4 p-7">
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                  {t('logos.title')}
                </h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">
                  {t('logos.description')}
                </p>
                <div className="flex items-center gap-6 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-6">
                  <Logo />
                  <div className="text-[color:var(--color-fg-tertiary)]">Blacknel</div>
                </div>
                <Button asChild variant="secondary" size="md">
                  <a
                    href="/press/blacknel-logo-pack.zip"
                    download="blacknel-logo-pack.zip"
                  >
                    <Download className="h-4 w-4" />
                    {t('logos.download')}
                  </a>
                </Button>
              </div>
            </GlowCard>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06}>
            <GlowCard>
              <div className="flex flex-col gap-4 p-7">
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                  {t('brand.title')}
                </h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">
                  {t('brand.description')}
                </p>
                <div className="rounded-xl border border-[color:var(--color-border)] p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {['#0a0a0a', '#fafafa', '#a1a1aa', '#52525b'].map((c) => (
                      <div key={c} className="aspect-square rounded-md" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <Button asChild variant="secondary" size="md">
                  <a
                    href="/press/blacknel-brand-guidelines.pdf"
                    download="blacknel-brand-guidelines.pdf"
                  >
                    <Download className="h-4 w-4" />
                    {t('brand.download')}
                  </a>
                </Button>
              </div>
            </GlowCard>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FadeInOnScroll className="lg:col-span-2">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md md:p-9">
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                {t('boilerplate.title')}
              </h3>
              <div className="mt-5 space-y-5 text-sm">
                <div>
                  <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {t('boilerplate.shortLabel')}
                  </p>
                  <p className="mt-2 text-[color:var(--color-fg)]">{t('boilerplate.short')}</p>
                </div>
                <div>
                  <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {t('boilerplate.longLabel')}
                  </p>
                  <p className="mt-2 leading-relaxed text-[color:var(--color-fg-secondary)]">
                    {t('boilerplate.long')}
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.05}>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                {t('facts.title')}
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                {(t.raw('facts.items') as { label: string; value: string }[]).map((f) => (
                  <div key={f.label} className="flex items-start justify-between gap-3">
                    <dt className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                      {f.label}
                    </dt>
                    <dd className="text-right text-[color:var(--color-fg)]">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
          {t('releases.title')}
        </h2>
        <div className="flex flex-col gap-3">
          {releases.map((r) => (
            <FadeInOnScroll key={r.title}>
              <GlowCard>
                <div className="flex flex-col gap-2 p-6">
                  <p className="mono text-xs text-[color:var(--color-fg-tertiary)]">
                    {formatDate(r.date, locale)}
                  </p>
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{r.title}</h3>
                  <p className="text-sm text-[color:var(--color-fg-secondary)]">{r.excerpt}</p>
                </div>
              </GlowCard>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
          {t('coverage.title')}
        </h2>
        <div className="rounded-2xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-card)]/50 p-8 text-center backdrop-blur">
          <p className="text-sm text-[color:var(--color-fg-tertiary)]">{t('coverage.empty')}</p>
        </div>
      </section>

      <section className="container-page pb-20">
        <FadeInOnScroll>
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 backdrop-blur-md md:p-12">
            <h3 className="text-xl font-semibold text-[color:var(--color-fg)]">
              {t('founder.title')}
            </h3>
            <p className="mt-3 max-w-3xl text-sm text-[color:var(--color-fg-secondary)]">
              {t('founder.body')}
            </p>
            <div className="mt-6">
              <Button asChild variant="secondary" size="md">
                <a href="mailto:press@blacknel.com">
                  <Mail className="h-4 w-4" />
                  press@blacknel.com
                </a>
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
    </>
  );
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'press.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<PressHeroVisual />}
      />
      <PressBody locale={locale} />
    </>
  );
}
