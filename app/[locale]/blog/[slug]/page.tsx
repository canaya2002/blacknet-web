import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { Badge } from '@/components/ui/badge';
import { GlowCard } from '@/components/aceternity/card-hover';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { CtaSection } from '@/components/home/cta-section';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { JsonLd, articleSchema } from '@/components/seo/structured-data';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.flatMap((p) => [
    { locale: 'es', slug: p.slug },
    { locale: 'en', slug: p.slug },
  ]);
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${slug}`,
    locale,
    ogImage: post.frontmatter.coverImage,
  });
}

export const revalidate = 3600;

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: 'blog' });
  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          author: post.frontmatter.author,
          date: post.frontmatter.date,
          url: siteUrl(`/${locale}/blog/${slug}`),
          image: post.frontmatter.coverImage,
        })}
      />
      <PageHero
        eyebrow={`${formatDate(post.frontmatter.date, locale)} · ${post.readingMinutes} ${t('minRead')}`}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.description}
      >
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {post.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </PageHero>

      <article className="container-page mx-auto max-w-3xl pb-20">
        <div className="mdx-content">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-[color:var(--color-border)] pt-8">
          <div>
            <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
              {t('by')}
            </p>
            <p className="mt-1 text-sm text-[color:var(--color-fg)]">{post.frontmatter.author}</p>
          </div>
          <Link
            href="/blog"
            className="mono text-sm text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg)]"
          >
            ← {t('hero.title')}
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-page pb-20">
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-[color:var(--color-fg)]">
            {t('relatedTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
                <GlowCard>
                  <div className="flex flex-col gap-3 p-6">
                    <p className="mono text-xs text-[color:var(--color-fg-tertiary)]">
                      {formatDate(p.frontmatter.date, locale)}
                    </p>
                    <h3 className="text-lg font-semibold text-[color:var(--color-fg)]">
                      {p.frontmatter.title}
                    </h3>
                    <p className="text-sm text-[color:var(--color-fg-secondary)] line-clamp-2">
                      {p.frontmatter.description}
                    </p>
                  </div>
                </GlowCard>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
