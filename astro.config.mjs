// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// NOTE: `site` is the project's final canonical URL. It drives canonical URLs,
// hreflang alternates and the sitemap, so it must match the live custom domain.
export default defineConfig({
  site: 'https://project-nova.es',
  // base: '/', // user/org pages repo is served from the domain root.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // Spanish lives at "/", English at "/en/".
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
    }),
  ],
});
