# 🏭 Business OS — Sistema Operativo Para Tu Negocio con IA

> **"Construido por un fundador independiente. Documentado para la comunidad."**
>
> Este repositorio es un **Business OS listo para clonar y personalizar** — no un producto, sino el MÉTODO de operación que permite a una sola persona manejar 5 líneas de negocio simultáneamente usando agentes de IA.
>
> Está pensado para que lo estudies, lo adaptes, y lo apliques a tu propio negocio.
> Los datos sensibles y estrategia comercial propietaria no están incluidos — sí están los patrones, las arquitecturas, y el razonamiento detrás de cada decisión.

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

Empecé un negocio con múltiples líneas activas al mismo tiempo:

| Pilar | Canal | Carga manual |
|-------|-------|-------------|
| Infoproducto (ebook) | Landing + Stripe | Responder DMs, cerrar preventa 1:1 |
| YouTube (2 canales) | Educativo + Animación | Guiones, edición, subtítulos, subida |
| E-commerce | Productos físicos con proveedor | Fotos, copy, mockups, inventario |
| App móvil | Next.js + Supabase | Dev + soporte + notificaciones |
| Merch 3D | Ropa física con marca | Diseño, proveedor, fulfillment |

**El resultado sin sistema:** 20–30 horas/semana de operación manual. Insostenible para 1 persona.

**El insight que lo cambió todo:**
> El cuello de botella no era el producto. Era el **sistema operativo del negocio**.

---

## La Solución: Agentes Especializados + Workflows DAG

```
OpenGravity (este patrón)
├── skills/       ← 25 agentes especializados (cada uno = un experto en su área)
├── workflows/    ← 8 workflows DAG (cada uno = un proceso de negocio documentado)
└── docs/         ← Documentación de contexto y referencia
```

### Los 5 Sistemas Que Reemplazaron las 30 Horas Semanales

**1. Agente de Ventas y Soporte 24/7**
- Chat embebido en el sitio — sin WhatsApp, sin costos de Meta
- Motor: Groq (velocidad) + modelo de razonamiento para casos complejos
- Vocabulario del avatar encodeado como restricción técnica (no editorial)
- Gate freemium: consultas gratis → conversión a Pro
- Ver skill: `agente-frontoffice`

**2. Pipelines de Contenido — $0 de Infraestructura**
- Canal educativo: guión → TTS → escenas HTML → FFmpeg → YouTube API
- Canal de animación: personaje con identidad visual → pipeline CI/CD
- Episodios producidos sin intervención manual después del setup inicial
- Ver skills: `content-pipeline`, `creative-director`
- Ver workflow: `contenido-multimedia-social`

**3. Email Nurturing Automático Post-Compra**
- Se activa con cada compra (webhook Stripe/Polar → base de datos)
- Secuencia D+3 / D+7 / D+14 con contenido de valor real
- Tokens HMAC para unsubscribe seguro (cumplimiento CAN-SPAM / LFPDPPP)
- Ver skill: `email-nurturing-postcompra`

**4. Engram — Memoria Persistente del Negocio**
- Cada skill con `SKILL.md` individual: contexto, restricciones, ejemplos
- Workflows DAG versionados en git
- Nunca se pierde contexto entre sesiones con el agente
- Ver skill: `engram-memory-protocol`

**5. Producto Digital con Modelo Freemium**
- Auth anónima ("días gratis sin registro")
- Seguimiento + predicciones por etapa
- Modelo Founders: acceso vitalicio a precio de lanzamiento
- Ver skills: `freemium-conversion`, `funnel-infoproducto`

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────┐
│                 FUNDADOR                    │
│          (aprueba gates, no opera)          │
└──────────────────┬──────────────────────────┘
                   │
       ┌───────────▼───────────┐
       │      AGENTE CEO        │
       │  (orquestador L3)     │
       └──────┬────────────────┘
              │
   ┌──────────┼──────────────┐
   ▼          ▼              ▼
Skills     Workflows       Gates
(25)        (8)           Humanos
   │          │              │
   ▼          ▼              ▼
┌────────────────────────────────┐
│           PRODUCCIÓN           │
│   Sitio web · App · YouTube    │
│   Email · E-commerce · Merch   │
└────────────────────────────────┘
```

**Modelo de autonomía:** cada agente tiene nivel L0/L1/L2 según su historial de confianza.
Ver skill `modelo-l0-l1-l2` para el sistema completo.

---

## 📚 Skills Disponibles (25)

Los skills son archivos SKILL.md que definen el rol, restricciones, proceso y ejemplos de un agente especializado. Están organizados en 6 áreas:

### 🧠 Sistema Operativo del Agente

| Skill | Qué hace |
|-------|---------|
| `meta-agent-ceo` | Orquestador de nivel estratégico — coordina todos los demás agentes |
| `orquestador-nivel-3` | Descompone objetivos complejos en DAGs ejecutables |
| `catalizador-tareas` | Convierte una tarea vaga en subtareas concretas y ejecutables |
| `strategic-thinking-partner` | Socio estratégico para decisiones de negocio de alto impacto |
| `agent-architect` | Diseña la arquitectura de nuevos agentes y sistemas |

### ⚙️ Operación y Confiabilidad

| Skill | Qué hace |
|-------|---------|
| `engram-memory-protocol` | Memoria persistente entre sesiones — el cerebro institucional del negocio |
| `karpathy-protocol` | Auditoría pre-ejecución basada en los principios de Andrej Karpathy |
| `harness-universal` | Marco de evaluación para probar que cualquier agente funciona correctamente |
| `human-gate-protocol` | El humano aprueba, el agente ejecuta — circuit breakers y formatos de gate |
| `modelo-l0-l1-l2` | Sistema de certificación de autonomía gradual por historial de confianza |
| `automation-engineer` | Diseña e implementa automatizaciones de procesos de negocio |

### 📢 Marketing y Distribución

| Skill | Qué hace |
|-------|---------|
| `marketing-digital` | Estrategia y ejecución de marketing en canales digitales |
| `growth-hacking` | Experimentos de crecimiento acelerado con recursos mínimos |
| `cro-optimizer` | Optimización de conversión en landing pages y funnels |
| `email-sequence-ai` | Redacción de secuencias de email con IA ajustada al nicho |
| `email-nurturing-postcompra` | Sistema D+3/D+7/D+14 de nurturing automático post-compra |
| `content-pipeline` | Pipeline de producción de contenido — de guión a publicación |
| `creative-director` | Dirección creativa de identidad visual y producción audiovisual |

### 🔍 Investigación y Validación

| Skill | Qué hace |
|-------|---------|
| `latam-market-research` | Investigación de mercado especializada en LATAM |
| `market-validation-engine` | Motor de validación de demanda antes de construir |
| `inteligencia-nicho-maternidad` | Inteligencia de nicho aplicada a maternidad/crianza (adaptable a tu nicho) |

### 💰 Monetización y Producto

| Skill | Qué hace |
|-------|---------|
| `funnel-infoproducto` | Sistema de preventa — vende antes de construir |
| `freemium-conversion` | Sistema de conversión Free → Pro con modelo Founders |
| `agente-frontoffice` | Agente de ventas y soporte 24/7 con RAG embebido en tu sitio |

### ⚖️ Legal y Cumplimiento

| Skill | Qué hace |
|-------|---------|
| `compliance-latam` | LFPDPPP, datos de menores, derechos ARCO, checklist de lanzamiento |

---

## 🔄 Workflows (8)

Los workflows son procesos de negocio documentados como DAGs (grafos de pasos con dependencias y gates explícitos):

| Workflow | Qué automatiza |
|---------|---------------|
| `idea-a-producto-master` | Del concepto al producto lanzado — flujo completo |
| `lanzamiento-producto` | Campaña de lanzamiento con gates de validación |
| `marketing-completo` | Ciclo completo de marketing desde estrategia hasta métricas |
| `contenido-multimedia-social` | Producción y publicación de contenido en múltiples canales |
| `canal-tres-amigos` | Pipeline de producción de canal de animación (YouTube) |
| `ecommerce-activacion-pmf` | Activación de tienda e-commerce hasta alcanzar PMF |
| `reality-check-release-gate` | Gate de calidad antes de cualquier publicación o deploy |
| `retroalimentacion-mejora` | Loop de aprendizaje: resultado real → mejora del sistema |

---

## 📖 Documentación de Referencia

| Doc | Contenido |
|-----|---------|
| `como-adaptar.md` | Guía paso a paso para adaptar este sistema a cualquier negocio |
| `estrategia-precios.md` | Framework de decisión de precios para productos digitales |
| `glosario.md` | Definición de términos técnicos usados en los skills y workflows |

---

## 🚀 Cómo Adaptar Este Sistema a Tu Negocio

Este no es un template que se instala — es un **patrón de pensamiento** que se implementa.

### Paso 1: Clona el repositorio como punto de partida

```bash
git clone https://github.com/GabrielMarquez01/ai-factory-os.git mi-business-os
cd mi-business-os
```

### Paso 2: Mapea tus operaciones más costosas en tiempo

Escríbelas con horas reales por semana. Eso es tu "cuello de botella" y el primer input de tu sistema.

```markdown
# mis-operaciones.md

| Operación | Horas/semana | ¿Repetible? | ¿Automatizable? |
|-----------|-------------|-------------|----------------|
| [tu operación 1] | X h | Sí/No | Sí/No |
| [tu operación 2] | X h | ... | ... |
```

### Paso 3: Personaliza un skill por área

Cada skill es un `SKILL.md` con:
- **Rol del agente** — quién es y qué hace
- **Restricciones** — qué NUNCA hace (tan importante como lo que sí hace)
- **Vocabulario** — el lenguaje específico de tu nicho y avatar
- **Proceso** — los pasos que sigue
- **Formato de output** — qué entrega exactamente

Empieza por el área de mayor carga manual. No necesitas todos los skills del día 1.

### Paso 4: Conecta skills con workflows DAG

Un workflow es una secuencia de pasos con gates humanos explícitos:

```markdown
# mi-workflow.md

## Paso 1: [nombre]
- Input: [qué necesita]
- Skill: [cuál skill ejecuta]
- Output: [qué produce]
- Gate: [qué aprueba el humano antes de continuar]

## Paso 2: [nombre]
...
```

**La regla:** el humano aprueba, el agente ejecuta.
Ver skill `human-gate-protocol` para el sistema completo.

### Paso 5: Define los niveles de autonomía

No todos los agentes deben tener el mismo nivel de libertad:

```markdown
# AGENTS.md (crea este archivo en tu repo)

| Agente | Nivel | Razón |
|--------|-------|-------|
| agente-bienvenida | L2 | 45 corridas sin incidentes |
| agente-soporte | L1 | En período de prueba |
| agente-pagos | L0 | Siempre requiere gate humano |
```

Ver skill `modelo-l0-l1-l2` para el sistema de certificación.

### Paso 6: Versiona todo como memoria institucional

Si no está en git, no existe. El conocimiento del negocio debe sobrevivir a cualquier sesión de chat.

```bash
git add skills/ workflows/ AGENTS.md
git commit -m "feat: mi business OS — versión inicial"
```

---

## Evidencia en Vivo (El Caso de Estudio Que Generó Este Repo)

| Producto | URL | Estado |
|---------|-----|--------|
| Agente Sofía (ventas 24/7) | primerasmiradas.com | ✅ Producción |
| App mi·ma (tracker bebés) | somosmima.app | ✅ Producción |

Prueba el chat de Sofía — responde en menos de 2 segundos con vocabulario del nicho.

---

## 🛠️ Stack Técnico de Referencia

Este es el stack usado en el caso de estudio. **No es una imposición** — adapta a lo que ya conoces.

```
Agentes:          Claude Code + SaaS Factory V5
Framework web:    Next.js 16 + TypeScript
Estilos:          Tailwind CSS
Base de datos:    Supabase (Auth + DB + RLS + pgvector para RAG)
Backend simple:   Node.js + Express + Railway
IA rápida:        Groq (llama-3.3-70b — velocidad + costo)
IA pesada:        OpenRouter (routing por modelo según tarea)
Email:            Resend + React Email
Pagos:            Stripe (transaccional) + Polar (suscripciones)
Video/TTS:        Kokoro TTS + FFmpeg + HyperFrames
Testing:          Playwright
DNS/CDN:          Cloudflare
Memoria:          Git + Markdown (Engram protocol)
```

---

## 🔮 Roadmap de Skills — Lo Que Viene

Estas son las áreas identificadas para documentar como skills en próximas versiones:

### Distribución y Tráfico
- `landing-page-conversion` — Landing pages de alta conversión: estructura, copy AIDA, A/B testing
- `seo-programatico` — SEO con IA: miles de páginas indexables generadas automáticamente
- `social-content-system` — Sistema de contenido: de 1 pieza larga a 10 piezas cortas
- `video-pipeline-ai` — Pipeline de video con IA: TTS + escenas + FFmpeg + distribución

### Operación de Negocio
- `analytics-dashboard` — Sistema de métricas: qué medir, cómo visualizarlo, cuándo actuar
- `customer-success` — Retención y éxito del cliente: onboarding, activación, anti-churn
- `ecommerce-operator` — Operar una tienda: selección de producto, pricing, fulfillment
- `pricing-strategy` — Framework de precios: valor percibido, willingness-to-pay, experimentos

### Escalado
- `team-os` — De 1 persona a equipo: cuándo contratar, cómo documentar para escalar
- `affiliate-program` — Sistema de afiliados: estructura, comisiones, seguimiento
- `community-building` — Construir comunidad: de usuarios a embajadores de marca

---

## Lecciones Aprendidas (El Oro del Caso de Estudio)

### 1. La arquitectura importa más que las herramientas

Evalúa el costo real de infraestructura ANTES de decidir.
Un stack de 8 servicios Docker puede costar $40/mes siempre.
El stack más simple que funcione gana.

### 2. "Documentado" ≠ "Ejecutado"

Un brief puede estar al 100% y el resultado en cero si los datos de validación
están en la máquina local del fundador y no en git.

**Regla:** si no está en el repo, no cuenta como hecho.

### 3. Declara las limitaciones técnicas como parte del diseño

Documentar las limitaciones antes del problema evita horas de debugging.
La Railway API está bloqueada en algunos entornos cloud — documentarlo evita que lo descubras en producción.

### 4. Las API keys en historial git son permanentes

Si una key llega a un commit de un repo público, la rotación es la única salida.

**Regla de oro:** nunca pegar keys directamente en chat o código. Siempre `${VARIABLE_ENV}`.

### 5. El vocabulario del avatar es una restricción técnica, no editorial

"mamis / bb / lechita" vs "infante / paciente / progenitora".
Encodeado en `SKILL.md` como gate obligatorio — si el output viola el tono, se rechaza.
No es styleguide. Es parte de la lógica de negocio.

### 6. Separar alcances: el OS ENTRE productos, no DENTRO

Confundir el OS del negocio con el producto genera memorias duplicadas
y divergencia garantizada.

**Una sola fuente de verdad** para el conocimiento institucional.

### 7. La autonomía no se otorga — se gana

Un agente L2 no es más inteligente que un L0.
Es más confiable — y la confianza se construye con evidencia, no con fe.
Ver skill `modelo-l0-l1-l2`.

---

## El Patrón de Extracción (Cómo Este Repo Creció)

Cada sistema que se construyó dejó algo al siguiente:

```
Sistema terminado
    ↓
Identificar el núcleo reutilizable (≠ lo específico del caso de estudio)
    ↓
Extraer a SKILL.md: Rol + Restricciones + Proceso + Ejemplo
    ↓
Versionar en skills/ como unidad independiente
    ↓
Siguiente proyecto hereda el patrón en horas, no en semanas
```

**Este es el compounding del sistema — cada proyecto deja al siguiente más inteligente.**

---

## Cómo Contribuir

Este es un caso de estudio público para aprendizaje colectivo.

**Bienvenido:**
- Nuevos skills documentados con el formato `SKILL.md`
- Mejoras a workflows existentes
- Adaptaciones de los patrones a otros nichos de negocio
- Correcciones técnicas y actualizaciones de herramientas

**No incluido (por respeto a terceros y buenas prácticas):**
- Credenciales, API keys o tokens de ningún tipo
- Datos de clientes o leads reales
- Estrategia comercial propietaria no generalizable
- Información confidencial de proveedores

**Para contribuir:**
```bash
# Fork → crea tu rama → documenta tu skill/workflow → PR
git checkout -b feat/mi-skill-nuevo
# Crea skills/mi-skill/SKILL.md siguiendo el formato existente
git commit -m "feat: add [nombre-skill] skill"
gh pr create
```

---

> Construido con Claude Code + SaaS Factory V5
> Documentado para la comunidad de fundadores independientes LATAM
