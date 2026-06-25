# Glosario: Términos del AI Factory OS

## Conceptos core

**Skill**
Archivo Markdown que define a un agente especializado. Incluye su rol, restricciones, vocabulario y proceso. Es la unidad mínima del sistema.

**Workflow DAG**
Secuencia de pasos con dependencias (Directed Acyclic Graph). Define el orden de ejecución, los agentes responsables de cada paso y los gates de validación humana.

**Gate Humano**
Punto de pausa obligatorio donde el founder aprueba antes de continuar. Separa lo que el agente ejecuta de lo que el humano decide. Regla: gasto, publicación o contratación = siempre gate humano.

**Engram**
Protocolo de memoria institucional. El conocimiento del negocio se almacena en archivos Markdown versionados en git. Persiste entre sesiones de Claude Code y entre proyectos.

**Pilar**
Vertical de negocio autónoma (ej: infoproducto, YouTube, e-commerce). Cada pilar puede tener sus propios skills y workflows, pero comparten el mismo OS.

**Avatar**
El cliente ideal del negocio, definido con precisión clínica. Incluye vocabulario específico del nicho que se convierte en restricción técnica para todos los agentes.

**Gate de Validación**
Criterio medible que debe cumplirse antes de avanzar a la siguiente fase. Ejemplo: "5 preventas antes de producir el curso completo".

**Pipeline**
Secuencia automatizada de transformaciones sobre un input. Ejemplo: guión → audio TTS → escenas HTML → video MP4 → subida a YouTube.

**SaaS Factory V5**
Patrón de desarrollo agent-first sobre el que está construido OpenGravity. Define el stack técnico, la arquitectura de features y el flujo de construcción.

## Reglas del sistema

1. **El humano decide QUÉ, el agente ejecuta CÓMO**
2. **Gate humano antes de gasto, publicación o transacción**
3. **Si no está en git, no existe**
4. **Una sola fuente de verdad para el conocimiento institucional**
5. **El mismo error nunca ocurre dos veces** (se documenta y se blinda)
