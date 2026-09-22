/**
 * Catálogo de logros en el cliente — ESPEJO del seed de PocketBase
 * (pb_migrations/..._seed_achievement_definitions.js).
 *
 * Usos:
 *  1) Metadatos (icono/nombre/descripción) para pintar los logros que llegan
 *     de `user_achievements` (que solo guarda el code).
 *  2) Fallback: derivar logros "conseguidos" desde las stats cuando la
 *     colección persistida aún no existe o está vacía.
 *
 * `metric` referencia un campo de stats del usuario.
 */
export const ACHIEVEMENTS = [
  { code: 'first_prediction', name: 'Primer Pronóstico', description: 'Hiciste tu primer pronóstico.', metric: 'predictions_count', threshold: 1, icon: '⚽' },
  { code: 'predictions_10', name: 'Aficionado', description: '10 pronósticos realizados.', metric: 'predictions_count', threshold: 10, icon: '🎯' },
  { code: 'predictions_50', name: 'Analista', description: '50 pronósticos realizados.', metric: 'predictions_count', threshold: 50, icon: '📊' },
  { code: 'first_exact', name: 'Marcador Perfecto', description: 'Acertaste tu primer marcador exacto.', metric: 'exact_score_count', threshold: 1, icon: '🎯' },
  { code: 'exact_5', name: 'Francotirador', description: '5 marcadores exactos.', metric: 'exact_score_count', threshold: 5, icon: '💎' },
  { code: 'exact_10', name: 'Ojo de Halcón', description: '10 marcadores exactos.', metric: 'exact_score_count', threshold: 10, icon: '🦅' },
  { code: 'streak_3', name: 'En Racha', description: '3 aciertos consecutivos.', metric: 'best_streak', threshold: 3, icon: '🔥' },
  { code: 'streak_5', name: 'Imparable', description: '5 aciertos consecutivos.', metric: 'best_streak', threshold: 5, icon: '⚡' },
  { code: 'streak_10', name: 'Racha Legendaria', description: '10 aciertos consecutivos.', metric: 'best_streak', threshold: 10, icon: '👑' },
  { code: 'points_100', name: 'Centenario', description: 'Alcanzaste 100 puntos.', metric: 'total_points', threshold: 100, icon: '🏅' },
  { code: 'points_500', name: 'Maestro de Puntos', description: 'Alcanzaste 500 puntos.', metric: 'total_points', threshold: 500, icon: '🏆' },
];

export const achievementByCode = (code) => ACHIEVEMENTS.find((a) => a.code === code) || null;

/** Deriva el set de codes conseguidos según stats (fallback sin persistencia). */
export const deriveEarnedCodes = (stats = {}) =>
  ACHIEVEMENTS.filter((a) => (Number(stats[a.metric]) || 0) >= a.threshold).map((a) => a.code);

export default ACHIEVEMENTS;
