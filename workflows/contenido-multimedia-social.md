---
description: Workflow de producción multimedia para redes sociales. Convierte una idea o producto en un ecosistema completo de contenido: videos, animaciones, stories, carousels y reels, optimizados para cada plataforma.
---

# Workflow: Contenido Multimedia Social (Idea → Ecosistema)

## Outputs Esperados
- ✅ 1 video largo (YouTube/LinkedIn) 3-10 min
- ✅ 3-5 clips cortos adaptados (TikTok/Reels/Shorts)
- ✅ 1 comercial animado premium (HTML o MP4)
- ✅ 10 posts de imagen/carousel para Instagram/LinkedIn
- ✅ Voz en off profesional en todos los videos
- ✅ Música original sin copyright
- ✅ Thumbnails optimizadas para CTR

---

## Fase 1: Brief Creativo (DAG: secuencial)

**Agente Hub**: `creative-director`
**Input**: Marca/producto, objetivo de la campaña, audiencia, plataformas, presupuesto estimado

### Steps
1. Definir el "Big Idea": la idea central que une toda la campaña
2. Establecer tono y estilo visual → consultar `estilo-marca`
3. Mapear los formatos requeridos por plataforma:
   - YouTube: video largo (5-10 min) + Short (60s)
   - Instagram: Reel (30-60s) + Carousel (8-10 slides) + Story (15s)
   - TikTok: video nativo (21-60s)
   - LinkedIn: video educativo (2-3 min) + post con imagen
4. Crear storyboard general de la campaña
5. Definir el mensaje central y los 3 sub-mensajes por plataforma

**Gate Humano**: Aprobar Big Idea y dirección creativa

**Output**: `workspace/multimedia/[campaña]/brief-creativo.md`

---

## Fase 2A: Producción Video Principal (DAG: secuencial)

**Agente**: `youtube-content-creator` + `ai-video-producer`

### Steps
6. Escribir script del video principal (estructura completa)
7. Generar storyboard de escenas: qué se ve en pantalla en cada momento
8. Producir escenas de video → `ai-video-producer` (Kling 3.0 / Veo 3.1)
   - Escena 1: Hook visual (0-15s)
   - Escenas 2-N: Contenido principal
   - Última escena: CTA
9. Generar voz en off → `voiceover-producer` (ElevenLabs)
10. Generar música de fondo → `music-composer-ai` (Suno AI)
11. Post-producción completa → `video-post-producer` (FFmpeg)
12. Exportar: 1920×1080 para YouTube/LinkedIn

**Output**: `workspace/multimedia/[campaña]/video-principal-1080p.mp4`

---

## Fase 2B: Comercial Premium (DAG: paralelo con 2A)

**Agente**: `crear-comercial` + `creative-director`

### Steps
13. Crear comercial animado HTML de 5 escenas (22 segundos) → `crear-comercial`
14. Revisar con director creativo para alineación de marca
15. Renderizar como video usando herramienta externa (Puppeteer/ScreenCapture)
16. Alternativa: generar versión full IA con Kling Storyboarding (6 shots)

**Output**: `workspace/multimedia/[campaña]/comercial-premium.html` + `.mp4`

---

## Fase 3: Adaptaciones Short-Form (DAG: paralelo tras 2A)

**Agente**: `short-form-video-producer`

### Steps (paralelo por plataforma)

**3a. TikTok nativo**
17. Identificar el momento de mayor energía del video principal (hook)
18. Reescribir hook específico para TikTok (más directo, primeras 3 palabras críticas)
19. Adaptar a formato vertical 9:16 → `video-post-producer`
20. Agregar captions animados + música trending → `music-composer-ai`

**3b. Instagram Reel**
21. Seleccionar clip más estético/visual del video principal
22. Optimizar para consumo visual (sin sound off): texto on-screen imprescindible
23. Agregar aesthetic color grade → `video-post-producer`

**3c. YouTube Shorts**
24. Versión educativa condensada del video principal (60s max)
25. Mantener audio original del video principal
26. Agregar end screen con "Mira el video completo"

**3d. LinkedIn Video**
27. Versión profesional/seria: mismos puntos, tono corporativo
28. Subtítulos obligatorios (80% de LinkedIn se ve sin sonido)
29. Duración: 2-3 min máximo

**Output**: 4 clips adaptados en `workspace/multimedia/[campaña]/clips/`

---

## Fase 4: Contenido Estático (DAG: paralelo con Fase 3)

**Agente**: `marketing-digital` + `thumbnail-designer-ai`

### Steps (paralelo)

**4a. Carousels Instagram/LinkedIn**
30. Definir estructura del carousel: problema → proceso → resultado (8-10 slides)
31. Diseñar slides con Canva MCP → `thumbnail-designer-ai`
32. Redactar copy para cada slide (máximo 3 líneas por slide)
33. Crear versión para Instagram y versión para LinkedIn

**4b. Stories (15s)**
34. Crear 3 stories de countdown/hype antes del lanzamiento del video
35. Story de "preview" con fragmento del video
36. Story de CTA post-publicación ("Ya está el video, link en bio")

**4c. Thumbnails**
37. Diseñar thumbnails A/B para el video principal → `thumbnail-designer-ai`
38. Crear covers para Reels y TikTok

**Output**: `workspace/multimedia/[campaña]/estaticos/`

---

## Fase 5: Publicación Coordinada (DAG: secuencial tras Fases 3 y 4)

**Agente**: `marketing-digital` + `youtube-content-creator`

### Secuencia de Publicación (Día del Lanzamiento)

**T-3 días:**
39. Publicar teaser de 15s en TikTok/Instagram ("Algo viene...")
40. Publicar poll en Stories ("¿Quieres saber sobre [tema]?")

**T-1 día:**
41. Enviar email a lista ("Mañana publicamos...")

**Día 0 (publicación):**
42. 9:00h — Publicar video YouTube con metadata completa
43. 12:00h — Publicar TikTok (hora peak)
44. 14:00h — Publicar Instagram Reel
45. 16:00h — Publicar LinkedIn video
46. 17:00h — Publicar carousels + Stories

**Post-lanzamiento:**
47. Responder comentarios las primeras 2h (señal al algoritmo)
48. Compartir en Twitter/X con thread de puntos clave
49. Actualizar el pin del perfil con el nuevo contenido

---

## Fase 6: Análisis y Aprendizaje (DAG: 72h post-lanzamiento)

**Agente**: `market-validation-engine` + `engram-memory-protocol`

50. Recopilar métricas por plataforma (views, engagement, CTR, saves, shares)
51. Identificar qué formato tuvo mejor rendimiento
52. Si CTR YouTube < 4% → swap thumbnail en las 48h
53. Si TikTok < 1,000 views en 24h → boostar con duet/stitch
54. Documentar aprendizajes: qué hook funcionó, qué thumbnail, qué plataforma rindió más
55. Actualizar Engram → `engram-memory-protocol`

---

## Stack Tecnológico

| Función | Herramienta | MCP |
|---------|-------------|-----|
| Video IA (texto→video) | Kling 3.0 / Veo 3.1 | `mcp-kling` / `infsh` |
| Voz en off | ElevenLabs | `elevenlabs-mcp` |
| Música original | Suno AI | `suno-mcp` |
| Diseño/Thumbnails | Canva | `canva-mcp` |
| Post-producción | FFmpeg | `mcp-ffmpeg` |
| Edición avanzada | CapCut | `capcut-mcp` |
| Publicación YT | YouTube API | `youtube-mcp` |
| Comerciales HTML | CSS Animations | propio |
