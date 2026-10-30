import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique Confidentialité RGPD | Zéro Passoire",
  description:
    "Politique de confidentialité et RGPD de zéropassoire.fr : collecte minimale, protection des données personnelles, droits d'accès et durée de conservation.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.zeropassoire.fr/politique-confidentialite" },
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">
          Politique de confidentialité
        </h1>
        <div className="prose-zeropassoire max-w-none space-y-8 text-sm leading-relaxed">
          <p className="text-stone-700">
            La présente politique décrit la manière dont <strong>WELINK TECH</strong>
            , éditrice du site <strong>zeropassoire.fr</strong>, traite les données
            personnelles de ses utilisateurs. Elle respecte le Règlement (UE) 2016/679
            (RGPD) et la loi n° 78-17 du 6 janvier 1978 modifiée.
          </p>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">1. Responsable de traitement</h2>
            <p className="text-stone-700">
              WELINK TECH, SASU au capital variable, dont le siège est situé 6 rue des
              Bateliers, 92110 Clichy (SIREN 984 800 136&nbsp;; SIRET 984 800 136 00017),
              est responsable du traitement des données décrites ci-dessous.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">2. Données collectées</h2>
            <p className="text-stone-700 mb-2">Nous collectons uniquement les données strictement nécessaires&nbsp;:</p>
            <ul className="text-stone-700 space-y-1">
              <li><strong>Données saisies dans le simulateur&nbsp;:</strong> classe DPE, surface, type de bien, mode de chauffage, tranche de revenus, code postal. Ces données ne sont pas directement identifiantes.</li>
              <li><strong>Données de contact&nbsp;:</strong> adresse e-mail, et numéro de téléphone <em>uniquement si vous demandez un rappel</em>. Collectées uniquement si vous remplissez le formulaire.</li>
              <li><strong>Consentements&nbsp;:</strong> case de mise en relation (décochée par défaut) et case « newsletter », avec horodatage.</li>
              <li><strong>Trace technique&nbsp;:</strong> identifiant de session anonyme (localStorage), paramètres d'acquisition UTM (source, medium, campagne), gclid, fbclid.</li>
            </ul>
            <p className="text-stone-700 mt-3">
              Nous ne collectons aucune donnée de géolocalisation fine, aucune donnée
              fiscale et aucun identifiant biométrique. Le site charge Google Tag Manager
              (mesure d&apos;audience), qui peut déposer des cookies de mesure&nbsp;: voir la
              section 8.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">3. Finalités et base légale</h2>
            <ul className="text-stone-700 space-y-2">
              <li><strong>Fournir le résultat du simulateur&nbsp;:</strong> exécution du service demandé (art. 6.1.b RGPD).</li>
              <li><strong>Envoyer le récapitulatif par e-mail&nbsp;:</strong> consentement (art. 6.1.a RGPD).</li>
              <li><strong>Rappeler par un conseiller RGE&nbsp;:</strong> consentement explicite, révocable à tout moment (art. 6.1.a RGPD).</li>
              <li><strong>Améliorer le service et mesurer la performance du funnel&nbsp;:</strong> intérêt légitime (art. 6.1.f RGPD), sur données agrégées et anonymisées.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">4. Partage avec des tiers</h2>
            <p className="text-stone-700 mb-2">
              Vos coordonnées ne sont <strong>jamais revendues</strong> ni cédées à des
              courtiers en données. Elles sont transmises&nbsp;:
            </p>
            <ul className="text-stone-700 space-y-1">
              <li><strong>à ViteUnDevis</strong>, partenaire de mise en relation en rénovation énergétique, <strong>uniquement</strong> si vous avez coché la case de mise en relation. Ce partenaire peut alors vous contacter par téléphone au sujet de votre projet&nbsp;;</li>
              <li>à nos prestataires techniques (hébergement Supabase UE, CDN Vercel, emailing Resend, mesure d&apos;audience Google Tag Manager), qui agissent en qualité de sous-traitants au sens de l&apos;article 28 RGPD.</li>
            </ul>
            <p className="text-stone-700 mt-3">
              Sans cette case cochée, aucune coordonnée n&apos;est transmise à un partenaire.
              Votre e-mail sert alors uniquement à vous envoyer votre récapitulatif.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">5. Durée de conservation</h2>
            <ul className="text-stone-700 space-y-1">
              <li><strong>Leads avec consentement de rappel&nbsp;:</strong> 3 ans à compter du dernier échange.</li>
              <li><strong>Leads sans consentement de rappel&nbsp;:</strong> purge automatique à J+30.</li>
              <li><strong>Évènements de funnel anonymisés&nbsp;:</strong> 24 mois.</li>
              <li><strong>Cookies de session&nbsp;:</strong> suppression à la fermeture du navigateur.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">6. Vos droits</h2>
            <p className="text-stone-700 mb-2">
              Conformément au RGPD, vous disposez des droits suivants&nbsp;: accès,
              rectification, effacement, limitation, opposition, portabilité, et
              directives post-mortem. Pour les exercer, écrivez-nous via la{" "}
              <a href="/contact">page contact</a>. Une réponse vous sera apportée
              sous 30 jours.
            </p>
            <p className="text-stone-700">
              Vous pouvez également introduire une réclamation auprès de la CNIL,{" "}
              <em>3 place de Fontenoy – TSA 80715, 75334 Paris Cedex 07</em>.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">7. Sécurité</h2>
            <p className="text-stone-700">
              Toutes les communications avec le Site transitent en HTTPS (TLS 1.3).
              La base de données est chiffrée à repos (AES-256) chez Supabase (Berlin,
              UE). Les accès applicatifs utilisent une clé <em>service_role</em>
              strictement server-side, jamais exposée au navigateur. Les accès
              humains à la base sont journalisés et restreints à deux administrateurs.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">8. Cookies et mesure d&apos;audience</h2>
            <p className="text-stone-700">
              Le site charge Google Tag Manager, qui active la mesure d&apos;audience Google
              Analytics. Ces traceurs servent uniquement à compter les visites et à mesurer
              l&apos;usage du simulateur&nbsp;; ils ne servent à aucun ciblage publicitaire de notre
              part. Le stockage d&apos;un identifiant de session (localStorage) permet de rattacher
              les étapes du simulateur à une même visite. Vous pouvez refuser ces traceurs via
              les réglages de votre navigateur, ou nous écrire pour demander leur désactivation.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-stone-900 mb-3">9. Mises à jour de la politique</h2>
            <p className="text-stone-700">
              La présente politique peut être amendée à tout moment. Les utilisateurs
              ayant fourni leur e-mail seront notifiés en cas de modification
              substantielle.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 text-xs text-stone-500">
            Dernière mise à jour&nbsp;: 30 octobre 2026.
          </div>
        </div>
      </div>
    </section>
  );
}
