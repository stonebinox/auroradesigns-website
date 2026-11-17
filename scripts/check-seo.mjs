import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BANNED_COPY = [
  'best', 'leading', 'world-class', 'world class', 'award-winning', 'unmatched',
  'unparalleled', 'revolutionary', 'groundbreaking', 'cutting-edge', 'number one',
  '#1', 'most trusted', 'guaranteed', 'industry-leading', 'state-of-the-art', 'best-in-class',
];
const BANNED_SCHEMA_TYPES = ['LocalBusiness', 'AggregateRating', 'Review'];
const PLACEHOLDERS = /localhost|\b127(?:\.\d{1,3}){3}\b|\b0\.0\.0\.0\b|(?<![\w:])\[?::1\]?(?![\w:])|\bexample\.[a-z]{2,}\b|your-?domain/i;

const distDir = resolve(process.argv[2] || process.env.SEO_DIST || 'dist');
const configUrl = pathToFileURL(resolve(import.meta.dirname, '../astro.config.mjs')).href;
const origin = new URL((await import(configUrl)).default.site).origin;

const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);
const rel = (p) => relative(distDir, p) || p;

if (!existsSync(distDir)) {
  console.error(`check-seo: dist directory not found: ${distDir}`);
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(distDir);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const read = (f) => readFileSync(f, 'utf8');

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
};
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&amp;/g, '&');
const textOf = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const elements = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'gi'))].map((m) => textOf(m[1]));
const routeOf = (f) => '/' + rel(f).replace(/(^|\/)index\.html$/, '$1');
const urlToFile = (pathname) => {
  const p = decodeURIComponent(pathname);
  const candidates = p.endsWith('/') ? [join(distDir, p, 'index.html')] : [join(distDir, p), join(distDir, p, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};
const collectTypes = (node, out = []) => {
  if (Array.isArray(node)) node.forEach((n) => collectTypes(n, out));
  else if (node && typeof node === 'object') {
    if ('@type' in node) out.push(...[].concat(node['@type']));
    Object.values(node).forEach((v) => collectTypes(v, out));
  }
  return out;
};

const titles = new Map();
const descriptions = new Map();
const indexable = [];
const noindexed = new Set();

for (const file of htmlFiles) {
  const f = rel(file);
  const html = read(file);
  const ts = elements(html, 'title');
  if (ts.length !== 1 || !ts[0]) fail(f, `expected exactly one non-empty <title>, found ${ts.length}`);
  const h1s = elements(html, 'h1');
  if (h1s.length !== 1 || !h1s[0]) fail(f, `expected exactly one non-empty <h1>, found ${h1s.length}`);

  const robots = tags(html, 'meta').filter((t) => attr(t, 'name')?.toLowerCase() === 'robots');
  const noindex = robots.some((t) => /noindex/i.test(attr(t, 'content') || ''));
  const canonicals = tags(html, 'link').filter((t) => attr(t, 'rel')?.toLowerCase() === 'canonical');

  const desc = tags(html, 'meta').find((t) => attr(t, 'name')?.toLowerCase() === 'description');
  const dc = desc && attr(desc, 'content');
  if (ts[0]) titles.set(ts[0], [...(titles.get(ts[0]) || []), f]);
  if (!dc || !dc.trim()) fail(f, 'missing meta description');
  else descriptions.set(dc, [...(descriptions.get(dc) || []), f]);

  if (noindex) {
    noindexed.add(file);
    if (canonicals.length) fail(f, 'noindex page must not have a canonical link');
    continue;
  }
  indexable.push(file);
  if (robots.length !== 1) fail(f, `expected exactly one robots meta, found ${robots.length}`);
  const expected = origin + routeOf(file);
  if (canonicals.length !== 1) fail(f, `expected exactly one canonical, found ${canonicals.length}`);
  else if (attr(canonicals[0], 'href') !== expected) fail(f, `canonical "${attr(canonicals[0], 'href')}" should be "${expected}"`);

  const scripts = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (scripts.length !== 1) { fail(f, `expected exactly one JSON-LD script, found ${scripts.length}`); continue; }
  let data;
  try { data = JSON.parse(scripts[0][1]); } catch (e) { fail(f, `JSON-LD does not parse: ${e.message}`); continue; }
  if (!String(JSON.stringify(data['@context'])).includes('schema.org')) fail(f, 'JSON-LD @context must contain schema.org');
  if (!Array.isArray(data['@graph'])) { fail(f, 'JSON-LD must have an @graph array'); continue; }
  const ids = new Set();
  data['@graph'].forEach((node, i) => {
    if (!node || !node['@type']) fail(f, `JSON-LD @graph node ${i} has no @type`);
    if (node?.['@id'] !== undefined) {
      if (ids.has(node['@id'])) fail(f, `JSON-LD duplicate @id "${node['@id']}"`);
      ids.add(node['@id']);
    }
  });
  for (const t of collectTypes(data['@graph'])) {
    if (BANNED_SCHEMA_TYPES.includes(t)) fail(f, `JSON-LD contains banned type ${t}`);
  }
}
for (const [label, map] of [['title', titles], ['meta description', descriptions]]) {
  for (const [v, list] of map) if (list.length > 1) fail(list.join(', '), `duplicate ${label} "${v}"`);
}

for (const file of files.filter((f) => /\.(html|txt|xml)$/.test(f))) {
  const m = read(file).match(PLACEHOLDERS);
  if (m) fail(rel(file), `contains placeholder or local host "${m[0]}"`);
}

const canonicalUrls = new Set(indexable.map((f) => origin + routeOf(f)));
const sitemapUrls = new Set();
const indexFile = join(distDir, 'sitemap-index.xml');
const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map((m) => decode(m[1]));
if (!existsSync(indexFile)) fail('sitemap-index.xml', 'file is missing');
else {
  for (const sm of locs(read(indexFile))) {
    let u;
    try { u = new URL(sm); } catch { fail('sitemap-index.xml', `invalid sitemap URL "${sm}"`); continue; }
    const smFile = u.origin === origin && urlToFile(u.pathname);
    if (!smFile) { fail('sitemap-index.xml', `sitemap not found in dist: ${sm}`); continue; }
    for (const loc of locs(read(smFile))) {
      let lu;
      try { lu = new URL(loc); } catch { fail(rel(smFile), `invalid sitemap URL "${loc}"`); continue; }
      if (lu.origin !== origin) fail(rel(smFile), `<loc> has wrong origin: ${loc}`);
      else if (!canonicalUrls.has(loc)) {
        const why = lu.search || lu.hash ? 'has a query string or fragment'
          : !lu.pathname.endsWith('/') ? 'does not end in "/"'
          : noindexed.has(urlToFile(lu.pathname)) ? 'points at a noindex page'
          : 'is not the canonical URL of an indexable HTML page';
        fail(rel(smFile), `<loc> ${why}: ${loc}`);
      }
      sitemapUrls.add(loc);
    }
  }
  for (const file of indexable) {
    const url = origin + routeOf(file);
    if (!sitemapUrls.has(url)) fail(rel(file), `indexable page missing from sitemap: ${url}`);
  }
}
const robotsFile = join(distDir, 'robots.txt');
if (!existsSync(robotsFile)) fail('robots.txt', 'file is missing');
else {
  const lines = [...read(robotsFile).matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!lines.length) fail('robots.txt', 'no Sitemap: line');
  for (const s of lines) {
    let ok = false;
    try { const u = new URL(s); ok = u.origin === origin && !!urlToFile(u.pathname); } catch {}
    if (!ok) fail('robots.txt', `Sitemap target not found in dist: ${s}`);
  }
}

const llmsFile = join(distDir, 'llms.txt');
const llms = existsSync(llmsFile) ? read(llmsFile) : null;
if (llms === null) fail('llms.txt', 'file is missing');
else {
  const urls = new Set([
    ...[...llms.matchAll(/\]\(\s*([^)\s]+)/g)].map((m) => m[1]),
    ...(llms.match(/https?:\/\/[^\s)<>\]]+/g) || []).map((u) => u.replace(/[.,;:]+$/, '')),
  ]);
  for (const raw of urls) {
    let u;
    try { u = new URL(raw, origin + '/'); } catch { fail('llms.txt', `invalid URL: ${raw}`); continue; }
    if (!/^https?:$/.test(u.protocol)) continue;
    if (u.origin !== origin) continue;
    const target = urlToFile(u.pathname);
    if (!target) { fail('llms.txt', `link has no dist file: ${raw}`); continue; }
    if (u.hash.length > 1) {
      const id = decodeURIComponent(u.hash.slice(1));
      const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\sid\\s*=\\s*["']?${esc}["'\\s>]`).test(read(target))) fail('llms.txt', `fragment #${id} not found in ${rel(target)}`);
    }
  }
}

const banned = new RegExp(
  `(?<![\\w#-])(?:${BANNED_COPY.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w-])`, 'gi');
const guard = (name, text) => {
  for (const m of text.matchAll(banned)) {
    const s = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ');
    fail(name, `banned copy "${m[0]}" in: ...${s}...`);
  }
};
for (const file of htmlFiles) {
  guard(rel(file), textOf(read(file).replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')));
}
if (llms !== null) guard('llms.txt', llms);

const EM_DASH = '\u2014';
const TEXT_FILE = /\.(html|txt|xml|css|js|mjs|json|svg|webmanifest)$/i;
const SOURCE_FILE = /\.(html|txt|xml|css|js|mjs|json|svg|webmanifest|ts|astro|md)$/i;
const projectRoot = resolve(import.meta.dirname, '..');
const sourceFiles = ['src', 'scripts', 'public']
  .map((d) => join(projectRoot, d))
  .filter((d) => existsSync(d))
  .flatMap(walk)
  .filter((f) => SOURCE_FILE.test(f));
const dashTargets = [
  ...files.filter((f) => TEXT_FILE.test(f)).map((f) => [rel(f), f]),
  ...sourceFiles.map((f) => [relative(projectRoot, f), f]),
];
for (const [name, file] of dashTargets) {
  const text = read(file);
  const i = text.indexOf(EM_DASH);
  if (i !== -1) {
    const s = text.slice(Math.max(0, i - 40), i + 41).replace(/\s+/g, ' ');
    fail(name, `contains an em dash (U+2014): ...${s}...`);
  }
}

if (failures.length) {
  failures.forEach((m) => console.error(`FAIL ${m}`));
  console.error(`check-seo: ${failures.length} failure(s) in ${htmlFiles.length} page(s)`);
  process.exit(1);
}
console.log(`check-seo: passed (${htmlFiles.length} pages, ${indexable.length} indexable, ${sitemapUrls.size} sitemap URLs)`);
