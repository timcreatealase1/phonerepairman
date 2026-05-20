import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://phonerepairman.com.au',
  output: 'static',
  integrations: [tailwind()],
});
