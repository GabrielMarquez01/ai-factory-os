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
- Canal de animación: personaje con identidad visual única → COPPA-safe → pipeline CI/CD
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
- Push notifications predictivas por edad exacta del bebé

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
