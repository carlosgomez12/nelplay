/// <reference path="../pb_data/types.d.ts" />
//
// Hook: public-predictions.pb.js
//
// Expone un endpoint GET /api/public-predictions/{matchId} que devuelve
// los pron\u00f3sticos de TODOS los usuarios para un partido, pero SOLO si:
//   - El usuario que hace la petici\u00f3n est\u00e1 autenticado
//   - El partido tiene status = "live" o "completed" (ya empez\u00f3)
//
// Esto mantiene la transparencia sin permitir copiar pron\u00f3sticos antes
// del kickoff. La colecci\u00f3n predictions sigue restringida v\u00eda listRule
// (s\u00f3lo el due\u00f1o y admin), este endpoint es el \u00fanico canal p\u00fablico.
//
// Respuesta:
// {
//   match: { id, home_team, away_team, home_score, away_score, status, stage },
//   predictions: [
//     { user_name, predicted_home_score, predicted_away_score, points_awarded, status },
//     ...
//   ]
// }
//
 
console.log("[public-predictions] hook cargado");
 
routerAdd("GET", "/api/public-predictions/{matchId}", (c) => {
  try {
    // 1. Validar autenticaci\u00f3n
    var authRecord = null;
    try {
      authRecord = c.auth;
    } catch (_) {}
    if (!authRecord || !authRecord.id) {
      return c.json(401, { error: "No autenticado" });
    }
 
    // 2. Obtener match
    var matchId = c.request.pathValue("matchId");
    if (!matchId) {
      return c.json(400, { error: "Falta matchId" });
    }
 
    var match = null;
    try {
      match = $app.findRecordById("matches", matchId);
    } catch (_) {
      return c.json(404, { error: "Partido no encontrado" });
    }
    if (!match) {
      return c.json(404, { error: "Partido no encontrado" });
    }
 
    // 3. Validar que el partido haya empezado
    var status = match.get("status");
    if (status !== "live" && status !== "completed") {
      return c.json(403, {
        error: "Los pron\u00f3sticos s\u00f3lo son visibles cuando el partido empieza",
        match_status: status
      });
    }
 
    // 4. Cargar pron\u00f3sticos del partido
    var predictions = $app.findRecordsByFilter(
      "predictions",
      "match_id = '" + matchId + "'",
      "-points_awarded,-created",
      10000
    );
 
    // 5. Construir respuesta con nombres de usuarios
    var result = [];
    for (var i = 0; i < predictions.length; i++) {
      var p = predictions[i];
      var userName = "An\u00f3nimo";
      try {
        var user = $app.findRecordById("users", p.get("user_id"));
        if (user) userName = user.get("name") || "An\u00f3nimo";
      } catch (_) {}
 
      result.push({
        user_name: userName,
        user_id: p.get("user_id"),
        predicted_home_score: p.get("predicted_home_score"),
        predicted_away_score: p.get("predicted_away_score"),
        points_awarded: p.get("points_awarded") || 0,
        status: p.get("status")
      });
    }
 
    return c.json(200, {
      match: {
        id: match.id,
        home_team: match.get("home_team"),
        away_team: match.get("away_team"),
        home_score: match.get("home_score"),
        away_score: match.get("away_score"),
        status: match.get("status"),
        stage: match.get("stage"),
        match_date: match.get("match_date"),
        match_time: match.get("match_time")
      },
      predictions: result,
      total: result.length
    });
 
  } catch (err) {
    console.log("[public-predictions] error: " + String(err));
    return c.json(500, { error: String(err) });
  }
}, $apis.requireAuth());
 
console.log("[public-predictions] endpoint GET /api/public-predictions/{matchId} registrado");