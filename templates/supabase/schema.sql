-- ============================================================
-- Business OS — Schema base de Supabase
-- Copia y ejecuta en tu proyecto Supabase (SQL Editor)
-- ============================================================

-- ==================== USUARIOS ====================
CREATE TABLE IF NOT EXISTS public.perfiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  nombre TEXT,
  plan TEXT DEFAULT 'free',          -- 'free' | 'pro' | 'founders'
  canal_origen TEXT,                 -- cómo llegó: 'organico' | 'email' | 'social' | 'referido'
  codigo_afiliado_origen TEXT,       -- si vino referido por un afiliado
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve solo su perfil"
  ON public.perfiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuario actualiza solo su perfil"
  ON public.perfiles FOR UPDATE
  USING (auth.uid() = id);

-- ==================== ANALYTICS ====================
CREATE TABLE IF NOT EXISTS public.eventos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES public.perfiles(id),
  sesion_id TEXT,
  evento TEXT NOT NULL,              -- 'signup' | 'activado' | 'upgrade' | 'churn' | ...
  propiedades JSONB DEFAULT '{}',
  canal TEXT,
  plataforma TEXT DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eventos_usuario ON public.eventos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_eventos_tipo ON public.eventos(evento);
CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON public.eventos(created_at DESC);

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Solo el backend puede insertar (usar service_role key)
CREATE POLICY "Solo service role puede insertar eventos"
  ON public.eventos FOR INSERT
  WITH CHECK (false);  -- se sobrescribe con service_role

-- ==================== ONBOARDING ====================
CREATE TABLE IF NOT EXISTS public.onboarding_pasos (
  usuario_id UUID REFERENCES public.perfiles(id) ON DELETE CASCADE,
  paso TEXT NOT NULL,                -- 'perfil_completo' | 'primera_accion' | 'primer_valor'
  completado_en TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (usuario_id, paso)
);

ALTER TABLE public.onboarding_pasos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve sus pasos de onboarding"
  ON public.onboarding_pasos FOR SELECT
  USING (auth.uid() = usuario_id);

-- ==================== EMAIL NURTURING ====================
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  tipo TEXT NOT NULL,                -- 'nurturing_d3' | 'nurturing_d7' | 'nurturing_d14'
  payload JSONB DEFAULT '{}',        -- datos adicionales para el template
  enviar_en TIMESTAMPTZ NOT NULL,
  enviado BOOLEAN DEFAULT FALSE,
  enviado_en TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_queue_pendientes
  ON public.email_queue(enviar_en)
  WHERE enviado = FALSE;

CREATE TABLE IF NOT EXISTS public.email_suppressions (
  email TEXT PRIMARY KEY,
  motivo TEXT NOT NULL,              -- 'unsubscribe' | 'bounce' | 'spam_report'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== CONOCIMIENTO / RAG ====================
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.base_conocimiento (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  embedding vector(1536),
  categoria TEXT,
  fuente TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conocimiento_embedding
  ON public.base_conocimiento
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Función de búsqueda semántica
CREATE OR REPLACE FUNCTION public.buscar_conocimiento(
  query_embedding vector(1536),
  limite INT DEFAULT 5,
  umbral_similitud FLOAT DEFAULT 0.7
)
RETURNS TABLE (
  id UUID,
  titulo TEXT,
  contenido TEXT,
  categoria TEXT,
  similitud FLOAT
) LANGUAGE SQL AS $$
  SELECT
    id, titulo, contenido, categoria,
    1 - (embedding <=> query_embedding) AS similitud
  FROM public.base_conocimiento
  WHERE activo = TRUE
    AND 1 - (embedding <=> query_embedding) >= umbral_similitud
  ORDER BY embedding <=> query_embedding
  LIMIT limite;
$$;

-- ==================== AFILIADOS ====================
CREATE TABLE IF NOT EXISTS public.afiliados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES public.perfiles(id),
  codigo TEXT UNIQUE NOT NULL,
  comision_porcentaje DECIMAL(5,2) DEFAULT 25.00,
  estado TEXT DEFAULT 'activo',
  pago_pendiente DECIMAL(10,2) DEFAULT 0,
  pago_total DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.referidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  afiliado_id UUID REFERENCES public.afiliados(id),
  cliente_id UUID REFERENCES public.perfiles(id),
  monto_venta DECIMAL(10,2),
  comision_generada DECIMAL(10,2),
  estado TEXT DEFAULT 'pendiente',   -- 'pendiente' | 'aprobado' | 'pagado'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== ALERTAS ====================
CREATE TABLE IF NOT EXISTS public.alertas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  prioridad TEXT DEFAULT 'normal',   -- 'alta' | 'normal' | 'baja'
  resuelta BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== TRIGGER updated_at ====================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER perfiles_updated_at
  BEFORE UPDATE ON public.perfiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

