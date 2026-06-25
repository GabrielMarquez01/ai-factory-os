---
name: analytics-dashboard
description: Sistema de métricas para saber si tu negocio crece, dónde se pierde el usuario, y cuándo actuar. Sin datos, las decisiones son corazonadas. Con datos, son estrategia.
---

# 📊 Analytics Dashboard

> **Analogía:** Manejar un negocio sin métricas es como manejar un carro por la noche sin tablero — puedes avanzar, pero no sabes a qué velocidad vas, cuánta gasolina te queda, o si el motor está a punto de fallar.
>
> El dashboard no toma las decisiones por ti. Te dice cuándo las decisiones son urgentes.

## El Error Más Común: Medir Todo

Los fundadores caen en dos trampas:
1. **Medir nada** — no saben qué está pasando
2. **Medir todo** — se ahogan en datos y no actúan

La solución: definir **una métrica norte** y 4-5 métricas de diagnóstico.

---

## La Métrica Norte (North Star Metric)

Una sola métrica que captura el valor real que entregas a tus usuarios.

**No** es revenue. El revenue es consecuencia.
**Sí** es el comportamiento que genera valor.

| Tipo de negocio | Métrica Norte |
|----------------|--------------|
| App de seguimiento | Usuarios activos semana a semana |
| Plataforma de cursos | % usuarios que completaron el primer módulo |
| E-commerce | Órdenes por cliente en 90 días |
| SaaS B2B | Minutos de uso por sesión activa |
| Newsletter | % lectores que responden / hacen click |

**Cómo encontrar tu métrica norte:**
> Completa: "Mi negocio creció cuando más usuarios ___________."

Lo que llena ese espacio es tu candidata a métrica norte.

---

## Las 5 Capas del Funnel (Qué Medir en Cada Etapa)

```
[ADQUISICIÓN]    → ¿Cómo me encuentran?
        ↓
[ACTIVACIÓN]     → ¿Llegan al primer valor?
        ↓
[RETENCIÓN]      → ¿Vuelven?
        ↓
[REFERIDO]       → ¿Lo recomiendan?
        ↓
[REVENUE]        → ¿Pagan?
```

### Métricas por Capa

```markdown
ADQUISICIÓN:
- Visitantes únicos por canal (orgánico, social, directo, email)
- CAC (Costo de Adquisición por Cliente) si usas ads
- Fuente de los primeros 100 usuarios (cuál canal convierte mejor)

ACTIVACIÓN:
- % usuarios que llegan al "primer valor" en las primeras 24h
- Tiempo promedio de setup / onboarding
- Abandono en cada paso del flujo de registro

RETENCIÓN:
- DAU/MAU ratio (usuarios diarios / mensuales — meta: > 20%)
- Churn mensual (% que cancelan o dejan de usar)
- Cohorts de retención por semana/mes

REFERIDO:
- NPS (Net Promoter Score) — "¿recomendarías esto?" 0-10
- Tasa de referidos (% usuarios que invitan a alguien)
- Fuentes de registro (cuántos vienen referidos por otro usuario)

REVENUE:
- MRR (Monthly Recurring Revenue)
- ARPU (Revenue Promedio Por Usuario)
- LTV (Lifetime Value) — cuánto genera un cliente en total
- LTV/CAC ratio (debe ser > 3 para ser negocio viable)
```

---

## Implementación Técnica

### Opción A: Tabla de Eventos en Supabase (Recomendado para empezar)

```sql
-- Tabla de eventos del funnel
CREATE TABLE eventos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID,                    -- puede ser null (anónimo)
  sesion_id TEXT,                     -- para agrupar eventos de la misma sesión
  evento TEXT NOT NULL,               -- 'signup', 'activado', 'compra', 'churn', etc.
  propiedades JSONB DEFAULT '{}',     -- datos adicionales del evento
  canal TEXT,                         -- 'organico', 'email', 'social', 'directo'
  plataforma TEXT,                    -- 'web', 'mobile', 'api'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para queries de analytics
CREATE INDEX idx_eventos_usuario ON eventos(usuario_id);
CREATE INDEX idx_eventos_tipo ON eventos(evento);
CREATE INDEX idx_eventos_fecha ON eventos(created_at);
```

```javascript
// Función de tracking (usar en toda la app)
async function trackEvento(evento, propiedades = {}, usuarioId = null) {
  await supabase.from('eventos').insert({
    usuario_id: usuarioId,
    sesion_id: obtenerSesionId(),  // de cookie o localStorage
    evento: evento,
    propiedades: propiedades,
    canal: obtenerCanal(),          // de UTM params o referrer
    plataforma: 'web'
  })
}

// Uso en la app:
await trackEvento('signup_completado', { plan: 'free', fuente: 'google' }, userId)
await trackEvento('primer_valor_alcanzado', { tiempo_en_segundos: 180 }, userId)
await trackEvento('upgrade_a_pro', { precio: 99, moneda: 'MXN' }, userId)
```

### Opción B: Herramientas Externas (Sin Código)

| Herramienta | Qué mide | Costo |
|-------------|---------|-------|
| **Vercel Analytics** | Tráfico web, Core Web Vitals | Gratis en plan hobby |
| **PostHog** | Eventos, funnels, grabaciones de sesión, A/B | Gratis hasta 1M eventos/mes |
| **Google Analytics 4** | Tráfico, comportamiento, conversiones | Gratis |
| **Mixpanel** | Funnels de producto, cohorts | Gratis hasta 20M eventos/mes |
| **Plausible** | Alternativa privada a GA | $9/mes |

---

## Queries de Analytics Más Útiles

```sql
-- Funnel de conversión: signup → primer valor → pago
SELECT 
  COUNT(DISTINCT CASE WHEN evento = 'signup_completado' THEN usuario_id END) AS signups,
  COUNT(DISTINCT CASE WHEN evento = 'primer_valor_alcanzado' THEN usuario_id END) AS activados,
  COUNT(DISTINCT CASE WHEN evento = 'upgrade_a_pro' THEN usuario_id END) AS pagando,
  ROUND(
    100.0 * COUNT(DISTINCT CASE WHEN evento = 'primer_valor_alcanzado' THEN usuario_id END) /
    NULLIF(COUNT(DISTINCT CASE WHEN evento = 'signup_completado' THEN usuario_id END), 0),
    1
  ) AS pct_activacion
FROM eventos
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Retención por cohorte (usuarios que volvieron semana X después del signup)
SELECT 
  DATE_TRUNC('week', primer_signup) AS cohorte,
  COUNT(DISTINCT usuario_id) AS usuarios,
  COUNT(DISTINCT CASE WHEN semanas_activo >= 1 THEN usuario_id END) AS retuvo_sem1,
  COUNT(DISTINCT CASE WHEN semanas_activo >= 4 THEN usuario_id END) AS retuvo_mes1
FROM (
  SELECT 
    usuario_id,
    MIN(created_at) AS primer_signup,
    EXTRACT(WEEK FROM created_at) - EXTRACT(WEEK FROM MIN(created_at) OVER (PARTITION BY usuario_id)) AS semanas_activo
  FROM eventos
  WHERE evento = 'sesion_activa'
  GROUP BY usuario_id, created_at
) cohorts
GROUP BY cohorte
ORDER BY cohorte;
```

---

## El Dashboard Mínimo Viable

Para empezar, necesitas ver 4 números una vez por semana:

```
┌─────────────────────────────────────────────────┐
│              DASHBOARD SEMANAL                  │
├──────────────┬──────────────┬────────────────── ┤
│ Métrica      │ Esta semana  │ Vs semana anterior │
├──────────────┼──────────────┼────────────────────┤
│ [Métrica Norte] │ X        │ +/-Y%              │
│ Activación   │ X%           │ +/-Y pp            │
│ Retención    │ X%           │ +/-Y pp            │
│ MRR          │ $X           │ +/-$Y              │
└──────────────┴──────────────┴────────────────────┘

⚠️ ALERTAS ACTIVAS:
- [Si retención cae > 5% en una semana → investigar]
- [Si activación < 40% → revisar onboarding]
- [Si churn > 10% mensual → hablar con usuarios que cancelaron]
```

---

## Sistema de Alertas Automáticas

No esperes a ver el dashboard — que el dashboard te llame:

```javascript
// Cron diario que verifica métricas críticas
async function verificarAlertas() {
  const metricas = await calcularMetricasDiarias()
  
  const alertas = []
  
  if (metricas.churnSemanal > 0.10) {
    alertas.push(`🔴 Churn alto: ${metricas.churnSemanal * 100}% esta semana`)
  }
  if (metricas.activacion < 0.40) {
    alertas.push(`🟡 Activación baja: ${metricas.activacion * 100}%`)
  }
  if (metricas.mrrCrecimiento < 0) {
    alertas.push(`🔴 MRR cayó ${Math.abs(metricas.mrrCrecimiento * 100)}% vs semana anterior`)
  }
  
  if (alertas.length > 0) {
    await notificarFounder(alertas.join('\n'))
  }
}
```

---

## Integración con el Business OS

```
human-gate-protocol   → las alertas de analytics disparan gates de revisión
outcomes-tracking     → este dashboard alimenta las decisiones de roadmap
customer-success      → retención baja → activa flujo de customer success
freemium-conversion   → funnel de upgrade visible en el dashboard
```

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Supabase** | Tabla de eventos + queries SQL de analytics | supabase.com |
| **PostHog** | Dashboard de producto + grabaciones | posthog.com |
| **Vercel Analytics** | Core Web Vitals + tráfico web | vercel.com/analytics |
| **Recharts / Chart.js** | Visualizar métricas en tu propia UI | recharts.org |
| **Metabase** | Dashboard SQL sin código (self-host $0) | metabase.com |

## La Regla de las Métricas

> Una métrica que no cambia una decisión no vale medirla.
> Antes de agregar cualquier tracking: "¿Qué haría diferente si este número fuera alto vs bajo?"
> Si la respuesta es "nada" → no la midas.
