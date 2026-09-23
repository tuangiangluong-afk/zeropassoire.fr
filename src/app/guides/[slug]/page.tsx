import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${BASE}/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      locale: "fr_FR",
      type: "article",
      publishedTime: guide.publishedAt,
      authors: ["Zéro Passoire"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Étiquette DPE A→G" }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/twitter-image.png"],
    },
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const url = `${BASE}/guides/${slug}`;
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedAt,
      dateModified: guide.publishedAt,
      inLanguage: "fr-FR",
      author: {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "Équipe éditoriale Zéro Passoire",
        url: `${BASE}/#organization`,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "Zéro Passoire",
        url: BASE,
        logo: { "@type": "ImageObject", url: `${BASE}/logo.svg` },
      },
      isPartOf: { "@id": `${BASE}/#website` },
      about: [
        { "@type": "Thing", name: "Sortie de passoire thermique" },
        { "@type": "Thing", name: "Rénovation énergétique" },
        { "@type": "Thing", name: "MaPrimeRénov'" },
      ],
      mentions: [
        { "@type": "Thing", name: "DPE" },
        { "@type": "Thing", name: "Légifrance" },
        { "@type": "Thing", name: "ADEME" },
      ],
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${BASE}/opengraph-image.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: guide.title,
      description: guide.description,
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h1 + p", ".prose-zeropassoire > h2:first-of-type", ".prose-zeropassoire > h2:first-of-type + p"],
    },
  ];

  if (guide.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.answer) },
      })),
    });
  }

  return (
    <article className="py-16 bg-white">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-brand-700 mb-6"
        >
          <ArrowLeft size={16} /> Tous les guides
        </Link>
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
          {guide.category} &middot; {guide.readTime}
        </div>
        <h1 className="font-display text-4xl font-bold text-stone-900 leading-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">{guide.description}</p>

        <div
          className="prose-zeropassoire max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.htmlBody }}
        />

        <div className="mt-16 p-6 rounded-2xl bg-brand-50 border border-brand-200 text-center">
          <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
            Votre situation mérite des chiffres à jour
          </h3>
          <p className="text-stone-700 mb-5 text-sm">
            Le simulateur vous donne votre reste à charge précis en 40 secondes.
          </p>
          <Link href="/simulateur" className="btn-primary inline-flex">
            Estimer mon reste à charge
          </Link>
        </div>
      </div>
    </article>
  );
}
