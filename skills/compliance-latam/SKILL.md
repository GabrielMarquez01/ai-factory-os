---
name: compliance-latam
description: Mapa de cumplimiento legal mínimo para lanzar un negocio digital en México y LatAm. Privacidad, aviso legal, datos de menores, y las reglas que el 90% de los fundadores descubren demasiado tarde.
---

# ⚖️ Compliance LATAM

> **Analogía:** El cumplimiento legal es como los cinturones de seguridad — no los usas porque esperas tener un accidente, los usas porque si ocurre uno, son lo que te protege.
>
> Lanzar sin compliance no te detiene hoy. Te detiene cuando tienes traction y algo sale mal.

## El Problema

La mayoría de los fundadores independientes lanzan sin pensar en el marco legal — y lo descubren en el peor momento:
- Un usuario exige borrar sus datos y no tienes proceso
- Apple o Google rechazan tu app por no tener aviso de privacidad
- Un cliente molesto amenaza con denunciarte al INAI
- Tu pasarela de pago congela la cuenta por documentación faltante

Esto no es alarmismo. Es la realidad del ecosistema digital en México y LatAm.

---

## El Marco Legal Mínimo Para México

### 1. Aviso de Privacidad (OBLIGATORIO)

**Ley aplicable:** LFPDPPP — Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
**Autoridad reguladora:** INAI (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).

**Clasificación de datos por nivel de riesgo:**

| Tipo de dato | Nivel de riesgo | Ejemplos |
|-------------|----------------|---------|
| Nombre + email | Bajo | Newsletter, login |
| Teléfono + ubicación | Medio | Entregas, soporte |
| Datos de salud | **Alto** | Historial médico, síntomas, diagnósticos |
| Datos de menores de edad | **Muy alto** | Apps educativas, familiares, de seguimiento |
| Datos financieros | **Alto** | Tarjetas, CLABE, ingresos |
| Datos biométricos | **Muy alto** | Reconocimiento facial, huella digital |

**Contenido mínimo del aviso de privacidad:**

```markdown
1. IDENTIDAD DEL RESPONSABLE
   Quién eres: nombre completo (persona física) o razón social (empresa)
   Domicilio físico o dirección de contacto

2. DATOS QUE RECOLECTAS
   Lista específica de qué datos pides y cómo los obtienes

3. FINALIDAD
   Para qué usas esos datos (con claridad, no términos vagos)

4. TRANSFERENCIAS
   ¿Compartes datos con terceros? ¿Con quiénes y para qué?
   (Ej: Stripe para procesar pagos, Supabase para almacenamiento)

5. DERECHOS ARCO
   Cómo el usuario puede ejercer sus derechos (ver sección siguiente)

6. CAMBIOS AL AVISO
   Cómo notificarás si el aviso cambia
```

### 2. Derechos ARCO: Los Derechos de Tus Usuarios

Todo titular de datos en México tiene 4 derechos fundamentales:

| Derecho | Qué significa | Tu obligación técnica |
|---------|-------------|----------------------|
| **A**cceso | Saber qué datos tienes de ellos | API o panel que devuelva sus datos |
| **R**ectificación | Corregir datos incorrectos | Formulario o proceso de actualización |
| **C**ancelación | Borrar sus datos (derecho al olvido) | Botón "Borrar mi cuenta" funcional |
| **O**posición | Oponerse a ciertos usos | Mecanismo de opt-out |

**Plazo de respuesta:** máximo 20 días hábiles.

**Implementación mínima en una app:**

```javascript
// Ruta para ejercer derechos ARCO
// DELETE /api/usuario/cuenta
async function borrarCuenta(userId) {
  // 1. Anonimizar datos personales (no siempre puedes borrar todo)
  await db.update('usuarios', userId, {
    email: `deleted_${userId}@borrado.com`,
    nombre: 'Usuario eliminado',
    datos_personales: null,
    deleted_at: new Date()
  })
  
  // 2. Borrar datos sensibles inmediatamente
  await db.delete('datos_salud', { usuario_id: userId })
  await db.delete('historial_pagos', { usuario_id: userId })
  
  // 3. Marcar para hard delete después de 30 días (por si pide reversión)
  await encolarTarea('hard_delete', userId, diasEnMs(30))
  
  // 4. Confirmar al usuario por email
  await enviarEmail(email, 'confirmacion-borrado')
}
```

### 3. Datos de Menores de Edad: Reglas Adicionales

Si tu producto involucra a usuarios menores de 18 años — ya sea directamente o porque adultos registran datos sobre ellos:

**LFPDPPP (Art. 9):**
- Requiere consentimiento explícito del padre/madre/tutor legal
- No se puede solicitar datos al menor directamente
- El consentimiento debe ser informado, no implícito

**Plataformas (App Store / Google Play / YouTube):**
- Si el producto está dirigido a menores → declararlo en la ficha y en el aviso
- No se puede usar publicidad personalizada con menores
- Cada plataforma tiene sus propias reglas adicionales — revisar antes de publicar

**Principio general:** si tu producto toca datos de menores de cualquier forma, consulta a un abogado especializado en privacidad antes de lanzar. Las consecuencias de incumplimiento en este segmento son las más severas.

### 4. Términos y Condiciones

Diferente al aviso de privacidad. Los T&C regulan la relación comercial.

**Mínimos para un producto digital:**

```markdown
1. Quién presta el servicio y quién lo recibe
2. Qué incluye el servicio y qué NO incluye
3. Condiciones de pago: precios, ciclos de cobro, impuestos
4. Política de cancelación y reembolsos (sé específico)
5. Propiedad intelectual: tu contenido es tuyo
6. Limitación de responsabilidad (hasta dónde eres responsable)
7. Ley aplicable: México, y el estado si aplica
8. Cómo notificas cambios a los términos
```

### 5. Consentimiento de Cookies

Si usas Google Analytics, Meta Pixel, o cualquier herramienta de tracking:

- El usuario debe ser informado ANTES de que las cookies se activen
- Debe poder aceptar o rechazar (no solo "aceptar todo")
- Debes guardar registro de quién aceptó qué (consent log)

---

## Checklist de Lanzamiento

```
ANTES DE PUBLICAR:
□ Aviso de privacidad publicado y visible (link en footer de TODAS las páginas)
□ Términos y condiciones publicados
□ Email de contacto para derechos ARCO activo y con respuesta
□ Banner de cookies si usas tracking (Analytics, Pixel, etc.)
□ Proceso técnico de borrado de cuenta funcionando

ANTES DE ACEPTAR PAGOS:
□ RFC si eres persona física con actividad empresarial
□ Política de reembolsos clara y visible ANTES del checkout
□ Consentimiento de T&C activo (checkbox antes del pago, no después)
□ Datos del responsable en el aviso de privacidad actualizados

SI TU PRODUCTO INVOLUCRA MENORES DE EDAD:
□ Consentimiento del tutor legal en el flujo de registro
□ Sin publicidad personalizada
□ Declaración en tiendas de apps si corresponde
□ Asesoría legal especializada antes de lanzar
```

---

## Regla de Diseño: Minimización de Datos

> **No recolectes datos que no necesitas.**

Cada campo de formulario que no es estrictamente necesario es:
- Un riesgo legal adicional
- Una carga de cumplimiento
- Una razón para que el usuario abandone

Antes de agregar cualquier campo: pregunta "¿qué decisión de negocio no puedo tomar sin este dato?"
Si no tienes respuesta clara → no recolectes el dato.

---

## Herramientas para Generar los Documentos Base

Estas no reemplazan a un abogado, pero dan un punto de partida sólido:

| Herramienta | Uso | Link |
|-------------|-----|------|
| **INAI — Generador oficial** | Aviso de privacidad para México | inai.org.mx |
| **iubenda** | Generador multi-jurisdicción (MX, EU, US) | iubenda.com |
| **Termly** | Privacidad + términos + cookies integrados | termly.io |
| **CookieYes** | Banner de cookies con consent log | cookieyes.com |
| **SaaS Factory V5 — skill compliance** | Implementación técnica en Next.js (SaaS Factory) | (skill del ecosistema) |

---

## La Regla Más Importante

> El dato más seguro es el que nunca recolectaste.
>
> La ley no te sanciona por proteger demasiado la privacidad.
> Sí te sanciona por no protegerla suficiente.
