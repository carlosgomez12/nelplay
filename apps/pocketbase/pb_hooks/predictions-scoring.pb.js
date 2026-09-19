/// <reference path="../pb_data/types.d.ts" />
//
// Hook: predictions-scoring.pb.js (versi\u00f3n corregida)
//
// CAMBIOS vs versi\u00f3n anterior:
//   1. El UPDATE de predicciones solo se bloquea para el DUE\u00d1O. Admin
//      puede modificar cualquier predicci\u00f3n (necesario para corregir
//      casos de fallo del scoring).
//   2. Si una predicci\u00f3n viene con status=evaluated o is_locked=true,
//      se permite el UPDATE (es el sistema actualizando puntos).
//   3. La detecci\u00f3n de "partido completado" ahora NO depende de
//      e.record.original() (que pod\u00eda fallar silenciosamente). Si el
//      match tiene status=completed y home_score/away_score definidos
//      y la predicci\u00f3n no est\u00e1 evaluated todav\u00eda, se calculan puntos.
//   4. Incrementa friendly_predictions_count al CREAR la predicci\u00f3n,
//      no s\u00f3lo cuando se evalua el partido (as\u00ed el contador es real).
//
 
console.log("[predictions-scoring] hook cargado v2");
 
// ─────────────────────────────────────────────────────────────────────
// HOOK 1: Crear predicci\u00f3n
// ─────────────────────────────────────────────────────────────────────
onRecordCreate((e) => {
  try {
    var matchId = e.record.get("match_id");
    if (!matchId) {
      throw new BadRequestError("Falta match_id");
    }
 
    var match = null;
    try {
      match = e.app.findRecordById("matches", matchId);
    } catch (_) {
      throw new BadRequestError("Partido no encontrado");
    }
    if (!match) {
      throw new BadRequestError("Partido no encontrado");
    }
 
    var matchStatus = match.get("status");
    if (matchStatus === "live" || matchStatus === "completed") {
      throw new BadRequestError("El partido ya inici\u00f3, no se puede pron\u00f3sticar");
    }
 
    var homeScore = e.record.get("predicted_home_score");
    var awayScore = e.record.get("predicted_away_score");
 
    if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
      throw new BadRequestError("Faltan los marcadores predichos");
    }
 
    var winner;
    if (homeScore > awayScore)       winner = "home_win";
    else if (awayScore > homeScore)  winner = "away_win";
    else                              winner = "draw";
 
    e.record.set("predicted_winner", winner);
    e.record.set("status", "pending");
    e.record.set("is_locked", false);
 
    e.next();
 
    // Despu\u00e9s de crear: incrementar contador en match Y stats del usuario
    var stage = String(match.get("stage") || "");
    var isFriendly = stage.toLowerCase().indexOf("amistoso") !== -1;
 
    try {
      var freshMatch = e.app.findRecordById("matches", matchId);
      if (freshMatch) {
        var currentCount = freshMatch.getInt("predictions_count") || 0;
        freshMatch.set("predictions_count", currentCount + 1);
        e.app.save(freshMatch);
      }
    } catch (err) {
      console.log("[predictions-scoring] no se pudo incrementar predictions_count: " + String(err));
    }
 
    // Incrementar contador de predicciones en el usuario
    try {
      var userId = e.record.get("user_id");
      if (userId) {
        var user = e.app.findRecordById("users", userId);
        if (user) {
          if (isFriendly) {
            var fpc = user.getInt("friendly_predictions_count") || 0;
            user.set("friendly_predictions_count", fpc + 1);
          } else {
            var pc = user.getInt("predictions_count") || 0;
            user.set("predictions_count", pc + 1);
          }
          e.app.save(user);
        }
      }
    } catch (err) {
      console.log("[predictions-scoring] no se pudo incrementar contador de usuario: " + String(err));
    }
 
  } catch (err) {
    console.log("[predictions-scoring] CREATE error: " + String(err));
    if (err instanceof BadRequestError) throw err;
    throw new BadRequestError(String(err));
  }
}, "predictions");
 
console.log("[predictions-scoring] CREATE hook registrado");
 
// ─────────────────────────────────────────────────────────────────────
// HOOK 2: Actualizar predicci\u00f3n - solo bloquear al due\u00f1o
// ─────────────────────────────────────────────────────────────────────
onRecordUpdate((e) => {
  try {
    // Si el request es del admin o NO viene del due\u00f1o, permitir todo
    // (el sistema y el admin pueden corregir puntos)
    var isAdminRequest = false;
    var isOwnerRequest = false;
 
    try {
      if (e.auth && e.auth.role === "admin") {
        isAdminRequest = true;
      }
      if (e.auth && e.auth.id === e.record.get("user_id")) {
        isOwnerRequest = true;
      }
    } catch (_) {}
 
    // Si NO es admin y NO es el due\u00f1o, es el sistema (e.auth puede ser null)
    // En ese caso permitimos sin restricciones tambi\u00e9n
    var isSystem = !isAdminRequest && !isOwnerRequest;
 
    // Solo bloquear si es el due\u00f1o intentando modificar despu\u00e9s del kickoff
    if (isOwnerRequest && !isAdminRequest) {
      if (e.record.get("is_locked")) {
        throw new BadRequestError("La predicci\u00f3n est\u00e1 bloqueada");
      }
 
      var matchId = e.record.get("match_id");
      var match = null;
      try {
        match = e.app.findRecordById("matches", matchId);
      } catch (_) {
        throw new BadRequestError("Partido no encontrado");
      }
      if (!match) {
        throw new BadRequestError("Partido no encontrado");
      }
 
      var matchStatus = match.get("status");
      if (matchStatus === "live" || matchStatus === "completed") {
        throw new BadRequestError("El partido ya inici\u00f3, no se puede modificar");
      }
 
      var homeScore = e.record.get("predicted_home_score");
      var awayScore = e.record.get("predicted_away_score");
 
      var winner;
      if (homeScore > awayScore)       winner = "home_win";
      else if (awayScore > homeScore)  winner = "away_win";
      else                              winner = "draw";
 
      e.record.set("predicted_winner", winner);
    }
    // Admin y sistema: pasan sin restricciones
 
    e.next();
  } catch (err) {
    console.log("[predictions-scoring] UPDATE prediction error: " + String(err));
    if (err instanceof BadRequestError) throw err;
    throw new BadRequestError(String(err));
  }
}, "predictions");
 
console.log("[predictions-scoring] UPDATE predictions hook registrado");
 
// ─────────────────────────────────────────────────────────────────────
// HOOK 3: Match cambia a completed - calcular puntos
// Detecci\u00f3n m\u00e1s defensiva: si status=completed y scores existen,
// procesar todas las predicciones que NO est\u00e9n evaluadas a\u00fan.
// ─────────────────────────────────────────────────────────────────────
onRecordUpdate((e) => {
  try {
    var newStatus = e.record.get("status");
    if (newStatus !== "completed") {
      e.next();
      return;
    }
 
    var matchId = e.record.id;
    var stage = String(e.record.get("stage") || "");
    var isFriendly = stage.toLowerCase().indexOf("amistoso") !== -1;
    var homeScore = e.record.get("home_score");
    var awayScore = e.record.get("away_score");
 
    if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
      console.log("[predictions-scoring] Match " + matchId + " completed pero sin marcador, skip");
      e.next();
      return;
    }
 
    e.next();
 
    // Procesar DESPU\u00c9S del save
    var actualWinner;
    if (homeScore > awayScore)       actualWinner = "home_win";
    else if (awayScore > homeScore)  actualWinner = "away_win";
    else                              actualWinner = "draw";
 
    var exactPoints = 5, diffPoints = 3, winnerPoints = 1;
    var groupMult = 1, knockoutMult = 2, finalMult = 3;
    try {
      var rules = e.app.findFirstRecordByFilter("scoring_rules", "id != ''");
      if (rules) {
        exactPoints  = rules.get("exact_score_points") || 5;
        diffPoints   = rules.get("correct_winner_diff_points") || 3;
        winnerPoints = rules.get("correct_winner_points") || 1;
        groupMult    = rules.get("group_stage_multiplier") || 1;
        knockoutMult = rules.get("knockout_multiplier") || 2;
        finalMult    = rules.get("final_multiplier") || 3;
      }
    } catch (_) {}
 
    var multiplier = 1;
    var lowerStage = stage.toLowerCase();
    if (lowerStage.indexOf("amistoso") !== -1) {
      multiplier = 1;
    } else if (lowerStage.indexOf("grupo") !== -1 || lowerStage.indexOf("group") !== -1) {
      multiplier = groupMult;
    } else if (lowerStage.indexOf("dieciseisavo") !== -1 ||
               lowerStage.indexOf("octavo") !== -1 ||
               lowerStage.indexOf("cuarto") !== -1 ||
               lowerStage.indexOf("semi") !== -1) {
      multiplier = knockoutMult;
    } else if (lowerStage.indexOf("final") !== -1) {
      multiplier = finalMult;
    }
 
    // Procesar SOLO predicciones NO evaluadas (idempotente: se puede re-ejecutar)
    var affectedUsers = {};
    var predictions = e.app.findRecordsByFilter("predictions",
      "match_id = '" + matchId + "'", { limit: 10000 });
 
    var processed = 0;
    for (var i = 0; i < predictions.length; i++) {
      var pred = predictions[i];
 
      // Si ya est\u00e1 evaluada con los puntos correctos, skip
      if (pred.get("status") === "evaluated") {
        affectedUsers[pred.get("user_id")] = true;
        continue;
      }
 
      var predHome = pred.get("predicted_home_score");
      var predAway = pred.get("predicted_away_score");
      var predWinner = pred.get("predicted_winner");
 
      var points = 0;
      if (predHome === homeScore && predAway === awayScore) {
        points = exactPoints * multiplier;
      } else if (predWinner === actualWinner &&
                 (homeScore - awayScore) === (predHome - predAway)) {
        points = diffPoints * multiplier;
      } else if (predWinner === actualWinner) {
        points = winnerPoints * multiplier;
      }
      points = Math.round(points);
 
      pred.set("points_awarded", points);
      pred.set("status", "evaluated");
      pred.set("is_locked", true);
      e.app.save(pred);
 
      affectedUsers[pred.get("user_id")] = true;
      processed++;
    }
 
    console.log("[predictions-scoring] Match " + matchId + " evaluado, " +
                processed + " predicciones procesadas (de " + predictions.length + " totales), friendly=" + isFriendly);
 
    // Recalcular stats COMPLETAS de cada usuario afectado
    for (var userId in affectedUsers) {
      try {
        var allPreds = e.app.findRecordsByFilter("predictions",
          "user_id = '" + userId + "'", { limit: 10000 });
 
        var totalPoints = 0, predictionsCount = 0, exactCount = 0;
        var friendlyPoints = 0, friendlyPredCount = 0, friendlyExactCount = 0;
 
        for (var j = 0; j < allPreds.length; j++) {
          var p = allPreds[j];
          var pointsAwarded = p.get("points_awarded") || 0;
          var pMatchId = p.get("match_id");
          var pIsFriendly = false;
          var pMatchHome = null, pMatchAway = null;
          var pMatchCompleted = false;
 
          try {
            var pMatch = e.app.findRecordById("matches", pMatchId);
            if (pMatch) {
              var pStage = String(pMatch.get("stage") || "");
              pIsFriendly = pStage.toLowerCase().indexOf("amistoso") !== -1;
              pMatchHome = pMatch.get("home_score");
              pMatchAway = pMatch.get("away_score");
              pMatchCompleted = pMatch.get("status") === "completed";
            }
          } catch (_) { continue; }
 
          if (pIsFriendly) {
            friendlyPredCount++;
            friendlyPoints += pointsAwarded;
            if (pMatchCompleted && pMatchHome !== null && pMatchAway !== null &&
                p.get("predicted_home_score") === pMatchHome &&
                p.get("predicted_away_score") === pMatchAway) {
              friendlyExactCount++;
            }
          } else {
            predictionsCount++;
            totalPoints += pointsAwarded;
            if (pMatchCompleted && pMatchHome !== null && pMatchAway !== null &&
                p.get("predicted_home_score") === pMatchHome &&
                p.get("predicted_away_score") === pMatchAway) {
              exactCount++;
            }
          }
        }
 
        var user = e.app.findRecordById("users", userId);
        if (user) {
          user.set("total_points",                totalPoints);
          user.set("exact_score_count",           exactCount);
          user.set("predictions_count",           predictionsCount);
          user.set("friendly_points",             friendlyPoints);
          user.set("friendly_exact_score_count",  friendlyExactCount);
          user.set("friendly_predictions_count",  friendlyPredCount);
          e.app.save(user);
          console.log("[predictions-scoring]   user " + (user.get("name") || userId) + ": " +
                      "mundial=" + totalPoints + "pts (" + predictionsCount + " preds, " + exactCount + " exactos), " +
                      "amistoso=" + friendlyPoints + "pts (" + friendlyPredCount + " preds, " + friendlyExactCount + " exactos)");
        }
      } catch (err) {
        console.log("[predictions-scoring] error recalculando user " + userId + ": " + String(err));
      }
    }
 
  } catch (err) {
    console.log("[predictions-scoring] UPDATE match (score) error: " + String(err));
    try { e.next(); } catch (_) {}
  }
}, "matches");
 
console.log("[predictions-scoring] UPDATE matches (score) hook registrado");
 
// ─────────────────────────────────────────────────────────────────────
// HOOK 4: Borrar predicci\u00f3n - recalcular stats y decrementar contador
// ─────────────────────────────────────────────────────────────────────
onRecordDelete((e) => {
  try {
    var userId = e.record.get("user_id");
    var matchId = e.record.get("match_id");
    var predictionIdBeingDeleted = e.record.id;
 
    e.next();
 
    if (matchId) {
      try {
        var match = e.app.findRecordById("matches", matchId);
        if (match) {
          var currentCount = match.getInt("predictions_count") || 0;
          var newCount = Math.max(0, currentCount - 1);
          match.set("predictions_count", newCount);
          e.app.save(match);
        }
      } catch (err) {
        console.log("[predictions-scoring] no se pudo decrementar predictions_count: " + String(err));
      }
    }
 
    if (!userId) return;
 
    var allPreds = e.app.findRecordsByFilter("predictions",
      "user_id = '" + userId + "'", { limit: 10000 });
 
    var totalPoints = 0, predictionsCount = 0, exactCount = 0;
    var friendlyPoints = 0, friendlyPredCount = 0, friendlyExactCount = 0;
 
    for (var j = 0; j < allPreds.length; j++) {
      var p = allPreds[j];
      if (p.id === predictionIdBeingDeleted) continue;
 
      var pointsAwarded = p.get("points_awarded") || 0;
      var pMatchId = p.get("match_id");
      var pIsFriendly = false;
      var pMatchHome = null, pMatchAway = null;
      var pMatchCompleted = false;
 
      try {
        var pMatch = e.app.findRecordById("matches", pMatchId);
        if (pMatch) {
          var pStage = String(pMatch.get("stage") || "");
          pIsFriendly = pStage.toLowerCase().indexOf("amistoso") !== -1;
          pMatchHome = pMatch.get("home_score");
          pMatchAway = pMatch.get("away_score");
          pMatchCompleted = pMatch.get("status") === "completed";
        }
      } catch (_) { continue; }
 
      if (pIsFriendly) {
        friendlyPredCount++;
        friendlyPoints += pointsAwarded;
        if (pMatchCompleted && pMatchHome !== null && pMatchAway !== null &&
            p.get("predicted_home_score") === pMatchHome &&
            p.get("predicted_away_score") === pMatchAway) {
          friendlyExactCount++;
        }
      } else {
        predictionsCount++;
        totalPoints += pointsAwarded;
        if (pMatchCompleted && pMatchHome !== null && pMatchAway !== null &&
            p.get("predicted_home_score") === pMatchHome &&
            p.get("predicted_away_score") === pMatchAway) {
          exactCount++;
        }
      }
    }
 
    try {
      var user = e.app.findRecordById("users", userId);
      if (user) {
        user.set("total_points",                totalPoints);
        user.set("exact_score_count",           exactCount);
        user.set("predictions_count",           predictionsCount);
        user.set("friendly_points",             friendlyPoints);
        user.set("friendly_exact_score_count",  friendlyExactCount);
        user.set("friendly_predictions_count",  friendlyPredCount);
        e.app.save(user);
      }
    } catch (_) {}
 
  } catch (err) {
    console.log("[predictions-scoring] DELETE prediction error: " + String(err));
  }
}, "predictions");
 
console.log("[predictions-scoring] DELETE predictions hook registrado");
console.log("[predictions-scoring] todos los hooks v2 registrados");