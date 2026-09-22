# NelPlay — Fase 2: Gamificación

> Sistema de progresión (niveles + rachas) y logros. Todo **server-side y
> determinista**; el frontend y una futura IA nunca determinan puntos/logros oficiales.

## Componentes

| Pieza | Ubicación | Rol |
|---|---|---|
| Niveles | `apps/web/src/config/levels.js` | Derivados de `total_points` (sin campo persistido) |
| Catálogo logros (cliente) | `apps/web/src/config/achievements.js` | Espejo del seed; iconos/nombres + fallback |
| Catálogo logros (server) | `pb_migrations/..._created_achievement_definitions.js` + seed | Fuente de verdad |
| Desbloqueos | `pb_migrations/..._created_user_achievements.js` | Persistencia por usuario |
| Rachas | `pb_migrations/..._add_streak_to_users.js` | `current_streak` / `best_streak` |
| Motor | `pb_hooks/gamification.pb.js` | Recalcula rachas + desbloquea logros |
| Perfil | `apps/web/src/pages/ProfilePage.jsx` + `lib/profile.js` | Visualización |

## Niveles
Umbrales (configurables en `levels.js`): Novato 0 · Aficionado 25 · Analista 75 ·
Experto 200 · Maestro 500 · Leyenda 1000. El perfil muestra nivel actual, siguiente y
progreso. **No** se persiste el nivel (se deriva) → extensible sin migraciones.

## Rachas
- `current_streak`: aciertos consecutivos más recientes (acierto = `points_awarded > 0`).
- `best_streak`: máxima racha histórica (**monotónica**, nunca decrece).
- Orden cronológico aproximado por `predictions.updated` (fijado al evaluar el partido) → evita N+1 de traer cada match.
- Persistidas por el hook; el frontend deriva como fallback si aún no existen.

## Motor: `gamification.pb.js`
- Escucha `onRecordUpdate("users")` y actúa **después** de `e.next()`.
- Se dispara porque el scoring ya guarda `users` al crear predicción y al completar partidos → **no se modifica el scoring**.
- **Anti-recursión**: solo guarda `users` si la racha cambió; el re-trigger no vuelve a guardar.
- **Idempotente**: recalcula y re-verifica sin duplicar (índice único en `user_achievements`).
- **Optimización**: si el usuario no tiene predicciones, sale temprano.

## Catálogo inicial de logros
`first_prediction`, `predictions_10`, `predictions_50`, `first_exact`, `exact_5`,
`exact_10`, `streak_3`, `streak_5`, `streak_10`, `points_100`, `points_500`.
Cada uno: `metric` (campo de `users`) + `threshold`. Desbloqueo cuando `users[metric] ≥ threshold`.

## Cómo añadir un logro nuevo (extensible)
1. Insertar un registro en `achievement_definitions` (nueva migración seed o desde el admin) con `code`, `name`, `description`, `metric`, `threshold`, `icon`, `active=true`.
2. Añadir el mismo `code` al espejo `config/achievements.js` (para icono/nombre y fallback).
3. **Sin cambios de código** en el hook: es genérico sobre `metric`/`threshold`.

> Métricas soportadas hoy: `predictions_count`, `exact_score_count`, `best_streak`, `total_points`. Para nuevas métricas, exponer el campo en `users` y el hook la leerá.

## Seguridad
- `user_achievements`: escritura `null` (solo superusuario ⇒ solo el hook). El usuario no puede crear/editar logros.
- Rachas: escritas solo por el hook.
- Lectura de logros: solo el dueño (`@request.auth.id = user_id`).

## Datos para la futura IA
`current_streak`, `best_streak`, `accuracy` (derivada), niveles y `user_achievements`
son exactamente el tipo de datos estructurados que el **Personal AI Coach** consumirá
(ver `NELPLAY-AI-TOOLS.md`), sin necesidad de rediseño.
