---
description: >-
  Workflow de producción del canal de YouTube "Los Tres Amigos" (contenido
  sensorial/educativo para bebés 0-6m, Made for Kids). Pipeline en nube a costo
  $0: bloques 2D programáticos (Motion Canvas/Remotion en GitHub Actions, 70-85%
  del metraje) + clips de personaje Kling 3.0 reutilizables + audio seguro +
  ensamble FFmpeg + subida Made for Kids. Cuatro gates: biblia visual, escaleta,
  curaduría de clips y revisión completa de seguridad sensorial.
---

# Workflow: Canal Los Tres Amigos (Producción de Episodios)

> Plan del canal: `workspace/primeras-miradas-ecosistema/canales-youtube/PLAN_CANAL_TRES_AMIGOS.md` · Stack: `canales-youtube/INFORME_STACK_VIDEO_NUBE_2026.md` · Storyboards listos: `GUIONES_TRES_AMIGOS_LOTE1.md` (10 episodios)
> Coordinador: `gestor-flujos-ecosistema` · Cadencia inicial: 1 episodio/semana (la biblioteca reutilizable acelera cada episodio siguiente)
> ⚠️ Canal **Made for Kids** (COPPA): sin ads personalizados, sin comentarios, CTA solo en descripción.

## Outputs Esperados
- ✅ Biblia visual de los 3 personajes (1 sola vez) → assets que también desbloquean el merch POD (Pilar 4)
- ✅ 1 episodio/semana publicado conforme a las reglas sensoriales (sin flashes, ritmo lento, paleta por etapa)
- ✅ Biblioteca creciente de bloques 2D y clips Kling reutilizables (el costo marginal baja cada semana)
- ✅ Versiones extendidas 30-60 min por serie (el formato que más horas de visionado genera)

---

## Fase 0: Biblia Visual (DAG: secuencial — UNA SOLA VEZ)

**Agente**: `creative-director` + `estilo-marca` + `kling-3-prompting`
**Input**: `img-tres-amigos.png` (referencia existente) + identidades del plan (Bruno b/n 0-2m, Marcelo movimiento 2-3m, Máximo color 3m+)

### Steps
1. Generar hojas de personaje definitivas (poses, expresiones, proporciones) — imágenes de referencia fijas para Kling
2. Definir paleta por etapa y plantillas de fondo (la estética ES la función)
3. **Gate Humano #1**: aprobar el diseño definitivo de los 3 personajes — esta decisión es la IP de la marca (merch, licensing, Mima)

**Output**: `canales-youtube/biblia-visual/` (hojas de personaje + paletas) → habilita también la Fase 4 del workflow `ecommerce-activacion-pmf` (POD)

---

## Fase 1: Escaleta del Episodio (DAG: secuencial)

**Agente**: `creative-director`

### Steps
4. Episodios 1-10: usar el storyboard del `GUIONES_TRES_AMIGOS_LOTE1.md` (ya diseñados con los principios pedagógicos)
5. Episodio 11+: diseñar escaleta nueva con la plantilla (bloque base 2.5-3 min × 4 repeticiones con variación mínima + cierre estándar), respetando paleta de la etapa
6. **Gate Humano #2**: aprobar escaleta y paleta (1 página, 2 minutos de revisión)

**Output**: escaleta aprobada con lista de assets: cuáles existen en biblioteca / cuáles se producen

---

## Fase 2: Producción de Assets (DAG: paralelo)

### Steps
// turbo — 2 ramas en paralelo
7. **Bloques 2D (70-85% del metraje)**: Motion Canvas/Remotion según escaleta (formas, ritmos, transiciones ≥3s) → render en GitHub Actions [$0]. Todo bloque nuevo entra a la biblioteca reutilizable
8. **Clips de personaje (15-30%)**: Kling 3.0 image-to-video desde la biblia visual (clips 5-15s: Bruno parpadea, Marcelo trota, Máximo despliega alas...) [créditos ya pagados]. Cada clip aprobado entra a la biblioteca — los episodios 9/10 reutilizan ~95%
9. **Gate Humano #3**: curar los clips Kling (descartar fallos de consistencia del personaje)

**Output**: `renders/tres-amigos/[episodio]/` + biblioteca actualizada

---

## Fase 3: Audio y Ensamble (DAG: secuencial)

**Agente**: `video-post-producer`

### Steps
10. Música: YouTube Audio Library (nanas/infantil sin atribución) + SFX CC0 de Freesound; mezcla suave (~-14 LUFS, sin golpes de volumen)
11. Voz (si el episodio lleva narración): Kokoro TTS o grabación propia — frases cortas, cadencia de nana
12. FFmpeg en GitHub Actions: bloques + clips + audio → MP4 1080p [$0]
13. **Gate Humano #4 (EL CRÍTICO)**: ver el episodio COMPLETO — checklist de seguridad sensorial: cero flashes/parpadeos rápidos, transiciones ≥3s, volúmenes constantes, paleta correcta de la etapa, señal de cierre presente

**Output**: episodio aprobado

---

## Fase 4: Publicación Made for Kids (DAG: secuencial)

**Agente**: `youtube-content-producer`

### Steps
14. YouTube Data API: upload con **"Made for Kids" = SÍ (obligatorio)**, `publishAt` programado, playlist por serie/etapa
15. Miniatura (Canva MCP): personaje + alto contraste, sin texto excesivo
16. Descripción: nota de pantalla responsable (plantilla del lote) + `{{link_funnel}}` (lead magnet, UTM) + link al canal de Sofía "para papás"
17. Versiones extendidas: cada 4-5 episodios de una serie, ensamblar el compilado 30-60 min (plantilla del episodio 9 — 95% biblioteca, costo ≈ $0)

**Output**: episodio en vivo + compilados programados

---

## Fase 5: Medición (DAG: secuencial, semanal)

**Agente**: `gestor-flujos-ecosistema`

### Steps
18. Registrar: duración media de visionado (meta >5 min), tráfico desde YouTube Kids/búsqueda, clicks UTM al lead magnet (LA métrica de negocio), reproducciones de extendidos
19. Criterio de upgrade (informe): recargar Kling SOLO si el canal supera 100k vistas/mes (≥50k vistas pagan un episodio con RPM ~$1)
20. Demanda de personajes detectada (comentarios en redes, búsquedas) → activar Fase 4 del workflow e-commerce (merch POD)
21. Aprendizajes → `engram/primeras-miradas.md`

**Output**: tablero semanal + decisiones de serie (qué etapa pide más contenido)

---

## Stack Tecnológico

| Etapa | Herramienta | Costo |
|---|---|---|
| Bloques 2D | Motion Canvas (MIT) / Remotion en GitHub Actions | $0 |
| Personajes | Kling 3.0 (biblia visual + clips reutilizables) | Ya pagado |
| Voz | Kokoro TTS (Apache 2.0) | $0 |
| Música/SFX | YouTube Audio Library + Freesound CC0 | $0 |
| Ensamble | FFmpeg en GitHub Actions | $0 |
| Publicación | YouTube Data API (Made for Kids) | $0 |
| Upgrade gateado | Recarga Kling (~$25-50/episodio full) | SOLO con >100k vistas/mes |
