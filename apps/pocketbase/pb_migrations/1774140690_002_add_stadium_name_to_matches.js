/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const existing = collection.fields.getByName("stadium_name");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("stadium_name"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "stadium_name",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("matches");
  collection.fields.removeByName("stadium_name");
  return app.save(collection);
})