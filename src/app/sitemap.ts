import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/mdx";
import { OPERATORS, HARDWARE_BRANDS, PASSOIRE_DUELS } from "@/data/operators";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

/**
 * lastModified reflète une modification réelle, pas la date du build.
 * Un sitemap dont toutes les URLs changent à chaque déploiement est un signal
 * de fraîcheur artificiel : Google finit par l'ignorer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(CONTENT_UPDATED);

  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/simulateur`, lastModified: updated, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/methode`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/operateurs`, lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/marques`, lastModified: updated, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/comparatifs`, lastModified: updated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cgv`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
  ];

  const operatorRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
    url: `${BASE}/operateurs/${op.slug}`,
    lastModified: new Date(op.updatedAt || CONTENT_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = HARDWARE_BRANDS.map((b) => ({
    url: `${BASE}/marques/${b.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const duelRoutes: MetadataRoute.Sitemap = PASSOIRE_DUELS.map((d) => ({
    url: `${BASE}/comparatif/${d.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guides = getAllGuides().map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: updated,
    changeFrequency: "yearly" as const,
    priority: 0.85,
  }));

  return [...statics, ...operatorRoutes, ...brandRoutes, ...duelRoutes, ...guides];
}
