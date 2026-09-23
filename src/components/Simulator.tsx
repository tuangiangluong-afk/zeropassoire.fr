"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import DpeSelector, { type DpeClass } from "@/components/DpeSelector";
import ResultCard from "@/components/ResultCard";
import LeadCaptureCard from "@/components/LeadCaptureCard";
import type { SimulateurInput, SimulateurResult } from "@/lib/pricing";

const STEPS = ["Classe DPE", "Votre logement", "Situation", "Code postal", "R&eacute;sultat"] as const;

interface SimState {
  classe: DpeClass | null;
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
    surface: 90,
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
      // Import statique evite pour garder le bundle initial petit.
      import("@/lib/pricing").then(({ simulate }) => {
        const input: SimulateurInput = {
          classe: state.classe as SimulateurInput["classe"],
          surface: state.surface,
          cp: state.cp,
          chauffage: state.chauffage,
          type: state.type,
          menageIncomeBracket: state.revenus,
        };
        setResult(simulate(input));
        setLoading(false);
      });
      // Funnel event (fire-and-forget)
      fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ session_id: getSessionId(), event_name: "simulator_completed", properties: { classe: state.classe, surface: state.surface } }),
      }).catch(() => {});
    }
  }

  function back() { setStep(Math.max(0, step - 1)); }

  function restart() {
    setStep(0);
    setResult(null);
    setState({ classe: null, surface: 90, type: "maison", chauffage: "fioul", revenus: "intermediaire", cp: "" });
  }

  return (
    <div className="card p-0 overflow-hidden">
      {/* Progress */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <span>
            &Eacute;tape {step + 1} / {STEPS.length}
          </span>
          <span>~40 secondes</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <StepWrapper title="Quelle est la classe &eacute;nerg&eacute;tique de votre logement&nbsp;?" hint="Elle figure sur votre DPE ou avis d'imposition.">
            <DpeSelector value={state.classe} onChange={(v) => set("classe", v)} />
            <p className="mt-4 text-xs text-stone-500">
              Seuls les logements <strong className="text-stone-800">E, F ou G</strong> sont consid&eacute;r&eacute;s comme
              passoires thermiques et &eacute;ligibles aux aides de sortie.
            </p>
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper title="Parlez-nous de votre logement">
            <div className="space-y-6">
              <Field label="Surface habitable (m&sup2;)">
                <input
                  type="number"
                  min={20}
                  max={400}
                  value={state.surface}
                  onChange={(e) => set("surface", Number(e.target.value) || 0)}
                  className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
                />
              </Field>
              <Field label="Type de bien">
                <div className="grid grid-cols-2 gap-3">
                  {(["maison", "appartement"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("type", t)}
                      className={
                        "rounded-xl border-2 px-4 py-3 font-medium capitalize transition " +
                        (state.type === t ? "border-brand-600 bg-brand-50 text-brand-800" : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Mode de chauffage principal">
                <select
                  value={state.chauffage}
                  onChange={(e) => set("chauffage", e.target.value as SimState["chauffage"])}
                  className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 bg-white focus:border-brand-600 focus:outline-none"
                >
                  <option value="electrique">Radiateurs &eacute;lectriques</option>
                  <option value="gaz">Chaudi&egrave;re gaz</option>
                  <option value="fioul">Chaudi&egrave;re fioul</option>
                  <option value="granule">Chaudi&egrave;re granul&eacute;s</option>
                  <option value="pac">Pompe &agrave; chaleur</option>
                  <option value="bois">Po&ecirc;le / chemin&eacute;e bois</option>
                </select>
              </Field>
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper title="Votre situation fiscale" hint="D&eacute;termine le taux MaPrimeR&eacute;nov' applicable. Aucun justificatif demand&eacute;.">
            <div className="space-y-3">
              {([
                ["tres_modeste", "Tr&egrave;s modeste", "Jusqu'&agrave; ~22 000 &euro; / part"],
                ["modeste", "Modeste", "~22 000 &ndash; 28 000 &euro;"],
                ["intermediaire", "Interm&eacute;diaire", "~28 000 &ndash; 42 000 &euro;"],
                ["superieur", "Sup&eacute;rieur", "Au-del&agrave; de 42 000 &euro;"],
              ] as const).map(([val, label, sub]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set("revenus", val)}
                  className={
                    "w-full text-left rounded-xl border-2 px-5 py-4 transition " +
                    (state.revenus === val ? "border-brand-600 bg-brand-50" : "border-stone-300 bg-white hover:border-stone-400")
                  }
                >
                  <div className="font-semibold text-stone-900">{label}</div>
                  <div className="text-sm text-stone-600 mt-0.5">{sub}</div>
                </button>
              ))}
            </div>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper title="O&ugrave; se situe le bien&nbsp;?" hint="Zone climatique H1/H2/H3 : impact sur le montant CEE.">
            <Field label="Code postal">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Ex. 69003"
                value={state.cp}
                onChange={(e) => set("cp", e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
              />
            </Field>
            {state.cp.length === 5 && (
              <p className="mt-3 text-sm text-stone-600">
                Zone climatique d&eacute;tect&eacute;e &mdash; calcul imm&eacute;diat.
              </p>
            )}
          </StepWrapper>
        )}

        {step === 4 && (
          <div>
            {loading && (
              <div className="flex items-center justify-center py-16 text-stone-500">
                <Loader2 className="animate-spin mr-2" /> Calcul en cours&hellip;
              </div>
            )}
            {!loading && result && (
              <>
                <ResultCard result={result} state={{ classe: state.classe ?? "F", surface: state.surface }} />
                <div className="mt-8">
                  <LeadCaptureCard state={{ classe: state.classe as "E"|"F"|"G", surface: state.surface, cp: state.cp, chauffage: state.chauffage, type: state.type, menageIncomeBracket: state.revenus }} result={result} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={back} className="btn-secondary text-sm">
                    <ArrowLeft size={16} /> Modifier une r&eacute;ponse
                  </button>
                  <button type="button" onClick={restart} className="text-sm text-stone-600 hover:text-brand-700 underline underline-offset-2">
                    Refaire la simulation
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            <div>
              {step > 0 && (
                <button type="button" onClick={back} className="text-sm text-stone-600 hover:text-stone-900">
                  &larr; Retour
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
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? "Voir mon r&eacute;sultat" : "Continuer"}
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
      <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-2" dangerouslySetInnerHTML={{ __html: title }} />
      {hint && <p className="text-sm text-stone-600 mb-6" dangerouslySetInnerHTML={{ __html: hint }} />}
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
