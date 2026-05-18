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

async function loadDir(dir: string): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const items = await Promise.all(
    files
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf8');
        const { data, content } = matter(raw);
        const stats = readingTime(content);
        return {
          slug: file.replace(/\.mdx?$/, ''),
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

export async function getAllPosts(): Promise<Post[]> {
  return loadDir(blogDir);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getAllChangelog(): Promise<Post[]> {
  return loadDir(changelogDir);
}
