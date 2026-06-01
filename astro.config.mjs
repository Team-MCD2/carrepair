import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://www.car-repair-france.fr';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
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
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
