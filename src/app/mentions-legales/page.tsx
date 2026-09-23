import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales & Éditeur | Zéro Passoire",
  description:
    "Éditeur du site zéropassoire.fr : WELINK TECH, SIREN, hébergement, propriété intellectuelle, RGPD et données personnelles.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.zeropassoire.fr/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Mentions légales</h1>
        <div className="prose-zeropassoire max-w-none space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-3">1. Éditeur du site</h2>
            <p className="text-stone-700 mb-3">
              Le présent site, accessible à l'adresse{" "}
              <strong>https://www.zeropassoire.fr</strong> (le «&nbsp;Site&nbsp;»), est édité par la société{" "}
              <strong>WELINK TECH</strong>, ci-après «&nbsp;l'Éditeur&nbsp;».
            </p>
            <ul className="text-stone-700 space-y-1">
              <li><strong>Forme juridique&nbsp;:</strong> Société par actions simplifiée à associé unique (SASU)</li>
              <li><strong>Siège social&nbsp;:</strong> 6 rue des Bateliers, 92110 Clichy, France</li>
              <li><strong>SIREN&nbsp;:</strong> 984 800 136</li>
              <li><strong>SIRET&nbsp;:</strong> 984 800 136 00017</li>
              <li><strong>Responsable de publication&nbsp;:</strong> Direction WELINK TECH</li>
              <li><strong>Contact&nbsp;:</strong> via le <a href="/contact">formulaire de contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">2. Nature du service</h2>
            <p className="text-stone-700">
              Zéro Passoire est un site éditorial indépendant qui propose un simulateur
              d'estimation du coût de sortie de passoire énergétique et des guides
              d'information à destination des propriétaires occupants et bailleurs.
              Le Site est un service d'information&nbsp;: il ne constitue ni un devis,
              ni un conseil juridique ou fiscal personnalisé, ni un engagement
              contractuel. Les montants affichés par le simulateur sont des
              estimations basées sur des barèmes publics 2026 (arrêté MaPrimeRénov'
              du 2 octobre 2025, fiches CEE BAR-TH en vigueur, prix médians ADEME),
              avec une précision indicative de ±15&nbsp;%.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">3. Modèle économique et indépendance</h2>
            <p className="text-stone-700">
              Le Site est rémunéré par une commission versée par des artisans RGE
              partenaires, uniquement lorsqu'un utilisateur a volontairement transmis
              ses coordonnées via le formulaire de capture optionnel et qu'il a
              explicitement coché le consentement de rappel. Aucun contenu éditorial
              n'est sponsorisé, aucun guide n'est rémunéré par une marque
              d'équipementier. Les barèmes et sources citées sont publiques
              (Légifrance, Journal officiel, ADEME, SDES).
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">4. Hébergement</h2>
            <p className="text-stone-700">
              Le Site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave
              #1565, Covina, CA 91723, États-Unis (réseau CDN distribué, points de
              présence européens).
            </p>
            <p className="text-stone-700 mt-2">
              Les données utilisateurs (leads, évènements de mesure d'audience) sont
              hébergées exclusivement au sein de l'Union européenne sur une base
              PostgreSQL managée par <strong>Supabase GmbH &amp; Co. KG</strong>,
              Tiergartenstraße 1, 10785 Berlin, Allemagne.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">5. Propriété intellectuelle</h2>
            <p className="text-stone-700">
              L'ensemble des contenus du Site (textes, guides, code source, design,
              logo, base de données des barèmes) est la propriété exclusive de
              WELINK TECH ou de tiers ayant autorisé son utilisation. Toute
              reproduction, représentation, modification, publication ou adaptation,
              totale ou partielle, de ces éléments, sans l'autorisation écrite
              préalable de l'Éditeur, est interdite au titre des articles L. 111-1
              et suivants du Code de la propriété intellectuelle.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">6. Données personnelles (RGPD)</h2>
            <p className="text-stone-700 mb-2">
              WELINK TECH, en sa qualité de responsable de traitement, collecte des
              données strictement nécessaires à la fourniture du service&nbsp;:
              adresse e-mail, téléphone (optionnel), réponse au simulateur (classe
              DPE, surface, code postal, situation fiscale), consentement, trace
              technique de session et paramètres d'acquisition (UTM). Ces données
              sont hébergées dans l'Union européenne et conservées au maximum 3 ans
              à compter de la dernière interaction.
            </p>
            <p className="text-stone-700 mb-2">
              Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du
              6 janvier 1978, vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, d'opposition et de portabilité de vos
              données. Pour exercer ces droits, contactez-nous via la{" "}
              <a href="/contact">page contact</a>. Une réponse sera apportée sous
              30 jours.
            </p>
            <p className="text-stone-700">
              Vous pouvez également introduire une réclamation auprès de la Commission
              nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy
              – TSA 80715, 75334 Paris Cedex 07.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">7. Cookies</h2>
            <p className="text-stone-700">
              Le Site fonctionne sans cookie publicitaire ni traceur tiers. Un unique
              cookie de session (localStorage) est utilisé pour rattacher les étapes
              du simulateur à une session anonyme&nbsp;; il est purgé à la fermeture
              du navigateur.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">8. Droit applicable</h2>
            <p className="text-stone-700">
              Les présentes mentions sont régies par le droit français. Tout litige
              relevant de la compétence du tribunal judiciaire de Nanterre (92),
              siège social de l'Éditeur.
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
