import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MessageCircle, MapPin, CalendarClock, Timer } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { ContactHeroVisual } from '@/components/hero-visuals/contact';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/contact',
    locale,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tRt = await getTranslations({ locale, namespace: 'contact.responseTimes' });

  const responseRows: { key: string; label: string }[] = [
    { key: 'demo', label: t('form.inquiries.demo') },
    { key: 'pricing', label: t('form.inquiries.pricing') },
    { key: 'support', label: t('form.inquiries.support') },
    { key: 'enterprise', label: t('form.inquiries.enterprise') },
    { key: 'press', label: t('form.inquiries.press') },
  ];

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        visual={<ContactHeroVisual />}
      />

      <section className="container-page pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <FadeInOnScroll className="lg:col-span-3">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 backdrop-blur-md md:p-9">
              <ContactForm />
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1} className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur md:p-7">
                <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                  {t('info.title')}
                </h3>
                <ul className="mt-4 flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                    <div>
                      <p className="text-[color:var(--color-fg-tertiary)]">{t('info.sales')}</p>
                      <a
                        href="mailto:sales@blacknel.com"
                        className="text-[color:var(--color-fg)] hover:underline"
                      >
                        sales@blacknel.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                    <div>
                      <p className="text-[color:var(--color-fg-tertiary)]">{t('info.support')}</p>
                      <a
                        href="mailto:support@blacknel.com"
                        className="text-[color:var(--color-fg)] hover:underline"
                      >
                        support@blacknel.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                    <div>
                      <p className="text-[color:var(--color-fg-tertiary)]">{t('info.office')}</p>
                      <p className="text-[color:var(--color-fg)]">{t('info.officeAddress')}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur md:p-7">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-[color:var(--color-fg-tertiary)]" />
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                    {tRt('title')}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-col gap-3 text-sm">
                  {responseRows.map((row) => (
                    <li key={row.key} className="border-l-2 border-[color:var(--color-border-strong)] pl-3">
                      <p className="text-[color:var(--color-fg)]">{row.label}</p>
                      <p className="mt-0.5 text-xs text-[color:var(--color-fg-tertiary)]">
                        {tRt(row.key)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 backdrop-blur md:p-7">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-[color:var(--color-fg-tertiary)]" />
                  <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                    {t('demo.title')}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-[color:var(--color-fg-secondary)]">
                  {t('demo.description')}
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-black/40">
                  <iframe
                    src="https://calendly.com/blacknel/demo?embed_domain=blacknel.com&background_color=0a0a0a&text_color=ffffff&primary_color=ffffff"
                    title="Blacknel demo calendar"
                    loading="lazy"
                    className="h-[640px] w-full"
                  />
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
