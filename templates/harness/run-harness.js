#!/usr/bin/env node
/**
 * templates/harness/run-harness.js
 *
 * AI-Agnostic Harness Runner
 *
 * Runs the test cases in test-cases.json against ANY chat endpoint
 * — local or remote, any AI model.
 *
 * Supports:
 *   - Your own Next.js API route (templates/api/chat/route.ts)
 *   - OpenAI   (--provider openai)
 *   - Groq     (--provider groq)
 *   - Gemini   (--provider gemini)
 *   - Anthropic/Claude (--provider anthropic)
 *   - Ollama   (--provider ollama)  ← local, free
 *   - Any OpenAI-compatible endpoint (--provider openai-compatible --base-url http://...)
 *
 * Usage:
 *   node run-harness.js                                           # test your own API
 *   node run-harness.js --provider groq --model llama-3.3-70b-versatile
 *   node run-harness.js --provider openai --model gpt-4o-mini
 *   node run-harness.js --provider ollama --model llama3.2       # local, no API key
 *   node run-harness.js --cases ./my-cases.json                  # custom cases
 *   node run-harness.js --filter TC-02                           # single case
 *
 * Environment variables:
 *   OPENAI_API_KEY, GROQ_API_KEY, GEMINI_API_KEY, ANTHROPIC_API_KEY
 *   (or set them in .env — the harness loads .env automatically)
 *
 * Install deps:
 *   npm install node-fetch dotenv
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env if present ─────────────────────────────────────────────────────
try {
  const dotenv = await import("dotenv");
  dotenv.config();
} catch {
  // dotenv optional
}

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};
const has = (flag) => args.includes(flag);

const provider  = get("--provider")  ?? "local";
const model     = get("--model")     ?? null;
const baseUrl   = get("--base-url")  ?? null;
const casesFile = get("--cases")     ?? resolve(__dirname, "test-cases.json");
const filter    = get("--filter")    ?? null;
const verbose   = has("--verbose");

// ── Load test cases ───────────────────────────────────────────────────────────
let allCases;
try {
  allCases = JSON.parse(readFileSync(casesFile, "utf-8"));
} catch (e) {
  console.error(`Cannot read test cases: ${casesFile}`);
  process.exit(1);
}
const cases = filter
  ? allCases.filter((c) => c.id === filter || c.type === filter)
  : allCases;

// ── Provider adapters ─────────────────────────────────────────────────────────
// Each adapter receives { mensaje, historial, model } and returns
// { respuesta: string, meta: object }

const adapters = {
  // ── Your own API (default) ────────────────────────────────────────────────
  local: async ({ mensaje, historial }) => {
    const url = process.env.LOCAL_API_URL ?? "http://localhost:3000/api/chat";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje, historial }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  // ── OpenAI / OpenAI-compatible ─────────────────────────────────────────────
  openai: async ({ mensaje, historial, model: m }) => {
    const url = baseUrl
      ? `${baseUrl}/chat/completions`
      : "https://api.openai.com/v1/chat/completions";
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey && !baseUrl) throw new Error("OPENAI_API_KEY not set");

    const messages = [
      ...historial.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: mensaje },
    ];
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: m ?? model ?? "gpt-4o-mini",
        messages,
        temperature: 0.3,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return { respuesta: data.choices[0].message.content, meta: {} };
  },

  // ── Groq ──────────────────────────────────────────────────────────────────
  groq: async (opts) =>
    adapters["openai-compatible"]({
      ...opts,
      _url: "https://api.groq.com/openai/v1/chat/completions",
      _key: process.env.GROQ_API_KEY,
      _model: opts.model ?? model ?? "llama-3.3-70b-versatile",
    }),

  // ── Anthropic Claude ──────────────────────────────────────────────────────
  anthropic: async ({ mensaje, historial, model: m }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

    const messages = [
      ...historial.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: mensaje },
    ];
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: m ?? model ?? "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return { respuesta: data.content[0].text, meta: {} };
  },

  // ── Gemini ─────────────────────────────────────────────────────────────────
  gemini: async ({ mensaje, model: m }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");
    const mdl = m ?? model ?? "gemini-2.0-flash";
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${mdl}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: mensaje }] }],
        }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { respuesta: data.candidates[0].content.parts[0].text, meta: {} };
  },

  // ── Ollama (local, free) ───────────────────────────────────────────────────
  ollama: async ({ mensaje, historial, model: m }) => {
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: m ?? model ?? "llama3.2",
        messages: [
          ...historial.map((h) => ({ role: h.role, content: h.content })),
          { role: "user", content: mensaje },
        ],
        stream: false,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { respuesta: data.message.content, meta: {} };
  },

  // ── Generic OpenAI-compatible (internal) ──────────────────────────────────
  "openai-compatible": async ({ mensaje, historial, model: m, _url, _key, _model }) => {
    const messages = [
      ...historial.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: mensaje },
    ];
    const res = await fetch(_url ?? baseUrl + "/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_key ?? process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: _model ?? m ?? model ?? "gpt-4o-mini",
        messages,
        temperature: 0.3,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return { respuesta: data.choices[0].message.content, meta: {} };
  },
};

// ── Criterion evaluators ──────────────────────────────────────────────────────
function evaluate(criterion, response) {
  const text = (response.respuesta ?? "").toLowerCase();
  const meta = response.meta ?? {};

  switch (criterion.check) {
    case "response_contains_any":
      return criterion.values.some((v) => text.includes(v.toLowerCase()));

    case "response_not_contains_any":
      return !criterion.values.some((v) => text.includes(v.toLowerCase()));

    case "response_length_max":
      return (response.respuesta ?? "").length <= criterion.value;

    case "response_length_min":
      return (response.respuesta ?? "").length >= criterion.value;

    case "meta_field_equals":
      return meta[criterion.field] === criterion.value;

    case "meta_field_truthy":
      return !!meta[criterion.field];

    case "meta_field_falsy":
      return !meta[criterion.field];

    case "response_matches_regex": {
      const re = new RegExp(criterion.pattern, "i");
      return re.test(response.respuesta ?? "");
    }

    default:
      console.warn(`Unknown check type: ${criterion.check}`);
      return false;
  }
}

// ── Runner ────────────────────────────────────────────────────────────────────
const adapter = adapters[provider];
if (!adapter) {
  console.error(`Unknown provider: "${provider}". Available: ${Object.keys(adapters).join(", ")}`);
  process.exit(1);
}

console.log(`\n🧪 Harness Universal — provider: ${provider}  cases: ${cases.length}\n`);
console.log("─".repeat(60));

let passed = 0;
let failed = 0;
const failures = [];

for (const tc of cases) {
  process.stdout.write(`[${tc.id}] ${tc.description} ... `);

  let response;
  try {
    response = await adapter({
      mensaje: tc.input.mensaje,
      historial: tc.input.historial ?? [],
      model,
    });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    failed++;
    failures.push({ id: tc.id, reason: `Adapter error: ${err.message}` });
    continue;
  }

  if (verbose) {
    console.log(`\n  Response: "${response.respuesta?.slice(0, 120)}..."`);
  }

  const criteriaResults = tc.criteria.map((c) => ({
    ...c,
    passed: evaluate(c, response),
  }));
  const allPassed = criteriaResults.every((c) => c.passed);
  const testPasses = allPassed === (tc.expected_result === "PASS");

  if (testPasses) {
    console.log("✅ PASS");
    passed++;
  } else {
    console.log("❌ FAIL");
    failed++;
    const failedCriteria = criteriaResults.filter((c) => !c.passed);
    failures.push({
      id: tc.id,
      criteria: failedCriteria.map((c) => c.description),
      response: response.respuesta?.slice(0, 200),
    });
    if (verbose) {
      failedCriteria.forEach((c) =>
        console.log(`  ↳ Criterion failed: ${c.description}`)
      );
    }
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("─".repeat(60));
console.log(`\nResultado: ${passed}/${cases.length} casos pasaron\n`);

if (failures.length > 0) {
  console.log("Fallas:");
  failures.forEach((f) => {
    console.log(`  ❌ ${f.id}`);
    if (f.reason) console.log(`     Motivo: ${f.reason}`);
    if (f.criteria) f.criteria.forEach((c) => console.log(`     - ${c}`));
    if (f.response) console.log(`     Respuesta: "${f.response}"`);
  });
  console.log();
}

const score = Math.round((passed / cases.length) * 100);
console.log(`Score: ${score}% — ${score >= 80 ? "✅ Listo para certificar L1" : score >= 60 ? "⚠️  Necesita ajustes" : "❌ Requiere trabajo significativo"}\n`);

process.exit(failed > 0 ? 1 : 0);
