# Guía: Cómo Adaptar el AI Factory OS a Tu Negocio

## El patrón en 3 líneas

1. **Mapea** qué operaciones te cuestan más tiempo
2. **Crea un skill** (archivo Markdown) por cada área de expertise que necesitas
3. **Conecta** los skills en workflows con gates humanos explícitos

## Preguntas para diagnosticar tu negocio

Antes de construir cualquier agente, responde estas preguntas:

- ¿Cuántas horas/semana gastas en tareas repetitivas que siguen un patrón?
- ¿Cuál es tu "cuello de botella" real? (hint: casi nunca es el que crees)
- ¿Qué decisiones DEBEN ser humanas vs cuáles pueden automatizarse?
- ¿Tienes una fuente de verdad única para el conocimiento de tu negocio?

## Anatomía de un Skill

```markdown
# Nombre del Skill

## Rol
[Quién es este agente, qué expertise tiene]

## Restricciones (NUNCA hacer)
- [Restricción 1]
- [Restricción 2]

## Vocabulario del nicho
- [Término preferido] vs [término prohibido]

## Proceso
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Ejemplo de Output
[Muestra de cómo debe verse el resultado]
```

## Anatomía de un Workflow DAG

```markdown
# Nombre del Workflow

## Trigger
[Qué inicia el proceso]

## Fases
FASE 1: [Nombre] → [Agente responsable] → [Gate humano: SÍ/NO]
FASE 2: [Nombre] → [Agente responsable] → [Gate humano: SÍ/NO]

## Gates de Validación
- [Gate 1]: [Criterio de aprobación]
- [Gate 2]: [Criterio de aprobación]

## Output esperado
[Qué produce este workflow]
```

## Errores comunes al implementar

### ❌ Construir antes de validar
El primer gate siempre debe ser: ¿hay demanda real?
No code, no infra, no agentes — hasta tener señal de mercado.

### ❌ Mezclar el OS del negocio con el producto
Tu sistema operativo de IA es diferente a tu producto.
Si los mezclas, generas conflictos de contexto y memoria duplicada.

### ❌ Agentes sin restricciones explícitas
Un agente sin restricciones es un agente sin identidad.
Las restricciones ("NUNCA usar el término X") son parte de la lógica de negocio.

### ❌ Conocimiento fuera de git
Si no está versionado, no existe para el siguiente agente (o la siguiente sesión).
La memoria del negocio DEBE vivir en el repositorio.

## Aplicaciones en otros nichos

Este mismo patrón funciona para:
- **SaaS B2B**: pipeline de demos, nurturing de trials, soporte con agente
- **E-commerce**: descripciones de producto, respuesta a reseñas, reposición de inventario
- **Agencia creativa**: briefing → producción → revisión → entrega con workflows DAG
- **Consultoría**: onboarding de clientes, reportes periódicos, seguimiento de proyectos
- **Creadores de contenido**: ideas → guiones → producción → distribución multicanal

El denominador común: **operaciones repetitivas con patrón definido** → candidatas a agente.
