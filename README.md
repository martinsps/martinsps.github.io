# Web del Proyecto NOVA

Sitio web del **Proyecto NOVA** (*Navigating Outcomes Via Analytics* — Salud Mental de
Precisión), del laboratorio **PreMind** (Universidad Villanueva). Construido con
[Astro](https://astro.build), estático, bilingüe (ES/EN) y optimizado para SEO y rendimiento.

## Desarrollo

```sh
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:4321
npm run build    # build de producción en ./dist
npm run preview  # previsualizar el build
npm run check    # comprobación de tipos (astro check)
```

Requisitos: Node.js ≥ 22.12.

## Estructura

- **Idiomas**: español en `/`, inglés en `/en/`. Diccionario de interfaz en
  [`src/i18n/ui.ts`](src/i18n/ui.ts).
- **Secciones**: Inicio (`/`), Investigación (`/research`), Equipo (`/team`).
- **Contenido** (publicaciones, comunicaciones, noticias, tesis, equipo): colecciones en
  [`src/content/`](src/content/). Cómo añadir contenido: ver
  [`src/content/CONTENT.md`](src/content/CONTENT.md).
- **Configuración** (enlaces externos, referencia del proyecto, clave del formulario):
  [`src/config.ts`](src/config.ts).

## Pendiente de configurar

- **Formulario de contacto**: pega tu *access key* de [Web3Forms](https://web3forms.com) en
  `CONTACT.web3formsKey` ([`src/config.ts`](src/config.ts)).
- **Dominio final**: actualiza `site` en [`astro.config.mjs`](astro.config.mjs) (afecta a
  canónicos, hreflang y sitemap).
- **Identidad visual**: ajusta los colores/tipografías en
  [`src/styles/global.css`](src/styles/global.css) (`:root`) y sustituye el favicon en `public/`.
- **Logo del financiador**: añádelo en `src/assets/funders/` y renderízalo en
  [`src/components/Footer.astro`](src/components/Footer.astro).
- **Fotos del equipo** y datos reales: ver [`src/content/CONTENT.md`](src/content/CONTENT.md).
- **Política de privacidad (RGPD)**: completa [`src/pages/privacy.astro`](src/pages/privacy.astro)
  y [`src/pages/en/privacy.astro`](src/pages/en/privacy.astro).

## Despliegue

Incluye un workflow de GitHub Pages en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
(activa *Settings → Pages → Source: GitHub Actions*). Puede sustituirse por el hosting que se
contrate para el proyecto.
