/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("app_secrets");
  collection.indexes.push("CREATE UNIQUE INDEX idx_app_secrets_key_name ON app_secrets (key_name)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("app_secrets");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_app_secrets_key_name"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})