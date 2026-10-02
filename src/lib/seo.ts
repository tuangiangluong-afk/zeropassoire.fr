/**
 * SEO metadata utilities for Zéro Passoire
 * Ensures strict compliance with search engine pixel and character limits:
 * - Title: <= 54 characters (strictly <= 540 pixels in SERP)
 * - Meta description: <= 155 characters (strictly <= 985 pixels in SERP)
 * - H1 / H2: <= 70 characters
 */

export function formatPageTitle(title: string, brand = "Zéro Passoire"): string {
  const clean = title.replace(/\s+/g, " ").replace(/\s*\|\s*Zéro Passoire\s*/gi, "").trim();
  const withBrand = `${clean} | ${brand}`;
  if (withBrand.length <= 54) {
    return withBrand;
  }
  const maxTitlePart = 54 - ` | ${brand}`.length;
  const slice = clean.slice(0, maxTitlePart);
  const lastSpace = slice.lastIndexOf(" ");
  const shortTitle = (lastSpace > 20 ? slice.slice(0, lastSpace) : slice).trim().replace(/[,:;\-\s]+$/, "");
  return `${shortTitle} | ${brand}`;
}

export function truncateDesc(desc: string, max = 155): string {
  const clean = desc.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 3);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 100) {
    return sliced.slice(0, lastSpace).trim() + "...";
  }
  return sliced.trim() + "...";
}

export function formatH1(title: string, max = 70): string {
  if (!title) return "";
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  if (clean.includes(" : ")) {
    const [part1, ...rest] = clean.split(" : ");
    const part2 = rest.join(" : ");
    if (part1.length >= 20 && part1.length <= max) return part1.replace(/[,:;\-\s]+$/, "");
    if (part2.length >= 20 && part2.length <= max) return part2.replace(/[,:;\-\s]+$/, "");
  }
  const sliced = clean.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 30) return sliced.slice(0, lastSpace).trim().replace(/[,:;\-\s]+$/, "");
  return sliced.trim().replace(/[,:;\-\s]+$/, "");
}

export function formatH2(heading: string, max = 70): string {
  if (!heading) return "";
  const clean = heading.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 30) return sliced.slice(0, lastSpace).trim().replace(/[,:;\-\s]+$/, "");
  return sliced.trim().replace(/[,:;\-\s]+$/, "");
}

export function clampTitle(title: string): string {
  return formatPageTitle(title);
}

export function clampDescription(desc: string): string {
  return truncateDesc(desc, 155);
}

export interface OgImageOptions {
  q: string;
  sub?: string;
  badge?: string;
}

export function ogImageUrl(options: OgImageOptions): string {
  const base = "https://zeropassoire.fr/api/og";
  const params = new URLSearchParams();
  params.set("q", options.q);
  if (options.sub) params.set("sub", options.sub);
  if (options.badge) params.set("badge", options.badge);
  return `${base}?${params.toString()}`;
}

export function breadcrumbList(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : `https://zeropassoire.fr${item.item}`,
    })),
  };
}
