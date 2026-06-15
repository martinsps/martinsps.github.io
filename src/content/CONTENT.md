# Guía de contenidos — Web del Proyecto NOVA

Todo el contenido científico vive en `src/content/` y se versiona con git. Añade o edita
archivos y haz commit: la web se reconstruye automáticamente al desplegar.

Los textos que pueden ir en dos idiomas usan campos `es` / `en`. Si omites `en`, se usa
el español como respaldo.

---

## 1. Equipo — `src/content/team/*.yaml`

Un archivo por persona. `category` debe ser uno de: `pi`, `core`, `training`, `advisor`,
`collaborator`. `order` controla la posición (menor = antes).

```yaml
name: Nombre Apellidos
category: core
order: 3
role:
  es: Investigadora
  en: Researcher
bio:
  es: Breve biografía en español.
  en: Short biography in English.
photo: ./photos/nombre-apellidos.jpg   # coloca la imagen junto al YAML
links:
  personal: https://...
  orcid: https://orcid.org/0000-0000-0000-0000
  scholar: https://scholar.google.com/...
  linkedin: https://www.linkedin.com/in/...
  premind: https://www.villanueva.edu/grupo-investigacion/premind/
```

> Las fotos se optimizan automáticamente. Recomendado: cuadradas, ≥ 600×600 px.

---

## 2. Publicaciones y comunicaciones — `src/content/publications/*.yaml`

Un archivo por entrada. `type`: `article`, `communication`, `chapter` o `preprint`.

```yaml
type: article
title: "Título de la publicación"
authors:
  - "Apellido, N."
  - "Apellido, N."
venue: Revista / Congreso
year: 2026
date: 2026-03-01      # opcional, mejora la ordenación
doi: 10.xxxx/xxxxx    # opcional
url: https://...       # opcional (enlace a la fuente)
featured: false        # true para destacarla en portada
summary:               # opcional
  es: Resumen breve.
  en: Short summary.
```

---

## 3. Tesis — `src/content/theses/*.yaml`

Un archivo por tesis. `kind`: `phd`, `master` o `tfg`.

```yaml
title: "Título de la tesis"
author: Nombre Apellidos
kind: phd
year: 2027
supervisors:
  - Pablo Roca Morales
university: Universidad Villanueva
url: https://...        # opcional
abstract:               # opcional
  es: Resumen.
  en: Abstract.
```

---

## 4. Noticias — `src/content/news/<idioma>/<slug>.md`

Markdown, en subcarpetas por idioma. Para una noticia bilingüe crea **dos archivos con el
mismo nombre**: `news/es/mi-noticia.md` y `news/en/mi-noticia.md`. El idioma y la URL se
deducen de la ruta (`/research/news/mi-noticia`).

```markdown
---
title: Título de la noticia
date: 2026-05-20
excerpt: Resumen de una o dos frases para los listados.
cover: /news/mi-noticia.jpg   # opcional, imagen en public/news/
draft: false                   # true para ocultarla
---

Cuerpo de la noticia en **Markdown**.
```

### Crear una noticia desde un post de LinkedIn (semi-automático)

En lugar de crear los dos archivos a mano, hay un generador que los escribe por ti a
partir del texto del post:

```bash
# Interactivo: te pregunta título, fecha, resumen, fuente y el cuerpo paso a paso.
npm run news:new

# O por argumentos, con el cuerpo desde un archivo o pegándolo por la tubería:
npm run news:new -- --title "Arranca NOVA" --excerpt "Resumen" --source https://www.linkedin.com/posts/... --body-file post.md
pbpaste | npm run news:new -- --title "Arranca NOVA" --excerpt "Resumen"
```

Crea `news/es/<slug>.md` y `news/en/<slug>.md` con `draft: true`. **Revisa el resultado,
traduce la versión en inglés** (el archivo EN se genera con un marcador
`<!-- TODO: traducir al inglés -->`) y pon `draft: false` antes de hacer commit. Con
`--source` añade al pie un enlace al post original.

> Para una traducción al inglés de calidad sin coste, puedes pegar el texto del post en
> Claude Code y pedirle la entrada bilingüe ya traducida.

**Totalmente automático (futuro):** el día que NOVA tenga una **página de Empresa** en
LinkedIn y una app aprobada para la *Community Management API*, un GitHub Action por cron
podría leer los posts nuevos y generar las noticias solo, reutilizando este generador
(`scripts/new-news.mjs`). Requiere aprobar la app y renovar el token OAuth periódicamente.

---

### Notas

- Idiomas: español en `/` y `/research`…, inglés en `/en/`, `/en/research`…
- Tras añadir contenido puedes comprobar el resultado con `npm run dev`.
- Enlaces externos y la referencia del proyecto se configuran en `src/config.ts`.
