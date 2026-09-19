# NelPlay — SEO / GEO / AEO Roadmap

> Fase 1 (2026-09-19). Base técnica de descubrimiento: branding, arquitectura de
> navegación, metadata dinámica, datos estructurados y páginas institucionales/legales.

---

## 1. Estado actual (scorecard)

| Área | Estado | Notas |
|---|---|---|
| **SEO técnico** | 🟢 Bueno | `robots.txt` bloquea rutas privadas, `sitemap.xml` solo con URLs públicas canónicas, canonical por página. |
| **SEO on-page** | 🟢 Bueno | Metadata dinámica (title/description/canonical/robots) por ruta, H1 único por página, jerarquía H2/H3. |
| **SEO contenido** | 🟡 Inicial | Home + `/sobre-nelplay` con contenido real. Faltan clusters editoriales (blog, equipos, competiciones). |
| **GEO / AEO** | 🟢 Bueno | `/sobre-nelplay` con respuestas directas (qué/cómo/puntos), FAQ visible + `FAQPage` JSON-LD que coincide con el texto. |
| **Datos estructurados** | 🟢 Bueno | `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`. Solo datos reales. |
| **Indexabilidad** | 🟢 Bueno | Rutas privadas noindex/bloqueadas; secciones "próximamente" en `noindex` (evita thin content). |
| **Internal linking** | 🟡 Inicial | Header, footer y breadcrumbs enlazan las secciones clave. Falta grafo partido↔equipo↔competición. |
| **Performance** | 🟡 Medio | Bundle ~660 KB (gzip ~195 KB). Aceptable, pero conviene code-splitting real (ver limitación SPA). |
| **Rendering (SPA)** | 🟠 Limitación | React SPA sin SSR: el contenido se renderiza con JS. Metadata base en `index.html` cubre a crawlers sin JS; el resto requiere ejecución JS (Googlebot sí ejecuta). Ver §4. |

---

## 2. Resultados de la auditoría técnica (Fase 1)

1. **URLs indexables**: `/`, `/sobre-nelplay`, `/ranking`, `/terminos`, `/privacidad`, `/cookies`, `/juego-responsable`, `/afiliados`.
2. **URLs no indexables**: `/admin`, `/login`, `/signup`, `/password-reset`, `/inscription`, `/matches`, `/my-predictions`, `/todos-los-pronosticos` (bloqueadas en robots), `/retos`, `/ligas`, `/comunidad` (noindex).
3. **Sitemap**: `public/sitemap.xml` — solo URLs públicas canónicas.
4. **Robots**: `public/robots.txt` — permite público, bloquea rutas de cuenta/admin, referencia sitemap.
5. **Canonicals**: uno por página vía `<Seo>` (dominio `https://nelplay.com`). `/leaderboard` redirige a `/ranking` (evita duplicado).
6. **Titles**: dinámicos, plantilla `"<página> | NelPlay"`; Home `"Pronósticos de fútbol y comunidad futbolera | NelPlay"`.
7. **Meta descriptions**: únicas por página.
8. **H1**: uno por página, con intención SEO (Home: "Pronósticos de fútbol y comunidad futbolera").
9. **Structured data**: Organization + WebSite (global), WebPage + BreadcrumbList + FAQPage (páginas).
10. **Open Graph / Twitter**: dinámicos por página + defaults en `index.html`.
11. **Internal linking**: Header (nav principal), Footer (producto + legal), breadcrumbs en páginas profundas.
12. **Imágenes**: logos con `alt` descriptivo y dimensiones; hero por CSS (sin imagen con branding de apuestas).
13. **Performance**: build OK; bundle 660 KB. Pendiente: dividir vendors pesados (recharts) fuera de la Home.
14. **Bundle size**: ~660 KB (gzip ~195 KB).
15. **Problemas SEO corregidos**: title genérico "Hostinger Horizons", `sitemap` con `/login` `/signup`, `robots` sin bloqueos, ausencia de OG/canonical/structured data.
16. **Problemas GEO corregidos**: ausencia de página institucional y de definición clara extraíble; añadidos `/sobre-nelplay` + FAQ.
17. **Recomendaciones futuras**: ver §3 y §4.

---

## 3. Prioridades

### 🔴 Alta
- **SEO de partidos** (`/partidos/<equipo-a>-vs-<equipo-b>`) con datos reales de PocketBase (matches es lectura pública) + `SportsEvent` JSON-LD.
- **Página pública de partidos** (`/partidos`) para descubrimiento sin login (hoy `/matches` está tras inscripción).
- **Prerender/SSG** de rutas públicas clave para robustez SEO (ver §4).

### 🟡 Media
- Páginas de **competiciones** (`/competiciones/<slug>`) y **equipos** (`/equipos/<slug>`) con datos reales.
- **Blog** (`/blog`) con contenido editorial de calidad (clusters temáticos).
- Grafo de **internal linking** partido ↔ equipo ↔ competición ↔ ranking.
- **OG images** dedicadas por sección (hoy se comparte una imagen; falta reemplazar el asset con branding "apuesta").

### 🟢 Baja
- **hreflang / i18n** (`/es`, `/en`) — solo cuando exista contenido real equivalente.
- Sitemap **dinámico** generado desde PocketBase.
- E-E-A-T en artículos (autor, fecha, fuentes).

---

## 4. Limitación arquitectónica: SPA sin SSR

- **Problema**: NelPlay es una SPA React + Vite. El contenido y la metadata por ruta se generan con JavaScript en el cliente. Los crawlers modernos (Googlebot) ejecutan JS, pero motores/asistentes de IA y algunos bots pueden no hacerlo de forma fiable.
- **Mitigación en Fase 1**: `index.html` incluye title/description/OG/canonical por defecto (visibles sin JS); el contenido crítico se renderiza en HTML semántico; JSON-LD inline.
- **Nota técnica**: `react-helmet` resultó inestable con React 18 en esta app (no aplicaba metadata). Se implementó un `<Seo>` propio que gestiona el `<head>` de forma imperativa y determinista.
- **Impacto**: medio. Suficiente para lanzar; limitante para escalar autoridad temática con miles de páginas.
- **Alternativa recomendada (fase futura)**: prerender estático (p. ej. `vite-plugin-ssr`/`react-static`/prerender de rutas públicas) o migrar rutas públicas a SSG. **No** migrar todo el proyecto a SSR (rompería el modelo de despliegue Hostinger Horizons). Prerender selectivo de rutas públicas es el mejor coste/beneficio.
- **Esfuerzo estimado**: medio (2-4 días) para prerender de rutas públicas.

---

## 5. Roadmap 30 / 60 / 90 días

### 30 días
- Página pública `/partidos` (lista) con datos reales + CTA a pronosticar.
- Plantilla `/partidos/<slug>` con `SportsEvent` JSON-LD (solo partidos con datos reales).
- Reemplazar OG image por un asset sports-tech sin branding de apuestas.
- Alta en Google Search Console + Bing Webmaster Tools (ver §6).

### 60 días
- Páginas de competiciones y equipos con datos reales de PocketBase.
- Internal linking partido ↔ equipo ↔ competición ↔ ranking.
- Prerender/SSG de rutas públicas clave.
- Primeros artículos de blog de alta calidad (2-3 clusters).

### 90 días
- Sitemap dinámico desde PocketBase (partidos/competiciones/equipos/artículos).
- Analytics de embudo Organic → Landing → Signup → Prediction → Return.
- Evaluar hreflang/i18n si hay tracción internacional.
- Métricas Core Web Vitals y optimización de bundle (split recharts/vendors).

---

## 6. Search Console / Webmaster readiness

- **Sitemap**: `https://nelplay.com/sitemap.xml`
- **Dominio canónico**: `https://nelplay.com`
- **Verificación**: pendiente (Google Search Console + Bing Webmaster Tools). Método recomendado: registro DNS TXT o meta-tag de verificación (añadir a `index.html` cuando se disponga del token — no incluir credenciales en el repo).
- **Métricas a monitorear**: cobertura/indexación, Core Web Vitals (LCP/INP/CLS), consultas y CTR, errores de rastreo, structured data válido.

---

## 7. Analytics SEO (eventos preparados — pendientes de conectar)

`organic_visit`, `search_landing`, `match_view`, `competition_view`, `team_view`,
`prediction_started`, `prediction_completed`, `signup_started`, `signup_completed`, `share_clicked`.

> Se conectarán en la fase de Analytics (Fase 8) a un proveedor real.
