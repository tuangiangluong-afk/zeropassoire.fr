import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GTMScript, { GTMNoScript } from "@/components/GTMScript";
import { SITE_URL } from "@/lib/site";
import { AUTHOR_NODE } from "@/lib/schema";

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

const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zéro Passoire — Sortir du DPE F ou G sans se ruiner",
    template: "%s",
  },
  description:
    "Simulateur gratuit de sortie de passoire énergétique : estimez le coût des travaux, aides MaPrimeRénov' et CEE, et gain réel sur votre facture d'énergie.",
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
      "Simulateur indépendant 2026 : coût réel des travaux et aides MaPrimeRénov' + CEE, démarchage uniquement sur demande.",
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
  // Le balisage de vérification est injecté par variable d'environnement, pour
  // ne jamais publier de balise vide (Google ignore les balises vides, Bing aussi).
  verification: {
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
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
    "Simulateur et guides sur la sortie de passoire énergétique. Barèmes 2026 (MaPrimeRénov', CEE, TVA 5,5 %, PTZ), méthode et sources publiques. Mise en relation uniquement avec consentement explicite.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(AUTHOR_NODE) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
