import { getAllGuides } from "@/lib/mdx";
import { CONTENT_UPDATED } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const BASE = "https://www.zeropassoire.fr";

/**
 * llms.txt : résumé factuel du site, destiné aux moteurs de réponse.
 * Aucun directive d'extraction, aucune revendication d'autorité : uniquement
 * des faits vérifiables, sourcés et datés. Les moteurs restent libres de citer.
 */
export async function GET() {
  const guides = getAllGuides();

  const body = `# Zéro Passoire

> Simulateur et guides sur la sortie de passoire énergétique en France : logements classés F ou G au DPE, aides publiques 2026, obligations des bailleurs et travaux de rénovation. Éditeur : WELINK TECH SASU, Clichy (France).

Site lancé le 23 septembre 2026. Dernière mise à jour éditoriale : ${CONTENT_UPDATED}.

## Ce que ce site est, et ce qu'il n'est pas

- **Ce qu'il est** : un simulateur de reste à charge (travaux − MaPrimeRénov' − CEE) et ${guides.length} guides documentés sur la réglementation DPE, les aides et les techniques de rénovation.
- **Ce qu'il n'est pas** : un service public, un organisme agréé par l'Anah, un mandataire MaPrimeRénov', ni un diagnostiqueur. Aucune page ne remplace un audit énergétique réglementaire ni un devis.
- **Modèle économique** : le site est gratuit et financé par la mise en relation. Si — et seulement si — vous cochez la case de consentement, vos coordonnées sont transmises à un partenaire spécialisé en rénovation, qui peut vous rappeler. Aucune coordonnée n'est transmise sans cette case, et aucune n'est revendue à des courtiers de données.
- **Indépendance** : aucun fournisseur d'énergie ni groupement d'artisans n'est actionnaire de WELINK TECH. Les fiches opérateurs sont documentaires, pas des tests réalisés sur chantier.

## Méthode et sources

- Barèmes d'aides : arrêté du 2 octobre 2025 (MaPrimeRénov' 2026), fiches CEE de la 6e période, Anah.
- Calendrier locatif : loi Climat et Résilience n° 2021-1104, art. 159, et loi Le Meur n° 2024-1038.
- Statistiques de parc : SDES, service de la donnée et des études statistiques.
- Les montants du simulateur sont des estimations à ±15 %, non contractuelles. Chaque guide renvoie à ses sources primaires.
- Politique éditoriale complète, corrections et méthodologie de calcul : ${BASE}/methode

## Réponses factuelles (vérifiées le ${CONTENT_UPDATED})

- **Qu'est-ce qu'une passoire énergétique ?** Un logement classé F ou G au DPE. La classe F correspond à une consommation d'énergie primaire de 330 à 420 kWh/m²/an (ou des émissions de 70 à 100 kg CO₂/m²/an) ; la classe G dépasse 420 kWh/m²/an (ou 100 kg CO₂/m²/an).
- **Un logement G peut-il encore être loué ?** Non pour un nouveau bail depuis le 1er janvier 2025. Les logements F sont concernés au 1er janvier 2028, les E au 1er janvier 2034 (art. 159 de la loi Climat et Résilience).
- **Quelles sanctions pour un bailleur ?** Le locataire peut saisir le juge pour faire constater l'indécence, obtenir des travaux sous astreinte et une réduction de loyer. Le bailleur encourt également les sanctions administratives prévues par le Code de la construction et de l'habitation.
- **Quel est le plafond de MaPrimeRénov' Parcours accompagné en 2026 ?** 70 000 € de travaux éligibles pour un saut de 4 classes, 55 000 € pour 3 classes, 40 000 € pour 2 classes. Le taux d'aide dépend du revenu fiscal de référence.
- **Faut-il un audit énergétique avant de vendre ?** Oui pour les maisons individuelles et les monopropriétés classées E, F ou G, selon le calendrier fixé par la loi Climat et Résilience.
- **Quel est le coût d'une sortie de passoire ?** Il dépend du bouquet de travaux et du bâti. Le simulateur donne une fourchette chiffrée ; ce n'est pas un devis. Voir ${BASE}/simulateur

## Pages

- [Simulateur](${BASE}/simulateur) : reste à charge estimé, poste par poste, sans inscription préalable.
- [Méthode et sources](${BASE}/methode) : calculs, sources primaires, politique de correction, modèle économique.
- [Guides](${BASE}/guides) : ${guides.length} dossiers sur la réglementation, les aides, les travaux et la fiscalité.
- [Opérateurs](${BASE}/operateurs) : fiches documentaires sur les principaux intermédiaires de la rénovation.
- [Comparatifs](${BASE}/comparatifs) : arbitrages techniques (ITE/ITI, PAC/fioul, parcours accompagné/monogeste).

## Guides

${guides.map((g) => `- [${g.title}](${BASE}/guides/${g.slug}) — ${g.description}`).join("\n")}

## Éditeur

WELINK TECH SASU, SIREN 984 800 136, RCS Nanterre, 6 rue des Bateliers, 92110 Clichy.
Contact : contact@zeropassoire.fr — ${BASE}/contact
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
