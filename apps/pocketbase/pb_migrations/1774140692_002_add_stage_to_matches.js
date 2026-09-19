/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const existing = collection.fields.getByName("stage");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("stage"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "stage",
    required: false,
    values: ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Octavos de Final", "Cuartos de Final", "Semifinales", "Final"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("matches");
  collection.fields.removeByName("stage");
  return app.save(collection);
})