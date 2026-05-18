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
        <LegalSection title={es ? '1. Definiciones' : '1. Definitions'}>
          <p>
            {es
              ? 'Los términos "Datos Personales", "Procesamiento", "Responsable", "Procesador", "Sub-procesador", "Brecha de Datos" y "Autoridad Supervisora" tienen el significado dado en el GDPR (Reglamento UE 2016/679).'
              : 'The terms "Personal Data", "Processing", "Controller", "Processor", "Sub-processor", "Data Breach" and "Supervisory Authority" have the meaning given in the GDPR (EU Regulation 2016/679).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '2. Objeto y alcance' : '2. Subject and scope'}>
          <p>
            {es
              ? 'Este Acuerdo de Procesamiento de Datos ("DPA") se aplica al procesamiento de Datos Personales por Blacknel ("Procesador") en nombre del Cliente ("Responsable") bajo el Artículo 28 GDPR. Forma parte integral del Master Services Agreement (MSA) firmado entre las partes.'
              : 'This Data Processing Agreement ("DPA") applies to the processing of Personal Data by Blacknel ("Processor") on behalf of the Customer ("Controller") under GDPR Article 28. It is integral to the Master Services Agreement (MSA) signed between the parties.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '3. Roles y duración' : '3. Roles and duration'}>
          <p>
            {es
              ? 'El Cliente actúa como Responsable; Blacknel actúa como Procesador. Este DPA tiene vigencia mientras Blacknel procese Datos Personales en nombre del Cliente bajo el MSA, más los períodos de retención aplicables.'
              : 'Customer acts as Controller; Blacknel acts as Processor. This DPA is effective for as long as Blacknel processes Personal Data on behalf of Customer under the MSA, plus applicable retention periods.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '4. Naturaleza del procesamiento' : '4. Nature of processing'}>
          <p>
            {es
              ? 'Blacknel procesa Datos Personales únicamente para ejecutar el Servicio: gestión de presencia digital incluyendo inbox unificado, publicación social, reviews, anuncios, IA y analítica. Tipos de datos procesados: datos de identificación de Usuarios, datos de Contenido del Cliente, métricas de uso y comunicación.'
              : 'Blacknel processes Personal Data solely to operate the Service: digital presence management including unified inbox, social publishing, reviews, ads, AI, and analytics. Types of data processed: User identification data, Customer Content data, usage metrics and communication.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '5. Instrucciones del Responsable' : "5. Controller's instructions"}>
          <p>
            {es
              ? 'Blacknel procesa Datos Personales solo bajo instrucciones documentadas del Cliente, salvo cuando lo requiera la ley aplicable. Las funcionalidades del Servicio configuradas por el Cliente constituyen instrucciones documentadas suficientes.'
              : "Blacknel processes Personal Data only on Customer's documented instructions, unless required by applicable law. Service functionality configured by Customer constitutes sufficient documented instructions."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '6. Confidencialidad del personal' : '6. Personnel confidentiality'}>
          <p>
            {es
              ? 'Blacknel garantiza que todo personal autorizado a procesar Datos Personales está obligado por compromisos de confidencialidad apropiados y ha recibido training en protección de datos.'
              : 'Blacknel ensures that all personnel authorized to process Personal Data are bound by appropriate confidentiality commitments and have received data protection training.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '7. Medidas técnicas y organizativas (Anexo 2)' : '7. Technical and organizational measures (Annex 2)'}>
          <p>
            {es
              ? 'Blacknel implementa medidas de seguridad alineadas con ISO 27001 y SOC 2 Type II (auditoría en curso). Ver detalle completo en blacknel.com/security:'
              : 'Blacknel implements security measures aligned with ISO 27001 and SOC 2 Type II (audit in progress). Full detail at blacknel.com/security:'}
          </p>
          <ul className="list-disc pl-5 marker:text-white/30">
            <li>{es ? 'Encryption at rest (AES-256) e in transit (TLS 1.3)' : 'Encryption at rest (AES-256) and in transit (TLS 1.3)'}</li>
            <li>{es ? 'Row-Level Security en base de datos (aislamiento multi-tenant)' : 'Row-Level Security in database (multi-tenant isolation)'}</li>
            <li>{es ? 'RBAC granular con permission checks en 3 capas' : 'Granular RBAC with permission checks across 3 layers'}</li>
            <li>{es ? 'Audit log inmutable append-only' : 'Immutable append-only audit log'}</li>
            <li>{es ? '2FA obligatorio para empleados' : 'Mandatory 2FA for employees'}</li>
            <li>{es ? 'Revisiones de seguridad trimestrales' : 'Quarterly security reviews'}</li>
            <li>{es ? 'Programa de bug bounty privado' : 'Private bug bounty program'}</li>
            <li>{es ? 'Backups diarios con point-in-time recovery' : 'Daily backups with point-in-time recovery'}</li>
          </ul>
        </LegalSection>

        <LegalSection title={es ? '8. Sub-procesadores autorizados (Anexo 1)' : '8. Authorized sub-processors (Annex 1)'}>
          <p>
            {es
              ? 'El Cliente autoriza el uso de los sub-procesadores listados en blacknel.com/privacy, con notificación previa de 30 días para cambios sustanciales. El Cliente tiene derecho a oponerse a un nuevo sub-procesador; si la objeción no se resuelve, el Cliente puede terminar el MSA sin penalidad.'
              : 'Customer authorizes the use of the sub-processors listed at blacknel.com/privacy, with 30-day prior notice for substantial changes. Customer has the right to object to a new sub-processor; if the objection is not resolved, Customer may terminate the MSA without penalty.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '9. Requests de Data Subjects' : '9. Data subject requests'}>
          <p>
            {es
              ? 'Blacknel asiste al Cliente con medidas técnicas y organizativas apropiadas para responder requests de Data Subjects (acceso, rectificación, borrado, portabilidad). Para requests directos a Blacknel sobre datos del Cliente, los reenviamos al Cliente sin demora indebida.'
              : "Blacknel assists Customer with appropriate technical and organizational measures to respond to Data Subject requests (access, rectification, deletion, portability). For direct requests to Blacknel about Customer data, we forward them to Customer without undue delay."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '10. Notificación de brechas' : '10. Breach notification'}>
          <p>
            {es
              ? 'En caso de brecha de Datos Personales, Blacknel notificará al Cliente sin demora indebida y a más tardar dentro de 48 horas tras tener conocimiento, con la información requerida bajo el Art. 33.3 GDPR.'
              : 'In the event of a Personal Data breach, Blacknel will notify Customer without undue delay and no later than 48 hours after becoming aware, with the information required under GDPR Article 33.3.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '11. DPIAs y consultas previas' : '11. DPIAs and prior consultations'}>
          <p>
            {es
              ? 'Blacknel proporciona al Cliente la información razonablemente necesaria para que el Cliente realice Data Protection Impact Assessments (DPIA) o consultas previas con la Autoridad Supervisora, conforme a los Arts. 35–36 GDPR.'
              : 'Blacknel provides Customer with the information reasonably needed for Customer to perform Data Protection Impact Assessments (DPIAs) or prior consultations with the Supervisory Authority under GDPR Arts. 35–36.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '12. Transferencias internacionales (Anexo 3)' : '12. International transfers (Annex 3)'}>
          <p>
            {es
              ? 'Para transferencias de Datos Personales fuera del EEE, Blacknel adopta las Standard Contractual Clauses (SCC) aprobadas por la Comisión Europea (Decisión 2021/914, Module Two: Controller-to-Processor). Bajo solicitud, Blacknel proporciona Transfer Impact Assessments (TIA) específicos.'
              : 'For transfers of Personal Data outside the EEA, Blacknel adopts the Standard Contractual Clauses (SCC) approved by the European Commission (Decision 2021/914, Module Two: Controller-to-Processor). Upon request, Blacknel provides specific Transfer Impact Assessments (TIA).'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '13. Auditorías' : '13. Audits and inspections'}>
          <p>
            {es
              ? 'Blacknel pone a disposición del Cliente toda la información necesaria para demostrar el cumplimiento de las obligaciones del Art. 28 GDPR. Los clientes Enterprise pueden solicitar auditorías presenciales o de tercera parte con 30 días de anticipación, sujetas a NDA y cumplimiento de restricciones operativas razonables.'
              : "Blacknel makes available to Customer all information needed to demonstrate compliance with GDPR Art. 28 obligations. Enterprise customers may request on-site or third-party audits with 30 days' notice, subject to NDA and reasonable operational restrictions."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '14. Retorno o borrado de datos' : '14. Return or deletion of data'}>
          <p>
            {es
              ? 'Tras la terminación del MSA, Blacknel borra o devuelve (a elección del Cliente) todos los Datos Personales procesados, salvo cuando la ley aplicable requiera retención adicional. El borrado se ejecuta dentro de 90 días tras la terminación.'
              : "Upon MSA termination, Blacknel deletes or returns (at Customer's choice) all Personal Data processed, unless applicable law requires further retention. Deletion is executed within 90 days after termination."}
          </p>
        </LegalSection>

        <LegalSection title={es ? '15. Responsabilidad' : '15. Liability'}>
          <p>
            {es
              ? 'La responsabilidad bajo este DPA está sujeta a las limitaciones establecidas en el MSA. Nada en este DPA limita los derechos de Data Subjects bajo el GDPR o legislación local aplicable.'
              : 'Liability under this DPA is subject to the limitations set in the MSA. Nothing in this DPA limits Data Subject rights under GDPR or applicable local law.'}
          </p>
        </LegalSection>

        <LegalSection title={es ? '16. Cómo firmar el DPA' : '16. How to sign the DPA'}>
          <p>
            {es
              ? 'Si tu organización requiere DPA firmado físicamente, escribinos a legal@blacknel.com con tu razón social, jurisdicción y datos de tu DPO. Procesamos solicitudes de DPA en máximo 5 días hábiles.'
              : 'If your organization requires a signed DPA, write to legal@blacknel.com with your legal name, jurisdiction, and DPO contact. We process DPA requests within 5 business days.'}
          </p>
        </LegalSection>
      </LegalDoc>
    </>
  );
}
