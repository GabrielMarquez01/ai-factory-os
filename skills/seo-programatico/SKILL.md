---
name: seo-programatico
description: Sistema para generar miles de páginas indexables con IA. En vez de escribir un artículo a la vez, construyes una fábrica de contenido que escala sola. Tráfico orgánico sin depender de publicidad pagada.
---

# 🔍 SEO Programático

> **Analogía:** El SEO tradicional es como un escritor que produce un artículo por semana. El SEO programático es como una imprenta — defines la plantilla una vez y produces miles de páginas con los mismos recursos.
>
> La diferencia: el escritor puede tener 52 artículos en un año. La imprenta puede tener 52,000.

## El Problema Que Resuelve

Conseguir tráfico orgánico sin pagar ads requiere contenido. Crear contenido de calidad toma tiempo. Una persona puede producir 4-8 piezas por semana. Para competir en un nicho con miles de búsquedas diferentes, eso no es suficiente.

El SEO programático rompe este cuello de botella: genera cientos o miles de páginas relevantes desde una base de datos + plantilla.

---

## Cómo Funciona (El Patrón)

```
BASE DE DATOS              PLANTILLA                PÁGINAS GENERADAS
┌──────────────┐          ┌──────────────┐          ┌──────────────────┐
│ ciudad: CDMX │    +     │ "Los mejores │    =     │ /dentistas-cdmx  │
│ ciudad: GDL  │          │  [tipo] en   │          │ /dentistas-gdl   │
│ ciudad: MTY  │          │  [ciudad]"   │          │ /dentistas-mty   │
│ ... (500)    │          └──────────────┘          │ ... (500 páginas) │
└──────────────┘                                    └──────────────────┘
```

**El insight:** si hay un patrón de búsqueda que se repite con variables (`mejores [X] en [ciudad]`, `cómo [verbo] [sustantivo]`), hay una oportunidad de SEO programático.

---

## Los 3 Tipos de SEO Programático

### Tipo 1: Geográfico

Ideal para: negocios locales, directorios, servicios por ciudad.

```
Patrón: [servicio] en [ciudad]
Variantes: 1 servicio × N ciudades = N páginas

Ejemplo:
/psicologos-online-cdmx
/psicologos-online-guadalajara
/psicologos-online-monterrey
```

### Tipo 2: Comparativo

Ideal para: afiliados, reviews, SaaS comparado con competidores.

```
Patrón: [producto A] vs [producto B]
Variantes: N productos × N competidores = N² páginas

Ejemplo:
/notion-vs-obsidian
/notion-vs-roam
/obsidian-vs-logseq
```

### Tipo 3: Pregunta + Entidad

Ideal para: educación, FAQs, recursos por categoría.

```
Patrón: [pregunta] sobre [entidad del nicho]
Variantes: M preguntas × N entidades = M×N páginas

Ejemplo (nicho maternidad):
/cuando-empieza-[hito-de-desarrollo]
/cuanto-duerme-bebe-[edad-en-meses]
/signos-de-[condicion]-en-bebes
```

---

## Implementación con Next.js (Static Generation)

Next.js es ideal para SEO programático porque puede pre-renderizar miles de páginas en build time:

```javascript
// app/[ciudad]/[servicio]/page.js

// 1. Define qué páginas generar (desde tu base de datos)
export async function generateStaticParams() {
  const combinaciones = await db.query(`
    SELECT ciudad.slug, servicio.slug 
    FROM ciudades 
    CROSS JOIN servicios
    WHERE ciudad.activa = true AND servicio.activo = true
  `)
  return combinaciones.map(({ ciudad_slug, servicio_slug }) => ({
    ciudad: ciudad_slug,
    servicio: servicio_slug
  }))
}

// 2. Genera los metadatos SEO dinámicamente
export async function generateMetadata({ params }) {
  const data = await getData(params)
  return {
    title: `${data.servicio} en ${data.ciudad} — ${data.año}`,
    description: `Encuentra los mejores ${data.servicio} en ${data.ciudad}. Listado actualizado, reseñas verificadas.`,
    alternates: {
      canonical: `https://tudominio.com/${params.ciudad}/${params.servicio}`
    }
  }
}

// 3. La plantilla de página (una sola, sirve para todas)
export default async function Page({ params }) {
  const data = await getData(params)
  return (
    <main>
      <h1>{data.titulo}</h1>
      <p>{data.descripcion_generada}</p>
      {/* Contenido específico por combinación */}
      <ListadoResultados items={data.items} />
    </main>
  )
}
```

### La Base de Datos (Supabase)

```sql
-- Tabla de entidades del nicho (ciudades, categorías, keywords)
CREATE TABLE entidades_seo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,          -- URL-friendly
  nombre TEXT NOT NULL,               -- Display name
  tipo TEXT NOT NULL,                 -- 'ciudad' | 'categoria' | 'keyword'
  volumen_busqueda INT,               -- búsquedas/mes aproximadas
  competencia FLOAT,                  -- 0-1 (baja = mejor para empezar)
  activa BOOLEAN DEFAULT TRUE,
  metadata JSONB                      -- datos específicos del nicho
);

-- Tabla de contenido generado por combinación
CREATE TABLE paginas_programaticas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  entidad_1 UUID REFERENCES entidades_seo(id),
  entidad_2 UUID REFERENCES entidades_seo(id),
  titulo TEXT,
  descripcion TEXT,
  contenido_json JSONB,               -- contenido estructurado de la página
  indexada BOOLEAN DEFAULT FALSE,
  clicks_30d INT DEFAULT 0,
  impressiones_30d INT DEFAULT 0,
  posicion_promedio FLOAT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Generación de Contenido con IA

Para páginas que necesitan texto único (no solo datos), usa IA para generar el contenido:

```javascript
// Generar contenido para cada variante con Groq (rápido y barato)
async function generarContenidoPagina(entidad1, entidad2) {
  const prompt = `
Eres un experto en [nicho]. 
Escribe el contenido para una página sobre "${entidad1.nombre}" en el contexto de "${entidad2.nombre}".
El tono es: [tono del avatar].
El contenido debe incluir:
- Introducción (2 párrafos)
- 5 puntos clave
- Preguntas frecuentes (3)
Formato: JSON con los campos [intro, puntos, faqs].
No menciones marcas específicas sin verificar su existencia.
`
  const resultado = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  })
  return JSON.parse(resultado.choices[0].message.content)
}
```

**Costo estimado:** con Groq, generar 1,000 páginas cuesta aprox. $0.50–$2 USD dependiendo de la longitud.

---

## La Estrategia de Keywords: Por Dónde Empezar

No todas las keywords valen igual. Empieza por donde puedes ganar:

```
VOLUMEN ALTO + COMPETENCIA ALTA = difícil, para cuando ya tienes autoridad
VOLUMEN BAJO + COMPETENCIA BAJA = fácil, para empezar
VOLUMEN MEDIO + COMPETENCIA BAJA = el punto dulce (sweet spot)
```

**Cómo encontrar el sweet spot:**
1. Google Search Console → qué búsquedas ya te dan impresiones
2. Keywords de long tail (frases de 4+ palabras) → menos volumen, menos competencia
3. Preguntas que tus usuarios hacen directamente → intención clara

---

## Indexación: Hacer Que Google te Encuentre

Generar las páginas no es suficiente. Necesitas que Google las indexe:

```
1. Sitemap XML dinámico → submítelo en Google Search Console
2. Internal linking → las páginas del mismo tipo deben enlazarse entre sí
3. Velocidad → páginas estáticas (SSG) se indexan más rápido que dinámicas
4. robots.txt → asegúrate de no bloquear las rutas programáticas
```

```javascript
// app/sitemap.js — sitemap dinámico con Next.js
export default async function sitemap() {
  const paginas = await db.query('SELECT slug, updated_at FROM paginas_programaticas')
  
  return paginas.map(pagina => ({
    url: `https://tudominio.com/${pagina.slug}`,
    lastModified: pagina.updated_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
}
```

---

## Métricas Para Saber si Funciona

| Métrica | Herramienta | Meta inicial |
|---------|-------------|-------------|
| Páginas indexadas | Google Search Console | > 50% de las generadas |
| Impresiones orgánicas | Google Search Console | Crecimiento mes a mes |
| Clicks orgánicos | Google Search Console | > 1% CTR en posición < 10 |
| Tiempo en página | GA4 / PostHog | > 60 segundos |

**La señal más importante:** si una página genera clics sin que la hayas promovido, el patrón funciona.

---

## Herramientas

| Herramienta | Uso | Link |
|-------------|-----|------|
| **Next.js** | Static generation a escala | nextjs.org |
| **Supabase** | Base de datos de entidades y contenido | supabase.com |
| **Groq** | Generación de contenido masivo y barato | groq.com |
| **Google Search Console** | Indexación y métricas SEO gratuitas | search.google.com/search-console |
| **Ahrefs / Semrush** | Research de keywords (de pago) | ahrefs.com |
| **Keywords Everywhere** | Extension de Chrome para volúmenes | keywordseverywhere.com |

## La Regla del SEO Programático

> El SEO programático multiplica tu esfuerzo, no lo reemplaza.
> Si la base de datos está vacía o el contenido es de baja calidad → Google te penaliza.
> La escala solo sirve si cada página individual tiene valor real para el usuario.
