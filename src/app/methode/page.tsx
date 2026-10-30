import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, FileText, Euro, Wrench, AlertTriangle } from "lucide-react";
import { PRIMARY_SOURCES } from "@/lib/schema";
import { CONTENT_UPDATED, SITE_LAUNCHED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Méthode, sources et transparence | Zéro Passoire",
  description:
    "Qui édite Zéro Passoire, comment le simulateur calcule, quelles sources sont utilisées et comment le site est financé. Méthode et politique de correction.",
  alternates: { canonical: `${SITE_URL}/methode` },
  openGraph: {
    title: "Méthode, sources et transparence — Zéro Passoire",
    description:
      "Sources primaires, méthode de calcul, modèle économique et politique de correction du site.",
    url: `${SITE_URL}/methode`,
    locale: "fr_FR",
    type: "article",
  },
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/methode#webpage`,
  url: `${SITE_URL}/methode`,
  name: "Méthode, sources et transparence",
  description:
    "Méthode de calcul, sources primaires, modèle économique et politique de correction de Zéro Passoire.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  dateModified: CONTENT_UPDATED,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Méthode et sources", item: `${SITE_URL}/methode` },
    ],
  },
};

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
        <span className="text-brand-700">{icon}</span>
        {title}
      </h2>
      <div className="space-y-3 text-stone-700 leading-relaxed text-[15px]">{children}</div>
    </section>
  );
}

export default function MethodePage() {
  return (
    <article className="py-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
          Transparence éditoriale
        </div>
        <h1 className="font-display text-4xl font-bold text-stone-900 leading-tight mb-4">
          Méthode, sources et transparence
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-4">
          Un site qui parle d&apos;argent public, de droit locatif et de travaux doit pouvoir
          être vérifié. Cette page dit qui édite Zéro Passoire, d&apos;où viennent les chiffres,
          comment le site est financé et comment signaler une erreur.
        </p>
        <p className="text-xs text-stone-500 mb-10 pb-6 border-b border-stone-200">
          Site lancé le {new Date(SITE_LAUNCHED).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}Dernière révision éditoriale :{" "}
          {new Date(CONTENT_UPDATED).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <Section icon={<FileText size={18} />} title="Qui édite ce site">
          <p>
            Zéro Passoire est édité par <strong>WELINK TECH SASU</strong>, SIREN 984 800 136,
            RCS Nanterre, 6 rue des Bateliers, 92110 Clichy. Contact :{" "}
            <a href="mailto:contact@zeropassoire.fr" className="underline hover:text-stone-900">
              contact@zeropassoire.fr
            </a>
            .
          </p>
          <p>
            Le site est lancé le 23 septembre 2026. Nous ne sommes <strong>ni un service public,
            ni un organisme agréé par l&apos;Anah, ni un mandataire MaPrimeRénov&apos;, ni un
            diagnostiqueur</strong>. Aucune page ne remplace un audit énergétique réglementaire,
            un devis signé ou un conseil juridique personnalisé.
          </p>
        </Section>

        <Section icon={<Euro size={18} />} title="Comment le site est financé">
          <p>
            Le site est gratuit et financé par la mise en relation. Concrètement : si — et
            seulement si — vous cochez la case prévue à cet effet dans le formulaire, vos
            coordonnées sont transmises à <strong>un partenaire spécialisé en rénovation
            énergétique</strong>, qui peut vous rappeler au sujet de votre projet.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-brand-700 shrink-0 mt-0.5" />
              <span>La case est <strong>décochée par défaut</strong>. Sans elle, aucune coordonnée n&apos;est transmise.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-brand-700 shrink-0 mt-0.5" />
              <span>Le résultat du simulateur s&apos;affiche <strong>avant</strong> toute demande d&apos;e-mail ou de téléphone.</span>
            </li>
            <li className="flex gap-2">
              <XCircle size={16} className="text-stone-400 shrink-0 mt-0.5" />
              <span>Aucun fournisseur d&apos;énergie, aucun groupement d&apos;artisans n&apos;est actionnaire de WELINK TECH.</span>
            </li>
            <li className="flex gap-2">
              <XCircle size={16} className="text-stone-400 shrink-0 mt-0.5" />
              <span>Aucun partenaire ne peut payer pour modifier un calcul, une source ou une conclusion.</span>
            </li>
          </ul>
          <p className="text-sm text-stone-500">
            Détail des destinataires et des durées de conservation :{" "}
            <Link href="/politique-confidentialite" className="underline hover:text-stone-800">
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>

        <Section icon={<Wrench size={18} />} title="Comment le simulateur calcule">
          <p>
            Le simulateur applique les barèmes publics en vigueur : arrêté du 2 octobre 2025 pour
            MaPrimeRénov&apos; 2026, fiches CEE de la 6ᵉ période, TVA à 5,5 % et plafonds de
            l&apos;éco-PTZ. Les coûts de travaux sont des médianes de marché par poste (isolation,
            menuiseries, pompe à chaleur, ventilation) et par type de bâti.
          </p>
          <p>
            Le résultat est une <strong>estimation à ±15 %</strong>, non contractuelle. Il ne tient
            pas compte de l&apos;état réel du bâti, des contraintes de copropriété, des
            surprimes techniques (amiante, plomb, accès) ni de la disponibilité locale des
            artisans. Un seul document fait foi : le devis, puis l&apos;audit réglementaire pour
            un dossier Anah.
          </p>
        </Section>

        <Section icon={<FileText size={18} />} title="Nos sources">
          <p>Les textes et données utilisés comme référence sur l&apos;ensemble du site :</p>
          <ul className="space-y-1.5 text-sm">
            {PRIMARY_SOURCES.map((source) => (
              <li key={source} className="flex gap-2">
                <span aria-hidden="true" className="text-brand-700">•</span>
                <span>{source}</span>
              </li>
            ))}
          </ul>
          <p>
            Chaque guide renvoie à ses sources primaires en bas de page. Les liens pointent vers
            les textes officiels, pas vers des reprises de presse.
          </p>
        </Section>

        <Section icon={<AlertTriangle size={18} />} title="Ce que nous ne faisons pas">
          <p>
            Nous ne réalisons <strong>aucun test de chantier</strong>. Les pages « opérateurs » et
            « marques » sont des fiches documentaires construites à partir d&apos;informations
            publiques : statut, agréments, mode de rémunération annoncé, gammes. Elles ne
            contiennent <strong>ni note client, ni classement noté</strong> — nous ne collectons
            pas d&apos;avis et nous n&apos;avons pas les moyens de vérifier ceux des autres. Les
            frais d&apos;intermédiation affichés sont des ordres de grandeur, pas des montants
            contractuels.
          </p>
        </Section>

        <Section icon={<CheckCircle2 size={18} />} title="Politique de correction">
          <p>
            Une erreur factuelle, un barème périmé, un lien mort : écrivez-nous via la{" "}
            <Link href="/contact" className="underline hover:text-stone-900">page contact</Link>{" "}
            en indiquant la page et la source qui contredit notre texte.
          </p>
          <p>
            Nous corrigeons sous <strong>7 jours ouvrés</strong> et la date de révision en haut de
            chaque guide est mise à jour. Nous ne supprimons pas discrètement un passage faux :
            nous le remplaçons et nous datons la correction.
          </p>
        </Section>

        <Section icon={<FileText size={18} />} title="Historique des révisions">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-stone-500 border-b border-stone-200">
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 font-semibold">Changement</th>
                </tr>
              </thead>
              <tbody className="text-stone-700">
                <tr className="border-b border-stone-100 align-top">
                  <td className="py-3 pr-4 whitespace-nowrap">30 octobre 2026</td>
                  <td className="py-3">
                    Révision éditoriale : suppression des notes et nombres d&apos;avis non sourcés,
                    publication des dates de publication réelles, divulgation du modèle de mise en
                    relation, ajout d&apos;un bloc méthode et sources sur chaque guide.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 whitespace-nowrap">23 septembre 2026</td>
                  <td className="py-3">Mise en ligne du site et des 28 guides.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <div className="mt-12 p-6 rounded-2xl bg-brand-50 border border-brand-200">
          <h2 className="font-display text-lg font-bold text-stone-900 mb-2">
            Une question sans réponse ici ?
          </h2>
          <p className="text-sm text-stone-700 mb-4">
            La méthode ne couvre pas votre cas ? Écrivez-nous, on documente la réponse et on
            l&apos;ajoute si elle manque.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Nous contacter
          </Link>
        </div>
      </div>
    </article>
  );
}
