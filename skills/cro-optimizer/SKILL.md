---
name: cro-optimizer
description: >
  Optimiza la tasa de conversión de landing pages, funnels y páginas de venta.
  Analiza el HTML actual, identifica friction points, propone y ejecuta mejoras
  A/B testables: headlines, CTAs, social proof, pricing y formularios.
---

# CRO Optimizer Skill

## Propósito
Convertir más visitantes en compradores sin aumentar el tráfico.
Un aumento del 1% al 3% en conversión puede triplicar los ingresos con el mismo tráfico.

El estándar mínimo: toda landing page de OpenGravity debe convertir al >2%.
El objetivo premium: >4% (top 10% de la industria).

---

## Activadores
- Landing page con conversión < 2%
- Usuario quiere mejorar una página existente
- Parte de la Fase 10 (iteración continua) del workflow maestro
- Usuario reporta muchos visitantes pero pocas ventas

---

## Auditoría de Conversión — Protocolo

### PASO 1 — Leer la página actual
```
Lee el archivo workspace/[nombre].html y analiza:
1. ¿Cuánto tiempo tarda en cargar el Hero? (debe ser < 3 segundos)
2. ¿El H1 tiene el beneficio principal en 6-10 palabras?
3. ¿Hay CTA visible sin hacer scroll (above the fold)?
4. ¿Cuántos pasos tiene el checkout?
5. ¿Hay prueba social en los primeros 400px?
6. ¿Los formularios tienen el mínimo de campos posible?
7. ¿Hay garantía visible cerca del botón de compra?
8. ¿El precio está contextualizado (vs alternativa más cara)?
```

---

### Checklist CRO por sección:

#### Hero (impacto en conversión: muy alto)
- [ ] H1 orientado a resultado, no a feature ("Consigue X clientes" no "Software de marketing")
- [ ] Subtítulo elimina la objeción más común en 1 frase
- [ ] CTA con verbo en imperativo + beneficio ("Obtener mi template gratis")
- [ ] CTA button en color de acento (no gris, no blanco)
- [ ] Social proof above the fold: número de clientes o logos
- [ ] Hero image/video muestra el producto EN USO, no solo el logo
- [ ] Badge de urgencia si aplica ("Precio de lanzamiento", "Solo X disponibles")

#### Pricing (impacto en conversión: muy alto)
- [ ] Tier medio con badge "Más popular" o "Recomendado"
- [ ] Precio original tachado + precio real (anchoring)
- [ ] Lista de features: beneficios (qué logra) no especificaciones técnicas
- [ ] Garantía visible dentro de la sección de pricing
- [ ] FAQ de objeciones justo debajo del pricing
- [ ] CTA repetido al final de la página (no solo en hero)
- [ ] Comparación implícita con alternativa cara ("vs $3,000 con agencia")

#### Formularios (impacto en conversión: alto)
- [ ] Solo los campos NECESARIOS (email + nombre máximo para lead magnet)
- [ ] Label dentro del campo (no flotante — reduce confusión en mobile)
- [ ] Botón de submit: tamaño grande, color contrastante
- [ ] Texto bajo el formulario: "No spam. Cancela cuando quieras."
- [ ] Progress indicator si el formulario tiene múltiples pasos
- [ ] Error messages en rojo inline (no alerts del browser)

#### Social Proof (impacto en conversión: alto)
- [ ] Testimonios con: foto real (no avatar), nombre completo, resultado específico
- [ ] "300 clientes confían en nosotros" > "Clientes satisfechos"
- [ ] Número exacto: "2,847 emprendedores" > "Miles de emprendedores"
- [ ] Logos de clientes conocidos (si aplica)
- [ ] Testimonios específicos del resultado: "$2,400 en ventas en la primera semana"

#### Mobile (impacto en conversión: muy alto para LATAM)
- [ ] CTA button con min-height: 48px (táctil)
- [ ] Texto legible sin hacer zoom (mínimo 16px)
- [ ] No hay elementos que se rompan en pantallas < 375px
- [ ] Formularios no requieren zoom para rellenar
- [ ] Velocidad de carga < 3 segundos en 3G

---

## A/B Test Templates

### Test 1 — Headline (mayor impacto)
```
Control: "Templates para tu negocio"
Variante A: "Tu página web lista en 30 minutos"
Variante B: "Consigue 10 clientes más este mes con tu nueva web"

Métrica a medir: CTR al botón de compra
Duración: 7-14 días o 100 conversiones
Ganador: Variante con mayor CTR (significancia estadística > 95%)
```

### Test 2 — CTA Button Text
```
Control: "Comprar ahora"
Variante A: "Obtener mi template →"
Variante B: "Empezar por $29"

Métrica: Conversión directa
Nota: Variantes con "mi" (posesivo) suelen ganar +20-30%
```

### Test 3 — Precio / Pricing display
```
Control: "$79"
Variante A: "$79 (ahorra $120 vs agencia)"
Variante B: "Antes $129 → Hoy $79"

Métrica: Revenue per visitor
```

### Test 4 — Social Proof Position
```
Control: Testimonios en sección 5
Variante: 1 testimonio corto justo debajo del H1

Métrica: Time on page + conversión
```

---

## Correcciones Comunes por Nivel de Urgencia

### 🔴 Crítico (corregir antes de lanzar):
1. CTA no visible above the fold → mover botón al hero
2. Precio sin contexto → agregar "vs $3,000 con agencia"
3. Formulario con 5+ campos → reducir a mínimo esencial
4. Sin garantía visible → agregar badge de 30 días cerca del precio
5. Hero image es stock photo genérica → reemplazar con screenshot real del producto

### 🟡 Importante (corregir en primera iteración):
1. Testimonios sin foto ni resultado específico → mejorar social proof
2. FAQ no responde las 5 objeciones principales → revisar con cliente
3. Sin urgencia ni escasez → agregar "Oferta válida hasta [fecha]"
4. Mobile: botones pequeños → aumentar a 48px de alto mínimo

### 🟢 Optimización (mejora continua):
1. A/B test de headlines → implementar ganador
2. Personalización de copy por fuente de tráfico
3. Heatmap analysis → ajustar layout según comportamiento real
4. Velocidad de carga → optimizar imágenes y CSS

---

## Herramientas de Tracking Recomendadas (gratuitas)

```html
<!-- Google Analytics 4 (gratis) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>

<!-- Microsoft Clarity (heatmaps + recordings gratis) -->
<script type="text/javascript">
(function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "XXXXXXXX");
</script>

<!-- Plausible (alternativa privacy-first, $9/mes) -->
<script defer data-domain="tudominio.com" src="https://plausible.io/js/plausible.js"></script>
```

### Eventos clave a trackear:
```javascript
// Click en CTA principal
gtag('event', 'cta_click', { 'event_category': 'conversion', 'event_label': 'hero_cta' });

// Scroll al 50% de la página
// Llegó a sección de pricing
// Click en botón de compra
// Formulario enviado
// Error en formulario
```

---

## Entregable

Después de auditoría, generar `workspace/[nombre]-cro-report.md`:
```markdown
# CRO Report: [Nombre del producto]
Fecha: [fecha] | Conversión actual: [X%] | Meta: >2%

## Hallazgos críticos (corregir inmediatamente)
1. [Problema] → [Solución propuesta]

## Hallazgos importantes
...

## A/B Tests recomendados
...

## Código corregido
[Fragmentos HTML/CSS con las correcciones aplicadas]

## Proyección de impacto
- Si se corrige sólo lo crítico: conversión estimada [X%]
- Si se implementan todos los cambios: conversión estimada [X%]
```

## Integración con otros skills
- `premium-ui-system` → diseño base de alta calidad reduce problemas CRO
- `sales-funnel-builder` → el funnel completo se audita con este skill
- `seo-content-engine` → el copy mejorado beneficia tanto SEO como conversión
- `retroalimentacion-mejora` workflow → auditoría mensual con este skill
