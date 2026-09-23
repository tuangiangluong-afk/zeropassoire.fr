import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  robots: { index: false },
};

export default function CgvPage() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Conditions g&eacute;n&eacute;rales d'utilisation</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">1. Objet</h2>
            <p className="text-stone-700">
              Les pr&eacute;sentes CGU r&eacute;gissent l'utilisation du simulateur z&eacute;ropassoire.fr et des guides
              &eacute;ditoriaux associ&eacute;s. L'utilisation du site vaut acceptation pleine et enti&egrave;re des CGU.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">2. Absence de valeur contractuelle</h2>
            <p className="text-stone-700">
              Les r&eacute;sultats du simulateur sont fournis &agrave; titre indicatif. Ils ne constituent pas un devis,
              une promesse de vente ou un engagement de financement. Les aides mobilisables d&eacute;pendent
              d'une &eacute;tude de situation r&eacute;alis&eacute;e par un professionnel RGE qualifi&eacute;, seul habilit&eacute; &agrave;
              confirmer l'&eacute;ligibilit&eacute; &agrave; MaPrimeR&eacute;nov', aux CEE ou aux aides locales.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">3. Responsabilit&eacute;</h2>
            <p className="text-stone-700">
              Z&eacute;ro Passoire met tout en œuvre pour maintenir les bar&egrave;mes &agrave; jour. Elle ne saurait
              &ecirc;tre tenue responsable des &eacute;volutions r&eacute;glementaires post&eacute;rieures &agrave; la derni&egrave;re mise &agrave;
              jour, ni des d&eacute;cisions prises par l'utilisateur &agrave; partir des r&eacute;sultats.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">4. Propri&eacute;t&eacute; des leads</h2>
            <p className="text-stone-700">
              Les coordonn&eacute;es collect&eacute;es restent la propri&eacute;t&eacute; de leur titulaire, trait&eacute;es
              conform&eacute;ment au RGPD et &agrave; la politique de confidentialit&eacute;. Aucune cession &agrave; des tiers
              commerciaux n'est op&eacute;r&eacute;e.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">5. Droit applicable</h2>
            <p className="text-stone-700">
              Les pr&eacute;sentes sont r&eacute;gies par le droit fran&ccedil;ais. Tout litige sera soumis aux
              tribunaux comp&eacute;tents du si&egrave;ge de l'&eacute;diteur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
