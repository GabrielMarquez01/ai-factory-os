---
name: ecommerce-operator
description: Sistema para operar una tienda de productos físicos o digitales. Selección de producto, proveedor, pricing, fulfillment y automatización de la operación diaria sin que consuma todo tu tiempo.
---

# 🛒 E-commerce Operator

> **Analogía:** Una tienda física necesita un local, inventario, cajeros y horario. Una tienda digital puede funcionar sin ninguno de esos — pero necesita un sistema. Este skill es el sistema operativo de la tienda que trabaja aunque tú estés durmiendo.

## El Modelo Más Simple Que Funciona

No construyas el e-commerce de Amazon. Construye el más simple que puedas operar solo:

```
COMPLEJIDAD ASCENDENTE:
1. Digital puro → ebook, curso, software (sin logística física)
2. Dropshipping → vendes sin inventario, proveedor envía directo
3. POD (Print on Demand) → merch sin inventario (Printful, Gelato)
4. Inventario propio pequeño → compras al mayoreo, envías tú
5. Inventario + fulfillment externo → 3PL (Third-Party Logistics)
6. Inventario + bodega propia → el más complejo, para escala real

Para un solopreneur: empieza en 1 o 2, escala solo si los números lo justifican.
```

---

## Selección de Producto: El Gate Más Importante

No todos los productos funcionan en e-commerce. Antes de comprometerte:

### Criterios de Evaluación

```
□ DEMANDA VERIFICABLE
  - ¿Hay personas buscando esto activamente en Google/Amazon?
  - Herramienta: Google Trends + Amazon Best Sellers
  - Señal mínima: > 1,000 búsquedas/mes del keyword principal

□ MARGEN MÍNIMO VIABLE
  - Precio de venta al menos 3x el costo (regla del 3x)
  - Incluye: costo del producto + empaque + envío + plataforma + devoluciones
  - Meta: margen bruto > 40% (después de costos directos)

□ DIFERENCIACIÓN POSIBLE
  - ¿Puedes mejorar la propuesta de valor vs. lo que ya existe?
  - No tienes que inventar el producto — puedes mejorarlo o empaquetarlo diferente

□ LOGÍSTICA MANEJABLE
  - ¿El producto se puede enviar sin problemas? (peso, tamaño, fragilidad)
  - ¿El proveedor tiene capacidad de reposición confiable?

□ VALIDACIÓN ANTES DE INVENTARIO
  - ¿Puedes vender 5 unidades ANTES de comprar 100?
  - Técnica: preventa o dropshipping en las primeras semanas
```

### La Fórmula del Margen

```
Precio de venta:           $500 MXN
- Costo del producto:      -$120 MXN
- Empaque:                 -$30 MXN
- Envío al cliente:        -$80 MXN
- Fee de plataforma (4%):  -$20 MXN
- Devoluciones (5% est):   -$25 MXN
─────────────────────────────────────
Ganancia neta por unidad:   $225 MXN (45% de margen)

¿Vale la pena? Para un producto de $500 MXN con 45% de margen → sí.
Para un producto de $200 MXN con 15% de margen → difícilmente.
```

---

## Relación con Proveedores: Lo Que Nadie Explica

```
ANTES de comprometerte con un proveedor:
□ Pide muestras — nunca vendas algo que no has probado tú mismo
□ Verifica tiempos de entrega reales (no los prometidos)
□ Pregunta la política de cambios y devoluciones
□ Confirma capacidad de reposición (¿pueden entregar 100 unidades en 7 días?)
□ Negocia términos de pago (el cash flow importa)

RED FLAGS:
- No envía muestras o cobra mucho por ellas
- No tiene precios escritos formalmente
- Presión para comprar cantidad mínima sin darte tiempo de validar
- No responde en menos de 24 horas (esto se mantiene en la relación)
```

---

## Automatización de la Operación Diaria

### Flujo de un Pedido (Automático vs Manual)

```
CLIENTE COMPRA
      ↓
[AUTO] Confirmación de pago (webhook plataforma → tu backend)
      ↓
[AUTO] Email de confirmación al cliente (Resend)
      ↓
[AUTO] Notificación al proveedor/fulfillment (si es dropshipping)
      ↓
[MANUAL o AUTO] Generar guía de envío
      ↓
[AUTO] Email de "tu pedido va en camino" con tracking
      ↓
[AUTO] Email D+3 post-entrega: "¿Llegó bien?"
      ↓
[AUTO] Email D+7: solicitud de reseña (si el cliente no se quejó)
```

### Gestión de Inventario Básica

```sql
-- Tabla simple de inventario
CREATE TABLE inventario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID REFERENCES productos(id),
  cantidad_disponible INT NOT NULL DEFAULT 0,
  cantidad_reservada INT NOT NULL DEFAULT 0,  -- pedidos en proceso
  umbral_reorden INT NOT NULL DEFAULT 10,     -- cuándo alertar para reordenar
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerta automática cuando el inventario llega al umbral
CREATE OR REPLACE FUNCTION verificar_inventario()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cantidad_disponible <= NEW.umbral_reorden THEN
    -- Insertar alerta o llamar a webhook de notificación
    INSERT INTO alertas (tipo, mensaje, prioridad)
    VALUES ('inventario_bajo', 
            'Producto ' || NEW.producto_id || ' tiene ' || NEW.cantidad_disponible || ' unidades',
            'alta');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Manejo de Devoluciones y Quejas

```
POLÍTICA CLARA ANTES DE VENDER (evita el 80% de los problemas):
□ Plazo de devolución: [X días] desde entrega
□ Condición del producto para devolución: [sin usar / empaque original / etc.]
□ Quién paga el envío de devolución
□ Proceso: [email → foto → autorización → devolución de dinero]

FLUJO DE QUEJA:
1. Cliente reporta problema
2. Clasificar: error tuyo / error del proveedor / error de envío / expectativa incorrecta
3. Resolución en < 24 horas (la velocidad importa más que la solución)
4. Si es error tuyo: reembolso o cambio sin fricción
5. Documentar para evitar que se repita
```

---

## El Stack Técnico Para e-Commerce

| Componente | Opción simple | Opción con más control |
|-----------|---------------|----------------------|
| Tienda | Shopify ($29/mes) | Next.js + Stripe personalizado |
| Pagos MX | Mercado Pago / Clip | Stripe + OXXO Pay |
| Email post-compra | Klaviyo (free hasta 250 contactos) | Resend + templates propios |
| Inventario | Shopify nativo | Supabase + alertas propias |
| Envíos MX | Sendex / Paquetexpress API | Integración directa por volumen |
| Fotos de producto | Canva + foto real | DALL-E 3 para lifestyle (con límites éticos) |

---

## Métricas Clave del e-Commerce

| Métrica | Qué mide | Meta inicial |
|---------|---------|-------------|
| Tasa de conversión | Visitantes → compradores | 1-3% (e-commerce promedio) |
| AOV (Average Order Value) | Valor promedio de cada orden | Aumentar con bundles/upsells |
| CAC | Costo por cliente adquirido | < 1/3 del AOV |
| Tasa de devolución | % pedidos devueltos | < 5% |
| Tiempo de entrega | Días desde pedido hasta entrega | < 5 días hábiles MX |

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Shopify** | Tienda completa, menos código | shopify.com |
| **Stripe** | Pagos con más control | stripe.com |
| **Mercado Pago** | Pagos LATAM + OXXO | mercadopago.com.mx |
| **Printful / Gelato** | POD — merch sin inventario | printful.com |
| **Resend** | Emails de pedido y seguimiento | resend.com |
| **Sendex / Paquetexpress** | Guías de envío MX con API | sendex.mx |
| **Supabase** | Inventario + base de datos | supabase.com |

## La Regla del e-Commerce

> Valida la demanda antes de comprar inventario.
> Valida el proveedor antes de comprometerte con un cliente.
> Automatiza después de que el proceso manual funciona — nunca antes.
