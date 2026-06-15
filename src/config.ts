/**
 * Site-wide constants for the NOVA project website.
 *
 * Non-translatable values live here; user-facing copy lives in `src/i18n/ui.ts`.
 * Values marked TODO should be confirmed/replaced by the project team.
 */

export const SITE = {
  /** Short brand used in the header / logo. */
  name: 'NOVA',
  /** Full project name. */
  longName: 'Proyecto NOVA',
  /** Funding reference. TODO: confirmar la referencia exacta del proyecto. */
  projectRef: 'PID2024-156740OA-I00',
  /** Year the project runs until (for the footer). */
  fundedUntil: 2029,
} as const;

/** External institutional / personal links surfaced across the site. */
export const EXTERNAL_LINKS = {
  premind: 'https://www.villanueva.edu/grupo-investigacion/premind/',
  villanueva: 'https://www.villanueva.edu/',
  pabloRoca: 'https://pablorocamorales.com/',
  novaPaper:
    'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2026.1775489/full',
} as const;

/**
 * Contact form delivery via Web3Forms (https://web3forms.com).
 * The access key is a PUBLIC key and is safe to ship in client-side code.
 * TODO: replace `web3formsKey` with the project's real access key.
 */
export const CONTACT = {
  web3formsKey: '60a24188-0d2f-492c-8b37-3b91ba97697f',
  /** Informational address shown in the footer (optional). TODO. */
  email: '',
} as const;
