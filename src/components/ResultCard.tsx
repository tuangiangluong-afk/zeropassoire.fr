"use client";
import { TrendingDown, TrendingUp, FileCheck, Check } from "lucide-react";
import type { SimulateurResult } from "@/lib/pricing";

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n)) + " &euro;";

export default function ResultCard({
  result,
  state,
}: {
  result: SimulateurResult;
  state: { classe: string; surface: number };
}) {
  const gainYear = result.gainFactureMensuel * 12;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-6 sm:p-8">
        <div className="text-brand-100 text-sm font-semibold uppercase tracking-wide mb-2">
          Votre sortie de passoire
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="font-display text-5xl font-bold">
            {result.nouvelleClasse}
          </div>
          <div className="text-brand-200 text-lg">
            <span className="line-through">{state.classe}</span> &rarr; {result.nouvelleClasse}
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
          <Stat icon={<TrendingUp size={18} />} label="Coût travaux estimé">
            {eur(result.coutTravauxMin)} &ndash; {eur(result.coutTravauxMax)}
          </Stat>
          <Stat icon={<Check size={18} />} label="Aides mobilisables">
            {eur(result.primeMpr + result.primeCee)}
          </Stat>
          <Stat icon={<TrendingDown size={18} />} label="Reste &agrave; charge estim&eacute;">
            <span className="font-bold">{eur(result.resteAMinerMin)} &ndash; {eur(result.resteAMinerMax)}</span>
          </Stat>
          <Stat icon={<FileCheck size={18} />} label="Gain facture &eacute;nergie">
            {eur(result.gainFactureMensuel)}/mois &middot; {eur(gainYear)}/an
          </Stat>
        </div>
      </div>

      <div className="card">
        <h4 className="font-display font-bold text-stone-900 mb-3">D&eacute;tail des aides retenues</h4>
        <div className="text-sm space-y-2 text-stone-700">
          <Row label="MaPrimeR&eacute;nov' (parcours accompagn&eacute;)" value={eur(result.primeMpr)} />
          <Row label="CEE (BAR-TH-105 / 106)" value={eur(result.primeCee)} />
          <div className="border-t border-stone-200 my-2" />
          <Row label={<strong>Total aides</strong>} value={<strong>{eur(result.primeMpr + result.primeCee)}</strong>} />
        </div>
        <div className="mt-4 text-xs text-stone-500 leading-relaxed">
          Zone climatique {result.contexte.climat} &middot; bar&egrave;mes arr&ecirc;t&eacute;s MPR&nbsp;2026&nbsp;(2 oct. 2025),
          CEE&nbsp;P6&nbsp;(janv.&nbsp;2026). Montants indicatifs, non contractuels. Un audit &eacute;nerg&eacute;tique RGE
          affine le r&eacute;sultat &agrave; votre situation.
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 opacity-80">{icon}</div>
      <div>
        <div className="text-brand-200 text-xs">{label}</div>
        <div className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: String(children) }} />
      </div>
    </div>
  );
}
function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span dangerouslySetInnerHTML={{ __html: String(label) }} />
      <span className="tabular-nums" dangerouslySetInnerHTML={{ __html: String(value) }} />
    </div>
  );
}
