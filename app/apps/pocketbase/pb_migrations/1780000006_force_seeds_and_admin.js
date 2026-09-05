/// <reference path="../pb_data/types.d.ts" />

// IMPORTANT: Edit this constant with your actual admin email before deploying
const ADMIN_EMAIL = "admin@example.com"; // ⚠️ CHANGE THIS TO YOUR EMAIL

migrate((app) => {
  console.log("🚀 Starting migration: Force seeds and admin setup");

  try {
    // ============================================================
    // 1. SEED SCORING_RULES COLLECTION (if empty)
    // ============================================================
    console.log("📊 Checking scoring_rules collection...");
    const scoringRulesCollection = app.findCollectionByNameOrId("scoring_rules");
    
    if (scoringRulesCollection) {
      const existingRules = app.findRecordsByFilter(
        "scoring_rules",
        "id != ''",
        "-created",
        1
      );

      if (existingRules.length === 0) {
        console.log("✅ Seeding scoring_rules with default values...");
        const scoringRule = new Record(scoringRulesCollection);
        scoringRule.set("exact_score_points", 5);
        scoringRule.set("correct_winner_diff_points", 3);
        scoringRule.set("correct_winner_points", 1);
        scoringRule.set("group_stage_multiplier", 1);
        scoringRule.set("knockout_multiplier", 1.5);
        scoringRule.set("final_multiplier", 2);
        app.save(scoringRule);
        console.log("✅ Scoring rules seeded successfully");
      } else {
        console.log("ℹ️ Scoring rules already exist, skipping seed");
      }
    } else {
      console.log("⚠️ scoring_rules collection not found");
    }

    // ============================================================
    // 2. SEED PAYMENT_SETTINGS COLLECTION (if empty)
    // ============================================================
    console.log("💳 Checking payment_settings collection...");
    const paymentSettingsCollection = app.findCollectionByNameOrId("payment_settings");
    
    if (paymentSettingsCollection) {
      const existingSettings = app.findRecordsByFilter(
        "payment_settings",
        "id != ''",
        "-created",
        1
      );

      if (existingSettings.length === 0) {
        console.log("✅ Seeding payment_settings with default values...");
        const paymentSetting = new Record(paymentSettingsCollection);
        paymentSetting.set("inscription_amount", 50000);
        paymentSetting.set("nequi_phone", "3001234567");
        paymentSetting.set("account_holder_name", "Administrador");
        paymentSetting.set("instructions", "Realiza el pago por Nequi y sube el comprobante");
        paymentSetting.set("is_active", true);
        // Campos requeridos de distribución de premios (deben sumar 100%)
        paymentSetting.set("prize_first_pct", 40);
        paymentSetting.set("prize_second_pct", 25);
        paymentSetting.set("prize_third_pct", 15);
        paymentSetting.set("prize_reserve_pct", 20);
        app.save(paymentSetting);
        console.log("✅ Payment settings seeded successfully");
      } else {
        console.log("ℹ️ Payment settings already exist, skipping seed");
      }
    } else {
      console.log("⚠️ payment_settings collection not found");
    }

    // ============================================================
    // 3. PROMOTE ADMIN USER
    // ============================================================
    console.log("👤 Promoting admin user: " + ADMIN_EMAIL);
    const usersCollection = app.findCollectionByNameOrId("users");
    
    if (usersCollection) {
      try {
        const adminUser = app.findFirstRecordByFilter(
          "users",
          "email = {:email}",
          { email: ADMIN_EMAIL }
        );

        if (adminUser) {
          adminUser.set("role", "admin");
          adminUser.set("inscription_status", "approved");
          adminUser.set("verified", true);
          app.save(adminUser);
          console.log("✅ Admin user promoted successfully: " + ADMIN_EMAIL);
        } else {
          console.log("⚠️ Admin user not found: " + ADMIN_EMAIL);
          console.log("ℹ️ Please create this user first, then re-run migration");
        }
      } catch (e) {
        console.log("⚠️ Error promoting admin user: " + e.message);
      }
    } else {
      console.log("⚠️ users collection not found");
    }

    // ============================================================
    // 4. RE-APPLY CORRECT API RULES
    // ============================================================
    console.log("🔒 Re-applying API rules...");

    // Payment Settings Rules
    if (paymentSettingsCollection) {
      paymentSettingsCollection.listRule = "@request.auth.id != ''";
      paymentSettingsCollection.viewRule = "@request.auth.id != ''";
      paymentSettingsCollection.createRule = "@request.auth.role = 'admin'";
      paymentSettingsCollection.updateRule = "@request.auth.role = 'admin'";
      paymentSettingsCollection.deleteRule = "@request.auth.role = 'admin'";
      app.save(paymentSettingsCollection);
      console.log("✅ payment_settings rules updated");
    }

    // Scoring Rules
    if (scoringRulesCollection) {
      scoringRulesCollection.listRule = "";
      scoringRulesCollection.viewRule = "";
      scoringRulesCollection.createRule = "@request.auth.role = 'admin'";
      scoringRulesCollection.updateRule = "@request.auth.role = 'admin'";
      scoringRulesCollection.deleteRule = "@request.auth.role = 'admin'";
      app.save(scoringRulesCollection);
      console.log("✅ scoring_rules rules updated");
    }

    // Predictions Rules
    const predictionsCollection = app.findCollectionByNameOrId("predictions");
    if (predictionsCollection) {
      predictionsCollection.listRule = "user_id = @request.auth.id || @request.auth.role = 'admin'";
      predictionsCollection.viewRule = "user_id = @request.auth.id || @request.auth.role = 'admin'";
      predictionsCollection.createRule = "@request.auth.id != '' && @request.auth.inscription_status = 'approved'";
      predictionsCollection.updateRule = "@request.auth.id != '' && @request.auth.inscription_status = 'approved' && is_locked = false || @request.auth.role = 'admin'";
      predictionsCollection.deleteRule = "@request.auth.role = 'admin'";
      app.save(predictionsCollection);
      console.log("✅ predictions rules updated");
    }

    console.log("✅ Migration completed successfully!");

  } catch (error) {
    console.log("❌ Migration error: " + error.message);
    throw error;
  }
}, (app) => {
  console.log("⏪ Rolling back migration: Force seeds and admin setup");
  // Rollback is intentionally minimal - we don't delete seeded data
  // as it may be in use. Manual cleanup required if needed.
});