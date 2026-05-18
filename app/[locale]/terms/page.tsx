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
        <LegalSection title={es ? '1. Aceptación' : '1. Acceptance'}>
          <p>
            {es
              ? 'Al crear una cuenta o usar Blacknel ("Servicio") aceptas estos Términos. Si no estás de acuerdo, no uses el Servicio. Estos Términos son un contrato entre tú y Blacknel S.A.P.I. de C.V.'
              : 'By creating an account or using Blacknel (the "Service") you accept these Terms. If you disagree, do not use the Service. These Terms are a contract between you and Blacknel S.A.P.I. de C.V.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Uso aceptable' : '2. Acceptable use'}>
          <p>
            {es
              ? 'No puedes usar Blacknel para enviar spam, distribuir malware, violar derechos de propiedad intelectual, hacer scraping no autorizado, ni para actividades ilegales en tu jurisdicción. Violaciones graves resultan en terminación inmediata sin reembolso.'
              : 'You may not use Blacknel to send spam, distribute malware, infringe intellectual property, perform unauthorized scraping, or for activities illegal in your jurisdiction. Severe violations result in immediate termination with no refund.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '3. Cuenta y seguridad' : '3. Account and security'}>
          <p>
            {es
              ? 'Eres responsable de mantener la confidencialidad de tu cuenta y de toda la actividad que ocurra bajo ella. Notifícanos inmediatamente sobre cualquier uso no autorizado en security@blacknel.com.'
              : 'You are responsible for keeping your account confidential and for all activity under it. Notify us of unauthorized use immediately at security@blacknel.com.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Suscripción y pagos' : '4. Subscription and payments'}>
          <p>
            {es
              ? 'Las suscripciones se facturan mensualmente o anualmente en USD por adelantado. Renovación automática. Puedes cancelar en cualquier momento y el cargo no se renovará en el siguiente ciclo. No hay reembolsos pro-rata por cancelaciones a mitad de ciclo.'
              : 'Subscriptions are billed monthly or annually in USD in advance. Auto-renewal applies. You can cancel anytime and the next cycle will not be charged. There are no pro-rata refunds for mid-cycle cancellations.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '5. Política de reembolso' : '5. Refund policy'}>
          <p>
            {es
              ? 'Ofrecemos reembolso total dentro de los primeros 7 días naturales tras la primera compra. Después de eso, las cancelaciones detienen renovaciones futuras pero no generan reembolsos.'
              : 'We offer a full refund within 7 calendar days of first purchase. After that, cancellations stop future renewals but do not generate refunds.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '6. Propiedad intelectual' : '6. Intellectual property'}>
          <p>
            {es
              ? 'Mantienes la propiedad de todo el contenido que cargas a Blacknel. Nos otorgas una licencia limitada, no exclusiva, para procesarlo en la medida necesaria para operar el Servicio. Blacknel es propietaria del software, marca y toda la propiedad intelectual asociada.'
              : 'You retain ownership of all content you upload to Blacknel. You grant us a limited, non-exclusive license to process it as needed to operate the Service. Blacknel owns the software, brand, and all associated intellectual property.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Limitación de responsabilidad' : '7. Limitation of liability'}>
          <p>
            {es
              ? 'En la medida máxima permitida por la ley, la responsabilidad total de Blacknel se limita al monto pagado por el Servicio en los 12 meses previos al evento de responsabilidad. No somos responsables por daños indirectos, incidentales, especiales o consecuentes.'
              : 'To the maximum extent permitted by law, Blacknel’s total liability is limited to the amount paid for the Service in the 12 months preceding the liability event. We are not liable for indirect, incidental, special, or consequential damages.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '8. Terminación' : '8. Termination'}>
          <p>
            {es
              ? 'Puedes terminar tu cuenta en cualquier momento. Podemos terminar tu cuenta por violación material de estos Términos, con notificación previa de 30 días salvo violación grave. Tras la terminación, tus datos se exportan a tu pedido y luego se eliminan según la Política de Privacidad.'
              : 'You may terminate your account anytime. We may terminate your account for material breach of these Terms with 30 days’ notice, except for severe breaches. After termination, your data is exported upon request and then deleted per the Privacy Policy.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '9. Ley aplicable y jurisdicción' : '9. Governing law and jurisdiction'}>
          <p>
            {es
              ? 'Para clientes con domicilio en México: ley mexicana, jurisdicción de los tribunales competentes en Ciudad de México. Para clientes con domicilio en Estados Unidos: ley del estado de Delaware, jurisdicción del Estado de Delaware. Para otros clientes: ley mexicana por defecto.'
              : 'For customers domiciled in Mexico: Mexican law, competent courts in Mexico City. For customers domiciled in the US: Delaware state law and Delaware jurisdiction. For other customers: Mexican law by default.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
