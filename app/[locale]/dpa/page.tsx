import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { LegalDoc, LegalSection } from '@/components/layout/legal-doc';
import { LegalHeroVisual } from '@/components/hero-visuals/legal';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dpa.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/dpa', locale });
}

export default async function DpaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'dpa.hero' });
  const es = locale === 'es';

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<LegalHeroVisual title="DPA · GDPR Art.28" meta="SCC 2021/914 included" glow="purple" />}
      />
      <LegalDoc>
        <LegalSection title={es ? '1. Objeto y alcance' : '1. Subject and scope'}>
          <p>
            {es
              ? 'Este Acuerdo de Procesamiento de Datos ("DPA") se aplica al procesamiento de Datos Personales por Blacknel ("Procesador") en nombre del Cliente ("Responsable") bajo el Artículo 28 GDPR. Forma parte integral del Master Services Agreement (MSA) firmado entre las partes.'
              : 'This Data Processing Agreement ("DPA") applies to the processing of Personal Data by Blacknel ("Processor") on behalf of the Customer ("Controller") under GDPR Article 28. It is integral to the Master Services Agreement (MSA) signed between the parties.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Naturaleza del procesamiento' : '2. Nature of processing'}>
          <p>
            {es
              ? 'Blacknel procesa Datos Personales únicamente para ejecutar el Servicio: gestión de presencia digital incluyendo inbox unificado, publicación social, reviews, anuncios, IA y analítica. La duración del procesamiento iguala la vigencia del MSA, más los períodos de retención aplicables.'
              : 'Blacknel processes Personal Data solely to operate the Service: digital presence management including unified inbox, social publishing, reviews, ads, AI, and analytics. The duration of processing matches the MSA term, plus applicable retention periods.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '3. Sub-procesadores autorizados' : '3. Authorized sub-processors'}>
          <p>
            {es
              ? 'El Cliente autoriza el uso de los sub-procesadores listados en blacknel.com/privacy, con notificación previa de 30 días para cambios sustanciales. El Cliente tiene derecho a oponerse a un nuevo sub-procesador; si la objeción no se resuelve, el Cliente puede terminar el MSA sin penalidad.'
              : 'The Customer authorizes the sub-processors listed at blacknel.com/privacy, with 30-day prior notice for substantial changes. The Customer has the right to object to a new sub-processor; if the objection is not resolved, the Customer may terminate the MSA without penalty.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Transferencias internacionales' : '4. International transfers'}>
          <p>
            {es
              ? 'Para transferencias de Datos Personales fuera del EEE, Blacknel adopta las Standard Contractual Clauses (SCC) aprobadas por la Comisión Europea (Decisión 2021/914). Bajo solicitud, Blacknel proporciona Transfer Impact Assessments (TIA) específicos.'
              : 'For transfers of Personal Data outside the EEA, Blacknel adopts the Standard Contractual Clauses (SCC) approved by the European Commission (Decision 2021/914). Upon request, Blacknel provides specific Transfer Impact Assessments (TIA).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '5. Medidas técnicas y organizativas' : '5. Technical and organizational measures'}>
          <p>
            {es
              ? 'Blacknel implementa medidas de seguridad alineadas con ISO 27001 y SOC 2 Type II (auditoría en curso): encryption at rest (AES-256), TLS 1.3 in transit, Row-Level Security en base de datos, RBAC granular, audit log inmutable, 2FA obligatorio para empleados, revisiones de seguridad trimestrales, programa de bug bounty privado.'
              : 'Blacknel implements security measures aligned with ISO 27001 and SOC 2 Type II (audit in progress): encryption at rest (AES-256), TLS 1.3 in transit, Row-Level Security at the database level, granular RBAC, immutable audit log, mandatory 2FA for employees, quarterly security reviews, private bug bounty program.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '6. Notificación de brechas' : '6. Breach notification'}>
          <p>
            {es
              ? 'En caso de brecha de Datos Personales, Blacknel notificará al Cliente sin demora indebida y a más tardar dentro de 48 horas tras tener conocimiento, con la información requerida bajo el Art. 33.3 GDPR.'
              : 'In the event of a Personal Data breach, Blacknel will notify the Customer without undue delay and no later than 48 hours after becoming aware, with the information required under GDPR Article 33.3.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Cómo firmar el DPA' : '7. How to sign the DPA'}>
          <p>
            {es
              ? 'Si tu organización requiere DPA firmado físicamente, escríbenos a legal@blacknel.com con tu razón social, jurisdicción y datos de tu DPO. Procesamos solicitudes de DPA en máximo 5 días hábiles.'
              : 'If your organization requires a signed DPA, write to legal@blacknel.com with your legal name, jurisdiction, and DPO contact. We process DPA requests within 5 business days.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
