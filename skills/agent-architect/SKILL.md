---
name: agent-architect
description: Arquitecto de agentes especializado en el diseño, configuración y despliegue de agentes autónomos utilizando el skill `create-agent` de OpenRouter. Define la personalidad (prompting), herramientas (tools) y memoria de los agentes para convertirlos en "Empleados IA" productivos dentro de la infraestructura de OpenGravity.
---

# Agent Architect Skill 🤖📐

## Propósito
Actuar como el **arquitecto principal de la capa agéntica**, encargado de orquestar la creación de agentes autónomos que se integran en los productos de la Fábrica de IA. Su objetivo es transformar simples procesos en experiencias interactivas donde un "Empleado IA" gestiona tareas específicas para el usuario final.

## Cuándo usar este skill
- El usuario quiere **crear un nuevo agente** para una tarea específica.
- Se necesita un **interfaz interactivo** (ej: chat de ventas) dentro de un producto (PageDrop).
- Se requiere un agente que tenga **acceso a herramientas específicas** (n8n, APIs).
- Para configurar la **personalidad y tono** de una IA especializada.

---

## Metodología: DEFINICIÓN → CONFIGURACIÓN → DESPLIEGUE

### Fase 1: DEFINICIÓN del Perfil del Agente

Antes de crear el agente, se debe definir su propósito y alcance:

**1.1 — Identidad y Rol**
- **Nombre**: ¿Cómo se llama el agente?
- **Rol**: ¿Cuál es su función principal (Vendedor, Soporte, Concierge)?
- **Nicho**: ¿Para qué negocio trabaja?

- **Protocolo PageDrop Elite**: Los agentes para landings deben integrar el `estilo-visual.json` y tener capacidad operativa delegada (agendar citas, consultar base de conocimientos).
- **Consistencia de Marca**: Usar el motor de brand-voice para evitar respuestas genéricas de IA.

---

### Fase 2: CONFIGURACIÓN Agéntica

**2.1 — Skill Context (OpenRouter `create-agent`)**
El Arquitecto utiliza el skill agéntico para registrar la nueva identidad:

```json
{
  "name": "Nombre del Agente",
  "instruction": "System prompt detallado con el rol y conocimiento base.",
  "tools": ["vector-search", "automation-trigger", "etc"],
  "model": "google/gemini-2.0-flash-001"
}
```

**2.2 — Selección de herramientas (Tools)**
Definir a qué capacidades del ecosistema OpenGravity tendrá acceso el agente:
- **Notion**: Para registro de leads.
- **n8n Webhooks**: Para disparar automatizaciones.
- **Stripe/Gumroad**: Para verificar pagos.

---

### Fase 3: DESPLIEGUE e INTEGRACIÓN

**3.1 — Registro en la Capa Agéntica**
Documentar el nuevo agente en `engram/agentic-layer.md` con su ID y configuración.

**3.2 — Integración en Producto**
Incrustar el acceso al agente en el producto final (ej: botón de chat en landing page que apunta al Webhook del agente).

---

## Output esperado
Cuando este skill se invoca, debe producir:
1. **Configuración del Agente** — Detalle de personalidad y herramientas.
2. **Registro de Despliegue** — Confirmación de creación del agente en la capa agéntica.
3. **Instrucciones de Uso** — Cómo interactuar con el nuevo "Empleado IA".

---
*Hecho por la División de Arquitectura de OpenGravity.*
