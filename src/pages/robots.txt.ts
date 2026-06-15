import type { APIRoute } from 'astro';

const body = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  // `site` comes from astro.config.mjs; the sitemap is emitted by @astrojs/sitemap.
  const sitemapURL = new URL('sitemap-index.xml', site ?? 'https://example.org');
  return new Response(body(sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
