import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.atlascrea.com',
  vite: {
    plugins: [tailwindcss()]
  }
});
