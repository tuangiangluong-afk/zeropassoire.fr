"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, User, Mail, Send, Loader2, Lock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import type { SimulateurInput, SimulateurResult } from "@/lib/pricing";

const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

export default function LeadCaptureCard({
  state,
  result,
  onUnlocked,
}: {
  state: SimulateurInput;
  result: SimulateurResult;
  onUnlocked?: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Opt-in : la case ne doit jamais être pré-cochée (CNIL + art. 7 RGPD).
  const [callback, setCallback] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Veuillez renseigner votre Nom et Prénom.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Veuillez renseigner une adresse email valide.");
      return;
    }

    if (callback && (!phone.trim() || !PHONE_RE.test(phone.replace(/\s/g, "")))) {
      setError("Un numéro de téléphone valide est nécessaire pour demander un rappel (ex : 06 12 34 56 78).");
      return;
    }

    if (phone.trim() && !PHONE_RE.test(phone.replace(/\s/g, ""))) {
      setError("Ce numéro de téléphone ne semble pas valide (ex : 06 12 34 56 78).");
      return;
    }

    setSubmitting(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          simulation: { input: state, result },
          consent_callback: callback,
          consent_newsletter: false,
          utm: readUtm(),
          session_id: typeof window !== "undefined" ? (sessionStorage.getItem("zp_session") || undefined) : undefined,
        }),
      });

      if (!r.ok) {
        const errJson = await r.json().catch(() => ({}));
        throw new Error(errJson.message || "submit_failed");
      }

      const { id } = await r.json();
      if (typeof window !== "undefined") {
        sessionStorage.setItem("zp_lead_id", id);
      }

      if (onUnlocked) {
        onUnlocked();
      } else {
        router.push("/success");
      }
    } catch {
      setError("Une erreur est survenue lors de l'enregistrement. Merci de vérifier vos informations.");
      setSubmitting(false);
    }
  }

  return (
    <div className="card border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 p-6 sm:p-8 rounded-3xl shadow-xl">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-wide uppercase">
          <Sparkles size={14} /> Barème MaPrimeRénov&apos; 2026 Validé
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>Éligibilité confirmée pour votre bien</span>
        </div>
      </div>

      <h3 className="text-2xl font-display font-extrabold text-stone-900 mb-3 leading-tight">
        Débloquez votre plan d&apos;aides officiel &amp; votre comparatif de 3 artisans RGE
      </h3>
      <p className="text-sm text-stone-600 mb-6 leading-relaxed">
        Votre estimation de subvention et le plan de travaux recommandés pour sortir de la passoire thermique sont calculés. Renseignez vos coordonnées pour déverrouiller l&apos;accès complet et recevoir l&apos;étude chiffrée gratuite.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 mb-1.5">
            <User size={16} className="text-stone-500" />
            Nom &amp; Prénom <span className="text-emerald-700">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
            placeholder="Jean Dupont"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 mb-1.5">
              <Phone size={16} className="text-stone-500" />
              Téléphone portable{" "}
              <span className="text-emerald-700">{callback ? "*" : "(facultatif)"}</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              placeholder="06 12 34 56 78"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Utilisé uniquement si vous demandez un rappel. Jamais revendu.
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-800 mb-1.5">
              <Mail size={16} className="text-stone-500" />
              Adresse email <span className="text-emerald-700">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              placeholder="jean.dupont@email.fr"
            />
            <p className="text-[11px] text-stone-500 mt-1">Pour recevoir le rapport PDF détaillé</p>
          </div>
        </div>

        {/* Technical consent */}
        <div className="p-3.5 bg-stone-100/80 rounded-xl border border-stone-200">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 leading-snug">
            <input
              type="checkbox"
              checked={callback}
              onChange={(e) => setCallback(e.target.checked)}
              className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0"
            />
            <span>
              J&apos;accepte que mes coordonnées soient transmises à un partenaire spécialisé en
              rénovation et que je sois contacté(e) par téléphone au sujet de mon projet. Cette
              case est facultative et peut être retirée à tout moment. Détail des destinataires
              dans la{" "}
              <a href="/politique-confidentialite" className="underline hover:text-stone-900">
                politique de confidentialité
              </a>.
            </span>
          </label>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Déverrouillage en cours...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Recevoir mon plan d&apos;aides détaillé</span>
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <Lock size={12} className="text-emerald-700" /> Données 100% sécurisées
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-700" /> Artisans RGE certifiés
          </span>
          <span>Gratuit &amp; sans aucun engagement</span>
        </div>
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
