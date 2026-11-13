// FILE: src/seo/useSeo.ts
// Keeps <title>, meta description, canonical and social tags in sync with the
// current route. The same values are written into the static HTML for each
// route at build time by scripts/prerender-seo.mjs, so crawlers that do not run
// JavaScript and crawlers that do both see identical tags.
import { useEffect } from 'react';
import seoData from './seo-data.json';

const SITE_URL = seoData.site.url;

function setMeta(selector: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
}

export function applySeo(path: string, title: string, description: string) {
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
}

/** Apply the SEO tags defined for a fixed page in seo-data.json. */
export function useSeo(path: string) {
  useEffect(() => {
    const page = seoData.pages.find((p) => p.path === path);
    if (page) applySeo(page.path, page.title, page.description);
  }, [path]);
}
