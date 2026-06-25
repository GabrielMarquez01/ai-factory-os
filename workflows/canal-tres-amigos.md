---
description: >-
  Plantilla de workflow para canal de YouTube de contenido animado/educativo
  producido con IA a costo $0. Ilustrado con el caso real de un canal de
  animación para bebés. Adapta los personajes, nicho y reglas al tuyo.
---

# Workflow: Canal de Contenido Animado con IA
## (Plantilla — ejemplo: canal educativo para bebés)

> **Este workflow enseña el MÉTODO**, no la implementación específica de ningún canal real.
> El ejemplo es un canal de animación para bebés 0-6m producido a $0 con herramientas en nube.
> Adapta los personajes, el nicho, las reglas de contenido y los destinos a tu caso.

---

## El Problema Que Resuelve Este Workflow

Producir video de forma consistente es caro en tiempo o en dinero.
Este pipeline elimina esa disyuntiva: una vez que está configurado, produce episodios
de forma semiautomática con costo marginal decreciente (cada episodio es más barato que el anterior
porque la biblioteca de assets crece y se reutiliza).

---

## Arquitectura del Pipeline

```
Concepto del episodio
      ↓
Fase 0: Identidad visual (UNA SOLA VEZ — define personajes/estilo)
      ↓
Fase 1: Guión / escaleta
      ↓
Fase 2: Generación de assets (bloques animados + clips de personaje + audio)
      ↓
Fase 3: Ensamble (FFmpeg / editor)
      ↓
Gate: Revisión de calidad + cumplimiento de plataforma
      ↓
Fase 4: Publicación + distribución
```

**Principio de costo decreciente:**
```
Episodio 1: 100% assets nuevos  → X horas
Episodio 5: 60% reutilizados    → 0.6X horas
Episodio 20: 80% reutilizados   → 0.3X horas
```

---

## Fase 0: Identidad Visual (DAG: una sola vez)

**Agentes:** `creative-director` + herramienta de generación de imagen/video de tu elección

**Qué defines aquí:**
```markdown
PERSONAJES: [nombres, personalidades, paleta de colores, formato visual]
ESTILO:     [2D / 3D / tipografía / live action / combinado]
REGLAS:     [qué no puede aparecer en tu canal — por plataforma, nicho, edad del público]
FORMATOS:   [duración estándar, ratio, idioma]
```

**Ejemplo (canal para bebés):**
```
Personajes: 3 personajes con identidades por etapa de desarrollo (0-2m, 2-3m, 3m+)
Estilo: bloques 2D programáticos (Motion Canvas/Remotion) + clips generados con IA
Reglas: sin flashes, ritmo lento, paleta suave, cumplimiento de plataforma
Formatos: episodio 5-8 min + versión extendida 30-60 min
```

**Output:** Biblia visual → `assets/biblia-visual.md` + carpeta de assets base reutilizables

---

## Fase 1: Guión / Escaleta

**Agente:** `content-pipeline` + inteligencia de tu nicho

**Input:**
- Tema del episodio (de tu calendario de contenido)
- Biblia visual (qué personaje, qué paleta, qué tipo de estimulación/enseñanza)
- Reglas de la plataforma para tu audiencia

**Output:** `guiones/episodio-NNN-titulo.md` con:
```
- Estructura de escenas (tiempos)
- Texto/narración por escena (si hay voz)
- Indicaciones visuales para cada bloque
- Música/audio recomendado
- Descripción y tags de YouTube
```

**Gate humano:** Revisar antes de generar assets (es más barato corregir texto que video)

---

## Fase 2: Generación de Assets

**Herramientas (ejemplos — elige según tu presupuesto):**

| Asset | Herramienta gratuita | Herramienta pagada |
|-------|---------------------|-------------------|
| Animación 2D programática | Remotion (open source) + GitHub Actions | — |
| Clips de personaje/video IA | Kling (cuota gratis) | Kling Pro, Runway, Sora |
| Voz en off | Kokoro TTS (local, gratis) | ElevenLabs, PlayHT |
| Música de fondo | YouTube Audio Library | Epidemic Sound, Artlist |

**Principio:** empieza con herramientas gratuitas. Solo paga cuando el canal genera ingresos que justifiquen el costo.

---

## Fase 3: Ensamble

**Herramienta:** FFmpeg (gratis, línea de comandos)

```bash
# Ejemplo de comando de ensamble básico
ffmpeg -i intro.mp4 -i escena1.mp4 -i escena2.mp4 -i audio.mp3 \
  -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1[out]" \
  -map "[out]" -map 3:a -shortest episodio-001.mp4
```

El ensamble puede correr en GitHub Actions (gratis, hasta 2000 min/mes en repo público).

---

## Gate de Calidad

Antes de publicar, verificar:

```markdown
CONTENIDO:
- [ ] El episodio cumple con las reglas de tu plataforma (edad, tipo de contenido, clasificación)
- [ ] No hay elementos problemáticos para tu audiencia (definidos en tu Inteligencia de Nicho)
- [ ] La duración es la correcta para el formato

TÉCNICO:
- [ ] Resolución correcta (1080p mínimo para YouTube)
- [ ] Audio balanceado (sin picos, sin silencio involuntario)
- [ ] Thumbnail listo

DISTRIBUCIÓN:
- [ ] Título con palabras clave del nicho
- [ ] Descripción con estructura SEO + CTA claro
- [ ] Tags configurados
- [ ] Playlist asignada
```

---

## Fase 4: Publicación y Distribución

**Agente:** `social-content-system`

**Opciones de automatización:**
- YouTube Data API → subida programática desde GitHub Actions
- Zapier/n8n → trigger automático cuando el video está listo en Google Drive/S3
- Manual con checklist — perfectamente válido mientras el volumen es bajo

**Reutilización del contenido:**
```
Episodio completo (YouTube)
    ↓ cortar clip de 60s
    → Reel/TikTok (misma semana)
    → Shorts de YouTube
    → Story con CTA a canal
```

---

## Métricas a Seguir

| Métrica | Cuándo importa |
|---------|---------------|
| Retención media | Desde el primer episodio — indica si el contenido engancha |
| Horas de visionado | Para monetización (necesitas 4000h/año) |
| Crecimiento de suscriptores | Ritmo de acumulación de audiencia |
| CTR del thumbnail | Si es < 3%, el thumbnail necesita trabajo |

---

## Adaptar Este Workflow a Tu Canal

1. Define tu Fase 0: identidad visual de TUS personajes / estilo
2. Elige las herramientas que caben en tu presupuesto actual (empieza gratis)
3. Ajusta el Gate de Calidad con las reglas de TU nicho y plataforma
4. Crea tu biblioteca de assets base — el valor compuesto crece con cada episodio
