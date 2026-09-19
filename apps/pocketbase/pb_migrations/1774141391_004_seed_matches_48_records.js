/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const record0 = new Record(collection);
    record0.set("home_team", "Argentina");
    record0.set("away_team", "France");
    record0.set("match_date", "2026-06-12");
    record0.set("match_time", "18:00");
    record0.set("status", "upcoming");
    record0.set("stage", "Grupo A");
    record0.set("stadium_name", "MetLife Stadium, New Jersey");
    record0.set("team_flags", "{'home': '\ud83c\udde6\ud83c\uddf7', 'away': '\ud83c\uddeb\ud83c\uddf7'}");
    record0.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record0.set("odds_total_goals", "{'over_2_5': 1.85, 'under_2_5': 1.95}");
    record0.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
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
    record1.set("home_team", "Morocco");
    record1.set("away_team", "Peru");
    record1.set("match_date", "2026-06-12");
    record1.set("match_time", "21:00");
    record1.set("status", "upcoming");
    record1.set("stage", "Grupo A");
    record1.set("stadium_name", "SoFi Stadium, Los Angeles");
    record1.set("team_flags", "{'home': '\ud83c\uddf2\ud83c\udde6', 'away': '\ud83c\uddf5\ud83c\uddea'}");
    record1.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 3.8}");
    record1.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record1.set("odds_parlay", "{'home_and_over': 3.5, 'away_and_under': 5.5}");
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
    record2.set("home_team", "Argentina");
    record2.set("away_team", "Morocco");
    record2.set("match_date", "2026-06-17");
    record2.set("match_time", "18:00");
    record2.set("status", "upcoming");
    record2.set("stage", "Grupo A");
    record2.set("stadium_name", "AT&T Stadium, Dallas");
    record2.set("team_flags", "{'home': '\ud83c\udde6\ud83c\uddf7', 'away': '\ud83c\uddf2\ud83c\udde6'}");
    record2.set("odds_match_winner", "{'home': 1.85, 'draw': 3.5, 'away': 4.2}");
    record2.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record2.set("odds_parlay", "{'home_and_over': 3.3, 'away_and_under': 6.0}");
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
    record3.set("home_team", "France");
    record3.set("away_team", "Peru");
    record3.set("match_date", "2026-06-17");
    record3.set("match_time", "21:00");
    record3.set("status", "upcoming");
    record3.set("stage", "Grupo A");
    record3.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record3.set("team_flags", "{'home': '\ud83c\uddeb\ud83c\uddf7', 'away': '\ud83c\uddf5\ud83c\uddea'}");
    record3.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record3.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record3.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
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
    record4.set("home_team", "Argentina");
    record4.set("away_team", "Peru");
    record4.set("match_date", "2026-06-22");
    record4.set("match_time", "18:00");
    record4.set("status", "upcoming");
    record4.set("stage", "Grupo A");
    record4.set("stadium_name", "Levi's Stadium, San Francisco");
    record4.set("team_flags", "{'home': '\ud83c\udde6\ud83c\uddf7', 'away': '\ud83c\uddf5\ud83c\uddea'}");
    record4.set("odds_match_winner", "{'home': 1.75, 'draw': 3.6, 'away': 4.5}");
    record4.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record4.set("odds_parlay", "{'home_and_over': 3.1, 'away_and_under': 6.5}");
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
    record5.set("home_team", "France");
    record5.set("away_team", "Morocco");
    record5.set("match_date", "2026-06-22");
    record5.set("match_time", "21:00");
    record5.set("status", "upcoming");
    record5.set("stage", "Grupo A");
    record5.set("stadium_name", "Mercedes-Benz Stadium, Atlanta");
    record5.set("team_flags", "{'home': '\ud83c\uddeb\ud83c\uddf7', 'away': '\ud83c\uddf2\ud83c\udde6'}");
    record5.set("odds_match_winner", "{'home': 2.15, 'draw': 3.2, 'away': 3.4}");
    record5.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record5.set("odds_parlay", "{'home_and_over': 3.9, 'away_and_under': 5.0}");
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
    record6.set("home_team", "England");
    record6.set("away_team", "Netherlands");
    record6.set("match_date", "2026-06-13");
    record6.set("match_time", "18:00");
    record6.set("status", "upcoming");
    record6.set("stage", "Grupo B");
    record6.set("stadium_name", "Lambeau Field, Green Bay");
    record6.set("team_flags", "{'home': '\ud83c\uddec\ud83c\udde7', 'away': '\ud83c\uddf3\ud83c\uddf1'}");
    record6.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record6.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record6.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
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
    record7.set("home_team", "Senegal");
    record7.set("away_team", "Ecuador");
    record7.set("match_date", "2026-06-13");
    record7.set("match_time", "21:00");
    record7.set("status", "upcoming");
    record7.set("stage", "Grupo B");
    record7.set("stadium_name", "Soldier Field, Chicago");
    record7.set("team_flags", "{'home': '\ud83c\uddf8\ud83c\uddf3', 'away': '\ud83c\uddea\ud83c\udde8'}");
    record7.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record7.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record7.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
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
    record8.set("home_team", "England");
    record8.set("away_team", "Senegal");
    record8.set("match_date", "2026-06-18");
    record8.set("match_time", "18:00");
    record8.set("status", "upcoming");
    record8.set("stage", "Grupo B");
    record8.set("stadium_name", "NRG Stadium, Houston");
    record8.set("team_flags", "{'home': '\ud83c\uddec\ud83c\udde7', 'away': '\ud83c\uddf8\ud83c\uddf3'}");
    record8.set("odds_match_winner", "{'home': 1.9, 'draw': 3.4, 'away': 3.9}");
    record8.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record8.set("odds_parlay", "{'home_and_over': 3.4, 'away_and_under': 5.7}");
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
    record9.set("home_team", "Netherlands");
    record9.set("away_team", "Ecuador");
    record9.set("match_date", "2026-06-18");
    record9.set("match_time", "21:00");
    record9.set("status", "upcoming");
    record9.set("stage", "Grupo B");
    record9.set("stadium_name", "Empower Field at Mile High, Denver");
    record9.set("team_flags", "{'home': '\ud83c\uddf3\ud83c\uddf1', 'away': '\ud83c\uddea\ud83c\udde8'}");
    record9.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record9.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record9.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
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
    record10.set("home_team", "England");
    record10.set("away_team", "Ecuador");
    record10.set("match_date", "2026-06-23");
    record10.set("match_time", "18:00");
    record10.set("status", "upcoming");
    record10.set("stage", "Grupo B");
    record10.set("stadium_name", "Caesars Superdome, New Orleans");
    record10.set("team_flags", "{'home': '\ud83c\uddec\ud83c\udde7', 'away': '\ud83c\uddea\ud83c\udde8'}");
    record10.set("odds_match_winner", "{'home': 1.8, 'draw': 3.5, 'away': 4.3}");
    record10.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.89}");
    record10.set("odds_parlay", "{'home_and_over': 3.2, 'away_and_under': 6.2}");
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
    record11.set("home_team", "Netherlands");
    record11.set("away_team", "Senegal");
    record11.set("match_date", "2026-06-23");
    record11.set("match_time", "21:00");
    record11.set("status", "upcoming");
    record11.set("stage", "Grupo B");
    record11.set("stadium_name", "Acrisure Stadium, Pittsburgh");
    record11.set("team_flags", "{'home': '\ud83c\uddf3\ud83c\uddf1', 'away': '\ud83c\uddf8\ud83c\uddf3'}");
    record11.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record11.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record11.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
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
    record12.set("home_team", "Spain");
    record12.set("away_team", "Germany");
    record12.set("match_date", "2026-06-14");
    record12.set("match_time", "18:00");
    record12.set("status", "upcoming");
    record12.set("stage", "Grupo C");
    record12.set("stadium_name", "Gillette Stadium, Boston");
    record12.set("team_flags", "{'home': '\ud83c\uddea\ud83c\uddf8', 'away': '\ud83c\udde9\ud83c\uddea'}");
    record12.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record12.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record12.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
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
    record13.set("home_team", "Japan");
    record13.set("away_team", "Costa Rica");
    record13.set("match_date", "2026-06-14");
    record13.set("match_time", "21:00");
    record13.set("status", "upcoming");
    record13.set("stage", "Grupo C");
    record13.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record13.set("team_flags", "{'home': '\ud83c\uddef\ud83c\uddf5', 'away': '\ud83c\udde8\ud83c\uddf7'}");
    record13.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 3.8}");
    record13.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record13.set("odds_parlay", "{'home_and_over': 3.5, 'away_and_under': 5.5}");
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
    record14.set("home_team", "Spain");
    record14.set("away_team", "Japan");
    record14.set("match_date", "2026-06-19");
    record14.set("match_time", "18:00");
    record14.set("status", "upcoming");
    record14.set("stage", "Grupo C");
    record14.set("stadium_name", "Nissan Stadium, Nashville");
    record14.set("team_flags", "{'home': '\ud83c\uddea\ud83c\uddf8', 'away': '\ud83c\uddef\ud83c\uddf5'}");
    record14.set("odds_match_winner", "{'home': 1.85, 'draw': 3.5, 'away': 4.2}");
    record14.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record14.set("odds_parlay", "{'home_and_over': 3.3, 'away_and_under': 6.0}");
  try {
    app.save(record14);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record15 = new Record(collection);
    record15.set("home_team", "Germany");
    record15.set("away_team", "Costa Rica");
    record15.set("match_date", "2026-06-19");
    record15.set("match_time", "21:00");
    record15.set("status", "upcoming");
    record15.set("stage", "Grupo C");
    record15.set("stadium_name", "Paycor Stadium, Cincinnati");
    record15.set("team_flags", "{'home': '\ud83c\udde9\ud83c\uddea', 'away': '\ud83c\udde8\ud83c\uddf7'}");
    record15.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record15.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record15.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
  try {
    app.save(record15);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record16 = new Record(collection);
    record16.set("home_team", "Spain");
    record16.set("away_team", "Costa Rica");
    record16.set("match_date", "2026-06-24");
    record16.set("match_time", "18:00");
    record16.set("status", "upcoming");
    record16.set("stage", "Grupo C");
    record16.set("stadium_name", "Highmark Stadium, Buffalo");
    record16.set("team_flags", "{'home': '\ud83c\uddea\ud83c\uddf8', 'away': '\ud83c\udde8\ud83c\uddf7'}");
    record16.set("odds_match_winner", "{'home': 1.75, 'draw': 3.6, 'away': 4.5}");
    record16.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record16.set("odds_parlay", "{'home_and_over': 3.1, 'away_and_under': 6.5}");
  try {
    app.save(record16);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record17 = new Record(collection);
    record17.set("home_team", "Germany");
    record17.set("away_team", "Japan");
    record17.set("match_date", "2026-06-24");
    record17.set("match_time", "21:00");
    record17.set("status", "upcoming");
    record17.set("stage", "Grupo C");
    record17.set("stadium_name", "Hard Rock Stadium, Miami");
    record17.set("team_flags", "{'home': '\ud83c\udde9\ud83c\uddea', 'away': '\ud83c\uddef\ud83c\uddf5'}");
    record17.set("odds_match_winner", "{'home': 2.15, 'draw': 3.2, 'away': 3.4}");
    record17.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record17.set("odds_parlay", "{'home_and_over': 3.9, 'away_and_under': 5.0}");
  try {
    app.save(record17);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record18 = new Record(collection);
    record18.set("home_team", "Brazil");
    record18.set("away_team", "Belgium");
    record18.set("match_date", "2026-06-15");
    record18.set("match_time", "18:00");
    record18.set("status", "upcoming");
    record18.set("stage", "Grupo D");
    record18.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record18.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddf7', 'away': '\ud83c\udde7\ud83c\uddea'}");
    record18.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record18.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record18.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
  try {
    app.save(record18);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record19 = new Record(collection);
    record19.set("home_team", "Canada");
    record19.set("away_team", "Switzerland");
    record19.set("match_date", "2026-06-15");
    record19.set("match_time", "21:00");
    record19.set("status", "upcoming");
    record19.set("stage", "Grupo D");
    record19.set("stadium_name", "Levi's Stadium, San Francisco");
    record19.set("team_flags", "{'home': '\ud83c\udde8\ud83c\udde6', 'away': '\ud83c\udde8\ud83c\udded'}");
    record19.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record19.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record19.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
  try {
    app.save(record19);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record20 = new Record(collection);
    record20.set("home_team", "Brazil");
    record20.set("away_team", "Canada");
    record20.set("match_date", "2026-06-20");
    record20.set("match_time", "18:00");
    record20.set("status", "upcoming");
    record20.set("stage", "Grupo D");
    record20.set("stadium_name", "Mercedes-Benz Stadium, Atlanta");
    record20.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddf7', 'away': '\ud83c\udde8\ud83c\udde6'}");
    record20.set("odds_match_winner", "{'home': 1.9, 'draw': 3.4, 'away': 3.9}");
    record20.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record20.set("odds_parlay", "{'home_and_over': 3.4, 'away_and_under': 5.7}");
  try {
    app.save(record20);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record21 = new Record(collection);
    record21.set("home_team", "Belgium");
    record21.set("away_team", "Switzerland");
    record21.set("match_date", "2026-06-20");
    record21.set("match_time", "21:00");
    record21.set("status", "upcoming");
    record21.set("stage", "Grupo D");
    record21.set("stadium_name", "Soldier Field, Chicago");
    record21.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddea', 'away': '\ud83c\udde8\ud83c\udded'}");
    record21.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record21.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record21.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
  try {
    app.save(record21);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record22 = new Record(collection);
    record22.set("home_team", "Brazil");
    record22.set("away_team", "Switzerland");
    record22.set("match_date", "2026-06-25");
    record22.set("match_time", "18:00");
    record22.set("status", "upcoming");
    record22.set("stage", "Grupo D");
    record22.set("stadium_name", "NRG Stadium, Houston");
    record22.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddf7', 'away': '\ud83c\udde8\ud83c\udded'}");
    record22.set("odds_match_winner", "{'home': 1.8, 'draw': 3.5, 'away': 4.3}");
    record22.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.89}");
    record22.set("odds_parlay", "{'home_and_over': 3.2, 'away_and_under': 6.2}");
  try {
    app.save(record22);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record23 = new Record(collection);
    record23.set("home_team", "Belgium");
    record23.set("away_team", "Canada");
    record23.set("match_date", "2026-06-25");
    record23.set("match_time", "21:00");
    record23.set("status", "upcoming");
    record23.set("stage", "Grupo D");
    record23.set("stadium_name", "Empower Field at Mile High, Denver");
    record23.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddea', 'away': '\ud83c\udde8\ud83c\udde6'}");
    record23.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record23.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record23.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
  try {
    app.save(record23);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record24 = new Record(collection);
    record24.set("home_team", "Italy");
    record24.set("away_team", "Uruguay");
    record24.set("match_date", "2026-06-16");
    record24.set("match_time", "18:00");
    record24.set("status", "upcoming");
    record24.set("stage", "Grupo E");
    record24.set("stadium_name", "Caesars Superdome, New Orleans");
    record24.set("team_flags", "{'home': '\ud83c\uddee\ud83c\uddf9', 'away': '\ud83c\uddfa\ud83c\uddfe'}");
    record24.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record24.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record24.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
  try {
    app.save(record24);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record25 = new Record(collection);
    record25.set("home_team", "Portugal");
    record25.set("away_team", "Ghana");
    record25.set("match_date", "2026-06-16");
    record25.set("match_time", "21:00");
    record25.set("status", "upcoming");
    record25.set("stage", "Grupo E");
    record25.set("stadium_name", "Acrisure Stadium, Pittsburgh");
    record25.set("team_flags", "{'home': '\ud83c\uddf5\ud83c\uddf9', 'away': '\ud83c\uddec\ud83c\udded'}");
    record25.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 3.8}");
    record25.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record25.set("odds_parlay", "{'home_and_over': 3.5, 'away_and_under': 5.5}");
  try {
    app.save(record25);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record26 = new Record(collection);
    record26.set("home_team", "Italy");
    record26.set("away_team", "Portugal");
    record26.set("match_date", "2026-06-21");
    record26.set("match_time", "18:00");
    record26.set("status", "upcoming");
    record26.set("stage", "Grupo E");
    record26.set("stadium_name", "Gillette Stadium, Boston");
    record26.set("team_flags", "{'home': '\ud83c\uddee\ud83c\uddf9', 'away': '\ud83c\uddf5\ud83c\uddf9'}");
    record26.set("odds_match_winner", "{'home': 1.85, 'draw': 3.5, 'away': 4.2}");
    record26.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record26.set("odds_parlay", "{'home_and_over': 3.3, 'away_and_under': 6.0}");
  try {
    app.save(record26);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record27 = new Record(collection);
    record27.set("home_team", "Uruguay");
    record27.set("away_team", "Ghana");
    record27.set("match_date", "2026-06-21");
    record27.set("match_time", "21:00");
    record27.set("status", "upcoming");
    record27.set("stage", "Grupo E");
    record27.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record27.set("team_flags", "{'home': '\ud83c\uddfa\ud83c\uddfe', 'away': '\ud83c\uddec\ud83c\udded'}");
    record27.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record27.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record27.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
  try {
    app.save(record27);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record28 = new Record(collection);
    record28.set("home_team", "Italy");
    record28.set("away_team", "Ghana");
    record28.set("match_date", "2026-06-26");
    record28.set("match_time", "18:00");
    record28.set("status", "upcoming");
    record28.set("stage", "Grupo E");
    record28.set("stadium_name", "Nissan Stadium, Nashville");
    record28.set("team_flags", "{'home': '\ud83c\uddee\ud83c\uddf9', 'away': '\ud83c\uddec\ud83c\udded'}");
    record28.set("odds_match_winner", "{'home': 1.75, 'draw': 3.6, 'away': 4.5}");
    record28.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record28.set("odds_parlay", "{'home_and_over': 3.1, 'away_and_under': 6.5}");
  try {
    app.save(record28);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record29 = new Record(collection);
    record29.set("home_team", "Portugal");
    record29.set("away_team", "Uruguay");
    record29.set("match_date", "2026-06-26");
    record29.set("match_time", "21:00");
    record29.set("status", "upcoming");
    record29.set("stage", "Grupo E");
    record29.set("stadium_name", "Paycor Stadium, Cincinnati");
    record29.set("team_flags", "{'home': '\ud83c\uddf5\ud83c\uddf9', 'away': '\ud83c\uddfa\ud83c\uddfe'}");
    record29.set("odds_match_winner", "{'home': 2.15, 'draw': 3.2, 'away': 3.4}");
    record29.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record29.set("odds_parlay", "{'home_and_over': 3.9, 'away_and_under': 5.0}");
  try {
    app.save(record29);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record30 = new Record(collection);
    record30.set("home_team", "Mexico");
    record30.set("away_team", "Poland");
    record30.set("match_date", "2026-06-17");
    record30.set("match_time", "18:00");
    record30.set("status", "upcoming");
    record30.set("stage", "Grupo F");
    record30.set("stadium_name", "Highmark Stadium, Buffalo");
    record30.set("team_flags", "{'home': '\ud83c\uddf2\ud83c\uddfd', 'away': '\ud83c\uddf5\ud83c\uddf1'}");
    record30.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record30.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record30.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
  try {
    app.save(record30);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record31 = new Record(collection);
    record31.set("home_team", "Argentina");
    record31.set("away_team", "Saudi Arabia");
    record31.set("match_date", "2026-06-17");
    record31.set("match_time", "21:00");
    record31.set("status", "upcoming");
    record31.set("stage", "Grupo F");
    record31.set("stadium_name", "Hard Rock Stadium, Miami");
    record31.set("team_flags", "{'home': '\ud83c\udde6\ud83c\uddf7', 'away': '\ud83c\uddf8\ud83c\udde6'}");
    record31.set("odds_match_winner", "{'home': 1.5, 'draw': 4.0, 'away': 6.0}");
    record31.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.85}");
    record31.set("odds_parlay", "{'home_and_over': 2.8, 'away_and_under': 8.0}");
  try {
    app.save(record31);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record32 = new Record(collection);
    record32.set("home_team", "Mexico");
    record32.set("away_team", "Argentina");
    record32.set("match_date", "2026-06-22");
    record32.set("match_time", "18:00");
    record32.set("status", "upcoming");
    record32.set("stage", "Grupo F");
    record32.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record32.set("team_flags", "{'home': '\ud83c\uddf2\ud83c\uddfd', 'away': '\ud83c\udde6\ud83c\uddf7'}");
    record32.set("odds_match_winner", "{'home': 2.2, 'draw': 3.1, 'away': 3.3}");
    record32.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record32.set("odds_parlay", "{'home_and_over': 4.0, 'away_and_under': 4.8}");
  try {
    app.save(record32);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record33 = new Record(collection);
    record33.set("home_team", "Poland");
    record33.set("away_team", "Saudi Arabia");
    record33.set("match_date", "2026-06-22");
    record33.set("match_time", "21:00");
    record33.set("status", "upcoming");
    record33.set("stage", "Grupo F");
    record33.set("stadium_name", "Levi's Stadium, San Francisco");
    record33.set("team_flags", "{'home': '\ud83c\uddf5\ud83c\uddf1', 'away': '\ud83c\uddf8\ud83c\udde6'}");
    record33.set("odds_match_winner", "{'home': 1.85, 'draw': 3.5, 'away': 4.2}");
    record33.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record33.set("odds_parlay", "{'home_and_over': 3.3, 'away_and_under': 6.0}");
  try {
    app.save(record33);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record34 = new Record(collection);
    record34.set("home_team", "Mexico");
    record34.set("away_team", "Saudi Arabia");
    record34.set("match_date", "2026-06-27");
    record34.set("match_time", "18:00");
    record34.set("status", "upcoming");
    record34.set("stage", "Grupo F");
    record34.set("stadium_name", "Mercedes-Benz Stadium, Atlanta");
    record34.set("team_flags", "{'home': '\ud83c\uddf2\ud83c\uddfd', 'away': '\ud83c\uddf8\ud83c\udde6'}");
    record34.set("odds_match_winner", "{'home': 1.8, 'draw': 3.5, 'away': 4.3}");
    record34.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.89}");
    record34.set("odds_parlay", "{'home_and_over': 3.2, 'away_and_under': 6.2}");
  try {
    app.save(record34);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record35 = new Record(collection);
    record35.set("home_team", "Poland");
    record35.set("away_team", "Argentina");
    record35.set("match_date", "2026-06-27");
    record35.set("match_time", "21:00");
    record35.set("status", "upcoming");
    record35.set("stage", "Grupo F");
    record35.set("stadium_name", "Soldier Field, Chicago");
    record35.set("team_flags", "{'home': '\ud83c\uddf5\ud83c\uddf1', 'away': '\ud83c\udde6\ud83c\uddf7'}");
    record35.set("odds_match_winner", "{'home': 3.2, 'draw': 3.0, 'away': 2.2}");
    record35.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record35.set("odds_parlay", "{'home_and_over': 5.8, 'away_and_under': 4.0}");
  try {
    app.save(record35);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record36 = new Record(collection);
    record36.set("home_team", "Denmark");
    record36.set("away_team", "Tunisia");
    record36.set("match_date", "2026-06-18");
    record36.set("match_time", "18:00");
    record36.set("status", "upcoming");
    record36.set("stage", "Grupo G");
    record36.set("stadium_name", "NRG Stadium, Houston");
    record36.set("team_flags", "{'home': '\ud83c\udde9\ud83c\uddf0', 'away': '\ud83c\uddf9\ud83c\uddf3'}");
    record36.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 3.8}");
    record36.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record36.set("odds_parlay", "{'home_and_over': 3.5, 'away_and_under': 5.5}");
  try {
    app.save(record36);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record37 = new Record(collection);
    record37.set("home_team", "Australia");
    record37.set("away_team", "South Korea");
    record37.set("match_date", "2026-06-18");
    record37.set("match_time", "21:00");
    record37.set("status", "upcoming");
    record37.set("stage", "Grupo G");
    record37.set("stadium_name", "Empower Field at Mile High, Denver");
    record37.set("team_flags", "{'home': '\ud83c\udde6\ud83c\uddfa', 'away': '\ud83c\uddf0\ud83c\uddf7'}");
    record37.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record37.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record37.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
  try {
    app.save(record37);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record38 = new Record(collection);
    record38.set("home_team", "Denmark");
    record38.set("away_team", "Australia");
    record38.set("match_date", "2026-06-23");
    record38.set("match_time", "18:00");
    record38.set("status", "upcoming");
    record38.set("stage", "Grupo G");
    record38.set("stadium_name", "Caesars Superdome, New Orleans");
    record38.set("team_flags", "{'home': '\ud83c\udde9\ud83c\uddf0', 'away': '\ud83c\udde6\ud83c\uddfa'}");
    record38.set("odds_match_winner", "{'home': 1.85, 'draw': 3.5, 'away': 4.2}");
    record38.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.9}");
    record38.set("odds_parlay", "{'home_and_over': 3.3, 'away_and_under': 6.0}");
  try {
    app.save(record38);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record39 = new Record(collection);
    record39.set("home_team", "Tunisia");
    record39.set("away_team", "South Korea");
    record39.set("match_date", "2026-06-23");
    record39.set("match_time", "21:00");
    record39.set("status", "upcoming");
    record39.set("stage", "Grupo G");
    record39.set("stadium_name", "Acrisure Stadium, Pittsburgh");
    record39.set("team_flags", "{'home': '\ud83c\uddf9\ud83c\uddf3', 'away': '\ud83c\uddf0\ud83c\uddf7'}");
    record39.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record39.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record39.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
  try {
    app.save(record39);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record40 = new Record(collection);
    record40.set("home_team", "Denmark");
    record40.set("away_team", "South Korea");
    record40.set("match_date", "2026-06-28");
    record40.set("match_time", "18:00");
    record40.set("status", "upcoming");
    record40.set("stage", "Grupo G");
    record40.set("stadium_name", "Gillette Stadium, Boston");
    record40.set("team_flags", "{'home': '\ud83c\udde9\ud83c\uddf0', 'away': '\ud83c\uddf0\ud83c\uddf7'}");
    record40.set("odds_match_winner", "{'home': 1.75, 'draw': 3.6, 'away': 4.5}");
    record40.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.88}");
    record40.set("odds_parlay", "{'home_and_over': 3.1, 'away_and_under': 6.5}");
  try {
    app.save(record40);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record41 = new Record(collection);
    record41.set("home_team", "Tunisia");
    record41.set("away_team", "Australia");
    record41.set("match_date", "2026-06-28");
    record41.set("match_time", "21:00");
    record41.set("status", "upcoming");
    record41.set("stage", "Grupo G");
    record41.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record41.set("team_flags", "{'home': '\ud83c\uddf9\ud83c\uddf3', 'away': '\ud83c\udde6\ud83c\uddfa'}");
    record41.set("odds_match_winner", "{'home': 2.15, 'draw': 3.2, 'away': 3.4}");
    record41.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record41.set("odds_parlay", "{'home_and_over': 3.9, 'away_and_under': 5.0}");
  try {
    app.save(record41);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record42 = new Record(collection);
    record42.set("home_team", "Croatia");
    record42.set("away_team", "Belgium");
    record42.set("match_date", "2026-06-19");
    record42.set("match_time", "18:00");
    record42.set("status", "upcoming");
    record42.set("stage", "Grupo H");
    record42.set("stadium_name", "Nissan Stadium, Nashville");
    record42.set("team_flags", "{'home': '\ud83c\udded\ud83c\uddf7', 'away': '\ud83c\udde7\ud83c\uddea'}");
    record42.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record42.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record42.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
  try {
    app.save(record42);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record43 = new Record(collection);
    record43.set("home_team", "Maroc");
    record43.set("away_team", "Canada");
    record43.set("match_date", "2026-06-19");
    record43.set("match_time", "21:00");
    record43.set("status", "upcoming");
    record43.set("stage", "Grupo H");
    record43.set("stadium_name", "Paycor Stadium, Cincinnati");
    record43.set("team_flags", "{'home': '\ud83c\uddf2\ud83c\udde6', 'away': '\ud83c\udde8\ud83c\udde6'}");
    record43.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 3.7}");
    record43.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.91}");
    record43.set("odds_parlay", "{'home_and_over': 3.6, 'away_and_under': 5.4}");
  try {
    app.save(record43);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record44 = new Record(collection);
    record44.set("home_team", "Croatia");
    record44.set("away_team", "Maroc");
    record44.set("match_date", "2026-06-24");
    record44.set("match_time", "18:00");
    record44.set("status", "upcoming");
    record44.set("stage", "Grupo H");
    record44.set("stadium_name", "Highmark Stadium, Buffalo");
    record44.set("team_flags", "{'home': '\ud83c\udded\ud83c\uddf7', 'away': '\ud83c\uddf2\ud83c\udde6'}");
    record44.set("odds_match_winner", "{'home': 1.9, 'draw': 3.4, 'away': 3.9}");
    record44.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.92}");
    record44.set("odds_parlay", "{'home_and_over': 3.4, 'away_and_under': 5.7}");
  try {
    app.save(record44);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record45 = new Record(collection);
    record45.set("home_team", "Belgium");
    record45.set("away_team", "Canada");
    record45.set("match_date", "2026-06-24");
    record45.set("match_time", "21:00");
    record45.set("status", "upcoming");
    record45.set("stage", "Grupo H");
    record45.set("stadium_name", "Hard Rock Stadium, Miami");
    record45.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddea', 'away': '\ud83c\udde8\ud83c\udde6'}");
    record45.set("odds_match_winner", "{'home': 2.05, 'draw': 3.3, 'away': 3.6}");
    record45.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.94}");
    record45.set("odds_parlay", "{'home_and_over': 3.7, 'away_and_under': 5.3}");
  try {
    app.save(record45);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record46 = new Record(collection);
    record46.set("home_team", "Croatia");
    record46.set("away_team", "Canada");
    record46.set("match_date", "2026-06-29");
    record46.set("match_time", "18:00");
    record46.set("status", "upcoming");
    record46.set("stage", "Grupo H");
    record46.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record46.set("team_flags", "{'home': '\ud83c\udded\ud83c\uddf7', 'away': '\ud83c\udde8\ud83c\udde6'}");
    record46.set("odds_match_winner", "{'home': 1.8, 'draw': 3.5, 'away': 4.3}");
    record46.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.89}");
    record46.set("odds_parlay", "{'home_and_over': 3.2, 'away_and_under': 6.2}");
  try {
    app.save(record46);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record47 = new Record(collection);
    record47.set("home_team", "Belgium");
    record47.set("away_team", "Maroc");
    record47.set("match_date", "2026-06-29");
    record47.set("match_time", "21:00");
    record47.set("status", "upcoming");
    record47.set("stage", "Grupo H");
    record47.set("stadium_name", "Levi's Stadium, San Francisco");
    record47.set("team_flags", "{'home': '\ud83c\udde7\ud83c\uddea', 'away': '\ud83c\uddf2\ud83c\udde6'}");
    record47.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 3.5}");
    record47.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.93}");
    record47.set("odds_parlay", "{'home_and_over': 3.8, 'away_and_under': 5.2}");
  try {
    app.save(record47);
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