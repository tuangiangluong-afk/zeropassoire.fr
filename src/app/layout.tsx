import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const BASE_URL = "https://zeropassoire.fr";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Zéro Passoire — Sortir de son DPE F ou G sans se ruiner",
    description:
      "Simulateur indépendant 2026 : coût réel des travaux, aides MaPrimeRénov' + CEE, sans démarchage.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.svg`,
  },
  description:
    "Simulateur indépendant de sortie de passoire énergétique. Barèmes officiels 2026 (MaPrimeRénov', CEE, TVA 5,5 %, PTZ). Sans démarchage ni revente de données.",
  inLanguage: "fr-FR",
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "Rénovation énergétique",
    "Diagnostic de performance énergétique (DPE)",
    "MaPrimeRénov'",
    "Certificats d'économies d'énergie (CEE)",
    "Logements classés E F G",
    "Interdiction de location passoires thermiques",
  ],
  sameAs: [],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Zéro Passoire",
  description:
    "Simulateur et guides de sortie de passoire énergétique pour propriétaires occupants et bailleurs.",
  inLanguage: "fr-FR",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
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
