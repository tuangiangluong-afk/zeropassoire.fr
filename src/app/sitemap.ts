import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/mdx";
import { OPERATORS, HARDWARE_BRANDS, PASSOIRE_DUELS } from "@/data/operators";

const BASE = "https://www.zeropassoire.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Static Routes & Hubs
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/simulateur`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/operateurs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/marques`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/comparatifs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // 2. Operator Routes
  const operatorRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
    url: `${BASE}/operateurs/${op.slug}`,
    lastModified: new Date(op.updatedAt || now),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3. Brand Routes
  const brandRoutes: MetadataRoute.Sitemap = HARDWARE_BRANDS.map((b) => ({
    url: `${BASE}/marques/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. Duel Routes
  const duelRoutes: MetadataRoute.Sitemap = PASSOIRE_DUELS.map((d) => ({
    url: `${BASE}/comparatif/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 5. Guide Routes
  const guides = getAllGuides().map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...statics, ...operatorRoutes, ...brandRoutes, ...duelRoutes, ...guides];
}
