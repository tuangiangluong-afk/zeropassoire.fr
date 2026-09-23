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
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
