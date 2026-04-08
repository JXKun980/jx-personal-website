import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [react()],
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['node:fs/promises', 'node:path'],
    },
  },
});
