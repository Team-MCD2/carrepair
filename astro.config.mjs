import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

const site = 'https://www.car-repair-france.fr';

export default defineConfig({
  site,
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
    },
    server: {
      watch: {
        usePolling: false,
        ignored: [
          '**/.gemini/**',
          '**/node_modules/**', 
          '**/.git/**',
          '**/.vscode/**',
          'C:\\Users\\PC\\.gemini/**',
        ],
      },
      fs: {
        strict: false,
      },
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/mentions-legales'),
      serialize(item) {
        const url = item.url;

        if (url === `${site}/` || url === site) {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: item.lastmod };
        }
        if (url.includes('/prestations/') || url.includes('/contact/')) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: item.lastmod };
        }
        if (url.includes('/a-propos/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: item.lastmod };
        }

        return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: item.lastmod };
      },
    }),
  ],
});
