import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-brand-800 hover:text-brand-900">
          <Logo />
          <div className="font-display text-lg font-bold tracking-tight text-stone-900">
            zéro<span className="text-brand-700">passoire</span>
            <span className="text-stone-600">.fr</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <Link href="/simulateur" className="hover:text-brand-700">Simulateur</Link>
          <Link href="/guides" className="hover:text-brand-700">Guides</Link>
          <Link href="/contact" className="hover:text-brand-700">Contact</Link>
        </nav>
        <Link
          href="/#simulateur"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 transition shadow-sm"
        >
          Estimer mon reste à charge
        </Link>
      </div>
    </header>
  );
}
