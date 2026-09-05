/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const existing = collection.fields.getByName("team_flags");
  if (existing) {
    if (existing.type === "json") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("team_flags"); // exists with wrong type, remove first
  }

  collection.fields.add(new JSONField({
    name: "team_flags",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("matches");
  collection.fields.removeByName("team_flags");
  return app.save(collection);
})