---
name: karpathy-protocol
description: Aplica los 4 principios de Karpathy para auditar o corregir el comportamiento de cualquier skill, workflow o pipeline de OpenGravity antes de ejecutarlo. Úsalo cuando el agente esté a punto de sobrecomplicar, asumir, o actuar sin criterio de éxito.
---

# Karpathy Protocol Skill

Auditor de comportamiento basado en los 4 principios de Andrej Karpathy para LLMs. No produce contenido — produce **claridad y disciplina** antes de que otro skill ejecute trabajo costoso.

## Cuándo usar este skill

- Antes de invocar Kling AI, ElevenLabs, Suno u otro MCP que consume créditos
- Cuando el brief del usuario es ambiguo (producto, plataforma, tono, audiencia)
- Cuando se va a modificar un skill o workflow existente
- Cuando un pipeline de video/producto tiene más de 3 fases
- Cuando el agente siente el impulso de "mejorar cosas no pedidas"
- Cuando se va a crear un nuevo skill desde cero

---

## Inputs necesarios

- `tarea`: Descripción de lo que se va a ejecutar
- `skill_destino`: Cuál skill o herramienta se va a invocar a continuación
- `contexto`: Producto, plataforma, audiencia (si disponibles)

Si alguno falta, preguntar antes de continuar.

---

## Workflow — Los 4 Checkpoints

### Checkpoint 1 — THINK FIRST
```
Antes de actuar, declarar:
├── ¿Qué asumo sobre el input? (producto, formato, idioma, duración)
├── ¿Hay ambigüedad que bloquee un buen output?
└── Si hay ambigüedad → PARAR y preguntar. No asumir en silencio.
```

**Regla:** Si no puedes completar este bloque sin inventar datos, el skill debe preguntar.

---

### Checkpoint 2 — SIMPLICITY GATE
```
Verificar que el plan NO incluye:
├── [ ] Features o fases no solicitadas explícitamente
├── [ ] Abstracciones nuevas cuando existe una solución directa
├── [ ] "Mejoras" a skills/archivos adyacentes no pedidas
└── [ ] Output más extenso del necesario para el objetivo
```

Si alguna casilla está marcada, eliminar esos elementos antes de continuar.

---

### Checkpoint 3 — SURGICAL SCOPE
```
Listar exactamente qué archivos/secciones se van a tocar:
├── Archivo 1: [ruta] → [sección específica]
├── Archivo 2: [ruta] → [sección específica]
└── ...

Si la lista tiene más de 3 archivos no relacionados → declararlo al usuario.
```

**Regla:** Preservar estilo existente. No refactorizar lo que no está roto.

---

### Checkpoint 4 — SUCCESS CRITERIA
```
Definir criterio de éxito ANTES de ejecutar:
├── Output entregable 1: [qué es exactamente]
├── Output entregable 2: [qué es exactamente]
├── ...
└── Verificación: ¿Cómo sé que el output es correcto sin pedirle al usuario?
```

**Para pipelines de video (YouTube / Reels / Shorts):**
```
Criterio mínimo válido:
├── Guión con marcas de tiempo ✓
├── Prompts Kling para cada B-roll ✓
├── Metadata SEO (título, descripción, tags) ✓
├── Thumbnail prompt ✓
└── Plan de distribución multicanal ✓
```

**Para skills nuevos:**
```
Criterio mínimo válido:
├── SKILL.md con frontmatter YAML ✓
├── Triggers claros definidos ✓
├── Workflow de 3-6 pasos máximo ✓
└── Output format exacto definido ✓
```

---

## Output (formato exacto)

El skill devuelve un bloque de auditoría antes de ceder el control:

```markdown
## Karpathy Protocol — Auditoría Pre-Ejecución

**Skill destino:** [nombre]
**Tarea:** [descripción]

### Asunciones declaradas
- [asunción 1]
- [asunción 2]

### Scope quirúrgico
- Toca: [archivo/sección]
- NO toca: [todo lo demás]

### Criterios de éxito
1. [entregable concreto]
2. [entregable concreto]

### Semáforo
🟢 Listo para ejecutar / 🟡 Necesita clarificación: [pregunta] / 🔴 Bloqueado: [razón]
```

Si el semáforo es 🟡 o 🔴, NO proceder al skill destino. Esperar respuesta del usuario.

---

## Manejo de errores

- Si el output del skill destino no cumple los criterios definidos → volver al Checkpoint 4 y re-ejecutar
- Si hay ambigüedad en la auditoría → siempre preguntar, nunca asumir
- Si el scope se expande durante la ejecución → declararlo y pedir aprobación

---

## Integración con otros skills

Este skill actúa como **pre-flight check** para:
- `youtube-content-producer` — antes de generar guión + Kling
- `short-form-video-producer` — antes de producción nativa
- `crear-landing` — antes de generar HTML
- `arquitecto-de-skills` — antes de crear skill nuevo
- `orquestador-nivel-3` — como gate antes de cada fase DAG
- Cualquier skill que invoque MCPs externos costosos
