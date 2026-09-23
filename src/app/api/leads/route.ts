import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/email";
import { pushLeadToViteUnDevis } from "@/lib/viteundevis";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

// In-memory sliding window rate limiter : 5 soumissions par IP toutes les 15 minutes.
const ipHits = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string, maxRequests = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  // Nettoyage régulier pour éviter la fuite mémoire
  if (ipHits.size > 2000) {
    for (const [key, val] of ipHits.entries()) {
      if (now > val.resetAt) ipHits.delete(key);
    }
  }

  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // Extraction IP client
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: "rate_limit_exceeded", message: "Trop de requêtes. Veuillez patienter avant de soumettre à nouveau." },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const phoneRaw = body.phone ? String(body.phone).trim() : null;
  const simulation = body.simulation;

  const consentCallback = Boolean(body.consent_callback ?? body.consentCallback ?? false);
  const consentNewsletter = Boolean(body.consent_newsletter ?? body.consentNewsletter ?? false);
  const sessionIdRaw = body.session_id ?? body.sessionId;
  const sessionId = sessionIdRaw ? String(sessionIdRaw).slice(0, 120) : null;

  const utmSource = String(body.utm?.source ?? body.utm?.utm_source ?? body.utm_source ?? "").slice(0, 120) || null;
  const utmMedium = String(body.utm?.medium ?? body.utm?.utm_medium ?? body.utm_medium ?? "").slice(0, 120) || null;
  const utmCampaign = String(body.utm?.campaign ?? body.utm?.utm_campaign ?? body.utm_campaign ?? "").slice(0, 160) || null;
  const gclid = String(body.utm?.gclid ?? body.gclid ?? "").slice(0, 120) || null;
  const fbclid = String(body.utm?.fbclid ?? body.fbclid ?? "").slice(0, 120) || null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (phoneRaw && !PHONE_RE.test(phoneRaw)) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  if (!simulation || typeof simulation !== "object") {
    return NextResponse.json({ error: "simulation_required" }, { status: 400 });
  }

  const client = supabaseAdmin();
  const record = {
    email,
    phone: phoneRaw,
    simulation,
    consent_callback: consentCallback,
    consent_newsletter: consentNewsletter,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    gclid,
    fbclid,
    session_id: sessionId,
    created_at: new Date().toISOString(),
  };

  if (!client) {
    console.log("[zeropassoire][DEV][lead]", record);
    return NextResponse.json({
      ok: true,
      id: "dev-" + Math.random().toString(36).slice(2),
      mode: "dev",
    });
  }

  const { data, error } = await client.from("leads").insert(record).select("id").single();
  if (error || !data) {
    console.error("[zeropassoire][supabase][lead]", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  // Funnel event post-inscription (best effort — ne bloque pas la réponse si ça fail).
  client.from("events").insert({
    session_id: record.session_id,
    event_name: "lead_submitted",
    properties: {
      lead_id: data.id,
      classe: (simulation as any).input?.classe ?? (simulation as any).classe ?? null,
      statut: (simulation as any).input?.statut ?? null,
      kind: (simulation as any).kind ?? "simulator",
      consent_callback: consentCallback,
      consent_newsletter: consentNewsletter,
    },
    created_at: record.created_at,
  }).then(({ error: evErr }: any) => {
    if (evErr) console.error("[zeropassoire][supabase][funnel-event]", evErr);
  });

  // Email de récap (best effort — lead est déjà en base, on ne bloque jamais la réponse).
  sendLeadEmail({
    email,
    phone: phoneRaw,
    simulation: simulation as any,
    consentCallback,
    leadId: data.id,
  })
    .then((r) => {
      if (r.skipped) console.log("[zeropassoire][email][skipped]", r.skipped);
      else if (!r.ok) console.error("[zeropassoire][email][fail]", r.error);
      else console.log("[zeropassoire][email][ok]", email);
    })
    .catch((e) => console.error("[zeropassoire][email][throw]", e));

  // ViteUnDevis Partner Dispatch (uniquement si rappel consenti avec numéro de téléphone)
  if (consentCallback && phoneRaw) {
    const inputData = (simulation as any).input || {};
    pushLeadToViteUnDevis({
      email,
      phone: phoneRaw,
      postalCode: String(inputData.cp || "75000"),
      city: String(inputData.ville || ""),
      typeLogement: inputData.type === "appartement" ? "appartement" : "maison",
      statut: inputData.statut === "bailleur" ? "bailleur" : "occupant",
      surface: Number(inputData.surface) || 80,
      classeDpe: inputData.classe || "F",
      leadId: data.id,
      clientIp,
      pageUrl: req.headers.get("referer") || undefined,
    })
      .then((vRes) => {
        if (vRes.skipped) console.log("[zeropassoire][ViteUnDevis][skipped]", vRes.skipped);
        else if (vRes.success) console.log("[zeropassoire][ViteUnDevis][ok]", data.id);
        else console.error("[zeropassoire][ViteUnDevis][fail]", vRes.error);
      })
      .catch((vErr) => console.error("[zeropassoire][ViteUnDevis][throw]", vErr));
  }

  return NextResponse.json({ ok: true, id: data.id });
}
