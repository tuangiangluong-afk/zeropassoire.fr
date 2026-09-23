"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, MapPin, Building2, Home, UserCheck, KeyRound } from "lucide-react";
import DpeSelector, { type DpeClass } from "@/components/DpeSelector";
import ResultCard from "@/components/ResultCard";
import LeadCaptureCard from "@/components/LeadCaptureCard";
import {
  simulate,
  zoneFromCp,
  climatFromZone,
  type SimulateurInput,
  type SimulateurResult,
  type StatutType,
} from "@/lib/pricing";

const STEPS = ["Classe DPE", "Logement & Statut", "Profil fiscal", "Localisation", "Résultat"] as const;

interface SimState {
  classe: DpeClass | null;
  statut: StatutType;
  surface: number;
  type: "maison" | "appartement";
  chauffage: SimulateurInput["chauffage"];
  revenus: SimulateurInput["menageIncomeBracket"];
  cp: string;
}

export default function Simulator() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SimState>({
    classe: null,
    statut: "occupant",
    surface: 85,
    type: "maison",
    chauffage: "fioul",
    revenus: "intermediaire",
    cp: "",
  });
  const [result, setResult] = useState<SimulateurResult | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof SimState>(k: K, v: SimState[K]) {
    setState((s) => ({ ...s, [k]: v }));
  }

  function next() {
    if (step === 0 && !state.classe) return;
    if (step === 3 && !/^\d{5}$/.test(state.cp)) return;
    const newStep = step + 1;
    setStep(newStep);
    if (newStep === 4) {
      setLoading(true);
      const input: SimulateurInput = {
        classe: state.classe as SimulateurInput["classe"],
        surface: state.surface,
        cp: state.cp,
        chauffage: state.chauffage,
        type: state.type,
        statut: state.statut,
        menageIncomeBracket: state.revenus,
      };
      const res = simulate(input);
      setResult(res);
      setLoading(false);

      // Funnel event (fire-and-forget)
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: getSessionId(),
          event_name: "simulator_completed",
          properties: {
            classe: state.classe,
            surface: state.surface,
            type: state.type,
            statut: state.statut,
            nouvelleClasse: res.nouvelleClasse,
          },
        }),
      }).catch(() => {});
    }
  }

  function back() {
    setStep(Math.max(0, step - 1));
  }

  function restart() {
    setStep(0);
    setResult(null);
    setState({
      classe: null,
      statut: "occupant",
      surface: 85,
      type: "maison",
      chauffage: "fioul",
      revenus: "intermediaire",
      cp: "",
    });
  }

  const cpValid = /^\d{5}$/.test(state.cp);
  const cpZone = cpValid ? zoneFromCp(state.cp) : null;
  const cpClimat = cpZone ? climatFromZone(cpZone) : null;
  const cpDept = cpValid ? state.cp.slice(0, 2) : null;

  return (
    <div className="card p-0 overflow-hidden shadow-lg border border-stone-200 bg-white">
      {/* Progress header */}
      <div className="px-6 py-4 bg-stone-100/70 border-b border-stone-200">
        <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
          <span className="font-semibold text-stone-800">
            Étape {step + 1} / {STEPS.length} &middot; {STEPS[step]}
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
            <Sparkles size={12} /> Barèmes officiels 2026
          </span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-700 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <StepWrapper
            title="Quelle est la classe énergétique actuelle de votre bien ?"
            hint="Indiquée sur votre DPE. Seuls les logements E, F et G sont concernés par les obligations de sortie et aides renforcées."
          >
            <DpeSelector value={state.classe} onChange={(v) => set("classe", v)} />
            <p className="mt-4 text-xs text-stone-500 leading-relaxed">
              La loi Climat &amp; Résilience interdit la mise en location des classes <strong>G</strong> depuis le 01/01/2025,
              des <strong>F</strong> en 2028 et des <strong>E</strong> en 2034.
            </p>
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper
            title="Votre profil et votre logement"
            hint="Le type de bien et votre statut déterminent les travaux réalisables et les seuils légaux applicables."
          >
            <div className="space-y-6">
              {/* Statut occupant vs bailleur */}
              <div>
                <div className="text-sm font-semibold text-stone-800 mb-2">Votre statut vis-à-vis de ce bien</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => set("statut", "occupant")}
                    className={
                      "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition " +
                      (state.statut === "occupant"
                        ? "border-brand-700 bg-brand-50 text-brand-900"
                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                    }
                  >
                    <UserCheck size={20} className={state.statut === "occupant" ? "text-brand-700" : "text-stone-500"} />
                    <div>
                      <div className="font-semibold text-sm">Propriétaire occupant</div>
                      <div className="text-xs text-stone-500">Vous habitez le logement</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => set("statut", "bailleur")}
                    className={
                      "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition " +
                      (state.statut === "bailleur"
                        ? "border-brand-700 bg-brand-50 text-brand-900"
                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                    }
                  >
                    <KeyRound size={20} className={state.statut === "bailleur" ? "text-brand-700" : "text-stone-500"} />
                    <div>
                      <div className="font-semibold text-sm">Propriétaire bailleur</div>
                      <div className="text-xs text-stone-500">Vous louez ou allez louer</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Type de bien */}
              <div>
                <div className="text-sm font-semibold text-stone-800 mb-2">Type de bâtiment</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => set("type", "maison")}
                    className={
                      "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition " +
                      (state.type === "maison"
                        ? "border-brand-700 bg-brand-50 text-brand-900"
                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                    }
                  >
                    <Home size={20} className={state.type === "maison" ? "text-brand-700" : "text-stone-500"} />
                    <div>
                      <div className="font-semibold text-sm">Maison individuelle</div>
                      <div className="text-xs text-stone-500">Toiture et façade privatives</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => set("type", "appartement")}
                    className={
                      "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition " +
                      (state.type === "appartement"
                        ? "border-brand-700 bg-brand-50 text-brand-900"
                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                    }
                  >
                    <Building2 size={20} className={state.type === "appartement" ? "text-brand-700" : "text-stone-500"} />
                    <div>
                      <div className="font-semibold text-sm">Appartement / Copro</div>
                      <div className="text-xs text-stone-500">Isolation par l'intérieur</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Surface & chauffage */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Surface habitable (m²)">
                  <input
                    type="number"
                    min={15}
                    max={450}
                    value={state.surface}
                    onChange={(e) => set("surface", Number(e.target.value) || 0)}
                    className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 font-semibold text-stone-900 focus:border-brand-600 focus:outline-none"
                  />
                </Field>
                <Field label="Mode de chauffage actuel">
                  <select
                    value={state.chauffage}
                    onChange={(e) => set("chauffage", e.target.value as SimState["chauffage"])}
                    className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 bg-white text-stone-900 font-medium focus:border-brand-600 focus:outline-none"
                  >
                    <option value="fioul">Chaudière fioul</option>
                    <option value="gaz">Chaudière gaz</option>
                    <option value="electrique">Convecteurs électriques</option>
                    <option value="granule">Chaudière / poêle granulés</option>
                    <option value="pac">Pompe à chaleur ancienne</option>
                    <option value="bois">Cheminée / insert bois</option>
                  </select>
                </Field>
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper
            title="Votre profil fiscal MaPrimeRénov' 2026"
            hint="Ce barème Anah officiel fixe le taux de subvention de vos travaux (de 30 % à 85 %). Aucun justificatif requis."
          >
            <div className="space-y-3">
              {[
                {
                  val: "tres_modeste",
                  nom: "Bleu — Très modeste",
                  dot: "#2563eb",
                  plafond: "Revenu fiscal jusqu'à ~23 500 € (1 part) · Prise en charge max",
                },
                {
                  val: "modeste",
                  nom: "Jaune — Modeste",
                  dot: "#eab308",
                  plafond: "Revenu fiscal ~23 500 € à 30 000 € (1 part)",
                },
                {
                  val: "intermediaire",
                  nom: "Violet — Intermédiaire",
                  dot: "#9333ea",
                  plafond: "Revenu fiscal ~30 000 € à 44 000 € (1 part)",
                },
                {
                  val: "superieur",
                  nom: "Rose — Supérieur",
                  dot: "#ec4899",
                  plafond: "Revenu fiscal au-delà de 44 000 € (1 part)",
                },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => set("revenus", p.val as SimState["revenus"])}
                  className={
                    "w-full text-left rounded-xl border-2 px-5 py-4 transition flex items-start gap-3.5 " +
                    (state.revenus === p.val
                      ? "border-brand-700 bg-brand-50/70 shadow-sm"
                      : "border-stone-300 bg-white hover:border-stone-400")
                  }
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: p.dot }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-stone-900">{p.nom}</div>
                    <div className="text-xs text-stone-600 mt-0.5">{p.plafond}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-stone-500">
              Barème officiel Anah fixé par l'arrêté du 2 octobre 2025 pour la campagne 2026.
            </p>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper
            title="Localisation du bien (Code postal)"
            hint="La zone climatique (H1, H2 ou H3) module le montant des Certificats d'Économies d'Énergie (CEE)."
          >
            <Field label="Code postal (5 chiffres)">
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-stone-400" size={20} />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Ex. 69003 ou 75011"
                  value={state.cp}
                  onChange={(e) => set("cp", e.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-xl border-2 border-stone-300 pl-12 pr-4 py-3 font-mono text-lg font-bold text-stone-900 focus:border-brand-600 focus:outline-none"
                />
              </div>
            </Field>

            {cpValid && cpZone && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950">
                <div className="font-semibold text-emerald-900 mb-1">
                  Département {cpDept} &middot; Zone climatique {cpClimat}
                </div>
                <div className="text-xs text-emerald-800">
                  {cpZone === 1
                    ? "Zone H1 (climat rigoureux) : valorisation CEE maximale avec majoration hivernale."
                    : cpZone === 3
                    ? "Zone H3 (climat méditerranéen) : valorisation CEE ajustée au besoin de chauffage."
                    : "Zone H2 (climat tempéré) : barème CEE standard 6e période 2026."}
                </div>
              </div>
            )}
          </StepWrapper>
        )}

        {step === 4 && (
          <div>
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-stone-600">
                <Loader2 className="animate-spin text-brand-700 mb-3" size={32} />
                <span className="font-semibold text-stone-800">Calcul officiel en cours...</span>
                <span className="text-xs text-stone-500 mt-1">Application des plafonds MaPrimeRénov' et CEE 2026</span>
              </div>
            )}

            {!loading && result && (
              <>
                <ResultCard
                  result={result}
                  state={{
                    classe: state.classe ?? "F",
                    surface: state.surface,
                    statut: state.statut,
                    type: state.type,
                    cp: state.cp,
                  }}
                />
                <div className="mt-8">
                  <LeadCaptureCard
                    state={{
                      classe: state.classe as "E" | "F" | "G",
                      surface: state.surface,
                      cp: state.cp,
                      chauffage: state.chauffage,
                      type: state.type,
                      statut: state.statut,
                      menageIncomeBracket: state.revenus,
                    }}
                    result={result}
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                  <button type="button" onClick={back} className="btn-secondary text-sm">
                    <ArrowLeft size={16} /> Modifier une réponse
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="text-sm text-stone-600 hover:text-brand-700 underline underline-offset-4"
                  >
                    Refaire une nouvelle simulation
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-stone-200">
            <div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-stone-900"
                >
                  <ArrowLeft size={16} /> Retour
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 0 && !state.classe) ||
                (step === 3 && !/^\d{5}$/.test(state.cp))
              }
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 3 ? "Calculer mon plan chiffré" : "Continuer"}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepWrapper({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-2">{title}</div>
      {hint && <p className="text-sm text-stone-600 mb-6 leading-relaxed">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-stone-800 mb-2">{label}</div>
      {children}
    </label>
  );
}

function getSessionId(): string {
  if (typeof window === "undefined") return "srv";
  let id = sessionStorage.getItem("zp_session");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("zp_session", id);
  }
  return id;
}
