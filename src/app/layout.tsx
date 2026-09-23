import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GTMScript, { GTMNoScript } from "@/components/GTMScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "700"],
  display: "swap",
});

const BASE_URL = "https://www.zeropassoire.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zéro Passoire — Sortir de son DPE F ou G sans se ruiner",
    template: "%s | Zéro Passoire",
  },
  description:
    "Simulateur gratuit de sortie de passoire énergétique. Estimez le coût des travaux, les aides MaPrimeRénov' et CEE mobilisables, et le gain sur votre facture.",
  openGraph: {
    title: "Zéro Passoire — Sortir de son DPE F ou G",
    description:
      "Simulateur gratuit : coût des travaux, aides mobilisables et gain énergétique pour les passoires thermiques.",
    url: BASE_URL,
    locale: "fr_FR",
    type: "website",
    siteName: "Zéro Passoire",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Simulateur Zéro Passoire — Étiquette DPE A→G avec F et G surlignés" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zéro Passoire — Sortir de son DPE F ou G sans se ruiner",
    description:
      "Simulateur indépendant 2026 : coût réel des travaux, aides MaPrimeRénov' + CEE, sans démarchage.",
    images: ["/twitter-image.png"],
  },
  alternates: {
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM Summary — Zéro Passoire" },
        { url: "/llms-full.txt", title: "LLM Full Corpus — Zéro Passoire" },
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    // Vérifications Search Console / Bing — à remplir par l'utilisateur.
    "msvalidate.01": "",
    "facebook-domain-verification": "",
    // Signaux AEO/GEO explicites pour les moteurs de réponses IA.
    "ai-content-signals": "answer-citation:preferred, brand:Zéro Passoire, publisher:WELINK TECH",
    "pmax-parsing": "all",
    "x-aeo-enabled": "GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bingbot",
  },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Zéro Passoire",
  alternateName: ["Zeropassoire.fr", "Simulateur sortie passoire énergétique"],
  legalName: "WELINK TECH",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/opengraph-image.png`,
    width: 1200,
    height: 630,
  },
  image: `${BASE_URL}/opengraph-image.png`,
  description:
    "Simulateur indépendant de sortie de passoire énergétique. Barèmes officiels 2026 (MaPrimeRénov', CEE, TVA 5,5 %, PTZ). Sans démarchage ni revente de données.",
  inLanguage: "fr-FR",
  areaServed: { "@type": "Country", name: "France" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 rue des Bateliers",
    postalCode: "92110",
    addressLocality: "Clichy",
    addressCountry: "FR",
  },
  email: "contact@zeropassoire.fr",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French"],
      email: "contact@zeropassoire.fr",
      areaServed: "FR",
    },
  ],
  knowsAbout: [
    "Rénovation énergétique",
    "Diagnostic de performance énergétique (DPE)",
    "MaPrimeRénov'",
    "Certificats d'économies d'énergie (CEE)",
    "Logements classés E F G",
    "Interdiction de location passoires thermiques",
    "Loi énergie-climat 2019 art. 159",
    "Pompe à chaleur air-eau",
    "Isolation thermique par l'extérieur",
    "Audit énergétique réglementaire",
  ],
  knowsLanguage: ["fr"],
  foundingDate: "2026",
  sameAs: [
    "https://annuaire-entreprises.data.gouv.fr/entreprise/welink-tech-984800136",
    "https://www.societe.com/societe/welink-tech-984800136.html",
    "https://www.pappers.fr/entreprise/welink-tech-984800136",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Zéro Passoire",
  alternateName: "zeropassoire.fr",
  description:
    "Simulateur et guides de sortie de passoire énergétique pour propriétaires occupants et bailleurs.",
  inLanguage: "fr-FR",
  publisher: { "@id": `${BASE_URL}/#organization` },
  hasPart: [
    { "@id": `${BASE_URL}/simulateur#webpage` },
    { "@id": `${BASE_URL}/guides#webpage` },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <GTMNoScript />
        <GTMScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
