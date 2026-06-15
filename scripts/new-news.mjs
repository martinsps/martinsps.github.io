#!/usr/bin/env node
// @ts-check
/**
 * Generador de noticias bilingües para la web de NOVA.
 *
 * Convierte el texto de una publicación (p. ej. un post de LinkedIn) en los dos
 * archivos Markdown que espera la colección `news`:
 *   src/content/news/es/<slug>.md
 *   src/content/news/en/<slug>.md
 * El slug y el idioma se deducen de la ruta (ver src/content.config.ts).
 *
 * Las noticias se crean con `draft: true`: revisa el resultado (y la traducción
 * al inglés) y pon `draft: false` antes de hacer commit.
 *
 * Uso:
 *   # Por argumentos, con el cuerpo desde un archivo o por stdin:
 *   npm run news:new -- --title "Arranca NOVA" --excerpt "Resumen" --source https://www.linkedin.com/... --body-file post.md
 *   pbpaste | npm run news:new -- --title "Arranca NOVA" --excerpt "Resumen"
 *
 *   # Modo interactivo (sin --title y en una terminal): te pregunta todo paso a paso.
 *   npm run news:new
 *
 * Opciones:
 *   --title <texto>        Título en español (obligatorio salvo en modo interactivo)
 *   --title-en <texto>     Título en inglés (opcional; por defecto = título ES)
 *   --date <YYYY-MM-DD>    Fecha (por defecto: hoy)
 *   --excerpt <texto>      Resumen ES para los listados
 *   --excerpt-en <texto>   Resumen EN (opcional; por defecto = resumen ES)
 *   --cover </news/x.jpg>  Imagen de portada en public/ (opcional)
 *   --source <url>         URL del post original; añade un pie enlazando a la fuente
 *   --slug <slug>          Forzar el slug (por defecto se deriva del título ES)
 *   --body-file <ruta>     Cuerpo ES en Markdown desde un archivo
 *   --body-en-file <ruta>  Cuerpo EN en Markdown (opcional; por defecto se copia el ES
 *                          con un marcador "TODO: traducir")
 *
 * NOTA (futuro "totalmente automático"): el día que NOVA tenga una página de Empresa
 * en LinkedIn y una app aprobada para la Community Management API, un GitHub Action
 * por cron puede leer los posts nuevos de la organización y llamar a `writeNews(...)`
 * (exportada abajo) para generar los archivos y hacer commit, reutilizando esta misma
 * lógica. Caveats: aprobación de la app y refresco del token OAuth (caduca).
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const NEWS_DIR = resolve(REPO_ROOT, 'src/content/news');

/** Convierte un título en un slug seguro para URL/archivo. */
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos (marcas diacriticas combinantes)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // todo lo no alfanumérico → guion
    .replace(/^-+|-+$/g, '') // sin guiones al principio/final
    .slice(0, 80);
}

/** Serializa un valor de cadena como YAML entre comillas dobles, con escape. */
function yamlString(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/** Fecha de hoy en formato YYYY-MM-DD. */
function today() {
  return new Date().toISOString().slice(0, 10);
}

/** Parseo mínimo de argumentos `--clave valor`. */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[key] = true; // bandera sin valor
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

/** Construye el cuerpo completo de un archivo de noticia (frontmatter + Markdown). */
function buildMarkdown({ title, date, excerpt, cover, body, sourceUrl, lang }) {
  const fm = [`title: ${yamlString(title)}`, `date: ${date}`];
  if (excerpt) fm.push(`excerpt: ${yamlString(excerpt)}`);
  if (cover) fm.push(`cover: ${yamlString(cover)}`);
  fm.push('draft: true');

  const parts = [`---\n${fm.join('\n')}\n---`, '', body.trim()];

  if (sourceUrl) {
    const label =
      lang === 'en'
        ? `*Originally published on [LinkedIn](${sourceUrl}).*`
        : `*Publicado originalmente en [LinkedIn](${sourceUrl}).*`;
    parts.push('', '---', '', label);
  }

  return parts.join('\n') + '\n';
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Escribe los dos archivos de noticia. Reutilizable desde otros scripts/automatizaciones.
 * Devuelve las rutas creadas. Lanza si el slug ya existe (salvo overwrite).
 */
export async function writeNews({
  title,
  titleEn,
  date,
  excerpt,
  excerptEn,
  cover,
  sourceUrl,
  slug,
  bodyEs,
  bodyEn,
  overwrite = false,
}) {
  const finalSlug = slug || slugify(title);
  if (!finalSlug) throw new Error('No se pudo derivar un slug del título.');

  const esPath = resolve(NEWS_DIR, 'es', `${finalSlug}.md`);
  const enPath = resolve(NEWS_DIR, 'en', `${finalSlug}.md`);

  if (!overwrite && ((await fileExists(esPath)) || (await fileExists(enPath)))) {
    throw new Error(
      `Ya existe una noticia con el slug "${finalSlug}". Usa --slug para elegir otro o borra los archivos.`,
    );
  }

  // Si no hay cuerpo EN, se copia el español con un aviso para traducir.
  const enBodyResolved = bodyEn
    ? bodyEn
    : `<!-- TODO: traducir al inglés -->\n\n${bodyEs}`;

  const esMd = buildMarkdown({
    title,
    date,
    excerpt,
    cover,
    body: bodyEs,
    sourceUrl,
    lang: 'es',
  });
  const enMd = buildMarkdown({
    title: titleEn || title,
    date,
    excerpt: excerptEn || excerpt,
    cover,
    body: enBodyResolved,
    sourceUrl,
    lang: 'en',
  });

  await mkdir(dirname(esPath), { recursive: true });
  await mkdir(dirname(enPath), { recursive: true });
  await writeFile(esPath, esMd, 'utf8');
  await writeFile(enPath, enMd, 'utf8');

  return { slug: finalSlug, esPath, enPath };
}

/** Lee todo lo que llegue por stdin (cuando viene de una tubería). */
async function readStdin() {
  if (stdin.isTTY) return '';
  const chunks = [];
  for await (const chunk of stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

/** Modo interactivo: pregunta los campos y lee el cuerpo hasta una línea "END". */
async function runInteractive() {
  const rl = createInterface({ input: stdin, output: stdout });
  const ask = async (q, fallback = '') => {
    const answer = (await rl.question(q)).trim();
    return answer || fallback;
  };

  console.log('\nNueva noticia (deja en blanco para omitir un campo opcional).\n');
  const title = await ask('Título (ES): ');
  if (!title) {
    rl.close();
    throw new Error('El título en español es obligatorio.');
  }
  const titleEn = await ask('Título (EN, opcional): ');
  const date = await ask(`Fecha [${today()}]: `, today());
  const excerpt = await ask('Resumen/excerpt (ES): ');
  const excerptEn = await ask('Resumen/excerpt (EN, opcional): ');
  const cover = await ask('Portada (ruta en /public, opcional): ');
  const sourceUrl = await ask('URL del post de LinkedIn (opcional): ');

  console.log('\nCuerpo en Markdown (ES). Pega el texto y termina con una línea que diga END:\n');
  const lines = [];
  for (;;) {
    const line = await rl.question('');
    if (line.trim() === 'END') break;
    lines.push(line);
  }
  rl.close();

  return {
    title,
    titleEn,
    date,
    excerpt,
    excerptEn,
    cover,
    sourceUrl,
    bodyEs: lines.join('\n'),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let data;

  if (!args.title && stdin.isTTY) {
    // Sin título y en terminal → modo interactivo.
    data = await runInteractive();
  } else {
    if (!args.title) throw new Error('Falta --title (o ejecútalo en una terminal para el modo interactivo).');
    const bodyEs = args['body-file']
      ? await readFile(resolve(process.cwd(), args['body-file']), 'utf8')
      : await readStdin();
    const bodyEn = args['body-en-file']
      ? await readFile(resolve(process.cwd(), args['body-en-file']), 'utf8')
      : undefined;
    data = {
      title: args.title,
      titleEn: args['title-en'] || '',
      date: args.date || today(),
      excerpt: args.excerpt || '',
      excerptEn: args['excerpt-en'] || '',
      cover: args.cover || '',
      sourceUrl: args.source || '',
      slug: args.slug || '',
      bodyEs,
      bodyEn,
    };
  }

  if (!data.bodyEs || !data.bodyEs.trim()) {
    throw new Error('El cuerpo de la noticia está vacío. Pásalo con --body-file, por stdin o en modo interactivo.');
  }

  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(`Fecha inválida "${data.date}". Usa el formato YYYY-MM-DD.`);
  }

  const { slug, esPath, enPath } = await writeNews(data);

  const rel = (p) => p.replace(REPO_ROOT + '/', '');
  console.log(`\n✓ Noticia creada (slug: ${slug}, draft: true)`);
  console.log(`  ES → ${rel(esPath)}`);
  console.log(`  EN → ${rel(enPath)}`);
  console.log('\nSiguientes pasos:');
  console.log('  1. Revisa el texto y la traducción al inglés.');
  console.log('  2. Cambia "draft: true" → "draft: false" cuando esté lista.');
  console.log('  3. Comprueba con "npm run dev" y haz commit.\n');
}

main().catch((err) => {
  console.error(`\n✗ ${err.message}\n`);
  process.exit(1);
});
