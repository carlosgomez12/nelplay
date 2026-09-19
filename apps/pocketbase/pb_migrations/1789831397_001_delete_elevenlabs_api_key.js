/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Elimina el secreto ELEVENLABS_API_KEY de app_secrets.
  // La funcionalidad TTS (PromoAnnouncer "Cuchito") fue retirada y la clave
  // quedó obsoleta; se debe además revocar en el panel de ElevenLabs.
  try {
    const record = app.findFirstRecordByFilter(
      "app_secrets",
      'key_name = "ELEVENLABS_API_KEY"'
    );
    app.delete(record);
    console.log("[migration] ELEVENLABS_API_KEY eliminado de app_secrets");
  } catch (e) {
    if (e.message && e.message.includes("no rows in result set")) {
      console.log("[migration] ELEVENLABS_API_KEY no existe, se omite");
      return;
    }
    throw e;
  }
}, (app) => {
  // Down: no se restaura el secreto a propósito (clave revocada).
})
