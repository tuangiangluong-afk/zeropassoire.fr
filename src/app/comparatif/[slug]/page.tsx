import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PASSOIRE_DUELS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, Award, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

export const revalidate = 86400;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PASSOIRE_DUELS.map((d) => ({ slug: d.slug }));
}

const BASE_URL = "https://www.zeropassoire.fr";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const duel = PASSOIRE_DUELS.find((d) => d.slug === slug);
  if (!duel) return {};

  const canonicalUrl = `${BASE_URL}/comparatif/${slug}`;
  return {
    title: `${duel.title} : Comparatif & Avis Expert 2026`,
    description: `${duel.summary} Recommandation d'expert : ${duel.winner}. Grille comparative et impact sur le DPE.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${duel.title} — Duel Décisionnel Rénovation`,
      description: `${duel.summary} Verdict : ${duel.winner}.`,
      locale: "fr_FR",
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl({
            q: duel.title,
            sub: `Arbitrage : ${duel.winner} • Aides ANAH & Gain DPE`,
            badge: "Comparatif Décisionnel",
          }),
          width: 1200,
          height: 630,
          alt: duel.title,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function DuelDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const duel = PASSOIRE_DUELS.find((d) => d.slug === slug);
  if (!duel) return notFound();

  const canonicalUrl = `${BASE_URL}/comparatif/${slug}`;
  const breadcrumbItems = [
    { name: "Comparatifs & Duels", href: "/comparatifs" },
    { name: duel.title, href: `/comparatif/${slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel est le meilleur choix entre ${duel.subjectA} et ${duel.subjectB} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Notre recommandation pour une passoire thermique : ${duel.winner}. ${duel.summary} ${duel.verdict}`,
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les aides MaPrimeRénov' mobilisables ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Dans le cadre du Parcours Accompagné, l'ANAH finance jusqu'à 90 % du montant des travaux plafonné à 70 000 € HT sous réserve de réaliser un gain de 2 classes DPE minimum audité par un Mon Accompagnateur Rénov' (MAR).`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm mt-4 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {duel.category}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              Choix conseillé : {duel.winner}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            {duel.title}
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            {duel.summary}
          </p>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-stone-800 leading-relaxed">
            <strong className="text-emerald-950 font-bold">L&apos;avis tranché de l&apos;expert :</strong> {duel.verdict}
          </div>
        </section>

        {/* Detailed Criteria Matrix */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Scale className="w-6 h-6 text-emerald-700" />
            Tableau Comparatif Détaillé
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="py-3 px-4 font-semibold text-stone-700">Critère analysé</th>
                  <th className="py-3 px-4 font-semibold text-emerald-800">{duel.subjectA}</th>
                  <th className="py-3 px-4 font-semibold text-stone-800">{duel.subjectB}</th>
                  <th className="py-3 px-4 font-semibold text-stone-500">Impact Projet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {duel.criteria.map((c, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="py-3 px-4 font-medium text-stone-900">{c.label}</td>
                    <td className="py-3 px-4 text-emerald-900 font-medium">{c.scoreA}</td>
                    <td className="py-3 px-4 text-stone-600">{c.scoreB}</td>
                    <td className="py-3 px-4 text-stone-500 text-xs">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Lead Funnel */}
        <section className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Calculez votre reste à charge pour cette solution
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Notre simulateur applique les barèmes exacts de l&apos;ANAH selon votre revenu fiscal de référence (Bleu, Jaune, Violet, Rose) et votre localisation.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-md"
          >
            Lancer ma simulation gratuite <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
