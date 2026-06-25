---
name: latam-market-research
description: >
  Motor de investigación de mercado especializado en LATAM. Analiza competidores,
  precios, keywords SEO en español, comportamiento del consumidor en MX/CO/AR/BR,
  y genera un Market Intelligence Report con oportunidades de producto y posicionamiento.
---

# LATAM Market Research Skill

## Propósito
Antes de construir cualquier producto para el mercado latinoamericano, este skill
entrega evidencia real: quién vende qué, a qué precio, con qué posicionamiento,
y dónde están los huecos de mercado.

---

## Activadores
- Usuario quiere crear un producto para el mercado LATAM
- Parte de `market-validation-engine` aplicado al contexto hispanohablante
- Usuario necesita conocer competidores en un nicho específico
- Antes de definir precios de un producto digital

---

## Protocolo de Investigación

### PASO 1 — Preguntas de contexto
```
Para investigar tu mercado en LATAM necesito:
1. ¿Cuál es el nicho o categoría? (ej: "landing pages para veterinarias en México")
2. ¿A qué países apunta el producto? (MX, CO, AR, BR o toda LATAM)
3. ¿El cliente es B2B (negocios) o B2C (consumidor)?
4. ¿Tienes competidores conocidos? (lista inicial)
5. ¿Cuál es tu rango de precio tentativo?
```

---

### PASO 2 — Análisis de competidores

**Para cada competidor identificado, investigar:**

| Campo | Qué buscar |
|-------|-----------|
| Pricing | Planes, precios en USD/MXN/COP, si cobran en dólares o local |
| Propuesta de valor | Headline principal de su landing page |
| Público objetivo | A quién le hablan (freelancers, agencias, pymes, etc.) |
| Canales de distribución | Gumroad, tienda propia, Hotmart, marketplaces |
| Volumen estimado | Reviews, seguidores, Product Hunt upvotes |
| Fortalezas | Qué hacen bien (diseño, precio, soporte, comunidad) |
| Debilidades | Quejas comunes, reviews negativos, lo que no ofrecen |
| Posicionamiento | ¿Premium, económico, nicho, generalista? |

**Herramientas a usar (vía read_file o search):**
- Búsquedas en Google: `"[producto] para [nicho] México site:gumroad.com`
- Búsquedas en Hotmart: mercado de infoproductos hispanohablante
- Product Hunt: `"[keyword] launch:>2024`
- Twitter/X: `"[nicho] template" lang:es`
- Reddit: r/Emprendimiento, r/Entrepreneur_es

---

### PASO 3 — Análisis de keywords LATAM

**Clusters de keywords por intención:**

| Intención | Ejemplo | Competencia | Volumen estimado |
|-----------|---------|-------------|-----------------|
| Transaccional | "comprar template landing page" | Media | 200-500/mes |
| Informacional | "cómo crear una landing page gratis" | Alta | 2k-10k/mes |
| Comparación | "mejor template para restaurante" | Baja | 100-300/mes |
| Local | "agencia web México precio" | Media | 500-2k/mes |
| Problema | "mi landing page no convierte" | Baja | 50-200/mes |

**Reglas de selección de keywords para LATAM:**
- Priorizar keywords en español neutro (funciona en todos los países)
- Incluir variantes locales para mercado principal (MX: "chido", "wey" no aplican al producto)
- Investigar "near me" equivalentes: "cerca de mí", "en México", "en Bogotá"
- Long-tail sobre keywords cortas: menos competencia, mayor intención de compra
- Precios en búsquedas: "template landing page precio" tiene alta intención transaccional

---

### PASO 4 — Análisis de precios en LATAM

**Benchmarks por categoría de producto digital:**

| Producto | Precio bajo | Precio medio | Precio premium |
|----------|------------|--------------|----------------|
| Template HTML individual | $9-15 | $19-29 | $49-79 |
| Pack 5 templates | $29-39 | $59-79 | $99-149 |
| Pack agencia (licencia) | $79-99 | $149-199 | $299-499 |
| Landing page + setup | $100-200 | $300-500 | $800-1500 |
| SaaS herramienta | $9-19/mes | $29-49/mes | $79-149/mes |
| Curso/info-producto | $27-47 | $97-197 | $297-497 |
| Plantilla Notion | $5-9 | $15-27 | $47-97 |

**Factores de ajuste LATAM:**
- Cobra en USD (no MXN/COP): el tipo de cambio beneficia al vendedor y da percepción de calidad
- $29 USD es el "precio psicológico dulce" para impulse purchases en LATAM
- Ofrece pago en cuotas para tickets altos ($97+): aumenta conversión 30-40%
- Garantía de 30 días elimina fricción de compra en mercados con poca confianza online

---

### PASO 5 — Oportunidades de mercado

**Framework de análisis: Huecos de mercado**

Buscar intersecciones de:
1. Alta demanda (keywords con volumen) + Baja oferta (pocos competidores)
2. Problema frecuente + Sin solución accesible en español
3. Competidores con mala ejecución + Usuario insatisfecho (reviews negativos)
4. Mercado en inglés saturado + Sin equivalente en español

**Nichos con menos competencia en LATAM (2026):**
- Templates para servicios de salud y bienestar (dentistas, psicólogos, nutriólogos)
- Templates para negocios de educación y tutorías
- Herramientas para freelancers hispanohablantes
- Automatizaciones para pymes LATAM (WhatsApp + CRM)
- Templates para e-commerce de moda y artesanía local

---

## Entregable: Market Intelligence Report

Guardar como `workspace/research/market-report-[nicho]-[fecha].md`:

```markdown
# Market Intelligence Report: [Nicho]
Fecha: [fecha] | Mercado: [países]

## Resumen ejecutivo
[3-5 líneas con el hallazgo más importante]

## Análisis de competidores
[Tabla con top 5 competidores]

## Análisis de precios
[Tabla de rangos de precio + recomendación de posicionamiento]

## Keywords principales
[Top 10 keywords con intención y competencia]

## Oportunidades identificadas
1. [Hueco de mercado 1]
2. [Hueco de mercado 2]
3. [Hueco de mercado 3]

## Posicionamiento recomendado
- Precio objetivo: $[X]
- Propuesta de valor diferenciadora: [frase]
- Canal principal de distribución: [canal]
- Mensaje clave para LATAM: [copy]

## Decisión recomendada
[ ] Go — oportunidad clara, proceder
[ ] Pivot — ajustar nicho a [X]
[ ] Drop — mercado saturado o sin demanda
```

---

## Integración con el workflow maestro
- Se ejecuta en **FASE 1 (Validación)** como input para `market-validation-engine`
- Output alimenta **FASE 2 (Marca)**: tono y posicionamiento según hallazgos
- Output alimenta **FASE 7 (Marketing)**: keywords para SEO y canales de distribución
