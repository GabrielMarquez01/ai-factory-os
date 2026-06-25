# Setup — De cero a Business OS operativo en 30 minutos

> Este archivo es el día 1. Sigue los pasos en orden.
> Al final tendrás: base de datos lista, agente de chat funcionando, harness corriendo.

---

## Prerequisitos

- Node.js 18+ instalado
- Cuenta en Supabase (gratis): supabase.com
- Cuenta en Groq (gratis): console.groq.com
- Cuenta en Resend (gratis): resend.com
- Claude Code, Codex, Cursor, o Antigravity — cualquiera funciona

---

## Paso 1 — Clonar y configurar variables de entorno

```bash
git clone https://github.com/TU_USUARIO/business-os.git mi-business-os
cd mi-business-os
cp .env.example .env.local
```

Abre `.env.local` y llena al menos estas 4 variables para empezar:

```
NEXT_PUBLIC_SUPABASE_URL=      # de supabase.com → tu proyecto → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY= # mismo lugar
SUPABASE_SERVICE_ROLE_KEY=     # mismo lugar (solo backend)
GROQ_API_KEY=                  # de console.groq.com
```

Las demás (Resend, Polar, Stripe) las puedes agregar después, cuando las necesites.

---

## Paso 2 — Crear la base de datos

1. Ve a tu proyecto en supabase.com → **SQL Editor**
2. Copia el contenido de `templates/supabase/schema.sql`
3. Pégalo en el editor y ejecuta
4. Verifica que se crearon las tablas: `perfiles`, `eventos`, `email_queue`, `base_conocimiento`

Eso es todo. RLS ya está configurado en el schema.

---

## Paso 3 — Copiar los templates de API a tu proyecto Next.js

Si ya tienes un proyecto Next.js:

```bash
# Copiar el endpoint de chat con RAG
cp templates/api/chat/route.ts TU_PROYECTO/src/app/api/chat/route.ts

# Copiar analytics
cp templates/api/track/route.ts TU_PROYECTO/src/app/api/track/route.ts

# Copiar webhook de pagos
mkdir -p TU_PROYECTO/src/app/api/webhooks/payment
cp templates/api/webhooks/payment/route.ts TU_PROYECTO/src/app/api/webhooks/payment/route.ts

# Copiar unsubscribe
cp templates/api/unsubscribe/route.ts TU_PROYECTO/src/app/api/unsubscribe/route.ts
```

Si no tienes un proyecto Next.js aún, créalo:

```bash
npx create-next-app@latest mi-app --typescript --tailwind --app
```

---

## Paso 4 — Instalar dependencias necesarias para los templates

```bash
cd TU_PROYECTO
npm install @supabase/supabase-js groq-sdk zod
npm install react-email @react-email/components  # para los templates de email
```

---

## Paso 5 — Adaptar el agente a tu nicho

Los templates tienen placeholders que debes reemplazar:

```bash
# En templates/api/chat/route.ts — busca y reemplaza:
SYSTEM_PROMPT  → Las instrucciones específicas de tu agente
```

```bash
# En templates/email/*.tsx — busca y reemplaza:
BRAND_NAME     → El nombre de tu producto
BRAND_COLOR    → Tu color principal (hex)
APP_URL        → Tu URL de producción
SUPPORT_EMAIL  → Tu email de soporte
```

```bash
# En skills/*.md — busca y reemplaza en los relevantes:
[tu nicho]     → Tu área de negocio
[avatar]       → Tu cliente ideal
[vocabulario]  → Las palabras específicas de tu comunidad
```

---

## Paso 6 — Verificar con el harness

```bash
cd templates/harness
npm install node-fetch dotenv  # solo la primera vez

# Probar contra tu API local (inicia tu app primero)
node run-harness.js

# O probar directamente con Groq sin levantar nada
GROQ_API_KEY=gsk_... node run-harness.js --provider groq
```

Resultado esperado:
```
🧪 Harness Universal — provider: groq  cases: 5
────────────────────────────────────────────────────────────
[TC-01] Consulta estándar dentro del dominio ... ✅ PASS
[TC-02] Señal de emergencia médica debe escalar ... ✅ PASS
[TC-03] Pregunta fuera del dominio ... ✅ PASS
[TC-04] Vocabulario del nicho se usa correctamente ... ✅ PASS
[TC-05] Prompt injection no expone instrucciones ... ✅ PASS

Score: 100% — ✅ Listo para certificar L1
```

Si algún caso falla, adapta el `test-cases.json` a tu nicho y ajusta el system prompt de tu agente hasta que pase.

---

## Paso 7 — Registrar tu agente en AGENTS.md

Abre `AGENTS.md` y agrega tu primer agente:

```markdown
| agente-bienvenida | Responde preguntas de nuevos usuarios | L0 | Manual | 2026-XX-XX | 0 |
```

Empieza en L0 (supervisión total). Sube a L1 después de 10 corridas sin incidentes.

---

## Paso 8 — Conectar con tu agente de IA

Coloca el `CLAUDE.md` de este repo en la raíz de tu proyecto para que Claude Code (o cualquier agente compatible) lo lea automáticamente:

```bash
cp CLAUDE.md TU_PROYECTO/CLAUDE.md
```

Desde ese momento, cuando abras Claude Code en tu proyecto, el agente conoce todos los skills disponibles y sabe cuándo invocar cada uno.

---

## Checklist de día 1

- [ ] Variables de entorno configuradas (mínimo 4)
- [ ] Schema SQL ejecutado en Supabase
- [ ] Al menos 1 endpoint de API copiado y funcionando
- [ ] Harness corriendo con score > 60%
- [ ] AGENTS.md con tu primer agente registrado en L0
- [ ] CLAUDE.md en la raíz de tu proyecto

---

## Siguiente paso

Una vez que el día 1 está completo, el orden recomendado es:

```
Día 1:  Setup (este archivo)
Día 2:  Adaptar el agente de chat a tu nicho → skill agente-frontoffice
Día 3:  Configurar email nurturing → skill email-nurturing-postcompra
Semana 2: Primera venta → skill funnel-infoproducto o freemium-conversion
Semana 3: Medir resultados → skill analytics-dashboard
```

Lee `docs/como-adaptar.md` para la guía completa de personalización.
