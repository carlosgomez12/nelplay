# NelPlay — Fase 2: Core Product + Gamificación + Social Foundation

> Rama: `feat/nelplay-phase2-core-product`. Fecha inicio: 2026-09-21.
> AI **congelada** (solo diseño en `NELPLAY-AI-*.md`). `REAL_MONEY_BETTING=false`.

## Objetivo
Dar al usuario razones para pronosticar, regresar, competir y progresar, generando
**datos estructurados server-side** que la futura NelPlay AI consumirá sin rediseño.

Principio: `acción del usuario → dato → métrica → experiencia → engagement → (futura IA)`.

## Bloques y estado

| Bloque | Estado | Notas |
|---|---|---|
| 2.0 Auditoría | ✅ | Ver [PHASE-2-DATA-MODEL.md](./PHASE-2-DATA-MODEL.md) §"Estado auditado" |
| 2.1 Arquitectura funcional | ✅ | Lógica oficial en hooks PocketBase; frontend solo lee |
| 2.2 Modelo de datos | ✅ (incremental) | Nuevas colecciones por incremento, no de golpe |
| **2.3 Perfil + progresión** | ✅ implementado | `/perfil`, stats reales, niveles, rachas |
| **2.4 Gamificación (logros)** | ✅ implementado (backend por validar en deploy) | `achievement_definitions`, `user_achievements`, hook |
| 2.5 Retos | ⏳ pendiente | `challenges`, `user_challenges` |
| 2.6 Ranking evolucionado | ⏳ pendiente | semanal/mensual derivado |
| 2.7 Ligas privadas | ⏳ pendiente | `leagues`, `league_members` |
| 2.8 Social foundation | ⏳ pendiente | perfil público + `user_activity` (ver [PHASE-2-SOCIAL.md](./PHASE-2-SOCIAL.md)) |
| 2.9 Analytics | ⏳ pendiente | eventos (profile_view, achievement_unlocked, …) |
| 2.10 QA/seguridad/perf | 🔄 continuo | Ver [PHASE-2-QA.md](./PHASE-2-QA.md) |

## Incremento entregado (2.3 + 2.4)

**Perfil (`/perfil`)** — ruta protegida (cualquier usuario autenticado, free-to-play):
- Nivel derivado de `total_points` (Novato→Leyenda, umbrales en `config/levels.js`).
- Stats: posición ranking (server), pronósticos, marcadores exactos, precisión (derivada), racha actual y mejor racha.
- Logros (badges) y historial reciente.

**Gamificación (logros)** — catálogo extensible + desbloqueo server-side:
- Colección `achievement_definitions` (catálogo) + `user_achievements` (desbloqueos).
- Hook `gamification.pb.js` (reacciona a cambios de stats en `users`; no toca el scoring).
- Rachas persistidas (`users.current_streak`, `users.best_streak`).

**Degradación con gracia**: el frontend deriva métricas/logros desde datos existentes si
las colecciones/campos nuevos aún no están desplegados → **no rompe nada** en despliegue parcial.

## Garantías de compatibilidad (verificadas)
- No se modificó: auth, `predictions-scoring.pb.js`, matches, admin, SEO Fase 1, despliegue.
- Migraciones históricas intactas; las nuevas son idempotentes.
- Lint ✅ · build ✅ · sin errores de consola.

## Próximo incremento sugerido
**2.5 Retos** (reutiliza el mismo patrón catálogo+hook que logros) o **2.7 Ligas privadas**
(mayor impacto en crecimiento orgánico). Decisión de producto.
