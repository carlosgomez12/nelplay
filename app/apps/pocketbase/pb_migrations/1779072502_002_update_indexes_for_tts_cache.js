/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("tts_cache");
  collection.indexes.push("CREATE UNIQUE INDEX idx_tts_cache_cache_key ON tts_cache (cache_key)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("tts_cache");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_tts_cache_cache_key"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})