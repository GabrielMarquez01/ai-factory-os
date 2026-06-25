---
description: >-
  Workflow para activar un e-commerce desde cero con product-market fit validado
  antes de invertir en inventario. Cada producto entra por experimentos baratos
  antes de existir en la tienda. Compatible con dropshipping, afiliados y POD.
  Siempre gateado: dinero real = aprobación humana.
---

# Workflow: Activación de E-commerce con PMF Validado

> **Principio:** ningún producto llega a la tienda sin haber demostrado demanda real primero.
> El orden importa: demanda → validación → tienda → escala. Nunca al revés.

---

## Outputs Esperados

- ✅ Programas de afiliados activos con links reales integrados al funnel
- ✅ Catálogo curado (máx 5-7 productos por segmento) con PMF validado por experimento
- ✅ Tienda operando con el modelo de fulfillment más simple posible (dropshipping o afiliados)
- ✅ Attach rate ≥15% (usuarios que también compran producto físico en 30 días)
- ✅ Línea POD opcional cuando existan assets de marca propios

---

## Fase 0: Afiliados y Escucha (sin gate de ventas — arranca hoy)

**Agentes:** `ecommerce-operator` + agente de soporte/chat (si tienes uno activo)

**Por qué afiliados primero:** cero inversión, cero riesgo de inventario, ingresos desde el primer link.

### Steps

1. **Alta en programas de afiliados** relevantes a tu nicho
   - Amazon Afiliados (tu país) · Mercado Libre · programas directos de marcas del nicho
   - **Gate Humano:** tú haces las altas (cuentas a tu nombre, datos bancarios reales)
   - El agente prepara los datos necesarios, tú los introduces

2. **Generar links y reemplazar placeholders** en emails de nurturing y en cualquier canal de comunicación activo

3. **Experimento E1 — Demanda conversacional:**
   En cada interacción 1:1 con usuarios, registrar respuestas a:
   _"¿Qué fue lo más difícil o costoso de conseguir en [tu nicho]?"_
   → CSV con columna `respuesta_clave` y frecuencia de mención

**Output:** links de afiliado vivos + lista de candidatos a producto con demanda real expresada

---

## Fase 1: Selección de Candidatos (secuencial)

**Agentes:** `latam-market-research` + skill de inteligencia de tu nicho

**Input:** respuestas de E1 (mínimo 20 conversaciones)

### Steps

4. **Cruzar problemas mencionados** 3+ veces con catálogo de proveedores disponibles
   - Filtros de corte: proveedor con ≥4.5 estrellas, despacho <48h, devoluciones gestionadas

5. **Pre-seleccionar máximo 3 productos** con:
   - Margen ≥35% verificado (precio de venta - costo proveedor - envío)
   - Problema real detrás (no es un capricho, es una necesidad expresada por el usuario)
   - Relación clara con tu producto/servicio principal (cross-sell natural)

6. **Experimento E2 — Reel de demanda:**
   Crear 1 pieza de contenido mostrando el producto en contexto real del nicho
   → Medir: ¿cuántos preguntan "¿dónde lo compro?" sin que lo ofrezcas?

**Gate Humano (G1):** aprobar los 3 candidatos antes de avanzar a validación con dinero

**Output:** shortlist de 3 productos con evidencia de demanda

---

## Fase 2: Validación Real (secuencial)

**Agentes:** `ecommerce-operator` + `cro-optimizer`

### Steps

7. **Experimento E3 — Venta manual:**
   Ofrecer el producto 1:1 a tus usuarios más activos antes de tener tienda.
   Si alguien paga → PMF validado. Si nadie paga → el producto no entra al catálogo.

8. **Medir:** ≥3 ventas manuales antes de montar la tienda del producto

9. **Calcular margen real** después de la primera venta:
   `margen_real = precio_venta - costo_producto - envío - comisión_plataforma - soporte`

**Output:** 1-3 productos con venta manual comprobada y margen real calculado

---

## Fase 3: Tienda v1 (secuencial)

**Agente:** `ecommerce-operator`

### Steps

10. **Montar tienda mínima** con solo los productos validados:
    - Organización por segmento (etapa, nivel, tipo de usuario)
    - Cada producto con justificación clara de por qué es relevante para tu nicho
    - Sin inventario propio si puedes evitarlo (dropshipping o POD)

11. **Conectar la tienda al funnel:**
    - Email de bienvenida/secuencia → mencionar producto relevante por segmento
    - Agente de chat → recomendar cuando el contexto lo haga natural
    - Notificaciones / contenido → links con UTM por canal

12. **Experimento E4 — Bundle/Combo:**
    ¿Qué AOV (ticket promedio) genera un combo vs producto suelto?

**Gate Humano (G2):** aprobar precios finales y publicación de la tienda

**Output:** tienda viva + primer combo midiendo AOV

---

## Fase 4: Marca Propia / POD (opcional — requiere assets de marca)

**Agente:** `creative-director`

**Pre-requisito:** tienes identidad visual propia (personaje, ilustración, logo con recall)

### Steps

13. **Experimento E5 — Test POD:**
    - 1 diseño en plataforma POD (Gelato, Printful, Printify)
    - Pedir muestra física propia antes de publicar → **Gate Humano: apruebas calidad**
    - Meta: 5 ventas orgánicas antes de ampliar la línea

14. **Cross-promo:** el merch aparece en tu contenido (usuarios que ya reconocen la marca)

**Output:** línea POD activa con margen ≥40%

---

## Fase 5: Medición y Escala (mensual)

**Agente:** `analytics-dashboard` + `cro-optimizer`

### Steps

15. **Métricas mensuales a revisar:**

| Métrica | Umbral de salida |
|---------|-----------------|
| Ventas del producto en 30 días | 0 ventas → FUERA del catálogo |
| Devoluciones / quejas | >10% → FUERA del catálogo |
| Margen real | <25% → renegociar o retirar |
| Attach rate | <10% → revisar integración al funnel |

16. **Regla de catálogo:** corto y curado. Máximo 5-7 productos por segmento. Cada nuevo producto que entra elimina el de peor desempeño.

17. **Ads solo a ganadores:** no invertir en publicidad pagada hasta tener al menos un producto con PMF demostrado y margen >35%.

18. **Aprendizajes → Engram y skill de nicho:** qué productos vendieron, qué lenguaje usaron los usuarios al comprar, qué objeción fue la más común.

---

## Stack Recomendado (costo inicial $0)

| Función | Herramienta gratuita | Alternativa pagada |
|---------|---------------------|-------------------|
| Tienda | Shopify (trial) / Gumroad / tu propio dominio | Shopify $29/mes |
| Fulfillment | Dropshipping (proveedor local de tu nicho) | 3PL propio |
| Afiliados | Amazon / Mercado Libre / programas directos | — |
| POD | Gelato / Printful (sin mínimo) | — |
| Pagos | Stripe / Mercado Pago / PayPal | — |
| Analytics | Google Analytics + tabla `eventos` en Supabase | — |

**Regla de costo:** no pagues por infraestructura de e-commerce hasta que el attach rate >15% sea sostenido por 2 meses.
