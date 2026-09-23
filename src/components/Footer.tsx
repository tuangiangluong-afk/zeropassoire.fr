import Link from "next/link";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock, PhoneOff, Scale, Calculator, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-stone-900 text-stone-300">
      {/* Trust strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <PhoneOff className="w-5 h-5 text-brand-500 shrink-0" />
            <span>Aucun démarchage téléphonique non sollicité</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-brand-500 shrink-0" />
            <span>Vos données ne sont jamais revendues à des tiers</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0" />
            <span>Barèmes officiels 2026 (Légifrance &amp; ADEME)</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand & Mission */}
        <div>
          <div className="flex items-center gap-2 text-brand-500">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-white text-lg">
              zéro<span className="text-brand-500">passoire</span>
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            Simulateur indépendant de sortie de passoire énergétique. Données issues de l’arrêté MaPrimeRénov’ du 2 octobre 2025 et des fiches CEE BAR-TH 6e période.
          </p>
          <div className="mt-4 text-[11px] text-stone-400 font-mono">
            Édité par WELINK TECH SASU<br />
            SIREN 984 800 136 · RCS Nanterre<br />
            6 rue des Bateliers, 92110 Clichy
          </div>
        </div>

        {/* Regulatory & Law Cluster */}
        <div>
          <div className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
            <Scale size={15} className="text-brand-500" /> Réglementation &amp; Droit
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/guides/interdiction-location-passoire-thermique" className="hover:text-white transition">
                Interdiction location DPE G (depuis 2025)
              </Link>
            </li>
            <li>
              <Link href="/guides/interdiction-location-passoire-thermique#sanctions" className="hover:text-white transition">
                Sanctions et baisse judiciaire de loyer
              </Link>
            </li>
            <li>
              <Link href="/guides/interdiction-location-passoire-thermique#exceptions" className="hover:text-white transition">
                Exceptions légales en copropriété
              </Link>
            </li>
            <li>
              <Link href="/guides/interdiction-location-passoire-thermique#airbnb" className="hover:text-white transition">
                Loi Le Meur &amp; Meublés touristiques
              </Link>
            </li>
          </ul>
        </div>

        {/* Financial Aides Cluster */}
        <div>
          <div className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
            <Calculator size={15} className="text-brand-500" /> Aides Financières 2026
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/guides/aides-financieres-sortie-passoire-2026" className="hover:text-white transition">
                Barèmes MaPrimeRénov' 2026 (Bleu, Jaune, Violet, Rose)
              </Link>
            </li>
            <li>
              <Link href="/guides/aides-financieres-sortie-passoire-2026#plafonds" className="hover:text-white transition">
                Plafonds de ressources RFR 2026
              </Link>
            </li>
            <li>
              <Link href="/guides/aides-financieres-sortie-passoire-2026#ecretement" className="hover:text-white transition">
                Règles d'écrêtement officiel Anah
              </Link>
            </li>
            <li>
              <Link href="/guides/aides-financieres-sortie-passoire-2026#eco-ptz" className="hover:text-white transition">
                Éco-PTZ 50 000 € sur 20 ans
              </Link>
            </li>
          </ul>
        </div>

        {/* Technical & Simulator Cluster */}
        <div>
          <div className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
            <Wrench size={15} className="text-brand-500" /> Travaux &amp; Outils
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/simulateur" className="hover:text-white font-medium text-emerald-400 transition">
                Simulateur de reste à charge
              </Link>
            </li>
            <li>
              <Link href="/guides/sortir-de-passoire-energetique-2026" className="hover:text-white transition">
                Parcours de rénovation globale G→C
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-white transition">
                Tous les guides &amp; dossiers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact &amp; Assistance
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer legal links */}
      <div className="border-t border-stone-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} zeropassoire.fr — Plateforme d'information indépendante.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition">CGU</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
