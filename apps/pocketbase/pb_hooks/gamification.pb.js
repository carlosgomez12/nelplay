/// <reference path="../pb_data/types.d.ts" />
//
// Hook: gamification.pb.js  (Fase 2 — Progresión + Logros)
//
// Se DESACOPLA del scoring: no modifica predictions-scoring.pb.js. Reacciona a
// los cambios de stats en la colección `users` (que el scoring ya produce al
// crear predicción y al completar partidos) para:
//   1) recalcular rachas (current_streak / best_streak) de forma determinista;
//   2) desbloquear logros del catálogo achievement_definitions.
//
// Todo server-side. El frontend nunca determina rachas ni logros oficiales.
//
console.log("[gamification] hook cargado");

onRecordUpdate((e) => {
  // Aplica primero el update original (scoring, inscripción, perfil, etc.)
  e.next();

  try {
    const user = e.record;
    const userId = user.id;

    // Optimización: sin predicciones no hay racha ni logros que evaluar.
    const predCount = user.getInt("predictions_count") || 0;
    const friendlyCount = user.getInt("friendly_predictions_count") || 0;
    if (predCount <= 0 && friendlyCount <= 0) return;

    // ── 1) RACHA ─────────────────────────────────────────────────────────
    // Predicciones evaluadas ordenadas por fecha de evaluación (updated desc).
    // 'updated' se fija cuando el partido se completa => aproxima el orden
    // cronológico de resultados. Acierto = points_awarded > 0.
    let evaluated = [];
    try {
      evaluated = e.app.findRecordsByFilter(
        "predictions",
        "user_id = {:uid} && status = 'evaluated'",
        "-updated",
        200,
        0,
        { uid: userId }
      );
    } catch (_) { evaluated = []; }

    let current = 0;
    let best = 0;
    let run = 0;
    let leading = true;
    for (let i = 0; i < evaluated.length; i++) {
      const correct = (evaluated[i].getInt("points_awarded") || 0) > 0;
      if (correct) {
        run++;
        if (run > best) best = run;
        if (leading) current++;
      } else {
        run = 0;
        leading = false; // se rompió la racha más reciente
      }
    }

    const storedCurrent = user.getInt("current_streak") || 0;
    const storedBest = user.getInt("best_streak") || 0;
    const newBest = Math.max(best, storedBest); // monotónico (no decrece)

    user.set("current_streak", current);
    user.set("best_streak", newBest);

    // Guarda SOLO si cambió (evita recursión: el re-trigger no vuelve a guardar).
    if (current !== storedCurrent || newBest !== storedBest) {
      e.app.save(user);
    }

    // ── 2) LOGROS ────────────────────────────────────────────────────────
    let defs = [];
    try {
      defs = e.app.findRecordsByFilter("achievement_definitions", "active = true", "", 200, 0);
    } catch (_) { defs = []; }

    if (defs.length === 0) return;

    let uaCollection = null;
    try { uaCollection = e.app.findCollectionByNameOrId("user_achievements"); } catch (_) { return; }

    for (let j = 0; j < defs.length; j++) {
      const def = defs[j];
      const metric = String(def.get("metric") || "");
      const threshold = def.getInt("threshold") || 0;
      const code = String(def.get("code") || "");
      if (!metric || !code) continue;

      const value = user.getInt(metric) || 0; // usa los valores ya actualizados
      if (value < threshold) continue;

      // ¿ya desbloqueado?
      try {
        const existing = e.app.findFirstRecordByFilter(
          "user_achievements",
          "user_id = {:uid} && achievement_code = {:code}",
          { uid: userId, code: code }
        );
        if (existing) continue;
      } catch (_) { /* no existe: se crea abajo */ }

      try {
        const ua = new Record(uaCollection);
        ua.set("user_id", userId);
        ua.set("achievement_code", code);
        ua.set("progress", value);
        e.app.save(ua);
        console.log("[gamification] logro desbloqueado: " + code + " -> " + userId);
      } catch (err) {
        // índice único puede rechazar duplicados por carrera: ignorar
        console.log("[gamification] no se pudo crear logro " + code + ": " + String(err));
      }
    }
  } catch (err) {
    console.log("[gamification] error: " + String(err));
  }
}, "users");

console.log("[gamification] hook registrado (users update)");
