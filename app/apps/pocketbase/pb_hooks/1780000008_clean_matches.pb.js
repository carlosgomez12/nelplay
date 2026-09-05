// This file was incorrectly created as a hook instead of a migration.
// The correct migration exists at pb_migrations/1780000008_clean_matches.js
// This hook file is disabled to prevent 'migrate is not defined' errors.

// No-op hook - does nothing
onRecordCreate((e) => {
  e.next();
}, "*");