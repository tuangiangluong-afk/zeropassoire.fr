/**
 * Guide loader — lit src/content/guides/*.md, parse le frontmatter via gray-matter
 * et rend le corps en HTML via marked. Aucun MDX runtime.
 * Expose aussi `extractFaqs(html)` pour le FAQPage JSON-LD.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export interface Faq {
  question: string;
  answer: string; // HTML
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  htmlBody: string;
  faqs: Faq[];
}

function parseMarkers(md: string): string {
  // ::: callout <titre>\n...\n:::
  let out = md.replace(
    /:::\s*callout\s+([^\n]*)\n([\s\S]*?):::/g,
    (_m, title, body) =>
      `<div class="my-6 rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-5">
         <h4 class="text-brand-800 font-semibold mb-2">${title.trim() || "&Agrave; retenir"}</h4>
         <div class="text-stone-700">${marked.parse(body.trim()) as string}</div>
       </div>`
  );
  // ::: cta <texte>|<url> :::
  out = out.replace(
    /:::\s*cta\s+([^|\n]+)\|([^\s]+)\s*:::/g,
    (_m, label, href) =>
      `<a href="${href}" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-brand-800 transition">${label.trim()}</a>`
  );
  return marked.parse(out, { async: false }) as string;
}

/**
 * Extracts {question, answer} pairs from rendered HTML.
 * Convention: inside an <h2>Questions fréquentes</h2> block, each <h3>Q</h3>
 * followed by one or more <p>A</p> becomes an FAQ entry.
 */
function extractFaqs(html: string): Faq[] {
  const faqSectionMatch = html.match(
    /<h2[^>]*>\s*(?:Questions?\s+fr[e&eacute;]+quentes?)\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i
  );
  if (!faqSectionMatch) return [];
  const section = faqSectionMatch[1];
  const out: Faq[] = [];
  const parts = section.split(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  // parts = [preamble, q1, body1, q2, body2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const q = parts[i].replace(/<[^>]+>/g, "").trim();
    const body = (parts[i + 1] || "").trim();
    const answerMatch = body.match(/^(<p[\s\S]*?<\/p>)/);
    const a = answerMatch ? answerMatch[1] : body;
    if (q && a) out.push({ question: q, answer: a });
  }
  return out;
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  const guides = files.map((f) => {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, f), "utf-8");
    const { data, content } = matter(raw);
    const slug = f.replace(/\.md$/, "");
    const html = parseMarkers(content);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      publishedAt: String(data.publishedAt ?? "2026-01-01"),
      readTime: String(data.readTime ?? "5 min"),
      category: String(data.category ?? "Guide"),
      htmlBody: html,
      faqs: extractFaqs(html),
    };
  });
  return guides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getGuideBySlug(slug: string): Guide | null {
  return getAllGuides().find((g) => g.slug === slug) ?? null;
}
