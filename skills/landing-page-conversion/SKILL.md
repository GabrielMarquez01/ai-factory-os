---
name: landing-page-conversion
description: Sistema para construir landing pages de alta conversión. Estructura, copy, psicología de la decisión, y cómo probar que funciona antes de invertir en tráfico.
---

# 🎯 Landing Page de Alta Conversión

> **Analogía:** Una landing page es como un vendedor que trabaja 24/7. La diferencia entre un buen vendedor y uno malo no es el producto — es cómo presenta, en qué orden habla, y cuándo pide la decisión.
>
> Una landing mal estructurada pierde la venta antes de que el visitante llegue al precio.

## El Principio Más Importante

Una landing page tiene UN solo objetivo. No es un sitio web — es una conversación diseñada con un destino.

```
Sitio web = múltiples destinos posibles (navegar, explorar, conocer)
Landing page = un solo destino (convertir al visitante en [acción deseada])
```

Si tu landing tiene menú de navegación, múltiples ofertas o más de 1 CTA principal → no es una landing, es un sitio web con un botón.

---

## La Estructura AIDA (El Orden Importa)

AIDA es el flujo psicológico de la decisión de compra. No lo inventes — sigue el orden:

```
[A] ATENCIÓN    → Enganchar en los primeros 3 segundos
[I] INTERÉS     → Demostrar que entiendes el problema
[D] DESEO       → Mostrar la transformación que ofreces
[A] ACCIÓN      → Pedir la decisión en el momento correcto
```

### Sección 1: El Headline (ATENCIÓN)

Es lo primero que lee el visitante. Tienes 3 segundos.

**Fórmula que funciona:**
```
[Resultado deseado] para [avatar específico] sin [obstáculo principal]
```

Ejemplos:
- ❌ "La solución definitiva para tu negocio" (genérico, no dice nada)
- ✅ "Lleva tu bebé a dormir toda la noche sin llorar ni crear malos hábitos" (específico, habla del dolor real)

**Regla del headline:** si lo lees y no sabes exactamente a quién va dirigido y qué promete → reescríbelo.

### Sección 2: El Problema (INTERÉS)

Antes de vender, demuestra que entiendes el dolor. El visitante debe pensar "esto es exactamente lo que me pasa".

```
Estructura:
- El problema en sus propias palabras (no en las tuyas)
- La consecuencia emocional del problema
- Por qué las soluciones anteriores no funcionaron
```

**Truco:** las mejores descripciones del problema vienen de reviews de competidores en Amazon, comentarios en Reddit/YouTube, y conversaciones reales con clientes.

### Sección 3: La Solución + Prueba (DESEO)

Aquí presentas tu producto. Pero antes del producto, presenta la transformación:

```
ANTES (estado actual del visitante)     DESPUÉS (estado que prometes)
[situación de dolor actual]    →    [situación deseada con tu producto]
```

**Elementos de prueba que reducen el riesgo percibido:**
- Tu historia personal relacionada al problema (no tu CV)
- Resultados concretos (números > adjetivos)
- Testimonios reales con nombre + foto si es posible
- Casos de uso específicos ("esto funciona si tú eres X haciendo Y")

### Sección 4: La Oferta (ACCIÓN)

La oferta tiene que ser clara en 5 segundos:

```
[NOMBRE DEL PRODUCTO] — descriptor claro de qué es
$[PRECIO] [ciclo: único / mes / año]
Incluye:
  ✓ [Beneficio concreto 1]
  ✓ [Beneficio concreto 2]
  ✓ [Beneficio concreto 3]
[Garantía si tienes] — elimina el riesgo percibido
[Urgencia si es real] — nunca inventada
[BOTÓN] con verbo activo
```

### Sección 5: Objeciones (Antes de que las piensen)

Las 3 objeciones más comunes en cualquier producto:
1. "¿Esto realmente funciona?" → Prueba social, casos reales
2. "¿Funciona para mí específicamente?" → Targeting claro del avatar
3. "¿Y si no me sirve?" → Garantía o política de devolución

---

## Anatomía del CTA Que Convierte

```
❌ "Comprar"                 (genérico, sin contexto)
❌ "Enviar"                  (¿enviar qué?)
❌ "Haz click aquí"          (no dice qué pasa después)

✅ "Quiero mi guía ahora"    (pertenencia + inmediatez)
✅ "Empezar mi prueba gratis" (acción específica + beneficio)
✅ "Unirme al programa"       (comunidad + identidad)
```

**Regla del CTA:** el visitante debe saber exactamente qué pasa cuando hace click.

---

## Los Errores Más Comunes

```
❌ Headline que habla de la empresa, no del cliente
❌ Fotos de stock que nadie relaciona con el problema
❌ Testimonios genéricos ("excelente producto!")
❌ Precios sin contexto de valor
❌ Formularios de más de 3 campos antes de la compra
❌ Velocidad de carga > 3 segundos (50% abandona)
❌ No funciona en móvil (60-70% del tráfico es móvil)
```

---

## A/B Testing: Cómo Saber Qué Funciona

El A/B testing es probar dos versiones de la landing y ver cuál convierte más.

**Qué probar primero (por impacto):**
1. El headline (mayor impacto)
2. La imagen/video hero
3. El CTA (texto del botón)
4. El precio y su presentación
5. El orden de las secciones

**Regla:** cambia UNA sola variable por prueba. Si cambias todo, no sabes qué funcionó.

**Herramientas:**
- Vercel Edge Config (A/B simple con variables de entorno)
- PostHog Feature Flags (A/B con analytics integrado)
- Google Optimize (gratuito, más complejo)

**¿Cuántos visitantes necesitas para una decisión?** Mínimo 100 conversiones por variante antes de declarar ganador.

---

## Performance: La Landing Más Rápida Gana

```
< 1s de carga   → excelente
1-3s            → aceptable
> 3s            → estás perdiendo el 50% de los visitantes
```

**Quick wins de performance con Next.js:**
```javascript
// Imágenes optimizadas automáticamente
import Image from 'next/image'
<Image src="/hero.jpg" priority width={800} height={600} alt="..." />

// Fuentes optimizadas
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

// Static generation (pre-renderizado = velocidad máxima)
export const revalidate = 3600 // revalida cada hora
```

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Next.js + Tailwind** | Landing con performance máxima | nextjs.org |
| **Carrd** | Landing ultra-rápida sin código | carrd.co |
| **Framer** | Landing con animaciones premium | framer.com |
| **Vercel Analytics** | Medir conversión en tiempo real | vercel.com/analytics |
| **PostHog** | Heatmaps, grabaciones, A/B testing | posthog.com |
| **Hotjar** | Heatmaps de clicks y scroll | hotjar.com |

## Integración con el Business OS

```
funnel-infoproducto  → esta landing es el primer paso del funnel
freemium-conversion  → variante de landing para upgrade Free → Pro
cro-optimizer        → mejora continua de la conversión
analytics-dashboard  → métricas de la landing en el dashboard central
human-gate-protocol  → gate de aprobación antes de publicar cambios
```

## Recursos

- Web.dev — Core Web Vitals: web.dev/vitals
- Copyhackers — Copywriting para conversión: copyhackers.com
- Swipe-worthy — Biblioteca de landings reales que convierten: swipeworthy.com
