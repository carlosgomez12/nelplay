/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("group_info");

  const record0 = new Record(collection);
    record0.set("group_name", "Grupo A");
    record0.set("stage", "Group Stage");
    record0.set("teams", [{"name": "Argentina", "flag": "\ud83c\udde6\ud83c\uddf7"}, {"name": "France", "flag": "\ud83c\uddeb\ud83c\uddf7"}, {"name": "Morocco", "flag": "\ud83c\uddf2\ud83c\udde6"}, {"name": "Peru", "flag": "\ud83c\uddf5\ud83c\uddea"}]);
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
    record1.set("group_name", "Grupo B");
    record1.set("stage", "Group Stage");
    record1.set("teams", [{"name": "England", "flag": "\ud83c\uddec\ud83c\udde7"}, {"name": "Netherlands", "flag": "\ud83c\uddf3\ud83c\uddf1"}, {"name": "Senegal", "flag": "\ud83c\uddf8\ud83c\uddf3"}, {"name": "Ecuador", "flag": "\ud83c\uddea\ud83c\udde8"}]);
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
    record2.set("group_name", "Grupo C");
    record2.set("stage", "Group Stage");
    record2.set("teams", [{"name": "Spain", "flag": "\ud83c\uddea\ud83c\uddf8"}, {"name": "Germany", "flag": "\ud83c\udde9\ud83c\uddea"}, {"name": "Japan", "flag": "\ud83c\uddef\ud83c\uddf5"}, {"name": "Costa Rica", "flag": "\ud83c\udde8\ud83c\uddf7"}]);
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
    record3.set("group_name", "Grupo D");
    record3.set("stage", "Group Stage");
    record3.set("teams", [{"name": "Brazil", "flag": "\ud83c\udde7\ud83c\uddf7"}, {"name": "Belgium", "flag": "\ud83c\udde7\ud83c\uddea"}, {"name": "Canada", "flag": "\ud83c\udde8\ud83c\udde6"}, {"name": "Switzerland", "flag": "\ud83c\udde8\ud83c\udded"}]);
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
    record4.set("group_name", "Grupo E");
    record4.set("stage", "Group Stage");
    record4.set("teams", [{"name": "Italy", "flag": "\ud83c\uddee\ud83c\uddf9"}, {"name": "Uruguay", "flag": "\ud83c\uddfa\ud83c\uddfe"}, {"name": "Portugal", "flag": "\ud83c\uddf5\ud83c\uddf9"}, {"name": "Ghana", "flag": "\ud83c\uddec\ud83c\udded"}]);
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
    record5.set("group_name", "Grupo F");
    record5.set("stage", "Group Stage");
    record5.set("teams", [{"name": "Mexico", "flag": "\ud83c\uddf2\ud83c\uddfd"}, {"name": "Poland", "flag": "\ud83c\uddf5\ud83c\uddf1"}, {"name": "Argentina", "flag": "\ud83c\udde6\ud83c\uddf7"}, {"name": "Saudi Arabia", "flag": "\ud83c\uddf8\ud83c\udde6"}]);
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
    record6.set("group_name", "Grupo G");
    record6.set("stage", "Group Stage");
    record6.set("teams", [{"name": "Denmark", "flag": "\ud83c\udde9\ud83c\uddf0"}, {"name": "Tunisia", "flag": "\ud83c\uddf9\ud83c\uddf3"}, {"name": "Australia", "flag": "\ud83c\udde6\ud83c\uddfa"}, {"name": "South Korea", "flag": "\ud83c\uddf0\ud83c\uddf7"}]);
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
    record7.set("group_name", "Grupo H");
    record7.set("stage", "Group Stage");
    record7.set("teams", [{"name": "Croatia", "flag": "\ud83c\udded\ud83c\uddf7"}, {"name": "Belgium", "flag": "\ud83c\udde7\ud83c\uddea"}, {"name": "Maroc", "flag": "\ud83c\uddf2\ud83c\udde6"}, {"name": "Canada", "flag": "\ud83c\udde8\ud83c\udde6"}]);
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
    record8.set("group_name", "Grupo I");
    record8.set("stage", "Group Stage");
    record8.set("teams", [{"name": "Sweden", "flag": "\ud83c\uddf8\ud83c\uddea"}, {"name": "Serbia", "flag": "\ud83c\uddf7\ud83c\uddf8"}, {"name": "Greece", "flag": "\ud83c\uddec\ud83c\uddf7"}, {"name": "Norway", "flag": "\ud83c\uddf3\ud83c\uddf4"}]);
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
    record9.set("group_name", "Grupo J");
    record9.set("stage", "Group Stage");
    record9.set("teams", [{"name": "Ukraine", "flag": "\ud83c\uddfa\ud83c\udde6"}, {"name": "Czech Republic", "flag": "\ud83c\udde8\ud83c\uddff"}, {"name": "Slovakia", "flag": "\ud83c\uddf8\ud83c\uddf0"}, {"name": "Romania", "flag": "\ud83c\uddf7\ud83c\uddf4"}]);
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
    record10.set("group_name", "Grupo K");
    record10.set("stage", "Group Stage");
    record10.set("teams", [{"name": "Turkey", "flag": "\ud83c\uddf9\ud83c\uddf7"}, {"name": "Hungary", "flag": "\ud83c\udded\ud83c\uddfa"}, {"name": "Bulgaria", "flag": "\ud83c\udde7\ud83c\uddec"}, {"name": "Bosnia", "flag": "\ud83c\udde7\ud83c\udde6"}]);
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
    record11.set("group_name", "Grupo L");
    record11.set("stage", "Group Stage");
    record11.set("teams", [{"name": "Russia", "flag": "\ud83c\uddf7\ud83c\uddfa"}, {"name": "Kazakhstan", "flag": "\ud83c\uddf0\ud83c\uddff"}, {"name": "Uzbekistan", "flag": "\ud83c\uddfa\ud83c\uddff"}, {"name": "Tajikistan", "flag": "\ud83c\uddf9\ud83c\uddef"}]);
  try {
    app.save(record11);
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