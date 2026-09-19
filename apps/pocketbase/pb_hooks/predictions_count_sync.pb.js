/// <reference path="../pb_data/types.d.ts" />
// Hook: Sync prediction counts with matches collection
// Increments predictions_count when a prediction is created
// Decrements predictions_count when a prediction is deleted

onRecordAfterCreateSuccess((e) => {
  console.log("[predictions_count_sync] Hook triggered: onRecordAfterCreateSuccess for predictions collection");
  
  try {
    const matchId = e.record.get("match_id");
    console.log("[predictions_count_sync] Processing match_id:", matchId);
    
    if (!matchId) {
      console.log("[predictions_count_sync] Warning: match_id is empty or null");
      e.next();
      return;
    }
    
    // Find the match record
    const match = $app.findRecordById("matches", matchId);
    
    if (!match) {
      console.log("[predictions_count_sync] Warning: Match not found with id:", matchId);
      e.next();
      return;
    }
    
    console.log("[predictions_count_sync] Match found, updating predictions_count");
    
    // Get current predictions_count, default to 0 if not set
    let currentCount = match.get("predictions_count");
    if (currentCount === null || currentCount === undefined) {
      currentCount = 0;
    }
    
    // Increment the count
    const newCount = currentCount + 1;
    match.set("predictions_count", newCount);
    
    // Save the updated match record
    $app.save(match);
    
    console.log("[predictions_count_sync] Successfully updated match predictions_count to:", newCount);
    
  } catch (error) {
    console.log("[predictions_count_sync] Error in onRecordAfterCreateSuccess:", error.message);
    console.log("[predictions_count_sync] Error stack:", error);
  }
  
  e.next();
}, "predictions");

onRecordAfterDeleteSuccess((e) => {
  console.log("[predictions_count_sync] Hook triggered: onRecordAfterDeleteSuccess for predictions collection");
  
  try {
    const matchId = e.record.get("match_id");
    console.log("[predictions_count_sync] Processing match_id:", matchId);
    
    if (!matchId) {
      console.log("[predictions_count_sync] Warning: match_id is empty or null");
      e.next();
      return;
    }
    
    // Find the match record
    const match = $app.findRecordById("matches", matchId);
    
    if (!match) {
      console.log("[predictions_count_sync] Warning: Match not found with id:", matchId);
      e.next();
      return;
    }
    
    console.log("[predictions_count_sync] Match found, updating predictions_count");
    
    // Get current predictions_count, default to 0 if not set
    let currentCount = match.get("predictions_count");
    if (currentCount === null || currentCount === undefined) {
      currentCount = 0;
    }
    
    // Decrement the count (but don't go below 0)
    const newCount = Math.max(0, currentCount - 1);
    match.set("predictions_count", newCount);
    
    // Save the updated match record
    $app.save(match);
    
    console.log("[predictions_count_sync] Successfully updated match predictions_count to:", newCount);
    
  } catch (error) {
    console.log("[predictions_count_sync] Error in onRecordAfterDeleteSuccess:", error.message);
    console.log("[predictions_count_sync] Error stack:", error);
  }
  
  e.next();
}, "predictions");