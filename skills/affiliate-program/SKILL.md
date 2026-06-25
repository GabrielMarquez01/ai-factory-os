---
name: affiliate-program
description: Sistema de afiliados para que otras personas vendan tu producto a cambio de una comisión. La forma más escalable de distribución — tus clientes satisfechos se convierten en tu fuerza de ventas.
---

# 🤝 Affiliate Program

> **Analogía:** En vez de que tú salgas a vender, construyes un ejército de vendedores que trabajan por comisión. Solo pagan cuando traen resultados. Es la única forma de tener fuerza de ventas sin riesgo fijo de nómina.

## Por Qué los Afiliados Son el Canal Más Eficiente

```
Canal propio (tú vendes):
- Costo: tu tiempo + energía
- Escala: limitada a tus horas disponibles
- Riesgo: alto (si no vendes, igual invertiste tiempo)

Afiliados:
- Costo: solo cuando hay venta (comisión sobre ingreso generado)
- Escala: ilimitada (más afiliados = más ventas sin más trabajo tuyo)
- Riesgo: casi cero (pagas solo por resultados)
```

La desventaja: no controlas cómo venden. Por eso las reglas son cruciales.

---

## Los 3 Tipos de Afiliados (Por Orden de Calidad)

### Tipo 1: Clientes Actuales Satisfechos

**Los mejores afiliados:** ya usan el producto, lo recomiendan de forma natural.

```
Cómo convertirlos en afiliados:
- Email a clientes activos con > 60 días de uso
- Ofrece comisión clara y pago simple
- Dales el material (link, copy, imágenes) — que solo lo compartan
- Reconocimiento público (si quieren) en tu comunidad
```

### Tipo 2: Creadores de Contenido del Nicho

**Alto impacto:** tienen audiencia calificada, su recomendación tiene credibilidad.

```
Cómo encontrarlos:
- Busca en YouTube/Instagram a quienes cubren tu nicho exacto
- Prioriza micro-influencers (10k-100k seguidores) vs megainfluencers
  → mayor tasa de conversión, audiencia más específica, más accesibles

Lo que ofrecen:
- Acceso a su audiencia calificada
- Credibilidad de tercero ("yo uso esto, no solo lo vendo")
```

### Tipo 3: Negocios Complementarios

**Sinergía:** sirven al mismo cliente pero con productos diferentes.

```
Ejemplo: si vendes una app para mamás, un afiliado complementario podría ser:
- Consultora de lactancia
- Pediatra con contenido digital
- Tienda de productos para bebé
- Otra app de maternidad (con diferente función)

No son competidores — son socios de canal.
```

---

## La Estructura de Comisiones

### Para SaaS / Suscripciones

```
Modelo recomendado: comisión recurrente

Comisión: 20-30% del primer año de suscripción (mensual o anual)
→ Motiva al afiliado a traer clientes de calidad (que no se van al mes)
→ Si traen un plan anual, ganan más → incentivo alineado con tu retención

Ejemplo:
Plan Pro $249 MXN/mes × 12 meses = $2,988 MXN/año
Comisión 25%: el afiliado gana $747 MXN por cada cliente que refiere
→ Con 10 clientes referidos = $7,470 MXN de ingreso para el afiliado
```

### Para Infoproductos (Pago Único)

```
Modelo recomendado: comisión por venta

Comisión: 30-50% del precio de venta
→ Los infoproductos tienen alto margen → puedes compartir más

Ejemplo:
Ebook $299 MXN
Comisión 40%: el afiliado gana $119.60 por cada venta
→ Si refieren 10 ventas en el mes = $1,196 MXN
```

---

## Implementación Técnica

### Sistema de Tracking con Polar.sh

Polar tiene sistema de afiliados nativo — la opción más rápida:

```javascript
// Polar maneja todo: links únicos, tracking, pagos a afiliados
// Solo necesitas configurar en el dashboard:
// Settings → Affiliates → Enable → Set commission rate

// El afiliado recibe su link único:
// https://polar.sh/tu-producto?ref=CODIGO_AFILIADO

// Polar trackea automáticamente y paga en el ciclo de facturación
```

### Sistema Propio (Más Control)

```sql
-- Tabla de afiliados
CREATE TABLE afiliados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id),
  codigo TEXT UNIQUE NOT NULL,        -- código único para rastrear
  comision_porcentaje DECIMAL(5,2) NOT NULL DEFAULT 25.00,
  estado TEXT DEFAULT 'activo',       -- 'activo' | 'pausado' | 'bloqueado'
  pago_pendiente DECIMAL(10,2) DEFAULT 0,
  pago_total DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de referidos (conversiones)
CREATE TABLE referidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  afiliado_id UUID REFERENCES afiliados(id),
  cliente_id UUID REFERENCES usuarios(id),
  venta_id UUID REFERENCES ventas(id),
  monto_venta DECIMAL(10,2),
  comision_generada DECIMAL(10,2),
  estado TEXT DEFAULT 'pendiente',    -- 'pendiente' | 'aprobado' | 'pagado'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

```javascript
// Tracking del referido
// 1. Cuando el visitante llega con ?ref=CODIGO
function trackReferido(req, res) {
  const codigo = req.query.ref
  if (codigo) {
    // Guardar en cookie por 30-90 días
    res.cookie('afiliado_ref', codigo, { 
      maxAge: 30 * 24 * 60 * 60 * 1000  // 30 días
    })
  }
}

// 2. Cuando el visitante compra
async function onVentaCompletada(venta, req) {
  const codigoAfiliado = req.cookies['afiliado_ref']
  if (codigoAfiliado) {
    const afiliado = await db.findOne('afiliados', { codigo: codigoAfiliado })
    if (afiliado) {
      const comision = venta.monto * (afiliado.comision_porcentaje / 100)
      await db.insert('referidos', {
        afiliado_id: afiliado.id,
        cliente_id: venta.cliente_id,
        venta_id: venta.id,
        monto_venta: venta.monto,
        comision_generada: comision
      })
    }
  }
}
```

---

## Las Reglas Que Protegen Tu Marca

Los afiliados actúan en tu nombre — sin reglas, pueden dañar tu reputación:

```markdown
# REGLAS DE AFILIADO (entregar en el onboarding)

✅ PERMITIDO:
- Compartir el link en sus propios canales
- Crear reseñas honestas del producto
- Comparar con alternativas de forma objetiva
- Usar los materiales oficiales (imágenes, copy) que les proporcionamos

❌ PROHIBIDO:
- Hacer claims que no están en los materiales oficiales
- Prometer resultados garantizados
- Usar el nombre de la marca en anuncios pagados sin aprobación
- Comprar tráfico incentivado (bots, click farms)
- Spam o correos masivos no solicitados

CONSECUENCIA DE VIOLACIÓN:
- Primera vez: advertencia + corrección
- Segunda vez: suspensión de cuenta de afiliado
```

---

## El Kit del Afiliado (Lo Que Necesitas Preparar)

Para que los afiliados puedan vender, necesitan materiales:

```
□ Link de afiliado único (en su dashboard)
□ Imágenes del producto (en tamaños para cada plataforma)
□ Copy de referencia (3-4 versiones de diferente longitud)
□ Videos del producto (si los tienes)
□ Preguntas frecuentes (para que puedan responder objeciones)
□ Qué hace el producto, para quién, cuánto cuesta
□ Política de comisiones clara y escrita
□ Cuándo y cómo se paga la comisión
```

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Polar.sh** | Afiliados integrado con suscripciones | polar.sh |
| **Rewardful** | Sistema de afiliados para Stripe | rewardful.com |
| **Tapfiliate** | Tracking avanzado de afiliados | tapfiliate.com |
| **Supabase** | Sistema propio de tracking | supabase.com |
| **Lemon Squeezy** | Afiliados + pagos en uno | lemonsqueezy.com |

## La Regla de los Afiliados

> El mejor programa de afiliados es el que tus clientes satisfechos recomendarían aunque no hubiera comisión.
>
> Si la única razón para recomendar tu producto es la comisión,
> el programa trae clientes pero no construye marca.
>
> Comisión + producto real = programa sostenible.
