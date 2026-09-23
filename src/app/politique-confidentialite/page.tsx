import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Politique de confidentialit&eacute;</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Responsable de traitement</h2>
            <p className="text-stone-700">
              La soci&eacute;t&eacute; &eacute;ditrice de z&eacute;ropassoire.fr, joignable via la page Contact.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Donn&eacute;es collect&eacute;es</h2>
            <p className="text-stone-700">
              Uniquement les donn&eacute;es strictement n&eacute;cessaires &agrave; la r&eacute;alisation de la simulation
              et, si vous le souhaitez, &agrave; l'envoi de votre plan : email (requis), t&eacute;l&eacute;phone (optionnel),
              inputs du simulateur (classe DPE, surface, code postal, tranche de revenus, mode de chauffage,
              type de bien).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Finalit&eacute;s et base l&eacute;gale</h2>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>Envoi du plan de sortie chiffr&eacute; &mdash; ex&eacute;cution du service que vous demandez (art. 6.1.b RGPD)</li>
              <li>Rappel par un conseiller RGE &mdash; consentement explicite (art. 6.1.a)</li>
              <li>Newsletter &eacute;volutions des aides &mdash; consentement s&eacute;par&eacute;, r&eacute;vocable</li>
              <li>Statistiques d'usage anonymis&eacute;es &mdash; int&eacute;r&ecirc;t l&eacute;gitime (art. 6.1.f)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Dur&eacute;e de conservation</h2>
            <p className="text-stone-700">
              3 ans &agrave; compter du dernier contact, conform&eacute;ment &agrave; la recommandation CNIL.
              Les leads non-consentants &agrave; tout rappel sont supprim&eacute;s &agrave; J+30.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Sous-traitants</h2>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>Supabase (UE, Francfort) &mdash; base de donn&eacute;es</li>
              <li>Vercel (USA, Privacy Shield) &mdash; h&eacute;bergement applicatif</li>
            </ul>
            <p className="text-stone-700 mt-2">
              <strong>Aucun</strong> partage avec des tiers commerciaux (artisans, n&eacute;gociateurs, courtiers).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Vos droits</h2>
            <p className="text-stone-700">
              Acc&egrave;s, rectification, effacement, limitation, opposition, portabilit&eacute;. &Agrave; exercer par email
              via la page Contact. R&eacute;ponse sous 30 jours. R&eacute;clamation possible aupr&egrave;s de la CNIL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
