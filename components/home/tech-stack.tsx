import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/magic/section-header';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

type Partner = {
  key: 'anthropic' | 'vercel' | 'supabase' | 'stripe' | 'resend';
  href: string;
  comingSoon?: boolean;
  wordmark: React.ReactNode;
};

const partners: Partner[] = [
  {
    key: 'anthropic',
    href: 'https://anthropic.com',
    wordmark: (
      <span className="inline-flex items-center gap-2 text-xl font-medium tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M13.827 3.52h3.603L24 20.482h-3.603zm-7.258 0h3.738l6.594 16.962H13.39l-1.349-3.477H5.13l-1.35 3.477H0zm4.078 10.711h4.298L8.595 7.84z" />
        </svg>
        Anthropic
      </span>
    ),
  },
  {
    key: 'vercel',
    href: 'https://vercel.com',
    wordmark: (
      <span className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12 1.608 24 22.392H0Z" />
        </svg>
        Vercel
      </span>
    ),
  },
  {
    key: 'supabase',
    href: 'https://supabase.com',
    wordmark: (
      <span className="inline-flex items-center gap-2 text-xl font-medium tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M13.97 22.5c-.62.78-1.86.36-1.89-.64L11.81 9.7h8.1c1.47 0 2.29 1.69 1.37 2.83zM10.03 1.5c.62-.78 1.86-.36 1.89.64l.27 12.16H4.09c-1.47 0-2.29-1.69-1.37-2.83z" />
        </svg>
        Supabase
      </span>
    ),
  },
  {
    key: 'stripe',
    href: 'https://stripe.com',
    comingSoon: true,
    wordmark: (
      <span className="inline-flex items-center gap-2 text-xl font-bold italic tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.42-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.933-.444-2.834-1.177-5.444-1.177-1.853 0-3.4.481-4.503 1.385-1.156.948-1.753 2.296-1.753 3.948 0 2.99 1.832 4.252 4.815 5.318 1.918.681 2.555 1.165 2.555 1.918 0 .725-.622 1.143-1.751 1.143-1.392 0-3.689-.681-5.226-1.555l-.674 4.155c1.327.752 3.78 1.529 6.326 1.529 1.96 0 3.594-.464 4.696-1.34 1.232-.978 1.869-2.42 1.869-4.281 0-3.075-1.879-4.348-4.642-5.372z" />
        </svg>
        Stripe
      </span>
    ),
  },
  {
    key: 'resend',
    href: 'https://resend.com',
    wordmark: (
      <span className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M3 3v18h4v-6h3.5l3.5 6h4.5l-3.7-6.3c2.1-.8 3.7-2.7 3.7-5.2C18.5 6 16 3 12 3zm4 3.5h4.5c1.7 0 2.5 1 2.5 2.5s-.8 2.5-2.5 2.5H7z" />
        </svg>
        Resend
      </span>
    ),
  },
];

export function TechStack() {
  const t = useTranslations('home.techStack');

  return (
    <section className="container-page py-20 md:py-28">
      <FadeInOnScroll>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5">
          {partners.map((p) => (
            <a
              key={p.key}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-4 py-6 text-center text-[color:var(--color-fg-tertiary)] backdrop-blur transition-colors hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-fg)]"
            >
              {p.comingSoon && (
                <span className="absolute right-2 top-2 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 mono text-[8px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                  {t('stripeNote')}
                </span>
              )}
              {p.wordmark}
              <span className="text-[10px] leading-tight text-[color:var(--color-fg-tertiary)]">
                {t(`partners.${p.key}`)}
              </span>
            </a>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}
