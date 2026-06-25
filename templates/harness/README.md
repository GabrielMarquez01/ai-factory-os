# Harness Universal — Marco de Evaluación para Agentes de IA

> **¿Qué es un harness?** Como un arnés de seguridad: no escala la montaña por ti, pero te permite hacerlo sabiendo que si algo falla, tienes respaldo. El harness prueba que tu agente produce buenos outputs *antes* de que lleguen al usuario.

## Funciona con cualquier IA

```
Groq · OpenAI · Anthropic/Claude · Google Gemini · Ollama (local, gratis) · Cualquier API compatible con OpenAI
```

No estás atado a ningún proveedor. Si mañana cambia el modelo, cambias un parámetro.

---

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install node-fetch dotenv

# 2. Probar contra tu API local (por default)
node run-harness.js

# 3. Probar contra Groq
GROQ_API_KEY=gsk_... node run-harness.js --provider groq

# 4. Probar contra Ollama (local, sin costo)
ollama pull llama3.2
node run-harness.js --provider ollama

# 5. Probar un solo caso
node run-harness.js --filter TC-02

# 6. Ver las respuestas completas
node run-harness.js --verbose
```

---

## Cómo funciona

```
test-cases.json → run-harness.js → [tu proveedor de IA] → evalúa criterios → PASA / FALLA
```

### Estructura de un caso de prueba

```json
{
  "id": "TC-01",
  "type": "happy_path",
  "description": "Qué se está probando",
  "input": {
    "mensaje": "El mensaje del usuario",
    "historial": []
  },
  "criteria": [
    {
      "id": "C1",
      "check": "response_contains_any",
      "values": ["palabra1", "palabra2"],
      "description": "La respuesta menciona las palabras correctas"
    }
  ],
  "expected_result": "PASS"
}
```

### Tipos de caso (los 5 que todo agente necesita)

| Tipo | Qué prueba |
|------|-----------|
| `happy_path` | El caso ideal — el agente responde bien dentro de su dominio |
| `escalation` | Una señal de emergencia — debe redirigir al humano |
| `out_of_domain` | Pregunta fuera del área — debe rechazar educadamente |
| `tone` | ¿El vocabulario del nicho se respeta? ¿No suena clínico/genérico? |
| `security` | Prompt injection — ¿el agente protege sus instrucciones internas? |

### Criterios disponibles

| Check | Qué evalúa |
|-------|-----------|
| `response_contains_any` | La respuesta incluye al menos una de las palabras |
| `response_not_contains_any` | La respuesta NO incluye ninguna de las palabras |
| `response_length_max` | La respuesta tiene menos de N caracteres |
| `response_length_min` | La respuesta tiene más de N caracteres |
| `meta_field_equals` | Un campo del JSON de respuesta tiene el valor exacto |
| `meta_field_truthy` | Un campo del JSON de respuesta es verdadero |
| `response_matches_regex` | La respuesta coincide con el patrón regex |

---

## Adaptar a tu agente

1. **Edita `test-cases.json`** con los casos de tu negocio específico
2. **Agrega casos de seguridad** para las palabras que tu agente NO debe decir nunca
3. **Agrega casos de tono** con el vocabulario de tu nicho
4. **Corre antes de cada deploy** — si el score baja, no deployar

---

## Integración con CI/CD

```yaml
# .github/workflows/harness.yml
name: Harness de Calidad
on: [push]
jobs:
  harness:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install node-fetch dotenv
      - run: node templates/harness/run-harness.js --provider groq
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
          LOCAL_API_URL: ${{ secrets.STAGING_API_URL }}
```

---

## Escala de certificación (Modelo L0/L1/L2)

| Score | Nivel | Qué significa |
|-------|-------|---------------|
| < 60% | L0 | Supervisión en cada paso — no autónomo |
| 60–79% | L1 | Supervisión por run — aprobado con caveats |
| ≥ 80% | **L2** | Autónomo — reporta excepciones, no pide permiso |

Un agente L2 es el que puede correr en producción de noche sin que nadie lo vigile.

---

## Proveedores y sus URLs

| Proveedor | Flag | Variable | Notas |
|-----------|------|----------|-------|
| Tu API local | *(default)* | `LOCAL_API_URL` | `http://localhost:3000/api/chat` |
| OpenAI | `--provider openai` | `OPENAI_API_KEY` | gpt-4o-mini recomendado para tests |
| Groq | `--provider groq` | `GROQ_API_KEY` | Más rápido, más barato |
| Anthropic/Claude | `--provider anthropic` | `ANTHROPIC_API_KEY` | claude-haiku recomendado |
| Gemini / Antigravity | `--provider gemini` | `GEMINI_API_KEY` | gemini-3.5-flash · también funciona con agentes Antigravity |
| Ollama | `--provider ollama` | *(ninguna)* | Gratis, local, llama3.2 recomendado |
| Codex / OpenAI-compatible | `--provider openai-compatible --base-url URL` | opcional | Together, Fireworks, Codex API, etc. |

### Antigravity (Google I/O 2026)

Antigravity usa Gemini como motor. Para testear un agente Antigravity:

```bash
# Forma rápida — usa el provider gemini estándar
GEMINI_API_KEY=AI... node run-harness.js --provider gemini --model gemini-3.5-flash

# Forma específica — Antigravity Interactions API
GEMINI_API_KEY=AI... node run-harness.js \
  --provider openai-compatible \
  --base-url https://generativelanguage.googleapis.com/v1beta \
  --model antigravity-preview-05-2026
```

El harness también puede correr DENTRO de Antigravity IDE — tiene terminal integrado y soporta Node.js.
