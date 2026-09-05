/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("payment_settings");

  const existing = collection.fields.getByName("prize_third_pct");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("prize_third_pct"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "prize_third_pct",
    required: true,
    min: 0,
    max: 100
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("payment_settings");
    collection.fields.removeByName("prize_third_pct");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})