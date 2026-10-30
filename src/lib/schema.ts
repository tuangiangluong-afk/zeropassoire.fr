import { SITE_URL } from "./site";

const AUTHOR_ID = `${SITE_URL}/#author`;
const ORG_ID = `${SITE_URL}/#organization`;

const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME?.trim();

/**
 * Auteur éditorial.
 *
 * Un nom propre = Person. Sans nom propre, l'auteur est la rédaction, donc une
 * Organization : déclarer une Person nommée « La rédaction… » est incohérent.
 *
 * AUTHOR est destiné à être EMBARQUÉ dans un nœud parent : il ne porte pas
 * @context. Pour un bloc JSON-LD autonome, utiliser AUTHOR_NODE.
 */
export const AUTHOR = AUTHOR_NAME
  ? {
      "@type": "Person" as const,
      "@id": AUTHOR_ID,
      name: AUTHOR_NAME,
      url: `${SITE_URL}/methode`,
      worksFor: { "@id": ORG_ID },
    }
  : {
      "@type": "Organization" as const,
      "@id": AUTHOR_ID,
      name: "La rédaction Zéro Passoire",
      url: `${SITE_URL}/methode`,
      parentOrganization: { "@id": ORG_ID },
    };

/** Même nœud, prêt pour un <script type="application/ld+json"> autonome. */
export const AUTHOR_NODE = { "@context": "https://schema.org", ...AUTHOR };

/**
 * Éditeur, avec name et logo inline : Google Rich Results exige ces deux champs
 * sur `publisher`. Une simple référence @id suffit pour un humain, pas pour le
 * validateur.
 */
export const EDITOR = {
  "@type": "Organization" as const,
  "@id": ORG_ID,
  name: "Zéro Passoire",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/opengraph-image.png`,
    width: 1200,
    height: 630,
  },
};

export const EDITOR_REF = { "@id": ORG_ID };

export const METHOD_URL = `${SITE_URL}/methode`;

/** Sources primaires citées sur l'ensemble du site. */
export const PRIMARY_SOURCES = [
  "Loi n° 2021-1104 du 22 août 2021 (Climat et Résilience), art. 159",
  "Loi n° 2024-1038 du 23 novembre 2024 (Le Meur), meublés de tourisme",
  "Arrêté du 2 octobre 2025 (MaPrimeRénov' 2026)",
  "Fiches CEE de la 6e période (DGEC)",
  "Code de la construction et de l'habitation, art. L.173-1-1 et suivants",
  "SDES — service de la donnée et des études statistiques",
] as const;
