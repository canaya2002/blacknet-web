import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  locale?: string;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: Frontmatter;
  readingMinutes: number;
};

const blogDir = path.join(process.cwd(), 'content/blog');
const changelogDir = path.join(process.cwd(), 'content/changelog');

const SUPPORTED_LOCALES = ['es', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Extract base slug + locale from filename.
 *   "foo.es.mdx" -> { slug: "foo", locale: "es" }
 *   "foo.mdx"    -> { slug: "foo", locale: null }
 */
function parseSlug(file: string): { slug: string; locale: Locale | null } {
  const base = file.replace(/\.mdx?$/, '');
  const parts = base.split('.');
  if (parts.length >= 2) {
    const maybeLocale = parts[parts.length - 1] ?? '';
    if (isLocale(maybeLocale)) {
      return { slug: parts.slice(0, -1).join('.'), locale: maybeLocale };
    }
  }
  return { slug: base, locale: null };
}

async function loadDir(dir: string, locale: string): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  // Group by base slug, preferring locale-specific version, falling back to no-locale, then any locale.
  const bySlug = new Map<string, string>();
  for (const file of mdxFiles) {
    const { slug, locale: fileLocale } = parseSlug(file);
    const current = bySlug.get(slug);
    const currentLocale = current ? parseSlug(current).locale : undefined;

    const prefersThis =
      fileLocale === locale ||
      (currentLocale === null && fileLocale === null && !current) ||
      (currentLocale !== locale && fileLocale !== null && currentLocale === null);

    if (!current || prefersThis) {
      bySlug.set(slug, file);
    }
  }

  const items = await Promise.all(
    Array.from(bySlug.entries()).map(async ([slug, file]) => {
      const raw = await fs.readFile(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug,
        content,
        frontmatter: data as Frontmatter,
        readingMinutes: Math.max(1, Math.round(stats.minutes)),
      };
    }),
  );
  return items.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

export async function getAllPosts(locale: string = 'en'): Promise<Post[]> {
  return loadDir(blogDir, locale);
}

export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<Post | null> {
  const all = await getAllPosts(locale);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getAllChangelog(locale: string = 'en'): Promise<Post[]> {
  return loadDir(changelogDir, locale);
}
