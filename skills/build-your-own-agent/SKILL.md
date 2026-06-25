---
name: build-your-own-agent
description: Guía paso a paso para construir tu propio agente de IA desde cero. Del concepto al SKILL.md funcional integrado en tu Business OS. Sin importar tu nivel técnico — hay un camino para cada punto de partida.
---

# 🛠️ Construye Tu Propio Agente

> **Analogía:** Construir un agente es como contratar y entrenar a un nuevo empleado. Defines su rol, le das un manual de cómo trabajar, le explicas qué puede y no puede hacer, y le dices cómo reportar resultados. La diferencia: el agente nunca se cansa, nunca tiene un mal día, y puedes tener miles sin nómina.

## Los 3 Niveles de Agente (Por Complejidad)

### Nivel 1: Agente de Prompt

El más simple — una instrucción muy precisa que convierte un input en un output.

```
Input: [contexto + pedido del usuario]
Agente: [system prompt detallado]
Output: [respuesta estructurada]

Ejemplo: "toma este texto y reescríbelo en el tono de [marca]"
```

No requiere código. Se puede construir con:
- Claude Code directamente
- ChatGPT Custom Instructions
- Un SKILL.md que cualquier agente puede seguir

### Nivel 2: Agente con Herramientas (Tool Use)

Puede hacer cosas además de generar texto: buscar en internet, leer archivos, enviar emails, consultar una base de datos.

```
Input: pedido del usuario
Agente: analiza → decide qué herramienta usar → ejecuta → procesa resultado → responde

Ejemplo: "¿Cuántas ventas tuvimos esta semana?"
→ El agente llama a la herramienta "consultar_db" 
→ Obtiene los datos
→ Responde con el análisis
```

Requiere código básico (JavaScript/Python) para definir las herramientas.

### Nivel 3: Agente Autónomo con Memoria

Puede ejecutar múltiples pasos, recordar contexto entre sesiones, tomar decisiones dentro de su scope, y trabajar sin supervisión constante (L1/L2).

```
Ejemplo: "Produce y publica el contenido de esta semana"
→ El agente recuerda el calendario editorial
→ Genera el contenido por tipo de canal
→ Lo pasa al agente evaluador
→ Publica lo aprobado
→ Reporta al humano
```

Requiere arquitectura completa (ver skill `agent-team-design`).

---

## Paso 1: Define el Agente con el SKILL.md

El `SKILL.md` es el "manual" del agente. Es el documento más importante:

```markdown
---
name: nombre-del-agente           # slug único, en minúsculas con guiones
description: Una oración que dice qué hace y para quién.
---

# [Nombre del Agente]

## Rol
Eres [identidad específica]. Tu función es [objetivo principal].
NO eres un asistente genérico — eres un especialista en [área].

## Cuándo usarte
- [Situación 1 donde este agente tiene sentido]
- [Situación 2]
- [Situación 3]

## Inputs necesarios
- `campo1`: [descripción y tipo]
- `campo2`: [descripción y tipo]
- `campo3` (opcional): [descripción]

Si algún campo requerido falta → PARAR y pedirlo. Nunca asumir.

## Proceso (los pasos exactos)

### Paso 1: [Nombre]
[Descripción detallada de qué hace en este paso]

### Paso 2: [Nombre]
[Descripción]

## Restricciones (lo que NUNCA haces)
- NUNCA [restricción 1]
- NUNCA [restricción 2]
- Si [situación límite] → [qué hacer en su lugar]

## Formato de output (exacto)
[Describe o muestra el formato esperado de la respuesta]

## Criterios de éxito
- ✅ [criterio 1]
- ✅ [criterio 2]
- ✅ [criterio 3]
```

---

## Paso 2: Construye el Harness de Evaluación

Antes de usar el agente en producción, construye sus casos de prueba:

```markdown
# harness/nombre-del-agente-cases.md

## Caso 1: Input típico del usuario
INPUT: [ejemplo real de input que recibirá]
CRITERIOS:
- ✅ [criterio 1]
- ✅ [criterio 2]
RESULTADO ESPERADO: PASA

## Caso 2: Input ambiguo
INPUT: [input que podría generar confusión]
CRITERIOS:
- ✅ Pide clarificación en vez de asumir
RESULTADO ESPERADO: PASA (con pregunta de clarificación)

## Caso 3: Input que debe rechazarse
INPUT: [algo que está fuera del scope del agente]
CRITERIOS:
- ✅ Declina educadamente y explica por qué no puede ayudar
- ✅ Sugiere a quién o qué puede ayudar en su lugar
RESULTADO ESPERADO: PASA (con declinación apropiada)
```

Ver skill `harness-universal` para el sistema completo de evaluación.

---

## Paso 3: Implementa el Código (Si el Agente Necesita Herramientas)

### Estructura Básica con Vercel AI SDK

```javascript
// lib/agentes/nombre-del-agente.js
import { generateText, tool } from 'ai'
import { groq } from '@ai-sdk/groq'
import { z } from 'zod'

// Lee el SKILL.md y úsalo como system prompt
const SYSTEM_PROMPT = `
[Aquí va el contenido de tu SKILL.md como texto]
`

// Define las herramientas que puede usar el agente
const herramientas = {
  
  consultar_base_datos: tool({
    description: 'Consulta información en la base de datos del negocio',
    parameters: z.object({
      tabla: z.string().describe('Qué tabla consultar'),
      filtro: z.string().describe('Condición de filtrado en lenguaje natural')
    }),
    execute: async ({ tabla, filtro }) => {
      // Implementar la consulta real aquí
      return await db.query(tabla, filtro)
    }
  }),
  
  enviar_notificacion: tool({
    description: 'Envía notificación al founder cuando se requiere gate humano',
    parameters: z.object({
      mensaje: z.string(),
      prioridad: z.enum(['alta', 'normal', 'baja'])
    }),
    execute: async ({ mensaje, prioridad }) => {
      await notificarFounder(mensaje, prioridad)
      return { enviado: true }
    }
  })
}

// La función principal del agente
export async function ejecutarAgente(input) {
  const { text, toolCalls } = await generateText({
    model: groq('llama-3.3-70b-versatile'),
    system: SYSTEM_PROMPT,
    prompt: JSON.stringify(input),
    tools: herramientas,
    maxSteps: 5  // máximo de pasos antes de reportar
  })
  
  return {
    resultado: text,
    herramientasUsadas: toolCalls.map(t => t.toolName),
    requiereGateHumano: toolCalls.some(t => t.toolName === 'enviar_notificacion')
  }
}
```

---

## Paso 4: Integra en tu Business OS

### Agregar al Registro de Agentes

```markdown
# AGENTS.md — actualizar cuando agregues un agente

| Agente | Función | Nivel | Herramientas | Fecha |
|--------|---------|-------|-------------|-------|
| nombre-del-agente | [función] | L0 | [lista] | YYYY-MM-DD |
```

### Conectar al Orquestador

El orquestador necesita saber que existe este nuevo agente:

```markdown
# En el SKILL.md del orquestador, agregar:

## Agentes disponibles para delegar
- `nombre-del-agente`: usar cuando [condición]
  Input: [formato]
  Output: [formato]
```

---

## El Ciclo de Vida de un Agente

```
DISEÑO          → SKILL.md completo
EVALUACIÓN      → Harness con ≥ 5 casos de prueba
IMPLEMENTACIÓN  → Código (si necesita herramientas)
PRUEBA EN L0    → Tú supervisas cada corrida (10 mínimo)
CERTIFICACIÓN L1 → 10 corridas sin error grave → promueves a L1
PRODUCCIÓN L1   → Tú apruebas el resultado, no cada paso
CERTIFICACIÓN L2 → 30 corridas exitosas en L1 → promueves a L2
PRODUCCIÓN L2   → Corre solo, reporta solo si hay problema
ITERACIÓN       → El harness detecta degradación → iteras el SKILL.md
```

---

## Proyectos de Referencia Para Aprender

Estos repositorios públicos muestran patrones de agentes en la práctica:

| Recurso | Qué enseña | Link |
|---------|-----------|------|
| **SaaS Factory V5** | Framework de skills para Claude Code | (skill del sistema) |
| **everything-claude-code** | Patrones avanzados para Claude Code | github.com/disler/everything-claude-code |
| **Vercel AI SDK examples** | Agentes con herramientas, RAG, multi-step | github.com/vercel/ai/tree/main/examples |
| **LangChain cookbook** | Patrones de chains y agentes | github.com/langchain-ai/langchain/tree/master/cookbook |
| **n8n templates** | Workflows de agentes sin código | n8n.io/workflows |
| **OpenAI Swarm** | Multi-agente con handoffs | github.com/openai/swarm |

---

## La Integración con SaaS Factory V5

Si usas SaaS Factory V5 (ver abajo), tus agentes del Business OS se complementan con los skills de construcción:

```
BUSINESS OS (este repo):           SAAS FACTORY V5:
Agentes de operación     ←→       Skills de construcción
  - agente-frontoffice              - add-login
  - agente-soporte                  - add-payments
  - orquestador                     - ai (RAG, chat, vision)
  - evaluador                       - supabase
  - agente-contenido                - playwright-cli

El Business OS opera el negocio.
SaaS Factory V5 construye y mejora el producto.
Son complementarios, no sustitutos.
```

---

## La Regla de la Construcción de Agentes

> Construye el agente más simple que resuelva el problema.
>
> El agente con 10 herramientas y 3 modelos diferentes es más difícil de debuggear
> que el agente con 1 herramienta y 1 modelo claro.
>
> Complejidad = más puntos de falla.
> Empieza simple. Complejiza solo cuando la simplicidad no alcanza.
