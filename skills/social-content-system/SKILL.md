---
name: social-content-system
description: Sistema para convertir 1 pieza de contenido en 10 formatos para múltiples plataformas. En vez de crear contenido por separado para cada red, produces una vez y distribuyes automáticamente.
---

# 📱 Sistema de Contenido Multicanal

> **Analogía:** Un chef tradicional prepara un plato diferente para cada mesa. Un chef con sistema de mise en place prepara los ingredientes una vez y ensambla múltiples platos rápidamente. Este skill es el mise en place del contenido digital.
>
> Un artículo largo = 1 newsletter + 3 reels + 5 tweets + 2 posts de LinkedIn + 1 thread.

## El Problema

Crear contenido consistente para múltiples plataformas es agotador:
- Instagram quiere video vertical de 30-60s
- YouTube quiere video horizontal de 8-15 min
- Twitter/X quiere threads de 280 caracteres
- LinkedIn quiere reflexiones profesionales de 150-300 palabras
- Newsletter quiere análisis profundo de 600-1000 palabras

Una persona no puede producir formato nativo para cada canal todos los días. Pero sí puede producir una pieza "madre" y extraer los demás formatos.

---

## El Modelo 1 → 10

```
[PIEZA MADRE]               → El contenido más completo y profundo
    ↓ extraer
[NEWSLETTER]                → Versión escrita de 600-800 palabras
[VIDEO LARGO]               → Desarrollo completo (YouTube 8-15 min)
[REEL 60s]                  → El insight principal en 60 segundos
[REEL 30s]                  → El hook y la conclusión solamente
[SHORTS/TIKTOK]             → La parte más sorprendente o controversial
[POST LINKEDIN]             → Perspectiva profesional, 150-200 palabras
[THREAD TWITTER/X]          → 5-7 tweets con el argumento completo
[CARRUSEL IG]               → 5-7 slides con los puntos clave
[QUOTE VISUAL]              → La frase más memorable, en imagen
[HISTORIA IG 24h]           → Pregunta o encuesta relacionada
```

**La clave:** la pieza madre se produce PRIMERO. Todo lo demás se deriva de ella.

---

## La Pieza Madre: Qué es y Cómo Producirla

La pieza madre es el contenido más completo sobre un tema. Puede ser:
- Un artículo de blog de 1,000-2,000 palabras
- Un video de YouTube de 10+ minutos
- Un episodio de podcast de 20+ minutos

**Estructura de una pieza madre efectiva:**
```
[HOOK] — La pregunta o problema que resuelve
[CONTEXTO] — Por qué este tema importa ahora
[PUNTO 1] — Con ejemplo o dato
[PUNTO 2] — Con ejemplo o dato
[PUNTO 3] — Con ejemplo o dato
[CONTRAARGUMENTO] — La objeción más común
[CONCLUSIÓN] — El cambio de perspectiva o acción concreta
[CTA] — Qué hacer con esta información
```

---

## El Pipeline de Derivación con IA

```javascript
// Función base: tomar la pieza madre y derivar formatos
async function derivarContenido(piezaMadre, avatar, tono) {
  
  const formatos = {
    
    newsletter: `
      Basándote en este contenido: ${piezaMadre}
      Escribe una newsletter de 600-800 palabras para ${avatar}.
      Tono: ${tono}.
      Incluye: apertura personal, 3 ideas principales, conclusión accionable.
      NO copies el texto original — reescribe con perspectiva más íntima.
    `,
    
    reel60s: `
      Basándote en este contenido: ${piezaMadre}
      Escribe el guión de un Reel de 60 segundos (máximo 150 palabras).
      Primera frase = hook que genere curiosidad o sorpresa.
      Tono: conversacional, sin jerga técnica.
      Termina con un CTA suave.
    `,
    
    threadTwitter: `
      Basándote en este contenido: ${piezaMadre}
      Escribe un thread de 6 tweets (máximo 280 caracteres cada uno).
      Tweet 1 = hook que haga parar el scroll.
      Tweets 2-5 = argumentos con datos o ejemplos.
      Tweet 6 = conclusión + CTA.
      Formato JSON: [{numero: 1, texto: "..."}, ...]
    `,
    
    carruselIG: `
      Basándote en este contenido: ${piezaMadre}
      Escribe un carrusel de 6 slides para Instagram.
      Slide 1: título que genere curiosidad (máximo 8 palabras)
      Slides 2-5: un punto por slide (máximo 30 palabras + emoji)
      Slide 6: CTA + llamado a guardar/compartir
      Formato JSON: [{slide: 1, titulo: "...", texto: "..."}]
    `
  }
  
  // Generar todos los formatos en paralelo
  const resultados = await Promise.all(
    Object.entries(formatos).map(async ([formato, prompt]) => {
      const resultado = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
      })
      return [formato, resultado.choices[0].message.content]
    })
  )
  
  return Object.fromEntries(resultados)
}
```

---

## Calendario Editorial: La Cadencia Que Funciona

No publiques cuando tengas ganas — publica con sistema:

```
CADENCIA MÍNIMA SOSTENIBLE (1 persona):

Lunes:    Newsletter (derivada de la pieza madre de la semana anterior)
Martes:   Reel educativo (derivado de la pieza madre)
Miércoles: Post LinkedIn (perspectiva profesional)
Jueves:   Thread Twitter/X (argumento completo)
Viernes:  Reel de entretenimiento o detrás de cámaras
Fin de semana: Historias IG (engagement ligero, encuestas)

Producción real: 1 pieza madre por semana → genera todo lo anterior
```

**Regla de sostenibilidad:** si no puedes mantener el ritmo 3 meses seguidos con los recursos actuales → el calendario es muy ambicioso. Empieza con la mitad.

---

## Distribución Automática

```javascript
// Meta Graph API — publicar en Instagram
async function publicarEnIG(mediaUrl, caption, accessToken) {
  // Paso 1: crear container de media
  const containerRes = await fetch(
    `https://graph.facebook.com/v19.0/${IG_USER_ID}/media`,
    {
      method: 'POST',
      body: JSON.stringify({
        image_url: mediaUrl,    // o video_url para video
        caption: caption,
        access_token: accessToken
      })
    }
  )
  const { id: containerId } = await containerRes.json()
  
  // Paso 2: publicar el container
  await fetch(`https://graph.facebook.com/v19.0/${IG_USER_ID}/media_publish`, {
    method: 'POST',
    body: JSON.stringify({
      creation_id: containerId,
      access_token: accessToken
    })
  })
}

// GATE OBLIGATORIO: siempre aprobar el contenido antes de publicar
// Nunca publicar directo en producción sin revisión humana
```

---

## Herramientas Para el Pipeline

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Groq** | Derivar formatos rápido y barato | groq.com |
| **Canva API** | Crear imágenes de carrusel programáticamente | canva.com/developers |
| **HyperFrames** | Composición de video para reels | (skill SaaS Factory) |
| **n8n** | Workflow de distribución multicanal | n8n.io |
| **Buffer / Later** | Schedulers si prefieres no-code | buffer.com |
| **Meta Graph API** | Publicación en IG/Facebook | developers.facebook.com |
| **YouTube Data API** | Publicación en YouTube | developers.google.com/youtube |
| **Metricool** | Scheduling + analytics gratuito | metricool.com |

---

## Lo Que Más Funciona Por Plataforma

| Plataforma | Formato que más convierte | Horario promedio LatAm |
|-----------|--------------------------|----------------------|
| Instagram | Reels 30-60s + carrusel | Martes-Jueves 18-20h |
| TikTok | Video 15-30s, hook en 2s | Martes-Viernes 19-21h |
| YouTube | Thumbnail + título (el video llega después) | Viernes-Sábado |
| LinkedIn | Post texto largo + 1 insight fuerte | Martes-Jueves 7-9am |
| Twitter/X | Threads mañaneros | Lunes-Miércoles 8-10am |

---

## La Regla del Contenido

> El contenido más valioso es el que resuelve un problema específico
> para una persona específica en un momento específico.
>
> Producir mucho contenido genérico es menos efectivo
> que producir poco contenido específico y relevante.
>
> La consistencia supera a la perfección — mejor publicar imperfecto y seguido
> que perfecto y esporádico.
