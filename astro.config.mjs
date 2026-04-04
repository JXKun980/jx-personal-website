import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

const isBuild = process.argv.includes('build');

export default defineConfig({
  integrations: [react(), markdoc(), ...(isBuild ? [] : [keystatic()])],
  output: isBuild ? 'static' : 'server',
  vite: {
    plugins: [tailwindcss()],
  },
});
