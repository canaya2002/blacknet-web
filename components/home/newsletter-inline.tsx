import { useTranslations } from 'next-intl';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { NewsletterForm } from '@/components/forms/newsletter-form';

export function NewsletterInline() {
  const t = useTranslations('home.newsletterInline');

  return (
    <section className="container-page py-20">
      <FadeInOnScroll>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-10 backdrop-blur md:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(168,85,247,0.12), transparent 60%)',
            }}
          />
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-fg-tertiary)]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--color-fg)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm text-[color:var(--color-fg-secondary)] md:text-base">
            {t('description')}
          </p>
          <div className="mt-6 max-w-md">
            <NewsletterForm sourceLocation="home_inline" />
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
