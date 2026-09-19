/**
 * Configuración de marca de NelPlay.
 *
 * Fuente única de verdad para nombre, dominio, copy, logos e imágenes sociales.
 * NO inventar perfiles sociales ni datos corporativos: se dejan vacíos hasta que
 * existan de forma real.
 */

export const BRAND = {
  name: 'NelPlay',
  legalName: 'NelPlay',
  company: 'OLC Tecnología',

  // Dominio canónico real del proyecto (sin barra final).
  url: 'https://nelplay.com',

  // Posicionamiento comercial (branding). No sustituye al H1 SEO.
  slogan: 'Pronostica. Compite. Vive el fútbol.',

  // Definición GEO-friendly: respuesta directa a "¿Qué es NelPlay?".
  definition:
    'NelPlay es una plataforma de pronósticos y comunidad futbolera donde los ' +
    'usuarios pueden pronosticar partidos, obtener puntos y competir en rankings.',

  // Descripción por defecto para metadatos (≈150-160 caracteres).
  description:
    'NelPlay es la plataforma de pronósticos de fútbol y comunidad futbolera: ' +
    'pronostica partidos, suma puntos, escala en el ranking y compite con amigos. Gratis para jugar.',

  // Activos gráficos (URLs reales ya alojadas en el CDN del proyecto).
  logo: 'https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/d13cfb0e7ec6eaddd40e8dcbaa47a732.png',
  logoAlt: 'https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/80cee056e7fb9b9d1747574f65555e93.png',
  ogImage: 'https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/2cb5994a71d24f046e4fc7181e98221c.jpg',
  favicon: 'https://horizons-cdn.hostinger.com/0a7d41ef-5581-4585-a665-1220c41753a7/80cee056e7fb9b9d1747574f65555e93.png',

  // Localización principal (preparado para internacionalización futura).
  locale: 'es_CO',
  lang: 'es',

  // Contacto público real.
  contactEmail: 'soporte@nelplay.com',
  location: 'Bogotá, Colombia',

  // Perfiles sociales oficiales: se rellenan cuando existan (sameAs para JSON-LD).
  social: {
    // twitter: 'https://x.com/...',
    // instagram: 'https://instagram.com/...',
    // facebook: 'https://facebook.com/...',
  },
};

/** Lista de URLs sociales oficiales (para schema.org sameAs). */
export const socialProfiles = () =>
  Object.values(BRAND.social || {}).filter(Boolean);

/**
 * Construye una URL absoluta y canónica a partir de un path relativo.
 * Normaliza la barra inicial y elimina la barra final (salvo en la raíz).
 */
export const absoluteUrl = (path = '/') => {
  const clean = String(path || '/');
  if (/^https?:\/\//i.test(clean)) return clean;
  const withSlash = clean.startsWith('/') ? clean : `/${clean}`;
  if (withSlash === '/') return `${BRAND.url}/`;
  return `${BRAND.url}${withSlash.replace(/\/+$/, '')}`;
};

export default BRAND;
