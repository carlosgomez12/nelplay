/**
 * Niveles de progresión (derivados de total_points, sin campo persistido).
 * Umbrales configurables. Extensible: añade/edita niveles aquí.
 */
export const LEVELS = [
  { name: 'Novato', min: 0, icon: '🌱' },
  { name: 'Aficionado', min: 25, icon: '⚽' },
  { name: 'Analista', min: 75, icon: '📊' },
  { name: 'Experto', min: 200, icon: '🎯' },
  { name: 'Maestro', min: 500, icon: '🔥' },
  { name: 'Leyenda', min: 1000, icon: '👑' },
];

/**
 * Devuelve el nivel actual, el siguiente y el progreso hacia el siguiente.
 * @param {number} points
 */
export const getLevel = (points = 0) => {
  const p = Math.max(0, Number(points) || 0);
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (p >= LEVELS[i].min) idx = i;
  }
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  let progressPct = 100;
  let pointsToNext = 0;
  if (next) {
    const span = next.min - current.min;
    progressPct = span > 0 ? Math.min(100, Math.round(((p - current.min) / span) * 100)) : 0;
    pointsToNext = Math.max(0, next.min - p);
  }
  return { ...current, index: idx, next, progressPct, pointsToNext };
};

export default LEVELS;
