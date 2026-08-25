// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://akshay326.github.io',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      customPages: ['https://akshay326.github.io/bird-feeder/'],
      serialize: (item) => {
        const url = new URL(item.url);
        const path = url.pathname;
        if (path === '/' || path.endsWith('/')) return item;
        if (!/\.[a-z0-9]+$/.test(path)) {
          url.pathname = path + '.html';
        }
        return { ...item, url: url.href };
      },
    }),
  ],
});
