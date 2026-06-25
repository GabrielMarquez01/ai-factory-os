/**
 * templates/api/unsubscribe/route.ts
 *
 * One-click unsubscribe endpoint (RFC 8058 compliant).
 *
 * Flow:
 *   1. Email service adds ?token=HMAC_TOKEN&email=user@... to the unsubscribe URL
 *   2. User clicks → GET /api/unsubscribe?token=...&email=...
 *   3. We verify the HMAC (proves the link came from us, not forged)
 *   4. We add the email to email_suppressions so it never receives emails again
 *   5. We cancel any pending emails in email_queue
 *   6. We show a confirmation page
 *
 * Environment variable needed:
 *   UNSUBSCRIBE_SECRET  — any long random string (openssl rand -hex 32)
 *
 * How to generate the token when sending an email (in your email service):
 *   const token = crypto.createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!)
 *                       .update(email)
 *                       .digest('hex');
 *   const link = `https://yourapp.com/api/unsubscribe?token=${token}&email=${encodeURIComponent(email)}`;
 */

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifyToken(email: string, token: string): boolean {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error("UNSUBSCRIBE_SECRET not set");

  const expected = crypto
    .createHmac("sha256", secret)
    .update(email.toLowerCase())
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(token)
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const email = searchParams.get("email")?.toLowerCase();
  const token = searchParams.get("token");

  if (!email || !token) {
    return new NextResponse(errorPage("Enlace inválido."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  let valid = false;
  try {
    valid = verifyToken(email, token);
  } catch {
    return new NextResponse(errorPage("Error de configuración."), {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (!valid) {
    return new NextResponse(errorPage("Enlace inválido o expirado."), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Add to suppression list
  await supabase.from("email_suppressions").upsert(
    { email, reason: "unsubscribe", created_at: new Date().toISOString() },
    { onConflict: "email" }
  );

  // Cancel pending emails for this address
  await supabase
    .from("email_queue")
    .update({ status: "canceled" })
    .eq("recipient_email", email)
    .eq("status", "pending");

  // Track event
  await supabase.from("eventos").insert({
    nombre: "email_unsubscribe",
    propiedades: { email },
  });

  return new NextResponse(successPage(email), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

// ── Simple HTML pages (replace with your design system if preferred) ──────────

function successPage(email: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Desuscrito</title>
<style>body{font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}
h1{font-size:1.5rem}p{color:#666}a{color:#333}</style>
</head>
<body>
  <h1>Listo ✓</h1>
  <p>La dirección <strong>${email}</strong> fue eliminada de nuestra lista.<br>
  No recibirás más correos de nuestra parte.</p>
  <p><a href="/">Volver al inicio</a></p>
</body></html>`;
}

function errorPage(message: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Error</title>
<style>body{font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center;color:#333}</style>
</head>
<body>
  <h1>Error</h1>
  <p>${message}</p>
  <p><a href="/">Volver al inicio</a></p>
</body></html>`;
}
