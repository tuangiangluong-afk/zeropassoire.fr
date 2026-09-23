import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation et de vente",
  description:
    "Cadre contractuel régissant l'usage du simulateur zéropassoire.fr édité par WELINK TECH : limites de responsabilité, obligations utilisateur, médiation consommation.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://zeropassoire.fr/cgv" },
};

export default function CGV() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">
          Conditions générales d'utilisation et de vente
        </h1>
        <div className="prose-zeropassoire max-w-none space-y-8 text-sm leading-relaxed">
          <p className="text-stone-700">
            Les présentes Conditions générales (ci-après «&nbsp;CGU/CGV&nbsp;»)
            régissent les relations entre la société <strong>WELINK TECH</strong>,
            sise 6 rue des Bateliers, 92110 Clichy (SIREN 984 800 136, SIRET 984 800
            136 00017), ci-après «&nbsp;l'Éditeur&nbsp;», et tout utilisateur du site{" "}
            <strong>zeropassoire.fr</strong> (ci-après «&nbsp;le Site&nbsp;»).
          </p>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">1. Objet du service</h2>
            <p className="text-stone-700">
              Le Site met à disposition gratuite un simulateur d'estimation de coût
              de sortie de passoire énergétique et des guides d'information. L'accès
              au simulateur est libre et n'exige aucune inscription. La réception du
              récapitulatif chiffré par e-mail est conditionnée à la saisie d'une
              adresse électronique valide.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">2. Nature indicative des résultats</h2>
            <p className="text-stone-700">
              Les montants produits par le simulateur constituent des{" "}
              <strong>estimations non contractuelles</strong> basées sur des barèmes
              publics (arrêté MaPrimeRénov' du 2 octobre 2025, fiches CEE BAR-TH en
              vigueur, prix médians ADEME constatés 2024-2025). La précision
              indicative est de ±15&nbsp;% par rapport à un devis réel d'artisan RGE.
              Ils ne sauraient se substituer à un audit énergétique réglementaire
              réalisé par un professionnel certifié, seul document opposable auprès
              des guichets d'aides.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">3. Rôle d'intermédiaire</h2>
            <p className="text-stone-700">
              WELINK TECH agit en qualité d'apporteur d'information et, le cas
              échéant, d'apporteur d'affaires. Elle n'est <strong>pas</strong>
              &nbsp;: (a) entreprise de travaux&nbsp;; (b) mandataire d'un artisan
              RGE&nbsp;; (c) organisme certificateur&nbsp;; (d) guichet d'aides
              publiques. La responsabilité de la conception, de la réalisation et de
              la conformité des travaux incombe exclusivement à l'entreprise retenue
              par l'utilisateur.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">4. Limitation de responsabilité</h2>
            <p className="text-stone-700 mb-2">
              L'Éditeur décline toute responsabilité en cas de&nbsp;:
            </p>
            <ul className="text-stone-700 space-y-1">
              <li>malfaçon, retard de chantier ou non-conformité technique des travaux réalisés par un partenaire&nbsp;;</li>
              <li>refus de dossier MaPrimeRénov' ou CEE pour un motif tiers (délai d'instruction, erreur de saisie, changement réglementaire)&nbsp;;</li>
              <li>indisponibilité temporaire du Site, pertes de données ou dommages indirects&nbsp;;</li>
              <li>évolution réglementaire postérieure à la consultation du simulateur.</li>
            </ul>
            <p className="text-stone-700 mt-3">
              En tout état de cause, la responsabilité maximale de l'Éditeur, si elle
              venait à être retenue, serait plafonnée au montant effectivement perçu
              par l'utilisateur au titre du service, c'est-à-dire 0&nbsp;€ pour un
              service gratuit.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">5. Obligations de l'utilisateur</h2>
            <p className="text-stone-700">
              L'utilisateur s'engage à fournir des informations exactes lors de la
              saisie du simulateur et à ne pas utiliser le Site à des fins de
              démarchage commercial, d'ingénierie sociale, ou de collecte automatisée
              de données (scraping). Le Site est réservé à un usage non commercial
              d'information personnelle.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">6. Propriété intellectuelle</h2>
            <p className="text-stone-700">
              Les guides, bases de données de barèmes, code source et design sont
              protégés par le Code de la propriété intellectuelle. Toute reproduction,
              extraction substantielle ou représentation, totale ou partielle, sans
              autorisation écrite préalable est interdite.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">7. Médiation de la consommation</h2>
            <p className="text-stone-700">
              Conformément à l'article L. 612-1 du Code de la consommation, tout
              utilisateur non-professionnel peut recourir gratuitement au médiateur
              de la consommation compétent. À ce jour&nbsp;:{" "}
              <em>SAS Médiation Solution</em>, 244 rue de Py, 78000 Versailles.
              Vous pouvez également saisir la plateforme européenne de règlement en
              ligne des litiges (RLL) à l'adresse "
              <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer nofollow">
                https://ec.europa.eu/consumers/odr
              </a>
              ".
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">8. Droit applicable et juridiction</h2>
            <p className="text-stone-700">
              Les présentes CGU/CGV sont régies par le droit français. En cas de
              litige, et à défaut d'accord amiable, compétence expresse est attribuée
              au tribunal judiciaire de Nanterre (92), siège social de l'Éditeur, y
              compris en cas de pluralité de défendeurs ou d'appel en garantie.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 text-xs text-stone-500">
            Dernière mise à jour&nbsp;: septembre 2026.
          </div>
        </div>
      </div>
    </section>
  );
}
