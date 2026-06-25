# 🏭 Business OS — Sistema Operativo Para Tu Negocio con IA

> **"Construido por un fundador independiente. Documentado para la comunidad."**
>
> Este repositorio es un **Business OS listo para clonar y personalizar** — no un producto, sino el MÉTODO de operación que permite a una sola persona manejar múltiples líneas de negocio usando agentes de IA especializados.
>
> Incluye 38 skills documentados, 8 workflows DAG, código funcional en `templates/`, y un harness de evaluación que funciona con cualquier IA — Claude, GPT, Gemini, Groq, Llama u Ollama.

---

## ¿Qué es un "Business OS"?

Un Business OS (Sistema Operativo de Negocio) es la capa de inteligencia que coordina todos los agentes, workflows y herramientas de tu empresa.

```
Sin Business OS:          Con Business OS:
┌──────────────┐          ┌──────────────────────────────┐
│   Fundador   │          │          Fundador             │
│  hace TODO   │          │    (aprueba gates, no opera)  │
└──────────────┘          └───────────────┬──────────────┘
                                          │
                              ┌───────────▼───────────┐
                              │      Business OS       │
                              │  (orquesta todo)       │
                              └───┬───────┬───────┬───┘
                                  │       │       │
                              Agentes  Workflows  MCPs
```

**El resultado:** el fundador pasa de operar el negocio a dirigirlo.

---

## El Problema Que Esto Resuelve

Este sistema nació de operar 5 líneas de negocio activas con 1 persona:

| Pilar | Canal | Carga manual sin sistema |
|-------|-------|--------------------------|
| Infoproducto | Landing + pasarela de pagos | Responder DMs, cerrar preventa 1:1 |
| YouTube (2 canales) | Educativo + Animación | Guiones, edición, subtítulos, subida |
| E-commerce | Productos físicos con proveedor | Fotos, copy, mockups, inventario |
| App móvil | Next.js + Supabase | Dev + soporte + notificaciones |
| Merch 3D | Ropa física con marca | Diseño, proveedor, fulfillment |

**El resultado sin sistema:** 20–30 horas/semana de operación manual. Insostenible.

**El insight:** el cuello de botella no era el producto. Era el **sistema operativo del negocio**.

---

## La Solución: Agentes Especializados + Workflows DAG

```
Business OS
├── skills/       ← 38 agentes especializados (cada uno = un experto en su área)
├── workflows/    ← 8 workflows DAG (cada uno = un proceso de negocio documentado)
└── docs/         ← Documentación de referencia y contexto
```

### Los 5 Sistemas Que Reemplazaron las 30 Horas Semanales

**1. Agente de Ventas y Soporte 24/7**
- Chat embebido en el sitio — sin WhatsApp, sin costos de Meta
- Motor: Groq (velocidad) + modelo de razonamiento para casos complejos
- Vocabulario del avatar encodado como restricción técnica (no editorial)
- Gate freemium: consultas gratis → conversión a Pro
- Ver skill: `agente-frontoffice`

**2. Pipelines de Contenido — $0 de Infraestructura**
- Canal educativo: guión → TTS → escenas HTML → FFmpeg → YouTube API
- Canal de animación: personaje con identidad visual → pipeline CI/CD
- Episodios producidos sin intervención manual después del setup
- Ver skills: `video-pipeline-ai`, `content-pipeline`, `creative-director`

**3. Email Nurturing Automático Post-Compra**
- Se activa con cada compra (webhook Stripe/Polar → base de datos)
- Secuencia D+3 / D+7 / D+14 con contenido de valor real
- Tokens HMAC para unsubscribe seguro (CAN-SPAM / LFPDPPP)
- Ver skill: `email-nurturing-postcompra`

**4. Engram — Memoria Persistente del Negocio**
- Cada skill con `SKILL.md` individual: contexto, restricciones, ejemplos
- Workflows DAG versionados en git
- Nunca se pierde contexto entre sesiones con el agente
- Ver skill: `engram-memory-protocol`

**5. Producto Digital con Modelo Freemium**
- Auth anónima ("N días gratis sin registro")
- Seguimiento + predicciones por etapa
- Modelo Founders: acceso vitalicio a precio de lanzamiento
- Ver skills: `freemium-conversion`, `funnel-infoproducto`

---

## Arquitectura del Sistema

```
┌───────────────────────────────────────────────┐
│                   FUNDADOR                    │
│           (aprueba gates, no opera)           │
└─────────────────┬─────────────────────────────┘
                  │
      ┌───────────▼───────────┐
      │     AGENTE CEO/       │
      │   ORQUESTADOR L3      │
      └──────┬────────────────┘
             │
  ┌──────────┼───────────────┐
  ▼          ▼               ▼
Skills     Workflows        Gates
(38)         (8)           Humanos
  │          │               │
  ▼          ▼               ▼
┌──────────────────────────────────┐
│            PRODUCCIÓN            │
│ Sitio web · App · YouTube        │
│ Email · E-commerce · Comunidad   │
└──────────────────────────────────┘
```

**Modelo de autonomía:** cada agente tiene nivel L0/L1/L2 según su historial de confianza.
Ver skill `modelo-l0-l1-l2` para el sistema completo.

---

## 📚 Skills Disponibles (38)

Los skills son archivos `SKILL.md` que definen el rol, restricciones, proceso y ejemplos de un agente especializado, organizados en 7 áreas:

### 🧠 Sistema Operativo del Agente (Agent OS)

| Skill | Qué hace |
|-------|---------|
| `meta-agent-ceo` | Orquestador estratégico — coordina todos los demás agentes |
| `orquestador-nivel-3` | Descompone objetivos complejos en pasos ejecutables (DAG) |
| `catalizador-tareas` | Convierte una tarea vaga en subtareas concretas y ejecutables |
| `strategic-thinking-partner` | Socio estratégico para decisiones de negocio de alto impacto |
| `agent-architect` | Diseña la arquitectura de nuevos agentes y sistemas |
| `agent-team-design` | Cómo diseñar un equipo de agentes especializados que trabajan juntos |
| `build-your-own-agent` | Guía paso a paso para construir tu propio agente desde cero |

### ⚙️ Operación y Confiabilidad

| Skill | Qué hace |
|-------|---------|
| `engram-memory-protocol` | Memoria persistente entre sesiones — el cerebro institucional |
| `karpathy-protocol` | Auditoría pre-ejecución (principios de Andrej Karpathy) |
| `harness-universal` | Marco de evaluación para probar que cualquier agente funciona |
| `human-gate-protocol` | El humano aprueba, el agente ejecuta — circuit breakers y formatos |
| `modelo-l0-l1-l2` | Certificación de autonomía gradual por historial de confianza |
| `automation-engineer` | Diseña e implementa automatizaciones de procesos de negocio |

### 📢 Marketing y Distribución

| Skill | Qué hace |
|-------|---------|
| `marketing-digital` | Estrategia y ejecución de marketing en canales digitales |
| `growth-hacking` | Experimentos de crecimiento acelerado con recursos mínimos |
| `cro-optimizer` | Optimización de conversión en landing pages y funnels |
| `landing-page-conversion` | Landing pages de alta conversión: AIDA, copy, A/B testing |
| `seo-programatico` | SEO con IA: miles de páginas indexables generadas automáticamente |
| `social-content-system` | Sistema 1→10: una pieza → todos los formatos y canales |
| `email-sequence-ai` | Secuencias de email con IA ajustadas al nicho |
| `email-nurturing-postcompra` | Secuencia automática D+3/D+7/D+14 post-compra |
| `video-pipeline-ai` | TTS + escenas + FFmpeg + distribución a YouTube/Reels — $0 infra |
| `content-pipeline` | Pipeline de producción de contenido — de guión a publicación |
| `creative-director` | Dirección creativa de identidad visual y producción audiovisual |
| `affiliate-program` | Sistema de afiliados: estructura, tracking, kit del afiliado |

### 🔍 Investigación y Validación

| Skill | Qué hace |
|-------|---------|
| `latam-market-research` | Investigación de mercado especializada en LATAM |
| `market-validation-engine` | Motor de validación de demanda antes de construir |
| `inteligencia-nicho-maternidad` | Ejemplo de inteligencia de nicho (adaptable a cualquier nicho) |
| `analytics-dashboard` | Sistema de métricas: North Star, funnels, alertas automáticas |

### 💰 Monetización y Producto

| Skill | Qué hace |
|-------|---------|
| `funnel-infoproducto` | Sistema de preventa — vende antes de construir |
| `freemium-conversion` | Conversión Free → Pro con modelo Founders |
| `agente-frontoffice` | Agente de ventas y soporte 24/7 con RAG embebido |
| `pricing-strategy` | Framework de precios: valor percibido, modelo 3 planes, LatAm |
| `ecommerce-operator` | Operar tienda: selección de producto, proveedor, fulfillment |

### 👥 Escala y Comunidad

| Skill | Qué hace |
|-------|---------|
| `customer-success` | Retención: onboarding, health score, anti-churn |
| `team-os` | De 1 persona a equipo: cuándo contratar, cómo documentar para delegar |
| `community-building` | Flywheel de comunidad: de usuarios a embajadores de marca |

### ⚖️ Legal y Cumplimiento

| Skill | Qué hace |
|-------|---------|
| `compliance-latam` | LFPDPPP, datos de menores, derechos ARCO, checklist de lanzamiento |

---

## 🔄 Workflows (8)

| Workflow | Qué automatiza |
|---------|---------------|
| `idea-a-producto-master` | Del concepto al producto lanzado — flujo completo |
| `lanzamiento-producto` | Campaña de lanzamiento con gates de validación |
| `marketing-completo` | Ciclo completo de marketing desde estrategia hasta métricas |
| `contenido-multimedia-social` | Producción y publicación de contenido multicanal |
| `canal-tres-amigos` | Ejemplo: pipeline de producción de canal de animación (YouTube) |
| `ecommerce-activacion-pmf` | Activación de tienda e-commerce hasta alcanzar PMF |
| `reality-check-release-gate` | Gate de calidad antes de cualquier publicación o deploy |
| `retroalimentacion-mejora` | Loop de aprendizaje: resultado real → mejora del sistema |

---

## 📦 Código Funcional (`templates/`)

Además de la documentación, el repo incluye código real listo para copiar a tu proyecto:

```
templates/
├── supabase/
│   └── schema.sql          ← Base de datos completa: perfiles, eventos, RAG, email queue, afiliados
├── api/
│   ├── chat/route.ts       ← Endpoint de chat con RAG (Groq + Supabase pgvector)
│   ├── track/route.ts      ← Analytics de eventos (POST /api/track)
│   ├── webhooks/payment/   ← Webhook Polar/Stripe → activa nurturing automático
│   └── unsubscribe/route.ts ← Unsubscribe seguro con tokens HMAC (CAN-SPAM / LFPDPPP)
├── email/
│   ├── welcome.tsx         ← Email de bienvenida (React Email)
│   └── nurturing-d3.tsx    ← Email D+3 post-compra
└── harness/
    ├── test-cases.json     ← 5 casos de prueba de ejemplo (happy path, escalada, tono, seguridad)
    ├── run-harness.js      ← Runner AI-agnóstico (Groq, OpenAI, Claude, Gemini, Ollama)
    └── README.md           ← Guía completa del harness
```

### El Harness funciona con cualquier IA

```bash
# Sin costo — Ollama local
node templates/harness/run-harness.js --provider ollama --model llama3.2

# Groq (rápido y económico)
GROQ_API_KEY=gsk_... node templates/harness/run-harness.js --provider groq

# Claude
ANTHROPIC_API_KEY=sk-... node templates/harness/run-harness.js --provider anthropic

# OpenAI
OPENAI_API_KEY=sk-... node templates/harness/run-harness.js --provider openai --model gpt-4o-mini

# Tu propia API local
node templates/harness/run-harness.js  # apunta a http://localhost:3000/api/chat por default
```

---

## 🔗 Integración con el Ecosistema

Este Business OS está diseñado para integrarse con herramientas del ecosistema de IA para fundadores:

### SaaS Factory V5 (Claude Code)

[SaaS Factory V5](https://github.com/GabrielMarquez01/ai-factory-os) es el framework de construcción sobre el que opera este Business OS.

```
CÓMO SE COMPLEMENTAN:

BUSINESS OS (este repo)           SAAS FACTORY V5
Agentes de operación      ←→      Skills de construcción
  agente-frontoffice                add-login
  social-content-system             add-payments
  video-pipeline-ai                 ai (RAG, chat, vision)
  analytics-dashboard               supabase
  customer-success                  playwright-cli

El Business OS opera el negocio.
SaaS Factory V5 construye y mejora el producto.
Son complementarios — el Business OS usa los productos que SaaS Factory construye.
```

**Cómo integrar:**
```bash
# En tu proyecto Next.js construido con SaaS Factory V5,
# agrega este Business OS como submódulo o referencia:
git submodule add https://github.com/GabrielMarquez01/ai-factory-os .business-os

# O clónalo por separado como contexto para Claude Code:
# El agente puede leer los skills de ambos repositorios
```

### Business OS Template (Comunidad — Daniel)

El patrón genérico que inspiró este repositorio:
[github.com/GabrielMarquez01/business-os-template](https://github.com/GabrielMarquez01/business-os-template)

Incluye: **Mission Control dashboard + ClaudeClaw (Claude Agent SDK) + Finance OS**. Full-stack TypeScript, Next.js 16, Supabase.

**La relación:**
```
business-os-template (patrón genérico de Daniel)
    ↓ se instancia y adapta como
Business OS de tu negocio (este repo = ejemplo real con skills + workflows)
    ↓ se opera con
SaaS Factory V5 (el agente que construye y mejora)
```

Para conectar con la comunidad:
- Comparte tu fork en la comunidad de SaaS Factory (saas-factory-setup)
- Contribuye nuevos skills con el formato `SKILL.md`
- Adapta el skill `inteligencia-nicho-maternidad` a tu nicho y compártelo

### everything-claude-code (ECC)

Recurso de referencia de la comunidad Claude Code con patrones avanzados:

```
github.com/disler/everything-claude-code

Este repo adopta el patrón "Continuous Learning" de ECC
aplicado al contexto de operación de negocio:
Cada skill mejora con el uso → el sistema se vuelve más inteligente con el tiempo
```

---

## 🚀 Cómo Adaptar Este Sistema a Tu Negocio

### Paso 1: Clona como punto de partida

```bash
git clone https://github.com/GabrielMarquez01/ai-factory-os.git mi-business-os
cd mi-business-os
```

### Paso 2: Mapea tus operaciones más costosas en tiempo

```markdown
# mis-operaciones.md

| Operación | Horas/semana | ¿Repetible? | Skill candidato |
|-----------|-------------|-------------|----------------|
| [operación 1] | X h | Sí | [skill de este repo] |
| [operación 2] | X h | Sí | [skill a crear] |
```

### Paso 3: Personaliza un skill por área

Cada `SKILL.md` tiene secciones marcadas que debes adaptar:
- `[tu nicho]` → reemplaza con tu área de negocio
- `[avatar]` → reemplaza con tu cliente ideal
- `[vocabulario del nicho]` → reemplaza con el lenguaje de tu comunidad
- `[restricciones]` → agrega las específicas de tu sector (legales, éticas, de marca)

### Paso 4: Define los niveles de autonomía

```markdown
# AGENTS.md — crea este archivo en tu repo

| Agente | Nivel | Razón |
|--------|-------|-------|
| agente-bienvenida | L2 | 45 corridas sin incidentes |
| agente-soporte | L1 | En período de prueba |
| agente-pagos | L0 | Siempre requiere gate humano |
```

### Paso 5: Versiona como memoria institucional

```bash
git add skills/ workflows/ AGENTS.md mis-operaciones.md
git commit -m "feat: mi business OS — adaptado para [tu nicho]"
```

---

## Evidencia en Vivo

| Producto | URL | Estado |
|---------|-----|--------|
| Agente Sofía (ventas 24/7) | primerasmiradas.com | ✅ Producción |
| App mi·ma (tracker bebés) | somosmima.app | ✅ Producción |

---

## 🛠️ Stack Técnico de Referencia

```
Agentes:          Claude Code + SaaS Factory V5
Framework web:    Next.js 16 + TypeScript + React 19
Estilos:          Tailwind CSS 4
Base de datos:    Supabase (Auth + DB + RLS + pgvector para RAG)
Backend simple:   Node.js + Express + Railway
IA rápida:        Groq (llama-3.3-70b — velocidad + costo)
IA routing:       OpenRouter (modelo correcto para cada tarea)
Email:            Resend + React Email
Pagos:            Stripe (transaccional) + Polar (suscripciones)
Video/TTS:        Kokoro TTS + FFmpeg + HyperFrames
Automatización:   GitHub Actions + n8n
Testing:          Playwright
DNS/CDN:          Cloudflare
Memoria:          Git + Markdown (Engram protocol)
```

---

## Lecciones Aprendidas

### 1. La arquitectura importa más que las herramientas

El stack más simple que funcione gana. Evalúa el costo de operación ANTES de comprometerte.

### 2. "Documentado" ≠ "Ejecutado"

Si no está en git, no existe. El conocimiento del negocio debe sobrevivir a cualquier sesión de chat.

### 3. El vocabulario del avatar es una restricción técnica, no editorial

Encodar el lenguaje específico del nicho como gate obligatorio en cada skill — si el output viola el tono, se rechaza antes de llegar al usuario.

### 4. Las API keys en historial git son permanentes

Si llegan a un commit público, la rotación es la única salida. Siempre `${VARIABLE_ENV}`.

### 5. La autonomía no se otorga — se gana

Un agente L2 no es más inteligente que un L0. Es más confiable — y la confianza se construye con evidencia (ver `modelo-l0-l1-l2`).

### 6. El sistema que no se evalúa se degrada

Cada agente necesita un harness. Sin evaluación continua, la calidad del output baja sin que nadie lo note (ver `harness-universal`).

---

## El Patrón de Extracción

Cada sistema construido deja algo al siguiente:

```
Sistema terminado
    ↓
Identificar el núcleo reutilizable
    ↓
Extraer a SKILL.md: Rol + Restricciones + Proceso + Ejemplo
    ↓
Versionar en skills/ como unidad independiente
    ↓
Siguiente proyecto hereda el patrón en horas, no semanas
```

**Este es el compounding del sistema — cada proyecto deja al siguiente más inteligente.**

---

## Cómo Contribuir

**Bienvenido:**
- Nuevos skills con el formato `SKILL.md`
- Workflows de procesos de negocio que te funcionaron
- Adaptaciones de skills a otros nichos (reemplaza el nicho, mantén el patrón)
- Correcciones técnicas y actualizaciones de herramientas

**No incluido:**
- Credenciales, API keys o tokens de ningún tipo
- Datos de usuarios reales

```bash
# Fork → crea tu rama → documenta → PR
git checkout -b feat/mi-skill-nuevo
# Crea skills/mi-skill/SKILL.md siguiendo el formato
git commit -m "feat: add [nombre] skill — [qué aporta]"
gh pr create
```

---

> Construido con Claude Code + SaaS Factory V5
> Caso de estudio real → documentado para la comunidad de fundadores LATAM
