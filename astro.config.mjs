import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://atlascrea.ma',
  base: '/atlascrea-website',
  vite: {
    plugins: [tailwindcss()]
  }
});
