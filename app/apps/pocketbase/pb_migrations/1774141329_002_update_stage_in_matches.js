/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");
  const field = collection.fields.getByName("stage");
  field.values = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Grupo I", "Grupo J", "Grupo K", "Grupo L", "Octavos de Final", "Cuartos de Final", "Semifinales", "Final"];
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("matches");
  const field = collection.fields.getByName("stage");
  field.values = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Octavos de Final", "Cuartos de Final", "Semifinales", "Final"];
  return app.save(collection);
})