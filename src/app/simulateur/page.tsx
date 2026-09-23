import type { Metadata } from "next";
import Simulator from "@/components/Simulator";

export const metadata: Metadata = {
  title: "Simulateur sortie de passoire énergétique 2026",
  description:
    "Combien coûte la sortie d'un DPE F ou G ? Simulateur indépendant basé sur les barèmes MaPrimeRénov' et CEE 2026. Résultat gratuit, sans email requis.",
  alternates: { canonical: "https://zeropassoire.fr/simulateur" },
};

export default function SimulateurPage() {
  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
            Simulateur ind&eacute;pendant &middot; 40 secondes
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
            Combien co&ucirc;te votre sortie de passoire&nbsp;?
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto">
            Bar&egrave;mes officiels 2026 (arr&ecirc;t&eacute; MPR du 2 oct. 2025, fiches CEE BAR-TH).
            R&eacute;sultat affich&eacute; imm&eacute;diatement, sans email requis.
          </p>
        </div>
        <Simulator />
      </div>
    </section>
  );
}
