export interface Operator {
  slug: string;
  name: string;
  category: "Mandataire MPR & CEE" | "Obligé Énergie" | "Contractant Général" | "Réseau MAR Indépendant" | "Groupement Artisans RGE";
  shortDescription: string;
  ratingValue: number;
  reviewCount: number;
  publishedAt: string;
  updatedAt: string;
  priceRange: "€€" | "€€€" | "€€€€";
  pros: string[];
  cons: string[];
  hardwareBrands: string[];
  verdict: string;
  editorialReview: string;
  commissionEstimated: string;
  certifiedRGE: boolean;
  agrementMAR: boolean;
  arbitrageCTA: string;
}

export const OPERATORS: Operator[] = [
  {
    slug: "hellio",
    name: "Hellio Rénovation Globale",
    category: "Mandataire MPR & CEE",
    shortDescription: "Pionnier des CEE et mandataire administratif ANAH, Hellio pilote les dossiers MaPrimeRénov' Parcours Accompagné et avance les aides aux particuliers.",
    ratingValue: 4.4,
    reviewCount: 1480,
    publishedAt: "2025-10-18",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Prise en charge complète du dossier MaPrimeRénov' et avance de trésorerie",
      "Agrément Mon Accompagnateur Rénov' (MAR) déployé sur tout le territoire",
      "Écosystème d'artisans RGE partenaires audités techniquement"
    ],
    cons: [
      "Marge d'intermédiation répercutée sur le devis global (15 % à 25 %)",
      "Délais administratifs parfois longs lors de l'instruction par l'ANAH",
      "Moins compétitif sur les petits bouquets de 2 gestes isolés"
    ],
    hardwareBrands: ["Atlantic", "Daikin", "Isover", "Rockwool", "Thermor"],
    verdict: "Idéal pour les propriétaires occupants cherchant la sécurité administrative et l'avance de trésorerie, à condition de comparer le devis avec des artisans RGE en direct.",
    editorialReview: "Hellio est un des piliers historiques de l'efficacité énergétique en France. En tant que mandataire agréé, la plateforme s'occupe de monter l'audit énergétique initial, d'affecter un MAR agréé, de coordonner les différents corps de métier (ITE, PAC, VMC) et de déduire directement MaPrimeRénov' de votre facture finale. En contrepartie, cette tranquillité d'esprit a un coût : les prix forfaitaires au mètre carré pour l'ITE ou la pose de PAC sont 15 à 25 % plus élevés qu'en négociant directement avec un artisan RGE local indépendant.",
    commissionEstimated: "18 % à 25 % de frais d'ingénierie et d'intermédiation intégrés dans le devis travaux",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Comparez le devis Hellio avec 3 artisans RGE indépendants sans intermédiaire"
  },
  {
    slug: "effy",
    name: "Effy Sérénité",
    category: "Mandataire MPR & CEE",
    shortDescription: "Leader historique de la rénovation énergétique grand public, Effy certifie plus de 4 000 artisans partenaires et déduit la Prime Effy directement des devis.",
    ratingValue: 4.2,
    reviewCount: 2310,
    publishedAt: "2025-11-04",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Plateforme web fluide avec simulateur d'aides officiel 2026",
      "Prime Effy (CEE) bonifiée et déduite immédiatement",
      "Réseau national très dense permettant des délais de démarrage rapides"
    ],
    cons: [
      "Suivi de chantier délégué aux artisans sans présence systématique d'un conducteur externe",
      "Surcoût visible sur les pompes à chaleur par rapport aux grossistes directs",
      "Service client centralisé parfois difficile à joindre en période de pointe"
    ],
    hardwareBrands: ["Daikin", "Mitsubishi Electric", "Isover", "Hitachi", "Velux"],
    verdict: "Une référence reconnue pour sécuriser l'obtention des primes CEE et MaPrimeRénov', mais qui nécessite de surveiller rigoureusement l'exécution locale des artisans.",
    editorialReview: "Effy accompagne chaque année plusieurs dizaines de milliers de foyers dans leur rénovation énergétique. Son offre 'Effy Sérénité' prend en charge la constitution intégrale du dossier MaPrimeRénov' et applique la déduction directe. Cependant, Effy agit principalement comme tiers de confiance commercial et mandataire : l'exécution technique repose à 100 % sur les artisans du réseau local, dont les qualifications et la disponibilité peuvent varier sensiblement d'un département à l'autre.",
    commissionEstimated: "15 % à 22 % de commission d'apport d'affaires et de gestion administrative",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Mettez en concurrence Effy avec des installateurs RGE locaux audités"
  },
  {
    slug: "izi-by-edf",
    name: "IZI by EDF Rénovation",
    category: "Obligé Énergie",
    shortDescription: "Filiale de travaux du groupe EDF, IZI propose des packs de rénovation globale avec audit thermique et garantie de bonne fin de travaux adossée à EDF.",
    ratingValue: 4.3,
    reviewCount: 960,
    publishedAt: "2025-11-20",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Assise et solvabilité du groupe EDF : zéro risque de faillite en cours de chantier",
      "Accompagnement par des conseillers énergie dédiés du diagnostic à la réception",
      "Matériels et pompes à chaleur de marques premium exclusivement"
    ],
    cons: [
      "Positionnement tarifaire dans la fourchette haute du marché",
      "Délais administratifs plus longs liés aux validations internes",
      "Politique commerciale très orientée vers le tout-électrique et la PAC"
    ],
    hardwareBrands: ["Saunier Duval", "Atlantic", "Daikin", "Isover", "De Dietrich"],
    verdict: "La sécurité institutionnelle maximale pour les propriétaires prudents, au prix d'un reste à charge supérieur de 20 à 30 % à la moyenne du marché.",
    editorialReview: "IZI by EDF capitalise sur la confiance historique de la marque EDF auprès des ménages français. Sur les passoires thermiques F et G, IZI propose une prise en charge globale : audit énergétique réglementaire, validation du saut de 2 classes DPE minimum pour le Parcours Accompagné, et supervision des artisans partenaires RGE. C'est l'option tranquillité absolue, mais elle s'accompagne d'un tarif 'grand groupe' rarement négociable.",
    commissionEstimated: "20 % à 28 % de marge de gestion de projet et garantie de groupe",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Évitez la surcommission EDF : comparez avec des pros RGE en circuit court"
  },
  {
    slug: "sonergia",
    name: "Sonergia Rénovation Globale",
    category: "Obligé Énergie",
    shortDescription: "Acteur majeur et délégataire CEE indépendant depuis 2009, Sonergia valorise les primes énergies pour les ménages modestes et très modestes.",
    ratingValue: 4.2,
    reviewCount: 640,
    publishedAt: "2025-12-08",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Excellente valorisation des certificats d'économies d'énergie (CEE)",
      "Offres particulièrement adaptées aux ménages aux revenus très modestes (Bleu MPR)",
      "Procédures d'audit et de contrôle qualité COFRAC post-travaux"
    ],
    cons: [
      "Notoriété grand public moins forte que les grands énergéticiens",
      "Réseau d'artisans moins dense dans certaines zones rurales",
      "Offre digitale moins interactive que les plateformes web pures"
    ],
    hardwareBrands: ["Atlantic", "Panasonic", "Rockwool", "Knauf Insulation", "Aldes"],
    verdict: "Un délégataire CEE très performant pour maximiser les aides financières, notamment si vous êtes éligible aux tranches de revenus les plus aidées.",
    editorialReview: "Basé à Marseille et rayonnant sur toute la France, Sonergia est spécialisé dans le financement de la transition écologique. Son point fort réside dans son expertise pointue du mécanisme des CEE : Sonergia achète et valorise vos kWh cumac au meilleur cours du marché, ce qui permet de réduire le reste à charge global sur les gros chantiers d'isolation thermique extérieure et de ventilation double flux.",
    commissionEstimated: "12 % à 18 % intégrés dans la valorisation des CEE",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Vérifiez votre reste à charge réel avec un artisan RGE local agréé"
  },
  {
    slug: "heero",
    name: "Heero Solutions Climat",
    category: "Mandataire MPR & CEE",
    shortDescription: "Fintech et courtier en rénovation énergétique issu du groupe Pro BTP, Heero structure le plan de financement complet (aides + Éco-PTZ + prêt bancaire).",
    ratingValue: 4.5,
    reviewCount: 510,
    publishedAt: "2025-12-28",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Expertise unique sur le montage bancaire et l'Éco-Prêt à Taux Zéro (Éco-PTZ)",
      "Simulateur de financement ultra précis intégrant fiscalité et plus-value verte",
      "Sélection stricte d'entreprises RGE labellisées et assurées décennale"
    ],
    cons: [
      "Frais de courtage financier applicables selon les dossiers",
      "Moins orienté travaux lourds d'urgence, processus très analytique",
      "Encore jeune par rapport aux acteurs historiques du secteur"
    ],
    hardwareBrands: ["Daikin", "Isover", "Atlantic", "Viessmann", "Somfy"],
    verdict: "Le meilleur choix pour les propriétaires qui ont besoin d'un prêt bancaire ou d'un Éco-PTZ pour financer leur reste à charge sans piocher dans leur épargne.",
    editorialReview: "Heero résout le véritable goulot d'étranglement de la sortie de passoire : le financement du reste à charge. Même avec 70 % d'aides MaPrimeRénov', une rénovation globale à 60 000 € laisse 18 000 € à débourser. Heero monte simultanément le dossier d'aides publiques et le prêt bancaire bonifié (Éco-PTZ jusqu'à 50 000 € à 0 % sur 20 ans), ce qui permet de neutraliser l'effort de trésorerie du propriétaire.",
    commissionEstimated: "Frais de mandat financier et commission d'apport travaux (10 % à 18 %)",
    certifiedRGE: true,
    agrementMAR: false,
    arbitrageCTA: "Comparez les options de financement avec un bureau d'études indépendant"
  },
  {
    slug: "engie-renovation",
    name: "ENGIE Rénovation Énergétique",
    category: "Obligé Énergie",
    shortDescription: "La branche rénovation de l'énergéticien ENGIE propose la prime Économie d'Énergie et des forfaits clés en main pompe à chaleur et isolation.",
    ratingValue: 4.1,
    reviewCount: 1820,
    publishedAt: "2026-01-14",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Prime ENGIE déduite directement ou versée par chèque bancaire",
      "Partenariats technologiques solides avec les fabricants de PAC européens",
      "Contrat d'entretien annuel et maintenance connectée"
    ],
    cons: [
      "Tarifs travaux sensiblement supérieurs à ceux des PME locales",
      "Pression commerciale sur les contrats d'approvisionnement en énergie",
      "Processus de réclamation parfois long en cas de malfaçon sur le chantier"
    ],
    hardwareBrands: ["Daikin", "Atlantic", "De Dietrich", "Rockwool", "Zehnder"],
    verdict: "Une solution sécurisante pour les clients déjà abonnés ENGIE, mais nécessitant impérativement un contre-devis pour vérifier le prix du matériel.",
    editorialReview: "ENGIE mobilise son réseau national de partenaires installateurs certifiés RGE pour proposer des sorties de passoire clés en main. Bien que la gestion de la Prime ENGIE soit parfaitement rodée, les devis proposés intègrent des coûts de structure importants. Nous recommandons d'utiliser le montant de leur prime comme point de repère tout en sollicitant des artisans locaux indépendants.",
    commissionEstimated: "22 % à 30 % de marge d'intermédiaire commercial et de marque",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Comparez le devis ENGIE avec des artisans RGE directs sans surcoût"
  },
  {
    slug: "totalenergies-renov",
    name: "TotalEnergies Rénovation & CEE",
    category: "Obligé Énergie",
    shortDescription: "Premier obligé CEE de France, TotalEnergies finance massivement les travaux de rénovation globale via son programme Prime Énergie et ses filiales de travaux.",
    ratingValue: 4.0,
    reviewCount: 1140,
    publishedAt: "2026-02-02",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Volume financier colossal permettant des primes CEE parmi les plus élevées du marché",
      "Couverture géographique intégrale sur toutes les régions françaises",
      "Audits thermiques réglementaires subventionnés"
    ],
    cons: [
      "Sous-traitance généralisée : vous ne savez pas quel sous-traitant intervient avant le devis",
      "Contrôles de chantier parfois expéditifs",
      "Focalisation très forte sur le volume plutôt que sur le sur-mesure patrimonial"
    ],
    hardwareBrands: ["Atlantic", "Mitsubishi Electric", "Isover", "Soprema", "Thermor"],
    verdict: "Un géant de l'énergie incontournable pour les primes CEE pures, mais qui demande une grande vigilance sur le choix effectif de l'artisan exécutant.",
    editorialReview: "TotalEnergies a pour obligation légale d'accumuler des térawattheures cumac de certificats d'économies d'énergie. En conséquence, leur programme de rénovation globale est très agressif sur les aides. Néanmoins, TotalEnergies sous-traite 100 % de l'exécution à des réseaux régionaux d'artisans. Vérifier l'assurance décennale et les références du sous-traitant intervenant chez vous demeure indispensable.",
    commissionEstimated: "18 % à 25 % de marge de délégation et d'apport d'affaires",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Faites évaluer votre projet par des artisans locaux certifiés RGE"
  },
  {
    slug: "camif-habitat",
    name: "Camif Habitat Rénovation Globale",
    category: "Contractant Général",
    shortDescription: "Contractant général historique de la maison individuelle, Camif Habitat s'engage contractuellement sur les délais, le prix ferme et la réussite du gain DPE.",
    ratingValue: 4.6,
    reviewCount: 420,
    publishedAt: "2026-02-22",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Contrat de contractant général : prix ferme, délai garanti, interlocuteur unique",
      "Audit architectural et énergétique approfondi avant toute signature",
      "Excellente prise en compte du bâti ancien (pierre, pisé, colombages)"
    ],
    cons: [
      "Le tarif le plus élevé du panel : prestation haut de gamme",
      "Ticket d'entrée de chantier souvent fixé à 30 000 € minimum",
      "Processus d'étude préliminaire plus long (3 à 6 semaines avant devis final)"
    ],
    hardwareBrands: ["Isover", "Rockwool", "Daikin", "Viessmann", "Velux"],
    verdict: "Le choix d'excellence pour les propriétaires de bâtisses de caractère ou complexes qui veulent une garantie légale d'achèvement et un résultat garanti.",
    editorialReview: "Contrairement aux plateformes d'intermédiation simples, Camif Habitat opère sous le statut protecteur de contractant général. Cela signifie qu'ils portent la responsabilité juridique complète du chantier, des assurances et de la performance thermique promise. Si vous devez passer de G à B sur une maison ancienne complexe, leur encadrement technique évite les pathologies d'humidité fréquentes après une isolation mal conçue.",
    commissionEstimated: "25 % à 35 % de frais d'ingénierie globale, maîtrise d'œuvre et garantie de parfait achèvement",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Mettez en concurrence avec des maîtres d'œuvre et artisans RGE régionaux"
  },
  {
    slug: "la-maison-saint-gobain",
    name: "La Maison Saint-Gobain",
    category: "Contractant Général",
    shortDescription: "Portail travaux du fabricant mondial de matériaux Saint-Gobain, mettant en relation avec des pros labellisés 'Artisans RGE Saint-Gobain'.",
    ratingValue: 4.4,
    reviewCount: 890,
    publishedAt: "2026-03-12",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Maîtrise technique absolue des matériaux d'isolation (Isover, Placo, Weber)",
      "Artisans formés directement aux cahiers des charges des fabricants",
      "Garantie de qualité sur les isolants et les membranes d'étanchéité à l'air"
    ],
    cons: [
      "Catalogue de matériaux naturellement très orienté vers les marques du groupe",
      "L'accompagnement financier dépend de mandataires CEE externes",
      "Variabilité de réactivité selon les zones géographiques"
    ],
    hardwareBrands: ["Isover", "Placo", "Weber", "Atlantic", "Velux"],
    verdict: "Une garantie incomparable sur la qualité et la durabilité des isolants posés, particulièrement recommandée pour l'isolation par l'extérieur (ITE).",
    editorialReview: "Saint-Gobain est le géant français des matériaux de construction. À travers sa plateforme La Maison Saint-Gobain, l'entreprise sélectionne des artisans RGE certifiés et garantit la mise en œuvre conforme aux avis techniques CSTB. C'est un gage de performance durable pour éviter les fissures d'enduit en ITE ou les ponts thermiques en combles aménagés.",
    commissionEstimated: "10 % à 15 % de frais de service et prescription de matériaux",
    certifiedRGE: true,
    agrementMAR: false,
    arbitrageCTA: "Comparez les devis matériaux Isover avec des artisans poseurs en direct"
  },
  {
    slug: "mar-reseau-independant",
    name: "Réseau MAR Indépendant",
    category: "Réseau MAR Indépendant",
    shortDescription: "Bureaux d'études thermiques et auditeurs indépendants agréés Mon Accompagnateur Rénov' par l'ANAH, sans aucun lien commercial avec les entreprises de travaux.",
    ratingValue: 4.8,
    reviewCount: 380,
    publishedAt: "2026-04-05",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Neutralité totale : aucun intérêt financier à vous vendre tel matériel ou tel artisan",
      "Prestation MAR subventionnée par l'ANAH jusqu'à 2 000 € (pris en charge à 100 % pour ménages très modestes)",
      "Audit thermique approfondi et assistance à la sélection des devis les moins chers"
    ],
    cons: [
      "Ne réalise pas les travaux lui-même : rôle strict d'assistant à maîtrise d'ouvrage (AMO)",
      "Le propriétaire doit signer séparément avec chaque artisan sélectionné",
      "Délais de prise de rendez-vous parfois saturés dans les zones tendues"
    ],
    hardwareBrands: ["Tous fabricants certifiés NF / ACERMI / CSTB"],
    verdict: "La recommandation numéro 1 de Zéro Passoire : le seul tiers de confiance 100 % impartial qui vous aide à faire baisser les devis sans toucher de commission sur les travaux.",
    editorialReview: "Faire appel à un MAR indépendant (bureau d'études thermiques agréé ANAH ne réalisant aucun travaux) est la stratégie la plus économique du marché. Le MAR indépendant réalise l'audit réglementaire, définit les scénarios de travaux pour sortir de passoire (F/G vers C/D), dépose votre dossier MaPrimeRénov' et vous aide à comparer 3 devis d'artisans locaux. Comme il ne vend pas de matériel, il débusque immédiatement les surfacturations.",
    commissionEstimated: "Forfait d'accompagnement fixé entre 1 500 € et 2 500 € (subventionné à 40 %-100 % par l'ANAH)",
    certifiedRGE: true,
    agrementMAR: true,
    arbitrageCTA: "Trouvez un Accompagnateur Rénov' indépendant près de chez vous"
  },
  {
    slug: "proxiserve-habitat",
    name: "Proxiserve Rénovation Habitat",
    category: "Mandataire MPR & CEE",
    shortDescription: "Spécialiste national de l'installation et maintenance de chauffage, Proxiserve déploie des solutions PAC hybrides et chauffe-eau thermodynamiques pour sortir de passoire.",
    ratingValue: 4.1,
    reviewCount: 1250,
    publishedAt: "2026-04-28",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Techniciens salariés et agences physiques dans toute la France",
      "Contrat d'entretien avec télédiagnostic et dépannage rapide 6j/7",
      "Spécialiste reconnu des chaufferies complexes et de la régulation connectée"
    ],
    cons: [
      "Focalisé en priorité sur le lot chauffage/ventilation, moins sur l'isolation lourde",
      "Prix des équipements souvent calqués sur le tarif catalogue public",
      "Pression commerciale sur les abonnements d'entretien longue durée"
    ],
    hardwareBrands: ["Atlantic", "Daikin", "Chaffoteaux", "Saunier Duval", "Thermor"],
    verdict: "Très compétent sur le remplacement de chaudières fioul/gaz par une PAC haute performance, mais à compléter par un artisan spécialiste de l'isolation.",
    editorialReview: "Proxiserve est un acteur historique du confort thermique résidentiel. Leurs équipes interviennent rapidement pour remplacer un système de chauffage obsolète responsable d'un DPE G. Toutefois, sortir durablement d'une passoire thermique nécessite presque toujours de combiner chauffage ET isolation des parois déperditives : l'offre Proxiserve doit donc être coordonnée avec un plaquiste ou façadier.",
    commissionEstimated: "15 % à 22 % de marge de distribution et service",
    certifiedRGE: true,
    agrementMAR: false,
    arbitrageCTA: "Comparez les forfaits PAC Proxiserve avec des frigoristes RGE locaux"
  },
  {
    slug: "artisans-capeb-ffb",
    name: "Artisans RGE Indépendants (CAPEB & FFB)",
    category: "Groupement Artisans RGE",
    shortDescription: "Les artisans et entreprises locales certifiées RGE Qualibat, QualiPAC et QualiBois réunies en groupements momentanés d'entreprises (GME) sans intermédiaire.",
    ratingValue: 4.7,
    reviewCount: 3120,
    publishedAt: "2026-05-15",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Le meilleur rapport qualité/prix : zéro intermédiaire, zéro commission de grand groupe",
      "Contact direct avec l'artisan qui pose lui-même vos matériaux",
      "Réactivité immédiate et ancrage local (réputation de proximité)"
    ],
    cons: [
      "Gestion administrative des aides parfois laissée au client ou à un MAR externe",
      "Nécessite de coordonner 2 ou 3 artisans si aucun groupement formalisé n'existe",
      "Disponibilité parfois tendue sur plusieurs mois en haute saison"
    ],
    hardwareBrands: ["Daikin", "Atlantic", "Rockwool", "Isover", "Soprema", "Mitsubishi Electric"],
    verdict: "L'option la plus rentable économiquement : les travaux coûtent 20 à 35 % moins cher qu'auprès des courtiers nationaux, pour une qualité d'exécution souvent supérieure.",
    editorialReview: "Traiter directement avec des artisans RGE affiliés à la CAPEB ou à la FFB est la méthode recommandée pour maximiser l'impact de chaque euro investi. L'artisan local ne paie ni call-center ni campagnes télévisées : ses devis reflètent le coût réel des matériaux et de la main-d'œuvre qualifiée. En associant un artisan local à un MAR indépendant pour les démarches administratives, vous obtenez le meilleur des deux mondes.",
    commissionEstimated: "0 % de surcommission d'intermédiaire tiers (devis direct artisan)",
    certifiedRGE: true,
    agrementMAR: false,
    arbitrageCTA: "Obtenez 3 devis gratuits d'artisans RGE indépendants près de chez vous"
  }
];

export interface HardwareBrand {
  slug: string;
  name: string;
  category: "Isolation Thermique" | "Pompe à Chaleur" | "Menuiseries & Toiture";
  origin: string;
  warranty: string;
  keyProducts: string[];
  certifications: string[];
  gainDpeEstime: string;
  summary: string;
  description: string;
}

export const HARDWARE_BRANDS: HardwareBrand[] = [
  {
    slug: "isover",
    name: "Isover (Saint-Gobain)",
    category: "Isolation Thermique",
    origin: "France",
    warranty: "Garantie fabricant 25 ans / ACERMI",
    keyProducts: ["GR 32 Roulé", "Isoconfort 35", "Optima Murs", "Comblissimo"],
    certifications: ["ACERMI", "CSTB", "CE", "Label Émissions A+"],
    gainDpeEstime: "1 à 2 classes DPE (selon surface isolée)",
    summary: "Numéro 1 mondial des isolants en laine de verre haute performance thermique et acoustique.",
    description: "Isover fabrique en France des solutions d'isolation indispensables pour éradiquer les ponts thermiques des passoires F et G. Avec des résistances thermiques atteignant R = 7 à 10 m²·K/W en combles, leurs produits sont éligibles aux barèmes maximaux de MaPrimeRénov'."
  },
  {
    slug: "rockwool",
    name: "Rockwool",
    category: "Isolation Thermique",
    origin: "Danemark / Usines France",
    warranty: "Garantie 30 ans / Incombustible A1",
    keyProducts: ["Rockplus Premium", "Rockfaçade ITE", "Jetrock 2 Combles", "Rockmur"],
    certifications: ["ACERMI", "Euroclasse A1", "CSTB Document Technique Unifié"],
    gainDpeEstime: "1 à 2 classes DPE",
    summary: "Spécialiste mondial de la laine de roche volcanique incombustible et confort d'été.",
    description: "La laine de roche Rockwool offre une double protection : une isolation thermique d'hiver optimale et une inertie thermique remarquable qui protège les combles de la surchauffe estivale. Incombustible (classe A1), elle est privilégiée en rénovation globale de maisons individuelles et copropriétés."
  },
  {
    slug: "daikin",
    name: "Daikin",
    category: "Pompe à Chaleur",
    origin: "Japon / Usines Europe",
    warranty: "Garantie 5 ans compresseur / Stand By Me",
    keyProducts: ["Altherma 3 H HT (Haute Température)", "Altherma 3 M Monobloc", "Multi-Split Emura"],
    certifications: ["NF PAC", "Eurovent", "HP Keymark", "SCOP A+++"],
    gainDpeEstime: "2 à 3 classes DPE (remplacement chaudière fioul/gaz)",
    summary: "Leader européen des pompes à chaleur air-eau haute température pour radiateurs existants.",
    description: "Daikin Altherma 3 H HT est la pompe à chaleur star de la sortie de passoire thermique : elle monte l'eau de chauffage à 70°C même par -15°C extérieur sans appoint électrique, ce qui évite de devoir remplacer les radiateurs en fonte existants. Le saut de DPE est immédiat."
  },
  {
    slug: "atlantic",
    name: "Atlantic",
    category: "Pompe à Chaleur",
    origin: "France (La Roche-sur-Yon)",
    warranty: "Garantie 5 ans cuve/compresseur / Réseau national SAV",
    keyProducts: ["Alféa Excellia A.I.", "Ixtra M Monobloc R290", "Calypso Chauffe-eau Thermodynamique"],
    certifications: ["Origine France Garantie", "NF PAC", "Eurovent", "QualiPAC"],
    gainDpeEstime: "2 classes DPE",
    summary: "Fabricant français historique, pièces détachées disponibles pendant 10 ans et SAV partout en France.",
    description: "Atlantic conçoit des pompes à chaleur hybrides et thermodynamiques robustes adaptées au climat français. Leur nouvelle gamme Ixtra M au fluide écologique R290 (propane) combine haute température d'eau (jusqu'à 75°C) et respect des normes environnementales les plus strictes."
  },
  {
    slug: "soprema",
    name: "Soprema",
    category: "Isolation Thermique",
    origin: "France (Strasbourg)",
    warranty: "Garantie décennale étanchéité",
    keyProducts: ["Pavatex (fibre de bois)", "Sopravapo", "EFISOL polyuréthane", "Flagon"],
    certifications: ["ACERMI", "FDES", "Natureplus", "CSTB"],
    gainDpeEstime: "1 à 2 classes DPE",
    summary: "Référence mondiale de l'étanchéité de toiture et des isolants biosourcés en fibre de bois.",
    description: "Soprema est incontournable pour la réfection des toitures-terrasses et des toitures en pente. Leur gamme Pavatex en fibre de bois naturelle apporte un déphasage thermique record pour neutraliser la chaleur d'été tout en isolant parfaitement du froid hivernal."
  },
  {
    slug: "velux",
    name: "Velux",
    category: "Menuiseries & Toiture",
    origin: "Danemark / Usines France",
    warranty: "Garantie 10 ans fenêtres / 20 ans vitrage",
    keyProducts: ["Fenêtres Tout Confort Triple Vitrage", "Volet Roulant Solaire SSL", "Verrière modulaire"],
    certifications: ["CE", "CSTBat", "Acotherm Th12", "Uw = 1,0 W/m²·K"],
    gainDpeEstime: "1 classe DPE",
    summary: "Leader incontesté des fenêtres de toit isolantes et de la ventilation naturelle des combles.",
    description: "Remplacer des anciennes fenêtres de toit simple ou double vitrage âgé par des modèles Velux Tout Confort à triple vitrage permet d'éradiquer jusqu'à 20 % des déperditions de toiture dans les combles aménagés, tout en apportant une étanchéité à l'air certifiée."
  }
];

export interface PassoireDuel {
  slug: string;
  title: string;
  subjectA: string;
  subjectB: string;
  category: "Aides & Financement" | "Travaux & Technique" | "Acteurs & Stratégie";
  winner: string;
  summary: string;
  criteria: { label: string; scoreA: string; scoreB: string; note: string }[];
  verdict: string;
}

export const PASSOIRE_DUELS: PassoireDuel[] = [
  {
    slug: "parcours-accompagne-vs-geste-par-geste",
    title: "MaPrimeRénov' Parcours Accompagné vs Aides au Geste",
    subjectA: "Parcours Accompagné (Rénovation Globale)",
    subjectB: "Aides au Geste (Monogeste / 2 gestes)",
    category: "Aides & Financement",
    winner: "Parcours Accompagné (pour passoires F et G)",
    summary: "Le Parcours Accompagné subventionne jusqu'à 90 % d'un montant de travaux plafonné à 70 000 € HT (soit jusqu'à 63 000 € d'aides), contre seulement quelques milliers d'euros pour une aide monogeste.",
    criteria: [
      { label: "Plafond des travaux éligibles", scoreA: "Jusqu'à 70 000 € HT", scoreB: "Limité par poste (ex. 5 000 € PAC)", note: "Le Parcours Accompagné permet de traiter toiture + murs + chauffage ensemble." },
      { label: "Taux de prise en charge max", scoreA: "Jusqu'à 90 % (ménages très modestes)", scoreB: "20 % à 40 % du devis", note: "Reste à charge drastiquement plus faible en rénovation globale." },
      { label: "Obligation Mon Accompagnateur Rénov'", scoreA: "Oui (MAR obligatoire)", scoreB: "Non requis", note: "Le MAR sécurise le dossier mais ajoute une étape préliminaire." },
      { label: "Gain DPE minimum imposé", scoreA: "2 classes DPE minimum (ex. G vers E ou D)", scoreB: "Aucun saut de classe imposé", note: "Garantie contractuelle de sortir du statut de passoire thermique." }
    ],
    verdict: "Pour une maison classée F ou G, le Parcours Accompagné est mathématiquement imbattable : il finance la majorité des travaux lourds indispensables et protège de l'interdiction de location."
  },
  {
    slug: "ite-vs-iti",
    title: "Isolation Thermique par l'Extérieur (ITE) vs par l'Intérieur (ITI)",
    subjectA: "Isolation par l'Extérieur (ITE)",
    subjectB: "Isolation par l'Intérieur (ITI)",
    category: "Travaux & Technique",
    winner: "ITE (Performance et surface préservée)",
    summary: "L'ITE enveloppe le bâtiment et supprime les ponts thermiques de planchers sans réduire la surface habitable Carrez, tandis que l'ITI est moins chère mais grignote 5 à 8 % de surface.",
    criteria: [
      { label: "Suppression des ponts thermiques", scoreA: "Excellente (enveloppe continue)", scoreB: "Partielle (jonctions planchers non isolées)", note: "L'ITE élimine les déperditions aux abouts de dalle." },
      { label: "Impact sur la surface habitable Carrez", scoreA: "Zéro perte de m² intérieur", scoreB: "Perte de 5 % à 8 % de surface", note: "Crucial pour la valorisation immobilière du bien." },
      { label: "Coût moyen au m²", scoreA: "130 à 210 € / m²", scoreB: "60 à 110 € / m²", note: "L'ITI est plus économique au devis initial mais moins subventionnée en gain global." },
      { label: "Contraintes de vie pendant travaux", scoreA: "Logement totalement habitable", scoreB: "Déménagement ou pièces bloquées", note: "L'ITE se fait 100 % depuis l'échafaudage extérieur." }
    ],
    verdict: "L'ITE est la reine de la rénovation thermique pour les maisons individuelles. L'ITI reste pertinente si la façade extérieure est classée ou en appartement sans accord de copropriété."
  },
  {
    slug: "pompe-a-chaleur-vs-chaudiere-biomasse-granules",
    title: "Pompe à Chaleur Air-Eau vs Chaudière à Granulés de Bois",
    subjectA: "Pompe à Chaleur Air-Eau (PAC)",
    subjectB: "Chaudière Biomasse (Pellets / Granulés)",
    category: "Travaux & Technique",
    winner: "Pompe à Chaleur Air-Eau (polyvalence et entretien)",
    summary: "La pompe à chaleur air-eau puise les calories gratuites de l'air avec un COP de 3,5 à 4,5, sans stockage de combustible, alors que la chaudière à granulés exige un silo et un décendrage régulier.",
    criteria: [
      { label: "Coefficient de performance (COP)", scoreA: "3,5 à 4,5 (1 kWh consommé = 4 kWh restitués)", scoreB: "Rendement 90 % à 95 %", note: "La PAC restitue plus d'énergie qu'elle n'en consomme." },
      { label: "Espace de stockage requis", scoreA: "Zéro stockage (unité extérieure compacte)", scoreB: "Silo de 4 à 6 m³ nécessaire", note: "La chaudière à pellets nécessite une chaufferie volumineuse." },
      { label: "Contrainte d'entretien", scoreA: "Visite annuelle obligatoire", scoreB: "Décendrage mensuel + 2 ramonages/an", note: "La PAC est 100 % automatique au quotidien." },
      { label: "Aides financières MaPrimeRénov'", scoreA: "Jusqu'à 5 000 € (monogeste) ou 90 % (global)", scoreB: "Jusqu'à 7 000 € (monogeste) ou 90 % (global)", note: "Les deux systèmes sont au sommet des aides écologiques." }
    ],
    verdict: "La pompe à chaleur s'impose dans 85 % des projets de sortie de passoire thermique pour son confort d'usage et l'absence de corvée de granulés."
  },
  {
    slug: "audit-energetique-reglementaire-vs-dpe",
    title: "Audit Énergétique Réglementaire vs Diagnostic de Performance Énergétique (DPE)",
    subjectA: "Audit Énergétique Réglementaire",
    subjectB: "DPE (Diagnostic Performance Énergétique)",
    category: "Acteurs & Stratégie",
    winner: "Audit Réglementaire (Feuille de route chiffrée obligatoire)",
    summary: "Le DPE constate la classe énergétique (F ou G), tandis que l'audit énergétique obligatoire propose des scénarios de travaux chiffrés, le gain DPE visé et les aides mobilisables.",
    criteria: [
      { label: "Caractère opposable", scoreA: "Opposable juridiquement", scoreB: "Opposable juridiquement depuis 2021", note: "L'auditeur engage sa responsabilité décennale sur les calculs." },
      { label: "Scénarios de travaux chiffrés", scoreA: "Oui (2 à 3 scénarios avec coûts et aides)", scoreB: "Recommandations génériques non chiffrées", note: "L'audit donne le coût exact par poste de travaux." },
      { label: "Obligation lors de la vente", scoreA: "Obligatoire pour biens classés F et G", scoreB: "Obligatoire pour toute transaction", note: "Sans audit réglementaire, la vente d'une passoire est bloquée chez le notaire." },
      { label: "Tarif moyen constaté", scoreA: "700 à 1 200 €", scoreB: "150 à 300 €", note: "L'audit est plus approfondi et subventionné par l'ANAH en rénovation globale." }
    ],
    verdict: "Le DPE pose le diagnostic, mais l'audit réglementaire est le véritable plan de bataille pour rénover et débloquer les 70 000 € de MaPrimeRénov' Parcours Accompagné."
  },
  {
    slug: "hellio-vs-effy",
    title: "Hellio vs Effy : quel mandataire choisir pour sa rénovation globale ?",
    subjectA: "Hellio Rénovation",
    subjectB: "Effy Sérénité",
    category: "Acteurs & Stratégie",
    winner: "Hellio (pour l'avance de trésorerie MPR)",
    summary: "Deux mastodontes de la rénovation énergétique : Hellio se distingue par son avance directe de MaPrimeRénov', tandis qu'Effy propose un simulateur digital plus intuitif et un réseau d'artisans plus large.",
    criteria: [
      { label: "Avance des aides financières", scoreA: "Prise en charge intégrale de l'avance", scoreB: "Prime Effy déduite, MPR remboursée", note: "Hellio évite d'avancer la part ANAH sur fonds propres." },
      { label: "Agrément Mon Accompagnateur Rénov'", scoreA: "Déployé en interne", scoreB: "Partenariats MAR agréés", note: "Les deux acteurs permettent d'instruire le Parcours Accompagné." },
      { label: "Taille du réseau d'artisans RGE", scoreA: "~ 2 500 entreprises partenaires", scoreB: "+ 4 000 entreprises partenaires", note: "Effy a une couverture géographique légèrement plus dense." },
      { label: "Transparence des devis travaux", scoreA: "Forfaits globaux clés en main", scoreB: "Devis détaillés par l'artisan référencé", note: "Comparer impérativement les deux avec un artisan direct." }
    ],
    verdict: "Hellio est plus confortable pour les ménages aux revenus modestes grâce à l'avance de trésorerie ; Effy est plus rapide pour comparer des devis d'artisans proches de chez vous."
  },
  {
    slug: "mar-prive-vs-mar-public-espace-conseil",
    title: "Mon Accompagnateur Rénov' Privé vs Espace Conseil France Rénov' Public",
    subjectA: "MAR Privé (Bureau d'études agréé)",
    subjectB: "Espace Conseil Public (France Rénov')",
    category: "Acteurs & Stratégie",
    winner: "MAR Privé (pour la disponibilité et le suivi de chantier)",
    summary: "L'Espace Conseil public est gratuit mais souvent saturé avec plusieurs mois d'attente, tandis que le MAR privé agréé ANAH est disponible immédiatement et subventionné par l'État.",
    criteria: [
      { label: "Coût de la prestation", scoreA: "1 500 à 2 500 € (pris en charge à 40-100 %)", scoreB: "100 % Gratuit", note: "Le reste à charge du MAR privé est nul pour les revenus très modestes." },
      { label: "Délai de prise de rendez-vous", scoreA: "1 à 2 semaines", scoreB: "2 à 4 mois selon les territoires", note: "Le MAR privé permet de ne pas rater les fenêtres d'aides." },
      { label: "Visites physiques sur place", scoreA: "2 visites obligatoires (avant et fin de chantier)", scoreB: "Principalement conseil téléphonique ou guichet", note: "Le MAR privé contrôle la conformité des travaux sur site." },
      { label: "Dépôt administratif du dossier ANAH", scoreA: "Accompagnement pas à pas au montage", scoreB: "Orientation sans prise en charge directe", note: "Gain de temps substantiel sur la paperasse." }
    ],
    verdict: "Mandater un MAR privé agréé par l'ANAH est le choix de l'efficacité pour lancer son chantier sans attendre 6 mois de file d'attente dans les structures publiques saturées."
  }
];
