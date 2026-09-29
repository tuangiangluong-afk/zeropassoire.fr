-- Migration: Create sys_keep_alive table to track cron/keep-alive pings
-- Keeps WAL active and provides a simple audit log of pings

CREATE TABLE IF NOT EXISTS public.sys_keep_alive (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pinged_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.sys_keep_alive ENABLE ROW LEVEL SECURITY;

-- Allow service_role (used by server-side supabaseAdmin) full access
CREATE POLICY "Service role manages keep_alive"
    ON public.sys_keep_alive FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);

-- Index on pinged_at for clean query logs sorting
CREATE INDEX IF NOT EXISTS idx_sys_keep_alive_pinged ON public.sys_keep_alive(pinged_at DESC);
