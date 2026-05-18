import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { LegalDoc, LegalSection } from '@/components/layout/legal-doc';
import { LegalHeroVisual } from '@/components/hero-visuals/legal';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookies.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/cookies', locale });
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cookies.hero' });
  const es = locale === 'es';

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<LegalHeroVisual title="Cookie Policy" meta="Cookieless analytics" glow="blue" />}
      />
      <LegalDoc>
        <LegalSection title={es ? 'Qué cookies usamos' : 'Which cookies we use'}>
          <p>
            {es
              ? 'Usamos solo cookies funcionales necesarias para operar el Servicio. No usamos cookies de tracking, publicidad ni de terceros para analítica. Nuestra analítica se ejecuta con Plausible — un sistema sin cookies, GDPR-friendly y sin perfiles individuales.'
              : 'We use only functional cookies necessary to operate the Service. We do not use tracking cookies, advertising cookies, or third-party analytics cookies. Our analytics runs on Plausible — a cookieless, GDPR-friendly system with no individual profiles.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? 'Cookies funcionales' : 'Functional cookies'}>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              <strong className="text-[color:var(--color-fg)]">__Host-blacknel-session</strong> —{' '}
              {es
                ? 'identifica tu sesión de usuario autenticado. Caduca al cerrar sesión o tras 30 días de inactividad.'
                : 'identifies your authenticated user session. Expires on logout or after 30 days of inactivity.'}
            </li>
            <li>
              <strong className="text-[color:var(--color-fg)]">blacknel-lang</strong> —{' '}
              {es
                ? 'recuerda tu preferencia de idioma. Caduca en 1 año.'
                : 'remembers your language preference. Expires in 1 year.'}
            </li>
            <li>
              <strong className="text-[color:var(--color-fg)]">blacknel-theme</strong> —{' '}
              {es
                ? 'recuerda tu preferencia de tema. Caduca en 1 año.'
                : 'remembers your theme preference. Expires in 1 year.'}
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? 'Cómo desactivarlas' : 'How to disable them'}>
          <p>
            {es
              ? 'Las cookies funcionales son necesarias para operar el Servicio. Si las desactivas, no podrás iniciar sesión. Puedes desactivarlas desde la configuración de tu navegador en cualquier momento.'
              : 'Functional cookies are necessary to operate the Service. If you disable them, you will not be able to log in. You can disable them from your browser settings at any time.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
