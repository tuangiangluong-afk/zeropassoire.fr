import Link from "next/link";
import Logo from "@/components/Logo";
import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-brand-800 hover:text-brand-900">
          <Logo />
          <div className="font-display text-lg font-bold tracking-tight text-stone-900">
            zéro<span className="text-brand-700">passoire</span>
            <span className="text-stone-600">.fr</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <Link href="/operateurs" className="hover:text-brand-700 transition-colors">Opérateurs &amp; MAR</Link>
          <Link href="/marques" className="hover:text-brand-700 transition-colors">Marques &amp; Matériaux</Link>
          <Link href="/comparatifs" className="hover:text-brand-700 transition-colors">Comparatifs</Link>
          <Link href="/guides" className="hover:text-brand-700 transition-colors">Guides &amp; Loi</Link>
          <Link href="/simulateur" className="hover:text-brand-700 transition-colors">Simulateur</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Accompagnateur Rénov&apos; &amp; RGE
          </div>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-brand-800 transition shadow-sm"
          >
            Estimer mes aides
          </Link>
        </div>
      </div>
    </header>
  );
}
