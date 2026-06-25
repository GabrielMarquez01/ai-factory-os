---
description: Flujo completo para crear todo el material de marketing de un negocio (landing + comercial + copy + SEO)
---

# Workflow: Marketing Completo para un Negocio

Usa este workflow cuando necesites crear todo el marketing de un producto o negocio desde cero.
Orquesta los skills `estilo-marca`, `crear-landing`, `crear-comercial` y `marketing-digital`.

// turbo-all

## Paso 1 — Recoger información del negocio
Preguntar al usuario:
- Nombre del negocio
- Tipo de negocio
- 3-6 servicios principales
- Teléfono / WhatsApp
- Público objetivo

## Paso 2 — Ajustar la marca
Leer y actualizar `agent/skills/estilo-marca/recursos/estilo-visual.json`:
- Cambiar nombre de marca
- Ajustar paleta de colores al sector
- Definir tagline

## Paso 3 — Generar la landing page
Seguir el skill `agent/skills/crear-landing/SKILL.md`:
- Crear HTML con las 7 secciones obligatorias
- Guardar en workspace/

## Paso 4 — Generar imagen hero con IA
- Crear imagen profesional del negocio
- Integrarla en la landing page

## Paso 5 — Generar comercial animado
Seguir el skill `agent/skills/crear-comercial/SKILL.md`:
- Crear HTML animado con 5 escenas
- Generar script de voz en off
- Generar prompts para Runway + ElevenLabs + Suno

## Paso 6 — Generar copy para redes sociales
Seguir la Fase E del skill `agent/skills/marketing-digital/SKILL.md`:
- 5 posts listos para publicar

## Paso 7 — Verificar calidad
Ejecutar checklists de cada skill:
- Landing: responsive, colores, CTAs
- Comercial: 5 escenas, tiempos correctos
- Copy: tono de marca, sin palavras prohibidas

## Paso 8 — Entregar al usuario
Listar todos los archivos generados con su ubicación en workspace/.
