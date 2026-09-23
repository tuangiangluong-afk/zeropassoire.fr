-- zeropassoire.fr — Schema initial Supabase
-- À appliquer via : `supabase db push` ou l'éditeur SQL du dashboard Supabase.

create extension if not exists "pgcrypto";

-- Table principale des leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  phone text,
  simulation jsonb not null,
  consent_callback boolean not null default false,
  consent_newsletter boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  gclid text,
  fbclid text,
  session_id text,
  processed_at timestamptz,
  processed_by text
);
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_email on public.leads (lower(email));
create index if not exists idx_leads_session on public.leads (session_id);

-- Events funnel (pas de FK pour ne pas bloquer l'insert en cas de timeout)
create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id text,
  event_name text not null,
  properties jsonb not null default '{}'::jsonb
);
create index if not exists idx_events_name on public.events (event_name, created_at desc);
create index if not exists idx_events_session on public.events (session_id, created_at desc);

-- Row Level Security : seul le service_role peut écrire/lire (via API Next.js).
-- Aucun accès anonyme.
alter table public.leads enable row level security;
alter table public.events enable row level security;

-- Politique de refus total pour les clés `anon`.
-- (Pas besoin de CREATE POLICY : le default RLS deny si aucune policy.)

-- Rétention : suppression automatique à J+1095 (3 ans).
-- Nécessite pg_cron activé sur le projet Supabase (Dashboard > Database > Extensions).
-- Décommenter et exécuter une fois :
--
-- create extension if not exists pg_cron;
-- select cron.schedule('leads-purge-3y', '0 3 * * *',
--   $$delete from public.leads where created_at < now() - interval '3 years'$$
-- );
