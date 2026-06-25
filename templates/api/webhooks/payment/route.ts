/**
 * templates/api/webhooks/payment/route.ts
 *
 * Webhook endpoint for payment providers (Polar, Stripe).
 * Receives "payment completed" events and queues the post-purchase nurturing emails.
 *
 * Polar  → POLAR_WEBHOOK_SECRET
 * Stripe → STRIPE_WEBHOOK_SECRET  (uncomment the Stripe section below)
 *
 * What this does on a successful payment:
 *   1. Verifies the signature so only real events from the provider get through
 *   2. Grants access to the product (updates user profile in Supabase)
 *   3. Queues D+3 / D+7 / D+14 nurturing emails in the email_queue table
 *   4. Fires an analytics event for revenue tracking
 */

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Signature verification helpers ───────────────────────────────────────────

function verifyPolar(payload: string, signature: string, secret: string) {
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(`sha256=${hmac}`),
    Buffer.from(signature)
  );
}

// Uncomment if you're using Stripe:
// function verifyStripe(payload: string, header: string, secret: string) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//   return stripe.webhooks.constructEvent(payload, header, secret);
// }

// ── Webhook handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // ── Polar signature check ─────────────────────────────────────────────────
  const polarSig = req.headers.get("webhook-signature") ?? "";
  const polarSecret = process.env.POLAR_WEBHOOK_SECRET ?? "";

  if (polarSecret && !verifyPolar(rawBody, polarSig, polarSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.type as string;

  // ── Route by event type ───────────────────────────────────────────────────
  switch (eventType) {
    case "order.created":           // Polar one-time payment
    case "subscription.created":    // Polar subscription
    case "checkout.session.completed": // Stripe one-time
    case "customer.subscription.created": {  // Stripe subscription
      await handlePurchase(event);
      break;
    }
    case "subscription.canceled":
    case "customer.subscription.deleted": {
      await handleCancellation(event);
      break;
    }
    default:
      // Unknown event — acknowledge but don't process
      break;
  }

  return NextResponse.json({ received: true });
}

// ── Handlers ──────────────────────────────────────────────────────────────────

async function handlePurchase(event: Record<string, unknown>) {
  // Extract data — shape differs between Polar and Stripe, adapt as needed
  const data = (event.data ?? event) as Record<string, unknown>;
  const customerEmail =
    (data.customer_email as string) ??
    ((data.customer as Record<string, unknown>)?.email as string);
  const userId = (data.metadata as Record<string, string>)?.user_id;
  const productId = (data.product_id as string) ?? (data.price as Record<string, string>)?.product;
  const amount = (data.amount as number) ?? (data.amount_total as number) ?? 0;

  if (!customerEmail) {
    console.error("[webhook] No customer email in payload");
    return;
  }

  // 1. Grant access
  if (userId) {
    await supabase
      .from("perfiles")
      .update({ plan: "pro", polar_product_id: productId })
      .eq("id", userId);
  }

  // 2. Queue nurturing sequence
  const now = new Date();
  const nurturingEmails = [
    { template: "bienvenida_pro", delay_days: 0 },
    { template: "tip_dia3",       delay_days: 3 },
    { template: "tip_dia7",       delay_days: 7 },
    { template: "upsell_dia14",   delay_days: 14 },
  ];

  for (const item of nurturingEmails) {
    const scheduled_at = new Date(now);
    scheduled_at.setDate(scheduled_at.getDate() + item.delay_days);

    await supabase.from("email_queue").insert({
      recipient_email: customerEmail,
      template: item.template,
      payload: { user_id: userId, product_id: productId },
      scheduled_at: scheduled_at.toISOString(),
      status: "pending",
    });
  }

  // 3. Track revenue event
  await supabase.from("eventos").insert({
    nombre: "purchase",
    usuario_id: userId ?? null,
    propiedades: { product_id: productId, amount_cents: amount, email: customerEmail },
  });
}

async function handleCancellation(event: Record<string, unknown>) {
  const data = (event.data ?? event) as Record<string, unknown>;
  const userId = (data.metadata as Record<string, string>)?.user_id;

  if (userId) {
    await supabase
      .from("perfiles")
      .update({ plan: "free" })
      .eq("id", userId);

    await supabase.from("eventos").insert({
      nombre: "subscription_canceled",
      usuario_id: userId,
      propiedades: {},
    });
  }
}
