/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const record0 = new Record(collection);
    record0.set("home_team", "Argentina");
    record0.set("away_team", "Ecuador");
    record0.set("team_flags", "{'home': 'https://flagcdn.com/w320/ar.png', 'away': 'https://flagcdn.com/w320/ec.png'}");
    record0.set("stadium_name", "SoFi Stadium");
    record0.set("match_date", "2026-06-29");
    record0.set("match_time", "16:00");
    record0.set("stage", "Octavos de Final");
    record0.set("status", "upcoming");
    record0.set("odds_match_winner", "{'home': 1.45, 'draw': 3.8, 'away': 7.5}");
    record0.set("odds_total_goals", "{'over_2_5': 1.85, 'under_2_5': 1.95}");
    record0.set("odds_parlay", "{'argentina_win_over_2_5': 2.5, 'argentina_win_under_2_5': 2.8, 'draw_over_2_5': 6.5, 'draw_under_2_5': 7.2}");
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
    record1.set("home_team", "France");
    record1.set("away_team", "Poland");
    record1.set("team_flags", "{'home': 'https://flagcdn.com/w320/fr.png', 'away': 'https://flagcdn.com/w320/pl.png'}");
    record1.set("stadium_name", "MetLife Stadium");
    record1.set("match_date", "2026-06-29");
    record1.set("match_time", "20:00");
    record1.set("stage", "Octavos de Final");
    record1.set("status", "upcoming");
    record1.set("odds_match_winner", "{'home': 1.35, 'draw': 4.2, 'away': 9.0}");
    record1.set("odds_total_goals", "{'over_2_5': 1.8, 'under_2_5': 2.05}");
    record1.set("odds_parlay", "{'france_win_over_2_5': 2.2, 'france_win_under_2_5': 2.6, 'draw_over_2_5': 7.0, 'draw_under_2_5': 8.0}");
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
    record2.set("home_team", "England");
    record2.set("away_team", "Senegal");
    record2.set("team_flags", "{'home': 'https://flagcdn.com/w320/gb.png', 'away': 'https://flagcdn.com/w320/sn.png'}");
    record2.set("stadium_name", "Arrowhead Stadium");
    record2.set("match_date", "2026-06-30");
    record2.set("match_time", "16:00");
    record2.set("stage", "Octavos de Final");
    record2.set("status", "upcoming");
    record2.set("odds_match_winner", "{'home': 1.5, 'draw': 3.6, 'away': 6.5}");
    record2.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record2.set("odds_parlay", "{'england_win_over_2_5': 2.65, 'england_win_under_2_5': 2.95, 'draw_over_2_5': 6.2, 'draw_under_2_5': 6.8}");
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
    record3.set("home_team", "Spain");
    record3.set("away_team", "Netherlands");
    record3.set("team_flags", "{'home': 'https://flagcdn.com/w320/es.png', 'away': 'https://flagcdn.com/w320/nl.png'}");
    record3.set("stadium_name", "Levi's Stadium");
    record3.set("match_date", "2026-06-30");
    record3.set("match_time", "20:00");
    record3.set("stage", "Octavos de Final");
    record3.set("status", "upcoming");
    record3.set("odds_match_winner", "{'home': 1.55, 'draw': 3.5, 'away': 6.0}");
    record3.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record3.set("odds_parlay", "{'spain_win_over_2_5': 2.8, 'spain_win_under_2_5': 3.1, 'draw_over_2_5': 6.0, 'draw_under_2_5': 6.5}");
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
    record4.set("away_team", "Japan");
    record4.set("team_flags", "{'home': 'https://flagcdn.com/w320/de.png', 'away': 'https://flagcdn.com/w320/jp.png'}");
    record4.set("stadium_name", "AT&T Stadium");
    record4.set("match_date", "2026-07-01");
    record4.set("match_time", "16:00");
    record4.set("stage", "Octavos de Final");
    record4.set("status", "upcoming");
    record4.set("odds_match_winner", "{'home': 1.4, 'draw': 4.0, 'away': 8.5}");
    record4.set("odds_total_goals", "{'over_2_5': 1.82, 'under_2_5': 2.0}");
    record4.set("odds_parlay", "{'germany_win_over_2_5': 2.35, 'germany_win_under_2_5': 2.75, 'draw_over_2_5': 6.8, 'draw_under_2_5': 7.8}");
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
    record5.set("home_team", "Brazil");
    record5.set("away_team", "South Korea");
    record5.set("team_flags", "{'home': 'https://flagcdn.com/w320/br.png', 'away': 'https://flagcdn.com/w320/kr.png'}");
    record5.set("stadium_name", "Mercedes-Benz Stadium");
    record5.set("match_date", "2026-07-01");
    record5.set("match_time", "20:00");
    record5.set("stage", "Octavos de Final");
    record5.set("status", "upcoming");
    record5.set("odds_match_winner", "{'home': 1.38, 'draw': 4.1, 'away': 8.8}");
    record5.set("odds_total_goals", "{'over_2_5': 1.85, 'under_2_5': 1.95}");
    record5.set("odds_parlay", "{'brazil_win_over_2_5': 2.3, 'brazil_win_under_2_5': 2.7, 'draw_over_2_5': 7.0, 'draw_under_2_5': 8.0}");
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
    record6.set("home_team", "Belgium");
    record6.set("away_team", "Croatia");
    record6.set("team_flags", "{'home': 'https://flagcdn.com/w320/be.png', 'away': 'https://flagcdn.com/w320/hr.png'}");
    record6.set("stadium_name", "Soldier Field");
    record6.set("match_date", "2026-07-02");
    record6.set("match_time", "16:00");
    record6.set("stage", "Octavos de Final");
    record6.set("status", "upcoming");
    record6.set("odds_match_winner", "{'home': 1.52, 'draw': 3.55, 'away': 6.2}");
    record6.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record6.set("odds_parlay", "{'belgium_win_over_2_5': 2.7, 'belgium_win_under_2_5': 3.0, 'draw_over_2_5': 6.1, 'draw_under_2_5': 6.7}");
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
    record7.set("home_team", "Portugal");
    record7.set("away_team", "Switzerland");
    record7.set("team_flags", "{'home': 'https://flagcdn.com/w320/pt.png', 'away': 'https://flagcdn.com/w320/ch.png'}");
    record7.set("stadium_name", "Allegiant Stadium");
    record7.set("match_date", "2026-07-02");
    record7.set("match_time", "20:00");
    record7.set("stage", "Octavos de Final");
    record7.set("status", "upcoming");
    record7.set("odds_match_winner", "{'home': 1.58, 'draw': 3.4, 'away': 5.8}");
    record7.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record7.set("odds_parlay", "{'portugal_win_over_2_5': 2.9, 'portugal_win_under_2_5': 3.2, 'draw_over_2_5': 5.8, 'draw_under_2_5': 6.3}");
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
    record8.set("team_flags", "{'home': 'https://flagcdn.com/w320/ar.png', 'away': 'https://flagcdn.com/w320/fr.png'}");
    record8.set("stadium_name", "NRG Stadium");
    record8.set("match_date", "2026-07-09");
    record8.set("match_time", "20:00");
    record8.set("stage", "Cuartos de Final");
    record8.set("status", "upcoming");
    record8.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 1.75}");
    record8.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.85}");
    record8.set("odds_parlay", "{'argentina_win_over_2_5': 4.0, 'argentina_win_under_2_5': 4.8, 'draw_over_2_5': 6.2, 'draw_under_2_5': 7.0}");
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
    record9.set("home_team", "England");
    record9.set("away_team", "Spain");
    record9.set("team_flags", "{'home': 'https://flagcdn.com/w320/gb.png', 'away': 'https://flagcdn.com/w320/es.png'}");
    record9.set("stadium_name", "Empower Field at Mile High");
    record9.set("match_date", "2026-07-10");
    record9.set("match_time", "16:00");
    record9.set("stage", "Cuartos de Final");
    record9.set("status", "upcoming");
    record9.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 1.8}");
    record9.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record9.set("odds_parlay", "{'england_win_over_2_5': 3.9, 'england_win_under_2_5': 4.7, 'draw_over_2_5': 6.4, 'draw_under_2_5': 7.2}");
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
    record10.set("home_team", "Germany");
    record10.set("away_team", "Brazil");
    record10.set("team_flags", "{'home': 'https://flagcdn.com/w320/de.png', 'away': 'https://flagcdn.com/w320/br.png'}");
    record10.set("stadium_name", "Caesars Superdome");
    record10.set("match_date", "2026-07-10");
    record10.set("match_time", "20:00");
    record10.set("stage", "Cuartos de Final");
    record10.set("status", "upcoming");
    record10.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 1.9}");
    record10.set("odds_total_goals", "{'over_2_5': 1.98, 'under_2_5': 1.82}");
    record10.set("odds_parlay", "{'germany_win_over_2_5': 3.8, 'germany_win_under_2_5': 4.6, 'draw_over_2_5': 6.7, 'draw_under_2_5': 7.5}");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    record11.set("home_team", "Belgium");
    record11.set("away_team", "Portugal");
    record11.set("team_flags", "{'home': 'https://flagcdn.com/w320/be.png', 'away': 'https://flagcdn.com/w320/pt.png'}");
    record11.set("stadium_name", "Hard Rock Stadium");
    record11.set("match_date", "2026-07-11");
    record11.set("match_time", "16:00");
    record11.set("stage", "Cuartos de Final");
    record11.set("status", "upcoming");
    record11.set("odds_match_winner", "{'home': 1.88, 'draw': 3.5, 'away': 2.0}");
    record11.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record11.set("odds_parlay", "{'belgium_win_over_2_5': 3.6, 'belgium_win_under_2_5': 4.4, 'draw_over_2_5': 6.8, 'draw_under_2_5': 7.6}");
  try {
    app.save(record11);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record12 = new Record(collection);
    record12.set("home_team", "Argentina");
    record12.set("away_team", "England");
    record12.set("team_flags", "{'home': 'https://flagcdn.com/w320/ar.png', 'away': 'https://flagcdn.com/w320/gb.png'}");
    record12.set("stadium_name", "Lincoln Financial Field");
    record12.set("match_date", "2026-07-14");
    record12.set("match_time", "20:00");
    record12.set("stage", "Semifinales");
    record12.set("status", "upcoming");
    record12.set("odds_match_winner", "{'home': 1.85, 'draw': 3.6, 'away': 2.1}");
    record12.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record12.set("odds_parlay", "{'argentina_win_over_2_5': 3.5, 'argentina_win_under_2_5': 4.3, 'draw_over_2_5': 6.9, 'draw_under_2_5': 7.7}");
  try {
    app.save(record12);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record13 = new Record(collection);
    record13.set("home_team", "France");
    record13.set("away_team", "Spain");
    record13.set("team_flags", "{'home': 'https://flagcdn.com/w320/fr.png', 'away': 'https://flagcdn.com/w320/es.png'}");
    record13.set("stadium_name", "Arrowhead Stadium");
    record13.set("match_date", "2026-07-15");
    record13.set("match_time", "20:00");
    record13.set("stage", "Semifinales");
    record13.set("status", "upcoming");
    record13.set("odds_match_winner", "{'home': 1.9, 'draw': 3.5, 'away': 2.0}");
    record13.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record13.set("odds_parlay", "{'france_win_over_2_5': 3.65, 'france_win_under_2_5': 4.5, 'draw_over_2_5': 6.8, 'draw_under_2_5': 7.5}");
  try {
    app.save(record13);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record14 = new Record(collection);
    record14.set("home_team", "Argentina");
    record14.set("away_team", "France");
    record14.set("team_flags", "{'home': 'https://flagcdn.com/w320/ar.png', 'away': 'https://flagcdn.com/w320/fr.png'}");
    record14.set("stadium_name", "MetLife Stadium");
    record14.set("match_date", "2026-07-19");
    record14.set("match_time", "18:00");
    record14.set("stage", "Final");
    record14.set("status", "upcoming");
    record14.set("odds_match_winner", "{'home': 2.2, 'draw': 3.4, 'away': 1.65}");
    record14.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record14.set("odds_parlay", "{'argentina_win_over_2_5': 4.2, 'argentina_win_under_2_5': 5.1, 'draw_over_2_5': 6.5, 'draw_under_2_5': 7.3}");
  try {
    app.save(record14);
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