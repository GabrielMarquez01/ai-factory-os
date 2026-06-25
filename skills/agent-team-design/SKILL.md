---
name: agent-team-design
description: Cómo diseñar un equipo de agentes de IA que trabajan juntos — como un equipo humano pero sin sueldos fijos. Cada agente es un especialista, el orquestador es el director, y tú eres el CEO que aprueba las decisiones importantes.
---

# 🤖 Diseño de Equipo de Agentes

> **Analogía:** Un agente único intentando hacer todo es como un empleado al que le pides que sea contador, diseñador, vendedor y soporte al mismo tiempo. Hace todo regular. Un equipo de agentes especializados es como tener a cada uno en su área — cada uno hace su trabajo excelente, y un coordinador asegura que todos hablen entre sí.

## El Problema con el Agente Único

Un solo agente con demasiadas responsabilidades:
- Pierde el contexto de su área de expertise
- El sistema prompt se vuelve tan largo que pierde coherencia
- Es más difícil de evaluar (¿qué parte falló?)
- No puede ejecutar tareas en paralelo

**La solución:** dividir en agentes especializados + orquestador.

---

## La Arquitectura de Equipo

```
┌────────────────────────────────────────────────────────┐
│                    ORQUESTADOR                         │
│          (Nivel 3 — coordina, no ejecuta)              │
│   Recibe objetivo → descompone → delega → consolida    │
└──────┬─────────┬──────────┬──────────┬─────────────────┘
       │         │          │          │
       ▼         ▼          ▼          ▼
  [Agente 1] [Agente 2] [Agente 3] [Agente N]
  Especialista Especialista Especialista ...
  en área A   en área B   en área C
```

**La regla:** cada agente hace UNA cosa y la hace bien.

---

## Los 4 Tipos de Agente Por Función

### Tipo 1: Agente de Ejecución (Worker)

Hace el trabajo concreto. Toma un input, produce un output.

```
Ejemplos:
- Agente redactor: recibe brief → produce copy
- Agente de datos: recibe query → produce análisis
- Agente de imágenes: recibe prompt → produce imagen
- Agente de email: recibe trigger → envía email correcto

Características:
- System prompt muy específico (solo sabe de su área)
- Input y output bien definidos (contratos claros)
- No tiene opinión sobre estrategia — solo ejecuta
- Evaluable con harness simple (✅/❌ para cada criterio)
```

### Tipo 2: Agente Evaluador (Critic)

Revisa el output de otros agentes antes de que llegue al usuario.

```
El evaluador no produce — juzga:
- ¿El output cumple los criterios de calidad?
- ¿El tono es correcto para el avatar?
- ¿Hay información que no debería estar ahí?
- ¿Está completo?

Responde: APRUEBA / RECHAZA [razón en 1 línea] / MODIFICA [instrucción]

Por qué es valioso: el agente de ejecución no puede evaluar su propio output
con la misma objetividad. El evaluador actúa como "segundo par de ojos".
```

### Tipo 3: Agente Orquestador (Director)

Coordina a los otros agentes para lograr un objetivo complejo.

```
El orquestador:
- Recibe el objetivo de alto nivel ("lanza el producto en 72 horas")
- Descompone en subtareas con dependencias
- Delega cada subtarea al agente correcto
- Consolida los resultados
- Maneja los errores (si un agente falla, decide qué hacer)
- Reporta al humano en los gates definidos

NO ejecuta tareas de producción directamente.
```

Ver skill `orquestador-nivel-3` para la implementación completa.

### Tipo 4: Agente de Memoria (Librarian)

Gestiona el conocimiento del sistema.

```
El agente de memoria:
- Guarda decisiones importantes con contexto
- Busca información relevante cuando otro agente la necesita
- Actualiza el conocimiento cuando algo cambia
- Previene que el mismo error ocurra dos veces

Ver skill `engram-memory-protocol` para la implementación.
```

---

## Cómo Diseñar Tu Equipo

### Paso 1: Mapea tus Procesos de Negocio

```
Pregunta: ¿Cuáles son las 5-10 operaciones que consumen más tiempo?

Ejemplo:
1. Responder preguntas de soporte (3h/día)
2. Crear contenido para redes (5h/semana)
3. Analizar métricas y reportar (2h/semana)
4. Redactar propuestas o cotizaciones (4h/semana)
5. Investigar competencia y tendencias (3h/semana)
```

### Paso 2: Identifica Qué Puede Ser un Agente

```
Para cada proceso:
¿Es repetible? ¿Sigue siempre la misma estructura?
   → Sí: candidato a agente
   → No: se queda contigo por ahora

¿Tiene inputs y outputs claros?
   → Sí: puedes definir el contrato del agente
   → No: necesitas estructurarlo primero antes de automatizar

¿El error es recuperable?
   → Sí: puede ser L1 o L2
   → No: debe ser L0 con gate humano siempre
```

### Paso 3: Define el "Contrato" de Cada Agente

El contrato del agente es lo que garantiza que el equipo funcione:

```markdown
# CONTRATO — [Nombre del Agente]

## Input esperado
- Formato: [texto libre / JSON / formulario / trigger de evento]
- Campos requeridos: [campo1, campo2]
- Campos opcionales: [campo3]

## Output entregado
- Formato: [texto / JSON / archivo / acción en sistema externo]
- Campos: [campo1: descripción, campo2: descripción]
- Longitud/tamaño: [máximo N palabras / N caracteres]

## Lo que NO hace este agente
- [restricción 1]
- [restricción 2]

## Cuándo escala al orquestador
- [condición 1]
- [condición 2]
```

---

## Comunicación Entre Agentes: El Protocolo

Los agentes en un equipo necesitan un protocolo de comunicación estándar:

```javascript
// Formato estándar de mensaje entre agentes
const MENSAJE_AGENTE = {
  // Identificación
  origen: "agente-redactor",
  destino: "agente-evaluador",
  tarea_id: "task_abc123",
  
  // Instrucción
  instruccion: "Evalúa este copy para cumplimiento de criterios",
  
  // Datos
  payload: {
    contenido: "El texto generado...",
    criterios: ["tono_correcto", "sin_palabras_prohibidas", "longitud_correcta"],
    contexto: { avatar: "mamás 0-6m", canal: "instagram" }
  },
  
  // Metadata
  prioridad: "normal",       // "urgente" | "normal" | "baja"
  timeout_ms: 30000,         // cuánto esperar antes de declarar timeout
  requiere_gate_humano: false
}

// Respuesta estándar
const RESPUESTA_AGENTE = {
  origen: "agente-evaluador",
  tarea_id: "task_abc123",
  estado: "completado",      // "completado" | "fallido" | "escalado"
  resultado: {
    decision: "APRUEBA",     // "APRUEBA" | "RECHAZA" | "MODIFICA"
    razon: "Cumple todos los criterios",
    payload: { ... }         // el output del agente
  },
  duracion_ms: 1240
}
```

---

## Ejemplo: Equipo Mínimo Para un Negocio de Contenido

```
┌──────────────────────────────────────────────────────┐
│               ORQUESTADOR-CONTENIDO                  │
│  Recibe: "necesito contenido sobre [tema]"           │
│  Produce: contenido publicable en todos los canales  │
└──────┬───────────┬──────────────┬────────────────────┘
       │           │              │
       ▼           ▼              ▼
[AG-GUIONISTA]  [AG-EVALUADOR]  [AG-DERIVADOR]
Recibe tema     Recibe guión    Recibe guión aprobado
→ produce       → evalúa        → produce newsletter,
guión base      criterios       reels, posts, thread
```

**Resultado:** pides un tema → el equipo entrega todo el contenido listo para publicar.
**Gate humano:** entre el evaluador y la publicación real.

---

## Escalar el Equipo Con el Tiempo

```
SEMANA 1-4:    1 agente (el de mayor impacto)
               Medir, iterar, documentar

MES 2:         Agregar el evaluador del primer agente
               El par agente + evaluador es más confiable

MES 3-4:       Segundo agente de ejecución
               El orquestador manual (tú) ya tiene dos agentes que dirigir

MES 5-6:       Orquestador automático si el volumen lo justifica
               El equipo comienza a coordinarse sin tu intervención

Regla: cada nuevo agente debe justificarse con una necesidad real,
       no con el deseo de "tener un sistema más complejo"
```

---

## Herramientas Para Construir Equipos de Agentes

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Claude Code** | El cerebro principal y orquestador | claude.ai/code |
| **Vercel AI SDK** | Encadenamiento de agentes con tools | sdk.vercel.ai |
| **n8n** | Workflows visuales entre agentes | n8n.io |
| **Supabase** | Estado compartido entre agentes | supabase.com |
| **Groq** | Agentes de ejecución rápida y barata | groq.com |
| **OpenRouter** | Routing entre modelos según tarea | openrouter.ai |

## La Regla del Equipo de Agentes

> Un equipo de agentes bien diseñado es más fuerte que un único agente muy avanzado.
>
> La especialización + la coordinación + los gates correctos
> producen sistemas confiables que escalan.
>
> Empieza con un agente. Agrega cuando la necesidad sea clara.
