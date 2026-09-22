# NelPlay — Fase 2: Modelo de Datos

> PocketBase v0.39.8. Reglas: `""` = público · `@request.auth...` = condicional ·
> `null` = solo superusuario (hooks). Referencias entre colecciones se guardan como
> **texto** (id string), coherente con `predictions.user_id` existente.

## Estado auditado (antes de Fase 2)
- Existen: `users`, `matches`, `predictions`, `scoring_rules`, `leaderboard` (legacy, sin uso),
  `group_info`, `payment_settings`, `contact_info`, `bets`/`transactions` (dormidas),
  `app_secrets`, `tts_cache` (huérfana).
- **No existían** entidades de gamificación/ligas/actividad ni `teams`/`competitions`.
- Stats oficiales ya calculadas server-side por `predictions-scoring.pb.js`:
  `total_points`, `predictions_count`, `exact_score_count`, `friendly_*`.

---

## IMPLEMENTADO en 2.3/2.4

### `users` (extendida)
- **Propósito**: identidad + progresión.
- **Campos añadidos**: `current_streak` (number, ≥0), `best_streak` (number, ≥0).
- **Relaciones**: —.
- **Índices**: los existentes.
- **Acceso**: sin cambios (auth PB). **Escritura de stats/rachas: solo hooks** (nunca el cliente).
- **Quién crea**: registro (signup). **Modifica stats/rachas**: hooks server-side. **Consulta**: dueño + listados públicos (nombre/puntos, nunca email/balance/odds).
- **Rendimiento**: campos numéricos; sin coste extra relevante.
- **AI futura**: `current_streak`/`best_streak` alimentan Coach y logros.

### `achievement_definitions` (nueva) — catálogo de logros
- **Propósito**: definir logros de forma extensible (añadir logro = añadir registro).
- **Campos**: `code` (text, único), `name` (text), `description` (text), `metric` (text: `predictions_count`|`exact_score_count`|`best_streak`|`total_points`), `threshold` (number int), `icon` (text), `sort_order` (number int), `active` (bool), `created`/`updated` (autodate).
- **Relaciones**: `metric` referencia (lógicamente) un campo de `users`.
- **Índices**: `UNIQUE (code)`.
- **Acceso**: `list/view = ""` (público) · `create/update/delete = admin`.
- **Rendimiento**: colección pequeña; se lee entera en el hook (≤200).
- **AI futura**: fuente de la lógica de logros (qué existe y sus umbrales).

### `user_achievements` (nueva) — desbloqueos por usuario
- **Propósito**: registrar qué logros ha desbloqueado cada usuario y cuándo.
- **Campos**: `user_id` (text), `achievement_code` (text), `progress` (number int), `created` (autodate = unlocked_at), `updated`.
- **Relaciones**: `user_id` → `users.id`; `achievement_code` → `achievement_definitions.code`.
- **Índices**: `UNIQUE (user_id, achievement_code)` (evita duplicados).
- **Acceso**: `list/view = @request.auth.id = user_id` (solo el dueño) · **`create/update/delete = null` (solo superusuario ⇒ solo el hook)**. El usuario **no puede forjar logros**.
- **Rendimiento**: consulta por `user_id` (indexado por el índice compuesto); en el hook, 1 lookup por definición evaluada.
- **AI futura**: señales de logro por usuario (identidad/motivación).

---

## PLANIFICADO (próximos incrementos — NO creado aún)

> Se crean **solo cuando el incremento correspondiente los use**, no por anticipar la IA.

### `challenges` (2.5) — catálogo de retos
- **Campos**: `code`, `name`, `description`, `type` (`accuracy`|`participation`|`exact`|`streak`|`competition`), `objective` (number), `reward` (text, no monetario), `starts_at` (date), `ends_at` (date), `active` (bool).
- **Acceso**: `list/view = ""` · `create/update/delete = admin`. **Índice**: `UNIQUE (code)`.

### `user_challenges` (2.5) — progreso de retos
- **Campos**: `user_id`, `challenge_code`, `progress` (number), `status` (`active`|`completed`), `completed_at` (date).
- **Acceso**: `list/view = @request.auth.id = user_id` · escritura `null` (solo hook). **Índice**: `UNIQUE (user_id, challenge_code)`.

### `leagues` (2.7) — ligas privadas
- **Campos**: `name`, `description?`, `owner_id` (text), `invite_code` (text, único, no adivinable), `active` (bool).
- **Acceso**: `create = @request.auth.id != ""` · `update/delete = @request.auth.id = owner_id` (dueño) · `view/list = miembros` (vía join con `league_members`, o `""` con datos mínimos). **Índice**: `UNIQUE (invite_code)`.
- **Riesgos**: generación de `invite_code` server-side (hook), no adivinable; validar ownership en cada acción.

### `league_members` (2.7) — membresía
- **Campos**: `league_id`, `user_id`, `role` (`owner`|`member`), `joined_at`.
- **Acceso**: `create = auth + código válido` (vía endpoint/hook) · `delete = uno mismo (salir) o owner (expulsar)`. **Índice**: `UNIQUE (league_id, user_id)`.

### `user_activity` (2.8) — feed estructurado
- **Campos**: `user_id`, `type` (`achievement`|`streak`|`level_up`|`rank_up`), `payload` (json/text), `created`.
- **Acceso**: `view/list` público-limitado (sin PII) · escritura `null` (solo hook).
- **AI futura**: actividad estructurada para insights/engagement.

---

## Rankings temporales (2.6) — sin colección nueva (recomendado)
- **Global**: `users` ordenado por `-total_points, -exact_score_count` (ya existe).
- **Semanal/mensual/competición**: derivar de `predictions.points_awarded` + `matches.match_date`/`stage` en el momento de consulta.
- **Liga**: filtrar el ranking por `league_members`.
- **Opción futura** si la performance lo exige: `points_ledger` (append-only: `user_id`, `points`, `match_id`, `awarded_at`) → habilita todos los cortes temporales/por-liga con una sola fuente y es ideal para IA. Documentado como mejora, no implementado.
