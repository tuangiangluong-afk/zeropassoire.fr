import Link from "next/link";
import type { Metadata } from "next";
import { HARDWARE_BRANDS } from "@/data/operators";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Award, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { ogImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Marques & Équipements Rénovation Globale | Zéro Passoire",
  description: "Guide des fabricants d'isolants et de pompes à chaleur agréés MaPrimeRénov' 2026 : Isover, Rockwool, Daikin, Atlantic, Soprema, Velux.",
  alternates: {
    canonical: "/marques",
  },
  openGraph: {
    title: "Matériaux & Équipements Éligibles Sortie de Passoire 2026",
    description: "Comparatif technique des marques d'isolation thermique (R ≥ 7) et pompes à chaleur certifiées NF PAC pour garantir le saut de classe DPE.",
    images: [
      {
        url: ogImageUrl({
          q: "Matériaux & Équipements Rénovation 2026",
          sub: "Isover, Rockwool, Daikin, Atlantic, Soprema, Velux • Éligibles MPR",
          badge: "Matériel Certifié",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function MarquesHubPage() {
  const breadcrumbItems = [{ name: "Marques & Équipements", href: "/marques" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marques d'Isolation et Pompes à Chaleur Agréées 2026",
    description: "Sélection des marques de référence pour la sortie de passoire énergétique.",
    numberOfItems: HARDWARE_BRANDS.length,
    itemListElement: HARDWARE_BRANDS.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Brand",
        name: b.name,
        description: b.summary,
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Normes ACERMI, CSTB &amp; NF PAC 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 mb-4">
            Marques &amp; Matériaux de Référence pour Sortir de Passoire
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl leading-relaxed">
            Pour que l&apos;ANAH valide votre subvention MaPrimeRénov&apos; Parcours Accompagné et que votre DPE gagne réellement 2 à 4 classes, les matériaux posés doivent respecter des seuils d&apos;efficacité stricts (R ≥ 7 m²·K/W en toiture, SCOP ≥ 3,5 pour les PAC).
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {HARDWARE_BRANDS.map((b) => (
            <article
              key={b.slug}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    {b.category}
                  </span>
                  <span className="text-xs font-medium text-stone-500">
                    {b.origin}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-stone-900 mb-2">
                  {b.name}
                </h2>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {b.description}
                </p>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 mb-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Gain DPE visé :</span>
                    <strong className="text-emerald-700 font-semibold">{b.gainDpeEstime}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Garantie :</span>
                    <span className="text-stone-700">{b.warranty.split("/")[0]}</span>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Produits phares :
                  </div>
                  {b.keyProducts.slice(0, 3).map((prod, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <Link
                  href="/#simulateur"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-emerald-700 transition-colors"
                >
                  Chiffrer avec cette marque <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Lead CTA Simulator */}
        <section className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">
            Faites poser ces marques par des artisans certifiés RGE
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Seule la pose par une entreprise RGE qualifiée permet de déclencher l&apos;aide MaPrimeRénov&apos; et la TVA à taux réduit de 5,5 %.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors shadow-sm"
          >
            Lancer ma simulation de reste à charge <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
