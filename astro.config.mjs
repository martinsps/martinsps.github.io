// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
//
// NOTE: `site` should be the project's final canonical URL. It is currently set
// to this repository's GitHub Pages URL — update it to the custom domain once it
// is contracted (this drives canonical URLs, hreflang alternates and the sitemap).
export default defineConfig({
  site: 'https://martinsps.github.io',
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
