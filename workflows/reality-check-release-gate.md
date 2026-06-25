# Workflow: Reality Check Release Gate

> **ID:** WF-020 · **Versión:** 1.0 · **Fecha:** 2026-06-14
> **Nivel:** L2 inmediato (su función es invariante — verificar evidencia no requiere aprendizaje)
> **Ejecutor:** Reality Checker (rol de coordinación COO IA)
> **Cuándo usar:** Antes de declarar cualquier entregable como "listo" o de subir un workflow de L1 a L2
> **Default:** NEEDS WORK si no hay evidencia concreta. NUNCA READY por asumir.

---

## Propósito

Cerrar el gap entre "creo que está listo" y "está listo con evidencia". En un ecosistema que opera semi-autónomo, una certificación falsa es más costosa que un retraso. Este workflow es el portero.

**Regla de oro:** Si hay duda, el veredicto es NEEDS WORK. Solo es READY cuando la evidencia lo confirma, no cuando parece que sí.

---

## Cuándo se activa

- Antes de publicar contenido en canales reales
- Antes de activar una campaña nueva
- Antes de certificar un workflow como L2
- Antes de entregar un skill, documento o herramienta como "listo"
- Cuando un pod reporta que algo "ya está funcionando"
- Cuando el COO IA necesita confirmar estado real vs estado reportado

---

## Checklist de Verificación

### BLOQUE A — Existencia del Entregable

```
[ ] A1. ¿El entregable existe físicamente?
       → Archivo: ruta exacta ___
       → URL: link que abre ___
       → Screenshot: captura del estado final ___
       Si ninguno existe → BLOCKED (no hay qué revisar)
```

### BLOQUE B — Funcionamiento

```
[ ] B1. ¿Se puede abrir/ejecutar/ver?
       → Abrí el archivo / URL / herramienta y funcionó: Sí / No
       → Si no funciona: describir error exacto ___

[ ] B2. ¿Hace lo que dice que hace?
       → Descripción del entregable: ___
       → Lo que realmente hace al usarlo: ___
       → ¿Coinciden? Sí / No / Parcialmente
```

### BLOQUE C — Evidencia Concreta

```
[ ] C1. ¿Hay evidencia de que funciona, no solo de que existe?
       → Log de ejecución: ___
       → Screenshot del resultado: ___
       → Métrica registrada: ___
       → Testimonio o prueba de uso real: ___
       Si no hay evidencia → NEEDS WORK (existir ≠ funcionar)
```

### BLOQUE D — Claims y Compliance

```
[ ] D1. ¿El contenido contiene afirmaciones médicas?
       → Buscar: "cura", "previene", "trata", "elimina", "garantiza salud"
       → Si sí → identificar línea exacta → NEEDS WORK hasta corregir

[ ] D2. ¿Hay bebés reales identificables?
       → Revisar imágenes/videos incluidos
       → Si sí → reemplazar con ilustración/personaje → NEEDS WORK

[ ] D3. ¿Las promesas son verificables?
       → Revisar CTAs y headlines
       → "Tu bebé aprenderá X en Y días" sin respaldo → NEEDS WORK
       → "Apoya el desarrollo sensorial" con contexto educativo → OK
```

### BLOQUE E — Revisión de Plataforma (si aplica a contenido)

```
[ ] E1. ¿Se revisó en mobile? (si es contenido digital o landing)
       → Dispositivo usado para revisar: ___
       → Resultado: OK / Problema: ___

[ ] E2. ¿Se revisó en desktop?
       → Resultado: OK / Problema: ___

[ ] E3. ¿El link de compra/CTA funciona en ambas plataformas?
       → Mobile: OK / No funciona
       → Desktop: OK / No funciona
```

### BLOQUE F — Métricas Baseline (si aplica a campañas/workflows)

```
[ ] F1. ¿Están registradas las métricas de referencia?
       → Baseline antes de lanzar: ___
       → Fuente de datos: ___
       → ¿Se puede medir el delta? Sí / No

[ ] F2. ¿Hay definición de "éxito" para este entregable?
       → Criterio de éxito: ___
       → Quién valida el criterio: ___
```

---

## Veredictos

### ✅ READY
**Condición:** Bloques A, B y C completos con evidencia positiva. Bloques D, E, F completos si aplican.

**Acción:** 
- Documentar el veredicto con fecha y evidencia adjunta
- Si es certificación L2 de workflow: notificar a Gabriel para aprobación final
- Actualizar el tablero con estado "certificado"

---

### 🔧 NEEDS WORK
**Condición:** Cualquier bloque incompleto o con resultado negativo. También si hay duda sin resolver.

**Acción:**
- Listar exactamente qué falta o qué falló (bloque + item específico)
- Devolver al responsable con lista de correcciones
- Reagendar verificación tras correcciones

**Formato de devolución:**
```
NEEDS WORK — [nombre del entregable] — [fecha]

Pendientes:
1. [Bloque X, item Y]: [qué falta o qué está mal]
2. [Bloque X, item Y]: [qué falta o qué está mal]

Para reagendar: avisar cuando estén corregidos los puntos anteriores.
```

---

### 🔴 BLOCKED
**Condición:** El entregable no existe, no se puede acceder, o hay un impedimento externo que impide la revisión.

**Acción:**
- Documentar el bloqueo con causa exacta
- Escalar al COO IA
- Si el bloqueo involucra dinero o compliance → escalar directamente a Gabriel

**Formato:**
```
BLOCKED — [nombre del entregable] — [fecha]

Causa del bloqueo: ___
Qué se necesita para desbloquear: ___
Quién puede resolver: ___
```

---

## Uso para Certificación L1 → L2

Cuando un workflow o pod solicita subir de nivel:

**Requisitos adicionales para certificar L2:**
1. ✅ Veredicto READY en este checklist
2. ✅ Al menos 3 corridas exitosas (para workflows) o 10 entregas sin correcciones (para pods)
3. ✅ Gabriel otorga certificación explícita ("certificado L2 — corre solo")

**Sin los 3 requisitos: el nivel se mantiene en L1.**

---

## Notas de Uso

- Este workflow no hace suposiciones. Si el responsable dice "ya lo revisé", pide la evidencia igualmente.
- Los Bloques D (compliance) y A (existencia) son obligatorios siempre, sin excepción.
- Los Bloques E y F solo aplican cuando el contexto lo requiere (contenido digital = E; campañas = F).
- El Reality Checker no tiene autoridad para subir un workflow a L2 solo. Su veredicto READY es condición necesaria, no suficiente. Gabriel siempre certifica.
