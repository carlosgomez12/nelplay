/// <reference path="../pb_data/types.d.ts" />
// Fase 2 — Gamificación: logros desbloqueados por usuario.
// Seguridad: create/update/delete = null (solo superusuario) => únicamente el
// hook gamification.pb.js puede escribir; el usuario no puede forjar logros.
// list/view = solo el dueño (@request.auth.id = user_id). 'created' = unlocked_at.
migrate((app) => {
  const collection = new Collection({
    "id": "pbc_user_ach_01",
    "name": "user_achievements",
    "type": "base",
    "system": false,
    "listRule": "@request.auth.id = user_id",
    "viewRule": "@request.auth.id = user_id",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "indexes": [
      "CREATE UNIQUE INDEX `idx_user_ach_unique` ON `user_achievements` (`user_id`, `achievement_code`)"
    ],
    "fields": [
      { "id": "text_id_uach01", "name": "id", "type": "text", "system": true, "primaryKey": true, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "[a-z0-9]{15}", "pattern": "^[a-z0-9]+$", "min": 15, "max": 15 },
      { "id": "text_uach_user", "name": "user_id", "type": "text", "system": false, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 64 },
      { "id": "text_uach_code", "name": "achievement_code", "type": "text", "system": false, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 64 },
      { "id": "num_uach_prog", "name": "progress", "type": "number", "system": false, "required": false, "hidden": false, "presentable": false, "onlyInt": true, "min": 0, "max": null },
      { "id": "autodate_uach_c", "name": "created", "type": "autodate", "system": false, "hidden": false, "presentable": false, "onCreate": true, "onUpdate": false },
      { "id": "autodate_uach_u", "name": "updated", "type": "autodate", "system": false, "hidden": false, "presentable": false, "onCreate": true, "onUpdate": true }
    ]
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) {
      console.log("Collection already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("user_achievements");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
