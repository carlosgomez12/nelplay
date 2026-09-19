/**
 * Utilidades SEO / GEO / AEO centralizadas.
 *
 * - Defaults de metadatos.
 * - Constructores de JSON-LD (schema.org) SOLO para datos reales.
 *
 * No añadir schema por añadir: cada bloque debe corresponder a contenido visible.
 */
import { BRAND, absoluteUrl, socialProfiles } from './brand.js';

export const SEO_DEFAULTS = {
  titleTemplate: (t) => (t ? `${t} | ${BRAND.name}` : `${BRAND.name} — ${BRAND.slogan}`),
  description: BRAND.description,
  image: BRAND.ogImage,
  locale: BRAND.locale,
  twitterCard: 'summary_large_image',
};

/** schema.org Organization — identidad de la marca para buscadores e IA. */
export const organizationJsonLd = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: BRAND.logo,
    description: BRAND.definition,
    email: BRAND.contactEmail,
  };
  const sameAs = socialProfiles();
  if (sameAs.length) data.sameAs = sameAs;
  return data;
};

/** schema.org WebSite — sitio y (futuro) buscador interno. */
export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND.name,
  url: BRAND.url,
  inLanguage: BRAND.lang,
  description: BRAND.description,
  publisher: { '@type': 'Organization', name: BRAND.name, url: BRAND.url },
});

/** schema.org WebPage genérico. */
export const webPageJsonLd = ({ title, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: absoluteUrl(path || '/'),
  inLanguage: BRAND.lang,
  isPartOf: { '@type': 'WebSite', name: BRAND.name, url: BRAND.url },
});

/**
 * schema.org BreadcrumbList.
 * @param {{name:string, path:string}[]} items
 */
export const breadcrumbJsonLd = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

/**
 * schema.org FAQPage. DEBE coincidir exactamente con las preguntas/respuestas
 * visibles en la página. No usar para introducir keywords.
 * @param {{question:string, answer:string}[]} faqs
 */
export const faqJsonLd = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export default SEO_DEFAULTS;
