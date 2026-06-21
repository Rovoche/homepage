import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
const isGithubActions = !!process.env.GITHUB_ACTIONS;
export default defineConfig({
  site: 'https://rovoche.com',
  base: isGithubActions ? '/homepage/' : '/',
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '.',
      },
    },
  },
});
