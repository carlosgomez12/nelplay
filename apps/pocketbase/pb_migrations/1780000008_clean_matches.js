/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  console.log("Starting cleanup migration...");

  // Delete all predictions
  try {
    const predictions = app.findRecordsByFilter("predictions", "id != ''", "-created", 500);
    console.log(`Found ${predictions.length} predictions to delete`);
    predictions.forEach((record) => {
      app.delete(record);
    });
    console.log("✓ All predictions deleted");
  } catch (e) {
    console.log("Error deleting predictions:", e);
  }

  // Delete all matches
  try {
    const matches = app.findRecordsByFilter("matches", "id != ''", "-created", 500);
    console.log(`Found ${matches.length} matches to delete`);
    matches.forEach((record) => {
      app.delete(record);
    });
    console.log("✓ All matches deleted");
  } catch (e) {
    console.log("Error deleting matches:", e);
  }

  // Reset user counters
  try {
    const users = app.findRecordsByFilter("users", "id != ''", "-created", 500);
    console.log(`Found ${users.length} users to reset`);
    users.forEach((user) => {
      user.set("total_points", 0);
      user.set("predictions_count", 0);
      user.set("exact_score_count", 0);
      app.save(user);
    });
    console.log("✓ All user counters reset to 0");
  } catch (e) {
    console.log("Error resetting user counters:", e);
  }

  console.log("Cleanup migration completed");
}, (app) => {
  // Revert function - empty as this is a destructive operation
  console.log("Revert not implemented for cleanup migration");
});