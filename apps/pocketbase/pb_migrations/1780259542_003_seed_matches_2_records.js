/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const record0 = new Record(collection);
    record0.set("home_team", "Colombia");
    record0.set("away_team", "Costa Rica");
    record0.set("match_date", "2026-06-01");
    record0.set("match_time", "18:00");
    record0.set("status", "upcoming");
    record0.set("stage", "Amistoso");
  app.save(record0);

  const record1 = new Record(collection);
    record1.set("home_team", "Colombia");
    record1.set("away_team", "Jordania");
    record1.set("match_date", "2026-06-07");
    record1.set("match_time", "19:00");
    record1.set("status", "upcoming");
    record1.set("stage", "Amistoso");
  app.save(record1);
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})