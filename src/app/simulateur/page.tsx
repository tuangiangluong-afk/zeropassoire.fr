import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, AlertTriangle, Scale, Calculator, ShieldCheck, Zap } from "lucide-react";
import Simulator from "@/components/Simulator";

export const metadata: Metadata = {
  title: "Simulateur DPE 2026 : Aides & Reste à Charge",
  description:
    "Estimez le coût pour sortir d'un DPE F ou G : aides MaPrimeRénov' 2026, primes CEE et reste à charge réel. Calcul gratuit et immédiat sans démarchage.",
  alternates: { canonical: "https://www.zeropassoire.fr/simulateur" },
  openGraph: {
    title: "Simulateur officiel de sortie de passoire énergétique 2026",
    description: "Chiffrez en 40 secondes votre reste à charge, vos aides MPR/CEE et votre saut de classe DPE.",
    url: "https://www.zeropassoire.fr/simulateur",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Simulateur Zéro Passoire" }],
  },
};

const BASE_URL = "https://www.zeropassoire.fr";

const SIMULATOR_FAQS = [
  {
    q: "Quelle est la fiabilité des montants calculés par ce simulateur ?",
    a: "Le simulateur Zéro Passoire applique avec une précision de ±10 à 15 % les barèmes officiels issus de l'arrêté MaPrimeRénov' du 2 octobre 2025 et les forfaits CEE BAR-TH 6e période 2026. Les coûts bruts de travaux sont calibrés sur les médianes réelles constatées par l'ADEME sur plus de 120 000 chantiers récents. Seul un audit énergétique réglementaire réalisé in situ par un diagnostiqueur certifié est juridiquement opposable.",
  },
  {
    q: "Pourquoi les travaux diffèrent-ils fondamentalement entre maison et appartement ?",
    a: "En copropriété, les travaux touchant l'enveloppe extérieure (ITE, réfection de toiture, chaudière collective) relèvent des parties communes et exigent un vote en assemblée générale (art. 24 ou 25 loi du 10 juillet 1965). Le simulateur adapte son moteur en excluant les postes impossibles à titre privatif (pas de PAC air-eau individuelle ni d'isolation de combles en appartement) pour se concentrer sur l'isolation intérieure (ITI), les fenêtres Uw ≤ 1.3 et la ventilation.",
  },
  {
    q: "Peut-on signer un devis d'artisan avant de déposer son dossier d'aide ?",
    a: "NON. C'est le piège numéro un qui fait perdre 100 % des aides publiques. Tout devis signé ou tout acompte versé avant la confirmation de dépôt officiel de votre dossier sur le guichet de l'Anah (France Rénov') entraîne la déchéance immédiate et irrévocable de vos subventions MaPrimeRénov'. Vous devez impérativement obtenir l'accusé d'éligibilité avant signature.",
  },
  {
    q: "Comment fonctionne la règle officielle d'écrêtement des aides ?",
    a: "L'État interdit que le cumul de MaPrimeRénov', des primes CEE et des aides locales dépasse un pourcentage maximal de la dépense éligible HT : 100 % pour les ménages très modestes (Bleu), 80 % pour les modestes (Jaune), 60 % pour les intermédiaires (Violet) et 40 % pour les revenus supérieurs (Rose). Le simulateur intègre automatiquement cette règle mathématique d'écrêtement.",
  },
  {
    q: "Que risque un bailleur qui continue de louer une passoire G en 2026 ?",
    a: "Depuis le 1er janvier 2025, tout renouvellement ou signature de bail pour un logement classé G est illégal (art. 159 loi Climat & Résilience). Le bailleur s'expose à une amende administrative jusqu'à 20 000 € (60 000 € pour une personne morale) et à une action judiciaire du locataire pouvant imposer la diminution rétroactive du loyer jusqu'à 50 % assortie d'une astreinte financière par jour de retard.",
  },
  {
    q: "Comment financer le reste à charge sans épargne personnelle ?",
    a: "Le reste à charge peut être financé à 100 % via l'Éco-Prêt à Taux Zéro (Éco-PTZ), plafonné à 50 000 € remboursable sur 20 ans sans intérêts pour une rénovation globale. Pour les ménages très modestes, l'Anah peut accorder une avance de trésorerie allant jusqu'à 70 % du montant de la prime avant le début effectif du chantier.",
  },
];

export default function SimulateurPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/simulateur#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Simulateur", item: `${BASE_URL}/simulateur` },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}/simulateur#app`,
    name: "Simulateur Zéro Passoire 2026",
    url: `${BASE_URL}/simulateur`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/simulateur`,
    },
    featureList: [
      "Calcul des aides MaPrimeRénov' 2026 selon profil fiscal Anah",
      "Calcul des primes CEE selon zone climatique H1/H2/H3",
      "Décomposition des postes de travaux maison et appartement",
      "Calcul de l'amortissement du reste à charge par les économies d'énergie",
      "Vérification des échéances légales d'interdiction de location 2025/2028/2034",
    ],
    provider: { "@id": `${BASE_URL}/#organization` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/simulateur#faq`,
    mainEntity: SIMULATOR_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/simulateur#webpage`,
    url: `${BASE_URL}/simulateur`,
    name: "Simulateur Zéro Passoire — coût de sortie de passoire énergétique 2026",
    description:
      "Simulateur indépendant basé sur les barèmes officiels MaPrimeRénov', CEE et ADEME 2026. Résultat immédiat, sans email requis.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    breadcrumb: { "@id": `${BASE_URL}/simulateur#breadcrumb` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h1 + p", ".card h3"],
    },
    hasPart: [
      { "@id": `${BASE_URL}/simulateur#app` },
      { "@id": `${BASE_URL}/simulateur#faq` },
    ],
    primaryImageOfPage: `${BASE_URL}/opengraph-image.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero & Simulator Engine */}
      <section className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-semibold text-emerald-800 mb-3">
              Moteur officiel &middot; Mise à jour 23 septembre 2026
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-3 tracking-tight">
              Combien coûte votre sortie de passoire&nbsp;?
            </h1>
            <p className="text-stone-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Arrêté MPR du 2 oct. 2025, fiches CEE 6e période et médianes chantiers ADEME.
              Résultat affiché immédiatement, <strong>sans aucun numéro ni email requis</strong>.
            </p>
          </div>
          <Simulator />
        </div>
      </section>

      {/* Information Gain Section 1: Methodology & Official Rules */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-2">
              <Calculator size={14} /> Transparence mathématique
            </div>
            <h2 className="font-display text-3xl font-bold text-stone-900">
              Comment notre moteur calcule votre reste à charge
            </h2>
            <p className="mt-3 text-stone-600">
              Contrairement aux comparateurs commerciaux qui affichent des « primes jusqu’à 90 % » sans mentionner les plafonds, notre algorithme applique l’intégralité des règles de calcul de l’Anah et du ministère de l’Énergie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                Assiette des travaux & Écrêtement officiel
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                L’aide MaPrimeRénov’ Parcours Accompagné est calculée sur un plafond de dépenses éligibles HT de <strong>40 000 €</strong> (gain de 2 classes DPE), <strong>55 000 €</strong> (gain de 3 classes) ou <strong>70 000 €</strong> (gain de 4 classes). Un bonus « sortie de passoire » de +10 % est appliqué pour tout passage effectif d’une classe F ou G à une classe D ou mieux.
              </p>
              <div className="text-xs font-mono bg-white p-3 rounded-xl border border-stone-200 text-stone-700">
                Plafond légal d’écrêtement :<br />
                • Bleu : max 100 % TTC de la dépense éligible<br />
                • Jaune : max 80 % TTC<br />
                • Violet : max 60 % TTC<br />
                • Rose : max 40 % TTC
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                Modulation climatique CEE (H1, H2, H3)
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                Les Certificats d’Économies d’Énergie (CEE) de la 6e période varient selon le climat de votre département. La prime pour une pompe à chaleur ou une isolation est plus élevée dans le Nord et l'Est (Zone H1) que sur le pourtour méditerranéen (Zone H3).
              </p>
              <div className="text-xs font-mono bg-white p-3 rounded-xl border border-stone-200 text-stone-700">
                Coefficients climatiques en vigueur :<br />
                • Zone H1 (Nord, Est, IDF) : Coeff 1.20 à 1.30 (aide maximale)<br />
                • Zone H2 (Façade Ouest, Sud-Ouest) : Coeff 1.00<br />
                • Zone H3 (Méditerranée) : Coeff 0.75 à 0.85
              </div>
            </div>
          </div>

          {/* Official Anah brackets table */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-lg">Matrice officielle des aides Anah 2026</h4>
                <p className="text-xs text-stone-300">Arrêté du 2 octobre 2025 (Journal Officiel du 5 octobre 2025)</p>
              </div>
              <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-stone-800 border border-stone-700 font-mono text-emerald-400">
                Vérifié 2026
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-100 text-stone-900 border-b border-stone-200">
                  <tr>
                    <th className="text-left p-3.5 font-semibold">Profil fiscal</th>
                    <th className="text-left p-3.5 font-semibold">Taux de base</th>
                    <th className="text-left p-3.5 font-semibold">Avec bonus sortie F/G</th>
                    <th className="text-left p-3.5 font-semibold">Plafond d'écrêtement</th>
                    <th className="text-left p-3.5 font-semibold">Reste à charge minimum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="p-3.5 font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> Bleu (très modeste)
                    </td>
                    <td className="p-3.5 text-stone-700">80 %</td>
                    <td className="p-3.5 font-semibold text-emerald-700">90 %</td>
                    <td className="p-3.5 text-stone-700 font-mono">100 % HT</td>
                    <td className="p-3.5 font-bold text-stone-900">10 %</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="p-3.5 font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Jaune (modeste)
                    </td>
                    <td className="p-3.5 text-stone-700">65 %</td>
                    <td className="p-3.5 font-semibold text-emerald-700">75 %</td>
                    <td className="p-3.5 text-stone-700 font-mono">80 % HT</td>
                    <td className="p-3.5 font-bold text-stone-900">20 %</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" /> Violet (intermédiaire)
                    </td>
                    <td className="p-3.5 text-stone-700">50 %</td>
                    <td className="p-3.5 font-semibold text-emerald-700">60 %</td>
                    <td className="p-3.5 text-stone-700 font-mono">60 % HT</td>
                    <td className="p-3.5 font-bold text-stone-900">40 %</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="p-3.5 font-medium flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Rose (supérieur)
                    </td>
                    <td className="p-3.5 text-stone-700">30 %</td>
                    <td className="p-3.5 font-semibold text-emerald-700">40 %</td>
                    <td className="p-3.5 text-stone-700 font-mono">40 % HT</td>
                    <td className="p-3.5 font-bold text-stone-900">60 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking & Pillars Cluster */}
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-2">
              <BookOpen size={14} /> Maillage stratégique
            </div>
            <h2 className="font-display text-3xl font-bold text-stone-900">
              Guides et réglementations pour approfondir votre simulation
            </h2>
            <p className="mt-2 text-stone-600">
              Ne prenez aucune décision de chantier sans avoir consulté les textes de loi et les guides techniques de référence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/guides/interdiction-location-passoire-thermique"
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-brand-600 transition shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-md mb-3">
                  <Scale size={12} /> Bailleurs & Contentieux
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-brand-700 transition mb-2">
                  Interdiction de location des passoires
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Classe G interdite en 2025, classe F en 2028. Sanctions civiles (baisse de loyer rétroactive), amende administrative jusqu'à 20 000 € et les 3 exceptions juridiques réelles.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-brand-700 gap-1">
                Consulter la jurisprudence <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/guides/aides-financieres-sortie-passoire-2026"
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-brand-600 transition shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md mb-3">
                  <Calculator size={12} /> Fiscalité & Primes 2026
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-brand-700 transition mb-2">
                  Barèmes MaPrimeRénov' & CEE 2026
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Plafonds de ressources RFR Île-de-France et Province, fiches CEE 6e période, TVA 5,5 % et prêt à taux zéro (Éco-PTZ) jusqu'à 50 000 € sur 20 ans.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-brand-700 gap-1">
                Voir tous les barèmes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/guides/sortir-de-passoire-energetique-2026"
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-brand-600 transition shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-md mb-3">
                  <ShieldCheck size={12} /> Technique & Chantiers
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-brand-700 transition mb-2">
                  Le parcours complet de travaux
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Physique thermique des déperditions, 4 archétypes constructifs (pierre pré-1948, pavillons 1970), majorité en copropriété et les 7 fraudes DGCCRF à déjouer.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-brand-700 gap-1">
                Découvrir le parcours <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Simulator FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-stone-900">
              Questions fréquentes sur les calculs du simulateur
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              Réponses d'experts certifiés et juristes en droit de l'énergie.
            </p>
          </div>

          <div className="space-y-4">
            {SIMULATOR_FAQS.map((faq, idx) => (
              <details key={idx} className="faq-item group">
                <summary className="cursor-pointer font-semibold text-stone-900 flex justify-between items-center py-4">
                  <span>{faq.q}</span>
                </summary>
                <div className="pt-2 pb-4 text-stone-600 text-sm leading-relaxed border-t border-stone-100 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
