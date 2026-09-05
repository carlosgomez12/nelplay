/// <reference path="../pb_data/types.d.ts" />
//
// Hook: match-auto-live.pb.js
//
// Cron job que cada minuto revisa los partidos en status "upcoming"
// y los marca como "live" si su hora de kickoff ya pas\u00f3.
//
// Zona horaria: Colombia (COT = UTC-5). Si el servidor PocketBase est\u00e1
// en otra zona, el c\u00e1lculo es correcto porque construimos el ISO con
// el offset "-05:00" expl\u00edcito.
//
// Importante: este hook NO marca como "completed". Eso sigue siendo
// manual desde /admin (cuando el admin ingresa el marcador final).
//
 
console.log("[match-auto-live] hook cargado");
 
cronAdd("match-auto-live", "*/1 * * * *", () => {
  try {
    var matches = $app.findRecordsByFilter("matches", "status = 'upcoming'", "", 500);
    if (!matches || matches.length === 0) {
      return;
    }
 
    var now = new Date();
    var updated = 0;
 
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      var rawDate = String(m.get("match_date") || "");
      var rawTime = String(m.get("match_time") || "");
 
      // Extraer YYYY-MM-DD del match_date (puede venir como "2026-06-11 00:00:00.000Z")
      var dm = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (!dm) {
        continue;
      }
 
      // Validar HH:mm o H:mm
      if (!/^\d{1,2}:\d{2}$/.test(rawTime)) {
        continue;
      }
      // Normalizar a HH:mm
      var timeStr = rawTime.length === 4 ? "0" + rawTime : rawTime;
 
      // Construir kickoff en COT (Colombia, UTC-5)
      var iso = dm[1] + "-" + dm[2] + "-" + dm[3] + "T" + timeStr + ":00-05:00";
      var kickoff;
      try {
        kickoff = new Date(iso);
        if (isNaN(kickoff.getTime())) {
          continue;
        }
      } catch (_) {
        continue;
      }
 
      // Si ya pas\u00f3 el kickoff, marcar como live
      if (now.getTime() >= kickoff.getTime()) {
        try {
          m.set("status", "live");
          $app.save(m);
          updated++;
          console.log("[match-auto-live] " + m.get("home_team") + " vs " + m.get("away_team") +
                      " (" + dm[0] + " " + timeStr + " COT) \u2192 LIVE");
        } catch (err) {
          console.log("[match-auto-live] error guardando " + m.id + ": " + String(err));
        }
      }
    }
 
    if (updated > 0) {
      console.log("[match-auto-live] " + updated + " partido(s) marcado(s) como LIVE en este ciclo");
    }
  } catch (err) {
    console.log("[match-auto-live] error general: " + String(err));
  }
});
 
console.log("[match-auto-live] cron */1 * * * * registrado");