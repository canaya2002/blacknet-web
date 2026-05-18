import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MessageCircle, MapPin, CalendarClock } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { ContactForm } from '@/components/forms/contact-form';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Button } from '@/components/ui/button';
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
                <div className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 h-5 w-5 text-[color:var(--color-fg-tertiary)]" />
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                      {t('demo.title')}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--color-fg-secondary)]">
                      {t('demo.description')}
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="primary" size="md">
                        <a
                          href="https://calendly.com/blacknel/demo"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('demo.title')}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
