import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { GlowCard } from '@/components/aceternity/card-hover';
import { Badge } from '@/components/ui/badge';
import { BlogHeroVisual } from '@/components/hero-visuals/blog';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.hero' });
  return buildMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/blog',
    locale,
  });
}

export const revalidate = 3600;

export default async function BlogIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getAllPosts(locale);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        visual={<BlogHeroVisual />}
      />

      <section className="container-page py-12 md:py-16">
        {featured && (
          <FadeInOnScroll>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <GlowCard>
                <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:p-10">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]">
                    {featured.frontmatter.coverImage ? (
                      <Image
                        src={featured.frontmatter.coverImage}
                        alt={featured.frontmatter.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{
                          background:
                            'radial-gradient(at 30% 30%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(at 70% 70%, rgba(96,165,250,0.25), transparent 60%), #0a0a0a',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs text-[color:var(--color-fg-tertiary)]">
                      <Badge variant="mono">Featured</Badge>
                      <span className="mono">
                        {formatDate(featured.frontmatter.date, locale)}
                      </span>
                      <span>· {featured.readingMinutes} {t('minRead')}</span>
                    </div>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-gradient md:text-3xl group-hover:text-white">
                      {featured.frontmatter.title}
                    </h2>
                    <p className="text-[color:var(--color-fg-secondary)]">
                      {featured.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featured.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </Link>
          </FadeInOnScroll>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <FadeInOnScroll key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <GlowCard className="h-full">
                  <div className="flex h-full flex-col gap-4 p-6">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]">
                      {post.frontmatter.coverImage ? (
                        <Image
                          src={post.frontmatter.coverImage}
                          alt={post.frontmatter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{
                            background:
                              'radial-gradient(at 30% 30%, rgba(96,165,250,0.18), transparent 60%), radial-gradient(at 70% 70%, rgba(244,114,182,0.16), transparent 60%), #0a0a0a',
                          }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[color:var(--color-fg-tertiary)]">
                      <span className="mono">{formatDate(post.frontmatter.date, locale)}</span>
                      <span>· {post.readingMinutes} {t('minRead')}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-[color:var(--color-fg)] group-hover:text-white">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-sm text-[color:var(--color-fg-secondary)] line-clamp-3">
                      {post.frontmatter.description}
                    </p>
                  </div>
                </GlowCard>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
