# NelPlay AI — Modelo de Costos (FinOps)

> **Estado: DISEÑO.** Estimación paramétrica para dimensionar el costo operativo de
> NelPlay AI. Ver [`NELPLAY-AI-ARCHITECTURE.md`](./NELPLAY-AI-ARCHITECTURE.md).
>
> ⚠️ **Los precios son aproximados (rango de mercado a inicios de 2026) y DEBEN
> verificarse contra el proveedor elegido antes de decidir.** El objetivo aquí es
> el **orden de magnitud** y las palancas de control, no una factura exacta.

---

## 1. Supuestos de precio (por 1M de tokens)

Se modelan **dos tiers** (ver estrategia de LLM en la arquitectura §M):

| Tier | Input | Input cacheado | Output | Uso |
|---|---|---|---|---|
| **Económico** (clase mini/flash/haiku) | ~$0.30 | ~$0.03 | ~$1.20 | Intent + 90% de consultas Assistant |
| **Medio** (clase gpt‑4o/sonnet/gemini‑pro) | ~$3.00 | ~$0.30 | ~$15.00 | Coach y análisis de partido |

> El **prompt caching** (system prompt + reglas, ~2k tokens) reduce ~10× el costo de la parte fija en llamadas repetidas. Es la palanca #1.

---

## 2. Tokens por interacción (estimación)

| Componente | Tokens (aprox.) | Notas |
|---|---|---|
| System prompt (persona + reglas + políticas) | ~2,000 | **cacheado** tras la 1.ª llamada |
| Historial resumido | ~500 | resumen barato |
| Mensaje del usuario | ~50 | |
| Overhead de tool-calling + resultados de tools | ~600 | datos numéricos/factuales |
| Salida (respuesta) | ~350 (Assistant) / ~600 (Coach) | |

**Costo por mensaje (con caching):**

- **Assistant (económico)** ≈ system cacheado (2k·$0.03) + fresco (1.15k·$0.30) + salida (0.35k·$1.20) + intent (~$0.0001)
  ≈ **~$0.001 por mensaje** (una décima de centavo).
- **Coach/Analyst (medio)** ≈ system cacheado + fresco (~4k·$3.00) + salida (0.6k·$15.00)
  ≈ **~$0.02 por análisis**.

**Costo mezclado** (85% Assistant económico + 15% Coach/Analyst medio):
`0.85·$0.001 + 0.15·$0.02 ≈ $0.004 por mensaje`.

> Contraste (por qué importan las palancas): **sin caching y usando solo tier medio**, el costo por mensaje sube a ~$0.03–0.05 (≈10× más). El diseño económico no es opcional.

---

## 3. Escenarios de uso

| Escenario | % usuarios que usan IA | Mensajes/mes por usuario activo |
|---|---|---|
| **LOW** | 20% | 5 |
| **MEDIUM** | 40% | 20 |
| **HIGH** | 60% | 60 |

Fórmulas:
```
mensajes_mes   = usuarios · %activos · mensajes_por_activo
costo_mes       = mensajes_mes · $0.004        (costo mezclado)
costo_por_activo = mensajes_por_activo · $0.004
```

`costo_por_activo/mes`: **LOW ≈ $0.02 · MEDIUM ≈ $0.08 · HIGH ≈ $0.24**.

---

## 4. Costo mensual estimado por escala

### LOW (20% activos · 5 msg)
| Usuarios | Mensajes/mes | Costo/mes |
|---|---|---|
| 100 | 100 | ~$0.40 |
| 1,000 | 1,000 | ~$4 |
| 10,000 | 10,000 | ~$40 |
| 50,000 | 50,000 | ~$200 |
| 100,000 | 100,000 | ~$400 |

### MEDIUM (40% activos · 20 msg)
| Usuarios | Mensajes/mes | Costo/mes |
|---|---|---|
| 100 | 800 | ~$3 |
| 1,000 | 8,000 | ~$32 |
| 10,000 | 80,000 | ~$320 |
| 50,000 | 400,000 | ~$1,600 |
| 100,000 | 800,000 | ~$3,200 |

### HIGH (60% activos · 60 msg)
| Usuarios | Mensajes/mes | Costo/mes |
|---|---|---|
| 100 | 3,600 | ~$14 |
| 1,000 | 36,000 | ~$144 |
| 10,000 | 360,000 | ~$1,440 |
| 50,000 | 1,800,000 | ~$7,200 |
| 100,000 | 3,600,000 | ~$14,400 |

**Lectura**: el costo unitario por usuario activo es bajísimo (centavos/mes). El riesgo no es el precio por mensaje, sino el **volumen en HIGH a gran escala** (100k HIGH ≈ $14k/mes). Ahí entran los controles (§5) y el gating Premium (§6).

---

## 5. Control de costos (palancas)

| Palanca | Efecto | Prioridad |
|---|---|---|
| **Prompt caching** del system prompt+reglas | −~10× en la parte fija | Alta |
| **Modelo económico por defecto** + escalado por intención | Reserva el tier medio al 10–15% | Alta |
| **`AI_DAILY_LIMIT` por usuario** (p. ej. 10–20/día free) | Techo duro al gasto por usuario | Alta |
| **Rate limiting** (`express-rate-limit`, ya disponible) | Frena abuso/bots | Alta |
| **Respuestas cacheadas** para FAQs idénticas | Evita llamar al LLM | Media |
| **Resumen de conversación** al exceder contexto | Controla tokens de entrada | Media |
| **Coach solo Premium/teaser** | Saca el 15% caro del free | Media |
| **`AI_MAX_MESSAGE_LENGTH`** | Acota tokens de entrada | Baja |
| **Tool-calling eficiente** (no sobre-consultar) | Menos tokens de tools | Media |

**`AI_USAGE_LIMITS` (propuesta):**
```
free:    { daily_messages: 15, coach_analyses_per_month: 1, model: "economico" }
premium: { daily_messages: 200, coach_analyses_per_month: unlimited, model: "medio" }
```

---

## 6. Free vs Premium (impacto en costo)

- **Free**: Assistant (económico) + límite diario → costo/usuario ≈ **$0.02–0.08/mes**. Absorbible con publicidad.
- **Premium**: incluye Coach/Analyst (tier medio) + límites altos → costo/usuario mayor pero **pagado por la suscripción**. El gating alinea costo con ingreso.

Regla FinOps: **el free nunca debe poder disparar el tier caro sin límite.** Coach = teaser (1/mes) en free; completo en Premium.

---

## 7. Costo de implementación (una sola vez) vs operativo

| Concepto | Tipo | Nota |
|---|---|---|
| Desarrollo frontend (Command Center, widgets) | Desarrollo | UI + `aiClient.js` |
| Desarrollo API (orchestrator, tools, guards, auth) | Desarrollo | en `apps/api` existente |
| PocketBase | Desarrollo | mínimo; quizá `user_preferences`/`ai_usage` (fases futuras) |
| LLM | **Operativo** | según §4 |
| Hosting | Operativo | el API ya corre en Hostinger; sin nueva infra |
| Analytics/Observabilidad | Operativo | logging propio; proveedor de analytics a definir |

El costo operativo dominante es el **LLM**; el hosting no cambia porque el orchestrator vive en `apps/api` (ya desplegado).

---

## 8. Recomendación

1. Lanzar el **MVP Assistant** en tier económico con caching + `AI_DAILY_LIMIT`.
2. Instrumentar **tokens/costo/latencia por request** desde el día 1 (observabilidad §T de la arquitectura) para sustituir estas estimaciones por datos reales.
3. Revisar precios del proveedor elegido y recalcular con una **prueba A/B** de 1–2 semanas antes de escalar.
4. Introducir **Coach** detrás de Premium/teaser para acotar el tier medio.

> Todos los números de este documento son de **planeación**. Verificar precios y validar con métricas reales antes de comprometer presupuesto.
