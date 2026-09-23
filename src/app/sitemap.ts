import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/simulateur`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const guides = getAllGuides().map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  return [...statics, ...guides];
}
