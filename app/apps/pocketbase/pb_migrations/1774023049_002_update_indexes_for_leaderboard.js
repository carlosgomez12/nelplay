/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("leaderboard");
  collection.indexes.push("CREATE UNIQUE INDEX idx_leaderboard_user_id ON leaderboard (user_id)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("leaderboard");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_leaderboard_user_id"));
  return app.save(collection);
})