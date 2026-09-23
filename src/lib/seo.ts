/**
 * SEO metadata utilities for Zéro Passoire
 * Ensures strict compliance with search engine pixel and character limits:
 * - Title: <= 60 characters
 * - Meta description: <= 155 characters
 */

export function formatPageTitle(title: string, brand = "Zéro Passoire"): string {
  const clean = title.replace(/\s+/g, " ").trim();
  if (clean.length <= 60 && clean.includes(brand)) {
    return clean;
  }
  const candidate = `${clean} | ${brand}`;
  if (candidate.length <= 60) {
    return candidate;
  }
  if (clean.length <= 60) {
    return clean;
  }
  return clean.slice(0, 57).trim() + "...";
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
