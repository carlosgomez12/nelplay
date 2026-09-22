/// <reference path="../pb_data/types.d.ts" />
// Fase 2 — Progresión: rachas persistidas (deterministas, actualizadas por el
// hook gamification.pb.js cuando cambian las stats del usuario).
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");

  const addNumber = (name) => {
    const existing = collection.fields.getByName(name);
    if (existing) {
      if (existing.type === "number") return;
      collection.fields.removeByName(name);
    }
    collection.fields.add(new NumberField({ name, required: false, min: 0 }));
  };

  addNumber("current_streak");
  addNumber("best_streak");

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("users");
    collection.fields.removeByName("current_streak");
    collection.fields.removeByName("best_streak");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
