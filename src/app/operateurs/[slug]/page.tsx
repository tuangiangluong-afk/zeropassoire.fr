import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  TrendingDown,
  Calendar,
  Building2,
  Scale
} from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OPERATORS.map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const op = OPERATORS.find((o) => o.slug === slug);
  if (!op) return {};

  const title = `${op.name} : Avis, Tarifs & Aides 2026 | Zéro Passoire`;
  const description = `Audit indépendant de ${op.name} : marge réelle, agrément MAR, reste à charge MaPrimeRénov' et avis certifiés pour sortir de passoire F ou G.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/operateurs/${op.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl({
            q: op.name,
            sub: "Audit Décryptage & Marges Réelles • MaPrimeRénov' 2026",
            badge: "Fiche Opérateur 2026",
          }),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function OperateurDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const op = OPERATORS.find((o) => o.slug === slug);
  if (!op) notFound();

  const breadcrumbs = [
    { name: "Opérateurs & MAR", href: "/operateurs" },
    { name: op.name, href: `/operateurs/${op.slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Accompagnement Rénovation Globale - ${op.name}`,
    image: ogImageUrl({
      q: op.name,
      sub: "Audit Mandataire & MAR 2026",
      badge: "Zéro Passoire",
    }),
    description: op.shortDescription,
    sku: `ZP-OP-${op.slug.toUpperCase()}`,
    mpn: `MAR-${op.slug}`,
    brand: {
      "@type": "Brand",
      name: op.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: op.ratingValue,
      reviewCount: op.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: op.ratingValue,
        bestRating: 5,
      },
      author: {
        "@type": "Organization",
        name: "Observatoire Zéro Passoire",
      },
      reviewBody: op.verdict,
      datePublished: op.publishedAt,
    },
    offers: {
      "@type": "Offer",
      url: `https://zeropassoire.fr/operateurs/${op.slug}`,
      priceCurrency: "EUR",
      price: op.priceRange === "€€" ? "1800" : op.priceRange === "€€€" ? "2200" : "2800",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: op.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "EUR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 21,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quels sont les points forts de ${op.name} pour une passoire thermique ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: op.pros.join(". ") + ".",
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les limites ou surcoûts constatés chez ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: op.cons.join(". ") + `. Marge d'intermédiation estimée : ${op.commissionEstimated}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment éviter de payer une surcommission auprès de ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour éviter la commission d'intermédiaire, nous conseillons d'obtenir une proposition chez ${op.name} puis de la faire chiffrer à l'identique par 3 artisans RGE indépendants en direct, assistés d'un Mon Accompagnateur Rénov' neutre.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <section className="mt-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {op.category}
            </span>
            {op.agrementMAR && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Agrément MAR ANAH
              </span>
            )}
            {op.certifiedRGE && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-800">
                Réseau RGE Certifié
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Avis &amp; Décryptage :{" "}
            <span className="text-emerald-700">{op.name}</span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            {op.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white border border-stone-200 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <strong className="text-stone-900">{op.ratingValue}/5</strong>
              <span className="text-stone-500">({op.reviewCount} avis clients)</span>
            </div>
            <div className="border-l border-stone-200 pl-4 text-xs text-stone-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Audit mis à jour : 24 septembre 2026</span>
            </div>
          </div>
        </section>

        {/* Financial & Margin Audit */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-700" />
            Audit Économique &amp; Modèle de Frais
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                Gamme de Prix
              </div>
              <div className="text-2xl font-black text-stone-900 mb-1">
                {op.priceRange}
              </div>
              <p className="text-xs text-stone-500">
                Positionnement tarifaire global sur les chantiers F et G
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Marge d&apos;Intermédiation
              </div>
              <div className="text-sm font-bold text-emerald-900 mb-1">
                {op.commissionEstimated}
              </div>
              <p className="text-xs text-stone-600">
                Frais de structure, marketing et gestion de dossier
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 shadow-sm">
              <div className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
                Gain de Trésorerie
              </div>
              <div className="text-sm font-bold text-stone-900 mb-1">
                {op.pros[0]?.includes("avance") ? "Avance de subvention disponible" : "Remboursement sur facture acquittée"}
              </div>
              <p className="text-xs text-stone-600">
                Impact sur le besoin de trésorerie au démarrage du chantier
              </p>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Points forts de {op.name}
              </h3>
              <ul className="space-y-3">
                {op.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-stone-400" />
                Limites &amp; Points de vigilance
              </h3>
              <ul className="space-y-3">
                {op.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                    <XCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Editorial Review */}
        <section className="mb-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              L&apos;Avis d&apos;Expert Zéro Passoire
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
              {op.editorialReview}
            </p>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
              <strong>Matériels et marques privilégiées :</strong> {op.hardwareBrands.join(", ")}.
            </div>
          </div>
        </section>

        {/* Verdict Banner */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-stone-900 to-emerald-950 text-white shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              Le Verdict en 1 Ligne
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">{op.verdict}</h3>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-stone-700/80 text-xs text-stone-300">
              <span>Éligible MaPrimeRénov&apos; Parcours Accompagné</span>
              <span>•</span>
              <span>Audit Réglementaire Opposable</span>
              <span>•</span>
              <span>Conformité Loi Climat 2026</span>
            </div>
          </div>
        </section>

        {/* Arbitrage CTA */}
        <section className="mb-14">
          <div className="bg-emerald-50 rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-sm text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Arbitrage Recommandé
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 mb-4">
              {op.arbitrageCTA}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
              Ne signez jamais un devis de rénovation globale à 40 000 ou 70 000 € sans avoir comparé avec un Mon Accompagnateur Rénov&apos; indépendant et des artisans RGE directs de votre secteur.
            </p>
            <Link
              href="/#simulateur"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors shadow-md"
            >
              Estimer mon reste à charge en circuit court <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            Questions fréquentes sur {op.name}
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
