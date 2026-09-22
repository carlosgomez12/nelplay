import pb from '@/lib/pocketbaseClient.js';
import { deriveEarnedCodes } from '@/config/achievements.js';

/**
 * Capa de datos del perfil (Fase 2.3/2.4).
 *
 * Todo es defensivo y degrada con gracia: si las colecciones/campos nuevos aún
 * no existen en el backend, se derivan las métricas desde datos ya presentes.
 * Las métricas oficiales las calcula el servidor; aquí solo se leen/derivan
 * para mostrar.
 */

const authRecord = () => {
  try { return pb.authStore.record || pb.authStore.model || null; } catch (_) { return null; }
};

export async function fetchProfile() {
  const auth = authRecord();
  if (!auth?.id) throw new Error('No autenticado');

  // 1) Usuario fresco
  let user = auth;
  try { user = await pb.collection('users').getOne(auth.id, { requestKey: null }); } catch (_) { /* usa cache */ }

  const points = Number(user.total_points) || 0;
  const predictionsCount = Number(user.predictions_count) || 0;
  const exactCount = Number(user.exact_score_count) || 0;

  // 2) Posición en el ranking (eficiente: cuenta usuarios con más puntos)
  let position = null;
  try {
    const res = await pb.collection('users').getList(1, 1, {
      filter: `total_points > ${points}`,
      requestKey: null,
    });
    position = (res.totalItems || 0) + 1;
  } catch (_) { /* opcional */ }

  // 3) Predicciones evaluadas → accuracy + racha (fallback) + historial
  let evaluated = [];
  try {
    const res = await pb.collection('predictions').getList(1, 500, {
      filter: `user_id = "${auth.id}" && status = "evaluated"`,
      sort: '-updated',
      requestKey: null,
    });
    evaluated = res.items || [];
  } catch (_) { /* sin historial */ }

  const totalEval = evaluated.length;
  const correct = evaluated.filter((p) => (Number(p.points_awarded) || 0) > 0).length;
  const accuracyPct = totalEval > 0 ? Math.round((correct / totalEval) * 100) : null;

  // Racha derivada (fallback si el backend aún no persiste current/best_streak)
  let derivedCurrent = 0, derivedBest = 0, run = 0, leading = true;
  for (let i = 0; i < evaluated.length; i++) {
    const ok = (Number(evaluated[i].points_awarded) || 0) > 0;
    if (ok) { run++; if (run > derivedBest) derivedBest = run; if (leading) derivedCurrent++; }
    else { run = 0; leading = false; }
  }
  const hasPersistedStreak = user.current_streak !== undefined && user.current_streak !== null;
  const currentStreak = hasPersistedStreak ? Number(user.current_streak) || 0 : derivedCurrent;
  const bestStreak = Math.max(Number(user.best_streak) || 0, derivedBest);

  // 4) Logros: persistidos si existen, si no derivados
  const stats = {
    total_points: points,
    predictions_count: predictionsCount,
    exact_score_count: exactCount,
    best_streak: bestStreak,
  };
  let earnedCodes = [];
  let persistedAchievements = false;
  try {
    const res = await pb.collection('user_achievements').getList(1, 100, {
      filter: `user_id = "${auth.id}"`,
      requestKey: null,
    });
    if (res.items && res.items.length) {
      earnedCodes = res.items.map((r) => r.achievement_code);
      persistedAchievements = true;
    }
  } catch (_) { /* colección no existe todavía */ }
  if (!persistedAchievements) earnedCodes = deriveEarnedCodes(stats);

  // 5) Historial reciente (con nombres de equipos en una sola query)
  const recent = evaluated.slice(0, 8);
  const ids = [...new Set(recent.map((p) => p.match_id).filter(Boolean))];
  const matchMap = {};
  if (ids.length) {
    const filter = ids.map((id) => `id = "${id}"`).join(' || ');
    try {
      const mr = await pb.collection('matches').getList(1, ids.length, { filter, requestKey: null });
      (mr.items || []).forEach((m) => { matchMap[m.id] = m; });
    } catch (_) { /* sin nombres */ }
  }
  const history = recent.map((p) => {
    const m = matchMap[p.match_id] || {};
    const hasScore = m.home_score !== undefined && m.home_score !== null && m.away_score !== undefined && m.away_score !== null;
    return {
      id: p.id,
      home_team: m.home_team || 'Local',
      away_team: m.away_team || 'Visitante',
      predicted: `${p.predicted_home_score}-${p.predicted_away_score}`,
      actual: hasScore ? `${m.home_score}-${m.away_score}` : null,
      points: Number(p.points_awarded) || 0,
      stage: m.stage || '',
    };
  });

  return {
    id: auth.id,
    name: user.name || 'Jugador',
    points,
    position,
    predictionsCount,
    exactCount,
    accuracyPct,
    currentStreak,
    bestStreak,
    earnedCodes: new Set(earnedCodes),
    history,
    _sources: { persistedAchievements, hasPersistedStreak },
  };
}
