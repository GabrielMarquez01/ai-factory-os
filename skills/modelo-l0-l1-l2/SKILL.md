---
name: modelo-l0-l1-l2
description: Sistema de certificación de autonomía para agentes. Define cuánta libertad de acción tiene cada agente según su historial de confianza — de "revisa cada paso" hasta "corre solo y solo reporta".
---

# 🏅 Modelo de Autonomía L0 / L1 / L2

> **Analogía:** Es como obtener una licencia de conducir.
> L0 = estás aprendiendo y el instructor va contigo en el carro.
> L1 = ya manejas solo en la ciudad, pero alguien revisa tu ruta al final del día.
> L2 = licencia completa — manejas solo, solo avisas si hay una novedad.

## El Problema

Cuando empiezas a automatizar, tienes dos miedos legítimos:
1. "No confío en el agente — puede equivocarse"
2. "Si tengo que aprobar todo, ¿para qué automaticé?"

El Modelo L0/L1/L2 resuelve esto con una progresión gradual de confianza basada en evidencia.

---

## Los Tres Niveles

### 🟡 L0 — Borrador (Supervisión Total)

**Qué significa:** El agente propone. Tú apruebas CADA paso antes de que lo ejecute.

**Cuándo aplica:**
- Skill nuevo que nunca se ha probado en producción
- Área crítica del negocio (pagos, comunicación directa con clientes)
- Primer mes de cualquier automatización

**Cómo se ve en la práctica:**
```
Agente: "Voy a redactar este email de bienvenida. ¿Apruebas?"
Tú: [revisar] → Sí / No / Modificar
Agente: "Ahora voy a actualizar el perfil del usuario. ¿Apruebas?"
Tú: [revisar] → Sí / No / Modificar
```

**Carga para el founder:** Alta. **Seguridad:** Máxima.

---

### 🔵 L1 — Piloto (Supervisión de Corridas)

**Qué significa:** El agente corre el proceso completo, pero tú apruebas el resultado antes de que tenga impacto real.

**Cuándo aplica:**
- El skill pasó 10+ corridas en L0 sin errores graves
- El proceso es repetible y bien definido
- Un error es recuperable

**Cómo se ve en la práctica:**
```
Agente: [ejecuta todo el proceso internamente]
Agente: "Terminé. Aquí el resumen de lo que hice. ¿Apruebas que lo publique?"
Tú: [revisar resumen] → Publicar / Descartar / Editar y publicar
```

**Carga para el founder:** Media. **Seguridad:** Alta.

---

### 🟢 L2 — Certificado (Autonomía Total)

**Qué significa:** El agente ejecuta y reporta. Solo alerta si algo sale mal.

**Cuándo aplica:**
- El skill acumuló 30+ corridas exitosas en L1
- El harness de pruebas está activo y detecta errores automáticamente
- Los circuit breakers están configurados
- El founder certificó explícitamente la autonomía (firma digital, registro en git)

**Cómo se ve en la práctica:**
```
Agente: [ejecuta solo]
Agente: "Corrida completada. Todo normal. Log disponible en [ruta]."

[Solo si algo falla]:
"⚠️ CIRCUIT BREAKER ACTIVADO — [razón]. Sistema detenido. Se requiere revisión."
```

**Carga para el founder:** Baja. **Seguridad:** Depende del harness y circuit breakers.

---

## El Proceso de Certificación (Cómo Subir de Nivel)

No se sube de nivel por confianza subjetiva. Se sube con evidencia:

```
┌─────────────────────────────────────────────┐
│         CHECKLIST L0 → L1                  │
├─────────────────────────────────────────────┤
│ □ 10+ corridas sin errores críticos        │
│ □ Harness básico definido (mínimo 5 casos) │
│ □ Circuit breakers configurados            │
│ □ Log de corridas disponible               │
│ □ Founder firma la promoción               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         CHECKLIST L1 → L2                  │
├─────────────────────────────────────────────┤
│ □ 30+ corridas exitosas en L1              │
│ □ Harness completo activo (10+ casos)      │
│ □ Panel de monitoreo funcionando           │
│ □ Mecanismo de rollback definido           │
│ □ Founder certifica explícitamente         │
└─────────────────────────────────────────────┘
```

**Importante:** La certificación se puede revocar. Un error grave en L2 regresa al agente a L1 automáticamente.

---

## El Registro de Agentes

Crea un archivo `AGENTS.md` en la raíz de tu repositorio:

```markdown
# Registro de Agentes y Nivel de Autonomía

| Agente | Función | Nivel | Certificado por | Fecha | Notas |
|--------|---------|-------|----------------|-------|-------|
| agente-bienvenida | Email post-registro | L2 | [Tu nombre] | 2026-01-15 | 45 corridas sin incidentes |
| agente-soporte | Respuesta a consultas | L1 | [Tu nombre] | 2026-02-01 | En período de prueba |
| agente-pagos | Procesar transacciones | L0 | — | — | Requiere gate siempre |
```

---

## Circuit Breakers: La Red de Seguridad del L2

Un agente L2 sin circuit breakers es peligroso. Estos son los mínimos obligatorios:

```
🔴 DETENER AUTOMÁTICAMENTE (aplica a TODOS los niveles):
- Cualquier gasto de dinero no autorizado
- Claims médicos o de salud sin validación profesional
- Exposición de datos de menores
- Error repetido 3+ veces consecutivas
- Tasa de fallo > 20% en las últimas 10 corridas
- Comportamiento fuera del scope documentado del agente

🟡 ALERTAR Y ESPERAR APROBACIÓN:
- Input que no coincide con ningún caso de prueba conocido
- Cambio de comportamiento vs. corridas anteriores
- Acción que no está explícitamente en el scope del agente
```

---

## Integración con Otros Skills

```
harness-universal      → las pruebas que permiten subir de nivel
human-gate-protocol    → define qué gates aplica en cada nivel
engram-memory-protocol → registra historial de corridas para evaluar la promoción
karpathy-protocol      → auditoría pre-ejecución antes de correr en L2
```

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Supabase** | Logs de corridas + dashboard de monitoreo | supabase.com |
| **Telegram Bot** | Notificaciones de circuit breaker al founder | core.telegram.org/bots |
| **n8n** | Workflows con nodos de aprobación por nivel | n8n.io |
| **GitHub Actions** | CI/CD como gate de código (siempre L0 para producción) | docs.github.com/actions |

## La Filosofía

> La autonomía no se otorga — se gana.
>
> Un agente L2 no es más inteligente que un L0.
> Es más **confiable** — y la confianza se construye con evidencia, no con fe.
>
> El objetivo no es llegar a L2 rápido. Es tener el nivel correcto para el riesgo real de cada acción.
