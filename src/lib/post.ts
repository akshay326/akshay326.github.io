import type { CollectionEntry } from 'astro:content';

export const SITE_TITLE = 'Akshay Sharma';
export const SITE_DESCRIPTION =
  'Personal blog of Akshay Sharma - ML interpretability work at civerify.com, experiments with graph representation learning and LoRA dynamics, GSoC with Julia, and notes on data engineering.';
export const SITE_URL = 'https://akshay326.github.io';

export type BlogPost = CollectionEntry<'blog'>;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}:\d{2}:\d{2})(?: ([+-]\d{4}))?/;

/** Parse Jekyll-style date strings like "2024-01-30 10:00:00 -0500". */
export function postDate(post: BlogPost): Date {
  return parseDateString(post.data.date);
}

export function parseDateString(s: string): Date {
  const m = DATE_RE.exec(s);
  if (!m) return new Date(s);
  const [, y, mo, d, time, zone] = m;
  const iso = zone
    ? `${y}-${mo}-${d}T${time}${zone.slice(0, 3)}:${zone.slice(3)}`
    : `${y}-${mo}-${d}T${time}`;
  const dt = new Date(iso);
  return Number.isNaN(dt.getTime()) ? new Date(s) : dt;
}

/** Filename slug, preserving case (filePath keeps original casing). */
export function postSlug(post: BlogPost): string {
  const fp = post.filePath ?? post.id;
  const base = fp.split('/').pop() ?? post.id;
  return base.replace(/\.md$/, '');
}

/** Final route for a post, mirroring the Jekyll URL. */
export function postRoute(post: BlogPost): string {
  if (post.data.permalink) {
    return post.data.permalink.replace(/\/$/, '') + '.html';
  }
  const d = postDate(post);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `/${y}/${m}/${day}/${postSlug(post)}.html`;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "August 25, 2026" in UTC, matching Jekyll's date_to_long_string. */
export function formatDisplayDate(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** MM reading time: <200 words -> "less than 1 minute read", else words/200. */
export function readingTime(body: string): string {
  const words = (body || '').trim().split(/\s+/).filter(Boolean).length;
  if (words < 200) return 'less than 1 minute read';
  const minutes = Math.floor(words / 200);
  return `${minutes} minute${minutes === 1 ? '' : 's'} read`;
}

/** First paragraph of the markdown body (Jekyll's excerpt source). */
export function firstParagraph(body: string): string {
  const text = (body || '').trim();
  const para = text.split(/\n\s*\n/)[0] ?? '';
  return stripMarkdown(para).replace(/\s+/g, ' ').trim();
}

/** Excerpt for list cards: first paragraph, plain text, 160 chars. */
export function excerpt(body: string, max = 160): string {
  const text = firstParagraph(body);
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '...';
}

function stripMarkdown(s: string): string {
  return s
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<img[^>]*>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1');
}

export function sortPostsDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => postDate(b).getTime() - postDate(a).getTime());
}

export function isoDateTime(d: Date): string {
  return d.toISOString();
}

export function rssPubDate(d: Date): string {
  return d.toUTCString();
}
