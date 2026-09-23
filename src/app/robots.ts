import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/success"],
    },
    sitemap: "https://zeropassoire.fr/sitemap.xml",
    host: "https://zeropassoire.fr",
  };
}
