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

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
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
  toc: TocEntry[];
}

const HTML_ENTITIES: Record<string, string> = {
  "&eacute;": "é", "&egrave;": "è", "&ecirc;": "ê", "&agrave;": "à",
  "&ugrave;": "ù", "&ccedil;": "ç", "&icirc;": "î", "&ocirc;": "ô",
  "&circ;": "^", "&iuml;": "ï", "&euml;": "ë", "&nbsp;": " ",
  "&laquo;": "«", "&raquo;": "»", "&amp;": "&", "&quot;": '"',
  "&rsquo;": "'", "&lsquo;": "'", "&rdquo;": '"', "&ldquo;": '"',
  "&hellip;": "...", "&ndash;": "-", "&mdash;": "-",
};

function slugifyFr(str: string): string {
  let decoded = str.replace(/<[^>]+>/g, " ");
  for (const [ent, chr] of Object.entries(HTML_ENTITIES)) {
    decoded = decoded.split(ent).join(chr);
  }
  decoded = decoded.replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(parseInt(n, 10)));
  return decoded
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Injects stable id="..." on h2/h3 tags, returns the ToC. Idempotent. */
function extractAndAnnotateToc(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lvl, attrs, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, "").trim();
    if (!text) return `<h${lvl}${attrs}>${inner}</h${lvl}>`;
    if (/id=/.test(attrs)) {
      const existing = (attrs as string).match(/id="([^"]+)"/)?.[1] || slugifyFr(text);
      toc.push({ id: existing, text, level: Number(lvl) as 2 | 3 });
      return `<h${lvl}${attrs}>${inner}</h${lvl}>`;
    }
    let base = slugifyFr(text) || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) { id = `${base}-${n++}`; }
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl} id="${id}"${attrs}>${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

function parseMarkers(md: string): string {
  // Support ::: cta <texte>|<url> ::: or ::: cta <texte>|<url>
  let out = md.replace(
    /:::\s*cta\s+([^|\n]+)\|([^\s\n]+)(?:\s*:::)?/g,
    (_m, label, href) =>
      `<div class="my-8 text-center"><a href="${href}" class="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-brand-800 transition">${label.trim()} &rarr;</a></div>`
  );

  // ::: callout <titre>\n...\n:::
  out = out.replace(
    /:::\s*callout\s+([^\n]*)\n([\s\S]*?):::/g,
    (_m, title, body) =>
      `<div class="my-6 rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-5">
         <h4 class="text-brand-800 font-semibold mb-2">${title.trim() || "&Agrave; retenir"}</h4>
         <div class="text-stone-700">${marked.parse(body.trim(), { async: false }) as string}</div>
       </div>`
  );

  // Clean any remaining orphaned ::: markers
  out = out.replace(/^[ \t]*:::[ \t]*$/gm, "");

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
    const rawHtml = parseMarkers(content);
    const { html, toc } = extractAndAnnotateToc(rawHtml);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      publishedAt: String(data.publishedAt ?? "2026-01-01"),
      readTime: String(data.readTime ?? "5 min"),
      category: String(data.category ?? "Guide"),
      htmlBody: html,
      faqs: extractFaqs(html),
      toc,
    };
  });
  return guides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getGuideBySlug(slug: string): Guide | null {
  return getAllGuides().find((g) => g.slug === slug) ?? null;
}
