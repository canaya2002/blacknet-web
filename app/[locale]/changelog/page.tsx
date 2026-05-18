import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PageHero } from '@/components/layout/page-hero';
import { CtaSection } from '@/components/home/cta-section';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { ChangelogHeroVisual } from '@/components/hero-visuals/changelog';
import { getAllChangelog } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'changelog.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/changelog',
    locale,
  });
}

export const revalidate = 3600;

export default async function ChangelogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'changelog.hero' });
  const entries = await getAllChangelog(locale);

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={<ChangelogHeroVisual />}
      />

      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl">
          {entries.map((entry, i) => (
            <FadeInOnScroll key={entry.slug} delay={i * 0.05}>
              <article
                id={entry.slug}
                className="relative border-l border-[color:var(--color-border)] pl-8 pb-16 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-white"
                  style={{ boxShadow: '0 0 16px rgba(255,255,255,0.5)' }}
                />
                <div className="flex items-center gap-3">
                  <p className="mono text-xs text-[color:var(--color-fg-tertiary)]">
                    {formatDate(entry.frontmatter.date, locale)}
                  </p>
                  {entry.frontmatter.tags?.[0] && (
                    <Badge variant="mono">{entry.frontmatter.tags[0]}</Badge>
                  )}
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gradient md:text-3xl">
                  {entry.frontmatter.title}
                </h2>
                <p className="mt-2 text-[color:var(--color-fg-secondary)]">
                  {entry.frontmatter.description}
                </p>
                <div className="mt-6">
                  <MDXRemote source={entry.content} components={mdxComponents} />
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
