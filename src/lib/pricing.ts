/**
 * Barèmes 2026 pour simulateur de sortie de passoire énergétique.
 * Sources : ARRÊTÉ du 2 octobre 2025 (MaPrimeRénov' 2026), Barème CEE
 * BAR-TH-105 / 106 / 129 / 164, prix observés ADEME 2024-2026.
 * Toute modification doit être répercutée dans les guides MDX.
 */

export type DpeClass = "E" | "F" | "G";
export type ChauffageType = "electrique" | "gaz" | "fioul" | "granule" | "pac" | "bois";
export type LogementType = "maison" | "appartement";
export type StatutType = "occupant" | "bailleur";

export interface SimulateurInput {
  classe: DpeClass;
  surface: number;         // m²
  cp: string;              // code postal 5 chiffres
  chauffage: ChauffageType;
  type: LogementType;
  statut?: StatutType;     // occupant ou bailleur
  menageIncomeBracket: "tres_modeste" | "modeste" | "intermediaire" | "superieur";
}

export interface PosteTravauxDetail {
  id: string;
  label: string;
  description: string;
  coutEstime: number;
}

export interface EcheanceLegale {
  annee: string;
  statut: string;
  urgence: "haute" | "moyenne" | "informative";
  description: string;
  sanction?: string;
}

export interface Rentabilite {
  amortissementAnnees: number;
  amortissementMois: number;
  gainAnnuel: number;
  phrase: string;
}

export interface SimulateurResult {
  coutTravauxMin: number;
  coutTravauxMax: number;
  primeMpr: number;
  primeCee: number;
  resteAMinerMin: number;
  resteAMinerMax: number;
  gainFactureMensuel: number;   // euros / mois économisés
  nouvelleClasse: string;
  contexte: {
    zone: 1 | 2 | 3;
    climat: "H1" | "H2" | "H3";
  };
  postes: PosteTravauxDetail[];
  echeanceLegale: EcheanceLegale;
  rentabilite: Rentabilite;
}

const ZONES: Record<string, 1 | 2 | 3> = {
  // zone H1 (nord, océanique) — on snappe par 2 premiers chiffres du CP
  59: 1, 62: 1, 80: 1, 2: 1, 51: 1, 8: 1, 10: 1, 21: 1, 25: 1, 39: 1, 70: 1, 88: 1, 89: 1, 90: 1,
  // zone H3 (méditerranéen) — outlier sud-est
  13: 3, 30: 3, 34: 3, 83: 3, 6: 3, 20: 3, 11: 3, 66: 3,
};

export function zoneFromCp(cp: string): 1 | 2 | 3 {
  const k = cp.slice(0, 2);
  if (k === "75" || k === "92" || k === "93" || k === "94") return 1; // IdF froid
  return ZONES[k] ?? 2;
}

export function climatFromZone(z: 1 | 2 | 3): "H1" | "H2" | "H3" {
  return z === 1 ? "H1" : z === 3 ? "H3" : "H2";
}

// Coût poste isolé (€ HT) par m² ou forfait, médiane chantiers ADEME
const POSTES_REF: Record<string, { label: string; description: string; perM2: number; forfait: number }> = {
  audit_energetique: {
    label: "Audit énergétique réglementaire",
    description: "Modélisation thermique complète du bâti et scénarios certifiés RGE.",
    perM2: 0,
    forfait: 650,
  },
  dpe: {
    label: "DPE de sortie certifié",
    description: "Attestation officielle du nouveau classement énergétique opposable.",
    perM2: 0,
    forfait: 250,
  },
  pompe_a_chaleur_air_eau: {
    label: "Pompe à chaleur air/eau haute performance",
    description: "Remplacement chaudière fossile par PAC bi-bloc avec régulation connectée.",
    perM2: 0,
    forfait: 13500,
  },
  isolation_combles: {
    label: "Isolation combles perdus ou toiture (R ≥ 7)",
    description: "Soufflage ou rouleaux laine minérale/bio-sourcée, suppression du pont thermique toiture.",
    perM2: 45,
    forfait: 0,
  },
  isolation_murs_exterieurs: {
    label: "Isolation thermique extérieure (ITE)",
    description: "Bardage ou enduit isolant sur façades exposées, gain confort été/hiver.",
    perM2: 175,
    forfait: 0,
  },
  isolation_interieure_murs: {
    label: "Isolation thermique par l'intérieur (ITI)",
    description: "Doublage isolant haute performance adapté aux appartements et copropriétés.",
    perM2: 80,
    forfait: 0,
  },
  remplacement_fenetres: {
    label: "Menuiseries double vitrage renforcé",
    description: "Fenêtres PVC/Alu gaz argon Uw ≤ 1.3 avec volets isolants.",
    perM2: 110,
    forfait: 0,
  },
  radiateurs_inertie_connectes: {
    label: "Radiateurs à inertie fluide / fonte connectés",
    description: "Chauffe homogène basse consommation avec régulation pièce par pièce.",
    perM2: 0,
    forfait: 3400,
  },
  vmc_double_flux: {
    label: "VMC double flux haut rendement",
    description: "Renouvellement d'air avec récupération des calories sortantes à 85 %.",
    perM2: 0,
    forfait: 4800,
  },
  vmc_hygro: {
    label: "VMC hygroréglable type B basse consommation",
    description: "Extraction régulée selon l'humidité ambiante, adaptée aux logements collectifs.",
    perM2: 0,
    forfait: 1600,
  },
};

// Plafonds MaPrimeRénov' 2026 parcours accompagné
const MPR_PLAFOND: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  90_000,
  modeste:       75_000,
  intermediaire: 60_000,
  superieur:     40_000,
};

const MPR_TAUX: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  0.85,
  modeste:       0.70,
  intermediaire: 0.50,
  superieur:     0.30,
};

function parcoursPour(
  classe: DpeClass,
  type: LogementType
): { posteIds: string[]; nouvelleClasse: string } {
  if (type === "appartement") {
    switch (classe) {
      case "G":
        return {
          posteIds: [
            "audit_energetique",
            "isolation_interieure_murs",
            "remplacement_fenetres",
            "radiateurs_inertie_connectes",
            "vmc_hygro",
          ],
          nouvelleClasse: "D",
        };
      case "F":
        return {
          posteIds: [
            "dpe",
            "isolation_interieure_murs",
            "remplacement_fenetres",
            "radiateurs_inertie_connectes",
          ],
          nouvelleClasse: "D",
        };
      case "E":
      default:
        return {
          posteIds: [
            "dpe",
            "remplacement_fenetres",
            "radiateurs_inertie_connectes",
          ],
          nouvelleClasse: "C",
        };
    }
  }

  // Maison individuelle
  switch (classe) {
    case "G":
      return {
        posteIds: [
          "audit_energetique",
          "dpe",
          "isolation_combles",
          "remplacement_fenetres",
          "pompe_a_chaleur_air_eau",
        ],
        nouvelleClasse: "C",
      };
    case "F":
      return {
        posteIds: [
          "dpe",
          "isolation_combles",
          "pompe_a_chaleur_air_eau",
          "vmc_double_flux",
        ],
        nouvelleClasse: "C",
      };
    case "E":
    default:
      return {
        posteIds: ["dpe", "isolation_combles", "pompe_a_chaleur_air_eau"],
        nouvelleClasse: "B",
      };
  }
}

function ceePrime(classe: DpeClass, surface: number, zone: 1 | 2 | 3, type: LogementType): number {
  if (type === "appartement") {
    // Prime CEE isolation intérieure + fenêtres en appartement
    const baseApt = classe === "G" ? 2200 : classe === "F" ? 1800 : 1200;
    const surfaceScale = Math.min(surface / 60, 1.4);
    return Math.round(baseApt * surfaceScale);
  }

  // Maison individuelle (BAR-TH-105 PAC + BAR-TH-129 isolation)
  const base = classe === "G" ? 5200 : classe === "F" ? 4400 : 2800;
  const surfaceBoost = Math.min(surface / 100, 1.5) - 1;
  const zoneBoost = zone === 1 ? 250 : zone === 3 ? -150 : 0;
  return Math.round(base * (1 + surfaceBoost * 0.15) + zoneBoost);
}

function factureMensuelleActuelle(classe: DpeClass, surface: number, chauffage: ChauffageType): number {
  const kwhM2An = classe === "G" ? 430 : classe === "F" ? 340 : 250;
  const priokwh: Record<ChauffageType, number> = {
    electrique: 0.2516,
    gaz: 0.174,
    fioul: 0.185,
    granule: 0.093,
    pac: 0.2516 / 3.2,
    bois: 0.082,
  };
  return Math.round((surface * kwhM2An * priokwh[chauffage]) / 12);
}

function factureApres(nouvelleClasse: string, surface: number, type: LogementType): number {
  const kwhM2An = nouvelleClasse === "B" ? 85 : nouvelleClasse === "C" ? 120 : 170;
  // Maison : PAC (COP 3.4 moyen). Appartement : inertie fluide bien isolée.
  const prixKwhMoyen = type === "maison" ? 0.075 : 0.14;
  return Math.round((surface * kwhM2An * prixKwhMoyen) / 12);
}

function computeEcheanceLegale(classe: DpeClass, statut: StatutType): EcheanceLegale {
  const isBailleur = statut === "bailleur";

  if (classe === "G") {
    return {
      annee: "2025",
      statut: "Interdit de location",
      urgence: "haute",
      description: isBailleur
        ? "Interdit de mise en location et de reconduction depuis le 1er janvier 2025 (loi Climat & Résilience art. 159)."
        : "Votre logement est classé en passoire thermique maximale. Il consomme plus de 420 kWh/m²/an.",
      sanction: isBailleur
        ? "Amende administrative jusqu'à 20 000 € et baisse judiciaire de loyer demandée par le locataire."
        : undefined,
    };
  }

  if (classe === "F") {
    return {
      annee: "2028",
      statut: "Interdiction au 1er janvier 2028",
      urgence: "haute",
      description: isBailleur
        ? "Interdiction de location au 1er janvier 2028. Compte tenu du délai moyen de 6 à 10 mois de travaux, l'audit doit débuter en 2026."
        : "Passoire thermique soumise à l'obligation d'audit en cas de vente. Décote moyenne à la revente : -8 % à -15 %.",
      sanction: isBailleur
        ? "Impossibilité légale de signer un nouveau bail à partir de 2028 sans travaux de sortie."
        : undefined,
    };
  }

  return {
    annee: "2034",
    statut: "Interdiction au 1er janvier 2034",
    urgence: "informative",
    description: isBailleur
      ? "Logement vulnérable dont la location sera interdite en 2034. Vous disposez d'un calendrier confortable pour anticiper."
      : "Logement énergivore au seuil de la réglementation. Travaux simples rentables dès la première année.",
  };
}

export function simulate(input: SimulateurInput): SimulateurResult {
  const statut: StatutType = input.statut ?? "occupant";
  const zone = zoneFromCp(input.cp);
  const { posteIds, nouvelleClasse } = parcoursPour(input.classe, input.type);

  const postes: PosteTravauxDetail[] = [];
  let travaux = 0;

  for (const id of posteIds) {
    const ref = POSTES_REF[id];
    if (!ref) continue;
    let cout = 0;
    if (ref.perM2) cout = Math.round(ref.perM2 * input.surface);
    if (ref.forfait) cout = ref.forfait;
    travaux += cout;
    postes.push({
      id,
      label: ref.label,
      description: ref.description,
      coutEstime: cout,
    });
  }

  const tauxMpr = MPR_TAUX[input.menageIncomeBracket];
  const plafondMpr = MPR_PLAFOND[input.menageIncomeBracket];
  const primeMpr = Math.min(plafondMpr, Math.round(travaux * tauxMpr));
  const primeCee = ceePrime(input.classe, input.surface, zone, input.type);

  // Le total des aides ne peut pas dépasser 95 % des travaux (règle Anah)
  const maxAides = Math.round(travaux * 0.95);
  const aidesCumul = Math.min(maxAides, primeMpr + primeCee);

  const min = Math.max(500, Math.round(travaux - aidesCumul));
  const max = Math.round(min + travaux * 0.16);

  const avant = factureMensuelleActuelle(input.classe, input.surface, input.chauffage);
  const apres = factureApres(nouvelleClasse, input.surface, input.type);
  const gainFactureMensuel = Math.max(30, avant - apres);
  const gainAnnuel = gainFactureMensuel * 12;

  const amortissementMois = Math.max(1, Math.round(min / gainFactureMensuel));
  const amortissementAnnees = Math.round((amortissementMois / 12) * 10) / 10;

  let phraseRentabilite = "";
  if (amortissementAnnees <= 2) {
    phraseRentabilite = `Travaux entièrement rentabilisés en ${amortissementMois} mois grâce aux économies sur vos factures de chauffage.`;
  } else {
    phraseRentabilite = `Votre reste à charge est amorti en ${amortissementAnnees} ans uniquement via la baisse de consommation énergétique.`;
  }

  const echeanceLegale = computeEcheanceLegale(input.classe, statut);

  return {
    coutTravauxMin: Math.round(travaux * 0.93),
    coutTravauxMax: Math.round(travaux * 1.12),
    primeMpr,
    primeCee,
    resteAMinerMin: min,
    resteAMinerMax: max,
    gainFactureMensuel,
    nouvelleClasse,
    contexte: { zone, climat: climatFromZone(zone) },
    postes,
    echeanceLegale,
    rentabilite: {
      amortissementAnnees,
      amortissementMois,
      gainAnnuel,
      phrase: phraseRentabilite,
    },
  };
}
