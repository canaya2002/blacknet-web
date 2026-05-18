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

  const cookies = [
    {
      name: '__Host-blacknel-session',
      purpose: es
        ? 'Mantener tu sesión autenticada en app.blacknel.com'
        : 'Keep your authenticated session on app.blacknel.com',
      duration: es ? '30 días o logout' : '30 days or logout',
      type: es ? 'Esencial' : 'Essential',
    },
    {
      name: 'blacknel-lang',
      purpose: es ? 'Recordar tu idioma preferido' : 'Remember your preferred language',
      duration: es ? '1 año' : '1 year',
      type: es ? 'Funcional' : 'Functional',
    },
    {
      name: 'blacknel-theme',
      purpose: es ? 'Recordar tu preferencia de tema' : 'Remember your theme preference',
      duration: es ? '1 año' : '1 year',
      type: es ? 'Funcional' : 'Functional',
    },
  ];

  const notUsed = [
    'Google Analytics',
    'Facebook Pixel',
    'LinkedIn Insight Tag',
    'TikTok Pixel',
    'Hotjar / FullStory / Microsoft Clarity',
    es ? 'Cookies publicitarias de cualquier red' : 'Advertising cookies from any network',
  ];

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
        <LegalSection title={es ? '¿Qué son cookies?' : 'What are cookies?'}>
          <p>
            {es
              ? 'Cookies son pequeños archivos de texto que un sitio web guarda en tu navegador para recordar información sobre tu visita. Pueden ser de "sesión" (se borran al cerrar el navegador) o "persistentes" (duran hasta una fecha de expiración o hasta que las elimines).'
              : 'Cookies are small text files a website stores in your browser to remember information about your visit. They can be "session" cookies (deleted when you close the browser) or "persistent" (kept until an expiry date or until you delete them).'}
          </p>
          <p>
            {es
              ? 'Blacknel usa cookies funcionales mínimas. No usamos cookies de tracking ni cookies publicitarias en blacknel.com ni en app.blacknel.com.'
              : 'Blacknel uses minimal functional cookies. We do not use tracking or advertising cookies on blacknel.com or app.blacknel.com.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? 'Cookies que usamos' : 'Cookies we use'}>
          <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)]">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.03]">
                <tr>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Cookie' : 'Cookie'}
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Propósito' : 'Purpose'}
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Duración' : 'Duration'}
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Tipo' : 'Type'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-[color:var(--color-fg-secondary)]">
                {cookies.map((c) => (
                  <tr key={c.name} className="border-t border-[color:var(--color-border)]">
                    <td className="px-3 py-2 align-top">
                      <code className="mono text-[11px] text-[color:var(--color-fg)]">{c.name}</code>
                    </td>
                    <td className="px-3 py-2 align-top">{c.purpose}</td>
                    <td className="px-3 py-2 align-top">{c.duration}</td>
                    <td className="px-3 py-2 align-top">{c.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection title={es ? 'Analytics sin cookies' : 'Cookieless analytics'}>
          <p>
            {es
              ? 'Usamos Plausible Analytics para entender uso agregado del sitio. Plausible NO usa cookies, NO recolecta IPs personales, NO trackea usuarios cross-site. Funciona vía agregación anónima en servidor.'
              : 'We use Plausible Analytics to understand aggregated site usage. Plausible does NOT use cookies, does NOT collect personal IPs, and does NOT track users cross-site. It works via server-side anonymized aggregation.'}
          </p>
          <p>
            <a
              className="text-[color:var(--color-fg)] underline-offset-4 hover:underline"
              href="https://plausible.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              plausible.io/privacy
            </a>
          </p>
        </LegalSection>

        <LegalSection title={es ? 'Cookies de terceros que NO usamos' : "Third-party cookies we do NOT use"}>
          <ul className="list-disc pl-5 marker:text-white/30">
            {notUsed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={es ? 'Cómo controlar cookies' : 'How to control cookies'}>
          <p>
            {es
              ? 'Las cookies funcionales son necesarias para que el servicio opere. Si las bloqueás, la app puede comportarse erráticamente o impedirte iniciar sesión.'
              : "Functional cookies are needed for the service to operate. If you block them, the app may behave erratically or prevent you from logging in."}
          </p>
          <p>
            {es ? 'Configurá cookies en tu navegador:' : 'Configure cookies in your browser:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>Chrome: <code className="mono text-[11px] text-[color:var(--color-fg)]">chrome://settings/cookies</code></li>
            <li>Firefox: <code className="mono text-[11px] text-[color:var(--color-fg)]">about:preferences#privacy</code></li>
            <li>Safari: Preferences &gt; Privacy</li>
            <li>Edge: <code className="mono text-[11px] text-[color:var(--color-fg)]">edge://settings/content/cookies</code></li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? 'Notificación de cookies' : 'Cookie banner'}>
          <p>
            {es
              ? 'Como solo usamos cookies estrictamente necesarias/funcionales, no mostramos un banner intrusivo de consentimiento. Esto cumple con GDPR Article 7 + ePrivacy Directive (cookies estrictamente necesarias no requieren consent explícito).'
              : 'Since we use only strictly necessary/functional cookies, we do not display an intrusive consent banner. This complies with GDPR Article 7 + ePrivacy Directive (strictly necessary cookies do not require explicit consent).'}
          </p>
          <p>
            {es
              ? 'Si en el futuro implementamos cookies de tracking o publicitarias, mostraremos un banner de consent explícito ANTES de instalar las cookies y actualizaremos esta política.'
              : "If in the future we implement tracking or advertising cookies, we will show an explicit consent banner BEFORE installing them and we will update this policy."}
          </p>
        </LegalSection>

        <LegalSection title={es ? 'Contacto' : 'Contact'}>
          <p>
            privacy@blacknel.com
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
