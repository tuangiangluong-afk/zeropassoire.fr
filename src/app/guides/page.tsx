import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, ShieldAlert, Award, FileSpreadsheet, Calculator } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";

const BASE = "https://www.zeropassoire.fr";

export const metadata: Metadata = {
  title: "Guides Rénovation DPE 2026 : Sortir de Passoire",
  description:
    "Guides pratiques et enquêtes DPE 2026 : calendrier d'interdiction de location, barèmes MaPrimeRénov', primes CEE et étapes clés pour rénover sans piège.",
  alternates: { canonical: `${BASE}/guides` },
  openGraph: {
    title: "Centre de ressources & Guides officiels sortie de passoire 2026",
    description: "Tout ce qu'il faut savoir pour rénover un DPE F ou G sans se faire arnaquer. Chiffres réels, jurisprudence et barèmes 2026.",
    url: `${BASE}/guides`,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Guides Zéro Passoire" }],
  },
};

export default function GuidesListingPage() {
  const guides = getAllGuides();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guides Zéro Passoire — Centre de référence sortie de passoire énergétique",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/guides/${g.slug}`,
      name: g.title,
      description: g.description,
    })),
    numberOfItems: guides.length,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/guides#webpage`,
    url: `${BASE}/guides`,
    name: "Guides officiels et techniques sur la sortie des passoires énergétiques",
    description:
      "Dossiers de fond, analyses jurisprudentielles et fiches techniques pour les propriétaires de logements classés E, F ou G.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${BASE}/#website` },
    breadcrumb: { "@id": `${BASE}/guides#breadcrumb` },
    mainEntity: { "@id": `${BASE}/guides#itemlist` },
  };

  return (
    <section className="py-14 sm:py-20 bg-stone-50 min-h-[75vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header editorial */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen size={14} /> Centre de ressources officiel 2026
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Guides &amp; Enquêtes de référence
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed max-w-3xl">
            La rénovation énergétique d’une passoire ne s’improvise pas. Retrouvez nos dossiers de référence sourcés Légifrance, ADEME et Journal Officiel, sans langue de bois ni démarchage commercial.
          </p>
        </div>

        {/* Regulatory timeline banner (Information Gain) */}
        <div className="mb-12 p-6 rounded-2xl bg-stone-900 text-white shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-400 mb-4">
            <Calendar size={14} /> Calendrier opposable d’interdiction de location
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
              <div className="text-xs font-semibold text-red-400 uppercase">Depuis le 01/01/2025</div>
              <div className="text-lg font-bold text-white mt-1">Classe G interdite</div>
              <p className="text-xs text-stone-300 mt-1">Nouveaux baux et renouvellements strictement illégaux (art. 159 loi Climat).</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
              <div className="text-xs font-semibold text-amber-400 uppercase">Au 01/01/2028</div>
              <div className="text-lg font-bold text-white mt-1">Classe F interdite</div>
              <p className="text-xs text-stone-300 mt-1">2,8 millions de logements supplémentaires touchés par l'interdiction de louer.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
              <div className="text-xs font-semibold text-blue-400 uppercase">Au 01/01/2034</div>
              <div className="text-lg font-bold text-white mt-1">Classe E interdite</div>
              <p className="text-xs text-stone-300 mt-1">Seuil minimal de décence fixé à l’étiquette DPE D sur tout le territoire.</p>
            </div>
          </div>
        </div>

        {/* Simulator Callout */}
        <div className="mb-10 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Calculator size={20} />
            </div>
            <div>
              <div className="font-display font-bold text-emerald-950 text-base">
                Vous voulez chiffrer votre propre bien avant de lire ?
              </div>
              <div className="text-xs text-emerald-800">
                Simulateur gratuit en 40 secondes &middot; Barèmes officiels 2026 &middot; Sans inscription
              </div>
            </div>
          </div>
          <Link href="/simulateur" className="btn-primary !bg-emerald-700 hover:!bg-emerald-800 text-sm whitespace-nowrap">
            Calculer mon reste à charge <ArrowRight size={14} />
          </Link>
        </div>

        {/* Guides listing with rich metadata */}
        <div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
            Tous nos dossiers et enquêtes de référence
          </h2>
          <div className="space-y-5">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="block p-6 rounded-2xl bg-white border border-stone-200 hover:border-brand-600 hover:shadow-md transition group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                      <span className="font-semibold text-brand-700 uppercase tracking-wide">
                        {g.category}
                      </span>
                      <span className="text-stone-300">&middot;</span>
                      <span className="text-stone-500 font-mono">{g.readTime}</span>
                      <span className="text-stone-300">&middot;</span>
                      <span className="text-stone-500">
                        Mis à jour le {new Date(g.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-brand-700 transition leading-snug mb-2">
                      {g.title}
                    </h3>
                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {g.description}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-brand-700 group-hover:text-brand-800 shrink-0 self-end sm:self-center gap-1">
                  Lire l'enquête <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
}
