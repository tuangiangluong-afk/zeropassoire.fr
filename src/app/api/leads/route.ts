import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const phone = body.phone ? String(body.phone).trim() : null;
  const simulation = body.simulation;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  if (!simulation || !simulation.result) {
    return NextResponse.json({ error: "simulation_required" }, { status: 400 });
  }

  const client = supabaseAdmin();
  const record = {
    email,
    phone,
    simulation,
    consent_callback: !!body.consent_callback,
    consent_newsletter: !!body.consent_newsletter,
    utm_source: body.utm?.utm_source || null,
    utm_medium: body.utm?.utm_medium || null,
    utm_campaign: body.utm?.utm_campaign || null,
    gclid: body.utm?.gclid || null,
    fbclid: body.utm?.fbclid || null,
    session_id: body.session_id || null,
    created_at: new Date().toISOString(),
  };

  if (!client) {
    // Fallback dev sans Supabase configuré — log en console, retourne succès mock.
    console.log("[zeropassoire][DEV][lead]", record);
    return NextResponse.json({ ok: true, id: "dev-" + Math.random().toString(36).slice(2), mode: "dev" });
  }

  const { data, error } = await client.from("leads").insert(record).select("id").single();
  if (error) {
    console.error("[zeropassoire][supabase]", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  // Funnel event
  await client.from("events").insert({
    session_id: record.session_id,
    event_name: "lead_submitted",
    properties: { lead_id: data.id, classe: simulation.result.nouvelleClasse },
    created_at: record.created_at,
  });

  return NextResponse.json({ ok: true, id: data.id });
}
