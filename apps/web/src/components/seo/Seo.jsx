import React, { useEffect } from 'react';
import { BRAND, absoluteUrl } from '@/config/brand.js';
import { SEO_DEFAULTS } from '@/config/seo.js';

/**
 * Componente SEO reutilizable — gestión imperativa y determinista del <head>.
 *
 * Se optó por manipular el <head> con useEffect en lugar de react-helmet, que
 * resultó inestable con React 18 en esta app (no aplicaba title/meta/canonical).
 * Este enfoque es determinista: cada página sobreescribe los mismos tags.
 *
 * Los datos estructurados (JSON-LD) se renderizan como <script> inline (válido
 * para buscadores). El HTML base de index.html cubre a los crawlers sin JS.
 *
 * Props: title, description, path, image, noindex, type, jsonLd (obj|array)
 */

const upsertMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const Seo = ({
  title,
  description = SEO_DEFAULTS.description,
  path = '/',
  image = SEO_DEFAULTS.image,
  noindex = false,
  type = 'website',
  jsonLd = null,
}) => {
  const fullTitle = SEO_DEFAULTS.titleTemplate(title);
  const canonical = absoluteUrl(path);
  const ogImage = image || BRAND.ogImage;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.setAttribute('lang', BRAND.lang);

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:site_name', BRAND.name);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:locale', SEO_DEFAULTS.locale);

    upsertMeta('name', 'twitter:card', SEO_DEFAULTS.twitterCard);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [fullTitle, description, canonical, robots, ogImage, type]);

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
};

export default Seo;
