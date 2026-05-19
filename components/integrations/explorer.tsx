'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Plug, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { GlowCard } from '@/components/aceternity/card-hover';
import { cn } from '@/lib/utils';
import { pickLocale, trackEvent } from '@/lib/analytics';
import type { IntegrationCategory } from '@/types/analytics';
import { integrationLogoMap } from './logos';

type Category = 'social' | 'ads' | 'reviews' | 'messaging' | 'crm' | 'communication';

type Integration = {
  name: string;
  category: Category;
  comingSoon?: boolean;
  featured?: boolean;
};

// Reordered per importance: social → ads → reviews → messaging → crm → communication
const integrations: Integration[] = [
  { name: 'Facebook', category: 'social', featured: true },
  { name: 'Instagram', category: 'social', featured: true },
  { name: 'LinkedIn', category: 'social' },
  { name: 'Twitter / X', category: 'social' },
  { name: 'TikTok', category: 'social', featured: true },
  { name: 'YouTube', category: 'social' },
  { name: 'Pinterest', category: 'social' },
  { name: 'Reddit', category: 'social' },
  { name: 'Threads', category: 'social', comingSoon: true },
  { name: 'Bluesky', category: 'social', comingSoon: true },
  { name: 'Google Ads', category: 'ads' },
  { name: 'Meta Ads', category: 'ads' },
  { name: 'LinkedIn Ads', category: 'ads' },
  { name: 'TikTok Ads', category: 'ads' },
  { name: 'Google Business Profile', category: 'reviews', featured: true },
  { name: 'Yelp', category: 'reviews' },
  { name: 'TripAdvisor', category: 'reviews' },
  { name: 'Trustpilot', category: 'reviews' },
  { name: 'Apple App Store', category: 'reviews' },
  { name: 'Google Play', category: 'reviews' },
  { name: 'WhatsApp Business', category: 'messaging', featured: true },
  { name: 'Facebook Messenger', category: 'messaging' },
  { name: 'Instagram DM', category: 'messaging' },
  { name: 'Telegram', category: 'messaging', comingSoon: true },
  { name: 'HubSpot', category: 'crm' },
  { name: 'Salesforce', category: 'crm' },
  { name: 'Pipedrive', category: 'crm' },
  { name: 'Slack', category: 'communication' },
  { name: 'Microsoft Teams', category: 'communication' },
  { name: 'Zapier', category: 'communication' },
  { name: 'Make', category: 'communication' },
  { name: 'n8n', category: 'communication' },
];

const categoryColors: Record<Category, string> = {
  social: 'from-pink-500/40 to-purple-500/40',
  ads: 'from-sky-500/40 to-blue-500/40',
  reviews: 'from-amber-500/40 to-orange-500/40',
  messaging: 'from-emerald-500/40 to-teal-500/40',
  crm: 'from-indigo-500/40 to-violet-500/40',
  communication: 'from-zinc-400/40 to-zinc-500/40',
};

const categoryOrder: Category[] = ['social', 'ads', 'reviews', 'messaging', 'crm', 'communication'];

export function IntegrationsExplorer() {
  const t = useTranslations('integrations');
  const tDesc = useTranslations('integrations.descriptions');
  const locale = pickLocale(useLocale());
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');

  const fireIntegrationClick = (integration: Integration) => {
    trackEvent('integration_clicked', {
      integration: integration.name,
      category: integration.category as IntegrationCategory,
      locale,
    });
  };

  const describe = (name: string): string => {
    try {
      return tDesc(name);
    } catch {
      return '';
    }
  };

  const featured = useMemo(
    () => integrations.filter((i) => i.featured && !i.comingSoon),
    [],
  );

  const filtered = useMemo(() => {
    return integrations.filter((i) => {
      const description = describe(i.name);
      const q = query.toLowerCase();
      const matchesQuery =
        !query ||
        i.name.toLowerCase().includes(q) ||
        description.toLowerCase().includes(q);
      const matchesTab = activeCategory === 'all' || i.category === activeCategory;
      return matchesQuery && matchesTab;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const groups: Record<Category, Integration[]> = {
      social: [],
      ads: [],
      reviews: [],
      messaging: [],
      crm: [],
      communication: [],
    };
    filtered.forEach((i) => {
      groups[i.category].push(i);
    });
    return groups;
  }, [filtered]);

  const stats = useMemo(
    () => ({
      total: integrations.length,
      live: integrations.filter((i) => !i.comingSoon).length,
      soon: integrations.filter((i) => i.comingSoon).length,
    }),
    [],
  );

  return (
    <>
      {/* Featured integrations */}
      <section className="container-page pt-4 pb-12">
        <FadeInOnScroll>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-tertiary)]">
                {t('featured.eyebrow')}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--color-fg)] md:text-3xl">
                {t('featured.title')}
              </h2>
            </div>
            <div className="hidden gap-3 md:flex">
              <Stat label={t('stats.total')} value={stats.total} />
              <Stat label={t('stats.live')} value={stats.live} accent="emerald" />
              <Stat label={t('stats.soon')} value={stats.soon} accent="amber" />
            </div>
          </div>
        </FadeInOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <FadeInOnScroll key={item.name} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => fireIntegrationClick(item)}
                className="block w-full text-left"
              >
                <FeaturedCard integration={item} description={describe(item.name)} liveLabel={t('stats.liveOfficial')} />
              </button>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* Search + filters */}
      <section className="container-page py-8">
        <div className="sticky top-16 z-20 -mx-2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/85 px-4 py-3 backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-tertiary)]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="h-10 pl-9"
                aria-label="Search integrations"
              />
            </div>

            <div className="flex flex-1 gap-1.5 overflow-x-auto no-scrollbar">
              {(['all', ...categoryOrder] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    'whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                    activeCategory === c
                      ? 'border-white/30 bg-white text-black'
                      : 'border-[color:var(--color-border)] text-[color:var(--color-fg-secondary)] hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-fg)]',
                  )}
                >
                  {t(`categories.${c}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grouped grid */}
      <section className="container-page space-y-16 pb-20">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <FadeInOnScroll>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${categoryColors[cat]}`}
                  />
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                    {t(`categories.${cat}`)}
                  </h3>
                  <span className="mono text-xs text-[color:var(--color-fg-tertiary)]">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>
              </FadeInOnScroll>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item, i) => (
                  <FadeInOnScroll key={item.name} delay={(i % 8) * 0.03}>
                    <button
                      type="button"
                      onClick={() => fireIntegrationClick(item)}
                      className="block w-full text-left"
                    >
                      <IntegrationCard
                        integration={item}
                        description={describe(item.name)}
                        comingSoonTooltip={t('stats.comingSoonTooltip')}
                        soonLabel={t('stats.soon')}
                      />
                    </button>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] py-16 text-center backdrop-blur">
            <p className="text-[color:var(--color-fg-secondary)]">
              {t('stats.noMatch', { query })}
            </p>
          </div>
        )}
      </section>

      {/* Build-your-own CTA */}
      <CustomCta />
    </>
  );
}

function CustomCta() {
  const t = useTranslations('integrations.custom');
  const apiList = t.raw('apiList') as string[];
  return (
    <section className="container-page pb-20">
      <FadeInOnScroll>
        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)] p-8 md:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at top left, rgba(168,85,247,0.18), transparent 60%), radial-gradient(ellipse at bottom right, rgba(96,165,250,0.18), transparent 60%)',
            }}
          />
          <div className="dot-pattern absolute inset-0 -z-10 opacity-30" />
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div>
              <Badge variant="mono">{t('badge')}</Badge>
              <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
                {t('title')}
              </h3>
              <p className="mt-3 max-w-md text-[color:var(--color-fg-secondary)]">{t('lead')}</p>

              <p className="mt-4 mono text-[11px] text-[color:var(--color-fg-tertiary)]">
                {t('apiBase')}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-[color:var(--color-fg-secondary)]">
                {apiList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[color:var(--color-fg-tertiary)]">{t('sla')}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4 backdrop-blur">
                <Plug className="h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                <code className="mono text-xs text-[color:var(--color-fg)]">
                  POST /v1/inbox/messages
                </code>
                <ArrowUpRight className="ml-auto h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4 backdrop-blur">
                <Sparkles className="h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                <code className="mono text-xs text-[color:var(--color-fg)]">
                  webhook.subscribe(&quot;review.created&quot;)
                </code>
                <ArrowUpRight className="ml-auto h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
              </div>
              <pre className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] bg-[#0a0a0a] p-4 text-[10px] leading-snug text-[color:var(--color-fg-secondary)]">
{`await fetch('https://api.blacknel.com/v1/inbox/messages', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${process.env.BLACKNEL_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    brand_id: 'br_2x4f...',
    channel: 'whatsapp',
    to: '+52155...',
    body: 'Hola María, tu pedido está listo 📦',
  }),
})`}
              </pre>
              <a
                href="mailto:sales@blacknel.com"
                className="mono text-xs text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]"
              >
                {t('cta')}
              </a>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'emerald' | 'amber';
}) {
  const dot =
    accent === 'emerald'
      ? 'bg-emerald-400'
      : accent === 'amber'
        ? 'bg-amber-400'
        : 'bg-white';
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-2 backdrop-blur">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="mono text-sm tabular-nums text-[color:var(--color-fg)]">{value}</span>
      <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
        {label}
      </span>
    </div>
  );
}

function FeaturedCard({
  integration,
  description,
  liveLabel,
}: {
  integration: Integration;
  description: string;
  liveLabel: string;
}) {
  const Logo = integrationLogoMap[integration.name];
  if (!Logo) return null;
  const gradient = categoryColors[integration.category];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur-md transition-colors hover:border-[color:var(--color-border-hover)]"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-3xl transition-opacity group-hover:opacity-60`}
      />
      <div className="relative flex items-start justify-between">
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a]/70 p-2 backdrop-blur-xl">
          <Logo className="h-12 w-12" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-[color:var(--color-fg-tertiary)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--color-fg)]" />
      </div>
      <div className="relative mt-6">
        <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">{integration.name}</h3>
        <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">{description}</p>
      </div>
      <div className="relative mt-5 flex items-center gap-2 border-t border-[color:var(--color-border)] pt-4">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
          {liveLabel}
        </span>
      </div>
    </motion.div>
  );
}

function IntegrationCard({
  integration,
  description,
  comingSoonTooltip,
  soonLabel,
}: {
  integration: Integration;
  description: string;
  comingSoonTooltip: string;
  soonLabel: string;
}) {
  const Logo = integrationLogoMap[integration.name];

  return (
    <GlowCard className="h-full">
      <div className="flex items-start gap-3 p-4">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/60 p-1.5 backdrop-blur">
          {Logo ? (
            <Logo className="h-10 w-10" />
          ) : (
            <div className="grid h-10 w-10 place-items-center mono text-xs text-[color:var(--color-fg-secondary)]">
              {integration.name.slice(0, 2)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-medium text-[color:var(--color-fg)]">
              {integration.name}
            </h4>
            {integration.comingSoon ? (
              <Badge
                variant="warning"
                className="shrink-0 text-[9px]"
                title={comingSoonTooltip}
              >
                {soonLabel}
              </Badge>
            ) : (
              <span
                aria-hidden="true"
                className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]"
                title="Live"
              />
            )}
          </div>
          <p className="mt-1 text-xs text-[color:var(--color-fg-secondary)] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}
