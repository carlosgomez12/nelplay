/// <reference path="../pb_data/types.d.ts" />
 
/**
 * Endpoint TTS para Cuchito Futbolero.
 *
 *   POST /api/tts/speak    - Genera audio con ElevenLabs y lo cachea
 *   GET  /api/tts/health   - Verifica configuraci\u00f3n
 *
 * NOTA: Esta versi\u00f3n prueba 3 m\u00e9todos de body parsing en cascada
 * porque en esta versi\u00f3n de PocketBase `bindBody` aparentemente
 * no llena el objeto correctamente en algunas circunstancias.
 * Logueamos cu\u00e1l m\u00e9todo funciona para diagn\u00f3stico.
 */
 
console.log("[tts-elevenlabs] hook cargado");
 
// POST /api/tts/speak
routerAdd("POST", "/api/tts/speak", function (e) {
  try {
    // 1. Autenticaci\u00f3n
    var authRecord = e.auth;
    if (!authRecord) {
      return e.json(401, { error: "unauthorized", message: "Debes iniciar sesi\u00f3n" });
    }
 
    // 2. Leer API key desde app_secrets
    var apiKey = null;
    try {
      var keyRecord = $app.findFirstRecordByFilter("app_secrets",
        'key_name = "ELEVENLABS_API_KEY" && is_active = true');
      if (keyRecord) {
        var keyValue = keyRecord.getString("key_value");
        if (keyValue) apiKey = keyValue;
      }
    } catch (_) { /* no existe */ }
 
    if (!apiKey) {
      return e.json(500, { error: "config", message: "API key no configurada" });
    }
 
    // 3. Parsear body - cascada de m\u00e9todos hasta que uno funcione
    var body = null;
    var bodyMethod = "none";
 
    // M\u00e9todo A: e.bindBody(obj)
    try {
      var dataA = {};
      e.bindBody(dataA);
      if (dataA && dataA.text) {
        body = dataA;
        bodyMethod = "bindBody";
      }
    } catch (_) { /* falla silenciosa */ }
 
    // M\u00e9todo B: e.requestInfo()
    if (!body) {
      try {
        if (typeof e.requestInfo === "function") {
          var infoB = e.requestInfo();
          if (infoB && infoB.body && infoB.body.text) {
            body = infoB.body;
            bodyMethod = "requestInfo.body";
          } else if (infoB && infoB.data && infoB.data.text) {
            body = infoB.data;
            bodyMethod = "requestInfo.data";
          }
        }
      } catch (_) { /* falla silenciosa */ }
    }
 
    // M\u00e9todo C: readerToString(e.request.body)
    if (!body) {
      try {
        if (typeof readerToString === "function" && e.request && e.request.body) {
          var rawC = readerToString(e.request.body);
          if (rawC) {
            body = JSON.parse(rawC);
            bodyMethod = "readerToString";
          }
        }
      } catch (_) { /* falla silenciosa */ }
    }
 
    if (!body) {
      return e.json(400, { error: "bad_request", message: "No se pudo leer el cuerpo de la petici\u00f3n" });
    }
 
    console.log("[tts] body parsed via: " + bodyMethod);
 
    var text = String(body.text || "").trim();
    var voiceId = String(body.voice_id || "aLA88pewYI8sJzecjzX0").trim();
 
    if (!text) return e.json(400, { error: "bad_request", message: "Falta text" });
    if (text.length > 2000) return e.json(400, { error: "bad_request", message: "Texto muy largo" });
 
    // 4. Cache key
    var cacheKey = $security.md5(text + "::" + voiceId);
 
    // 5. Buscar en cache
    try {
      var cached = $app.findFirstRecordByFilter("tts_cache",
        'cache_key = "' + cacheKey + '"');
      if (cached) {
        var cachedAudio = cached.getString("audio_url");
        if (cachedAudio) {
          try {
            cached.set("use_count", (cached.getInt("use_count") || 0) + 1);
            cached.set("last_used", new Date().toISOString());
            $app.save(cached);
          } catch (_) {}
          return e.json(200, {
            url: "/api/files/tts_cache/" + cached.id + "/" + cachedAudio,
            cached: true
          });
        }
      }
    } catch (_) { /* cache miss */ }
 
    // 6. Llamar a ElevenLabs
    var res = $http.send({
      url: "https://api.elevenlabs.io/v1/text-to-speech/" + voiceId,
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.8,
          style: 0.35,
          use_speaker_boost: true
        }
      }),
      timeout: 30
    });
 
    if (res.statusCode !== 200) {
      console.log("[tts] ElevenLabs " + res.statusCode);
      return e.json(502, {
        error: "tts_failed",
        message: "Error de ElevenLabs (" + res.statusCode + ")"
      });
    }
 
    var audioBytes = res.raw;
 
    // 7. Guardar en cache
    var collection = $app.findCollectionByNameOrId("tts_cache");
    var record = new Record(collection);
    record.set("cache_key", cacheKey);
    record.set("text_preview", text.substring(0, 200));
    record.set("voice_id", voiceId);
    record.set("use_count", 1);
    record.set("last_used", new Date().toISOString());
 
    var filename = cacheKey.substring(0, 30) + ".mp3";
    var file = $filesystem.fileFromBytes(audioBytes, filename);
    record.set("audio_url", file);
 
    $app.save(record);
    var savedFilename = record.getString("audio_url");
 
    return e.json(200, {
      url: "/api/files/tts_cache/" + record.id + "/" + savedFilename,
      cached: false
    });
 
  } catch (err) {
    console.log("[tts] error: " + String(err));
    return e.json(500, {
      error: "internal_error",
      message: "Error generando audio"
    });
  }
});
 
// GET /api/tts/health
routerAdd("GET", "/api/tts/health", function (e) {
  var apiKey = null;
  try {
    var keyRecord = $app.findFirstRecordByFilter("app_secrets",
      'key_name = "ELEVENLABS_API_KEY" && is_active = true');
    if (keyRecord) {
      var keyValue = keyRecord.getString("key_value");
      if (keyValue) apiKey = keyValue;
    }
  } catch (_) {}
 
  return e.json(200, {
    ok: true,
    apiKeyConfigured: !!apiKey,
    apiKeyPreview: apiKey ? (apiKey.substring(0, 6) + "...") : null,
    timestamp: new Date().toISOString()
  });
});
 
console.log("[tts-elevenlabs] rutas registradas: POST /api/tts/speak, GET /api/tts/health");