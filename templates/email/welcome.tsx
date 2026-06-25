/**
 * templates/email/welcome.tsx
 *
 * React Email template — Bienvenida / Welcome
 * Sent immediately after signup or purchase.
 *
 * Uses: https://react.email  (npm i react-email @react-email/components)
 * Send via: Resend (https://resend.com)
 *
 * Adapt:
 *  - BRAND_NAME, BRAND_COLOR, SUPPORT_EMAIL → your brand
 *  - The copy inside the Body section
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// ── Adapt these constants ─────────────────────────────────────────────────────
const BRAND_NAME = "Tu Producto";
const BRAND_COLOR = "#1a1a1a";
const SUPPORT_EMAIL = "hola@tuproducto.com";
const APP_URL = "https://tuproducto.com";

// ── Props ─────────────────────────────────────────────────────────────────────
interface WelcomeEmailProps {
  nombre: string;
  cta_url?: string;
  unsubscribe_url: string;  // Required — always include
}

export default function WelcomeEmail({
  nombre = "amiga",
  cta_url = `${APP_URL}/dashboard`,
  unsubscribe_url,
}: WelcomeEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Tu acceso a {BRAND_NAME} está listo 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Heading style={{ ...h1, color: BRAND_COLOR }}>
            {BRAND_NAME}
          </Heading>

          {/* Greeting */}
          <Text style={paragraph}>Hola {nombre},</Text>
          <Text style={paragraph}>
            Bienvenida. Ya tienes acceso a {BRAND_NAME} — preparado especialmente
            para ayudarte a [beneficio principal en lenguaje del usuario].
          </Text>

          {/* CTA */}
          <Section style={{ textAlign: "center", marginTop: "32px" }}>
            <Button
              href={cta_url}
              style={{ ...button, backgroundColor: BRAND_COLOR }}
            >
              Empezar ahora →
            </Button>
          </Section>

          {/* What to expect */}
          <Text style={paragraph}>
            En los próximos días te enviaré:
          </Text>
          <Text style={{ ...paragraph, paddingLeft: "16px" }}>
            📌 Día 3 — El primer paso que más resultados da<br />
            📌 Día 7 — Cómo avanzar cuando [situación específica de tu nicho]<br />
            📌 Día 14 — Lo que aprendieron las primeras familias que lo usaron
          </Text>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footer}>
            Cualquier duda, responde este correo o escríbenos a{" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`} style={{ color: BRAND_COLOR }}>
              {SUPPORT_EMAIL}
            </Link>
          </Text>
          <Text style={footer}>
            {BRAND_NAME} · [Ciudad, País]{" "}
            <Link href={unsubscribe_url} style={{ color: "#999" }}>
              Dejar de recibir correos
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const main = {
  backgroundColor: "#f9f9f9",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};
const container = {
  margin: "40px auto",
  padding: "32px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "560px",
};
const h1 = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "24px",
};
const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333333",
};
const button = {
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
};
const divider = {
  borderColor: "#eeeeee",
  margin: "32px 0",
};
const footer = {
  fontSize: "13px",
  color: "#999999",
  lineHeight: "20px",
};
