---
name: email-nurturing-postcompra
description: Sistema de emails automáticos que se activan después de una compra. La diferencia entre un cliente que no vuelve y uno que se convierte en fanático de tu marca — enviados en el momento exacto en que más receptivo está.
---

# 📧 Email Nurturing Post-Compra

> **Analogía:** Alguien compra un libro de cocina en tu tienda. Si no vuelve a saber nada de ti, ese libro puede quedar en el cajón. Pero si 3 días después le llega "¿Ya hiciste tu primera receta? Aquí va el tip que la mayoría se salta" — ese cliente está activo, involucrado, y con muchas más probabilidades de comprarte de nuevo.
>
> El nurturing post-compra es ese seguimiento inteligente y oportuno.

## Por Qué el Timing Lo Es Todo

La ciencia del comportamiento muestra que las personas están más receptivas a contenido de una marca en las **primeras 72 horas** después de comprar:

- Acaban de invertir dinero → quieren confirmar que tomaron buena decisión
- La emoción del "acabo de comprarlo" está fresca
- La atención al producto está en su punto más alto

Si no contactas en esa ventana → el entusiasmo se enfría y la relación no se construye.

---

## La Secuencia D+3 / D+7 / D+14

El patrón más probado para nurturing en productos digitales:

```
DÍA 0   → Compra realizada
DÍA 1   → Email de confirmación (automático, obligatorio — no es nurturing)
DÍA +3  → Email de bienvenida de valor (primer nurturing)
DÍA +7  → Email de profundización (el más valioso)
DÍA +14 → Email de comunidad + siguiente paso
```

### Email D+3: Activación

**Objetivo:** Asegurarte de que el usuario realmente usó lo que compró.

```
ASUNTO:
❌ "Tu compra fue exitosa" (genérico, no engancha)
✅ "[Nombre del producto] — ¿ya lo viste?" (personal, específico)

CUERPO:
- Apertura empática (reconoce la etapa/contexto del usuario)
- 1 tip de alto valor relacionado con el producto
- 1 pregunta que invite a responder (genera diálogo real)
- CTA suave: ninguna venta, solo activación

LONGITUD: máximo 200 palabras
TONO: personal, no corporativo
```

### Email D+7: Profundización

**Objetivo:** Entregar el contenido más valioso de toda la secuencia.

```
ASUNTO:
✅ "La parte que la mayoría se salta (y por eso no funciona)"
✅ "[El beneficio más deseado] — cómo lograrlo en [tiempo realista]"

CUERPO:
- El insight no obvio de tu producto/área
- Historia breve (tuya o de un usuario tipo — sin revelar datos reales)
- Aplicación práctica en 3 pasos
- Si tienes upsell natural: aquí va, pero suave y relevante

LONGITUD: puede ser más largo (300-400 palabras) — es el email de mayor valor
TONO: educativo, experto pero accesible
```

### Email D+14: Comunidad

**Objetivo:** Convertir al comprador en parte de algo más grande.

```
ASUNTO:
✅ "Las personas que más progresan hacen esto diferente"
✅ "2 semanas. ¿Qué tal va?"

CUERPO:
- Reconocer que llegaron a la 2ª semana (es un logro)
- Qué suelen estar experimentando en este punto
- Siguiente paso concreto y alcanzable
- Invitación a comunidad, siguiente producto, o siguiente etapa

LONGITUD: corto (150 palabras) — el hook está en el asunto
TONO: cálido, de comunidad
```

---

## La Arquitectura Técnica

### Flujo General

```
Webhook de pago (Stripe / Polar) dispara el evento
    ↓
Tu backend recibe el evento POST
    ↓
Registra en base de datos:
  { email, nombre, producto, fecha_compra }
    ↓
Encola 3 emails con delay calculado desde fecha_compra:
  D+3  → enviar_en = fecha_compra + 3 días
  D+7  → enviar_en = fecha_compra + 7 días
  D+14 → enviar_en = fecha_compra + 14 días
    ↓
Cron job cada hora procesa la cola y envía los que están listos
```

### Tablas de Base de Datos

```sql
-- Cola de emails pendientes
CREATE TABLE email_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  tipo TEXT NOT NULL, -- 'nurturing_d3' | 'nurturing_d7' | 'nurturing_d14'
  enviar_en TIMESTAMPTZ NOT NULL,
  enviado BOOLEAN DEFAULT FALSE,
  enviado_en TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registro de unsubscribes (cumplimiento obligatorio)
CREATE TABLE email_suppressions (
  email TEXT PRIMARY KEY,
  motivo TEXT, -- 'unsubscribe' | 'bounce' | 'spam_report'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Código Base (Node.js + Resend)

```javascript
// Webhook de pago → encolar secuencia
async function onPagoExitoso(evento) {
  const { email, nombre, producto } = evento.data
  const fechaCompra = new Date()

  // Verificar que no está en suppression list (OBLIGATORIO)
  const suprimido = await db.findOne('email_suppressions', { email })
  if (suprimido) return // No enviar a quienes se dieron de baja

  await db.insert('email_queue', [
    { email, nombre, tipo: 'nurturing_d3', enviar_en: fechaCompra + diasEnMs(3) },
    { email, nombre, tipo: 'nurturing_d7', enviar_en: fechaCompra + diasEnMs(7) },
    { email, nombre, tipo: 'nurturing_d14', enviar_en: fechaCompra + diasEnMs(14) }
  ])
}

// Cron cada hora — procesar cola
async function procesarCola() {
  const pendientes = await db.query(`
    SELECT * FROM email_queue
    WHERE enviar_en <= NOW() AND enviado = false
  `)

  for (const job of pendientes) {
    await resend.emails.send({
      from: 'Tu Nombre <hola@tudominio.com>',
      to: job.email,
      subject: PLANTILLAS[job.tipo].asunto(job.nombre),
      html: PLANTILLAS[job.tipo].cuerpo(job.nombre, generarLinkUnsubscribe(job.email))
    })
    await db.update('email_queue', job.id, { enviado: true, enviado_en: new Date() })
  }
}
```

---

## Unsubscribe Seguro: Obligatorio por Ley

Cada email debe tener link de unsubscribe que funcione. Es requerimiento legal en CAN-SPAM y LFPDPPP.

**Patrón con token HMAC** (más seguro que solo el email en la URL):

```javascript
const crypto = require('crypto')

// Generar link de baja
function generarLinkUnsubscribe(email) {
  const token = crypto
    .createHmac('sha256', process.env.UNSUBSCRIBE_SECRET)
    .update(email)
    .digest('hex')
  
  return `https://tudominio.com/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`
}

// Verificar cuando el usuario hace click
function verificarUnsubscribe(email, token) {
  const tokenValido = crypto
    .createHmac('sha256', process.env.UNSUBSCRIBE_SECRET)
    .update(email)
    .digest('hex')
  
  // timingSafeEqual previene ataques de timing
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(tokenValido))
}

// Procesar la baja
async function procesarUnsubscribe(email, token) {
  if (!verificarUnsubscribe(email, token)) return { error: 'Token inválido' }
  
  await db.insert('email_suppressions', { email, motivo: 'unsubscribe' })
  await db.delete('email_queue', { email, enviado: false }) // cancelar pendientes
  
  return { ok: true }
}
```

> **Por qué HMAC y no solo el email:** Sin token, cualquiera que conozca el email de alguien puede darlo de baja. Con HMAC, solo quien recibió el email tiene el token válido.

---

## Lo Que Hace Que Los Emails Se Lean (vs. Que Vayan a Spam)

**Configuración técnica (sin esto, vas a spam):**
- SPF + DKIM + DMARC configurados en tu dominio
- Usar proveedor de email transaccional (Resend, SendGrid, Mailgun) — NO Gmail masivo
- Ratio texto/HTML equilibrado (no solo imágenes)
- Tamaño < 100KB

**De contenido:**
- Asunto < 50 caracteres
- Las primeras 90 caracteres son el preview — deciden si abren
- Una sola llamada a acción por email
- Si alguien responde → responde tú también (señal de calidad para Gmail)

---

## Métricas de una Buena Secuencia

| Métrica | Industria | Meta inicial |
|---------|-----------|-------------|
| Tasa de apertura | 20-25% | > 30% |
| Tasa de clicks | 2-5% | > 5% |
| Unsubscribes | < 0.5% | < 0.3% |
| Spam reports | < 0.1% | < 0.05% |

**Si la apertura está baja:** el problema es el asunto.
**Si los clicks son bajos:** el problema es el cuerpo o el CTA.
**Si los unsubscribes son altos:** estás llegando a las personas incorrectas o el contenido no es relevante.

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Resend** | Email transaccional + analytics por email | resend.com |
| **React Email** | Templates de email con componentes React | react.email |
| **Stripe Webhooks** | Disparador del evento de compra | stripe.com/docs/webhooks |
| **Polar** | Alternativa a Stripe (pagos + webhooks integrados) | polar.sh |
| **Supabase** | Cola de emails + tabla de suppressions | supabase.com |
| **Upstash** | Cola de tareas con delays (alternativa ligera) | upstash.com |

---

## La Regla del Nurturing

> El mejor email de nurturing no se siente como marketing.
> Se siente como un mensaje de alguien que sabe exactamente lo que necesitas escuchar hoy.
>
> La diferencia entre un email que vende y uno que construye relación:
> el primero habla de ti, el segundo habla del usuario.
