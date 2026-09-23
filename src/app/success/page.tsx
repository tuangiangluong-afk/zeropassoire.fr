import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download, Share2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Merci — votre plan de sortie est en route",
  description: "Confirmation d'envoi de votre plan de sortie de passoire énergétique.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  // In a real deployment, this page could fetch the lead's snapshot via session_id from
  // sessionStorage and personalize the checklist. Kept static to avoid extra fetch at load.
  return (
    <section className="py-20 bg-stone-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <CheckCircle2 className="w-16 h-16 text-brand-600 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
            C'est envoyé.
          </h1>
          <p className="text-stone-600">
            Vérifiez votre boîte mail : le PDF de votre plan de sortie + la liste
            des pros RGE de votre secteur y sont (et pensez à regarder les spams).
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-bold text-stone-900 mb-4">
            Les 3 choses à faire dans les 30 prochains jours
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <div className="font-semibold text-stone-900">Demander un audit énergétique</div>
                <p className="text-sm text-stone-600 mt-1">
                  Obligatoire pour les E/F/G vendus ou loués. Entre 450 € et 750 €, pris en charge à 100 % par MPR bleu et
                  CEE. Il affine votre reste à charge à ±5 %.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <div className="font-semibold text-stone-900">Contacter 2–3 artisans RGE différents</div>
                <p className="text-sm text-stone-600 mt-1">
                  Comparez à poste égal (même matériel, même surface d'isolant). Un écart de 30 %+ entre deux devis
                  est suspect.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <div className="font-semibold text-stone-900">Déposer le dossier MaPrimeRénov' AVANT signature</div>
                <p className="text-sm text-stone-600 mt-1">
                  Un devis signé avant l'accord MPR = 0 € d'aide. Point de non-retour à ne pas rater.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Viral loop */}
        <div className="mt-8 card bg-brand-50 border-brand-200">
          <div className="flex items-center gap-2 text-brand-800 mb-2">
            <Share2 size={18} />
            <div className="font-display font-bold">Une idée ? Partagez ce simulateur</div>
          </div>
          <p className="text-sm text-stone-700 mb-3">
            Vous connaissez un voisin, un collègue, un parent coincé avec un DPE F ?
            Il mérite les mêmes chiffres que vous.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href={`whatsapp://send?text=${encodeURIComponent("J'ai utilisé zéropassoire.fr pour estimer mon reste à charge de sortie de passoire énergétique. Le simulateur est honnête, sans démarchage : https://www.zeropassoire.fr")}`}
               className="btn-secondary !py-2 !text-sm">
              Partager sur WhatsApp
            </a>
            <a href={`mailto:?subject=${encodeURIComponent("Un simulateur honnête pour les passoires thermiques")}&body=${encodeURIComponent("Salut,\n\nJe viens de tomber sur zéropassoire.fr, un simulateur qui donne les vrais chiffres sans te demander ton téléphone. Je me suis dit que ça pourrait te servir.\n\n→ https://www.zeropassoire.fr\n\nÀ plus.")}`}
               className="btn-secondary !py-2 !text-sm">
              Par email
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/guides" className="inline-flex items-center gap-1 text-brand-700 font-semibold hover:gap-2 transition-all">
            Continuer avec les guides <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
