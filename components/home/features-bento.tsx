import {
  Bot,
  Calendar,
  Inbox,
  LineChart,
  MessageSquareHeart,
  Megaphone,
  Radar,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/magic/section-header';
import { GlowCard } from '@/components/aceternity/card-hover';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Badge } from '@/components/ui/badge';

type ItemKey = 'inbox' | 'publishing' | 'ai' | 'reviews' | 'analytics' | 'listening' | 'ads';

type Item = {
  key: ItemKey;
  span: string;
  icon: typeof Inbox;
  visual?: 'inbox' | 'ai' | 'analytics';
};

const items: Item[] = [
  { key: 'ai', span: 'md:col-span-1', icon: Bot, visual: 'ai' },
  { key: 'inbox', span: 'md:col-span-2', icon: Inbox, visual: 'inbox' },
  { key: 'publishing', span: 'md:col-span-1', icon: Calendar },
  { key: 'reviews', span: 'md:col-span-2', icon: MessageSquareHeart },
  { key: 'analytics', span: 'md:col-span-2', icon: LineChart, visual: 'analytics' },
  { key: 'listening', span: 'md:col-span-1', icon: Radar },
  { key: 'ads', span: 'md:col-span-3', icon: Megaphone },
];

function InboxVisual() {
  return (
    <div className="pointer-events-none mt-4 grid gap-1.5">
      {[
        { from: 'IG', name: 'María H.', preview: 'Hola, vi su nuevo…', dot: 'bg-pink-500' },
        { from: 'WA', name: 'Studio Norte', preview: 'Agendamos para…', dot: 'bg-emerald-500' },
        { from: 'in', name: 'Diego A.', preview: 'Gracias por el…', dot: 'bg-sky-500' },
      ].map((m) => (
        <div
          key={m.name}
          className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5"
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${m.dot}`} />
          <span className="mono text-[9px] text-[color:var(--color-fg-tertiary)]">{m.from}</span>
          <span className="truncate text-[10px] font-medium text-[color:var(--color-fg)]">
            {m.name}
          </span>
          <span className="ml-auto truncate text-[10px] text-[color:var(--color-fg-tertiary)]">
            {m.preview}
          </span>
        </div>
      ))}
    </div>
  );
}

function AiVisual() {
  return (
    <div className="pointer-events-none mt-4 space-y-2">
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-2.5">
        <p className="text-[10px] leading-snug text-[color:var(--color-fg)]">
          ¡Hola! Sí, disponible en Polanco y envío CDMX.
          <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white align-middle" />
        </p>
      </div>
      <div className="flex items-center gap-1">
        <span className="rounded-full border border-white/15 bg-white/[0.06] px-1.5 py-0.5 mono text-[8px] text-[color:var(--color-fg-secondary)]">
          tono · 96%
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-0.5 mono text-[8px] text-[color:var(--color-fg-tertiary)]">
          es-MX
        </span>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [38, 52, 41, 67, 73, 88, 64];
  return (
    <div className="pointer-events-none mt-4">
      <div className="flex items-end gap-1.5 h-16">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-white/[0.06] to-white/[0.4]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-base font-semibold text-[color:var(--color-fg)]">+24%</span>
        <span className="mono text-[9px] text-[color:var(--color-fg-tertiary)]">
          engagement · 7d
        </span>
      </div>
    </div>
  );
}

export function FeaturesBento() {
  const t = useTranslations('home.features');

  return (
    <section className="container-page py-24 md:py-32">
      <FadeInOnScroll>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
      </FadeInOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <FadeInOnScroll key={item.key} delay={i * 0.05} className={item.span}>
              <GlowCard className="h-full">
                <div className="flex h-full flex-col gap-5 p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur">
                      <Icon className="h-5 w-5 text-[color:var(--color-fg)]" />
                    </div>
                    <Badge variant="mono">{t(`${item.key}.tag`)}</Badge>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[color:var(--color-fg)]">
                      {t(`${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
                      {t(`${item.key}.description`)}
                    </p>
                  </div>
                  {item.visual === 'inbox' && <InboxVisual />}
                  {item.visual === 'ai' && <AiVisual />}
                  {item.visual === 'analytics' && <AnalyticsVisual />}
                </div>
              </GlowCard>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}
