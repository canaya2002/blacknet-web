import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, BookOpen, Code2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { DocsHeroVisual } from '@/components/hero-visuals/docs';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/docs', locale });
}

function DocsBody() {
  const t = useTranslations('docs');
  const what = t.raw('what.items') as string[];
  const operational = t.raw('operational.items') as string[];

  return (
    <>
      <section className="container-page pb-12 pt-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-10 text-center backdrop-blur-md">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)]">
            <BookOpen className="h-5 w-5 text-[color:var(--color-fg)]" />
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-fg-secondary)]">
            REST API · Webhooks · SDK · Multi-tenant guides
          </p>
          <div className="mt-6">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                {t('cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeInOnScroll>
            <div className="h-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur">
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                {t('what.title')}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {what.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06}>
            <div className="h-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur">
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                {t('operational.title')}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {operational.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="container-page pb-12">
        <FadeInOnScroll>
          <div className="mx-auto max-w-4xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur md:p-10">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
              <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                {t('sampleTitle')}
              </h3>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-[color:var(--color-border)] bg-[#0a0a0a] p-5 text-[11px] leading-relaxed text-[color:var(--color-fg-secondary)]">
{`// Próximamente: @blacknel/sdk
import { Blacknel } from '@blacknel/sdk'

const client = new Blacknel({
  apiKey: process.env.BLACKNEL_API_KEY,
})

// Send unified inbox message
await client.inbox.send({
  brandId: 'br_2x4f...',
  channel: 'whatsapp',
  to: '+52155...',
  body: 'Hola María, tu pedido está listo 📦',
})

// Schedule social post
await client.posts.schedule({
  brandId: 'br_2x4f...',
  channels: ['instagram', 'facebook', 'linkedin'],
  publishAt: new Date('2026-06-15T15:00:00-06:00'),
  content: {
    text: '...',
    media: ['https://...'],
  },
})

// Subscribe to webhook
client.webhooks.subscribe({
  url: 'https://your-app.com/webhooks/blacknel',
  events: ['message.received', 'review.created'],
})`}
            </pre>
          </div>
        </FadeInOnScroll>
      </section>

      <section className="container-page pb-16">
        <FadeInOnScroll>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-8 text-center backdrop-blur">
            <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
              {t('earlyAccess.title')}
            </h3>
            <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
              {t('earlyAccess.body')}
            </p>
            <div className="mt-5">
              <Button asChild variant="primary" size="md">
                <a href="mailto:sales@blacknel.com">sales@blacknel.com</a>
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
    </>
  );
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'docs.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<DocsHeroVisual />}
      />
      <DocsBody />
    </>
  );
}
