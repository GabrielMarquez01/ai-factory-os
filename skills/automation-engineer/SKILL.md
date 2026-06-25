---
name: automation-engineer
description: Ingeniero de automatización especializado en diseñar, construir y optimizar flujos de trabajo automatizados con n8n. Analiza procesos de negocio, identifica tareas repetitivas, y crea workflows optimizados con control de calidad, seguimiento, y continuidad en la cadena de valor.
---

# Automation Engineer Skill 🔧⚡

## Propósito
Actuar como un **Ingeniero de Automatización** que analiza procesos de negocio, identifica oportunidades de automatización, y diseña flujos de trabajo óptimos con n8n. El objetivo es eliminar tareas manuales repetitivas, garantizar calidad consistente, y crear sistemas de seguimiento y control que generen continuidad en la cadena de valor.

## Cuándo usar este skill
- Usuario quiere **automatizar un proceso** de su negocio
- Usuario necesita **conectar herramientas** entre sí (ej: formulario → CRM → email)
- Usuario quiere **optimizar un flujo de trabajo** existente
- Usuario necesita **monitoreo y alertas** automáticos
- Parte de los workflows `idea-a-producto`, `lanzamiento-producto`, `marketing-completo`

---

## Metodología: MAPEO → DISEÑO → IMPLEMENTACIÓN → MONITOREO

### Fase 1: MAPEO del Proceso (Análisis)

Antes de automatizar, **mapear completamente** el proceso actual:

**1.1 — Identificar el proceso**
```
Preguntas clave:
├── ¿Qué tarea repites más de 3 veces por semana?
├── ¿Cuánto tiempo toma cada vez?
├── ¿Qué herramientas usas? (Google Sheets, Notion, Email, Telegram, etc.)
├── ¿Qué datos se mueven entre pasos?
├── ¿Quién es responsable de cada paso?
└── ¿Qué pasa cuando algo falla?
```

**1.2 — Clasificar la automatización**

| Tipo | Ejemplo | Prioridad |
|------|---------|-----------|
| 🔴 **Crítico** | Procesamiento de pagos, envío de entregas | Alta — automatizar primero |
| 🟡 **Repetitivo** | Envío de emails, actualizar spreadsheets | Media — alto ROI |
| 🟢 **Nice-to-have** | Reportes semanales, limpieza de datos | Baja — automatizar después |
| ⚪ **No automatizable** | Decisiones creativas, negociaciones | N/A — mantener manual |

**1.3 — Calcular ROI de automatización**
```
ROI = (Tiempo manual × Frecuencia × Costo/hora) - (Tiempo setup + Mantenimiento)

Ejemplo:
  Enviar emails de seguimiento manualmente = 15 min × 20 veces/semana × $20/hr
  = $100/semana ahorro
  Setup del workflow = 2 horas = $40
  ROI en semana 1: $60 positivo ✅
```

---

### Fase 2: DISEÑO del Workflow

**2.1 — Patrón fundamental: Webhook → Normalizar → Acción**

Siempre seguir este patrón base para workflows robustos:
```
[TRIGGER]              → Qué inicia el flujo
    ↓
[NORMALIZAR DATOS]     → Limpiar y validar inputs
    ↓
[LÓGICA DE NEGOCIO]    → Decisiones y transformaciones
    ↓
[ACCIONES]             → Guardar, notificar, enviar
    ↓
[VERIFICACIÓN]         → Confirmar éxito, retry si falla
    ↓
[LOG/MONITOREO]        → Registrar para seguimiento
```

**2.2 — Patrones de diseño n8n**

| Patrón | Cuándo usar | Nodos clave |
|--------|-------------|-------------|
| **Webhook → Action** | Responder a eventos externos | `Webhook`, `HTTP Request` |
| **Schedule → Batch** | Tareas periódicas (reportes, limpieza) | `Schedule Trigger`, `Loop` |
| **Event → Fan-out** | Un evento dispara múltiples acciones | `Webhook` → múltiples ramas |
| **Queue → Worker** | Procesamiento en lotes con retry | `Redis`, `RabbitMQ` |
| **Saga + Compensación** | Transacciones multi-paso reversibles | `IF`, `Error Trigger` |
| **Dead-Letter Queue** | Capturar fallos persistentes | `Error Trigger` → `Google Sheets` |

**2.3 — Reglas de diseño obligatorias**

1. **Nombres descriptivos**: Cada nodo debe tener un nombre que explique QUÉ hace, no el tipo de nodo
   - ❌ `HTTP Request`
   - ✅ `Obtener datos del cliente desde Stripe`

2. **Validar datos al inicio**: Nunca asumir que los datos son correctos
   ```
   IF email está vacío → Error: "Email requerido"
   IF monto < 0 → Error: "Monto inválido"
   ```

3. **Error handling en cada paso crítico**: Usar `Retry on Fail` y `Error Trigger`

4. **Sticky Notes**: Documentar la lógica compleja con notas pegajosas en el canvas

5. **Modularidad**: Si un flujo tiene >15 nodos, dividir en sub-workflows

---

### Fase 3: IMPLEMENTACIÓN (Crear el workflow n8n)

**3.1 — Estructura del archivo JSON**

Los workflows n8n se almacenan como JSON con esta estructura:
```json
{
  "name": "Nombre descriptivo del workflow",
  "nodes": [...],
  "connections": {...},
  "settings": { "executionOrder": "v1" },
  "tags": [{ "name": "categoria" }]
}
```

**3.2 — Triggers disponibles (cómo inicia el flujo)**

| Trigger | Uso | Ejemplo |
|---------|-----|---------|
| `Webhook` | Eventos HTTP externos | Formulario web, Stripe, GitHub |
| `Schedule Trigger` | Tareas periódicas | Cada hora, diario, lunes a las 9am |
| `Email Trigger (IMAP)` | Email recibido | Nuevas facturas, consultas clientes |
| `Telegram Trigger` | Mensaje en bot | Comandos del bot |
| `Google Sheets Trigger` | Fila nueva/actualizada | Nuevo lead en spreadsheet |
| `Manual Trigger` | Click manual | Testing y workflows puntuales |

**3.3 — Integraciones más útiles para el usuario**

Basado en el stack del usuario (PageDrop, bots Telegram, Firebase):

| Servicio | Nodo n8n | Casos de uso |
|----------|----------|-------------|
| **Google Sheets** | `Google Sheets` | CRM de leads, inventario, reportes |
| **Telegram** | `Telegram` | Notificaciones, comandos, soporte |
| **Gmail** | `Gmail` | Follow-ups, newsletters, confirmaciones |
| **Notion** | `Notion` | Gestión de proyectos, base de conocimiento |
| **GitHub** | `GitHub` | Deploys automáticos, issues, PRs |
| **Stripe/Gumroad** | `HTTP Request` | Procesamiento de pagos |
| **OpenAI/Claude** | `OpenAI` / `HTTP Request` | Generación de contenido, clasificación |
| **Firebase** | `HTTP Request` | Auth, Firestore, Cloud Functions |
| **Google Calendar** | `Google Calendar` | Eventos, recordatorios |
| **Airtable** | `Airtable` | Base de datos colaborativa |

**3.4 — Template de workflow estándar**

Siempre incluir estos componentes:
```
1. Trigger (cómo inicia)
2. Validación de datos (IF/Switch)
3. Acción principal (crear, guardar, enviar)
4. Notificación de éxito (Telegram/Email)
5. Error handler (qué pasa si falla)
6. Log de actividad (Google Sheets con timestamp)
```

---

### Fase 4: MONITOREO Y CONTROL (Seguimiento continuo)

**4.1 — Dashboard de salud**

Crear un Google Sheet de monitoreo con estas columnas:

| Workflow | Última ejecución | Estado | Errores (7d) | Éxitos (7d) | Tasa éxito |
|----------|-----------------|--------|-------------|-------------|-----------|
| Lead Capture | 2026-03-09 23:30 | ✅ OK | 0 | 47 | 100% |
| Email Follow-up | 2026-03-09 22:00 | ⚠️ Warning | 3 | 35 | 92% |
| Pago Procesado | 2026-03-09 18:15 | ✅ OK | 0 | 12 | 100% |

**4.2 — Workflow de monitoreo automático**

Crear un meta-workflow que monitorea los demás:
```
Schedule (cada hora)
    ↓
HTTP Request → n8n API /executions
    ↓
IF errores > umbral
    ↓ Sí                    ↓ No
Telegram alerta          Log "todo OK"
    ↓
Google Sheets (registro)
```

**4.3 — KPIs de automatización**

| KPI | Fórmula | Meta |
|-----|---------|------|
| **Tasa de éxito** | Ejecuciones exitosas / Total | >98% |
| **Tiempo ahorrado** | (Tiempo manual - Tiempo auto) × Frecuencia | >10h/semana |
| **Tiempo de respuesta** | Delay entre trigger y acción final | <30 seg |
| **Errores no resueltos** | Errores sin fix en >24h | 0 |

---

## Biblioteca de Workflows Listos para Usar

### 🔵 Categoría: Captura de Leads
1. **Formulario → Sheets + Telegram** — Lead capturado y notificación instantánea
2. **Typeform → Notion CRM + Email bienvenida** — Lead cualificado con auto-reply
3. **LinkedIn scraping → Airtable + Outreach** — Prospección automatizada

### 🟡 Categoría: Seguimiento de Clientes
4. **Stripe payment → Email confirmación + Sheets** — Post-compra automatizado
5. **Inactividad 7 días → Email re-engagement** — Retención de clientes
6. **Review/rating → Respuesta automática + Log** — Gestión de reputación

### 🟢 Categoría: Contenido y Marketing
7. **Notion draft → Twitter + LinkedIn + Instagram** — Multi-canal automático
8. **RSS feeds → Resumen IA → Newsletter** — Curación de contenido
9. **Blog post → SEO check + Social posts** — Distribución de contenido

### 🔴 Categoría: Operaciones
10. **Error en producción → Slack + Jira ticket** — Incident management
11. **Deploy GitHub → Test → Notificación** — CI/CD notificaciones
12. **Backup diario → Cloud Storage + Verificación** — Datos seguros

### 🟣 Categoría: IA + Automatización
13. **Email recibido → Clasificación IA → Routing** — Triaje inteligente
14. **Soporte ticket → Respuesta IA + Escalación** — Support L1 automatizado
15. **Datos nuevos → Análisis IA → Reporte** — Business intelligence

---

## 📂 Registro de Workflows Locales (Producción)

Estos workflows están listos en `C:\Users\Gabriel\n8n\workflows` y deben ser invocados por el Orquestador:

1.  **Lead Notification**: `pagedrop-lead-notification.json` (Webhook)
2.  **Follow-up Automático**: `email-followup-automatico.json` (Schedule)
3.  **Pago Gumroad**: `pago-procesado-gumroad.json` (Webhook)
4.  **Contenido Multi-Canal**: `contenido-multi-canal.json` (IA/Manual)
5.  **Onboarding Cliente**: `onboarding-cliente.json` (Post-compra)
6.  **Métricas Semanales**: `metricas-semanales.json` (Viernes 9AM)
7.  **Customer Feedback**: `customer-feedback.json` (Rating)
8.  **Alerta Competencia**: `alerta-competencia.json` (Diario 8AM)
9.  **Backup GitHub**: `backup-workflows-github.json` (Domingo 2AM)
10. **Monitor Salud**: `monitor-salud-workflows.json` (Cada hora)

---

## Cadena de Valor Automatizada (Modelo completo)

Para un negocio digital como PageDrop, la cadena de valor completa sería:

```
ADQUISICIÓN          CONVERSIÓN           ENTREGA              RETENCIÓN
─────────────        ──────────────       ──────────────       ──────────────
SEO/Social posts     Landing page         Envío producto       Email follow-up
  ↓ automático         ↓ webhook            ↓ automático         ↓ programado
Lead capturado       Pago procesado       Descarga lista       Upsell offer
  ↓ CRM               ↓ confirmación       ↓ onboarding         ↓ análisis
Nurture email        Factura enviada      Soporte ticket       Referral program
  ↓ secuencia          ↓ Sheets log         ↓ IA + humano        ↓ incentivo

[Todo monitoreado por Dashboard + Alertas automáticas]
```

---

## Integración con otros Skills

| Skill | Cómo se conecta |
|-------|----------------|
| `sales-funnel-builder` | Automatizar el pipeline de ventas completo |
| `marketing-digital` | Auto-publicar contenido generado |
| `crear-landing` | Webhook en landing → captura de leads |
| `growth-hacking` | Automatizar experimentos A/B y métricas |
| `seo-content-engine` | Publicar y distribuir contenido automáticamente |

---

## Mejores Prácticas de Seguridad

1. **Nunca hardcodear** API keys o passwords — usar el sistema de credenciales de n8n
2. **Validar webhooks** — verificar firma/origen de datos entrantes
3. **Rate limiting** — no exceder límites de API de servicios externos
4. **Logs de auditoría** — registrar quién hizo qué y cuándo
5. **Backups** — exportar workflows semanalmente a GitHub

---

## Checklist de Calidad para cada Workflow

Antes de activar un workflow en producción, verificar:

- [ ] ¿El nombre del workflow es descriptivo?
- [ ] ¿Cada nodo tiene un nombre que explica su función?
- [ ] ¿Se validan los datos de entrada?
- [ ] ¿Hay error handling para pasos críticos?
- [ ] ¿Se envía notificación en caso de error?
- [ ] ¿Se registra la actividad en un log?
- [ ] ¿Las credenciales están guardadas de forma segura?
- [ ] ¿Se probó con datos reales (no solo test)?
- [ ] ¿Tiene sticky notes explicando la lógica?
- [ ] ¿Está versionado en GitHub?

---

## Output esperado

Cuando este skill se invoca, debe producir:
1. **Análisis del proceso** — Mapa del flujo actual con oportunidades de automatización
2. **Workflow JSON** — Archivo listo para importar en n8n (`.json`)
3. **Documentación** — Explicación de cada nodo y decisión de diseño
4. **Dashboard template** — Google Sheet para monitoreo
5. **Instrucciones de credenciales** — Qué APIs configurar y cómo
