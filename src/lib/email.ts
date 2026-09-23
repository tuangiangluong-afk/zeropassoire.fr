import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY || "";
const FROM = process.env.RESEND_FROM || "Zéro Passoire <plan@zeropassoire.fr>";
const NOTIFY = process.env.LEAD_NOTIFY_EMAIL || "contact@zeropassoire.fr";

export function isEmailReady(): boolean {
  return API_KEY.length > 0;
}

type SimulationPayload = {
  kind?: string;
  message?: string;
  input?: Record<string, unknown>;
  result?: Record<string, unknown>;
  [k: string]: unknown;
};

function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtMoney(v: unknown): string {
  if (typeof v === "number" && Number.isFinite(v)) {
    return v.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";
  }
  return escapeHtml(v);
}

function isMoneyKey(k: string): boolean {
  return /cost|prime|aide|montant|charge|prix|total|euro|budget|reste/i.test(k);
}

function renderKV(obj: Record<string, unknown> | undefined): string {
  if (!obj) return "";
  return Object.entries(obj)
    .map(([k, v]) => {
      let display = "";
      if (typeof v === "object" && v !== null) {
        display = escapeHtml(JSON.stringify(v));
      } else if (isMoneyKey(k)) {
        display = fmtMoney(v);
      } else {
        display = escapeHtml(v);
      }
      const safeKey = escapeHtml(k.replace(/_/g, " "));
      return `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#57534e;font-weight:600;text-transform:capitalize">${safeKey}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#1c1917">${display}</td></tr>`;
    })
    .join("");
}

function buildLeadEmailHtml(email: string, sim: SimulationPayload): string {
  const isContact = sim.kind === "contact";
  const safeEmail = escapeHtml(email);

  if (isContact) {
    const safeMsg = escapeHtml(sim.message || "");
    return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
      <h2 style="color:#065f46;margin:0 0 8px">Nouveau message via zeropassoire.fr</h2>
      <p style="color:#57534e;margin:0 0 16px">De : <strong>${safeEmail}</strong></p>
      <div style="background:#fafaf9;border-left:3px solid #059669;padding:14px 18px;border-radius:6px;white-space:pre-wrap">${safeMsg}</div>
    </div>`;
  }

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1c1917">
      <div style="background:#065f46;color:#fff;padding:18px 22px;border-radius:8px 8px 0 0">
        <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.85">Zéro Passoire</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px">Votre plan de sortie de passoire énergétique</div>
      </div>
      <div style="border:1px solid #e7e5e4;border-top:0;padding:22px;border-radius:0 0 8px 8px;background:#fff">
        <p style="margin:0 0 14px">Bonjour,</p>
        <p style="margin:0 0 18px">Voici le récapitulatif de votre simulation, réalisée avec les barèmes officiels 2026 (MaPrimeRénov', CEE, TVA 5,5&nbsp;%). Ce document est une estimation indicative à ±15&nbsp;%, pas un devis contractuel.</p>
        ${sim.input ? `<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#57534e;margin:20px 0 6px">Votre situation</h3><table style="width:100%;border-collapse:collapse;font-size:14px">${renderKV(sim.input as Record<string, unknown>)}</table>` : ""}
        ${sim.result ? `<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#57534e;margin:20px 0 6px">Estimation chiffrée</h3><table style="width:100%;border-collapse:collapse;font-size:14px">${renderKV(sim.result as Record<string, unknown>)}</table>` : ""}
        <p style="margin:22px 0 4px;font-size:13px;color:#57534e">Une question&nbsp;? Répondez simplement à cet email, on revient vers vous sous 48&nbsp;h ouvrées.</p>
        <p style="margin:14px 0 0;font-size:12px;color:#a8a29e">Zéro Passoire — WELINK TECH · 6 rue des Bateliers, 92110 Clichy · SIREN 984 800 136. Vous ne souhaitez plus recevoir d'emails&nbsp;? Répondez « STOP ».</p>
      </div>
    </div>`;
}

export async function sendLeadEmail(input: {
  email: string;
  phone?: string | null;
  simulation: SimulationPayload;
  consentCallback?: boolean;
  leadId?: number | string;
}): Promise<{ ok: boolean; skipped?: string; error?: string }> {
  if (!isEmailReady()) return { ok: false, skipped: "no_api_key" };
  const resend = new Resend(API_KEY);
  const isContact = input.simulation?.kind === "contact";
  const subject = isContact
    ? `Zéro Passoire — nouveau message de contact`
    : `Votre plan de sortie de passoire — Zéro Passoire`;

  const leadTask = !isContact
    ? resend.emails.send({
        from: FROM,
        to: input.email,
        replyTo: NOTIFY,
        subject,
        html: buildLeadEmailHtml(input.email, input.simulation),
      })
    : Promise.resolve({ data: null, error: null });

  const notifyTask = resend.emails.send({
    from: FROM,
    to: NOTIFY,
    subject: isContact
      ? `Nouveau message de contact — ${input.email}`
      : `Nouveau lead — ${input.email}`,
    html: `<p><strong>Email&nbsp;:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Téléphone&nbsp;:</strong> ${escapeHtml(input.phone || "—")}</p>
      <p><strong>Consentement rappel&nbsp;:</strong> ${input.consentCallback ? "oui" : "non"}</p>
      <p><strong>Lead ID&nbsp;:</strong> ${escapeHtml(input.leadId ?? "—")}</p>
      <pre style="background:#fafaf9;padding:12px;border-radius:6px;font-size:12px;overflow:auto">${escapeHtml(JSON.stringify(input.simulation, null, 2))}</pre>`,
  });

  try {
    const [a, b] = await Promise.all([leadTask, notifyTask]);
    const err = (!isContact && a && (a as any).error) || (b && (b as any).error);
    if (err) return { ok: false, error: typeof err === "object" ? JSON.stringify(err) : String(err) };
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
