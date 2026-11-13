// FILE: scripts/prerender-seo.mjs
// Runs after `vite build`. For every public route it writes a real HTML file
// (dist/<route>/index.html) with that route's own <title>, meta description,
// canonical, social tags, structured data and readable text content inside
// #root. React replaces that content when it loads, so visitors see the full
// app, while search engines and AI crawlers that read the raw HTML get a
// distinct, meaningful page for each URL.
//
// It also writes dist/404.html (served by Vercel with a real 404 status),
// dist/_shell.html (empty app shell for /admin and /crm) and dist/sitemap.xml.
//
// All text comes from src/seo/seo-data.json, the same file the React pages use.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const data = JSON.parse(readFileSync(join(root, 'src/seo/seo-data.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { site } = data;

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const absUrl = (path) => (path === '/' ? `${site.url}/` : `${site.url}${path}`);

/** Replace exactly one match or stop the build, so template changes never fail silently. */
function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-seo: could not find ${label} in dist/index.html`);
  return html.replace(pattern, replacement);
}

function buildHead(html, { title, description, url, noindex = false, keepFaq = false, jsonLd = [] }) {
  const t = esc(title);
  const d = esc(description);
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, '<title>');
  html = swap(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`, 'meta description');
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`, 'og:title');
  html = swap(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`, 'og:description');
  html = swap(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`, 'twitter:title');
  html = swap(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`, 'twitter:description');

  if (url) {
    html = swap(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical');
    html = swap(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  } else {
    html = swap(html, /\s*<link rel="canonical" href="[^"]*" \/>/, '', 'canonical');
  }

  if (noindex) {
    html = swap(html, /<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />', 'robots meta');
  }

  // The FAQ structured data describes the homepage FAQ only; drop it elsewhere.
  if (!keepFaq) {
    html = html.replace(
      /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
      (whole, open, body, close) => {
        try {
          const json = JSON.parse(body);
          if (!Array.isArray(json['@graph'])) return whole;
          json['@graph'] = json['@graph'].filter((node) => node['@type'] !== 'FAQPage');
          return `${open}\n${JSON.stringify(json, null, 2)}\n    ${close}`;
        } catch {
          return whole;
        }
      },
    );
  }

  const extra = jsonLd
    .map((obj) => `    <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  if (extra) html = html.replace('</head>', `${extra}\n  </head>`);
  return html;
}

// ---------- Static text content (replaced by React on load) ----------

const link = (href, text) => `<a href="${esc(href)}" style="color:#60a5fa">${esc(text)}</a>`;
const paras = (list = []) => list.map((p) => `<p>${esc(p)}</p>`).join('\n');
const h2 = (text) => `<h2 style="color:#fff;font-size:1.35rem;margin:2rem 0 .5rem">${esc(text)}</h2>`;

const blocks = {
  services: () =>
    `${h2('Our services')}\n<ul>\n${data.services
      .map((s) => `<li>${link(`/services/${s.slug}`, s.name)}: ${esc(s.short)}</li>`)
      .join('\n')}\n</ul>`,
  why: () =>
    `${h2('Why clients choose DEVSOLE Soft')}\n<ul>\n${data.why
      .map((w) => `<li><strong>${esc(w.title)}.</strong> ${esc(w.text)}</li>`)
      .join('\n')}\n</ul>`,
  team: () =>
    `${h2('Team')}\n<ul>\n${data.team
      .map((m) => `<li><strong>${esc(m.name)}</strong>, ${esc(m.role)}. ${esc(m.text)}</li>`)
      .join('\n')}\n</ul>`,
  contact: () =>
    `${h2('Contact')}\n<p>${esc(site.name)}, ${esc(site.city)}, ${esc(site.country)}. WhatsApp and phone: ${link(
      `https://wa.me/${site.whatsapp}`,
      site.phone,
    )}. Email: ${link(`mailto:${site.email}`, site.email)}.</p>`,
};

function siteNav() {
  const items = data.pages.map((p) => link(p.path, p.label)).join(' · ');
  return `<nav aria-label="Site" style="margin-top:2.5rem;font-size:.9rem">${items}</nav>`;
}

function wrap(inner) {
  return `<div id="root"><div data-seo-fallback style="max-width:760px;margin:0 auto;padding:96px 20px 48px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.65;color:#cbd5e1">
${inner}
${siteNav()}
</div></div>`;
}

const h1 = (text) => `<h1 style="color:#fff;font-size:2rem;line-height:1.2;margin:0 0 1rem">${esc(text)}</h1>`;

function pageBody(page) {
  return wrap(
    [h1(page.h1), paras(page.intro), ...(page.blocks || []).map((b) => blocks[b]())].join('\n'),
  );
}

function serviceBody(s) {
  const sections = s.sections
    .map(
      (sec) =>
        `${h2(sec.heading)}\n${paras(sec.paragraphs)}${
          sec.bullets ? `\n<ul>\n${sec.bullets.map((b) => `<li>${esc(b)}</li>`).join('\n')}\n</ul>` : ''
        }`,
    )
    .join('\n');
  const faqs = `${h2('Common questions')}\n${s.faqs
    .map((f) => `<h3 style="color:#fff;font-size:1rem;margin:1rem 0 .25rem">${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>`)
    .join('\n')}`;
  const others = `${h2('Other services')}\n<ul>\n${data.services
    .filter((o) => o.slug !== s.slug)
    .map((o) => `<li>${link(`/services/${o.slug}`, o.name)}</li>`)
    .join('\n')}\n</ul>`;
  const crumbs = `<p style="font-size:.85rem">${link('/', 'Home')} / ${link('/services', 'Services')} / ${esc(s.name)}</p>`;
  return wrap([crumbs, h1(s.h1), paras(s.intro), sections, faqs, others, blocks.contact()].join('\n'));
}

// ---------- Structured data ----------

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absUrl(path),
    })),
  };
}

function serviceSchema(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: absUrl(`/services/${s.slug}`),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: site.city },
      { '@type': 'Country', name: site.country },
    ],
  };
}

// ---------- Write files ----------

function write(relPath, html) {
  const file = join(dist, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const EMPTY_ROOT = '<div id="root"></div>';
if (!template.includes(EMPTY_ROOT)) throw new Error('prerender-seo: <div id="root"></div> not found in dist/index.html');

const warnings = [];
function checkLengths(path, title, description) {
  if (title.length > 60) warnings.push(`${path}: title is ${title.length} chars (may be truncated in results)`);
  if (description.length > 170) warnings.push(`${path}: description is ${description.length} chars (may be truncated)`);
}

const urls = [];

for (const page of data.pages) {
  checkLengths(page.path, page.title, page.description);
  const isHome = page.path === '/';
  const html = buildHead(template, {
    title: page.title,
    description: page.description,
    url: absUrl(page.path),
    keepFaq: isHome,
    jsonLd: isHome ? [] : [breadcrumb([['Home', '/'], [page.label, page.path]])],
  }).replace(EMPTY_ROOT, pageBody(page));
  write(isHome ? 'index.html' : `${page.path.slice(1)}/index.html`, html);
  urls.push({ path: page.path, priority: isHome ? '1.0' : page.path === '/services' ? '0.9' : '0.7' });
}

for (const s of data.services) {
  const path = `/services/${s.slug}`;
  checkLengths(path, s.title, s.description);
  const html = buildHead(template, {
    title: s.title,
    description: s.description,
    url: absUrl(path),
    jsonLd: [serviceSchema(s), breadcrumb([['Home', '/'], ['Services', '/services'], [s.name, path]])],
  }).replace(EMPTY_ROOT, serviceBody(s));
  write(`${path.slice(1)}/index.html`, html);
  urls.push({ path, priority: '0.9' });
}

// Real 404 page: Vercel serves dist/404.html with a 404 status for unknown URLs.
write(
  '404.html',
  buildHead(template, {
    title: `Page Not Found | ${site.name}`,
    description: `The page you are looking for could not be found on ${site.name}.`,
    url: null,
    noindex: true,
  }).replace(
    EMPTY_ROOT,
    wrap(`${h1('Page not found (404)')}\n<p>The link may be broken or the page may have moved. ${link('/', 'Return to the home page')}.</p>`),
  ),
);

// Empty shell for the private /admin and /crm apps (not indexed).
write(
  '_shell.html',
  buildHead(template, {
    title: site.name,
    description: `${site.name} internal application.`,
    url: null,
    noindex: true,
  }),
);

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${absUrl(u.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`,
);

console.log(`prerender-seo: wrote ${urls.length} pages, 404.html, _shell.html and sitemap.xml`);
for (const w of warnings) console.warn(`prerender-seo: warning: ${w}`);
