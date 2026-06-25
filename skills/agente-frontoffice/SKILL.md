---
name: agente-frontoffice
description: Patrón para construir un agente de ventas y soporte 24/7 embebido en tu sitio web. Sin WhatsApp Business, sin costos de Meta, sin agentes humanos en turno de madrugada.
---

# 💬 Agente Front-Office

> **Analogía:** Imagina tener un vendedor y asesor que conoce perfectamente tu producto, habla exactamente en el tono de tu marca, nunca se cansa, y responde en menos de 2 segundos — a las 3am si es necesario.
> 
> Eso es un agente front-office bien implementado.

## El Problema

El cuello de botella más común en un negocio de una persona:
- Clientes preguntan → tú tardas horas en responder → la venta se enfría
- Soporte fuera de horario = silencio
- Escalar con agentes humanos = costos altos + inconsistencia de tono

## La Solución: Agente Web + RAG

**RAG** (Retrieval-Augmented Generation) — en español: "generación aumentada por recuperación de información".

> **Analogía:** En vez de que el agente responda desde su memoria general (que puede inventar cosas), le das un libro de referencia propio. Antes de responder, busca en TUS documentos. El resultado: responde con tu vocabulario, tu conocimiento, y en el tono de tu marca.

## Arquitectura del Patrón

```
Usuario escribe pregunta
    ↓
[1] Clasificar intención
    ¿Consulta de producto? ¿Señal de compra? ¿Queja? ¿Emergencia?
    ↓
[2] Buscar en base de conocimiento (RAG)
    Los documentos más relevantes para esta pregunta
    ↓
[3] Generar respuesta con contexto
    LLM + documentos relevantes + identidad del agente → respuesta
    ↓
[4] Validar antes de enviar
    ¿Pasa los circuit breakers? ¿Tono correcto? ¿Sin info prohibida?
    ↓
[5] Enviar + registrar para análisis
```

## Los 4 Componentes Clave

### 1. El System Prompt: La "Personalidad" del Agente

El system prompt no es solo instrucciones — es la identidad del agente.

```markdown
## ROL
[Nombre del agente], [función], [empresa].
Eres el primer punto de contacto de [tipo de usuario].

## VOCABULARIO OBLIGATORIO
Siempre usas: [palabra1, palabra2, palabra3]

## VOCABULARIO PROHIBIDO
NUNCA usas: [palabra1, palabra2]
Si aparece en tu output → es un error → regenera la respuesta.

## RESTRICCIONES DURAS (nunca las rompes)
- NUNCA haces diagnósticos médicos, legales o financieros
- NUNCA compartes información de otros usuarios
- NUNCA ofreces descuentos no autorizados
- NUNCA das datos de contacto de proveedores o socios

## CUÁNDO ESCALAR AL HUMANO
- Señal de compra directa ("quiero comprar", "cuánto cuesta exactamente")
- Situación de emergencia (definir keywords del nicho)
- Queja formal o solicitud de reembolso
- Pregunta que no puedes responder con confianza
```

### 2. La Base de Conocimiento (El "Libro de Referencia")

Tus documentos convertidos en vectores buscables.

**Qué incluir:**
- Preguntas frecuentes con sus respuestas
- Características del producto con ejemplos reales
- Objeciones comunes + cómo responderlas
- Políticas (devoluciones, precios, envíos)
- Contenido educativo del nicho

**Cómo funciona técnicamente:**

```
Tus documentos (PDF, artículos, guías)
    → Texto extraído
    → Dividido en fragmentos de ~500 palabras
    → Cada fragmento convertido a vector numérico (embedding)
    → Guardado en base de datos vectorial

Cuando el usuario pregunta:
    → Su pregunta también se convierte a vector
    → Se buscan los fragmentos más similares (búsqueda semántica)
    → Esos fragmentos se incluyen en el contexto del LLM
    → El LLM genera respuesta basada en TU contenido
```

**Supabase con pgvector** es la opción más accesible para implementar esto:

```sql
-- Habilitar extensión de vectores
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabla para tus documentos
CREATE TABLE base_conocimiento (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  embedding vector(1536),
  categoria TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Función de búsqueda por similitud semántica
CREATE FUNCTION buscar_similares(
  query_embedding vector,
  limite INT DEFAULT 5
)
RETURNS TABLE (contenido TEXT, similitud FLOAT) AS $$
  SELECT contenido, 1 - (embedding <=> query_embedding) AS similitud
  FROM base_conocimiento
  ORDER BY embedding <=> query_embedding
  LIMIT limite;
$$ LANGUAGE SQL;
```

### 3. La Lógica de Escalada

No todo debe resolverlo el agente. El agente maneja el volumen; el humano maneja la profundidad.

```javascript
// Pseudocódigo — adaptar a tu nicho y stack
const SEÑALES_DE_ESCALADA = {
  compraInminente: ['quiero comprar', 'me apunto', 'cuánto cuesta exactamente'],
  emergencia: ['keywords de emergencia específicas de tu nicho'],
  queja: ['no funciona', 'quiero reembolso', 'muy mal servicio'],
  iteracion: 'usuario con 3+ mensajes sin resolución satisfactoria'
}

function clasificarIntencion(mensaje) {
  // Clasificar antes de generar respuesta
  // Si es escalada → notificar founder + pausar agente
  // Si es consulta normal → continuar con RAG
}
```

**Chain de prioridad (de mayor a menor urgencia):**
```
emergencia > señal_de_compra > queja > sin_resolución > consulta_normal
```

### 4. El Widget de Chat

El punto de entrada del usuario. Opciones:

| Tipo | Cuándo usarlo |
|------|--------------|
| **Widget flotante** (burbuja de esquina) | App o sitio con contenido principal arriba |
| **Inline chat** | Cuando el chat ES el producto principal |
| **Pantalla completa** | Apps de soporte o asistencia dedicada |

## Implementación Backend Básica

```javascript
// Next.js — app/api/chat/route.js
import Groq from 'groq-sdk'
import { crearEmbedding, buscarEnRAG } from '@/lib/rag'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  const { mensaje, historial } = await req.json()

  // 1. Buscar contexto relevante en la base de conocimiento
  const embedding = await crearEmbedding(mensaje)
  const contextRelevante = await buscarEnRAG(embedding, 5)

  // 2. Construir el prompt con contexto real
  const mensajes = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nContexto disponible:\n${contextRelevante}` },
    ...historial,
    { role: 'user', content: mensaje }
  ]

  // 3. Generar respuesta (Groq = rápido, < 1 segundo)
  const respuesta = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: mensajes,
    temperature: 0.3, // baja = más consistente en tono y datos
  })

  return Response.json({
    respuesta: respuesta.choices[0].message.content
  })
}
```

## El Vocabulario como Restricción Técnica

Este es uno de los aprendizajes más importantes del patrón:

El vocabulario del avatar no es una preferencia editorial — es parte de la lógica de negocio.

Si tu cliente usa cierto lenguaje y tu agente responde con términos diferentes, el usuario siente que habla con un robot corporativo genérico, no con alguien de su comunidad.

**Cómo implementarlo como restricción técnica:**

```markdown
## GATE DE VOCABULARIO (en el system prompt)
Antes de enviar cualquier respuesta, verifica internamente:
- ¿Contiene alguna palabra de la lista prohibida?
- Si SÍ → reescribe la respuesta antes de enviar
- Si NO → enviar

Esta verificación no es opcional ni estilística — es parte de tu función.
```

## Métricas Para Saber Si Funciona

| Métrica | Qué mide | Meta inicial |
|---------|---------|-------------|
| Tiempo de respuesta | Velocidad percibida | < 3 segundos |
| Tasa de resolución | % preguntas sin escalar | > 70% |
| Tasa de escalada | % que llegan al humano | < 30% |
| Señales de compra detectadas | Conversión potencial | Registrar y analizar |

## Herramientas del Stack

| Herramienta | Rol | Link |
|-------------|-----|------|
| **Groq** | LLM ultrarrápido (respuestas en < 1s) | groq.com |
| **Supabase + pgvector** | Base de conocimiento vectorial | supabase.com |
| **Vercel AI SDK** | Streaming de respuestas + herramientas | sdk.vercel.ai |
| **OpenRouter** | Routing entre modelos según costo/velocidad | openrouter.ai |
| **Next.js** | Framework web + API routes | nextjs.org |
| **Railway** | Deploy del backend si es Express/Node | railway.app |

## Lo Que Este Patrón No Reemplaza

- Empatía real en situaciones de crisis emocional
- Decisiones comerciales complejas o personalizadas
- Relaciones de largo plazo con clientes VIP
- Situaciones médicas, legales o de alta responsabilidad

El agente maneja el volumen. El humano maneja la profundidad y el juicio.

## Recursos

- Vercel AI SDK — RAG con Supabase: sdk.vercel.ai/docs/guides/rag-chatbot
- Supabase — Vector embeddings: supabase.com/docs/guides/ai/vector-embeddings
- Groq — API de inferencia rápida: console.groq.com/docs
- OpenRouter — Routing por modelos: openrouter.ai/docs
