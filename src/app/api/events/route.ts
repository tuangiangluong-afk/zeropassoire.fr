import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: true }); }

  const client = supabaseAdmin();
  if (!client) return NextResponse.json({ ok: true, mode: "dev" });

  await client.from("events").insert({
    session_id: body.session_id || null,
    event_name: String(body.event_name || "unknown").slice(0, 60),
    properties: body.properties ?? {},
    created_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
