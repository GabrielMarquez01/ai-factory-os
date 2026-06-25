---
name: idea-a-producto-master
version: 2.0
description: >
  Workflow maestro unificado v2. De la idea al producto digital publicado, monetizando
  y con ingresos automatizados. Cubre: investigación, marca, diseño premium (Stitch),
  desarrollo, funnel, marketing, lanzamiento, automatización y mejora continua.
  Conversacional: pregunta antes de ejecutar, predice el próximo paso, produce
  artefactos concretos en workspace/ en cada fase.
---

# Workflow Maestro v2: Idea → Diseño → Producto → Venta Automatizada

> **Para el agente:** Este workflow es CONVERSACIONAL e ITERATIVO.
> - Pregunta todo lo necesario ANTES de ejecutar cada fase
> - Al terminar cada fase, anuncia el entregable creado
> - Predice el próximo paso y pide confirmación
> - Usa `// turbo` en pasos paralelizables
> - Guarda todo en workspace/ con nombres descriptivos

---

## DIAGNÓSTICO INICIAL — Router de 2 minutos

Hacer TODAS estas preguntas en un solo mensaje antes de ejecutar cualquier cosa:

```
¡Hola! Voy a llevarte de la idea al producto vendiendo. Para darte el camino
más directo, necesito entender el punto de partida:

1. ¿Cuál es la idea o producto? (1-3 frases)
2. ¿Ya tienes nombre/marca, o empezamos desde cero?
3. ¿Qué tipo de producto buscas crear?
   (a) SaaS / App / Herramienta digital
   (b) Pack de templates o recursos para vender (PageDrop)
   (c) Marketing / presencia web para un negocio existente
   (d) Sistema de automatización / workflow (para vender o uso interno)
   (e) Aún no sé — tengo una idea pero no sé qué forma darle
4. ¿Tienes algo ya hecho? (diseño, código, copy...)
5. ¿Hay fecha límite o urgencia?
```

### Routing automático:

| Respuesta | Ruta | Primera acción |
|-----------|------|----------------|
| (a) SaaS/App | **Ruta A** | FASE 0.5 → Investigación |
| (b) Templates | **Ruta B PageDrop** | FASE 0.5 → Investigación |
| (c) Negocio existente | **Marketing Directo** | Leer `marketing-completo.md` |
| (d) Automatización | **Ruta D** | FASE 0.5 → Investigación + `n8n-workflow-generator` |
| (e) Idea difusa | **Ruta E** | FASE 0 → Estrategia primero |
| Tiene algo hecho | **Diagnóstico** | Preguntar qué necesita y entrar en la fase correcta |

---

## FASE 0 — ESTRATEGIA Y CLARIDAD *(solo Ruta E: idea difusa)*

> **Cuándo:** El usuario no sabe qué construir, para quién, o cómo monetizar.

### Skills: `strategic-thinking-partner` + `meta-agent-ceo` + `product-manager-toolkit`

```
Antes de construir, vamos a definir la dirección. Responde:
- ¿Qué problema concreto observas que nadie está resolviendo bien?
- ¿Quién sufre ese problema? (perfil: edad, ocupación, nivel tech)
- ¿Cómo gana dinero la solución? (venta única, suscripción, servicio)
- ¿Hay proyectos similares? ¿Qué hacen mal?
- ¿Cuál es tu ventaja real para resolver esto? (acceso, conocimiento, red)
```

### Ejecutar:
1. Activar `strategic-thinking-partner` → 2-3 opciones estratégicas con tabla impacto/esfuerzo/riesgo
2. Activar `meta-agent-ceo` → definir si es iniciativa Core, Growth o Bet
3. Activar `product-manager-toolkit` Módulo D → definir North Star Metric desde el inicio
4. Recomendar la opción con mejor señal de mercado y menor riesgo

### Entregable: `workspace/estrategia-[nombre].md`
```
- Tesis estratégica (1 párrafo)
- Opción elegida + justificación
- Hipótesis a validar
- North Star Metric propuesta (product-manager-toolkit módulo D)
- Próximos 3 pasos ejecutables
```

**Próximo paso:** "Tenemos claridad. Vamos a validar que el mercado realmente quiere esto. ¿Arrancamos?"

---

## FASE 0.5 — INVESTIGACIÓN DE MERCADO LATAM *(todas las rutas)*

> **Cuándo:** Siempre, antes de diseñar o codear. Toma 15-30 min y ahorra semanas.

### Skills: `latam-market-research` + `product-manager-toolkit` (Módulo B — entrevistas)

```
Para investigar tu mercado necesito:
1. ¿Nicho o categoría específica? (ej: "templates para clínicas dentales")
2. ¿A qué países apuntas? (MX, CO, AR, BR o toda LATAM)
3. ¿Cliente es B2B (negocios) o B2C (consumidor final)?
4. ¿Conoces competidores directos? (nombrarlos si sabes)
5. ¿Tienes precio tentativo en mente?
```

### Ejecutar:
1. Analizar top 5 competidores: pricing, propuesta, fortalezas, debilidades
2. Mapear keywords LATAM por intención (transaccional, informacional, comparación)
3. Identificar 3 huecos de mercado (alta demanda + baja oferta)
4. Recomendar positioning y precio objetivo
5. Si hay usuarios disponibles → activar `product-manager-toolkit` Módulo B: entrevistar 3-5 personas del público objetivo para extraer pain points, citas textuales y disposición a pagar
6. Decisión: **Go ✅ / Pivot ↩ / Drop ❌**

### Entregable: `workspace/research/market-report-[nicho].md`
```
- Top 5 competidores analizados
- Keywords principales (10 con volumen estimado)
- Benchmark de precios en LATAM
- 3 oportunidades identificadas
- Insights de entrevistas (si aplica): pain points, citas, disposición a pagar
- Posicionamiento recomendado
- Decisión: Go / Pivot / Drop
```

**Human Gate:** "¿Confirmas la decisión Go y el posicionamiento propuesto?"

---

## FASE 1 — VALIDACIÓN DE MERCADO

> **Cuándo:** Siempre, especialmente si la idea no ha sido probada con usuarios reales.
> **Skip:** Si ya tienes ventas previas o el mercado es evidente.

### Skill: `market-validation-engine`

### Ejecutar:
1. Formular hipótesis: "Creemos que [segmento] tiene [dolor] y pagará [precio]"
2. Diseñar experimento mínimo: smoke test, landing + waitlist, o pre-venta
3. Definir umbral: **Go** si X señales en Y días
4. Si es **Drop** → volver a FASE 0 con hipótesis alternativa

### Entregable: `workspace/validacion-[nombre].md`
```
- Hipótesis con criterio de falsación
- Experimento mínimo recomendado
- Umbrales numéricos: Go / Hold / Drop
- Decisión final
```

---

## FASE 2 — IDENTIDAD DE MARCA

> **Cuándo:** Producto sin marca definida. Si ya tiene marca, solo actualizar `estilo-visual.json`.

### Skill: `estilo-marca`

```
Para construir la identidad visual necesito:
1. Nombre del producto (máx 2 palabras, pronunciable en ES/EN)
2. Sector (tech, salud, educación, finanzas, moda, gastronomía...)
3. Público objetivo (edad, rol, nivel de ingreso)
4. 3 palabras que definen la personalidad de marca
5. Referencias visuales (links o marcas que admiras el estilo)
```

### Verificar antes de continuar:
- ✅ Dominio .com/.app disponible
- ✅ Usuario libre en Instagram y X
- ✅ Tagline usa fórmula: **"Haz [RESULTADO] sin [PROBLEMA]"**

### Ejecutar:
1. Leer y actualizar `agent/skills/estilo-marca/recursos/estilo-visual.json`
2. Ajustar paleta al sector (verde=salud, azul=tech, violeta=premium, naranja=educación, negro=lujo)
3. Actualizar `agent/skills/estilo-marca/recursos/guia-de-textos.md`
4. Generar: tagline, 3 CTAs de prueba, palabras prohibidas del sector

### Entregable:
- `estilo-visual.json` actualizado con datos reales
- `guia-de-textos.md` con tono, tagline, CTAs, vocabulario de marca

---

## FASE 3 — DISEÑO UI PREMIUM CON STITCH

> **Cuándo:** Siempre antes de escribir HTML. El diseño guía el desarrollo, no al revés.
> **Herramientas:** Stitch MCP + `stitch-designer` + `premium-ui-system`

```
Antes de diseñar en Stitch, confirma:
- ¿Hay colores o referencias adicionales para las pantallas?
- ¿Prefiere estilo dark (premium/tech) o light (salud/educación)?
- ¿Las pantallas son para desktop, mobile o ambos? (recomendado: ambos)
```

### Pantallas a generar:

#### Ruta A y B — Pantallas base (siempre):
| # | Pantalla | Device | Prompt base |
|---|----------|--------|-------------|
| 1 | Hero/Landing | DESKTOP | Hero con aurora gradient, headline + CTA + social proof |
| 2 | Features/Producto | DESKTOP | Bento grid con los beneficios principales |
| 3 | Pricing | DESKTOP | 3 tiers, tier medio destacado, garantía visible |
| 4 | Checkout/Compra | DESKTOP | Flujo de pago simple, trust badges |
| 5 | Thank You + Upsell | DESKTOP | Confirmación + oferta de upgrade |
| 6 | Hero Mobile | MOBILE | Versión responsive del Hero |
| 7 | FAQ + Testimonios | DESKTOP | Social proof + objeciones resueltas |

#### Ruta B adicional — PageDrop:
| # | Pantalla | Device | Descripción |
|---|----------|--------|-------------|
| 8 | Galería templates | DESKTOP | Showcase de todos los templates del nicho |
| 9 | Template detail | DESKTOP | Vista individual con preview y features |

### Instrucciones de prompt para Stitch (siempre incluir):
```
Dark premium interface. [ACCENT_COLOR] as primary accent.
Typography: Space Grotesk for headlines, Inter for body.
Real content (not placeholders): [headline], [features], [prices].
Glassmorphic cards with subtle borders and backdrop blur.
Aurora gradient background in hero section.
LATAM market, Spanish copy.
Style: luxury minimal, similar to Linear/Vercel/Stripe.
```

### Ejecutar:
1. `mcp_StitchMCP_create_project` → crear proyecto "[NOMBRE]-ui"
2. Para cada pantalla → `mcp_StitchMCP_generate_screen_from_text`
3. Refinar lo que no convence → `mcp_StitchMCP_edit_screens`
4. Opcional A/B → `mcp_StitchMCP_generate_variants` (3 variantes del hero)

### Entregable:
- Proyecto Stitch con 7-9 pantallas aprobadas
- Screenshots exportados para marketing materials

**Human Gate:** "Aquí están los diseños. ¿Aprobamos y pasamos a construir el HTML?"

---

## FASE 4 — DESARROLLO PREMIUM

> **Cuándo:** Después de aprobar diseño en Stitch.
> **Skills:** `crear-landing` + `premium-ui-system` + `product-manager-toolkit` (PRD) + `comoding` (back/lógica/APIs)
>
> **Reparto:** `crear-landing` + `premium-ui-system` construyen el front (HTML/CSS premium).
> **`comoding`** construye el back y la lógica: Express, agente, persistencia RTDB, conexión de
> APIs (YouTube Data API, Stripe, webhooks) y tests. Conoce las trampas del stack (imports ESM
> sin `.js`, fallback de RTDB) y verifica como producción (`npm run build && npm run start`),
> no solo en dev. No declara "listo": hace handoff al gate de calidad (FASE 7.5).

### Paso previo opcional — PRD del producto
Para features o productos complejos (SaaS, app), antes de codear activar
`product-manager-toolkit` Módulo C para generar un PRD de 1 página que alinee:
- Qué se construye exactamente (y qué NO)
- Criterios de aceptación medibles
- Priorización RICE de las funcionalidades del MVP

```
Genera un One-Page PRD para [NOMBRE]:
Problema: [problema validado en FASE 1]
Usuarios: [segmento definido en FASE 0.5]
Solución propuesta: [lo que construiremos]
Métricas de éxito: [de la North Star Metric]
Fuera del alcance v1: [qué NO entra en MVP]
Guardar como: workspace/pm/prd-[nombre]-v1.md
```

### Importante: aplicar el Premium UI System
Antes de generar cualquier HTML, leer `agent/skills/premium-ui-system/SKILL.md`
para usar: aurora gradient, glassmorphism, Space Grotesk, botones con glow,
bento grid y micro-interacciones correctas.

---

### RUTA A — SaaS / App

#### Paso 1 — Landing principal
```
Usa premium-ui-system y estilo-marca.
Crea landing page completa para [NOMBRE]:
[DESCRIPCIÓN]. Basa el diseño en los mockups Stitch aprobados.
Incluye: aurora hero, bento features, 3-tier pricing, testimonios, FAQ, CTA final.
Guarda como workspace/landing-[nombre].html
```

#### Paso 2 — Capture page (lead magnet)
```
Crea página de captura minimalista premium.
Sin navbar ni footer. Aurora subtle en background.
Solo: badge "Recurso Gratuito" + headline + 3 bullets + formulario de email + social proof.
Guarda como workspace/captura-[nombre].html
```

#### Paso 3 — Sales page (long-form)
```
Crea sales page larga para conversión directa.
Estructura: hero problema → agitar → solución → features → proof → pricing → garantía → FAQ → CTA final.
Aplica CRO: precio anclado, tier medio destacado, badge 30 días, testimonios con resultados específicos.
Guarda como workspace/[nombre]-sales-page.html
```

#### Paso 4 — Verificación CRO automática
Activar `cro-optimizer` para revisar:
- Hero con beneficio en H1 (no feature)
- CTA visible above the fold
- Precio contextualizado vs alternativa cara
- Garantía visible junto al precio
- Mobile-friendly (botones ≥48px)

---

### RUTA B — Templates / PageDrop

#### Paso 1 — Templates del nicho (en paralelo)
```
// turbo
Crea 5 landing pages HTML/CSS premium para el nicho [NICHO]:
- [tipo negocio 1], [tipo negocio 2], [tipo negocio 3], [tipo negocio 4], [tipo negocio 5]
Cada una: 7 secciones, premium-ui-system, copy real del nicho, botón WhatsApp, mapa.
Guarda en workspace/pagedrop-[nicho]/templates/
```

#### Paso 2 — Landing de marca
```
Crea la landing de venta del PACK (la página que vende los templates).
Usa sales page long-form con: galería animada de previews, beneficio de cada template,
3-tier pricing ($29/$79/$149), comparación vs agencia, garantía 30 días, FAQ.
Aplica premium-ui-system completo.
Guarda como workspace/pagedrop-[nicho]/landing-venta.html
```

#### Paso 3 — Páginas SEO programáticas
```
// turbo
Usando programmatic-seo-latam: crea 10 páginas de nicho para [MARCA].
Nichos: [lista de 10 nichos relacionados].
Cada página: SEO optimizado, content único 1500 palabras, FAQ con schema markup.
Guarda en workspace/seo/[nicho].html
```

#### Paso 4 — Empaquetado
```
Organiza workspace/pagedrop-[nicho]/:
├── Individual/ → template-1.html + LEEME.md + LICENCIA.md
├── Pack/ → 5 templates + marketing-kit/ + LEEME.md + LICENCIA.md
└── Agencia/ → todos los templates + bonus + marketing-kit/ + LEEME.md + LICENCIA.md
```

### Entregables Ruta A:
- `workspace/landing-[nombre].html` — Landing principal premium
- `workspace/captura-[nombre].html` — Capture page
- `workspace/[nombre]-sales-page.html` — Sales page long-form
- `workspace/[nombre]-cro-report.md` — Reporte de CRO

### Entregables Ruta B:
- `workspace/pagedrop-[nicho]/templates/` — 5 templates premium
- `workspace/pagedrop-[nicho]/landing-venta.html` — Sales page del pack
- `workspace/seo/` — 10 páginas SEO programáticas
- Estructura de carpetas por tier lista para ZIP

---

## FASE 5 — COMERCIAL + CONTENIDO SEO

> **Skills:** `crear-comercial` + `kling-3-prompting` + `seo-content-engine` + `programmatic-seo-latam`

```
Para el comercial necesito:
1. 3 estadísticas de impacto (números: clientes, tiempo ahorrado, precio, etc.)
2. ¿Tienes imagen hero? (foto real, render o generada por IA)
3. Keywords principales para posicionar en Google
4. Competidores directos cuyo tráfico queremos capturar
5. ¿Qué plataformas son el destino del video? (web, Instagram, TikTok, YouTube, ads)
```

### Ejecutar en paralelo (`// turbo`):

#### Hilo A — Comercial animado HD (web) + Video IA (redes)

**Para la web (HTML animado):**
1. Generar HTML 1280×720 con 5 escenas (skill `crear-comercial`)
2. Script de voz en off: máx 40 palabras, tono LATAM cálido
3. Guardar `workspace/comercial-[nombre].html`

**Para redes sociales y ads (Kling 3.0 — cinematográfico):**
Activar `kling-3-prompting` para generar prompts de video IA:
```
Preguntar al usuario:
- ¿Quieres texto-a-video o animar una imagen existente?
- ¿Cuántas escenas o variantes del video?
- ¿Destino: Reels/TikTok (9:16) o YouTube/Web (16:9)?
```

Generar prompts para cada tipo de video:
- **Teaser de lanzamiento** (5-8s, 9:16): para Instagram Reels / TikTok
- **Demo del producto** (10-15s, 16:9): para LinkedIn / Twitter / landing
- **Commercial corto** (15s, multi-shot): para Meta Ads / YouTube Shorts

Guardar en `workspace/video/prompts-kling-[nombre].md`

**Herramientas externas (entregar prompts listos):**
- **Kling 3.0** (klingai.com): pegar los prompts generados → descargar video
- **ElevenLabs:** script de voz en off → Charlotte (español neutro)
- **Suno AI:** prompt de música de fondo (cinematic/minimal, 20s)
- **CapCut:** instrucciones de edición: video Kling + voz + música → exportar

#### Hilo B — SEO completo
1. Mapear 8-10 keywords por intención (transaccional, informacional, comparación)
2. Generar meta tags optimizados para landing principal
3. Generar schema markup JSON-LD (Product + FAQ + AggregateRating)
4. Generar 2 artículos de blog (tutorial 2000 palabras + comparación 1500 palabras)
5. Integrar todo en las páginas HTML generadas en FASE 4

### Entregables:
- `workspace/comercial-[nombre].html` + script + prompts para IA
- Meta tags y schema integrados en todos los HTMLs
- `workspace/blog/tutorial-[keyword].html`
- `workspace/blog/comparacion-[keyword].html`

---

## FASE 6 — FUNNEL DE VENTAS COMPLETO

> **Skills:** `sales-funnel-builder` + `email-sequence-ai` + `stripe-monetization-flow`

```
Para el funnel necesito confirmar:
1. ¿Plataforma de pago? (Gumroad para arrancar / Lemon Squeezy para escalar / Stripe para SaaS)
2. ¿Tienes lista de email existente? (para activar inmediatamente al lanzar)
3. ¿Cuál será el lead magnet? (PDF, checklist, template gratis, toolkit)
4. ¿Ofreces garantía? (recomendado: 30 días sin preguntas)
```

### El Funnel Completo tu Business OS:
```
TRÁFICO (SEO orgánico, Twitter, Reddit, LinkedIn, referidos)
        ↓
   LEAD MAGNET (PDF / Checklist / Template gratis)
   workspace/lead-magnet-[nombre].html
        ↓
   CAPTURE PAGE (email + nombre)
   workspace/captura-[nombre].html
        ↓
   SECUENCIA EMAIL (5 emails × 14 días)
   workspace/[nombre]-funnel/emails/secuencia-bienvenida.md
        ↓
   SALES PAGE (long-form con pricing 3 tiers)
   workspace/[nombre]-sales-page.html
        ↓
   CHECKOUT (Gumroad / Lemon Squeezy / Stripe)
        ↓
   THANK YOU + UPSELL (+20-40% AOV)
   workspace/[nombre]-thank-you.html
        ↓
   POST-COMPRA EMAIL (5 emails × 30 días)
   workspace/[nombre]-funnel/emails/secuencia-post-compra.md
        ↓
   REFERRAL → Ciclo de tráfico nuevo
```

### Pricing recomendado por ruta:

#### Ruta B (Templates/PageDrop):
```
Individual: $29 | Pack: $79 (más popular) | Agencia Pro: $149
Upsell: +$50 para subir de Individual a Pack (en thank you page)
Afiliados: 30% comisión, 60 días cookie → configurar en Lemon Squeezy
```

#### Ruta A (SaaS):
```
Free: funcionalidad básica (gancho)
Pro: $19/mes | Business: $79/mes
Trial: 14 días gratis → Stripe para suscripciones recurrentes
```

### Ejecutar:
1. `sales-funnel-builder` → lead magnet + capture page + sales page + thank you + upsell
2. `email-sequence-ai` → 2 secuencias (bienvenida 5 emails + post-compra 5 emails)
3. `stripe-monetization-flow` → configuración de pricing + checkout + webhook post-compra
4. Integrar todo en estructura de carpetas `workspace/[nombre]-funnel/`

### Entregable: `workspace/[nombre]-funnel/`
```
funnel/
├── lead-magnet.html       — recurso gratuito
├── capture-page.html      — página de captura de email
├── sales-page.html        — página de ventas (long-form)
├── thank-you-upsell.html  — post-compra con oferta de upgrade
├── emails/
│   ├── bienvenida.md      — 5 emails nurture (14 días)
│   └── post-compra.md    — 5 emails post-compra (30 días)
└── monetizacion-config.md — pricing, plataforma, afiliados, webhooks
```

---

## FASE 7 — MARKETING MULTICANAL

> **Skills:** `growth-hacking` + `marketing-digital`

```
Para el kit de marketing necesito confirmar:
1. ¿Cuál es la historia detrás del producto? (por qué lo construiste)
2. ¿Tienes testimonios o resultados previos?
3. ¿Cuál es la plataforma principal donde está tu audiencia?
4. ¿Hay fecha específica de lanzamiento?
```

### Generar pack completo (`// turbo`):

```
Genera el kit de marketing de lanzamiento para [NOMBRE]:

1. Hilo de Twitter/X (12 tweets: hook + historia del proceso + resultado + CTA)
2. Post Reddit para r/sideproject + r/webdev (historia de construcción, value-first)
3. Post LinkedIn (storytelling profesional, hook provocador, soft CTA)
4. Listing ProductHunt completo (tagline 60 chars + descripción + primer comentario)
5. Email de lanzamiento para lista de suscriptores
6. 5 posts de Instagram/Reels con copy e instrucciones de diseño
7. Hilo de respuestas comunes (FAQ para comentarios en ProductHunt)

Tono: LATAM auténtico, resultados específicos, sin hype vacío.
```

### Reglas de distribución:
- Twitter: primer tweet < 240 chars, sin hashtags en tweet #1
- Reddit: lead con valor, no venta — responder TODOS los comentarios
- ProductHunt: publicar **martes 8:01 AM PST** para máxima visibilidad
- LinkedIn: "link en los comentarios" (el algoritmo premia posts sin links externos)

### Entregable: `workspace/marketing-kit-[nombre]/`
```
marketing-kit/
├── twitter-thread.md
├── reddit-sideproject.md
├── linkedin-post.md
├── producthunt-listing.md
├── email-lanzamiento.md
├── instagram-posts.md
└── faq-respuestas.md
```

---

## FASE 7.5 — GATE DE CALIDAD (obligatorio antes de lanzar)

> **Cuándo:** Siempre, entre FASE 7 y FASE 8. No es opcional.
> **Regla dura:** un hallazgo **Crítico** de `/auditoria-de-seguridad` **BLOQUEA** el lanzamiento.
> Las cuatro auditorías se corren EN ESE ORDEN; si alguna lanza un Crítico, se corrige antes de continuar.

### Ejecutar en orden:

1. **`/validacion-visual`** — Playwright abre la app como usuario real; prueba todos los flujos de punta a punta (landing → capture → checkout → thank you). No avanzar si hay bugs de UI visibles.

2. **`/auditoria-profunda`** — Verifica que la config del usuario se aplique, que los datos persistan (no solo en caché), y que los permisos no filtren entre usuarios. En el stack tu Business OS: confirmar que RTDB no esté en fallback a memoria.

3. **`/auditoria-de-seguridad`** — Caza secretos expuestos, reglas de RTDB débiles, IDOR, headers faltantes, XSS, inyección de prompts. **Un hallazgo Crítico aquí detiene el flujo completo.**

4. **`/auditoria-performance`** — Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), latencia RTDB, peso de assets, fugas de memoria. Meta mínima: LCP verde en mobile.

### Entregable:
- Reporte de cada auditoría en `.qa-reports/gate-lanzamiento-[nombre]-[fecha]/`
- Checklist firmado con severidad máxima encontrada y veredicto: **LISTO / BLOQUEADO**

**Human Gate:** "Las 4 auditorías pasaron sin Críticos. ¿Confirmas el lanzamiento?"

---

## FASE 8 — LANZAMIENTO

> Referencia completa: `lanzamiento-producto.md`

### Checklist pre-lanzamiento (verificar TODO):
- [ ] Gate de calidad FASE 7.5 pasado (sin hallazgos Críticos)
- [ ] Landing se ve bien en móvil y desktop (validado por `/validacion-visual`)
- [ ] Todos los CTAs tienen URLs reales
- [ ] Meta tags y favicon configurados
- [ ] Analytics instalado (GA4 o Plausible)
- [ ] Lead magnet se entrega automáticamente
- [ ] Precios configurados en Gumroad/Lemon Squeezy/Stripe
- [ ] Webhooks de post-compra activados
- [ ] Secuencia de email activada en Kit/Mailchimp
- [ ] Afiliados configurados

### Deploy — usar `/publicar` (no deploy manual):
```
Invocar: /publicar

El skill lleva la app desde el código hasta que el endpoint real
responde en la URL de producción. No declara éxito por "deploy verde"
— valida con curl/Playwright al endpoint real (/api/chat, checkout, etc.).

Caminos soportados:
  - Firebase Hosting + Functions → firebase deploy
  - Cloud Run → gcloud run deploy
  - PM2 / VPS → pm2 restart mi-business-os

Si el deploy converge en error, el skill diagnostica la causa raíz
(variables de entorno, imports ESM sin .js, RTDB en fallback, timeout)
y lo corrige en un loop de hasta 8 iteraciones antes de reportar.
```

### Secuencia de lanzamiento (día D):
| Hora | Acción |
|------|--------|
| 8:01 AM PST | Publicar en ProductHunt |
| 9:00 AM | Publicar hilo en Twitter/X |
| 10:00 AM | Post en Reddit (2-3 subreddits) |
| 11:00 AM | Post en LinkedIn |
| 12:00 PM | Email a lista de suscriptores |
| Todo el día | Responder TODOS los comentarios y menciones |
| 48 horas | Publicar update: "Ya [X] unidades vendidas, gracias!" |

---

## FASE 9 — MONETIZACIÓN AUTOMATIZADA

> **Skills:** `n8n-workflow-generator` + `email-sequence-ai`
> **Cuándo:** Después del primer lanzamiento — construir el sistema de ingresos pasivos.

### Los 4 workflows de automatización a activar:

#### Workflow 1 — Entrega automática post-compra
```
Gumroad/LemonSqueezy webhook → n8n:
- Enviar email con link de descarga (inmediato)
- Agregar a lista de email con tag del producto comprado
- Crear registro en Airtable/Notion (CRM de compradores)
- Si compró Agencia → invitar a comunidad Discord/Slack
- Programar email de upsell en día 3
- Programar email de testimonial en día 30
```

#### Workflow 2 — Lead magnet → nurture → venta
```
Formulario de captura → n8n:
- Entregar lead magnet automáticamente
- Iniciar secuencia de 5 emails (14 días)
- Tag en CRM: "lead-[nombre-producto]"
- Email 4 (día 7): oferta especial con descuento 20%
- Email 5 (día 14): urgencia + última oportunidad
```

#### Workflow 3 — Reporte semanal automático
```
Schedule (viernes 8am) → n8n:
- Fetch Gumroad API → ventas de la semana
- Fetch GA4 API → tráfico y conversión
- Fetch email platform → subscribers y apertura
- Claude AI → generar resumen ejecutivo con acción sugerida
- Enviar reporte a email + guardar en Notion
```

#### Workflow 4 — Monitoreo de competidores
```
Schedule (lunes 9am) → n8n + Firecrawl:
- Scrape pricing de top 5 competidores
- Detectar cambios vs semana anterior
- Si hay cambio → alerta en Telegram/Slack
- Guardar snapshot en Notion
```

### Ejecutar:
Activar `n8n-workflow-generator` con estos 4 workflows.
Generar JSONs importables en `workspace/automations/`.

### Entregable: `workspace/automations/`
```
automations/
├── 01-entrega-post-compra/
│   ├── README.md
│   ├── flow-diagram.md
│   └── n8n-config.json
├── 02-lead-magnet-nurture/
│   └── ...
├── 03-reporte-semanal/
│   └── ...
└── 04-monitoreo-competidores/
    └── ...
```

**Próximo paso:** "El sistema de ingresos automatizados está activo. Configuremos el ciclo de mejora continua."

---

## FASE 10 — ITERACIÓN Y MEJORA CONTINUA

> **Skills:** `cro-optimizer` + `seo-content-engine` + `programmatic-seo-latam`
> **Referencia:** `retroalimentacion-mejora.md`
> **Cadencia:** Semanal (viernes) + Mensual (último viernes del mes)

### Rutina semanal (automática vía workflow n8n):
El Workflow 3 (reporte automático) se encarga de recopilar datos.
El agente analiza y propone:
1. ¿Conversión < 2%? → Ejecutar `cro-optimizer` en la landing
2. ¿Template más vendido? → Crear variante del mismo estilo para nuevo nicho
3. ¿Keyword con tráfico creciente? → Crear nueva página SEO con `programmatic-seo-latam`
4. ¿3+ personas pidieron lo mismo? → Priorizar ese feature/template en siguiente sprint

### Rutina mensual (mejora profunda):
```
1. Auditoría CRO completa de todas las páginas activas (cro-optimizer)
2. Crear 5-10 nuevas páginas SEO programáticas (programmatic-seo-latam)
3. Actualizar la secuencia de email con testimonios nuevos y objeciones detectadas
4. Evaluar nuevos nichos o features → activar product-manager-toolkit:
   - Módulo A (RICE): priorizar backlog de features o nichos
   - Módulo B (Entrevistas): analizar feedback de compradores del mes
   - Módulo C (PRD): escribir spec de la próxima feature a construir
5. Revisar si hay nuevas herramientas/skills en skills.sh que integrar al stack
6. Documentar aprendizajes en Engram (What/Why/Where/Learned)
7. **`/save-status`** — checkpoint de cierre de sesión: guardar estado en SESSION-STATUS.md y promover decisiones clave a engram/
```

### KPIs de referencia:
| Métrica | Meta semanal | Meta mensual | Acción si falla |
|---------|-------------|--------------|----------------|
| Ventas | +5 unidades | +25 unidades | Revisar CTA y pricing |
| Revenue | +$300 | +$1,500 | Activar upsell o bundle |
| Conversión landing | >2% | >3% | Ejecutar `cro-optimizer` |
| Email list | +30 subs | +150 subs | Mejorar lead magnet |
| Páginas SEO | +2 nuevas | +10 nuevas | `programmatic-seo-latam` |
| Costo adquisición | <$5/lead | <$3/lead | Optimizar canal de mayor CPA |

---

## Mapa visual del flujo completo v2

```
DIAGNÓSTICO INICIAL (2 min) → Routing automático
     │
     ├── Idea difusa → FASE 0: ESTRATEGIA
     │                 (strategic-thinking-partner + meta-agent-ceo)
     │                          ↓
     └──────────────────────────┤
                                ↓
              FASE 0.5: INVESTIGACIÓN LATAM
              (latam-market-research) → Market Report
                                ↓
              FASE 1: VALIDACIÓN → Go/Hold/Drop
              (market-validation-engine)
                                ↓ [Solo si Go]
              FASE 2: IDENTIDAD DE MARCA
              (estilo-marca) → design system actualizado
                                ↓
              FASE 3: DISEÑO UI PREMIUM
              (stitch-designer + premium-ui-system) → 7-9 pantallas Stitch
                                ↓ [Human Gate: aprobar diseño]
              FASE 4: DESARROLLO
              ├─ Ruta A: landing + captura + sales page
              └─ Ruta B: templates + seo programático + empaquetado
              (crear-landing + premium-ui-system + cro-optimizer)
                                ↓
              FASE 5: COMERCIAL + SEO
              (crear-comercial + seo-content-engine)
                                ↓
              FASE 6: FUNNEL COMPLETO
              (sales-funnel-builder + email-sequence-ai + stripe-monetization-flow)
                                ↓
              FASE 7: MARKETING MULTICANAL
              (growth-hacking + marketing-digital)
                                ↓
              FASE 7.5: GATE DE CALIDAD ← OBLIGATORIO
              /validacion-visual → /auditoria-profunda
              → /auditoria-de-seguridad → /auditoria-performance
              [Human Gate: sin Críticos → GO]
                                ↓
              FASE 8: LANZAMIENTO
              /publicar (loop hasta endpoint real responde)
              → workflow: lanzamiento-producto.md
                                ↓
              FASE 9: AUTOMATIZACIÓN (ingresos pasivos)
              (n8n-workflow-generator) → 4 workflows activos
                                ↓
              FASE 10: ITERACIÓN CONTINUA
              Cadencia: semanal + mensual
              (cro-optimizer + programmatic-seo-latam + engram)
```

---

## Tabla completa de Skills del ecosistema

| Skill | Fase | Entregable clave |
|-------|------|-----------------|
| `strategic-thinking-partner` | 0 | Mapa de decisiones + opciones estratégicas |
| `meta-agent-ceo` | 0 | Priorización Core/Growth/Bets |
| `product-manager-toolkit` | 0, 0.5, 4, 10 | RICE, PRD, entrevistas, North Star, roadmap |
| `latam-market-research` | 0.5 | Market Report con competidores + keywords |
| `market-validation-engine` | 1 | Validation Pack Go/Hold/Drop |
| `estilo-marca` | 2 | estilo-visual.json + guia-de-textos.md |
| `stitch-designer` | 3 | 7-9 pantallas premium (desktop + mobile) |
| `premium-ui-system` | 3-4 | HTML/CSS con aurora, glassmorphism, bento grid |
| `crear-landing` | 4 | Landing pages HTML funcionales |
| `comoding` | 4 | Back/lógica/APIs: Express, agente, RTDB, YouTube Data API, Stripe, webhooks, tests |
| `cro-optimizer` | 4, 10 | Auditoría + correcciones de conversión |
| `crear-comercial` | 5 | Comercial HTML animado (para web) |
| `kling-3-prompting` | 5 | Prompts cinematográficos para Kling 3.0 (video IA para redes/ads) |
| `seo-content-engine` | 5 | Meta tags + schema + artículos blog |
| `programmatic-seo-latam` | 4B, 10 | 10-50 páginas SEO por nicho |
| `sales-funnel-builder` | 6 | Lead magnet + capture + sales page + upsell |
| `email-sequence-ai` | 6 | 2 secuencias × 5 emails (nurture + post-compra) |
| `stripe-monetization-flow` | 6 | Pricing + checkout + upsell configurado |
| `growth-hacking` | 7 | Content pack: Twitter + Reddit + LinkedIn + PH |
| `marketing-digital` | 7 | Posts redes sociales + copy de marca |
| `n8n-workflow-generator` | 9 | 4 workflows de automatización importables |
| `orquestador-nivel-3` | Complejo | DAG + contratos multi-agente |
| `engram-memory-protocol` | Continuo | Registros What/Why/Where/Learned |
| `catalizador-tareas` | Continuo | Routing al mejor ejecutor |
| `/save-status` | Transversal | Checkpoint de sesión → SESSION-STATUS.md + engram/ |
| `/validacion-visual` | 7.5 | QA Playwright: flujos de punta a punta como usuario real |
| `/auditoria-profunda` | 7.5 | Config, persistencia RTDB (no solo caché), permisos $uid |
| `/auditoria-de-seguridad` | 7.5 | Secretos, IDOR, CSP, inyección — un Crítico bloquea el deploy |
| `/auditoria-performance` | 7.5 | Core Web Vitals, latencia RTDB, RSS Node, fan-out N+1 |
| `/publicar` | 8 | Loop hasta que el endpoint real responde en la URL de prod |

---

## Tiempos estimados por ruta

| Ruta | Sprint rápido | Completa | Con automatización |
|------|--------------|----------|--------------------|
| A — SaaS | 2-3 horas (fases 2-4) | 6-8 horas (fases 0-8) | +2 horas (fases 9-10) |
| B — Templates | 1-2 horas (fases 2-4) | 4-6 horas (fases 0-8) | +2 horas (fases 9-10) |
| Marketing negocio | 1 hora | 2-3 horas | +1 hora |

---

## Recursos externos integrados al stack

| Herramienta | Para qué | Activado en |
|-------------|----------|-------------|
| **Stitch** (Google) | Mockups UI | Fase 3 |
| **Kling 3.0** (klingai.com) | Video IA cinematográfico para redes y ads | Fase 5 |
| **Runway ML** | Video IA desde imagen | Fase 5 |
| **ElevenLabs** | Voz en off del comercial | Fase 5 |
| **Suno AI** | Música de fondo | Fase 5 |
| **CapCut** | Edición del video final | Fase 5 |
| **Gumroad** | Venta rápida inicial | Fase 6 |
| **Lemon Squeezy** | Venta escalable + VAT global | Fase 6 |
| **Stripe** | SaaS subscripciones | Fase 6 |
| **Kit (ConvertKit)** | Email marketing | Fase 6 |
| **n8n** | Automatización de procesos | Fase 9 |
| **Firecrawl** | Monitoreo competidores | Fase 9 |
| **GA4 + Clarity** | Analytics + heatmaps | Fase 10 |
| **Plausible** | Analytics privacy-first | Fase 10 |
| **ProductHunt** | Distribución viral | Fase 8 |
