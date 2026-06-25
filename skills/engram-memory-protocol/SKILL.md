---
name: engram-memory-protocol
description: Protocolo de persistencia de memoria para agentes. Gestiona el guardado, búsqueda y recuperación de decisiones, patrones y contextos de sesión.
---

# 🧠 Engram Memory Protocol

Este skill implementa el estándar de memoria persistente para asegurar que ningún aprendizaje se pierda entre sesiones.

## 📥 Comandos de Memoria

### `mem_save`
Cualquier decisión arquitectónica, bugfix no obvio o preferencia del usuario debe guardarse inmediatamente.
- **Formato:**
  - **What:** Qué se hizo/decidió.
  - **Why:** La razón detrás de la decisión.
  - **Where:** Archivos o módulos afectados.
  - **Learned:** El aprendizaje clave para el futuro.
- **Topic Key:** Usa un string estable para temas recurrentes (ej: `auth-flow`, `ui-tokens`).

### `mem_context` / `mem_search`
Antes de comenzar una tarea similar o al recibir una referencia a un proyecto/problema previo.
- **Regla:** Primero consultar `mem_context` (ficheros locales en `/engram`) y luego `mem_search` (Notion/Jira).

### `mem_session_summary`
Obligatorio antes de despedirse (`notify_user`) si se han realizado cambios significativos.
- **Contenido:** Objetivo, descubrimientos, tareas completadas, próximos pasos y archivos relevantes.

## 📂 Estructura de Almacenamiento
- **Local:** `c:/Users/Gabriel/.antigravity/OpenGravity/engram/`
- **Cloud:** Páginas de Notion mediante MCP.

## 🛠️ Reglas de Oro
1. **Inmediatez:** Guarda el Engram justo después del evento, no esperes al final.
2. **Estructura:** No guardes texto plano; usa el formato What/Why/Where/Learned.
3. **Proactividad:** Si el usuario menciona algo que suena a "ya lo hicimos", busca en el Engram antes de preguntar.

## 🚰 Anti-Fuga Cross-Repo (regla dura)

El ecosistema vive en VARIOS repos (uno por producto, más el repo central del Business OS), pero la memoria central vive en el Engram del repo principal. **Trabajo hecho en un repo secundario que no vuelca su resumen al Engram central = trabajo invisible = fuga de memoria** (ejemplo: un producto desplegado en producción sin que ninguna sesión del Business OS lo supiera).

1. Toda sesión sobre un repo secundario cierra empujando su What/Why/Where/Learned al Engram central (cada engram de proyecto tiene su "protocolo anti-fuga" con el prompt listo).
2. Si esa sesión no tiene acceso a OpenGravity: el humano pega el resumen en una sesión de OpenGravity y esta lo registra.
3. Al INICIAR sesión aquí: si un engram de proyecto externo tiene >7 días sin actualizar y el proyecto está activo, preguntar al humano si hubo avances no registrados.

## 🔁 Aprendizaje Continuo (patrón → skill)

> Adoptado del patrón "Continuous Learning" de ECC/everything-claude-code (ver `agent/recursos/ecc-everything-claude-code.md`).

Al cerrar sesión (`mem_session_summary`), además del resumen, evalúa:
1. **Detección de patrón:** ¿se repitió una secuencia de trabajo ≥2 veces en la sesión (o aparece ya en otro engram)? Ej.: "siempre que producimos un reel hacemos X→Y→Z a mano".
2. **Puntuación de confianza:** ALTA = el patrón se ejecutó igual 3+ veces con buen resultado · MEDIA = 2 veces · BAJA = 1 vez (solo anotar en engram, no actuar).
3. **Promoción:** con confianza ALTA, proponer al humano convertir el patrón en activo permanente — sección nueva en un `SKILL.md` existente, workflow nuevo, o entrada en `agent/recursos/`. Nunca crear el skill sin aprobación (gate humano).
4. **Registro:** la decisión (promovido/descartado) se guarda con topic key `aprendizaje-continuo` para no re-evaluar lo mismo.
