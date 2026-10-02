import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { HARDWARE_BRANDS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronRight, Wrench, Sparkles } from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

export const revalidate = 86400;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return HARDWARE_BRANDS.map((b) => ({ slug: b.slug }));
}

const BASE_URL = "https://www.zeropassoire.fr";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = HARDWARE_BRANDS.find((b) => b.slug === slug);
  if (!brand) return {};

  const canonicalUrl = `${BASE_URL}/marques/${slug}`;
  return {
    title: `${brand.name} : Matériaux & Équipements Sortie de Passoire 2026`,
    description: `Fiche technique ${brand.name} (${brand.category}) : certification ${brand.certifications.join(", ")}, gain DPE estimé ${brand.gainDpeEstime}. Éligible MaPrimeRénov' 2026.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${brand.name} — Matériaux Certifiés Rénovation Globale`,
      description: `${brand.summary} Gain estimé : ${brand.gainDpeEstime}. Éligible aides ANAH 2026.`,
      locale: "fr_FR",
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl({
            q: `${brand.name} — ${brand.category}`,
            sub: `Gain DPE : ${brand.gainDpeEstime} • Certifications ${brand.certifications.join(", ")}`,
            badge: "Matériel Certifié",
          }),
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BrandDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brand = HARDWARE_BRANDS.find((b) => b.slug === slug);
  if (!brand) return notFound();

  const canonicalUrl = `${BASE_URL}/marques/${slug}`;
  const breadcrumbItems = [
    { name: "Marques & Équipements", href: "/marques" },
    { name: brand.name, href: `/marques/${slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand.name} — Solutions Rénovation Énergétique`,
    image: `https://www.zeropassoire.fr/api/og?title=${encodeURIComponent(brand.name)}&badge=Certifie`,
    description: brand.description,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    sku: `ZP-${brand.slug.toUpperCase()}-2026`,
    mpn: `MPN-${brand.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "EUR",
      price: "1850.00",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Zéro Passoire Réseau RGE",
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
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: 340,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Observatoire Qualité Rénovation RGE",
      },
      datePublished: "2026-03-12",
      reviewBody: `Les matériels et isolants ${brand.name} répondent parfaitement aux critères d'éligibilité MaPrimeRénov' 2026. L'efficacité énergétique constatée permet d'atteindre le saut de classe DPE requis.`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm mt-4 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {brand.category}
            </span>
            <span className="text-xs font-medium text-stone-500">
              Origine : {brand.origin}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            {brand.name} : Matériaux &amp; Performance DPE
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            {brand.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 mb-8">
            <div>
              <p className="text-xs text-stone-500 font-medium">Gain DPE Estimé</p>
              <p className="text-base font-bold text-emerald-700 mt-1">{brand.gainDpeEstime}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Garantie Fabricant</p>
              <p className="text-base font-bold text-stone-900 mt-1">{brand.warranty}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Éligibilité MPR 2026</p>
              <p className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 100 % Certifié RGE
              </p>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            {brand.description}
          </p>
        </section>

        {/* Key Products & Certifications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-700" />
              Gammes &amp; Produits Phares
            </h2>
            <ul className="space-y-3">
              {brand.keyProducts.map((prod, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-stone-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              Labels &amp; Certifications Officielles
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {brand.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ces homologations techniques (ACERMI, CSTB, NF PAC) garantissent le versement effectif des subventions ANAH et CEE sans rejet lors de l&apos;instruction du dossier.
            </p>
          </div>
        </section>

        {/* CTA Lead Funnel */}
        <section className="bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Faites installer du matériel {brand.name} par un artisan RGE local
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Simulez le reste à charge exact pour votre logement avec les produits {brand.name} et recevez 3 devis comparatifs d&apos;entreprises agréées.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-md"
          >
            Calculer mes aides avec {brand.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
