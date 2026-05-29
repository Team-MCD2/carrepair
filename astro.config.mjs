import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
