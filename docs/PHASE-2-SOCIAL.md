# NelPlay — Fase 2: Social Foundation (diseño, 2.8 — NO implementado aún)

> Objetivo: la **infraestructura mínima** de identidad y actividad, **no** una red
> social completa. Se implementará en el incremento 2.8.

## Qué SÍ se construirá (base)
- **Perfil público mínimo**: nombre, nivel, puntos, posición, logros públicos, racha.
  (Nunca email, balance legacy ni datos privados.)
- **Identidad NelPlay**: el usuario "existe" socialmente (nombre + progreso visible).
- **Actividad estructurada** (`user_activity`): eventos moderables generados por hooks
  (`achievement`, `streak`, `level_up`, `rank_up`). No texto libre inicialmente.
- **Comparación**: verse frente a otros vía ranking (global/liga/amigos).

## Qué NO se construirá todavía (fases posteriores)
- Chat privado / mensajería.
- Feed social avanzado / comentarios complejos.
- Sistema tipo red social completo.
- Contenido generado por el usuario de forma libre (riesgo de moderación).

## Consideraciones de diseño
- **Privacidad**: perfil público solo con campos allowlist; opción futura de perfil privado.
- **Moderación**: actividad estructurada (enum de tipos), no texto libre → moderable por diseño.
- **SEO**: un perfil público (si se habilita indexación) usaría `<Seo>` con datos reales;
  por defecto los perfiles son **noindex** hasta decidir una estrategia de indexación con valor.
- **Abuso**: nombres públicos; validar/moderar nombres ofensivos (fase futura).

## Relación con la futura IA
`user_activity` estructurada alimenta los "AI Insights" de engagement
(ver `NELPLAY-AI-ARCHITECTURE.md` §26): "tu rival de liga te superó", "subiste 7 puestos".
Se generan como **datos**, no como notificaciones manipuladoras (el usuario controla avisos).

## Dependencias
- 2.7 Ligas privadas (para "amigos"/"rival de liga").
- Gamificación (2.4) ya provee logros/rachas/niveles como eventos de actividad.
