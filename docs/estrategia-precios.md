# Estrategia de Precios — Decisiones y Razonamiento

> Este documento es parte del caso de estudio.
> El objetivo no es presumir los números sino compartir el **proceso de decisión**
> para que lo evalúes, lo critiques y lo adaptes a tu contexto.

---

## El mercado de referencia

El competidor principal en el nicho es **Huckleberry** (tracker de sueño para bebés):
- Precio: ~$14 USD/mes (~$240 MXN/mes al tipo de cambio actual)
- Fortaleza: líder de mercado en EE.UU., UX pulida
- Debilidades: solo sueño, solo inglés, sin contexto LatAm, sin agente de IA

**La hipótesis:** una app con más funciones, en español, con IA incluida y a menor precio
gana en México, Colombia, Argentina y España antes de que Huckleberry voltee a mirar LatAm.

---

## Modelo freemium (app mi·ma)

```
GRATIS (siempre)
├── Registro del bebé
├── Bitácora: sueño, tomas, pañales, síntomas
├── Curvas de crecimiento WHO
├── Hitos del desarrollo + banderas rojas
├── Cartilla de vacunación (7 países)
├── Sofia IA: 3 consultas/mes
└── Modo invitado: 7 días sin registro

PRO ($99 MXN/mes | $799 MXN/año)
├── Sofia IA: consultas ilimitadas
├── Insights 30 días (tendencias, patrones)
├── Memoria persistente de Sofia entre sesiones
└── [próximamente] Predicciones de ventana de sueño
```

**Razonamiento del precio:**
- $99 MXN/mes = ~$5 USD = precio de 2 cafés en México
- 67% más barato que Huckleberry en su mercado principal
- El ancla de precio usa al competidor como referencia implícita
- El annual ($799) = 8 meses pagados, 4 gratis → incentiva retención

---

## Modelo Founders (acceso vitalicio)

```
FOUNDERS — $99 MXN/mes de por vida (cupo: 10 personas)
├── Todo lo de Pro, siempre
├── Acceso a features antes que nadie
├── Voz directa en el roadmap
└── Precio bloqueado para siempre
```

**Razonamiento:**
- El cupo de 10 crea urgencia real (no artificial)
- Se vende 1:1 únicamente a compradores del ebook / leads calientes
- El precio mensual recurrente (no pago único) genera ingreso predecible
- Valida que alguien paga antes de construir la infraestructura de pagos completa
- El acceso inicial se da MANUAL (has_access = true por email) → cero fricción técnica

**Gate de validación aplicado aquí:**
> ¿10 founders pagadas o con compromiso explícito de pago?
> Si sí → acelerar construcción. Si no → no construir más features.

---

## Infoproducto (ebook)

```
Ebook PDF — $150 MXN (pago único)
├── Estimulación visual 0–6 meses
├── Tarjetas de alto contraste descargables
└── Rutinas por etapa de desarrollo
```

**Razonamiento:**
- Precio de entrada bajo → primera transacción fácil
- Función principal: calificar al lead (quien paga $150 confía en la marca)
- El ebook es el "top of funnel" hacia mi·ma Pro y Founders
- Sin descuentos → protege el valor percibido del contenido

---

## La lógica del sistema completo

```
Reel gratuito → visita primerasmiradas.com → Sofia responde gratis
    ↓
Compra ebook $150 MXN → lead calificado → nurturing D+3/D+7/D+14
    ↓
DM / contacto → oferta Founders $99/mes de por vida
    ↓
App mi·ma → uso diario → conversión a Pro $99/mes o $799/año
```

Cada pilar alimenta al siguiente. El precio más bajo del funnel
($150) financia la confianza para el precio recurrente ($99/mes).

---

## Preguntas abiertas (feedback bienvenido)

1. ¿$99 MXN/mes es demasiado bajo para sostener el negocio a largo plazo, o es el precio correcto para penetrar LatAm primero?
2. ¿El modelo Founders de cupo 10 crea suficiente urgencia, o conviene aumentar el cupo?
3. ¿Freemium con 3 consultas de Sofia/mes es suficiente para demostrar valor antes del paywall, o debería ser más generoso?
4. ¿Tiene sentido tener DOS productos de entrada (ebook + app) o es mejor consolidar en uno?

> Este documento existe para pensar en voz alta, no para presumir.
> Si ves algo que no tiene sentido, dilo — es más valioso que un like.
