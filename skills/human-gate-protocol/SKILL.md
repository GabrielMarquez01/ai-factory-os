---
name: human-gate-protocol
description: El patrón más importante del sistema — el humano APRUEBA, el agente EJECUTA. Define qué decisiones son inamovibles del founder y cuáles puede tomar el agente solo.
---

# 🚦 Human Gate Protocol

> **Analogía:** Un avión moderno tiene piloto automático, pero el capitán sigue siendo quien dice "despegar" y "aterrizar". El agente puede volar solo, pero hay maniobras que siempre requieren la mano humana.

## El Problema Que Resuelve

Cuando automatizas un negocio, el mayor riesgo no es que el sistema falle técnicamente — es que tome decisiones que debería tomar un humano.

Ejemplos de lo que sale mal sin gates:
- El agente publica contenido sin revisión → tono equivocado, reputación dañada
- El agente ejecuta un pago → dinero enviado sin autorización
- El agente modifica precios → ventas al precio incorrecto
- El agente responde con información sensible → brecha de privacidad

## La Regla de Oro

```
COBRAR dinero      → siempre gate humano
GASTAR dinero      → siempre gate humano
PUBLICAR contenido → gate humano (al menos en etapas tempranas)
MODIFICAR BD       → gate humano en producción
ENVIAR masivos     → gate humano (email, notificaciones push)
CAMBIOS legales    → siempre gate humano
```

## Cómo Implementar un Gate

### Paso 1: Clasifica tus acciones

| Acción | Consecuencia si falla | ¿Gate? |
|--------|----------------------|--------|
| Email de bienvenida | Bajo | ❌ Puede ser automático |
| Publicar en redes | Medio | ✅ Gate en etapa inicial |
| Procesar pago | Alto | ✅ Siempre gate |
| Borrar datos | Crítico | ✅ Siempre + confirmación doble |

### Paso 2: Elige el mecanismo

De menor a mayor fricción:

1. **Notificación + link** (Telegram Bot, email con botones)
2. **Panel de control** (dashboard con botón "Aprobar / Rechazar")
3. **Pull Request** (gate de código antes de deploy)
4. **Checkpoint en terminal** (el script pide `Y/N`)

### Paso 3: Define el timeout

Si el gate no se resuelve en X tiempo → ¿qué hace el sistema?
- ¿Se cancela la acción? (más seguro)
- ¿Se escala a otra persona?
- ¿Se ejecuta con defaults seguros?

El silencio no es una respuesta válida en un sistema autónomo.

## El Formato de Notificación Efectivo

```
🚦 GATE REQUERIDO — [Nombre de la acción]

QUÉ:     [Descripción en 1-2 líneas]
POR QUÉ: [Qué disparó esta acción]
IMPACTO: [Qué pasa si apruebas / si rechazas]
DATO:    [Número o métrica relevante]

✅ Aprobar → [link o comando]
❌ Rechazar → [link o comando]
✏️ Modificar → [instrucción]

⏱️ Expira en: [tiempo]
```

## Circuit Breakers: Gates Automáticos

Hay situaciones donde el sistema debe detenerse solo, sin esperar aprobación:

```
🔴 DETENER SIEMPRE (sin importar el nivel de autonomía):
- Gasto de dinero no autorizado
- Claims médicos o de salud sin validación profesional
- Datos de menores expuestos públicamente
- Error repetido 3+ veces consecutivas
- Tasa de fallo > 20% en las últimas 10 corridas
```

### Implementación básica de circuit breaker

```javascript
// Pseudocódigo — adaptar a tu stack
const CIRCUIT_BREAKERS = [
  { check: (accion) => accion.gasto > 0, mensaje: "Gasto no autorizado detectado" },
  { check: (accion) => accion.errores_consecutivos >= 3, mensaje: "3 errores seguidos" },
  { check: (accion) => contieneKeywords(accion.output, ['diagnóstico', 'tratamiento']), mensaje: "Claim médico detectado" }
]

function verificarCircuitBreaker(accion) {
  const breach = CIRCUIT_BREAKERS.find(cb => cb.check(accion))
  if (breach) {
    detenerSistema()
    notificarFounder(breach.mensaje)
    throw new Error(`Circuit breaker: ${breach.mensaje}`)
  }
}
```

## Herramientas Para Implementar Gates

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Telegram Bot API** | Botones inline de aprobar/rechazar en tu teléfono | core.telegram.org/bots |
| **n8n** | Workflows visuales con nodos de aprobación humana | n8n.io |
| **GitHub Pull Requests** | Gate de código antes de deploy | docs.github.com |
| **Supabase** | Panel de revisión con datos en tiempo real | supabase.com |
| **Resend** | Notificaciones por email con links de acción | resend.com |

## La Filosofía

> **"El humano aprueba. El agente ejecuta."**
>
> No es desconfianza hacia la IA — es diseño inteligente.
> Los mejores sistemas autónomos tienen los mejores gates.
> La autonomía no se otorga: se gana con historial de corridas exitosas.

Ver skill `modelo-l0-l1-l2` para el sistema de certificación de autonomía.
