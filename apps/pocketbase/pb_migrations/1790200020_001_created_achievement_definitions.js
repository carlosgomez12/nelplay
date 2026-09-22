/// <reference path="../pb_data/types.d.ts" />
// Fase 2 — Gamificación: catálogo extensible de logros.
// metric = campo del usuario a comparar (predictions_count | exact_score_count |
//          best_streak | total_points); threshold = valor mínimo para desbloquear.
// Añadir un logro nuevo = añadir un registro aquí (sin cambiar código).
migrate((app) => {
  const collection = new Collection({
    "id": "pbc_ach_defs_01",
    "name": "achievement_definitions",
    "type": "base",
    "system": false,
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.role = 'admin'",
    "updateRule": "@request.auth.role = 'admin'",
    "deleteRule": "@request.auth.role = 'admin'",
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ach_def_code` ON `achievement_definitions` (`code`)"
    ],
    "fields": [
      { "id": "text_id_achd01", "name": "id", "type": "text", "system": true, "primaryKey": true, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "[a-z0-9]{15}", "pattern": "^[a-z0-9]+$", "min": 15, "max": 15 },
      { "id": "text_achd_code", "name": "code", "type": "text", "system": false, "required": true, "hidden": false, "presentable": true, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 64 },
      { "id": "text_achd_name", "name": "name", "type": "text", "system": false, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 120 },
      { "id": "text_achd_desc", "name": "description", "type": "text", "system": false, "required": false, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 300 },
      { "id": "text_achd_metr", "name": "metric", "type": "text", "system": false, "required": true, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 64 },
      { "id": "num_achd_thr", "name": "threshold", "type": "number", "system": false, "required": true, "hidden": false, "presentable": false, "onlyInt": true, "min": 0, "max": null },
      { "id": "text_achd_icon", "name": "icon", "type": "text", "system": false, "required": false, "hidden": false, "presentable": false, "autogeneratePattern": "", "pattern": "", "min": 0, "max": 32 },
      { "id": "num_achd_sort", "name": "sort_order", "type": "number", "system": false, "required": false, "hidden": false, "presentable": false, "onlyInt": true, "min": 0, "max": null },
      { "id": "bool_achd_act", "name": "active", "type": "bool", "system": false, "required": false, "hidden": false, "presentable": false },
      { "id": "autodate_achd_c", "name": "created", "type": "autodate", "system": false, "hidden": false, "presentable": false, "onCreate": true, "onUpdate": false },
      { "id": "autodate_achd_u", "name": "updated", "type": "autodate", "system": false, "hidden": false, "presentable": false, "onCreate": true, "onUpdate": true }
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
    const collection = app.findCollectionByNameOrId("achievement_definitions");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
