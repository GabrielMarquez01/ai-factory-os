---
name: customer-success
description: Sistema para retener usuarios después de que pagan. Adquirir un cliente cuesta 5-7x más que retener uno. Este skill construye el sistema que convierte compradores en fans que renuevan y recomiendan.
---

# 🤝 Customer Success

> **Analogía:** Vender es como llenar una cubeta con agua. El churn (cancelaciones) es como un hoyo en esa cubeta. Si el hoyo es grande, no importa qué tan rápido llenes — nunca se llena.
>
> Customer success es el sistema que tapa el hoyo.

## La Ecuación del Negocio Sano

```
Crecimiento real = Nuevos clientes - Clientes que cancelan
                 = Adquisición - Churn

Si Churn > Adquisición → el negocio retrocede aunque "venda bien"
```

**Referencia de industria:**
- Churn mensual < 2% → excelente
- Churn mensual 2-5% → saludable
- Churn mensual > 8% → el negocio tiene un hoyo grande

---

## Por Qué se Van los Clientes (Las 5 Razones Reales)

```
1. No llegaron al "primer valor" → no descubrieron por qué vale el precio
2. El producto dejó de ser relevante → su situación cambió
3. Encontraron una alternativa mejor o más barata
4. Tuvieron un problema que no se resolvió a tiempo
5. Se olvidaron de que tenían la suscripción (churn pasivo)
```

El error común: asumir que la razón 3 o 4 es la principal cuando suele ser la 1 o la 5.

---

## El Sistema de Customer Success

### Etapa 1: Onboarding (Los Primeros 7 Días)

El onboarding no es un tour del producto — es el camino al primer valor.

**La regla:** el usuario debe llegar al primer valor en menos de 10 minutos de uso real.

```
Checklist de onboarding efectivo:
□ El usuario entiende en 30 segundos qué hace el producto
□ El primer paso es obvio (sin tener que buscar)
□ El primer valor es alcanzable en la primera sesión
□ Hay una confirmación visual de que "lo logró" (celebración del milestone)
□ El usuario sabe cuál es el siguiente paso después del primer valor
```

**Patrón técnico — progress tracking:**

```javascript
// Tabla de estado de onboarding
CREATE TABLE onboarding_steps (
  usuario_id UUID REFERENCES usuarios(id),
  paso TEXT,                          -- 'perfil_completo', 'primer_uso', 'primer_valor'
  completado_en TIMESTAMPTZ,
  PRIMARY KEY (usuario_id, paso)
);

// Calcular % de onboarding completado
const PASOS_ONBOARDING = [
  'perfil_completo',
  'primera_accion',
  'primer_valor',
  'configuracion_avanzada'
]

async function calcularProgreso(usuarioId) {
  const completados = await db.query(
    'SELECT paso FROM onboarding_steps WHERE usuario_id = $1',
    [usuarioId]
  )
  const pasosDone = completados.map(r => r.paso)
  return {
    porcentaje: (pasosDone.length / PASOS_ONBOARDING.length) * 100,
    siguiente: PASOS_ONBOARDING.find(p => !pasosDone.includes(p))
  }
}
```

### Etapa 2: Activación (Semanas 2-4)

La activación es cuando el usuario forma el hábito de usar el producto.

**Señal de activación:** el usuario vuelve sin que lo llames.

**Táctica: los emails de "regreso":**
```
Si el usuario no abre la app en [N] días → email de reenganche:
- Tono: amigo que pregunta, no vendedor que recuerda el precio
- Contenido: un beneficio concreto que se perdió
- CTA: una acción específica, no "vuelve a la app"

Triggers:
- 3 días sin actividad → "¿Cómo va todo? Nota rápida"
- 7 días sin actividad → "Te perdiste esto"
- 14 días sin actividad → "¿Sigue siendo un buen momento?"
- 21 días sin actividad → email de "break-up" (ofrece cancelación con gracia)
```

### Etapa 3: Retención Activa (Mes 2 en adelante)

El usuario activo sigue usando. Tu trabajo: que el producto siga siendo relevante.

**Sistema de health score (puntuación de salud del cliente):**

```javascript
async function calcularHealthScore(usuarioId) {
  const metricas = await db.query(`
    SELECT
      -- Frecuencia de uso (0-40 puntos)
      CASE 
        WHEN sesiones_7d >= 5 THEN 40
        WHEN sesiones_7d >= 2 THEN 25
        WHEN sesiones_7d >= 1 THEN 10
        ELSE 0
      END AS puntos_frecuencia,
      
      -- Profundidad de uso (0-30 puntos)
      CASE
        WHEN features_usadas >= 4 THEN 30
        WHEN features_usadas >= 2 THEN 20
        ELSE 10
      END AS puntos_profundidad,
      
      -- Señales de valor (0-30 puntos)
      CASE
        WHEN hitos_completados >= 3 THEN 30
        WHEN hitos_completados >= 1 THEN 15
        ELSE 0
      END AS puntos_valor
    FROM metricas_usuario WHERE usuario_id = $1
  `, [usuarioId])
  
  const score = metricas[0].puntos_frecuencia + 
                metricas[0].puntos_profundidad + 
                metricas[0].puntos_valor
  
  return {
    score,                           // 0-100
    estado: score >= 70 ? 'saludable' : score >= 40 ? 'riesgo' : 'crítico'
  }
}
```

**Alertas de churn temprano:**
```
Health score < 40 por 2 semanas → alerta: usuario en riesgo
Health score < 20 → alerta crítica: acción inmediata
Sin sesión en 14+ días → trigger de email de reenganche
```

---

## El Sistema de Feedback (Escuchar para Retener)

**NPS (Net Promoter Score):** la métrica más simple de satisfacción.

```
Pregunta: "¿Qué tan probable es que recomiendes [producto] a alguien?"
Escala: 0-10

Promotores (9-10): fans que recomiendan → pedirles testimonial
Neutros (7-8): satisfechos pero no entusiastas → oportunidad de mejora
Detractores (0-6): insatisfechos → contactar directamente, entender por qué
```

**Cuándo enviar el NPS:**
- No antes de 30 días de uso real (demasiado pronto = opinión incompleta)
- Después de un hito completado (momento de mayor satisfacción)
- Máximo una vez cada 90 días (frecuencia mayor = molesto)

---

## El Proceso de Cancelación (Cómo Aprender del Churn)

La cancelación es el momento de más información gratuita. Úsala:

```
Flujo de cancelación:
1. "¿Por qué cancelas?" — 5 opciones + campo libre
2. Oferta de pausa (si el problema es precio o tiempo)
3. Confirmación con datos de lo que pierden
4. Exit email: "Gracias. Si cambias de opinión, aquí está tu historial."

Las opciones de cancelación más reveladoras:
□ "Ya no lo necesito" → el producto resolvió el problema (o el problema cambió)
□ "Es muy caro para lo que uso" → problema de activación, no de precio
□ "No supe cómo usarlo bien" → problema de onboarding
□ "Encontré una alternativa" → investigar cuál y por qué
□ "Problemas técnicos" → bug o UX deficiente
```

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Supabase** | Health score + tracking de onboarding | supabase.com |
| **Resend** | Emails de reenganche + NPS | resend.com |
| **PostHog** | Funnels de retención + grabaciones | posthog.com |
| **Typeform / Tally** | Encuestas de cancelación y NPS | tally.so |
| **Intercom (lite)** | Chat de soporte integrado (tiene free tier) | intercom.com |

## La Regla del Customer Success

> La retención no se construye en el momento de renovación.
> Se construye en los primeros 7 días de uso.
>
> Si el usuario no llegó al primer valor en la primera semana,
> la probabilidad de que cancele en el primer mes es > 70%.
