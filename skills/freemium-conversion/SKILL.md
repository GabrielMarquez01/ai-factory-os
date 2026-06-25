---
name: freemium-conversion
description: Sistema para convertir usuarios gratuitos en clientes de pago. El modelo freemium no falla por el producto — falla por no tener un sistema de conversión calibrado.
---

# 💎 Conversión Freemium → Pro

> **Analogía:** El freemium es como dejar entrar a alguien a una tienda sin cobrarle. El error es no tener a nadie que ayude a esa persona a encontrar lo que vino a buscar. El acierto es crear una experiencia tan buena que salgan con algo — y que regresen.

## El Mito del Freemium

El modelo freemium no convierte porque tienes un plan gratuito.
Convierte porque tienes un sistema que mueve al usuario del "me gusta" al "lo necesito".

**La ecuación que decide si alguien paga:**
```
Valor percibido del plan Pro
  > Precio del plan Pro + Fricción del upgrade

Si esta ecuación no se cumple → el usuario se queda en free para siempre.
```

---

## Los 3 Tipos de Freemium

### ❌ Freemium de Features

"El plan gratis tiene X. El plan Pro tiene X + Y + Z."

**Por qué falla:** Si Y y Z no son urgentes hoy, nadie paga.

### ❌ Freemium de Tiempo

"7 días gratis, luego pagas."

**Por qué falla:** Si el usuario no llega a su "primer valor" antes de que expire, cancela.

### ✅ Freemium de Límite Natural

"El plan gratis te da suficiente para enamorarte. El Pro se desbloquea cuando realmente lo necesitas."

**Por qué funciona:** El límite se activa en el momento de mayor valor percibido — cuando el usuario ya sabe que el producto funciona.

Ejemplos conocidos:
- Spotify: gratis con anuncios. Pagas cuando el anuncio en medio de tu canción favorita se vuelve insoportable.
- Notion: gratis hasta cierto tamaño de workspace. Pagas cuando el límite frena tu trabajo real.
- Dropbox: gratis hasta X GB. Pagas cuando se llena.

**La clave:** el usuario llega al límite en el momento de mayor necesidad, no de forma aleatoria.

---

## El Sistema de Conversión

### Paso 1: Define Tu "Primer Valor"

El primer valor (First Value) es el momento exacto en que el usuario dice "esto funciona".

Para cada producto es diferente:
- App de productividad: primera tarea completada con éxito
- Tracker de seguimiento: primera semana de datos registrados
- Plataforma de email: primer email enviado con buena tasa de apertura

**Ejercicio:** completa esta frase:
> "Mis usuarios entienden el valor de mi producto cuando _______________."

Todo el flujo de onboarding debe llevarlos a ese momento lo más rápido posible. Si tardan más de 10 minutos en llegar al primer valor, tienes un problema de activación, no de producto.

### Paso 2: Define Tu Trigger de Upgrade

El trigger es el evento que precipita la decisión de pagar:

| Tipo | Ejemplo | Efectividad |
|------|---------|------------|
| **Límite de uso alcanzado** | "Llegaste al límite de 10 registros" | Alta — la necesidad es inmediata |
| **Feature bloqueada** | "Esta función está en Pro" (cuando la necesitan) | Media-Alta — depende del contexto |
| **Milestone de uso** | "Llevas 30 días activo — mira lo que más puedes hacer" | Alta — celebra la activación |
| **Oferta con tiempo real** | "50% off en las próximas 24h" | Media — funciona en usuarios activados |

> La diferencia entre un trigger que convierte y uno que molesta: el contexto. El mismo mensaje en el momento equivocado es spam. En el momento correcto, es un favor.

### Paso 3: Diseña El Momento del Upgrade en la UI

```
❌ Mal: Banner permanente en la parte superior de la app
       "¡Actualiza a Pro!" visible todo el tiempo
       → El usuario lo ignora como publicidad

✅ Bien: Modal contextual cuando alcanza el límite
        "Llegaste al máximo de esta función. El plan Pro desbloquea..."
        → El contexto hace que el upgrade sea relevante en ese momento

✅ Mejor: Features Pro visibles pero bloqueadas (con candado o en gris)
         → El usuario ve exactamente qué se pierde → más motivación
         → Principio psicológico: las pérdidas motivan más que las ganancias
```

### Paso 4: Elimina La Fricción del Pago

Cada paso extra en el proceso de pago = más usuarios que abandonan.

**Checkout de alta conversión:**
```
1. Click en "Upgrade a Pro"
2. Modal o página de checkout integrada (sin salir de la app)
3. Si el usuario ya tiene método de pago guardado → cobro con 1 click
4. Confirmación inmediata + acceso instantáneo a Pro
5. Email de confirmación (no de bienvenida — ya conocen el producto)

Tiempo total ideal: < 60 segundos del click al acceso
```

**Errores comunes que aumentan el abandono:**
- Redirigir a otra app o sitio para pagar
- Pedir datos que ya tienes
- Página de checkout lenta o sin diseño
- No confirmar el acceso inmediatamente después del pago

---

## El Modelo Founders: Alta Conversión en Lanzamiento

El modelo Founders es una variante para el momento del lanzamiento de tu producto:

```
OFERTA FOUNDERS:
├── Precio: significativamente menor al precio regular (30-70% descuento)
├── Cupo: limitado y real (no "quedan pocas plazas" fake)
├── Beneficio extra: acceso vitalicio / precio fijo de por vida
└── Contacto: el founder se comunica personalmente con cada Founder
```

**Por qué funciona:**
- Los early adopters valoran ser los primeros (status + precio especial)
- El cupo real crea urgencia genuina, no artificial
- El precio vitalicio elimina el churn: si pagaste de por vida, no cancelas

**Gate obligatorio antes de lanzar:**
Define el cupo exacto ANTES de publicar. Cambiar las reglas después destruye la confianza de las personas que más confían en ti.

---

## Emails de Nurturing Pre-Upgrade

No esperes a que el usuario llegue al límite. Prepara el terreno:

```
DÍA 7 (si llegaron al primer valor):
"Llevas una semana usando [producto]. Esto es lo que los usuarios que más
aprovechan hacen diferente: [tip de alto valor sobre una feature Pro]"

DÍA 14 (si están activos pero no han upgradeado):
"Pronto vas a llegar al límite de [función]. Aquí lo que desbloquea Pro:
[lista de las 3 features Pro más usadas por usuarios activos]"

DÍA 21 (si no han upgradeado después de 3 semanas activos):
Caso de éxito de un usuario Pro (sin revelar datos personales)
Enfocado en el resultado, no en el producto
```

Ver skill `email-nurturing-postcompra` para el sistema técnico de envío.

---

## Métricas de un Freemium Sano

| Métrica | Promedio SaaS | Meta inicial |
|---------|---------------|-------------|
| Activación (llegan al primer valor) | 40-60% | > 50% |
| Free → Paid conversion | 2-5% | > 3% |
| Churn mensual (cancelaciones) | 2-8% | < 5% |
| MRR crecimiento mes a mes | 10-20% | > 10% |

**Si Free → Paid es < 2%:** el problema está en el valor percibido o en el precio (o en que no estás llegando al tipo de usuario correcto).

**Si el Churn > 8%:** el problema está en la retención post-conversión — el usuario pagó pero no encontró el valor prometido.

**Cómo medir correctamente:** cohorts, no totales. "De los usuarios que se registraron en enero, ¿cuántos convirtieron en 30 / 60 / 90 días?"

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Polar.sh** | Suscripciones + checkout integrado + webhooks | polar.sh |
| **Stripe** | Pagos con trials, upgrades, downgrades | stripe.com |
| **Supabase** | Auth + tracking de uso por usuario | supabase.com |
| **PostHog** | Analytics de producto, funnels, cohorts | posthog.com |
| **Vercel Analytics** | Conversión en el funnel de upgrade | vercel.com/analytics |
| **Resend** | Emails de nurturing pre-upgrade | resend.com |

## Recursos

- Stripe — Billing y suscripciones: stripe.com/docs/billing
- Polar — Checkout para fundadores: docs.polar.sh
- PostHog — Análisis de funnel freemium: posthog.com/tutorials

---

## La Regla del Freemium

> El plan gratuito no es una cortesía — es el primer paso de un sistema de ventas.
>
> Si no conviertes, no es porque el producto sea malo.
> Es porque el sistema de conversión no existe o no está calibrado.
>
> El freemium es un experimento. Si no mides, no mejora.
