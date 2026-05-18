import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { Button } from '@/components/ui/button';
import { DocsHeroVisual } from '@/components/hero-visuals/docs';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'docs.hero' });
  return buildMetadata({ title: t('title'), description: t('subtitle'), path: '/docs', locale });
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'docs' });

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        visual={<DocsHeroVisual />}
      />
      <section className="container-page pb-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-10 text-center backdrop-blur-md">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-secondary)]">
            <BookOpen className="h-5 w-5 text-[color:var(--color-fg)]" />
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-fg-secondary)]">
            REST API · Webhooks · SDK · Multi-tenant guides
          </p>
          <div className="mt-6">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                {t('cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
