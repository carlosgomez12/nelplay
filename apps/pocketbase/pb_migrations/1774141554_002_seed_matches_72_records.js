/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("matches");

  const record0 = new Record(collection);
    record0.set("home_team", "USA");
    record0.set("away_team", "Mexico");
    record0.set("match_date", "2026-06-12");
    record0.set("match_time", "14:00");
    record0.set("status", "upcoming");
    record0.set("odds_match_winner", "{'home': 1.95, 'draw': 3.4, 'away': 1.85}");
    record0.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record0.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record0.set("home_score", null);
    record0.set("away_score", null);
    record0.set("result", "pending");
    record0.set("team_flags", "{'home_flag': 'https://flagcdn.com/us.svg', 'away_flag': 'https://flagcdn.com/mx.svg'}");
    record0.set("stadium_name", "SoFi Stadium, Los Angeles");
    record0.set("stage", "Grupo A");
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
    record1.set("home_team", "Canada");
    record1.set("away_team", "Panama");
    record1.set("match_date", "2026-06-12");
    record1.set("match_time", "17:00");
    record1.set("status", "upcoming");
    record1.set("odds_match_winner", "{'home': 2.1, 'draw': 3.2, 'away': 1.75}");
    record1.set("odds_total_goals", "{'over_2_5': 1.85, 'under_2_5': 2.0}");
    record1.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record1.set("home_score", null);
    record1.set("away_score", null);
    record1.set("result", "pending");
    record1.set("team_flags", "{'home_flag': 'https://flagcdn.com/ca.svg', 'away_flag': 'https://flagcdn.com/pa.svg'}");
    record1.set("stadium_name", "BC Place, Vancouver");
    record1.set("stage", "Grupo A");
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
    record2.set("home_team", "Mexico");
    record2.set("away_team", "Panama");
    record2.set("match_date", "2026-06-16");
    record2.set("match_time", "15:00");
    record2.set("status", "upcoming");
    record2.set("odds_match_winner", "{'home': 1.65, 'draw': 3.5, 'away': 2.3}");
    record2.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record2.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record2.set("home_score", null);
    record2.set("away_score", null);
    record2.set("result", "pending");
    record2.set("team_flags", "{'home_flag': 'https://flagcdn.com/mx.svg', 'away_flag': 'https://flagcdn.com/pa.svg'}");
    record2.set("stadium_name", "Estadio Azteca, Mexico City");
    record2.set("stage", "Grupo A");
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
    record3.set("home_team", "USA");
    record3.set("away_team", "Canada");
    record3.set("match_date", "2026-06-16");
    record3.set("match_time", "18:00");
    record3.set("status", "upcoming");
    record3.set("odds_match_winner", "{'home': 1.88, 'draw': 3.3, 'away': 2.0}");
    record3.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record3.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record3.set("home_score", null);
    record3.set("away_score", null);
    record3.set("result", "pending");
    record3.set("team_flags", "{'home_flag': 'https://flagcdn.com/us.svg', 'away_flag': 'https://flagcdn.com/ca.svg'}");
    record3.set("stadium_name", "MetLife Stadium, New Jersey");
    record3.set("stage", "Grupo A");
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
    record4.set("home_team", "Panama");
    record4.set("away_team", "USA");
    record4.set("match_date", "2026-06-21");
    record4.set("match_time", "16:00");
    record4.set("status", "upcoming");
    record4.set("odds_match_winner", "{'home': 3.2, 'draw': 3.1, 'away': 1.55}");
    record4.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.9}");
    record4.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record4.set("home_score", null);
    record4.set("away_score", null);
    record4.set("result", "pending");
    record4.set("team_flags", "{'home_flag': 'https://flagcdn.com/pa.svg', 'away_flag': 'https://flagcdn.com/us.svg'}");
    record4.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record4.set("stage", "Grupo A");
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
    record5.set("home_team", "Mexico");
    record5.set("away_team", "Canada");
    record5.set("match_date", "2026-06-21");
    record5.set("match_time", "19:00");
    record5.set("status", "upcoming");
    record5.set("odds_match_winner", "{'home': 1.72, 'draw': 3.4, 'away': 2.15}");
    record5.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record5.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record5.set("home_score", null);
    record5.set("away_score", null);
    record5.set("result", "pending");
    record5.set("team_flags", "{'home_flag': 'https://flagcdn.com/mx.svg', 'away_flag': 'https://flagcdn.com/ca.svg'}");
    record5.set("stadium_name", "Estadio Azteca, Mexico City");
    record5.set("stage", "Grupo A");
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
    record6.set("away_team", "Paraguay");
    record6.set("match_date", "2026-06-13");
    record6.set("match_time", "14:00");
    record6.set("status", "upcoming");
    record6.set("odds_match_winner", "{'home': 1.45, 'draw': 3.8, 'away': 2.8}");
    record6.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record6.set("odds_parlay", "{'option1': 2.7, 'option2': 3.2}");
    record6.set("home_score", null);
    record6.set("away_score", null);
    record6.set("result", "pending");
    record6.set("team_flags", "{'home_flag': 'https://flagcdn.com/ar.svg', 'away_flag': 'https://flagcdn.com/py.svg'}");
    record6.set("stadium_name", "Levi's Stadium, San Francisco");
    record6.set("stage", "Grupo B");
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
    record7.set("home_team", "Peru");
    record7.set("away_team", "Bolivia");
    record7.set("match_date", "2026-06-13");
    record7.set("match_time", "17:00");
    record7.set("status", "upcoming");
    record7.set("odds_match_winner", "{'home': 1.8, 'draw': 3.3, 'away': 2.1}");
    record7.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record7.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record7.set("home_score", null);
    record7.set("away_score", null);
    record7.set("result", "pending");
    record7.set("team_flags", "{'home_flag': 'https://flagcdn.com/pe.svg', 'away_flag': 'https://flagcdn.com/bo.svg'}");
    record7.set("stadium_name", "Empower Field at Mile High, Denver");
    record7.set("stage", "Grupo B");
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
    record8.set("away_team", "Bolivia");
    record8.set("match_date", "2026-06-17");
    record8.set("match_time", "15:00");
    record8.set("status", "upcoming");
    record8.set("odds_match_winner", "{'home': 1.35, 'draw': 3.9, 'away': 3.2}");
    record8.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.9}");
    record8.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record8.set("home_score", null);
    record8.set("away_score", null);
    record8.set("result", "pending");
    record8.set("team_flags", "{'home_flag': 'https://flagcdn.com/ar.svg', 'away_flag': 'https://flagcdn.com/bo.svg'}");
    record8.set("stadium_name", "AT&T Stadium, Dallas");
    record8.set("stage", "Grupo B");
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
    record9.set("home_team", "Peru");
    record9.set("away_team", "Paraguay");
    record9.set("match_date", "2026-06-17");
    record9.set("match_time", "18:00");
    record9.set("status", "upcoming");
    record9.set("odds_match_winner", "{'home': 1.75, 'draw': 3.4, 'away': 2.2}");
    record9.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record9.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record9.set("home_score", null);
    record9.set("away_score", null);
    record9.set("result", "pending");
    record9.set("team_flags", "{'home_flag': 'https://flagcdn.com/pe.svg', 'away_flag': 'https://flagcdn.com/py.svg'}");
    record9.set("stadium_name", "Soldier Field, Chicago");
    record9.set("stage", "Grupo B");
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
    record10.set("home_team", "Bolivia");
    record10.set("away_team", "Argentina");
    record10.set("match_date", "2026-06-22");
    record10.set("match_time", "16:00");
    record10.set("status", "upcoming");
    record10.set("odds_match_winner", "{'home': 4.5, 'draw': 3.5, 'away': 1.3}");
    record10.set("odds_total_goals", "{'over_2_5': 1.93, 'under_2_5': 1.92}");
    record10.set("odds_parlay", "{'option1': 2.1, 'option2': 2.6}");
    record10.set("home_score", null);
    record10.set("away_score", null);
    record10.set("result", "pending");
    record10.set("team_flags", "{'home_flag': 'https://flagcdn.com/bo.svg', 'away_flag': 'https://flagcdn.com/ar.svg'}");
    record10.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record10.set("stage", "Grupo B");
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
    record11.set("home_team", "Paraguay");
    record11.set("away_team", "Peru");
    record11.set("match_date", "2026-06-22");
    record11.set("match_time", "19:00");
    record11.set("status", "upcoming");
    record11.set("odds_match_winner", "{'home': 2.3, 'draw': 3.2, 'away': 1.7}");
    record11.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record11.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record11.set("home_score", null);
    record11.set("away_score", null);
    record11.set("result", "pending");
    record11.set("team_flags", "{'home_flag': 'https://flagcdn.com/py.svg', 'away_flag': 'https://flagcdn.com/pe.svg'}");
    record11.set("stadium_name", "NRG Stadium, Houston");
    record11.set("stage", "Grupo B");
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
    record12.set("home_team", "Brazil");
    record12.set("away_team", "Costa Rica");
    record12.set("match_date", "2026-06-14");
    record12.set("match_time", "14:00");
    record12.set("status", "upcoming");
    record12.set("odds_match_winner", "{'home': 1.35, 'draw': 3.9, 'away': 3.1}");
    record12.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record12.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record12.set("home_score", null);
    record12.set("away_score", null);
    record12.set("result", "pending");
    record12.set("team_flags", "{'home_flag': 'https://flagcdn.com/br.svg', 'away_flag': 'https://flagcdn.com/cr.svg'}");
    record12.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record12.set("stage", "Grupo C");
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
    record13.set("home_team", "Serbia");
    record13.set("away_team", "Switzerland");
    record13.set("match_date", "2026-06-14");
    record13.set("match_time", "17:00");
    record13.set("status", "upcoming");
    record13.set("odds_match_winner", "{'home': 2.2, 'draw': 3.3, 'away': 1.8}");
    record13.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record13.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record13.set("home_score", null);
    record13.set("away_score", null);
    record13.set("result", "pending");
    record13.set("team_flags", "{'home_flag': 'https://flagcdn.com/rs.svg', 'away_flag': 'https://flagcdn.com/ch.svg'}");
    record13.set("stadium_name", "Levi's Stadium, San Francisco");
    record13.set("stage", "Grupo C");
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
    record14.set("home_team", "Brazil");
    record14.set("away_team", "Switzerland");
    record14.set("match_date", "2026-06-18");
    record14.set("match_time", "15:00");
    record14.set("status", "upcoming");
    record14.set("odds_match_winner", "{'home': 1.5, 'draw': 3.6, 'away': 2.6}");
    record14.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record14.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record14.set("home_score", null);
    record14.set("away_score", null);
    record14.set("result", "pending");
    record14.set("team_flags", "{'home_flag': 'https://flagcdn.com/br.svg', 'away_flag': 'https://flagcdn.com/ch.svg'}");
    record14.set("stadium_name", "MetLife Stadium, New Jersey");
    record14.set("stage", "Grupo C");
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
    record15.set("home_team", "Costa Rica");
    record15.set("away_team", "Serbia");
    record15.set("match_date", "2026-06-18");
    record15.set("match_time", "18:00");
    record15.set("status", "upcoming");
    record15.set("odds_match_winner", "{'home': 2.4, 'draw': 3.2, 'away': 1.65}");
    record15.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record15.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record15.set("home_score", null);
    record15.set("away_score", null);
    record15.set("result", "pending");
    record15.set("team_flags", "{'home_flag': 'https://flagcdn.com/cr.svg', 'away_flag': 'https://flagcdn.com/rs.svg'}");
    record15.set("stadium_name", "Empower Field at Mile High, Denver");
    record15.set("stage", "Grupo C");
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
    record16.set("home_team", "Switzerland");
    record16.set("away_team", "Costa Rica");
    record16.set("match_date", "2026-06-23");
    record16.set("match_time", "16:00");
    record16.set("status", "upcoming");
    record16.set("odds_match_winner", "{'home': 1.6, 'draw': 3.5, 'away': 2.4}");
    record16.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record16.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record16.set("home_score", null);
    record16.set("away_score", null);
    record16.set("result", "pending");
    record16.set("team_flags", "{'home_flag': 'https://flagcdn.com/ch.svg', 'away_flag': 'https://flagcdn.com/cr.svg'}");
    record16.set("stadium_name", "AT&T Stadium, Dallas");
    record16.set("stage", "Grupo C");
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
    record17.set("home_team", "Serbia");
    record17.set("away_team", "Brazil");
    record17.set("match_date", "2026-06-23");
    record17.set("match_time", "19:00");
    record17.set("status", "upcoming");
    record17.set("odds_match_winner", "{'home': 3.5, 'draw': 3.3, 'away': 1.4}");
    record17.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record17.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record17.set("home_score", null);
    record17.set("away_score", null);
    record17.set("result", "pending");
    record17.set("team_flags", "{'home_flag': 'https://flagcdn.com/rs.svg', 'away_flag': 'https://flagcdn.com/br.svg'}");
    record17.set("stadium_name", "Soldier Field, Chicago");
    record17.set("stage", "Grupo C");
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
    record18.set("home_team", "France");
    record18.set("away_team", "Netherlands");
    record18.set("match_date", "2026-06-15");
    record18.set("match_time", "14:00");
    record18.set("status", "upcoming");
    record18.set("odds_match_winner", "{'home': 1.8, 'draw': 3.4, 'away': 2.0}");
    record18.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record18.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record18.set("home_score", null);
    record18.set("away_score", null);
    record18.set("result", "pending");
    record18.set("team_flags", "{'home_flag': 'https://flagcdn.com/fr.svg', 'away_flag': 'https://flagcdn.com/nl.svg'}");
    record18.set("stadium_name", "SoFi Stadium, Los Angeles");
    record18.set("stage", "Grupo D");
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
    record19.set("home_team", "Poland");
    record19.set("away_team", "Senegal");
    record19.set("match_date", "2026-06-15");
    record19.set("match_time", "17:00");
    record19.set("status", "upcoming");
    record19.set("odds_match_winner", "{'home': 1.95, 'draw': 3.3, 'away': 1.85}");
    record19.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record19.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record19.set("home_score", null);
    record19.set("away_score", null);
    record19.set("result", "pending");
    record19.set("team_flags", "{'home_flag': 'https://flagcdn.com/pl.svg', 'away_flag': 'https://flagcdn.com/sn.svg'}");
    record19.set("stadium_name", "BC Place, Vancouver");
    record19.set("stage", "Grupo D");
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
    record20.set("home_team", "France");
    record20.set("away_team", "Senegal");
    record20.set("match_date", "2026-06-19");
    record20.set("match_time", "15:00");
    record20.set("status", "upcoming");
    record20.set("odds_match_winner", "{'home': 1.55, 'draw': 3.6, 'away': 2.5}");
    record20.set("odds_total_goals", "{'over_2_5': 1.93, 'under_2_5': 1.92}");
    record20.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record20.set("home_score", null);
    record20.set("away_score", null);
    record20.set("result", "pending");
    record20.set("team_flags", "{'home_flag': 'https://flagcdn.com/fr.svg', 'away_flag': 'https://flagcdn.com/sn.svg'}");
    record20.set("stadium_name", "Estadio Azteca, Mexico City");
    record20.set("stage", "Grupo D");
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
    record21.set("home_team", "Netherlands");
    record21.set("away_team", "Poland");
    record21.set("match_date", "2026-06-19");
    record21.set("match_time", "18:00");
    record21.set("status", "upcoming");
    record21.set("odds_match_winner", "{'home': 1.7, 'draw': 3.4, 'away': 2.2}");
    record21.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record21.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record21.set("home_score", null);
    record21.set("away_score", null);
    record21.set("result", "pending");
    record21.set("team_flags", "{'home_flag': 'https://flagcdn.com/nl.svg', 'away_flag': 'https://flagcdn.com/pl.svg'}");
    record21.set("stadium_name", "Arrowhead Stadium, Kansas City");
    record21.set("stage", "Grupo D");
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
    record22.set("home_team", "Senegal");
    record22.set("away_team", "France");
    record22.set("match_date", "2026-06-24");
    record22.set("match_time", "16:00");
    record22.set("status", "upcoming");
    record22.set("odds_match_winner", "{'home': 3.8, 'draw': 3.2, 'away': 1.35}");
    record22.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record22.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record22.set("home_score", null);
    record22.set("away_score", null);
    record22.set("result", "pending");
    record22.set("team_flags", "{'home_flag': 'https://flagcdn.com/sn.svg', 'away_flag': 'https://flagcdn.com/fr.svg'}");
    record22.set("stadium_name", "NRG Stadium, Houston");
    record22.set("stage", "Grupo D");
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
    record23.set("home_team", "Poland");
    record23.set("away_team", "Netherlands");
    record23.set("match_date", "2026-06-24");
    record23.set("match_time", "19:00");
    record23.set("status", "upcoming");
    record23.set("odds_match_winner", "{'home': 2.3, 'draw': 3.2, 'away': 1.7}");
    record23.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record23.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record23.set("home_score", null);
    record23.set("away_score", null);
    record23.set("result", "pending");
    record23.set("team_flags", "{'home_flag': 'https://flagcdn.com/pl.svg', 'away_flag': 'https://flagcdn.com/nl.svg'}");
    record23.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record23.set("stage", "Grupo D");
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
    record24.set("home_team", "Spain");
    record24.set("away_team", "Germany");
    record24.set("match_date", "2026-06-20");
    record24.set("match_time", "14:00");
    record24.set("status", "upcoming");
    record24.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record24.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record24.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record24.set("home_score", null);
    record24.set("away_score", null);
    record24.set("result", "pending");
    record24.set("team_flags", "{'home_flag': 'https://flagcdn.com/es.svg', 'away_flag': 'https://flagcdn.com/de.svg'}");
    record24.set("stadium_name", "Levi's Stadium, San Francisco");
    record24.set("stage", "Grupo E");
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
    record25.set("home_team", "Japan");
    record25.set("away_team", "Morocco");
    record25.set("match_date", "2026-06-20");
    record25.set("match_time", "17:00");
    record25.set("status", "upcoming");
    record25.set("odds_match_winner", "{'home': 1.85, 'draw': 3.3, 'away': 2.0}");
    record25.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record25.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record25.set("home_score", null);
    record25.set("away_score", null);
    record25.set("result", "pending");
    record25.set("team_flags", "{'home_flag': 'https://flagcdn.com/jp.svg', 'away_flag': 'https://flagcdn.com/ma.svg'}");
    record25.set("stadium_name", "MetLife Stadium, New Jersey");
    record25.set("stage", "Grupo E");
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
    record26.set("home_team", "Spain");
    record26.set("away_team", "Morocco");
    record26.set("match_date", "2026-06-25");
    record26.set("match_time", "15:00");
    record26.set("status", "upcoming");
    record26.set("odds_match_winner", "{'home': 1.65, 'draw': 3.5, 'away': 2.3}");
    record26.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record26.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record26.set("home_score", null);
    record26.set("away_score", null);
    record26.set("result", "pending");
    record26.set("team_flags", "{'home_flag': 'https://flagcdn.com/es.svg', 'away_flag': 'https://flagcdn.com/ma.svg'}");
    record26.set("stadium_name", "Empower Field at Mile High, Denver");
    record26.set("stage", "Grupo E");
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
    record27.set("home_team", "Germany");
    record27.set("away_team", "Japan");
    record27.set("match_date", "2026-06-25");
    record27.set("match_time", "18:00");
    record27.set("status", "upcoming");
    record27.set("odds_match_winner", "{'home': 1.75, 'draw': 3.4, 'away': 2.2}");
    record27.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record27.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record27.set("home_score", null);
    record27.set("away_score", null);
    record27.set("result", "pending");
    record27.set("team_flags", "{'home_flag': 'https://flagcdn.com/de.svg', 'away_flag': 'https://flagcdn.com/jp.svg'}");
    record27.set("stadium_name", "AT&T Stadium, Dallas");
    record27.set("stage", "Grupo E");
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
    record28.set("home_team", "Morocco");
    record28.set("away_team", "Spain");
    record28.set("match_date", "2026-06-30");
    record28.set("match_time", "16:00");
    record28.set("status", "upcoming");
    record28.set("odds_match_winner", "{'home': 2.8, 'draw': 3.3, 'away': 1.5}");
    record28.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record28.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record28.set("home_score", null);
    record28.set("away_score", null);
    record28.set("result", "pending");
    record28.set("team_flags", "{'home_flag': 'https://flagcdn.com/ma.svg', 'away_flag': 'https://flagcdn.com/es.svg'}");
    record28.set("stadium_name", "Soldier Field, Chicago");
    record28.set("stage", "Grupo E");
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
    record29.set("home_team", "Japan");
    record29.set("away_team", "Germany");
    record29.set("match_date", "2026-06-30");
    record29.set("match_time", "19:00");
    record29.set("status", "upcoming");
    record29.set("odds_match_winner", "{'home': 2.5, 'draw': 3.2, 'away': 1.6}");
    record29.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record29.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record29.set("home_score", null);
    record29.set("away_score", null);
    record29.set("result", "pending");
    record29.set("team_flags", "{'home_flag': 'https://flagcdn.com/jp.svg', 'away_flag': 'https://flagcdn.com/de.svg'}");
    record29.set("stadium_name", "NRG Stadium, Houston");
    record29.set("stage", "Grupo E");
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
    record30.set("home_team", "England");
    record30.set("away_team", "Iran");
    record30.set("match_date", "2026-06-21");
    record30.set("match_time", "14:00");
    record30.set("status", "upcoming");
    record30.set("odds_match_winner", "{'home': 1.3, 'draw': 4.0, 'away': 3.5}");
    record30.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.9}");
    record30.set("odds_parlay", "{'option1': 2.7, 'option2': 3.2}");
    record30.set("home_score", null);
    record30.set("away_score", null);
    record30.set("result", "pending");
    record30.set("team_flags", "{'home_flag': 'https://flagcdn.com/gb.svg', 'away_flag': 'https://flagcdn.com/ir.svg'}");
    record30.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record30.set("stage", "Grupo F");
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
    record31.set("home_team", "Wales");
    record31.set("away_team", "Ukraine");
    record31.set("match_date", "2026-06-21");
    record31.set("match_time", "17:00");
    record31.set("status", "upcoming");
    record31.set("odds_match_winner", "{'home': 1.9, 'draw': 3.3, 'away': 1.95}");
    record31.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record31.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record31.set("home_score", null);
    record31.set("away_score", null);
    record31.set("result", "pending");
    record31.set("team_flags", "{'home_flag': 'https://flagcdn.com/gb-wls.svg', 'away_flag': 'https://flagcdn.com/ua.svg'}");
    record31.set("stadium_name", "Levi's Stadium, San Francisco");
    record31.set("stage", "Grupo F");
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
    record32.set("home_team", "England");
    record32.set("away_team", "Ukraine");
    record32.set("match_date", "2026-06-26");
    record32.set("match_time", "15:00");
    record32.set("status", "upcoming");
    record32.set("odds_match_winner", "{'home': 1.45, 'draw': 3.8, 'away': 2.8}");
    record32.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record32.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record32.set("home_score", null);
    record32.set("away_score", null);
    record32.set("result", "pending");
    record32.set("team_flags", "{'home_flag': 'https://flagcdn.com/gb.svg', 'away_flag': 'https://flagcdn.com/ua.svg'}");
    record32.set("stadium_name", "MetLife Stadium, New Jersey");
    record32.set("stage", "Grupo F");
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
    record33.set("home_team", "Iran");
    record33.set("away_team", "Wales");
    record33.set("match_date", "2026-06-26");
    record33.set("match_time", "18:00");
    record33.set("status", "upcoming");
    record33.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record33.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record33.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record33.set("home_score", null);
    record33.set("away_score", null);
    record33.set("result", "pending");
    record33.set("team_flags", "{'home_flag': 'https://flagcdn.com/ir.svg', 'away_flag': 'https://flagcdn.com/gb-wls.svg'}");
    record33.set("stadium_name", "Empower Field at Mile High, Denver");
    record33.set("stage", "Grupo F");
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
    record34.set("home_team", "Ukraine");
    record34.set("away_team", "England");
    record34.set("match_date", "2026-07-01");
    record34.set("match_time", "16:00");
    record34.set("status", "upcoming");
    record34.set("odds_match_winner", "{'home': 3.2, 'draw': 3.2, 'away': 1.5}");
    record34.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record34.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record34.set("home_score", null);
    record34.set("away_score", null);
    record34.set("result", "pending");
    record34.set("team_flags", "{'home_flag': 'https://flagcdn.com/ua.svg', 'away_flag': 'https://flagcdn.com/gb.svg'}");
    record34.set("stadium_name", "AT&T Stadium, Dallas");
    record34.set("stage", "Grupo F");
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
    record35.set("home_team", "Iran");
    record35.set("away_team", "Wales");
    record35.set("match_date", "2026-07-01");
    record35.set("match_time", "19:00");
    record35.set("status", "upcoming");
    record35.set("odds_match_winner", "{'home': 2.2, 'draw': 3.3, 'away': 1.75}");
    record35.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record35.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record35.set("home_score", null);
    record35.set("away_score", null);
    record35.set("result", "pending");
    record35.set("team_flags", "{'home_flag': 'https://flagcdn.com/ir.svg', 'away_flag': 'https://flagcdn.com/gb-wls.svg'}");
    record35.set("stadium_name", "Soldier Field, Chicago");
    record35.set("stage", "Grupo F");
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
    record36.set("home_team", "Belgium");
    record36.set("away_team", "Canada");
    record36.set("match_date", "2026-06-22");
    record36.set("match_time", "14:00");
    record36.set("status", "upcoming");
    record36.set("odds_match_winner", "{'home': 1.5, 'draw': 3.6, 'away': 2.6}");
    record36.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record36.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record36.set("home_score", null);
    record36.set("away_score", null);
    record36.set("result", "pending");
    record36.set("team_flags", "{'home_flag': 'https://flagcdn.com/be.svg', 'away_flag': 'https://flagcdn.com/ca.svg'}");
    record36.set("stadium_name", "NRG Stadium, Houston");
    record36.set("stage", "Grupo G");
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
    record37.set("home_team", "Morocco");
    record37.set("away_team", "Croatia");
    record37.set("match_date", "2026-06-22");
    record37.set("match_time", "17:00");
    record37.set("status", "upcoming");
    record37.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 1.9}");
    record37.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record37.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record37.set("home_score", null);
    record37.set("away_score", null);
    record37.set("result", "pending");
    record37.set("team_flags", "{'home_flag': 'https://flagcdn.com/ma.svg', 'away_flag': 'https://flagcdn.com/hr.svg'}");
    record37.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record37.set("stage", "Grupo G");
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
    record38.set("home_team", "Belgium");
    record38.set("away_team", "Croatia");
    record38.set("match_date", "2026-06-27");
    record38.set("match_time", "15:00");
    record38.set("status", "upcoming");
    record38.set("odds_match_winner", "{'home': 1.8, 'draw': 3.4, 'away': 2.0}");
    record38.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record38.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record38.set("home_score", null);
    record38.set("away_score", null);
    record38.set("result", "pending");
    record38.set("team_flags", "{'home_flag': 'https://flagcdn.com/be.svg', 'away_flag': 'https://flagcdn.com/hr.svg'}");
    record38.set("stadium_name", "Levi's Stadium, San Francisco");
    record38.set("stage", "Grupo G");
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
    record39.set("home_team", "Canada");
    record39.set("away_team", "Morocco");
    record39.set("match_date", "2026-06-27");
    record39.set("match_time", "18:00");
    record39.set("status", "upcoming");
    record39.set("odds_match_winner", "{'home': 2.2, 'draw': 3.2, 'away': 1.75}");
    record39.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record39.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record39.set("home_score", null);
    record39.set("away_score", null);
    record39.set("result", "pending");
    record39.set("team_flags", "{'home_flag': 'https://flagcdn.com/ca.svg', 'away_flag': 'https://flagcdn.com/ma.svg'}");
    record39.set("stadium_name", "MetLife Stadium, New Jersey");
    record39.set("stage", "Grupo G");
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
    record40.set("home_team", "Croatia");
    record40.set("away_team", "Belgium");
    record40.set("match_date", "2026-07-02");
    record40.set("match_time", "16:00");
    record40.set("status", "upcoming");
    record40.set("odds_match_winner", "{'home': 2.3, 'draw': 3.2, 'away': 1.7}");
    record40.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record40.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record40.set("home_score", null);
    record40.set("away_score", null);
    record40.set("result", "pending");
    record40.set("team_flags", "{'home_flag': 'https://flagcdn.com/hr.svg', 'away_flag': 'https://flagcdn.com/be.svg'}");
    record40.set("stadium_name", "Empower Field at Mile High, Denver");
    record40.set("stage", "Grupo G");
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
    record41.set("home_team", "Canada");
    record41.set("away_team", "Morocco");
    record41.set("match_date", "2026-07-02");
    record41.set("match_time", "19:00");
    record41.set("status", "upcoming");
    record41.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record41.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record41.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record41.set("home_score", null);
    record41.set("away_score", null);
    record41.set("result", "pending");
    record41.set("team_flags", "{'home_flag': 'https://flagcdn.com/ca.svg', 'away_flag': 'https://flagcdn.com/ma.svg'}");
    record41.set("stadium_name", "AT&T Stadium, Dallas");
    record41.set("stage", "Grupo G");
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
    record42.set("home_team", "Italy");
    record42.set("away_team", "Ecuador");
    record42.set("match_date", "2026-06-23");
    record42.set("match_time", "14:00");
    record42.set("status", "upcoming");
    record42.set("odds_match_winner", "{'home': 1.6, 'draw': 3.5, 'away': 2.4}");
    record42.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record42.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record42.set("home_score", null);
    record42.set("away_score", null);
    record42.set("result", "pending");
    record42.set("team_flags", "{'home_flag': 'https://flagcdn.com/it.svg', 'away_flag': 'https://flagcdn.com/ec.svg'}");
    record42.set("stadium_name", "Soldier Field, Chicago");
    record42.set("stage", "Grupo H");
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
    record43.set("home_team", "Cameroon");
    record43.set("away_team", "Vietnam");
    record43.set("match_date", "2026-06-23");
    record43.set("match_time", "17:00");
    record43.set("status", "upcoming");
    record43.set("odds_match_winner", "{'home': 1.75, 'draw': 3.4, 'away': 2.2}");
    record43.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record43.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record43.set("home_score", null);
    record43.set("away_score", null);
    record43.set("result", "pending");
    record43.set("team_flags", "{'home_flag': 'https://flagcdn.com/cm.svg', 'away_flag': 'https://flagcdn.com/vn.svg'}");
    record43.set("stadium_name", "NRG Stadium, Houston");
    record43.set("stage", "Grupo H");
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
    record44.set("home_team", "Italy");
    record44.set("away_team", "Vietnam");
    record44.set("match_date", "2026-06-28");
    record44.set("match_time", "15:00");
    record44.set("status", "upcoming");
    record44.set("odds_match_winner", "{'home': 1.35, 'draw': 3.9, 'away': 3.2}");
    record44.set("odds_total_goals", "{'over_2_5': 1.95, 'under_2_5': 1.9}");
    record44.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record44.set("home_score", null);
    record44.set("away_score", null);
    record44.set("result", "pending");
    record44.set("team_flags", "{'home_flag': 'https://flagcdn.com/it.svg', 'away_flag': 'https://flagcdn.com/vn.svg'}");
    record44.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record44.set("stage", "Grupo H");
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
    record45.set("home_team", "Ecuador");
    record45.set("away_team", "Cameroon");
    record45.set("match_date", "2026-06-28");
    record45.set("match_time", "18:00");
    record45.set("status", "upcoming");
    record45.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 1.9}");
    record45.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record45.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record45.set("home_score", null);
    record45.set("away_score", null);
    record45.set("result", "pending");
    record45.set("team_flags", "{'home_flag': 'https://flagcdn.com/ec.svg', 'away_flag': 'https://flagcdn.com/cm.svg'}");
    record45.set("stadium_name", "Levi's Stadium, San Francisco");
    record45.set("stage", "Grupo H");
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
    record46.set("home_team", "Vietnam");
    record46.set("away_team", "Italy");
    record46.set("match_date", "2026-07-03");
    record46.set("match_time", "16:00");
    record46.set("status", "upcoming");
    record46.set("odds_match_winner", "{'home': 4.0, 'draw': 3.4, 'away': 1.35}");
    record46.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record46.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record46.set("home_score", null);
    record46.set("away_score", null);
    record46.set("result", "pending");
    record46.set("team_flags", "{'home_flag': 'https://flagcdn.com/vn.svg', 'away_flag': 'https://flagcdn.com/it.svg'}");
    record46.set("stadium_name", "MetLife Stadium, New Jersey");
    record46.set("stage", "Grupo H");
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
    record47.set("home_team", "Cameroon");
    record47.set("away_team", "Ecuador");
    record47.set("match_date", "2026-07-03");
    record47.set("match_time", "19:00");
    record47.set("status", "upcoming");
    record47.set("odds_match_winner", "{'home': 2.2, 'draw': 3.3, 'away': 1.75}");
    record47.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record47.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record47.set("home_score", null);
    record47.set("away_score", null);
    record47.set("result", "pending");
    record47.set("team_flags", "{'home_flag': 'https://flagcdn.com/cm.svg', 'away_flag': 'https://flagcdn.com/ec.svg'}");
    record47.set("stadium_name", "Empower Field at Mile High, Denver");
    record47.set("stage", "Grupo H");
  try {
    app.save(record47);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record48 = new Record(collection);
    record48.set("home_team", "Portugal");
    record48.set("away_team", "Czech Republic");
    record48.set("match_date", "2026-06-24");
    record48.set("match_time", "14:00");
    record48.set("status", "upcoming");
    record48.set("odds_match_winner", "{'home': 1.7, 'draw': 3.4, 'away': 2.2}");
    record48.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record48.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record48.set("home_score", null);
    record48.set("away_score", null);
    record48.set("result", "pending");
    record48.set("team_flags", "{'home_flag': 'https://flagcdn.com/pt.svg', 'away_flag': 'https://flagcdn.com/cz.svg'}");
    record48.set("stadium_name", "AT&T Stadium, Dallas");
    record48.set("stage", "Grupo I");
  try {
    app.save(record48);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record49 = new Record(collection);
    record49.set("home_team", "Turkey");
    record49.set("away_team", "Georgia");
    record49.set("match_date", "2026-06-24");
    record49.set("match_time", "17:00");
    record49.set("status", "upcoming");
    record49.set("odds_match_winner", "{'home': 1.85, 'draw': 3.3, 'away': 2.0}");
    record49.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record49.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record49.set("home_score", null);
    record49.set("away_score", null);
    record49.set("result", "pending");
    record49.set("team_flags", "{'home_flag': 'https://flagcdn.com/tr.svg', 'away_flag': 'https://flagcdn.com/ge.svg'}");
    record49.set("stadium_name", "Soldier Field, Chicago");
    record49.set("stage", "Grupo I");
  try {
    app.save(record49);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record50 = new Record(collection);
    record50.set("home_team", "Portugal");
    record50.set("away_team", "Georgia");
    record50.set("match_date", "2026-06-29");
    record50.set("match_time", "15:00");
    record50.set("status", "upcoming");
    record50.set("odds_match_winner", "{'home': 1.5, 'draw': 3.6, 'away': 2.6}");
    record50.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record50.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record50.set("home_score", null);
    record50.set("away_score", null);
    record50.set("result", "pending");
    record50.set("team_flags", "{'home_flag': 'https://flagcdn.com/pt.svg', 'away_flag': 'https://flagcdn.com/ge.svg'}");
    record50.set("stadium_name", "NRG Stadium, Houston");
    record50.set("stage", "Grupo I");
  try {
    app.save(record50);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record51 = new Record(collection);
    record51.set("home_team", "Czech Republic");
    record51.set("away_team", "Turkey");
    record51.set("match_date", "2026-06-29");
    record51.set("match_time", "18:00");
    record51.set("status", "upcoming");
    record51.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record51.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record51.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record51.set("home_score", null);
    record51.set("away_score", null);
    record51.set("result", "pending");
    record51.set("team_flags", "{'home_flag': 'https://flagcdn.com/cz.svg', 'away_flag': 'https://flagcdn.com/tr.svg'}");
    record51.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record51.set("stage", "Grupo I");
  try {
    app.save(record51);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record52 = new Record(collection);
    record52.set("home_team", "Georgia");
    record52.set("away_team", "Portugal");
    record52.set("match_date", "2026-07-04");
    record52.set("match_time", "16:00");
    record52.set("status", "upcoming");
    record52.set("odds_match_winner", "{'home': 3.5, 'draw': 3.3, 'away': 1.4}");
    record52.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record52.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record52.set("home_score", null);
    record52.set("away_score", null);
    record52.set("result", "pending");
    record52.set("team_flags", "{'home_flag': 'https://flagcdn.com/ge.svg', 'away_flag': 'https://flagcdn.com/pt.svg'}");
    record52.set("stadium_name", "Levi's Stadium, San Francisco");
    record52.set("stage", "Grupo I");
  try {
    app.save(record52);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record53 = new Record(collection);
    record53.set("home_team", "Turkey");
    record53.set("away_team", "Czech Republic");
    record53.set("match_date", "2026-07-04");
    record53.set("match_time", "19:00");
    record53.set("status", "upcoming");
    record53.set("odds_match_winner", "{'home': 1.95, 'draw': 3.3, 'away': 1.85}");
    record53.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record53.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record53.set("home_score", null);
    record53.set("away_score", null);
    record53.set("result", "pending");
    record53.set("team_flags", "{'home_flag': 'https://flagcdn.com/tr.svg', 'away_flag': 'https://flagcdn.com/cz.svg'}");
    record53.set("stadium_name", "MetLife Stadium, New Jersey");
    record53.set("stage", "Grupo I");
  try {
    app.save(record53);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record54 = new Record(collection);
    record54.set("home_team", "Denmark");
    record54.set("away_team", "Tunisia");
    record54.set("match_date", "2026-06-25");
    record54.set("match_time", "14:00");
    record54.set("status", "upcoming");
    record54.set("odds_match_winner", "{'home': 1.55, 'draw': 3.6, 'away': 2.5}");
    record54.set("odds_total_goals", "{'over_2_5': 1.93, 'under_2_5': 1.92}");
    record54.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record54.set("home_score", null);
    record54.set("away_score", null);
    record54.set("result", "pending");
    record54.set("team_flags", "{'home_flag': 'https://flagcdn.com/dk.svg', 'away_flag': 'https://flagcdn.com/tn.svg'}");
    record54.set("stadium_name", "Empower Field at Mile High, Denver");
    record54.set("stage", "Grupo J");
  try {
    app.save(record54);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record55 = new Record(collection);
    record55.set("home_team", "Australia");
    record55.set("away_team", "Norway");
    record55.set("match_date", "2026-06-25");
    record55.set("match_time", "17:00");
    record55.set("status", "upcoming");
    record55.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 1.9}");
    record55.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record55.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record55.set("home_score", null);
    record55.set("away_score", null);
    record55.set("result", "pending");
    record55.set("team_flags", "{'home_flag': 'https://flagcdn.com/au.svg', 'away_flag': 'https://flagcdn.com/no.svg'}");
    record55.set("stadium_name", "AT&T Stadium, Dallas");
    record55.set("stage", "Grupo J");
  try {
    app.save(record55);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record56 = new Record(collection);
    record56.set("home_team", "Denmark");
    record56.set("away_team", "Norway");
    record56.set("match_date", "2026-06-30");
    record56.set("match_time", "15:00");
    record56.set("status", "upcoming");
    record56.set("odds_match_winner", "{'home': 1.65, 'draw': 3.5, 'away': 2.3}");
    record56.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record56.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record56.set("home_score", null);
    record56.set("away_score", null);
    record56.set("result", "pending");
    record56.set("team_flags", "{'home_flag': 'https://flagcdn.com/dk.svg', 'away_flag': 'https://flagcdn.com/no.svg'}");
    record56.set("stadium_name", "Soldier Field, Chicago");
    record56.set("stage", "Grupo J");
  try {
    app.save(record56);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record57 = new Record(collection);
    record57.set("home_team", "Tunisia");
    record57.set("away_team", "Australia");
    record57.set("match_date", "2026-06-30");
    record57.set("match_time", "18:00");
    record57.set("status", "upcoming");
    record57.set("odds_match_winner", "{'home': 2.3, 'draw': 3.2, 'away': 1.7}");
    record57.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record57.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record57.set("home_score", null);
    record57.set("away_score", null);
    record57.set("result", "pending");
    record57.set("team_flags", "{'home_flag': 'https://flagcdn.com/tn.svg', 'away_flag': 'https://flagcdn.com/au.svg'}");
    record57.set("stadium_name", "NRG Stadium, Houston");
    record57.set("stage", "Grupo J");
  try {
    app.save(record57);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record58 = new Record(collection);
    record58.set("home_team", "Norway");
    record58.set("away_team", "Denmark");
    record58.set("match_date", "2026-07-05");
    record58.set("match_time", "16:00");
    record58.set("status", "upcoming");
    record58.set("odds_match_winner", "{'home': 2.8, 'draw': 3.3, 'away': 1.5}");
    record58.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record58.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record58.set("home_score", null);
    record58.set("away_score", null);
    record58.set("result", "pending");
    record58.set("team_flags", "{'home_flag': 'https://flagcdn.com/no.svg', 'away_flag': 'https://flagcdn.com/dk.svg'}");
    record58.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record58.set("stage", "Grupo J");
  try {
    app.save(record58);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record59 = new Record(collection);
    record59.set("home_team", "Australia");
    record59.set("away_team", "Tunisia");
    record59.set("match_date", "2026-07-05");
    record59.set("match_time", "19:00");
    record59.set("status", "upcoming");
    record59.set("odds_match_winner", "{'home': 1.8, 'draw': 3.4, 'away': 2.0}");
    record59.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record59.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record59.set("home_score", null);
    record59.set("away_score", null);
    record59.set("result", "pending");
    record59.set("team_flags", "{'home_flag': 'https://flagcdn.com/au.svg', 'away_flag': 'https://flagcdn.com/tn.svg'}");
    record59.set("stadium_name", "Levi's Stadium, San Francisco");
    record59.set("stage", "Grupo J");
  try {
    app.save(record59);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record60 = new Record(collection);
    record60.set("home_team", "Uruguay");
    record60.set("away_team", "South Korea");
    record60.set("match_date", "2026-06-26");
    record60.set("match_time", "14:00");
    record60.set("status", "upcoming");
    record60.set("odds_match_winner", "{'home': 1.75, 'draw': 3.4, 'away': 2.2}");
    record60.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record60.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record60.set("home_score", null);
    record60.set("away_score", null);
    record60.set("result", "pending");
    record60.set("team_flags", "{'home_flag': 'https://flagcdn.com/uy.svg', 'away_flag': 'https://flagcdn.com/kr.svg'}");
    record60.set("stadium_name", "MetLife Stadium, New Jersey");
    record60.set("stage", "Grupo K");
  try {
    app.save(record60);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record61 = new Record(collection);
    record61.set("home_team", "Greece");
    record61.set("away_team", "Slovenia");
    record61.set("match_date", "2026-06-26");
    record61.set("match_time", "17:00");
    record61.set("status", "upcoming");
    record61.set("odds_match_winner", "{'home': 1.9, 'draw': 3.3, 'away': 1.95}");
    record61.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record61.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record61.set("home_score", null);
    record61.set("away_score", null);
    record61.set("result", "pending");
    record61.set("team_flags", "{'home_flag': 'https://flagcdn.com/gr.svg', 'away_flag': 'https://flagcdn.com/si.svg'}");
    record61.set("stadium_name", "Empower Field at Mile High, Denver");
    record61.set("stage", "Grupo K");
  try {
    app.save(record61);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record62 = new Record(collection);
    record62.set("home_team", "Uruguay");
    record62.set("away_team", "Slovenia");
    record62.set("match_date", "2026-07-01");
    record62.set("match_time", "15:00");
    record62.set("status", "upcoming");
    record62.set("odds_match_winner", "{'home': 1.6, 'draw': 3.5, 'away': 2.4}");
    record62.set("odds_total_goals", "{'over_2_5': 1.92, 'under_2_5': 1.93}");
    record62.set("odds_parlay", "{'option1': 2.5, 'option2': 3.0}");
    record62.set("home_score", null);
    record62.set("away_score", null);
    record62.set("result", "pending");
    record62.set("team_flags", "{'home_flag': 'https://flagcdn.com/uy.svg', 'away_flag': 'https://flagcdn.com/si.svg'}");
    record62.set("stadium_name", "AT&T Stadium, Dallas");
    record62.set("stage", "Grupo K");
  try {
    app.save(record62);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record63 = new Record(collection);
    record63.set("home_team", "South Korea");
    record63.set("away_team", "Greece");
    record63.set("match_date", "2026-07-01");
    record63.set("match_time", "18:00");
    record63.set("status", "upcoming");
    record63.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record63.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record63.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record63.set("home_score", null);
    record63.set("away_score", null);
    record63.set("result", "pending");
    record63.set("team_flags", "{'home_flag': 'https://flagcdn.com/kr.svg', 'away_flag': 'https://flagcdn.com/gr.svg'}");
    record63.set("stadium_name", "Soldier Field, Chicago");
    record63.set("stage", "Grupo K");
  try {
    app.save(record63);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record64 = new Record(collection);
    record64.set("home_team", "Slovenia");
    record64.set("away_team", "Uruguay");
    record64.set("match_date", "2026-07-06");
    record64.set("match_time", "16:00");
    record64.set("status", "upcoming");
    record64.set("odds_match_winner", "{'home': 3.2, 'draw': 3.2, 'away': 1.5}");
    record64.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record64.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record64.set("home_score", null);
    record64.set("away_score", null);
    record64.set("result", "pending");
    record64.set("team_flags", "{'home_flag': 'https://flagcdn.com/si.svg', 'away_flag': 'https://flagcdn.com/uy.svg'}");
    record64.set("stadium_name", "NRG Stadium, Houston");
    record64.set("stage", "Grupo K");
  try {
    app.save(record64);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record65 = new Record(collection);
    record65.set("home_team", "Greece");
    record65.set("away_team", "South Korea");
    record65.set("match_date", "2026-07-06");
    record65.set("match_time", "19:00");
    record65.set("status", "upcoming");
    record65.set("odds_match_winner", "{'home': 2.0, 'draw': 3.3, 'away': 1.9}");
    record65.set("odds_total_goals", "{'over_2_5': 1.87, 'under_2_5': 1.98}");
    record65.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record65.set("home_score", null);
    record65.set("away_score", null);
    record65.set("result", "pending");
    record65.set("team_flags", "{'home_flag': 'https://flagcdn.com/gr.svg', 'away_flag': 'https://flagcdn.com/kr.svg'}");
    record65.set("stadium_name", "Allegiant Stadium, Las Vegas");
    record65.set("stage", "Grupo K");
  try {
    app.save(record65);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record66 = new Record(collection);
    record66.set("home_team", "Netherlands");
    record66.set("away_team", "Uzbekistan");
    record66.set("match_date", "2026-06-27");
    record66.set("match_time", "14:00");
    record66.set("status", "upcoming");
    record66.set("odds_match_winner", "{'home': 1.4, 'draw': 3.8, 'away': 2.9}");
    record66.set("odds_total_goals", "{'over_2_5': 1.93, 'under_2_5': 1.92}");
    record66.set("odds_parlay", "{'option1': 2.6, 'option2': 3.1}");
    record66.set("home_score", null);
    record66.set("away_score", null);
    record66.set("result", "pending");
    record66.set("team_flags", "{'home_flag': 'https://flagcdn.com/nl.svg', 'away_flag': 'https://flagcdn.com/uz.svg'}");
    record66.set("stadium_name", "Levi's Stadium, San Francisco");
    record66.set("stage", "Grupo L");
  try {
    app.save(record66);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record67 = new Record(collection);
    record67.set("home_team", "Saudi Arabia");
    record67.set("away_team", "New Zealand");
    record67.set("match_date", "2026-06-27");
    record67.set("match_time", "17:00");
    record67.set("status", "upcoming");
    record67.set("odds_match_winner", "{'home': 2.2, 'draw': 3.2, 'away': 1.75}");
    record67.set("odds_total_goals", "{'over_2_5': 1.88, 'under_2_5': 1.97}");
    record67.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record67.set("home_score", null);
    record67.set("away_score", null);
    record67.set("result", "pending");
    record67.set("team_flags", "{'home_flag': 'https://flagcdn.com/sa.svg', 'away_flag': 'https://flagcdn.com/nz.svg'}");
    record67.set("stadium_name", "MetLife Stadium, New Jersey");
    record67.set("stage", "Grupo L");
  try {
    app.save(record67);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record68 = new Record(collection);
    record68.set("home_team", "Netherlands");
    record68.set("away_team", "New Zealand");
    record68.set("match_date", "2026-07-02");
    record68.set("match_time", "15:00");
    record68.set("status", "upcoming");
    record68.set("odds_match_winner", "{'home': 1.5, 'draw': 3.6, 'away': 2.6}");
    record68.set("odds_total_goals", "{'over_2_5': 1.9, 'under_2_5': 1.95}");
    record68.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record68.set("home_score", null);
    record68.set("away_score", null);
    record68.set("result", "pending");
    record68.set("team_flags", "{'home_flag': 'https://flagcdn.com/nl.svg', 'away_flag': 'https://flagcdn.com/nz.svg'}");
    record68.set("stadium_name", "Empower Field at Mile High, Denver");
    record68.set("stage", "Grupo L");
  try {
    app.save(record68);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record69 = new Record(collection);
    record69.set("home_team", "Uzbekistan");
    record69.set("away_team", "Saudi Arabia");
    record69.set("match_date", "2026-07-02");
    record69.set("match_time", "18:00");
    record69.set("status", "upcoming");
    record69.set("odds_match_winner", "{'home': 1.85, 'draw': 3.3, 'away': 2.0}");
    record69.set("odds_total_goals", "{'over_2_5': 1.89, 'under_2_5': 1.96}");
    record69.set("odds_parlay", "{'option1': 2.3, 'option2': 2.8}");
    record69.set("home_score", null);
    record69.set("away_score", null);
    record69.set("result", "pending");
    record69.set("team_flags", "{'home_flag': 'https://flagcdn.com/uz.svg', 'away_flag': 'https://flagcdn.com/sa.svg'}");
    record69.set("stadium_name", "AT&T Stadium, Dallas");
    record69.set("stage", "Grupo L");
  try {
    app.save(record69);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record70 = new Record(collection);
    record70.set("home_team", "New Zealand");
    record70.set("away_team", "Netherlands");
    record70.set("match_date", "2026-07-07");
    record70.set("match_time", "16:00");
    record70.set("status", "upcoming");
    record70.set("odds_match_winner", "{'home': 3.5, 'draw': 3.3, 'away': 1.4}");
    record70.set("odds_total_goals", "{'over_2_5': 1.91, 'under_2_5': 1.94}");
    record70.set("odds_parlay", "{'option1': 2.2, 'option2': 2.7}");
    record70.set("home_score", null);
    record70.set("away_score", null);
    record70.set("result", "pending");
    record70.set("team_flags", "{'home_flag': 'https://flagcdn.com/nz.svg', 'away_flag': 'https://flagcdn.com/nl.svg'}");
    record70.set("stadium_name", "Soldier Field, Chicago");
    record70.set("stage", "Grupo L");
  try {
    app.save(record70);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record71 = new Record(collection);
    record71.set("home_team", "Saudi Arabia");
    record71.set("away_team", "Uzbekistan");
    record71.set("match_date", "2026-07-07");
    record71.set("match_time", "19:00");
    record71.set("status", "upcoming");
    record71.set("odds_match_winner", "{'home': 2.1, 'draw': 3.3, 'away': 1.8}");
    record71.set("odds_total_goals", "{'over_2_5': 1.86, 'under_2_5': 1.99}");
    record71.set("odds_parlay", "{'option1': 2.4, 'option2': 2.9}");
    record71.set("home_score", null);
    record71.set("away_score", null);
    record71.set("result", "pending");
    record71.set("team_flags", "{'home_flag': 'https://flagcdn.com/sa.svg', 'away_flag': 'https://flagcdn.com/uz.svg'}");
    record71.set("stadium_name", "NRG Stadium, Houston");
    record71.set("stage", "Grupo L");
  try {
    app.save(record71);
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