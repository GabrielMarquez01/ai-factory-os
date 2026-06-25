---
name: harness-universal
description: Marco de evaluación reutilizable para medir si cualquier skill o pipeline produce outputs de calidad. El mismo criterio que usarías para un humano — ¿cumple el objetivo? ¿en el tono correcto? ¿sin errores críticos?
---

# 🧪 Harness Universal

> **Analogía:** Un harness (arnés de seguridad) no te escala la montaña — te permite hacerlo sabiendo que si algo falla, tienes respaldo. En IA, el harness es el sistema que prueba que tus agentes producen buenos outputs ANTES de que lleguen al usuario final.

## El Problema

Los agentes de IA pueden producir outputs incorrectos, con el tono equivocado, o que violan las reglas del negocio — y sin un sistema de prueba, no lo sabes hasta que ya causó daño.

## La Estructura de un Harness

```
Input de prueba → Agente ejecuta → Evaluador compara con criterio → PASA / FALLA
```

### Componente 1: Casos de Prueba

Crea al menos 5 casos para cada skill crítico:

| Tipo | Qué prueba |
|------|-----------|
| **Caso feliz** | El input ideal → el output esperado |
| **Caso límite** | Input en el borde de lo aceptable |
| **Caso de rechazo** | Input que debe producir un "no" o una alerta |
| **Caso de tono** | ¿El vocabulario del nicho se respeta? |
| **Caso de seguridad** | ¿El agente revela info que no debe? |

### Componente 2: Criterios Binarios (Pasa / No Pasa)

Para cada caso, define criterios que solo tienen dos estados:

```markdown
## Caso 1: Consulta estándar
INPUT: [pregunta típica de tu usuario]
CRITERIOS:
- ✅ Respuesta en menos de [X] palabras
- ✅ Usa el vocabulario del nicho ([palabras específicas])
- ✅ NO usa las palabras prohibidas
- ✅ No hace claims que no puedes respaldar
- ✅ Incluye los campos requeridos: [campo1, campo2]
RESULTADO ESPERADO: PASA

## Caso 2: Señal de emergencia
INPUT: [situación que requiere escalar al humano]
CRITERIOS:
- ✅ Activa flag de escalada
- ✅ No intenta resolver lo que no puede resolver
- ✅ Da instrucción clara de siguiente paso
RESULTADO ESPERADO: PASA (con alerta)
```

### Componente 3: El Evaluador

Tres niveles de implementación:

**Nivel 1 — Manual (para empezar):**
Tú revisas los outputs con la checklist. Lento pero construye intuición del sistema.

**Nivel 2 — LLM como juez:**
```
PROMPT DEL EVALUADOR:
"Eres un evaluador de calidad estricto.
Dado el siguiente output, determina si cumple TODOS los criterios.
Responde SOLO: PASA o FALLA, seguido de la razón en máximo 1 línea.

CRITERIOS:
[lista de criterios]

OUTPUT A EVALUAR:
[output del agente]"
```

**Nivel 3 — Automático (Karpathy Loop):**
Ver skill `karpathy-protocol` para el loop de auto-optimización con evaluador automático.

## Cómo Correr el Harness

### Archivo de casos de prueba

```markdown
# harness/[nombre-skill]-cases.md

## Meta
Skill: [nombre]
Umbral mínimo de pase: 8/10 casos

## Casos
[caso 1]
[caso 2]
...
```

### Registro de resultados

```
Fecha: YYYY-MM-DD
Skill: [nombre]
Versión del prompt: v[N]
Casos ejecutados: 10
Pasaron: 8
Fallaron: 2
Detalle de fallas:
- Caso 3: [qué falló y por qué]
- Caso 7: [qué falló y por qué]
Acción tomada: [qué se cambió]
Resultado después del cambio: [pase/falle]
```

## Cuándo Correr el Harness

```
ANTES de cambiar el system prompt del agente
DESPUÉS de ingestar nuevos documentos al RAG
ANTES de cada deploy a producción
SEMANALMENTE si el agente tiene contacto directo con usuarios
CUANDO el agente sube de nivel (L0 → L1 → L2)
```

Ver skill `modelo-l0-l1-l2` para la relación entre harness y certificación de autonomía.

## El Patrón de Auto-Optimización

Basado en el trabajo de Andrej Karpathy (ex-Tesla AI, ex-OpenAI) sobre evaluación de LLMs:

```
1. Define N casos de prueba con criterios binarios
2. Corre el agente → score = X/N
3. Muta el prompt levemente (cambia un elemento)
4. Corre de nuevo → ¿mejoró el score?
5. Si mejoró: guarda la nueva versión
6. Si empeoró: descarta el cambio
7. Repite hasta score aceptable (define tu umbral — ej: 8/10)
```

La clave: mutaciones pequeñas, evaluación objetiva, decisión basada en datos.

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Groq** | Evaluador LLM rápido y económico | groq.com |
| **OpenRouter** | Comparar evaluadores con múltiples modelos | openrouter.ai |
| **Playwright** | Harness para interfaces web | playwright.dev |
| **Vitest** | Harness para lógica de código | vitest.dev |
| **Supabase** | Almacenar historial de evaluaciones | supabase.com |

## Recursos de la Comunidad

- Vercel AI SDK — evaluación de outputs: sdk.vercel.ai/docs/ai-sdk-core/testing
- everything-claude-code (ECC) — patrones de evaluación para Claude Code: github.com/disler/everything-claude-code
- Promptfoo — framework de evaluación de LLMs: promptfoo.dev

## La Filosofía

> No confíes en que el agente funciona. **Prueba** que funciona.
>
> Un skill sin harness es como un empleado sin feedback — puede estar cometiendo el mismo error durante semanas y nadie lo sabe.
