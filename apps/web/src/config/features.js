/**
 * Feature flags de NelPlay 2.0.
 *
 * Centraliza el encendido/apagado de funcionalidades para poder evolucionar el
 * producto sin reescribir arquitectura. Cada flag puede sobreescribirse por
 * variable de entorno Vite (import.meta.env.VITE_FEATURE_*) para pruebas/QA.
 *
 * REGLA: REAL_MONEY_BETTING permanece en false. NelPlay es free-to-play; no se
 * activan apuestas con dinero real sin revisión legal/regulatoria previa.
 */

const envFlag = (key, fallback) => {
  try {
    const raw = import.meta.env?.[`VITE_FEATURE_${key}`];
    if (raw === undefined || raw === null || raw === '') return fallback;
    return String(raw).toLowerCase() === 'true';
  } catch (_) {
    return fallback;
  }
};

export const FEATURES = {
  FREE_PLAY: envFlag('FREE_PLAY', true),
  CHALLENGES: envFlag('CHALLENGES', true),
  PRIVATE_LEAGUES: envFlag('PRIVATE_LEAGUES', true),
  SOCIAL: envFlag('SOCIAL', true),
  ADS: envFlag('ADS', true),
  SPONSORSHIPS: envFlag('SPONSORSHIPS', true),
  PREMIUM: envFlag('PREMIUM', false),
  AFFILIATES: envFlag('AFFILIATES', false),
  REAL_MONEY_BETTING: envFlag('REAL_MONEY_BETTING', false),
};

/** Helper: ¿está activa una feature? */
export const isEnabled = (name) => Boolean(FEATURES[name]);

export default FEATURES;
