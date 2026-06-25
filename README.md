# 🏭 AI Factory OS — Caso de Estudio: Operar un negocio de 5 pilares con 1 persona

> **"Apuntes en limpio de un caso real."**
> Este repositorio NO es el producto. Es el MÉTODO.
> Está pensado para que lo estudies, lo adaptes y lo apliques a tu propio negocio.
> Los datos sensibles, credenciales y estrategia comercial propietaria no están incluidos por respeto a terceros y buenas prácticas — no por egoísmo.

---

## El Problema

Empecé un negocio de contenido y educación para mamás con bebés 0–18 meses.
Un solo founder. Cinco pilares activos al mismo tiempo:

| Pilar | Canal | Carga manual |
|-------|-------|-------------|
| Infoproducto (ebook) | Landing + Stripe | Responder DMs, cerrar preventa 1:1 |
| YouTube (2 canales) | Sofía (consejos) + Animación | Guiones, edición, subtítulos, subida |
| E-commerce | Combos físicos con proveedor | Fotos, copy, mockups, inventario |
| App móvil | Next.js + Supabase | Dev + soporte + push notifications |
| Merch 3D | Ropa física con marca | Diseño, proveedor, fulfillment |

**El resultado:** 20–30 horas/semana de operación manual. Insostenible para 1 persona.

**El insight que lo cambió todo:**
> El cuello de botella no era el producto. Era el **sistema operativo del negocio**.

---

## La Solución: AI Factory OS

Construí **OpenGravity** — un sistema operativo de IA sobre el patrón SaaS Factory V5 que convierte cada área del negocio en un agente o pipeline autónomo.

```
OpenGravity/
├── agent/
│   ├── skills/          ← 60 agentes especializados (cada uno = un experto)
│   └── workflows/       ← 26 workflows DAG (cada uno = un proceso de negocio)
├── src/                 ← Infraestructura MCP y orquestación
└── workspace/           ← Proyectos activos por vertical
```

### Los 5 sistemas que reemplazaron las 30 horas/semana

**1. SOFÍA — Agente de ventas y soporte 24/7**
- Chat embebido en el sitio web. Sin WhatsApp, sin costos de Meta.
- Motor: Groq (velocidad) + modelo de razonamiento para casos complejos
- Vocabulario del avatar encodeado como restricción técnica: si el output viola el tono del nicho, se rechaza automáticamente
- Gate freemium: 3 consultas gratis/mes → conversión a Pro

**2. PIPELINES DE CONTENIDO — $0 de infraestructura**
- Canal educativo: guión → TTS → escenas HTML→PNG → FFmpeg → YouTube API
- Canal de animación: personaje con identidad visual única → pipeline CI/CD
- Resultado: episodios producidos sin intervención manual después del setup

**3. EMAIL NURTURING AUTOMÁTICO**
- Se activa con cada compra (webhook Stripe → Firebase RTDB)
- Secuencia D+3 / D+7 / D+14 con contenido de valor real
- Tokens HMAC para unsubscribe seguro (cumplimiento CAN-SPAM / LFPDPPP)

**4. ENGRAM — Memoria persistente del negocio**
- 60 skills con `SKILL.md` individual: contexto, restricciones, ejemplos
- 26 workflows DAG versionados en git
- Nunca se pierde contexto entre sesiones de Claude Code
- Funciona como el "cerebro institucional" del negocio

**5. APP MI·MA — Producto digital con modelo freemium**
- Next.js + Supabase + auth anónima ("7 días gratis sin registro")
- Seguimiento de sueño, tomas, pañales + predicciones por edad
- Modelo Founders: acceso vitalicio a precio de lanzamiento
- Push notifications activadas por etapa de desarrollo del bebé

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────┐
│                  FOUNDER                        │
│         (aprueba gates, no opera)               │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │    CLAUDE CODE        │
         │  (cerebro principal)  │
         └───────────┬───────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
┌───────┐      ┌──────────┐    ┌──────────┐
│ Skills│      │Workflows │    │  MCPs    │
│  (60) │      │  (26)    │    │Supabase  │
│       │      │          │    │Railway   │
│Sofia  │      │72H War   │    │Playwright│
│Content│      │Room      │    │          │
│Email  │      │Lanzamiento│   └──────────┘
└───┬───┘      └────┬─────┘
    │               │
    ▼               ▼
┌────────────────────────┐
│     PRODUCCIÓN         │
│ primerasmiradas.com    │
│ somosmima.app          │
│ YouTube (2 canales)    │
│ Email nurturing        │
└────────────────────────┘
```

---

## Cómo Adaptar Este Sistema a Tu Negocio

Este no es un template que se instala — es un **patrón de pensamiento** que se implementa.

### Paso 1: Mapea tus 3–5 operaciones más costosas en tiempo
Escríbelas. Pon horas reales por semana. Eso es tu "cuello de botella" y el input de tu sistema.

### Paso 2: Crea un skill por área de expertise
Cada skill es un archivo Markdown con:
- Rol del agente
- Restricciones (qué NUNCA hacer)
- Vocabulario del nicho
- Ejemplos de input/output esperados

Ver carpeta `/skills/` para ejemplos reales.

### Paso 3: Conecta los skills con workflows DAG
Un workflow es una secuencia de pasos con gates humanos explícitos.
La regla: **el humano aprueba, el agente ejecuta.**

Ver carpeta `/workflows/` para ejemplos reales.

### Paso 4: Define tus gates de validación
Antes de gastar dinero, contratar o publicar — un gate humano.
El gate más importante: **validar demanda real antes de construir.**

### Paso 5: Versiona todo en git como memoria institucional
Si no está en git, no existe. El conocimiento del negocio debe sobrevivir a cualquier sesión de chat.

---

## Evidencia en Vivo

| Producto | URL | Estado |
|---------|-----|--------|
| Agente Sofia (ventas 24/7) | [primerasmiradas.com](https://www.primerasmiradas.com) | ✅ Producción |
| App mi·ma (tracker bebés) | [somosmima.app](https://www.somosmima.app) | ✅ Producción |

Prueba el chat de Sofia ahora mismo — responde en menos de 2 segundos con vocabulario del nicho.

---

## Metodologías Aplicadas

Más allá del stack técnico, el sistema funciona por los **principios de pensamiento** que lo gobiernan.
Estas metodologías son independientes del nicho — están diseñadas para adaptarse a cualquier negocio,
igual que un framework genérico se personaliza para cada producto.

Ver carpeta `/skills/` para los archivos SKILL.md de cada metodología.

---

### 1. Protocolo Karpathy — El agente se optimiza a sí mismo

Inspirado en el trabajo de Andrej Karpathy sobre sistemas que aprenden de sus propios outputs:

```
Loop de auto-optimización:
1. El agente ejecuta una tarea (ej: escribir un reel)
2. Se evalúa el output contra criterios binarios (¿cumple el tono? ¿tiene CTA?)
3. Si falla → el prompt muta, se re-ejecuta
4. Si mejora → se guarda la nueva versión
5. El error nunca ocurre dos veces
```

En OpenGravity, cada `SKILL.md` tiene un historial de mutaciones. Un skill que lleva 40 iteraciones
es cualitativamente diferente al que se escribió en el día 1. **La fábrica aprende con cada run.**

**Implementación práctica:** Cada vez que un output viola una restricción, se documenta la restricción
en el skill correspondiente. El conocimiento se acumula en archivos Markdown versionados en git.

---

### 2. Gates Humanos — El humano decide QUÉ, el agente ejecuta CÓMO

La regla más importante del sistema:

```
GATE HUMANO obligatorio antes de:
├── Gasto (contratar, pagar infraestructura, ads)
├── Publicación (post, email, video)
└── Transacción (cobrar, contratar, firmar)
```

Sin gates, la automatización se convierte en un riesgo. Con gates, se convierte en apalancamiento.

El gate no es burocracia — es el punto exacto donde el contexto humano (intuición, relaciones,
juicio de negocio) complementa la velocidad del agente.

**Regla derivada:** Si una decisión puede revertirse con bajo costo, el agente puede ejecutarla solo.
Si es irreversible o afecta a terceros, siempre requiere gate humano.

---

### 3. Engram — El documento como fuente única de verdad

El conocimiento del negocio vive en archivos Markdown versionados en git. No en la cabeza del founder.
No en un chat de WhatsApp. No en la memoria de una sesión de IA.

```
Principio Engram:
"Si no está en git, no existe."

skill/ → qué puede hacer cada agente
workflows/ → cómo se conectan los agentes
SKILL.md → contexto, restricciones, ejemplos del agente
```

**Por qué funciona:**
- Persiste entre sesiones de IA (Claude Code, Cursor, cualquier LLM)
- Es auditable (git history = historial de decisiones)
- Es compartible (otro founder puede retomar el negocio desde el repo)
- Sobrevive a cambios de herramientas

**El anti-patrón:** guardar el conocimiento en el historial de un chat. Cuando el contexto
se borra, ese conocimiento desaparece. El Engram resuelve esto.

---

### 4. Harness Universal — La estructura como andamio adaptable

Los 60 skills y 26 workflows de OpenGravity siguen una gramática consistente que actúa
como **andamio universal**: puedes intercambiar el nicho (mamás con bebés → agencia legal →
e-commerce de ropa) sin cambiar la estructura.

```
Harness (estructura invariante):
├── SKILL.md          → Rol + Restricciones + Vocabulario + Proceso + Ejemplo
├── WORKFLOW.md       → Trigger + Fases + Gates + Output esperado
└── MEMORY/           → Estado actual + Decisiones + Referencias

Contenido (lo que cambia por nicho):
├── Avatar del cliente
├── Vocabulario del nicho
├── Reglas de negocio específicas
└── Integraciones (Stripe, Supabase, etc.)
```

Esta separación entre estructura y contenido permite que el sistema se transfiera.
Ver [`docs/como-adaptar.md`](docs/como-adaptar.md) para el proceso paso a paso.

---

### 5. Orquestador Nivel 3 — coordina agentes, no ejecuta tareas

El anti-patrón más común en sistemas multi-agente: un agente que intenta hacer todo solo.

El Orquestador Nivel 3 resuelve esto con una regla simple:

```
El orquestador NUNCA ejecuta trabajo de producción.
Su único trabajo es coordinar quién hace qué y en qué orden.
```

La implementación es un DAG (Directed Acyclic Graph):

```
Objetivo recibido
    ↓
1. Leer memoria (Engram) — ¿qué sabemos ya de este problema?
2. Mapear el DAG — qué fases, qué agentes, qué dependencias
3. Despachar sub-agentes con "Contratos de Input"
4. Recibir "Contratos de Resultado" de cada agente
5. Gate humano si el paso es crítico (gasto, deploy, cambio de BD)
6. Registrar aprendizajes en Engram antes de cerrar la sesión
```

**La diferencia con un simple "agente que delega":**
- Cada sub-agente recibe un contrato explícito (input definido + criterio de aceptación)
- Las fases paralelas corren simultáneamente (no en serie innecesariamente)
- El orquestador evalúa el output contra los criterios ANTES de pasar a la siguiente fase

Esto permite que un founder solo pueda operar 5 pilares: cada flujo de trabajo tiene
su propio orquestador que coordina los skills especializados necesarios.

Ver: [`skills/orquestador-nivel-3/SKILL.md`](skills/orquestador-nivel-3/SKILL.md)

---

### 6. Catalizador de Tareas — el router de herramientas e IA

Este es el componente que hace que el sistema sea eficiente a escala:
en lugar de usar el mismo modelo para todo, **cada tarea se enruta al modelo y herramienta óptimos**.

```
Tarea recibida → Clasificación de intención → Modelo/herramienta óptima
```

Los 6 arquetipos de tarea y su ejecutor óptimo:

| Arquetipo | Tipo de trabajo | Ejecutor óptimo |
|-----------|----------------|-----------------|
| `TECHNICAL` | Código, integraciones, bugs | Modelo de inferencia rápida (Groq/local) |
| `CREATIVE` | Copy, guiones, conceptos | Modelo creativo (Claude/Gemini) |
| `STRATEGIC` | Análisis, decisiones complejas | Modelo de razonamiento profundo (Claude Opus) |
| `RESEARCH` | Investigación, keywords, competencia | Modelo con acceso web (Perplexity) |
| `FAST` | Clasificaciones simples, sí/no | Modelo ligero y ultra-rápido |
| `MULTIMEDIA` | Storyboards, prompts visuales | Modelo multimodal |

**La regla de oro del catalizador:**
> Nunca uses un modelo de 70B para lo que resuelve un 8B.
> El costo-IA por usuario importa desde el día uno.

Si el modelo primario falla, hay una cadena de fallback automática.
Si un routing produce resultados excepcionales, el patrón se guarda en Engram para reutilizarlo.

**Para adaptar a tu negocio:**
- Define tus arquetipos de tarea (¿qué tipos de trabajo hace tu sistema?)
- Mapea cada arquetipo al proveedor más barato que da calidad suficiente
- Documenta la cadena de fallback
- Mide costo por tarea y optimiza con datos reales

Ver: [`skills/catalizador-tareas/SKILL.md`](skills/catalizador-tareas/SKILL.md)

---

### 7. Modelo de Autonomía L0/L1/L2 — graduar la confianza en el agente

No todos los agentes deben tener el mismo nivel de autonomía. El sistema define tres niveles:

```
L0 — Borrador
    El agente propone, el humano revisa CADA paso antes de ejecutar.
    Agentes nuevos, tareas de alto riesgo.

L1 — Piloto
    El agente ejecuta por corrida completa; el humano aprueba antes de publicar.
    Agentes con historial, tareas de riesgo medio.

L2 — Certificado
    El agente corre solo y solo informa. El humano interviene si hay anomalía.
    Agentes probados en producción, tareas repetitivas de bajo riesgo.
```

La certificación de L1 a L2 no es arbitraria — requiere criterios explícitos:
¿cuántas conversaciones exitosas? ¿qué porcentaje de outputs aprobados sin editar?

Los **circuit breakers** son condiciones que revierten cualquier agente a L0 sin importar su nivel:
- Claims médicos o legales
- Gasto no autorizado
- Información de terceros
- Error repetido N+ veces

---

### 8. Socio Estratégico — el agente que piensa desde múltiples ángulos

Esta es quizás la metodología menos documentada pero la más valiosa operativamente.

El riesgo de un sistema de agentes bien construido es que ejecute muy bien las **instrucciones incorrectas**. Un agente que obedece sin pensar multiplica errores de dirección, no los corrige.

La solución es darle al agente una capa de **pensamiento estratégico multi-perspectiva** antes de ejecutar cualquier iniciativa de peso:

```
Antes de arrancar una iniciativa, el agente fuerza 4 perspectivas:

1. CEO (norte estratégico)
   └── ¿Esto mueve el negocio hacia el objetivo trimestral?
       ¿O es una optimización local sin impacto en la dirección?

2. Mercado / Competencia
   └── ¿Qué hace el mercado que yo aún no?
       ¿Qué hueco existe que nadie está ocupando?
       ¿Qué hipótesis estoy asumiendo sobre el cliente que podría estar equivocada?

3. Riesgo / Anti-patrón
   └── ¿Qué puede salir mal? ¿Cuál es el peor escenario?
       ¿Estoy construyendo antes de validar?
       ¿Existe un camino más simple que omití?

4. Usuario final (el avatar)
   └── ¿Esto resuelve un dolor real del avatar, o un dolor que yo imagino que tiene?
       ¿Lo haría en la pantalla de su teléfono a las 2am mientras da pecho?
```

**La regla práctica:** Cualquier iniciativa que involucre gasto, contratación o construcción de más de 3 días pasa primero por este filtro de 4 perspectivas. El output es un documento de 1 página con la postura desde cada ángulo — y solo si los 4 apuntan en la misma dirección se procede.

Cuando hay conflicto entre perspectivas (el CEO quiere escalar, el análisis de riesgo dice "espera señal de mercado"), ese conflicto se convierte en un **gate de validación**: no se resuelve por opinión sino por experimento.

**Cómo se implementa técnicamente:**

```markdown
# En cada skill estratégico existe una sección: "Anti-patrones"
# Estos no son solo advertencias — son perspectivas formalizadas.

Ejemplo del skill market-validation-engine:
- Evitar: "validar" sin umbrales numéricos (perspectiva CEO: sin métrica no hay decisión)
- Evitar: construir antes de señal de mercado (perspectiva riesgo)
- Evitar: métricas vanidosas sin impacto de negocio (perspectiva usuario)
- Evitar: feedback anecdótico como evidencia representativa (perspectiva mercado)
```

El socio estratégico no es un agente separado — es una **capa de razonamiento** que se activa antes de ejecutar. Es lo que diferencia un sistema que hace lo que le dices de uno que te ayuda a pensar si lo que le dices es correcto.

El output del Strategic Thinking Partner siempre termina en un **brief listo para el Orquestador Nivel 3**: las opciones analizadas, la opción elegida y el DAG de fases para ejecutarla. Estrategia → ejecución sin fricción.

Ver: [`skills/strategic-thinking-partner/SKILL.md`](skills/strategic-thinking-partner/SKILL.md)

---

### Resumen: las 8 metodologías del sistema

| # | Metodología | Qué resuelve |
|---|-------------|--------------|
| 1 | **Protocolo Karpathy** | El agente aprende de sus propios errores. Mismo error: nunca dos veces. |
| 2 | **Gates Humanos** | El humano decide QUÉ. El agente ejecuta CÓMO. Nunca al revés. |
| 3 | **Engram** | El conocimiento vive en git, no en la cabeza de nadie ni en un chat. |
| 4 | **Harness Universal** | Estructura invariante adaptable a cualquier nicho. |
| 5 | **Orquestador Nivel 3** | Coordina agentes con contratos y DAGs. No ejecuta, dirige. |
| 6 | **Catalizador de Tareas** | Cada tarea al modelo/herramienta óptima. Costo-IA por diseño. |
| 7 | **Modelo L0/L1/L2** | La autonomía del agente se gradúa con evidencia, no con fe. |
| 8 | **Socio Estratégico** | Análisis multi-perspectiva antes de ejecutar. Evita ejecutar bien las instrucciones equivocadas. |

Estas metodologías son **independientes del stack**. Funcionan con Claude Code, Cursor,
cualquier LLM, y en cualquier nicho de negocio. El contenido cambia; la estructura permanece.

---

### Sobre la Estrategia de Precios

Se incluye el razonamiento de precios completo (con preguntas abiertas) en:
📄 [`docs/estrategia-precios.md`](docs/estrategia-precios.md)

Feedback bienvenido — especialmente en el modelo Founders y el punto de precio del freemium.

---

## Repositorios Base — De Dónde Viene Cada Pieza

Este sistema no se construyó desde cero. Se adaptó desde repositorios públicos de referencia.
El valor no está en haber inventado los componentes — está en haberlos **combinado y aplicado a un negocio real**.

Esto es exactamente lo que puedes hacer tú con tu propio negocio.

---

### 1. Everything Claude Code (ECC)
**`github.com/affaan-m/everything-claude-code`** · 185k+ ⭐

El repositorio que ganó el hackathon de Anthropic (sept 2025). Define la gramática base del sistema:
cómo se estructuran los skills, cómo funciona la memoria persistente, cómo se conectan agentes
especializados, y cómo los hooks de calidad se ejecutan automáticamente.

```
ECC define:
├── .agents/skills/    → cada skill = un experto especializado (SKILL.md)
├── .agents/hooks/     → validaciones automáticas antes/después de cada acción
├── memory/            → contexto persistente entre sesiones
└── AGENTS.md          → mapa de todos los agentes disponibles
```

**Qué se adaptó aquí:**
- La estructura `SKILL.md` (Rol + Restricciones + Proceso + Ejemplo) se mantuvo intacta
- Se agregó el **vocabulario del nicho** como restricción técnica obligatoria en cada skill
- Se añadieron **gates humanos explícitos** para decisiones de negocio (no solo de código)
- El sistema de memoria se extendió con el protocolo Engram para persistencia cross-proyecto

---

### 2. Paperclip AI
**`github.com/paperclipai/paperclip`** · 69k+ ⭐

El framework open-source para correr una empresa completa con agentes y una sola persona.
Org charts, presupuestos, gobernanza, heartbeat scheduling, y audit trail — todo para equipos de IA.

```
Paperclip resuelve:
├── Cómo asignar trabajo a agentes como si fueran empleados
├── Cómo controlar costos y presupuestos por agente
├── Cómo hacer que los agentes retomen contexto entre sesiones
└── Cómo implementar approval gates antes de acciones críticas
```

**Qué se adaptó aquí:**
- El concepto de **org chart de agentes** → skills especializados por vertical de negocio
- El **heartbeat scheduling** → workflows DAG con cadencias definidas (diario, semanal)
- Los **approval gates** → gates humanos antes de gasto, publicación o transacción
- El modelo de **gobernanza** → modelo de autonomía L0/L1/L2 con circuit breakers

---

### 3. SaaS Factory V5
**Framework de Claude Code** (Anthropic)

El golden path de construcción: Next.js 16 + Supabase + Vercel + Zod + TypeScript strict.
Define el stack técnico y la arquitectura feature-first. No hay decisiones de stack — ya está elegido.

**Qué se adaptó aquí:**
- Se usa como capa de **construcción** (dentro de cada producto)
- Los skills de ECC operan **entre productos** (orquestación cross-pilar)
- Paperclip informa el modelo de **gobernanza** del portafolio completo

---

### La combinación — por qué los tres juntos

```
ECC          →  Cómo se definen y ejecutan los agentes
Paperclip    →  Cómo se organiza una empresa de agentes
SaaS Factory →  Cómo se construyen los productos que los agentes operan

Resultado    →  Un founder solo puede operar 5 pilares de negocio
               con la misma estructura que usarías para 15 empleados
```

Ninguno de estos tres repos resuelve el problema solo.
ECC da la gramática. Paperclip da la gobernanza. SaaS Factory da el stack.
**El caso de estudio es la integración.**

---

## Cómo se Integran Múltiples Repositorios

Este sistema no surgió de un solo repositorio. Es el resultado de integrar varios proyectos que evolucionaron en paralelo con un patrón explícito de separación de responsabilidades.

### La arquitectura de capas

```
Capa de construcción     →   Construye DENTRO de cada producto
(framework + stack)          Stack fijo, golden path, skills técnicos

Capa de orquestación     →   Coordina ENTRE productos
(Agent OS)                   Skills de negocio, workflows DAG,
                             Engram como cerebro central compartido

Capa de control          →   Observa el portafolio completo
(Business OS)                Todos los pilares en una vista,
                             gates humanos, KPIs por vertical

Productos activos        →   Consumen las capas superiores
                             Cada producto hereda patterns validados
                             de los proyectos anteriores
```

**Regla de integración** (documentada en Engram):
> La capa de construcción opera **dentro** de un producto.
> El Agent OS opera **entre** productos.
> Cuando hay conflicto de definición, la capa de construcción es herramienta de ejecución;
> el Agent OS es fuente de verdad del ecosistema.

---

### El patrón de extracción (cómo un proyecto se vuelve skill reusable)

Cada proyecto que se termina deja algo al siguiente. No en forma de copy-paste, sino como un skill documentado que cualquier proyecto futuro puede heredar sin reconstruir desde cero.

```
Proyecto terminado
    ↓
Identificar el núcleo reusable (≠ lo específico del nicho)
    ↓
Extraer a SKILL.md: Rol + Restricciones + Proceso + Ejemplo de output
    ↓
Versionar en skills/ como unidad independiente
    ↓
Siguiente proyecto hereda el skill en horas, no en semanas
```

**Ejemplos del tipo de patterns que se extraen:**
- Un funnel de infoproducto → skill de email nurturing post-compra
- Una app con modelo freemium → skill de conversión free-to-paid
- Un canal de contenido → pipeline de producción reproducible
- Una herramienta de outreach B2B → skill de correo en frío con compliance

Los detalles de implementación son propios de cada proyecto.
Lo que se comparte es el **patrón**: qué estructura tiene, qué problema resuelve, qué restricciones respeta.

**Este es el compounding del sistema — cada proyecto deja al siguiente más inteligente.**

---

## Lecciones Aprendidas (el oro del caso de estudio)

### 1. La arquitectura importa más que las herramientas
Evalúa el costo real de infraestructura ANTES de decidir.
Postiz v2.12 requiere 8 servicios Docker = $20–40/mes siempre.
Metricool Free = $0 siempre. El stack más simple que funcione gana.

### 2. "Documentado" ≠ "Ejecutado"
Un brief puede estar al 100% y el resultado en cero si los datos de validación
están en la máquina local del founder y no en git.
**Regla:** si no está en el repo, no cuenta como hecho.

### 3. Declarar limitaciones técnicas es parte del diseño
La Railway API está bloqueada en entornos cloud por política de egress.
El MCP solo conecta en local.
Documentar estas limitaciones antes del problema evita horas de debugging.

### 4. Las API keys en historial git son permanentes
Si una key llega a un commit de un repo público, rotación es la única salida.
**Regla de oro:** nunca pegar keys directamente en chat. Siempre `${VARIABLE_ENV}`.

### 5. El vocabulario del avatar es una restricción técnica, no editorial
"mamis / bb / lechita" vs "infante / paciente / progenitora".
Encodeado en SKILL.md como hook obligatorio — si el output viola el tono, se rechaza.
Esto no es styleguide. Es parte de la lógica de negocio.

### 6. Separar alcances: el sistema operativo ENTRE productos, no DENTRO
Confundir el OS del negocio con el producto genera memorias duplicadas
y divergencia garantizada.
**Una sola fuente de verdad** para el conocimiento institucional.

---

## Stack Técnico

```
Backend ebook funnel:  Node.js + Express + Firebase RTDB + Railway
App mi·ma:             Next.js 16 + Supabase + Vercel
IA:                    Groq (velocidad) + modelos de razonamiento
Contenido:             HyperFrames + FFmpeg + TTS + YouTube API
Email:                 Nodemailer + SMTP + tokens HMAC
Pagos:                 Stripe (ebook) + Polar (app Pro)
Agentes:               Claude Code + SaaS Factory V5
Memoria:               Git + Markdown (Engram protocol)
```

---

## Cómo Contribuir

Este es un caso de estudio público para aprendizaje colectivo.

**Bienvenido:**
- Sugerencias de mejora al método o los patrones
- Preguntas sobre la arquitectura
- Adaptaciones a otros nichos de negocio
- Correcciones técnicas

**No incluido (por respeto a terceros y buenas prácticas):**
- Credenciales, API keys o tokens de ningún tipo
- Datos de clientes o leads reales
- Estrategia comercial propietaria
- Información confidencial de proveedores

> Construido con Claude Code + SaaS Factory V5
> Por Gabriel Márquez Zamora — Guadalajara, México
