import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/email";
import { pushLeadToViteUnDevis } from "@/lib/viteundevis";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

const LeadInputSchema = z.object({
  email: z.string().trim().toLowerCase().regex(EMAIL_RE, "invalid_email"),
  phone: z
    .string()
    .trim()
    .regex(PHONE_RE, "invalid_phone")
    .nullable()
    .optional()
    .or(z.literal("")),
  simulation: z.record(z.string(), z.unknown()),
  consent_callback: z.boolean().optional().default(false),
  consent_newsletter: z.boolean().optional().default(false),
  session_id: z.string().max(120).nullable().optional(),
  utm: z
    .object({
      utm_source: z.string().max(120).optional(),
      source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(160).optional(),
      campaign: z.string().max(160).optional(),
      gclid: z.string().max(120).optional(),
      fbclid: z.string().max(120).optional(),
    })
    .nullable()
    .optional(),
});

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

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parseResult = LeadInputSchema.safeParse(rawBody);
  if (!parseResult.success) {
    const issue = parseResult.error.issues[0];
    return NextResponse.json(
      { error: issue?.message || "invalid_payload", details: parseResult.error.format() },
      { status: 400 }
    );
  }

  const valid = parseResult.data;
  const email = valid.email;
  const phoneRaw = valid.phone ? valid.phone.trim() : null;
  const simulation = valid.simulation;

  const consentCallback = valid.consent_callback;
  const consentNewsletter = valid.consent_newsletter;
  const sessionId = valid.session_id ? valid.session_id.slice(0, 120) : null;

  const utmSource = (valid.utm?.source || valid.utm?.utm_source)?.slice(0, 120) || null;
  const utmMedium = (valid.utm?.medium || valid.utm?.utm_medium)?.slice(0, 120) || null;
  const utmCampaign = (valid.utm?.campaign || valid.utm?.utm_campaign)?.slice(0, 160) || null;
  const gclid = valid.utm?.gclid?.slice(0, 120) || null;
  const fbclid = valid.utm?.fbclid?.slice(0, 120) || null;

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
