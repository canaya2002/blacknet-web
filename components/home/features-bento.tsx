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

const items = [
  { key: 'inbox', span: 'md:col-span-2', icon: Inbox },
  { key: 'publishing', span: 'md:col-span-1', icon: Calendar },
  { key: 'ai', span: 'md:col-span-1', icon: Bot },
  { key: 'reviews', span: 'md:col-span-2', icon: MessageSquareHeart },
  { key: 'analytics', span: 'md:col-span-2', icon: LineChart },
  { key: 'listening', span: 'md:col-span-1', icon: Radar },
  { key: 'ads', span: 'md:col-span-3', icon: Megaphone },
] as const;

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
                  <div className="mt-auto">
                    <h3 className="text-xl font-semibold text-[color:var(--color-fg)]">
                      {t(`${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
                      {t(`${item.key}.description`)}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </FadeInOnScroll>
          );
        })}
      </div>
    </section>
  );
}
