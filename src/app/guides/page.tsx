import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export const metadata: Metadata = {
  title: "Guides sortie de passoire \u00e9nerg\u00e9tique",
  description:
    "Guides ind\u00e9pendants : obligations l\u00e9gales, aides financi\u00e8res 2026, parcours de travaux, interdiction de location. Sans d\u00e9marchage, sans jargon.",
  alternates: { canonical: `${BASE}/guides` },
};

export default function GuidesListingPage() {
  const guides = getAllGuides();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guides Z\u00e9ro Passoire \u2014 sortie de passoire \u00e9nerg\u00e9tique",
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

  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen size={14} /> Ressources
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">Guides</h1>
          <p className="text-stone-600 max-w-2xl">
            Tout ce qu'il faut savoir pour sortir d'un DPE F ou G. Sources L&eacute;gifrance,
            ADEME, JO. Mise &agrave; jour des bar&egrave;mes 2026.
          </p>
        </div>
        <div className="space-y-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block card hover:border-brand-600 transition group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">
                    {g.category} &middot; {g.readTime} &middot;{" "}
                    {new Date(g.publishedAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 group-hover:text-brand-700 transition">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{g.description}</p>
                </div>
                <ArrowRight className="text-brand-600 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-6" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
