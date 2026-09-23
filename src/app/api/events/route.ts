import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Le frontend (Simulator.tsx + AttributionTracker) envoie eventName/sessionId en camelCase.
// On accepte aussi event_name/session_id pour compatibilité avec des appels manuels.
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true }); // fire-and-forget : ne jamais casser l'UX
  }

  const eventName = String(body?.eventName ?? body?.event_name ?? "unknown").slice(0, 60);
  const sessionIdRaw = body?.sessionId ?? body?.session_id;
  const sessionId = sessionIdRaw ? String(sessionIdRaw).slice(0, 120) : null;
  const properties = body?.properties && typeof body.properties === "object" ? body.properties : {};

  const client = supabaseAdmin();
  if (!client) return NextResponse.json({ ok: true, mode: "dev" });

  await client.from("events").insert({
    session_id: sessionId,
    event_name: eventName,
    properties,
    created_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
