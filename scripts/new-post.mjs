// Scaffold a new blog post: `npm run new:post -- "My Title"` (or pass a slug).
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run new:post -- "Post Title"');
  process.exit(1);
}
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
const date = new Date().toISOString().slice(0, 10);
const dir = join(process.cwd(), 'src', 'content', 'blog');
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);
const body = `---
title: "${title}"
date: ${date}
description:
---

`;
writeFileSync(file, body);
console.log(`Created ${file}`);
