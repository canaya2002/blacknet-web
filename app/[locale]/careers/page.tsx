import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin, Briefcase, DollarSign, UserCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CareersHeroVisual } from '@/components/hero-visuals/careers';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/careers', locale });
}

const roles = ['engineer', 'designer', 'csm'] as const;
type RoleKey = (typeof roles)[number];

function Culture() {
  const t = useTranslations('careers.culture');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
          {t('title')}
        </h2>
      </FadeInOnScroll>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <FadeInOnScroll key={item.title} delay={i * 0.06}>
            <GlowCard className="h-full">
              <div className="flex h-full flex-col gap-3 p-6">
                <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{item.title}</h3>
                <p className="text-sm text-[color:var(--color-fg-secondary)]">{item.body}</p>
              </div>
            </GlowCard>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function NotSomething() {
  const t = useTranslations('careers.notSomething');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section className="container-page py-16">
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

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <FadeInOnScroll key={item.title} delay={i * 0.04}>
            <div className="flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 backdrop-blur">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-red-500/20 bg-red-500/10 mono text-[11px] text-red-300">
                ✕
              </div>
              <div>
                <p className="text-sm font-medium text-[color:var(--color-fg)]">{item.title}</p>
                <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">{item.body}</p>
              </div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

function RoleCard({ role, index }: { role: RoleKey; index: number }) {
  const t = useTranslations('careers');
  const tr = useTranslations(`careers.roles.${role}`);
  const tl = useTranslations('careers.sectionLabels');

  const sections: { key: 'about' | 'stack' | 'expectations' | 'extras' | 'howWeWork' | 'benefits' | 'process'; list: boolean }[] = [
    { key: 'about', list: false },
    { key: 'stack', list: true },
    { key: 'expectations', list: true },
    { key: 'extras', list: true },
    { key: 'howWeWork', list: true },
    { key: 'benefits', list: true },
    { key: 'process', list: true },
  ];

  return (
    <FadeInOnScroll delay={index * 0.06}>
      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md md:p-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <Badge variant="mono" className="self-start uppercase">
              {role}
            </Badge>
            <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--color-fg)]">
              {tr('title')}
            </h3>
            <p className="text-sm text-[color:var(--color-fg-secondary)]">{tr('summary')}</p>
          </div>
          <Button asChild variant="primary" size="md">
            <a
              href={`mailto:hiring@blacknel.com?subject=Application: ${tr('title')}`}
            >
              {t('apply')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetaRow icon={<MapPin className="h-3.5 w-3.5" />} value={tr('location')} />
          <MetaRow icon={<Briefcase className="h-3.5 w-3.5" />} value={tr('type')} />
          <MetaRow
            icon={<DollarSign className="h-3.5 w-3.5" />}
            label={t('salary')}
            value={tr('salary')}
          />
          <MetaRow
            icon={<UserCircle2 className="h-3.5 w-3.5" />}
            label={t('reportsTo')}
            value={tr('reportsTo')}
          />
        </div>

        <div className="mt-8">
          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.key} value={section.key}>
                <AccordionTrigger>{tl(section.key)}</AccordionTrigger>
                <AccordionContent>
                  {section.list ? (
                    <ul className="flex flex-col gap-2 text-sm">
                      {(tr.raw(section.key) as string[]).map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-[color:var(--color-fg-secondary)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed text-[color:var(--color-fg-secondary)]">
                      {tr(section.key)}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label?: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[color:var(--color-border)] bg-white/[0.02] px-3 py-2 text-xs">
      <span className="mt-0.5 text-[color:var(--color-fg-tertiary)]">{icon}</span>
      <div className="min-w-0 flex-1">
        {label && (
          <p className="mono text-[9px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
            {label}
          </p>
        )}
        <p className="truncate text-[color:var(--color-fg)]">{value}</p>
      </div>
    </div>
  );
}

function Roles() {
  const t = useTranslations('careers');
  return (
    <section className="container-page pb-20">
      <FadeInOnScroll>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
          {t('openRoles')}
        </h2>
      </FadeInOnScroll>
      <div className="flex flex-col gap-5">
        {roles.map((role, i) => (
          <RoleCard key={role} role={role} index={i} />
        ))}
      </div>
    </section>
  );
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'careers.hero' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<CareersHeroVisual />}
      />
      <Culture />
      <Roles />
      <NotSomething />
      <CtaSection />
    </>
  );
}
