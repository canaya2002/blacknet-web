import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  Lock,
  Shield,
  Users2,
  FileSearch,
  ClipboardCheck,
  Bug,
  Server,
  Activity,
} from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { SecurityHeroVisual } from '@/components/hero-visuals/security';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'security.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/security', locale });
}

type Section = {
  slug: string;
  title: string;
  lead: string;
  subsections: { title: string; body: string }[];
};

const iconBySlug: Record<string, typeof Lock> = {
  encryption: Lock,
  multitenancy: Users2,
  rbac: ClipboardCheck,
  audit: FileSearch,
  compliance: Shield,
  bounty: Bug,
};

function PrincipleSections() {
  const t = useTranslations('security');
  const sections = t.raw('sections') as Section[];

  return (
    <section className="container-page py-16 md:py-24">
      <div className="space-y-16">
        {sections.map((s, i) => {
          const Icon = iconBySlug[s.slug] ?? Shield;
          return (
            <FadeInOnScroll key={s.slug}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
                    <Icon className="h-5 w-5 text-[color:var(--color-fg)]" />
                  </div>
                  <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
                    {String(i + 1).padStart(2, '0')} · {s.slug}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
                    {s.title}
                  </h2>
                  <p className="text-sm text-[color:var(--color-fg-secondary)]">{s.lead}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {s.subsections.map((sub) => (
                    <div
                      key={sub.title}
                      className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur"
                    >
                      <h3 className="text-base font-semibold text-[color:var(--color-fg)]">
                        {sub.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
                        {sub.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const t = useTranslations('security.architecture');
  const layers = t.raw('layers') as { title: string; body: string }[];
  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--color-fg-secondary)] md:text-base">
            {t('subtitle')}
          </p>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {layers.map((layer, i) => (
            <div
              key={layer.title}
              className="relative flex items-start gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 backdrop-blur"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[color:var(--color-border)] bg-white/[0.04] mono text-[11px] text-[color:var(--color-fg-secondary)]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[color:var(--color-fg)]">{layer.title}</p>
                <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">{layer.body}</p>
              </div>
              <Server className="hidden h-4 w-4 text-[color:var(--color-fg-tertiary)] md:block" />
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function IncidentsSection() {
  const t = useTranslations('security.incidents');
  const blocks = t.raw('blocks') as { title: string; body: string }[];
  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-tertiary)]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur"
            >
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-emerald-300" />
                <h3 className="text-base font-semibold text-[color:var(--color-fg)]">{b.title}</h3>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">{b.body}</p>
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'security.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<SecurityHeroVisual />}
      />
      <PrincipleSections />
      <ArchitectureSection />
      <IncidentsSection />
      <CtaSection />
    </>
  );
}
