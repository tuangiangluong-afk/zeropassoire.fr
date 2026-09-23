import { MetadataRoute } from "next";

const AI_BOTS = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "Anthropic-ai",
  "PerplexityBot", "CCBot", "Google-Extended", "Applebot", "Applebot-Extended",
  "Bytespider", "Amazonbot", "Meta-ExternalAgent", "FacebookExternalHit", "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/success"] },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: ["/", "/llms.txt", "/llms-full.txt", "/guides", "/simulateur", "/api/leads", "/api/events"],
        disallow: ["/success"],
      })),
    ],
    sitemap: "https://zeropassoire.fr/sitemap.xml",
    host: "https://zeropassoire.fr",
  };
}
