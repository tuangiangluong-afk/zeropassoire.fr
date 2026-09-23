import Link from "next/link";
import { ChevronDown, FileText, Wallet, Users, ShieldAlert, Sparkles, ArrowRight, Check, X } from "lucide-react";
import Simulator from "@/components/Simulator";
import MobileStickyBar from "@/components/MobileStickyBar";

const HOME_FAQ = [
  {
    q: "Les chiffres du simulateur sont-ils fiables ?",
    a: "Les barèmes utilisés viennent des textes officiels 2026 (arrêté MaPrimeRénov' du 2 octobre 2025, fiches CEE BAR-TH en vigueur). Les coûts de travaux sont des médianes constatées ADEME sur les chantiers 2024-2025. Ce sont des estimations à ±15 %, pas un devis contractuel.",
  },
  {
    q: "Puis-je vendre mon bien sans faire les travaux ?",
    a: "Oui. Le DPE F ou G n'interdit pas la vente, il oblige seulement à afficher un avis énergétique à l'acheteur et à chiffrer les travaux dans l'annonce. En pratique, un bien non-rénové subit une décote à la revente estimée entre 6 % et 15 % par l'Observatoire DVF-PIERVAL 2025.",
  },
  {
    q: "Je suis déjà en contact avec un artisan, ça change quoi ?",
    a: "Rien, à part un contre-pouvoir. Vous pouvez comparer le devis que vous avez reçu avec le coût moyen constaté par le simulateur, et vérifier que les aides sont bien intégrées (un devis sans ligne « MaPrimeRénov' » ou « CEE », c'est suspect).",
  },
  {
    q: "Combien de temps pour sortir de passoire ?",
    a: "4 à 10 mois entre le premier rendez-vous avec un auditeur énergétique et la livraison du dernier poste. Le frein principal n'est pas le chantier lui-même, c'est le vote en AG pour les copropriétés, et le dépôt de dossier MPR pour les maisons individuelles.",
  },
  {
    q: "Et si je ne peux vraiment pas financer, même avec les aides ?",
    a: "Il existe le prêt à taux zéro propriétaires occupants (jusqu'à 50 000 €), l'avance de MaPrimeRénov' par le syndic ou un organisme associatif, les aides locales cumulables (Anah, régions, intercommunalités), et pour les ménages en précarité, le fonds Tiers-lieu Financement Collective.",
  },
  {
    q: "Le simulateur Zéro Passoire est-il vraiment gratuit ?",
    a: "Oui. La simulation est gratuite, sans carte bancaire, sans création de compte, et sans obligation de rappel. Notre modèle économique repose sur une commission versée par des artisans RGE partenaires, uniquement lorsque vous choisissez spontanément d'être recontacté. Vous ne payez jamais rien à Zéro Passoire.",
  },
  {
    q: "Vendez-vous mes coordonnées à des artisans ?",
    a: "Non. Jamais. C'est le fondement de Zéro Passoire. Votre email et votre téléphone ne sont transmis à aucun artisan, aucun courtier, aucune société de rénovation. Si vous cochez la case « être recontacté », un seul artisan RGE de votre département vous contacte, et vous pouvez refuser en un clic.",
  },
  {
    q: "Puis-je faire une simulation pour un appartement en copropriété ?",
    a: "Oui. Le simulateur couvre maison individuelle et appartement en copropriété. Pour une copropriété, le coût affiché correspond à votre quote-part de travaux sur parties communes (ITE, toiture, chaudière collective) + vos travaux privatifs. La sortie de passoire d'un lot d'appartement passe presque toujours par un vote en assemblée générale.",
  },
  {
    q: "Combien coûte en moyenne le passage d'un DPE F ou G à un DPE C ?",
    a: "Sur une maison individuelle moyenne (110 m² construite avant 1975), le coût médian constaté ADEME 2025 est de 38 000 à 55 000 € avant aides, soit 18 000 à 32 000 € reste à charge après MaPrimeRénov' (étiquette bleue ou jaune) et CEE. En appartement, comptez 12 000 à 22 000 € de quote-part.",
  },
  {
    q: "Les artisans RGE référencés sont-ils vraiment vérifiés ?",
    a: "Nous ne référençons que des entreprises titulaires d'un signe de qualité RGE (Reconnu Garant de l'Environnement) valide au répertoire officiel de l'ADEME, vérifié chaque mois. Un artisan perd son référencement dès que son certificat expire ou qu'un signalement DGCCRF est confirmé.",
  },
  {
    q: "Comment supprimer mes données après une simulation ?",
    a: "Un email à contact@zeropassoire.fr avec la mention « suppression » et votre adresse suffit. Nous supprimons votre lead et vos événements de session dans un délai maximal de 30 jours, conformément à l'article 17 du RGPD. Vous pouvez aussi exercer votre droit d'opposition à la prospection commerciale sans justification.",
  },
  {
    q: "Puis-je utiliser le simulateur si je suis locataire ?",
    a: "Oui, mais l'interprétation change. En location, les travaux incombent au propriétaire bailleur. Vous pouvez utiliser la simulation pour chiffrer le coût demandé au bailleur et argumenter la décote de loyer. Depuis le 1er janvier 2025, un logement classé G ne peut plus être mis en location, et un F le pourra jusqu'au 1er janvier 2028.",
  },
  {
    q: "Combien de temps pour percevoir MaPrimeRénov' ?",
    a: "Comptez 4 à 8 semaines entre la fin des travaux, le dépôt du dossier de paiement et le virement. En cas d'avance (via le syndic, Action Logement ou un organisme tiers), le délai de versement est de 2 à 3 semaines après dépôt du dossier de demande.",
  },
  {
    q: "Zéro Passoire est-il indépendant des fournisseurs d'énergie ?",
    a: "Oui. Zéro Passoire est exploité par WELINK TECH, SASU immatriculée au RCS de Nanterre (SIREN 984 800 136). Aucun fournisseur d'énergie, aucune caisse des CEE, aucun négociaire n'est actionnaire. Notre rémunération vient exclusivement des commissions d'apport payées par les artisans RGE partenaires, uniquement sur lead opt-in.",
  },
];

const COMPARISON_ROWS: { label: string; zp: string; cp: string; zpOk: boolean; cpOk: boolean }[] = [
  { label: "Email ou téléphone exigés pour voir le résultat", zp: "Non, jamais", cp: "Oui, systématiquement", zpOk: true, cpOk: false },
  { label: "Revente des coordonnées à des artisans", zp: "Jamais", cp: "Oui — c'est le modèle économique", zpOk: true, cpOk: false },
  { label: "Démarchage téléphonique après inscription", zp: "Non", cp: "Oui, très fréquent", zpOk: true, cpOk: false },
  { label: "Montants issus de barèmes publics 2026", zp: "MPR, CEE, TVA 5,5 %, ADEME", cp: "Fourchettes marketing « dès 1 € »", zpOk: true, cpOk: false },
  { label: "Indépendance commerciale vis-à-vis des artisans", zp: "Totale — commission uniquement sur opt-in explicite", cp: "Aucune — rémunérés par les artisans référencés", zpOk: true, cpOk: false },
  { label: "Sources citées (Légifrance, ADEME, SDES)", zp: "Oui, liens directs", cp: "Non", zpOk: true, cpOk: false },
  { label: "Résultat calculé en moins de 60 secondes", zp: "Oui, 5 questions", cp: "Non — questionnaire long puis rappel", zpOk: true, cpOk: false },
  { label: "Coût pour l'utilisateur", zp: "Gratuit, sans engagement", cp: "Gratuit… payé par vos données", zpOk: true, cpOk: false },
];

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — miroir douleur + promesse anti-arnaque */}
      <section className="relative pt-16 pb-20 bg-stone-900 text-white overflow-hidden">
        {/* Subtle DPE gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 40%, rgba(201,37,45,0.4) 60%, rgba(245,166,35,0.35) 75%, transparent 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-900/60 border border-brand-700/50 px-4 py-1.5 text-xs font-semibold text-brand-100 mb-6">
              <Sparkles size={14} /> Simulateur ind&eacute;pendant &middot; Bar&egrave;mes officiels 2026
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Votre maison est une{" "}
              <span className="relative">
                <span className="relative z-10">passoire &eacute;nerg&eacute;tique</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-alert-500/30 z-0" />
              </span>
              &nbsp;? On vous dit combien &ccedil;a co&ucirc;te d'en sortir.
            </h1>
            <p className="mt-6 text-lg text-stone-200 leading-relaxed max-w-2xl">
              Vrais chiffres, aides &agrave; jour (MaPrimeR&eacute;nov', CEE, TVA&nbsp;5,5&nbsp;%), reste &agrave; charge estim&eacute;.
              <strong className="text-white"> Sans laisser votre t&eacute;l&eacute;phone.</strong> Sans démarchage. Sans revente de vos coordonn&eacute;es.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#simulateur" className="btn-primary">
                Estimer mon reste &agrave; charge <ChevronDown size={18} />
              </Link>
              <Link href="/guides" className="btn-secondary !border-stone-600 !text-white !bg-transparent hover:!bg-stone-800">
                Lire les guides
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-stone-300">
              <Badge>✓ Aucun numéro obligatoire</Badge>
              <Badge>✓ Résultat affiché tout de suite</Badge>
              <Badge>✓ Sources Légifrance &amp; ADEME</Badge>
            </div>
          </div>

          {/* DPE gauge visual */}
          <div className="mt-16 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-stone-400 mb-3">
              Vous êtes probablement ici&nbsp;:
            </div>
            <DpeGauge />
          </div>
        </div>
      </section>

      {/* 2. SIMULATOR — the machine */}
      <section id="simulateur" className="py-20 scroll-mt-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-2">
              Simulateur gratuit &middot; 40 secondes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Votre plan de sortie chiffr&eacute; en 5 questions
            </h2>
            <p className="mt-3 text-stone-600 max-w-xl mx-auto">
              R&eacute;sultats affich&eacute;s imm&eacute;diatement, sans email requis.
              Vous choisissez ensuite si oui ou non on vous les envoie par &eacute;crit.
            </p>
          </div>
          <Simulator />
        </div>
      </section>

      {/* 3. ANTI-ARNAQUE — what we DON'T do */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-widest mb-2">
              <ShieldAlert size={14} /> Ce qu'on ne fait pas
            </div>
            <h2 className="font-display text-3xl font-bold text-stone-900">
              On n'est pas un comparateur de devis.
            </h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              2,3&nbsp;millions de m&eacute;nages fra&ccedil;ais ont &eacute;t&eacute; victimes d'une arnaque &agrave; la r&eacute;novation
              &eacute;nerg&eacute;tique en 2024 (DGCCRF). On a construit z&eacute;ropassoire pour &ecirc;tre l'exact inverse.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <AntiCard title="Pas de démarchage">
              Personne ne vous appelle sans que vous l'ayez demand&eacute;. Votre num&eacute;ro est optionnel,
              et si vous le laissez, on ne l'appelle qu'une seule fois, sur le cr&eacute;neau que vous choisissez.
            </AntiCard>
            <AntiCard title="Pas de revente">
              Vos coordonn&eacute;es ne sont jamais c&eacute;d&eacute;es &agrave; des artisans, des courtiers
              ou des soci&eacute;t&eacute;s de r&eacute;novation. Point.
            </AntiCard>
            <AntiCard title="Pas de &laquo;&nbsp;1&nbsp;€&nbsp;&raquo;">
              On vous donne des fourchettes r&eacute;alistes, pas des montants marketing.
              Une PAC bien pos&eacute;e co&ucirc;te entre 9&nbsp;000 et 16&nbsp;000&nbsp;&euro; apr&egrave;s aides.
              M&ecirc;me quand c'est moins vendeur.
            </AntiCard>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-4">
            Comment &ccedil;a se passe, concr&egrave;tement
          </h2>
          <p className="text-center text-stone-600 mb-14 max-w-xl mx-auto">
            3 &eacute;tapes, z&eacute;ro engagement. Vous gardez la main du d&eacute;but &agrave; la fin.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              n={1}
              icon={<Wallet className="text-brand-700" />}
              title="Vous simulez"
              time="≈ 40 secondes"
            >
              R&eacute;pondez aux 5 questions, consultez imm&eacute;diatement le co&ucirc;t r&eacute;el des travaux,
              les primes mobilisables et votre reste &agrave; charge. Aucune inscription requise.
            </StepCard>
            <StepCard
              n={2}
              icon={<FileText className="text-brand-707" />}
              title="On vous envoie le plan"
              time="Email sous 30 secondes"
            >
              R&eacute;capitulatif chiffr&eacute;, liste des postes de travaux prioritaires,
              contacts d'artisans RGE de votre d&eacute;partement. Un PDF, consultable hors-ligne.
            </StepCard>
            <StepCard
              n={3}
              icon={<Users className="text-brand-700" />}
              title="Vous choisissez"
              time="Sans aucune pression"
            >
              Vous contactez qui vous voulez, quand vous voulez. On reste joignables pour r&eacute;pondre
              aux questions techniques. On ne relance jamais.
            </StepCard>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL MARKET PROOF (facts, not testimonials) */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
            5,3 millions de logements francais sont des passoires
          </h2>
          <p className="text-center text-stone-300 mb-14 max-w-2xl mx-auto">
            Chiffres officiels Observatoire de la Pr&eacute;carit&eacute; &Eacute;nerg&eacute;tique &amp; SDES (minist&egrave;re &Eacute;nergie), 2025.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <BigStat n="1,8 M" label=" passoires G (logements interdits de location depuis le 1er janv. 2025)" />
            <BigStat n="4,8 M" label=" passoires E, F, G encore louables aujourd'hui" />
            <BigStat n="~ 45 000 €" label="coût moyen d'une sortie G→C en maison individuelle" />
          </div>
          <p className="text-center text-xs text-stone-400 mt-10">
            Sources : SDES &laquo;&nbsp;Données de performance énergétique des logements&nbsp;&raquo; (nov. 2025)
            &middot; OPE, 8<sup>&egrave;me</sup> &eacute;dition &middot; ADEME bar&egrave;mes 2026
          </p>
        </div>
      </section>

      {/* 5.5 COMPARATIF ZÉRO PASSOIRE vs COMPARATEUR — extractable par les moteurs IA */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-2">
              Comparatif transparent
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Z&eacute;ro Passoire vs un comparateur de devis classique
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              Ce qui nous s&eacute;pare, point par point. Vous &ecirc;tes libre de choisir&nbsp;; l'important est de savoir &agrave; quoi vous vous engagez.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-900">
                <tr>
                  <th className="text-left px-4 sm:px-6 py-3 font-semibold">Crit&egrave;re</th>
                  <th className="text-left px-4 sm:px-6 py-3 font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <Check size={16} className="text-brand-700" /> Z&eacute;ro Passoire
                    </span>
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 font-semibold text-stone-500">
                    <span className="inline-flex items-center gap-2">
                      <X size={16} className="text-red-600" /> Comparateur classique
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-4 sm:px-6 py-3 text-stone-800 font-medium align-top">{row.label}</td>
                    <td className="px-4 sm:px-6 py-3 align-top">
                      <span className="inline-flex items-start gap-2 text-brand-800">
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-700" />
                        <span>{row.zp}</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 align-top text-stone-600">
                      <span className="inline-flex items-start gap-2">
                        <X size={16} className="mt-0.5 shrink-0 text-red-500" />
                        <span>{row.cp}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-stone-500 mt-6">
            Comparatif r&eacute;dig&eacute; &agrave; partir de nos propres observations et des signalements DGCCRF 2024 sur les plateformes de mise en relation.
          </p>
        </div>
      </section>

      {/* 6. FAQ objections */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-12">
            Les questions qu'on nous pose vraiment
          </h2>
          {HOME_FAQ.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 7. FINAL SOFT CTA + guides teaser */}
      <section className="py-20 bg-brand-50 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Pr&ecirc;t &agrave; voir vos vrais chiffres&nbsp;?
          </h2>
          <p className="text-stone-700 mb-8 max-w-xl mx-auto">
            40 secondes, sans t&eacute;l&eacute;phone, sans engagement. Vous saurez exactement
            o&ugrave; vous en &ecirc;tes.
          </p>
          <a href="#simulateur" className="btn-primary inline-flex">
            Lancer la simulation <ArrowRight size={18} />
          </a>
          <div className="mt-16 text-left">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-4">
              Pour aller plus loin
            </h3>
            <ul className="grid sm:grid-cols-3 gap-4 text-sm">
              <li>
                <Link href="/guides/sortir-de-passoire-energetique-2026" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Le guide pilier</div>
                  <div className="text-stone-600">Sortir de passoire : le parcours complet</div>
                </Link>
              </li>
              <li>
                <Link href="/guides/aides-financieres-sortie-passoire-2026" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Aides 2026</div>
                  <div className="text-stone-600">MPR&nbsp;+&nbsp;CEE&nbsp;+&nbsp;TVA&nbsp;5,5&nbsp;%&nbsp;+&nbsp;aides locales</div>
                </Link>
              </li>
              <li>
                <Link href="/guides/interdiction-location-passoire-thermique" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Location 2025</div>
                  <div className="text-stone-600">Interdiction G puis F&nbsp;: calendrier</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "h1 + p", "#simulateur h2", "#simulateur h2 + p"],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://zeropassoire.fr/#faq",
            mainEntity: HOME_FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://zeropassoire.fr/#webpage",
            url: "https://zeropassoire.fr",
            name: "Zéro Passoire — simulateur indépendant de coût de sortie de passoire énergétique",
            description: "Simulateur gratuit, sans téléphone obligatoire, basé sur les barèmes officiels MaPrimeRénov', CEE et ADEME 2026. Découvrez combien coûte vraiment la sortie d'un DPE F ou G.",
            inLanguage: "fr-FR",
            isPartOf: { "@id": "https://zeropassoire.fr/#website" },
            about: { "@id": "https://zeropassoire.fr/#organization" },
            hasPart: [{ "@id": "https://zeropassoire.fr/#faq" }, { "@id": "https://zeropassoire.fr/#service" }],
            primaryImageOfPage: "https://zeropassoire.fr/opengraph-image.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://zeropassoire.fr/#service",
            serviceType: "Simulateur de coût de sortie de passoire énergétique",
            name: "Simulateur Zéro Passoire",
            description: "Estimation indicative du coût de travaux de rénovation énergétique (DPE F ou G vers C), incluant MaPrimeRénov', CEE, TVA 5,5 % et PTZ. Résultat immédiat, sans email requis.",
            provider: { "@id": "https://zeropassoire.fr/#organization" },
            areaServed: { "@type": "Country", name: "France" },
            availableLanguage: "fr",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: "https://zeropassoire.fr/simulateur",
              validFor: "P1Y",
            },
          }),
        }}
      />

      <MobileStickyBar />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-stone-800/70 border border-stone-700 px-3 py-1">
      {children}
    </span>
  );
}

function DpeGauge() {
  const bars = [
    { c: "A", col: "#0e7a3c", w: 25 },
    { c: "B", col: "#3ba55d", w: 40 },
    { c: "C", col: "#a8cf45", w: 65 },
    { c: "D", col: "#f4d93c", w: 90 },
    { c: "E", col: "#f5a623", w: 120 },
    { c: "F", col: "#ef6c35", w: 175 },
    { c: "G", col: "#c9252d", w: 235 },
  ];
  return (
    <div className="space-y-1">
      {bars.map((b) => (
        <div key={b.c} className="flex items-center gap-3">
          <div
            className="h-8 rounded-r-md flex items-center justify-center text-white text-sm font-bold"
            style={{ width: `${b.w}px`, backgroundColor: b.col }}
          >
            {b.c}
          </div>
          {(b.c === "F" || b.c === "G") && (
            <div className="text-xs text-stone-300">
              {b.c === "G" ? "← Interdit à la location depuis 01/2025" : "← Interdit à la location au 01/01/2028"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AntiCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50">
      <div className="text-red-700 font-semibold text-sm uppercase tracking-wide mb-2">
        ✗ {title}
      </div>
      <p className="text-stone-700 leading-relaxed">{children}</p>
    </div>
  );
}

function StepCard({ n, icon, title, time, children }: { n: number; icon: React.ReactNode; title: string; time: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">{icon}</div>
        <div className="text-4xl font-display font-bold text-stone-200 leading-none">0{n}</div>
      </div>
      <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{time}</div>
      <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-600 leading-relaxed">{children}</p>
    </div>
  );
}

function BigStat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl sm:text-5xl font-bold text-brand-500 mb-2">{n}</div>
      <div className="text-sm text-stone-300 leading-relaxed">{label}</div>
    </div>
  );
}
