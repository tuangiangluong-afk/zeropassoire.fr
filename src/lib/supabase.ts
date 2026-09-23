import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client, server-only. Never import from a client component.
 * Returns null if env vars aren't set — route handlers must guard.
 */
let _admin: SupabaseClient | null | undefined;
export function supabaseAdmin(): SupabaseClient | null {
  if (_admin !== undefined) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  _admin = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return _admin;
}
