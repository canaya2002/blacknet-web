import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { LegalDoc, LegalSection } from '@/components/layout/legal-doc';
import { LegalHeroVisual } from '@/components/hero-visuals/legal';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dataDeletion.meta' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/data-deletion',
    locale,
  });
}

export default async function DataDeletionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'dataDeletion.hero' });
  const es = locale === 'es';

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={
          <LegalHeroVisual
            title={es ? 'Eliminación de Datos' : 'Data Deletion'}
            meta={es ? 'Vigente desde 1 Ene 2026' : 'Effective Jan 1, 2026'}
            glow="purple"
          />
        }
      />
      <LegalDoc>
        <LegalSection id="overview" title={es ? 'Tus derechos' : 'Your rights'}>
          <p>
            {es
              ? 'Bajo LFPDPPP (México), GDPR (Unión Europea) y CCPA (California), tenés derecho a solicitar la eliminación completa de tus datos personales almacenados por Blacknel S.A.P.I. de C.V.'
              : 'Under LFPDPPP (Mexico), GDPR (European Union), and CCPA (California), you have the right to request complete deletion of your personal data stored by Blacknel S.A.P.I. de C.V.'}
          </p>
        </LegalSection>

        <LegalSection
          id="methods"
          title={es ? 'Tres métodos para solicitar eliminación' : 'Three methods to request deletion'}
        >
          <h3 className="mt-4 text-base font-semibold text-[color:var(--color-fg)]">
            {es
              ? 'Método 1 — Desde tu cuenta Blacknel (recomendado)'
              : 'Method 1 — From your Blacknel account (recommended)'}
          </h3>
          <p>
            {es
              ? 'Si tenés cuenta activa en Blacknel:'
              : 'If you have an active Blacknel account:'}
          </p>
          <ol className="list-decimal pl-5 marker:text-white/30">
            <li>
              {es ? 'Iniciá sesión en ' : 'Sign in at '}
              <a
                href="https://app.blacknel.com"
                className="text-[color:var(--color-fg)] underline underline-offset-2"
              >
                https://app.blacknel.com
              </a>
            </li>
            <li>
              {es
                ? 'Andá a Configuración → Privacidad → Eliminar mis datos'
                : 'Go to Settings → Privacy → Delete my data'}
            </li>
            <li>
              {es
                ? 'Confirmá tu identidad con magic link enviado a tu email'
                : 'Confirm your identity with the magic link sent to your email'}
            </li>
            <li>
              {es
                ? 'Tus datos se eliminan en máximo 30 días naturales'
                : 'Your data is deleted within 30 calendar days maximum'}
            </li>
          </ol>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Método 2 — Por correo electrónico' : 'Method 2 — By email'}
          </h3>
          <p>
            {es ? 'Enviá un email a ' : 'Send an email to '}
            <a
              href="mailto:privacy@blacknel.com"
              className="text-[color:var(--color-fg)] underline underline-offset-2"
            >
              privacy@blacknel.com
            </a>
            {es ? ' con:' : ' with:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Asunto: "Solicitud de eliminación de datos"'
                : 'Subject: "Data deletion request"'}
            </li>
            <li>
              {es
                ? 'Email registrado en Blacknel'
                : 'Your registered email in Blacknel'}
            </li>
            <li>{es ? 'Nombre completo' : 'Full name'}</li>
            <li>
              {es
                ? 'Razón de la solicitud (opcional)'
                : 'Reason for the request (optional)'}
            </li>
          </ul>
          <p>
            {es
              ? 'Tiempo de respuesta inicial: 5 días hábiles máximo. Tiempo de eliminación completa: 30 días naturales máximo.'
              : 'Initial response time: 5 business days maximum. Complete deletion time: 30 calendar days maximum.'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es
              ? 'Método 3 — Desde Facebook, Instagram o WhatsApp'
              : 'Method 3 — From Facebook, Instagram, or WhatsApp'}
          </h3>
          <p>
            {es
              ? 'Si conectaste una cuenta de Meta (Facebook, Instagram o WhatsApp Business) con Blacknel:'
              : 'If you connected a Meta account (Facebook, Instagram, or WhatsApp Business) with Blacknel:'}
          </p>
          <ol className="list-decimal pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Abrí Facebook → Configuración → Apps y sitios web → buscá "Blacknel"'
                : 'Open Facebook → Settings → Apps and Websites → find "Blacknel"'}
            </li>
            <li>{es ? 'Click "Eliminar" o "Remove"' : 'Click "Remove"'}</li>
            <li>
              {es
                ? 'Facebook envía automáticamente una solicitud de eliminación a Blacknel'
                : 'Facebook automatically sends a deletion request to Blacknel'}
            </li>
            <li>
              {es
                ? 'Recibís un código de confirmación'
                : 'You receive a confirmation code'}
            </li>
            <li>
              {es
                ? 'Procesamos la solicitud en máximo 30 días naturales'
                : 'We process the request within 30 calendar days'}
            </li>
            <li>
              {es
                ? 'Podés verificar el estado de tu solicitud en:'
                : 'You can check the status of your request at:'}{' '}
              <code className="mono break-all text-[color:var(--color-fg)]">
                https://app.blacknel.com/api/meta/data-deletion/
                {es ? '{tu-codigo}' : '{your-code}'}
              </code>
            </li>
          </ol>
          <p>
            {es
              ? 'Reemplazá {tu-codigo} con el confirmation code que Meta te entregó al hacer "Remove".'
              : 'Replace {your-code} with the confirmation code Meta provided when you clicked "Remove".'}
          </p>
        </LegalSection>

        <LegalSection
          id="what-gets-deleted"
          title={es ? 'Qué datos se eliminan' : 'What data gets deleted'}
        >
          <p>
            {es
              ? 'Cuando solicitás eliminación, removemos permanentemente:'
              : 'When you request deletion, we permanently remove:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Tu cuenta de usuario y credenciales de acceso'
                : 'Your user account and login credentials'}
            </li>
            <li>
              {es
                ? 'Todos los posts, mensajes y contenido que hayas creado o programado'
                : 'All posts, messages, and content you created or scheduled'}
            </li>
            <li>
              {es
                ? 'Tu historial completo de actividad y logs operativos'
                : 'Complete activity history and operational logs'}
            </li>
            <li>
              {es
                ? 'Brand voice docs que hayas subido'
                : 'Brand voice docs you uploaded'}
            </li>
            <li>
              {es
                ? 'Tokens OAuth de plataformas conectadas (Facebook, Instagram, WhatsApp, Google, etc.)'
                : 'OAuth tokens for connected platforms (Facebook, Instagram, WhatsApp, Google, etc.)'}
            </li>
            <li>
              {es
                ? 'Datos derivados como analytics agregadas y sentiment analysis'
                : 'Derived data such as aggregated analytics and sentiment analysis'}
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="retention"
          title={es ? 'Qué datos NO podemos eliminar' : 'What we cannot delete'}
        >
          <p>
            {es
              ? 'Por obligaciones legales mexicanas (SAT) e internacionales, debemos conservar:'
              : 'Due to Mexican (SAT) and international legal obligations, we must retain:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Facturas y comprobantes fiscales: 5 años (obligación SAT)'
                : 'Invoices and tax receipts: 5 years (SAT requirement)'}
            </li>
            <li>
              {es
                ? 'Logs de seguridad para investigación forense: hasta 1 año'
                : 'Security logs for forensic investigation: up to 1 year'}
            </li>
            <li>
              {es
                ? 'Registros de transacciones financieras: 5 años'
                : 'Financial transaction records: 5 years'}
            </li>
          </ul>
          <p>
            {es
              ? 'Estos datos quedan en archivo encriptado, sin acceso operativo de nuestro equipo, hasta cumplir el período legal de retención.'
              : 'This data remains in encrypted archive, without operational access by our team, until the legal retention period expires.'}
          </p>
        </LegalSection>

        <LegalSection
          id="response-times"
          title={es ? 'Tiempos de respuesta por jurisdicción' : 'Response times by jurisdiction'}
        >
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'LFPDPPP (México): 20 días hábiles para confirmar la solicitud + 15 días naturales para completar la eliminación'
                : 'LFPDPPP (Mexico): 20 business days to confirm the request + 15 calendar days to complete deletion'}
            </li>
            <li>
              {es
                ? 'GDPR (Unión Europea): 30 días naturales máximo'
                : 'GDPR (European Union): 30 calendar days maximum'}
            </li>
            <li>
              {es
                ? 'CCPA (California): 45 días naturales máximo'
                : 'CCPA (California): 45 calendar days maximum'}
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="complaints"
          title={es ? 'Reclamos ante autoridades regulatorias' : 'Complaints to regulatory authorities'}
        >
          <p>
            {es
              ? 'Si no recibís respuesta dentro de los plazos indicados, podés presentar un reclamo ante:'
              : "If you don't receive a response within the indicated timeframes, you can file a complaint with:"}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'México — INAI (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales): '
                : 'Mexico — INAI (National Institute of Transparency, Access to Information, and Personal Data Protection): '}
              <a
                href="https://home.inai.org.mx"
                className="text-[color:var(--color-fg)] underline underline-offset-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://home.inai.org.mx
              </a>
            </li>
            <li>
              {es
                ? 'Unión Europea — DPA local de tu país de residencia'
                : 'European Union — Local DPA of your country of residence'}
            </li>
            <li>
              {es ? 'California — California Attorney General: ' : 'California — California Attorney General: '}
              <a
                href="https://oag.ca.gov/privacy"
                className="text-[color:var(--color-fg)] underline underline-offset-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://oag.ca.gov/privacy
              </a>
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="contact"
          title={es ? 'Contacto del responsable de protección de datos' : 'Data Protection Officer contact'}
        >
          <p>
            {es ? 'Email: ' : 'Email: '}
            <a
              href="mailto:privacy@blacknel.com"
              className="text-[color:var(--color-fg)] underline underline-offset-2"
            >
              privacy@blacknel.com
            </a>
          </p>
          <p>
            {es ? 'Responsable: DPO de Blacknel S.A.P.I. de C.V.' : 'Responsible: DPO of Blacknel S.A.P.I. de C.V.'}
            <br />
            {es
              ? 'Domicilio: Av. Insurgentes Sur 1234, Piso 6, Del Valle, Ciudad de México, C.P. 03100, México'
              : 'Address: Av. Insurgentes Sur 1234, Piso 6, Del Valle, Mexico City, C.P. 03100, Mexico'}
          </p>
          <p>
            {es
              ? 'Tiempo máximo de respuesta inicial: 5 días hábiles.'
              : 'Initial response time: 5 business days maximum.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
