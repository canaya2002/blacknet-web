import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { LegalDoc, LegalSection } from '@/components/layout/legal-doc';
import { LegalHeroVisual } from '@/components/hero-visuals/legal';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/privacy',
    locale,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy.hero' });
  const es = locale === 'es';

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<LegalHeroVisual title="Privacy Policy" meta="Effective Jan 1, 2026" glow="blue" />}
      />
      <LegalDoc>
        <LegalSection title={es ? '1. Quiénes somos' : '1. Who we are'}>
          <p>
            {es
              ? 'Blacknel S.A.P.I. de C.V. ("Blacknel", "nosotros") es una empresa registrada en Ciudad de México con domicilio en Av. Insurgentes Sur 1234, Piso 6, Del Valle, 03100. Operamos la plataforma SaaS disponible en blacknel.com y app.blacknel.com.'
              : 'Blacknel S.A.P.I. de C.V. ("Blacknel", "we", "us") is a company registered in Mexico City with offices at Av. Insurgentes Sur 1234, Floor 6, Del Valle, 03100. We operate the SaaS platform available at blacknel.com and app.blacknel.com.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Datos que recopilamos' : '2. Data we collect'}>
          <p>
            {es
              ? 'Recopilamos solo los datos necesarios para operar la plataforma: nombre, correo electrónico de trabajo, empresa, rol, y datos derivados de las cuentas sociales que conectas voluntariamente. No recopilamos datos sensibles bajo el Art. 9 GDPR.'
              : 'We collect only the data needed to operate the platform: name, work email, company, role, and data derived from social accounts you voluntarily connect. We do not collect sensitive data under GDPR Article 9.'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Datos de cuenta: nombre, email, contraseña hasheada, rol.' : 'Account data: name, email, hashed password, role.'}</li>
            <li>{es ? 'Datos de uso: logs de acción, IP, user-agent (90 días retención).' : 'Usage data: action logs, IP, user-agent (90-day retention).'}</li>
            <li>{es ? 'Contenido cargado: posts programados, mensajes en inbox, reviews.' : 'Uploaded content: scheduled posts, inbox messages, reviews.'}</li>
            <li>{es ? 'Datos de facturación: a través de Stripe (PCI-DSS).' : 'Billing data: via Stripe (PCI-DSS).'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '3. Cómo usamos tus datos' : '3. How we use your data'}>
          <p>
            {es
              ? 'Procesamos datos bajo las bases legales de ejecución de contrato (Art. 6.1.b GDPR) y consentimiento (Art. 6.1.a GDPR) para marketing opt-in. Específicamente: operar la plataforma, procesar pagos, enviar comunicaciones transaccionales, mejorar el servicio con analítica agregada, y enviar el newsletter si optaste.'
              : 'We process data under the legal bases of contract performance (GDPR Art. 6.1.b) and consent (GDPR Art. 6.1.a) for opt-in marketing. Specifically: operate the platform, process payments, send transactional communications, improve the service via aggregate analytics, and send the newsletter if you opted in.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Retención' : '4. Retention'}>
          <p>
            {es
              ? 'Datos de cuenta: hasta 90 días tras la cancelación. Logs de uso: 90 días. Contenido cargado: borrado a los 30 días tras la cancelación. Datos de facturación: 5 años (obligación fiscal mexicana).'
              : 'Account data: up to 90 days after cancellation. Usage logs: 90 days. Uploaded content: deleted 30 days after cancellation. Billing data: 5 years (Mexican tax obligation).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '5. Sub-procesadores' : '5. Sub-processors'}>
          <p>
            {es
              ? 'Usamos los siguientes sub-procesadores con DPA firmado y SCC cuando aplica:'
              : 'We use the following sub-processors with signed DPA and SCC where applicable:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>Vercel — {es ? 'hosting y CDN' : 'hosting and CDN'}</li>
            <li>Supabase — {es ? 'base de datos y autenticación' : 'database and auth'}</li>
            <li>Stripe — {es ? 'procesamiento de pagos' : 'payment processing'}</li>
            <li>Anthropic — {es ? 'inferencia de IA (Claude)' : 'AI inference (Claude)'}</li>
            <li>OpenAI — {es ? 'inferencia de IA (GPT)' : 'AI inference (GPT)'}</li>
            <li>Resend — {es ? 'envío de correo transaccional' : 'transactional email'}</li>
            <li>Plausible — {es ? 'analítica sin cookies' : 'cookieless analytics'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '6. Tus derechos' : '6. Your rights'}>
          <p>
            {es
              ? 'Bajo LFPDPPP, GDPR y CCPA tienes derecho a: acceder a tus datos, rectificarlos, eliminarlos, restringir su procesamiento, portarlos, y oponerte a su procesamiento. Para ejercer cualquier derecho, escribe a privacy@blacknel.com con prueba de identidad.'
              : 'Under LFPDPPP, GDPR, and CCPA you have the right to: access your data, rectify it, delete it, restrict processing, port it, and object to processing. To exercise any right, write to privacy@blacknel.com with proof of identity.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Contacto del DPO' : '7. DPO contact'}>
          <p>
            {es
              ? 'Para temas de privacidad: privacy@blacknel.com. Tiempo de respuesta máximo: 30 días naturales bajo GDPR.'
              : 'For privacy matters: privacy@blacknel.com. Maximum response time: 30 calendar days under GDPR.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
