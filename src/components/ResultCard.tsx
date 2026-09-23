"use client";
import {
  TrendingDown,
  TrendingUp,
  FileCheck,
  Check,
  Printer,
  AlertTriangle,
  Clock,
  Hammer,
  BadgePercent,
  CheckCircle2,
} from "lucide-react";
import type { SimulateurResult, StatutType, LogementType } from "@/lib/pricing";

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n)) + " €";

export default function ResultCard({
  result,
  state,
}: {
  result: SimulateurResult;
  state: {
    classe: string;
    surface: number;
    statut?: StatutType;
    type?: LogementType;
    cp?: string;
  };
}) {
  const gainYear = result.gainFactureMensuel * 12;
  const isBailleur = state.statut === "bailleur";

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. HERO RESULT BANNER */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 via-brand-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200">
            <CheckCircle2 size={14} /> Simulation certifiée barèmes 2026
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition print:hidden"
            title="Imprimer ou enregistrer en PDF cette estimation"
          >
            <Printer size={14} /> Imprimer / PDF
          </button>
        </div>

        <div className="flex items-baseline gap-4 flex-wrap">
          <div className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Classe {result.nouvelleClasse}
          </div>
          <div className="text-emerald-200 text-lg">
            Saut de performance : <span className="line-through text-stone-400">Classe {state.classe}</span> &rarr;{" "}
            <span className="font-bold text-white">Classe {result.nouvelleClasse}</span>
          </div>
        </div>

        <p className="mt-2 text-sm text-stone-300">
          Pour votre {state.type === "appartement" ? "appartement" : "maison"} de {state.surface} m²
          {state.cp ? ` (${state.cp})` : ""} &middot; Climat {result.contexte.climat}
        </p>

        {/* 4 Stats Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <StatBox
            icon={<TrendingUp className="text-stone-300" size={18} />}
            label="Coût travaux estimé"
            value={`${eur(result.coutTravauxMin)} – ${eur(result.coutTravauxMax)}`}
            sub="Fourchette ADEME chantiers réels"
          />
          <StatBox
            icon={<BadgePercent className="text-emerald-400" size={18} />}
            label="Aides mobilisables"
            value={eur(result.primeMpr + result.primeCee)}
            sub="MPR + CEE déductibles"
            highlight="text-emerald-300"
          />
          <StatBox
            icon={<TrendingDown className="text-amber-300" size={18} />}
            label="Reste à charge net"
            value={`${eur(result.resteAMinerMin)} – ${eur(result.resteAMinerMax)}`}
            sub="Ce qu'il vous reste à financer"
            highlight="text-amber-200 font-bold"
          />
          <StatBox
            icon={<FileCheck className="text-emerald-300" size={18} />}
            label="Économies sur facture"
            value={`+${eur(result.gainFactureMensuel)} / mois`}
            sub={`Soit ${eur(gainYear)} / an économisés`}
            highlight="text-emerald-300"
          />
        </div>
      </div>

      {/* 2. RENTABILITÉ & AMORTISSEMENT ÉCLAIR */}
      <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Clock size={22} />
        </div>
        <div>
          <div className="font-display font-bold text-base text-emerald-900">
            Retour sur investissement : {result.rentabilite.amortissementMois <= 24 ? `${result.rentabilite.amortissementMois} mois` : `${result.rentabilite.amortissementAnnees} ans`}
          </div>
          <p className="text-sm text-emerald-900/90 mt-0.5 leading-relaxed">
            {result.rentabilite.phrase}
          </p>
        </div>
      </div>

      {/* 3. ALERTE CALENDRIER LÉGAL & SANCTIONS */}
      <div
        className={`p-5 rounded-2xl border-2 flex items-start gap-4 ${
          result.echeanceLegale.urgence === "haute"
            ? "bg-red-50 border-red-300 text-red-950"
            : "bg-amber-50 border-amber-300 text-amber-950"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            result.echeanceLegale.urgence === "haute"
              ? "bg-red-600 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          <AlertTriangle size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-base">
              {result.echeanceLegale.statut}
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-white/70">
              Loi Climat &amp; Résilience
            </span>
          </div>
          <p className="text-sm mt-1 leading-relaxed">
            {result.echeanceLegale.description}
          </p>
          {result.echeanceLegale.sanction && (
            <div className="mt-2 text-xs font-semibold text-red-800 bg-red-100/70 p-2 rounded-lg">
              ⚠️ Risque légal pour le bailleur : {result.echeanceLegale.sanction}
            </div>
          )}
        </div>
      </div>

      {/* 4. POSTES DE TRAVAUX RECOMMANDÉS */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Hammer size={18} className="text-brand-700" />
            <h4 className="font-display font-bold text-lg text-stone-900">
              Postes de travaux inclus dans ce chiffrage
            </h4>
          </div>
          <span className="text-xs text-stone-500">
            Adapté : {state.type === "appartement" ? "Appartement / Copropriété" : "Maison individuelle"}
          </span>
        </div>
        <p className="text-sm text-stone-600 mb-4">
          Ces travaux constituent le bouquet optimal pour sauter en <strong>Classe {result.nouvelleClasse}</strong> et débloquer les aides MaPrimeRénov' Parcours Accompagné au taux maximum.
        </p>
        <div className="space-y-3">
          {result.postes.map((p, idx) => (
            <div
              key={p.id || idx}
              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <Check size={18} className="text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-stone-900">{p.label}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{p.description}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-sm text-stone-800">{eur(p.coutEstime)}</div>
                <div className="text-[10px] text-stone-500">HT estimé</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DÉTAIL DES AIDES OFFICIELLES */}
      <div className="card">
        <h4 className="font-display font-bold text-stone-900 mb-3">
          Décomposition des subventions publiques mobilisables
        </h4>
        <div className="text-sm space-y-2.5 text-stone-700">
          <Row
            label="MaPrimeRénov' (parcours accompagné rénovation globale)"
            value={eur(result.primeMpr)}
          />
          <Row
            label="Certificats d'Économies d'Énergie (CEE 6e période 2026)"
            value={eur(result.primeCee)}
          />
          <Row
            label="TVA à taux réduit (5,5 % au lieu de 20 %)"
            value="Incluse dans le devis RGE"
          />
          <div className="border-t border-stone-200 my-2" />
          <Row
            label={<strong className="text-stone-900">Total des subventions déduites</strong>}
            value={
              <strong className="text-emerald-800 text-base">
                {eur(result.primeMpr + result.primeCee)}
              </strong>
            }
          />
        </div>
        <div className="mt-4 p-3 rounded-xl bg-stone-100/70 text-xs text-stone-600 leading-relaxed">
          <strong>Rappel réglementaire :</strong> Barèmes fixés par l'arrêté du 2 octobre 2025 (MaPrimeRénov' 2026) et les fiches CEE P6 en vigueur. Montants indicatifs à ±15 %, non contractuels. Seul l'audit énergétique réglementaire réalisé par un diagnostiqueur certifié RGE permet de déposer le dossier officiel auprès de l'Anah.
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  sub,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  highlight?: string;
}) {
  return (
    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 text-stone-300 text-xs mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${highlight || "text-white"}`}>
        {value}
      </div>
      <div className="text-[11px] text-stone-400 mt-0.5">{sub}</div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-stone-800">{label}</span>
      <span className="tabular-nums font-semibold text-stone-900">{value}</span>
    </div>
  );
}
