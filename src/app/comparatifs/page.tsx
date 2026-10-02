import Link from "next/link";
import type { Metadata } from "next";
import { PASSOIRE_DUELS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Scale, ArrowRight, CheckCircle2, Award, Zap } from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comparatifs & Arbitrages Rénovation Énergétique | Zéro Passoire",
  description: "Comparatifs neutres pour sortir de passoire thermique : Parcours Accompagné vs Geste, ITE vs ITI, PAC vs Granulés, Audit vs DPE.",
  alternates: {
    canonical: "/comparatifs",
  },
  openGraph: {
    title: "Duels & Arbitrages Techniques pour Sortir de Passoire DPE F & G",
    description: "Chiffres réels, rentabilité financière et gains de classes DPE analysés critère par critère sans parti pris.",
    images: [
      {
        url: ogImageUrl({
          q: "Comparatifs & Arbitrages Sortie Passoire",
          sub: "Parcours Accompagné vs Monogeste • ITE vs ITI • PAC vs Granulés",
          badge: "Duels Techniques 2026",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ComparatifsHubPage() {
  const breadcrumbItems = [{ name: "Comparatifs", href: "/comparatifs" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatifs et Duels Techniques Sortie de Passoire 2026",
    description: "Analyses comparatives d'experts pour arbitrer les choix clés de rénovation globale.",
    numberOfItems: PASSOIRE_DUELS.length,
    itemListElement: PASSOIRE_DUELS.map((d, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Article",
        headline: d.title,
        description: d.summary,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PASSOIRE_DUELS.map((d) => ({
      "@type": "Question",
      name: d.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${d.summary} Vainqueur recommandé : ${d.winner}. ${d.verdict}`,
      },
    })),
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

        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <Scale className="w-4 h-4 text-emerald-700" />
            Arbitrages Techniques &amp; Financiers 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Comparatifs &amp; Duels pour Sortir de Passoire Thermique
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl leading-relaxed">
            Chaque arbitrage conditionne la réussite de votre rénovation : découvrez nos analyses comparatives basées sur les coûts réels constatés par l&apos;ADEME et les textes officiels MaPrimeRénov&apos;.
          </p>
        </section>

        <section className="space-y-8 mb-16">
          {PASSOIRE_DUELS.map((duel) => (
            <article
              key={duel.slug}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                  {duel.category}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Recommandation : {duel.winner}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-stone-900 mb-3">
                {duel.title}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {duel.summary}
              </p>

              {/* Comparison Matrix Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <th className="py-2.5 px-3 font-semibold text-stone-700">Critère analysé</th>
                      <th className="py-2.5 px-3 font-semibold text-emerald-800">{duel.subjectA}</th>
                      <th className="py-2.5 px-3 font-semibold text-stone-800">{duel.subjectB}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {duel.criteria.map((c, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3 font-medium text-stone-900">{c.label}</td>
                        <td className="py-2.5 px-3 text-emerald-900 font-medium">{c.scoreA}</td>
                        <td className="py-2.5 px-3 text-stone-600">{c.scoreB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 mb-6 leading-relaxed">
                <strong>Verdict d&apos;expert :</strong> {duel.verdict}
              </div>

              <div className="flex justify-end">
                <Link
                  href="/#simulateur"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  Simuler ce scénario sur mon logement <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Lead CTA Simulator */}
        <section className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto mb-16 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Vous hésitez sur le bon bouquet de travaux ?
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Notre simulateur calcule pour votre maison ou appartement la combinaison optimale (ITE, PAC, VMC) pour maximiser vos aides et sortir définitivement du statut de passoire.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-md"
          >
            Lancer le calcul d&apos;optimisation gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
