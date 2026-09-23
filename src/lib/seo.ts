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
  if (clean.length <= 54) {
    return clean;
  }
  const slice = clean.slice(0, 50);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 30 ? slice.slice(0, lastSpace) : slice).trim();
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
  if (clean.includes(" : ")) {
    const [part1, ...rest] = clean.split(" : ");
    if (part1.length >= 15 && part1.length <= max) return part1.replace(/[,:;\-\s]+$/, "");
  }
  const sliced = clean.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 30) return sliced.slice(0, lastSpace).trim().replace(/[,:;\-\s]+$/, "");
  return sliced.trim().replace(/[,:;\-\s]+$/, "");
}
