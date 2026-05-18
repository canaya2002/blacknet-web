import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { LegalDoc, LegalSection } from '@/components/layout/legal-doc';
import { LegalHeroVisual } from '@/components/hero-visuals/legal';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/terms', locale });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms.hero' });
  const es = locale === 'es';

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<LegalHeroVisual title="Terms of Service" meta="Effective Jan 1, 2026" glow="purple" />}
      />
      <LegalDoc>
        <LegalSection title={es ? '1. Aceptación del acuerdo' : '1. Acceptance of agreement'}>
          <p>
            {es
              ? 'Al crear una cuenta, suscribirte a un plan, o usar Blacknel ("Servicio") aceptas estos Términos. Si no estás de acuerdo, no uses el Servicio. Estos Términos constituyen un contrato vinculante entre vos (o la entidad que representás) y Blacknel S.A.P.I. de C.V. ("Blacknel").'
              : 'By creating an account, subscribing to a plan, or using Blacknel (the "Service") you accept these Terms. If you disagree, do not use the Service. These Terms constitute a binding contract between you (or the entity you represent) and Blacknel S.A.P.I. de C.V. ("Blacknel").'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Definiciones' : '2. Definitions'}>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>
              <strong className="text-[color:var(--color-fg)]">{es ? 'Cliente · ' : 'Customer · '}</strong>
              {es ? 'la persona física o jurídica que firma estos Términos.' : 'the natural or legal person accepting these Terms.'}
            </li>
            <li>
              <strong className="text-[color:var(--color-fg)]">{es ? 'Usuario · ' : 'User · '}</strong>
              {es ? 'cada individuo autorizado por el Cliente para acceder al Servicio.' : 'each individual authorized by Customer to access the Service.'}
            </li>
            <li>
              <strong className="text-[color:var(--color-fg)]">{es ? 'Contenido del Cliente · ' : 'Customer Content · '}</strong>
              {es ? 'cualquier dato, texto, archivo o material que el Cliente carga al Servicio.' : 'any data, text, file, or material Customer uploads to the Service.'}
            </li>
            <li>
              <strong className="text-[color:var(--color-fg)]">{es ? 'Documentación · ' : 'Documentation · '}</strong>
              {es ? 'guías oficiales, API docs y materiales publicados en blacknel.com/docs.' : 'official guides, API docs, and materials published at blacknel.com/docs.'}
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '3. Cuenta y acceso' : '3. Account and access'}>
          <p>
            {es
              ? 'Sos responsable de mantener la confidencialidad de tus credenciales y de toda la actividad que ocurra bajo tu cuenta. Notificanos inmediatamente sobre cualquier uso no autorizado en security@blacknel.com. Tu cuenta es nominal y no transferible.'
              : 'You are responsible for keeping your credentials confidential and for all activity under your account. Notify us of unauthorized use immediately at security@blacknel.com. Your account is named and non-transferable.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Uso aceptable' : '4. Acceptable use'}>
          <p>
            {es
              ? 'No podés usar Blacknel para enviar spam, distribuir malware, violar derechos de propiedad intelectual, hacer scraping no autorizado, automatizar acciones que violen los Términos de Servicio de las plataformas conectadas (Facebook, Instagram, etc.), ni para actividades ilegales en tu jurisdicción.'
              : 'You may not use Blacknel to send spam, distribute malware, infringe intellectual property, perform unauthorized scraping, automate actions that violate the Terms of Service of connected platforms (Facebook, Instagram, etc.), or for activities illegal in your jurisdiction.'}
          </p>
          <p>
            {es
              ? 'Violaciones graves resultan en suspensión inmediata sin reembolso y posible reporte a autoridades.'
              : 'Severe violations result in immediate suspension without refund and potential reporting to authorities.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '5. Pago y facturación' : '5. Payment and billing'}>
          <p>
            {es
              ? 'Las suscripciones se facturan mensualmente o anualmente en USD por adelantado. Renovación automática hasta cancelación. IVA aplica para clientes con domicilio fiscal en México (16%). Para clientes fuera de México, los precios USD son finales sin IVA adicional.'
              : 'Subscriptions are billed monthly or annually in USD in advance. Auto-renewal applies until cancellation. VAT applies to customers domiciled in Mexico (16% IVA). For customers outside Mexico, USD prices are final with no additional VAT.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '6. Trial y cancelación' : '6. Trial and cancellation'}>
          <p>
            {es
              ? 'Ofrecemos un trial de 14 días sin tarjeta. Al final del trial, si no suscribís, la cuenta se suspende automáticamente. Podés cancelar cualquier suscripción en cualquier momento — la cancelación detiene la próxima renovación pero no genera reembolsos pro-rata. Reembolso total disponible dentro de 7 días naturales tras la primera compra.'
              : "We offer a 14-day trial with no credit card. At trial end, if you don't subscribe, the account is automatically suspended. You can cancel any subscription anytime — cancellation stops the next renewal but does not generate pro-rata refunds. Full refund available within 7 calendar days of first purchase."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Suspensión y terminación' : '7. Suspension and termination'}>
          <p>
            {es
              ? 'Podemos suspender o terminar tu cuenta por: violación material de estos Términos, falta de pago tras 30 días de notificación, actividad fraudulenta o reportes de abuso confirmados. Tras la terminación, te damos 30 días para exportar tus datos antes del borrado.'
              : 'We may suspend or terminate your account for: material breach of these Terms, non-payment after 30 days of notice, fraudulent activity, or confirmed abuse reports. After termination, you have 30 days to export your data before deletion.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '8. Propiedad intelectual' : '8. Intellectual property'}>
          <p>
            {es
              ? 'Mantenés la propiedad de todo el Contenido del Cliente. Nos otorgás una licencia limitada, no exclusiva y revocable para procesarlo en la medida necesaria para operar el Servicio. Blacknel es propietaria del software, marca, logos y toda la propiedad intelectual asociada al Servicio.'
              : 'You retain ownership of all Customer Content. You grant us a limited, non-exclusive, revocable license to process it as needed to operate the Service. Blacknel owns the software, brand, logos, and all intellectual property associated with the Service.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '9. Confidencialidad' : '9. Confidentiality'}>
          <p>
            {es
              ? 'Cada parte mantendrá confidencial la información no pública de la otra parte revelada bajo este acuerdo. Esta obligación sobrevive la terminación por 3 años. Excepciones estándar aplican (información pública, conocida previamente, obtenida lícitamente de terceros, requerida por ley).'
              : "Each party will maintain in confidence the other party's non-public information disclosed under this agreement. This obligation survives termination for 3 years. Standard exceptions apply (publicly available, previously known, lawfully obtained from third parties, required by law)."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '10. Limitación de responsabilidad' : '10. Limitation of liability'}>
          <p>
            {es
              ? 'En la medida máxima permitida por la ley, la responsabilidad total de Blacknel se limita al monto pagado por el Servicio en los 12 meses previos al evento de responsabilidad. No somos responsables por daños indirectos, incidentales, especiales, consecuentes ni lucro cesante.'
              : "To the maximum extent permitted by law, Blacknel's total liability is limited to the amount paid for the Service in the 12 months preceding the liability event. We are not liable for indirect, incidental, special, consequential damages, or loss of profits."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '11. Indemnización' : '11. Indemnification'}>
          <p>
            {es
              ? 'Vos indemnizarás a Blacknel ante cualquier reclamación de terceros que surja de: tu Contenido del Cliente, tu uso del Servicio en violación de estos Términos, o tu violación de leyes aplicables. Blacknel indemnizará al Cliente ante reclamaciones de terceros alegando que el Servicio (no el Contenido del Cliente) infringe derechos de propiedad intelectual.'
              : 'You will indemnify Blacknel against any third-party claim arising from: your Customer Content, your use of the Service in violation of these Terms, or your violation of applicable laws. Blacknel will indemnify Customer against third-party claims alleging that the Service (not Customer Content) infringes intellectual property rights.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '12. Privacidad' : '12. Privacy'}>
          <p>
            {es
              ? 'El tratamiento de Datos Personales se rige por nuestra Política de Privacidad y, donde aplique, por nuestro DPA (Acuerdo de Procesamiento de Datos GDPR Art. 28).'
              : 'Processing of Personal Data is governed by our Privacy Policy and, where applicable, by our DPA (Data Processing Agreement under GDPR Art. 28).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '13. Modificaciones al acuerdo' : '13. Modifications to the agreement'}>
          <p>
            {es
              ? 'Podemos modificar estos Términos en cualquier momento. Cambios materiales se notifican con 30 días de anticipación por email a admins de la org. El uso continuo del Servicio tras la fecha efectiva constituye aceptación de los cambios.'
              : "We may modify these Terms at any time. Material changes are notified 30 days in advance by email to org admins. Continued use of the Service after the effective date constitutes acceptance of the changes."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '14. Resolución de disputas' : '14. Dispute resolution'}>
          <p>
            {es
              ? 'Antes de iniciar acción legal, las partes intentarán negociación de buena fe por 30 días. Si no hay acuerdo, las disputas se resuelven exclusivamente ante los tribunales competentes en la jurisdicción establecida en la Sección 15.'
              : 'Before initiating legal action, the parties will attempt good-faith negotiation for 30 days. If no agreement is reached, disputes are resolved exclusively before competent courts in the jurisdiction set in Section 15.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '15. Ley aplicable y jurisdicción' : '15. Governing law and jurisdiction'}>
          <p>
            {es
              ? 'Para clientes con domicilio en México: ley mexicana, jurisdicción de los tribunales competentes en Ciudad de México. Para clientes con domicilio en Estados Unidos: ley del estado de Delaware, jurisdicción del Estado de Delaware. Para otros clientes: ley mexicana por defecto.'
              : 'For customers domiciled in Mexico: Mexican law, competent courts in Mexico City. For customers domiciled in the US: Delaware state law and Delaware jurisdiction. For other customers: Mexican law by default.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '16. Disposiciones generales' : '16. General provisions'}>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Separabilidad: si una cláusula es inválida, el resto del acuerdo permanece en vigor.' : 'Severability: if any clause is invalid, the rest of the agreement remains in effect.'}</li>
            <li>{es ? 'No renuncia: el no ejercicio de un derecho no constituye renuncia.' : 'No waiver: not exercising a right does not constitute waiver.'}</li>
            <li>{es ? 'Cesión: no podés ceder estos Términos sin consentimiento previo de Blacknel.' : "Assignment: you may not assign these Terms without Blacknel's prior consent."}</li>
            <li>{es ? 'Fuerza mayor: ninguna parte es responsable por incumplimiento causado por eventos fuera de su control razonable.' : 'Force majeure: neither party is liable for failure caused by events beyond reasonable control.'}</li>
            <li>{es ? 'Acuerdo completo: estos Términos + Política de Privacidad + DPA (si aplica) constituyen el acuerdo completo.' : 'Entire agreement: these Terms + Privacy Policy + DPA (if applicable) constitute the entire agreement.'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '17. Contacto' : '17. Contact'}>
          <p>
            {es
              ? 'Para temas legales: legal@blacknel.com. Para soporte: support@blacknel.com. Para ventas: sales@blacknel.com.'
              : 'For legal matters: legal@blacknel.com. For support: support@blacknel.com. For sales: sales@blacknel.com.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
