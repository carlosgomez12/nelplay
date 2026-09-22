# NelPlay — Fase 2: QA, Seguridad y Performance

## Validado en este entorno ✅
- **Lint** (`eslint --quiet`): sin errores (web).
- **Build de producción** (`vite build`): OK. Bundle ~671 KB (gzip ~198 KB), +~11 KB vs Fase 1.
- **Arranque de la app**: React monta, Home renderiza, **sin errores de consola**.
- **SEO Fase 1**: intacto; `/perfil` marcado **noindex** (área privada).
- **Compatibilidad**: no se tocó auth, scoring, matches, admin ni despliegue.

## ⚠️ Constraint: PocketBase no ejecutable en este entorno
El binario de PocketBase es Linux; el entorno de desarrollo es Windows → **no se pudieron
ejecutar migraciones ni hooks localmente**. Se implementaron siguiendo el formato exacto
existente (v0.39.8) y con idempotencia. **Requieren validación en un PocketBase real**
(local Linux, staging, o el primer deploy) antes de promover a `main`.

### Checklist de validación en deploy (PocketBase)
- [ ] PocketBase arranca sin error tras aplicar las 4 migraciones nuevas (`migrations:up` / automigrate).
- [ ] `achievement_definitions` existe con 11 registros sembrados y `UNIQUE(code)`.
- [ ] `user_achievements` existe con `UNIQUE(user_id, achievement_code)` y reglas (`create/update/delete = null`).
- [ ] `users` tiene `current_streak` y `best_streak`.
- [ ] Al completar un partido: el scoring sigue funcionando **igual** (puntos correctos) y el hook `gamification` desbloquea logros / actualiza rachas sin loops (revisar logs `[gamification]`).
- [ ] Crear una predicción desbloquea `first_prediction`.
- [ ] No hay recursión infinita en `onRecordUpdate("users")` (el guard "solo guarda si cambió").

## Pruebas manuales de UI (tras deploy)
- [ ] `/perfil` (autenticado): carga nivel, stats, logros, historial.
- [ ] Usuario sin predicciones: perfil no rompe (0s, sin logros, sin historial).
- [ ] Bottom-nav "Perfil" → `/perfil`; menú de usuario → "Mi perfil".
- [ ] Responsive 375/390/768/1024 sin overflow horizontal.
- [ ] Degradación: si `user_achievements` no existe, los logros se derivan igual (fallback).

## Seguridad (revisado por diseño)
- [x] Escritura de logros/rachas **solo server-side** (reglas `null` / hooks).
- [x] Lectura de logros solo del dueño (`@request.auth.id = user_id`).
- [x] Perfil no expone `email`, `balance` (legacy), ni `odds` (legacy).
- [x] Posición de ranking calculada server-side (conteo por `total_points`).
- [x] Sin mass-assignment: el frontend no escribe stats.
- [ ] (Deploy) Verificar que un usuario no puede crear `user_achievements` vía API (regla `null`).

## Performance
- Perfil: 3–4 queries acotadas (usuario, conteo ranking, predicciones ≤500, matches del historial en 1 query). Aceptable.
- Hook `gamification`: por update de `users`, ~1 query de predicciones (≤200) + 1 de definiciones + ≤11 lookups. Aceptable a la escala actual.
- **Recomendación futura**: si crece el volumen, gatear el hook a cambios de campos relevantes y/o mover conteos a un `points_ledger` (ver DATA-MODEL §rankings).

## Riesgos abiertos
| Riesgo | Severidad | Acción |
|---|---|---|
| Migraciones/hook sin test local | Media | Validar en PocketBase real antes de `main` |
| Coste del hook en match masivo | Baja | Monitorear logs; optimizar si necesario |
| Orden `updated` como proxy cronológico de racha | Baja | Correcto para 1 predicción/usuario/partido; documentado |
