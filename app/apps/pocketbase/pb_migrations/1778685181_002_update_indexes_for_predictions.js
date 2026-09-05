/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("predictions");
  collection.indexes.push("CREATE UNIQUE INDEX idx_predictions_user_match ON predictions (user_id, match_id)");
  collection.indexes.push("CREATE INDEX idx_predictions_user_id ON predictions (user_id)");
  collection.indexes.push("CREATE INDEX idx_predictions_match_id ON predictions (match_id)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("predictions");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_predictions_user_match"));
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_predictions_user_id"));
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_predictions_match_id"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})