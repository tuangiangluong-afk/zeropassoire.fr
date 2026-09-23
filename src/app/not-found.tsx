import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 bg-stone-50 min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="font-display text-7xl font-bold text-brand-700 mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-3">Cette page n'existe pas (encore)</h1>
        <p className="text-stone-600 mb-8">
          Le lien est peut-être périmé. Revenez à l'accueil, ou filez directement
          vers le simulateur.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Retour à l'accueil</Link>
          <Link href="/simulateur" className="btn-secondary">Lancer une simulation</Link>
        </div>
      </div>
    </section>
  );
}
