import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Guides sortie de passoire énergétique",
  description:
    "Guides indépendants : obligations légales, aides financières 2026, parcours de travaux, interdiction de location. Sans démarchage, sans jargon.",
  alternates: { canonical: "https://zeropassoire.fr/guides" },
};

export default function GuidesListingPage() {
  const guides = getAllGuides();
  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen size={14} /> Ressources
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">Guides</h1>
          <p className="text-stone-600 max-w-2xl">
            Tout ce qu'il faut savoir pour sortir d'un DPE F ou G. Sources L&eacute;gifrance, ADEME, JO.
            Maj des bar&egrave;mes 2026.
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
                    {g.category} &middot; {g.readTime} &middot; {new Date(g.publishedAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
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
