# NelPlay AI — Catálogo de Tools (Functions)

> **Estado: DISEÑO (no implementado).** Especificación de las herramientas que el
> orquestador expondrá al LLM. Ver [`NELPLAY-AI-ARCHITECTURE.md`](./NELPLAY-AI-ARCHITECTURE.md).

## Convenciones y reglas transversales

- **Solo lectura**: ninguna tool del MVP modifica datos. Ninguna crea puntos, recompensas ni escribe en colecciones.
- **`user_id` forzado por sesión**: en toda tool con `scope: user`, el orquestador **ignora** cualquier `user_id` propuesto por el modelo y usa `req.user.id` (validado por `requireAuth`). No existe tool para leer datos privados por id arbitrario.
- **Cliente PocketBase = superusuario**: el aislamiento por usuario se aplica **en código** (filtro `user_id`), no por reglas de PocketBase.
- **Datos como DATA**: los resultados se inyectan al modelo como información, nunca como instrucciones (anti prompt-injection).
- **Validación de parámetros**: cada tool valida tipos, rangos y acota `limit` (p. ej. `limit ≤ 50`).
- **Errores**: las tools devuelven `{ error, code }` sin filtrar detalles internos; el orquestador degrada con gracia ("no tengo ese dato ahora").
- **Fuente de datos**: colecciones reales auditadas de `apps/pocketbase`.

### Esquema de colecciones relevante (auditado)

- **users**: `id`, `name`, `email` (privado, no exponer al modelo), `role`, `total_points`, `predictions_count`, `exact_score_count`, `friendly_points`, `friendly_predictions_count`, `friendly_exact_score_count`, `inscription_status`, `balance` (legado apuestas), `created`.
- **matches**: `id`, `home_team`, `away_team`, `match_date`, `match_time`, `status` (`live`/`completed`/otros = programado), `stage`, `stadium_name`, `home_score`, `away_score`, `result`, `predictions_count`, `odds_*` (legado apuestas — **no exponer**).
- **predictions**: `id`, `user_id`, `match_id`, `predicted_home_score`, `predicted_away_score`, `predicted_winner`, `points_awarded`, `status` (`pending`/`evaluated`), `is_locked`, `created`, `updated`.
- **scoring_rules**: `exact_score_points`, `correct_winner_diff_points`, `correct_winner_points`, `group_stage_multiplier`, `knockout_multiplier`, `final_multiplier`.
- **Ranking**: derivado de `users` ordenado por `-total_points, -exact_score_count`.
- **NO existen** `teams` ni `competitions` (los equipos son texto en `matches`).

---

## 1. Tools de usuario (scope: user — privadas)

### `get_user_profile`
- **Propósito**: datos públicos de identidad y progreso del usuario actual (para saludo/contexto).
- **Parámetros**: ninguno (usa `req.user.id`).
- **Respuesta**: `{ name, level?, total_points, predictions_count, exact_score_count, member_since }`.
- **Permisos**: usuario autenticado; solo su propio perfil.
- **Fuente**: `users` (registro propio).
- **Validaciones**: excluir `email`, `password`, `balance`, tokens.
- **Riesgos**: exponer PII → mitigado devolviendo solo campos públicos.

### `get_user_stats`
- **Propósito**: estadísticas de rendimiento del usuario (base de "¿cómo voy?" y del Coach).
- **Parámetros**: `scope?: "official" | "friendly"` (default `official`).
- **Respuesta**: `{ total_points, predictions_count, exact_score_count, accuracy_pct?, friendly:{...} }`. `accuracy_pct` se calcula server-side (aciertos/total), no lo inventa el modelo.
- **Permisos**: solo el propio usuario.
- **Fuente**: `users` (+ opcional agregación de `predictions`).
- **Validaciones**: divisor 0 → `accuracy_pct = null`.
- **Riesgos**: bajo.

### `get_user_predictions`
- **Propósito**: historial de pronósticos del usuario (insumo del Coach).
- **Parámetros**: `limit?: number (≤50, default 20)`, `status?: "pending"|"evaluated"`, `match_stage?: string`.
- **Respuesta**: lista `[{ match_id, home_team, away_team, predicted_home_score, predicted_away_score, actual_home_score?, actual_away_score?, points_awarded, status, stage, date }]`.
- **Permisos**: solo `user_id = req.user.id` (filtro forzado).
- **Fuente**: `predictions` (join en código con `matches` para nombres/resultados).
- **Validaciones**: acotar `limit`; nunca aceptar `user_id` externo.
- **Riesgos**: fuga entre usuarios → mitigado por filtro forzado.

### `get_user_ranking`
- **Propósito**: posición del usuario y distancia a puestos de referencia.
- **Parámetros**: ninguno.
- **Respuesta**: `{ position, total_points, points_to_next?, points_to_top10?, total_players }`.
- **Permisos**: propio usuario (la posición es pública, pero se entrega en contexto propio).
- **Fuente**: `users` ordenado por `-total_points`; posición calculada server-side.
- **Validaciones**: manejar empates de forma estable.
- **Riesgos**: bajo.

### `get_user_streak`
- **Propósito**: racha actual de aciertos consecutivos.
- **Parámetros**: ninguno.
- **Respuesta**: `{ current_streak, best_streak? }`.
- **Permisos**: propio usuario.
- **Fuente**: derivado de `predictions` evaluadas ordenadas por fecha (aciertos = `points_awarded > 0`).
- **Validaciones**: definir "acierto" según reglas; documentar el criterio.
- **Riesgos**: definición ambigua → fijarla explícitamente.

### `get_user_achievements` *(depende de gamificación — Fase 3 de producto)*
- **Propósito**: badges/logros del usuario.
- **Estado**: **datos aún no existen** (badges/levels no implementados). Tool **futura**.
- **Respuesta (contrato futuro)**: `[{ code, name, unlocked_at }]`.
- **Riesgos**: no exponer hasta que exista la colección; hasta entonces el Assistant responde "los logros llegan muy pronto".

### `get_user_challenges` *(depende de retos — Fase 3 de producto)*
- **Propósito**: retos activos y progreso del usuario.
- **Estado**: **futura** (retos no implementados).
- **Respuesta (contrato futuro)**: `[{ id, name, objective, progress, reward, ends_at }]`.

---

## 2. Tools de partidos (scope: public)

### `get_upcoming_matches`
- **Propósito**: próximos partidos pronosticables.
- **Parámetros**: `limit?: number (≤20, default 8)`, `stage?: string`.
- **Respuesta**: `[{ id, home_team, away_team, match_date, match_time, stage, stadium_name, status }]`.
- **Permisos**: público (`matches.listRule = ""`).
- **Fuente**: `matches` con `status != completed && status != live`, orden `match_date, match_time`.
- **Validaciones**: acotar `limit`; no exponer `odds_*`.
- **Riesgos**: bajo.

### `get_match`
- **Propósito**: detalle de un partido.
- **Parámetros**: `match_id: string` (requerido).
- **Respuesta**: `{ id, home_team, away_team, match_date, match_time, stage, stadium_name, status, home_score?, away_score?, result?, predictions_count }`.
- **Permisos**: público.
- **Fuente**: `matches`.
- **Validaciones**: `match_id` existe; no exponer `odds_*`.
- **Riesgos**: bajo.

### `get_match_history`
- **Propósito**: enfrentamientos previos entre los mismos equipos **dentro de NelPlay**.
- **Parámetros**: `home_team: string`, `away_team: string`, `limit?: number (≤10)`.
- **Respuesta**: `[{ id, date, home_team, away_team, home_score, away_score, stage }]` (solo `completed`).
- **Permisos**: público.
- **Fuente**: `matches` filtrando por los nombres (en ambos órdenes) y `status = completed`.
- **Validaciones**: coincidencia por nombre exacto (limitación: no hay entidad `team`).
- **Riesgos**: cobertura limitada → el modelo debe decir "según los partidos registrados en NelPlay".

### `get_match_community_distribution`
- **Propósito**: cómo pronostica la comunidad un partido (sensación de comunidad).
- **Parámetros**: `match_id: string`.
- **Respuesta**: `{ home_win_pct, draw_pct, away_win_pct, sample_size }` (agregado, sin identidades).
- **Permisos**: público **pero SOLO si el partido ya inició** (`status live`/`completed`) — respeta la regla del hook `public-predictions` para no filtrar pronósticos antes del kickoff.
- **Fuente**: agregación de `predictions` por `match_id` (solo conteos; nunca pronósticos individuales de otros).
- **Validaciones**: si `status` es pre-kickoff → devolver `{ available:false, reason:"pre_kickoff" }`.
- **Riesgos**: filtrar ventaja competitiva pre-partido → bloqueado por la condición de estado.

---

## 3. Tools de ranking (scope: public)

### `get_global_ranking`
- **Propósito**: top del ranking global.
- **Parámetros**: `limit?: number (≤20, default 10)`.
- **Respuesta**: `[{ position, name, total_points, exact_score_count }]`.
- **Permisos**: público (nombres públicos; nunca email).
- **Fuente**: `users` orden `-total_points, -exact_score_count`.
- **Validaciones**: acotar `limit`; excluir campos privados.
- **Riesgos**: exponer PII → devolver solo `name` público.

---

## 4. Tools de producto (scope: static)

### `get_nelplay_rules`
- **Propósito**: reglas/FAQ de NelPlay (puntos, cómo pronosticar, ligas, etc.).
- **Parámetros**: `topic?: "points"|"predictions"|"leagues"|"ranking"|"general"`.
- **Respuesta**: texto estructurado desde `ai/knowledge/rules.md`.
- **Permisos**: público.
- **Fuente**: archivo estático (parte del system prompt; esta tool es para topics extensos).
- **Validaciones**: contenido curado, sin inventar.
- **Riesgos**: desincronización con el producto → mantener `rules.md` como fuente única.

> **Nota**: para la mayoría de preguntas de reglas, el conocimiento va **en el system prompt** (cacheado). Esta tool solo se usa si el corpus crece. Por eso **RAG no es necesario** en el MVP (ver arquitectura §K).

---

## 5. Tools FUTURAS (bloqueadas por datos)

Requieren nuevas entidades o una **fuente de datos deportivos externa** (no existen `teams`/`competitions` ni estadísticas ricas hoy):

- `get_team`, `get_team_stats`, `get_team_matches` — requieren entidad `teams` + datos históricos.
- `get_competition`, `get_competition_matches`, `get_competition_ranking` — requieren entidad `competitions`.
- `get_match_stats` (posesión, tiros, xG…) — requieren proveedor externo (p. ej. API deportiva).

**Recomendación**: en MVP2 (Analyst), operar solo con lo derivable de `matches`/`predictions`. Integrar datos externos en MVP6, documentando fuente, costo, licencia y frescura.

---

## 6. Contrato técnico de una tool (plantilla de implementación)

```
{
  name: "get_user_stats",
  description: "Estadísticas de rendimiento del usuario autenticado.",
  scope: "user",              // user | public | static
  parameters: {               // JSON Schema
    type: "object",
    properties: { scope: { type: "string", enum: ["official","friendly"] } },
    additionalProperties: false
  },
  // Ejecutor (server): user_id SIEMPRE = req.user.id (no del modelo)
  execute: async ({ scope }, ctx) => { /* consulta PB filtrando ctx.userId */ }
}
```

Reglas del ejecutor:
1. Nunca aceptar `user_id`/identidad desde `parameters`.
2. Devolver solo campos permitidos (allowlist), nunca `email`/`balance`/`odds_*`/secretos.
3. Acotar tamaños (`limit`), tiempos (timeout) y errores (mensajes genéricos).
4. Registrar en observabilidad: tool, latencia, filas, error.
