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
              ? 'Blacknel S.A.P.I. de C.V. ("Blacknel", "nosotros") es una empresa registrada en Ciudad de México con domicilio en Av. Insurgentes Sur 1234, Piso 6, Del Valle, 03100. Operamos la plataforma SaaS disponible en blacknel.com y app.blacknel.com como data controller para nuestros servicios.'
              : 'Blacknel S.A.P.I. de C.V. ("Blacknel", "we", "us") is a company registered in Mexico City with offices at Av. Insurgentes Sur 1234, Floor 6, Del Valle, 03100. We operate the SaaS platform available at blacknel.com and app.blacknel.com as data controller for our services.'}
          </p>
          <p>
            <strong className="text-[color:var(--color-fg)]">{es ? 'GDPR · ' : 'GDPR · '}</strong>
            {es
              ? 'Somos data controller. Al estar Blacknel establecida fuera de la UE, no requerimos representante GDPR bajo Art. 27, pero mantenemos un canal dedicado en privacy@blacknel.com para data subjects en la UE.'
              : 'We are data controller. As Blacknel is established outside the EU, we are not required to appoint an Art. 27 representative, but we maintain a dedicated channel at privacy@blacknel.com for EU data subjects.'}
          </p>
          <p>
            <strong className="text-[color:var(--color-fg)]">LFPDPPP · </strong>
            {es
              ? 'Nuestro Responsable de Protección de Datos es accesible en privacy@blacknel.com. Tiempo máximo de respuesta para ejercicio de derechos ARCO: 20 días hábiles.'
              : 'Our Data Protection Officer is reachable at privacy@blacknel.com. Maximum response time for ARCO rights: 20 business days.'}
          </p>
          <p>
            <strong className="text-[color:var(--color-fg)]">CCPA · </strong>
            {es
              ? 'Somos un "business" bajo CCPA. No vendemos datos personales y honramos requests de "Right to Know", "Right to Delete" y "Right to Opt-Out of Sale".'
              : 'We are a "business" under CCPA. We do not sell personal data and we honor "Right to Know", "Right to Delete", and "Right to Opt-Out of Sale" requests.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Datos que recopilamos' : '2. Data we collect'}>
          <h3 className="mt-4 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.1 Datos de cuenta y autenticación' : '2.1 Account and authentication data'}
          </h3>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Nombre completo para identificación en el equipo' : 'Full name for team identification'}</li>
            <li>{es ? 'Correo electrónico de trabajo para auth y comunicación transaccional' : 'Work email for auth and transactional communication'}</li>
            <li>{es ? 'Hash de contraseña (si usás password auth; default es magic link sin password)' : 'Password hash (only if you use password auth; default is passwordless magic link)'}</li>
            <li>{es ? 'Empresa y rol para personalización del onboarding' : 'Company and role for onboarding personalization'}</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.2 Datos de uso y telemetría' : '2.2 Usage and telemetry data'}
          </h3>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Logs de acciones con timestamp e IP (retención: 90 días)' : 'Action logs with timestamp and IP (retention: 90 days)'}</li>
            <li>{es ? 'User-agent y device fingerprint básico (para detección de session hijacking)' : 'User-agent and basic device fingerprint (for session-hijacking detection)'}</li>
            <li>{es ? 'GeoIP a nivel país y región — nunca ubicación GPS precisa' : 'GeoIP at country/region level — never precise GPS'}</li>
            <li>{es ? 'Métricas de uso vía Plausible Analytics (cookieless, agregado anónimo)' : 'Usage metrics via Plausible Analytics (cookieless, anonymized aggregate)'}</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.3 Contenido cargado' : '2.3 Uploaded content'}
          </h3>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Posts programados (texto, imágenes, videos)' : 'Scheduled posts (text, images, videos)'}</li>
            <li>{es ? 'Mensajes en inbox (DMs, comentarios, reviews, replies)' : 'Inbox messages (DMs, comments, reviews, replies)'}</li>
            <li>{es ? 'Assets en media library' : 'Assets in media library'}</li>
            <li>{es ? 'Brand voice docs que subís para training de IA' : 'Brand voice docs you upload for AI training'}</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.4 Datos de plataformas conectadas (OAuth)' : '2.4 Connected platform data (OAuth)'}
          </h3>
          <p>
            {es
              ? 'Cuando conectás Facebook, Instagram, WhatsApp, Google Business, etc., accedemos via OAuth oficial sólo a: mensajes/DMs hacia tu cuenta business, posts publicados, reviews y métricas agregadas de ads. NO accedemos a mensajes privados ni contactos personales fuera del scope business.'
              : 'When you connect Facebook, Instagram, WhatsApp, Google Business, etc., we access via official OAuth only: messages/DMs to your business account, published posts, reviews, and aggregate ad metrics. We do NOT access private messages or personal contacts outside the business scope.'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.5 Datos de facturación' : '2.5 Billing data'}
          </h3>
          <p>
            {es
              ? 'Procesados por Stripe (PCI-DSS Level 1). Blacknel NUNCA tiene acceso al número completo de tarjeta — solo a últimos 4 dígitos, dirección de facturación, país y tipo de impuesto aplicable.'
              : 'Processed by Stripe (PCI-DSS Level 1). Blacknel NEVER has access to full card numbers — only last-4 digits, billing address, country, and applicable tax type.'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? '2.6 Datos que NO recopilamos' : "2.6 What we do NOT collect"}
          </h3>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'NO datos biométricos (huella, reconocimiento facial)' : 'NO biometric data (fingerprints, facial recognition)'}</li>
            <li>{es ? 'NO datos de salud (Art. 9 GDPR — special categories)' : 'NO health data (GDPR Art. 9 — special categories)'}</li>
            <li>{es ? 'NO datos de menores (servicio prohibido para <16 años GDPR / <13 años COPPA)' : 'NO minors data (service forbidden to <16 GDPR / <13 COPPA)'}</li>
            <li>{es ? 'NO ubicación GPS precisa — solo GeoIP a nivel ciudad' : 'NO precise GPS — only city-level GeoIP'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '3. Cómo usamos tus datos' : '3. How we use your data'}>
          <p>
            {es
              ? 'Procesamos datos bajo las bases legales de ejecución de contrato (Art. 6.1.b GDPR) y consentimiento (Art. 6.1.a GDPR) para marketing opt-in. Específicamente: operar la plataforma, procesar pagos, enviar comunicaciones transaccionales, mejorar el servicio con analítica agregada, y enviar el newsletter si optaste.'
              : 'We process data under the legal bases of contract performance (GDPR Art. 6.1.b) and consent (GDPR Art. 6.1.a) for opt-in marketing. Specifically: operate the platform, process payments, send transactional communications, improve the service via aggregate analytics, and send the newsletter if you opted in.'}
          </p>
          <p>
            {es
              ? 'No usamos tus datos para entrenar modelos de IA de terceros. La IA de Blacknel entrena solamente en tus propios brand voice docs dentro de tu workspace — nunca compartimos datos con Anthropic ni OpenAI más allá del prompt de inferencia que pasa por sus APIs con zero data retention activado.'
              : "We do not use your data to train third-party AI models. Blacknel's AI trains only on your own brand voice docs inside your workspace — we never share data with Anthropic or OpenAI beyond the inference prompt that flows through their APIs with zero data retention enabled."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Retención' : '4. Retention'}>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Datos de cuenta: hasta 90 días tras la cancelación' : 'Account data: up to 90 days after cancellation'}</li>
            <li>{es ? 'Logs de uso detallados: 90 días' : 'Detailed usage logs: 90 days'}</li>
            <li>{es ? 'Contenido cargado: borrado a los 30 días tras la cancelación' : 'Uploaded content: deleted 30 days after cancellation'}</li>
            <li>{es ? 'Audit log: Standard 90d · Growth 1 año · Enterprise hasta 7 años configurable' : 'Audit log: Standard 90d · Growth 1 year · Enterprise up to 7 years configurable'}</li>
            <li>{es ? 'Datos de facturación: 5 años (obligación fiscal mexicana)' : 'Billing data: 5 years (Mexican tax obligation)'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '5. Sub-procesadores' : '5. Sub-processors'}>
          <p>
            {es
              ? 'Operamos con los siguientes sub-procesadores. Cada uno tiene DPA firmado y SCCs cuando aplica:'
              : 'We operate with the following sub-processors. Each one has a signed DPA and SCCs where applicable:'}
          </p>
          <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)]">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.03]">
                <tr>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    Sub-procesador
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Propósito' : 'Purpose'}
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    {es ? 'Ubicación' : 'Location'}
                  </th>
                  <th className="px-3 py-2 text-left mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
                    DPA / SCC
                  </th>
                </tr>
              </thead>
              <tbody className="text-[color:var(--color-fg-secondary)]">
                {[
                  ['Vercel', es ? 'Hosting + Edge CDN' : 'Hosting + Edge CDN', 'US (multi-region)', es ? 'SCC firmado' : 'SCC signed'],
                  ['Supabase', es ? 'Database + Auth + Storage' : 'Database + Auth + Storage', 'US (us-east-1)', es ? 'SCC firmado' : 'SCC signed'],
                  ['Anthropic', es ? 'Inferencia IA (Claude)' : 'AI inference (Claude)', 'US', es ? 'SCC firmado' : 'SCC signed'],
                  ['OpenAI', es ? 'Inferencia IA (GPT)' : 'AI inference (GPT)', 'US', es ? 'SCC firmado' : 'SCC signed'],
                  ['Stripe', es ? 'Pagos' : 'Payment processing', 'US + EU', 'SCC + PCI-DSS'],
                  ['Resend', es ? 'Email transaccional' : 'Transactional email', 'US', es ? 'SCC firmado' : 'SCC signed'],
                  ['Plausible', 'Analytics', 'EU (Germany)', 'GDPR by design'],
                  ['Sentry', es ? 'Error monitoring' : 'Error monitoring', 'US', es ? 'SCC firmado' : 'SCC signed'],
                  ['Cloudflare', es ? 'CDN + DDoS protection' : 'CDN + DDoS protection', 'Global', es ? 'SCC firmado' : 'SCC signed'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-[color:var(--color-border)]">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            {es
              ? 'Te notificamos via email al menos 30 días antes de agregar o cambiar un sub-procesador con impacto material.'
              : 'We notify you via email at least 30 days before adding or changing a sub-processor with material impact.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '6. Tus derechos' : '6. Your rights'}>
          <p>
            {es
              ? 'Bajo LFPDPPP, GDPR y CCPA tenés derecho a: acceder a tus datos, rectificarlos, eliminarlos, restringir su procesamiento, portarlos, y oponerte a su procesamiento. Para ejercer cualquier derecho, escribí a privacy@blacknel.com con prueba de identidad.'
              : 'Under LFPDPPP, GDPR, and CCPA you have the right to: access your data, rectify it, delete it, restrict processing, port it, and object to processing. To exercise any right, write to privacy@blacknel.com with proof of identity.'}
          </p>
          <p>
            {es
              ? 'Si considerás que tratamos tus datos en violación, podés presentar una queja ante tu autoridad de protección de datos local: INAI (México), CNIL/AEPD/etc. (UE), California AG (CCPA).'
              : 'If you believe we process your data in violation of law, you may file a complaint with your local data protection authority: INAI (Mexico), CNIL/AEPD/etc. (EU), California AG (CCPA).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Contacto del DPO' : '7. DPO contact'}>
          <p>
            {es
              ? 'Para temas de privacidad: privacy@blacknel.com. Tiempo de respuesta máximo: 30 días naturales bajo GDPR; 20 días hábiles bajo LFPDPPP; 45 días bajo CCPA.'
              : 'For privacy matters: privacy@blacknel.com. Maximum response time: 30 calendar days under GDPR; 20 business days under LFPDPPP; 45 days under CCPA.'}
          </p>
        </LegalSection>

        <LegalSection
          id="data-deletion"
          title={es ? '8. Solicitud de Eliminación de Datos' : '8. Data Deletion Request'}
        >
          <p>
            {es ? 'Para detalles completos sobre cómo solicitar la eliminación de tus datos, visitá nuestra página dedicada: ' : 'For full details on how to request deletion of your data, visit our dedicated page: '}
            <a
              href={es ? 'https://blacknel.com/es/data-deletion' : 'https://blacknel.com/en/data-deletion'}
              className="text-[color:var(--color-fg)] underline underline-offset-2"
            >
              {es ? 'https://blacknel.com/es/data-deletion' : 'https://blacknel.com/en/data-deletion'}
            </a>
            {es ? '. El resumen a continuación se mantiene como referencia.' : '. The summary below is kept for reference.'}
          </p>

          <h3 className="mt-4 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Tus derechos de eliminación' : 'Your deletion rights'}
          </h3>
          <p>
            {es
              ? 'Bajo LFPDPPP (México), GDPR (UE) y CCPA (California), tenés derecho a solicitar la eliminación completa de tus datos personales almacenados por Blacknel.'
              : 'Under LFPDPPP (Mexico), GDPR (EU), and CCPA (California), you have the right to request complete deletion of your personal data stored by Blacknel.'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Cómo solicitar la eliminación' : 'How to request deletion'}
          </h3>
          <p>
            {es
              ? 'Existen tres formas de solicitar la eliminación de tus datos:'
              : 'Three ways:'}
          </p>

          <p>
            <strong className="text-[color:var(--color-fg)]">
              {es
                ? '1. Desde tu cuenta Blacknel (más rápido)'
                : '1. From your Blacknel account (fastest)'}
            </strong>
          </p>
          <p>
            {es
              ? 'Si tenés una cuenta activa:'
              : 'If you have an active account:'}
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
                ? 'Andá a Settings → Privacy → Delete my data'
                : 'Go to Settings → Privacy → Delete my data'}
            </li>
            <li>
              {es
                ? 'Confirmá con tu contraseña o magic link'
                : 'Confirm with your password or magic link'}
            </li>
            <li>
              {es
                ? 'Tus datos se eliminan en 30 días'
                : 'Your data is deleted within 30 days'}
            </li>
          </ol>

          <p>
            <strong className="text-[color:var(--color-fg)]">
              {es ? '2. Por email' : '2. By email'}
            </strong>
          </p>
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
                ? 'Tu email registrado en Blacknel'
                : 'Your registered email'}
            </li>
            <li>{es ? 'Tu nombre completo' : 'Your full name'}</li>
            <li>{es ? 'Razón (opcional)' : 'Reason (optional)'}</li>
          </ul>
          <p>
            {es
              ? 'Respondemos en máximo 5 días hábiles y completamos la eliminación en máximo 30 días.'
              : 'We respond within 5 business days and complete deletion within 30 days.'}
          </p>

          <p>
            <strong className="text-[color:var(--color-fg)]">
              {es
                ? '3. Desde aplicaciones de terceros (Facebook, Instagram, WhatsApp)'
                : '3. From third-party apps (Facebook, Instagram, WhatsApp)'}
            </strong>
          </p>
          <p>
            {es
              ? 'Si conectaste tu cuenta de Facebook, Instagram o WhatsApp con Blacknel y querés eliminar los datos que recibimos desde esas plataformas:'
              : 'If you connected your Facebook, Instagram, or WhatsApp account to Blacknel and want to delete the data we received from those platforms:'}
          </p>
          <ol className="list-decimal pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Andá a Facebook → Settings → Apps and Websites → Blacknel'
                : 'Go to Facebook → Settings → Apps and Websites → Blacknel'}
            </li>
            <li>{es ? 'Click "Remove"' : 'Click "Remove"'}</li>
            <li>
              {es
                ? 'Facebook nos enviará automáticamente una solicitud de eliminación de datos'
                : 'Facebook automatically sends us a data deletion request'}
            </li>
            <li>
              {es
                ? 'Procesamos la solicitud en máximo 30 días'
                : 'We process within 30 days'}
            </li>
            <li>
              {es ? 'Podés verificar el estado en: ' : 'You can check status at: '}
              <code className="mono break-all text-[color:var(--color-fg)]">
                https://app.blacknel.com/api/meta/data-deletion/
                {es ? '{tu-codigo-de-confirmación}' : '{your-confirmation-code}'}
              </code>
            </li>
          </ol>
          <p>
            {es
              ? 'El código de confirmación lo recibís de Facebook al hacer "Remove".'
              : 'You receive the confirmation code from Facebook when clicking "Remove".'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Qué datos se eliminan' : 'What gets deleted'}
          </h3>
          <p>
            {es
              ? 'Cuando solicitás eliminación, eliminamos permanentemente:'
              : 'When you request deletion, we permanently remove:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Tu cuenta de usuario y credenciales'
                : 'Your user account and credentials'}
            </li>
            <li>
              {es
                ? 'Todos los posts, mensajes y contenido que hayas creado'
                : 'All posts, messages, and content you created'}
            </li>
            <li>
              {es
                ? 'Tu historial de actividad y logs'
                : 'Activity history and logs'}
            </li>
            <li>
              {es
                ? 'Tus brand voice docs cargados'
                : 'Uploaded brand voice docs'}
            </li>
            <li>
              {es
                ? 'Tokens OAuth de plataformas conectadas'
                : 'OAuth tokens for connected platforms'}
            </li>
            <li>
              {es
                ? 'Datos derivados (analytics agregadas, sentiment analysis, etc.)'
                : 'Derived data (aggregated analytics, sentiment analysis, etc.)'}
            </li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Qué datos NO podemos eliminar' : 'What we cannot delete'}
          </h3>
          <p>
            {es
              ? 'Por obligaciones legales mexicanas (SAT), debemos conservar:'
              : 'Due to Mexican tax law (SAT) obligations, we must retain:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'Facturas y comprobantes fiscales: 5 años'
                : 'Invoices and tax receipts: 5 years'}
            </li>
            <li>
              {es
                ? 'Logs de seguridad para investigación forense: hasta 1 año'
                : 'Security logs for forensic investigation: up to 1 year'}
            </li>
          </ul>
          <p>
            {es
              ? 'Estos datos quedan en archivo encriptado, sin acceso operativo, hasta cumplir el período legal.'
              : 'These remain in encrypted archive with no operational access until the legal period expires.'}
          </p>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Tiempo de respuesta' : 'Response time'}
          </h3>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es
                ? 'LFPDPPP (México): 20 días hábiles para confirmar + 15 días para completar'
                : 'LFPDPPP (Mexico): 20 business days to confirm + 15 days to complete'}
            </li>
            <li>
              {es
                ? 'GDPR (UE): 30 días máximo'
                : 'GDPR (EU): 30 days maximum'}
            </li>
            <li>
              {es
                ? 'CCPA (California): 45 días máximo'
                : 'CCPA (California): 45 days maximum'}
            </li>
          </ul>
          <p>
            {es
              ? 'Si no recibís respuesta en estos plazos, podés reclamar ante:'
              : "If you don't receive a response in these timeframes, you can complain to:"}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              {es ? 'INAI (México): ' : 'INAI (Mexico): '}
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
                ? 'DPA local (UE): según tu país'
                : 'Local DPA (EU): per your country'}
            </li>
            <li>
              {es ? 'California AG: ' : 'California AG: '}
              <a
                href="https://oag.ca.gov"
                className="text-[color:var(--color-fg)] underline underline-offset-2"
                rel="noopener noreferrer"
                target="_blank"
              >
                https://oag.ca.gov
              </a>
            </li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[color:var(--color-fg)]">
            {es ? 'Contacto' : 'Contact'}
          </h3>
          <p>
            <a
              href="mailto:privacy@blacknel.com"
              className="text-[color:var(--color-fg)] underline underline-offset-2"
            >
              privacy@blacknel.com
            </a>
            <br />
            {es ? 'DPO de Blacknel SAPI de CV' : 'DPO of Blacknel SAPI de CV'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
