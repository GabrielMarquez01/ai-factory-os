---
name: video-pipeline-ai
description: Pipeline de producción de video con IA — de un guión o brief a un video publicado en YouTube/Reels/TikTok sin intervención manual. TTS + escenas visuales + edición + distribución como un proceso automatizable.
---

# 🎬 Video Pipeline con IA

> **Analogía:** Una producción de video tradicional necesita guionista, locutor, editor y publicador — 4 personas, días de trabajo. Un pipeline de video con IA es una línea de ensamblaje donde cada paso lo ejecuta un agente especializado, y tú solo apruebas el resultado final.

## El Problema

El video es el formato de mayor alcance orgánico — YouTube, Reels, TikTok priorizan video sobre cualquier otro contenido. Pero producir video de calidad consistente es el cuello de botella más grande para un fundador independiente.

**El pipeline resuelve esto:** defines la cadena de producción una vez, y cada episodio/video pasa por la misma cadena sin que tú tengas que intervenir en cada paso.

---

## La Cadena de Producción

```
[1] BRIEF / TEMA
        ↓
[2] GUIÓN (IA genera, humano aprueba)
        ↓
[3] AUDIO — Text-to-Speech (voz sintética del personaje)
        ↓
[4] ESCENAS VISUALES (imágenes/animaciones por segmento)
        ↓
[5] ENSAMBLAJE (FFmpeg une audio + visuales + subtítulos)
        ↓
[6] GATE HUMANO (revisión del video final)
        ↓
[7] DISTRIBUCIÓN (YouTube API / Meta API / TikTok API)
```

---

## Paso 1: Generación del Guión

El guión para video tiene reglas distintas al texto escrito:

```
REGLAS DE GUIÓN PARA VIDEO:
- Máximo 150 palabras por minuto de video
- Primera frase = hook (por qué debo seguir viendo)
- Frases cortas (máximo 12 palabras) — se leen y escuchan más fácil
- Verbos activos, no pasivos
- Sin jerga técnica sin explicación
- Marca de tiempo para cada segmento: [0:00] [0:30] [1:00]

ESTRUCTURA ESTÁNDAR (video 60-90 segundos):
[0:00-0:05] Hook — pregunta o dato sorprendente
[0:05-0:20] Contexto — por qué importa
[0:20-0:50] Desarrollo — el contenido principal
[0:50-1:00] CTA — qué hacer ahora (sin vender directamente)
```

**Prompt base para generación de guión:**
```
Eres un guionista especializado en [nicho] para videos de [plataforma].
Escribe un guión de [duración] sobre: [tema].
Avatar: [descripción del espectador ideal].
Tono: [tono de voz de la marca].
Formato: JSON con campos [segmentos: [{tiempo, texto, descripcion_visual}]].
Primera frase debe ser un hook que genere curiosidad o sorpresa.
```

---

## Paso 2: Text-to-Speech (Voz)

Opciones por caso de uso:

| TTS | Calidad | Costo | Mejor para |
|-----|---------|-------|-----------|
| **Kokoro TTS** | Alta (neural) | Gratis (self-host) | Producción local, privacidad |
| **ElevenLabs** | Muy alta (cloning) | $5-22/mes | Voz clonada del fundador |
| **OpenAI TTS** | Alta | $15/1M chars | Balance calidad/precio |
| **Groq + Whisper** | Media | Muy bajo | Transcripción + síntesis rápida |
| **Google Cloud TTS** | Alta | $4/1M chars | Volumen alto, multiidioma |

```javascript
// Ejemplo con ElevenLabs (voz clonada)
import { ElevenLabsClient } from 'elevenlabs'

async function generarAudio(texto, voiceId) {
  const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })
  
  const audio = await client.generate({
    voice: voiceId,              // ID de la voz clonada
    text: texto,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,            // 0 = más variado, 1 = más consistente
      similarity_boost: 0.8,     // qué tan similar a la voz original
    }
  })
  
  // Guardar el archivo de audio
  const chunks = []
  for await (const chunk of audio) chunks.push(chunk)
  await fs.writeFile('audio_segmento.mp3', Buffer.concat(chunks))
}
```

---

## Paso 3: Escenas Visuales

Dos enfoques para las visuales:

### Enfoque A: HTML → PNG (para videos educativos/texto)

Renderiza escenas HTML como imágenes. Ideal para contenido de texto animado, datos, quotes.

```javascript
// Con Playwright: renderizar HTML como imagen
import { chromium } from 'playwright'

async function htmlAPng(htmlContent, outputPath) {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1080, height: 1920 }) // 9:16 para Reels
  await page.setContent(htmlContent)
  await page.screenshot({ path: outputPath, fullPage: false })
  await browser.close()
}
```

### Enfoque B: Generación de imágenes con IA (para contenido visual)

```javascript
// Con OpenRouter + modelo de imagen
async function generarImagen(prompt) {
  const response = await fetch('https://openrouter.ai/api/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'dall-e-3',        // o stable-diffusion, flux, etc.
      prompt: prompt,
      size: '1024x1792',        // vertical para Reels/Shorts
      quality: 'standard'
    })
  })
  const data = await response.json()
  return data.data[0].url
}
```

---

## Paso 4: Ensamblaje con FFmpeg

FFmpeg es el estándar de la industria para procesamiento de video. Es gratuito y extremadamente poderoso.

```bash
# Unir imágenes + audio en video
ffmpeg \
  -loop 1 -i escena_01.png -i audio_01.mp3 \
  -c:v libx264 -tune stillimage -c:a aac \
  -shortest segmento_01.mp4

# Concatenar segmentos
ffmpeg \
  -i segmento_01.mp4 -i segmento_02.mp4 -i segmento_03.mp4 \
  -filter_complex '[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]' \
  -map '[v]' -map '[a]' video_final.mp4

# Agregar subtítulos (SRT)
ffmpeg -i video_final.mp4 -vf subtitles=subtitulos.srt \
  -c:a copy video_con_subtitulos.mp4
```

**Costo de FFmpeg:** $0. Se ejecuta en tu máquina, servidor, o GitHub Actions.

---

## Paso 5: Generación Automática de Subtítulos

Los subtítulos aumentan la retención en 40% (la mayoría ve video sin sonido).

```javascript
// Transcripción con Whisper (OpenAI / local)
import OpenAI from 'openai'

async function generarSubtitulos(audioPath) {
  const openai = new OpenAI()
  const transcripcion = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: 'whisper-1',
    response_format: 'srt',   // formato de subtítulos estándar
    language: 'es'
  })
  await fs.writeFile('subtitulos.srt', transcripcion)
}
```

---

## Paso 6: Distribución Automática

```javascript
// YouTube Data API v3
import { google } from 'googleapis'

async function subirAYouTube(videoPath, metadata) {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client })
  
  const respuesta = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: metadata.titulo,
        description: metadata.descripcion,
        tags: metadata.tags,
        categoryId: '26',        // Howto & Style — ajustar a tu nicho
        defaultLanguage: 'es'
      },
      status: {
        privacyStatus: 'private' // SIEMPRE private primero — gate humano revisa
      }
    },
    media: {
      body: fs.createReadStream(videoPath)
    }
  })
  
  return respuesta.data.id  // ID del video para activar después del gate
}
```

**Gate obligatorio:** el video se sube como PRIVADO. El humano lo revisa y lo activa. Nunca publicación automática directa.

---

## Infraestructura ($0 para empezar)

```
GitHub Actions (free tier):
└── Trigger: push a main / cron / manual dispatch
    ├── Instalar dependencias (FFmpeg, Node, etc.)
    ├── Ejecutar pipeline de generación
    ├── Subir video a YouTube como PRIVADO
    └── Notificar al founder para revisión (gate humano)

Costo mensual: $0 (GitHub Actions free = 2,000 min/mes en repo público)
```

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Kokoro TTS** | Voz sintética gratuita | github.com/remsky/Kokoro-FastAPI |
| **ElevenLabs** | Clonación de voz, calidad premium | elevenlabs.io |
| **FFmpeg** | Ensamblaje de video | ffmpeg.org |
| **Playwright** | HTML → PNG para escenas | playwright.dev |
| **HyperFrames** | Composición de video en HTML | (skill SaaS Factory) |
| **OpenRouter** | Generación de imágenes con múltiples modelos | openrouter.ai |
| **YouTube Data API** | Distribución a YouTube | developers.google.com/youtube |
| **GitHub Actions** | Pipeline CI/CD gratuito | docs.github.com/actions |

## La Regla del Video Pipeline

> La calidad del video no viene de las herramientas — viene del guión.
> Un buen guión con TTS simple supera a un mal guión con voz profesional.
> Itera primero en el guión, luego en la producción.
