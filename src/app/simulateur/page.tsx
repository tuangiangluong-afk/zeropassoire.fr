import type { Metadata } from "next";
import Simulator from "@/components/Simulator";

export const metadata: Metadata = {
  title: "Simulateur sortie de passoire énergétique 2026 — Reste à charge & Aides",
  description:
    "Combien coûte la sortie d'un DPE F ou G ? Simulateur indépendant basé sur les barèmes MaPrimeRénov' et CEE 2026. Résultat gratuit immédiat, sans email requis.",
  alternates: { canonical: "https://zeropassoire.fr/simulateur" },
  openGraph: {
    title: "Simulateur officiel de sortie de passoire énergétique 2026",
    description: "Chiffrez en 40 secondes votre reste à charge, vos aides MPR/CEE et votre saut de classe DPE.",
    url: "https://zeropassoire.fr/simulateur",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Simulateur Zéro Passoire" }],
  },
};

const BASE_URL = "https://zeropassoire.fr";

export default function SimulateurPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
    hasPart: [{ "@id": `${BASE_URL}/simulateur#app` }],
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

      <section className="py-14 sm:py-20 bg-stone-50 min-h-[75vh]">
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
    </>
  );
}
