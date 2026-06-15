/** i18n helpers built on top of the `ui` dictionary. */
import { ui, defaultLang, languages, type Lang } from './ui';

export { type Lang, languages, defaultLang };

/** Infer the active language from the request URL ("/en/..." => "en"). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

/** Return the translation dictionary for a language. */
export function useTranslations(lang: Lang) {
  return ui[lang];
}

/**
 * Build a site path for a given locale.
 * Spanish (default) lives at the root, English under "/en".
 *   localizePath('/research', 'en') => '/en/research'
 *   localizePath('/', 'en')         => '/en/'
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+|\/+$/g, '');
  if (lang === defaultLang) return clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** Remove the locale prefix from a pathname, returning the canonical (es) path. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && parts[0] in ui && parts[0] !== defaultLang) parts.shift();
  return '/' + parts.join('/');
}

/** Pick the right value from a localized content field, falling back to Spanish. */
export function pickLocalized<T>(
  field: { es: T; en?: T } | undefined,
  lang: Lang,
): T | undefined {
  if (!field) return undefined;
  return (lang === 'en' ? field.en : field.es) ?? field.es;
}

/** Locale-aware date formatting. */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** All locales with their absolute/relative URL for the current canonical path. */
export function getAlternateLinks(url: URL) {
  const canonical = stripLang(url.pathname);
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    hreflang: lang === 'es' ? 'es-ES' : 'en-US',
    path: localizePath(canonical, lang),
  }));
}
