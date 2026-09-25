import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, Clock, ShieldCheck, ArrowRight, BookOpen, Calculator, Scale } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const BASE_URL = "https://www.zeropassoire.fr";

export const metadata: Metadata = {
  title: "Contact & Assistance Indépendante | Zéro Passoire",
  description:
    "Une question sur le simulateur DPE, les barèmes MaPrimeRénov' 2026 ou vos droits ? Contactez notre équipe éditoriale et technique Zéro Passoire.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact & Support indépendant — Zéro Passoire",
    description: "Écrivez à nos experts indépendants en rénovation énergétique et droit du logement.",
    url: `${BASE_URL}/contact`,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Contact Zéro Passoire" }],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/contact#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: "Contact et assistance indépendante Zéro Passoire",
    description: "Formulaire de contact et assistance juridique et technique pour la sortie de passoire énergétique.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    breadcrumb: { "@id": `${BASE_URL}/contact#breadcrumb` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <section className="py-14 sm:py-20 bg-stone-50 min-h-[75vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Form Column (3 cols) */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
                <Mail size={14} /> Contact éditorial
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
                Une question technique ou juridique&nbsp;?
              </h1>
              <p className="text-stone-600 mb-8 text-sm leading-relaxed">
                Notre équipe répond sous <strong>48 heures ouvrées</strong>. Nous échangeons exclusivement par écrit afin de conserver une traçabilité claire et documentée de chaque réponse.
              </p>

              <ContactForm />
            </div>

            {/* Context & Direct Resources Column (2 cols) */}
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/audit-conseil.webp"
                    alt="Conseil et audit énergétique indépendant avec un propriétaire"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-stone-900/85 backdrop-blur-sm border border-stone-700 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                    Conseil indépendant
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-display font-bold text-stone-900 text-sm mb-1">
                    Une équipe d'auditeurs &amp; juristes
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Nous analysons vos devis et litiges DPE sans aucun parti pris commercial. Zéro revente de coordonnées, zéro commission installateur imposée.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                <h2 className="font-display font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-600" /> Réponses immédiates
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Avant de nous écrire, votre réponse se trouve très probablement dans l'un de nos outils en libre accès :
                </p>

                <div className="space-y-3">
                  <Link
                    href="/simulateur"
                    className="block p-3 rounded-xl bg-stone-50 hover:bg-brand-50 border border-stone-200 hover:border-brand-300 transition text-xs group"
                  >
                    <div className="font-semibold text-stone-900 group-hover:text-brand-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calculator size={14} className="text-brand-600" /> Chiffrer un logement
                      </span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-stone-500 mt-1">Calcul instantané aides + reste à charge en 40s.</div>
                  </Link>

                  <Link
                    href="/guides/interdiction-location-passoire-thermique"
                    className="block p-3 rounded-xl bg-stone-50 hover:bg-brand-50 border border-stone-200 hover:border-brand-300 transition text-xs group"
                  >
                    <div className="font-semibold text-stone-900 group-hover:text-brand-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Scale size={14} className="text-red-600" /> Litige ou droit de louer
                      </span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-stone-500 mt-1">Calendrier d'interdiction G/F et jurisprudences réelles.</div>
                  </Link>

                  <Link
                    href="/guides/aides-financieres-sortie-passoire-2026"
                    className="block p-3 rounded-xl bg-stone-50 hover:bg-brand-50 border border-stone-200 hover:border-brand-300 transition text-xs group"
                  >
                    <div className="font-semibold text-stone-900 group-hover:text-brand-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-emerald-700" /> Barèmes MaPrimeRénov'
                      </span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="text-stone-500 mt-1">Tableaux complets de ressources RFR 2026.</div>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1.5 text-amber-950">
                  <Clock size={14} /> Vous suspectez une fraude d'artisan ?
                </div>
                En cas de démarchage abusif ou de faux devis RGE, signalez immédiatement l'entreprise sur la plateforme officielle de la répression des fraudes :{" "}
                <a
                  href="https://signal.conso.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-amber-950"
                >
                  signal.conso.gouv.fr
                </a>
                . Zéro Passoire n'a aucun lien avec les entreprises sanctionnées.
              </div>
            </div>
          </div>

          {/* Enriched Editorial & Legal Assistance Sections */}
          <div className="mt-16 pt-12 border-t border-stone-200 grid sm:grid-cols-2 gap-8 text-sm text-stone-600">
            <div className="p-6 rounded-2xl bg-white border border-stone-200">
              <h2 className="font-display font-bold text-stone-900 text-base mb-2">
                Charte d'indépendance éditoriale & Déontologie
              </h2>
              <p className="leading-relaxed text-xs text-stone-600">
                Zéro Passoire est un portail d'information technique et juridique indépendant des réseaux d'artisans et des fournisseurs d'énergie. Nos barèmes et calculs sont basés strictement sur les arrêtés ministériels, les fiches CEE de la DGEC et les référentiels de l'ADEME. Aucun artisan ne peut payer pour modifier nos recommandations techniques.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-stone-200">
              <h2 className="font-display font-bold text-stone-900 text-base mb-2">
                Signalement réglementaire et veille DPE
              </h2>
              <p className="leading-relaxed text-xs text-stone-600">
                Vous constatez une mise à jour d'un barème de l'Anah, un nouvel arrêté préfectoral ou une décision de justice relative à l'indécence énergétique d'un logement ? Utilisez notre formulaire pour alerter nos rédacteurs. Nos veilleurs vérifient chaque source juridique sous 24 heures ouvrées.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
