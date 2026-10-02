import Link from "next/link";
import type { Metadata } from "next";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  ShieldCheck,
  Star,
  ArrowRight,
  TrendingDown,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Award,
  Users
} from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Opérateurs Rénovation Globale & MAR 2026 | Zéro Passoire",
  description: "Comparatif des 12 mandataires, obligés CEE et Accompagnateurs Rénov' agréés pour sortir de passoire thermique F ou G. Analyse des marges et avis.",
  alternates: {
    canonical: "/operateurs",
  },
  openGraph: {
    title: "12 Opérateurs de Rénovation Globale & MAR au Banc d'Essai",
    description: "Audit des mandataires ANAH, obligés CEE et groupements d'artisans. Évitez les surcommissions et comparez les aides réelles 2026.",
    images: [
      {
        url: ogImageUrl({
          q: "12 Opérateurs Rénovation Globale & MAR",
          sub: "Audit des Marges d'Intermédiation & Avis • Sortie de Passoire DPE F & G",
          badge: "Observatoire MAR 2026",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function OperateursHubPage() {
  const breadcrumbItems = [{ name: "Opérateurs & MAR", href: "/operateurs" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Opérateurs de Rénovation Globale & Réseaux MAR 2026",
    description: "Sélection des acteurs nationaux de la rénovation énergétique globale et du Parcours Accompagné MaPrimeRénov'.",
    numberOfItems: OPERATORS.length,
    itemListElement: OPERATORS.map((op, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Organization",
        name: op.name,
        url: `https://zeropassoire.fr/operateurs/${op.slug}`,
        description: op.shortDescription,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: op.ratingValue,
          reviewCount: op.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Pourquoi faire appel à un mandataire ou à un opérateur pour sortir de passoire ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour bénéficier du Parcours Accompagné MaPrimeRénov' (jusqu'à 63 000 € d'aides pour les passoires F et G), le recours à un Mon Accompagnateur Rénov' (MAR) agréé par l'ANAH est une obligation légale depuis le 1er janvier 2024. Certains opérateurs proposent une formule tout-en-un incluant le MAR, les devis travaux et l'avance des aides.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la marge prélevée par les grands groupes et plateformes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les mandataires et courtiers nationaux prélèvent généralement entre 15 % et 30 % de marge d'intermédiation et de frais de dossier, intégrés directement dans les forfaits de travaux. Passer par un MAR indépendant tout en sollicitant des artisans RGE locaux en direct permet d'économiser cette marge.",
        },
      },
      {
        "@type": "Question",
        name: "Mon Accompagnateur Rénov' (MAR) est-il gratuit ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le coût de la prestation du MAR (entre 1 500 € et 2 500 €) est subventionné par l'ANAH à hauteur de 100 % pour les ménages très modestes (plafond de 2 000 €), 80 % pour les modestes, 40 % pour les intermédiaires et 20 % pour les ménages aisés.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Observatoire Indépendant des Mandataires &amp; MAR 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Opérateurs Rénovation Globale &amp; Réseaux MAR
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl leading-relaxed">
            Pour sortir votre logement du statut de passoire thermique (DPE F ou G) et toucher jusqu&apos;à <strong>63 000 €</strong> de MaPrimeRénov&apos;, découvrez notre audit comparatif des 12 mandataires, obligés CEE et réseaux de Mon Accompagnateur Rénov&apos;.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Règle d&apos;or anti-surcoût :</strong> Les plateformes nationales appliquent entre <strong>15 % et 28 % de commission</strong> répercutée sur vos devis. En mandatant un MAR indépendant et en contractant directement avec des artisans RGE en direct, vous préservez l&apos;intégralité de vos aides.
            </div>
          </div>
        </section>

        {/* Operators Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {OPERATORS.map((op) => (
            <article
              key={op.slug}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {op.category}
                  </span>
                  <div className="flex items-center text-amber-600 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                    {op.ratingValue}/5
                    <span className="text-stone-400 font-normal ml-1">({op.reviewCount})</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-stone-900 mb-2">
                  <Link
                    href={`/operateurs/${op.slug}`}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {op.name}
                  </Link>
                </h2>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {op.shortDescription}
                </p>

                <div className="space-y-1.5 mb-4">
                  {op.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="text-[11px] text-stone-500 mb-3 flex items-center justify-between">
                  <span>Marge estimée :</span>
                  <span className="font-semibold text-stone-700">{op.commissionEstimated.split("(")[0].slice(0, 22)}</span>
                </div>
                <Link
                  href={`/operateurs/${op.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-emerald-700 transition-colors"
                >
                  Lire l&apos;audit complet <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Arbitrage Guide Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 mb-16 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Stratégie de Décision
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-4">
              Quel opérateur choisir selon votre situation ?
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-8">
              La sortie de passoire thermique implique des travaux lourds (isolation toiture, ITE des murs, pompe à chaleur air-eau, ventilation double flux). Le choix de l&apos;opérateur conditionne votre reste à charge final.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1.5">1. MAR Indépendant + Artisans RGE</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  L&apos;option la plus rentable : vous payez le coût réel des travaux sans intermédiaire et bénéficiez d&apos;un audit thermique 100 % impartial.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1.5">2. Mandataire avec Avance (Hellio, Effy)</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Recommandé si vous n&apos;avez pas la trésorerie pour avancer les 30 000 à 50 000 € de subventions ANAH pendant les travaux.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1.5">3. Contractant Général (Camif Habitat)</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Indispensable pour les bâtisses anciennes d&apos;exception nécessitant une garantie juridique de résultat thermique et d&apos;achèvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead CTA Simulator Banner */}
        <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Simulateur Gratuit Sans Inscription
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 mb-4 leading-tight">
              Calculez votre reste à charge pour sortir de passoire F ou G
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Estimez le montant exact de votre MaPrimeRénov&apos; Parcours Accompagné, vos primes CEE et le saut de classe DPE réalisable en 5 questions, sans donner votre numéro de téléphone.
            </p>
            <Link
              href="/#simulateur"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg"
            >
              Lancer ma simulation gratuite <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            Questions fréquentes sur les opérateurs et le MAR
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200">
                <h3 className="font-bold text-stone-900 text-base mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
