// templates/api/chat/route.ts
// Agente front-office con RAG — copiar a app/api/chat/route.ts en tu proyecto Next.js
// Docs: skills/agente-frontoffice/SKILL.md

import { createClient } from '@supabase/supabase-js'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Personaliza esto con el contexto de tu negocio ──────────────────────────
const SYSTEM_PROMPT = `
Eres [NOMBRE_DEL_AGENTE], asistente de [NOMBRE_DEL_NEGOCIO].
Tu función es [FUNCIÓN_PRINCIPAL].

VOCABULARIO OBLIGATORIO: [palabras que siempre usas]
VOCABULARIO PROHIBIDO: [palabras que nunca usas]

RESTRICCIONES:
- NUNCA hagas diagnósticos médicos, legales o financieros
- NUNCA compartas información de otros usuarios
- NUNCA ofrezcas descuentos no autorizados

CUÁNDO ESCALAR AL HUMANO:
- Señal de compra directa → activar flag founders_alert
- Emergencia → activar flag requiere_humano
- Queja formal → activar flag requiere_humano

Cuando actives un flag, incluye en tu respuesta JSON el campo correspondiente en true.
`
// ────────────────────────────────────────────────────────────────────────────

async function crearEmbedding(texto: string): Promise<number[]> {
  // Usar OpenAI o cualquier proveedor de embeddings compatible
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: texto,
      model: 'text-embedding-3-small',
    }),
  })
  const data = await response.json()
  return data.data[0].embedding
}

async function buscarContexto(mensaje: string): Promise<string> {
  try {
    const embedding = await crearEmbedding(mensaje)
    const { data } = await supabase.rpc('buscar_conocimiento', {
      query_embedding: embedding,
      limite: 4,
      umbral_similitud: 0.7,
    })
    if (!data?.length) return ''
    return data.map((d: { contenido: string }) => d.contenido).join('\n\n---\n\n')
  } catch {
    return ''  // Si RAG falla, continuar sin contexto
  }
}

export async function POST(req: Request) {
  const { mensaje, historial = [] } = await req.json()

  if (!mensaje?.trim()) {
    return Response.json({ error: 'Mensaje vacío' }, { status: 400 })
  }

  // 1. Buscar contexto relevante en la base de conocimiento
  const contexto = await buscarContexto(mensaje)

  // 2. Construir el prompt con contexto RAG
  const systemConContexto = contexto
    ? `${SYSTEM_PROMPT}\n\nCONTEXTO DISPONIBLE:\n${contexto}`
    : SYSTEM_PROMPT

  // 3. Generar respuesta
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    messages: [
      { role: 'system', content: systemConContexto },
      ...historial.slice(-10),          // últimos 10 mensajes de historial
      { role: 'user', content: mensaje },
    ],
  })

  const respuesta = completion.choices[0].message.content ?? ''

  // 4. Detectar flags de escalada (buscar keywords críticas)
  const SEÑALES_COMPRA = ['quiero comprar', 'me apunto', 'cuánto cuesta exactamente', 'cómo pago']
  const requiereHumano = SEÑALES_COMPRA.some(s => mensaje.toLowerCase().includes(s))

  // 5. Registrar evento de analytics (no bloquear la respuesta si falla)
  supabase.from('eventos').insert({
    evento: 'chat_mensaje',
    propiedades: {
      longitud_mensaje: mensaje.length,
      con_contexto_rag: !!contexto,
      requiere_humano: requiereHumano,
    },
  }).then(() => {}).catch(() => {})

  return Response.json({
    respuesta,
    requiereHumano,
    meta: { conRAG: !!contexto },
  })
}
