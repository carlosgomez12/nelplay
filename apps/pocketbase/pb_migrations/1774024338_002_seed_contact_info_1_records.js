/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_info");

  const record0 = new Record(collection);
    record0.set("phone", "+1 (555) 123-4567");
    record0.set("email", "contact@example.com");
    record0.set("address", "123 Main Street");
    record0.set("city", "New York");
    record0.set("country", "United States");
    record0.set("social_media", "{'facebook': 'https://facebook.com/example', 'twitter': 'https://twitter.com/example', 'instagram': 'https://instagram.com/example', 'linkedin': 'https://linkedin.com/company/example'}");
  try {
    app.save(record0);
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