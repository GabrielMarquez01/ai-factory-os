---
description: >-
  Workflow de activación del e-commerce de Primeras Miradas (Pilares 3 y 4):
  de cero a catálogo curado por edad con product-market fit validado. Cada
  producto entra por experimentos baratos (demanda conversacional → reel demo
  → venta manual) antes de existir en la tienda. Dropshipping vía Dropi con
  pago contra entrega, afiliados Amazon/Mercado Libre y POD Gelato con la
  marca Los Tres Amigos. Gateado: dinero real = aprobación humana siempre.
---

# Workflow: Activación E-commerce y PMF (Pilares 3 y 4)

> Proyecto: `workspace/primeras-miradas-ecosistema/` · Modelo completo: `ecommerce/MODELO_NEGOCIO_ECOMMERCE.md` · Marchas Gearbox: G3 (experimentos) → **G6 (altas de proveedor, precios, dinero real: gate humano SIEMPRE)**
> Pre-requisito de arranque: ≥10 ventas del ebook (Fase 1+). La Fase 0 puede correr desde hoy.

## Outputs Esperados
- ✅ Programas de afiliados activos (links reales reemplazando placeholders del email-05)
- ✅ Catálogo curado por edad: máx 5-7 productos/etapa, todos con PMF validado por experimento
- ✅ Tienda operando con PCE (pago contra entrega) vía Dropi
- ✅ Línea POD Los Tres Amigos en Gelato (cuando existan assets finales de los personajes)
- ✅ Attach rate ≥15% (compradores del ebook que compran algo físico en 30 días)
- ✅ Presencia multicanal por fases: Mercado Libre MX → Amazon MX → Kindle (MX+USA) → Amazon USA → ML LATAM, cada canal con análisis costo/beneficio aprobado

---

## Fase 0: Afiliados y Escucha (DAG: paralelo — SIN gate de ventas, arranca hoy)

**Agente**: `gestor-flujos-ecosistema` + Sofía (escucha)

### Steps
// turbo
1. Alta en Amazon Afiliados México y programa de afiliados de Mercado Libre → **Gate Humano: tú haces las altas (cuentas a tu nombre)**; el agente prepara los datos
2. Elegir productos afiliados del catálogo sugerido (sección 3 del modelo) → generar links → reemplazar `{{link_afiliado_*}}` en `marketing/emails/email-05-afiliados-mima.md` y en las notificaciones predictivas por edad / artículos de `/aprende` en mi·ma (Ruta B).
3. **Experimento E1 (demanda conversacional)**: en cada conversación 1:1 de la campaña 72H, registrar respuestas a "¿qué fue lo más difícil de comprar para tu bebé?" en el CSV (columna `respuesta_clave`)

**Output**: links de afiliado vivos + lista de candidatos a producto con menciones reales

---

## Fase 1: Selección de Candidatos (DAG: secuencial)

**Agente**: `latam-market-research` + `inteligencia-nicho-maternidad`
**Input**: respuestas E1 (≥20 conversaciones) + filtro de 6 candados (modelo, sección 3)

### Steps
4. Cruzar problemas mencionados 3+ veces con catálogo Dropi (proveedores ≥4.5 estrellas, despacho <24h)
5. Pre-seleccionar 3 productos máximo (uno por etapa si es posible) con margen ≥35% verificado
6. Ficha por candidato: problema que resuelve, etapa, costo/precio/margen, proveedor, riesgo

**Gate Humano (G6)**: aprobar los 3 candidatos y la cuenta Dropi antes de cualquier orden

**Output**: `ecommerce/candidatos-YYYY-MM.md` con las 3 fichas

---

## Fase 2: Experimentos PMF (DAG: secuencial por producto, productos en paralelo)

**Agente**: `market-validation-engine` + workflow `vibe-marketing-primeras-miradas` (para los reels)

### Steps
// turbo — cada producto corre su propio ciclo E2→E3
7. **E2 — Reel demo** (sin vender): "este tipo de [producto] sí/no según la etapa" → producirlo como pieza extra del workflow vibe-marketing → señal: retención >70% + comentarios preguntando dónde
8. **E3 — Venta manual**: ofrecer a 10 leads calientes por WhatsApp (guion estilo Sofía, gate: tú envías) → señal: ≥3/10 lo piden
9. Registrar resultados en el CSV (`oferta_presentada=producto_dropi`) y decidir: ENTRA / FUERA / iterar ángulo

**Output**: productos con PMF validado (mínimo 2 para pasar a Fase 3)

---

## Fase 3: Catálogo y Tienda v1 (DAG: secuencial)

**Agente**: `sales-funnel-builder` + `crear-landing` (o Shopify MCP si se decide migrar)

### Steps
10. Evolucionar `ebook-funnel/public/store.html`: navegación por etapa (Bruno/Marcelo/Máximo), solo productos validados, sello editorial "por qué este producto en esta etapa"
11. Activar PCE vía Dropi (flujo: pedido → orden Dropi → guía por WhatsApp vía Sofía → entrega → depósito)
12. **E4 — Combo test**: Kit de Etapa (ebook + tarjetas + producto + body) vs sueltos → medir AOV
13. Conectar recomendaciones: el email de bienvenida/secuencia, los chats de Sofía (prescribiendo links) y las notificaciones predictivas por edad (cron) y artículos de `/aprende` de mi·ma apuntan a la tienda o links directos de afiliados con UTM por canal.

**Gate Humano (G6)**: aprobar precios finales y publicación de la tienda

**Output**: tienda viva + primer combo midiendo AOV ($500-800 MXN objetivo)

---

## Fase 4: Marca Propia POD (DAG: secuencial — requiere assets finales de Los Tres Amigos)

**Agente**: `merch-designer` + Canva MCP
**Pre-requisito**: assets 3D/2D finales de los personajes (los genera el canal de dibujos — sinergia P2d→P4)

### Steps
14. **E5 — POD test**: 1 diseño de body por personaje en Gelato → pedir muestra propia primero (control de calidad, ~$300 MXN única inversión) → **Gate Humano: apruebas calidad física**
15. Si calidad OK: publicar 3 bodies + 1 mantita; meta 5 ventas orgánicas antes de ampliar línea
16. Cross-promo: el merch aparece en los videos del canal Tres Amigos (el personaje que su bebé ya reconoce)

**Output**: línea POD viva con margen ≥40%

---

## Fase 5: Medición y Escala (DAG: secuencial, mensual)

**Agente**: `gestor-flujos-ecosistema` + `cro-optimizer`

### Steps
17. Mensual: attach rate, AOV, margen real por producto, devoluciones PCE (<10%)
18. Regla de salida: producto sin venta en 30 días o devoluciones >10% → FUERA (el catálogo se mantiene corto)
19. Si gate de ads cumplido (`marketing/fase-2-ads-playbook.md`): ads solo a productos ganadores
20. Aprendizajes → `engram/primeras-miradas.md`; compras → Firebase (mejora la recomendación siguiente)

**Output**: catálogo depurado + decisión mensual de escala

---

## Fase 6: Expansión Multicanal — Marketplaces (DAG: secuencial, un canal a la vez)

**Agente**: `latam-market-research` + `gestor-flujos-ecosistema`
**Pre-requisito**: catálogo validado en tienda propia (Fase 3 completa). Excepción adelantable: **Amazon KDP** (ebook Kindle MX+USA, cero logística) puede entrar tras la Fase 0.
**Orden de la escalera** (modelo, sección 8): ML México → Amazon México → Amazon KDP → Amazon USA (POD local vía Gelato) → ML Colombia/Chile/Perú.

### Steps
21. Por canal candidato: página de análisis en `ecommerce/expansion/[canal].md` con el framework completo (analizar → costo/beneficio → implementación → impacto esperado); regla: margen post-comisión ≥25% o no entrar
22. **Gate Humano (G6)**: aprobar la página de análisis y la alta de cuenta ANTES de cualquier listing
23. Publicar 3-5 listings del catálogo YA validado con identidad de marca; precios que protegen el canal propio
24. Insert con QR en cada paquete (marketplace = adquisición → funnel propio = retención)
25. Medir 90 días: ventas, margen real, reviews, % migración al ecosistema → continuar / pausar canal

**Output**: presencia de marca multicanal rentable, un canal a la vez

---

## Stack Tecnológico

| Etapa | Herramienta | Costo |
|---|---|---|
| Dropshipping + PCE | Dropi | Comisión por venta (margen 35-50%) |
| Afiliados | Amazon Afiliados MX + Mercado Libre | $0 (comisión a favor) |
| POD | Gelato (impresión local MX, algodón orgánico) | Por pedido (margen ≥40%) |
| Tienda | store.html + Stripe (Shopify MCP como upgrade) | $0 inicial |
| Recomendación por edad | Firebase + Groq (backend existente) | $0 |
| Registro | `marketing/leads-tracking-template.csv` + Firebase | $0 |
