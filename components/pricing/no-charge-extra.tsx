import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

export function NoChargeExtra() {
  const t = useTranslations('pricing.noChargeExtra');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section className="container-page py-16 md:py-24">
      <FadeInOnScroll>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
            {t('title')}
          </h2>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 backdrop-blur"
            >
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-[color:var(--color-fg)]">{item.title}</p>
                <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}
