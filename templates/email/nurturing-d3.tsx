/**
 * templates/email/nurturing-d3.tsx
 *
 * React Email template — Nurturing D+3 (3 days after signup/purchase)
 *
 * Goal: deliver the first actionable win. User has had 3 days — they either
 * used the product or forgot about it. Either way, give them a quick result.
 *
 * Pattern: Problem → Insight → Action → Result
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
  Text,
} from "@react-email/components";

const BRAND_NAME = "Tu Producto";
const BRAND_COLOR = "#1a1a1a";
const APP_URL = "https://tuproducto.com";

interface NurturingD3Props {
  nombre: string;
  cta_url?: string;
  unsubscribe_url: string;
}

export default function NurturingD3({
  nombre = "amiga",
  cta_url = `${APP_URL}/dashboard`,
  unsubscribe_url,
}: NurturingD3Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>El truco que funciona desde el primer día</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{BRAND_NAME}</Heading>

          <Text style={paragraph}>Hola {nombre},</Text>

          <Text style={paragraph}>
            Han pasado tres días desde que te uniste. Quiero compartirte{" "}
            <strong>una sola cosa que marca la diferencia</strong> para la mayoría
            de las familias en la primera semana.
          </Text>

          {/* The insight — replace with your product's core value */}
          <Text style={callout}>
            💡 [Insight accionable: el tip más valioso de tu producto en 2-3 líneas.
            Concreto, específico, fácil de aplicar hoy.]
          </Text>

          <Text style={paragraph}>
            ¿Por qué importa esto? Porque [explicación breve en lenguaje del usuario,
            sin tecnicismos].
          </Text>

          <Text style={paragraph}>
            Para aplicarlo ahora mismo:
          </Text>
          <Text style={{ ...paragraph, paddingLeft: "16px" }}>
            1. [Paso 1 — 30 segundos]<br />
            2. [Paso 2 — 1 minuto]<br />
            3. [Paso 3 — opcional pero potente]
          </Text>

          <Button
            href={cta_url}
            style={{ ...button, backgroundColor: BRAND_COLOR }}
          >
            Aplicarlo en la app →
          </Button>

          <Text style={paragraph}>
            En 4 días más te mando el segundo tip. Mientras tanto, si tienes
            alguna pregunta, solo responde este correo.
          </Text>

          <Hr style={divider} />
          <Text style={footer}>
            {BRAND_NAME} ·{" "}
            <Link href={unsubscribe_url} style={{ color: "#999" }}>
              Dejar de recibir correos
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

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
  fontSize: "22px",
  fontWeight: "700",
  color: "#1a1a1a",
  marginBottom: "20px",
};
const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333333",
};
const callout = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333333",
  backgroundColor: "#f0f7ff",
  borderLeft: "4px solid #1a1a1a",
  padding: "16px 20px",
  borderRadius: "4px",
  margin: "24px 0",
};
const button = {
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
  margin: "16px 0 24px",
};
const divider = { borderColor: "#eeeeee", margin: "32px 0" };
const footer = { fontSize: "13px", color: "#999999" };
