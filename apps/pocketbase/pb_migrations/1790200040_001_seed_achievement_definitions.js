/// <reference path="../pb_data/types.d.ts" />
// Fase 2 — Gamificación: catálogo inicial de logros (idempotente).
migrate((app) => {
  const collection = app.findCollectionByNameOrId("achievement_definitions");

  const defs = [
    { code: "first_prediction", name: "Primer Pronóstico", description: "Hiciste tu primer pronóstico.", metric: "predictions_count", threshold: 1, icon: "⚽", sort_order: 10 },
    { code: "predictions_10", name: "Aficionado", description: "10 pronósticos realizados.", metric: "predictions_count", threshold: 10, icon: "🎯", sort_order: 20 },
    { code: "predictions_50", name: "Analista", description: "50 pronósticos realizados.", metric: "predictions_count", threshold: 50, icon: "📊", sort_order: 30 },
    { code: "first_exact", name: "Marcador Perfecto", description: "Acertaste tu primer marcador exacto.", metric: "exact_score_count", threshold: 1, icon: "🎯", sort_order: 40 },
    { code: "exact_5", name: "Francotirador", description: "5 marcadores exactos.", metric: "exact_score_count", threshold: 5, icon: "💎", sort_order: 50 },
    { code: "exact_10", name: "Ojo de Halcón", description: "10 marcadores exactos.", metric: "exact_score_count", threshold: 10, icon: "🦅", sort_order: 60 },
    { code: "streak_3", name: "En Racha", description: "3 aciertos consecutivos.", metric: "best_streak", threshold: 3, icon: "🔥", sort_order: 70 },
    { code: "streak_5", name: "Imparable", description: "5 aciertos consecutivos.", metric: "best_streak", threshold: 5, icon: "⚡", sort_order: 80 },
    { code: "streak_10", name: "Racha Legendaria", description: "10 aciertos consecutivos.", metric: "best_streak", threshold: 10, icon: "👑", sort_order: 90 },
    { code: "points_100", name: "Centenario", description: "Alcanzaste 100 puntos.", metric: "total_points", threshold: 100, icon: "🏅", sort_order: 100 },
    { code: "points_500", name: "Maestro de Puntos", description: "Alcanzaste 500 puntos.", metric: "total_points", threshold: 500, icon: "🏆", sort_order: 110 },
  ];

  for (let i = 0; i < defs.length; i++) {
    const d = defs[i];
    try {
      // idempotencia: si ya existe el code, saltar
      const existing = app.findFirstRecordByFilter("achievement_definitions", "code = {:code}", { code: d.code });
      if (existing) continue;
    } catch (_) { /* no existe: se crea abajo */ }

    const rec = new Record(collection);
    rec.set("code", d.code);
    rec.set("name", d.name);
    rec.set("description", d.description);
    rec.set("metric", d.metric);
    rec.set("threshold", d.threshold);
    rec.set("icon", d.icon);
    rec.set("sort_order", d.sort_order);
    rec.set("active", true);
    app.save(rec);
  }
}, (app) => {
  // Down: elimina los logros sembrados por code.
  const codes = ["first_prediction","predictions_10","predictions_50","first_exact","exact_5","exact_10","streak_3","streak_5","streak_10","points_100","points_500"];
  for (let i = 0; i < codes.length; i++) {
    try {
      const rec = app.findFirstRecordByFilter("achievement_definitions", "code = {:code}", { code: codes[i] });
      if (rec) app.delete(rec);
    } catch (_) { /* ya no existe */ }
  }
})
