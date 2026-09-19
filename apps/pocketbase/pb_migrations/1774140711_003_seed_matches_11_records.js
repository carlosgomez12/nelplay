/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const record0 = new Record(collection);
    record0.set("home_team", "Argentina");
    record0.set("away_team", "Saudi Arabia");
    record0.set("match_date", "2026-06-21");
    record0.set("match_time", "14:00");
    record0.set("status", "upcoming");
    record0.set("stadium_name", "Lusail Stadium");
    record0.set("stage", "Grupo A");
    record0.set("odds_match_winner", "{'home': 1.15, 'draw': 6.5, 'away': 15.0}");
    record0.set("odds_total_goals", "{'over_2_5': 1.8, 'under_2_5': 2.0}");
    record0.set("odds_parlay", "{'argentina_win_over_2_5': 2.1}");
    record0.set("team_flags", "{'home_flag_url': '\ud83c\udde6\ud83c\uddf7', 'away_flag_url': '\ud83c\uddf8\ud83c\udde6'}");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("home_team", "Mexico");
    record1.set("away_team", "Poland");
    record1.set("match_date", "2026-06-22");
    record1.set("match_time", "17:00");
    record1.set("status", "upcoming");
    record1.set("stadium_name", "Education City Stadium");
    record1.set("stage", "Grupo C");
    record1.set("odds_match_winner", "{'home': 2.1, 'draw': 3.4, 'away': 3.5}");
    record1.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.85}");
    record1.set("odds_parlay", "{'mexico_win_over_2_5': 4.2}");
    record1.set("team_flags", "{'home_flag_url': '\ud83c\uddf2\ud83c\uddfd', 'away_flag_url': '\ud83c\uddf5\ud83c\uddf1'}");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("home_team", "France");
    record2.set("away_team", "Netherlands");
    record2.set("match_date", "2026-06-25");
    record2.set("match_time", "20:00");
    record2.set("status", "upcoming");
    record2.set("stadium_name", "Al Bayt Stadium");
    record2.set("stage", "Grupo D");
    record2.set("odds_match_winner", "{'home': 1.95, 'draw': 3.6, 'away': 3.8}");
    record2.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record2.set("odds_parlay", "{'france_win_over_2_5': 3.75}");
    record2.set("team_flags", "{'home_flag_url': '\ud83c\uddeb\ud83c\uddf7', 'away_flag_url': '\ud83c\uddf3\ud83c\uddf1'}");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("home_team", "Brazil");
    record3.set("away_team", "Serbia");
    record3.set("match_date", "2026-06-24");
    record3.set("match_time", "14:00");
    record3.set("status", "upcoming");
    record3.set("stadium_name", "Ras Abu Aboud Stadium");
    record3.set("stage", "Grupo G");
    record3.set("odds_match_winner", "{'home': 1.35, 'draw': 5.0, 'away': 8.5}");
    record3.set("odds_total_goals", "{'over_2_5': 1.75, 'under_2_5': 2.1}");
    record3.set("odds_parlay", "{'brazil_win_over_2_5': 2.35}");
    record3.set("team_flags", "{'home_flag_url': '\ud83c\udde7\ud83c\uddf7', 'away_flag_url': '\ud83c\uddf7\ud83c\uddf8'}");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("home_team", "Germany");
    record4.set("away_team", "Spain");
    record4.set("match_date", "2026-07-03");
    record4.set("match_time", "16:00");
    record4.set("status", "upcoming");
    record4.set("stadium_name", "Al Thumama Stadium");
    record4.set("stage", "Octavos de Final");
    record4.set("odds_match_winner", "{'home': 2.2, 'draw': 3.3, 'away': 3.2}");
    record4.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record4.set("odds_parlay", "{'germany_win_over_2_5': 4.5}");
    record4.set("team_flags", "{'home_flag_url': '\ud83c\udde9\ud83c\uddea', 'away_flag_url': '\ud83c\uddea\ud83c\uddf8'}");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("home_team", "England");
    record5.set("away_team", "Senegal");
    record5.set("match_date", "2026-07-04");
    record5.set("match_time", "20:00");
    record5.set("status", "upcoming");
    record5.set("stadium_name", "Al Janoub Stadium");
    record5.set("stage", "Octavos de Final");
    record5.set("odds_match_winner", "{'home': 1.55, 'draw': 4.0, 'away': 5.5}");
    record5.set("odds_total_goals", "{'over_2_5': 1.85, 'under_2_5': 1.95}");
    record5.set("odds_parlay", "{'england_win_over_2_5': 2.85}");
    record5.set("team_flags", "{'home_flag_url': '\ud83c\uddec\ud83c\udde7', 'away_flag_url': '\ud83c\uddf8\ud83c\uddf3'}");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("home_team", "Argentina");
    record6.set("away_team", "Netherlands");
    record6.set("match_date", "2026-07-09");
    record6.set("match_time", "20:00");
    record6.set("status", "upcoming");
    record6.set("stadium_name", "Lusail Stadium");
    record6.set("stage", "Cuartos de Final");
    record6.set("odds_match_winner", "{'home': 1.8, 'draw': 3.8, 'away': 4.2}");
    record6.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record6.set("odds_parlay", "{'argentina_win_over_2_5': 3.5}");
    record6.set("team_flags", "{'home_flag_url': '\ud83c\udde6\ud83c\uddf7', 'away_flag_url': '\ud83c\uddf3\ud83c\uddf1'}");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("home_team", "France");
    record7.set("away_team", "Morocco");
    record7.set("match_date", "2026-07-10");
    record7.set("match_time", "16:00");
    record7.set("status", "upcoming");
    record7.set("stadium_name", "Al Bayt Stadium");
    record7.set("stage", "Cuartos de Final");
    record7.set("odds_match_winner", "{'home': 1.65, 'draw': 4.0, 'away': 5.0}");
    record7.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record7.set("odds_parlay", "{'france_win_over_2_5': 3.1}");
    record7.set("team_flags", "{'home_flag_url': '\ud83c\uddeb\ud83c\uddf7', 'away_flag_url': '\ud83c\uddf2\ud83c\udde6'}");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("home_team", "Argentina");
    record8.set("away_team", "France");
    record8.set("match_date", "2026-07-13");
    record8.set("match_time", "20:00");
    record8.set("status", "upcoming");
    record8.set("stadium_name", "Lusail Stadium");
    record8.set("stage", "Semifinales");
    record8.set("odds_match_winner", "{'home': 2.0, 'draw': 3.5, 'away': 3.8}");
    record8.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.85}");
    record8.set("odds_parlay", "{'argentina_win_over_2_5': 3.9}");
    record8.set("team_flags", "{'home_flag_url': '\ud83c\udde6\ud83c\uddf7', 'away_flag_url': '\ud83c\uddeb\ud83c\uddf7'}");
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("home_team", "Germany");
    record9.set("away_team", "Spain");
    record9.set("match_date", "2026-07-14");
    record9.set("match_time", "20:00");
    record9.set("status", "upcoming");
    record9.set("stadium_name", "Al Thumama Stadium");
    record9.set("stage", "Semifinales");
    record9.set("odds_match_winner", "{'home': 2.15, 'draw': 3.4, 'away': 3.3}");
    record9.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record9.set("odds_parlay", "{'germany_win_over_2_5': 4.25}");
    record9.set("team_flags", "{'home_flag_url': '\ud83c\udde9\ud83c\uddea', 'away_flag_url': '\ud83c\uddea\ud83c\uddf8'}");
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    record10.set("home_team", "Argentina");
    record10.set("away_team", "Germany");
    record10.set("match_date", "2026-07-18");
    record10.set("match_time", "18:00");
    record10.set("status", "upcoming");
    record10.set("stadium_name", "Lusail Stadium");
    record10.set("stage", "Final");
    record10.set("odds_match_winner", "{'home': 2.1, 'draw': 3.6, 'away': 3.5}");
    record10.set("odds_total_goals", "{'over_2_5': 1.98, 'under_2_5': 1.82}");
    record10.set("odds_parlay", "{'argentina_win_over_2_5': 4.1}");
    record10.set("team_flags", "{'home_flag_url': '\ud83c\udde6\ud83c\uddf7', 'away_flag_url': '\ud83c\udde9\ud83c\uddea'}");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})