/**
 * Barèmes 2026 pour simulateur de sortie de passoire énergétique.
 * Sources : ARRETE du 2 octobre 2025 (MaPrimeRénov' 2026), Barème CEE
 * BAR-TH-105 / 106 / 129, prix observés ADEME 2025-2026.
 * Toute modification doit être répercutée dans les guides MDX.
 */

export type DpeClass = "E" | "F" | "G";
export type ChauffageType = "electrique" | "gaz" | "fioul" | "granule" | "pac" | "bois";
export type LogementType = "maison" | "appartement";

export interface SimulateurInput {
  classe: DpeClass;
  surface: number;         // m²
  cp: string;              // code postal 5 chiffres
  chauffage: ChauffageType;
  type: LogementType;
  menageIncomeBracket: "tres_modeste" | "modeste" | "intermediaire" | "superieur";
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
}

const ZONES: Record<string, 1 | 2 | 3> = {
  // zone H1 (nord, océanique) — on snappe par 2 premiers chiffres du CP
  59: 1, 62: 1, 80: 1, 2: 1, 51: 1, 8: 1, 10: 1, 21: 1, 25: 1, 39: 1, 70: 1, 88: 1, 89: 1, 90: 1,
  // zone H3 (méditerranéen) — outlier sud-est
  13: 3, 30: 3, 34: 3, 83: 3, 6: 3, 20: 3, 11: 3, 66: 3,
};

function zoneFromCp(cp: string): 1 | 2 | 3 {
  const k = cp.slice(0, 2);
  if (k === "75" || k === "92" || k === "93" || k === "94") return 1; // IdF froid
  return ZONES[k] ?? 2;
}

function climatFromZone(z: 1 | 2 | 3): "H1" | "H2" | "H3" {
  return z === 1 ? "H1" : z === 3 ? "H3" : "H2";
}

// Coût poste isolé (€ HT) par m², mediane ADEME + retours installateurs
const POSTE_COUT: Record<string, { perM2: number; forfait: number }> = {
  isolation_murs_exterieurs: { perM2: 185, forfait: 0 },
  isolation_combles:         { perM2: 45,  forfait: 0 },
  isolation_sous_sol:        { perM2: 60,  forfait: 0 },
  remplacement_fenetres:     { perM2: 120, forfait: 0 },
  pompe_a_chaleur_air_eau:   { perM2: 0,   forfait: 13500 },
  chaudiere_granules:        { perM2: 0,   forfait: 9500 },
  vmc_double_flux:           { perM2: 0,   forfait: 4800 },
  audit_energetique:         { perM2: 0,   forfait: 550 },
  dpe:                       { perM2: 0,   forfait: 250 },
};

// Plafonds MaPrimeRénov' 2026 par profil bleu/jaune/ocre/vert
const MPR_PLAFOND: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  90_000,
  modeste:       75_000,
  intermediaire: 60_000,
  superieur:     40_000,
};

const MPR_PAC_TAUX: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  0.90,
  modeste:       0.75,
  intermediaire: 0.50,
  superieur:     0.30,
};

const MPR_ISOLATION_TAUX: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  0.90,
  modeste:       0.75,
  intermediaire: 0.50,
  superieur: 0.30,
};

/**
 * Estimation "parcours de sortie" typique.
 * - G : audit + PAC + isolation combles + menuiseries
 * - F : PAC + isolation combles ou murs + VMC
 * - E : PAC + isolation combles
 */
function parcoursPour(classe: DpeClass): { postes: string[]; nouvelleClasse: string } {
  switch (classe) {
    case "G":
      return {
        postes: [
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
        postes: [
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
        postes: ["dpe", "isolation_combles", "pompe_a_chaleur_air_eau"],
        nouvelleClasse: "B",
      };
  }
}

function ceePrime(classe: DpeClass, surface: number, zone: 1 | 2 | 3): number {
  // ARRETE BAR-TH-105/106/129 (PAC air/eau, H1/H2/H3, maison individuelle)
  // Ordre de grandeur 2026, cumulable.
  const base = classe === "G" ? 5200 : classe === "F" ? 4400 : 2800;
  const surfaceBoost = Math.min(surface / 100, 1.5) - 1;
  const zoneBoost = zone === 1 ? 250 : zone === 3 ? -150 : 0;
  return Math.round(base * (1 + surfaceBoost * 0.15) + zoneBoost);
}

function factureMensuelleActuelle(classe: DpeClass, surface: number, chauffage: ChauffageType): number {
  // Consommation conventionnelle DPE (kWh/m²/an) × prix kWh selon énergie
  const kwhM2An = classe === "G" ? 400 : classe === "F" ? 300 : 230;
  const priokwh: Record<ChauffageType, number> = {
    electrique: 0.2516,
    gaz: 0.174,
    fioul: 0.185,
    granule: 0.093,
    pac: 0.2516 / 3.2,  // COP 3.2 moyen
    bois: 0.082,
  };
  return Math.round(surface * kwhM2An * priokwh[chauffage] / 12);
}

function factureApres(nouvelleClasse: string, surface: number): number {
  const kwhM2An = nouvelleClasse === "C" ? 130 : nouvelleClasse === "B" ? 90 : 180;
  // Post-sortie, chauffage quasi-systématiquement électrique (PAC)
  return Math.round(surface * kwhM2An * 0.079 / 12);
}

export function simulate(input: SimulateurInput): SimulateurResult {
  const zone = zoneFromCp(input.cp);
  const { postes, nouvelleClasse } = parcoursPour(input.classe);

  let travaux = 0;
  for (const poste of postes) {
    const p = POSTE_COUT[poste];
    if (p.perM2) travaux += p.perM2 * input.surface;
    if (p.forfait) travaux += p.forfait;
  }

  const mprTauxPac = MPR_PAC_TAUX[input.menageIncomeBracket];
  const mprTauxIso = MPR_ISOLATION_TAUX[input.menageIncomeBracket];
  const pacPoste = POSTE_COUT.pompe_a_chaleur_air_eau.forfait;
  const isoPosts = postes
    .filter((p) => p.startsWith("isolation") || p === "remplacement_fenetres")
    .reduce((acc, p) => acc + POSTE_COUT[p].perM2 * input.surface, 0);

  const plafond = MPR_PLAFOND[input.menageIncomeBracket];
  const mpr = Math.min(plafond, Math.round(pacPoste * mprTauxPac + isoPosts * mprTauxIso));
  const cee = ceePrime(input.classe, input.surface, zone);

  const min = Math.max(0, Math.round(travaux - mpr - cee));
  const max = Math.round(min + travaux * 0.18); // fourchette +18% (aléas chantier)

  const avant = factureMensuelleActuelle(input.classe, input.surface, input.chauffage);
  const apres = factureApres(nouvelleClasse, input.surface);
  const gain = Math.max(0, avant - apres);

  return {
    coutTravauxMin: Math.round(travaux * 0.92),
    coutTravauxMax: Math.round(travaux * 1.15),
    primeMpr: mpr,
    primeCee: cee,
    resteAMinerMin: min,
    resteAMinerMax: max,
    gainFactureMensuel: gain,
    nouvelleClasse,
    contexte: { zone, climat: climatFromZone(zone) },
  };
}
