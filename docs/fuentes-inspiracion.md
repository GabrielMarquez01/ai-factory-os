# Fuentes e Inspiración

> Enseñar a pescar, no dar el pescado — pero sí decir dónde está el lago.
>
> Este documento lista los repositorios, autores e ideas que dieron forma a la arquitectura,
> los skills y los workflows de este Business OS. Cada uno está linkado con su URL exacta
> para que puedas ir directo a la fuente, aprender el patrón completo, y construir el tuyo.

---

## 1. ECC — Everything Claude Code (ganador del hackathon de Anthropic)

**Autor:** Affaan Mustafa · **Repositorio:** [github.com/affaan-m/ECC](https://github.com/affaan-m/ECC)

El proyecto que inició el movimiento. Affaan pasó 10 meses refinando su configuración personal de Claude Code y lo presentó en el hackathon de Anthropic (Cerebral Valley x Anthropic, feb 2026) — ganó en 8 horas construyendo un producto completo. Hizo público el repositorio después. Llegó a 185K+ estrellas en GitHub.

**Qué aporta:**
- El concepto de "agent harness" como capa estructurada sobre un LLM
- Skills como archivos `.md` que dan conocimiento especializado al agente
- "Instincts" — reglas de comportamiento por defecto que el agente siempre sigue
- Memoria persistente, escaneo de seguridad, soporte para Claude Code + Codex + Cursor

**Qué adoptamos de aquí:**
- La arquitectura SKILL.md (rol, restricciones, proceso, ejemplos, criterios de éxito)
- El concepto de harness como evaluador independiente del modelo
- La idea de instincts como capa que opera antes del razonamiento explícito

---

## 2. Karpathy Protocol — LLM como escritor de su propia wiki

**Autor:** Andrej Karpathy (ex-Tesla AI, ex-OpenAI) · **Gist original:** [gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

Karpathy publicó una idea simple y poderosa: en lugar de usar RAG (donde el LLM busca en documentos y genera desde cero cada vez), dejar que el LLM sea quien *escribe y mantiene* su propia base de conocimiento. La diferencia fundamental es la acumulación — el sistema se vuelve más inteligente con cada sesión, no reinicia.

**Implementaciones de la comunidad:**
- [Astro-Han/karpathy-llm-wiki](https://github.com/Astro-Han/karpathy-llm-wiki) — Compatible con Claude Code, Cursor, Codex
- [skyllwt/AutoSci](https://github.com/skyllwt/AutoSci) — Plataforma de investigación científica completa
- [lucasastorian/llmwiki](https://github.com/lucasastorian/llmwiki) — Implementación open source
- [victor-iyi/llm-os](https://github.com/victor-iyi/llm-os) — LLM como kernel de un sistema operativo (Karpathy-inspired)

**Qué adoptamos de aquí:**
- El skill `karpathy-protocol` — auditoría pre-ejecución antes de cada acción
- El patrón Engram (memoria en Markdown, versionada en git, mantenida por el agente)
- La filosofía: el agente escribe su propia memoria, no el humano
- La evaluación por mutaciones pequeñas con criterios binarios (base del harness)

---

## 3. Paperclip — Orquestador de agentes para "empresas sin humanos"

**Repositorio:** [github.com/paperclipai/paperclip](https://github.com/paperclipai/paperclip) · 42K+ estrellas

Paperclip lanzó en marzo 2026 con una idea provocadora: no gestiones agentes — gestiona una *empresa* de agentes. Tiene org charts, presupuestos, objetivos, gobernanza y accountability. Cruzó 30K estrellas en tres semanas.

**Qué aporta:**
- Orquestación de múltiples agentes como si fueran empleados con roles
- Control de costos (token budgets, throttling automático)
- SKILL.md como formato agnóstico de harness — el mismo archivo funciona en Claude, Codex, runtimes propios
- Companion de escritorio: [fredruss/agent-paperclip](https://github.com/fredruss/agent-paperclip)

**Qué adoptamos de aquí:**
- El modelo de "equipo de agentes" (vs agente único) que documentamos en `agent-team-design`
- La idea de presupuesto y gobernanza como restricción técnica, no política
- La confirmación de que SKILL.md es el formato convergente del ecosistema

---

## 4. wshobson/agents — 194 agentes, 26 categorías, multi-harness

**Repositorio:** [github.com/wshobson/agents](https://github.com/wshobson/agents) · 36.6K+ estrellas

La implementación de referencia del patrón "plugin marketplace" para agentes. Un solo archivo Markdown como fuente de verdad, cinco harnesses distintos que lo consumen nativamente: Claude Code, Codex CLI, Cursor, OpenCode, Gemini CLI, GitHub Copilot.

**Números:** 88 plugins · 194 agentes · 158 skills · 106 comandos · 26 categorías

Las 26 categorías cubren desde ingeniería de software hasta dominios especializados que incluyen astronomía, bioinformática, finanzas cuantitativas, derecho, medicina y más. Es el repositorio que cubre "hasta astronomía" que mencionaste.

**Qué adoptamos de aquí:**
- La arquitectura "una fuente, múltiples harnesses" (lo que hace a nuestro harness AI-agnóstico)
- La organización en categorías que van más allá del software — negocio, legal, ciencia
- El AGENTS.md como registro de autonomía por agente
- La confirmación de que los skills pueden cubrir dominios no técnicos (marketing, legal, operaciones)

---

## 5. VoltAgent — awesome-agent-skills (1000+ skills de equipos oficiales)

**Repositorio:** [github.com/VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)

La colección curada más grande del ecosistema. Skills oficiales publicados por: Anthropic, Google Labs, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, Hugging Face, Figma y más. No generados con IA en masa — construidos por equipos de ingeniería reales.

Compatible con: Claude Code, Codex, Gemini CLI, Cursor.

**También:**
- [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) — 5,400+ skills del registry oficial de OpenClaw

**Qué adoptamos de aquí:**
- La práctica de que cada herramienta (Stripe, Supabase, etc.) tiene su propio skill especializado
- El estándar abierto de Agent Skills como formato interoperable
- La referencia para saber qué skills ya existen antes de crear uno nuevo

---

## 6. anthropics/skills — Repositorio oficial de Anthropic

**Repositorio:** [github.com/anthropics/skills](https://github.com/anthropics/skills)

Skills oficiales de Anthropic que muestran el rango de lo posible: desde aplicaciones creativas (arte, música, diseño) hasta técnicas (testing de apps web, generación de servidores MCP) hasta workflows empresariales.

**Qué adoptamos de aquí:**
- El formato canónico SKILL.md (Anthropic define el estándar)
- La idea de que los skills son "conocimiento especializado", no solo prompts
- Los patrones de restricciones y criterios de éxito binarios

---

## 7. Agent OS / LLM OS — El LLM como sistema operativo

**Karpathy's vision:** Andrej Karpathy describió en X/Twitter que los LLMs están emergiendo como el "kernel" de un nuevo tipo de sistema operativo — donde el modelo de lenguaje coordina herramientas, memoria, procesos y I/O.

**Implementaciones:**
- [victor-iyi/llm-os](https://github.com/victor-iyi/llm-os) — Implementación directa del concepto
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — Agent harness como "OS personal"
- [wshobson/agents](https://github.com/wshobson/agents) — Plugin marketplace como "app store"
- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) — Empresa como OS de agentes

**Qué adoptamos de aquí:**
- La metáfora del Business OS como sistema operativo (no una app, sino la capa que coordina todo)
- El modelo L0/L1/L2 como análogo a permisos de proceso (sin permisos → supervisado → autónomo)
- El orquestador nivel 3 como scheduler del OS — descompone objetivos en procesos

---

## 8. K-Dense-AI/scientific-agent-skills — IA para ciencia

**Repositorio:** [github.com/K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)

140 skills + 100+ bases de datos científicas. Biología, química, medicina, drug discovery. Compatible con Cursor, Claude Code, Codex, Antigravity. Usado por 160,000+ científicos.

**Qué adoptamos de aquí:**
- La prueba de que el formato SKILL.md escala a dominios altamente especializados
- El patrón de skills que incluyen acceso a bases de datos externas (no solo el modelo)
- La arquitectura para skills de investigación (lo que inspiró `latam-market-research`)

---

## 9. alirezarezvani/claude-skills — 337 skills multi-dominio

**Repositorio:** [github.com/alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)

337 skills + 30 agentes + 70 comandos personalizados. Cubre: ingeniería, marketing, producto, compliance, advisory C-level, investigación, operaciones de negocio, finanzas comerciales, productividad diaria.

**Qué adoptamos de aquí:**
- La expansión a dominios de negocio no técnicos como skills de primera clase
- El patrón de agentes C-level (CEO, CFO, CMO) como inspiración para `meta-agent-ceo` y `strategic-thinking-partner`

---

## 10. travisvn/awesome-claude-skills — Directorio curado de la comunidad

**Repositorio:** [github.com/travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)

Lista curada de skills, recursos y herramientas de la comunidad de Claude Code.

---

## 11. SaaS Factory V5 — El framework que opera este Business OS

**Autor:** Comunidad (introducido por Daniel en saas-factory-setup) · Repo de Gabriel: [github.com/GabrielMarquez01/ai-factory-os](https://github.com/GabrielMarquez01/ai-factory-os)

El meta-framework de construcción sobre el que corre este Business OS. Skills especializados para construcción de SaaS: auth, pagos, emails, PWA, landing pages, IA, testing, deploy.

---

## 12. business-os-template — Template de Daniel (comunidad)

**Repositorio:** [github.com/GabrielMarquez01/business-os-template](https://github.com/GabrielMarquez01/business-os-template)

Template genérico de Business OS de la comunidad de SaaS Factory. Incluye Mission Control dashboard, ClaudeClaw (Claude Agent SDK) y Finance OS. El patrón que este repositorio instancia con skills y workflows específicos.

---

## El Patrón Convergente

Todos estos repositorios, aunque fueron creados independientemente, convergieron en el mismo formato:

```
SKILL.md
├── Frontmatter (nombre, descripción)
├── El problema que resuelve
├── El proceso (pasos concretos)
├── Ejemplos de uso
├── Restricciones (qué no hacer)
└── Criterios de éxito (binarios: PASA / FALLA)
```

Este es el estándar abierto de Agent Skills — compatible con Claude Code, Codex CLI, Cursor, Gemini CLI / Antigravity, OpenCode, GitHub Copilot y cualquier agente que lea Markdown.

**La lección:** el formato importa más que el contenido. Un SKILL.md bien escrito funciona en 6+ agentes distintos sin modificaciones.
