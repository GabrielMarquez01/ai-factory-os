---
name: marketing-digital
description: Orquesta la creación completa de material de marketing para un producto o negocio. Úsalo cuando se necesite generar landing + comercial + copy + assets de marca.
---

# Skill: Marketing Digital Completo

## Cuándo usar este skill
- Cuando el usuario pida "crear todo el marketing" para un negocio
- Cuando se necesite preparar un lanzamiento completo
- Cuando se esté ejecutando el workflow idea-a-producto (Fase 3-5)

## Inputs necesarios
1. **Nombre del negocio/producto**
2. **Tipo de negocio** (veterinaria, restaurante, gym, etc.)
3. **Público objetivo** (a quién le vende)
4. **3-6 servicios/features principales**
5. **Modelo de monetización** (suscripción, pago único, etc.)
6. **Datos de contacto** (teléfono, WhatsApp, email)

## Workflow completo

### Fase A — Marca (usa skill `estilo-marca`)
1. Ajustar `estilo-visual.json` con colores del sector
2. Ajustar `guia-de-textos.md` con tono apropiado
3. Definir tagline con fórmula: "Haz [RESULTADO] sin [PROBLEMA]"

### Fase B — Landing Page (usa skill `crear-landing`)
1. Generar landing completa con las 7 secciones obligatorias
2. Guardar en workspace/ como HTML
3. Verificar con checklist de calidad

### Fase C — Imagen Hero (generación IA)
1. Generar imagen profesional del negocio
2. Prompt base: "[Profesional] in a modern [espacio], warm lighting, premium feel, editorial photograph"
3. Integrar imagen en la landing page

### Fase D — Comercial Animado (usa skill `crear-comercial`)
1. Generar comercial HTML con 5 escenas
2. Generar script de voz en off
3. Generar prompts para herramientas externas (Runway, ElevenLabs, Suno)

### Fase E — Copy para Redes Sociales
Generar 5 posts listos para publicar:

**Post 1 — Lanzamiento:**
"🚀 [NOMBRE] ya está aquí. [BENEFICIO]. [CTA] → [LINK]"

**Post 2 — Problema/Solución:**
"¿[PROBLEMA]? [NOMBRE] lo resuelve en [TIEMPO]. [CTA]"

**Post 3 — Prueba social:**
"[STAT] [USUARIOS/CLIENTES] ya confían en [NOMBRE]. [CTA]"

**Post 4 — Behind the scenes:**
"Así creamos [NOMBRE]: [DATO INTERESANTE]. [CTA]"

**Post 5 — Urgencia:**
"Solo esta semana: [OFERTA]. [CTA] antes de que se acabe."

### Fase F — SEO Básico
Generar para la landing:
- Title tag: "[NOMBRE] — [BENEFICIO] | [CIUDAD]"
- Meta description: max 155 caracteres con CTA
- H1 único con keyword principal
- Alt text descriptivo para imágenes

## Output final (entregables)
1. ✅ Landing page HTML en workspace/
2. ✅ Imagen hero IA integrada
3. ✅ Comercial animado HTML
4. ✅ Script de voz en off
5. ✅ 5 posts para redes sociales
6. ✅ Prompts para video/voz/música IA
7. ✅ Meta tags SEO

## Checklist final
- [ ] Landing funcional y responsive
- [ ] Todos los CTAs con destino real
- [ ] Copy revisado (sin typos, tono consistente)
- [ ] Colores del design system
- [ ] Comercial con 5 escenas
- [ ] Posts con formato listo para copiar y pegar
- [ ] SEO meta tags incluidos en el HTML

## Manejo de errores
Si el output no cumple el estándar:
1. Identificar qué fase falló
2. Re-ejecutar solo esa fase
3. Si hay ambigüedad en los inputs, preguntar antes de asumir
