/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");
  const field = collection.fields.getByName("stage");
  field.values = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L", "Octavos de Final", "Cuartos de Final", "Semifinales", "Final", "Amistoso"];
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("matches");
  const field = collection.fields.getByName("stage");
  if (!field) { console.log("Field not found, skipping revert"); return; }
  field.values = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L", "Octavos de Final", "Cuartos de Final", "Semifinales", "Final"];
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection or field not found, skipping revert");
      return;
    }
    throw e;
  }
})