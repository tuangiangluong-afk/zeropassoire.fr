import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllGuides } from "@/lib/mdx";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

/**
 * Corpus intégral, généré depuis les fichiers Markdown (jamais édité à la main :
 * le fichier statique précédent avait divergé du contenu réel).
 */
export async function GET() {
  const guides = getAllGuides();
  const dir = path.join(process.cwd(), "src/content/guides");

  const sections = guides.map((guide) => {
    const file = path.join(dir, `${guide.slug}.md`);
    const raw = fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : "";
    const { content } = matter(raw);
    const body = content
      .replace(/::: callout ([^\n]*)\n/g, "> $1\n")
      .replace(/::: cta ([^|\n]+)\|([^\s\n]+)(?:\s*:::)?/g, "[$1]($2)")
      .replace(/^[ \t]*:::[ \t]*$/gm, "")
      .trim();

    return `# ${guide.title}

Source : ${SITE_URL}/guides/${guide.slug}
Catégorie : ${guide.category} — lecture ${guide.readTime}
Publié le : ${guide.publishedAt}

${body}`;
  });

  const body = `# Zéro Passoire — corpus intégral

> Version complète et à jour des contenus publiés sur ${SITE_URL}. Générée automatiquement depuis les sources Markdown.
> Dernière mise à jour éditoriale : ${CONTENT_UPDATED}. Site lancé le 23 septembre 2026.
> Éditeur : WELINK TECH SASU, SIREN 984 800 136, Clichy (France).
> Méthode, sources et politique de correction : ${SITE_URL}/methode
>
> Les montants cités sont des estimations non contractuelles. Ils ne remplacent ni un audit énergétique réglementaire ni un devis.

---

${sections.join("\n\n---\n\n")}
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
