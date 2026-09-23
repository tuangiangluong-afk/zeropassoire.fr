"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send, Loader2, Lock } from "lucide-react";
import type { SimulateurInput, SimulateurResult } from "@/lib/pricing";

export default function LeadCaptureCard({
  state,
  result,
}: {
  state: SimulateurInput;
  result: SimulateurResult;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callback, setCallback] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Email invalide.");
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: phone || null,
          simulation: { input: state, result },
          consent_callback: callback,
          consent_newsletter: newsletter,
          utm: readUtm(),
          session_id: sessionStorage.getItem("zp_session") || undefined,
        }),
      });
      if (!r.ok) throw new Error("submit_failed");
      const { id } = await r.json();
      sessionStorage.setItem("zp_lead_id", id);
      router.push("/success");
    } catch {
      setError("Une erreur est survenue. Réessayez ou écrivez-nous via la page Contact.");
      setSubmitting(false);
    }
  }

  return (
    <div className="card border-2 border-brand-200 bg-brand-50/50">
      <div className="flex items-center gap-2 text-brand-800 mb-2">
        <Mail size={18} />
        <div className="text-sm font-semibold uppercase tracking-wide">Recevoir ce plan par email</div>
      </div>
      <h3 className="text-xl font-display font-bold text-stone-900 mb-2">
        On vous envoie le détail chiffré + la liste des pros RGE de votre secteur.
      </h3>
      <p className="text-sm text-stone-700 mb-6">
        Vous pouvez aussi fermer cette page, vos résultats restent affichés ci-dessus.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 focus:border-brand-600 focus:outline-none"
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1.5">
            Téléphone <span className="font-normal text-stone-500">(optionnel)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 focus:border-brand-600 focus:outline-none"
            placeholder="06 12 34 56 78"
          />
        </div>
        <div className="space-y-2 text-sm text-stone-700">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={callback}
              onChange={(e) => setCallback(e.target.checked)}
              className="mt-1"
            />
            <span>Un conseiller RGE de mon département peut me rappeler <strong>une seule fois</strong>, sur le créneau de mon choix.</span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-1"
            />
            <span>Je souhaite recevoir les évolutions des aides (2 mails/mois max).</span>
          </label>
        </div>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Recevoir mon plan complet
        </button>
        <p className="text-xs text-stone-500 flex items-center justify-center gap-1">
          <Lock size={12} /> Données chiffrées. Aucune revente à des tiers.
        </p>
      </form>
    </div>
  );
}

function readUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
    gclid: p.get("gclid") || undefined,
    fbclid: p.get("fbclid") || undefined,
  };
}
