/**
 * templates/api/track/route.ts
 *
 * Analytics event tracking endpoint.
 * Receives a "what just happened" event from the frontend and stores it in Supabase.
 *
 * Usage: POST /api/track  { event: "signup", properties: { plan: "free" } }
 *
 * Adapt:
 *   - NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY  → your Supabase project
 *   - Table name `eventos` matches templates/supabase/schema.sql
 */

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Supabase (service role — can bypass RLS to write analytics) ──────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Validation ────────────────────────────────────────────────────────────────
const EventSchema = z.object({
  event: z.string().min(1).max(100),
  user_id: z.string().uuid().optional(),   // null for anonymous
  session_id: z.string().optional(),
  properties: z.record(z.unknown()).optional().default({}),
  url: z.string().url().optional(),
  referrer: z.string().optional(),
});

// ── Common events you'll want to track ───────────────────────────────────────
// signup, login, onboarding_step_completed, first_value_reached,
// checkout_started, purchase, feature_used, subscription_canceled, share

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid event payload", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { event, user_id, session_id, properties, url, referrer } = parsed.data;

  // Enrich with server-side context
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
  const user_agent = req.headers.get("user-agent") ?? null;

  const { error } = await supabase.from("eventos").insert({
    nombre: event,
    usuario_id: user_id ?? null,
    session_id: session_id ?? null,
    propiedades: { ...properties, url, referrer },
    ip,
    user_agent,
  });

  if (error) {
    console.error("[track] Supabase insert error:", error.message);
    // Return 200 anyway — never block the user over analytics
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}

// ── Frontend helper (copy to lib/track.ts) ───────────────────────────────────
/*
export async function track(
  event: string,
  properties: Record<string, unknown> = {}
) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        properties,
        url: window.location.href,
        referrer: document.referrer,
      }),
    });
  } catch {
    // Never throw — analytics failures must be silent
  }
}

// Usage in component:
// await track("checkout_started", { plan: "monthly", price: 99 });
*/
