import Link from "next/link";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock, PhoneOff } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-stone-900 text-stone-300">
      {/* Trust strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <PhoneOff className="w-5 h-5 text-brand-500" />
            <span>Aucun d&eacute;marchage t&eacute;l&eacute;phonique</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-brand-500" />
            <span>Vos donn&eacute;es ne sont jamais revendues</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <span>Bar&egrave;mes officiels 2026 (L&eacute;gifrance)</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-brand-500">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-white text-lg">
              z&eacute;ro<span className="text-brand-500">passoire</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed max-w-sm">
            Simulateur ind&eacute;pendant de sortie de passoire &eacute;nerg&eacute;tique.
            On vous donne les chiffres avant de vous demander quoi que ce soit.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Navigation</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/simulateur" className="hover:text-white">Simulateur</Link></li>
            <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Informations</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions l&eacute;gales</Link></li>
            <li><Link href="/cgv" className="hover:text-white">CGU</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-white">Confidentialit&eacute;</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} z&eacute;ropassoire.fr — Site ind&eacute;pendant.
        Les montants affich&eacute;s sont des estimations, non contractuelles.
      </div>
    </footer>
  );
}
